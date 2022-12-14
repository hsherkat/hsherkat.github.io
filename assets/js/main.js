/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

/* THEME STUFF starts here */
const songList = [
  "spooky",
  "creepy",
  "graveyard",
  "ghouls",
  "lacrimosa",
  "mass",
  "midnight",
];
let randomIndex = Math.floor(Math.random() * songList.length);
let randomSong = songList[randomIndex];
let songPath = "sounds/" + randomSong + ".mp3";

let audio = document.getElementById("music");
let source = document.querySelector("#music source");
audio.src = songPath;
source.src = songPath;

let audioPlay = () => audio.play();

body = document.querySelector("body");
audio.volume = 0.03;

body.addEventListener("animationiteration", () => {
  let duration = 10 + Math.floor(Math.random() * 20);
  body.style.setProperty("--animation-time", duration + "s");
});

defaultToggle = document.querySelector(".default-toggle");
defaultToggle.addEventListener("click", () => {
  clearThemes();
  stopMusic();
});

spookyToggle = document.querySelector(".spooky-toggle");
spookyToggle.addEventListener("click", () => {
  clearThemes();
  stopMusic();
  playSpooky();
  body.classList.add("spooky");
});

autumnToggle = document.querySelector(".autumn-toggle");
autumnToggle.addEventListener("click", () => {
  clearThemes();
  stopMusic();
  playFireplace();
  body.classList.add("autumn");
  randomizeLeaves();
});

festiveToggle = document.querySelector(".festive-toggle");
festiveToggle.addEventListener("click", () => {
  clearThemes();
  stopMusic();
  body.classList.add("festive");
  playFestive();
});

function playSpooky() {
  audio.src = songPath;
  source.src = songPath;
  audioPlay();
  audio.volume = 0.03;
}

function playFireplace() {
  soundPath = "sounds/fireplace.mp3";
  audio.src = soundPath;
  source.src = soundPath;
  audioPlay();
  audio.volume = 0.3;
}

function playFestive() {
  soundPath = "sounds/festive.mp3";
  audio.src = soundPath;
  source.src = soundPath;
  audioPlay();
  audio.volume = 0.03;
}

function stopMusic() {
  audio.pause();
  audio.currentTime = 0;
}

function clearThemes() {
  body.classList.remove("spooky");
  body.classList.remove("autumn");
  body.classList.remove("festive");
}

function randomizeLeaves() {
  const leaves = document.querySelectorAll("#leaves i");
  const leaves_arr = Array.from(leaves);

  leaves_arr.map((leaf, idx) => {
    delay = (7 * Math.random()).toFixed(2) + "s";
    leaf.style.setProperty("-webkit-animation-delay", delay);
  });
}

/* THEME STUFF ends here */

(function ($) {
  var $window = $(window),
    $body = $("body"),
    $wrapper = $("#wrapper"),
    $main = $("#main"),
    $panels = $main.children(".panel"),
    $nav = $("#nav"),
    $nav_links = $nav.children("a");

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["361px", "736px"],
    xsmall: [null, "360px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Nav.
  $nav_links.on("click", function (event) {
    var href = $(this).attr("href");

    // Not a panel link? Bail.
    if (href.charAt(0) != "#" || $panels.filter(href).length == 0) return;

    // Prevent default.
    event.preventDefault();
    event.stopPropagation();

    // Change panels.
    if (window.location.hash != href) window.location.hash = href;
  });

  // Panels.

  // Initialize.
  (function () {
    var $panel, $link;

    // Get panel, link.
    if (window.location.hash) {
      $panel = $panels.filter(window.location.hash);
      $link = $nav_links.filter('[href="' + window.location.hash + '"]');
    }

    // No panel/link? Default to first.
    if (!$panel || $panel.length == 0) {
      $panel = $panels.first();
      $link = $nav_links.first();
    }

    // Deactivate all panels except this one.
    $panels.not($panel).addClass("inactive").hide();

    // Activate link.
    $link.addClass("active");

    // Reset scroll.
    $window.scrollTop(0);
  })();

  // Hashchange event.
  $window.on("hashchange", function (event) {
    var $panel, $link;

    // Get panel, link.
    if (window.location.hash) {
      $panel = $panels.filter(window.location.hash);
      $link = $nav_links.filter('[href="' + window.location.hash + '"]');

      // No target panel? Bail.
      if ($panel.length == 0) return;
    }

    // No panel/link? Default to first.
    else {
      $panel = $panels.first();
      $link = $nav_links.first();
    }

    // Deactivate all panels.
    $panels.addClass("inactive");

    // Deactivate all links.
    $nav_links.removeClass("active");

    // Activate target link.
    $link.addClass("active");

    // Set max/min height.
    $main
      .css("max-height", $main.height() + "px")
      .css("min-height", $main.height() + "px");

    // Delay.
    setTimeout(function () {
      // Hide all panels.
      $panels.hide();

      // Show target panel.
      $panel.show();

      // Set new max/min height.
      $main
        .css("max-height", $panel.outerHeight() + "px")
        .css("min-height", $panel.outerHeight() + "px");

      // Reset scroll.
      $window.scrollTop(0);

      // Delay.
      window.setTimeout(
        function () {
          // Activate target panel.
          $panel.removeClass("inactive");

          // Clear max/min height.
          $main.css("max-height", "").css("min-height", "");

          // IE: Refresh.
          $window.triggerHandler("--refresh");

          // Unlock.
          locked = false;
        },
        breakpoints.active("small") ? 0 : 500
      );
    }, 250);
  });

  // IE: Fixes.
  if (browser.name == "ie") {
    // Fix min-height/flexbox.
    $window.on("--refresh", function () {
      $wrapper.css("height", "auto");

      window.setTimeout(function () {
        var h = $wrapper.height(),
          wh = $window.height();

        if (h < wh) $wrapper.css("height", "100vh");
      }, 0);
    });

    $window.on("resize load", function () {
      $window.triggerHandler("--refresh");
    });

    // Fix intro pic.
    $(".panel.intro").each(function () {
      var $pic = $(this).children(".pic"),
        $img = $pic.children("img");

      $pic
        .css("background-image", "url(" + $img.attr("src") + ")")
        .css("background-size", "cover")
        .css("background-position", "center");

      $img.css("visibility", "hidden");
    });
  }
})(jQuery);

let bodyElement = document.querySelector("body");
bodyElement.addEventListener("click", (e) => {
  if (400 < e.clientX && e.clientX < 440 && 60 < e.clientY && e.clientY < 78) {
    console.log("oh, you like to party???");
  }
});
