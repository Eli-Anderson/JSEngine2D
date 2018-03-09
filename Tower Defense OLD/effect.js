class Effect extends Panel {
	constructor (releaseCondition, color) {
		super(Transform.zero(), color, 0, false)
		this.identifier = Math.random()
		this.time = 0
		this.releaseCondition = releaseCondition
	}

	_onContact (monster) {
		this.transform = monster.transform.copy()
		this.transform.z ++
		//monster.add(this)
		this.onContact(monster)
	}
	_onUpdate (monster, dt) {
		this.time += dt
		this.rotation = monster.rotation
		this.moveTo(monster.transform)
		this.transform.z ++
		if (this.releaseCondition(this)) {
			monster.removeEffect(this)
			
		} else {
			this.onUpdate(monster, dt)
		}
	}
	_onRelease (monster) {
		monster.remove(this)
		this.onRelease(monster)
	}

	onContact (monster) {

	}
	onUpdate (monster, dt) {

	}
	onRelease (monster) {
		
	}
}

class Slow extends Effect {
	constructor (slowPercent, duration) {
		var f = (eff) => {return eff.time >= duration}
		super (f, new Color(0,0,255,0.2))
		this.slowPercent = slowPercent
	}
	onContact (monster) {
		monster.speed *= this.slowPercent
		this.time = 0
	}
	onRelease (monster) {
		monster.speed /= this.slowPercent
	}
}
class Freeze extends Effect {
	constructor (duration) {
		var f = (eff) => {return eff.time >= duration}
		super (f)
		this.oldSpeed = 0
	}
	onContact (monster) {
		this.oldSpeed = monster.speed
		monster.speed = 0
		this.time = 0
	}
	onRelease (monster) {
		monster.speed = this.oldSpeed
	}
}
class Burn extends Effect {
	constructor (damage, duration) {
		var f = (eff) => {return eff.time >= duration}
		super (f)
		this.damage = damage
	}
	onContact (monster) {
		this.time = 0
	}
	onUpdate (monster, dt) {
		monster.health -= (dt / 1000) * this.damage // 5 damage per second
	}
	onRelease (monster) {

	}
}