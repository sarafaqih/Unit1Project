let cards = document.querySelectorAll("img")
let wins = document.querySelector("#winscount")

let card1=null
let card2=null
let card1Index=null
let card2Index=null
const board = []

let checkWinning = ["", "", "", "", "", "", "", "", "", "", "", ""]

let winCount=0
wins.textContent = winCount



cards.forEach((card) => {
    board.push(card.src)
})


cards.forEach((card, index) => {
    card.src = "./card.png"
    card.alt = "card.png"

    card.addEventListener("click", () => {
        if(card1!==null && card.src===card1){
            return console.log("dont select me twice")
        }
        if(card1 === null){
            card.src = board[index]
            card1 = card.src
            card1Index=index
        }
        else if(card1 !==null || card2=== null){
            card.src = board[index]
            card2 = card.src
            card2Index=index
        }
        else{
            return console.log("here")
        }
        console.log("card 1 " + card1)
        console.log("card 2 " +card2)
        
        setTimeout(() => {
            checkCards(),
            countWin()

        }, 700);


    })

})




function checkCards(){
    if(card1 === card2){
        console.log(" matchy matchy")
        card1=null
        card2=null
        checkWinning[card1Index]= true
        checkWinning[card2Index]= true

    }
    else if(card1!==null && card2===null){
        return
    }
    else{
        console.log("does not match")
        card1=null
        card2=null
        cards[card1Index].src="./card.png"
        cards[card2Index].src="./card.png"
}
console.log(checkWinning)
}

function countWin(){
    console.log(!(checkWinning.includes("")))
    if(checkWinning.includes("")){
        console.log("too soon")

    }
    else if (!(checkWinning.includes(false))) {
        console.log("all  cards matches")
        winCount=winCount+1
        wins.textContent = winCount
    }
}

function resetGame(){
    cards.forEach((card)=>{
        card.src = "./card.png"
        card.alt = "card.png"
        card1=null
        card2=null
        card1Index=null
        card2Index=null
        checkWinning = ["", "", "", "", "", "", "", "", "", "", "", ""]
    })
}
