
let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let curr_track = document.createElement('audio');

let track_index = 1;
let isPlaying = false;

const music_list = [
    {
        img: '../img/mh.jpg',
        name: 'AL-Fatiha - الفاتحة',
        artist: 'محمد اللحيدان',
        audio: 'https://media.sd.ma/assabile/recitations_7892537823/mp3/mohammed-al-lohaidan-001-al-fatiha-8575-3583.mp3'
    },
    {
        img: '../img/mohamed-al-haidan.png',
        name: 'AL-Baqara - البقرة',
        artist: 'محمد اللحيدان',
        audio: 'https://media.sd.ma/assabile/recitations_7892537823/mp3/mohammed-al-lohaidan-002-al-baqara-8576-3797.mp3'
    },
    {
        img: '../img/mohamed-al-haidan-2899.jpg',
        name: 'AL-imran - العمران',
        artist: 'محمد اللحيدان',
        audio: 'https://media.sd.ma/assabile/recitations_7892537823/mp3/mohammed-al-lohaidan-003-aal-e-imran-8577-175.mp3'
    }
];

function loadTrack(track_index) {
    curr_track.src = music_list[track_index].audio;
    curr_track.load();
    track_art.style.backgroundImage = "url(" + music_list[track_index  ].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing " + (track_index +1) + " of " + music_list.length;
}

function playpauseTrack() {
    if (!isPlaying) {
        curr_track.play();
        isPlaying = true;
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    } else {
        curr_track.pause();
        isPlaying = false;
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
}

function nextTrack() {
    track_index = (track_index + 1) % music_list.length;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    track_index = (track_index - 1 + music_list.length) % music_list.length;
    loadTrack(track_index);
    playTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

curr_track.addEventListener('timeupdate', function () {
    let seekPosition = (curr_track.currentTime / curr_track.duration) * 100;
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    curr_time.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    total_duration.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
});

let search = document.querySelector("aside input");
let searchResults = document.querySelector("div.player");

let apps = [
    { name: "سورة الفاتحة", others: ["الفاتحة", "فاتحة الكتاب", "السبع المثاني"] },
    { name: "سورة البقرة", others: ["البقرة", "أطول سورة", "المصحف"] }
];

search.addEventListener("keyup", () => {
    let searchValue = search.value.trim().toLowerCase(); 
    searchResults.innerHTML = "";

    if (searchValue === "") {
        searchResults.innerHTML = `
        <div class="player">
        <div class="wrapper">
            <div class="details">
                <div class="now-playing">PLAYING 1 OF 4</div>
                <div class="track-art"></div>
                <div class="track-name">Track Name</div>
                <div class="track-artist">Track Artist</div>
            </div>

            <div class="slider_container">
                <div class="current-time">00:00</div>
                <input type="range" min="1" max="100" value="0" class="seek_slider" onchange="seekTo()">
                <div class="total-duration">00:00</div>
            </div>

            <div class="slider_container">
                <i class="fa fa-volume-down"></i>
                <input type="range" min="1" max="100" value="99" class="volume_slider" onchange="setVolume()">
                <i class="fa fa-volume-up"></i>
            </div>

            <div class="buttons">
                <div class="random-track" onclick="randomTrack()">
                    <i class="fas fa-random fa-2x" title="Random"></i>
                </div>
                <div class="prev-track" onclick="prevTrack()">
                    <i class="fa fa-step-backward fa-2x"></i>
                </div>
                <div class="playpause-track" onclick="playpauseTrack()">
                    <i class="fa fa-play-circle fa-5x"></i>
                </div>
                <div class="next-track" onclick="nextTrack()">
                    <i class="fa fa-step-forward fa-2x"></i>
                </div>
                <div class="repeat-track" onclick="repeatTrack()">
                    <i class="fa fa-repeat fa-2x" title="Repeat"></i>
                </div>
            </div>

            <div id="wave">
                <span class="stroke"></span>
                <span class="stroke"></span>
                <span class="stroke"></span>
                <span class="stroke"></span>
                <span class="stroke"></span>
            </div>
        </div>
    </div>
        `;
    } else {
        let found = false;
        apps.forEach(app => {
            if (app.others.some(other => other.toLowerCase().includes(searchValue))) {
                searchResults.innerHTML += `
                <div class="player">
                
                <div class="wrapper">
                    <div class="details">
                        <div class="now-playing">PLAYING 1 OF 4</div>
                        <div class="track-art"></div>
                        <div class="track-name">Track Name</div>
                        <div class="track-artist">Track Artist</div>
                    </div>
    
                    <div class="slider_container">
                        <div class="current-time">00:00</div>
                        <input type="range" min="1" max="100" value="0" class="seek_slider" onchange="seekTo()">
                        <div class="total-duration">00:00</div>
                    </div>
    
                    <div class="slider_container">
                        <i class="fa fa-volume-down"></i>
                        <input type="range" min="1" max="100" value="99" class="volume_slider" onchange="setVolume()">
                        <i class="fa fa-volume-up"></i>
                    </div>
    
                    <div class="buttons">
                        <div class="random-track" onclick="randomTrack()">
                            <i class="fas fa-random fa-2x" title="Random"></i>
                        </div>
                        <div class="prev-track" onclick="prevTrack()">
                            <i class="fa fa-step-backward fa-2x"></i>
                        </div>
                        <div class="playpause-track" onclick="playpauseTrack()">
                            <i class="fa fa-play-circle fa-5x"></i>
                        </div>
                        <div class="next-track" onclick="nextTrack()">
                            <i class="fa fa-step-forward fa-2x"></i>
                        </div>
                        <div class="repeat-track" onclick="repeatTrack()">
                            <i class="fa fa-repeat fa-2x" title="Repeat"></i>
                        </div>
                    </div>
    
                    <div id="wave">
                        <span class="stroke"></span>
                        <span class="stroke"></span>
                        <span class="stroke"></span>
                        <span class="stroke"></span>
                        <span class="stroke"></span>
                    </div>
                </div>
            </div>
                `;
                found = true;
            }
        });
        if (!found) {
            searchResults.innerHTML = `<p style='color: #888;'>لا توجد نتائج لـ "${searchValue}"</p>`;
        }
    }
});