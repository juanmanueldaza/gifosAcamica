let timer;
let hours = '00';
let minutes = '00';
let seconds = '00';
let timerAndRepeatDiv = document.getElementById('timerBigDiv');
let timerDisplay = document.getElementById('timer-recording');
let repeatDisplay = document.getElementById('repeatShot');

let screenOverlay = document.getElementById('uploadingGifo__container');
let uploadButtons = document.getElementById('uploadButtons');
let uploadIcon = document.getElementById('upIcon');
let uploadText = document.getElementById('upText');
let UPdownloadButton = document.getElementById('button1');
let UPlinkbutton = document.getElementById('button2');


const video = document.getElementById('video');
const start_record = document.getElementById('grabar-button');
const stop_record = document.getElementById('finalizar-button');
const errorMsgElement = document.getElementById('span#ErrorMsg');
const constraints = {
    audio: false,
    video: {
        width: 1280, height: 720
    }
};
let stream;
let recorder;
async function init() {
    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function() {
            console.log('started')
        }
        });
        handleSuccess(stream);
        
    
    
    } catch {
        errorMsgElement.innerHTML = `navigator.getUserMedia.error:${e.toString()}`;
    }
}
function handleSuccess(stream) {
    screen_text_2.classList.add('hider');
    start_record.classList.remove('hider');
    sequence_1.classList.remove('secondColorChange');
    sequence_2.classList.add('secondColorChange');
    window.stream = stream;
    video.srcObject = stream;
}
function idSaver(id) {
    if (localStorage.getItem('idList') == null) {
        let idList = [id];
        localStorage.setItem('idList', JSON.stringify(idList));
    } else {
        let idFromLS = JSON.parse(localStorage.getItem('idList'));
        let integratedIdList = idFromLS;
        integratedIdList.push(id)
        localStorage.setItem('idList', JSON.stringify(integratedIdList));
    }
}
function timerActive() {
	seconds++;

	if (seconds < 10) seconds = `0` + seconds;

	if (seconds > 59) {
		seconds = `00`;
		minutes ++;

		if (minutes < 10) minutes = `0` + minutes;
	}

	if (minutes > 59) {
		minutes = `00`;
		hours++;

		if (hours < 10) hours = `0` + hours;
	}

	timerDisplay.innerHTML = `${hours}:${minutes}:${seconds}`;
}
function timerInit() {
    timer = setInterval(timerActive, 1000);
    timerAndRepeatDiv.classList.add('opacitor');
    timerDisplay.classList.remove('hider');
    repeatDisplay.classList.add('hider'); 
}
function stopTimer() {
    timerDisplay.classList.add('hider');
    clearInterval(timer);
    hours = '00';
    minutes = '00';
    seconds = '00';
    timerDisplay.innerText = `${hours}:${minutes}:${seconds}`;
}
async function repeatRecording() {
    recorder.clearRecordedData();
    stream = await navigator.mediaDevices.getUserMedia(constraints);
        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function() {
            console.log('started')
        }
        });
    recorder.startRecording();
}

crearGifosButton.addEventListener('click', function() {
    observer.unobserve(inputObs);
    if (uploadText.innerHTML == '<p>GIFO subido con éxito</p>') {
        video.classList.add('opacitoff');
        screenOverlay.classList.add('hider');
        screen_text_1.classList.remove('hider');
        sequence_3.classList.remove('secondColorChange');
        comenzar_button.classList.remove('hider');
        uploadIcon.innerHTML = '<i class="iconUP fas fa-spinner"></i>';
        uploadText.innerHTML = '<p>Estamos subiendo tu GIFO</p>';
    }
    sectionCrearGifos.classList.remove('hider');
    sectionSearch.classList.add('hider');
    sectionTrendingGifos.classList.add('hider');
    sectionFavoritos.classList.add('hider');
    sectionMisGifos.classList.add('hider');
    crearGifosButton.classList.add('firstColorChange');
})
comenzar_button.addEventListener('click', async function () {
    init();
    video.classList.remove('opacitoff');
    comenzar_button.classList.add('hider');
    screen_text_1.classList.add('hider');
    screen_text_2.classList.remove('hider');
    sequence_1.classList.add('secondColorChange');
});
start_record.addEventListener('click', () => {
    start_record.classList.add('hider');
    stop_record.classList.remove('hider');
    recorder.startRecording();
    timerInit();
         
});
stop_record.addEventListener('click', () => {
    stop_record.classList.add('hider');
    subir_gifo_buttton.classList.remove('hider');
    repeatDisplay.classList.remove('hider');
    recorder.stopRecording();
    stopTimer();
});
subir_gifo_buttton.addEventListener('click', async function() {
    sequence_2.classList.remove('secondColorChange');
    sequence_3.classList.add('secondColorChange');
    repeatDisplay.classList.add('hider');
    subir_gifo_buttton.classList.add('hider');
    uploadButtons.classList.add('opacitoff');
    screenOverlay.classList.remove('hider');
    let form = new FormData();
    form.append('file', recorder.getBlob(), 'myGif.gif');
    const file = form.get('file');
    let query = `${upload_endpoint+api_key}`;
    let resp = await fetch(query, {
        method: 'POST',
        body: form 
    });
    let createdGIFO = await resp.json();
    if(createdGIFO) {
        UPdownloadButton.onclick = () => {
            downloadCreatedGif(createdGIFO.data.id);
        }
        UPlinkbutton.href = `https://giphy.com/gifs/${createdGIFO.data.id}`;
        uploadButtons.classList.remove('opacitoff');
        uploadIcon.innerHTML = '<i class="iconUP fas fa-check"></i>';
        uploadText.innerHTML = '<p>GIFO subido con éxito</p>';
    }
    idSaver(createdGIFO.data.id);
    console.log(createdGIFO, createdGIFO.data.id);
});
repeatDisplay.addEventListener('click', async () => {
    start_record.classList.add('hider');
    stop_record.classList.remove('hider');
    repeatDisplay.classList.add('hider');
    subir_gifo_buttton.classList.add('hider');
    timerInit();
    repeatRecording();
});