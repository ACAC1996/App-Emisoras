const emisoras = [
    {
        id: 0,
        label: 'Selecciona una...',
        url: '',
        param: 'selected'
    },
    {
        id: 1,
        label: 'La voz de Colombia Bésame',
        url: 'http://24073.live.streamtheworld.com/BESAME_MEDELLIN_SC',
        param: ''
    },
    {
        id: 2,
        label: 'Los40 Colombia',
        url: 'https://17633.live.streamtheworld.com/LOS40_COLOMBIA.mp3',
        param: ''
    },
    {
        id: 3,
        label: 'Tropicana Cali',
        url: 'https://14553.live.streamtheworld.com/TR_CALI.mp3',
        param: ''
    },

]

const selectEmisoras = document.getElementById('select-emisoras')
const reproductor = document.getElementById('reproductor')
const signal = document.getElementById('signal')
const btnPlay = document.getElementById('play')
const btnPause = document.getElementById('pause')
const ctrlVolume = document.getElementById('volume')

let playing
let currentVolume


function llenarEmisoras() {
    let info = '';
    for (const emisora of emisoras) {

        info +=
            `
        <option ${emisora.param} value="${emisora.id}">${emisora.label}</option>
        `
    }

    selectEmisoras.innerHTML = info
}

function cambiarEmisora(evt) {
    console.log(evt.value)
    if (evt.value == 0) {
        enableButtons(true)
    } else {
        enableButtons(false)
    }
    reproductor.src= emisoras[evt.value].url
    reproductor.value=currentVolume/100
    changeSignal()

}

function playMusic(){
    playing=true
    reproductor.play()
    reproductor.volume=currentVolume/100
    changeSignal()
}

function pauseMusic(){
    playing=false
    reproductor.pause()
    changeSignal()
}

function changeVolume(evt){
    currentVolume=evt.value
    reproductor.volume=currentVolume/100
    changeSignal()
}

function changeSignal() {
    const color = playing ? 'green' : 'red'
    signal.style.color = color
}

function enableButtons(value) {
    btnPlay.disabled = value
    btnPause.disabled = value
    ctrlVolume.disabled = value
    playing = ! value
}

function init() {
    currentVolume = 20
    enableButtons(true)
    ctrlVolume.value = currentVolume
    reproductor.volume = currentVolume / 100
    llenarEmisoras()
    changeSignal()
}

(function () {
    init()
})();
