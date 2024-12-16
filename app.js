let cardsElement = document.querySelectorAll("img")
let winsElement = document.querySelector("#winscount")
let timeElement = document.querySelector("#time")

let levelElement = document.querySelectorAll("#gameLevel")
let selectedLevel = document.querySelector("#level")

let alertLevel = document.querySelector("#alert-level")

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

 let gameLevel = null



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

//select level game 
levelElement.forEach((level) => {
    level.addEventListener("click", () => {       
    if(gameLevel !=null){
        alertLevel.textContent = 'Please reset the game to change the level'
        alertLevel.style.color="red" 
        alertLevel.style.textAlign="center" 
    }
    else{
        gameLevel = level.textContent
        selectedLevel.textContent = "Level: " + gameLevel
        alertLevel.textContent=''
        closeDropDown()
    }    
})
})

cardsElement.forEach((card, index) => {
    card.src = "./img/card.png"
    card.alt = "card.png"


    card.addEventListener("click", () => {
        if(gameLevel === null){
            alertLevel.textContent = 'Please Select a Level'
            alertLevel.style.color="red" 
            alertLevel.style.textAlign="center" 
        }
        else{
            alertLevel.textContent=''
        //disable user from selecting the same card twice
        if(card1!==null && card.src===card1){
            return
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
            return
        }        
        setTimeout(() => {
            checkCards(),
            countWin()

        }, 700);

    }
    })

})




function checkCards(){
    //if cards matches
    if(card1 === card2){
        card1=null
        card2=null
        checkWinning[card1Index]= true
        checkWinning[card2Index]= true

    }
    //if user selects card1 only
    else if(card1!==null && card2===null){
        return
    }
    //if cards does not match
    else{
        card1=null
        card2=null
        cardsElement[card1Index].src="./img/card.png"
        cardsElement[card2Index].src="./img/card.png"
}
}

function countWin(){
    //if user didnt win yet
    if(checkWinning.includes("")){
        return
    }
    //if all cards are matched and the user did win
    else if (!(checkWinning.includes(false))) {
        winCount=winCount+1
        winsElement.textContent = winCount

        //stop timer
        clearInterval(timeInterval)
    }
    else{
        return
    }
}

function resetGame(){
    cardsElement.forEach((card)=>{
        card.src = "./img/card.png"
        card.alt = "card.png"
        card1=null
        card2=null
        card1Index=null
        card2Index=null
        checkWinning = ["", "", "", "", "", "", "", "", "", "", "", ""]
        dropdown()


    })
    shuffle(board)
    elapsedTime=0
    timeElement.textContent = "0 s"
    startTime=null
    clearInterval(timeInterval)
    
    gameLevel = null
    selectedLevel.textContent = "Level"
    
    setTimeout(() => {
        alertLevel.textContent = ''
    }, 700);
}

function timer(){
    elapsedTime = Math.floor((Date.now() - startTime) / 1000)
    timeElement.textContent = `${elapsedTime}s`
    if(elapsedTime > 50 && gameLevel==='Easy'){
        alertLevel.textContent = 'Time is up'
        alertLevel.style.color="red" 
        alertLevel.style.textAlign="center" 
        resetGame()
    }
    else if(elapsedTime >40&& gameLevel==='Hard'){
        alertLevel.textContent = 'Time is up'
        alertLevel.style.color="red" 
        alertLevel.style.textAlign="center" 
        resetGame()
    }
}

function dropdown(){
    document.querySelector("#myDropDown").classList.toggle("show")
}
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.querySelector(".dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  function closeDropDown(){
    var dropdowns = document.querySelectorAll(".dropdown-content");
    dropdowns.forEach((dropdown)=> {
        dropdown.classList.remove("show")
    })
  }

  function dropdownInstructions(){
    document.querySelector("#myDropDown1").classList.toggle("show")
}
