import type { Copyable } from "../shared/Copyable.ts";

export class GameCharacter implements Copyable<GameCharacter> {
  #id: number;
  #name: string;
  #level: number;
  #weapon: string;

  constructor(id: number, name: string, level: number, weapon: string) {
    this.#id = id;
    this.#name = name;
    this.#level = level;
    this.#weapon = weapon;
  }

  clone(): GameCharacter {
    return new GameCharacter(this.#id, this.#name, this.#level, this.#weapon);
  }

  // ----- getter'lar -----
  getId(): number {
    return this.#id;
  }

  getName(): string {
    return this.#name;
  }

  getLevel(): number {
    return this.#level;
  }

  getWeapon(): string {
    return this.#weapon;
  }

  // ----- setter'lar -----
  setId(id: number): void {
    this.#id = id;
  }

  setName(name: string): void {
    this.#name = name;
  }

  setLevel(level: number): void {
    this.#level = level;
  }

  setWeapon(weapon: string): void {
    this.#weapon = weapon;
  }


  toString(): string {
    return `GameCharacter{id=${this.#id}, name='${this.#name}', level=${this.#level}, weapon='${this.#weapon}'}`;
  }
}
