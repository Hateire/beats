let video;
let durationControl;
let soundControl;
let intervalId;

const playBtn = document.querySelector(".video__player-img");
const soundBtn = document.querySelector(".sound");
const playerPlayBtn = document.querySelector(".duration__img");


video = document.getElementById("player");


video.addEventListener('click', playStop);

let playButtons = document.querySelectorAll(".play");
for (let i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener('click', playStop);
}

let micControl = document.getElementById("mic");
micControl.addEventListener('click', soundOf);

durationControl = document.getElementById("durationLevel");
durationControl.addEventListener('input', setVideoDuration);

durationControl.min = 0;
durationControl.value = 0;
durationControl.max = video.duration;

soundControl = document.getElementById("micLevel");
soundControl.addEventListener('input', changeSoundVolume);

soundControl.min = 0;
soundControl.max = 10;
soundControl.value = soundControl.max;


video.addEventListener('ended', function () {
    playBtn.classList.toggle("video__player-img--active");
    video.currentTime = 0;
    playerPlayBtn.classList.remove('active');
});



function playStop() {
    playBtn.classList.toggle("video__player-img--active");


    if (video.paused) {
        video.play();
        intervalId = setInterval(updateDuration, 1000 / 60);
        playerPlayBtn.classList.add('active');
    } else {
        video.pause();
        clearInterval(intervalId);
        playerPlayBtn.classList.remove('active');
    }
}

function setVideoDuration() {
    video.currentTime = durationControl.value;
    updateDuration();
}


function updateDuration() {
    durationControl.value = video.currentTime;
    let step = video.duration / 100;
    let percent = video.currentTime / step;
    durationControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${percent}%, #333333 ${percent}%)`;

}


function soundOf() {
    if (video.volume === 0) {
        video.volume = soundLevel;
        soundControl.value = soundLevel * 10;
        soundBtn.classList.remove('active');
    } else {
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
        soundBtn.classList.add('active');

    }
}

function changeSoundVolume() {
    video.volume = soundControl.value / 10;
    if (video.volume == 0) {
        soundBtn.classList.add('active');
    } else {
        soundBtn.classList.remove('active');
    }
    console.log('значение volume у видео ' + video.volume);
    console.log('значение value у micLevel ' + soundControl.value / 10);
}