// GIPHY API ENDPOINTS 
const api = 'https://api.giphy.com';
const autocomplete_endpoint = '/v1/gifs/search/tags';
const search_endpoint = '/v1/gifs/search';
const trending_endpoint = '/v1/gifs/trending';
const trending_tags_endpoint = '/v1/trending/searches';
const api_key = '?api_key=v01Kkt0dRp5A2AkOp1rDd1NPSVZb8PVZ';
const upload_endpoint = 'https://upload.giphy.com/v1/gifs';
const get_gifo_by_id = 'https://api.giphy.com/v1/gifs';
/////////////////////////////////////////////////////////////////////
let sequence_1 = document.getElementById('sequence-1');
let sequence_2 = document.getElementById('sequence-2');
let sequence_3 = document.getElementById('sequence-3');


var trending_offset_count = 0;

let trendingGifosResponse;
let searchGifosResponse;

let autocomplete_slots = document.getElementsByClassName('autocomplete-slot');

const trendingQueryLimit = '&limit=3';
const trendingTermQueryLimit = '&limit=3';

let trendingTermGifosResponse;

let trendingGifoUrl__aO = [];
let trendingGifoTitle__aO = [];
let trendingGifoUsername__aO = [];
let trendingGifosDisplayer = document.createElement('div');

let expandedGIFO__Section = document.getElementById('expanded-gifo-section');

let misGifos__Grid = document.getElementById('mis-gifos-grid');
let misGifos__Array = [];

let firstTrendingSearch = false;

// ?
let giphy;
let search_offset_count = 0;
let favoritos_offset_count = 12;
let search;
let giphy_autocomplete;

let fontawesome_menu_bars = document.getElementById('fontawesome-menu-bars');
let fontawesome_menu_times = document.getElementById('fontawesome-menu-times');

let misGifos_offset_button = document.getElementById('mis-gifos-offset-button');
let misGifos_offset_count = 0;

//let expandedGIFO__Section = document.createElement('section');



let createdGIFO;
let idArray = new Array();


let createdGIFOSResponse;

////////////////////////////////////////////////////////////////////

////// DOM HTML ELEMENTS
let header = document.getElementById('header');
    let search_bar_header = document.getElementById('search-bar-header');
    let search_input_header = document.getElementById('search-input-header');
    const navBar = document.getElementById('nav-bar');
        // BUTTONS
        const crearGifosButton = document.getElementById('plus-button');
        const menuButton = document.getElementById('menu-btn');
        const nightButton = document.getElementById("modo-nocturno");
        let favoritosButton = document.getElementById('favoritos');
        let misGifosButton = document.getElementById('misgifos');
        
    


const body = document.getElementById("body");
let main = document.getElementById('main');


//// SECTIONS
const sectionCrearGifos = document.getElementById('crear-gifos-section');
    //sectionCrearGifos
    const comenzar_button = document.getElementById('comenzar-button');
    const subir_gifo_buttton = document.getElementById('subir-gifo-button');
    const screen_text_1 = document.getElementById('create-gif-screen-text-1');
    const screen_text_2 = document.getElementById('create-gif-screen-text-2');
    
    

const sectionSearch = document.getElementById('search-section');
    // sectionSearch
    let search_bar = document.getElementById('search-bar');
    let search_input = document.getElementById('search-input');
    let search_button = document.getElementById('search-button');
    let search_cross = document.getElementById('search-cross');

    // searchResults 
    let search_results_block = document.getElementById('search-results-block');
    let search_results_container = document.getElementById('search-results-container');
    let search_results_title = document.getElementById('search-results-title');
        let search_results_displayer = document.getElementsByClassName('search-results-displayer');
            let search_results_gif = document.getElementsByClassName('search-results-gif');
            let gif_user = document.getElementsByClassName('gif-user');
            let gif_title = document.getElementsByClassName('gif-title');
            //BUTTONS
            //let download_buttons = document.getElementsByClassName('download_button');
            let expand_buttons = document.getElementsByClassName('expand-gifos');
            let favoritear_buttons = document.getElementsByClassName('favoritos-button');

    let more_gifos_button = document.getElementById('more-gifos-button'); // esta y las sig dos! iguales?
    let see_more_button = document.getElementById('see-more-gifos-button-container');
    let search_offset_button = document.getElementById('see-more-gifos-button');
    let no_results = document.getElementById('no-results');

    // AUTOCOMPLETE
    let autocomplete_container = document.getElementById('autocomplete-container');
        let autocomplete_displayers = document.getElementsByClassName('autocomplete-displayers');
            let autocomplete_slot_1 = document.getElementById('autocomplete-slot-1');
            let autocomplete_slot_2 = document.getElementById('autocomplete-slot-2');
            let autocomplete_slot_3 = document.getElementById('autocomplete-slot-3');
            let autocomplete_slot_4 = document.getElementById('autocomplete-slot-4');        

const sectionFavoritos = document.getElementById('favoritos-section');
    let favoritos_grid = document.getElementById('favoritos-grid');
let see_more_favoritos_button = document.getElementById('see-more-favoritos-button');
const sectionMisGifos = document.getElementById('misgifos-section');

const sectionTrendingGifos = document.getElementById('trending-gifos-section');
    //sectionTrendingGifos
    const trending_gifos_sub_container = document.getElementById('trending-gifos-sub-container');




    let container = document.getElementById('trending-gifos-container');
    let trending_gif_title = document.getElementsByClassName('trending-gif-title');
    let trending_gif_user = document.getElementsByClassName('trending-gif-user');
    //BUTTONS
    let trending_download_buttons = document.getElementsByClassName('trending-download-button');
    let trending_expand_buttons = document.getElementsByClassName('trending-expand-gifos');
    let trending_favoritear_buttons = document.getElementsByClassName('trending-favoritos-button');
    let back_button = document.getElementById('back-button');
    let forward_button = document.getElementById('forward-button');
    
    //let displayers = document.getElementsByClassName('trending-gifos-displayers');

    let spanTermDisplayers = document.getElementsByClassName('spanTerms');

let logo = document.getElementById('logo');
let logo_container = document.getElementById('logo-container');
