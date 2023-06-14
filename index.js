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
      this.head = node;
      this.#tail = node;
    } else {
      this.#tail.next = node;
      this.#tail = node;
    }
  }
  prepend(data) {
    const node = new Node(data);
    if (this.#head == null) {
      this.head = node;
      this.#tail = node;
    } else {
      node.next = this.#head;
      this.head = node;
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

// const elmnts = [1, 3, 4, 6, 8];
// const stack = Stack.fromIterable(elmnts);
// console.log(stack.toArray());
// stack.pop();
// console.log(stack.toArray());

// stack.pop();
// console.log(stack.toArray());

// stack.pop();
// console.log(stack.toArray());

// stack.pop();
// console.log(stack.toArray());

// stack.pop();
// console.log(stack.toArray());
// console.log(stack.isEmpty());

// stack.push(2);
// stack.push(5);

// console.log(linkedList.find(323));

//==============================================Task 3=============================================//
class Car {
  #brand = "";
  get brand() {
    return this.#brand;
  }
  set brand(name) {
    if (typeof name !== "string" || name.length > 50 || name.length < 1) {
      throw new Error("Invalid brand name");
    }

    this.#brand = name;
  }

  #model = "";
  get model() {
    return this.#model;
  }
  set model(name) {
    if (typeof name !== "string" || name.length > 50 || name.length < 1) {
      throw new Error("Invalid brand model");
    }

    this.#model = name;
  }

  #yearOfManufacturing = 1950;
  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }
  set yearOfManufacturing(year) {
    if (!Number.isInteger(year) || year < 1950 || year > 2023) {
      throw new Error("Invalid year of manufacturing");
    }

    this.#yearOfManufacturing = year;
  }

  #maxSpeed = 100;
  get maxSpeed() {
    return this.#maxSpeed;
  }
  set maxSpeed(speed) {
    if (!Number.isInteger(speed) || speed < 100 || speed > 330) {
      throw new Error("Invalid max speed");
    }

    this.#maxSpeed = speed;
  }

  #maxFuelVolume = 20;
  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }
  set maxFuelVolume(volume) {
    if (!Number.isInteger(volume) || volume < 20 || volume > 100) {
      throw new Error("Invalid max fuel volume");
    }

    this.#maxFuelVolume = volume;
  }

  #fuelConsumption = 1;
  get fuelConsumption() {
    return this.#fuelConsumption;
  }
  set fuelConsumption(volume) {
    if (!Number.isInteger(volume) || volume < 1) {
      throw new Error("Invalid fuel consumption");
    }

    this.#fuelConsumption = volume;
  }

  #damage = 1;
  get damage() {
    return this.#damage;
  }
  set damage(rate) {
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
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
    if (!Number.isInteger(volume) || volume < 1) {
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
    if (!Number.isInteger(speed) || speed < 1) {
      throw new Error("Invalid speed");
    }

    if (!Number.isInteger(hours) || hours < 1) {
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
    if (this.#currentFuelVolume === this.#maxFuelVolume) {
      return 0;
    } else {
      return this.#maxFuelVolume - this.#currentFuelVolume;
    }
  }
}

const instance = new Car();
// console.log(instance.brand);

// instance.brand = "334";
instance.fillUpGasTank(17);
console.log(instance.currentFuelVolume);

instance.start();
console.log(instance.isStarted);
instance.drive(100, 10);

console.log(instance.health);
console.log(instance.currentFuelVolume);
console.log(instance.mileage);

instance.shutDownEngine();
console.log(instance.getFullAmount());
instance.fillUpGasTank({});
console.log(instance.currentFuelVolume);

console.log(instance.getFullAmount());
