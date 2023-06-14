class Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

class Stack {
  static fromIterable(iterable) {
    if (iterable == null || typeof iterable[Symbol.iterator] !== "function") {
      throw new Error("Not iterable");
    }
    const stack = new Stack(iterable.length);
    for (let element of iterable) {
      stack.push(element);
    }
    return stack;
  }

  #maxNumberOfElements = 10;
  #head = null;
  #count = 0;

  constructor(maxNumberOfElements) {
    if (!Number.isInteger(maxNumberOfElements) || maxNumberOfElements <= 0) {
      throw new Error("Invalid limit value");
    }
    this.#maxNumberOfElements = maxNumberOfElements;
  }

  push(data) {
    if (this.#count === this.#maxNumberOfElements) {
      throw new Error("Limit exceeded");
    }
    const node = new Node(data);
    if (this.#head === null) {
      this.#head = node;
    } else {
      node.next = this.#head;
      this.#head = node;
    }
    this.#count += 1;
  }

  pop() {
    if (!this.#head) {
      throw new Error("Empty stack");
    } else {
      const node = this.#head;
      const prevNode = this.#head.next;
      this.#head.next = null;
      this.#head = prevNode;
      this.#count -= 1;
      return node.data;
    }
  }

  peek() {
    return this.#head?.data;
  }

  isEmpty() {
    return this.#head == null;
  }

  toArray() {
    let current = this.#head;
    const result = [];
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }
}

//==============================================Task 2 =============================================//

class LinkedList {
  static fromIterable(iterable) {
    if (iterable == null || typeof iterable[Symbol.iterator] !== "function") {
      throw new Error("Not iterable");
    }
    const linkedList = new LinkedList();
    for (let element of iterable) {
      linkedList.append(element);
    }
    return linkedList;
  }

  #head = null;
  #tail = null;

  append(data) {
    const node = new Node(data);
    if (this.#head === null) {
      this.#head = node;
      this.#tail = node;
    } else {
      this.#tail.next = node;
      this.#tail = node;
    }
  }
  prepend(data) {
    const node = new Node(data);
    if (this.#head == null) {
      this.#head = node;
      this.#tail = node;
    } else {
      node.next = this.#head;
      this.#head = node;
    }
  }

  find(data) {
    let current = this.#head;
    while (current.next) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  toArray() {
    let current = this.#head;
    const result = [];
    while (current.next) {
      result.push(current.data);
      current = current.next;
    }
    result.push(this.#tail.data);
    return result;
  }
}

//==============================================Task 3=============================================//
function isStringOfLengthBetween(value, min, max) {
  return (
    typeof value === "string" && value.length <= max && value.length >= min
  );
}

function isIntegerBetween(value, min, max) {
  return Number.isInteger(value) && value >= min && value <= max;
}

function isPositiveInteger(value, min) {
  return Number.isInteger(value) && value > min;
}

class Car {
  #brand = "";
  get brand() {
    return this.#brand;
  }
  set brand(name) {
    if (!isStringOfLengthBetween(name, 1, 50)) {
      throw new Error("Invalid brand name");
    }

    this.#brand = name;
  }

  #model = "";
  get model() {
    return this.#model;
  }
  set model(name) {
    if (!isStringOfLengthBetween(name, 1, 50)) {
      throw new Error("Invalid brand model");
    }

    this.#model = name;
  }

  #yearOfManufacturing = 1950;
  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }
  set yearOfManufacturing(year) {
    currentYear = new Date(Date.now()).getFullYear();
    if (!isIntegerBetween(year, 1950, currentYear)) {
      throw new Error("Invalid year of manufacturing");
    }

    this.#yearOfManufacturing = year;
  }

  #maxSpeed = 100;
  get maxSpeed() {
    return this.#maxSpeed;
  }
  set maxSpeed(speed) {
    if (!isIntegerBetween(speed, 100, 330)) {
      throw new Error("Invalid max speed");
    }

    this.#maxSpeed = speed;
  }

  #maxFuelVolume = 20;
  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }
  set maxFuelVolume(volume) {
    if (!isIntegerBetween(volume, 20, 100)) {
      throw new Error("Invalid max fuel volume");
    }

    this.#maxFuelVolume = volume;
  }

  #fuelConsumption = 1;
  get fuelConsumption() {
    return this.#fuelConsumption;
  }
  set fuelConsumption(volume) {
    if (!isPositiveInteger(volume, 1)) {
      throw new Error("Invalid fuel consumption");
    }

    this.#fuelConsumption = volume;
  }

  #damage = 1;
  get damage() {
    return this.#damage;
  }
  set damage(rate) {
    if (!isIntegerBetween(rate, 1, 5)) {
      throw new Error("Invalid damage");
    }

    this.#damage = rate;
  }

  #currentFuelVolume = 0;
  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  #isStarted = false;
  get isStarted() {
    return this.#isStarted;
  }

  #mileage = 0;
  get mileage() {
    return this.#mileage;
  }

  #health = 100;
  get health() {
    return this.#health;
  }

  start() {
    if (this.#isStarted) {
      throw new Error("Car has already started");
    }

    this.#isStarted = true;
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error("Car hasn't started yet");
    }

    this.#isStarted = false;
  }

  fillUpGasTank(volume) {
    if (!isPositiveInteger(volume, 1)) {
      throw new Error("Invalid fuel amount");
    }
    if (volume + this.#currentFuelVolume > this.#maxFuelVolume) {
      throw new Error("Too much fuel");
    }
    if (this.#isStarted) {
      throw new Error("You have to shut down your car first");
    }
    this.#currentFuelVolume = this.#currentFuelVolume + volume;
  }

  drive(speed, hours) {
    if (!isPositiveInteger(speed, 1)) {
      throw new Error("Invalid speed");
    }

    if (!isPositiveInteger(hours, 1)) {
      throw new Error("Invalid duration");
    }

    if (speed > this.#maxSpeed) {
      throw new Error("Car can't go this fast");
    }

    if (!this.#isStarted) {
      throw new Error("You have to start your car first");
    }

    const miles = speed * hours;
    const totalFuel = this.#fuelConsumption * (miles / 100);

    if (this.#currentFuelVolume < totalFuel) {
      throw new Error("You don't have enough fuel");
    }

    const totalDamage = this.#damage * (miles / 100);

    if (this.#health < totalDamage) {
      throw new Error("Your car won’t make it");
    }

    this.#currentFuelVolume = this.#currentFuelVolume - totalFuel;
    this.#health = this.#health - totalDamage;
    this.#mileage = this.#mileage + miles;
  }

  repair() {
    if (this.#isStarted) {
      throw new Error("You have to shut down your car first");
    }

    if (this.#currentFuelVolume !== this.#maxFuelVolume) {
      throw new Error("You have to fill up your gas tank first");
    }

    this.#health = 100;
  }

  getFullAmount() {
    return this.#maxFuelVolume - this.#currentFuelVolume;
  }
}
