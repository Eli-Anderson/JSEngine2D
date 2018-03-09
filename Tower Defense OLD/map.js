class Map extends PanelBase {
	constructor (columns, rows) {
		super(new Transform(0,0,0,32*columns,32*rows), false)
		this.rows = rows
		this.columns = columns
		this._tiles = []
		this._towers = []
		this._monsters = []
		this._projectiles = []

		initializeArray(this._towers, columns, rows)

		var pathImg = new Image()
		pathImg.src = 'path.png'
		const GRASS = new Rect(0,0,32,32)

		for (var i = 0; i < rows; i++) {
			this.tiles[i] = []
			for (var n = 0; n < columns; n++) {
				this.tiles[i][n] = new Tile(
					new Transform(n*32,i*32,1,32,32),
					pathImg,
					GRASS,
					false
				)
				this.add(this.tiles[i][n])
			}
		}
		this.buildPath()
	}
	get tiles () {
		return this._tiles
	}
	get towers () {
		return this._towers
	}
	get monsters () {
		return this._monsters
	}
	get projectiles () {
		return this._projectiles
	}

	addTile (tile, x, y) {
		if (x > 0 && x < this.rows &&
			y > 0 && y < this.columns) {
			this.tiles[y][x] = tile
		}
		this.add(tile)
	}
	getTile (x, y) {
		if (y >= 0 && y < this.rows &&
			x >= 0 && x < this.columns) {
			return this.tiles[y][x]
		} else {
			return null
		}
	}
	getTileAtPos (x, y) {
		x -= x%32
		y -= y%32
		x /= 32
		y /= 32
		if (y >= 0 && y < this.rows &&
			x >= 0 && x < this.columns) {
			return this.tiles[y][x]
		} else {
			return null
		}
	}
	addTower (tower, x, y) {
		if (y >= 0 && y < this.rows &&
			x >= 0 && x < this.columns) {
			this.towers[y][x] = tower
			this.add(tower)
		}
	}
	removeTower (x, y) {
		if (y >= 0 && y < this.rows &&
			x >= 0 && x < this.columns) {
			this.remove(this.towers[y][x])
			this.towers[y][x] = null
			
		}
	}
	addMonster (monster) {
		this.monsters.push(monster)
		this.add(monster)
	}
	addProjectile (projectile) {
		this.projectiles.push(projectile)
		this.add(projectile)
	}
	isTileEmpty (x, y) {
		if (y >= 0 && y < this.rows &&
			x >= 0 && x < this.columns) {
			return this.towers[y][x] == null
		}
		return false
	}
	isTileBuildable (x, y) {
		if (y >= 0 && y < this.rows &&
			x >= 0 && x < this.columns) {
			return (this.isTileEmpty(x, y) && this.tiles[y][x].isWalkable == false)
		}
		return false
	}
	buildPath () {
		var _this = this
		function isPathable (x, y) {
			if (x <= 0 || x >= _this.columns ||
				y < 0 || y >= _this.rows) {
				return false
			}
			if (_this.getTile(x, y).isWalkable) {
				return false
			}
			return true
		}
		const GRASS = new Rect(0,0,32,32)
		const V_PATH = new Rect(32,0,32,32)
		const H_PATH = new Rect(0,96,32,32)
		const R_D_PATH = new Rect(0,32,32,32)
		const D_R_PATH = new Rect(0,64,32,32)
		const R_U_PATH = new Rect(32,64,32,32)
		const U_R_PATH = new Rect(32,32,32,32)
		var currentTile = this.getTile(0, Math.floor(this.rows/2))
		this.pathStart = currentTile.transform.rect.center
		currentTile.cropRect = H_PATH
		var currentTileCoords = new Vector2(currentTile.transform.x/32, currentTile.transform.y/32)
		var lastTile = null
		while (currentTileCoords.x < this.columns-1) {
			//currentTile.cropRect = H_PATH
			currentTile.isWalkable = true


			var directions = [new Vector2(0,1), new Vector2(1,0), new Vector2(0,-1)]
			var dir = directions[Math.round(Math.random()*2)]
			if (!isPathable(currentTileCoords.x+dir.x, currentTileCoords.y+dir.y)) {
				for (var i = 0; i < directions.length; i++) {
					dir = directions[i]
					if (isPathable(currentTileCoords.x+dir.x, currentTileCoords.y+dir.y)) {
						break
					}
				}
			}
			if (lastTile != null) {
				if (directions.indexOf(dir) == 0) {
					//next path is going down
					if (!(lastTile.cropRect.equals(V_PATH) || lastTile.cropRect.equals(R_D_PATH))) {
						currentTile.cropRect = R_D_PATH
					} else {
						currentTile.cropRect = V_PATH
					}
					
				} else if (directions.indexOf(dir) == 1) {
					//next path is going right
					if (lastTile.cropRect.equals(V_PATH)) {
						if (lastTile.transform.y < currentTile.transform.y) {
							// is coming from above
							currentTile.cropRect = D_R_PATH
						} else {
							currentTile.cropRect = U_R_PATH
						}
					} else if (lastTile.cropRect.equals(R_D_PATH)) {
						currentTile.cropRect = D_R_PATH
					} else if (lastTile.cropRect.equals(R_U_PATH)) {
						currentTile.cropRect = U_R_PATH
					} else {
						currentTile.cropRect = H_PATH
					}
				} else {
					//next path is going up
					if (!(lastTile.cropRect.equals(V_PATH) || lastTile.cropRect.equals(R_U_PATH))) {
						currentTile.cropRect = R_U_PATH
					} else {
						currentTile.cropRect = V_PATH
					}
				}
			}

			lastTile = currentTile
			currentTile = this.getTile((currentTile.transform.x/32)+dir.x, (currentTile.transform.y/32)+dir.y)
			currentTileCoords.x += dir.x
			currentTileCoords.y += dir.y

			//console.log(currentTileCoords)
		}
		this.getTile(currentTileCoords.x, currentTileCoords.y).isWalkable = true
		this.getTile(currentTileCoords.x, currentTileCoords.y).cropRect = H_PATH
	}
}

class Tile extends PanelImage {
	constructor (transform, img, crop, isWalkable) {
		super(transform, img, crop, undefined, undefined, false)
		this._isWalkable = isWalkable
	}
	get isWalkable () {
		return this._isWalkable
	}
	set isWalkable (isWalkable) {
		this._isWalkable = isWalkable
	}
}

function initializeArray (arr, x, y) {
	for (var i = 0; i < y; i++) {
		arr[i] = []
		for (var n = 0; n < x; n++) {
			arr[i][n] = null
		}
	}
}