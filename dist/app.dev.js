'use strict';

var links = document.querySelectorAll('.navbar__item');
var contNav = document.querySelector('.container__nav');
var intervals = [];
var body = document.getElementsByTagName('body')[0];
var windowWidth = window.innerWidth || document.documentElement.clientWidth || body.clientWidth;
window.addEventListener("resize", getWindowSize);

function getWindowSize() {
  windowWidth = window.innerWidth || document.documentElement.clientWidth || body.clientWidth;
}

document.addEventListener('scroll', function () {
  if (window.scrollY > 96 && windowWidth >= 755) {
    contNav.style.position = 'sticky';
    contNav.style.top = '0';
  } else if (window.scrollY <= 96 && contNav.style.position === 'sticky') {
    contNav.style.position = 'relative';
    contNav.style.top = '90px';
  }

  if (windowWidth < 755 && contNav.style.position === 'sticky') {
    contNav.style.position = 'relative';
    contNav.style.top = '90px';
  }

  var index = null;
  if (window.scrollY >= 0 && window.scrollY < 663) index = 0;else if (window.scrollY >= 663 && window.scrollY < 2524.5) index = 1;else if (window.scrollY >= 2524.5 && window.scrollY < 3620.87) index = 2;else if (window.scrollY >= 3620.87 && window.scrollY < 4469) index = 3;else if (window.scrollY >= 4469 && window.scrollY < 5858.5) index = 4;else if (window.scrollY >= 5858.5) index = 5;else alert('Error with the scroll!');
  links[index].classList.add('active');
  removeClassActiveExcept(index);
});

function removeClassActiveExcept(index) {
  for (var i = 0; i < links.length; i++) {
    if (i !== index && links[i].classList.contains('active')) {
      links[i].classList.remove('active');
    }
  }
}

links.forEach(function (el, index) {
  el.addEventListener('click', function () {
    if (el.classList.contains('active')) return;
    el.classList.add('active');
    var scroll = null;
    if (index === 0) scroll = 0;else if (index === 1) scroll = 664;else if (index === 2) scroll = 2525.5;else if (index === 3) scroll = 3621.87;else if (index === 4) scroll = 4470;else if (index === 5) scroll = 5859.5;
    intervals.forEach(clearInterval);
    var intervalScroll = setInterval(function () {
      if (window.scrollY < scroll) {
        if (scroll - window.scrollY >= 80) window.scrollBy(0, 80);else window.scrollTo(0, scroll);
      } else if (window.scrollY > scroll) {
        if (window.scrollY - scroll >= 80) window.scrollBy(0, -80);else window.scrollTo(0, scroll);
      }

      if (Math.abs(scroll - window.scrollY) < 1) clearInterval(intervalScroll);
    }, 16.67); // 1000 / 60

    intervals.push(intervalScroll);
    removeClassActiveExcept(index);
  });
});