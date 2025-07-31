gsap.registerPlugin(SplitText);

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
  tl.set("#hand", { transformPerspective: 1000, force3D: true });
   tl.to(".img", {
    autoAlpha: 1,
    duration: 0.5,
    stagger: 1,
    ease: "power1.inOut"
  }, "+=0.2");

  tl.to(".copy", { autoAlpha: 0, duration: 0.3, ease: "power1.inOut" }, "+=0.5");
  tl.to("#hand",1, {x: -105, y: 18, ease: "power1.inOut", force3D: true }, "<");
  tl.to([".logo"], { autoAlpha: 1, ease: "power1.inOut" }, "+=0.1");
  tl.to([".lastLine"], { autoAlpha: 1, ease: "power1.inOut" }, "+=0.10");
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
