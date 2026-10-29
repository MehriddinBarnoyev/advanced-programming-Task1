// =====================================================================
// QO'SHIMCHA DARS: yuzaki (shallow) va chuqur (deep) nusxa.
// Ishga tushirish: node src/ShallowVsDeepCopy.ts
//
// Asosiy vazifadagi GameCharacter'da faqat primitiv maydonlar bor
// (number, string) — ularni ko'chirish xavfsiz. Lekin qahramonga
// massiv yoki obyekt maydon qo'shilsa, muammo boshlanadi.
// =====================================================================

import type { Copyable } from "../shared/Copyable.ts";

/** YOMON misol: inventar massivi HAVOLA bilan ko'chirilgan. */
class ShallowHero implements Copyable<ShallowHero> {
  name: string;
  inventory: string[];

  constructor(name: string, inventory: string[]) {
    this.name = name;
    this.inventory = inventory;
  }

  clone(): ShallowHero {
    // Xato: this.inventory — bir xil massivga havola!
    return new ShallowHero(this.name, this.inventory);
  }
}

/** YAXSHI misol: inventar massivi ham nusxalangan. */
class DeepHero implements Copyable<DeepHero> {
  name: string;
  inventory: string[];

  constructor(name: string, inventory: string[]) {
    this.name = name;
    this.inventory = inventory;
  }

  clone(): DeepHero {
    // To'g'ri: [...] bilan yangi massiv yasaymiz.
    return new DeepHero(this.name, [...this.inventory]);
  }
}

console.log("--- YUZAKI (shallow) nusxa: muammo ---");
const shallowOriginal = new ShallowHero("Arslon", ["Qilich"]);
const shallowClone = shallowOriginal.clone();
shallowClone.name = "Bahodir";          // primitiv — original'ga ta'sir qilmaydi
shallowClone.inventory.push("Qalqon");  // massiv — original'ga ham qo'shiladi!

console.log("original :", shallowOriginal.name, shallowOriginal.inventory);
console.log("nusxa    :", shallowClone.name, shallowClone.inventory);
console.log("bir xil massivmi?", shallowOriginal.inventory === shallowClone.inventory); // true — YOMON

console.log("\n--- CHUQUR (deep) nusxa: to'g'ri yechim ---");
const deepOriginal = new DeepHero("Arslon", ["Qilich"]);
const deepClone = deepOriginal.clone();
deepClone.name = "Bahodir";
deepClone.inventory.push("Qalqon");

console.log("original :", deepOriginal.name, deepOriginal.inventory);
console.log("nusxa    :", deepClone.name, deepClone.inventory);
console.log("bir xil massivmi?", deepOriginal.inventory === deepClone.inventory); // false — YAXSHI

console.log("\nXULOSA: clone() ichida har bir obyekt/massiv maydon uchun");
console.log("yangi nusxa yasash kerak, aks holda nusxalar bir-biriga ta'sir qiladi.");
