const audio = document.getElementById('section__songs__audio');
const time = document.querySelector('.section__songs__time');
const btnPlay = document.querySelector('.section__songs__buttons__play');
const btnPause = document.querySelector('.section__songs__buttons__pause');
const btnPrev = document.querySelector('.section__songs__buttons__prev');
const btnNext = document.querySelector('.section__songs__buttons__next');
const btnVolumeUp = document.querySelector('.section__songs__buttons__up');
const btnVolumeDown = document.querySelector('.section__songs__buttons__down');
const btnMute = document.querySelector('.section__songs__buttons__mute');
const btnOn = document.querySelector('.section__songs__buttons__on');
const songs = document.querySelectorAll('.section__songs__tracks p');
const tabcontent = document.getElementsByClassName("tabcontent");
const tablinks = document.getElementsByClassName("tablinks");
const items = document.querySelectorAll('.slider__item');
const playlist = [
  'Иван Коробов - Вечер на дне.mp3',
  'Иван Коробов - Белая душа.mp3',
  'Иван Коробов - Коллектор.mp3',
  'Иван Коробов - Да ну её, да ну.mp3',
  'Иван Коробов - Моя Шарманка.mp3'
];

let track;
let hover = 0;
let index = 4;
audio.volume = 1;

window.onload = function() {
  track = 0;
  btnPause.style.display = 'none';
  btnOn.style.display = 'none';
}
openSong();
window.addEventListener("scroll", updateScroll);
document.querySelector('.slider').addEventListener('mousemove', () => hover = 1);
document.querySelector('.slider').addEventListener('mouseout', () => hover = 0);

function updateScroll() {
  if (window.scrollY > 0) {
    document.querySelector('header').classList.add('header_scrolled');
  } else {
    document.querySelector('header').classList.remove('header_scrolled');
  }
}
  
function currentSlide(n) {
    index = n - 1;
    showSlides();
  }
function plusSlides(n) {
  if ((index < items.length - 1) && (n > 0)) {
    index = index + n;
  } else if ((index >= items.length - 1) && (n > 0)){
    index = 0;
  } else if ((index >= 1 ) && (n < 0)) {
    index = index + n;
  } else if ((index === 0) && (n < 0)) {
    index = items.length - 1;
  }
  showSlides();
}

setInterval(function() {
  if (!hover) {
    index ++;
    if (index === items.length) {
      index = 0;
    }
    showSlides();
  }
}, 3000);

function showSlides() {
  for (let i = 0; i < items.length; i++) {
    items[i].style.left = '10000px';
    items[i].style.right = 'unset';
    if (i !== index) {
      items[i].classList.contains('active') && items[i].classList.remove('active');
    }
    if ((items[i - 1]) && ((i - 1) !== (index - 1))) {
      items[i - 1].classList.contains('prev') && items[i - 1].classList.remove('prev');
    } else if (!items[i - 1] && items[i - 1] !== 0) {
      items[items.length - 1].classList.contains('prev') && items[items.length - 1].classList.remove('prev');
    }
    if ((items[i + 1]) && ((i + 1) !== (index + 1))) {
      items[i + 1].classList.contains('next') && items[i + 1].classList.remove('next');
    } else if (!items[i + 1]) {
      items[0].classList.contains('next') && items[0].classList.remove('next');
    }
  }
  if(items[index - 1]) {
    items[index - 1].style.left = 'unset';
    items[index - 1].style.right = (0.5 * document.querySelector('.slider__items').offsetWidth + 0.5 * items[index].offsetWidth) + 'px';
    items[index - 1].classList.add('prev');
  } else {
    items[items.length - 1].style.left = 'unset';
    items[items.length - 1].style.right = (0.5 * document.querySelector('.slider__items').offsetWidth + 0.5 * items[index].offsetWidth) + 'px';
    items[items.length - 1].classList.add('prev');
  }
  items[index].classList.add('active');
  if (items[index].style.right) {items[index].style.right = 'unset';}
  items[index].style.left = (0.5 * document.querySelector('.slider__items').offsetWidth - 0.5 * items[index].offsetWidth) + 'px';
  if(items[index + 1]) {
  if (items[index + 1].style.right) {items[index + 1].style.right = 'unset';}
  items[index + 1].style.left = (0.5 * document.querySelector('.slider__items').offsetWidth + 0.5 * items[index].offsetWidth) + 'px';
  items[index + 1].classList.add('next');
  } else {
  if (items[0].style.right) {items[0].style.right = 'unset';}
  items[0].style.left = (0.5 * document.querySelector('.slider__items').offsetWidth + 0.5 * items[index].offsetWidth) + 'px';
  items[0].classList.add('next');
  }
  let dots = document.getElementsByClassName("dot");
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dot__active", "");
  }
  dots[index].className += " dot__active";
}

function switchTrack (numTrack) {
  songList.forEach(song => {
    song.classList.remove('playing', 'paused');
  })
  songs[numTrack].classList.add('playing');
  btnPlay.style.display = 'none';
  btnPause.style.display = 'initial';
  audio.src = './audio/' + playlist[numTrack];
  audio.currentTime = 0;
  audio.play();
}


btnPlay.addEventListener('click', function() {
  if (document.querySelector('.paused')) {
    document.querySelector('.paused').classList.add('playing');
    document.querySelector('.paused').classList.remove('paused');
  }
  btnPlay.style.display = 'none';
  btnPause.style.display = 'initial';
  if (track === 0) {
    songs[0].classList.add('playing');
  }
  audio.play();
});

audioPlay = setInterval(function() {
  if (audio.currentTime > 0 && songs[track].classList.contains('playing')) {
    makeEqualizer();
  }
  let audioTime = Math.round(audio.currentTime);
  let audioLength = Math.round(audio.duration);
  time.style.width = (audioTime * 100) / audioLength + '%';
  if (audioTime === audioLength && track < playlist.length - 1) {
    track ++; 
    switchTrack(track);
  } else if (audioTime == audioLength && track >= playlist.length - 1) {
    track = 0;
    switchTrack(track);
  }
}, 100)

btnPause.addEventListener('click', function() {
  if (document.querySelector('.playing')) {
  document.querySelector('.playing').classList.add('paused');
  document.querySelector('.playing').classList.remove('playing');
  btnPause.style.display = 'none';
  btnPlay.style.display = 'initial';
  }
  audio.pause();
});

btnPrev.addEventListener('click', function() {
  if (track > 0) {
    track --;
    switchTrack(track);
  } else {
    track = playlist.length - 1;
    switchTrack(track);
  }
});

btnNext.addEventListener('click', function() {
  if (track < playlist.length - 1) {
    track ++;
    switchTrack(track);
  } else {
    track = 0;
    switchTrack(track);
  }
});

document.querySelector('.section__songs__audio-track').addEventListener('click', rewind);
time.addEventListener('click', rewind);
document.querySelector('.section__songs__audio-track').addEventListener('mousemove', showTime);
time.addEventListener('mousemove', showTime);

function rewind(event) {
  let newTime = event.offsetX;
  time.style.width = `${newTime / document.querySelector('.section__songs__audio-track').offsetWidth * 100}%`;
  audio.currentTime = audio.duration * newTime / document.querySelector('.section__songs__audio-track').offsetWidth;
}

function showTime(event) {
  let text = audio.duration * event.offsetX / document.querySelector('.section__songs__audio-track').offsetWidth;
  let timeTitle = `${Math.floor(text / 60)}:${(text % 60).toFixed(0).padStart(2, '0')}`; 
  this.title = timeTitle;
}

const songList = Array.from(songs);
songList.forEach (song => {
  song.addEventListener('click', function(event) {
    track = songList.indexOf(event.target);
    switchTrack(track);
  })
});

btnMute.addEventListener('click', () => {
  audio.volume = 0;
  btnMute.style.display = 'none';
  btnOn.style.display = 'initial';
  if (btnVolumeUp.classList.contains('disabled')) {
    btnVolumeUp.classList.remove('disabled');
  }
  if (!btnVolumeDown.classList.contains('disabled')) {
    btnVolumeDown.classList.add('disabled');
  }
})

btnOn.addEventListener('click', () => {
  audio.volume = 1;
  btnOn.style.display = 'none';
  btnMute.style.display = 'initial';
  if (btnVolumeDown.classList.contains('disabled')) {
    btnVolumeDown.classList.remove('disabled');
  }
  if (!btnVolumeUp.classList.contains('disabled')) {
    btnVolumeUp.classList.add('disabled');
  }
})

btnVolumeUp.addEventListener ('click', () => {
  if (audio.volume.toFixed(1) < 0.9) {
  audio.volume += 0.1;
  btnVolumeDown.classList.remove('disabled');
  btnOn.style.display = 'none';
  btnMute.style.display = 'initial';
  } else {
    audio.volume = 1;
    btnVolumeUp.classList.add('disabled');
    btnOn.style.display = 'none';
    btnMute.style.display = 'initial';
  }
})

btnVolumeDown.addEventListener ('click', () => {
  btnVolumeUp.classList.remove('disabled');
  if (audio.volume.toFixed(1) > 0.2) {
    audio.volume -= 0.1;
    btnVolumeUp.classList.remove('disabled');
  }
  else if (audio.volume.toFixed(1) > 0.1) {
    audio.volume -= 0.1;
    btnVolumeUp.classList.remove('disabled');
  }
  else {
    audio.volume = 0;
    btnVolumeDown.classList.add('disabled');
    btnOn.style.display = 'initial';
    btnMute.style.display = 'none';
  }
})

function getRandom(max = 50, min = 5) {
  return Math.floor(Math.random() * (max - min) + min);
}
function makeEqualizer() {
  let left = 0;
  while (document.querySelector('.section__songs__audio-track').firstElementChild) {
    document.querySelector('.section__songs__audio-track').firstElementChild.remove();
  }
  for (let i = 0; i < document.querySelector('.section__songs__audio-track').offsetWidth; i = i + (document.querySelector('.section__songs__audio-track').offsetWidth) / 100) {
    let equalizerItem = document.createElement('div');
    equalizerItem.classList.add('equalizer__item');
    equalizerItem.style.height = `${getRandom()}px`;
    equalizerItem.style.width = `${document.querySelector('.section__songs__audio-track').offsetWidth / 100}px`;
    equalizerItem.style.left = `${left}px`;
    let timeWidth = ((parseFloat(time.style.width) * document.querySelector('.section__songs__audio-track').offsetWidth)) / 100;
    if (left <= timeWidth) {
      equalizerItem.classList.replace('equalizer__item', 'equalizer__item_played');
    }
    document.querySelector('.section__songs__audio-track').appendChild(equalizerItem);
    left = left + document.querySelector('.section__songs__audio-track').offsetWidth / 100;
  }
}

function openSong(event, songName) {
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" visible", "");
  }
  if (document.getElementById(songName)) {
  document.getElementById(songName).style.display = "block";
  }
  if (event) {
  event.currentTarget.className += " visible";
  }
}