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
	constructor({r=0, g=0, b=0, a=1}) {
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
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
	}

	/**
	 * Returns a copy of the Color.
	 *
	 * @return     {Color}  { The copy of the Color object }
	 */
	copy() {
		return new Color(this);
	}

	/**
	 * Returns a new Color object with (0, 0, 0, 1)
	 * @returns {Color}
	 */
	static get BLACK() {
		return new Color({'r':0,'g':0,'b':0,'a':1});
	}

	/**
	 * Returns a new Color object with (255, 255, 255, 1)
	 * @returns {Color}
	 */
	static get WHITE() {
		return new Color({'r':255,'g':255,'b':255,'a':1});
	}

	/**
	 * Returns a new Color object with (255, 0, 0, 1)
	 * @returns {Color}
	 */
	static get RED() {
		return new Color({'r':255,'g':0,'b':0,'a':1});
	}

	/**
	 * Returns a new Color object with (0, 255, 0, 1)
	 * @returns {Color}
	 */
	static get GREEN() {
		return new Color({'r':0,'g':255,'b':0,'a':1});
	}

	/**
	 * Returns a new Color object with (0, 0, 255, 1)
	 * @returns {Color}
	 */
	static get BLUE() {
		return new Color({'r':0,'g':0,'b':255,'a':1});
	}

	/**
	 * Returns a new Color object with (180, 180, 180, 1)
	 * @returns {Color}
	 */
	static get GRAY() {
		return new Color({'r':180,'g':180,'b':180,'a':1});
	}

	/**
	 * Returns a new Color object with (255, 0, 255, 1)
	 * @returns {Color}
	 */
	static get PURPLE() {
		return new Color({'r':255,'g':0,'b':255,'a':1});
	}

	/**
	 * Returns a new Color object with (255, 255, 0, 1)
	 * @returns {Color}
	 */
	static get YELLOW() {
		return new Color({'r':255,'g':255,'b':0,'a':1});
	}

	/**
	 * Returns a new Color object with (255, 165, 0, 1)
	 * @returns {Color}
	 */
	static get ORANGE() {
		return new Color({'r':255,'g':165,'b':0,'a':1});
	}

	/**
	 * Returns a new Color object with (0, 255, 255, 1)
	 * @returns {Color}
	 */
	static get TEAL() {
		return new Color({'r':0,'g':255,'b':255,'a':1});
	}

	/**
	 * Returns a new Color object with (139, 69, 19, 1)
	 * @returns {Color}
	 */
	static get BROWN() {
		return new Color({'r':139,'g':69,'b':19,'a':1});
	}

	/**
	 * Returns a new Color object with random RGB values
	 * @returns {Color}
	 */
	static get random() {
		let r = Random.range(0, 256);
		let g = Random.range(0, 256);
		let b = Random.range(0, 256);
		let a = 1;
		return new Color({r,g,b,a});
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
	constructor({x=0, y=0}) {
		this.x = x;
		this.y = y;
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
		return new Vector2({'x':-this.y, 'y':this.x});
	}

	/**
	 * Get the vector with rounded components
	 * @returns {Vector2}
	 */
	get rounded() {
		return new Vector2({'x':Math.round(this.x), 'y':Math.round(this.y)});
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
	 * Divides this Vector2 by a scalar value or a Vector2 and returns it.
	 * If k is a Vector2, the X components are divided and the Y components
	 * are divided (does not do dot product math).
	 * @param k
	 * @returns {Vector2}
	 */
	div(k) {
		if (k instanceof Vector2) {
			this.x /= k.x;
			this.y /= k.y
		} else if (!isNaN(k)) {
			this.x /= k;
			this.y /= k
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
		let result = Vector2.zero;
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
		let x = a.x - b.x;
		let y = a.y - b.y;
		return new Vector2({x, y});
	}

	/**
	 * Adds either two Vector2s or a Vector2 and a scalar value and returns the result
	 * @param a {Vector2 or Number}
	 * @param b {Vector2 or Number}
	 * @returns {Vector2}
	 */
	static add(a, b) {
		let x = y = 0;
		if (a instanceof Vector2) {
			if (b instanceof Vector2) {
				x = a.x + b.x;
				y = a.y + b.y;
			}
			x = a.x + b;
			y = a.y + b;
		}
		if (b instanceof Vector2) {
			x = b.x + a
			y = b.y + a;
		}
		console.error("Attempted to call Vector2.add without a Vector2 as a parameter");
		return new Vector2({x, y});
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
		let x = 0;
		let y = 0;
		if (a instanceof Vector2) {
			if (b instanceof Vector2) {
				x = a.x * b.x;
				y = a.y * b.y;
			} else if (!isNaN(b)) {
				x = a.x * b;
				y = a.y * b;
			} else {
				console.error("The second argument of Vector2.mult should be a Vector or a Number", b);
			}
		} else {
			console.error("The first argument of Vector2.mult should be a Vector2", a);
		}

		return new Vector2({x, y});
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
		let x = 0;
		let y = 0;
		if (b instanceof Vector2) {
			x = a.x / b.x;
			y = a.y / b.y;
		} else if (isNan(b) === false) {
			x = a.x / b;
			y = a.y / b;
		}
		return new Vector2({x, y});
	}

	/**
	 * Returns a new Vector2 zeroed out. Shorthand for 'new Vector2({'x':0, 'y':0})'
	 * @returns {Vector2}
	 */
	static get zero() {return new Vector2({'x':0, 'y':0})}
	static get right() {return new Vector2({'x':1, 'y':0})}
	static get left() {return new Vector2({'x':-1, 'y':0})}
	static get up() {return new Vector2({'x':0, 'y':-1})}
	static get down() {return new Vector2({'x':0, 'y':1})}

	/**
	 * Returns a copy of this Vector2
	 * @returns {Vector2}
	 */
	copy() {
		return new Vector2({'x':this.x, 'y':this.y});
	}

	/**
	 * Copies this Vector2 to a Vector3, and returns it
	 * @returns {Vector3}
	 */
	toVector3() {
		return new Vector3({'x':this.x, 'y':this.y});
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
	 * @param x {number or Vector2}
	 * @param y {number}
	 * @param z {number} optional
	 */
	constructor({x=0, y=0, z=0}) {
		super({x,y});
		this.z = z;
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
		return new Vector2({'x':this.x, 'y':this.y});
	}

	copy() {
		return new Vector3({'x':this.x, 'y':this.y, 'z':this.z});
	}

	static sub(a, b) {
		// TODO: do we want to allow 'b' to be something other than a Vector, here?
		return new Vector3({'x':a.x - b.x, 'y':a.y - b.y, 'z':a.z - (b.z || 0)});
	}

	static add(a, b) {
		// TODO: do we want to allow 'b' to be something other than a Vector, here?
		return new Vector3({'x':a.x + b.x, 'y':a.y + b.y, 'z':a.z + (b.z || 0)});
	}

	static mult(a, b) {
		if (b.constructor === Vector3) {
			return new Vector3({'x':a.x * b.x, 'y':a.y * b.y, 'z':a.z * b.z});
		} else if (isNaN(b) === false) {
			return new Vector3({'x':a.x * b, 'y':a.y * b, 'z':a.z * b});
		}

	}

	static div(a, b) {
		if (b.constructor === Vector3) {
			return new Vector3({'x':a.x / b.x, 'y':a.y / b.y, 'z':a.z / b.z});
		} else if (isNaN(b) === false) {
			return new Vector3({'x':a.x / b, 'y':a.y / b, 'z':a.z / b});
		}
	}

	static get zero() {return new Vector3({})}
}

/**
 * A Line object holding start and end points.
 * @class Line
 */
class Line {
	constructor({pointA, pointB}) {
		this.start = pointA;
		this.end = pointB;
	}
	get length() {
		return Vector2.sub(this.start, this.end).magnitude;
	}
	get slope() {
		return (this.end.y - this.start.y) / (this.end.x - this.start.x);
	}
	get normal() {
		return new Vector2({'x':(this.end.y - this.start.y), 'y':-(this.end.x - this.start.x)});
	}
}

/**
 * A Rect object holding x, y, width, and height components.
 * @class Rect
 */
class Rect extends Vector2 {
	constructor({x=0, y=0, width=0, height=0}) {
		super({x, y});
		this.width = width;
		this.height = height;
	}

	get center() {
		return new Vector2({'x':this.x + this.width / 2, 'y':this.y + this.height / 2})
	}

	get right() {
		return this.x + this.width
	}

	get bottom() {
		return this.y + this.height
	}

	get top() {
		return this.y;
	}

	get left() {
		return this.x;
	}

	get edges() {
		return {
			'top': 		new Line({	'pointA':new Vector2({'x':this.x, 'y':this.y}), 
								 	'pointB':new Vector2({'x':this.right, 'y':this.y})}),

			'right': 	new Line({	'pointA':new Vector2({'x':this.right, 'y':this.y}), 
								 	'pointB':new Vector2({'x':this.right, 'y':this.bottom})}),

			'bottom': 	new Line({	'pointA':new Vector2({'x':this.x, 'y':this.bottom}), 
								 	'pointB':new Vector2({'x':this.right, 'y':this.bottom})}),

			'left': 	new Line({	'pointA':new Vector2({'x':this.x, 'y':this.y}), 
								 	'pointB':new Vector2({'x':this.x, 'y':this.bottom})})
		}
	}

	equals(rect) {
		return this.x === rect.x &&
			this.y === rect.y &&
			this.w === rect.w &&
			this.h === rect.h;
	}

	toVector2() {
		return new Vector2({'x':this.x, 'y':this.y});
	}

	copy() {
		return new Rect({'x':this.x, 'y':this.y, 'width':this.width, 'height':this.height});
	}
}

/**
 * A Circle object holding x, y, and r components.
 * @class Circle
 */
class Circle extends Vector2 {
	constructor({x=0, y=0, r=0}) {
		super({x, y});
		this.r = r;
	}
	center() {
		return new Vector2({'x':this.x, 'y':this.y});
	}
	equals(circle) {
		return this.x === circle.x &&
		this.y === circle.y &&
		this.r === circle.r;
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
	 * @param center {Vector2} Used for centering the transform on a point at creation
	 * 							(rather than having to later call gameObject.moveCenterTo(center))
	 */
	constructor({x=0, y=0, z=0, width=0, height=0, center}) {
		super({x, y, z});

		this.width = width;
		this.height = height;
		if (center) {
			this.x = center.x - (this.width / 2);
			this.y = center.y - (this.height / 2);
		}
		this._rotation = 0;
		this.scale = new Vector2({'x':1, 'y':1});
		this._forward = Vector2.right;
		this._direction = Vector2.right;
		this._defaultRotation = Vector2.angleBetween(Vector2.zero, this._forward);
	}

	get rect() {
		return new Rect(this);
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
		return new Transform(this);
	}

	static get zero() {return new Transform({});}

}

class Container {
	constructor({transform = Transform.zero}) {
		// Use default Transform if unspecified
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
		return new Vector3(this.transform);
	}

	set localPosition(position) {
		this.moveTo(Vector3.add(this.parent.transform, position))
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
		} else if (child.parent !== null) {
			console.error("Child already has a parent", child);
		} else if (child === this) {
			console.error("Cannot add a GameObject to itself");
		} else {
			child._parent = this;
			this.children.push(child);
			this._addToFlattened(child);
			if (this._sceneKey) {
				/* 	if this Container is already in a scene, then the child
				 	should call its _onAddedToScene method. This is otherwise called
				 	when the parent Container is added to a scene
				*/
				child._onAddedToScene(this._sceneKey);
			}

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
		this._removeFromFlattened(child); // recursively removes from parents, as well
		child._parent = null;
		return true
	}

	/**
	 * Removes all children from this container. In doing so, all descendants are
	 * removed from this container as well as any parent's.
	 */
	removeAll() {
		for (let child of this.children.slice()) {
			this.remove(child);
		}
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
		for (const grandchild of child.flattened) {
			this.flattened.splice(this.flattened.indexOf(grandchild), 1);
			this.parent._removeFromFlattened(grandchild); // recursively removes from parents, as well
		}
		this.flattened.splice(this.flattened.indexOf(child), 1);
		if (this.parent != null && this.parent._removeFromFlattened) {
			this.parent._removeFromFlattened(child);
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
		let adjustedPos = Vector2.sub(vector3, new Vector2({'x':this.transform.width / 2, 'y':this.transform.height / 2}));
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
	constructor({transform, isUI=false}) {
		super({transform});
		if (transform === undefined) {
			console.warn('GameObject created without a Transform. Using the default ' +
				'Transform. To use the default Transform explicitly, use ' + 
				'new GameObject({"transform": new Transform({})})', this);
		}
		this.isUI = isUI;
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
			let newRelativePosition = new Vector2({
					'x':Math.cos(angleToChild + difference) * distanceToChild,
					'y':Math.sin(angleToChild + difference) * distanceToChild
			});
			child.moveCenterTo(Vector2.add(this.transform.rect.center, newRelativePosition));
		}
	}

	rotate(radians) {
		// TODO: Rotating CircleSprites does not work correctly
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


	attach(component) {
		for (const c of this.components) {
			if (c instanceof component.constructor) {
				console.error("GameObject already has a component of type: " + component.constructor.name);
				return;
			}
		}
		this.components.push(component);
		component.attachTo(this);
		return component;
	}

	removeComponent(componentType) {
		for (const component of this.components) {
			if (component instanceof componentType) {
				component.remove();
				this.components.splice(this.components.indexOf(component), 1);
				return true;
			}
		}
		return false;
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

	destroyComponents() {
		for (let c of this.components.slice()) {
			c.destroy();
		}
		this.components = [];
	}

	destroy() {
		this.enabled = false;
		this.destroyComponents();
		if (this.parent) {
			this.parent.remove(this);
		}
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

	attachTo(gameObject) {
		this.gameObject = gameObject;
		this.onAttach();
	}

	remove() {
		this.gameObject = null;
	}

	destroy() {
		if (this.gameObject) {
			this.gameObject.removeComponent(this.constructor);
			this.gameObject = null;
		}
		this.enabled = false; // disable just in case it isn't
	}

	onAttach() {}

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
	constructor({key = "key"}) {
		if (key === "key") console.error("Scene created with no key");
		this.key = key;
		this.mainCamera = null;
		Scene._scenes[key] = this;
		this._children = [];
		this._inputComponents = [];
		this._flattened = [];
		if (Scene.current === null) {
			Scene.changeScene(key);
		}
		this.bgColor = Color.BLACK;
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
				// TODO: Need to handle if (gameObject.enabled === false) here, but
				// we don't want to just do a simple if statement. If the component is already
				// being dragged, we need to set it to being NOT dragged
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
				if (component.gameObject.enabled &&
					PhysicsEngine.collisionPR(Input.mouse.rel, component.gameObject.transform)) {
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
				if (component.gameObject.enabled &&
					PhysicsEngine.collisionPR(Input.mouse.rel, component.gameObject.transform)) {
					if (topMost === null || component.gameObject.transform.z > topMost.gameObject.transform.z)
						topMost = component;
				}
			}
			if (topMost !== null)
				topMost._onDblClick(Input.mouse.rel);
		} else if (type === Input._RIGHTCLICK) {
			let topMost = null;
			for (const component of this._inputComponents) {
				if (component.gameObject.enabled &&
					PhysicsEngine.collisionPR(Input.mouse.rel, component.gameObject.transform)) {
					if (topMost === null || component.gameObject.transform.z > topMost.gameObject.transform.z)
						topMost = component;
				}
			}
			if (topMost !== null)
				topMost._onRightClick(Input.mouse.rel);
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

	static clear(player) {
		if (Scene.current === null) return;
		if (Scene.current.mainCamera) {
			player.context.fillStyle = Scene.current.bgColor;
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

	remove() {
		if (this.gameObject) {
			Scene.getScene(this.gameObject._sceneKey).removeInputComponent(this);
		}
		super.remove()
	}
}

class Button extends InputComponent {
	constructor() {
		super();
		this.isHovered = false;
		this.isPressed = false;
	}

	onClick(point){};

	onRightClick(point){};

	onDblClick(point){};

	onRelease(point){};

	onHover(point){};

	onExit(point){};

	_onClick(point) {
		this.isPressed = true;
		this.onClick(point)
	}

	_onRightClick(point) {
		//TODO: Maybe need to handle on right click hold, here?
		this.onRightClick(point);
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
 * SpriteRenderer attachToed. Allows for an Animation to be used
 * which cycles through a set of Sprites based on a given
 * frame rate. Animations are added with addAnimation() and
 * can be removed with removeAnimation(). Set the current
 * animation by providing the key (animator.animation = 'key').
 *
 * @class      Animator (name)
 */
class Animator extends Component {
	constructor({frameRate = 30}) {
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
	constructor({sprites = []}) {
		this.frames = sprites;
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
	constructor({	viewport = new Rect({'x':0,'y':0,'width':720,'height':480}), 
					scale = new Vector2({'x':1,'y':1})
				}) 
	{
		super();
		this.viewport = viewport;
		this._scale = scale;
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
								new Rect({'x':0, 'y':0, 'width':this.viewport.width, 'height':this.viewport.height})
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

	remove() {
		if (this === Camera._mainCamera) {
			Camera._mainCamera = null;
		}
		super.remove()
	}
}


class InputKey {
	constructor({name = "unnamed_key", upper}) {
		this.name = name;
		this.down = false;
		this.up = false;
		this.pressed = false;
		this._wasPressed = false;
		this.released = false;
		this.upper = upper || name.toUpperCase();
	}
}

class Input {
	/* TODO: Fix keyboard input handling. Too many bugs happening now.
			When a letter is pressed, held down, and then a modifier
			is pressed and held, releasing the letter does not remove
			the key from the downKeys array
	*/
	static handleInput(key="", inputType="none") {
		if (Input.keys[key] === undefined) {
			Input.keys[key] = new InputKey({name:key, upper:""});
		}
		if (inputType === Input.KEYDOWN) {
			Input.keys[key].down = true;

			Input.downKeys[key] = true;

		} else if (inputType === Input.KEYUP) {
			if (key in Input.downKeys) {
				Input.keys[key].up = true;
				Input.keys[key].down = false;
				Input.keys[key].pressed = false;
				Input.keys[key]._wasPressed = false;
				Input.keys[key].released = true;

				delete Input.downKeys[key];
			} else if (Input.keys[key].upper in Input.downKeys) {
				// this is needed for the case where the the user holds
				// a modifier (shift) and a letter, then releases shift
				// before releasing the letter. This caused the uppercase
				// key to never be 'released' or removed from the downKeys
				// until pressed again.
				Input.keys[Input.keys[key].upper].up = true;
				Input.keys[Input.keys[key].upper].down = false;
				Input.keys[Input.keys[key].upper].pressed = false;
				Input.keys[Input.keys[key].upper]._wasPressed = false;
				Input.keys[Input.keys[key].upper].released = true;

				delete Input.downKeys[Input.keys[key].upper];
			}
		}
	}

	static update(dt) {
		for (const keyName in Input.keys) {
			let key = Input.keys[keyName]
			if (key.down) {
				if (key.pressed) {
					key.pressed = false;
				} else if (!key._wasPressed) {
					key.pressed = true;
					key._wasPressed = true;
				}
			} else if (key.up) {
				if (key.released) {
					key.released = false;
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
			if (e.key == 'Backspace') {
				e.preventDefault();
				return false;
			}
		});
		target.addEventListener('keyup', (e) => Input.handleInput(e.key, Input.KEYUP));

		target.addEventListener('mousemove', function (e) {
			//TODO: For some reason the left-most edge of the canvas shows up as > 0 in e.clientX
			Input.mouse.abs.x = e.clientX - (target.offsetLeft ? target.offsetLeft : 0);
			Input.mouse.abs.y = e.clientY - (target.offsetTop ? target.offsetTop : 0);
			if (Game.instance !== null && Scene.current && Scene.current.mainCamera) {
				// since the Camera scale is held separate from the Player scale, we need to account
				// for both of them multiplicatively.
				let actualScale = Vector2.mult(Game.instance.player.scale, Scene.current.mainCamera.scale);
				// the world coordinate of the mouse will be the real position divided by the scale
				Input.mouse.rel = Vector2.div(Input.mouse.abs, actualScale);
				Scene.current.handleInput(Input._MOUSEMOVE);
			}
		});
		target.addEventListener('mousedown', function (e) {
			if (e.which && e.which === 1 ||
				e.button && e.button === 1) {

				Input.mouse.down = true;
				if (Scene.current) {
					Scene.current.handleInput(Input._MOUSEDOWN);	
				}
			}
		});
		target.addEventListener('mouseup', function (e) {
			Input.mouse.down = false;
			if (Scene.current) {
				Scene.current.handleInput(Input._MOUSEUP);	
			}
		});
		target.addEventListener('dblclick', function (e) {
			if (Scene.current) {
				Scene.current.handleInput(Input._MOUSEDBLDOWN);	
			}
		});
		target.addEventListener('contextmenu', function(e) {
		    e.preventDefault();
		    if (Scene.current) {
		    	Scene.current.handleInput(Input._RIGHTCLICK)
		    }
		    return false;
		}, false);
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
Input._RIGHTCLICK = 'rightClick';

Input.KEYDOWN = 'keydown';
Input.KEYUP = 'keyup';
Input.SPACE = ' ';
Input.keys = {
	'q': new InputKey({name:'q',upper:'Q'}), 'w': new InputKey({name:'w',upper:'W'}), 'e': new InputKey({name:'e',upper:'E'}),
	'r': new InputKey({name:'r',upper:'R'}), 't': new InputKey({name:'t',upper:'T'}), 'y': new InputKey({name:'y',upper:'Y'}),
	'u': new InputKey({name:'u',upper:'U'}), 'i': new InputKey({name:'i',upper:'I'}), 'o': new InputKey({name:'o',upper:'O'}),
	'p': new InputKey({name:'p',upper:'P'}), 'a': new InputKey({name:'a',upper:'A'}), 's': new InputKey({name:'s',upper:'S'}),
	'd': new InputKey({name:'d',upper:'D'}), 'f': new InputKey({name:'f',upper:'F'}), 'g': new InputKey({name:'g',upper:'G'}),
	'h': new InputKey({name:'h',upper:'H'}), 'j': new InputKey({name:'j',upper:'J'}), 'k': new InputKey({name:'k',upper:'K'}),
	'l': new InputKey({name:'l',upper:'L'}), ';': new InputKey({name:';',upper:':'}), "'": new InputKey({name:"'",upper:'"'}),
	'z': new InputKey({name:'z',upper:'Z'}), 'x': new InputKey({name:'x',upper:'X'}), 'c': new InputKey({name:'c',upper:'C'}),
	'v': new InputKey({name:'v',upper:'V'}), 'b': new InputKey({name:'b',upper:'B'}), 'n': new InputKey({name:'n',upper:'N'}),
	'm': new InputKey({name:'m',upper:'M'}), ',': new InputKey({name:',',upper:'<'}), '.': new InputKey({name:'.',upper:'>'}),
	'/': new InputKey({name:'/',upper:'?'}), '1': new InputKey({name:'1',upper:'!'}), '2': new InputKey({name:'2',upper:'@'}),
	'3': new InputKey({name:'3',upper:'#'}), '4': new InputKey({name:'4',upper:'$'}), '5': new InputKey({name:'5',upper:'%'}),
	'6': new InputKey({name:'6',upper:'^'}), '7': new InputKey({name:'7',upper:'&'}), '8': new InputKey({name:'8',upper:'*'}),
	'9': new InputKey({name:'9',upper:'('}), '0': new InputKey({name:'0',upper:')'}), '-': new InputKey({name:'-',upper:'_'}),
	'=': new InputKey({name:'=',upper:'+'}), '`': new InputKey({name:'`',upper:'~'}),
	'Escape': new InputKey({name:'Escape',upper:'Escape'}),
	'Shift': new InputKey({name:'Shift',upper:'Shift'}),
	' ': new InputKey({name:' ',upper:' '}),
	'Enter': new InputKey({name:'Enter',upper:'Enter'}),
	'Meta': new InputKey({name:'Meta',upper:'Meta'}),
	'Alt': new InputKey({name:'Alt',upper:'Alt'}),
	'Tab': new InputKey({name:'Tab',upper:'Tab'}),
	'Backspace': new InputKey({name:'Backspace',upper:'Backspace'}),
};
Input.downKeys = {}
class Draggable extends Button {
	constructor() {
		super();
		this._isDragged = false;
		this._originalPosition = Vector2.zero;
		this._distanceFromClickPoint = Vector2.zero;
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

	attachTo(gameObject) {
		super.attachTo(gameObject);
		this._originalPosition = new Vector2({'x':gameObject.transform.x, 'y':gameObject.transform.y})
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
		this.gameObject.moveTo(new Vector3({
			'x':point.x + this._distanceFromClickPoint.x, 
			'y':point.y + this._distanceFromClickPoint.y, 
			'z':this.gameObject.transform.z
		}));
		this.onDrag(point)
	}

	_onRelease(point) {
		this._isDragged = false;
		this.onRelease(point)
	}
}
class RigidBody extends Component {
	constructor({isStatic=false}) {
		super();
		this._velocity = Vector2.zero;
		this._acceleration = Vector2.zero;
		this._mass = 1;
		this._friction = 1;
		this._maxSpeed = Infinity;
		this._isStatic = isStatic;
	}

	attachTo(gameObject) {
		super.attachTo(gameObject);
		PhysicsEngine.rigidbodies.push(this)
	}

	remove() {
		super.remove();
		// remove from Input
		PhysicsEngine.rigidbodies.splice(PhysicsEngine.rigidbodies.indexOf(this), 1)
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
	constructor({colliderA=null, colliderB=null, normal=null, penetration=null}) {
		this.colliderA = colliderA;
		this.colliderB = colliderB;
		this.normal = normal;
		this.penetration = penetration;
	}
}

class Collider extends Component {
	constructor({bound=null, layer = Collider.LAYER_ALL}) {
		super();
		this._bound = bound;
		this.worldBound = bound;
		this._layer = layer;
		this._collisions = [];
		this._colliders = [];
	}

	get collisions() {
		// we need to do this extra work because GameObjects and Colliders
		// can be destroyed or disabled while being stored in the current
		// list of collisions. This means the onExit will never be called,
		// so the collision will stay in the list forever. We need to purge
		// the disabled/dead collisions.
		let fixedCollisions = [];
		for (let i=0; i<this._collisions.length; i++) {
			let coll = this._collisions[i];
			if (coll.colliderB.gameObject !== null &&
				coll.colliderB.gameObject.enabled && coll.colliderB.enabled &&
				coll.colliderA.gameObject.enabled && coll.colliderA.enabled) {
				fixedCollisions.push(coll);
			}
		}
		this._collisions = fixedCollisions;
		return this._collisions;
	}

	get colliders() {
		// we need to do this extra work because GameObjects and Colliders
		// can be destroyed or disabled while being stored in the current
		// list of colliders. This means the onExit will never be called,
		// so the collider will stay in the list forever. We need to purge
		// the disabled/dead colliders.
		let fixedColliders = [];
		for (let i=0; i<this._colliders.length; i++) {
			let coll = this._colliders[i];
			if (typeof coll.gameObject !== 'undefined' &&
				coll.enabled && coll.gameObject.enabled) {

				fixedColliders.push(coll);
			}
		}
		this._colliders = fixedColliders;
		return this._colliders;
	}

	get layer() {
		return this._layer;
	}

	set layer(layer) {
		this._layer = layer;
	}

	attachTo(gameObject) {
		super.attachTo(gameObject);
		PhysicsEngine.colliders.push(this)
	}

	onAttach() {
		if (this._bound === null) {
			let t = this.gameObject.transform;
			this._bound = new Rect({'x':t.x, 'y':t.y, 'width':t.width, 'height':t.height});
		}
	}

	remove() {
		// remove from PhysicsEngine
		PhysicsEngine.colliders.splice(PhysicsEngine.colliders.indexOf(this), 1)
		super.remove();
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
		return new Collision({'colliderA':this, 'colliderB':otherCollider});
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
		for (let i=0; i<this.collisions.length; i++) {
			if (this.collisions[i].colliderA === collision.colliderA &&
				this.collisions[i].colliderB === collision.colliderB) {
				this.collisions.splice(i, 1);
			}
		}
		this.onExit(collision);
	}

	_onStay(collision) {
		this.onStay(collision);
	}
}
Collider.LAYER_ALL = 'all'

class RectCollider extends Collider {
	constructor({bound, layer}) {
		super({bound, layer});
	}

	attachTo(gameObject) {
		super.attachTo(gameObject);
		if (this._bound === undefined || this._bound === null) {
			this._bound = this.gameObject.transform.rect;
			this.worldBound = this.gameObject.transform.rect;
		}
	}
}

class CircleCollider extends Collider {
	constructor({bound, layer}) {
		super({bound, layer});
	}

	attachTo(gameObject) {
		super.attachTo(gameObject);
		if (this._bound === undefined || this._bound === null) {
			let c = new Circle({
				'x':gameObject.transform.x, 
				'y':gameObject.transform.y, 
				'r':gameObject.transform.width
			});
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
	constructor({sprite}) {
		super();
		this.sprite = sprite;
		this.borderEnabled = false;

		this.hue = 0; // uses context.filter=hue-rotate(hue), which is slow. Use with caution
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
			let bounds = new Rect({
				'x': position.x, 
				'y': position.y, 
				'width': t.width, 
				'height': t.height
			});
			if (this.hue) {
				context.filter = "hue-rotate("+this.hue+"deg)";
			}

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
	constructor() {
		this.loaded = false;
		this.failed = false;
	}
}

class ImageResource extends Resource {
	constructor({path}) {
		super();
		this.image = new Image(); // new DOM Image
		this.image.onload = (ev)=>{
			this.loaded = true;
			this.onLoad(ev);
		}
		this.image.onerror = (ev)=>{
			this.failed = true;
			this.onError(ev)
		}
		this.image.src = path;
	}
}


/**
 * Class for loader.
 *
 *	See the example code below:
 *		loader.add('tiles', new ImageResource('resource/path.png')); // load the path.png only once
 *		Sprite.setSprite('tile_grass', new Sprite(loader.resources['tiles'], new Rect(0,0,32,32)));
 *
 * @class      Loader (name)
 */
class Loader {
	constructor() {
		this.loadedResources = {};
		this.failedResources = {};
		this.loadingResources = {};
		this.resources = {};
		this.size = null;
	}

	add(key, resource) {
		if (resource instanceof Resource === false) {
			console.error("Loader only accepts objects that extend the Resource class");
		} else {
			this.resources[key] = resource;
			this.loadingResources[key] = this.resources[key];
			if (resource.loaded) {
				this.loadedResources[key] = this.resources[key];
			} else if (resource.failed) {
				this.failedResources[key] = this.resources[key];
			} else {
				resource.onLoad = ()=>{
					this.loadedResources[key] = this.resources[key];
					if (this.size != null && Object.keys(this.loadedResources).length === this.size) {
						// this is the last resource
						this.onLoad();
					}
				}
				resource.onError = (ev)=>{
					this.failedResources[key] = this.resources[key];
					this.onError(ev);
				}
			}
		}
	}

	load() {
		this.size = Object.keys(this.resources).length;
	}

	/*
	 *	Override this method for beginning your game. Use the example below for an idea
	 *	of implementation.
	 *	
	 *	loader.onLoad = ()=>{
	 *		// handle game initialization here
	 *	}
	 */
	onLoad() {
		console.warn("Loader finished but onLoad was not overridden");
	}

	/*
	 *	Override this method for catching when resources fail. Use the example below for an idea
	 *	of implementation.
	 *	
	 *	loader.onError = (err)=>{
	 *		// handle game failure here
	 *	}
	 */
	onError(err) {
		console.warn("Loader failed but onError was not overridden");
	}
}

class Sprite {
	constructor({color, image, cropRect}) {
		if (image) {
			this.image = image.image;
			if (cropRect === undefined) {
				this.cropRect = new Rect({
					'x':0, 
					'y':0, 
					'width':this.image.width, 
					'height':this.image.height
				});
			} else {
				this.cropRect = cropRect;
			}
			this.draw = function (context, transform) {
				if (this.cropRect.width <= 0 || this.cropRect.height <= 0) {
					this.cropRect = new Rect({
						'x':0, 
						'y':0, 
						'width':this.image.width, 
						'height':this.image.height
					});
				}
				context.drawImage(this.image,
					this.cropRect.x, this.cropRect.y, this.cropRect.width, this.cropRect.height,
					transform.x, transform.y, transform.width, transform.height);
			}
		} else if (color) {
			this.color = color;
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
	constructor({color}) {
		super({color});
		this.draw = function (context, transform) {
			context.fillStyle = this.color.toString();
			context.beginPath();
			context.arc(transform.x, transform.y, transform.width, 0, 2 * Math.PI);
			context.fill()
		}
	}
}

/**
 * Class for rendering text. Use {Font.BOLD} or a similar command to use in-line
 * styling.
 *
 * @class      TextRenderer (name)
 */
class TextRenderer extends Component {
	constructor({text="", 
				 font=Font.default,
				}) 
	{
		super();
		this._lines = [];
		this._splitLines = [];
		this.noStyleText = "";
		this.text = text;
		this.font = font;
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
		let closeIndex = this._text.indexOf("}");
		if (openIndex >= 0 && closeIndex > openIndex) {
			this._splitLines.push(["", this._text.substring(0, openIndex).split("\n")]);
			this.noStyleText += this._text.substring(0, openIndex);
		} else {
			this._splitLines.push(["", this._text.split("\n")]);
			this.noStyleText += this._text;
		}
		
		while (openIndex >= 0 && closeIndex > openIndex) {
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
			if (this.font.vAlignment === Font.TOP) {
				vAlign = this.font.size * 2 * this.font.sizeHeightRatio;
			}
			else if (this.font.vAlignment === Font.CENTERED) {
				// set vAlign to the center of the gameObject
				vAlign = (transform.height / 2) + (this.font.size * this.font.sizeHeightRatio);
			}
			else if (this.font.vAlignment === Font.BOTTOM) {
				// set vAlign to the bottom of gameObject
				vAlign = transform.height;
			}

			for (const line of this._splitLines) {
				if (line[0].length > 2) {
					let args = line[0].split(';');
					for (let i=0; i < args.length; i++) {
						let arg = null;
						try {
							arg = Util.safeEval(args[i]); // TODO: Sanitize input?
						} catch (e) {
							// do nothing
						}
						if (arg instanceof Color)
							context.fillStyle = arg;
						else if (arg === Font.BOLD || arg === Font.ITALIC || arg === Font.NORMAL)
							context.font = arg + ' ' + this.font;
						else if (arg === Font.RESET) {
							context.font = this.font;
							context.fillStyle = this.font.color;
						}
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

					if (this.font.hAlignment === Font.CENTERED) {
						// TODO: Can we move the measureText outside of the draw method?
						hAlign -= context.measureText(splitText[lineIndex]).width / 2;
						hAlign += transform.width / 2;

					} else if (this.font.hAlignment === Font.RIGHT) {

						hAlign -= context.measureText(splitText[lineIndex]).width;
						hAlign += transform.width;
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
	constructor({	name = 'Courier', 
					size = 12, 
					color = Color.BLACK, 
					hAlignment = Font.LEFT, 
					vAlignment = Font.TOP
				}) 
	{
		this.name = name;
		this.size = size;
		this.color = color;
		this.hAlignment = hAlignment;
		this.vAlignment = vAlignment;
		switch (name) {
			// TODO: Figure out more font ratios
			case "Aldrich": {
				this.sizeHeightRatio = 1.76 / 5;
			} break;
			case "Courier": {
				this.sizeHeightRatio = 1.48 / 5;
			} break;
			default: {
				this.sizeHeightRatio = 1;
			} break;
		}
	}

	toString() {
		return `${this.size}px ${this.name}`;
	}
}
Font.BOLD = 'bold';
Font.ITALIC = 'italic';
Font.NORMAL = 'normal';
Font.RESET = 'reset';
Font.CENTERED = 'centered';
Font.RIGHT = 'right';
Font.LEFT = 'left';
Font.TOP = 'top';
Font.BOTTOM = 'bottom';
Font.default = new Font({
	name:'courier', 
	'size':12, 
	'color':Color.BLACK, 
	'hAlignment':Font.LEFT, 
	'vAlignment':Font.TOP
});

class PhysicsCollider extends Collider {
	constructor({bound, layer, bounciness = 0, slickness = 1}) {
		super(bound, layer);
		this.bounciness = bounciness;
		this.slickness = slickness;
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
	/*
		PhysicsEngine.rigidbodies = [];
		PhysicsEngine.colliders = [];
		PhysicsEngine.constantForce = Vector2.zero;
	*/
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
							coll1._onExit(new Collision({'colliderA':coll1, 'colliderB':coll2}));
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
					normal = new Vector2({'x':-1, 'y':0});
				} else {
					normal = new Vector2({'x':1, 'y':0});
				}
				penetration = overlapX;
			} else {
				if (rectB.y - rectA.y < 0) {
					normal = new Vector2({'x':0, 'y':-1});
				} else {
					normal = new Vector2({'x':0, 'y':1});
				}
				penetration = overlapY;
			}
			return new Collision({normal, penetration});
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
		let D = new Vector2({'x':(B.x-A.x)/LAB, 'y':(B.y-A.y)/LAB})

		// Now the line equation is x = Dx*t + Ax, y = Dy*t + Ay with 0 <= t <= 1.

		// compute the value t of the closest point to the circle center (Cx, Cy)
		let t = D.x*(C.x-A.x) + D.y*(C.y-A.y)    

		// This is the projection of C on the line from A to B.

		// compute the coordinates of the point E on line and closest to C
		let E = new Vector2({'x':t*D.x+A.x, 'y':t*D.y+A.y})

		// compute the euclidean distance from E to C
		let LEC = Math.sqrt( (E.x-C.x)*(E.x-C.x)+(E.y-C.y)*(E.y-C.y) )

		// test if the line intersects the circle
		if( LEC < R )
		{
		    // compute distance from t to circle intersection point
		    let dt = Math.sqrt( (R*R) - (LEC*LEC))

		    // compute first intersection point
		    let F = new Vector2({'x':(t-dt)*D.x + A.x, 'y':(t-dt)*D.y + A.y})

		    if (F.x >= A.x && F.x <= B.x && F.y >= A.y && F.y <= B.y) {
		    	//return F;
		    	return new Collision({'normal':line.normal, 'penetration':LEC});
		    }

		    // compute second intersection point
		    let G = new Vector2({'x':(t+dt)*D.x + A.x, 'y':(t+dt)*D.y + A.y})
		    if (G.x >= A.x && G.x <= B.x && G.y >= A.y && G.y <= B.y) {
		    	//return A;
		    	return new Collision({'normal':line.normal, 'penetration':LEC});
		    }
		}

		// else test if the line is tangent to circle
		else if( LEC === R ) {
			if (E.x >= A.x && E.x <= B.x && E.y >= A.y && E.y <= B.y) {
		    	//return E;
		    	return new Collision({'normal':line.normal, 'penetration':LEC});
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
	constructor({start, collider, points}) {
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
	constructor({rayStart, rayDirection, layer = 65535, rayLength = 999999}) {
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
		return new Line({'pointA':this.rayStart, 'pointB':this.rayEnd})
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
				rayCastPoints.push(new RaycastPoint({'start':this.rayStart, 'collider':coll, 'points':points}))
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
	constructor({cameraToBaseMovementFrom, movementMultiplier}) {
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

class Random {
	static range(start, stop) {
		return Math.floor(Math.random() * (stop - start) + start);
	}
	/**
	 * Returns an array of n size, with contents picked randomly from the given array.
	 * If array's elements are objects, then the outputted array will have references
	 * to those objects (not copies). n can be any number greater than 0, and it is
	 * not limited to the size of the array. In the case where n > array.length, the
	 * outputted array will have multiple references to the same elements, but will 
	 * still choose randomly.
	 *
	 * @param      {Array}  array   The array to choose from
	 * @param      {number}  n       The number of elements
	 * @return     {Array}  The sample
	 */
	static sample(array, n) {
		let result = [];
		if (array.length > 2) {
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
			for (let i=0; i<n; i++) {
				result.push(array[generator()]);
			}
		} else {
			for (let i=0; i<n; i++) {
				result.push(array[Random.range(0, array.length)]);
			}
		}
		return result;
	}
	//return random string of length n, from set string or entire alphabet
	static string(n, str){
		str = str || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let result = "";
		for (let i = 0; i < n; i++) {
			result += str.charAt(Random.range(0,str.length));
		}
		return result;
	}
}

class Util {
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

	static safeEval(str) {
		return Function(`'use strict';return(${str})`)();
	}
}


class Game {
	constructor({canvas, inputTarget, size}) {
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

		this.player = new Player({'canvas':canvas, 'size':size});
		this.inputTarget = inputTarget || canvas;
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

	get averageFPS() {
		return this._averageFPS;
	}
	get FPS() {
		return Math.round(1000.0 / this._dt);
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
				this._fpsArray.splice(0, 1);
			}
			this._averageFPS = 0;
			this._fpsArray.forEach((fps)=>{this._averageFPS+=fps});
			this._averageFPS /= this._fpsArray.length;
			this._averageFPS = Math.round(this._averageFPS);

			Input.update(this._dt / 1000);
			if (!this.paused) {
				Scene.update(this._dt / 1000);
				if (this._physicsUpdateDelay === 0 || this.ticks % this._physicsUpdateDelay === 0) {
					// update PhysicsEngine every X frames
					PhysicsEngine.update(this._dt / 1000);
				}
				Scene.clear(this.player);
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
}
Game.instance = null;

class Player {
	constructor({canvas, size}) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.canvas.style.position = "absolute";

		canvas.width = size.x;
		canvas.height = size.y;

		this.originalSize = size;
		this.aspectRatio = 2 / 3;
		this._scale = new Vector2({'x':1, 'y':1});
		
		this.resizeMode = Player.RESIZE_SCALE;
		this.autoResize = true;

		this.size = size.copy();
		
		window.addEventListener("resize", (e)=>{
			this.onResize(e);
		});
		this.onResize();

	}

	onResize(e) {
		//TODO: Replace the rescale() code with this?
		let scaleX = window.innerWidth / canvas.width;
		let scaleY = window.innerHeight / canvas.height;

		let scaleToFit = Math.min(scaleX, scaleY);
		let scaleToCover = Math.max(scaleX, scaleY);

		this.canvas.style.transformOrigin = '0 0'; //scale from top left
		this.canvas.style.transform = 'scale(' + scaleToFit + ')';

		this.canvas.style.left = `${Math.round((window.innerWidth - (canvas.width * scaleToFit)) / 2)}px`;
		this.canvas.style.top = `${Math.round((window.innerHeight - (canvas.height * scaleToFit)) / 2)}px`;
		
		this.size.x = Math.round(canvas.width * scaleToFit);
		this.size.y = Math.round(canvas.height * scaleToFit);

		this._scale.x = scaleToFit;
		this._scale.y = scaleToFit;

		/*

		if (this.autoResize) {
			if (this.resizeMode === Player.RESIZE_FILL) {
				this.resize();
			} else if (this.resizeMode === Player.RESIZE_SCALE) {
				this.rescale();
			} else if (this.resizeMode === Player.RESIZE_NONE) {
				// do nothing
			}
		}
		*/
	}

	get scale() {
		return this._scale;
	}
	set scale(scale) {
		if (scale.x != 0 && scale.y != 0) {
			this.context.scale(scale.x / this._scale.x, scale.y / this._scale.y);
			this._scale = new Vector2({
				'x':scale.x / this._scale.x, 
				'y':scale.y / this._scale.y
			});
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
	/*
	get size() {
		return new Vector2(	this.canvas.style.width.split('px')[0], 
							this.canvas.style.height.split('px')[0]);
	}
	set size(size) {
		this.canvas.style.width = size.x+"px";
		this.canvas.style.height = size.y+"px";
	}
	*/

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
		this.size = new Vector2({'x':window.innerWidth, 'y':window.innerHeight});
		this._scale = Vector2.div(this.size, this.originalSize);
	}

	/**
	 * Scale the canvas based on the Player.aspectRatio
	 */
	rescale() {
		if (window.innerWidth * this.aspectRatio <= window.innerHeight) {
			// if scaling up does not cause the height to be bigger than the page
			this.size = new Vector2({'x':window.innerWidth, 'y':window.innerWidth * this.aspectRatio});
			// width is stretched to window width
			// height is scaled from width according to aspect ratio
			this.canvas.style.left = "0px";
		} else {
			// if scaling up causes height to be bigger than the page shows
			this.size = new Vector2({'x':window.innerHeight / this.aspectRatio, 'y':window.innerHeight});
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


class TextBox extends GameObject {
	//TODO: Need to capture input and allow for multiple TextBoxes on the screen at once
	constructor({transform, isUI=false, bgColor=Color.GRAY, color=Color.BLACK}) {
		super({transform, isUI});
		this.focused = false;
		this.addComponent(new SpriteRenderer({
			'sprite':new Sprite({
				'color':bgColor
			})
		}));

		this.addComponent(new TextRenderer({
			'font':new Font({
				name:"Courier", 
				'size':transform.height, 
				'color':color, 
				'hAlignment':Font.LEFT, 
				'vAlignment':Font.CENTERED
			})
		}));
		this.addComponent(new Button());

		this.cursor = new GameObject({
			'transform':new Transform({
				'x':transform.x, 
				'y':transform.y, 
				'z':transform.z+1, 
				'width':1, 
				'height':transform.height}),
			'isUI': isUI
		});
		this.cursor.addComponent(new SpriteRenderer({
			'sprite':new Sprite({
				'color':new Color({
					'r':255,
					'a':0.5
				})
			})
		}));

		this.maxLength = Math.floor(this.transform.width / (transform.height * (3/5)));


		this._cursorIndex = 0;
		this.add(this.cursor);

		this.getComponent(Button).onClick = ()=>{
			this.focused = true;
		}

		this.timeHoldPerChar = 0.5;
		this.timeHeld = this.timeHoldPerChar;
		this.timeHoldMultRate = 0.6;
	}

	get cursorIndex() {
		return this._cursorIndex;
	}

	incrementCursorIndex() {
		this._cursorIndex++;
		this.cursor.transform.x += this.transform.height * (3/5); // TODO: Yikes
	}

	decrementCursorIndex() {
		this._cursorIndex--;
		this.cursor.transform.x -= this.transform.height * (3/5); // TODO: Yikes
	}

	update(dt) {
		let tr = this.getComponent(TextRenderer);

		while (this.cursorIndex > tr.text.length) {
			// in case the TextRenderer's text is modified from outside of
			// this class, we need to make sure the cursor is bounded to
			// the text length
			this.decrementCursorIndex();
		}

		for (let key in Input.downKeys) {
			if (Input.keys[key].pressed) {
				this.timeHoldPerChar = 0.5;
				this.timeHeld = 0.5;
			} else {
				this.timeHeld += dt;
			}
			if (this.timeHeld >= this.timeHoldPerChar) {
				this.timeHeld = 0.0;
				if (this.timeHoldPerChar > 0.05) this.timeHoldPerChar *= this.timeHoldMultRate;


				if (key.length === 1) {
					// is a single character that we can show
					if (tr.text.length < this.maxLength) {
						if (Input.keys[key].down) {
							tr.text = 	tr.text.substring(0, this.cursorIndex) +
										key +
										tr.text.substring(this.cursorIndex, tr.text.length);
							this.incrementCursorIndex();
						}
					}
				} else {
					if (Input.keys[key].down) {
						if (key === 'Backspace') {
							if (tr.text.length > 0 && this.cursorIndex > 0) {
								this.decrementCursorIndex();
								tr.text = 	tr.text.substring(0, this.cursorIndex) + 
											tr.text.substring(this.cursorIndex+1, tr.text.length);
							}
						} else if (key === 'ArrowLeft') {
							if (this.cursorIndex > 0) {
								this.decrementCursorIndex();
							}
						} else if (key === 'ArrowRight') {
							if (this.cursorIndex < tr.text.length) {
								this.incrementCursorIndex();
							}
						}
					}
				}
			}
		}
	}
}

class Tile {
	constructor(key, sprite) {
		this.sprite = sprite;
		this.key = key;
	}
}

/**
 * Class for a tile map. TileMaps allow the creation of a static set of Sprites
 * that will be drawn to the screen using a backbuffer. Use this in the cases
 * where the TileMap contents will not change from frame to frame. This increases
 * performance because drawing a single buffer to the canvas is faster than
 * drawing each individual tile.
 * 
 * 0 0 0 0 0
 * 0 0 1 2 0
 * 1 1 2 3 0
 * 0 2 4 3 1
 * 0 0 0 0 0
 * 
 * Each key is associated with a single Tile, which is drawn on to a backbuffer 
 * at every position its key is found. This is done at creation. Then the buffer
 * is drawn
 *
 * @class      TileMap (name)
 */
class TileMap extends GameObject {
	constructor(transform, tileList) {
		super(transform, false);
		/*
			tileList = [
				{'col'		: Number,
				 'row'		: Number,
				 'sprite'	: Sprite}
			]
		*/
	}
}

export {
	Color,
	Vector2,
	Vector3,
	Line,
	Rect,
	Circle,
	Transform,
	Container,
	GameObject,
	Component,
	Scene,
	InputComponent,
	Button,
	Animator,
	Animation,
	Camera,
	InputKey,
	Input,
	Draggable,
	RigidBody,
	Collider,
	RectCollider,
	CircleCollider,
	SpriteRenderer,
	Resource,
	ImageResource,
	Loader,
	Sprite,
	CircleSprite,
	TextRenderer,
	Font,
	PhysicsCollider,
	PhysicsEngine,
	RaycastPoint,
	Raycast,
	Parallax,
	Random,
	Util,
	Game,
	Player,
	TextBox,
}