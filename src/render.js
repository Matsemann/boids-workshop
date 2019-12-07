import {parameters} from "./ui";
import {world} from "./world";
import {Vector2d} from "./vector2d";


export function startRender() {
    window.requestAnimationFrame(render);
}

const canvas = document.getElementById('drawme');
const ctx = canvas.getContext('2d');

function render() {
    updateFps();

    world.update();

    ctx.fillStyle = "#fefefe";
    ctx.fillRect(0, 0, parameters.width, parameters.height);

    world.boids.forEach(boid => {
        drawBoid(boid, "#000000");
    });

    world.predators.forEach(predator => {
        drawBoid(predator, "#ff0000");
    });

    world.obstacles.forEach(obs => {
        ctx.beginPath();
        ctx.fillStyle = "#00ff00";
        ctx.arc(obs.pos.x, obs.pos.y, obs.radius, 0, 2 * Math.PI);
        ctx.fill();
    });

    window.requestAnimationFrame(render);
}

function drawBoid(boid, color) {
    const angle = -boid.vel.angleRad(new Vector2d(1, 0));
    const point1 = new Vector2d(-6, -3).rotateRad(angle).add(boid.pos);
    const point2 = new Vector2d(-6, 3).rotateRad(angle).add(boid.pos);
    const point3 = new Vector2d(6, 0).rotateRad(angle).add(boid.pos);

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(point1.x, parameters.height - point1.y);
    ctx.lineTo(point2.x, parameters.height - point2.y);
    ctx.lineTo(point3.x, parameters.height - point3.y);
    ctx.lineTo(point1.x, parameters.height - point1.y);
    ctx.fill();
}

let avgDelta = 0, lastRender = performance.now();
function updateFps() {
    const now = performance.now();
    const delta = now - lastRender;
    const diff = delta - avgDelta;
    avgDelta += diff / 20;
    lastRender = now;
    document.getElementById("fpscounter").innerText = (1000/avgDelta).toFixed(0) + " fps";
}