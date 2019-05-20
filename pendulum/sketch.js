let r1  = 125
let r2  = 200
let m1  = 50
let m2  = 10
let a1  = 0
let a2  = 0
let a1V = 0
let a2V = 0
let g   = 1

let px2 = -1
let py2 = -1
let cx, cy

let buffer

function setup () {
  createCanvas(windowWidth, windowHeight)

  a1 = PI
  a2 = PI / 2
  cx = width / 2
  cy = 300

  buffer = createGraphics(width, height)
  buffer.background(175)
  buffer.translate(cx, cy)
}

function draw () {
  background(175)
  imageMode(CORNER)
  image(buffer, 0, 0, width, height)

  let num1 = -g * (2 * m1 + m2) * sin(a1)
  let num2 = -m2 * g * sin(a1 - 2 * a2)
  let num3 = -2 * sin(a1 - a2) * m2
  let num4 = a2V * a2V * r2 + a1V * a1V * r1 * cos(a1 - a2)
  let den  = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2))
  let a1A  = (num1 + num2 + num3 * num4) / den

      num1 = 2 * sin(a1 - a2)
      num2 = (a1V * a1V * r1 * (m1 + m2))
      num3 = g * (m1 + m2) * cos(a1)
      num4 = a2V * a2V * r2 * m2 * cos(a1 - a2)
      den  = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2))
  let a2A  = (num1 * (num2 + num3 + num4)) / den

  translate(cx, cy)
  stroke(0)
  strokeWeight(2)

  let x1 = r1 * sin(a1)
  let y1 = r1 * cos(a1)

  let x2 = x1 + r2 * sin(a2)
  let y2 = y1 + r2 * cos(a2)

  line(0, 0, x1, y1)
  fill(0)
  ellipse(x1, y1, m1, m1)

  line(x1, y1, x2, y2)
  fill(0)
  ellipse(x2, y2, m2, m2)

  a1V += a1A
  a2V += a2A
  a1  += a1V
  a2  += a2V

  // a1V *= 0.99;
  // a2V *= 0.99;

  buffer.stroke(0)
  if (frameCount > 1) {
    buffer.line(px2, py2, x2, y2)
  }

  px2 = x2
  py2 = y2
}