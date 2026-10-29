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

  /**
   * Har safar YANGI obyekt qaytaradi.
   *
   * E'tibor bering: fabrika `new GameCharacter(...)` yozmaydi — bu ishni
   * prototipning o'ziga topshiradi. Shu sababli kelajakda GameCharacter'ga
   * yangi maydon qo'shilsa, fabrikani o'zgartirish kerak bo'lmaydi.
   */
  cloneCharacter(): GameCharacter {
    return this.#prototype.clone();
  }
}
