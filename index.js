 const music_list = [
        {
            name: 'سورة الفاتحة',
            artist: 'محمد اللحيدان',
            img: '../img/mh.jpg',
            audio: 'https://media.sd.ma/assabile/recitations_7892537823/mp3/mohammed-al-lohaidan-001-al-fatiha-8575-3583.mp3'
        },
        // يمكن إضافة المزيد من السور هنا
    ];

    let currentTrack = 0;
    let isPlaying = false;
    const audioElement = new Audio();

    // دالة إنشاء المشغلات المصغرة
    function createMiniPlayer(track, index) {
        const player = document.createElement('div');
        player.className = 'search-item';
        player.innerHTML = `
            <div class="mini-player">
                <button class="play-btn"><i class="fa fa-play"></i></button>
                <input type="range" class="mini-progress" value="0">
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

        playBtn.addEventListener('click', () => togglePlay(index));
        progress.addEventListener('input', (e) => updateProgress(e, index));
        volume.addEventListener('input', (e) => audioElement.volume = e.target.value);

        return player;
    }

    // التحكم في التشغيل
    function togglePlay(index) {
        if(currentTrack !== index) {
            currentTrack = index;
            audioElement.src = music_list[index].audio;
        }
        
        if(audioElement.paused) {
            audioElement.play();
            document.querySelectorAll('.play-btn').forEach(btn => 
                btn.innerHTML = '<i class="fa fa-play"></i>');
            playBtn.innerHTML = '<i class="fa fa-pause"></i>';
        } else {
            audioElement.pause();
            playBtn.innerHTML = '<i class="fa fa-play"></i>';
        }
    }

    // تحديث شريط التقدم
    function updateProgress(e, index) {
        const seekTime = (e.target.value / 100) * audioElement.duration;
        audioElement.currentTime = seekTime;
    }

    // البحث
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const results = music_list.filter(track => 
            track.name.includes(e.target.value) || 
            track.artist.includes(e.target.value)
        );
        
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = '';
        results.forEach((track, index) => {
            resultsContainer.appendChild(createMiniPlayer(track, index));
        });
    });

    // تحديث الوقت التلقائي
    audioElement.addEventListener('timeupdate', () => {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        document.querySelectorAll('.mini-progress')[currentTrack].value = progress;
    });
    