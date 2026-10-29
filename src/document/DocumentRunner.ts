import { Document } from "./Document.ts";
import { DocumentFactory } from "./DocumentFactory.ts";

/**
 * Dasturni ishga tushiruvchi klass — Document Prototype topshirig'i uchun demo.
 */
export class DocumentRunner {
  static main(): void {
    // 1) Bitta hujjat yaratamiz — bu bizning prototipimiz.
    const original = new Document(
      1,
      "Shartnoma loyihasi",
      "Ushbu hujjat tomonlar o'rtasidagi kelishuv shartlarini belgilaydi.",
      "Aziz",
      ["huquqiy", "loyiha"],
    );
    console.log("1. Original hujjat yaratildi:");
    console.log("   " + original.toString());

    // 2) Uni fabrikaga uzatamiz.
    const factory = new DocumentFactory(original);
    console.log("\n2. Hujjat DocumentFactory ga uzatildi.");

    // 3) Prototipdan ikkita nusxa yaratamiz.
    const copy1 = factory.cloneDocument();
    const copy2 = factory.cloneDocument();
    console.log("\n3. Prototipdan 2 ta nusxa olindi:");
    console.log("   nusxa #1: " + copy1.toString());
    console.log("   nusxa #2: " + copy2.toString());

    // 4) Nusxalarni o'zgartiramiz — nom, matn va teglar.
    copy1.setId(2);
    copy1.setTitle("Shartnoma — qoralama");
    copy1.setContent("Bu birinchi nusxaning yangilangan matni.");
    copy1.addTag("qoralama");

    copy2.setId(3);
    copy2.setTitle("Shartnoma — yakuniy");
    copy2.setContent("Bu ikkinchi nusxaning yangilangan matni.");
    copy2.addTag("yakuniy");

    console.log("\n4. Nusxalar o'zgartirildi:");
    console.log("   nusxa #1: " + copy1.toString());
    console.log("   nusxa #2: " + copy2.toString());

    // 5) Original o'zgarmaganini tekshiramiz.
    console.log("\n5. Original hali ham o'zgarmagan:");
    console.log("   " + original.toString());

    // Identity tekshiruvi: nusxalar alohida obyekt bo'lishi shart.
    console.log("\n--- Obyektlar bir xilmi (identity) tekshiruvi ---");
    console.log("original === copy1 :", original === copy1);
    console.log("original === copy2 :", original === copy2);
    console.log("copy1   === copy2  :", copy1 === copy2);

    // Qo'shimcha vazifa: tags uchun deep copy tekshiruvi.
    // copy1'ga teg qo'shish original yoki copy2'ning teglariga ta'sir qilmasligi kerak.
    console.log("\n--- Deep Copy tekshiruvi (tags) ---");
    console.log("original.tags (o'zgarmagan bo'lishi kerak) :", original.getTags())
    console.log("copy1.tags    ('qoralama' qo'shilgan)       :", copy1.getTags());
    console.log("copy2.tags    ('yakuniy' qo'shilgan)        :", copy2.getTags());
  }
}

DocumentRunner.main();
