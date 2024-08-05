// Constants for canvas and table dimensions
let canvasLength = 1000; // Length of the canvas in pixels
let canvasWidth = 800; // Width of the canvas in pixels
let tableLength = 800; // Length of the table in pixels
let tableWidth = tableLength / 2; // Width of the table
let ballDiameter = tableWidth / 36; // Diameter of the balls
let pocketDiameter = 1.5 * ballDiameter; // Diameter of the pockets
let tableColor = '#006400'; // Green color for the table
let offsetX, offsetY; // Offsets for centering the table

// Matter.js Engine, World, Bodies, etc.
let engine;
let world;
let balls = []; // Array to store all balls
let cueBall; // Cue ball object
let cue; // Cue stick object
let cuePower = 0;
let maxPower = 20;
let powerIncrement = 1; // Increment for adjusting power

function setup() {
    createCanvas(canvasLength, canvasWidth);

    // Matter.js setup
    engine = Matter.Engine.create();
    world = engine.world;
    Matter.Engine.run(engine);

    offsetX = (width - tableLength) / 2;
    offsetY = (height - tableWidth) / 2;

    initializeBalls(); // Initialize balls
    cue = new Cue(); // Initialize the cue object

    // Set up boundaries
    let boundaryOptions = {
        isStatic: true,
        friction: 0.5,
        restitution: 0.8
    };
    let ground = Matter.Bodies.rectangle(width / 2, height, width, 50, boundaryOptions);
    let leftWall = Matter.Bodies.rectangle(0, height / 2, 50, height, boundaryOptions);
    let rightWall = Matter.Bodies.rectangle(width, height / 2, 50, height, boundaryOptions);
    Matter.World.add(world, [ground, leftWall, rightWall]);
}

function draw() {
    background(255); // White background

    // Update Matter.js Engine
    Matter.Engine.update(engine);

    drawTable(); // Draw the snooker table
    drawBalls(); // Draw all the balls
    cue.show(); // Show the cue stick

    // Handle cue control
    handleCueControl();

    // Check if spacebar (key code 32) is pressed to shoot cue ball
    if (keyIsDown(32)) {
        cue.shoot(cuePower); // Shoot cue ball with current power
    }
}

function drawTable() {
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

        // Create Matter.js ball bodies
        let ball = Matter.Bodies.circle(x, y, ballDiameter / 2, { friction: 0.2, restitution: 0.8 });
        Matter.World.add(world, ball);
        balls.push(ball);
        
        if (i + 1 == row * (row + 1) / 2) {
            row++;
            startY -= ballDiameter / 2;
        }
    }

    // Set the cue ball position in front of the red balls
    let cueBallX = offsetX + tableLength / 4;
    let cueBallY = offsetY + tableWidth / 2 + ballDiameter / 2;
    cueBall = Matter.Bodies.circle(cueBallX, cueBallY, ballDiameter / 2, { friction: 0.2, restitution: 0.8 });
    Matter.World.add(world, cueBall);
    balls.push(cueBall);
}

function drawBalls() {
    let ballRadius = ballDiameter / 2;

    // Draw all balls
    fill(255); // White color for cue ball
    for (let i = 0; i < balls.length; i++) {
        let pos = balls[i].position;
        if (i === balls.length - 1) {
            fill(255); // White color for cue ball
        } else {
            fill(255, 0, 0); // Red color for other balls
        }
        noStroke();
        ellipse(pos.x, pos.y, ballDiameter, ballDiameter);
    }
}

class Cue {
    constructor() {
        this.x = offsetX + tableWidth / 4; // Initial x position of cue stick
        this.y = offsetY + tableWidth / 2; // Initial y position of cue stick
        this.angle = 0; // Initial angle of cue stick
    }

    show() {
        // Draw cue stick
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        strokeWeight(4);
        stroke(139, 69, 19); // Brown color
        line(0, 0, tableWidth / 2, 0); // Cue stick length
        pop();
    }

    shoot(power) {
        // Calculate velocity components based on angle and power
        let velocity = p5.Vector.fromAngle(this.angle);
        velocity.mult(-power);

        // Apply velocity to the cue ball (last ball in balls array)
        if (balls.length > 0) {
            Matter.Body.setVelocity(balls[balls.length - 1], { x: velocity.x, y: velocity.y });
        }
    }
}

function mouseMoved() {
    // Update cue angle based on mouse position relative to cue ball
    if (balls.length > 0) {
        let cueBall = balls[balls.length - 1];
        let angle = Math.atan2(mouseY - cueBall.position.y, mouseX - cueBall.position.x);
        cue.angle = angle;
    }
}

function handleCueControl() {
    // Adjust cue power using arrow keys
    if (keyIsDown(UP_ARROW)) {
        cuePower += powerIncrement;
        if (cuePower > maxPower) {
            cuePower = maxPower;
        }
    } else if (keyIsDown(DOWN_ARROW)) {
        cuePower -= powerIncrement;
        if (cuePower < 0) {
            cuePower = 0;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
