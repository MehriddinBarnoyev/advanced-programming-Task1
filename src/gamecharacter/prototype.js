function isCopyable(obj) {
  return obj != null && typeof obj.clone === "function";
}

class GameCharacter {
  #id;
  #name;
  #level;
  #weapon;

  constructor(id, name, level, weapon) {
    this.#id = id;
    this.#name = name;
    this.#level = level;
    this.#weapon = weapon;
  }

  // Prototype pattern: har safar YANGI obyekt qaytaradi.
  clone() {
    return new GameCharacter(this.#id, this.#name, this.#level, this.#weapon);
  }

  getId() { return this.#id; }
  getName() { return this.#name; }
  getLevel() { return this.#level; }
  getWeapon() { return this.#weapon; }

  setId(id) { this.#id = id; }
  setName(name) { this.#name = name; }
  setLevel(level) { this.#level = level; }
  setWeapon(weapon) { this.#weapon = weapon; }

  toString() {
    return `GameCharacter{id=${this.#id}, name='${this.#name}', level=${this.#level}, weapon='${this.#weapon}'}`;
  }
}

class CharacterFactory {
  #prototype;

  constructor(prototype) {
    if (!isCopyable(prototype)) {
      throw new TypeError("Prototip clone() metodiga ega bo'lishi kerak!");
    }
    this.#prototype = prototype;
  }

  setCharacter(prototype) {
    if (!isCopyable(prototype)) {
      throw new TypeError("Prototip clone() metodiga ega bo'lishi kerak!");
    }
    this.#prototype = prototype;
  }

  getCharacter() { return this.#prototype; }

  cloneCharacter() { return this.#prototype.clone(); }
}

// ---------------- GameRunner ----------------
function main() {
  const original = new GameCharacter(1, "Arslon", 10, "Qilich");
  console.log("Original :", original.toString());

  const factory = new CharacterFactory(original);

  const hero1 = factory.cloneCharacter();
  const hero2 = factory.cloneCharacter();

  hero1.setId(2); hero1.setName("Bahodir"); hero1.setLevel(25); hero1.setWeapon("Nayza");
  hero2.setId(3); hero2.setName("Jasur");   hero2.setLevel(40); hero2.setWeapon("Kamon");

  console.log("Nusxa #1 :", hero1.toString());
  console.log("Nusxa #2 :", hero2.toString());
  console.log("Original o'zgarmagan:", original.toString());

  console.log("original === hero1 :", original === hero1); // false
  console.log("hero1 === hero2    :", hero1 === hero2);    // false
}

main();
