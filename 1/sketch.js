let song

function preload() {
  song = loadSound("../assets/birdsong.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  fill(0);
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
}
}
