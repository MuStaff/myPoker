import React from 'react';
// import {StyledPoker} from "./styled";

// Start game (shuffle deck)
function shuffler(arr){
    let j, temp;
    for(let i = arr.length - 1; i > 0; i--){
        j = Math.floor(Math.random()*(i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

// Utils
function numConv(numb) {
    return Math.floor(numb/13);
}

function convertToCardNum(arr) {
    return arr.map(num => num % 13)
}

function isFlush(arr) {
    const setSuit = new Set();

    arr.forEach(card => {
        setSuit.add(numConv(card))
    })

    return (setSuit.size === 1 ? true : false)
}

function isStraight(arr) {
    const setStraight = new Set();

    for(let i = 1; i < arr.length; i++) {
        setStraight.add(arr[i] - arr[i-1])
    }

    return (setStraight.size === 1 ? true : false)
}

function oneValue(arr) {
    const setValue = arr.reduce((acc, curr) => {
        numConv(curr)
    }, {});

    arr.forEach(card => {
        setSuit.add(Math.floor(card/13))
    })

    return (setSuit.size === 1 ? true : false)
}

function biggerCard() {

}

const Poker = () => {
    const countPlayers = 2;
    const players = {};
    const mainHand = [];
    const deck = Array.from(Array(51).keys());
    const randDeck = shuffler(deck);

    console.log(randDeck[0])
    console.log(numConv(randDeck[0]))

    // function
    function findWinCombo(array) {
        let sortArr = array.sort((a,b) => {
            return a - b;
        })

        if (true) console.log(sortArr.slice(-5));
        // if () ;
        // if () ;
        // if () ;
        // if () ;
        // if () ;


        return
    }

    // randomizer for array



    // create players hands
    for(let j = 0; j < 2; j++) {
        for(let i = 0; i < countPlayers; i++) {
            players[i] = players[i] ? [...players[i], randDeck.pop()] : [randDeck.pop()]
        }
    }

    // create main hand
    for(let j = 0; j < 5; j++) {
        mainHand.push(randDeck.pop())
    }

    // find combination
    // findWinCombo([...mainHand, ...players[0]])
    // findWinCombo([...mainHand, ...players[1]])

    return (
        <div>

        </div>
    );
};

export default Poker;
