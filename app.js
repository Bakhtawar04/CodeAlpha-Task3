const images = document.getElementById('bg_img');
const imgCover = document.getElementById('cover');
const playerProgress = document.getElementById('player_progress');
const progress = document.getElementById('progress');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const titleName = document.getElementById('title');
const artistName = document.getElementById('artist');
const currentTimeEl = document.getElementById('current_time');
const durationEl = document.getElementById('duration');

const songs = [
    { title: 'Lotus Sky Dreams', 
      artist: 'Artist 1', 
      src: 'img-audio/song1.mp3',
      cover: 'img-audio/img-1.jpg'
    },
    { title: 'Once in Paris', 
      artist: 'Artist 2', 
      src: 'img-audio/song2.mp3',
      cover: 'img-audio/img-2.jpg'
    },
    { title: 'Sunlit Whistle',
      artist: 'Artist 3', 
      src: 'img-audio/song3.mp3',
      cover: 'img-audio/img-3.jpg'
    },
    { title: 'Science Documentary',
      artist: 'Artist 4', 
      src: 'img-audio/song4.mp3',
      cover: 'img-audio/img-4.jpeg'
    }
];

const music = new Audio();
let currentSongIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong(); 
    }
}

function playSong() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "pause");
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "play");
    music.pause();  
}

function loadSong(song) {
    music.src = song.src;
    titleName.textContent = song.title;
    artistName.textContent = song.artist;
    imgCover.src = song.cover;
    images.src = song.cover;

    music.addEventListener('loadedmetadata', () => {
        updateProgressBar();
    });
}

function nextSong(direction) {
    currentSongIndex = (currentSongIndex + direction + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const xValue = e.offsetX;
    music.currentTime = (xValue / width) * music.duration;
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    if (!isNaN(duration)) {
        durationEl.textContent = formatTime(duration);
    }
    
    if (!isNaN(currentTime)) {
        currentTimeEl.textContent = formatTime(currentTime);
    }
}

function btnEvents() {
    playBtn.addEventListener("click", togglePlay);
    nextBtn.addEventListener("click", () => nextSong(1));
    prevBtn.addEventListener("click", () => nextSong(-1));
    music.addEventListener("ended", () => nextSong(1));
    music.addEventListener("timeupdate", updateProgressBar);
    playerProgress.addEventListener("click", setProgressBar);
}

document.addEventListener("DOMContentLoaded", btnEvents);
loadSong(songs[currentSongIndex]);
