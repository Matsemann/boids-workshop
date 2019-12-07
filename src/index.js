import {Vector2d} from "./vector2d";
import {createUI, parameters} from "./ui";
import {world} from "./world";
// http://www.kfish.org/boids/index.html
// http://web.archive.org/web/20060217021711/http://www.oreilly.com/catalog/killergame/chapter/ch22.pdf

const a = new Vector2d(1, 0).rotate(90);

console.log(a)

createUI();

const canvas = document.getElementById('drawme');
const ctx = canvas.getContext('2d');

ctx.strokeRect(2, 2, 796, 596);

let avgDelta = 0, lastRender = performance.now();

function render() {
    const now = performance.now();
    const delta = now - lastRender;
    const diff = delta - avgDelta;
    avgDelta += diff / 20;
    lastRender = now;

    document.getElementById("fpscounter").innerText = (1000/avgDelta).toFixed(0) + " fps";

    ctx.clearRect(0, 0, parameters.width, parameters.height);

    world.boids.forEach(boid => {
        boid.move([], [], []);

        /*
        ctx.save();

        ctx.translate(boid.pos.x, parameters.height - boid.pos.y);
        ctx.rotate(boid.vel.angleRad(new Vector2d(1, 0)));

        ctx.beginPath();
        ctx.moveTo(-6, -3);
        ctx.lineTo(-6, 3);
        ctx.lineTo(6, 0);
        ctx.fill();
        ctx.restore();
        */



        const angle = -boid.vel.angleRad(new Vector2d(1, 0));
        const point1 = new Vector2d(-6, -3).rotateRad(angle).add(boid.pos);
        const point2 = new Vector2d(-6, 3).rotateRad(angle).add(boid.pos);
        const point3 = new Vector2d(6, 0).rotateRad(angle).add(boid.pos);

        ctx.beginPath();
        ctx.moveTo(point1.x, parameters.height - point1.y);
        ctx.lineTo(point2.x, parameters.height - point2.y);
        ctx.lineTo(point3.x, parameters.height - point3.y);
        ctx.lineTo(point1.x, parameters.height - point1.y);
        ctx.fill();

        // ctx.fillRect(boid.pos.x, parameters.height - boid.pos.y, 15, 15);
        // ctx.arc(boid.pos.x, parameters.height - boid.pos.y, 5, 0, 2*Math.PI);
        // ctx.fill();
    });

    window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);