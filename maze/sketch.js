var cols, rows;
var w = 20;
var grid = []; // index = (cols * i) + j
var frontier = [];
var closedSet = [];
var backTrack = [];
var previous;
var backB = false;

function setup() {
	// frameRate(7);
	createCanvas(windowWidth, windowHeight);
	cols = floor(width / w);
	rows = floor(height / w);

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			var cell = new Cell(i, j);
			grid.push(cell);
		}
	}

	frontier.push(grid[0]);
}

function draw() {
	background(51);
	for (let i = 0; i < grid.length; i++) {
		grid[i].show();
	}

	let current;
	if (!backB) {
		current = frontier.pop();
	} else {
		current = backTrack.pop();
	}

	if (!closedSet.includes(current)) {
		closedSet.push(current);
	}
	
	current.showCurrent();
	if ((previous !== undefined) && (!backB)) {
		current.removeWalls(previous);
	}


	let children = [];
	children = current.expand();
	if (children.length !== 0) {
		let rand = floor(random(0, children.length));
		frontier.push(children[rand]);
		backTrack.push(current);
		backB = false;
	} else {
		backB = true;
	}

	previous = current;
}