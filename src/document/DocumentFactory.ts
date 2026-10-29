import { Document } from "./Document.ts";

/**
 * Prototip saqlovchi fabrika — pattern'da "Prototype Registry / Client" roli.
 *
 * Fabrika yangi hujjatni qanday qurishni BILMAYDI, faqat bitta prototip
 * saqlaydi va so'ralganda undan nusxa ko'chirib beradi.
 */
export class DocumentFactory {
  #prototype: Document;

  constructor(prototype: Document) {
    this.#prototype = prototype;
  }

  setDocument(prototype: Document): void {
    this.#prototype = prototype;
  }

  getDocument(): Document {
    return this.#prototype;
  }
  cloneDocument(): Document {
    return this.#prototype.clone();
  }
}