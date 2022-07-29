let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Kuch Toh Bata Zindagi..",
    image:  "gifs/1.gif",
    path: "songs/1.mp3",
  },
  {
    name: "Baathein..",
    image: "gifs/2.gif",
    path: "songs/2.mp3",
  },
  {
    name: "Riha..",
    image: "gifs/3.gif",
    path: "songs/3.mp3",
  },
  {
    name:"Dooriyan..",
    image: "gifs/4.gif",
    path: "songs/4.mp3",
  },
  {
    name: "Kho Gaye Hum Kaha..",
    image: "gifs/5.gif",
    path: "songs/5.mp3",
  },
  {
    name: "Alag Aasmaan..",
    image: "gifs/6.gif",
    path: "songs/6.mp3",
  },
  {
    name: "Tune Kaha..",
    image: "gifs/7.gif",
    path: "songs/7.mp3",
  },
  {
    name:  "Aziyat.. ",
    image: "gifs/8.gif",
    path: "songs/8.mp3",
  },
  {
    name: "Zakir..",
    image: "gifs/9.gif",
    path: "songs/9.mp3",
  },
  {
    name: "Farq Hai..",
    image: "gifs/10.gif",
    path: "songs/10.mp3",
  },
  {
    name: "Night Changes x Shayad..",
    image: "gifs/11.gif",
    path: "songs/11.mp3",
  },
  {
    name: "Dandelions..",
    image: "gifs/12.gif",
    path: "songs/12.mp3",
  },
  {
    name: "Waqt Ki Baatein..",
    image: "gifs/13.gif",
    path: "songs/13.mp3",
  },
  {
    name: "Aaftaab..",
    image: "gifs/14.gif",
    path: "songs/14.mp3",
  },
  {
    name: "Older..",
    image: "gifs/15.gif",
    path: "songs/15.mp3",
  },
  {
    name: "Death Bed.. ",
    image: "gifs/16.gif",
    path: "songs/16.mp3",
  },
  {
    name: "Comethru..",
    image: "gifs/17.gif",
    path: "songs/17.mp3",
  },
  {
    name: "Scenery..",
    image: "gifs/18.gif",
    path: "songs/18.mp3",
  },
  {
    name: "Head In The Clouds..",
    image: "gifs/19.gif",
    path: "songs/19.mp3",
  },
  {
    name: "Roz Roz..",
    image: "gifs/20.gif",
    path: "songs/20.mp3",
  },
  
  
  
];

/*function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}*/

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  document.body.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause fa-4x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play fa-4x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

