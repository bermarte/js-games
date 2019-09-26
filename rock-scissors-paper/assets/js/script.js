const btns = document.querySelectorAll(".btn");

let combs = [];
let points_pc = 0;
let points_you = 0;
const MAX_CHOICES = 3;

btns.forEach(function (element, human) {
    let slot = element.getAttribute("data-game-slot");
    combs.push(slot);
    /*
    combs[0] rock
    combs[1] scissors
    combs[2] paper
    */
    element.addEventListener("click", function () {

        console.log("you:", slot, human);
        clearClasses(".img-player", combs);
        document.querySelector(".img-player").classList.add(combs[human]);
        let pc = Math.floor(Math.random() * MAX_CHOICES);
        clearClasses(".img-pc", combs);
        document.querySelector(".img-pc").classList.add(combs[pc]);
        console.log("pc:", combs[pc], pc);
        let res = check(human, pc);
        console.log(res);

        function clearClasses(myClass, arr) {
            for (let i = 0, len = arr.length; i < len; i++) {
                document.querySelector(myClass).classList.remove(arr[i]);
            }
        }

    });
});

function check(human, pc) {

    const ROCK = 0;
    const SCISSORS = 1;
    const PAPER = 2;

    if (human === pc) {
        message = "tie";
        updateResults(".partial", message);
        updateResults(".total", "");
        return message;
    }
    if ((human === ROCK && pc === SCISSORS) || (human === SCISSORS && pc === PAPER) || (human === PAPER && pc === ROCK)) {
        points_you++;
        message = "you win";
        console.log("you:", points_you);
        updateResults(".partial", message);
        updateResults(".total", "you: " + points_you);
        return message;
    } else {
        points_pc++;
        message = "you loose";
        console.log("pc:", points_pc);
        updateResults(".partial", message);
        updateResults(".total", "pc: " + points_pc);
        return message;
    }
}

function updateResults(selector, message) {
    document.querySelector(selector).innerHTML = message;
}