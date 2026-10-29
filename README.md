# Prototype Design Pattern

Prototype pattern'ni mashq qilish uchun ikkita mustaqil topshiriq: **Game
Character** va **Document**. Ikkisi ham bir xil pattern'ni qo'llaydi, faqat
domeni boshqa — shu sababli fayllar alohida papkalarga taxlangan.

## Pattern nima qiladi?

Prototype — **yaratuvchi (creational)** pattern. Yangi obyektni noldan qurish
o'rniga, mavjud obyektdan nusxa ko'chiradi.

Qachon kerak:
- obyektni qurish qimmat (DB'dan o'qish, hisob-kitob, tarmoq so'rovi);
- bir xil shablonli ko'p obyekt kerak (100 ta bir xil askar);
- obyektning aniq klassini bilmasdan nusxa olish kerak.

## Papka tuzilishi

```
src/
  shared/
    Copyable.ts            — ikkala topshiriq ham ishlatadigan umumiy clone() shartnomasi
  gamecharacter/
    GameCharacter.ts        — ConcretePrototype
    CharacterFactory.ts     — Registry / Client
    GameRunner.ts           — demo ssenariy (npm start)
    InteractiveRunner.ts    — foydalanuvchi bilan muloqot qiladigan rejim
    ShallowVsDeepCopy.ts    — qo'shimcha dars: shallow vs deep copy
    prototype.js            — sof JavaScript (TypeScriptsiz) varianti
  document/
    Document.ts             — ConcretePrototype (copy constructor orqali)
    DocumentFactory.ts      — Registry / Client
    DocumentRunner.ts       — demo ssenariy (npm run start:document)
```

## Rollar (Game Character)

| Rol | Fayl | Vazifasi |
|---|---|---|
| Prototype (interfeys) | `src/shared/Copyable.ts` | `clone()` shartnomasini e'lon qiladi |
| ConcretePrototype | `src/gamecharacter/GameCharacter.ts` | `clone()` ni amalga oshiradi |
| Registry / Client | `src/gamecharacter/CharacterFactory.ts` | prototipni saqlaydi va nusxa beradi |
| Runner | `src/gamecharacter/GameRunner.ts` | `main()` — demo ssenariy |

## Rollar (Document)

| Rol | Fayl | Vazifasi |
|---|---|---|
| Prototype (interfeys) | `src/shared/Copyable.ts` | xuddi shu umumiy shartnoma |
| ConcretePrototype | `src/document/Document.ts` | `clone()` — copy constructor orqali, `tags` uchun deep copy |
| Registry / Client | `src/document/DocumentFactory.ts` | prototipni saqlaydi va nusxa beradi |
| Runner | `src/document/DocumentRunner.ts` | `main()` — demo ssenariy |

## Ishga tushirish

JDK emas, Node kerak. TS variantiga Node 22+ kerak (type stripping).

```bash
cd ~/design-patterns/prototype

# Game Character — TypeScript varianti (asosiy javob)
npm start

# Game Character — sof JavaScript varianti (bitta fayl)
npm run start:js

# Game Character — foydalanuvchi bilan muloqot qiladigan interaktiv rejim
npm run start:interactive

# Qo'shimcha: shallow vs deep copy darsi
node src/gamecharacter/ShallowVsDeepCopy.ts

# Document topshirig'i
npm run start:document
```

## Eng muhim 3 ta nuqta

**1. `clone()` ichida `return this` yozish — eng ko'p uchraydigan xato.**

```ts
clone() { return this; }                 // ❌ bir xil obyekt, original buziladi
clone() { return new GameCharacter(...) } // ✅ yangi obyekt
```

**2. `===` bilan tekshirish.** Topshiriqning qo'shimcha talabi:

```ts
original === clone   // false bo'lishi SHART
```

Java'da bu `original == clone`, JS/TS'da `===`. Qiymatlari bir xil bo'lsa ham
obyektlar har xil bo'lishi kerak.

**3. Yuzaki (shallow) va chuqur (deep) nusxa.**

Primitiv maydonlar (`number`, `string`) xavfsiz ko'chiriladi. Lekin massiv yoki
obyekt maydon bo'lsa, oddiy ko'chirish **havolani** nusxalaydi — nusxani
o'zgartirsak original ham o'zgaradi. Yechim: `[...massiv]`, `{...obyekt}` yoki
`structuredClone()`.

## Imtihonda so'ralishi mumkin

- *Prototype va Factory Method farqi?* — Factory Method yangi obyektni **noldan**
  quradi va klassni biladi; Prototype mavjud **namunadan nusxa** oladi va aniq
  klassni bilishi shart emas.
- *Nega nusxa olishni obyektning o'ziga topshiramiz?* — faqat obyektning o'zi
  barcha private maydonlarini ko'ra oladi. `CharacterFactory` ichida
  `new GameCharacter(...)` yozilsa, maydon qo'shilganda fabrikani ham
  tuzatish kerak bo'ladi.
- *JS'da tayyor vositalar bormi?* — `Object.assign()`, spread `{...obj}`
  (ikkisi ham yuzaki), `structuredClone()` (chuqur, lekin klass tipini
  yo'qotadi — oddiy obyekt qaytaradi, shuning uchun `clone()` metodi afzal).

## Eslatma (TypeScript)

Node'ning type-stripping rejimi `enum`, `namespace` va
`constructor(private x: string)` qisqartmasini **qo'llamaydi**. Shuning uchun
maydonlar ochiq e'lon qilingan. To'liq TS kerak bo'lsa `tsc` yoki `tsx`
ishlatiladi (Node 18+).
