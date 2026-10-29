import type { Copyable } from "../shared/Copyable.ts";

class ShallowHero implements Copyable<ShallowHero> {
  name: string;
  inventory: string[];

  constructor(name: string, inventory: string[]) {
    this.name = name;
    this.inventory = inventory;
  }

  clone(): ShallowHero {
    return new ShallowHero(this.name, this.inventory);
  }
}

class DeepHero implements Copyable<DeepHero> {
  name: string;
  inventory: string[];

  constructor(name: string, inventory: string[]) {
    this.name = name;
    this.inventory = inventory;
  }

  clone(): DeepHero {
    //
    return new DeepHero(this.name, [...this.inventory]);
  }
}

console.log("--- YUZAKI (shallow) nusxa: muammo ---");
const shallowOriginal = new ShallowHero("Arslon", ["Qilich"]);
const shallowClone = shallowOriginal.clone();
shallowClone.name = "Bahodir";
shallowClone.inventory.push("Qalqon");

console.log("original :", shallowOriginal.name, shallowOriginal.inventory);
console.log("nusxa    :", shallowClone.name, shallowClone.inventory);
console.log("bir xil massivmi?", shallowOriginal.inventory === shallowClone.inventory);

console.log("\n--- CHUQUR (deep) nusxa: to'g'ri yechim ---");
const deepOriginal = new DeepHero("Arslon", ["Qilich"]);
const deepClone = deepOriginal.clone();
deepClone.name = "Bahodir";
deepClone.inventory.push("Qalqon");

console.log("original :", deepOriginal.name, deepOriginal.inventory);
console.log("nusxa    :", deepClone.name, deepClone.inventory);
console.log("bir xil massivmi?", deepOriginal.inventory === deepClone.inventory);

console.log("\nXULOSA: clone() ichida har bir obyekt/massiv maydon uchun");
console.log("yangi nusxa yasash kerak, aks holda nusxalar bir-biriga ta'sir qiladi.");
