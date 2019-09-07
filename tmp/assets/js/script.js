/* 10*2 combinations */
//https://cdn.jsdelivr.net/gh/bermarte/js-games/tmp/assets/js/images.json
let url = "https://cdn.jsdelivr.net/gh/bermarte/js-games/tmp/assets/js/url.json";
fetch(url)
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        console.log(data);
        document.querySelectorAll(".grid-item")[0].classList.add(data.imgs[0].css);
        /*
        document.querySelectorAll(".grid-item")[0].style.background = "url("+data.imgs[0].url+")";
        document.querySelectorAll(".grid-item")[0].style.backgroundSize = "contain";
        document.querySelectorAll(".grid-item")[0].style.backgroundRepeat = "no-repeat";
         */
    })
//clone.querySelector(".name").innerText = data.heroes[index-1].name;

