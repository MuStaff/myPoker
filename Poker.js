// Start game (shuffle deck)
const shuffler = (arr) => {
  let j, temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

// create hand and players hands
const dealingСards = (deck) => {
  const playerOne = deck.splice(deck.length - 2, 2);
  const playerTwo = deck.splice(deck.length - 2, 2);
  const hand = deck.splice(deck.length - 5, 5);

  return { playerOne, playerTwo, hand };
};

// create an array of player cards and hand
const totalHand = (playerCards, hand) => {
  return [...playerCards, ...hand];
};

// convert number to suit number
const convertToSuit = (numb) => {
  return Math.floor(numb / 13);
};

// convert numbers from array to card numbers array
const convertToCardNum = (arr) => {
  return arr.map((num) => num % 13);
};

// convert arr to cards arr
const toCard = (arr) => {
  return arr.map((num) => {
    return "Card: " + (num % 13) + " Suit: " + Math.floor(num / 13);
  });
};

// check cards to Flush (one suit)
const isFlush = (arr) => {
  const setSuit = new Set();

  arr.forEach((card) => {
    setSuit.add(convertToSuit(card));
  });

  return setSuit.size === 1;
};

// check cards to Straight (in series)
const isStraight = (arr) => {
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

  return setStep.size === 1;
};

// check cards to Straight Flush (one suit and in series)
const isStraightFlush = (arr) => {
  return isStraight(arr) && isFlush(arr);
};

// check cards to Royal Flush (one suit and in series to A)
const isRoyalFlush = (arr) => {
  return isStraightFlush(arr) && convertToCardNum(arr).includes(13);
};

// create object by the occurrences of cards
const occurrences = (arr) => {
  return convertToCardNum(arr).reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
};

// create all unique combinations with total hand (5 of 7)
const combine = (arr, count) => {
  if (arr.length === count) return [arr];
  else if (count === 0) return [[]];
  else
    return [
      ...combine(arr.slice(1), count - 1).map((c) => [arr[0], ...c]),
      ...combine(arr.slice(1), count),
    ];
};

// check arr to Four Of A Kind
const isFourOfAKind = (arr) => {
  return Object.values(occurrences(arr)).includes(4);
};

// check arr to Full House
const isFullHouse = (arr) => {
  return isPair(arr) && isThreeOfAKind(arr);
};

// check arr to Three Of A Kind
const isThreeOfAKind = (arr) => {
  return Object.values(occurrences(arr)).includes(3);
};

// check arr to Two Pair
const isTwoPair = (arr) => {
  return Object.values(occurrences(arr)).filter((el) => el === 2).length === 2;
};

// check arr to Pair
const isPair = (arr) => {
  return Object.values(occurrences(arr)).includes(2);
};

//find win combination
const findWinCombination = (arr) => {
  if (isRoyalFlush(arr)) {
    return { 1: "isRoyalFlush" };
  } else if (isStraightFlush(arr)) {
    return { 2: "isStraightFlush" };
  } else if (isFourOfAKind(arr)) {
    return { 3: "isFourOfAKind" };
  } else if (isFullHouse(arr)) {
    return { 4: "isFullHouse" };
  } else if (isFlush(arr)) {
    return { 5: "isFlush" };
  } else if (isStraight(arr)) {
    return { 6: "isStraight" };
  } else if (isThreeOfAKind(arr)) {
    return { 7: "isThreeOfAKind" };
  } else if (isTwoPair(arr)) {
    return { 8: "isTwoPair" };
  } else if (isPair(arr)) {
    return { 9: "isPair" };
  } else {
    return { 10: "isHighCard" };
  }
};

const startGame = () => {
  // create array 0-51 (deck)
  const deck = shuffler(
    Array.apply(null, { length: 52 }).map(Number.call, Number)
  );

  const { playerOne, playerTwo, hand } = dealingСards(deck);
};
