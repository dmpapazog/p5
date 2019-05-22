class Grid
{    
    constructor(rows, cols, size)
    {
        this.rows = rows;
        this.cols = cols;
        this.size = size;
        this.grid = [];
        this.previous = [];
        this.previousScore = 0;
        this.reverse = false;
        this.score = 0;

        for (let i = 0; i < rows; i++) {
            this.grid[i] = [];
            this.previous[i] = [];
            for (let j = 0; j < cols; j++) {
                this.grid[i][j] = 0;
                this.previous[i][j] = 0;
            }
        }
    }

    show()
    {
        stroke(100);
        fill(51, 51, 51);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.grid[i][j] === 0) {
                    fill(51, 51, 51);
                    rect(j * this.size, i * this.size, this.size, this.size, 2);
                } else {
                    fill(10, 160, 10);
                    rect(j * this.size, i * this.size, this.size, this.size, 10);
                    this.printNumber(i, j);
                }
            }
        }
    }

    addNumber() 
    {
        let options = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.grid[i][j] === 0) {
                    options.push({
                        x: i,
                        y: j
                    });
                }
            }
        }

        if (options.length > 0) {
            let randomPos = random(options);
            let      rand = random(1);
            this.grid[randomPos.x][randomPos.y] = rand > 0.9 ? 4 : 2;
        }
    }

    printNumber(i, j)
    {
        let value = this.grid[i][j];
        if (value > 0) {
            let offset = this.size / 2;
            let size = this.size - 20;
            if (value / 10 >= 10) {
                size -= 20;
            }
            if (value / 10 >= 100) {
                size -= 10;
            }

            push();
            textAlign(CENTER, CENTER);
            textSize(size);
            fill(0);
            noStroke();
            text(value, j * this.size + offset, i * this.size + offset);
            pop();
        }
    }

    move(direction)
    {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.previous[i][j] = this.grid[i][j];
                
            }
        }
        this.previousScore = this.score;

        let flagSwap = false;
        let flagMerge = false;
        switch (direction) {
            case "UP":
                for (let i = 1; i < this.rows; i++) {
                    for (let j = 0; j < this.cols; j++) {
                        if (this.grid[i][j] === 0) {
                            continue;
                        }
                        let tempI = i;
                        while (tempI > 0 && this.grid[tempI - 1][j] === 0) {
                            tempI--;
                            flagSwap = true;
                        }
                        this.swap(i, j, tempI, j);
                        if (!flagMerge) {
                            flagMerge = this.merge(tempI, j, tempI - 1, j); 
                        } else {
                            this.merge(tempI, j, tempI - 1, j);
                        }
                    }
                }
                break;
            case "DOWN":
                for (let i = this.rows - 2; i >= 0; i--) {
                    for (let j = 0; j < this.cols; j++) {
                        if (this.grid[i][j] === 0) {
                            continue;
                        }
                        let tempI = i;
                        while (tempI < this.rows - 1 && this.grid[tempI + 1][j] === 0) {
                            tempI++;
                            flagSwap = true;
                        }
                        this.swap(i, j, tempI, j);
                        if (!flagMerge) {
                            flagMerge = this.merge(tempI, j, tempI + 1, j); 
                        } else {
                            this.merge(tempI, j, tempI + 1, j);
                        }
                    }
                }
                break;
            case "LEFT":
                for (let j = 1; j < this.cols; j++) {
                    for (let i = 0; i < this.rows; i++) {
                        if (this.grid[i][j] === 0) {
                            continue;
                        }
                        let tempJ = j;
                        while (tempJ > 0 && this.grid[i][tempJ - 1] === 0) {
                            tempJ--;
                            flagSwap = true;
                        }
                        this.swap(i, j, i, tempJ);
                        if (!flagMerge) {
                            flagMerge = this.merge(i, tempJ, i, tempJ - 1); 
                        } else {
                            this.merge(i, tempJ, i, tempJ - 1);
                        }
                    }
                }
                break;
            case "RIGHT":
                for (let j = this.cols - 2; j >= 0; j--) {
                    for (let i = 0; i < this.rows; i++) {
                        if (this.grid[i][j] === 0) {
                            continue;
                        }
                        let tempJ = j;
                        while (tempJ < this.cols - 1 && this.grid[i][tempJ + 1] === 0) {
                            tempJ++;
                            flagSwap = true;
                        }
                        this.swap(i, j, i, tempJ);
                        if (!flagMerge) {
                            flagMerge = this.merge(i, tempJ, i, tempJ + 1); 
                        } else {
                            this.merge(i, tempJ, i, tempJ + 1);
                        }
                    }
                }
                break;
        
            default:
                break;
        }
        if (flagSwap || flagMerge) {
            this.addNumber();
            this.reverse = true;
        }
    }

    swap(i1, j1, i2, j2)
    {
        let tempVal = this.grid[i1][j1];
        this.grid[i1][j1] = this.grid[i2][j2];
        this.grid[i2][j2] = tempVal;
    }

    merge(i1, j1, i2, j2)
    {
        if (i2 >= 0 && i2 < this.rows && j2 >= 0 && j2 < this.cols && this.grid[i1][j1] === this.grid[i2][j2]) {
            this.grid[i2][j2] *= 2;
            this.grid[i1][j1] = 0;
            this.score += this.grid[i2][j2];
            return true;
        } else {
            return false;
        }
    }

    undo()
    {
        if (this.reverse) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.grid[i][j] = this.previous[i][j];
                    
                }
            }
            this.score = this.previousScore;
            this.reverse = false;
        }
    }

    isGameOver()
    {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.grid[i][j] === 0) {
                    return false;
                }
                if (i > 0 && this.grid[i][j] === this.grid[i - 1][j]) {
                    return false;
                }
                if (i < this.rows - 1 && this.grid[i][j] === this.grid[i + 1][j]) {
                    return false;
                }
                if (j > 0 && this.grid[i][j] === this.grid[i][j - 1]) {
                    return false;
                }
                if (j < this.cols - 1 && this.grid[i][j] === this.grid[i][j + 1]) {
                    return false;
                }
            }
        }
        return true;
    }
}