// field symbols to make non writable
const x_field = Symbol('x');
const y_field = Symbol('y');
const z_field = Symbol('z');

/** 
 * @class representing a 3 dimensional vector 
 * @author: Andrew Majda
 */
class Vec3 
{
    /**
     * Creates a new 3d vector
     * @constructor
     * @param {number} x The x value of the vector
     * @param {number} y The y value of the vector
     * @param {number} z The z value of the vector
     * @throws Will throw an error if one or more of the fields is not a number
     */
    constructor(x, y, z) 
    {
        // convert to number to handle string numbers and assign to the respective field
        this[x_field] = Number(x);
        this[y_field] = Number(y);
        this[z_field] = Number(z);

        // if a field is not a number, throw an error
        if (isNaN(this.x) || isNaN(this.y) || isNaN(this.z)) 
        {
            throw "Not a number";
        }
    }

    /**
     * x
     * @type {number}
     */
    get x() {return this[x_field]};

    /**
     * y
     * @type {number}
     */
    get y() {return this[y_field]};

    /**
     * z
     * @type {number}
     */
    get z() {return this[z_field]};

    /**
     * Returns a new vector with the same fields as the current vector
     * @return {Vec3} A new vector with the same fields
     */
    copy() 
    {
        return new Vec3(this.x, this.y, this.z);
    }

    /**
     * Returns a new vector with the fields of this vector added with the fields of a given vector vec
     * @param {Vec3} vec A vector to add to this vector
     * @return {Vec3} A new vector with the fields of this vector and the given vector vec added together
     * @throws will throw an error if a non vector is provided
     */
    add(vec)
    {
        // if it's not a vector, throw an error
        if(!(vec instanceof Vec3))
        {
            throw "Not a vector";
        }

        var new_x = this.x + vec.x;
        var new_y = this.y + vec.y;
        var new_z = this.z + vec.z;

        return new Vec3(new_x, new_y, new_z);
    }

    /**
     * Returns a new vector with the fields of this vector subtracted the fields of a given vector vec
     * @param {Vec3} vec A vector to subtract from this vector
     * @return {Vec3} A new vector with the fields of this vector and the given vector vec subtracted
     * @throws Will throw an error if a non vector is provided
     */
    sub(vec)
    {
        // if its not a vector throw an error
        if(!(vec instanceof Vec3))
        {
            throw "Not a vector";
        }

        var new_x = this.x - vec.x;
        var new_y = this.y - vec.y;
        var new_z = this.z - vec.z;

        return new Vec3(new_x, new_y, new_z);
    }

    /**
     * Scales a vector by a certain number
     * @param {number} scale_num A number to scale this vector by
     * @return {Vec3} A vector that is the result of scaling this vector by the scale_num
     * @throws Will throw an error if a non vector is provided
     */
    scale(scale_num)
    {
        // if it's not a number throw an error
        scale_num = Number(scale_num);
        if (isNaN(scale_num))
        {
            throw "Not a number";
        }

        var new_x = this.x * scale_num;
        var new_y = this.y * scale_num;
        var new_z = this.z * scale_num;

        return new Vec3(new_x, new_y, new_z);
    }

    /**
     * Gives the dot product between this vector and the given vector vec
     * @param {Vec3} vec A vector to be dotted with the current vector
     * @return {number} A number that is the result of a dot product between this vector and the vector vec
     * @throws Will throw an error if a non vector is provided
     */
    dot(vec)
    {
        // if it's not a vector throw an error
        if(!(vec instanceof Vec3))
        {
            throw "Not a vector";
        }

        var dot_prod = (this.x * vec.x) + (this.y * vec.y) + (this.z * vec.z);

        return dot_prod;
    }

    /**
     * Gives the cross product between this vector and the given vector vec
     * @param {Vec3} vec A vector to be crossed with the current vector
     * @return {Vec3} A vector that is the result of a cross product between this vector and the vector vec
     * @throws Will throw an error if a non vector is provided
     */
    cross(vec)
    {
        // if it's not a vector throw an error
        if(!(vec instanceof Vec3))
        {
            throw "Not a vector";
        }

        var new_x = (this.y * vec.z) - (this.z * vec.y);
        var new_y = (this.z * vec.x) - (this.x * vec.z);
        var new_z = (this.x * vec.y) - (this.y * vec.x);

        return new Vec3(new_x, new_y, new_z);
    }

    /**
     * Gives the angle between this vector and the x axis
     * @return {number} A number representing (in radians) the angle between this vector and the x axis
     */
    angle()
    {
        return this.angleBetween(new Vec3 (1, 0, 0));
    }

    /**
     * Gives the angle between this vector and another vector in radians
     * @param {Vec3} vec A vector to compare the angle between
     * @return {number} A number representing (in radians) the angle between this vector and the vector vec
     * @throw Will throw an error if a non vector is provided 
     */
    angleBetween(vec)
    {
        if(!(vec instanceof Vec3))
        {
            throw "Not a vector";
        }

        var answer = Math.acos(this.dot(vec) / (this.length() * vec.length()))

        return answer;
    }

    /**
     * Gives the length (magnitute) of this vector
     * @return {number} A number representing the length of a vector
     */
    length()
    {
        var answer = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));

        return answer;
    }

    /**
     * Gives the distance between this vector and another vector given by vec
     * @param {Vec3} vec A vector with which to frind the difference between it and this vector
     * @return {number} A number representing the distance between this vector and the given vector vec
     * @throws Will throw an error if a non vector is provided
     */
    distance(vec)
    {
        if(!(vec instanceof Vec3))
        {
            throw "Not a vector";
        }

        var answer = Math.sqrt(Math.pow((this.x - vec.x), 2) + Math.pow((this.y - vec.y), 2) + Math.pow((this.z - vec.z), 2));

        return answer;
    }

    /**
     * This function will return a vector in the same direction as this one but with a length of 1
     * @return A vector that has the same direction as this one but a length of 1
     */
    normalize()
    {
        var denominator = this.length();
        var new_x = this.x/denominator;
        var new_y = this.y/denominator;
        var new_z = this.z/denominator;

        return new Vec3(new_x, new_y, new_z);
    }

    /**
     * Returns true if the given vector vec is equal to this vector, otherwise returns false
     * @param {Vec3} vec A vector to compare to this one to see if the are equal
     * @return {boolean} A boolean valule that is true if the vectors are equal and false if they are not
     * @throws Will throw an error if a non vector is provided
     */
    equals(vec)
    {
        if(!(vec instanceof Vec3))
        {
            throw "Not a vector";
        }

        // initialize to true
        var same = true;
        // if any field is not equal set to true
        if (this.x != vec.x || this.y != vec.y || this.z != vec.z)
        {
            same = false;
        }

        return same;
    }

    // sets the return to be in a slightly different format
    [Symbol.toPrimitive](hint)
    {
        return `Vec3[x:${this.x},y:${this.y},z:${this.z}]`;
    }
}

// export Vec3
module.exports = Vec3;