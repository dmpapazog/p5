let size = 100;
let step;
let temp = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noLoop();

	updateCanvas();
}

function updateCanvas() {
	drawRect();
}

function draw() {
	translate(size * 3, size * 3);
	background(255);
	fill(0);

	if (temp < size) {
		step = size / 100;
		rect(0, 0, temp, temp);
		temp += step;
	} else {
		rect(0, 0, size, size);
		noLoop();
	}
}

function drawRect() {
	loop();

	// step = size / 100;
	// while (temp < size) {
	// 	step = size / 100;
	// 	rect(0, 0, temp, temp);
	// 	temp += step;
	// }
	// rect(0, 0, size, size);
}