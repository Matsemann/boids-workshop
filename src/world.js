import {Vector2d} from "./vector2d";
import {parameters} from "./ui";
import {Boid} from "./boid";
import {Predator} from "./predator";
import {Obstacle} from "./obstacle";


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
                const vel = new Vector2d(0, 1)
                    .rotate(randomInRange(0, 360))
                    .mul(randomInRange(0.5, parameters.maxSpeed * 0.75));
                const pos = new Vector2d(
                    randomInRange(0, parameters.width),
                    randomInRange(0, parameters.height)
                );
                this.boids.push(new Boid(i, pos, vel));
            }
        }
    }

    setNumPredators(num) {
        if (num < this.predators.length) {
            this.predators = this.predators.slice(0, num);
        } else {
            for (let i = this.predators.length; i < num; i++) {
                const vel = new Vector2d(0, 1)
                    .rotate(randomInRange(0, 360))
                    .mul(randomInRange(0.5, parameters.predatorMaxSpeed));
                const pos = new Vector2d(
                    randomInRange(0, parameters.width),
                    randomInRange(0, parameters.height)
                );
                this.predators.push(new Predator(i, pos, vel));
            }
        }
    }

    setNumObstacles(num) {
        if (num < this.obstacles.length) {
            this.obstacles = this.obstacles.slice(0, num);
        } else {
            for (let i = this.obstacles.length; i < num; i++) {
                const pos = new Vector2d(
                    randomInRange(0, parameters.width),
                    randomInRange(0, parameters.height)
                );
                const r = randomInRange(15, 40);
                this.obstacles.push(new Obstacle(pos, r));
            }
        }
    }

    update(mousePos) {
        const predators = [...this.predators];
        if (mousePos) {
            predators.push({pos: mousePos, vel: new Vector2d(0, 0)})
        }

        this.boids.forEach(boid => boid.move(this.boids, predators, this.obstacles));
        this.predators.forEach(predator => predator.move())
    }
}


export const world = new World2();