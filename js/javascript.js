const searchForm = document.querySelector("#search-form");
const movie = document.querySelector("#movie");

function apiSearch(event) {
    event.preventDefault(); ///  ostanovit obnovlenie 
    const searchText = document.querySelector(".form-control").value,
        server = "https://api.themoviedb.org/3/search/multi?api_key=6826fcad0fcb8f2c2a3501859daae5a7&language=en-US&query=" + searchText;
    requestApi(server).then(function (result) {
            const output = JSON.parse(result);
            let inner = "";
            output.results.forEach(function (item) {
                let nameItem = item.name || item.title;
                inner += `<div class="col-12 col-md-4 col-x1-3">${nameItem}</div>`;

            })

            movie.innerHTML = inner;
        })
        .catch(function (reason) {
            movie.innerHTML = "sorry, not found";
            console.log("error" + reason.status);
        });
}

searchForm.addEventListener("submit", apiSearch);
// zapros na server
function requestApi(url) {

    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.open("GET", url);
        request.addEventListener("load", function () {
            if (request.status !== 200) {
                reject({
                    status: request.status
                });
                return;
            }

            resolve(request.response);
        });
        request.addEventListener("error", function () {
            reject({
                status: request.status
            });
        });
        request.send();
    })

}