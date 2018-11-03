
var slides = $('.slide');

slides.first().before(slides.last());
setInterval(show,8000);

function show(){
  slides = $('.slide');
  var activeSlide = $('.active');

  slides.last().after(slides.first());

  activeSlide.removeClass('active').next('.slide').addClass('active');
}

var slide1 = document.getElementByClass('s1');
var slide2 = document.getElementByClass('s2');
var slide3 = document.getElementByClass('s3');

slide1.addEventListener("click", butChange());

function butChange() {
  if(button.innerHTML = 'Select an organization') {
    button.innerHTML = 'Vote for Organization 1';
  }
  else () {
    button.innerHTML - 'Select an organization';
  }

  }
}
