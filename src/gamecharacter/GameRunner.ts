import { GameCharacter } from "./GameCharacter.ts";
import { CharacterFactory } from "./CharacterFactory.ts";

export class GameRunner {
  static main(): void {
    // 1) Bitta qahramon yaratamiz — bu bizning prototipimiz.
    const original = new GameCharacter(1, "Arslon", 10, "Qilich");
    console.log("1. Original qahramon yaratildi:");
    console.log("   " + original.toString());

    // 2) Uni fabrikaga uzatamiz.
    const factory = new CharacterFactory(original);
    console.log("\n2. Qahramon CharacterFactory ga uzatildi.");

    // 3) Prototipdan ikkita nusxa yaratamiz.
    const hero1 = factory.cloneCharacter();
    const hero2 = factory.cloneCharacter();
    console.log("\n3. Prototipdan 2 ta nusxa olindi:");
    console.log("   nusxa #1: " + hero1.toString());
    console.log("   nusxa #2: " + hero2.toString());

    // 4) Nusxalarni o'zgartiramiz — setter'lar orqali.
    hero1.setId(2);
    hero1.setName("Bahodir");
    hero1.setLevel(25);
    hero1.setWeapon("Nayza");

    hero2.setId(3);
    hero2.setName("Jasur");
    hero2.setLevel(40);
    hero2.setWeapon("Kamon");

    console.log("\n4. Nusxalar o'zgartirildi:");
    console.log("   nusxa #1: " + hero1.toString());
    console.log("   nusxa #2: " + hero2.toString());

    // 5) Original o'zgarmaganini tekshiramiz.
    console.log("\n5. Original hali ham o'zgarmagan:");
    console.log("   " + original.toString());

    // Qo'shimcha talab: har bir nusxa alohida obyekt bo'lishi kerak.
    console.log("\n--- Obyektlar bir xilmi (identity) tekshiruvi ---");
    console.log("original === hero1 :", original === hero1); // false
    console.log("original === hero2 :", original === hero2); // false
    console.log("hero1    === hero2 :", hero1 === hero2);    // false

    // Qiymatlar bo'yicha taqqoslash: toza nusxa originalga teng bo'ladi,
    // lekin obyekt sifatida boshqa — Prototype pattern aynan shuni beradi.
    const freshCopy = factory.cloneCharacter();
    console.log("\nYangi toza nusxa    :", freshCopy.toString());
    console.log("original === freshCopy           :", original === freshCopy);
    console.log("qiymatlari bir xilmi (toString)  :", original.toString() === freshCopy.toString());

    // Prototipni almashtirish: endi fabrika boshqa namunadan nusxa oladi.
    console.log("\n--- setCharacter() bilan prototipni almashtirish ---");
    factory.setCharacter(new GameCharacter(100, "Sehrgar", 50, "Tayoq"));
    console.log("yangi prototipdan nusxa:", factory.cloneCharacter().toString());
  }
}

GameRunner.main();
