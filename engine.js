/**
 * Creates a Color object which holds RGBA values with a toString method
 * for easy printing and setting to the Canvas' Context (which needs colors
 * in the form "rgba(r,g,b,a)".
 *
 * @class Color
 * @param r {number} [0,255] The red component of the color
 * @param g {number} [0,255] The green component of the color
 * @param b {number} [0,255] The blue component of the color
 * @param a {number} [0,1] The alpha component of the color
 */
class Color {
	constructor(r, g, b, a = 1) {
		this.r = r;
		this.g = g;
		this.b = b;
		if (a < 0 || a > 1) {
			console.error("Color alpha value should be between 0 and 1");
		}
		if (a < 0) {
			this.a = 0;
		} else if (a > 1) {
			this.a = 1;
		} else {
			this.a = a;		
		}
	}

	get r() {
		return this._r;
	}

	get g() {
		return this._g;
	}

	get b() {
		return this._b;
	}

	get a() {
		return this._a;
	}

	set r(r) {
		this._r = r % 256;
	}

	set g(g) {
		this._g = g % 256;
	}

	set b(b) {
		this._b = b % 256;
	}

	set a(a) {
		if (a < 0)
			a = Math.abs(a);
		if (a > 1)
			a = a % 1;
		this._a = a;
	}

	/**
	 * Returns the object in the form "rgba(r,g,b,a)"
	 * @returns {string}
	 */
	toString() {
		return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
	}

	/**
	 * Returns a new Color object with (0, 0, 0, 1)
	 * @returns {Color}
	 */
	static get BLACK() {
		return new Color(0,0,0,1);
	}

	/**
	 * Returns a new Color object with (255, 255, 255, 1)
	 * @returns {Color}
	 */
	static get WHITE() {
		return new Color(255,255,255,1);
	}

	/**
	 * Returns a new Color object with (255, 0, 0, 1)
	 * @returns {Color}
	 */
	static get RED() {
		return new Color(255,0,0,1);
	}

	/**
	 * Returns a new Color object with (0, 255, 0, 1)
	 * @returns {Color}
	 */
	static get GREEN() {
		return new Color(0,255,0,1);
	}

	/**
	 * Returns a new Color object with (0, 0, 255, 1)
	 * @returns {Color}
	 */
	static get BLUE() {
		return new Color(0,0,255,1);
	}

	/**
	 * Returns a new Color object with (180, 180, 180, 1)
	 * @returns {Color}
	 */
	static get GRAY() {
		return new Color(180,180,180,1);
	}

	/**
	 * Returns a new Color object with (255, 0, 255, 1)
	 * @returns {Color}
	 */
	static get PURPLE() {
		return new Color(255,0,255,1);
	}

	/**
	 * Returns a new Color object with (255, 255, 0, 1)
	 * @returns {Color}
	 */
	static get YELLOW() {
		return new Color(255,255,0,1);
	}

	/**
	 * Returns a new Color object with (255, 165, 0, 1)
	 * @returns {Color}
	 */
	static get ORANGE() {
		return new Color(255,165,0,1);
	}

	/**
	 * Returns a new Color object with (0, 255, 255, 1)
	 * @returns {Color}
	 */
	static get TEAL() {
		return new Color(0,255,255,1);
	}

	/**
	 * Returns a new Color object with (139, 69, 19, 1)
	 * @returns {Color}
	 */
	static get BROWN() {
		return new Color(139,69,19,1);
	}

	/**
	 * Returns a new Color object with random RGB values
	 * @returns {Color}
	 */
	static get random() {
		let r = Util.randRange(0, 256);
		let g = Util.randRange(0, 256);
		let b = Util.randRange(0, 256);
		return new Color(r,g,b,1);
	}

}
/**
 * A Vector object holding x and y components.
 * @class Vector2
 */
class Vector2 {
	/**
	 * @param x {Number} The x component of the vector
	 * @param y {Number} The y component of the vector
	 */
	constructor(x, y) {
		this._x = x || 0;
		this._y = y || 0;
	}

	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}

	set x(x) {
		this._x = x;
	}

	set y(y) {
		this._y = y;
	}

	/**
	 * Gets the squared magnitude of the Vector. Useful for when speed is a
	 * factor, as Math.sqrt can be slow.
	 * @returns {Number} The squared magnitude of the Vector
	 */
	get magnitudeSquared() {
		return (this.x * this.x) + (this.y * this.y);
	}

	/**
	 * Gets the magnitude of the Vector.
	 * @returns {Number}
	 */
	get magnitude() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}

	/**
	 * Gets the Vector with components between 0 and 1
	 * @returns {Vector2}
	 */
	get normalized() {
		return Vector2.div(this, this.magnitude);
	}

	/**
	 * Gets the normal of the Vector
	 * @returns {Vector2}
	 */
	get normal() {
		return new Vector2(-this.y, this.x);
	}


	/**
	 * Adds another Vector2's components to this one and returns it
	 * @param other {Vector2}
	 * @returns {Vector2}
	 */
	add(other) {
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	/**
	 * Subtracts another Vector2's components from this one.
	 * @param other {Vector2}
	 * @returns {Vector2}
	 */
	sub(other) {
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

	/**
	 * Copies another Vector2 to this one and returns it
	 * @param other {Vector2}
	 * @returns {Vector2}
	 */
	set(other) {
		this.x = other.x;
		this.y = other.y;
		return this;
	}

	equals(other) {
		return this.x === other.x && this.y === other.y;
	}

	/**
	 * Multiplies this Vector2 by a scalar value or a Vector2 and returns it.
	 * If k is a Vector2, the X components are multiplied and the Y components
	 * are multiplied (does not do dot product math).
	 * @param k
	 * @returns {Vector2}
	 */
	mult(k) {
		if (k instanceof Vector2) {
			this.x *= k.x;
			this.y *= k.y
		} else if (!isNaN(k)) {
			this.x *= k;
			this.y *= k
		}
		return this;
	}

	/**
	 * Returns the dot product with another Vector2.
	 * @param other {Vector2} The other Vector2
	 * @returns {number}
	 */
	dot(other) {
		return this.x * other.x + this.y * other.y;
	}

	/**
	 * Returns the distance to another Vector2
	 * @param other {Vector2} The other Vector2
	 * @returns {number}
	 */
	distance(other) {
		return this.sub(other).magnitude;
	}

	/**
	 * Lerps between the current position and the given Vector2, at time t.
	 * t is a value between 0 and 1, where 0 results in the start,
	 * 0.5 results in the midpoint between the start and destination, and 1
	 * results in the destination.
	 * @param destination {Vector2} The wanted position
	 * @param t {double} A double between 0 and 1 (inclusive)
	 */
	lerp(destination, t) {
		if (t > 1) t = 1;
		if (t < 0) t = 0;
		this.x = this.x + ((destination.x - this.x) * t);
		this.y = this.y + ((destination.y - this.y) * t);
	}

	/**
	 * Returns the dot product between two Vector2s.
	 * @param v1 {Vector2} The first Vector2
	 * @param v2 {Vector2} The other Vector2
	 * @returns {number}
	 */
	static dot(v1, v2) {
		return v1.x * v2.x + v1.y * v2.y;
	}

	/**
	 * Returns the distance between two Vector2s.
	 * @param v1 {Vector2} The first Vector2
	 * @param v2 {Vector2} The other Vector2
	 * @returns {number}
	 */
	static distance(v1, v2) {
		return v2.sub(v1).magnitude;
	}

	/**
	 * Returns the angle between two Vector2s.
	 * @param v1 {Vector2} The origin
	 * @param v2 {Vector2} The end position of the line segment
	 * @returns {number}
	 */
	static angleBetween(v1, v2) {
		let angle = Math.atan2(v2.y - v1.y, v2.x - v1.x);
		if (angle < 0) angle += Math.PI * 2;
		return angle;
	}

	/**
	 * Returns a Vector2 lerped between the given Vector2s, at time t.
	 * t is a value between 0 and 1, where 0 results in the start,
	 * 0.5 results in the midpoint between the start and destination, and 1
	 * results in the destination.
	 * @param start {Vector2} The current position
	 * @param destination {Vector2} The wanted position
	 * @param t {double} A double between 0 and 1 (inclusive)
	 * @returns {Vector2}
	 */
	static lerp(start, destination, t) {
		if (t > 1) t = 1;
		if (t < 0) t = 0;
		let result = new Vector2(0, 0);
		result.x = start.x + ((destination.x - start.x) * t);
		result.y = start.y + ((destination.y - start.y) * t);
		return result;
	}

	/**
	 * Subtracts two Vector2s and returns the result
	 * @param a {Vector2} The original Vector2
	 * @param b {Vector2} The Vector2 to subtract from a
	 * @returns {Vector2}
	 */
	static sub(a, b) {
		return new Vector2(a.x - b.x, a.y - b.y);
	}

	/**
	 * Adds either two Vector2s or a Vector2 and a scalar value and returns the result
	 * @param a {Vector2 or Number}
	 * @param b {Vector2 or Number}
	 * @returns {Vector2}
	 */
	static add(a, b) {
		if (a instanceof Vector2) {
			if (b instanceof Vector2) {
				return new Vector2(a.x + b.x, a.y + b.y);
			}
			return new Vector2(a.x + b, a.y + b);
		}
		if (b instanceof Vector2) {
			return new Vector2(b.x + a, b.y + a);
		}
		console.error("Attempted to call Vector2.add without a Vector2 as a parameter");
		return null;
	}

	/**
	 * Multiplies a Vector2 by a scalar value or a Vector2 and returns the result.
	 * If b is a Vector2, the X components are multiplied, and the Y components are
	 * multiplied (no dot product math is done)
	 * @param a {Vector2}
	 * @param b
	 * @returns {Vector2}
	 */
	static mult(a, b) {
		if (a instanceof Vector2) {
			if (b instanceof Vector2) {
				return new Vector2(a.x * b.x, a.y * b.y);
			}
			return new Vector2(a.x * b, a.y * b);
		}
		if (b instanceof Vector2) {
			return new Vector2(b.x * a, b.y * a);
		}

		console.error("Attempted to call Vector2.mult without a Vector2 as a parameter");
		return null;
	}

	/**
	 * Divides a Vector2 by a scalar value or a Vector2 and returns the result.
	 * If b is a Vector2, the X components are divided, and the Y components are
	 * divided (no dot product math is done)
	 * @param a
	 * @param b
	 * @returns {Vector2}
	 */
	static div(a, b) {
		if (b instanceof Vector2) {
			return new Vector2(a.x / b.x, a.y / b.y);
		}
		return new Vector2(a.x / b, a.y / b);
	}

	/**
	 * Returns a new Vector2 zeroed out. Shorthand for 'new Vector2(0, 0)'
	 * @returns {Vector2}
	 */
	static get zero() {return new Vector2(0, 0);}
	static get right() {return new Vector2(1, 0);}
	static get left() {return new Vector2(-1, 0);}
	static get up() {return new Vector2(0, -1);}
	static get down() {return new Vector2(0, 1);}

	/**
	 * Returns a copy of this Vector2
	 * @returns {Vector2}
	 */
	copy() {
		return new Vector2(this.x, this.y);
	}

	/**
	 * Copies this Vector2 to a Vector3, and returns it
	 * @returns {Vector3}
	 */
	toVector3() {
		return new Vector3(this.x, this.y, 0);
	}

	/**
	 * Returns this Vector2 (used for inner-engine functions)
	 * @returns {Vector2}
	 */
	toVector2() {
		return this;
	}

}

/**
 * A Vector object holding x, y, and z components.
 * @class Vector3
 */
class Vector3 extends Vector2 {
	/**
	 *
	 * @param x {number}
	 * @param y {number}
	 * @param z {number}
	 */
	constructor(x, y, z = 0) {
		super(x, y);
		this.z = z;
	}

	get z() {
		return this._z;
	}

	set z(z) {
		this._z = z;
	}
	/**
	 * Get the magnitude (length) of the Vector3.
	 *
	 * @return     {Number}  { Returns a Number representation of the magnitude }
	 */
	get magnitude() {
		return Math.cbrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
	}

	/**
	 * Get a new, normalized version of this Vector3 where each component is between
	 * 0 and 1. This is done by dividing each component by the magnitude of the Vector3.
	 *
	 * @return     {Vector3}  { Returns a Vector3 with components between 0 and 1 }
	 */
	get normalized() {
		return Vector3.div(this, this.magnitude);
	}

	/**
	 * Add a Vector to this one. If the second Vector is of type Vector2 then the
	 * Z parameter of the Vectors are ignored.
	 *
	 * @param      {Vector2 or Vector3}  other   The other Vector to add to the current one.
	 * @return     {Vector3}  { Returns the current Vector3 for method chaining }
	 */
	add(other) {
		this.x += other.x;
		this.y += other.y;
		this.z += (other.z || 0);
		return this;
	}

	/**
	 * Subtract a Vector from this one. If the second Vector is of type Vector2 then the
	 * Z parameter of the Vectors are ignored.
	 *
	 * @param      {Vector2 or Vector3}  other   The other Vector to subtract.
	 * @return     {Vector3}  { Returns the current Vector3 for method chaining }
	 */
	sub(other) {
		this.x -= other.x;
		this.y -= other.y;
		this.z -= (other.z || 0);
		return this;
	}

	/**
	 * Sets the Vector3 equal to the parameter. If the second Vector is of type Vector2 then the
	 * Z parameter of the Vectors are ignored.
	 *
	 * @param      {Vector2 or Vector3}  other   The other Vector to set to the current one equal to.
	 * @return     {Vector3}  { Returns the current Vector3 for method chaining }
	 */
	set(other) {
		this.x = other.x;
		this.y = other.y;
		this.z = (other.z || this.z);
		return this;
	}

	/**
	 * Multiply a this Vector and a different one. This does a direct, horizontal multiplication
	 * where the X components are multiplied, the Y are multiplied, and the Z are multiplied.
	 * If the second Vector is of type Vector2 then the Z parameter of the Vectors are ignored.
	 *
	 * @param      {Vector2 or Vector3}  other   The other Vector to multiply to the current one.
	 * @return     {Vector3}  { Returns the current Vector3 for method chaining }
	 */
	mult(k) {
		if (k instanceof Vector3) {
			this.x *= k.x;
			this.y *= k.y;
			this.z *= k.z;
		} else if (!isNaN(k)) {
			this.x *= k;
			this.y *= k;
			this.z *= k;
		}
		return this;
	}

	equals(other) {
		return super.equals(other) && this.z === other.z;
	}

	toVector2() {
		return new Vector2(this.x, this.y);
	}

	copy() {
		return new Vector3(this.x, this.y, this.z);
	}

	static sub(a, b) {
		return new Vector3(a.x - b.x, a.y - b.y, a.z - (b.z || 0));
	}

	static add(a, b) {
		return new Vector3(a.x + b.x, a.y + b.y, a.z + (b.z || 0));
	}

	static mult(a, b) {
		if (b.constructor === Vector3) {
			return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
		} else if (b.constructor === Number) {
			return new Vector3(a.x * b, a.y * b, a.z * b);
		}

	}

	static div(a, b) {
		if (b.constructor === Vector3) {
			return new Vector3(a.x / b.x, a.y / b.y, a.z / b.z);
		} else if (b.constructor === Number) {
			return new Vector3(a.x / b, a.y / b, a.z / b);
		}
	}

	static get zero() {return new Vector3(0, 0, 0);}
}

/**
 * A Line object holding start and end points.
 * @class Line
 */
class Line {
	constructor(p1, p2) {
		this.start = p1;
		this.end = p2;
	}
	get length() {
		return Vector2.sub(this.start, this.end).magnitude;
	}
	get slope() {
		return (this.end.y - this.start.y) / (this.end.x - this.start.x);
	}
	get normal() {
		return new Vector2((this.end.y - this.start.y), -(this.end.x - this.start.x));
	}
}

/**
 * A Rect object holding x, y, width, and height components.
 * @class Rect
 */
class Rect extends Vector2 {
	constructor(x, y, width, height) {
		super(x, y);
		this._width = width;
		this._height = height;
	}

	get width() {
		return this._width
	}

	get height() {
		return this._height
	}

	get center() {
		return new Vector2(this.x + this.width / 2, this.y + this.height / 2)
	}

	get right() {
		return this.x + this.width
	}

	get bottom() {
		return this.y + this.height
	}

	get edges() {
		return {
			'top': new Line(new Vector2(this.x, this.y), new Vector2(this.right, this.y)),
			'right': new Line(new Vector2(this.right, this.y), new Vector2(this.right, this.bottom)),
			'bottom': new Line(new Vector2(this.x, this.bottom), new Vector2(this.right, this.bottom)),
			'left': new Line(new Vector2(this.x, this.y), new Vector2(this.x, this.bottom))
		}
	}

	set width(width) {
		this._width = width
	}

	set height(height) {
		this._height = height
	}

	equals(rect) {
		return this.x === rect.x &&
			this.y === rect.y &&
			this.w === rect.w &&
			this.h === rect.h
	}

	toVector2() {
		return new Vector2(this.x, this.y)
	}

	copy() {
		return new Rect(this.x, this.y, this.width, this.height)
	}
}

/**
 * A Circle object holding x, y, and r components.
 * @class Circle
 */
class Circle extends Rect {
	constructor(x, y, r) {
		super(x, y, r, r);
		this.r = r;
	}
	center() {
		return new Vector2(this.x, this.y);
	}
	equals(circle) {
		return this.x === circle.x &&
		this.y === circle.y &&
		this.r === circle.r;
	}
	get edges() {
		return {};
	}
	get top() {
		return this.y - this.r;
	}
	get right() {
		return this.x + this.r;
	}
	get bottom() {
		return this.y + this.r;
	}
	get left() {
		return this.x - this.r;
	}
}

/**
 * A Transform object used for positioning an object. Has x, y, and z
 * components, as well as width, height, and a rotation.
 * @class Transform
 */
class Transform extends Vector3 {
	/**
	 *
	 * @param x {number}
	 * @param y {number}
	 * @param z {number}
	 * @param width {number}
	 * @param height {number}
	 */
	constructor(x, y, z, width, height) {
		super(x, y, z);

		this._width = width || 1;
		this._height = height || 1;
		this._rect = new Rect(x, y, width, height);
		this._rotation = 0;
		this._scale = new Vector2(1, 1);
		this._forward = Vector2.right;
		this._direction = Vector2.right;
		this._defaultRotation = Vector2.angleBetween(Vector2.zero, this._forward);
	}

	get width() {
		return this._width
	}

	get height() {
		return this._height
	}

	set scale(scale) {
		this._scale = scale
	}

	get scale() {
		return this._scale
	}

	get rect() {
		this._rect.x = this.x;
		this._rect.y = this.y;
		this._rect.width = this.width;
		this._rect.height = this.height;
		return this._rect
	}

	set width(width) {
		this._width = width
	}

	set height(height) {
		this._height = height
	}

	get rotation() {
		return this._rotation;
	}

	set forward(vec2) {
		if (vec2.constructor === Vector2) {
			this._forward.set(vec2);
			this._defaultRotation = Vector2.angleBetween(Vector2.zero, this._forward);
		}
	}

	get forward() {
		return this._forward;
	}

	get direction() {
		return this._direction;
	}

	get defaultRotation() {
		return this._defaultRotation;
	}

	/**
	 * Set the rotation of the Transform in radians
	 *
	 * @param      {Number}  radians   The angle in radians
	 */
	set rotation(radians) {
		let PI2 = Math.PI * 2;
		let a = radians % PI2;

		if (a < 0)
			a += PI2;
		this._rotation = a;
		this._direction.x = Math.cos(this._rotation);
		this._direction.y = Math.sin(this._rotation);
	}

	add(vector3) {
		super.add(vector3);
		return this;
	}

	sub(vector3) {
		super.sub(vector3);
		return this;
	}
	lerpRotation(angle, t) {
		if (t > 1) t = 1;
		if (t < 0) t = 0;
		let PI2 = Math.PI * 2;
		let a = angle % PI2;
		if (this.rotation - a > Math.PI) {
			this.rotation = Math.abs((this.rotation + (a - (this.rotation - PI2)) * t) % PI2)
		} else if (this.rotation - a < -Math.PI) {
			this.rotation = (this.rotation + (a - (this.rotation + PI2)) * t) % PI2;
			if (this.rotation < 0) {
				this.rotation += PI2
			}
		} else {
			this.rotation = Math.abs((this.rotation + (a - this.rotation) * t) % PI2)
		}
	}

	copy() {
		return new Transform(this.x, this.y, this.z, this.width, this.height)
	}

	static get zero() {return new Transform(0, 0, 0, 0, 0);}

}
class Container {
	constructor(transform) {
		// Use default Transform if unspecified
		if (typeof transform === 'undefined' || transform === null) {
			transform = new Transform(0,0,0,1,1);
		};
		this._transform = transform;
		this._children = [];
		this._parent = null;
		this._enabled = true;
		this._flattened = [];
		this._sceneKey = null;
	}

	get transform() {
		return this._transform
	}

	get children() {
		return this._children
	}

	get parent() {
		return this._parent
	}

	get flattened() {
		return this._flattened
	}

	get enabled() {
		return this._enabled
	}

	get localPosition() {
		return Vector3.sub(this.transform, this.parent.transform)
	}

	get absolutePosition() {
		return this.transform
	}

	set localPosition(position) {
		this.moveTo(Vector3.add(this.parent.transform, position))
	}

	set transform(transform) {
		this._transform = transform
	}

	set enabled(enabled) {
		for (const child of this.children) {
			child.enabled = enabled
		}
		this._enabled = enabled
	}

	/**
	 * Adds a child element to the container. As a result, the child is added to
	 * the container's 'flattened' array of descendants. Each of the child's
	 * descendants are also then added to the container's descendants (that is,
	 * the elements in child.flattened are essentially concatenated to this
	 * container's flattened array)
	 *
	 * @param      {Container}  child   The child to be added to the container
	 */
	add(child) {
		if (child instanceof Component) {
			console.error("Attempted to add a component as a child... Did you mean to use addComponent?");
		} else if (child instanceof Container === false) {
			console.error("You can only add objects of type Container to this container", child);
		} else if (child === this || child.parent !== null) { // child is not this, child is an orphan
			console.error("Child already has a parent", child);
		} else {
			child._parent = this;
			this.children.push(child);
			this._addToFlattened(child);

			for (const grandchild of child.flattened) {
				this._addToFlattened(grandchild)
			}
		}
		return this
	}

	/**
	 * Removes a given child from the container. In doing so, each of the child's
	 * descendants are removed from the container's (and its parent's) flattened
	 * array.
	 *
	 * @param      {Container}   child   The child to be removed from the container
	 * @return     {boolean}  { True if child is found, False otherwise }
	 */
	remove(child) {
		let index = this.children.indexOf(child);
		if (index < 0) {
			return false
		}
		this.children.splice(index, 1);
		this._removeFromFlattened(child);
		for (const grandchild of child.flattened) {
			this._removeFromFlattened(grandchild);
		}
		child._parent = null;
		return true
	}

	/**
	 * Removes all children from this container. In doing so, all descendants are
	 * removed from this container as well as any parents.
	 */
	removeAll() {
		if (this.parent !== null && this.parent._removeFromFlattened) {
			for (let child of this.flattened) {
				this.parent._removeFromFlattened(child);
			}
			for (let child of this.children) {
				child._parent = null;
			}
		}
		this._children = [];
		this._flattened = [];
	}

	/**
	 * Determines if this container has a given child.
	 *
	 * @param      {Container}   child   The child to be searched for
	 * @return     {boolean}  True if has child, False otherwise.
	 */
	hasChild(child) {
		return this.children.indexOf(child) >= 0;
	}

	/**
	 * Determines if this container has a given descendant (either a child,
	 * grandchild, etc.).
	 *
	 * @param      {Container}   child   The child to be searched for
	 * @return     {boolean}  True if has descendant, False otherwise.
	 */
	hasDescendant(child) {
		return this.flattened.indexOf(child) >= 0;
	}

	/**
	 * Adds to the descendant (flattened) array. To add an element to this
	 * container, use the add(child) method which in turn calls this method.
	 * This method should not be explicitly called from outside of this class.
	 *
	 * @param      {Container}  child   The child to be added
	 */
	_addToFlattened(child) {
		this.flattened.push(child);
		if (this.parent != null && this.parent._addToFlattened) {
			this.parent._addToFlattened(child);
		}
	}

	/**
	 * Removes a descendant from the descendant (flattened) array. To remove an element
	 * from this container, use the remove(child) method which in turn calls this method.
	 * This method should not be explicitly called from outside of this class.
	 *
	 * @param      {Container}  child   The child to be removed
	 */
	_removeFromFlattened(child) {
		this.flattened.splice(this.flattened.indexOf(child), 1);
		if (this.parent != null && this.parent._removeFromFlattened) {
			this.parent._removeFromFlattened(child)
		}
	}

	/**
	 * Moves the element and each of its descendants in a given direction.
	 *
	 * @param      {Vector3}  difference  The Vector3 to be added to the Transforms
	 */
	move(difference) {
		this.transform.add(difference);
		for (const child of this.flattened) {
			child.transform.add(difference);
		}
	}

	/**
	 * Moves the element to a specific position, then moves each descendant
	 * to their position relative to their parents.
	 *
	 * @param      {Vector3}  vector3  The position to move to
	 */
	moveTo(vector3) {
		let positionDifference = Vector3.sub(vector3, this.transform);
		this.transform.set(vector3);
		for (const child of this.flattened) {
			child.transform.set(Vector3.add(child.transform, positionDifference))
		}
	}

	moveCenterTo(vector3) {
		let adjustedPos = Vector2.sub(vector3, new Vector2(this.transform.width / 2, this.transform.height / 2));
		let positionDifference = Vector3.sub(adjustedPos, this.transform);
		this.transform.set(adjustedPos);
		for (const child of this.flattened) {
			child.transform.set(Vector3.add(child.transform, positionDifference))
		}
	}

	moveTowards(destination, s) {
		let norm = Vector2.sub(destination, this.transform).normalized;
		this.move(norm.mult(s));
	}

	moveCenterTowards(destination, s) {
		let norm = Vector2.sub(destination, this.transform.rect.center).normalized;
		this.move(norm.mult(s));
	}

	/**
	 * Called when the Container is added to a scene. This is handled from left to right (the order
	 * of calls depend on the order of the flattened list of children). The order is not guaranteed
	 * to follow any specific rule. Calls this.onAddedToScene(key). Do not modify this method. If
	 * custom events want to be called, override this.onAddedToScene(key).
	 *
	 * @param      {String}  key     The key of the Scene the Container was added to.
	 */
	_onAddedToScene(key) {
		this._sceneKey = key;
		this.onAddedToScene(key);
		for (let child of this._flattened) {
			child._onAddedToScene(key);
		}
	}
	/**
	 * Called when the Container is added to a scene. Override this method to create custom
	 * callback functionality when the Container is added to a scene.
	 *
	 * @param      {String}  key     The key of the scene the Container was added to.
	 */
	onAddedToScene(key) {}
}

class GameObject extends Container {
	constructor(transform, isUI) {
		super(transform);
		this.isUI = isUI || false;
		this.components = [];
		this.tag = "";
	}

	get rotation() {
		return this.transform.rotation;
	}

	/**
	 * Set the rotation in radians.
	 *
	 * @param      {Number}  rotation  The rotation
	 */
	set rotation(radians) {
		let difference = radians - this.transform.rotation;
		this.transform.rotation = radians;
		for (const child of this.children) {
			let angleToChild = Vector2.angleBetween(child.transform.rect.center, this.transform.rect.center);
			let distanceToChild = Vector2.sub(  this.transform.rect.center,child.transform.rect.center)
				.magnitude;
			child.rotation += difference;
			let newRelativePosition = new Vector2(
					Math.cos(angleToChild + difference) * distanceToChild,
					Math.sin(angleToChild + difference) * distanceToChild);
			child.moveCenterTo(Vector2.add(this.transform.rect.center, newRelativePosition));
		}
	}

	rotate(radians) {
		this.transform.rotation = (this.transform.rotation + radians) % (Math.PI * 2);
		for (let child of this._flattened) {
			child.transform.rotation = (child.transform.rotation + radians) % (Math.PI * 2);
		}
	}

	lerpRotateTowards(position, t) {
		if (typeof position === "undefined") {
			console.error("Argument 'position' is undefined");
		}
		if (typeof t === "undefined") {
			console.error("Argument 't' is undefined");
		}
		let angle = Vector2.angleBetween(this.transform.rect.center, position) + 
					((Math.PI*2) - this.transform.defaultRotation);
		let difference = angle - this.transform.rotation;
		this.transform.lerpRotation(angle, t);
		for (const child of this._flattened) {
			child.lerpRotation(angle, t);
		}
	}

	rotateTowards(position, maxDegrees) {
		if (typeof position === "undefined") {
			console.error("Argument 'position' is undefined");
		}
		let PI2 = Math.PI * 2;
		let angle = Vector2.angleBetween(this.transform.rect.center, position) + 
					(PI2 - this.transform.defaultRotation) % PI2;

		if (this.rotation - angle > Math.PI) {
			this.rotation = Math.abs((this.rotation + (angle - (this.rotation - PI2))) % PI2);
		} else if (this.rotation - angle < -Math.PI) {
			this.rotation = (this.rotation + (angle - (this.rotation + PI2))) % PI2;
			if (this.rotation < 0) {
				this.rotation += PI2;
			}
		} else {
			this.rotation = Math.abs((this.rotation + (angle - this.rotation)) % PI2);
		}

	}


	addComponent(component) {
		for (const c of this.components) {
			if (c instanceof component.constructor) {
				console.error("GameObject already has a component of type: " + component.constructor);
				return;
			}
		}
		this.components.push(component);
		component.addTo(this);
	}

	removeComponent(componentType) {
		for (const component of this.components) {
			if (component instanceof componentType) {
				if (component instanceof InputComponent) {
					Scene.getScene(this.sceneKey).removeInputComponent(component);
				}
				component.remove();
				this.components.splice(this.components.indexOf(component), 1);
				return true;
			}
		}
		return false;
	}

	removeAllComponents() {
		for (let c of this.components) {
			if (c instanceof InputComponent) {
				Scene.getScene(this._sceneKey).removeInputComponent(c);
			}
			c.destroy();
		}
		this.components = [];
	}

	getComponent(componentType) {
		for (const c of this.components) {
			if (c instanceof componentType) {
				return c;
			}
		}
		return null;
	}

	getComponentsInChildren(componentType) {
		let results = [];
		for (const child of this.flattened) {
			let c = child.getComponent(componentType);
			if (c !== null) results.push(c);
		}
		return results;
	}

	destroy() {
		if (this.parent) {
			this.parent.remove(this);
		}
		this.removeAllComponents();
		for (let child of this.flattened) {
			child.removeAllComponents();
		}
		this.removeAll(); // FIX ME : Need to delete child GameObjects and their Components, not just remove them
		this.enabled = false
	}

	/**
	 * Called when the GameObject is added to a scene. This is handled from left to right (the order
	 * of calls depend on the order of the flattened list of children). The order is not guaranteed
	 * to follow any specific rule. Calls this.onAddedToScene(key). See Container._onAddedToScene(key).
	 * Do not modify this method. If custom events want to be called, override 
	 * this.onAddedToScene(key).
	 * 
	 * If the GameObject has any InputComponent components, they are added to the parent scene's 
	 * inputComponent list.
	 *
	 * @param      {String}  key     The key of the Scene the GameObject was added to.
	 */
	_onAddedToScene(key) {
		super._onAddedToScene(key);
		for (let c of this.components) {
			if (c instanceof InputComponent) {
				Scene.getScene(key).addInputComponent(c);
			}
		}
	}

	_update(dt) {
		if (this.enabled === true) {
			for (const c of this.components) {
				if (c.enabled && c.constructor !== RigidBody) {
					// RigidBody components are updated in the PhysicsEngine class
					c._update(dt);
				}
			}
			if (this.update) {
				this.update(dt);
			}
		}
	}
}
class Component {
	constructor() {
		this.gameObject = null;
		this.enabled = true;
	}

	addTo(gameObject) {
		this.gameObject = gameObject;
	}

	remove() {
		this.gameObject = null;
	}

	destroy() {
		delete this.gameObject;
		this.enabled = false;
	}

	_update(dt) {
		if (this.enabled === true && this.update !== undefined) {
			this.update(dt);
		}
	}
}

/**
 * The Scene class is used for organizing objects in the world. A scene will be the most-ancestor
 * parent of every GameObject that is viewable and updated in the world. A game may have multiple
 * scenes, which can be swapped-out with the changeScene method. Scenes are stored in the Scene
 * class, and are accessed by their associated keys. Only a single scene can be on display at a
 * single time. You can access the currently displayed scene through Scene.current.
 *
 * @class      Scene
 */
class Scene {
	constructor(key) {
		this.key = key;
		this.mainCamera = null;
		Scene._scenes[key] = this;
		this._children = [];
		this._inputComponents = [];
		this._flattened = [];
		if (Scene.current === null) {
			Scene.changeScene(key);
		}
	}

	get children() {
		return this._children;
	}

	get flattened() {
		return this._flattened;
	}

	add(child) {
		if (child instanceof GameObject) {
			if (child !== this && child.parent === null) { // child is not this, child is an orphan
				child._parent = this;
				this.children.push(child);
				this._addToFlattened(child);
				child._onAddedToScene(this.key);

				for (const grandchild of child.flattened) {
					this._addToFlattened(grandchild);
				}
			} else {
				console.error("Child already has a parent", child);
			}
		} else {
			console.error("Only GameObjects can be added to a scene", child);
		}
		return this
	}

	/**
	 * Removes a given child from the scene. In doing so, each of the child's
	 * descendants are removed from the scene and and its flattened array.
	 *
	 * @param      {GameObject}   child   The child to be removed from the scene
	 * @return     {boolean}  { Returns true if child is found, false otherwise }
	 */
	remove(child) {
		let index = this.children.indexOf(child);
		if (index < 0) {
			return false;
		}
		this.children.splice(index, 1);
		this._removeFromFlattened(child);
		for (const grandchild of child.flattened) {
			this._removeFromFlattened(grandchild);
		}
		child._parent = null;
		return true
	}

	/**
	 * Adds to the descendant (flattened) array. To add an element to this
	 * container, use the add(child) method which in turn calls this method.
	 * This method should not be explicitly called from outside of this class.
	 *
	 * @param      {Container}  child   The child to be added
	 */
	_addToFlattened(child) {
		this._flattened.push(child);
	}

	/**
	 * Removes a descendant from the descendant (flattened) array. To remove an element
	 * from this container, use the remove(child) method which in turn calls this method.
	 * This method should not be explicitly called from outside of this class.
	 *
	 * @param      {Container}  child   The child to be removed
	 */
	_removeFromFlattened(child) {
		this.flattened.splice(this.flattened.indexOf(child), 1);
	}

	hasChild(child) {
		return this.children.indexOf(child) >= 0;
	}

	hasDescendant(child, children = this.children) {
		/*
			1. check if child is a direct child of this Container
			2. if it is not, then for each child of this Container check if
			the child we want to find is a direct child of the one in the loop
			3. this will then keep recurring deeper into the hierarchy until the
			child is found or the end of the family tree is reached
		*/

		if (children[0].parent.hasChild(child))
			return true;
		for (const c of this.children) {

			if (c.children) { // make sure it is able to have children
				if (c.children.length > 0) {
					if (this.hasDescendant(child, c.children)) { // if it does, run this again with this child as the parent
						return true;
					}
				}
			}
		}
		return false;
	}

	addInputComponent(component) {
		this._inputComponents.push(component);
	}

	removeInputComponent(component) {
		let index = this._inputComponents.indexOf(component);
		if (index < 0) return;
		this._inputComponents.splice(index, 1);
	}

	/**
	 * Handles mouse input for the current scene.
	 *
	 * @param      {String}  type    The type of mouse event
	 */
	handleInput(type) {
		// handle mouse movement
		if (type === Input._MOUSEMOVE) {
			for (const component of this._inputComponents) {
				if (component.isDragged) {
					component._onDrag(Input.mouse.rel);
				}
				if (Input.mouse.down === false) {
					if (PhysicsEngine.collisionPR(Input.mouse.rel, component.gameObject.transform)) {
						component._onHover(Input.mouse.rel);					
					} else {
						if (component.isHovered) {
							component._onExit(Input.mouse.rel);
						}
					}
				}
			}
		// handle mouse down
		} else if (type === Input._MOUSEDOWN) {
			let topMost = null;
			for (const component of this._inputComponents) {
				if (PhysicsEngine.collisionPR(Input.mouse.rel, component.gameObject.transform)) {
					if (topMost === null || component.gameObject.transform.z > topMost.gameObject.transform.z)
						topMost = component;
				}
			}
			if (topMost !== null)
				topMost._onClick(Input.mouse.rel);

		// handle mouse up
		} else if (type === Input._MOUSEUP) {
			for (const component of this._inputComponents) {
				if (component.isDragged || component.isPressed) {
					component._onRelease(Input.mouse.rel);
				}
			}

		// handle double click
		} else if (type === Input._MOUSEDBLDOWN) {
			let topMost = null;
			for (const component of this._inputComponents) {
				if (PhysicsEngine.collisionPR(Input.mouse.rel, component.gameObject.transform)) {
					if (topMost === null || component.gameObject.transform.z > topMost.gameObject.transform.z)
						topMost = component;
				}
			}
			if (topMost !== null)
				topMost._onDblClick(Input.mouse.rel);
		}
	}

	static draw(player) {
		if (Scene.current === null) return;
		if (Scene.current.mainCamera) {
			Scene.current.mainCamera.draw(player, Scene.current.flattened);
		} else {
			// if the mainCamera is not set yet, let's first try to find one
			for (let child of Scene.current.flattened) {
				let cameraComponent = child.getComponent(Camera);
				if (cameraComponent) {
					Scene.current.mainCamera = cameraComponent;
					return;
				}
			}
			// if we cannot find a camera, send out a warning only once
			if (Scene._noCameraWarningSent === false) {
				Scene._noCameraWarningSent = true;
				console.error("No camera was found");
			}
		}
	}

	static clear(player, color = Color.BLACK) {
		if (Scene.current === null) return;
		if (Scene.current.mainCamera) {
			player.context.fillStyle = color;
			player.context.fillRect(0, 0, 	Scene.current.mainCamera.viewport.width, 
											Scene.current.mainCamera.viewport.height);
		} else {
			// if the mainCamera is not set yet, let's first try to find one
			for (let child of Scene.current.flattened) {
				let cameraComponent = child.getComponent(Camera);
				if (cameraComponent) {
					Scene.current.mainCamera = cameraComponent;
					return;
				}
			}
			// if we cannot find a camera, send out a warning only once
			if (Scene._noCameraWarningSent === false) {
				Scene._noCameraWarningSent = true;
				console.error("No camera was found");
			}
		}
	}

	static get current() {
		return Scene._currentScene;
	}

	static getScene(sceneKey) {
		if (sceneKey in Scene._scenes) {
			return Scene._scenes[sceneKey];
		} else {
			console.error("Scene " + sceneKey + " not found");
		}
	}

	static changeScene(sceneKey) {
		if (sceneKey in Scene._scenes) {
			Scene._currentScene = Scene._scenes[sceneKey];
		} else {
			console.error("Scene " + sceneKey + " not found");
		}
	}

	static deleteScene(sceneKey) {
		if (sceneKey in Scene._scenes) {
			delete Scene._scenes[sceneKey];
		} else {
			console.error("Scene " + sceneKey + " not found");
		}
	}

	static update (dt) {
		if (Scene.current === null) return;
		Scene.current.flattened.forEach((gameObject)=>{gameObject._update(dt)});
	}
}
Scene._scenes = [];
Scene._currentScene = null;
Scene._noCameraWarningSent = false;


/**
 * Class for input components. Extended from the Component class. Extend this class to
 * create components that will make use of the mouse. This is needed because of how 
 * components are added to the scene's list of input components.
 *
 * @class      InputComponent
 */
class InputComponent extends Component {
	constructor() {
		super();
	}

	destroy() {
		if (this.gameObject) {
			Scene.getScene(this.gameObject._sceneKey).removeInputComponent(this);
		}
		super.destroy()
	}
}

class Button extends InputComponent {
	constructor() {
		super();
		this.isHovered = false;
		this.isPressed = false;
	}

	onClick(point){};

	onDblClick(point){};

	onRelease(point){};

	onHover(point){};

	onExit(point){};

	_onClick(point) {
		this.isPressed = true;
		this.onClick(point)
	}

	_onDblClick(point) {
		this.onDblClick(point);
	}

	_onRelease(point) {
		this.isPressed = false;
		this.onRelease(point);
	}

	_onHover(point) {
		this.isHovered = true;
		this.onHover(point);
	}

	_onExit(point) {
		this.isHovered = false;
		this.onExit(point);
	}
}


/**
 * Animator component that can be added to a GameObject with a
 * SpriteRenderer attached. Allows for an Animation to be used
 * which cycles through a set of Sprites based on a given
 * frame rate. Animations are added with addAnimation() and
 * can be removed with removeAnimation(). Set the current
 * animation by providing the key (animator.animation = 'key').
 *
 * @class      Animator (name)
 */
class Animator extends Component {
	constructor(frameRate) {
		super();
		this.frameRate = frameRate;
		this.frameCounter = 0;
		this.frame = 0;
		this.animations = {};
		this._animation = null
	}

	set animation(key) {
		this._animation = this.animations[key];
		this.frameCounter = 0;
		this.frame = 0;
		this.gameObject.getComponent(SpriteRenderer).sprite = this.animation.frames[this.frame]
	}

	get animation() {
		return this._animation
	}

	addAnimation(key, animation) {
		this.animations[key] = animation;
		if (this.animation === null) {
			this.animation = key;
		}
	}

	removeAnimation(key) {
		delete this.animations[key]
	}

	_update(dt) {
		if (this.gameObject.enabled && this.enabled === true) {
			if (this.animation === null) return;
			this.frameCounter++;
			if (this.frameCounter % this.frameRate === 0) {
				this.frame = (this.frame + 1) % this.animation.frames.length;
				this.gameObject.getComponent(SpriteRenderer).sprite = this.animation.frames[this.frame]
			}
			if (this.update)
				this.update(dt)
		}
	}
}

class Animation {
	constructor(images) {
		this.frames = images;
	}

}
class Camera extends Component {
	/*
		A Camera component is used primarily for abstracting draw calls to the canvas's context.
		The component can be added to any GameObject. In order to have the Camera move (the
		viewport to shift) the viewport must be changed manually or a reference to another
		transform (i.e. the parent GameObject).

		worldToScreenPosition: calculates the screen position of an element (relative to the camera)
		screenToWorldPosition: calculates the real position of an element on the screen (world coordinate)
		draw: flattens the descendants into a single array, sorts them by z position, then calls their
				respective draw function if in the Camera's view.

	*/
	constructor(viewport, scale) {
		super();
		this.viewport = viewport;
		this._scale = scale || new Vector2(1,1);
	}

	get viewport() {
		return this._viewport
	}

	get scale() {
		return this._scale
	}

	set scale(scale) {
		this._scale = scale;
	}

	set viewport(viewport) {
		this._viewport = viewport
	}

	worldToScreenPosition(elementTransform) {
		return Vector2.sub(elementTransform, this.viewport.toVector2())
	}

	screenToWorldPosition(elementTransform) {
		return Vector2.add(elementTransform, this.viewport.toVector2())
	}

	draw(player, elements) {
		Game.instance.player.context.save();
		Game.instance.player.context.scale(this.scale.x, this.scale.y);

		// elements.slice() copies the array
		let sortedElements = elements.slice().sort(function (a, b) {
			let isUI = (a.isUI - b.isUI) * 10000000; // TODO: Clean this dirty fix to UI not showing on top
			return (a.transform.z - b.transform.z) + isUI;
		});

		for (const el of sortedElements) {
			for (const component of el.components) {
				if (component.draw && component instanceof Camera === false) {
					if (el.isUI) {
						// TODO: Consider creating a faster collision-checking function to use for
						// this, since it is being run on every object in the scene
						if (PhysicsEngine.collisionRR(
								el.transform,
								new Rect(0, 0, this.viewport.width, this.viewport.height)
							)) {
							component.draw(player.context, el.transform)
						}
					} else {
						if (PhysicsEngine.collisionRR(el.transform, this.viewport)) {
							let screenPos = this.worldToScreenPosition(el.transform);
							component.draw(player.context, screenPos)
						}
					}
				}
			}
		}
		Game.instance.player.context.restore();
	}

	_update(dt) {
		if (this.enabled === true) {
			this.viewport.x = this.gameObject.transform.x;
			this.viewport.y = this.gameObject.transform.y
		}
	}

	destroy() {
		Camera._mainCamera = null;
		super.destroy()
	}
}


class InputKey {
	constructor(name) {
		this.name = name;
		this.down = false;
		this.up = false;
		this.pressed = false;
		this.wasPressed = false;
		this.wasReleased = false;
	}
}

class Input {
	static handleInput(key, inputType) {
		if (Input.keys[key] === undefined) {
			Input.keys[key] = new InputKey(key)
		}
		if (inputType === Input.KEYDOWN) {
			Input.keys[key].down = true

		} else if (inputType === Input.KEYUP) {
			Input.keys[key].up = true;
			Input.keys[key].down = false;
			Input.keys[key].pressed = false;
			Input.keys[key].wasPressed = false;
			Input.keys[key].wasReleased = true;
		}
	}

	static update(dt) {
		for (const keyName in Input.keys) {
			let key = Input.keys[keyName]
			if (key.down) {
				if (key.pressed) {
					key.pressed = false;
				} else if (!key.wasPressed) {
					key.pressed = true;
					key.wasPressed = true;
				}
			} else if (key.up) {
				if (key.wasReleased) {
					key.wasReleased = false;
				} else {
					key.up = false;
				}
			}
		}
	}

	/** Check if a key was pressed this frame
	 *
	 * @param key
	 * @returns {int} 1 if pressed this frame, 0 otherwise
	 */
	static getKeyPressed(key) {
		return Input.keys[key.toLowerCase()].pressed ? 1 : 0;
	}
	/** Check if a key is down
	 *
	 * @param key
	 * @returns {int} 1 if key is currently held down, 0 otherwise
	 */
	static getKeyDown(key) {
		return Input.keys[key.toLowerCase()].down ? 1 : 0;
	}
	/** Check if a key was released this frame
	 *
	 * @param key
	 * @returns {int} 1 if released this frame, 0 otherwise
	 */
	static getKeyUp(key) {
		return Input.keys[key.toLowerCase()].up ? 1 : 0;
	}

	static createEventListeners(target) {
		// TODO: For some reason Canvas elements cannot be focused... to get around
		// this, I have added "tabindex='1'" on the element. Maybe make this done automatically??
		target.addEventListener('keydown', (e) => {
			Input.handleInput(e.key, Input.KEYDOWN);
		});
		target.addEventListener('keyup', (e) => Input.handleInput(e.key, Input.KEYUP));

		target.addEventListener('mousemove', function (e) {
			Input.mouse.abs.x = e.clientX - (target.offsetLeft ? target.offsetLeft : 0);
			Input.mouse.abs.y = e.clientY - (target.offsetTop ? target.offsetTop : 0);
			if (Game.instance !== null && Scene.current && Scene.current.mainCamera) {
				// since the Camera scale is held separate from the Player scale, we need to account
				// for both of them multiplicatively.
				let actualScale = Vector2.mult(Game.instance.player.scale, Scene.current.mainCamera.scale);
				// the world coordinate of the mouse will be the real position divided by the scale
				Input.mouse.rel = Vector2.div(Input.mouse.abs, actualScale);
				Scene.current.handleInput('move');
			}
		});
		target.addEventListener('mousedown', function (e) {
			Input.mouse.down = true;
			if (Scene.current) {
				Scene.current.handleInput('down');	
			}
		});
		target.addEventListener('mouseup', function (e) {
			Input.mouse.down = false;
			if (Scene.current) {
				Scene.current.handleInput('up');	
			}
		});
		target.addEventListener('dblclick', function (e) {
			if (Scene.current) {
				Scene.current.handleInput('dblDown');	
			}
		});
	}
}

Input.mouse = {
	'abs': {
		'x': 0,
		'y': 0
	},
	'rel': {
		'x': 0,
		'y': 0
	},
	'down': false,
};
/**
 * Mouse event constants used in Scene.handleInput
 */
Input._MOUSEMOVE = 'move';
Input._MOUSEUP = 'up';
Input._MOUSEDOWN = 'down';
Input._MOUSEDBLDOWN = 'dblDown';

Input.inputData = {};
Input.KEYDOWN = 'keydown';
Input.KEYUP = 'keyup';
Input.SPACE = ' ';
Input.keys = {
	'q': new InputKey('q'), 'w': new InputKey('w'), 'e': new InputKey('e'),
	'r': new InputKey('r'), 't': new InputKey('t'), 'y': new InputKey('y'),
	'u': new InputKey('u'), 'i': new InputKey('i'), 'o': new InputKey('o'),
	'p': new InputKey('p'), 'a': new InputKey('a'), 's': new InputKey('s'),
	'd': new InputKey('d'), 'f': new InputKey('f'), 'g': new InputKey('g'),
	'h': new InputKey('h'), 'j': new InputKey('j'), 'k': new InputKey('k'),
	'l': new InputKey('l'), ';': new InputKey(';'), "'": new InputKey("'"),
	'z': new InputKey('z'), 'x': new InputKey('x'), 'c': new InputKey('c'),
	'v': new InputKey('v'), 'b': new InputKey('b'), 'n': new InputKey('n'),
	'm': new InputKey('m'), ',': new InputKey(','), '.': new InputKey('.'),
	'/': new InputKey('/'), '1': new InputKey('1'), '2': new InputKey('2'),
	'3': new InputKey('3'), '4': new InputKey('4'), '5': new InputKey('5'),
	'6': new InputKey('6'), '7': new InputKey('7'), '8': new InputKey('8'),
	'9': new InputKey('9'), '0': new InputKey('0'), '-': new InputKey('-'),
	'=': new InputKey('='), '`': new InputKey('`'),
	'Escape': new InputKey('Escape'),
	'Shift': new InputKey('Shift'),
	[Input.SPACE]: new InputKey(Input.SPACE),
	'Enter': new InputKey('Enter'),
	'Meta': new InputKey('Meta'),
	'Tab': new InputKey('Tab'),
};
class Draggable extends Button {
	constructor() {
		super();
		this._isDragged = false;
		this._originalPosition = new Vector2(0, 0);
		this._distanceFromClickPoint = new Vector2(0, 0);
	}

	get isDragged() {
		return this._isDragged
	}

	get originalPosition() {
		return this._originalPosition
	}

	set originalPosition(newPosition) {
		this._originalPosition = newPosition
	}

	addTo(gameObject) {
		super.addTo(gameObject);
		this._originalPosition = new Vector2(gameObject.transform.x, gameObject.transform.y)
	}

	onDrag(point) {

	}

	_onClick(point) {
		this._distanceFromClickPoint.x = this.gameObject.transform.x - point.x;
		this._distanceFromClickPoint.y = this.gameObject.transform.y - point.y;
		this._isDragged = true;
		this.onClick(point)
	}

	_onDrag(point) {
		this.gameObject.moveTo(new Vector3(point.x + this._distanceFromClickPoint.x, point.y + this._distanceFromClickPoint.y, this.gameObject.transform.z));
		this.onDrag(point)
	}

	_onRelease(point) {
		this._isDragged = false;
		this.onRelease(point)
	}
}
class RigidBody extends Component {
	constructor(isStatic) {
		super();
		this._velocity = new Vector2(0, 0);
		this._acceleration = new Vector2(0, 0);
		this._mass = 1;
		this._friction = 1;
		this._maxSpeed = Infinity;
		this._isStatic = isStatic || false;
	}

	addTo(gameObject) {
		super.addTo(gameObject);
		PhysicsEngine.rigidbodies.push(this)
	}

	remove() {
		super.remove();
		// remove from Input
		PhysicsEngine.rigidbodies.splice(PhysicsEngine.rigidbodies.indexOf(this), 1)
	}

	destroy() {
		PhysicsEngine.rigidbodies.splice(PhysicsEngine.rigidbodies.indexOf(this), 1);
		delete this._velocity;
		delete this._acceleration;
		delete this._friction;
		delete this._maxSpeed;
		super.destroy()
	}

	get velocity() {
		return this._velocity
	}

	get acceleration() {
		return this._acceleration
	}

	get friction() {
		return this._friction
	}

	get maxSpeed() {
		return this._maxSpeed
	}

	get mass() {
		return this._mass
	}

	get isStatic() {
		return this._isStatic;
	}

	set isStatic(isStatic) {
		this._isStatic = isStatic;
	}

	set mass(mass) {
		this._mass = mass;
	}

	set velocity(velocity) {
		this._velocity = velocity
	}

	set acceleration(acceleration) {
		this._acceleration = acceleration
	}

	set friction(friction) {
		this._friction = friction
	}

	set maxSpeed(maxSpeed) {
		this._maxSpeed = maxSpeed
	}

	addForce(force) {
		this.velocity.add(force)
	}

	addAcceleration(accel) {
		this.acceleration.add(accel)
	}

	computeFriction() {
		this.velocity.mult(this.friction)
	}

	_update(dt) {
		if (this.gameObject.enabled && this.enabled) {
			if (!this.isStatic) {
				this.addForce(this.acceleration);
				this.addForce(PhysicsEngine.constantForce);
				if (this.velocity.magnitude > this.maxSpeed) {
					this.velocity.mult(this.maxSpeed / this.velocity.magnitude)
				}
				this.computeFriction();

				this.gameObject.move(this.velocity);
			}
			if (this.update) {
				this.update(dt);
			}
		}
	}
}

class Collision {
	constructor(colliderA, colliderB, normal, penetration) {
		this.colliderA = colliderA;
		this.colliderB = colliderB;
		this.normal = normal;
		this.penetration = penetration;
	}
}

class Collider extends Component {
	constructor(bound, layer) {
		super();
		this._bound = bound;
		this.worldBound = bound;
		this._layer = layer || Collider.LAYER_ALL;
		this.collisions = [];
		this.colliders = [];
	}

	get layer() {
		return this._layer;
	}

	set layer(layer) {
		this._layer = layer;
	}

	addTo(gameObject) {
		super.addTo(gameObject);
		PhysicsEngine.colliders.push(this)
	}

	remove() {
		super.remove();
		// remove from PhysicsEngine
		PhysicsEngine.colliders.splice(PhysicsEngine.colliders.indexOf(this), 1)
	}

	destroy() {
		PhysicsEngine.colliders.splice(PhysicsEngine.colliders.indexOf(this), 1);
		super.destroy()
	}

	get bound() {
		if (this.gameObject !== null) {
			this.worldBound.x = 0;
			this.worldBound.y = 0;
			this.worldBound.x = this._bound.x + this.gameObject.transform.x;
			this.worldBound.y = this._bound.y + this.gameObject.transform.y;
			return this.worldBound;
		}
		return this._bound
	}
	set bound(bound) {
		this._bound = bound
	}

	checkCollisionWith(otherCollider) {
		if (this.layer === otherCollider.layer ||
			this.layer === Collider.LAYER_ALL || otherCollider.layer === Collider.LAYER_ALL) {
			
			let result = PhysicsEngine.checkCollision(this.bound, otherCollider.bound);
			if (result.constructor === Collision) {
				result.colliderA = this;
				result.colliderB = otherCollider;
			}
			return result;
		}
		return new Collision(this, otherCollider, null, null);
	}

	onEnter(collision) {

	}

	onExit(collision) {

	}

	onStay(collision) {

	}

	_onEnter(collision) {
		this.colliders.push(collision.colliderB);
		this.collisions.push(collision);
		this.onEnter(collision);
	}

	_onExit(collision) {
		let colliderIndex = this.colliders.indexOf(collision.colliderB);
		if (colliderIndex >= 0) {
			this.colliders.splice(colliderIndex, 1);
		}

		let collisionIndex = this.collisions.indexOf(collision);
		if (collisionIndex >= 0) {
			this.collisions.splice(collisionIndex, 1);
		}
		this.onExit(collision);
	}

	_onStay(collision) {

	}
}
Collider.LAYER_ALL = 'all'

class RectCollider extends Collider {
	constructor(bound, layer) {
		super(bound, layer);
	}

	addTo(gameObject) {
		super.addTo(gameObject);
		if (this._bound === undefined || this._bound === null) {
			this._bound = this.gameObject.transform.rect;
			this.worldBound = this.gameObject.transform.rect;
		}
	}
}

class CircleCollider extends Collider {
	constructor(bound, layer) {
		super(bound, layer);
	}

	addTo(gameObject) {
		super.addTo(gameObject);
		if (this._bound === undefined || this._bound === null) {
			let c = new Circle(gameObject.transform.x, gameObject.transform.y, gameObject.transform.width);
			c.width = c.r;
			c.height = c.r;
			this._bound = c;
			this.worldBound = c;
		}
	}
}
/**
 * SpriteRenderer component that can be added to a GameObject to hold and draw
 * Sprites.
 *
 * @class      SpriteRenderer (name)
 * @param      {Sprite} sprite { the sprite to be drawn }
 */
class SpriteRenderer extends Component {
	constructor(sprite) {
		super();
		this.sprite = sprite;
		this.borderEnabled = false;
	}

	set sprite(sprite) {
		this._sprite = sprite
	}

	get sprite() {
		return this._sprite
	}

	static drawBorder(context, rect) {
		context.fillStyle = 'black';
		context.beginPath();
		context.rect(rect.x, rect.y, rect.width, rect.height);
		context.stroke();
		context.closePath();
	}

	draw(context, position) {
		if (this.gameObject.enabled && this.enabled && this.sprite) {
			let t = this.gameObject.transform;
			context.save();
			if (t.rotation) {
				context.translate(position.x + (t.width / 2), position.y + (t.height / 2));
				context.rotate(t.rotation);
				context.translate(-(position.x + (t.width / 2)), -(position.y + (t.height / 2)));
			}
			if (t.scale.x !== 1 || t.scale.y !== 1) {
				context.scale(t.scale.x, t.scale.y);
			}
			let bounds = new Rect(position.x, position.y, t.width, t.height);
			this.sprite.draw(context, bounds);
			if (this.borderEnabled === true) {
				SpriteRenderer.drawBorder(context, bounds);
			}
			context.restore() // reset the transform
		}
	}
}

/**
 * Abstract class for a loadable Resource. The loaded method needs to be overridden
 * with a method that returns whether or not the resource has been loaded. For DOM
 * Image objects, this is done by returning the Image.complete property.
 * 
 * If the resource does not load properly _onError should be called.
 * onError and onLoad can be overridden, but should use super.onLoad/onError to
 * ensure that errors are displayed.
 *
 * @class      Resource (name)
 */
class Resource {
	constructor() {}
	loaded() {
		return false;
	}
	failed() {
		return false;
	}
	onLoad() {}
	onError(err){
		console.error("Resource failed to load", err);
	}
}

class ImageResource extends Resource {
	constructor(path) {
		super();
		this.image = new Image();
		this.image.src = path;
	}
	loaded() {
		return this.image.complete && this.image.width !== 0;
	}
	failed() {
		return this.image.complete && this.image.width === 0 && this.image.height === 0;
	}
}

class Loader {
	constructor() {
		this.numLoaded = 0;
		this.numFailed = 0;
		this.resources = {};
	}

	add(key, resource) {
		if (resource instanceof Resource === false) {
			console.error("Loader only accepts objects that extend the Resource class");
		} else {
			this.resources[key] = resource;
		}
	}

	get finished() {
		this.numLoaded = 0;
		this.numFailed = 0;
		for (let resource in this.resources) {
			if (this.resources[resource].loaded()) this.numLoaded++;
			if (this.resources[resource].failed()) this.numFailed++;
		}
		return this.numLoaded >= this.resources.length;
	}

	waitUntilLoaded(callback, interval, timeoutLength) {
		let t = 0;
		let loader = this;
		let loadInterval = setInterval(function(){
			t += interval;
			if (loader.finished) {
				clearInterval(loadInterval);
				callback(true);
			} else if (t >= timeoutLength || 20000) {
				clearInterval(loadInterval);
				callback(false);
			}
		}, interval || 100);
	}
}

class Sprite {
	constructor(imageOrColor, cropRect) {
		if (imageOrColor instanceof ImageResource) {
			this.image = imageOrColor.image;
			if (cropRect === null || cropRect === undefined) {
				this.cropRect = new Rect(0, 0, this.image.width, this.image.height);
			} else {
				this.cropRect = cropRect;
			}

			this.draw = function (context, transform) {
				if (this.cropRect.width <= 0 || this.cropRect.height <= 0) {
					this.cropRect = new Rect(0, 0, this.image.width, this.image.height);
				}
				context.drawImage(this.image,
					this.cropRect.x, this.cropRect.y, this.cropRect.width, this.cropRect.height,
					transform.x, transform.y, transform.width, transform.height);
			}
		} else if (imageOrColor instanceof Color) {
			this.color = imageOrColor;
			this.draw = function (context, transform) {
				context.fillStyle = this.color.toString();
				context.fillRect(transform.x, transform.y, transform.width, transform.height);
			}
		}
	}

	set cropRect(cropRect) {
		if (cropRect.constructor !== Rect)
			console.error('SpriteRenderer cropRect property set to object of type other than Rect');
		this._cropRect = cropRect
	}

	get cropRect() {
		return this._cropRect
	}

	draw(context, position) {}

	static setSprite(key, sprite) {
		if (key.constructor !== String) {
			console.error("Attempted to store a Sprite with an invalid key... Must be a String");
		} else if (sprite instanceof Sprite === false) {
			console.error("Sprite attempted to be stored was not of the right type... Must be a Sprite object")
		}
		Sprite._sprites[key] = sprite;
	}

	static getSprite(key) {
		if (key.constructor !== String) {
			console.error("Attempted to retrieve a Sprite with an invalid key... Must be a String");
		}
		return Sprite._sprites[key];
	}
}
Sprite._sprites = [];

class CircleSprite extends Sprite {
	constructor(color) {
		super(color);
		this.draw = function (context, transform) {
			context.fillStyle = this.color.toString();
			context.beginPath();
			context.arc(transform.x, transform.y, transform.width, 0, 2 * Math.PI);
			context.fill()
		}
	}
}

class TextRenderer extends Component {
	constructor(text, font) {
		super();
		this._lines = [];
		this._splitLines = [];
		this.noStyleText = "";
		this.text = text || "";
		this.font = font || new Font("Arial", 16, Color.BLACK, 'left', 'bottom');
	}

	get text() {
		return this._text
	}

	get font() {
		return this._font
	}

	set text(text) {
		this._lines = [];
		this._splitLines = [];
		this.noStyleText = "";
		this._text = text.toString();

		let openIndex = this._text.indexOf("{");
		if (openIndex > 0) {
			this._splitLines.push(["", this._text.substring(0, openIndex).split("\n")]);
			this.noStyleText += this._text.substring(0, openIndex);
		} else {
			this._splitLines.push(["", this._text.split("\n")]);
			this.noStyleText += this._text;
		}

		while (openIndex >= 0) {
			let closeIndex = this._text.indexOf("}", openIndex+1);

			let nextOpenIndex = this._text.indexOf("{", openIndex+1);
			this._splitLines.push([
				this._text.substring(openIndex+1, closeIndex),
				this._text.substring(closeIndex+1, nextOpenIndex >= 0 ? nextOpenIndex : this._text.length).split("\n")
			]);
			this.noStyleText += this._text.substring(closeIndex+1, nextOpenIndex >= 0 ? nextOpenIndex : this._text.length);
			openIndex = nextOpenIndex;
		}
	}

	set font(font) {
		this._font = font
	}

	draw(context, transform) {
		if (this.gameObject.enabled && this.enabled) {
			context.font = this.font;
			let splitText = this.noStyleText.split('\n');
			let widthInLine = 0;
			let lineIndex = 0;

			let vAlign = 0;

			if (this.font.vertAlignment === 'center') 		// set vAlign to the center of the gameObject
				vAlign = (this.gameObject.transform.height / 2) + (this.font.size / 2);
			else if (this.font.vertAlignment === 'bottom') 	// set vAlign to the bottom of gameObject
				vAlign = this.gameObject.transform.height;

			for (const line of this._splitLines) {
				if (line[0].length > 2) {
					let arg = eval(line[0]);
					if (arg instanceof Color)
						context.fillStyle = arg;
					else if (arg === Font.BOLD || arg === Font.ITALIC || arg === Font.NORMAL)
						context.font = arg + ' ' + this.font;
					else if (arg === Font.RESET) {
						context.font = this.font;
						context.fillStyle = this.font.color;
					}
				} else {
					context.fillStyle = this.font.color;
				}

				for (const index2 in line[1]) {
					if (index2 > 0) {
						widthInLine = 0;
						lineIndex++;
					}
					let hAlign = 0;

					if (this.font.alignment === 'center') {

						hAlign -= ctx.measureText(splitText[lineIndex]).width / 2;
						hAlign += this.gameObject.transform.width / 2;

					} else if (this.font.alignment === 'right') {

						hAlign -= ctx.measureText(splitText[lineIndex]).width;
						hAlign += this.gameObject.transform.width;
					}

					context.fillText(line[1][index2], transform.x + widthInLine + hAlign, transform.y + vAlign + (lineIndex * this.font.size));
					if (index2 === '0') {
						widthInLine += context.measureText(line[1][index2]).width;
					}
				}
			}
		}
	}
}

class Font {
	constructor(name, size, color, alignment, vertAlignment) {
		this._name = name || 'Arial';
		this._size = size || 12;
		this._color = color || Color.BLACK;
		this._alignment = alignment || 'left';
		this._vertAlignment = vertAlignment || 'top';
	}

	get name() {
		return this._name
	}

	get size() {
		return this._size
	}

	get color() {
		return this._color
	}

	get alignment() {
		return this._alignment
	}

	get vertAlignment() {
		return this._vertAlignment
	}

	set name(name) {
		this._name = name
	}

	set size(size) {
		this._size = size
	}

	set color(color) {
		this._color = color
	}

	set alignment(alignment) {
		this._alignment = alignment
	}

	set vertAlignment(vertAlignment) {
		this._vertAlignment = vertAlignment
	}

	toString() {
		return this.size + "px " + this.name
	}
}
Font.BOLD = 'bold';
Font.ITALIC = 'italic';
Font.NORMAL = 'normal';
Font.RESET = 'reset';

class PhysicsCollider extends Collider {
	constructor(bound, layer, bounciness, slickness) {
		super(bound, layer);
		this.bounciness = bounciness || 0;
		this.slickness = slickness || 1;
	}

	_onEnter(collision) {
		if (collision.colliderB instanceof PhysicsCollider) {
			PhysicsEngine.resolveImpulse(collision);
			PhysicsEngine.resolvePosition(collision);
		}
		super._onEnter(collision);
	}

	_onExit(collision) {
		super._onExit(collision);
	}

	_onStay(collision) {
		PhysicsEngine.resolveImpulse(collision);
		PhysicsEngine.resolvePosition(collision);
		super._onStay(collision);
	}

	/*
	checkCollisionWith(otherCollider) {
		if (this.layer !== otherCollider.layer) return false;
		if (otherCollider instanceof RectCollider || otherCollider instanceof PhysicsRectCollider) {
			return this.checkRect(otherCollider);
		} else if (otherCollider instanceof CircleCollider || otherCollider instanceof PhysicsCircleCollider) {
			return this.checkCircle(otherCollider);
		}
	}
	*/

}

class PhysicsEngine {
	static update(dt) {
		for (const rigidbody of PhysicsEngine.rigidbodies) {
			if (rigidbody.enabled === true) {
				rigidbody._update(dt)
			}
		}

		for (const coll1 of PhysicsEngine.colliders) {
			if (coll1.enabled === false || coll1.gameObject.enabled === false) continue;
			for (const coll2 of PhysicsEngine.colliders) {
				if (coll1.enabled === false || coll1.gameObject.enabled === false) break;

				if (coll2.enabled && coll2.gameObject.enabled && coll1 !== coll2) {
					let collision = coll1.checkCollisionWith(coll2);
					if (collision) {
						// collision exists
						if (coll1.colliders.indexOf(coll2) >= 0) {
							// if a collision was there last frame
							coll1._onStay(collision);
						} else {
							// no collision last frame, this is a new one
							coll1._onEnter(collision);
						}
					} else {
						// no collision
						if (coll1.colliders.indexOf(coll2) >= 0) {
							// if a collision was there last frame
							coll1._onExit(new Collision(coll1, coll2));
						}
					}
				}
			}
		}
	}

	static setConstantForce(vector2) {
		PhysicsEngine.constantForce = vector2;
	}

	static resolveImpulse(collision) {
		let a = collision.colliderA.gameObject;
		let b = collision.colliderB.gameObject;
		let aRb = a.getComponent(RigidBody);
		let bRb = b.getComponent(RigidBody);

		if (a.getComponent(RigidBody).isStatic && 
			b.getComponent(RigidBody).isStatic) {
			// just exit if both are static
			return
		}

		let massA = aRb.mass;
		let massB = bRb.mass;
		let velA = (aRb.velocity).copy();
		let velB = (bRb.velocity).copy();

		// Calculate relative velocity
		let rv = Vector2.sub(velB, velA);
	 
		// Calculate relative velocity in terms of the normal direction
		let normal = collision.normal.normalized;

		let velAlongNormal = Vector2.dot( rv, normal )
	 
		// Do not resolve if velocities are separating
		if(velAlongNormal > 0) return;

		// Calculate restitution
		let e = Math.min(	a.getComponent(PhysicsCollider).bounciness, 
							b.getComponent(PhysicsCollider).bounciness)

		// Calculate impulse scalar
		let j = -(1 + e) * velAlongNormal
		j /= (1 / massA) + (1 / massB)

		let massSum = massA + massB;
		let ratio = massA / massSum

		// Apply impulse
		let impulse = Vector2.mult(normal, j);

		let aSlickness = a.getComponent(PhysicsCollider).slickness;
		let bSlickness = b.getComponent(PhysicsCollider).slickness;
		let compositeSlickness = aSlickness * bSlickness;

		if (!aRb.isStatic) {
			let bounceVel = Vector2.mult(impulse, (-1 * ratio) / massA);
			let frictionVector = Vector2.mult(normal, compositeSlickness);
			aRb.addForce(Vector2.mult(frictionVector, -1));
			// TODO: Probably need to multiply velocity by the normal of the normal of the collision * slickness
			aRb.addForce(bounceVel);
		}
		ratio = massB / massSum
		if (!bRb.isStatic) {
			let bounceVel = Vector2.mult(impulse, (-1 * ratio) / massB);
			let frictionVector = Vector2.mult(normal.normal, compositeSlickness);
			bRb.addForce(Vector2.mult(frictionVector, -1));
			//bRb.velocity.mult(aSlickness * bSlickness);
			bRb.addForce(bounceVel);
			
		}
	}

	static resolvePosition(collision) {
		const percent = 1 // usually 20% to 80%
		const slop = 0.05 // usually 0.01 to 0.1
		let penetration = Math.max( collision.penetration - slop, 0 )
		let invMassA = (1 / collision.colliderA.gameObject.getComponent(RigidBody).mass);
		let invMassB = (1 / collision.colliderB.gameObject.getComponent(RigidBody).mass);
		let addedInverseMasses = invMassA + invMassB;
		let correction = (penetration / addedInverseMasses) * percent;
		if (!collision.colliderA.gameObject.getComponent(RigidBody).isStatic) {
			collision.colliderA.gameObject.move(Vector2.mult(-invMassA * correction, collision.normal));
		}
		if (!collision.colliderB.gameObject.getComponent(RigidBody).isStatic) {
			collision.colliderB.gameObject.move(Vector2.mult(invMassB * correction, collision.normal));
		}
	}

	static checkCollision(objA, objB) {
		if (objA.constructor === Rect) {
			if (objB.constructor === Rect)
				return PhysicsEngine.collisionRR(objA, objB);
			if (objB.constructor === Circle)
				return PhysicsEngine.collisionRC(objA, objB);
			if (objB.constructor === Line)
				//return PhysicsEngine.collisionLR(objB, objA);
			if (objB.constructor === Vector2)
				return PhysicsEngine.collisionPR(objB, objA);
		}
		if (objA.constructor === Circle) {
			if (objB.constructor === Rect)
				return PhysicsEngine.collisionRC(objB, objA);
			if (objB.constructor === Circle)
				return PhysicsEngine.collisionCC(objA, objB);
			if (objB.constructor === Line)
				return PhysicsEngine.collisionLC(objB, objA);
			if (objB.constructor === Vector2)
				return PhysicsEngine.collisionPC(objB, objA);
		}
		if (objA.constructor === Line) {
			if (objB.constructor === Rect)
				return PhysicsEngine.collisionLR(objA, objB);
			if (objB.constructor === Circle)
				return PhysicsEngine.collisionLC(objA, objB);
			if (objB.constructor === Line)
				return PhysicsEngine.collisionLL(objA, objB);
			if (objB.constructor === Vector2)
				return PhysicsEngine.collisionPL(objB, objA);
		}
		if (objA.constructor === Vector2) {
			if (objB.constructor === Rect)
				return PhysicsEngine.collisionPR(objA, objB);
			if (objB.constructor === Circle)
				return PhysicsEngine.collisionPC(objA, objB);
			if (objB.constructor === Line)
				return PhysicsEngine.collisionPL(objA, objB);
			if (objB.constructor === Vector2)
				return objA.equals(objB);
		}
		console.error("Objects were not of compatible types");
		return false;
	}

	static collisionRR(rectA, rectB) {
		if (rectA.x + rectA.width >= rectB.x && rectA.x <= rectB.x + rectB.width &&
			rectA.y + rectA.height >= rectB.y && rectA.y <= rectB.y + rectB.height) {

			let overlapX = Math.max(0, Math.min(rectA.right, rectB.right) - Math.max(rectA.x, rectB.x));
			let overlapY = Math.max(0, Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.y, rectB.y));
			let normal = null;
			let penetration = null;
			if (overlapX < overlapY) {
				if (rectB.x - rectA.x < 0) {
					normal = new Vector2( -1, 0 );
				} else {
					normal = new Vector2( 1, 0 );
				}
				penetration = overlapX;
			} else {
				if (rectB.y - rectA.y < 0) {
					normal = new Vector2( 0, -1 );
				} else {
					normal = new Vector2( 0, 1 );
				}
				penetration = overlapY;
			}
			return new Collision(null, null, normal, penetration);
		}
		return false
	}

	static collisionCC(circleA, circleB) {
		let dv = Vector2.sub(circleB, circleA);
		return circleA.r + circleB.r > dv.magnitude;
	}

	static collisionLC(line, circle) {
		let A = line.start;
		let B = line.end;
		let C = circle;
		let R = circle.r;
		// compute the euclidean distance between A and B
		let LAB = Math.sqrt( ((B.x-A.x)*(B.x-A.x))+((B.y-A.y)*(B.y-A.y)) );

		// compute the direction vector D from A to B
		let D = new Vector2((B.x-A.x)/LAB, (B.y-A.y)/LAB)

		// Now the line equation is x = Dx*t + Ax, y = Dy*t + Ay with 0 <= t <= 1.

		// compute the value t of the closest point to the circle center (Cx, Cy)
		let t = D.x*(C.x-A.x) + D.y*(C.y-A.y)    

		// This is the projection of C on the line from A to B.

		// compute the coordinates of the point E on line and closest to C
		let E = new Vector2(t*D.x+A.x, t*D.y+A.y)

		// compute the euclidean distance from E to C
		let LEC = Math.sqrt( (E.x-C.x)*(E.x-C.x)+(E.y-C.y)*(E.y-C.y) )

		// test if the line intersects the circle
		if( LEC < R )
		{
		    // compute distance from t to circle intersection point
		    let dt = Math.sqrt( (R*R) - (LEC*LEC))

		    // compute first intersection point
		    let F = new Vector2((t-dt)*D.x + A.x, (t-dt)*D.y + A.y)

		    if (F.x >= A.x && F.x <= B.x && F.y >= A.y && F.y <= B.y) {
		    	//return F;
		    	return new Collision(null, null, line.normal, LEC);
		    }

		    // compute second intersection point
		    let G = new Vector2((t+dt)*D.x + A.x, (t+dt)*D.y + A.y)
		    if (G.x >= A.x && G.x <= B.x && G.y >= A.y && G.y <= B.y) {
		    	//return A;
		    	return new Collision(null, null, line.normal, LEC);
		    }
		}

		// else test if the line is tangent to circle
		else if( LEC === R ) {
			if (E.x >= A.x && E.x <= B.x && E.y >= A.y && E.y <= B.y) {
		    	//return E;
		    	return new Collision(null, null, line.normal, LEC);
		    }
		}
		    // tangent point to circle is E
		else
			return false;
		    // line doesn't touch circle
	}
	static collisionLCbool(line, circle) {
		// modified from https://stackoverflow.com/questions/1073336/circle-line-segment-collision-detection-algorithm
		// checks collision between line and circle, returns boolean
		let A = line.start;
		let B = line.end;
		let C = circle;
		let R = circle.r;

		let d = Vector2.sub(B, A);
		let f = Vector2.sub(A, C);

		let a = d.dot( d );
		let b = 2 * f.dot( d );
		let c = f.dot( f ) - (R * R);

		let discriminant = (b * b) - (4 * a * c);
		if ( discriminant < 0 ) {
			// no intersection
		} else {
			// ray didn't totally miss sphere,
			// so there is a solution to
			// the equation.

			discriminant = Math.sqrt( discriminant );

			// either solution may be on or off the ray so need to test both
			// t1 is always the smaller value, because BOTH discriminant and
			// a are nonnegative.
			let t1 = (-b - discriminant) / (2 * a);
			let t2 = (-b + discriminant) / (2 * a);

			// 3x HIT cases:
			//          -o->             --|-->  |            |  --|->
			// Impale(t1 hit,t2 hit), Poke(t1 hit,t2>1), ExitWound(t1<0, t2 hit), 

			// 3x MISS cases:
			//       ->  o                     o ->              | -> |
			// FallShort (t1>1,t2>1), Past (t1<0,t2<0), CompletelyInside(t1<0, t2>1)

			if( t1 >= 0 && t1 <= 1 )
			{
				// t1 is the intersection, and it's closer than t2
				// (since t1 uses -b - discriminant)
				// Impale, Poke
				return true ;
			}

			// here t1 didn't intersect so we are either started
			// inside the sphere or completely past it
			if( t2 >= 0 && t2 <= 1 )
			{
				// ExitWound
				return true ;
			}

			// no intersection: FallShort, Past, CompletelyInside
			return false ;
		}
	}

	static collisionLL(lineA, lineB) {
		let dvA = Vector2.sub(lineA.end, lineA.start);
		let dvB = Vector2.sub(lineB.end, lineB.start);
		let s, t;
		s = (-dvA.y * (lineA.start.x - lineB.start.x) + dvA.x * (lineA.start.y - lineB.start.y)) / (-dvB.x * dvA.y + dvA.x * dvB.y);
		t = (dvB.x * (lineA.start.y - lineB.start.y) - dvB.y * (lineA.start.x - lineB.start.x)) / (-dvB.x * dvA.y + dvA.x * dvB.y);
		if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
			// collision detected
			let intX = lineA.start.x + (t * dvA.x);
			let intY = lineA.start.y + (t * dvA.y);
			return Vector2.add(lineA.start, Vector2.mult(dvA, t))
		}
		return null
		// No collision
	}

	static collisionRC(rect, circle) {
		// check collision between rect and circle
		//if (PhysicsEngine.collisionPR(circle, rect)) return true;
		let shallowestCollision = null;
		for (const edge in rect.edges) {
			let collision = PhysicsEngine.collisionLC(rect.edges[edge], circle);
			if (collision) {
				if (shallowestCollision === null) {
					shallowestCollision = collision;
				} else if (shallowestCollision !== null && 
					collision.penetration < shallowestCollision.penetration) {
					shallowestCollision = collision;
				}
			}
		}
		if (shallowestCollision !== null) {
			return shallowestCollision;
		}
		return false;
	}

	static collisionPR(point, rect) {
		return 	point.x >= rect.x && point.x <= rect.x + rect.width &&
				point.y >= rect.y && point.y <= rect.y + rect.height;
	}

	static collisionPC(point, circle) {
		return 	(point.x - circle.x) * (point.x - circle.x) + 
				(point.y - circle.y) * (point.y - circle.y) < circle.r * circle.r;
	}

	static collisionPL(point, line) {
		let ERROR_THRESHOLD = 0.1;
		let dxc = point.x - line.start.x;
		let dyc = point.y - line.start.y;

		let dxl = line.end.x - line.start.x;
		let dyl = line.end.y - line.start.y;

		let cross = dxc * dyl - dyc * dxl;

		if (Math.abs(cross) > ERROR_THRESHOLD) {
			return false;
		}

		if (Math.abs(dxl) >= Math.abs(dyl)) {
			return dxl > 0 ? 
				line.start.x <= point.x && point.x <= line.end.x :
				line.end.x <= point.x && point.x <= line.start.x;
		} else {
			return dyl > 0 ? 
				line.start.y <= point.y && point.y <= line.end.y :
				line.end.y <= point.y && point.y <= line.start.y;
		}
	}
}

PhysicsEngine.rigidbodies = [];
PhysicsEngine.colliders = [];
PhysicsEngine.constantForce = Vector2.zero;

class RaycastPoint {
	constructor(start, collider, points) {
		this.start = start;
		this.collider = collider;
		this.points = points
	}

	get first() {
		if (this.points.length === 0) return null;
		let first = this.points[0];
		let dist = Vector2.sub(this.start, this.points[0]).magnitude;
		for (let i = 0; i < this.points.length(); i++) {
			let tempDist = Vector2.sub(this.start, this.points[i]).magnitude;
			if (tempDist < dist) {
				first = this.points[i];
				dist = tempDist
			}
		}
		return first
	}
}

class Raycast {
	constructor(rayStart, rayDirection, layer = 65535, rayLength = 999999) {
		this.rayStart = rayStart;
		this.rayDirection = rayDirection;
		this._mask = layer;
		this.rayLength = rayLength
	}

	get rayStart() {
		return this._rayStart
	}

	get rayDirection() {
		return this._rayDirection
	}

	get rayEnd() {
		return Vector2.add(this.rayStart, Vector2.mult(this.rayDirection, this.rayLength))
	}

	get mask () {
		return this._mask;
	}

	get rayLength() {
		return this._rayLength
	}

	get rayToLine() {
		return new Line(this.rayStart, this.rayEnd)
	}

	set rayStart(rayStart) {
		this._rayStart = rayStart
	}

	set rayDirection(rayDirection) {
		this._rayDirection = rayDirection
	}

	set mask(mask) {
		this._mask = mask;
	}

	set rayLength(rayLength) {
		this._rayLength = rayLength
	}

	get contacts() {
		let rayCastPoints = [];
		for (const coll of PhysicsEngine.colliders) {
			if ((this.mask & coll.layer) === 0) continue; // use the bitmask to filter
			let points = [];
			if (coll.bound instanceof Rect) {
				for (const edge of coll.bound.edges) {
					let intersect = PhysicsEngine.collisionLL(this.rayToLine, edge);
					if (intersect)
						points.push(intersect)
				}
			} else if (coll.bound instanceof Circle) {
				let intersect = PhysicsEngine.collisionLC(this.rayToLine, edge);
				if (intersect)
					points.push(intersect)
			}
			
			if (points.length > 0)
				rayCastPoints.push(new RaycastPoint(this.rayStart, coll, points))
		}
		if (rayCastPoints.length > 0) {
			rayCastPoints.sort((a, b) => {
				return Vector2.sub(this.rayStart, a.first).magnitudeSquared
					- Vector2.sub(this.rayStart, b.first).magnitudeSquared
			});
			return rayCastPoints
		}
		return null
	}

}
class Parallax extends Component {
	constructor(cameraToBaseMovementFrom, movementMultiplier) {
		super();
		this.camera = cameraToBaseMovementFrom;
		this.movementMultiplier = movementMultiplier;
		this.cameraLastPosition = this.camera.viewport.toVector2()
	}

	resolvePosition(difference) {
		this.gameObject.move(Vector2.mult(difference, this.movementMultiplier))
	}

	_update(dt) {
		if (this.enabled === true) {
			let difference = Vector2.sub(this.camera.viewport, this.cameraLastPosition);
			this.resolvePosition(difference);
			this.cameraLastPosition = this.camera.viewport.toVector2();
			if (this.update)
				this.update(dt)
		}
	}
}

class Util {
	static randRange(start, stop) {
		return Math.floor(Math.random() * (stop - start) + start);
	}
	static range(start, stop) {
		let arr = [];
		for (let i=start; i<stop; i++) {
			arr.push(i);
		}
		return arr;
	}

	static rad2Deg(radians) {
		return radians * (180 / Math.PI);
	}
	static deg2Rad(degrees) {
		return degrees * (Math.PI / 180);
	}
	static arrSample(array, n) {
		function randomGenerator(x) {
		    var range = new Array(x),
		        pointer = x;
		    return function getRandom() {
		        pointer = (pointer-1+x) % x;
		        var random = Math.floor(Math.random() * pointer);
		        var num = (random in range) ? range[random] : random;
		        range[random] = (pointer in range) ? range[pointer] : pointer;
		        return range[pointer] = num;
		    };
		};
		let generator = randomGenerator(array.length);
		let result = [];
		for (let i=0; i<n; i++) {
			result.push(array[generator()]);
		}
		return result;
	}
}


class Game {
	constructor(canvasDOM, inputTarget) {
		if (Game.instance !== null) {
			console.error("Only one instance of Game is allowed");
			return;
		}
		Game.instance = this;
		this._lastTime = Date.now();
		this._averageFPS = 0;
		this._targetFPS = Infinity; // not actually infinity... uses monitor's refresh rate
									// because of how requestAnimationFrame works
		this._physicsUpdateDelay = 0;
		this._dt = 0.0;
		this._totalDeltatime = 0.0;
		this._counterUpdateRate = 180;
		this.ticks = 0;
		this._fpsArray = [];

		this.paused = false;
		this.running = false;

		this.player = new Player(canvasDOM);
		this.inputTarget = inputTarget || canvasDOM;
		Input.createEventListeners(this.inputTarget);
	}
	get dt() {
		return this._dt;
	}
	get physicsUpdateDelay() {
		return this._physicsUpdateDelay;
	}
	set physicsUpdateDelay(delay) {
		if (delay.constructor === Number && delay >= 0) {
			this._physicsUpdateDelay = delay;
		}
	}
	get targetFPS() {
		return this._targetFPS;
	}
	set targetFPS(targetFPS) {
		if (targetFPS > 0) {
			this._targetFPS = targetFPS;
		}
	}

	start() {
		if (!this.running) {
			this.running = true;
			this.paused = false;
			this._update();
		} else if (this.paused) {
			this.paused = false;
		}
	}

	_update() {
		if (this.running) {
			let thisTime = Date.now();
			this._dt = thisTime - this._lastTime;

			this.ticks++;
			if (this.ticks === Number.MAX_VALUE-1) {
				this.ticks = 0;
			}

			this._fpsArray.push(Math.round(1000.0 / this._dt));
			if (this._fpsArray.length >= this._counterUpdateRate) {
				this._averageFPS = 0;
				this._fpsArray.forEach((fps)=>{this._averageFPS+=fps});
				this._averageFPS /= this._fpsArray.length;
				this._averageFPS = Math.round(this._averageFPS);
				this._fpsArray.splice(0, 1);
			}

			Input.update(this._dt / 1000);
			if (!this.paused) {
				Scene.clear(this.player);
				Scene.update(this._dt / 1000);
				if (this._physicsUpdateDelay === 0 || this.ticks % this._physicsUpdateDelay === 0) {
					// update PhysicsEngine every X frames
					PhysicsEngine.update(this._dt / 1000);
				}
				Scene.draw(this.player);
			}
			
			let update = ()=>{this._update()};
			if (this._targetFPS === Infinity) {
				this._lastTime = thisTime;
				requestAnimationFrame(()=>{update()});
			} else {
				let dt = Date.now() - thisTime;
				let targetedDt = Math.round(1000 / this._targetFPS);
				this._lastTime = thisTime;
				setTimeout(()=>{update()}, targetedDt - dt);
			}
		}
	}

	get averageFPS() {
		return this._averageFPS;
	}
	get FPS() {
		return Math.round(1000.0 / this._dt);
	}
}
Game.instance = null;

class Player {
	constructor(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.canvas.style.position = "absolute";
		this.originalSize = new Vector2(canvas.width, canvas.height);
		this.aspectRatio = 2 / 3;
		this._scale = new Vector2(1, 1);
		canvas.style.width = canvas.width+"px";
		canvas.style.height = canvas.height+"px";
		this.resizeMode = Player.RESIZE_SCALE;
		this.autoResize = true;
		window.addEventListener("resize", (e)=>{
			this.onResize(e);
		});
	}

	onResize(e) {
		if (this.autoResize) {
			if (this.resizeMode === Player.RESIZE_FILL) {
				this.resize();
			} else if (this.resizeMode === Player.RESIZE_SCALE) {
				this.rescale();
			} else if (this.resizeMode === Player.RESIZE_NONE) {
				// do nothing
			}
		}
	}

	get scale() {
		return this._scale;
	}
	set scale(scale) {
		if (scale.x != 0 && scale.y != 0) {
			this.context.scale(scale.x / this._scale.x, scale.y / this._scale.y);
			this._scale = new Vector2(scale.x / this._scale.x, scale.y / this._scale.y);
		}
	}

	scaleMult(scale) {
		if (scale.constructor !== Vector2) {
			console.error("Player.scaleMult parameter 'scale' must be of type Vector2.");
		}
		if (scale.x != 0 && scale.y != 0) {
			this.context.scale(scale.x, scale.y);
			this._scale.mult(scale);
		}
	}

	get size() {
		return new Vector2(	this.canvas.style.width.split('px')[0], 
							this.canvas.style.height.split('px')[0]);
	}
	set size(size) {
		this.canvas.style.width = size.x+"px";
		this.canvas.style.height = size.y+"px";
	}

	isMobile() {
		let mobileChecks = {
		    Android: function() {
		        return navigator.userAgent.match(/Android/i);
		    },
		    BlackBerry: function() {
		        return navigator.userAgent.match(/BlackBerry/i);
		    },
		    iOS: function() {
		        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		    },
		    Opera: function() {
		        return navigator.userAgent.match(/Opera Mini/i);
		    },
		    Windows: function() {
		        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
		    },
		    any: function() {
		        return (mobileChecks.Android() || mobileChecks.BlackBerry() || mobileChecks.iOS() || mobileChecks.Opera() || mobileChecks.Windows());
		    }
		}
		return mobileChecks.any();
	}

	/**
	 * Stretch the canvas to fill the page
	 */
	resize() {
		this.canvas.style.left = "0px";
		this.canvas.style.top = "0px";
		this.size = new Vector2(window.innerWidth, window.innerHeight);
		this._scale = Vector2.div(this.size, this.originalSize);
	}

	/**
	 * Scale the canvas based on the Player.aspectRatio
	 */
	rescale() {
		if (window.innerWidth * this.aspectRatio <= window.innerHeight) {
			// if scaling up does not cause the height to be bigger than the page
			this.size = new Vector2(window.innerWidth, window.innerWidth * this.aspectRatio);
			// width is stretched to window width
			// height is scaled from width according to aspect ratio
			this.canvas.style.left = "0px";
		} else {
			// if scaling up causes height to be bigger than the page shows
			this.size = new Vector2(window.innerHeight / this.aspectRatio, window.innerHeight);
			// scale based on height instead of width
			this.canvas.style.left = (window.innerWidth - this.size.x) / 2+"px";
			// shift the canvas to the middle of the screen
		}
	    this._scale = Vector2.div(this.size, this.originalSize);
	    // store the current scale
	}
}
Player.RESIZE_FILL = 'fill';
Player.RESIZE_SCALE = 'scale';
Player.RESIZE_NONE = 'none';


if (typeof module !== 'undefined') {
	module.exports = {
		'Color': Color,
		'Vector2': Vector2,
		'Vector3': Vector3,
		'Line': Line,
		'Rect': Rect,
		'Circle': Circle,
		'Transform': Transform,
		'Container': Container,
		'GameObject': GameObject,
		'Component': Component,
		'PhysicsEngine': PhysicsEngine,
		'Scene': Scene,
		'InputComponent': InputComponent,
		'Button': Button,
		'Animator': Animator,
		'Animation': Animation,
		'Camera': Camera,
		'InputKey': InputKey,
		'Input': Input,
		'Draggable': Draggable,
		'RigidBody': RigidBody,
		'Collider': Collider,
		'RectCollider': RectCollider,
		'CircleCollider': CircleCollider,
		'SpriteRenderer': SpriteRenderer,
		'resource': resource,
		'Loader': Loader,
		'Sprite': Sprite,
		'CircleSprite': CircleSprite,
		'TextRenderer': TextRenderer,
		'Font': Font,
		'PhysicsCollider': PhysicsCollider,
		'PhysicsEngine': PhysicsEngine,
		'RaycastPoint': RaycastPoint,
		'Raycast': Raycast,
		'Parallax': Parallax,
		'Util': Util,
		'Game': Game,
		'Player': Player,
	}
}