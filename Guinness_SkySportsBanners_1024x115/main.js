var startTime;
var tl;
var tl1;
var isExpanded = false;

function init() {
  startTime = new Date();

  setRollover();
  animateCollapsed(); // Start with collapsed animation
}

function animateCollapsed() {
  isExpanded = false;

  // Kill and clear the expanded timeline safely
  if (tl1) {
    tl1.kill();
    tl1 = null;
  }

  // Clear and rebuild collapsed timeline
  tl = gsap.timeline({ onComplete: endTime });

  gsap.set("#main", { autoAlpha: 1 });
  gsap.set("#main2", { autoAlpha: 0 });
  gsap.set("#bg-small", { transformPerspective: 1000, force3D: true });

   tl.to([".tag-small", ".logo-small"], 0.5, {autoAlpha: 0, ease: Power1.easeInOut}, "+=2.5");
    tl.to("#bg-small", 1, { x: 390, y: -18, scale: 1.6, ease: "power1.inOut" });
    tl.to(".copy", 0.5, {autoAlpha: 1, ease: Power1.easeInOut}, "-=0.5");
}

function animateExpanded() {
  isExpanded = true;

  // Kill and clear the collapsed timeline safely
  if (tl) {
    tl.kill();
    tl = null;
  }

  // Clear and rebuild expanded timeline
  tl1 = gsap.timeline({ onComplete: endTime });

  gsap.set("#main", { autoAlpha: 0 });
  gsap.set("#main2", { autoAlpha: 1 });

  tl1.to([".tag-big", ".logo-big"], 0.5, { autoAlpha: 0, ease: Power1.easeInOut }, "+=2.5");
  tl1.to("#bg-big", 1, {x: 411, y: -38, scale: 2.2, ease: "power1.inOut" });
  tl1.to(".copy-big", 0.5, {autoAlpha: 1, ease: Power1.easeInOut}, "-=0.5");
}

function default_over() {
  if (!isExpanded) {
    animateExpanded();
  }
}

function default_out() {
  if (isExpanded) {
    animateCollapsed();
  }
}

function setRollover() {
  var banner = document.getElementById("banner");
  if (banner) {
    banner.addEventListener("mouseenter", default_over);
    banner.addEventListener("mouseleave", default_out);
  }
}

function endTime() {
  var end = new Date();
  console.log("Duration: " + (end - startTime) / 1000 + "s");
}

window.onload = init;
