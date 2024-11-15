let song;
let samples;
let colors = [];
let rectColors = []; // array to store colors for each rect
let rotations = []; // array to store random rotations for each rect

function preload() {
  song = loadSound("../assets/birdsong.mp3");
  bird1a = loadImage("../assets/bird1a.png");
  bird1b = loadImage("../assets/bird1b.png");
  bird2 = loadImage("../assets/bird2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  samples = song.getPeaks();

  //Colors from the album cover
  let t = 100;
  colors.push(color(32, 64, 52, t));
  colors.push(color(28, 26, 29, t));
  colors.push(color(247, 231, 206, t));
  colors.push(color(136, 149, 126, t));
  colors.push(color(74, 51, 29, t));

  // Assign a random color to each sample
  for (let i = 0; i < samples.length; i++) {
    rectColors.push(random(colors));
    // Randomize the rotation angle for each rectangle
    rotations.push(random(-PI, PI));
  }
}

function draw() {
  background(220, 60);

  // Draw rect with fixed colors and random tilts
  for (let idx = 0; idx < samples.length; idx++) {
    let x = map(idx, 0, samples.length - 1, 0, width);
    let y = map(samples[idx], -1, 1, -height / 2, height / 2);

    fill(rectColors[idx]);

    push();
    translate(x, height / 1.5 + y);
    rotate(rotations[idx]); // getting rid of this makes it a normal line graph
    rect(0, 0, 2, 100);
    pop();
  }

  tint(32, 64, 52);
  image(
    bird1b,
    width - bird1b.width / 2.1,
    height / 1 - bird1b.height / 2.3,
    bird1b.width / 3,
    bird1b.height / 3
  );
  // image(bird2, width/4, height/ 5, bird2.width / 2, bird2.height / 2) // other bird option
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
    console.log("Song paused");
  } else {
    song.play();
    console.log("Song playing");
  }
}
