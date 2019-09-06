const btns = document.querySelectorAll(".btn");

let combs = [];
let points_pc = 0;
let points_you = 0;

btns.forEach(function (element, human) {
    let slot = element.getAttribute("data-game-slot");
    combs.push(slot);

    element.addEventListener("click", function () {
        slot = element.getAttribute("data-game-slot");
        console.log("you: " + slot + " " + human);
        clearClasses(".img-player", combs);
        document.querySelector(".img-player").classList.add(combs[human]);
        let pc = Math.floor(Math.random() * 3);
        clearClasses(".img-pc", combs);
        document.querySelector(".img-pc").classList.add(combs[pc]);
        console.log("pc: " + combs[pc] + " " + pc);
        console.log(check(human, pc));

        function clearClasses(myClass, arr) {
            for (let i = 0, len = arr.length; i < len; i++) {
                document.querySelector(myClass).classList.remove(arr[i]);
            }
        }

    });
});

function check(a, b) {
    if (a == b) {
        message = "equal";
        updateResults(".partial", message);
        updateResults(".total", "");
        return message;
    }
    if ((a == 0 && b == 1) || (a == 1 && b == 2) || (a == 2 && b == 0)) {
        points_you++;
        message = "you win";
        console.log("you: " + points_you);
        updateResults(".partial", message);
        updateResults(".total", "you: " + points_you);
        return message;
    } else {
        points_pc++;
        message = "you loose";
        console.log("pc: " + points_pc);
        updateResults(".partial", message);
        updateResults(".total", "pc: " + points_pc);
        return message;
    }
}

function updateResults(selector, message) {
    document.querySelector(selector).innerHTML = message;
}