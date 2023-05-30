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
  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return distance;
}

//==============================TASK 2====================================//

function switchPlaces(arr) {
  if (Array.isArray(arr) === false || arr == undefined) {
    throw new Error();
  }

  if (arr.length === 0) {
    return arr;
  }

  let result = [];

  for (let i = Math.round(arr.length / 2); i < arr.length; i++) {
    result.push(arr[i]);
  }
  if (arr.length % 2 === 0) {
    for (let i = 0; i < Math.round(arr.length / 2); i++) {
      result.push(arr[i]);
    }
  } else {
    result.push(arr[Math.floor(arr.length / 2)]);
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
      result.push(arr[i]);
    }
  }
  return result;
}

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
  let divisors = [];
  for (i = number; i >= 1; i--) {
    if (number % i === 0) {
      divisors.push(i);
    }
  }
  return divisors;
}
