// Get cardsEl
let cardsEl = document.getElementById("cards-el")
// Declare cards[]
let cards = []

// Get sumEl
let sumEl = document.getElementById("sum-el")
// sum = 0
let sum = 0

// Get messageEl
let messageEl = document.getElementById("message-el")
// Declare message = ""
let message = ""

let playerEl = document.getElementById("player-el")
let playerCoins = 0

let fullCoins = false
let moreCoins = false
let lessCoins = false

let isPlaying = false
let isAlive = false
let hasBlackJack = false
let hasClickedNewCard = false

// Player coins and stats
function player() {
    // Rules
    // hasBlackJack === + 100 coins
    // Is alive && isPlaying === + 25 coins
    // Is alive(false) && isPlaying === -50 coins

    // Blackjack
    if (hasBlackJack === true && isPlaying === true && isAlive === true) {
        playerCoins += 100
        return playerCoins
        
        // Still in the game
    } else if(hasBlackJack === false && isPlaying === true && isAlive === true) {
        playerCoins += 25
        return playerCoins

        // Out of the game
    } else if(hasBlackJack === false && isPlaying === true && isAlive === false){
        playerCoins = playerCoins - 50 
        return playerCoins
    }
}

// Start Game
function startGame() {
    if (hasClickedNewCard === true || hasBlackJack === true || isAlive === false) {
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = cards[0] + cards[1]
        isPlaying = true
        isAlive = true
        hasBlackJack = false
        playerCoins = playerCoins
        hasClickedNewCard = false
        renderGame()
    }
}

// Render Game
function renderGame() {
    cardsEl.textContent = "Cards " 
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " - "
    }
   
    sumEl.textContent = "Sum: " + sum
    if (sum === 21) {
        message = "You've won blackjack!"
        messageEl.textContent = message
        hasBlackJack = true

        playerEl.textContent = "Player: " + playerCoins + "$"
        player()
    }
    else if (sum < 21 && hasClickedNewCard === true) {
        message = "Do you want to draw a new card?"
        messageEl.textContent = message
        isAlive = true

        playerEl.textContent = "Player: " + playerCoins + "$"
        player()
    }
    else if (sum < 21 && hasClickedNewCard === false) {
        message = "You must draw a new card!"
        messageEl.textContent = message
        isAlive = true

        playerEl.textContent = "Player: " + playerCoins + "$"
        player()
    }

    else {
        message = "You're out of the game!"
        messageEl.textContent = message
        isAlive = false
        
        playerEl.textContent = "Player: " + playerCoins + "$"
        player()
        
    }
}

// Random Card
function getRandomCard() {
    let randomNumber = Math.floor( Math.random() * 14)
    if (randomNumber === 0) {
        return 1
    }
    else {
        return randomNumber
    }
    
}

// New Card
function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let newCardValue = getRandomCard()
        sum += newCardValue 
        cards.push(newCardValue)
        hasClickedNewCard = true
        renderGame()
    }
}

