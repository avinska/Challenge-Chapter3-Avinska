// calling user's choices
const userChoices = document.querySelectorAll('.user-choice')
const rock = document.getElementById('ru')
const paper = document.getElementById('pu')
const scissors = document.getElementById('su')

// calling all choices
const allChoices = document.querySelectorAll('.btn-container')

// calling match result 
const result_div = document.querySelector('.result')

// calling refresh button
const refresh = document.getElementById('refresh')

// calling playGame method with button id as its parameter
for (let choice of userChoices) {
    choice.onclick = function() {
        const start = new Game(this.id)
        start.playGame()
    }
}

// function to get random computer's choice
getComputerChoice = () => {
    const choices = ['rc', 'pc', 'sc']
    const randomNum = Math.floor(Math.random() * 3)
    return choices[randomNum]
}

// creating Game class
class Game {
    constructor(user, computer) {
        this.user = user
        this.computer = computer
    }

    // method to apply padding bg on selected choices
    applyStyle() {
        const { user, computer } = this
        allChoices.forEach(function(element) {
            element.classList.remove("clicked")
        })
        document.getElementById(`${user}`).classList.add('clicked')
        document.getElementById(`${computer}`).classList.add('clicked')
    }

    // method to reset the game
    reset() {
        const { user, computer } = this
        document.getElementById(`${user}`).classList.remove('clicked')
        document.getElementById(`${computer}`).classList.remove('clicked')
        result_div.classList.remove('win', 'draw')
        result_div.classList.add('vs')
        result_div.innerHTML = 'VS'
    }

    // the game logic
    playGame() {
        const { user, computer } = this
        const computerChoice = getComputerChoice()
        const result = `${user}${computerChoice}`
        switch (result) {
            case 'purc':
            case 'supc':
            case 'rusc':
                matchResult('win', 'PLAYER 1')
                playSound('red')
                break
            case 'rupc':
            case 'pusc':
            case 'surc':
                matchResult('win', 'COM')
                playSound('wrong')
                break
            case 'rurc':
            case 'pupc':
            case 'susc':
                matchResult('draw')
                playSound('green')
                break
        }
        console.log(`PLAYER 1 chooses ${convert(user)} & COM chooses ${convert(computerChoice)}.`)
        const match = new Game(user, computerChoice)
        match.applyStyle()
        setTimeout(function() {
            match.reset()
        }, 2000)
    }
}

// function to show the match results
const matchResult = (results, winner) => {
    result_div.classList.remove('vs', 'win', 'draw')
    if (results === 'draw') {
        result_div.classList.add('draw')
        result_div.innerHTML = 'DRAW'
        console.log(`It's a draw!`)
    } else {
        result_div.classList.add('win')
        result_div.innerHTML = `${winner} <br> WINS`
        console.log(`${winner} wins.`)
    }
}

// converting id choices to text
const convert = (choice) => {
    switch (choice) {
        case 'pu':
        case 'pc':
            choice = 'paper'
            break
        case 'ru':
        case 'rc':
            choice = 'rock'
            break
        case 'su':
        case 'sc':
            choice = 'scissors'
            break
    }
    return choice
}

//adding function to refresh the page
refresh.addEventListener('click', function() {
    location.reload()
})

//adding sound effect 
const playSound = (name) => {
    let audio = new Audio(`assets/sounds/${name}.mp3`)
    audio.play()
}