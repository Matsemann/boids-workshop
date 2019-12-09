
export class Obstacle {
    constructor(pos, radius) {
        /**
         * @type {Vector2d}
         */
        this.pos = pos;
        /**
         * @type {Number}
         */
        this.radius = radius;
    }

    /**
     * @return {Vector2d}
     */
    getPos() {
        return this.pos.copy();
    }

    /**
     * @return {Number}
     */
    getRadius() {
        return this.radius;
    }
}