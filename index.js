const hitBtn = document.querySelector('#hit-btn')
const checkBtn = document.querySelector('#check-btn')
const bet1 = document.querySelector('#bet1')
const bet5 = document.querySelector('#bet5')
const bet10 = document.querySelector('#bet10')
const playerCards = document.querySelector('#player-cards')
const dealerCards = document.querySelector('#dealer-cards')
const account = document.querySelector('#account')
const newDeal = document.querySelector('#new-deal')
const newGame = document.querySelector('#new-game')
const playerSum = document.querySelector('#player-sum')
const dealerSum = document.querySelector('#dealer-sum')
const suits = ['♥' , '♣' , '♦' , '♠']
const values = ['A','2','3','4','5','6','7','8','9','10', 'J', 'Q', 'K']
let betOne = false
let betFive = false
let betTen = false
let deck = [] // use const for reference types, unless you have a specific case where you want to change your array to something like `null` : we can still edit the contents of the array but can't change it to be an object for example( if we use const)
let dealerHand = [] // see 18
let playerHand = [] // see 18
let canHit = true
let canCheck = true
let results = document.querySelector('#results') // put above with other dom elements cached, use const
let accountBalance = 20


const initialize = () => { // love this 
    createDeck()
    shuffleDeck()
    dealCards()
    account.innerText = 20
    results.innerText= 'Place a bet to start the game'
}

// goes through values and suits in a double for loop to spit out a combo to get 52 cards // great comment
const createDeck = () => {
    for (let i = 0 ; i < suits.length; i++){
        for (let v = 0 ; v < values.length; v++){
            deck.push(values[v] + suits[i])
        }
    }
}

// used from dragon slayer game code // nice to give credit ! 
const shuffleDeck = () => { 
    for (let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length)
        let temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
    }
}

// pull one random card from deck 
const getRandomCard = ()=>{ // if we get a random card do we need to shuffle ?, also, this doesn't mutate the deck so we could get the same card multiple times. on the first hand this is unlikely, but the chance that this happens increases FAST with hands you play. It would be awkward to both have the same ace 
    const randomIndex = Math.floor(Math.random()* deck.length) 
    const card = deck[randomIndex]
    return card 
}

// pull 4 random cards and push them to the game board screen 
const dealCards =()=>{ // be mindful of your indentation, loos like it's shy a space in a few places here
   dealerHand = [getRandomCard(), getRandomCard()] // <- here(space) + instead of dealing random cards, we could pop from the deck - which will return us the card, AND mutate the deck array so it(the card) couldn't be dealt again 
    dealerHand.forEach((card, index) => {
        const newCard = dealerCards.cloneNode(true) // interesting use of clone node, where did you get this pattern from  ?
        if (index === 0){newCard.classList.add('hidden')}
        newCard.innerHTML = card;
        dealerCards.append(newCard);
    })
   playerHand = [getRandomCard(), getRandomCard()] // <- here
   playerHand.forEach((card) => { // <- here
        const newCard = playerCards.cloneNode(true)
        newCard.innerHTML = card
        playerCards.append(newCard)
    })
   playerSum.innerText= (getNumber(playerHand)) // <- here
}
const randomCard = getRandomCard() // for dev testing ? 

// getting values from the cards and adding them up and storing them in the value variable 
const getNumber = (hand)=>{ // please try to be consistent with the spacing in these functions, compare to line 62 and 45. pick 1 style and stick with it 
    let value = 0 // good use case for local variables
    let hasAce = 0
    hand.forEach((card)=>{
        if (card.length === 2 && (card[0] === 'K' || card[0] === 'Q' || card[0] === 'J')){value+=10
        } else if(card[0] === 'A'){hasAce += 1
        }else if (card.length === 3){value += 10}
        else{
        value += Number(card[0])
        }
})
    if(hasAce > 0){
        value + 11 > 21 ? value +=1 : value += 11 // nice ternary 
        value += (hasAce - 1) // this makes sense in the off chance we get dealt 2 aces, but what if we hit in that situation and get dealt a 3rd !? It wouldn't effect our score at all - an easy fix may be to make this a while loop instead, because 93 is solid and 94 could instead decrement the hasAce which your using as a counter already. 
    } 
return value
}

// creating a function for the hitBtn event listener 
const addCard = ()=>{
    if(canHit === false){
        return
    }if(betOne === false && betFive === false && betTen === false){
        return
    }
    const newCard = getRandomCard()
    playerHand.push(newCard)
    const hitCard = playerCards.cloneNode(true)
    hitCard.innerHTML = newCard
    playerCards.append(newCard)
    const totalValue = getNumber(playerHand)
    if(totalValue > 21){
        decideWinner()
        canHit = false}
    playerSum.innerText= (getNumber(playerHand))
}
hitBtn.addEventListener('click', addCard) // group your likes together, move the event listener to the bottom 

// creating a function for checkbtn event listener
const addDealerCard = ()=>{
    if(betOne === false && betFive === false && betTen === false){
        return
    }
    const hiddenCard = dealerCards.children[0]
    hiddenCard.classList.remove('hidden');
    hiddenCard.innerHTML = dealerHand[0]
    let totalValue = getNumber(dealerHand)
    if(totalValue < 17){
        let newCard = getRandomCard()
        dealerHand.push(newCard)
        const hitCard = dealerCards.cloneNode(true)
        hitCard.innerHTML = newCard
        dealerCards.append(newCard)
        totalValue = getNumber(dealerHand)
    }
    if(totalValue < 17){
        addDealerCard()
    }else{
        decideWinner()
    }
}
checkBtn.addEventListener('click', addDealerCard) // see 117

// Creating a function to decide winner and implement Bet
const decideWinner = ()=> {
    let dealerValue = getNumber(dealerHand)
    let playerValue = getNumber(playerHand)
    if(canCheck === false){
        return
    }
    if(playerValue >21){ // certainly we could refactor this if else choncker to leverage a function instead
        results.innerText= 'Player bust with '+ playerValue + ', Dealer Wins!'
        canCheck = false
        canHit = false
        if(betOne === true){accountBalance -= 1}
            else if(betFive === true){accountBalance -= 5}
            else if(betTen === true){accountBalance -= 10}
    }else if(dealerValue > 21){
        results.innerText=('Dealer bust with '+ dealerValue +', Player wins!')
        canCheck = false
        canHit = false
        if(betOne === true){accountBalance += 1}
            else if(betFive === true){accountBalance += 5}
            else if(betTen === true){accountBalance += 10}
            account.innerText = accountBalance
    }else if(dealerValue > playerValue && dealerValue <= 21){
        results.innerText= ('Dealer wins with '+ dealerValue +'!')
        canCheck = false
        canHit = false
        if(betOne === true){accountBalance -= 1}
            else if(betFive === true){accountBalance -= 5}
            else if(betTen === true){accountBalance -= 10}
    }else if(playerValue > dealerValue && playerValue <= 21){
        results.innerText= ('Player wins with '+ playerValue +'!')
        canCheck = false
        canHit = false
        if(betOne === true){accountBalance += 1}
            else if(betFive === true){accountBalance += 5}
            else if(betTen === true){accountBalance += 10}
    }else if(playerValue === dealerValue){
        results.innerText= ('Tie Game, player and dealer have ' + playerValue)
        canCheck = false
        canHit = false
    }else if(playerValue === 21){
        results.innerText= ('Player has Blackjack')
        if(betOne === true){accountBalance += 1}
            else if(betFive === true){accountBalance += 5}
            else if(betTen === true){accountBalance += 10}
    }else if(dealerValue === 21){
        results.innerText= ('Dealer has Blackjack')
        if(betOne === true){accountBalance -= 1}
            else if(betFive === true){accountBalance -= 5}
            else if(betTen === true){accountBalance -= 10}
    }
    account.innerText = accountBalance
}

bet1.addEventListener('click', () => {// see 81
    betOne = true
    betFive = false
    betTen = false
    canHit = true
    canCheck = true
    results.innerText = 'Bet 1'
    if(accountBalance <= 0){
        betOne = false
        canHit = false
        canCheck = false
        results.innerText = 'No funds, Start new game'
    }
   })// another 3 space indent, also should be inline with the bet1... ( all the way left ) so we know we're closing that function
   
bet5.addEventListener('click',()=>{
    betFive = true
    betOne = false
    betTen = false
    canHit = true
    canCheck = true
    results.innerText = 'Bet 5'
    if(accountBalance <= 0){
        results.innerText = 'No funds, Start new game'
    }else if(accountBalance < 5){
        betFive = false
        results.innerText = 'Not enough funds, try lower amount'
    }
    }) // see 211

bet10.addEventListener('click',()=>{
    betTen = true
    betOne = false
    betFive = false
    canHit = true
    canCheck = true
    results.innerText = 'Bet 10'
    if(accountBalance <= 0){
        results.innerText = 'No funds, Start new game'
    }else if(accountBalance < 10){
        betTen = false
        canHit = false
        canCheck = false
        results.innerText = 'Not enough funds, try lower amount'
    }
    }) // see 211

newDeal.addEventListener('click', ()=>{
    if(accountBalance<= 0){
        results.innerText = 'No funds, Start new game'
        return
    }
    if(betOne === false && betFive === false && betTen === false){
        return
    }
    dealerCards.innerHTML = []
    playerCards.innerHTML = []
    canHit = true
    results.innerHTML = ''
    betOne = false
    betFive= false
    betTen = false
    canCheck = true
    results.innerText= 'Place a bet'
    dealCards()
})

newGame.addEventListener('click', ()=>{
    dealerCards.innerHTML = []
    playerCards.innerHTML = []
    canHit = true
    canCheck = true
    results.innerHTML = ''
    account.innerHTML = ''
    accountBalance= 20
    betOne = false
    betFive= false
    betTen = false
    initialize()
})

initialize()