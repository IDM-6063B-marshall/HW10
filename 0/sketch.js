let mAmplitude;
let mFFT;
let slider;
let song;

function preload() {
  song = loadSound("../assets/coffee.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  mFFT = new p5.FFT();
  mAmplitude = new p5.Amplitude();

  slider = createSlider(80, 160, 120);
  slider.position(10, 10);
  slider.size(150);
}

function draw() {
  let creaminess = slider.value();

  // Smooth transition for background color
  let bgColor = color(248, 244, 227); // Base light beige
  let bgRed = lerp(248, 169, creaminess / 160);
  let bgGreen = lerp(244, 124, creaminess / 160);
  let bgBlue = lerp(227, 115, creaminess / 160);
  background(bgRed, bgGreen, bgBlue);

  noStroke();
  mFFT.analyze();

  // Set up the grid for the circles (mapped box in the center)
  let boxWidth = 600; // Width of the box
  let boxHeight = 400; // Height of the box
  let boxX = (width - boxWidth) / 2; // Centered horizontally
  let boxY = (height - boxHeight) / 2; // Centered vertically

  // Bass (darkest color brown)
  push();
  fill(54, 34, 20);
  let energyB = mFFT.getEnergy("bass");
  let diamB = map(energyB, 0, 255, 0, 100); // Smaller diameter for bass circles

  for (let y = boxY; y < boxY + boxHeight; y += 100) {
    for (let x = boxX; x < boxX + boxWidth; x += 100) {
      ellipse(x, y, diamB);
    }
  }
  pop();

  // Mid-tone (mid frequencies)
  push();
  fill((169 + 54) / 2, (124 + 34) / 2, (115 + 20) / 2);
  let energyM = mFFT.getEnergy("mid");
  let diamM = map(energyM, 0, 255, 0, 100); // Smaller diameter for mid-range circles

  for (let y = boxY; y < boxY + boxHeight; y += 100) {
    for (let x = boxX; x < boxX + boxWidth; x += 100) {
      ellipse(x, y, diamM);
    }
  }
  pop();

  // Treble (lightest color)
  push();
  fill(169, 124, 115);
  let energyT = mFFT.getEnergy("treble");
  let diamT = map(energyT, 0, 255, 0, 100); // Smaller diameter for treble circles

  for (let y = boxY; y < boxY + boxHeight; y += 100) {
    for (let x = boxX; x < boxX + boxWidth; x += 100) {
      ellipse(x, y, diamT);
    }
  }
  pop();

  // coffee mug
  // code snagged from https://editor.p5js.org/emayne/sketches/eufFc7M05
  push();
  noStroke();
  fill(56, 18, 34);
  translate(windowWidth / 2, windowHeight / 2.5);
  rect(180, 200, 250, 200);
  arc(305, 400, 250, 150, (4 * PI) / 2, (2 * PI) / 2);
  ellipse(420, 300, 170, 200);
  arc(305, 210, 250, 150, (2 * PI) / 2, (4 * PI) / 2);

  fill(bgRed, bgGreen, bgBlue);
  arc(430, 300, 110, 140, (3 * PI) / 2, PI / 2);

  fill((169 + 54) / 2, (124 + 34) / 2, (115 + 20) / 2);
  ellipse(305, 220, 215, 105);
  pop();

  let vol = mAmplitude.getLevel();
  let steam = map(vol, 0, 1, 0, 255); // transparency of steam based on vol

  fill(248, 244, 227, steam);
  strokeWeight(15);

  for (let i = 0; i < 3; i++) {
    beginShape();
    for (let y = 450; y < 650; y++) {
      let x = 1000 + i * 60 + sin(y * 0.05) * 10; // Sine wave for horizontal movement
      vertex(x - 40, y - 75);
    }
    endShape();
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
