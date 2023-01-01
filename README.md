# blackjack-project
project #1

## Wireframe:
![PROJECT 1- BLACKJACK (2)](https://user-images.githubusercontent.com/119767329/210184782-18001ac4-878a-44b2-b7fe-f68f3059aff3.png)

## User Stories:
### MVP:
- **As a user, I want to be able to see my cards**
- `let playerCard1 = []`
- `let playerCard2 = []`
- **As a user, I want to be able to place a bet and increase my account balance if I win and decrease it if I lose**
- `bet1.addEventListener('click,'()=>{if (player1 === wins){player1.accountBalance= accountBalance +1} else(player1.accountBalance= accountBalance -1)})`
- `bet5.addEventListener('click,'()=>{if (player1 === wins){player1.accountBalance= accountBalance +5} else(player1.accountBalance= accountBalance -5)})`
- `bet10.addEventListener('click,'()=>{if (player1 === wins){player1.accountBalance= accountBalance +10} else(player1.accountBalance=accountBalance -10)})`
- **As a user, I want to be able to hit for a new card**
- - `hit.addEventListener('click,'()=>{})`
- **As a user, I want to be able to check to hold my hand**
- - `check.addEventListener('click,'()=>{null})`
- **As a user, I want to be able to see who won the round**
- `if(player1Cards === 21 && player2Cards => 21){return "player 1 Wins"}`
-   `elseIf(player2Cards === 21 && player1Cards => 21){return "player 2 Wins"}`
-   `elseIf(player1Cards > 21 && player2Cards <= 21){return "player 2 Wins"}`
-   `elseIf(player2Cards > 21 && player1Cards <= 21){return "player 1 Wins"}`
-   `elseIf(player1Cards && player2Cards <= 21 && player1Cards > player2Cards){return "player 1 Wins"}`
-   `elseIf(player1Cards && player2Cards <= 21 && player2Cards > player1Cards){return "player 2 Wins"}`
-   `else(return "tie game")`
### Version 2:
- **As a user, I want to be able to go to a landing page for the game**
- **As a user, I want to be able to cash out at any time**
- **As a user, I want to be able to change my player name**
### Version 3:
- **As a user, I want to be able to split hands**
- **As a user, I want to be able to save the game**
