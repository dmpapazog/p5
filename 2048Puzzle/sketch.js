let grid;
let rows = 4;
let cols = 4;
let size = 80;

function setup() {
	createCanvas(600, 400);

	grid = new Grid(rows, cols, size);
	
	grid.addNumber();
	console.table(grid.grid);
	
}

function draw() {
	background(100);
	translate((width / 2) - (2 * size), (height / 2) - (2 * size));

	grid.show();	
}

function keyPressed() {
	if (keyCode === RIGHT_ARROW) {
		grid.move("RIGHT");
	} else if (keyCode === LEFT_ARROW) {
		grid.move("LEFT");
	} else if (keyCode === UP_ARROW) {
		grid.move("UP");
	} else if (keyCode === DOWN_ARROW) {
		grid.move("DOWN");
	} else if (key === 'u') {
		grid.undo();
	}
	return false;
}

