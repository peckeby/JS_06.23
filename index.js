function getDistance(x1, y1, x2, y2) {
  if (arguments.length !== 4) {
    throw new Error();
  }

  for (let arg of arguments) {
    if (arg > 1000 || arg < -1000) {
      throw new Error();
    }

    if (arg === Infinity || arg === -Infinity || arg === NaN) {
      throw new Error();
    }

    if (arg == undefined) {
      throw new Error();
    }
  }

  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

//==============================TASK 2====================================//

function switchPlaces(arr) {
  if (Array.isArray(arr) === false) {
    throw new Error();
  }

  if (arr.length === 0) {
    return arr;
  }

  const result = [];
  result.push(...arr.slice(Math.ceil(arr.length / 2), arr.length));

  if (arr.length % 2 !== 0) {
    result.push(arr[Math.floor(arr.length / 2)]);
  }

  result.push(...arr.slice(0, arr.length / 2));

  return result;
}

console.log(switchPlaces([1, 2, 4, 0, 9, 6, 7]));
//==============================TASK 3====================================//

function getDivisors(number) {
  if (
    number === Infinity ||
    number === -Infinity ||
    number === NaN ||
    number == undefined
  ) {
    throw new Error();
  }

  const divisors = [];

  for (let i = number; i >= 1; i--) {
    if (number % i === 0) {
      divisors.push(i);
    }
  }

  return divisors;
}
