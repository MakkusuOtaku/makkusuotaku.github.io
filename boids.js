const canvas = document.querySelector('canvas');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const context = canvas.getContext('2d');

canvas.style.background = "linear-gradient(135deg, #003, #171f63, #003)";

// Set the rules for the boids
const maxSpeed = 5;

// Keep track of the mouse position
const mouse = {
    x: 0,
    y: 0
};

addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

function createBoid() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        direction: Math.random() * Math.PI * 2,
        vX: 0,
        vY: 0,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    };
}

function applyForce(boid, direction, magnitude=1) {
    boid.vX += Math.cos(direction) * magnitude;
    boid.vY += Math.sin(direction) * magnitude;
}

const boids = [];

while (boids.length < 100) {
    boids.push(createBoid());
}

function simulateBoids() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let boid of boids) {
        // Apply forces to boid
        let mouseDirection = Math.atan2(mouse.y - boid.y, mouse.x - boid.x);
        applyForce(boid, mouseDirection, 0.5);

        // Avoid other boids
        for (let otherBoid of boids) {
            if (otherBoid === boid) continue;

            let distance = Math.sqrt(Math.pow(boid.x - otherBoid.x, 2) + Math.pow(boid.y - otherBoid.y, 2));
            if (distance > 30) continue;

            let direction = Math.atan2(boid.y - otherBoid.y, boid.x - otherBoid.x);
            applyForce(boid, direction, 1/(distance*10));
        }


        // Move the boid, max speed is 5
        boid.vX *= 0.99;
        boid.vY *= 0.99;

        // Limit the speed
        if (Math.abs(boid.vX) > maxSpeed) {
            boid.vX = boid.vX > 0 ? maxSpeed : -maxSpeed;
        }
        if (Math.abs(boid.vY) > maxSpeed) {
            boid.vY = boid.vY > 0 ? maxSpeed : -maxSpeed;
        }

        boid.x += boid.vX;
        boid.y += boid.vY;

        // Draw the boid
        context.beginPath();
        context.fillStyle = "cornflowerblue";
        context.arc(boid.x, boid.y, 2, 0, Math.PI * 2);
        context.fill();
    }

    requestAnimationFrame(simulateBoids);
}

simulateBoids();