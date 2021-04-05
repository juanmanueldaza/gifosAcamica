logo.onclick = () => {
    console.log('hola');
    sectionCrearGifos.classList.add('hider');
    sectionSearch.classList.remove('hider');
    sectionTrendingGifos.classList.remove('hider');
    
}

// SHOW-HIDE NAVBAR ON MOBILE
menuButton.addEventListener('click', function() {
    navBar.classList.toggle('hider');
    fontawesome_menu_bars.classList.toggle('hider');
    fontawesome_menu_times.classList.toggle('hider');
});

// NIGHT MODE TOGGLE
nightButton.addEventListener('click', function() {
    crearGifosButton.classList.remove('firstColorChange');
    body.classList.toggle('dark');
    navBar.classList.toggle('hider');
    logo.src = 'assets/logo-mobile-modo-noct.svg';
    if (nightButton.innerText == 'MODO NOCTURNO') {
        nightButton.innerText = 'MODO DIURNO';
    } else {
        nightButton.innerText = 'MODO NOCTURNO';
        logo.src = 'assets/logo-mobile.svg';  
    }
});

// FAVORITOS SHOW
favoritosButton.addEventListener('click', function() {
    crearGifosButton.classList.remove('firstColorChange');
    observer.unobserve(inputObs);
    header.classList.remove('sticky-capabilities');
    search_bar_header.classList.add('hider');
    if (sectionFavoritos.classList.contains('hider')) {
        sectionSearch.classList.add('hider');
        sectionCrearGifos.classList.add('hider');
        sectionFavoritos.classList.remove('hider');
        navBar.classList.toggle('hider');
        displayFavoritos();
        
        if (!sectionSearch.classList.contains('hider')) {
            sectionSearch.classList.toggle('hider');
        }
    } else {
        navBar.classList.toggle('hider');
    }
    if (localStorage.getItem('favoritos')) {
        if (localStorage.getItem('favoritos') != '[]') {
        displayFavoritos();
        }
    }
    displayFavoritos();
})

// MIS GIFOS SHOW

misGifosButton.addEventListener('click', async function() {
    crearGifosButton.classList.remove('firstColorChange');
    observer.unobserve(inputObs);
    header.classList.remove('sticky-capabilities');
    search_bar_header.classList.add('hider');
    if (sectionMisGifos.classList.contains('hider')) {
        sectionMisGifos.classList.toggle('hider');
        sectionSearch.classList.toggle('hider');
        sectionCrearGifos.classList.add('hider');
        navBar.classList.toggle('hider');
        if (!sectionFavoritos.classList.contains('hider')) {
            sectionFavoritos.classList.toggle('hider');
        } 
        if (!sectionSearch.classList.contains('hider')) {
            sectionSearch.classList.toggle('hider');
        }
    } else {
        navBar.classList.toggle('hider');
    }

    if (localStorage.getItem('idList')) {
        if (localStorage.getItem('idList') != '[]') {
        await getCreatedGIFO();
        displayMisGifos();
        }
    }
    displayMisGifos();
})

// CREATE GIFOS SHOW


// HEADER STICKY - INTERSECTION OBSERVER

const inputObs = search_input;

const options = {};

const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            console.log("sticky");
            header.classList.add('sticky-capabilities');
            search_bar_header.classList.remove('hider');
            
        } else if (entry.isIntersecting) {
            console.log("desesticky");
            header.classList.remove('sticky-capabilities');
            search_bar_header.classList.add('hider');
            
        }
    });
}, options);

observer.observe(inputObs);