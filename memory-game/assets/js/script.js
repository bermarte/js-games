
let url = "https://cdn.jsdelivr.net/gh/bermarte/js-games/memory-game/assets/js/url.json";
//const url = "http://localhost:63342/Js-games/git/js-games/tmp/assets/js/url.json";
const n_items = 10;
let lives = 14;
let points = 0;
const gridItem = document.querySelectorAll(".grid-item");

fetch(url)
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        //all the combinations
        tot_combs = Array.from({length: data.imgs.length}, (v, i) => i);
        //first n items row
        seq_0 = randomSequence(tot_combs, n_items);
        seq = seq_0.concat();
        //second n items row
        seq = randomSequence(seq_0, n_items).concat(seq);
        //first plus second
        new_seq = randomSequence(seq, n_items*2);
        console.log("sequence",new_seq);

        //add an image and an event to each card
        gridItem.forEach( (element, index) => {
                json_css = data.imgs[new_seq[index]].css;
                element.classList.add(json_css);
                element.setAttribute('data-img', json_css);
                element.addEventListener("click",  function myclick() {
                    console.log("this", this);
                    this.removeEventListener("click", myclick);
                    this.classList.remove("cover");

                    check(this.getAttribute('data-img'), this, this.id, myclick );

                });
        })

    });
//create a random sequence of cards without repetitions
function randomSequence(array, num) {
    new_arr = [];
    while (num--) {
        ran_num = Math.floor(Math.random() * array.length);
        arr_single = array.splice(ran_num, 1);
        new_arr.push(arr_single[0]);
    }
    return(new_arr);
}

play = [];
play_id = [];
function check(attr, div, id, fun){
    console.log("current:", attr);
    play.push(attr);
    play_id.push(id);

    let coupleFound;

    if (play.length > 1)
    //found couple
    if (play[play.length - 2] === attr){

        console.log("previous:", play[play.length - 2]);
        console.log("same");
        console.log("play", play[play.length - 2])

        points++;
        coupleFound = true;

        document.getElementById("points").textContent = points;
        console.log("attr",attr);

        //you win
        if (points === n_items){
            console.log("you win");
            document.querySelector("#message").classList.add("animate-message");
            document.querySelector("#message p").textContent = "you win";
            document.querySelector("#message p").classList.add("animate-message-p");
            stop();
        }
        console.log("points:", points);
    }
    //wrong couple
    else{

        console.log("previous:", play[play.length - 2]);
        console.log("different");

        //add event listener back if the two cards selected are not equal
        document.getElementById(play_id[0]).addEventListener("click",fun);
        document.getElementById(play_id[1]).addEventListener("click", fun);

        lives--;
        coupleFound = false;
        document.getElementById("lives").textContent = lives;

        //you loose
        if (lives === 0){
            console.log("game over");
            document.querySelector("#message").classList.add("animate-message");
            document.querySelector("#message p").textContent = "game over";
            document.querySelector("#message p").classList.add("animate-message-p");
            stop();
            showAll();
        }
        console.log("lives:",lives);
    }
    console.log(play);
    //empty arrays once each couple is made, be ready for the next step
    if (play.length === 2) {
        clear(play, play_id, coupleFound);
    }

}
async function clear(arr, arr2, bool){
    //empty arrays of cards and ids
    el_1 = arr2[0];
    el_2 = arr2[1];
    arr.length = 0;
    arr2.length = 0;
    //add covers if the game is not finished and if the player didn't find a couple
    if (lives > 0 && bool===false){
        await delay(800);
        document.getElementById(el_1).classList.add("cover");
        document.getElementById(el_2).classList.add("cover");
    }
}
//disable all the events once the game is finished
function stop(){
    gridItem.forEach(element =>
        element.classList.add("disable")
    );
}
const delay = ms => new Promise(res => setTimeout(res, ms));
//show all combinations once the game ends
function showAll(){
    gridItem.forEach(element =>
        element.classList.remove("cover")
    );
}