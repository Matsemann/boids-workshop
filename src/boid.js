import {Vector2d} from "./vector2d";
import {parameters} from "./ui";

const neighborRadius = 100;


export class Boid {

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
    }

    /**
     * @param boids {Array<Boid>}
     * @param predators
     * @param obstacles
     */
    move(boids, predators, obstacles) {
        const acc = this.calculateForces(boids, predators, obstacles);
        this.vel.add(acc).limit(parameters.maxSpeed);
        this.pos.add(this.vel);

        if (this.pos.x > parameters.width) this.pos.x -= parameters.width;
        if (this.pos.x < 0) this.pos.x += parameters.width;

        if (this.pos.y > parameters.height) this.pos.y -= parameters.height;
        if (this.pos.y < 0) this.pos.y += parameters.height;
    }

    /**
     *
     * @param boids {Array<Boid>}
     * @param predators
     * @param obstacles {Array<Obstacle>}
     * @return {Vector2d}
     */
    calculateForces(boids, predators, obstacles) {
        const neighbors = this.findNeighbors(boids);

        const separationForce = this.calculateSeparationForce(neighbors);
        const alignmentForce = this.calculateAlignmentForce(neighbors);
        const cohesionForce = this.calculateCohesionForce(neighbors);

        const obstacleForce = this.calculateObstacleAvoidanceForce(obstacles);
        const predatorsForce = this.calculatePredatorAvoidanceForce(predators);

        return new Vector2d(0, 0)
            .add(separationForce)
            .add(alignmentForce)
            .add(cohesionForce)
            .add(obstacleForce)
            .add(predatorsForce)
    }

    /**
     * Should return an array of all the boids inside neighborRadius of this boid
     * @param boids {Array<Boid>}
     * @returns {Array<Boid>}
     */
    findNeighbors(boids) {
        return boids.filter(b => b.pos.dst(this.pos) <= neighborRadius && b.id !== this.id);
    }

    /**
     *
     * @param neighbors {Array<Boid>}
     * @returns {Vector2d}
     */
    calculateSeparationForce(neighbors) {
        const a = new Vector2d(0, 0);
        return new Vector2d(0, 0);
    }

    /**
     *
     * @param neighbors {Array<Boid>}
     * @returns {Vector2d}
     */
    calculateAlignmentForce(neighbors) {
        return new Vector2d(0, 0);
    }

    /**
     *
     * @param neighbors {Array<Boid>}
     * @returns {Vector2d}
     */
    calculateCohesionForce(neighbors) {
        return new Vector2d(0, 0);
    }


    /**
     * @param obstacles {Array<Obstacle>}
     * @returns {Vector2d}
     */
    calculateObstacleAvoidanceForce(obstacles) {

        /*
        An obstacle has two properties:
        pos : a vector2d holding the x and y position of the center of the obstacle
        radius : the radius/size of the obstacle from the center positions
         */


        return new Vector2d(0, 0);
    }


    /**
     * @param obstacles {Array<Obstacle>}
     * @returns {Vector2d}
     */
    calculatePredatorAvoidanceForce(obstacles) {

        /*
        A predator has two properties:
        pos : a vector2d holding the x and y position of the predator
        vel : the speed/direction of the predator
         */


        return new Vector2d(0, 0);
    }
}