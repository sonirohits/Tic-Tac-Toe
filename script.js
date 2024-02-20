const boxes =document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn =document.querySelector(".btn");
let currentPlayer ;
let gameGrid;
const winningPosition =[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]

//lets create a function to inintalize the game

function initGame(){
    //initalize boxes with the inital pos
    boxes.forEach(function(box,index){
        box.innerHTML ="";
        boxes[index].style.pointerEvents ="all";
        box.classList =`box box${index+1}`;
    });
    currentPlayer ="X";
    gameGrid =["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    //UI pe boxex  ko empty karna padga
    gameInfo.innerHTML = `Current Player -${currentPlayer}`;
}
initGame();

function checkGameOver(){
let  answer;
  winningPosition.forEach(function(position){
if(( gameGrid[position[0]] !="" || gameGrid[position[1]] !="" || gameGrid[position[2]]!= "") &&(gameGrid[position[1]] == gameGrid[position[0]]) &&(gameGrid[position[2]]==gameGrid[position[0]]) ){
    console.log("Winner Mill Gaya");
    if(gameGrid[position[0]]=="X"){
        answer = "X";
        
    }
    else{
        answer ="O";
    }
    boxes.forEach(function(box){
        box.style.pointerEvents ="none";
    })
    
    boxes[position[0]].classList.add("win");
    boxes[position[1]].classList.add("win");
    boxes[position[2]].classList.add("win");
}
  });
 
  if(answer !== ""){
    gameInfo.innerText =`Winner-Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }
   
  //when there in no  winner
  var filled_cnt =0;
   gameGrid.forEach(function(index){{
      gameGrid[index] !="";
      filled_cnt++;
   }});
   if(filled_cnt == 9){
    gameInfo.innerText = "Game Tied";
    newGameBtn.classList.add("active");
   }

}

function  handleClick(index){
if(gameGrid[index]==""){
    let previousPlayer ;
    boxes[index].innerHTML = currentPlayer;
    gameGrid[index]=currentPlayer;
    boxes[index].style.pointerEvents ="none";
    // Y logic to tere bhai ne likah he
   checkGameOver();
    if(currentPlayer=="X"){
        previousPlayer="X";
        currentPlayer="O";
    }
    else{
        previousPlayer="O";
        currentPlayer="X";
    }
    gameInfo.innerHTML =`Current Player - ${currentPlayer}`;

}
}
boxes.forEach(function(box,index){
    console.log(index);
   box.addEventListener('click',function(){
   handleClick(index);
   });
});

newGameBtn.addEventListener("click",initGame);