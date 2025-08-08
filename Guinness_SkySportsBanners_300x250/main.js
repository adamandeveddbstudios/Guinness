// Banner duration timer start time
var startTime;

// Timeline reference
var tl;

// Init tricggered by onLoad in Body tag
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
  tl.set("#bg", { transformPerspective: 1000, force3D: true });
  tl.to([".lastLine, .logo"],0.5,{ autoAlpha: 0, ease: Power1.easeInOut },"+=2.5");
  tl.to("#bg", 1.5, { x: -46, y: -61, ease: "power1.inOut",},);
  tl.to(".copy", 0.5, { autoAlpha: 1, ease: Power1.easeInOut }, "-=0.5");
}



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
