
//let url = "https://cdn.jsdelivr.net/gh/bermarte/js-games/tmp/assets/js/url.json";
const url = "http://localhost:63342/Js-games/git/js-games/tmp/assets/js/url.json";
const n_items = 10;
let lives = 8;
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

        gridItem.forEach( (element, index) => {
                json_css = data.imgs[new_seq[index]].css;
                element.classList.add(json_css);
                element.setAttribute('data-img', json_css);
                element.addEventListener("click",  function myclick() {
                    console.log("this", this);
                    this.removeEventListener("click", myclick);

                    check(this.getAttribute('data-img'), this, this.id, myclick );

                });
        })

    });

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

    //let sel = document.querySelectorAll("."+attr);

    if (play.length > 1)
    if (play[play.length - 2] === attr){

        console.log("previous:", play[play.length - 2]);
        console.log("same");
        console.log("play", play[play.length - 2])

        points++;
        document.getElementById("points").textContent = points;

        play[play.length - 2]
        console.log("attr",attr);

        //console.log("sel", sel);

        if (points === n_items){
            console.log("you win")
            document.querySelector("#message p").textContent = "you win";
        }
        console.log("points:", points);

    }
    else{

        console.log("previous:", play[play.length - 2]);
        console.log("different");

        //add event listener back if the two are not equal
        document.getElementById(play_id[0]).addEventListener("click",fun);
        document.getElementById(play_id[1]).addEventListener("click", fun);

        lives--;
        document.getElementById("lives").textContent = lives;

        if (lives === 0){
            console.log("game over");
            document.querySelector("#message p").textContent = "game over";

            gridItem.forEach( (element) => {
                //console.log('hi', element.id);
                document.getElementById(element.id).removeEventListener("click", fun);
                //element.removeListener("click", fun);
            });


        }
        console.log("lives:",lives);
    }
    console.log(play);
    //empty arrays once each couple is chosen
    if (play.length === 2) clear(play);
    if (play_id.length === 2) clear(play_id);
}
function clear(arr){
    arr.length = 0;
}


