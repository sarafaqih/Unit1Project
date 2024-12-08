let cards = document.querySelectorAll("img")
let wins = document.querySelector("#winscount")

let card1=null
let card2=null
const board = []
wins.textContent = 0

console.log(cards)


board = cards.map((card) => {
     return card.src
})
console.log(board)

cards.forEach((card) => {
    card.src = "./card.png"
    card.addEventListener("click", () => {
        if(card1 === null){
            card1 = card.src
        }
        else if(card2=== null){
            card2 = card.src
        }
        else{
            return
        }
        checkCards()

        console.log("card 1 " + card1)
        console.log("card 2 " +card2)
    })
})

function checkCards(){
    if(card1 === card2){
        console.log(" matchy matchy")
    }
}
