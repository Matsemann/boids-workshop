export class Vector2d {
    constructor(x, y) {
        /**
         * @type {Number}
         */
        this.x = x;
        /**
         * @type {Number}
         */
        this.y = y;
    }

    copy() {
        return new Vector2d(this.x, this.y);
    }

    /**
     * Adds the x and y of the other vector to this vector
     * @param otherVector {Vector2d}
     * @returns {Vector2d} this updated vector for chaining
     */
    add(otherVector) {
        this.x += otherVector.x;
        this.y += otherVector.y;
        return this;
    }

    /**
     * Subtracts the x and y of the other vector to this vector
     * @param otherVector {Vector2d}
     * @returns {Vector2d} this updated vector for chaining
     */
    sub(otherVector) {
        this.x -= otherVector.x;
        this.y -= otherVector.y;
        return this;
    }

    /**
     * Scales x and y of this vector by the factor given by multiplying
     * @param scale {Number}
     * @returns {Vector2d} this updated vector for chaining
     */
    mul(scale) {
        this.x *= scale;
        this.y *= scale;
        return this;
    }

    /**
     * Scales x and y of this vector by the factor given by dividing
     * @param scale {Number}
     * @returns {Vector2d} this updated vector for chaining
     */
    div(scale) {
        this.x /= scale;
        this.y /= scale;
        return this;
    }

    /**
     * Distance between the other vector and this vector, as if both vectors describe a point
     * @param otherVector {Vector2d}
     * @returns {Number} the distance
     */
    dst(otherVector) {
        const xDiff = this.x - otherVector.x;
        const yDiff = this.y - otherVector.y;
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    }

    /**
     * Length of the vector
     * @returns {Number} the length
     */
    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Normalizes this vector (a vector with length 1, with the same angle)
     * @returns {Vector2d} this updated vector for chaining
     */
    norm() {
        const length = this.len();
        if (length !== 0) {
            this.x /= length;
            this.y /= length;
        }
        return this;
    }

    /**
     * Clamps the length of this vector to the limit given. Keeps the angle
     * @param limit {Number}
     * @returns {Vector2d} this updated vector for chaining
     */
    limit(limit) {
        if (this.len() > limit) {
            return this.norm().mul(limit);
        }
        return this;
    }

    /**
     * Angle of this vector relative to the other vector, from -180 to +180
     * @param otherVector {Vector2d}
     * @returns {Number} the angle
     */
    angle(otherVector) {
        return this.angleRad(otherVector) * (180 / Math.PI)
    }

    /**
     * Angle of this vector relative to the other vector, from -PI to +PI
     * @param otherVector {Vector2d}
     * @returns {Number} the angle in radians
     */
    angleRad(otherVector) {
        const dot = this.x * otherVector.x + this.y * otherVector.y;
        const crs = this.x * otherVector.y - this.y * otherVector.x;

        return Math.atan2(crs, dot)
    }

    /**
     * Rotates this vector, in degrees
     * @param degrees {Number}
     * @returns {Vector2d} this updated vector for chaining
     */
    rotate(degrees) {
        return this.rotateRad(degrees * (Math.PI / 180));
    }

    /**
     * Creates a new vector based on this one rotated, in radians
     * @param radians {Number}
     * @returns {Vector2d} this updated vector for chaining
     */
    rotateRad(radians) {
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        const newX = this.x * cos - this.y * sin;
        const newY = this.x * sin + this.y * cos;

        this.x = newX;
        this.y = newY;
        return this;
    }


}