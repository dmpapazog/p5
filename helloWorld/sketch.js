function setup()
{
	createCanvas(windowWidth, windowHeight);
	background(100);
	greetMe();
}

function draw()
{
	fill(0, 0, 0, 10);
	rectMode(CENTER);
	rect(100, 100, 50, 60, 88);

	if (mouseIsPressed) {
		fill(0);
	} else {
		fill(255)
	}
	strokeWeight(3);
	arc(mouseX, mouseY, 40, 40, QUARTER_PI, 7 * QUARTER_PI);
}

function greetMe(yourName)
{
	console.log("Hello " + yourName);
}