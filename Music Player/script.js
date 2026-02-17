console.log("JS Loaded");

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");


const song = [
    {name:"song1", title:"Koi Mil Gaya"},
    {name:"song2", title:"Chaand Tare"},
    {name:"song3", title:"Besabriya"}
];

let songIndex = 0;

function loadSong(song){
    title.innerText = song.title;
    audio.src = `songs/${song.name}.mp3`;
}

loadSong(song[songIndex]);

function playSong(){
    audio.play();
    playBtn.innerText = "⏸️";
}

function pauseSong(){
    audio.pause();
    playBtn.innerText = "▶️";
}

playBtn.addEventListener("click", ()=>{
    if(audio.paused){
        playSong();
    } else {
        pauseSong();
    }
});

function nextSong(){
    songIndex++;
    if(songIndex > song.length-1){
        songIndex = 0;
    }
    loadSong(song[songIndex]);
    playSong();
}

nextBtn.addEventListener("click", nextSong);

function prevSong(){
    songIndex--;
    if (songIndex < 0){
        songIndex = song.length - 1;
    }
    loadSong(song[songIndex]);
    playSong();
}

prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";

    currentTimeEl.innerText = formatTime(audio.currentTime);
    durationEl.innerText = formatTime(audio.duration);
  }
});


progressContainer.addEventListener("click", (e)=>{
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    if(!isNaN(audio.duration)){
        audio.currentTime = (clickX/width)*duration;
    }
});

audio.addEventListener("ended", nextSong);

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}
