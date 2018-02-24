class Color {
	constructor (r, g, b, a) {
		if (typeof r == 'string') {
			switch (r) {
				case 'white':
					this.r = 255
					this.g = 255
					this.b = 255
					break
				case 'black':
					this.r = 0
					this.g = 0
					this.b = 0
					break
				case 'gray':
				case 'grey':
					this.r = 180
					this.g = 180
					this.b = 180
					break
				case 'red':
					this.r = 255
					this.g = 0
					this.b = 0
					break
				case 'blue':
					this.r = 0
					this.g = 0
					this.b = 255
					break
				case 'green':
					this.r = 0
					this.g = 255
					this.b = 0
					break
				case 'purple':
					this.r = 255
					this.g = 0
					this.b = 255
					break
				case 'teal':
					this.r = 0
					this.g = 255
					this.b = 255
					break
				case 'yellow':
					this.r = 255
					this.g = 255
					this.b = 0
					break
				case 'orange':
					this.r = 255
					this.g = 165
					this.b = 0
					break
				case 'brown':
					this.r = 139
					this.g = 69
					this.b = 19
					break
			}
			this.a = 1
			return
		}
		this.r = r
		this.g = g
		this.b = b
		this.a = a || 1
	}
	get r () {
		return this._r
	}
	get g () {
		return this._g
	}
	get b () {
		return this._b
	}
	get a () {
		return this._a
	}

	set r (r) {
		if (r < 0) r = 0;
		else if (r > 255) r = 255;
		if (r == undefined) console.error("A Color's r property has been set to undefined")
		this._r = r
	}
	set g (g) {
		if (g < 0) g = 0;
		else if (g > 255) g = 255;
		if (g == undefined) console.error("A Color's g property has been set to undefined")
		this._g = g
	}
	set b (b) {
		if (b < 0) b = 0;
		else if (b > 255) b = 255;
		if (b == undefined) console.error("A Color's b property has been set to undefined")
		this._b = b
	}
	set a (a) {
		if (a < 0.0) a = 0.0;
		else if (a > 1.0) a = 1.0;
		if (a == undefined) console.error("A Color's a property has been set to undefined")
		this._a = a
	}

	toString () {
		return 'rgba('+this.r+','+this.g+','+this.b+','+this.a+')'
	}

	static get BLACK () {
		return new Color('black')
	}
	static get WHITE () {
		return new Color('white')
	}
	static get RED () {
		return new Color('red')
	}
	static get GREEN () {
		return new Color('green')
	}
	static get BLUE () {
		return new Color('blue')
	}
	static get GRAY () {
		return new Color('gray')
	}
	static get PURPLE () {
		return new Color('purple')
	}
	static get YELLOW () {
		return new Color('yellow')
	}
	static get ORANGE () {
		return new Color('orange')
	}
	static get TEAL () {
		return new Color('teal')
	}
	static get BROWN () {
		return new Color('brown')
	}

}
class Vector2 {
	constructor (x, y) {
		this._x = x || 0
		this._y = y || 0
		this._class = Vector2
	}
	get x () {
		return this._x
	}
	get y () {
		return this._y
	}

	set x (x) {
		this._x = x
	}
	set y (y) {
		this._y = y
	}

	get magnitudeSquared () {
		return (this.x*this.x) + (this.y*this.y)
	}

	get magnitude () {
		return Math.sqrt((this.x*this.x) + (this.y*this.y))
	}
	get normalized () {
		return Vector2.div(this, this.magnitude)
	}

	add (vector2) {
		this.x += vector2.x
		this.y += vector2.y
		return this
	}
	set (vector2) {
		this.x = vector2.x
		this.y = vector2.y
		return this
	}

	equals (vector2) {
		return this.x == vector2.x &&
				this.y == vector2.y
	}

	mult (k) {
		if (k instanceof Vector2) {
			this.x *= k.x
			this.y *= k.y
		} else if (!isNaN(k)) {
			this.x *= k
			this.y *= k
		}
		return this
	}

	lerp (destination, t) {
		if (t > 1) t = 1
		if (t < 0) t = 0
		var result = new Vector2(0,0)
		result.x = this.x + ((destination.x - this.x) * t)
		result.y = this.y + ((destination.y - this.y) * t)
		return result
	}

	static sub (a, b) {
		return new Vector2(a.x-b.x, a.y-b.y)
	}
	static add (a, b) {
		return new Vector2(a.x+b.x, a.y+b.y)
	}
	static mult (a, b) {
		if (typeof k == 'object' && k._class == Vector2) {
			return new Vector2(a.x*b.x, a.y*b.y)
		}
		return new Vector2(a.x*b, a.y*b)
		
	}
	static div (a, b) {
		if (typeof k == 'object' && k._class == Vector2) {
			return new Vector2(a.x/b.x, a.y/b.y)
		}
		return new Vector2(a.x/b, a.y/b)
	}
	static zero () {
		return new Vector2(0,0)
	}

	copy () {
		return new Vector2(this.x, this.y)
	}

	toVector3 () {
		return new Vector3(this.x, this.y, 0)
	}
	toVector2 () {
		return this
	}

}
class Vector3 extends Vector2 {
	constructor (x, y, z) {
		super (x, y)
		this.z = z || 0
		this._class = Vector3
	}

	get z () {
		return this._z
	}
	set z (z) {
		this._z = z
	}

	get magnitude () {
		return Math.cbrt((this.x*this.x) + (this.y*this.y) + (this.z*this.z))
	}
	get normalized () {
		return Vector3.DIV(this, this.magnitude)
	}

	add (vector3) {
		this.x += vector3.x
		this.y += vector3.y
		this.z += (vector3.z || 0)
		return this
	}

	set (vector3) {
		this.x = vector3.x
		this.y = vector3.y
		this.z = (vector3.z || this.z)
		return this
	}

	sub (vector3) {
		this.x -= vector3.x
		this.y -= vector3.y
		this.z -= (vector3.z || 0)
		return this
	}

	mult (k) {
		if (typeof k == 'object' && k._class == Vector3) {
			this.x *= vector3.x
			this.y *= vector3.y
			this.z *= vector3.z
		} else if (!isNaN(k)) {
			this.x *= k
			this.y *= k
			this.z *= k
		}
		return this
	}

	equals (vector3) {
		return super.equals(vector3) && this.z == vector3.z
	}

	toVector2 () {
		return new Vector2(this.x, this.y)
	}

	copy () {
		return new Vector3(this.x, this.y, this.z)
	}

	static sub (a, b) {
		return new Vector3(a.x-b.x, a.y-b.y, a.z-(b.z || 0))
	}
	static add (a, b) {
		return new Vector3(a.x+b.x, a.y+b.y, a.z+(b.z || 0))
	}
	static mult (a, b) {
		if (typeof k == 'object' && k._class == Vector3) {
			return new Vector3(a.x*b.x, a.y*b.y, a.z*(b.z || 1))
		}
		return new Vector3(a.x*b, a.y*b, a.z*b)
		
	}
	static div (a, b) {
		if (typeof k == 'object' && k._class == Vector3) {
			return new Vector3(a.x/b.x, a.y/b.y, a.z/(b.z || 1))
		}
		return new Vector3(a.x/b, a.y/b, a.z/b)
	}
	static zero () {
		return new Vector3(0,0,0)
	}
}
class Transform extends Vector3 {
	constructor (x, y, z, width, height) {
		super (x, y, z)

		this._width = width || 1
		this._height = height || 1
		this._rect = new Rect(x,y,width,height)
		this._rotation = 0
		this._scale = new Vector2(1,1)
		this._class = Transform
	}
	get width () {
		return this._width
	}
	get height () {
		return this._height
	}

	set scale (scale) {
		this._scale = scale
	}
	get scale () {
		return this._scale
	}

	get rect () {
		this._rect.x = this.x
		this._rect.y = this.y
		this._rect.width = this.width
		this._rect.height = this.height
		return this._rect
	}

	set width (width) {
		this._width = width
	}
	set height (height) {
		this._height = height
	}

	get rotation () {
		return this._rotation
	}

	set rotation (r) {
		this._rotation = r
	}

	add (vector3) {
		super.add(vector3)
		return this
	}
	sub (vector3) {
		super.sub(vector3)
		return this
	}

	rotateTowards (angle, t) {
		if (t > 1) t = 1
		if (t < 0) t = 0
		var a = angle % (Math.PI*2)
		var PI2 = Math.PI*2
		if (this.rotation - a > Math.PI) {
			this.rotation = Math.abs((this.rotation + (a - (this.rotation - PI2)) * t) % PI2)
		} else if (this.rotation - a < -Math.PI) {
			this.rotation = (this.rotation + (a - (this.rotation + PI2)) * t) % PI2
			if (this.rotation < 0) {
				this.rotation += PI2
			}
		} else {
			this.rotation = Math.abs((this.rotation + (a - this.rotation) * t) % PI2)
		}
	}

	copy () {
		return new Transform(this.x, this.y, this.z, this.width, this.height)
	}
	static zero () {
		return new Transform(0,0,0,0,0)
	}

}
class Circle extends Vector2 {
	constructor(x, y, r) {
		super(x, y)
		this.r = r
	}
}
class Line {
	constructor(p1, p2) {
		this.start = p1
		this.end = p2
	}
}
class Rect extends Vector2 {
	constructor (x, y, width, height) {
		super (x, y)
		this._width = width
		this._height = height
		this._class = Rect
	}
	get width () {
		return this._width
	}
	get height () {
		return this._height
	}
	get center () {
		return new Vector2(this.x + this.width/2, this.y + this.height/2)
	}
	get right () {
		return this.x + this.width
	}
	get bottom () {
		return this.y + this.height
	}

	get edges () {
		return {
			'top': new Line(new Vector2(this.x, this.y), new Vector2(this.right, this.y)),
			'right': new Line(new Vector2(this.right, this.y), new Vector2(this.right, this.bottom)),
			'bottom': new Line(new Vector2(this.x, this.bottom), new Vector2(this.right, this.bottom)),
			'left': new Line(new Vector2(this.x, this.y), new Vector2(this.x, this.bottom))
		}
	}

	set width (width) {
		this._width = width
	}
	set height (height) {
		this._height = height
	}
	equals (rect) {
		return 	this.x == rect.x &&
				this.y == rect.y &&
				this.w == rect.w &&
				this.h == rect.h
	}
	toVector2 () {
		return new Vector2(this.x, this.y)
	}
	copy () {
		return new Rect(this.x, this.y, this.width, this.height)
	}
}
class Container {
	constructor (transform) {
		this._transform = transform
		this._children = []
		this._parent = null
		this._enabled = true
		this._flattened = []
		this._class = Container
	}

	get transform () {
		return this._transform
	}
	get children () {
		return this._children
	}
	get parent () {
		return this._parent
	}
	get flattened () {
		return this._flattened
	}
	get enabled () {
		return this._enabled
	}
	get localPosition () {
		return Vector3.sub(this.transform, this.parent.transform)
	}
	get absolutePosition () {
		return this.transform
	}

	set localPosition (position) {
		this.moveTo(Vector3.add(this.parent.transform, position))
	}

	set transform (transform) {
		this._transform = transform
	}

	set enabled (enabled) {
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
	 * @param      {<Container>}  child   The child to be added to the container
	 */
	add (child) {
		if (child != this && child.parent == null) { // child is not this, child is an orphan
			child._parent = this
			this.children.push(child)
			this.addToFlattened(child)

			for (const index in child.flattened) {
				this.addToFlattened(child.flattened[index])
			}
		}
		return this
	}

	/**
	 * Removes a given child from the container. In doing so, each of the child's
	 * descendants are removed from the container's (and its parent's) flattened
	 * array.
	 *
	 * @param      {<Container>}   child   The child to be removed from the container
	 * @return     {boolean}  { True if child is found, False otherwise }
	 */
	remove (child) {
		var index = this.children.indexOf(child)
		if (index < 0) {
			return false
		}
		this.children.splice(index, 1)
		this.removeFromFlattened(child)
		for (const index in child.flattened) {
			this.removeFromFlattened(child.flattened[index])
		}
		child._parent = null
		return true
	}

	/**
	 * Removes all children from this container. In doing so, all descendants are
	 * removed from this container as well as any parents.
	 */
	removeAll () {
		if (this.parent != null && typeof this.parent.removeFromFlattened == 'function') {
			for (const index in this.flattened) {
				this.parent.removeFromFlattened(this.flattened[index])
			}
			for (const index in this.children) {
				this.children[index]._parent = null
			}
		}
		this._children = []
		this._flattened = []
	}

	/**
	 * Determines if this container has a given child.
	 *
	 * @param      {<Container>}   child   The child to be searched for
	 * @return     {boolean}  True if has child, False otherwise.
	 */
	hasChild (child) {
		return this.children.indexOf(child) >= 0
	}

	/**
	 * Determines if this container has a given descendant (either a child,
	 * grandchild, etc.).
	 *
	 * @param      {<Container>}   child   The child to be searched for
	 * @return     {boolean}  True if has descendant, False otherwise.
	 */
	hasDescendant (child) {
		return this.flattened.indexOf(child) >= 0
	}

	/**
	 * Adds to the descendant (flattened) array. To add an element to this
	 * container, use the add(child) method which in turn calls this method.
	 * This method should not be explicitly called from outside of this class.
	 *
	 * @param      {<Container>}  child   The child to be added
	 */
	addToFlattened (child) {
		this.flattened.push(child)
		if (this.parent != null && typeof this.parent.addToFlattened == 'function') {
			this.parent.addToFlattened(child)
		}
	}

	/**
	 * Removes a descendant from the descendant (flattened) array. To remove an element
	 * from this container, use the remove(child) method which in turn calls this method.
	 * This method should not be explicitly called from outside of this class.
	 *
	 * @param      {<Container>}  child   The child to be removed
	 */
	removeFromFlattened (child) {
		this.flattened.splice(this.flattened.indexOf(child), 1)
		if (this.parent != null && typeof this.parent.removeFromFlattened == 'function') {
			this.parent.removeFromFlattened(child)
		}
	}

	/**
	 * Moves the element and each of its descendants in a given direction.
	 *
	 * @param      {<Vector3>}  vector3  The Vector3 to be added to the Transforms
	 */
	move (vector3) {
		this.transform.add(vector3)
		for (const index in this.flattened) {
			this.flattened[index].transform.add(vector3)
		}
	}

	/**
	 * Moves the element to a specific position, then moves each descendant
	 * to their position relative to their parents.
	 *
	 * @param      {<Vector3>}  vector3  The position to move to
	 */
	moveTo (vector3) {
		var positionDifference = Vector3.sub(vector3, this.transform)
		this.transform.set(vector3)
		for (const index in this.flattened) {
			this.flattened[index].transform.set(Vector3.add(this.flattened[index].transform, positionDifference))
		}
	}

	moveCenterTo (vector3) {
		var adjustedPos = Vector2.sub(vector3, new Vector2(this.transform.width/2, this.transform.height/2))
		var positionDifference = Vector3.sub(adjustedPos, this.transform)
		this.transform.set(adjustedPos)
		for (const index in this.flattened) {
			this.flattened[index].transform.set(Vector3.add(this.flattened[index].transform, positionDifference))
		}
	}

	moveTowards (destination, t) {
		this.moveTo(this.transform.lerp(destination, t))
	}
}
class GameObject extends Container {
	constructor (transform, isUI) {
		super(transform)
		GameObject.gameObjects.push(this)
		this.isUI = isUI || false
		this.components = []
	}
	get rotation () {
		return this.transform.rotation
	}
	set rotation (rotation) {
		var difference = rotation - this.transform.rotation
		this.transform.rotation = rotation
		for (const index in this._flattened) {
			this._flattened[index].rotation += difference
		}
	}
	rotateTowards (angle, t) {
		var difference = angle - this.transform.rotation
		this.transform.rotateTowards(angle, t)
		for (const index in this._flattened) {
			this._flattened[index].rotateTowards(this._flattened.transform.rotation + difference, t)
		}
	}
	addComponent (comp) {
		for (const index in this.components) {
			var c = this.components[index]
			if (c instanceof comp.constructor) {
				console.error("GameObject already has a component of type: "+comp.constructor)
				return
			}
		}
		this.components.push(comp)
		comp.addTo(this)
	}
	removeComponent (compType) {
		for (const index in this.components) {
			if (this.components[index] instanceof compType) {
				Scene.removeInputComponent(this.components[index])
				this.components.splice(index, 1)
				return
			}
		}
	}
	getComponent (compType) {
		for (const index in this.components) {
			var c = this.components[index]
			if (c instanceof compType) {
				return c
			}
		}
		return null
	}
	update (dt) {

	}
	_update (dt) {
		this.update(dt)
	}
	static update (dt) {
		for (const index in GameObject.gameObjects) {
			GameObject.gameObjects[index]._update(dt)
		}
	}
}
GameObject.gameObjects = []
class Component {
	constructor () {
		this.gameObject = null
	}

	addTo (gameObject) {
		this.gameObject = gameObject
	}
	removeFrom (gameObject) {
		this.gameObject = null
	}
}

class Scene {
	constructor () {
		this._children = []
	}

	get children () {
		return this._children
	}


	add (child) {
		if (child != this && child.parent == null) {
			this.children.push(child)
			child._parent = this
		}
	}

	remove (child) {
		var index = this.children.indexOf(child)
		if (index < 0) {
			return false
		}
		this.children.splice(index, 1)
		child.parent = null
		return true
	}

	hasChild (child) {
		return this.children.indexOf(child) >= 0
	}

	hasDescendant (child, children) {
		/*
			1. check if child is a direct child of this Container
			2. if it is not, then for each child of this Container check if
			the child we want to find is a direct child of the one in the loop
			3. this will then keep recuring deeper into the heirarchy until the
			child is found or the end of the family tree is reached
		*/
		children = children || this.children
		if (children[0].parent.hasChild(child))
			return true
		for (const index in this.children) {
			var ch = children[index]
			if (ch.children) { // make sure it is able to have children
				if (ch.children.length > 0) {
					if (this.hasDescendant(child, ch.children)) { // if it does, run this again with this child as the parent
						return true
					}
				}
			}
		}
		return false
	}

	getFlattened () {
		var flattenedChildren = this.children
		for (const index in this.children) {
			flattenedChildren = flattenedChildren.concat(this.children[index].flattened)
		}
		return flattenedChildren
	}

	draw (context, camera) {
		camera.draw(context, this.getFlattened())
	}

	static addInputComponent (component) {
		Scene.inputComponents.push(component)
	}
	static removeInputComponent (component) {
		var index = Scene.inputComponents.indexOf(component)
		if (index < 0) return
		Scene.inputComponents.splice(index, 1)
	}

	handleInput (type, mouse) {
		for (const index in Scene.inputComponents) {
			var comp = Scene.inputComponents[index]
			if (comp.gameObject.enabled) {
				if (type == 'move') {
					if (comp.isDragged) {
						comp._onDrag(mouse)
						break
					}
				} else if (type == 'down') {
					if (Collision.pointIsInRect(mouse, comp.gameObject.transform)) {
						comp._onClick(mouse)
						break
					}
				} else if (type == 'up') {
					if (comp.isDragged) {
						comp._onRelease(mouse)
						break
					}
				}
			}
		}
	}
}
Scene.inputComponents = []
class InputKey {
	constructor (name) {
		this.name 		= name
		this.down 		= false
		//this.up 		= false
		//this.pressed 	= false
	}
}
class InputEngine {
	static handleInput (key, inputType) {
		if (InputEngine.keys[key] == undefined) {
			InputEngine.keys[key] = new InputKey(key)
		}
		if (inputType == 'keyDown') {
			InputEngine.keys[key].down = true
			//InputEngine.keys[key].pressed = true
		} else if (inputType == 'keyUp') {
			//InputEngine.keys[key].up = true
			InputEngine.keys[key].down = false
		}
	}
	static getKeyPressed (key) {
		//return InputEngine.keys[key].pressed
	}
	static getKeyDown (key) {
		return InputEngine.keys[key].down ? 1 : 0
	}
	static getKeyUp (key) {
		//return InputEngine.keys[key].up
	}
}
InputEngine.SPACE = ' '
InputEngine.keys = {
	'q': new InputKey('q'),
	'w': new InputKey('w'),
	'e': new InputKey('e'),
	'r': new InputKey('r'),
	't': new InputKey('t'),
	'y': new InputKey('y'),
	'u': new InputKey('u'),
	'i': new InputKey('i'),
	'o': new InputKey('o'),
	'p': new InputKey('p'),
	'a': new InputKey('a'),
	's': new InputKey('s'),
	'd': new InputKey('d'),
	'f': new InputKey('f'),
	'g': new InputKey('g'),
	'h': new InputKey('h'),
	'j': new InputKey('j'),
	'k': new InputKey('k'),
	'l': new InputKey('l'),
	';': new InputKey(';'),
	"'": new InputKey("'"),
	'z': new InputKey('z'),
	'x': new InputKey('x'),
	'c': new InputKey('c'),
	'v': new InputKey('v'),
	'b': new InputKey('b'),
	'n': new InputKey('n'),
	'm': new InputKey('m'),
	',': new InputKey(','),
	'.': new InputKey('.'),
	'/': new InputKey('/'),
	'1': new InputKey('1'),
	'2': new InputKey('2'),
	'3': new InputKey('3'),
	'4': new InputKey('4'),
	'5': new InputKey('5'),
	'6': new InputKey('6'),
	'7': new InputKey('7'),
	'8': new InputKey('8'),
	'9': new InputKey('9'),
	'0': new InputKey('0'),
	'-': new InputKey('-'),
	'=': new InputKey('='),
	'`': new InputKey('`'),
	'Escape': new InputKey('Escape'),
	'Shift': new InputKey('Shift'),
	[InputEngine.SPACE]: new InputKey(InputEngine.SPACE),
	'Enter': new InputKey('Enter'),
	'Meta': new InputKey('Meta'),
	'Tab': new InputKey('Tab'),


}


class Collision {
	static pointIsInRect (point, rect) {
		if ([point.x, point.y, rect.x, rect.y, rect.width, rect.height].indexOf(undefined) > -1) {
			console.error("Needed properties were missing when trying to calculate collision")
		}
		var w = rect.width
		var h = rect.height
		return point.x >= rect.x && point.x <= rect.x + w &&
			point.y >= rect.y && point.y <= rect.y + h
	}
	static pointIsInCircle (point, circle) {
		if ([point.x, point.y, circle.x, circle.y, circle.radius].indexOf(undefined) > -1) {
			console.error("Needed properties were missing when trying to calculate collision")
		}
		var r = circle.radius
		if (r == undefined) console.error('radius not found on: ', circle)
		return Math.sqrt(((point.x - circle.x) * (point.x - circle.x)) +
			((point.y - circle.y) * (point.y - circle.y))) < r
	}
	static rectIsTouchingRect (rectA, rectB) {
		if ([rectA.x, rectA.y, rectA.width, rectA.height, rectB.x, rectB.y, rectB.width, rectB.height].indexOf(undefined) > -1) {
			console.error("Needed properties were missing when trying to calculate collision")
		}
		var wA = rectA.width
		var hA = rectA.height
		var wB = rectB.width
		var hB = rectB.height

		if ([wA, hA].indexOf(undefined) > -1) console.error('width or height not found on: ', rectA)
		if ([wB, hB].indexOf(undefined) > -1) console.error('width or height not found on: ', rectB)
		
		if (rectA.x + wA >= rectB.x && rectA.x <= rectB.x + wB &&
			rectA.y + hA >= rectB.y && rectA.y <= rectB.y + hB) {

			var x_overlap = Math.max(0, Math.min(rectA.right, rectB.right) - Math.max(rectA.x, rectB.x))
			var y_overlap = Math.max(0, Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.y, rectB.y))
			return new Vector2(x_overlap, y_overlap)
		}
		return false
		
	}
	static lineIntersectsCircle (line, circle) {
		var A = line.start
		var B = line.end
		var C = circle
		var R = circle.r
		// compute the euclidean distance between A and B
		var LAB = Math.sqrt( (B.x-A.x)*(B.x-A.x) + (B.y-A.y)*(B.y-A.y) )

		// compute the direction vector D from A to B
		var D = new Vector2((B.x-A.x) / LAB, (B.y-A.y) / LAB)

		// Now the line equation is x = D.x*t + Ax, y = D.y*t + Ay with 0 <= t <= 1.

		// compute the value t of the closest point to the circle center (Cx, Cy)
		var t = D.x*(C.x-A.x) + D.y*(C.y-A.y)    

		// This is the projection of C on the line from A to B.

		// compute the coordinates of the point E on line and closest to C
		var E = new Vector2(t*D.x+A.x, t*D.y+A.y)

		// compute the euclidean distance from E to C
		var LEC = Math.sqrt( (E.x-C.x)*(E.x-C.x) + (E.y-C.y)*(E.y-C.y) )

		// test if the line intersects the circle
		if( LEC < R )
		{
			// compute distance from t to circle intersection point
			dt = Math.sqrt( (R*R) - (LEC*LEC))

			// compute first intersection point
			var F = new Vector2((t-dt)*D.x + A.x, (t-dt)*D.y + A.y)

			// compute second intersection point
			var G = new Vector2( (t+dt)*D.x + A.x, (t+dt)*D.y + A.y)
			return [F, G]
		}

		// else test if the line is tangent to circle
		else if( LEC == R )
			// tangent point to circle is E
			return [E]

		else
			// line doesn't touch circle
			return false
	}
	static getLineIntersection (lineA, lineB) {
		var dvA = Vector2.sub(lineA.end, lineA.start)
		var dvB = Vector2.sub(lineB.end, lineB.start)
		var s, t;
		s = (-dvA.y * (lineA.start.x - lineB.start.x) + dvA.x * (lineA.start.y - lineB.start.y)) / (-dvB.x * dvA.y + dvA.x * dvB.y);
		t = ( dvB.x * (lineA.start.y - lineB.start.y) - dvB.y * (lineA.start.x - lineB.start.x)) / (-dvB.x * dvA.y + dvA.x * dvB.y);
		if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
			// Collision detected
			var intX = lineA.start.x + (t * dvA.x);
			var intY = lineA.start.y + (t * dvA.y);
			return Vector2.add(lineA.start, Vector2.mult(dvA, t))
		}
		return null
		// No collision
	}
	static rectIsTouchingCircle (rect, circle) {
		return Collision.pointIsInRect(circle, rect) ||
			Collision.lineIntersectsCircle(
				new Line(
					new Vector2(rect.x,rect.y),
					new Vector2(rect.x+rect.width, rect.y)
				), circle) ||
			Collision.lineIntersectsCircle(
				new Line(
					new Vector2(rect.x+rect.width, rect.y),
					new Vector2(rect.x+rect.width, rect.y+rect.height)
				), circle) ||
			Collision.lineIntersectsCircle(
				new Line(
					new Vector2(rect.x+rect.width, rect.y+rect.height),
					new Vector2(rect.x, rect.y+rect.height)
				), circle) ||
			Collision.lineIntersectsCircle(
				new Line(
					new Vector2(rect.x,rect.y+rect.height),
					new Vector2(rect.x, rect.y)
				), circle)
	}
}
class TextRenderer extends Component {
	constructor (text, font) {
		super()
		this._lines = []
		this.text = text || ""
		this.font = font || new Font("Arial", 16, Color.BLACK, 'left', 'bottom')
	}

	get text () {
		return this._text
	}
	get font () {
		return this._font
	}

	set text (text) {
		this._text = text.toString()
		this._lines = this._text.split("\n")
	}
	set font (font) {
		this._font = font
	}

	draw (context, transform) {
		if (this.gameObject.enabled) {
			context.font = this.font
			context.fillStyle = this.font.color
			context.textAlign = this.font.alignment
			var vAlign = 0
			var hAlign = 0

			if (this.font.vertAlignment == 'center') 		// set vAlign to the center of the gameObject
				vAlign = (this.gameObject.transform.height / 2) + (this.font.size / 2)
			else if (this.font.vertAlignment == 'bottom') 	// set vAlign to the bottom of gameObject
				vAlign = this.gameObject.transform.height

			if (this.font.alignment == 'center') 			// set hAlign to center of the gameObject
				hAlign = this.gameObject.transform.width/2
			else if (this.font.alignment == 'right') 		// set hAlign to the right of the gameObject
				hAlign = this.gameObject.transform.width

			for (const index in this._lines) {
				context.fillText(this._lines[index], transform.x + hAlign, transform.y + vAlign + (index * this.font.size))
			}
		}
	}
}
class Font {
	constructor (name, size, color, alignment, vertAlignment) {
		this._name 			= name 			|| 'Arial'
		this._size 			= size 			|| 12
		this._color 		= color 		|| new Color(0,0,0,1)
		this._alignment 	= alignment 	|| 'left'
		this._vertAlignment = vertAlignment || 'top'
		this._class 		= Font
	}

	get name () {
		return this._name
	}
	get size () {
		return this._size
	}
	get color () {
		return this._color
	}
	get alignment () {
		return this._alignment
	}
	get vertAlignment () {
		return this._vertAlignment
	}

	set name (name) {
		this._name = name
	}
	set size (size) {
		this._size = size
	}
	set color (color) {
		this._color = color
	}
	set alignment (alignment) {
		this._alignment = alignment
	}
	set vertAlignment (vertAlignment) {
		this._vertAlignment = vertAlignment
	}

	toString () {
		return this.size + "px " + this.name
	}
}
class Button extends Component {
	constructor () {
		super()
		Scene.addInputComponent(this)
		this._class = Button
	}

	onClick (point) {

	}

	onRelease (point) {

	}

	_onClick (point) {
		this.onClick()
	}

	_onRelease (point) {
		this.onRelease()
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
	constructor (viewport, scale) {
		super()
		this.viewport 	= viewport
		this._scale 	= scale
		this._class 	= Camera
	}

	get viewport () {
		return this._viewport
	}
	get scale () {
		return this._scale
	}

	set viewport (viewport) {
		this._viewport = viewport
	}

	worldToScreenPosition (elementTransform) {
		return Vector2.sub(elementTransform.toVector2(), this.viewport.toVector2())
	}
	screenToWorldPosition (elementTransform) {
		return Vector2.add(elementTransform.toVector2(), this.viewport.toVector2())
	}

	draw (context, elements) {
		var sortedElements = elements.splice(0).sort(function(a, b) {return a.transform.z - b.transform.z})
		for (const index in sortedElements) {
			var el = sortedElements[index]
			for (const index in el.components) {
				var comp = el.components[index]
				if (comp.draw && comp instanceof Camera == false) {
					if (el.isUI) {
						if (Collision.rectIsTouchingRect(
							el.transform,
							new Rect(0,0, this.viewport.width, this.viewport.height)
						)) {
							comp.draw(context, el.transform)
						}
					} else {
						if (Collision.rectIsTouchingRect(el.transform, this.viewport)) {
							var screenPos = this.worldToScreenPosition(el.transform)
							comp.draw(context, screenPos)
						}
					}
				}
			}
		}
	}
}
class Draggable extends Button {
	constructor () {
		super()
		this._isDragged 				= false
		this._originalPosition 			= new Vector2(0,0)
		this._distanceFromClickPoint 	= new Vector2(0, 0)
		this._class 					= Draggable
	}

	get isDragged () {
		return this._isDragged
	}
	get originalPosition () {
		return this._originalPosition
	}

	set originalPosition (newPosition) {
		this._originalPosition = newPosition
	}

	addTo (gameObject) {
		super.addTo(gameObject)
		this._originalPosition = new Vector2(gameObject.transform.x, gameObject.transform.y)
	}

	onDrag (point) {

	}

	_onClick (point) {
		this._distanceFromClickPoint.x = this.gameObject.transform.x - point.x
		this._distanceFromClickPoint.y = this.gameObject.transform.y - point.y
		this._isDragged = true
		this.onClick(point)
	}

	_onDrag (point) {
		this.gameObject.moveTo(new Vector3(point.x + this._distanceFromClickPoint.x, point.y + this._distanceFromClickPoint.y, this.gameObject.transform.z))
		this.onDrag(point)
	}

	_onRelease (point) {
		this._isDragged = false
		this.onRelease(point)
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
	constructor (frameRate) {
		super()
		Animator.animators.push(this)
		this.frameRate = frameRate
		this.frameCounter = 0
		this.frame = 0
		this.animations = {}
		this._animation = null
	}

	set animation (key) {
		this._animation = this.animations[key]
		this.frameCounter = 0
		this.frame = 0
		this.gameObject.getComponent(SpriteRenderer).sprite = this.animation.frames[this.frame]
	}
	get animation () {
		return this._animation
	}

	addAnimation (key, animation) {
		this.animations[key] = animation
	}

	removeAnimation (key) {
		delete this.animations[key]
	}
	update (dt) {

	}
	_update (dt) {
		if (this.animation == null) return
		this.frameCounter ++
		if (this.frameCounter % this.frameRate == 0) {
			this.frame = (this.frame+1) % this.animation.frames.length
			this.gameObject.getComponent(SpriteRenderer).sprite = this.animation.frames[this.frame]
		}
		this.update(dt)
	}

	static update (dt) {
		for (const index in Animator.animators) {
			Animator.animators[index]._update(dt)
		}
	}
}
Animator.animators = []
class Animation {
	constructor (images) {
		this.frames = images
	}

}
/**
 * SpriteRenderer component that can be added to a GameObject to hold and draw
 * Sprites.
 *
 * @class      SpriteRenderer (name)
 * @param      {<Sprite>} sprite { the sprite to be drawn }
 */
class SpriteRenderer extends Component {
	constructor (sprite) {
		super()
		this.sprite = sprite
		this._class = SpriteRenderer
	}

	set sprite (sprite) {
		this._sprite = sprite
	}
	get sprite () {
		return this._sprite
	}

	drawBoundingBox (context, rect) {
		context.fillStyle = 'black'
		context.rect(rect.x, rect.y, rect.width, rect.height)
		context.stroke()
	}

	draw (context, position) {
		if (this.gameObject.enabled) {
			var t = this.gameObject.transform
			context.save()
			context.scale(t.scale.x, t.scale.y)
			context.translate(position.x+(t.width/2), position.y+(t.height/2))
			context.rotate(t.rotation)
			context.translate(-(position.x+(t.width/2)), -(position.y+(t.height/2)))
			this.sprite.draw(context, new Rect(position.x, position.y, t.width, t.height))
			if (this.drawBound == true) {
				this.drawBoundingBox(context, new Rect(position.x, position.y, t.width, t.height))
			}
			context.restore() // resets scale
		}
	}
}
class Sprite {
	constructor (imageOrColor, cropRect) {
		if (imageOrColor instanceof Image) {
			this.image = imageOrColor
			this.cropRect = cropRect
			this.draw = function (context, transform) {
				context.drawImage(this.image,
				this.cropRect.x, this.cropRect.y, this.cropRect.width, this.cropRect.height,
				transform.x, transform.y, transform.width, transform.height)
			}
		} else if (imageOrColor instanceof Color) {
			this.color = imageOrColor
			this.draw = function (context, transform) {
				context.fillStyle = this.color.toString()
				context.fillRect(transform.x, transform.y, transform.width, transform.height)
			}
		}
	}
	set cropRect (cropRect) {
		if (cropRect._class != Rect)
			console.error('SpriteRen cropRect property set to object of type other than Rect');
		this._cropRect = cropRect
	}
	get cropRect () {
		return this._cropRect
	}
	draw (context, position) {

	}
}
class CircleSprite extends Sprite {
	constructor (color) {
		super(color)
	}
	draw (context, transform) {
		context.fillStyle = this.color.toString()
		context.beginPath()
		context.arc(transform.x, transform.y, transform.width, 0, 2*Math.PI)
		context.fill()
	}
}
class RigidBody extends Component {
	constructor () {
		super()
		this._velocity = new Vector2(0,0)
		this._acceleration = new Vector2(0,0)
		this._friction = 1
		this._maxSpeed = Infinity
		this.enabled = true
	}

	addTo (gameObject) {
		super.addTo(gameObject)
		PhysicsEngine.rigidbodies.push(this)
	}
	removeFrom (gameObject) {
		super.removeFrom(gameObject)
		// remove from InputEngine
		PhysicsEngine.rigidbodies.splice(PhysicsEngine.rigidbodies.indexOf(this), 1)
	}

	get velocity () {
		return this._velocity
	}
	get acceleration () {
		return this._acceleration
	}
	get friction () {
		return this._friction
	}
	get maxSpeed () {
		return this._maxSpeed
	}

	set velocity (velocity) {
		this._velocity = velocity
	}
	set acceleration (acceleration) {
		this._acceleration = acceleration
	}
	set friction (friction) {
		this._friction = friction
	}
	set maxSpeed (maxSpeed) {
		this._maxSpeed = maxSpeed
	}

	addForce (force) {
		this.velocity.add(force)
	}
	addAcceleration (accel) {
		this.acceleration.add(accel)
	}
	computeFriction () {
		this.velocity.mult(this.friction)
	}
	update (dt) {

	}
	_update (dt) {
		if (this.enabled) {
			this.addForce(this.acceleration)
			if (this.velocity.magnitude > this.maxSpeed) {
				this.velocity.mult(this.maxSpeed / this.velocity.magnitude)
			}
			this.computeFriction()

			this.gameObject.move(this.velocity)
			this.update(dt)
		}
		
	}
}
class Collider extends Component {
	constructor (bound) {
		super()
		this._bound = bound
	}
	addTo (gameObject) {
		super.addTo(gameObject)
		PhysicsEngine.colliders.push(this)
	}
	removeFrom (gameObject) {
		super.removeFrom(gameObject)
		// remove from InputEngine
		PhysicsEngine.colliders.splice(PhysicsEngine.colliders.indexOf(this), 1)
	}
	get bound () {
		if (this.gameObject) {
			var b = this._bound.copy()
			b.x += this.gameObject.transform.x
			b.y += this.gameObject.transform.y
			return b
		}
		return this._bound
	}
	set bound (bound) {
		this._bound = bound
	}
	checkCollisionWith (otherCollider) {
		if (otherCollider instanceof RectCollider) {
			return this.checkCollisionWithRect(otherCollider)
		} else if (otherCollider instanceof CircleCollider) {
			return this.checkCollisionWithCircle(otherCollider)
		}
	}
	onEnter (otherCollider) {

	}
	onExit (otherCollider) {

	}
	_onEnter (otherCollider) {
		this.onEnter(otherCollider)
	}
	_onExit (otherCollider) {
		this.onExit(otherCollider)
	}
}
class RectCollider extends Collider {
	constructor (bound) {
		super(bound)
	}

	checkCollisionWithRect (otherCollider) {
		return Collision.rectIsTouchingRect(this.bound, otherCollider.bound)
	}
	checkCollisionWithCircle (otherCollider) {
		return Collision.rectIsTouchingCircle(this.bound, otherCollider.bound)
	}
}
class CircleCollider extends Collider {
	constructor (bound) {
		super(bound)
	}
	checkCollisionWithRect (otherCollider) {
		return Collision.rectIsTouchingCircle(otherCollider.bound, this.bound)
	}
	checkCollisionWithCircle (otherCollider) {
		return Collision.circleIsTouchingCircle(this.bound, otherCollider.bound)
	}
}
class PhysicsCollider extends Collider {
	constructor (bound, bounciness, slickness, isStatic) {
		super(bound, true)
		this.bounciness = bounciness || 0
		this.slickness = slickness || 1
		if (isStatic == undefined)
			this.isStatic = true
		else
			this.isStatic = isStatic
	}
	_onEnter (otherCollider) {
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
		this.onEnter(otherCollider)
	}
	checkCollisionWith (otherCollider) {
		if (otherCollider instanceof RectCollider || otherCollider instanceof PhysicsRectCollider) {
			return this.checkCollisionWithRect(otherCollider)
		} else if (otherCollider instanceof CircleCollider || otherCollider instanceof PhysicsCircleCollider) {
			return this.checkCollisionWithCircle(otherCollider)
		}
	}
	resolveElastic (otherCollider) {
		//if (this.gameObject.name == 'player')
			//console.log(this.bound.bottom, otherCollider.bound.y)


		var STICKY_THRESHOLD = 0.001
		// Find the mid points of the entity and player
		var pMidX = this.bound.center.x
		var pMidY = this.bound.center.y
		var aMidX = otherCollider.bound.center.x
		var aMidY = otherCollider.bound.center.y
		 
		// To find the side of entry calculate based on
		// the normalized sides
		var dx = (aMidX - pMidX) / (otherCollider.bound.width / 2)
		var dy = (aMidY - pMidY) / (otherCollider.bound.height / 2)
		
		//console.log(otherCollider.gameObject.name)
		 
		// Calculate the absolute change in x and y
		var absDX = Math.abs(dx);
		var absDY = Math.abs(dy);

		var vel = this.gameObject.getComponent(RigidBody).velocity
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
			//console.log('sides')
	 
			// If the player is approaching from positive X
			if (dx < 0) {
				this.gameObject.moveTo(new Vector2(otherCollider.bound.right, this.gameObject.transform.y))
	 
			} else {
			// If the player is approaching from negative X
				this.gameObject.moveTo(new Vector2(otherCollider.bound.x - this.bound.width, this.gameObject.transform.y))
			}
			 
			// Velocity component

			vel.x *= -otherCollider.bounciness
			vel.y *= otherCollider.slickness
	 
			if (Math.abs(this.gameObject.getComponent(RigidBody).velocity.x) < STICKY_THRESHOLD) {
				vel.x = 0
			}
	 
		// If this collision is coming from the top or bottom
		} else {
			//console.log('top')
	 
			// If the player is approaching from positive Y
			if (dy < 0) {
				this.gameObject.moveTo(new Vector2(this.gameObject.transform.x, otherCollider.bound.bottom))

			} else {
			// If the player is approaching from negative Y
				this.gameObject.moveTo(new Vector2(this.gameObject.transform.x, otherCollider.bound.y - this.bound.height-1))
			}
			 
			// Velocity component
			vel.y *= -otherCollider.bounciness
			vel.x *= otherCollider.slickness

			if (Math.abs(vel.y) < STICKY_THRESHOLD) {
				vel.y = 0
			}
		}
	}
}
class PhysicsRectCollider extends PhysicsCollider {
	constructor (bound, bounciness, stickiness, isStatic) {
		super(bound, bounciness, stickiness, isStatic)
	}
	checkCollisionWithRect (otherCollider) {
		return Collision.rectIsTouchingRect(this.bound, otherCollider.bound)
	}
	checkCollisionWithCircle (otherCollider) {
		return Collision.rectIsTouchingCircle(this.bound, otherCollider.bound)
	}
}
class PhysicsCircleCollider extends PhysicsCollider {
	constructor (bound, bounciness, isStatic) {
		super(bound, bounciness, isStatic)
	}
	checkCollisionWithRect (otherCollider) {
		return Collision.rectIsTouchingCircle(otherCollider.bound, this.bound)
	}
	checkCollisionWithCircle (otherCollider) {
		return Collision.circleIsTouchingCircle(this.bound, otherCollider.bound)
	}
}
class PhysicsEngine {
	static update (dt) {
		for (const index in PhysicsEngine.rigidbodies) {
			PhysicsEngine.rigidbodies[index]._update(dt)
		}


		for (const index1 in PhysicsEngine.colliders) {
			for (const index2 in PhysicsEngine.colliders) {
				var coll1 = PhysicsEngine.colliders[index1]
				var coll2 = PhysicsEngine.colliders[index2]
				if (coll1 == coll2) continue
				if (coll1.checkCollisionWith(coll2)) {
					coll1._onEnter(coll2)
				}
			}
		}
	}
}
class RayCastPoint {
	constructor (start, collider, points) {
		this.start = start
		this.collider = collider
		this.points = points
	}
	get first () {
		if (this.points.length == 0) return null
		var first = this.points[0]
		var dist = Vector2.sub(this.start, this.points[0]).magnitude
		for (const index in this.points) {
			var tempDist = Vector2.sub(this.start, this.points[index]).magnitude
			if (tempDist < dist) {
				first = this.points[index]
				dist = tempDist
			}
		}
		return first
	}
}
class RayCast {
	constructor (rayStart, rayDirection, filterFunction, rayLength) {
		this.rayStart = rayStart
		this.rayDirection = rayDirection
		this.filterFunction = filterFunction || function (coll) {return true}
		this.rayLength = rayLength || 999999
	}
	get rayStart () {
		return this._rayStart
	}
	get rayDirection () {
		return this._rayDirection
	}
	get rayEnd () {
		return Vector2.add(this.rayStart, Vector2.mult(this.rayDirection, this.rayLength))
	}
	get filterFunction () {
		return this._filterFunction
	}
	get rayLength () {
		return this._rayLength
	}

	get rayToLine () {
		return new Line(this.rayStart, this.rayEnd)
	}

	set rayStart (rayStart) {
		this._rayStart = rayStart
	}
	set rayDirection (rayDirection) {
		this._rayDirection = rayDirection
	}
	set filterFunction (filterFunction) {
		this._filterFunction = filterFunction
	}
	set rayLength (rayLength) {
		this._rayLength = rayLength
	}

	get contacts () {
		var rayCastPoints = []
		for (const index in PhysicsEngine.colliders) {
			var coll = PhysicsEngine.colliders[index]
			if (!this.filterFunction(coll)) continue
			var points = []
			for (const edge in coll.bound.edges) {
				var intersect = Collision.getLineIntersection(this.rayToLine, coll.bound.edges[edge])
				if (intersect)
					points.push(intersect)
			}
			if (points.length > 0)
				rayCastPoints.push(new RayCastPoint(this.rayStart, coll, points))
		}
		if (rayCastPoints.length > 0) {
			rayCastPoints.sort((a,b)=>{
				return Vector2.sub(this.rayStart, a.first).magnitudeSquared
				 - Vector2.sub(this.rayStart, b.first).magnitudeSquared
			})
			return rayCastPoints
		}
		return null
	}

}
PhysicsEngine.rigidbodies = []
PhysicsEngine.colliders = []