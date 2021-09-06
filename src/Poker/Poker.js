// Start game (shuffle deck)
function shuffler(arr) {
  let j, temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

// create array 0-51 (deck)
const deck = shuffler(Array.apply(null, {length: 52}).map(Number.call, Number))

// convert number to suit number
function convertToSuit(numb) {
  return Math.floor(numb / 13);
}

// convert numbers from array to card numbers array
function convertToCardNum(arr) {
  return arr.map((num) => num % 13);
}

// check cards to Flush (one suit)
function isFlush(arr) {
  const setSuit = new Set();

  arr.forEach((card) => {
    setSuit.add(convertToSuit(card));
  });

  return setSuit.size === 1 ? true : false;
}

// check cards to Straight (in series)
function isStraight(arr) {
  const setStep = new Set();

  convertToCardNum(arr)
    .sort((a, b) => {
      return a - b;
    })
    .reduce((acc, cur, index) => {
      if (index !== 0) {
        setStep.add(cur - acc);
        acc = cur;
      } else acc = cur;
    });

  return setStep.size === 1 ? true : false;
}

// create object by the occurrences of cards
function occurrences(arr) {
  return convertToCardNum(arr).reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
}

// create all unique combinations with hand (5 of 7)
const combine = (arr, count) => {
  if (arr.length === count) return [arr];
  else if (count === 0) return [[]];
  else
    return [
      ...combine(arr.slice(1), count - 1).map((c) => [arr[0], ...c]),
      ...combine(arr.slice(1), count),
    ];
};

// check arr to Four of a kind
function isFourOfAKind(arr) {
  return Object.values(occurrences(arr)).includes(4)
}

// check arr to Full House
function isFullHouse(arr) {
  return Object.values(occurrences(arr)).includes(3) &&  Object.values(occurrences(arr)).includes(2)
}

// check arr to Full House
function isThreeOfAKind(arr) {
  return Object.values(occurrences(arr)).includes(3)
}
