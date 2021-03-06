import {Vector2d} from "./vector2d";
import {parameters} from "./ui";

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

        const separationForce = this.calculateSeparationForce(neighbors).mul(parameters.separationWeight);
        const alignmentForce = this.calculateAlignmentForce(neighbors).mul(parameters.alignmentWeight);
        const cohesionForce = this.calculateCohesionForce(neighbors).mul(parameters.cohesionWeight);

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
     * @param boids {Array<Boid>}
     * @returns {Array<Boid>}
     */
    findNeighbors(boids) {
        return boids.filter(b => b.pos.dst(this.pos) <= parameters.neighborRadius && b.id !== this.id);
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
     * @param neighbors {Array<Boid>}
     * @returns {Vector2d}
     */
    calculateAlignmentForce(neighbors) {

        // TODO: Oppgave 1 løses her, se README.md for beskrivelse

        const averageAlignment = new Vector2d(0, 0);
        // Se vector2d.js for operasjoner på vektorer

        neighbors.forEach(neighbor => {
            // stuff per neighbor
        });

        return averageAlignment;
    }

    /**
     * @param neighbors {Array<Boid>}
     * @returns {Vector2d}
     */
    calculateSeparationForce(neighbors) {

        // TODO Løs Oppgave 2 her


        const separationForce = new Vector2d(0, 0);

        neighbors.forEach(boid => {
            //let separationForceForNeighbor == ...
              // calculate

            //separationForce.add(separationForceForNeighbor);
        });

        return separationForce;
    }

    /**
     * @param neighbors {Array<Boid>}
     * @returns {Vector2d}
     */
    calculateCohesionForce(neighbors) {

        const cohesionForce = new Vector2d(0, 0);

        if (neighbors.length === 0) {
            return cohesionForce;
        }

        // TODO Oppgave 3 gjøres her
        // ...

        return cohesionForce;
    }


    /**
     * @param predators {Array<Predator>}
     * @returns {Vector2d}
     */
    calculatePredatorAvoidanceForce(predators) {
        // TODO oppgave 4 gjøres her

        let fleeForce = new Vector2d(0, 0);

        // predators.forEache(predator => ...);
        // predator.getPos()


        return fleeForce;
    }


    /**
     * @param obstacles {Array<Obstacle>}
     * @returns {Vector2d}
     */
    calculateObstacleAvoidanceForce(obstacles) {

        // TODO Oppgave 5 gjøres her

        let avoidanceForce = new Vector2d(0, 0);

        // obstacles.forEach(obstacle => ...);
        // obstacle.getPos();

        return avoidanceForce;

    }
}