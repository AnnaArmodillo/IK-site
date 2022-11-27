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
      document.querySelector('header').classList.add('header__scrolled');
    } else {
      document.querySelector('header').classList.remove('header__scrolled');
    }
  }
  window.addEventListener("scroll", updateScroll);
  
let index = 0;
setInterval(function() {
    if (!hover) {
    for (let i = 0; i < items.length; i++) {
        items[i].style.left = '900px';
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
