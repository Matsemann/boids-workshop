import {Vector2d} from "./vector2d";
import {parameters} from "./ui";
import {Boid} from "./boid";


function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

export class World2 {
    constructor() {
        this.boids = [];
        this.predators = [];
        this.obstacles = [];
    }

    setNumBoids(num) {
        if (num < this.boids.length) {
            this.boids = this.boids.slice(0, num);
        } else {
            for (let i = this.boids.length; i < num; i++) {
                const vel = new Vector2d(-1, 1)
                    .rotate(randomInRange(0, 360))
                    .mul(randomInRange(0.5, parameters.maxSpeed / 2));
                const pos = new Vector2d(
                    randomInRange(0, parameters.width),
                    randomInRange(0, parameters.height)
                );
                this.boids.push(new Boid(i, pos, vel));
            }
        }
    }

    setNumPredators(num) {

    }
}


export const world = new World2();