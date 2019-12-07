import {parameters} from "./ui";
import {world} from "./world";
import {Vector2d} from "./vector2d";

const canvas = document.getElementById('drawme');
const ctx = canvas.getContext('2d');
let mousePos = undefined;

export function startRender() {
    canvas.addEventListener("mousemove", (ev => {
        const rect = canvas.getBoundingClientRect();
        const x = ev.offsetX * (canvas.width / rect.width);
        const y = parameters.height - ev.offsetY * (canvas.height / rect.height);
        mousePos = new Vector2d(x, y);
    }));
    canvas.addEventListener("mouseleave", () => {
        mousePos = undefined;
    });
    window.requestAnimationFrame(render);
}


function render() {
    updateFps();

    world.update(mousePos);

    ctx.fillStyle = "#15143c";
    ctx.fillRect(0, 0, parameters.width, parameters.height);

    world.boids.forEach(boid => {
        drawBoid(boid, "#6ec5fe", "#8ef6fe");
    });

    world.predators.forEach(predator => {
        drawBoid(predator, "#fd59bd", "#fdaedc");
    });

        ctx.fillStyle = "#ac2fff";

    world.obstacles.forEach(obs => {
        const radgrad = ctx.createRadialGradient(obs.pos.x, parameters.height - obs.pos.y, 0, obs.pos.x, parameters.height - obs.pos.y, 50);
        radgrad.addColorStop(1, "#ac2fff");
        radgrad.addColorStop(0.5, "#c868ff");
        radgrad.addColorStop(0, "#d5a2ff");

        ctx.beginPath();
        ctx.fillStyle = radgrad;
        ctx.arc(obs.pos.x, parameters.height - obs.pos.y, obs.radius, 0, 2 * Math.PI);
        ctx.fill();
    });

    if (mousePos) {
        const radgrad = ctx.createRadialGradient(mousePos.x, parameters.height - mousePos.y, 0, mousePos.x, parameters.height - mousePos.y, 10);
        radgrad.addColorStop(1, "#ac2fff");
        radgrad.addColorStop(0.5, "#c868ff");
        radgrad.addColorStop(0, "#d5a2ff");

        ctx.beginPath();
        ctx.fillStyle = radgrad;
        ctx.arc(mousePos.x, parameters.height - mousePos.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }

    window.requestAnimationFrame(render);
}

function drawBoid(boid, color, strokeColor) {
    const angle = -boid.vel.angleRad(new Vector2d(1, 0));
    const point1 = new Vector2d(-6, -3).rotateRad(angle).add(boid.pos);
    const point2 = new Vector2d(-6, 3).rotateRad(angle).add(boid.pos);
    const point3 = new Vector2d(6, 0).rotateRad(angle).add(boid.pos);

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = strokeColor;
    ctx.moveTo(point1.x, parameters.height - point1.y);
    ctx.lineTo(point2.x, parameters.height - point2.y);
    ctx.lineTo(point3.x, parameters.height - point3.y);
    ctx.lineTo(point1.x, parameters.height - point1.y);
    ctx.fill();
    ctx.stroke();
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