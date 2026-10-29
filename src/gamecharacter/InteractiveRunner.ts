import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { GameCharacter } from "./GameCharacter.ts";
import { CharacterFactory } from "./CharacterFactory.ts";

const rl = createInterface({ input, output });

async function ask(question: string): Promise<string> {
  return (await rl.question(question)).trim();
}

async function main(): Promise<void> {
  console.log("=== Prototype Pattern — Interaktiv askar generatori ===\n");

  const original = new GameCharacter(1, "Arslon", 10, "Qilich");
  const factory = new CharacterFactory(original);
  let nextId = 2;

  console.log("Boshlang'ich prototip tayyor:");
  console.log("  " + factory.getCharacter().toString());

  let running = true;
  while (running) {
    console.log("\nNima qilmoqchisiz?");
    console.log("  1 — Hozirgi prototipdan nusxa (yangi askar) yaratish");
    console.log("  2 — Hozirgi prototipni ko'rish");
    console.log("  3 — Prototipni butunlay almashtirish (yangi asl nusxa)");
    console.log("  4 — Chiqish");

    const choice = await ask("\nTanlov (1-4): ");

    switch (choice) {
      case "1": {
        const clone = factory.cloneCharacter();
        clone.setId(nextId++);

        const name = await ask(`Yangi askar ismi (bo'sh qoldirsa "${clone.getName()}"): `);
        if (name) clone.setName(name);

        const levelStr = await ask(`Darajasi (bo'sh qoldirsa ${clone.getLevel()}): `);
        if (levelStr && !Number.isNaN(Number(levelStr))) clone.setLevel(Number(levelStr));

        const weapon = await ask(`Quroli (bo'sh qoldirsa "${clone.getWeapon()}"): `);
        if (weapon) clone.setWeapon(weapon);

        console.log("\nYangi askar tayyor (prototipdan nusxa):");
        console.log("  " + clone.toString());
        console.log("  original === yangi askar :", original === clone);
        break;
      }
      case "2": {
        console.log("\nHozirgi prototip:");
        console.log("  " + factory.getCharacter().toString());
        break;
      }
      case "3": {
        const name = await ask("Yangi prototip ismi: ");
        const levelStr = await ask("Darajasi: ");
        const weapon = await ask("Quroli: ");

        const newPrototype = new GameCharacter(
          nextId++,
          name || "Nomsiz",
          Number(levelStr) || 1,
          weapon || "Yo'q",
        );
        factory.setCharacter(newPrototype);

        console.log("\nYangi prototip o'rnatildi, endi shundan nusxa olinadi:");
        console.log("  " + factory.getCharacter().toString());
        break;
      }
      case "4": {
        running = false;
        break;
      }
      default: {
        console.log("Noto'g'ri tanlov, 1 dan 4 gacha raqam kiriting.");
      }
    }
  }

  console.log("\nXayr!");
  rl.close();
}

main();
