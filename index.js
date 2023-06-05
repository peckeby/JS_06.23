function isPrimitive(value) {
  return value !== Object(value);
}

function isObject(obj) {
  return obj?.constructor === Object;
} //используется в трех задачах!

function reduceComplexObjects(writer, acc, value, ...args) {
  if (!isObject(value)) {
    switch (value.constructor) {
      case Array:
        writer(deepCopyArray, acc, value, ...args);
        break;
      case Map:
        writer(deepCopyMap, acc, value, ...args);
        break;
      case Set:
        writer(deepCopySet, acc, value, ...args);
        break;
    }
  } else {
    writer(deepCopy, acc, value, ...args);
  }
  return acc;
}

function reducer(writer, acc, value, ...args) {
  if (!isPrimitive(value)) {
    return reduceComplexObjects(writer, acc, value, ...args);
  } else {
    writer((v) => v, acc, value, ...args);
    return acc;
  }
}

function arrayWriter(copyFunction, acc, value) {
  acc.push(copyFunction(value));
}

function objectWriter(copyFunction, acc, value, key) {
  acc[key] = copyFunction(value);
}

function setWriter(copyFunction, acc, value) {
  acc.add(copyFunction(value));
}

function mapWriter(copyFunction, acc, value, key) {
  if (isPrimitive(key)) {
    acc.set(key, copyFunction(value));
  } else {
    const [keyCopy] = reduceComplexObjects(arrayWriter, [], key);
    acc.set(keyCopy, copyFunction(value));
  }
}

function deepCopyArray(array) {
  return array.reduce((acc, value) => {
    return reducer(arrayWriter, acc, value);
  }, []);
}

function deepCopyMap(map) {
  return [...map.entries()].reduce((acc, [key, value]) => {
    return reducer(mapWriter, acc, value, key);
  }, new Map());
}

function deepCopySet(set) {
  return [...set.values()].reduce((acc, value) => {
    return reducer(setWriter, acc, value);
  }, new Set());
}

function deepCopy(objectToCopy) {
  return Object.entries(objectToCopy).reduce((acc, [key, value]) => {
    return reducer(objectWriter, acc, value, key);
  }, {});
}

export function makeDeepCopy(obj) {
  if (!isObject(obj)) {
    throw new Error();
  }
  return deepCopy(obj);
}

//=====================================================Task 2============================================================///

function createIterable(x, y) {
  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    throw new Error();
  }
  if (x >= y) {
    throw new Error();
  }

  return {
    from: x,
    to: y,
    [Symbol.iterator]() {
      let i = this.from - 1;
      const end = this.to + 1;
      return {
        next() {
          i++;
          if (i === end) {
            return { done: true, value: i };
          } else {
            return { done: false, value: i };
          }
        },
      };
    },
  };
}

//=====================================================Task 3============================================================///

function createProxy(obj) {
  if (!isObject(obj)) {
    throw new Error();
  }

  const handler = {
    get(target, prop) {
      const entry = target[prop];

      if (entry) {
        entry.readAmount++;
        return entry.value;
      } else {
        return;
      }
    },
    set(target, prop, value) {
      const entry = target[prop];

      if (entry) {
        if (typeof value === typeof entry.value || value === null) {
          entry.value = value;
        }
      } else {
        target[prop] = { value, readAmount: 0 };
      }
      return true;
    },
  };
  return new Proxy(obj, handler);
}
