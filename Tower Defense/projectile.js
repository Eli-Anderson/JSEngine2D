class BasicProjectile extends PanelImage {
	constructor (transform, vector, damage) {
		super(transform, BasicProjectile.image, new Rect(24,24,16,16), new Vector2(1,1), 0, false)
		this._vector = vector
		this._damage = damage
	}
	onHit (monster) {
		monster.health -= this._damage
		this._damage = 0 // in case it is not destroyed properly, it will not double hit
		if (game.map.remove(this)) {
			game.map.projectiles.splice(game.map.projectiles.indexOf(this), 1)
		}
	}
	update (dt) {
		this.transform.add(this._vector)

		if (!Collision.rectIsTouchingRect(this.transform, game.map.transform)) {
			game.map.projectiles.splice(game.map.projectiles.indexOf(this), 1)
			game.map.remove(this)
		}

		for (const index in game.map.monsters) {
			if (Collision.rectIsTouchingRect(this.transform, game.map.monsters[index].transform)) {
				this.onHit(game.map.monsters[index])
			} else {
				var midpoint = new Transform(Vector2.SUB(this.transform, Vector2.DIV(this._vector, 2)))
				midpoint.width = this.transform.width
				midpoint.height = this.transform.height
				if (Collision.rectIsTouchingRect(midpoint, game.map.monsters[index].transform)) {
					this.onHit(game.map.monsters[index])
				}
			}
		}
	}
}
BasicProjectile.image = new Image()
BasicProjectile.image.src = 'basicProjectile.png'

class PiercingProjectile extends BasicProjectile {
	constructor (transform, vector, damage) {
		super (transform, vector, damage)
		this.hitMonsters = []
	}
	onHit (monster) {
		if (this.hitMonsters.indexOf(monster) < 0) {
			monster.health -= this._damage
			this.hitMonsters.push(monster)
		}
	}
}

class SlowProjectile extends BasicProjectile {
	constructor (transform, vector, damage, slowPercent) {
		super (transform, vector, damage)
	}
	onHit (monster) {
		monster.addEffect(new Slow(0.65, 1000))
		monster.health -= this._damage
		this._damage = 0 // in case it is not destroyed properly, it will not double hit
		if (game.map.remove(this)) {
			game.map.projectiles.splice(game.map.projectiles.indexOf(this), 1)
		}
	}
}