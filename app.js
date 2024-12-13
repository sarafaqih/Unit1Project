let cardsElement = document.querySelectorAll("img")
let winsElement = document.querySelector("#winscount")
let timeElement = document.querySelector("#time")

// let levelElement = document.querySelectorAll("#gameLevel")
// let selectedLevel = document.querySelector("#level")

let card1=null
let card2=null
let card1Index=null
let card2Index=null
const board = []

let checkWinning = ["", "", "", "", "", "", "", "", "", "", "", ""]

timeElement.textContent=0
let startTime = null
let timeInterval=null
let elapsedTime=0

let winCount=0
winsElement.textContent = winCount

// let gameLevel = null



cardsElement.forEach((card) => {
    board.push(card.src)
})

function shuffle(array){
    let currentIndex=cardsElement.length
    //while there's remaining elements to shuffle
    while(currentIndex !=0){
        //pick a remaining element
        let randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        //swap it with current element
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

shuffle(board)

// levelElement.forEach((level) => {
//     level.addEventListener("click", () => {       
//     if(gameLevel !=null){
//         console.log("please reset the game")
//     }
//     else{
//         gameLevel = level.textContent
//         console.log(selectedLevel)
//         selectedLevel.innerText = "Level: " + gameLevel
//         console.log(gameLevel)
//         closeDropDown()
//     }    
// })
// })

cardsElement.forEach((card, index) => {
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
            
            if(!startTime){
                startTime= Date.now()
                timeInterval = setInterval(timer, 1000) // update every second
            }
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
        cardsElement[card1Index].src="./card.png"
        cardsElement[card2Index].src="./card.png"
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
        winsElement.textContent = winCount

        //stop timer
        clearInterval(timeInterval)
    }
}

function resetGame(){
    cardsElement.forEach((card)=>{
        card.src = "./card.png"
        card.alt = "card.png"
        card1=null
        card2=null
        card1Index=null
        card2Index=null
        checkWinning = ["", "", "", "", "", "", "", "", "", "", "", ""]
        //gameLevel = null
    })
    shuffle(board)
    elapsedTime=0
    timeElement.textContent = "0 s"
    startTime=null
    clearInterval(timeInterval)

}

function timer(){
    elapsedTime = Math.floor((Date.now() - startTime) / 1000)
    timeElement.textContent = `${elapsedTime}s`
}

// function dropdown(){
//     document.querySelector("#myDropDown").classList.toggle("show")
// }
// window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//       var dropdowns = document.querySelector(".dropdown-content");
//       var i;
//       for (i = 0; i < dropdowns.length; i++) {
//         var openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//         }
//       }
//     }
//   }

//   function closeDropDown(){
//     var dropdowns = document.querySelectorAll(".dropdown-content");
//     dropdowns.forEach((dropdown)=> {
//         dropdown.classList.remove("show")
//     })
//   }
