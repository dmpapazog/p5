class Cell {
	constructor(i, j) {
		this.i = i;
		this.j = j;
		this.walls = [true, true, true, true];
	}

	show() {
		let x = this.j * w;
		let y = this.i * w;
		stroke(255);

		// TOP
		if (this.walls[0]) {
			line(x, y, x + w, y);
		}

		// RIGHT
		if (this.walls[1]) {
			line(x + w, y, x + w, y + w);
		}

		// BOTTOM
		if (this.walls[2]) {
			line(x, y + w, x + w, y + w);
		}

		// LEFT
		if (this.walls[3]) {
			line(x, y, x, y + w);
		}

		if (closedSet.includes(this)) {
			noStroke();
			fill(255, 0, 255, 100);
			rect(x, y, w, w);
		}
	}

	showCurrent() {
		let x = this.j * w;
		let y = this.i * w;

		noStroke();
		fill(0, 0, 255, 100);
		rect(x, y, w, w);
	}

	expand() {
		let children = [];
		let temp;

		if (this.i - 1 >= 0) {
			temp = grid[(cols * (this.i - 1)) + this.j];
			if (!closedSet.includes(temp)) {
				children.push(temp);
			}
		}
		if (this.j + 1 < cols) {
			temp = grid[(cols * this.i) + (this.j + 1)];
			if (!closedSet.includes(temp)) {
				children.push(temp);
			}
		}
		if (this.i + 1 < rows) {
			temp = grid[(cols * (this.i + 1)) + this.j];
			if (!closedSet.includes(temp)) {
				children.push(temp);
			}
		}
		if (this.j - 1 >= 0) {
			temp = grid[(cols * this.i) + (this.j - 1)];
			if (!closedSet.includes(temp)) {
				children.push(temp);
			}
		}

		return children;
	}

	removeWalls(previous) {
		let diffI = this.i - previous.i;
		let diffJ = this.j - previous.j;

		// Previous is Top
		if (diffI === 1) {
			grid[(cols * previous.i) + previous.j].walls[2] = false;
			grid[(cols * this.i) + this.j].walls[0] = false;
		}
		// Previous is Bottom
		else if (diffI === -1) {
			grid[(cols * previous.i) + previous.j].walls[0] = false;
			grid[(cols * this.i) + this.j].walls[2] = false;
		}

		// Previous is Left
		if (diffJ === 1) {
			grid[(cols * previous.i) + previous.j].walls[1] = false;
			grid[(cols * this.i) + this.j].walls[3] = false;
		}
		// Previous is Right
		else if (diffJ === -1 ) {
			grid[(cols * previous.i) + previous.j].walls[3] = false;
			grid[(cols * this.i) + this.j].walls[1] = false;
		}
	}
}