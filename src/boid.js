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
     * Should return an array of all the boids inside neighborRadius of this boid
     * @param boids {Array<Boid>}
     * @returns {Array<Boid>}
     */
    findNeighbors(boids) {
        return boids.filter(b => b.pos.dst(this.pos) <= parameters.neighborRadius && b.id !== this.id);
    }

    /**
     *
     * @param neighbors {Array<Boid>}
     * @returns {Vector2d}
     */
    calculateSeparationForce(neighbors) {
        const separationForce = new Vector2d(0, 0);

        neighbors.forEach(boid => {
            const distanceVec = this.pos.copy().sub(boid.pos);
            const length = distanceVec.len();
            // if (length > parameters.neighborRadius / 2) return;
            const weight = (parameters.neighborRadius - length) / parameters.neighborRadius;
            distanceVec.norm().mul(weight);
            separationForce.add(distanceVec);
        });

        return separationForce;
    }

    /**
     *
     * @param neighbors {Array<Boid>}
     * @returns {Vector2d}
     */
    calculateAlignmentForce(neighbors) {
        const averageAlignment = new Vector2d(0, 0);

        neighbors.forEach(neighbor => {
            averageAlignment.add(neighbor.vel);
        });

        averageAlignment.norm();

        return averageAlignment;
    }

    /**
     *
     * @param neighbors {Array<Boid>}
     * @returns {Vector2d}
     */
    calculateCohesionForce(neighbors) {
        const averagePos = new Vector2d(0, 0);

        if (neighbors.length !== 0) {
            neighbors.forEach(neighbor => {
                averagePos.add(neighbor.pos);
            });
            averagePos.mul(1 / neighbors.length);
            return averagePos.sub(this.pos).norm();

        } else {
            return new Vector2d(0, 0);
        }
    }


    /**
     * @param predators {Array<Predator>}
     * @returns {Vector2d}
     */
    calculatePredatorAvoidanceForce(predators) {

        /*
        A predator has two properties:
        pos : a vector2d holding the x and y position of the predator
        vel : the speed/direction of the predator
         */
        let fleeForce = new Vector2d(0, 0);

        predators.forEach(predator => {
            if (predator.pos.dst(this.pos) > 50) return;

            const direction = predator.pos.copy().sub(this.pos);

            fleeForce.sub(direction);
        });


        return fleeForce;
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

        let avoidanceForce = new Vector2d(0, 0);

        obstacles.forEach(obstacle => {
            if (obstacle.pos.dst(this.pos) > 100) return;

            const direction = obstacle.pos.copy().sub(this.pos);
            const angle = direction.angle(this.vel);

            if (0 < angle && angle < 60) {
                avoidanceForce.add(this.vel.copy().rotate(60).norm().mul(5))
            } else if (-60 < angle && angle < 0) {
                avoidanceForce.add(this.vel.copy().rotate(-60).norm().mul(5))

            }
        });


        return avoidanceForce;
    }
}