async function getTrendingTerms() {
    let query = `${api+trending_tags_endpoint+api_key}`;
    let resp = await fetch(query);
    trendingTermGifosResponse = await resp.json();
    console.log(trendingTermGifosResponse.data);
}
async function searchTrendingGifos() {
    let query = `${api+trending_endpoint+api_key+trendingQueryLimit}&offset=${trending_offset_count}`;
    let resp = await fetch(query);
    trendingGifosResponse = await resp.json();
    console.log(query);
    console.log(trending_offset_count);
}
async function searchGifos(){
    const limit = '&limit=12';
    if (!search) {
        search = search_input.value;
    }
    let query = `${api+search_endpoint+api_key}&q=${search+limit}&offset=${search_offset_count}`;
    console.log(query);
    let resp = await fetch(query);
    searchGifosResponse = await resp.json();
}
async function searchGifosFromHeader(){  
    const limit = '&limit=12';
    search = search_input_header.value;
    let query = `${api+search_endpoint+api_key}&q=${search+limit}&offset=${search_offset_count}`;
    console.log(query);
    let resp = await fetch(query);
    searchGifosResponse = await resp.json();
    cleanSearchDisplay();
    displayGifosSearch(searchGifosResponse);
}
async function autocompleteSearch() {
    search = search_input.value;
    const limit = '&limit=4';
    let query = `${api+autocomplete_endpoint+api_key}&q=${search+limit}`;
    let resp = await fetch(query);
    giphy_autocomplete = await resp.json();     
    console.log(giphy_autocomplete);
    displayAutocomplete(giphy_autocomplete); 
}
async function getCreatedGIFO () {
    let idList = JSON.parse(localStorage.getItem('idList'));
    console.log(idList);
    let query = `${get_gifo_by_id+api_key}&ids=${idList.join(', ')}`;
    console.log(query);
    let resp = await fetch(query);
    createdGIFOSResponse = await resp.json();
    console.log(createdGIFOSResponse.data[0].url);
}