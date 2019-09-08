
//let url = "https://cdn.jsdelivr.net/gh/bermarte/js-games/tmp/assets/js/url.json";
const url = "http://localhost:63342/Js-games/git/js-games/tmp/assets/js/url.json";
const n_items = 10;
let lives = 8;
let points = 0;
fetch(url)
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        const gridItem = document.querySelectorAll(".grid-item");
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
                json_css = data.imgs[new_seq[index]].css
                element.classList.add(json_css);
                element.setAttribute('data-img', json_css);
                element.addEventListener("click",  function myclick() {
                    //console.log(this.getAttribute('data-img'));
                    check(this.getAttribute('data-img'),element, myclick );
                    console.log("function");
                    this.removeEventListener("click", myclick);

                });
        })

    })

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
function check(attr, el, fun){
    console.log("current:", attr);
    play.push(attr);

    if (play.length > 1)
    if (play[play.length - 2] == attr){

        console.log("previous:", play[play.length - 2]);
        console.log("same");
        points++;
        console.log("event", el);

        sel = document.querySelectorAll("."+attr);

        if (points == n_items){
            console.log("you win");
        }
        console.log(points);

    }
    else{

        console.log("previous:", play[play.length - 2]);
        console.log("different");
        //add event listener back
        lives--;
        if (lives == 0){
            console.log("game over");
        }
        console.log(lives);
    }
    console.log(play);
    if (play.length == 2) clear(play);
}
function clear(arr){
    arr.length = 0;
}
