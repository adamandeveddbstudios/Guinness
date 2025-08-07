// Banner duration timer
var startTime;

// GSAP Timeline
var tl;

// Track current banner state
var isExpanded = false;

// Init onload
function init() {
  startTime = new Date();
  tl = new TimelineMax({ onComplete: endTime });

  setRollover();
  animateCollapsed(); // Start in collapsed state
}

// Collapsed animation
function animateCollapsed() {
  if (!isExpanded) return; // Already collapsed

  isExpanded = false;
  tl.clear();

  tl.set("#main", { autoAlpha: 1 });
  tl.set("#main2", { autoAlpha: 0 });
  tl.set("#bg-small", { transformPerspective: 1000, force3D: true });

  tl.to([".tag-small", ".logo-small"], 0.5, { autoAlpha: 0, ease: Power1.easeInOut }, "+=2.5");
  tl.to("#bg-small", 2, { x: 515, y: -51, scale: 2.18, ease: "power1.inOut" });
  tl.to(".copy", 0.5, { autoAlpha: 1, ease: Power1.easeInOut }, "-=0.5");
}

// Expanded animation
function animateExpanded() {
  if (isExpanded) return; // Already expanded

  isExpanded = true;
  tl.clear();

  tl.set("#main", { autoAlpha: 0 });
  tl.set("#main2", { autoAlpha: 1 });
  // tl.set("#bg-big", { transformPerspective: 1000, force3D: true });

  tl.to([".tag-big", ".logo-big"], 0.5, { autoAlpha: 0, ease: Power1.easeInOut }, "+=2.5");
  tl.to("#bg-big", 2, { x: 303, y: -20, scale: 1.95, ease: "power1.inOut" });
  tl.to(".copy-big", 0.5, { autoAlpha: 1, ease: Power1.easeInOut }, "-=0.5");
}

// Expand on hover
function default_over() {
  animateExpanded();
}

// Collapse on mouse out
function default_out() {
  animateCollapsed();
}

// Set rollover listeners
function setRollover() {
  var exit = document.getElementById("banner");
  if (exit) {
    exit.addEventListener("mouseover", default_over);
    exit.addEventListener("mouseout", default_out);
  }
}

// Animation duration log
function endTime() {
  var endTime = new Date();
  console.log("Animation duration: " + (endTime - startTime) / 1000 + " seconds");
}
