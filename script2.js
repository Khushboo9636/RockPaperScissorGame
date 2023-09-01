const ruleBtn = document.getElementById("ruleButton");
const rulepop = document.getElementById("popup");
const closebtn = document.getElementById("close");
const ruleContainer = document.querySelectorAll(".rulegame.container");

ruleBtn.addEventListener("click", function(){
    rulepop.style.display = "flex";
   
});


closebtn.addEventListener("click", function(){
    
    rulepop.style.display = "none";
});
