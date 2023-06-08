Array.prototype.customFilter = function (predicate, obj) {
  if (predicate?.constructor !== Function) {
    throw new Error("Invalid argument.");
  }

  if (obj !== undefined && obj?.constructor !== Object) {
    throw new Error("Invalid argument.");
  }

  const boundPredicate = predicate.bind(obj);

  const result = [];

  for (let i = 0; i < this.length; i++) {
    const currentItem = this[i];

    if (boundPredicate(currentItem, i, this)) {
      result.push(currentItem);
    }
  }
  return result;
};

//============================================================Task 2==========================================================================//

const swap = (arr, index1, index2) => {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
};

function bubbleSort(arr) {
  if (arr?.constructor !== Array) {
    throw new Error("Invalid argument.");
  }
  if (arr.length === 0) {
    return arr;
  }
  for (let num of arr) {
    console.log(num);
    if (
      isNaN(num) ||
      num === Infinity ||
      num === -Infinity ||
      typeof num !== "number"
    ) {
      throw new Error("Invalid argument.");
    }
  }

  let swapped;
  const arrCopy = [...arr];

  for (let i = 0; i < arrCopy.length - 1; i++) {
    swapped = false;

    for (let j = 0; j < arrCopy.length - i - 1; j++) {
      if (arrCopy[j] > arrCopy[j + 1]) {
        swap(arrCopy, j, j + 1);
        swapped = true;
      }
    }
    if (swapped == false) {
      break;
    }
  }
  return arrCopy;
}

//============================================================Task 3==========================================================================//

function storageWrapper(func, arr) {
  if (func?.constructor !== Function) {
    throw new Error("Invalid argument.");
  }

  if (arr !== undefined && arr?.constructor !== Array) {
    throw new Error("Invalid argument.");
  }

  const resultArr = arr ?? [];

  return function (...args) {
    const result = func(...args);

    if (arr !== undefined) {
      arr.push(result);
      return result;
    } else {
      resultArr.push(result);
      return resultArr;
    }
  };
}
