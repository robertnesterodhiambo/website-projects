let canvasLength = 1000; // Length of the canvas in pixels
let canvasWidth = 800; // Width of the canvas in pixels
let tableLength = 800; // Length of the table in pixels
let tableWidth = tableLength / 2; // Width of the table
let ballDiameter = tableWidth / 36; // Diameter of the ball
let pocketDiameter = 1.5 * ballDiameter; // Diameter of the pockets
let tableColor = '#006400'; // Green color for the table
let offsetX, offsetY; // Offsets for centering the table

// Define ball arrays
let redBalls = [];
let coloredBalls = [];

function setup() {
    createCanvas(canvasLength, canvasWidth);
    offsetX = (width - tableLength) / 2;
    offsetY = (height - tableWidth) / 2;
    drawTable();
    initializeBalls();
    drawBalls();
    drawCueBall();
}

function drawTable() {
    background(255); // White background

    // Draw the table boundaries
    stroke(139, 69, 19); // Brown color for the boundary
    strokeWeight(4);
    fill(tableColor);
    rect(offsetX, offsetY, tableLength, tableWidth);

    // Draw the pockets
    drawPockets();

    // Draw the "D" zone
    drawDZone();
}

function drawPockets() {
    let pocketRadius = pocketDiameter / 2;

    fill(0); // Black color for the pockets
    noStroke();

    // Corners
    ellipse(offsetX + pocketRadius, offsetY + pocketRadius, pocketDiameter, pocketDiameter);
    ellipse(offsetX + tableLength - pocketRadius, offsetY + pocketRadius, pocketDiameter, pocketDiameter);
    ellipse(offsetX + pocketRadius, offsetY + tableWidth - pocketRadius, pocketDiameter, pocketDiameter);
    ellipse(offsetX + tableLength - pocketRadius, offsetY + tableWidth - pocketRadius, pocketDiameter, pocketDiameter);

    // Middle
    ellipse(offsetX + tableLength / 2, offsetY + pocketRadius, pocketDiameter, pocketDiameter);
    ellipse(offsetX + tableLength / 2, offsetY + tableWidth - pocketRadius, pocketDiameter, pocketDiameter);
}

function drawDZone() {
    let dRadius = tableWidth / 6;
    let baulkLine = offsetX + tableWidth / 4;

    stroke(255); // White color for lines
    noFill();

    // Baulk line
    line(baulkLine, offsetY, baulkLine, offsetY + tableWidth);

    // Semi-circle "D"
    arc(baulkLine, offsetY + tableWidth / 2, dRadius * 2, dRadius * 2, HALF_PI, -HALF_PI);
}

function initializeBalls() {
    // Initialize red balls in a triangular formation
    let startX = offsetX + tableLength / 2 + 3 * ballDiameter;
    let startY = offsetY + tableWidth / 2 - 2 * ballDiameter;
    let row = 1;
    for (let i = 0; i < 15; i++) {
        let x = startX + (row - 1) * ballDiameter / 2;
        let y = startY + (i - (row * (row - 1)) / 2) * ballDiameter;
        redBalls.push(createVector(x, y));
        if (i + 1 == row * (row + 1) / 2) {
            row++;
            startY -= ballDiameter / 2;
        }
    }

    // Initialize colored balls
    coloredBalls.push({ color: color(0), position: createVector(offsetX + tableLength / 2 + 4 * ballDiameter, offsetY + tableWidth / 2) }); // Black ball
    coloredBalls.push({ color: color(255, 192, 203), position: createVector(offsetX + tableLength / 2 + 2 * ballDiameter, offsetY + tableWidth / 2) }); // Pink ball
    coloredBalls.push({ color: color(0, 0, 255), position: createVector(offsetX + tableLength / 2, offsetY + tableWidth / 2) }); // Blue ball
    coloredBalls.push({ color: color(139, 69, 19), position: createVector(offsetX + tableWidth / 4, offsetY + tableWidth / 2) }); // Brown ball
    coloredBalls.push({ color: color(255, 255, 0), position: createVector(offsetX + tableWidth / 4, offsetY + tableWidth / 2 + ballDiameter * 2) }); // Yellow ball
    coloredBalls.push({ color: color(0, 128, 0), position: createVector(offsetX + tableWidth / 4, offsetY + tableWidth / 2 - ballDiameter * 2) }); // Green ball
}

function drawBalls() {
    let ballRadius = ballDiameter / 2;

    // Draw the red balls
    fill(255, 0, 0); // Red ball color
    for (let i = 0; i < redBalls.length; i++) {
        ellipse(redBalls[i].x, redBalls[i].y, ballDiameter, ballDiameter);
    }

    // Draw the colored balls
    for (let i = 0; i < coloredBalls.length; i++) {
        fill(coloredBalls[i].color);
        ellipse(coloredBalls[i].position.x, coloredBalls[i].position.y, ballDiameter, ballDiameter);
    }
}

function drawCueBall() {
    let ballRadius = ballDiameter / 2;
    fill(255); // White cue ball color
    let cueBallX = offsetX + tableWidth / 4;
    let cueBallY = offsetY + tableWidth / 2;

    // Draw the cue ball
    ellipse(cueBallX, cueBallY, ballDiameter, ballDiameter);
}
