const downloadCreatedGif = async (myGifId) => {
	let blob = await fetch(
		`https://media.giphy.com/media/${myGifId}/giphy.gif`
	).then((img) => img.blob());
	invokeSaveAsDialog(blob, 'My-Gif.gif');
};

const downloadGif = async (url, title) => {
	let blob = await fetch(url).then((img) => img.blob());
	invokeSaveAsDialog(blob, title + '.gif');
    console.log(this.src);
};

const expandGif = (url, username, title) => {
	console.log('expand');
    expandedGIFO__Section.classList.remove('hider');
	expandedGIFO__Section.classList.add('expanded-gifo-section');
	expandedGIFO__Section.innerHTML = '';
	expandedGIFO__Section.innerHTML = `
    <button class= "back-button buttonbackfor" onclick="backButton()"> <i class="buttoncitos fas fa-chevron-left"></i> </button>
    <div class="expanded-gifo-container">
        <div class="cross-container" onclick="unexpandGif()">
            <i class="buttoncitos fas fa-times"></i>
        </div>

        <div class="gif-container">
            <img class="the-gif" src="${url}" alt="${title}">
        </div>

        <div class="gif-options-container">
            <div class="gif-expand-info">
                <p class="gif-user">${username}</p>
                <p class="gif-title">${title}</p>
            </div>
            <div class="gif-expand-buttons">
                <div class="buttonsMax favoriteMax" onclick="favoritearGif('${url}', '${username}', '${title}')">
                    <i class="far fa-heart"></i>
                </div>
                <div class="buttonsMax downloadMax" onclick="downloadGif('${url}','${title}')">
                    <i class="fas fa-download"></i>
                </div>
            </div>
        </div>
    </div>
    <button class= "forward-button buttonbackfor" onclick="forwardButtonExpandedGifo()"> <i class="buttoncitos fas fa-chevron-right"></i> </button>`;
	body.appendChild(expandedGIFO__Section);
};

const unexpandGif = () => {
    console.log('unexpand');
    expandedGIFO__Section.classList.add('hider');
    expandedGIFO__Section.classList.remove('expanded-gifo-section');

}

const favoritearGif = (url, username, title, id) => {
    let new_favorito = {
        'title': title,
        'user': username,
        'url': url,
        'id': id
    }
    
    if (!localStorage.getItem('favoritos') || localStorage.getItem('favoritos') == '[]') {
        console.log('puerta 1');
        let old_favorito_array = [];
        old_favorito_array.push(new_favorito);
        localStorage.setItem('favoritos', JSON.stringify(old_favorito_array));          
    } else {
        console.log('puerta 2');
        let old_favorito_array = JSON.parse(localStorage.getItem('favoritos'));
        let new_favorito_array = [];
        for (let i = 0; i < old_favorito_array.length; i++) { 
            if (old_favorito_array[i].id != new_favorito.id) {
                console.log('puerta 3 ' + i);
                new_favorito_array.push(old_favorito_array[i]);
            }
        }
        new_favorito_array.push(new_favorito)
        localStorage.setItem('favoritos', JSON.stringify(new_favorito_array));
    }
    displayFavoritos();
}

const unfavoritearGif = (url, username, title) => {
    
    let unFavoritos = JSON.parse(localStorage.getItem('favoritos'));
    let outUnFavoritos = [];
    console.log(unFavoritos[0].url);
    console.log(url, username, title);
    for(let i=0; i < unFavoritos.length; i++) {
        if (unFavoritos[i].url != url) {
            outUnFavoritos.push(unFavoritos[i]);
            console.log('working');
        }

    }

    localStorage.setItem('favoritos', JSON.stringify(outUnFavoritos));
    if (!sectionFavoritos.classList.contains('hider')) {
        displayFavoritos();    
    }
}

const deleteMyGIFO = async (id) => {
    let idList = JSON.parse(localStorage.getItem('idList'));
    let newIdList = [];
    for (let i = 0; i < idList.length; i++) {
        if (idList[i] != id) {
            newIdList.push(idList[i]);
        }
    }
    localStorage.setItem('idList', JSON.stringify(newIdList));
    if (localStorage.getItem('idList')) {
        if (localStorage.getItem('idList') != '[]') {
            await getCreatedGIFO();
            
        }    
    }
    displayMisGifos();
}

const backButton = () => {
    if (trending_offset_count > 0) {
        trending_offset_count -=1;
        trendingEngine();
    }
    console.log(trending_offset_count);  
}


const forwardButton = () => {
    console.log('forward');
    trending_offset_count += 1;
    trendingEngine();
    console.log(trending_offset_count);
}

const forwardButtonExpandedGifo = () => {
    trending_offset_count += 1;
    console.log(trending_offset_count);
}
