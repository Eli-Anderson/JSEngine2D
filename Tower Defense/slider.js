class TowerSlider {
	constructor (transform, color) {
		var _this = this
		this.towers = []
		this.offset = 64
		this.slider = new Panel(transform, color)

		this.leftButton = new Button(
			new Transform(transform.x-32, transform.y, transform.z, 32, transform.height),
			color
		)
		this.rightButton = new Button(
			new Transform(transform.rect.right, transform.y, transform.z, 32, transform.height),
			color
		)

		this.leftButtonArrow = new Text(
			"<",
			this.leftButton.transform.copy(),
			new Font("Arial", 32, new Color('white'), 'center', 'center')
		)
		this.rightButtonArrow = new Text(
			">",
			this.leftButton.transform.copy(),
			new Font("Arial", 32, new Color('white'), 'center', 'center')
		)
		this.leftButton.add(this.leftButtonArrow)
		this.rightButton.add(this.rightButtonArrow)
		
		this.leftButtonArrow.localPosition = new Vector3(this.leftButton.transform.width/2,this.leftButton.transform.height/2,1)
		this.rightButtonArrow.localPosition = new Vector3(this.rightButton.transform.width/2,this.rightButton.transform.height/2,1)

		this.leftButton.onClick = ()=>{
			_this.slide(-1)
		}
		this.rightButton.onClick = ()=>{
			_this.slide(1)
		}
		this.slider.add(this.leftButton)
		this.slider.add(this.rightButton)
		this.index = 0
	}

	add (tower) {
		if (this.offset+this.slider.transform.x+(this.towers.length * this.offset) >= this.slider.transform.rect.right)
			tower.enabled = false
		tower.moveCenterTo(new Vector2(this.offset+this.slider.transform.x+(this.towers.length * this.offset), this.slider.transform.rect.center.y))
		tower.originalPosition = tower.transform.toVector2()
		this.slider.add(tower)
		this.towers.push(tower)
	}

	slide (dir) {
		// -1 == slides right   1 == slides left
		this.index += dir
		if (this.index < 0)
			this.index = 0
		else if (this.index >= this.towers.length)
			this.index = this.towers.length-1

		for (const index in this.towers) {
			this.towers[index].enabled = false
		}

		for (var i = this.index; i < this.towers.length; i++) {
			if (64+this.slider.transform.x+((i-this.index) * this.offset) >= this.slider.transform.rect.right)
				break
			this.towers[i].enabled = true
			this.towers[i].moveCenterTo(new Vector2(this.offset+this.slider.transform.x+((i-this.index) * this.offset), this.slider.transform.rect.center.y))
			this.towers[i].originalPosition = this.towers[i].transform.toVector2()
		}
	}
}