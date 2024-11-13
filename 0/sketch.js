let song;
let mAmplitude;
let mFFT;
let slider;

// slider to change bg color for amount of cream you like

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
  
  let bgColor = color(248, 244, 227); // Base light beige
  let bgRed = lerp(248, 169, creaminess / 160);  // Adjust red (more cream, more brownish)
  let bgGreen = lerp(244, 124, creaminess / 160);  // Adjust green (less green with more cream)
  let bgBlue = lerp(227, 115, creaminess / 160);  // Adjust blue (darker as cream increases)
  background(bgRed, bgGreen, bgBlue);

  noStroke();
  mFFT.analyze();


//darkest color = base
  push();
  fill(54, 34, 20);
  let energyB = mFFT.getEnergy("bass");
  let diamB = map(energyB, 0, 255, 0, 150);

  for (let y = 0; y < height + 500; y +=100) {
    for (let x = 0; x < width + 500; x += 100) ellipse(x, y, diamB);
  }
  pop();


// mid tone = mid
  push();
  fill((169 + 54) / 2, (124 + 34) / 2, (115 + 20) / 2);
  let energyM = mFFT.getEnergy("mid");
  let diamM = map(energyM, 0, 255, 0, 150);

  for (let y = 0; y < height + 500; y +=100) {
    for (let x = 0; x < width + 500; x += 100) ellipse(x, y, diamM);
  }
  pop();


// lightest color = treble
  push();
  fill(169, 124, 115);
  let energyT = mFFT.getEnergy("treble");
  let diamT = map(energyT, 0, 255, 0, 150);

  for (let y = 0; y < height+500; y += 100) {
    for (let x = 0; x < width+ 500; x += 100) ellipse(x, y, diamT);
  }
  pop();


//STILL NEED TO DO VOLUME PART
  // let vol = mAmplitude.getLevel();

  // let diam = map(vol, 0, 1, 0, 1.4 * width);
  // let sat = map(vol, 0, 1, 55, 255);

  // let c = color(0, 0, sat, sat);

  // fill(c);
  // ellipse(width / 2, height / 2, diam);

  // coffee mug
  // stole from https://editor.p5js.org/emayne/sketches/eufFc7M05
  // push();
  // fill(56, 18, 34);
  // translate(windowWidth / 2, windowHeight / 2);
  // rect(180, 200, 250, 200);
  // arc(305, 400, 250, 150, (4 * PI) / 2, (2 * PI) / 2);
  // ellipse(420, 300, 170, 200);
  // arc(305, 210, 250, 150, (2 * PI) / 2, (4 * PI) / 2);

  // fill(248, 244, 227)
  // arc(430, 300, 110, 140, (3 * PI) / 2, PI / 2);

  // fill(248, 244, 227);
  // ellipse(305, 220, 215, 115);
  // pop();
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
