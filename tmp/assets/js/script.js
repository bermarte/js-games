/* 10*2 combinations */
//https://cdn.jsdelivr.net/gh/bermarte/js-games/tmp/assets/js/images.json
let url = "https://cdn.jsdelivr.net/gh/bermarte/js-games/tmp/assets/js/urls.json";
fetch(url)
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        console.log(data);
    })