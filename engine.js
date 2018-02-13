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

}class Vector2 {
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

	get magnitude () {
		return Math.sqrt((this.x*this.x) + (this.y*this.y))
	}
	get normalized () {
		return Vector2.DIV(this, this.magnitude)
	}

	add (vector2) {
		this.x += vector2.x
		this.y += vector2.y
	}
	set (vector2) {
		this.x = vector2.x
		this.y = vector2.y
	}

	equals (vector2) {
		return this.x == vector2.x &&
				this.y == vector2.y
	}

	static SUB (a, b) {
		return new Vector2(a.x-b.x, a.y-b.y)
	}
	static ADD (a, b) {
		return new Vector2(a.x+b.x, a.y+b.y)
	}
	static MULT (a, b) {
		if (typeof k == 'object' && k._class == Vector2) {
			return new Vector2(a.x*b.x, a.y*b.y)
		}
		return new Vector2(a.x*b, a.y*b)
		
	}
	static DIV (a, b) {
		if (typeof k == 'object' && k._class == Vector2) {
			return new Vector2(a.x/b.x, a.y/b.y)
		}
		return new Vector2(a.x/b, a.y/b)
	}

	toVector3 () {
		return new Vector3(this.x, this.y, 0)
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
	}

	equals (vector3) {
		return super.equals(vector3) && this.z == vector3.z
	}

	toVector2 () {
		return new Vector2(this.x, this.y)
	}

	static SUB (a, b) {
		return new Vector3(a.x-b.x, a.y-b.y, a.z-(b.z || 0))
	}
	static ADD (a, b) {
		return new Vector3(a.x+b.x, a.y+b.y, a.z+(b.z || 0))
	}
	static MULT (a, b) {
		if (typeof k == 'object' && k._class == Vector3) {
			return new Vector3(a.x*b.x, a.y*b.y, a.z*(b.z || 1))
		}
		return new Vector3(a.x*b, a.y*b, a.z*b)
		
	}
	static DIV (a, b) {
		if (typeof k == 'object' && k._class == Vector3) {
			return new Vector3(a.x/b.x, a.y/b.y, a.z/(b.z || 1))
		}
		return new Vector3(a.x/b, a.y/b, a.z/b)
	}
}class Transform extends Vector3 {
	constructor (x, y, z, width, height) {
		super (x, y, z)

		this._width = width || 1
		this._height = height || 1
		this._rect = new Rect(x,y,width,height)
		this._class = Transform
	}
	get width () {
		return this._width
	}
	get height () {
		return this._height
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

	add (vector3) {
		super.add(vector3)
		return this
	}
	sub (vector3) {
		super.sub(vector3)
		return this
	}

	copy () {
		return new Transform(this.x, this.y, this.z, this.width, this.height)
	}
	static zero () {
		return new Transform(0,0,0,0,0)
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
}class Container {
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
		return Vector3.SUB(this.transform, this.parent.transform)
	}
	get absolutePosition () {
		return this.transform
	}

	set localPosition (position) {
		this.moveTo(Vector3.ADD(this.parent.transform, position))
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
		var positionDifference = Vector3.SUB(vector3, this.transform)
		this.transform.set(vector3)
		for (const index in this.flattened) {
			this.flattened[index].transform.set(Vector3.ADD(this.flattened[index].transform, positionDifference))
		}
	}

	moveCenterTo (vector3) {
		var adjustedPos = Vector2.SUB(vector3, new Vector2(this.transform.width/2, this.transform.height/2))
		var positionDifference = Vector3.SUB(adjustedPos, this.transform)
		this.transform.set(adjustedPos)
		for (const index in this.flattened) {
			this.flattened[index].transform.set(Vector3.ADD(this.flattened[index].transform, positionDifference))
		}
	}
}class Scene {
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
}class Collision {
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
		return rectA.x + wA > rectB.x && rectA.x < rectB.x + wB &&
			rectA.y + hA > rectB.y && rectA.y < rectB.y + hB
	}
}class PanelBase extends Container {
	/* should not be instantiated; used as a base for other Panel objects */
	constructor (transform, isUI) {
		super(transform)
		this._isUI = (isUI == undefined || isUI == true) ? true : false
		this._class = PanelBase
		this.drawBound = false
	}
	
	get isUI () {
		return this._isUI
	}
	set isUI (isUI) {
		this._isUI = isUI
	}

	/* 	setters used only for preventing hard-to-find errors
		when trying to access position/dimensions where they
		don't exist
	*/
	set x (a) {
		console.error ("Did you mean to call transform.x?")
	}
	set y (a) {
		console.error ("Did you mean to call transform.y?")
	}
	set width (a) {
		console.error ("Did you mean to call transform.width?")
	}
	set height (a) {
		console.error ("Did you mean to call transform.height?")
	}

	drawBoundingBox (context, rect) {
		context.fillStyle = 'black'
		context.rect(rect.x, rect.y, rect.width, rect.height)
		context.stroke()
	}
}class Panel extends PanelBase {
	/* a basic panel consisting of a background Color */
	constructor (transform, color, rotation, isUI) {
		super(transform, isUI)
		this.color = color
		this.rotation = rotation || 0
		this._class = Panel
	}

	set color (color) {
		this._color = color
	}
	get color () {
		return this._color
	}
	set rotation (rotation) {
		this._rotation = rotation
	}
	get rotation () {
		return this._rotation
	}

	/**
	 * Rotates the panel towards a given angle over time.
	 * Give the function a value 't' that is between [0, 1],
	 * corresponding to the position between the current
	 * rotation and the rotation given.
	 * 
	 * This can be used to lerp rotation by passing a small
	 * value for t each frame (depending on the preferred speed)
	 *
	 * @param      {number}  angle   The angle desired
	 * @param      {number}  t       A float between [0, 1]
	 */
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

	draw (context, position) {
		if (this.enabled) {
			context.save()

			context.fillStyle = ""+this.color
			context.translate(position.x+(this.transform.width/2), position.y+(this.transform.height/2))
			context.rotate(this.rotation)
			context.translate(-(position.x+(this.transform.width/2)), -(position.y+(this.transform.height/2)))
			context.fillRect(position.x, position.y, this.transform.width, this.transform.height)
			if (this.drawBound) {
				this.drawBoundingBox(context, new Rect(position.x, position.y, this.transform.width, this.transform.height))
			}
			context.restore() // resets scale
		}
	}
}class PanelCircle extends Panel {
	// Width and Height are used instead of a radius
	constructor (transform, color, rotation, isUI) {
		super(transform, color, rotation, isUI)
	}
	draw (context, position) {
		if (this.enabled) {
			context.fillStyle = ""+this.color
			context.beginPath()
			context.arc(position.x, position.y, this.transform.width, 0, 2*Math.PI)
			context.fill()
		}
	}
}class PanelImage extends PanelBase {
	/* a panel with an image instead of a Color; able be be cropped from an input Image and scaled */
	constructor (transform, image, cropRect, scale, rotation, isUI) {
		super(transform, isUI)
		this.image = image
		this.cropRect = cropRect || new Rect(0, 0, transform.width, transform.height)
		this.scale = scale || new Vector2(1, 1)
		this.rotation = rotation || 0
		this._class = PanelImage
	}

	set image (image) {
		this._image = image
	}
	get image () {
		return this._image
	}

	set cropRect (cropRect) {
		if (cropRect._class != Rect)
			console.error('PanelImage cropRect property set to object of type other than Rect');
		this._cropRect = cropRect
	}
	get cropRect () {
		return this._cropRect
	}

	set scale (scale) {
		this._scale = scale
	}
	get scale () {
		return this._scale
	}

	set rotation (rotation) {
		this._rotation = rotation
	}
	get rotation () {
		return this._rotation
	}

	/**
	 * Rotates the panel towards a given angle over time.
	 * Give the function a value 't' that is between [0, 1],
	 * corresponding to the position between the current
	 * rotation and the rotation given.
	 * 
	 * This can be used to lerp rotation by passing a small
	 * value for t each frame (depending on the preferred speed)
	 *
	 * @param      {number}  angle   The angle desired (in radians)
	 * @param      {number}  t       A float between [0, 1]
	 */
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

	draw (context, position) {
		if (this.enabled) {
			context.save()
			context.scale(this.scale.x, this.scale.y)
			context.translate(position.x+(this.transform.width/2), position.y+(this.transform.height/2))
			context.rotate(this.rotation)
			context.translate(-(position.x+(this.transform.width/2)), -(position.y+(this.transform.height/2)))
			
			context.drawImage(this.image,
				this.cropRect.x, this.cropRect.y, this.cropRect.width, this.cropRect.height,
				position.x, position.y, this.transform.width, this.transform.height)
			if (this.drawBound) {
				this.drawBoundingBox(context, new Rect(position.x, position.y, this.transform.width, this.transform.height))
			}
			context.restore() // resets scale
		}
	}
}class Text extends PanelBase {
	constructor (text, transform, font, isUI) {
		super(transform, isUI)
		this._lines = []
		this.text = text
		this._font = font
		this._class = Text
	}

	get text () {
		return this._text
	}
	get transform () {
		return this._transform
	}
	get font () {
		return this._font
	}

	set text (text) {
		this._text = text.toString()
		this._lines = this._text.split("\n")
	} 
	set transform (transform) {
		this._transform = transform
	}
	set font (font) {
		this._font = font
		this.transform.height = font.size
	}

	draw (context, position) {
		if (this.enabled) {
			this.transform.height = this.font.size
			context.font = this.font
			context.fillStyle = this.font.color
			this.transform.width = context.measureText(this.text).width // TODO: Find a way to calculate the width when font is set?
			context.textAlign = this.font.alignment
			var vAlign = 0
			if (this.font.vertAlignment == 'center') vAlign = this.transform.height / 3
			if (this.font.vertAlignment == 'bottom') vAlign = this.transform.height / 1.5
			for (const index in this._lines) {
				context.fillText(this._lines[index], position.x, position.y + vAlign + (index * this.font.size))
			}
			
		}
	}
}class Font {
	constructor (name, size, color, alignment, vertAlignment) {
		this._name = name || 'Arial'
		this._size = size || 12
		this._color = color || new Color(0,0,0,1)
		this._alignment = alignment || 'left'
		this._vertAlignment = vertAlignment || 'top'
		this._class = Font
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
		this._alignment = vertAlignment
	}

	toString () {
		return this.size + "px " + this.name
	}
}class Button extends Panel {
	constructor (transform, color, rotation) {
		super(transform, color, rotation)
		this._class = Button
	}

	onClick (point) {

	}

	_onClick (point) {
		this.onClick()
	}

	_onRelease (point) {
		this.onRelease()
	}

	static handleInput (type, mouse, scene) {
		var sceneElements = scene.getFlattened()
		sceneElements.sort(function(a, b) {return b.transform.z - a.transform.z})
		for (const index in sceneElements) {
			var child = sceneElements[index]
			if (child.enabled && child._onClick) { // TODO: A better way to tell if element is a Button
				if (type == 'move') {
					if (child.isDragged) {
						child._onDrag(mouse)
						break
					}
				} else if (type == 'down') {
					if (Collision.pointIsInRect(mouse, child.transform)) {
						child._onClick(mouse)
						break
					}
				} else if (type == 'up') {
					if (child.isDragged) {
						child._onRelease(mouse)
						break
					}
				}
			}
		}
	}
}class ButtonImage extends PanelImage {
	constructor (transform, image, cropRect, scale, rotation, isUI) {
		super(transform, image, cropRect, scale, rotation, isUI)
		this._class = ButtonImage
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
}class Camera {
	/*
		A Camera object is used primarily for abstracting draw calls to the canvas's context.
		As with a real camera, the Camera object contains a Transform which allows for free
		2D movement.

		getScreenPositionOf: calculates the screen position of an element (relative to the camera)
		getRealPositionOf: calculates the real position of an element on the screen (world coordinate)
		draw: flattens the descendants into a single array, sorts them by z position, then calls their
				respective draw function if in the Camera's view.

	*/
	constructor (transform, scale) {
		this._transform = transform
		this._scale = scale
		this._class = Camera
	}

	get transform () {
		return this._transform
	}
	get scale () {
		return this._scale
	}

	set transform (transform) {
		this._transform = transform
	}

	getScreenPositionOf (elementTransform) {
		return Vector2.SUB(elementTransform.toVector2(), this.transform.toVector2())
	}
	getRealPositionOf (elementTransform) {
		return Vector2.ADD(elementTransform.toVector2(), this.transform.toVector2()) // TODO: Does this method even make sense? Is there a point to it?
	}

	draw (context, elements) {
		var sortedElements = elements.splice(0).sort(function(a, b) {return a.transform.z - b.transform.z})
		for (const index in sortedElements) {
			var el = sortedElements[index]
			if (el.draw) {
				if (el.isUI) {
					if (Collision.rectIsTouchingRect(el.transform, new Rect(0,0, this.transform.width, this.transform.height))) {
						el.draw(context, el.transform)
					}
				}
				else {
					if (Collision.rectIsTouchingRect(el.transform, this.transform)) {
						var screenPos = this.getScreenPositionOf(el.transform)
						el.draw(context, screenPos)
					}
				}
			}
		}
	}
}class Draggable extends Button {
	constructor (transform, color, rotation) {
		super(transform, color, rotation)
		this._isDragged = false
		this._originalPosition = new Vector2(transform.x, transform.y)
		this._distanceFromClickPoint = new Vector2(0, 0)
		this._class = Draggable
	}

	get isDragged () {
		return this._isDragged
	}
	get originalPosition () {
		return this._originalPosition
	}

	set originalPosition (originalPosition) {
		this._originalPosition = originalPosition
	}

	_onClick (point) {
		this._distanceFromClickPoint.x = this.transform.x - point.x
		this._distanceFromClickPoint.y = this.transform.y - point.y
		this._isDragged = true
		this.onClick(point)
	}

	_onDrag (point) {
		this.moveTo(new Vector3(point.x + this._distanceFromClickPoint.x, point.y + this._distanceFromClickPoint.y, this.transform.z))
		this.onDrag(point)
	}

	_onRelease (point) {
		this._isDragged = false
		this.onRelease(point)
	}
} class DraggableImage extends ButtonImage {
	constructor (transform, image, cropRect, scale, rotation, isUI) {
		super(transform, image, cropRect, scale, rotation, isUI)
		this._isDragged = false
		this._originalPosition = new Vector2(transform.x, transform.y)
		this._distanceFromClickPoint = new Vector2(0, 0)
		this._class = DraggableImage
	}

	get isDragged () {
		return this._isDragged
	}
	get originalPosition () {
		return this._originalPosition
	}

	set originalPosition (originalPosition) {
		this._originalPosition = originalPosition
	}

	_onClick (point) {
		this._distanceFromClickPoint.x = this.transform.x - point.x
		this._distanceFromClickPoint.y = this.transform.y - point.y
		this._isDragged = true
		this.onClick(point)
	}

	_onDrag (point) {
		this.moveTo(new Vector3(point.x + this._distanceFromClickPoint.x, point.y + this._distanceFromClickPoint.y, this.transform.z))
		this.onDrag(point)
	}

	_onRelease (point) {
		this._isDragged = false
		this.onRelease(point)
	}
}