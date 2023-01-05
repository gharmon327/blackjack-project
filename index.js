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
let deck = []
let dealerHand = []
let playerHand = []
let canHit = true
let canCheck = true
let results = document.querySelector('#results')
let accountBalance = 20


const initialize = () => {
    createDeck()
    shuffleDeck()
    dealCards()
    account.innerText = 20
}

// goes through values and suits in a double for loop to spit out a combo to get 52 cards
const createDeck = () => {
    for (let i = 0 ; i < suits.length; i++){
        for (let v = 0 ; v < values.length; v++){
            deck.push(values[v] + suits[i])
        }
    }
}

// used from dragon slayer game code 
const shuffleDeck = () => {
    for (let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length)
        let temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
    }
}

// pull one random card from deck 
const getRandomCard = ()=>{
    const randomIndex = Math.floor(Math.random()* deck.length)
    const card = deck[randomIndex]
    return card
}

// pull 4 random cards and push them to the game board screen 
const dealCards =()=>{
   dealerHand = [getRandomCard(), getRandomCard()]
    dealerHand.forEach((card) => {
        const newCard = dealerCards.cloneNode(true)
        // dealerHand[0].newCard.classList.add('.hide')
        newCard.innerHTML = card
        dealerCards.append(newCard)
    })
   playerHand = [getRandomCard(), getRandomCard()]
   playerHand.forEach((card) => {
        const newCard = playerCards.cloneNode(true)
        newCard.innerHTML = card
        playerCards.append(newCard)
    });
//    console.log(dealerHand, playerHand)
   playerSum.innerText= (getNumber(playerHand))
}
const randomCard = getRandomCard()

// getting values from the cards and adding them up and storing them in the value variable 
const getNumber = (hand)=>{
    let value = 0
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
        value + 11 > 21 ? value +=1 : value += 11
        value += (hasAce - 1)
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
hitBtn.addEventListener('click', addCard)

// creating a function for checkbtn event listener
const addDealerCard = ()=>{
    if(betOne === false && betFive === false && betTen === false){
        return
    }
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
checkBtn.addEventListener('click', addDealerCard)

const decideWinner = ()=> {
    let dealerValue = getNumber(dealerHand)
    let playerValue = getNumber(playerHand)
    if(canCheck === false){
        return
    }
    if(playerValue >21){
        results.innerText= 'Dealer Wins'
        canCheck = false
        canHit = false
        if(betOne === true){accountBalance -= 1}
            else if(betFive === true){accountBalance -= 5}
            else if(betTen === true){accountBalance -= 10}
    }else if(dealerValue > 21){
        results.innerText=('dealer bust player wins!')
        canCheck = false
        canHit = false
        if(betOne === true){accountBalance += 1}
            else if(betFive === true){accountBalance += 5}
            else if(betTen === true){accountBalance += 10}
            account.innerText = accountBalance
    }else if(dealerValue > playerValue && dealerValue <= 21){
        results.innerText= ('dealer wins with '+ dealerValue)
        canCheck = false
        canHit = false
        if(betOne === true){accountBalance -= 1}
            else if(betFive === true){accountBalance -= 5}
            else if(betTen === true){accountBalance -= 10}
    }else if(playerValue > dealerValue && playerValue <= 21){
        results.innerText= ('player wins with '+ playerValue)
        canCheck = false
        canHit = false
        if(betOne === true){accountBalance += 1}
            else if(betFive === true){accountBalance += 5}
            else if(betTen === true){accountBalance += 10}
    }else if(playerValue === dealerValue){
        results.innerText= ('Tie Game, player and dealer have ' + playerValue)
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

bet1.addEventListener('click', () => {
    betOne = true
    results.innerText = ''
    if(accountBalance <= 0){
        betOne = false
        canHit = false
        canCheck = false
        results.innerText = 'No funds, Start new game'
    }
   })
bet5.addEventListener('click',()=>{
    betFive = true
    results.innerText = 'bet 5'
    if(accountBalance <= 0){
        results.innerText = 'No funds, Start new game'
    }else if(accountBalance < 5){
        betFive = false
        results.innerText = 'Not enough funds, try lower amount'
    }
    })
bet10.addEventListener('click',()=>{
    betTen = true
    results.innerText = 'bet 10'
    if(accountBalance <= 0){
        results.innerText = 'No funds, Start new game'
    }else if(accountBalance < 10){
        betTen = false
        canHit = false
        canCheck = false
        results.innerText = 'No enough funds, try lower amount'
    }
    })

newDeal.addEventListener('click', ()=>{
    if(accountBalance<= 0){
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

// const decideWinner = ()=> {
//     let dealerValue = getNumber(dealerHand)
//     let playerValue = getNumber(playerHand)
//     if(playerValue >21){
//         results.innerText= 'Dealer Wins'
//     }else if(dealerValue > playerValue && dealerValue <= 21){
//         results.innerText= ('dealer wins with '+ dealerValue)
//     }else if(playerValue > dealerValue && playerValue <= 21){
//         results.innerText= ('player wins with '+ playerValue)
//     }else if(playerValue === dealerValue){
//         results.innerText= ('Tie Game, player and dealer have ' + playerValue)
//     }else if(playerValue === 21){
//         results.innerText= ('Player has Blackjack')
//     }else if(dealerValue === 21){
//         results.innerText= ('Dealer has Blackjack')
//     }
// }

// const betting = () => {
//     bet1.addEventListener('click', () => {
//         betOne = true
//         if(results.innerText === 'dealer bust player wins!' || results.innerText == 'player wins with '){
//             accountBalance = accountBalance + 1
//         }else if(results.innerText === 'Dealer Wins' || results.innerText == 'dealer wins with ')
//             {accountBalance = accountBalance - 1
//         }else{null}
//         console.log(accountBalance)
//        })
//     bet5.addEventListener('click',()=>{
//         betFive = true
//         if(results.innerText === 'dealer bust player wins!' || results.innerText == 'player wins with '){
//             accountBalance = accountBalance + 5
//         }else if(results.innerText === 'Dealer Wins' || results.innerText == 'dealer wins with ')
//             {accountBalance = accountBalance - 5
//         }else {null}
//         })
//     bet10.addEventListener('click',()=>{
//         betTen = true
//         if(results.innerText === 'dealer bust player wins!' || results.innerText == 'player wins with '){
//             accountBalance = accountBalance + 10
//         }else if(results.innerText === 'Dealer Wins' || results.innerText == 'dealer wins with ')
//             {accountBalance = accountBalance - 10
//         }else{null}
//        })
//        account.innerText = accountBalance
// }