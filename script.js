const ruleBtn = document.getElementById("ruleButton");
const rulepop = document.getElementById("popup");
const closebtn = document.getElementById("close");
const ruleContainer = document.querySelectorAll(".rulegame.container");


const choiceButtons = document.querySelectorAll('.choice-btn');
const gameDiv = document.querySelector('.game');
const lin  = document.querySelector('.lines');
const resultsDiv = document.querySelector('.results');
const resDiv = document.querySelectorAll('.results_result');

const resultWinner = document.querySelector(".results_winner");
const resultText = document.querySelector(".results_text");

const playAgainBtn =document.querySelector('.play-again');
const nextBtn = document.getElementById('nextButton')

const cmpscore = document.querySelector('.score_number1')
const Myscore = document.querySelector('.score_number2')
let score1 = 0;
let score2 =0;

const choicesArr = [
    {
        name: "rock",
        beats: "scissors"
    },
    {  
        name: "scissors",
        beats: "paper"
    },
    {
        name: "paper",
        beats: "rock"
    },
];


window.addEventListener('DOMContentLoaded',() =>{
    const storedcmpScore = localStorage.getItem('cmp_score');
    if(storedcmpScore != null) {
        score1 =parseInt(storedcmpScore);
        cmpscore.innerText = score1;
    }

    const storedMyScore = localStorage.getItem('my_score');
    if(storedMyScore !=null){
        score2=parseInt(storedMyScore);
        Myscore.innerText= score2
    }
})

//game logic

choiceButtons.forEach( button =>{
    button.addEventListener('click',() =>{
        const choiceName = button.dataset.choice;
        const choice = choicesArr.find(choice => choice.name === choiceName)
       choose(choice)

    })
})

function  choose(choice) {
    const pcChoice =pc_choice()
    displayResults([choice, pcChoice])
    displayWinner([choice, pcChoice])
}
 function pc_choice(){
    const rand = Math.floor(Math.random()* choicesArr.length)
    return choicesArr[rand]
 }

 function displayResults (results){
    resDiv.forEach((resultsDiv,idx) => {
        setTimeout(() =>{
            resultsDiv.innerHTML = `
              <div class="choice ${results[idx].name}">
               <img src = "image/icon-${results[idx].name}.png" alt="${results[idx].name}" />
               </div>
            `

        },idx * 100 );
    });
    gameDiv.classList.toggle('hidden')

    resultsDiv.classList.toggle('hidden')
    lin.style.display="none";

 }
 function displayWinner(results){
    setTimeout(() => {
        const userwins= isWinner(results)
        const aiwins = isWinner(results.reverse())
        if(userwins){
            resultText.innerText = "You win! AGAINST PC";
            resDiv[0].classList.toggle('winner');
            keepMyScore(1);
            nextBtn.style.display = "flex";
            nextBtn.addEventListener('click',() => {
                nextBtn.classList.toggle('hidden');
            })    

         } else if(aiwins) {
            resultText.innerText = "You loose, AGAINST PC";
            resDiv[1].classList.toggle('winner');
            keepCmpScore1(1);
            nextBtn.style.display = "none";
         } else{
            resultText.innerText = "Tie up"
            playAgainBtn.innerHTML = "Replay";
            nextBtn.style.display = "none";
         }
         resultWinner.classList.toggle('hidden');
         resultsDiv.classList.toggle('show-winner');

    },1000);

 }

 function isWinner(results){
    return results[0].beats ===results[1].name
 }

function keepCmpScore1(point){
    score1 += point
    cmpscore.innerText =score1;
    localStorage.setItem('cmp_score',score1);
}
function keepMyScore(points){
    score2 += points;
    Myscore.innerText =score2;
    localStorage.setItem('my_score',score2)
}


 playAgainBtn.addEventListener('click',() => {
gameDiv.classList.toggle('hidden');
resultsDiv.classList.toggle('hidden');
nextBtn.style.display = "none";
lin.style.display="flex";

resDiv.forEach(resultDiv =>{
   resultDiv.innerHTML = ""
   resultDiv.classList.remove('winner')
})
resultText.innerText = "";
resultWinner.classList.toggle('hidden')
resultsDiv.classList.toggle('show-winner')
 })


//rule button  logic
ruleBtn.addEventListener("click", function(){
    rulepop.style.display = "flex";
   
});


closebtn.addEventListener("click", function(){
    
    rulepop.style.display = "none";
});
