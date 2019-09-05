//setInterval(function(){ console.log("Hello"); }, 1000);
let btns = document.querySelectorAll(".btn");

combs = [];
points_pc = 0;
points_you = 0;
btns.forEach(function (element, human) {
    slot = element.getAttribute("data-game-slot");
    combs.push(slot);
    element.addEventListener("click", function () {
        console.log("you: " + element.getAttribute("data-game-slot") + " " + human);
        //change imgs here
        pc = Math.floor(Math.random() * 3);
        console.log("pc: " + combs[pc] + " " + pc);
        console.log(check(human, pc));
    });
});
function check(a,b){
    if (a == b){
        return "equal";
    }
    if ((a == 0 && b == 1) || (a == 1 && b == 2) || (a == 2 && b == 0)){
        points_you++;
        console.log("you: "+points_you);
        return "you win";
    }
    else{
        points_pc++;
        console.log("pc: "+points_pc);
        return "you loose";
    }
}