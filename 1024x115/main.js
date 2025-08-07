// Banner duration timer
  var startTime;

  // GSAP Timelines
  var tl;
  var tl1;

  // Track current banner state
  var isExpanded = false;

  // Init onload
  function init() {
    startTime = new Date();
    tl = new TimelineMax({ onComplete: endTime });
    tl1 = new TimelineMax({ onComplete: endTime });

    setRollover();
    animateCollapsed(); // Start in collapsed state with animation
  }

  // Collapsed animation
  function animateCollapsed() {
    isExpanded = false;

    tl1.kill(); // Kill expanded timeline if running
    tl.clear();

    tl.set("#main", { autoAlpha: 1 });
    tl.set("#main2", { autoAlpha: 0 });
    tl.set("#bg-small", { transformPerspective: 1000, force3D: true });
    tl.to([".tag-small", ".logo-small"], 0.5, {autoAlpha: 0, ease: Power1.easeInOut}, "+=2.5");
    tl.to("#bg-small", 1, { x: 390, y: -18, scale: 1.6, ease: "power1.inOut" });
    tl.to(".copy", 0.5, {autoAlpha: 1, ease: Power1.easeInOut}, "-=0.5");
  }

  // Expanded animation
  function animateExpanded() {
    isExpanded = true;

    tl.kill(); // Kill collapsed timeline if running
    tl1.clear();

    tl1.set("#main", { autoAlpha: 0 });
    tl1.set("#main2", { autoAlpha: 1 });
    tl1.to([".tag-big", ".logo-big"], 0.5, { autoAlpha: 0, ease: Power1.easeInOut }, "+=2.5");
    tl1.to("#bg-big", 1, {x: 274, y: -26, scale: 1.47, ease: "power1.inOut" });
    tl1.to(".copy-big", 0.5, {autoAlpha: 1, ease: Power1.easeInOut}, "-=0.5");
  }

  // Expand on hover
  function default_over() {
    if (!isExpanded) {
      animateExpanded();
    }
  }

  // Collapse on mouse out
  function default_out() {
    if (isExpanded) {
      animateCollapsed();
    }
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

  // Start when window is ready
  window.onload = init;