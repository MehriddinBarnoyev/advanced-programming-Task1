import { Document } from "./Document.ts";

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