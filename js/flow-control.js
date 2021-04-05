// Loads and displays Trending GIFOS
async function trendingEngine() {
    await searchTrendingGifos();
    displayTrendingGifos(trendingGifosResponse);
    await getTrendingTerms();
    displayTrendingTerms();
}
//Loads and displays Searched GIFOS
async function searchEngine() {
    await searchGifos(search_input.value);
    displayGifosSearch(searchGifosResponse);
}

search_input.oninput = async () => {
    try {
        search = search_input.value;
        await autocompleteSearch(search);  
    } catch (error) {
        console.log("error")
    } 
}
search_input.onkeydown = async (event) => {
    try {
        if (event.key === "Enter") {
            event.preventDefault();
            cleanSearchDisplay();
            searchEngine();
        }
        
    } catch (error) {
        console.log(error instanceof TypeError)  // true
        console.log(error.message);               // "null has no properties"
        console.log(error.name);                  // "TypeError"
        console.log(error.fileName);              // "Scratchpad/1"
        console.log(error.lineNumber);            // 2
        console.log(error.columnNumber);          // 2
        console.log(error.stack);                 // "@Scratchpad/2:2:3\n"
        console.log("todo mal");
    }   
}
search_input_header.onkeydown = async (event) => {
    try {
        if (event.key === "Enter") {
            event.preventDefault();
            cleanSearchDisplay();
            await searchGifosFromHeader(search_input_header.value);
        }
        
    } catch (error) {
        console.log(error instanceof TypeError)  // true
        console.log(error.message);               // "null has no properties"
        console.log(error.name);                  // "TypeError"
        console.log(error.fileName);              // "Scratchpad/1"
        console.log(error.lineNumber);            // 2
        console.log(error.columnNumber);          // 2
        console.log(error.stack);                 // "@Scratchpad/2:2:3\n"
        console.log("todo mal");
    }   
}
// SEARCH GIFOS CLICKING ON THE MAGNIFYING GLASS
search_button.onclick = async () => {
    cleanSearchDisplay();
    searchEngine();
}
search_cross.onclick = () => {
    clearAutocomplete();
    cleanSearchDisplay();
    search_input.value = '';
    search_results_block.classList.add('hider');
}
//MORE GIFOS
search_offset_button.addEventListener('click', () => {
    console.log('working on it');
    search_offset_count += 12;
    console.log(search_offset_count);
    searchEngine();
})
//MORE FAVORITES 
see_more_favoritos_button.addEventListener('click', () => {
    console.log('más favoritos');
    favoritos_offset_count += 12;
    displayFavoritos();
})
// MORE MIS GIFOS
misGifos_offset_button.addEventListener('click', () => {
    console.log('más mis gifos');
    misGifos_offset_count += 12;
    displayMisGifos();
})


// SEARCH GIFOS CLICKING ON THE OPTIONS OF THE AUTOCOMPLETE

for (let i = 0; i < autocomplete_slots.length; i++) {
    autocomplete_slots[i].onclick = async () => {
        search = autocomplete_displayers[i].innerText;
        searchEngine();
    }
}

// Loads all the event listeners for search

/////////////////////////////// FIRE ORDER
trendingEngine();





