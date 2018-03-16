
// ----- Array Helpers

function shuffle(arr) {
  for (let i = arr.length; i > 0;) {
    let j = Math.floor(Math.random() * i);
    i -= 1;
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function compare(a1, a2) {
  const a = a1.slice().sort();
  const b = a2.slice().sort();

  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

function unique(arr) {
  return arr.filter((v, i, self) => {
    return self.indexOf(v) === i;
  });
}

function intersect(a1, a2) {
  return a1.filter((v) => {
    return a2.indexOf(v) !== -1;
  });
}

function range(arr, start, length) {
  return arr.slice(start, start + length);
}

// -----

module.exports = {
  unique,
  intersect,
  range,
  shuffle,
  compare,
};
