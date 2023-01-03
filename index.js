const hitBtn = document.querySelector('#hit-btn')
const checkBtn = document.querySelector('#check-btn')
const bet1 = document.querySelector('#bet1')
const bet5 = document.querySelector('#bet5')
const bet10 = document.querySelector('#bet10')
const playerCards = document.querySelector('#player-cards')
const dealerCards = document.querySelector('#dealer-cards')
const account = document.querySelector('#account')
const newGame = document.querySelector('#new-game')
const suits = ['H' , 'C' , 'D' , 'S']
const values = ['A','2','3','4','5','6','7','8','9','10', 'J', 'Q', 'K']
let dealerSum = 0
let playerSum = 0
let deck = []

const initialize = () => {
    createDeck()
    shuffleDeck()
}

const createDeck = () => {
    for (let i = 0 ; i < suits.length; i++){
        for (let v = 0 ; v < values.length; v++){
            deck.push(values[v] + '-' + suits[i])
        }
    }
    console.log(deck)
}

// found on https://www.programiz.com/javascript/examples/shuffle-card
const shuffleDeck = () => {
    for (let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length)
        let temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
    }
    console.log(deck)
}

const Betting = () => {
    bet1.addEventListener('click', () => {
        console.log('its working 1')
       })
    bet5.addEventListener('click',()=>{
        console.log('its working 5')
        })
    bet10.addEventListener('click',()=>{
        console.log('its working 10')
       })
}

newGame.addEventListener('click', () => {
    console.log('new game')
})

const getNumber = (card) => {
    let num = card.split('-')
    let value = num[0]
    console.log(card)
    if (isNaN9(value)) {
        if (value === 'A'){
        return 11
    }return 10
}
    return parseInt(value)
}

getNumber()
Betting()
initialize()
