import { GameCharacter } from "./GameCharacter.ts";
export class CharacterFactory {
  #prototype: GameCharacter;

  constructor(prototype: GameCharacter) {
    this.#prototype = prototype;
  }

  /** Prototipni boshqasiga almashtirish. */
  setCharacter(prototype: GameCharacter): void {
    this.#prototype = prototype;
  }

  getCharacter(): GameCharacter {
    return this.#prototype;
  }

  cloneCharacter(): GameCharacter {
    return this.#prototype.clone();
  }
}
