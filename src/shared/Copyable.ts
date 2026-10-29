/**
 * Prototype pattern'ning asosiy shartnomasi (contract).
 *
 * Bu interfeysni amalga oshirgan har qanday klass "o'zidan nusxa olishni
 * o'zi biladi" degan ma'noni beradi. Nusxa olish mas'uliyati obyektning
 * o'zida bo'ladi — tashqi kod uning ichki tuzilishini bilishi shart emas.
 *
 * Generic <T> ishlatilgani uchun clone() aniq tipni qaytaradi — masalan,
 * GameCharacter.clone() -> GameCharacter, Document.clone() -> Document
 * (Object emas). Shu sababli ham gamecharacter/, ham document/ topshirig'i
 * shu bitta interfeysdan foydalanadi.
 */
export interface Copyable<T> {
  clone(): T;
}
