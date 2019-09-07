/* 10*2 combinations */
//https://cdn.jsdelivr.net/gh/bermarte/js-games/tmp/assets/js/images.json
let url = "https://cdn.jsdelivr.net/gh/bermarte/js-games/tmp/assets/js/url.json";
//let url = "http://localhost:63342/Js-games/git/js-games/tmp/assets/js/url.json";
console.log("begin");
fetch(url)
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        console.log(data);
        const gridItem = document.querySelectorAll(".grid-item");
        gridItem.forEach(function (element, index) {
            console.log(element,index);
            if (index < data.imgs.length){
                console.log(data.imgs[index].css);
                element.classList.add(data.imgs[index].css);
            }
            /*
            if ( data.gridItem[index].css == undefined ){
                console.log("got undefined");
            }

             */
            /*
            else{
            //console.log(data.imgs[index].css);
            //element.classList.add(data.imgs[index].css);
            }

             */
        })
    })

//clone.querySelector(".name").innerText = data.heroes[index-1].name;

