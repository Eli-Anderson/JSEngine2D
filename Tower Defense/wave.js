class Wave {
	constructor (subwaves, timeBetween) {
		this.subwaves = subwaves
		this.index = 0
		this.timeBetween = timeBetween
	}
	get subwaves () {
		return this._subwaves
	}
	get timeBetween () {
		return this._timeBetween
	}
	get next () {
		if (this.index < this.subwaves.length)
			return this.subwaves[this.index++]
		return null
	}
	get hasNext () {
		return this.index < this.subwaves.length
	}

	set subwaves (subwaves) {
		this._subwaves = subwaves
	}
	set timeBetween (timeBetween) {
		this._timeBetween = timeBetween
	}

	addSubwave (subwave) {
		this._subwaves.push(subwave)
	}

}