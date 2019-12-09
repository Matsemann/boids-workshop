import {Vector2d} from "./vector2d";
import {parameters} from "./ui";
import {randomInRange} from "./world";

const neighborRadius = 100;


export class Predator {

    constructor(id, startPos, startVelocity) {
        /**
         * @type {String}
         */
        this.id = id;
        /**
         * @type {Vector2d}
         */
        this.pos = startPos;
        /**
         * @type {Vector2d}
         */
        this.vel = startVelocity;

        this.lastVelChange = performance.now();
    }

    /**
     * @return {Vector2d}
     */
    getPos() {
        return this.pos.copy();
    }

    /**
     * @return {Vector2d}
     */
    getVel() {
        return this.vel.copy();
    }

    /**
     * @param boids {Array<Boid>}
     * @param predators
     * @param obstacles
     */
    move(boids, predators, obstacles) {
        if (performance.now() - this.lastVelChange > 500 && Math.random() > 0.9) {
            this.lastVelChange = performance.now();
            this.vel.rotate(randomInRange(-60, 60)).norm().mul(randomInRange(parameters.predatorMaxSpeed / 3, parameters.predatorMaxSpeed))
        }

        this.pos.add(this.vel);

        if (this.pos.x > parameters.width) this.pos.x -= parameters.width;
        if (this.pos.x < 0) this.pos.x += parameters.width;

        if (this.pos.y > parameters.height) this.pos.y -= parameters.height;
        if (this.pos.y < 0) this.pos.y += parameters.height;
    }

}