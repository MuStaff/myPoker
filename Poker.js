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
    return "Card: " + ((num % 13) + 2) + " Suit: " + Math.floor(num / 13);
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
    return { rank: 1, text: "isRoyalFlush" };
  } else if (isStraightFlush(arr)) {
    return { rank: 2, text: "isStraightFlush" };
  } else if (isFourOfAKind(arr)) {
    return { rank: 3, text: "isFourOfAKind" };
  } else if (isFullHouse(arr)) {
    return { rank: 4, text: "isFullHouse" };
  } else if (isFlush(arr)) {
    return { rank: 5, text: "isFlush" };
  } else if (isStraight(arr)) {
    return { rank: 6, text: "isStraight" };
  } else if (isThreeOfAKind(arr)) {
    return { rank: 7, text: "isThreeOfAKind" };
  } else if (isTwoPair(arr)) {
    return { rank: 8, text: "isTwoPair" };
  } else if (isPair(arr)) {
    return { rank: 9, text: "isPair" };
  } else {
    return { rank: 10, text: "isHighCard" };
  }
};

const startGame = () => {
  // create array 0-51 (deck)
  const deck = shuffler(
    Array.apply(null, { length: 52 }).map(Number.call, Number)
  );

  const { playerOne, playerTwo, hand } = dealingСards(deck);

  const totalHandOne = totalHand(playerOne, hand);
  const totalHandTwo = totalHand(playerTwo, hand);

  const combinationsOne = combine(totalHandOne, 5);
  const combinationsTwo = combine(totalHandTwo, 5);

  const winArrOne = combinationsOne.map((combination) => {
    return findWinCombination(combination).rank;
  });
  const winArrTwo = combinationsTwo.map((combination) => {
    return findWinCombination(combination).rank;
  });

  const winRankOne = Math.min(...winArrOne);
  const winRankTwo = Math.min(...winArrTwo);

  console.log("hand: ", toCard(hand));
  console.log("playerOne: ", toCard(playerOne));
  console.log("playerTwo: ", toCard(playerTwo));

  console.log(
    "combinationsOne: ",
    combinationsOne.map((combination, i) => i + ") " + toCard(combination))
  );
  console.log(
    "combinationsTwo: ",
    combinationsTwo.map((combination, i) => i + 1 + ") " + toCard(combination))
  );

  console.log("winArrOne: ", winArrOne);
  console.log("winArrTwo: ", winArrTwo);

  console.log("winRankOne: ", winRankOne);
  console.log("winRankTwo: ", winRankTwo);
};

startGame();
