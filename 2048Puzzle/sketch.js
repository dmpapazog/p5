let grid;
let rows = 4;
let cols = 4;
let size = 80;
let score = 0;
let gameOver = false;

function setup() {
	createCanvas(600, 400);
	noLoop();

	translate((width / 2) - (2 * size), (height / 2) - (2 * size));
	grid = new Grid(rows, cols, size);
	
	grid.addNumber();
	console.table(grid.grid);
	updateCanvas();
}

function updateCanvas() {
	background(100);

	gameOver = grid.isGameOver();
	if (gameOver) {
		console.log("GAME OVER");
	}
	score = grid.score;
	grid.show();
	select('#score').html(score);
}

function keyPressed() {
	if (keyCode === RIGHT_ARROW) {
		grid.move("RIGHT");
		updateCanvas();
	} else if (keyCode === LEFT_ARROW) {
		grid.move("LEFT");
		updateCanvas();
	} else if (keyCode === UP_ARROW) {
		grid.move("UP");
		updateCanvas();
	} else if (keyCode === DOWN_ARROW) {
		grid.move("DOWN");
		updateCanvas();
	} else if (key === 'u') {
		grid.undo();
		updateCanvas();
	}
	return false;
}

