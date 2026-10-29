import type { Copyable } from "../shared/Copyable.ts";

/**
 * Hujjat — Prototype pattern'da "ConcretePrototype" roli.
 *
 * clone() copy constructor orqali amalga oshiriladi: ikkinchi constructor
 * boshqa Document obyektini oladi va uning barcha maydonlarini ko'chiradi.
 */
export class Document implements Copyable<Document> {
  #id: number;
  #title: string;
  #content: string;
  #author: string;
  #tags: string[];

  constructor(id: number, title: string, content: string, author: string, tags: string[]);
  constructor(source: Document);
  constructor(
    idOrSource: number | Document,
    title?: string,
    content?: string,
    author?: string,
    tags?: string[],
  ) {
    if (idOrSource instanceof Document) {
      this.#id = idOrSource.#id;
      this.#title = idOrSource.#title;
      this.#content = idOrSource.#content;
      this.#author = idOrSource.#author;
      this.#tags = [...idOrSource.#tags];
    } else {
      this.#id = idOrSource;
      this.#title = title!;
      this.#content = content!;
      this.#author = author!;
      this.#tags = [...(tags ?? [])];
    }
  }

  clone(): Document {
    return new Document(this);
  }

  // ----- getter'lar -----
  getId(): number {
    return this.#id;
  }

  getTitle(): string {
    return this.#title;
  }

  getContent(): string {
    return this.#content;
  }

  getAuthor(): string {
    return this.#author;
  }

  getTags(): string[] {
    return [...this.#tags];
  }

  // ----- setter'lar -----
  setId(id: number): void {
    this.#id = id;
  }

  setTitle(title: string): void {
    this.#title = title;
  }

  setContent(content: string): void {
    this.#content = content;
  }

  setAuthor(author: string): void {
    this.#author = author;
  }

  setTags(tags: string[]): void {
    this.#tags = [...tags];
  }

  addTag(tag: string): void {
    this.#tags.push(tag);
  }

  toString(): string {
    return `Document{id=${this.#id}, title='${this.#title}', author='${this.#author}', tags=[${this.#tags.join(", ")}], content='${this.#content}'}`;
  }
}
