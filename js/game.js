let canvas;
let world;
let keyboard = new Keyboard();
let music = new Audio('audio/western-background-music-146726.mp3');

function init() {
  canvas = document.getElementById('canvas');
  document.getElementById('startScrenns').classList.remove('d-none');
  document.getElementById('canvas').classList.add('d-none');
  document.getElementById('startBTNS').classList.remove('d-none');
  document.getElementById('allBTNS').classList.remove('d-none');
  document.getElementById('spielInfo').classList.remove('d-none');
  document.getElementById('restartBTNS').classList.add('d-none');
  document.getElementById('h2').classList.remove('d-none');
  document.getElementById('mobileBTNs').classList.add('d-none');
}

function startGame() {
  //    init();
  initLevel();
  world = new World(canvas, keyboard);
  document.getElementById('startScrenns').classList.add('d-none');
  document.getElementById('canvas').classList.remove('d-none');
  document.getElementById('startBTNS').classList.add('d-none');
  document.getElementById('allBTNS').classList.add('d-none');
  document.getElementById('spielInfo').classList.add('d-none');
  document.getElementById('restartBTNS').classList.remove('d-none');
  document.getElementById('h2').classList.add('d-none');
  document.getElementById('mobileBTNs').classList.remove('d-none');
  startMobileButtonTouch();
  stopMobileButtonTouch();
}

function restart() {
  location.reload();
}


window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

function startMobileButtonTouch() {
  document.getElementById("left").addEventListener("touchstart", (event) => {
    keyboard.LEFT = true;
    event.preventDefault();
  });
  document.getElementById("right").addEventListener("touchstart", (event) => {
    keyboard.RIGHT = true;
    event.preventDefault();
  });
  document.getElementById("up").addEventListener("touchstart", (event) => {
    keyboard.SPACE = true;
    event.preventDefault();
  });
  document.getElementById("gun").addEventListener("touchstart", (event) => {
    keyboard.D = true;
    event.preventDefault();
  });
}

function stopMobileButtonTouch() {
  document.getElementById("left").addEventListener("touchend", (event) => {
    keyboard.LEFT = false;
    event.preventDefault();
  });
  document.getElementById("right").addEventListener("touchend", (event) => {
    keyboard.RIGHT = false;
    event.preventDefault();
  });
  document.getElementById("up").addEventListener("touchend", (event) => {
    keyboard.SPACE = false;
    event.preventDefault();
  });
  document.getElementById("gun").addEventListener("touchend", (event) => {
    keyboard.D = false;
    event.preventDefault();
  });
}

function right() {
  const button = document.getElementById("right");
  button.addEventListener("mousedown", () => {
    keyboard.RIGHT = true;
  });
  button.addEventListener("mouseup", () => {
    keyboard.RIGHT = false;
  });
}

function left() {
  const button = document.getElementById("left");
  button.addEventListener("mousedown", () => {
    keyboard.LEFT = true;
  });
  button.addEventListener("mouseup", () => {
    keyboard.LEFT = false;
  });
}

function up() {
  const button = document.getElementById("up");
  button.addEventListener("mousedown", () => {
    keyboard.SPACE = true;
  });
  button.addEventListener("mouseup", () => {
    keyboard.SPACE = false;
  });
}

function gun() {
  const button = document.getElementById("gun");

  button.addEventListener("mousedown", () => {
    keyboard.D = true;
  });
  button.addEventListener("mouseup", () => {
    keyboard.D = false;
  });
}


// music
function musicON() {
  if (!music.playd) {
    music.play();
    document.getElementById('music-on').classList.add('d-none');
    document.getElementById('music-off').classList.remove('d-none');
  }
}

function musicOFF() {
  if (!music.pausd) {
    music.pause();
    document.getElementById('music-off').classList.add('d-none');
    document.getElementById('music-on').classList.remove('d-none');
  }
}
