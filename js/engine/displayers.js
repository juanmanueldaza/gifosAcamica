async function displayTrendingTerms() {
    for (let i = 0; i < spanTermDisplayers.length; i++) {
        spanTermDisplayers[i].innerText = capitalizeFirstLetter(trendingTermGifosResponse.data[i]);

        spanTermDisplayers[i].onclick = async () => {
            search = trendingTermGifosResponse.data[i];
            cleanSearchDisplay();
            await searchGifos(search);
            displayGifosSearch(searchGifosResponse);
        }
    };

}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


async function displayTrendingGifos(trendingGifosResponse) {
    trending_gifos_sub_container.innerHTML = '';
    for (let i = 0; i < trendingGifosResponse.data.length; i++) {
        let trendingGifosDisplayer = document.createElement('div');
        trendingGifosDisplayer.classList.add('trending-gifos-displayer-container');
        trendingGifosDisplayer.innerHTML = `
                <img src="${trendingGifosResponse.data[i].images.original.url}" alt="gifo-1">
                <div class="gif-overlay">
                    <div class="gif-buttons-container">
                        <div class="gif-button" onclick="favoritearGif('${trendingGifosResponse.data[i].images.original.url}', '${trendingGifosResponse.data[i].username}', '${trendingGifosResponse.data[i].title}', '${trendingGifosResponse.data[i].id}')">
                            <i class="far fa-heart"></i>
                        </div>
                        <a class="gif-button" src="" onclick="downloadGif('${trendingGifosResponse.data[i].images.original.url}', '${trendingGifosResponse.data[i].title}')">
                            <i class="fas fa-download"></i>
                        </a>
                        <div class="gif-button" onclick="expandGif('${trendingGifosResponse.data[i].images.original.url}', '${trendingGifosResponse.data[i].username}', '${trendingGifosResponse.data[i].title}')">
                            <i class="fas fa-expand-alt"></i>
                        </div>
                    </div>
                    <div class="gif-title-container">
                        <p class="gif-user">${trendingGifosResponse.data[i].username}</p>
                        <p class="gif-title">${trendingGifosResponse.data[i].title}</p>
                    </div>
                </div>
        `;
        trending_gifos_sub_container.append(trendingGifosDisplayer);
    }  
}
async function displayGifosSearch(searchGifosResponse) {
    try {
        search_results_title.innerText = capitalizeFirstLetter(search);
        search_results_block.classList.remove('hider');
        clearAutocomplete();
        if (searchGifosResponse.data.length < 12 )  {
            search_offset_button.classList.add('hider');
        }
        for (let i = 0; i < searchGifosResponse.data.length; i++) {
            let search_displayer_div = document.createElement('div');
            search_displayer_div.classList.add('gif-displayer');
            search_displayer_div.innerHTML = `
            <img class="gif" src="${searchGifosResponse.data[i].images.original.url}" alt="">
                <div class="overlay">
                    <div class="button-container">
                        <div class="buttons-gif fav-button"onclick="favoritearGif('${searchGifosResponse.data[i].images.original.url}', '${searchGifosResponse.data[i].username}', '${searchGifosResponse.data[i].title}', '${searchGifosResponse.data[i].id}')">
                            <i class="far fa-heart"></i>
                        </div>
                        <a class="buttons-gif download-button" onclick="downloadGif('${searchGifosResponse.data[i].images.original.url}', '${searchGifosResponse.data[i].title}')">
                            <i class="fas fa-download"></i>
                        </a>
                        <div class="buttons-gif expand-button"onclick="expandGif('${searchGifosResponse.data[i].images.original.url}', '${searchGifosResponse.data[i].username}', '${searchGifosResponse.data[i].title}')">
                            <i class="fas fa-expand-alt"></i>
                        </div>
                    </div>
                    <div class="info-container">
                        <p class="gif-username">${searchGifosResponse.data[i].username}</p>
                        <p class="gif-title">${searchGifosResponse.data[i].title}</p>
                    </div>
                </div>`;
            search_results_container.appendChild(search_displayer_div);
            
        }
    } catch (error) {
        clearAutocomplete();
        displayNotFound();
    }
}
async function displayAutocomplete(){
    try {
        autocomplete_container.classList.remove('hider');
        for (let i = 0; i < autocomplete_displayers.length; i++) {
            autocomplete_displayers[i].innerText = await giphy_autocomplete.data[i].name;
        }
        search_bar.style.flexDirection = 'row-reverse';
        search_cross.classList.remove('hider');
    } catch (error) {
        clearAutocomplete();
        for (let i = 0; i < autocomplete_displayers.length; i++) {
            autocomplete_displayers[i].innerText = '';
        }     
    }
}
async function clearAutocomplete() {
    search_bar.style.flexDirection = 'row';
    search_cross.classList.add('hider');
    autocomplete_container.classList.add('hider');
    
    for (let i = 0; i < autocomplete_displayers.length; i++) {
        autocomplete_displayers[i].innerText = '';
    }
} 
async function displayNotFound() {
    no_results.classList.remove('hider');
    search_results_container.classList.add('hider');
    see_more_button.classList.add('hider');
}
async function displayFavoritos() {
    favoritos_grid.innerHTML = '';
    if (favoritos_offset_count < 10) {
        favoritos_grid.innerHTML = '';
    } 
    
    fontawesome_menu_bars.classList.toggle('hider');
    fontawesome_menu_times.classList.toggle('hider');
    if (!localStorage.getItem('favoritos') || localStorage.getItem('favoritos') == '[]') {
        sectionFavoritos.innerHTML=`
            <div class="favoritos-title-container">
                <img src="assets/icon-favoritos.svg" alt="ligth-blue-heart">
                <p class="favoritos-title"> Favoritos </p>
            </div>
            <div class="empty-favoritos-container">
                <img src="assets/icon-fav-sin-contenido.svg" alt="a heart that's not happy">
                <p class="empty-favoritos-description"> "¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!" </p>
            </div>`
    } else {
        let getFavoritos = JSON.parse(localStorage.getItem('favoritos'));
        
        let i = 0;
        for (i = 0; i < getFavoritos.length; i++) {
            if (i >= favoritos_offset_count) {
                break;
            }
            let favo_displayer = document.createElement('div');
            favo_displayer.classList.add('gif-displayer');
            favo_displayer.innerHTML =
                `<img class="gif" src="${getFavoritos[i].url}" alt="">
                <div class="overlay">
                    <div class="button-container" onclick="unfavoritearGif('${getFavoritos[i].url}', '${getFavoritos[i].user}', '${getFavoritos[i].title}')">
                        <div class="buttons-gif fav-button">
                            <i class="fas fa-heart-broken"></i>
                        </div>
                        <a class="buttons-gif download-button" onclick="downloadGif('${getFavoritos[i].url}', '${getFavoritos[i].title}')">
                            <i class="fas fa-download"></i>
                        </a>
                        <div class="buttons-gif expand-button"onclick="expandGif('${getFavoritos[i].url}', '${getFavoritos[i].user}', '${getFavoritos[i].title}')">
                            <i class="fas fa-expand-alt"></i>
                        </div>
                    </div>
                    <div class="info-container">
                        <p class="gif-username">${getFavoritos[i].user}</p>
                        <p class="gif-title">${getFavoritos[i].title}</p>
                    </div>
                </div>`
            favoritos_grid.append(favo_displayer);                   
        }
        if ( i < getFavoritos.length) {
            see_more_favoritos_button.classList.remove('hider');
            console.log('afuera');
        } else {
            see_more_favoritos_button.classList.add('hider');
        }

    }
}
function cleanSearchDisplay() {
    document.getElementById('search-results-container').innerHTML = '';
    search_results_title.innerText = '';
    search_input.value = '';
    
}
async function displayMisGifos() {
    if (misGifos_offset_count < 10) {
        misGifos__Grid.innerHTML = '';
    } 
    
    if (localStorage.getItem('idList') == '[]' || !localStorage.getItem('idList')) {
        console.log("no che");
        sectionMisGifos.innerHTML=`
            <div class="mis-gifos-title-container">
                <img src="assets/icon-mis-gifos.svg" alt="happy-face">
                <p class="mis-gifos-title"> Mis GIFOS </p>
            </div>
            <div class="empty-favoritos-container">
                <img src="assets/icon-mis-gifos-sin-contenido.svg" alt="a heart that's not happy">
                <p class="empty-favoritos-description"> "¡Anímate a crear tu primer GIFO!" </p>
            </div>`
    } else {
        let i = 0;
        for (i = 0; i < createdGIFOSResponse.data.length; i++) {
            let misGifos__Displayer = document.createElement('div');
            misGifos__Displayer.classList.add('gif-displayer');           
            let url = createdGIFOSResponse.data[i].images.original.url;
            let title = createdGIFOSResponse.data[i].title;
            let username = createdGIFOSResponse.data[i].username;
            let GIFOid = createdGIFOSResponse.data[i].id;
            misGifos__Displayer.innerHTML =
                `<img class="gif" src="${url}" alt="">
                <div class="overlay">
                    <div class="button-container">
                        <div class="buttons-gif fav-button"onclick="deleteMyGIFO('${GIFOid}')">
                            <i class="far fa-trash-alt"></i>
                        </div>
                        <a class="buttons-gif download-button" onclick="downloadGif('${url}', '${title}')">
                            <i class="fas fa-download"></i>
                        </a>
                        <div class="buttons-gif expand-button" onclick="expandGif('${url}', '${username}', '${title}')">
                            <i class="fas fa-expand-alt"></i>
                        </div>
                    </div>
                    <div class="info-container">
                        <p class="gif-username">${username}</p>
                        <p class="gif-title">${title}</p>
                    </div>
                </div>`;
            misGifos__Grid.append(misGifos__Displayer);   
        }
        if ( i < createdGIFOSResponse.data.length) {
            misGifos_offset_button.classList.add('hider');
            console.log('afuera');
        }
    } 
}