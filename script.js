

var slides = $('.slide');
slides.first().before(slides.last())
;
/*setInterval(showLeft,6000);*/



function showLeft(){
  slides = $('.slide');
  var activeSlide = $('.active');

  slides.last().after(slides.first());

  activeSlide.removeClass('active').next('.slide').addClass('active');
}

function showRight(){
  slides = $('.slide');
  var activeSlide = $('.active');
$(".slide").css("transform", "(100%, 0)");
   $(".active").css("transform", "(0, 0)");
   $(".active ~.slide").css("transform", "(-100%, 0)");

  slides.first().before(slides.last());

  activeSlide.removeClass('active').prev('.slide').addClass('active');
};

/*** Swipingcode ***/
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const gestureZone = document.getElementById('slider');

gestureZone.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false);

function handleGesture() {
    if (touchendX < touchstartX) {
      slides = $('.slide');
      var activeSlide = $('.active');

      slides.last().after(slides.first());

      activeSlide.removeClass('active').next('.slide').addClass('active');
    }

    if (touchendX > touchstartX) {
      slides = $('.slide');
      var activeSlide = $('.active');
    $(".slide").css("transform", "(100%, 0)");
       $(".active").css("transform", "(0, 0)");
       $(".active ~.slide").css("transform", "(-100%, 0)");

      slides.first().before(slides.last());

      activeSlide.removeClass('active').prev('.slide').addClass('active');
    }

};

/*****Slide style ****/

var slides = document.querySelectorAll(".slide");

for (var i = 0; i < slides.length; i++) {
  slides[i].addEventListener("click",function btnChange() {

    var activeSlide = document.querySelector(".active");
    var slide1 = document.querySelector(".s1");
    var slide2 = document.querySelector(".s2");
    var slide3 = document.querySelector(".s3");
    var slide4 = document.querySelector(".s4");
    var slide5 = document.querySelector(".s5");
    var myButton = document.querySelector("button");

 if (activeSlide.classList.contains("selected") == false) {
   myButton.innerHTML = 'Vote for ' + document.querySelector(".active .orgtitle").innerHTML;
   document.querySelector(".vote p").style.display = "block";
   activeSlide.classList.add("selected");
   document.querySelector(".vote button").classList.remove("votebutton");
   document.querySelector(".vote button").classList.add("votebuttonselect");
   if (slide1.classList.contains("active")==false && slide1.classList.contains("selected") == true) {
     slide1.classList.remove("selected");
   }
   else if (slide2.classList.contains("active")==false && slide2.classList.contains("selected") == true) {
     slide2.classList.remove("selected");
   }
   else if (slide3.classList.contains("active")==false && slide3.classList.contains("selected") == true) {
     slide3.classList.remove("selected");
   }
   else if (slide4.classList.contains("active")==false && slide4.classList.contains("selected") == true) {
     slide4.classList.remove("selected");
   }
   else if (slide5.classList.contains("active")==false && slide5.classList.contains("selected") == true) {
     slide5.classList.remove("selected");
   }
 }

 else {
   myButton.innerHTML = 'Select an organization';
   activeSlide.classList.remove("selected");
   document.querySelector(".vote p").style.display = "none";
   document.querySelector(".vote button").classList.remove("votebuttonselect");
   document.querySelector(".vote button").classList.add("votebutton");
 }



});

document.querySelector(".vote button").addEventListener("click", function thanks() {
  if (document.querySelector(".vote button").classList.contains("votebuttonselect") == true) {
    document.querySelector(".page1").style.display = "none";
    document.querySelector(".thank").style.backgroundColor = "rgba(12, 59, 93, 1)";
    document.querySelector(".thank p").style.color = "rgba(255, 255, 255, 1)";

  } else {
    document.querySelector(".thank").style.zIndex = "-1";
  }
});

};
