let hover = 0;
const startX = {};
const items = document.querySelectorAll('.slider__item');
let def = document.querySelector('.slider__items').offsetWidth * 0.5 - items[0].style.width * 0.5;
console.log(document.querySelector('.slider__items').offsetWidth)
//заполнить объект стартовыми координатами для каждого слайда, никак не работает, т.к. неактивные слайды имеют ширину =0
for (let i = 0; i < items.length; i ++) {
  startX[i] = def;
  def = def + items[i].style.width;
  // console.log(def)
  console.log(items[i].style.width)
}
console.log(startX);

document.querySelector('.slider')
   .addEventListener('mousemove', () => hover = 1);

 document.querySelector('.slider')
   .addEventListener('mouseout', () => hover = 0);

function updateScroll() {
    if (window.scrollY > 0) {
      document.querySelector('header').classList.add('header_scrolled');
    } else {
      document.querySelector('header').classList.remove('header_scrolled');
    }
  }
  window.addEventListener("scroll", updateScroll);
  
let index = 0;
setInterval(function() {
    if (!hover) {
    for (let i = 0; i < items.length; i++) {
        items[i].style.left = '10000px';
            if (i !== index) {
              items[i].classList.contains('active') && items[i].classList.remove('active');
            }
            if ((items[i - 1]) && ((i - 1) !== (index - 1))) {
                items[i - 1].classList.contains('prev') && items[i - 1].classList.remove('prev');
            }
            if ((items[i + 1]) && ((i + 1) !== (index + 1))) {
                items[i + 1].classList.contains('next') && items[i + 1].classList.remove('next');
            }
          }
    if(items[index - 1]) {
      items[index - 1].style.left = 'unset';
      items[index - 1].style.right = (0.5 * document.querySelector('.slider__items').offsetWidth + 0.5 * items[index].offsetWidth) + 'px';
      items[index - 1].classList.add('prev');
    }
  items[index].classList.add('active');
  if (items[index].style.right) {items[index].style.right = 'unset';}
  items[index].style.left = (0.5 * document.querySelector('.slider__items').offsetWidth - 0.5 * items[index].offsetWidth) + 'px';
  if(items[index + 1]) {
    if (items[index + 1].style.right) {items[index + 1].style.right = 'unset';}
    items[index + 1].style.left = (0.5 * document.querySelector('.slider__items').offsetWidth + 0.5 * items[index].offsetWidth) + 'px';
    items[index + 1].classList.add('next');
  }
  index++;
  if (index === items.length) {
    index = 0;
  }
}}, 2000);


//плеер
const audio = document.getElementById('section__songs__audio');
const time = document.querySelector('.section__songs__time');
const btnPlay = document.querySelector('.section__songs__play');
const btnPause = document.querySelector('.section__songs__pause');
const btnPrev = document.querySelector('.section__songs__prev');
const btnNext = document.querySelector('.section__songs__next');
const songs = document.querySelectorAll('.section__songs__tracks p');
const playlist = [
  'Иван Коробов-Вечер на дне.mp3',
  'treck2.mp3',
  'treck3.mp3',
  'treck4.mp3',
];

let track;
window.onload = function() {
  track = 0;
}
function switchTrack (numTrack) {
  audio.src = './audio/' + playlist[numTrack];
  audio.currentTime = 0;
  audio.play();
}

btnPlay.addEventListener('click', function() {
  audio.play();
  audioPlay = setInterval(function() {
      let audioTime = Math.round(audio.currentTime);
      let audioLength = Math.round(audio.duration)
      time.style.width = (audioTime * 100) / audioLength + '%';
      if (audioTime === audioLength && track < playlist.length - 1) {
          track ++; 
          switchTrack(track);
      } else if (audioTime == audioLength && track >= playlist.length - 1) {
          track = 0;
          switchTrack(track);
      }
  }, 10)
});

btnPause.addEventListener('click', function() {
  audio.pause();
  clearInterval(audioPlay);
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
function rewind(event) {
  let newTime = event.offsetX;
  time.style.width = `${newTime / document.querySelector('.section__songs__audio-track').offsetWidth * 100}%`;
  audio.currentTime = audio.duration * newTime / document.querySelector('.section__songs__audio-track').offsetWidth;
}

const songList = Array.from(songs);
songList.forEach (song => {
  song.addEventListener('click', function(event) {
    track = songList.indexOf(event.target);
    switchTrack(track);
  })
});

//добавить определение,какой из списка трек играет и поменять его отображение - покрупнее шрифт и тд


