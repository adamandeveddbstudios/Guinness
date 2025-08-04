
var startTime;
var tl;


var pause = false;
var bg = document.getElementsByClassName("bg");
console.log(bg)


var randomX = random(5, 3);
var randomY = random(-5, -7);
var randomDelay = random(0, 1);
var randomTime = random(2, 3);
var randomTime2 = random(2, 3);
var randomAngle = random(2, 3);

function rotate(target, direction) {
  
  TweenLite.to(target, randomTime2(), {
    rotation: randomAngle(direction),
    // delay: randomDelay(),
    ease: Sine.easeInOut,
    onComplete: pause ? null : rotate,
    onCompleteParams: [target, direction * -1]
  });
}

function moveX(target, direction) {
  
  TweenLite.to(target, randomTime(), {
    x: randomX(direction),
    ease: Sine.easeInOut,
    onComplete: pause ? null : moveX,
    onCompleteParams: [target, direction * -1]
  });
}

function moveY(target, direction) {  
  TweenLite.to(target, randomTime(), {
    y: randomY(direction),
    ease: Sine.easeInOut,
    onComplete: pause ? null : moveY,
    onCompleteParams: [target, direction * -1]
  });
}


function random(min, max) {
  var delta = max - min;
  return (direction = 2) => (min + delta * Math.random()) * direction;
}




function init() {
  // Set Banner duration timer
  startTime = new Date();

  // Set Global Timeline
  tl = new TimelineMax({ onComplete: endTime });
  setRollover();
  animate();
}

function animate() {
  tl.set("#main", { autoAlpha: 1, force3D: true });
  tl.set(".bg",{ease: Power2.easeInOut})

  moveY(bg, -1);
  moveX(bg, 2);
  rotate(bg, 1);

}

  // tl.to("#bg", 2, { x: -45, y: -61, ease: "power1.inOut",},);


function randomInt(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function endTime() {
  // show total banner animation time in browser console.
  var endTime = new Date();

  console.log(
    "Animation duration: " + (endTime - startTime) / 1000 + " seconds"
  );
}

// CTA grow on hover

function setRollover() {
  document
    .getElementById("default_exit")
    .addEventListener("mouseover", default_over, false);
  document
    .getElementById("default_exit")
    .addEventListener("mouseout", default_out, false);
}

function default_over() {
  TweenMax.to("#cta", 0.3, {
    scale: 1.1,
    transformOrigin: "100% 73%",
    ease: Power2.easeOutIn,
  });
}

function default_out() {
  TweenMax.to("#cta", 0.3, { scale: 1, ease: Power1.easeInOut });
}
