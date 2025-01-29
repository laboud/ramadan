const music_list = [
    {
        name: 'سورة الفاتحة',
        artist: 'محمد اللحيدان',
        img: '../img/mh.jpg',
        audio: 'https://media.sd.ma/assabile/recitations_7892537823/mp3/mohammed-al-lohaidan-001-al-fatiha-8575-3583.mp3'
    },
    {
        name: 'سورة البقرة',
        artist: 'محمد اللحيدان',
        img: '../img/mh.jpg',
        audio: 'https://media.sd.ma/assabile/recitations_7892537823/mp3/mohammed-al-lohaidan-002-al-baqara.mp3'
    },
    {
        name: 'سورة آل عمران',
        artist: 'محمد اللحيدان',
        img: '../img/mh.jpg',
        audio: 'https://media.sd.ma/assabile/recitations_7892537823/mp3/mohammed-al-lohaidan-003-aal-e-imran.mp3'
    }
];

let currentTrack = null;
const audioElement = new Audio();

function createMiniPlayer(track, index) {
    const player = document.createElement('div');
    player.className = 'search-item';
    player.innerHTML = `
        <div class="mini-player">
            <button class="play-btn"><i class="fa fa-play"></i></button>
            <input type="range" class="mini-progress" value="0" min="0" max="100">
            <div class="volume-control">
                <i class="fa fa-volume-up"></i>
                <input type="range" class="mini-volume" min="0" max="1" step="0.1" value="1">
            </div>
        </div>
        <img src="${track.img}" alt="${track.name}">
        <div>
            <h3>${track.name}</h3>
            <p>${track.artist}</p>
        </div>
    `;

    const playBtn = player.querySelector('.play-btn');
    const progress = player.querySelector('.mini-progress');
    const volume = player.querySelector('.mini-volume');

    playBtn.addEventListener('click', () => togglePlay(index, playBtn));
    progress.addEventListener('input', (e) => updateProgress(e));
    volume.addEventListener('input', (e) => (audioElement.volume = e.target.value));

    return player;
}

function togglePlay(index, playBtn) {
    if (currentTrack !== index) {
        currentTrack = index;
        audioElement.src = music_list[index].audio;
        audioElement.play();
        updatePlayButtons();
        playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    } else {
        if (audioElement.paused) {
            audioElement.play();
            playBtn.innerHTML = '<i class="fa fa-pause"></i>';
        } else {
            audioElement.pause();
            playBtn.innerHTML = '<i class="fa fa-play"></i>';
        }
    }
}

function updateProgress(e) {
    if (!audioElement.duration) return;
    audioElement.currentTime = (e.target.value / 100) * audioElement.duration;
}

function updatePlayButtons() {
    document.querySelectorAll('.play-btn').forEach((btn) => {
        btn.innerHTML = '<i class="fa fa-play"></i>';
    });
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchText = e.target.value.trim().toLowerCase();
    const results = music_list.filter(
        (track) => track.name.toLowerCase().includes(searchText) || track.artist.toLowerCase().includes(searchText)
    );

    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>لم يتم العثور على نتائج</p>';
    } else {
        results.forEach((track, index) => {
            resultsContainer.appendChild(createMiniPlayer(track, index));
        });
    }
});

audioElement.addEventListener('timeupdate', () => {
    if (!audioElement.duration) return;
    const progressValue = (audioElement.currentTime / audioElement.duration) * 100;
    document.querySelectorAll('.mini-progress').forEach((progress) => {
        progress.value = progressValue;
    });
});
window.addEventListener('scroll', () => {
    document.querySelectorAll('.scroll-animation').forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('visible');
        }
    });
});