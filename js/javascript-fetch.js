const searchForm = document.querySelector("#search-form");
const movie = document.querySelector("#movie");
const urlPoster = "http://image.tmdb.org/t/p/w300";


function apiSearch(event) {
    event.preventDefault();  
    const searchText = document.querySelector(".form-control").value;

    if(searchText.trim().length === 0){
        movie.innerHTML = '<H2 class="col-12 text-center text-danger">must not empty</H2>';
        return
    }

    const server = "https://api.themoviedb.org/3/search/multi?api_key=6826fcad0fcb8f2c2a3501859daae5a7&language=en-US&query=" + searchText;
    movie.innerHTML = '<div class="spiner"></div>'; 
    
    
    fetch(server).then(function(value){
                    if(value.status !== 200){
                    return Promise.reject(value);
                     }
                     return value.json();
                     })
                 .then(function(output){        
                    let inner = "";
                    if(output.results.length === 0){
                        inner = '<H2 class="col-12 text-center text-danger">not found</H2>';
                    }
                     output.results.forEach (function(item) {
                       
                    let nameItem = item.name || item.title;
                    const poster = item.poster_path ? urlPoster + item.poster_path : "./img/no-poster.jpg";
                    let dataInfo = "";
                    if (item.media_type !== "person") dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`

                      inner += `

                      
                      <div class="col-12 col-md-6 col-x1-3 item">
                      <img src="${poster}" class="img_poster" alt="${nameItem}" ${dataInfo}>
                      <H5 class="text-center">${nameItem}</H5>
                      
                      </div>
                      
                      `;
                      });
                      movie.innerHTML = inner;

                      addEventMedia();

                 })
                 .catch(function(reason){
                     movie.innerHTML = "sorry, not found";
                    console.error("error" + reason.status);
                });            
}
searchForm.addEventListener("submit", apiSearch);

function addEventMedia(){
    const media = movie.querySelectorAll("img[data-id]");
    media.forEach(function (elem){
    elem.style.cursor = "pointer";
    elem.addEventListener("click", showFullInfo);
    })
}

function showFullInfo(){
    
    let url = '';
    if(this.dataset.type === 'movie'){
        url = 'https://api.themoviedb.org/3/movie/' + this.dataset.id + '?api_key=6826fcad0fcb8f2c2a3501859daae5a7&language=en-US'
    }else if (this.dataset.type === 'tv'){
        url = 'https://api.themoviedb.org/3/tv/' + this.dataset.id + '?api_key=6826fcad0fcb8f2c2a3501859daae5a7&language=en-US'
    }else {
        movie.innerHTML = '<H2 class="col-12 text-center text-danger">try again</H2>'
    }
    fetch(url).then(function(value){
        if(value.status !== 200){
        return Promise.reject(value);
         }
         return value.json();
         })
     .then(function(output){        
        console.log(output);
        movie.innerHTML = `
        <H4 class="col-12" text-center text-info>${output.name || output.title}</H4>
        <div class="col-4">
        <img src='${urlPoster + output.poster_path}' alt="${output.name || output.title}">
        ${(output.homepage) ? `<p class="text-center"><a href="${output.homepage}" target="_blank">off site</a></p>` : ''}
        ${(output.homepage) ? `<p class="text-center"><a href="https://imdb.com/title/${output.imdb_id}" target="_blank">IMDB</a></p>` : ''}
        </div>
        <div class="col-8">
        <p>Rating: ${output.vote_average}</p>
        <p>Status: ${output.status}</p>
        <p>Realese: ${output.first_air_date || output.release_date}</p>
        <p>Status: ${output.overview}</p>




        </div>
        `;
     })
     .catch(function(reason){
         movie.innerHTML = "sorry, not found";
        console.error("error" + reason.status);
    });            
}




// trendi nedeli dnja i tak dalee

document.addEventListener("DOMContentLoaded", function(){
   // console.log("ura loaded");
    fetch('https://api.themoviedb.org/3/trending/all/week?api_key=6826fcad0fcb8f2c2a3501859daae5a7').then(function(value){
        if(value.status !== 200){
        return Promise.reject(value);
         }
         return value.json();
         })
     .then(function(output){        
        let inner = '<H2 class="col-12 text-center text-danger">Week TRENDS</H2>';
        if(output.results.length === 0){
            inner = '<H2 class="col-12 text-center text-danger">not found</H2>';
        }
         output.results.forEach (function(item) {
         let  mediaType = item.title ? 'movie' : 'tv';  
        let nameItem = item.name || item.title;
        const poster = item.poster_path ? urlPoster + item.poster_path : "./img/no-poster.jpg";
        let dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;

          inner += `

          
          <div class="col-12 col-md-6 col-x1-3 item">
          <img src="${poster}" class="img_poster" alt="${nameItem}" ${dataInfo}>
          <H5 class="text-center">${nameItem}</H5>
          
          </div>
          
          `;
          });
          movie.innerHTML = inner;

          addEventMedia();

     })
     .catch(function(reason){
         movie.innerHTML = "sorry, not found";
        console.error("error" + reason.status);
    });            

});