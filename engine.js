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
		this.a = a;
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
		this._class = Vector2;
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
	 * @returns {number}
	 */
	get magnitudeSquared() {
		return (this.x * this.x) + (this.y * this.y);
	}

	/**
	 * Gets the magnitude of the Vector.
	 * @returns {number}
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
		return this.x == other.x && this.y == other.y;
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
	 * Returns a new Vector2 zeroed out (shorthand for
	 * new Vector2(0, 0) )
	 * @returns {Vector2}
	 */
	static zero() {
		return new Vector2(0, 0);
	}

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
		this._class = Vector3;
	}

	get z() {
		return this._z;
	}

	set z(z) {
		this._z = z;
	}

	get magnitude() {
		return Math.cbrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
	}

	get normalized() {
		return Vector3.div(this, this.magnitude);
	}

	add(other) {
		this.x += other.x;
		this.y += other.y;
		this.z += (other.z || 0);
		return this;
	}

	set(other) {
		this.x = other.x;
		this.y = other.y;
		this.z = (other.z || this.z);
		return this;
	}

	sub(other) {
		this.x -= other.x;
		this.y -= other.y;
		this.z -= (other.z || 0);
		return this;
	}

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
		return super.equals(other) && this.z == other.z;
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
		if (b instanceof Vector3) {
			return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
		}
		return new Vector3(a.x * b, a.y * b, a.z * b);

	}

	static div(a, b) {
		if (b instanceof Vector3) {
			return new Vector3(a.x / b.x, a.y / b.y, a.z / b.z);
		}
		return new Vector3(a.x / b, a.y / b, a.z / b);
	}

	static zero() {
		return new Vector3(0, 0, 0)
	}
}

class Line {
	constructor(p1, p2) {
		this.start = p1;
		this.end = p2;
	}
	length() {
		return Vector2.sub(start, end).magnitude;
	}
}

class Rect extends Vector2 {
	constructor(x, y, width, height) {
		super(x, y);
		this._width = width;
		this._height = height;
		this._class = Rect
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
		return this.x == rect.x &&
			this.y == rect.y &&
			this.w == rect.w &&
			this.h == rect.h
	}

	toVector2() {
		return new Vector2(this.x, this.y)
	}

	copy() {
		return new Rect(this.x, this.y, this.width, this.height)
	}
}

class Circle extends Rect {
	constructor(x, y, r) {
		super(x, y, r, r);
		this.r = r;
	}
	center() {
		return new Vector2(this.x, this.y);
	}
	equals(circle) {
		return this.x == circle.x &&
		this.y == circle.y &&
		this.r == circle.r;
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
		this._class = Transform
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
		return this._rotation
	}

	set rotation(angle) {
		let PI2 = Math.PI * 2;
		let a = angle % PI2;

		if (a < 0)
			a += PI2;
		this._rotation = a;
	}

	add(vector3) {
		super.add(vector3);
		return this
	}

	sub(vector3) {
		super.sub(vector3);
		return this
	}
	rotateTowards(angle, t) {
		if (t > 1) t = 1;
		if (t < 0) t = 0;
		let a = angle % (Math.PI * 2);
		let PI2 = Math.PI * 2;
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

	static zero() {
		return new Transform(0, 0, 0, 0, 0)
	}

}
class Container {
	constructor(transform) {
		this._transform = transform;
		this._children = [];
		this._parent = null;
		this._enabled = true;
		this._flattened = [];
		this._class = Container
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
		for (const index in this.children) {
			this.children[index].enabled = enabled
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
		if (child !== this && child.parent === null) { // child is not this, child is an orphan
			child._parent = this;
			this.children.push(child);
			this.addToFlattened(child);

			for (const index in child.flattened) {
				this.addToFlattened(child.flattened[index])
			}
		} else {
			console.error("Child already has a parent", child);
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
		this.removeFromFlattened(child);
		for (const index in child.flattened) {
			this.removeFromFlattened(child.flattened[index])
		}
		child._parent = null;
		return true
	}

	/**
	 * Removes all children from this container. In doing so, all descendants are
	 * removed from this container as well as any parents.
	 */
	removeAll() {
		if (this.parent != null && this.parent.removeFromFlattened) {
			for (const index in this.flattened) {
				this.parent.removeFromFlattened(this.flattened[index])
			}
			for (const index in this.children) {
				this.children[index]._parent = null
			}
		}
		this._children = [];
		this._flattened = []
	}

	/**
	 * Determines if this container has a given child.
	 *
	 * @param      {Container}   child   The child to be searched for
	 * @return     {boolean}  True if has child, False otherwise.
	 */
	hasChild(child) {
		return this.children.indexOf(child) >= 0
	}

	/**
	 * Determines if this container has a given descendant (either a child,
	 * grandchild, etc.).
	 *
	 * @param      {Container}   child   The child to be searched for
	 * @return     {boolean}  True if has descendant, False otherwise.
	 */
	hasDescendant(child) {
		return this.flattened.indexOf(child) >= 0
	}

	/**
	 * Adds to the descendant (flattened) array. To add an element to this
	 * container, use the add(child) method which in turn calls this method.
	 * This method should not be explicitly called from outside of this class.
	 *
	 * @param      {Container}  child   The child to be added
	 */
	addToFlattened(child) {
		this.flattened.push(child);
		if (this.parent != null && this.parent.addToFlattened) {
			this.parent.addToFlattened(child)
		}
	}

	/**
	 * Removes a descendant from the descendant (flattened) array. To remove an element
	 * from this container, use the remove(child) method which in turn calls this method.
	 * This method should not be explicitly called from outside of this class.
	 *
	 * @param      {Container}  child   The child to be removed
	 */
	removeFromFlattened(child) {
		this.flattened.splice(this.flattened.indexOf(child), 1);
		if (this.parent != null && this.parent.removeFromFlattened) {
			this.parent.removeFromFlattened(child)
		}
	}

	/**
	 * Moves the element and each of its descendants in a given direction.
	 *
	 * @param      {Vector3}  difference  The Vector3 to be added to the Transforms
	 */
	move(difference) {
		this.transform.add(difference);
		for (const index in this.flattened) {
			this.flattened[index].transform.add(difference)
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
		for (const index in this.flattened) {
			this.flattened[index].transform.set(Vector3.add(this.flattened[index].transform, positionDifference))
		}
	}

	moveCenterTo(vector3) {
		let adjustedPos = Vector2.sub(vector3, new Vector2(this.transform.width / 2, this.transform.height / 2));
		let positionDifference = Vector3.sub(adjustedPos, this.transform);
		this.transform.set(adjustedPos);
		for (const index in this.flattened) {
			this.flattened[index].transform.set(Vector3.add(this.flattened[index].transform, positionDifference))
		}
	}

	moveTowards(destination, t) {
		this.moveTo(this.transform.lerp(destination, t)); // FIXME: Might update position twice?
	}
}
class GameObject extends Container {
	constructor(transform, isUI) {
		super(transform);
		this.isUI = isUI || false;
		this.components = [];
	}

	get rotation() {
		return this.transform.rotation;
	}

	set rotation(rotation) {
		let difference = rotation - this.transform.rotation;
		this.transform.rotation = rotation;
		for (const index in this.children) {
			let angleToChild = Vector2.angleBetween(this.children[index].transform.rect.center,
				this.transform.rect.center);
			let distanceToChild = Vector2.sub(  this.transform.rect.center,
				this.children[index].transform.rect.center)
				.magnitude;
			this.children[index].rotation += difference;
			this.children[index].moveCenterTo(Vector2
				.add(   this.transform.rect.center,
					new Vector2(Math.cos(angleToChild + difference) * distanceToChild,
						Math.sin(angleToChild + difference) * distanceToChild)));
		}
	}

	rotateTowards(angle, t) {
		let difference = angle - this.transform.rotation;
		this.transform.rotateTowards(angle, t);
		for (const index in this._flattened) {
			this._flattened[index].rotateTowards(this._flattened.transform.rotation + difference, t);
		}
	}


	addComponent(comp) {
		for (const index in this.components) {
			let c = this.components[index];
			if (c instanceof comp.constructor) {
				console.error("GameObject already has a component of type: " + comp.constructor);
				return;
			}
		}
		this.components.push(comp);
		comp.addTo(this);
	}

	removeComponent(compType) {
		for (const index in this.components) {
			if (this.components[index] instanceof compType) {
				Scene.removeInputComponent(this.components[index]);
				this.components[index].remove();
				this.components.splice(index, 1);
				return
			}
		}
	}

	removeAllComponents() {
		for (const index in this.components) {
			Scene.removeInputComponent(this.components[index]);
			this.components[index].destroy()
		}
		this.components = []
	}

	getComponent(compType) {
		for (const index in this.components) {
			let c = this.components[index];
			if (c instanceof compType) {
				return c
			}
		}
		return null
	}

	getComponentsInChildren(compType) {
		let results = [];
		for (const index in this.flattened) {
			let c = this.flattened[index].getComponent(compType);
			if (c !== null) results.push(c);
		}
		return results;
	}

	destroy() {
		this.parent.remove(this);
		this.removeAllComponents();
		this.removeAll(); // FIX ME : Need to delete child GameObjects and their Components, not just remove them
		this.enabled = false
	}

	_update(dt) {
		if (this.enabled === true) {
			for (const index in this.components) {
				if (this.components[index].enabled)
					this.components[index]._update(dt)
			}
			if (this.update)
				this.update(dt)
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
class Collision {
	static pointIsInRect(point, rect) {
		let w = rect.width;
		let h = rect.height;
		return point.x >= rect.x && point.x <= rect.x + w &&
			point.y >= rect.y && point.y <= rect.y + h
	}

	static pointIsInCircle(point, circle) {
		if (circle.r === undefined) console.error('radius not found on: ', circle);
		return Math.sqrt(((point.x - circle.x) * (point.x - circle.x)) +
			((point.y - circle.y) * (point.y - circle.y))) < circle.r
	}

	static rectIsTouchingRect(rectA, rectB) {
		if (rectA.x + rectA.width >= rectB.x && rectA.x <= rectB.x + rectB.width &&
			rectA.y + rectA.height >= rectB.y && rectA.y <= rectB.y + rectB.height) {

			let x_overlap = Math.max(0, Math.min(rectA.right, rectB.right) - Math.max(rectA.x, rectB.x));
			let y_overlap = Math.max(0, Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.y, rectB.y));
			return new Vector2(x_overlap, y_overlap)
		}
		return false
	}

	static circleIsTouchingCircle(circleA, circleB) {
		let dv = Vector2.sub(circleB, circleA);
		return circleA.r + circleB.r > dv.magnitude;
	}

	static lineIntersectsCircle(line, circle) {
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
		    	return F;
		    }

		    // compute second intersection point
		    let G = new Vector2((t+dt)*D.x + A.x, (t+dt)*D.y + A.y)
		    if (G.x >= A.x && G.x <= B.x && G.y >= A.y && G.y <= B.y) {
		    	return A;
		    }
		}

		// else test if the line is tangent to circle
		else if( LEC == R ) {
			if (E.x >= A.x && E.x <= B.x && E.y >= A.y && E.y <= B.y) {
		    	return E;
		    }
		}
		    // tangent point to circle is E

		else
			return false;
		    // line doesn't touch circle
	}
	static lineIntersectsCircle_bool(line, circle) {
		// modified from https://stackoverflow.com/questions/1073336/circle-line-segment-collision-detection-algorithm

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

	static lineIntersectsLine(lineA, lineB) {
		let dvA = Vector2.sub(lineA.end, lineA.start);
		let dvB = Vector2.sub(lineB.end, lineB.start);
		let s, t;
		s = (-dvA.y * (lineA.start.x - lineB.start.x) + dvA.x * (lineA.start.y - lineB.start.y)) / (-dvB.x * dvA.y + dvA.x * dvB.y);
		t = (dvB.x * (lineA.start.y - lineB.start.y) - dvB.y * (lineA.start.x - lineB.start.x)) / (-dvB.x * dvA.y + dvA.x * dvB.y);
		if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
			// Collision detected
			let intX = lineA.start.x + (t * dvA.x);
			let intY = lineA.start.y + (t * dvA.y);
			return Vector2.add(lineA.start, Vector2.mult(dvA, t))
		}
		return null
		// No collision
	}

	static rectIsTouchingCircle(rect, circle) {
		if (Collision.pointIsInRect(circle, rect)) return true;
		let edges = rect.edges;
		for (const index in edges) {
			if (Collision.lineIntersectsCircle(edges[index], circle)) {
				return true;
			}
		}
		return false;
	}
}
class Scene {
	constructor(key) {
		Scene._scenes[key] = this;
		this._children = [];
		if (Scene.currentScene == null) {
			Scene.changeScene(key);
		}
	}

	get children() {
		return this._children;
	}


	add(child) {
		if (child !== this && child.parent == null) {
			this.children.push(child);
			child._parent = this;
		} else {
			console.error("Child already has a parent", child);
		}
		return this;
	}

	remove(child) {
		let index = this.children.indexOf(child);
		if (index < 0) {
			return false;
		}
		this.children.splice(index, 1);
		child._parent = null;
		return true;
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
		for (const index in this.children) {
			// noinspection JSUnfilteredForInLoop
			let ch = children[index];
			if (ch.children) { // make sure it is able to have children
				if (ch.children.length > 0) {
					if (this.hasDescendant(child, ch.children)) { // if it does, run this again with this child as the parent
						return true;
					}
				}
			}
		}
		return false
	}

	getFlattened() {
		let flattenedChildren = this.children;
		for (const index in this.children) {
			// noinspection JSUnfilteredForInLoop
			flattenedChildren = flattenedChildren.concat(this.children[index].flattened)
		}
		return flattenedChildren;
	}

	static draw(context) {
		if (Camera.mainCamera) {
			Camera.mainCamera.draw(context, Scene.currentScene.getFlattened());
		} else {
			console.error("No camera was found");
		}
	}

	static clear(context, color = Color.BLACK) {
		if (Camera.mainCamera) {
			context.fillStyle = color;
			context.fillRect(0, 0, Camera.mainCamera.viewport.width, Camera.mainCamera.viewport.height);
		} else {
			console.error("No camera was found");
		}
	}

	static addInputComponent(component) {
		Scene.inputComponents.push(component);
	}

	static removeInputComponent(component) {
		let index = Scene.inputComponents.indexOf(component);
		if (index < 0) return;
		Scene.inputComponents.splice(index, 1);
	}

	static get currentScene() {
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

	static handleInput(type) {
		if (type === 'move') {
			for (const index in Scene.inputComponents) {
				let comp = Scene.inputComponents[index];
				if (comp.isDragged) {
					comp._onDrag(Input.mouse);
					break
				}
			}
		} else if (type === 'down') {
			let topMost = null;
			for (const index in Scene.inputComponents) {
				let comp = Scene.inputComponents[index];
				if (Collision.pointIsInRect(Input.mouse, comp.gameObject.transform)) {
					if (topMost === null || comp.gameObject.transform.z > topMost.gameObject.transform.z)
						topMost = comp;
				}
			}
			if (topMost !== null)
				topMost._onClick(Input.mouse);
		} else if (type === 'up') {
			for (const index in Scene.inputComponents) {
				let comp = Scene.inputComponents[index];
				if (comp.isDragged) {
					comp._onRelease(Input.mouse);
					break
				}
			}
		} else if (type === 'dblDown') {
			let topMost = null;
			for (const index in Scene.inputComponents) {
				let comp = Scene.inputComponents[index];
				if (Collision.pointIsInRect(Input.mouse, comp.gameObject.transform)) {
					if (topMost === null || comp.gameObject.transform.z > topMost.gameObject.transform.z)
						topMost = comp;
				}
			}
			if (topMost !== null)
				topMost._onDblClick(Input.mouse);
		}
	}

	static update (dt) {
		Scene.currentScene.getFlattened().forEach((go)=>{go._update(dt)});
	}
}
Scene._scenes = [];
Scene._currentScene = null;
Scene.inputComponents = [];
class Button extends Component {
	constructor() {
		super();
		Scene.addInputComponent(this);
		this._class = Button
	}

	onClick(point){};

	onDblClick(point){};

	onRelease(point){};

	_onClick(point) {
		this.onClick(point)
	}

	_onDblClick(point) {
		this.onDblClick(point);
	}

	_onRelease(point) {
		this.onRelease(point);
	}

	destroy() {
		Scene.removeInputComponent(this);
		super.destroy()
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
		this._class = Animator;
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
			if (this.animation == null) return;
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
		this._class = Animation;
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
		if (Camera.mainCamera == null) Camera.mainCamera = this;
		this.viewport = viewport;
		this._scale = scale;
		this._class = Camera
	}

	get viewport() {
		return this._viewport
	}

	get scale() {
		return this._scale
	}

	set viewport(viewport) {
		this._viewport = viewport
	}

	worldToScreenPosition(elementTransform) {
		return Vector2.sub(elementTransform.toVector2(), this.viewport.toVector2())
	}

	screenToWorldPosition(elementTransform) {
		return Vector2.add(elementTransform.toVector2(), this.viewport.toVector2())
	}

	draw(context, elements) {
		let sortedElements = elements.splice(0).sort(function (a, b) {
			return a.transform.z - b.transform.z
		});
		for (const index in sortedElements) {
			let el = sortedElements[index];
			for (const index in el.components) {
				let comp = el.components[index];
				if (comp.draw && comp instanceof Camera === false) {
					if (el.isUI) {
						if (Collision.rectIsTouchingRect(
								el.transform,
								new Rect(0, 0, this.viewport.width, this.viewport.height)
							)) {
							comp.draw(context, el.transform)
						}
					} else {
						if (Collision.rectIsTouchingRect(el.transform, this.viewport)) {
							let screenPos = this.worldToScreenPosition(el.transform);
							comp.draw(context, screenPos)
						}
					}
				}
			}
		}
	}

	static get mainCamera() {
		return Camera._mainCamera
	}

	static set mainCamera(newCamera) {
		Camera._mainCamera = newCamera
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

Camera._mainCamera = null;
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
		for (const k in Input.keys) {
			let key = Input.keys[k];
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
		return Input.keys[key].pressed ? 1 : 0;
	}
	/** Check if a key is down
	 *
	 * @param key
	 * @returns {int} 1 if key is currently held down, 0 otherwise
	 */
	static getKeyDown(key) {
		return Input.keys[key].down ? 1 : 0;
	}
	/** Check if a key was released this frame
	 *
	 * @param key
	 * @returns {int} 1 if released this frame, 0 otherwise
	 */
	static getKeyUp(key) {
		return Input.keys[key].up ? 1 : 0;
	}

	static createEventListeners(target) {
		target.addEventListener('keydown', (e) => {
			Input.handleInput(e.key, Input.KEYDOWN);
		});
		target.addEventListener('keyup', (e) => Input.handleInput(e.key, Input.KEYUP));

		target.addEventListener('mousemove', function (e) {
			Input.mouse.x = e.clientX - (target.offsetLeft ? target.offsetLeft : 0);
			Input.mouse.y = e.clientY - (target.offsetTop ? target.offsetTop : 0);
			Scene.handleInput('move');
		});
		target.addEventListener('mousedown', function (e) {
			Input.mouse.down = true;
			Scene.handleInput('down');
		});
		target.addEventListener('mouseup', function (e) {
			Input.mouse.down = false;
			Scene.handleInput('up');
		});
		target.addEventListener('dblclick', function (e) {
			Scene.handleInput('dblDown');
		});
	}
}

Input.mouse = {
	'x': 0,
	'y': 0,
	'down': false,
};
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
		this._class = Draggable
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
	constructor() {
		super();
		this._velocity = new Vector2(0, 0);
		this._acceleration = new Vector2(0, 0);
		this._mass = 1;
		this._friction = 1;
		this._maxSpeed = Infinity
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
			this.addForce(this.acceleration);
			if (this.velocity.magnitude > this.maxSpeed) {
				this.velocity.mult(this.maxSpeed / this.velocity.magnitude)
			}
			this.computeFriction();

			this.gameObject.move(this.velocity);
			if (this.update)
				this.update(dt)
		}
	}
}
class Collider extends Component {
	constructor(bound, layer = 0) {
		super();
		this._bound = bound;
		this.worldBound = bound;
		this._layer = layer;
		this.collisions = [];
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
		if (this.layer !== otherCollider.layer) return false;
		if (otherCollider instanceof RectCollider) {
			return this.checkCollisionWithRect(otherCollider)
		} else if (otherCollider instanceof CircleCollider) {
			return this.checkCollisionWithCircle(otherCollider)
		}
	}

	onEnter(otherCollider) {

	}

	onExit(otherCollider) {

	}

	onStay(otherCollider) {

	}

	_onEnter(otherCollider) {
		this.collisions.push(otherCollider);
		this.onEnter(otherCollider);
	}

	_onExit(otherCollider) {
		this.collisions.splice(this.collisions.indexOf(otherCollider), 1);
		this.onExit(otherCollider);
	}

	_onStay(otherCollider) {

	}
}

class RectCollider extends Collider {
	constructor(bound, layer = 0) {
		super(bound, layer);
	}

	addTo(gameObject) {
		super.addTo(gameObject);
		if (this._bound === undefined) {
			this._bound = this.gameObject.transform.rect;
			this.worldBound = this.gameObject.transform.rect;
		}
	}

	checkCollisionWithRect(otherCollider) {
		return Collision.rectIsTouchingRect(this.bound, otherCollider.bound);
	}

	checkCollisionWithCircle(otherCollider) {
		return Collision.rectIsTouchingCircle(this.bound, otherCollider.bound);
	}
}

class CircleCollider extends Collider {
	constructor(bound, layer = 0) {
		super(bound, layer);
	}

	addTo(gameObject) {
		super.addTo(gameObject);
		if (this._bound === undefined) {
			let c = new Circle(gameObject.transform.x, gameObject.transform.y, gameObject.transform.width);
			c.width = c.r;
			c.height = c.r;
			this._bound = c;
			this.worldBound = c;
		}
	}

	checkCollisionWithRect(otherCollider) {
		return Collision.rectIsTouchingCircle(otherCollider.bound, this.bound);
	}

	checkCollisionWithCircle(otherCollider) {
		return Collision.circleIsTouchingCircle(this.bound, otherCollider.bound)
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
		this._class = SpriteRenderer;
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
		if (this.gameObject.enabled && this.enabled) {
			let t = this.gameObject.transform;
			context.save();
			context.scale(t.scale.x, t.scale.y);
			context.translate(position.x + (t.width / 2), position.y + (t.height / 2));
			context.rotate(t.rotation);
			context.translate(-(position.x + (t.width / 2)), -(position.y + (t.height / 2)));
			let bounds = new Rect(position.x, position.y, t.width, t.height);
			this.sprite.draw(context, bounds);
			if (this.borderEnabled === true) {
				SpriteRenderer.drawBorder(context, bounds);
			}
			context.restore() // resets scale
		}
	}
}

class Loadable {
	constructor() {
		this._class = Loadable;
	}

	loaded() {
		return false;
	}

	onLoad() {

	}
}

class Loader {
	constructor() {
		this._class = Loader;
		this._loadedObjects = 0;
		this._loadables = [];
	}

	add(loadable) {
		this._loadables.push(loadable);
		this._totalObjects++;
	}

	set finished(a) {

	}

	get finished() {
		this._loadedObjects = 0;
		for (let i=0; i < this._loadables.length; i++) {
			if (this._loadables[i].loaded()) this._loadedObjects++;
		}
		return this._loadedObjects >= this._loadables.length;
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

class Sprite extends Loadable {
	constructor(imageOrColor, cropRect) {
		super();
		this._class = Sprite;
		if (imageOrColor instanceof Image) {
			this.image = imageOrColor;
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
					transform.x, transform.y, transform.width, transform.height)
			}
		} else if (imageOrColor instanceof Color) {
			this.color = imageOrColor;
			this.draw = function (context, transform) {
				context.fillStyle = this.color.toString();
				context.fillRect(transform.x, transform.y, transform.width, transform.height)
			}
		}
	}

	loaded() {
		if (this.image !== undefined) return this.image.complete;
		return true; // has no image
	}

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

	static loadImage(key, path) {
		let img = new Image();

		img.src = path;
		Sprite.setSprite(key, new Sprite(img));
		return Sprite.getSprite(key);
	}

	set cropRect(cropRect) {
		if (cropRect._class !== Rect)
			console.error('SpriteRenderer cropRect property set to object of type other than Rect');
		this._cropRect = cropRect
	}

	get cropRect() {
		return this._cropRect
	}

	draw(context, position) {

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

			for (const index in this._splitLines) {
				let line = this._splitLines[index];
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
		this._class = Font
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
	constructor(bound, layer, bounciness, slickness, isStatic = true) {
		super(bound, layer);
		this.bounciness = bounciness || 0;
		this.slickness = slickness || 1;
		this.isStatic = isStatic;
	}

	_onEnter(otherCollider) {
		if (otherCollider instanceof PhysicsCollider) {
			/*
			********* EXPERIMENTAL *********
			Collider pushes other on collision

			Not working quite right, when multiple colliders touch
			physics goes wacky

			if (otherCollider.gameObject.getComponent(RigidBody) &&
				otherCollider.isStatic == false) {
					otherCollider.gameObject.getComponent(RigidBody).addForce(
						Vector2.MULT(this.gameObject.getComponent(RigidBody).velocity, 0.1)
					)
			}
			*/

			if (!this.isStatic)
				this.resolveElastic(otherCollider)
		}
		super._onEnter(otherCollider);
	}

	_onExit(otherCollider) {
		super._onExit(otherCollider);
	}

	_onStay(otherCollider) {
		if (!this.isStatic)
				this.resolveElastic(otherCollider)
		super._onStay(otherCollider);
	}

	checkCollisionWith(otherCollider) {
		if (this.layer !== otherCollider.layer) return false;
		if (otherCollider instanceof RectCollider || otherCollider instanceof PhysicsRectCollider) {
			return this.checkCollisionWithRect(otherCollider);
		} else if (otherCollider instanceof CircleCollider || otherCollider instanceof PhysicsCircleCollider) {
			return this.checkCollisionWithCircle(otherCollider);
		}
	}

	resolveElastic(b) {
		let a = this;
		let massA = a.gameObject.getComponent(RigidBody).mass;
		let massB = b.gameObject.getComponent(RigidBody).mass;
		let velA = a.gameObject.getComponent(RigidBody).velocity;
		let velB = b.gameObject.getComponent(RigidBody).velocity;
	  // Calculate relative velocity
	  let rv = Vector2.sub(velB, velA);

	  let normal = Vector2.sub(b.gameObject.transform, this.gameObject.transform);
	 
	  // Calculate relative velocity in terms of the normal direction
	  let velAlongNormal = Vector2.dot( rv, normal )
	 
	  // Do not resolve if velocities are separating
	  if(velAlongNormal > 0) return;

	  // Calculate restitution
	  let e = Math.min( a.bounciness, b.bounciness )
	 
	  // Calculate impulse scalar
	  let j = -(1 + e) * velAlongNormal
	  j /= 1 / massA + 1 / massB
	 
	  // Apply impulse
	  let impulse = Vector2.mult(normal, j);
	  velA.add(Vector2.mult(impulse, -1 / massA))
	  //velB.add(Vector2.mult(impulse, 1 / massB))
	}


	resolveElastic_OLD(otherCollider) {
			let STICKY_THRESHOLD = 0.001;
			// Find the mid points of the entity and player
			let pMidX = this.bound.center.x;
			let pMidY = this.bound.center.y;
			let aMidX = otherCollider.bound.center.x;
			let aMidY = otherCollider.bound.center.y;

			// To find the side of entry calculate based on
			// the normalized sides
			let dx = (aMidX - pMidX) / (otherCollider.bound.width / 2);
			let dy = (aMidY - pMidY) / (otherCollider.bound.height / 2);

			//console.log(otherCollider.gameObject.name)

			// Calculate the absolute change in x and y
			let absDX = Math.abs(dx);
			let absDY = Math.abs(dy);

			let vel = this.gameObject.getComponent(RigidBody).velocity;
			if (Math.abs((this.bound.x - vel.x) - otherCollider.bound.right) < 1) {
				// this left is the same as the right of the collider

				if (Math.abs((this.bound.y - vel.y) - otherCollider.bound.bottom) < 1) {
					// this top left is equal to other bottom right
					//console.log('TL -> BR')
					/*
					if (Math.abs(vel.x) > Math.abs(vel.y)) {
						// goes horizontal
						vel.y *= otherCollider.bounciness
					} else {
						// goes vertical
						vel.x *= otherCollider.bounciness
					}
					*/
					return
				}
				if (Math.abs((this.bound.bottom - vel.y) - otherCollider.bound.y) < 1) {
					// this bottom left is equal to other top right
					//console.log('BL -> TR')
					/*
					if (Math.abs(vel.x) > Math.abs(vel.y)) {
						// goes horizontal
						vel.y *= otherCollider.bounciness
					} else {
						// goes vertical
						vel.x *= otherCollider.bounciness
					}
					*/
					return
				}
			}
			if (Math.abs((this.bound.right - vel.x) - otherCollider.bound.x) < 1) {
				// this right is equal to other left

				if (Math.abs((this.bound.y - vel.y) - otherCollider.bound.bottom) < 1) {
					// this top right is equal to other bottom left
					//console.log('TR -> BL')
					/*
					if (Math.abs(vel.x) > Math.abs(vel.y)) {
						// goes horizontal
						vel.y *= otherCollider.bounciness
					} else {
						// goes vertical
						vel.x *= otherCollider.bounciness
					}
					*/
					return
				}
				if (Math.abs((this.bound.bottom - vel.y) - otherCollider.bound.y) < 1) {
					// this bottom right is equal to other top left
					//console.log('BR -> TL')
					/*
					if (Math.abs(vel.x) > Math.abs(vel.y)) {
						// goes horizontal
						vel.y *= otherCollider.bounciness
					} else {
						// goes vertical
						vel.x *= otherCollider.bounciness
					}
					*/
					return
				}
			}


			// If the distance between the normalized x and y
			// position is less than a small threshold (.1 in this case)
			// then this object is approaching from a corner
			if (Math.abs(absDX - absDY) < 0.02) {
				if (this.gameObject.name == 'player')
				//console.log('corner')


					if (dx < 0) {
						// If the player is approaching from positive X

						if (dy < 0) {
							// If the player is approaching from positive Y
							//this.gameObject.moveTo(new Vector2(
							//	otherCollider.bound.right,
							//	otherCollider.bound.bottom
							//))


						} else {
							// If the player is approaching from negative Y
							//this.gameObject.moveTo(new Vector2(
							//	otherCollider.bound.right,
							//	otherCollider.bound.y - this.bound.height
							//))
						}
						if (Math.abs(vel.x) > Math.abs(vel.y)) {
							// goes horizontal
							//vel.y = 0
						} else {
							// goes vertical
							//vel.x = 0
						}


					} else {
						// If the player is approaching from negative X

						if (dy < 0) {
							// If the player is approaching from positive Y
							this.gameObject.moveTo(new Vector2(
								otherCollider.bound.x - this.bound.width,
								otherCollider.bound.bottom
							))

						} else {
							// If the player is approaching from negative Y
							this.gameObject.moveTo(new Vector2(
								otherCollider.bound.x - this.bound.width,
								otherCollider.bound.y - this.bound.height
							))
						}
						if (Math.abs(vel.x) > Math.abs(vel.y)) {
							// goes horizontal
							vel.y *= -otherCollider.bounciness
						} else {
							// goes vertical
							vel.x *= -otherCollider.bounciness
						}
					}

				// If the object is approaching from the sides
			} else if (absDX > absDY) {
				console.log(this.bound.width)
				//console.log('sides')

				// If the player is approaching from positive X
				if (dx < 0) {
					this.gameObject.moveTo(new Vector2(otherCollider.bound.right, this.gameObject.transform.y))

				} else {
					// If the player is approaching from negative X
					this.gameObject.moveTo(new Vector2(otherCollider.bound.x - this.bound.width, this.gameObject.transform.y))
				}

				// Velocity component

				vel.x *= -otherCollider.bounciness;
				vel.y *= otherCollider.slickness;

				if (Math.abs(this.gameObject.getComponent(RigidBody).velocity.x) < STICKY_THRESHOLD) {
					vel.x = 0;
				}

				// If this collision is coming from the top or bottom
			} else {
				console.log('top')

				// If the player is approaching from positive Y
				if (dy < 0) {
					this.gameObject.moveTo(new Vector2(this.gameObject.transform.x, otherCollider.bound.bottom));

				} else {
					// If the player is approaching from negative Y
					this.gameObject.moveTo(new Vector2(this.gameObject.transform.x, otherCollider.bound.y - this.bound.height - 1));
				}

				// Velocity component
				vel.y *= -otherCollider.bounciness;
				vel.x *= otherCollider.slickness;

				if (Math.abs(vel.y) < STICKY_THRESHOLD) {
					vel.y = 0;
				}
			}
		}
}

class PhysicsRectCollider extends PhysicsCollider {
	constructor(bound, layer, bounciness, stickiness, isStatic) {
		super(bound, layer, bounciness, stickiness, isStatic);
	}

	checkCollisionWithRect(otherCollider) {
		return Collision.rectIsTouchingRect(this.bound, otherCollider.bound);
	}

	checkCollisionWithCircle(otherCollider) {
		return Collision.rectIsTouchingCircle(this.bound, otherCollider.bound);
	}
}

class PhysicsCircleCollider extends PhysicsCollider {
	constructor(bound, layer, bounciness, stickiness, isStatic) {
		super(bound, layer, bounciness, stickiness, isStatic);
	}

	checkCollisionWithRect(otherCollider) {
		return Collision.rectIsTouchingCircle(otherCollider.bound, this.bound);
	}

	checkCollisionWithCircle(otherCollider) {
		return Collision.circleIsTouchingCircle(this.bound, otherCollider.bound);
	}
}
class PhysicsEngine {
	static update(dt) {
		for (const index in PhysicsEngine.rigidbodies) {
			if (PhysicsEngine.rigidbodies[index].enabled === true) {
				PhysicsEngine.rigidbodies[index]._update(dt)
			}
		}

		for (const index1 in PhysicsEngine.colliders) {
			let coll1 = PhysicsEngine.colliders[index1];
			if (coll1.enabled === false || coll1.gameObject.enabled === false) continue;
			for (const index2 in PhysicsEngine.colliders) {
				if (coll1.enabled === false || coll1.gameObject.enabled === false) break;
				let coll2 = PhysicsEngine.colliders[index2];

				if (coll2.enabled === true && coll2.gameObject.enabled === true && coll1 !== coll2) {
					if (coll1.checkCollisionWith(coll2)) {
						if (coll1.collisions.indexOf(coll2) >= 0) {
							coll1._onStay(coll2);
							console.log('staying')
						} else {
							coll1._onEnter(coll2);
						}
					} else {
						if (coll1.collisions.indexOf(coll2) >= 0) {
							coll1._onExit(coll2);
						}
					}
				}
			}
		}
	}
}

PhysicsEngine.rigidbodies = [];
PhysicsEngine.colliders = [];
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
		for (const index in PhysicsEngine.colliders) {
			let coll = PhysicsEngine.colliders[index];
			if ((this.mask & coll.layer) === 0) continue; // use the bitmask to filter
			let points = [];
			if (coll.bound instanceof Rect) {
				for (const edge in coll.bound.edges) {
					let intersect = Collision.lineIntersectsLine(this.rayToLine, coll.bound.edges[edge]);
					if (intersect)
						points.push(intersect)
				}
			} else if (coll.bound instanceof Circle) {
				let intersect = Collision.lineIntersectsCircle(this.rayToLine, coll.bound.edges[edge]);
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

/*
 *	Things needed in a network:
 *		* Server
 *		* Clients
 *		* Ability to send data to server from clients
 *		* Ability to send data from server to clients
 *		* Ability to differentiate clients
 *		* Ability to turn sent data to Objects/meaningful data
 *		* Tick rate
 *		* Server Broadcast
 *		* Server can send to specific client
 *
 */


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
	'Collision': Collision,
	'Scene': Scene,
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
	'Loadable': Loadable,
	'Loader': Loader,
	'Sprite': Sprite,
	'CircleSprite': CircleSprite,
	'TextRenderer': TextRenderer,
	'Font': Font,
	'PhysicsCollider': PhysicsCollider,
	'PhysicsRectCollider': PhysicsRectCollider,
	'PhysicsCircleCollider': PhysicsCircleCollider,
	'PhysicsEngine': PhysicsEngine,
	'RaycastPoint': RaycastPoint,
	'Raycast': Raycast,
	'Parallax': Parallax
}