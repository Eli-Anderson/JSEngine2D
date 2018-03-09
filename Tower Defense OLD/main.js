const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const MONSTER = 5
const PROJECTILE = 6
const TOWER = 7
const UI = 30

class Game {
	constructor () {
		var _this = this
		this._camera = new Camera (new Transform(0,0,0,868,496))
		this._scene = new Scene()
		this.map = new Map(23, 13)
		this._paused = false
		this.tooltips = []

		this.countdownText = new Text("",
			new Transform(this.camera.transform.rect.center.x, this.camera.transform.rect.center.y,UI+5,1,1),
			new Font("Arial", 128, new Color('white'), 'center', 'center'),
			true
		)
		this.countdownText.enabled = false
		this.scene.add(this.countdownText)

		this.currentWave = 0
		this._gold = 25
		this._life = 25
		this._selectedTower = null

		this.hurtThisWave = false
		var pauseImg = new Image()
		pauseImg.src = 'pause.png'
		this.pauseButton = new ButtonImage(
			new Transform(678,10,UI+4,32,32),
			pauseImg
		)
		this.pauseButton.onClick = () => {_this.paused = !_this.paused}
		this.scene.add(this.pauseButton)
		
		this.scene.add(new Panel(new Transform(0,0,0,this.camera.transform.width,this.camera.transform.height), new Color('white')))
		this.scene.add(this.map)

		this.createTowerTray()
		this.createSideBar()
		
		this.highlight = new Panel(new Transform(0,0,TOWER-1,32,32), new Color(255,255,255,0.25), 0, false)
		this.highlight.enabled = false
		this.rangeHighlight = new PanelCircle(new Transform(0,0,TOWER-1,0,0), new Color(255,255,255,0.3), 0, false)
		this.rangeHighlight.enabled = false
		this.scene.add(this.highlight)
		this.scene.add(this.rangeHighlight)
		
		this.createTowerButtons()
		this.createOtherButtons()
		this.scene.add(this.towerTray)
	}

	get scene () {
		return this._scene
	}
	get camera () {
		return this._camera
	}
	get paused () {
		return this._paused
	}
	get gold () {
		return this._gold
	}
	get life () {
		return this._life
	}
	get selectedTower () {
		return this._selectedTower
	}

	set scene (scene) {
		this._scene = scene
	}
	set camera (camera) {
		this._camera = camera
	}
	set paused (paused) {
		this._paused = paused
	}
	set gold (gold) {
		this._gold = gold
		this.goldCounter.text = "Gold: "+gold
	}
	set life (life) {
		if (life < this.life) this.hurtThisWave = true
		this._life = life
		this.lifeCounter.text = "Life: "+life
		if (this.life <= 0) {
			window.alert("Game Over!")
			game = new Game()
		}
	}
	set selectedTower (selectedTower) {
		this._selectedTower = selectedTower
		if (selectedTower != null) {
			this.sideBarSelectedTowerText.text = selectedTower.constructor.tooltipText
			this.sideBarSelectedTowerText.parent.enabled = true
			this.sideBarSelectedTowerText.parent.transform.height = 32 +
				(this.sideBarSelectedTowerText._lines.length * this.sideBarSelectedTowerText.font.size)
		} else {
			this.sideBarSelectedTowerText.text = ""
			this.sideBarSelectedTowerText.parent.enabled = false
		}
	}

	createSideBar () {
		this.sideBar = new Panel(
			new Transform(
				this.map.transform.width,
				0,
				UI-1,
				this.camera.transform.width - this.map.transform.width,
				this.camera.transform.height
			), new Color('gray'), 0, true
		)
		this.scene.add(this.sideBar)

		var selectedTowerBG = new Panel(
			new Transform(
				this.sideBar.transform.x + 6,
				this.sideBar.transform.y + 6,
				UI,
				this.sideBar.transform.width - 12,
				0
			),
			new Color(0,0,0,0.25)
		)
		selectedTowerBG.enabled = false
		this.sideBar.add(selectedTowerBG)

		this.sideBarSelectedTowerText = new Text(
			"",
			new Transform(this.sideBar.transform.x + 12,this.sideBar.transform.y + 22,UI,0,0),
			new Font("Arial", 14, new Color('white'), 'left', 'center')
		)

		selectedTowerBG.add(this.sideBarSelectedTowerText)
	}

	createTowerTray () {
		this.towerTray = new Panel(new Transform(0,this.map.transform.height,UI-1,this.map.transform.width,80), new Color('gray'), 0, true)
		
		this.waveCounter = new Text("Wave: "+this.currentWave,
			new Transform(620,this.towerTray.transform.y+10,UI+1,0,0),
			new Font("Arial", 18, new Color('white'), 'left', 'center'),
			true
		)
		this.goldCounter = new Text("Gold: "+this.gold,
			new Transform(620,this.towerTray.transform.y+30,UI+1,0,0),
			new Font("Arial", 18, new Color('yellow'), 'left', 'center'),
			true
		)
		this.lifeCounter = new Text("Life: "+this.life,
			new Transform(620,this.towerTray.transform.y+50,UI+1,0,0),
			new Font("Arial", 18, new Color('red'), 'left', 'center'),
			true
		)

		this.towerTray.add(this.waveCounter)
		this.towerTray.add(this.goldCounter)
		this.towerTray.add(this.lifeCounter)
	}

	createTowerButtons () {
		var basicTowerCreator = new BasicTowerCreator(new Transform(0,0,UI+2,32,32))
		var sniperTowerCreator = new SniperTowerCreator(new Transform(0,0,UI+2,32,32))
		var rapidTowerCreator = new RapidTowerCreator(new Transform(0,0,UI+2,32,32))
		var iceTowerCreator = new IceTowerCreator(new Transform(0,0,UI+2,32,32))
		var iceTowerCreator2 = new IceTowerCreator(new Transform(0,0,UI+2,32,32))
		var rapidTowerCreator2 = new RapidTowerCreator(new Transform(0,0,UI+2,32,32))

		for (const index in [basicTowerCreator, sniperTowerCreator, rapidTowerCreator, iceTowerCreator]) {
			var tower = [basicTowerCreator, sniperTowerCreator, rapidTowerCreator, iceTowerCreator][index]
			var t = tower.transform
			var tip = new Tooltip(
				new Transform(t.x,t.y-104,UI+10,128,128),
				new Text(tower.towerClass.tooltipText, new Transform(t.x,t.y-104,UI+11,0,0), new Font("Arial", 16, new Color('white'), 'left','bottom')),
				new Color(128,128,128,0.65),
				false
			)
			tower.add(tip)
			this.tooltips.push(tip)
		}

		var towerSlider = new TowerSlider(new Transform(64,this.towerTray.transform.y,this.towerTray.transform.z+1,320,64), new Color(120,120,120))
		this.scene.add(towerSlider.slider)

		towerSlider.add(basicTowerCreator)
		towerSlider.add(sniperTowerCreator)
		towerSlider.add(rapidTowerCreator)
		towerSlider.add(iceTowerCreator)
		towerSlider.add(iceTowerCreator2)
		towerSlider.add(rapidTowerCreator2)
		this.slider = towerSlider
	}


	createOtherButtons () {
		var _this = this
		var sbTrans = this.sideBar.transform
		this.targetButtonHolder = new Panel(
			new Transform(sbTrans.x+30, sbTrans.y+200,UI,1,1),
			new Color(0,0,0,0)
		)
		// ADD TARGET-BUTTON HOLDER TO SCENE
		this.sideBar.add(this.targetButtonHolder)

		//
		// CREATE TARGET WEAKEST BUTTON
		// 
		this.targetWeakestButton = new Button(
			new Transform(sbTrans.x+10,sbTrans.y+200,UI+2,32,32),
			new Color('brown'),
			0,
			true
		)
		this.targetButtonHolder.add(this.targetWeakestButton)
		this.targetWeakestButton.add(new Text(
			"Weak",
			new Transform(
				this.targetWeakestButton.transform.rect.center.x,
				this.targetWeakestButton.transform.rect.center.y,
				this.targetWeakestButton.transform.z+1,
				1,
				1
			),
			new Font("Arial", 12, new Color('black'), 'center', 'center')
		))
		//
		// CREATE TARGET STRONGEST BUTTON
		// 
		this.targetStrongestButton = new Button(
			new Transform(sbTrans.x+58,sbTrans.y+200,UI+2,32,32),
			new Color('brown'),
			0,
			true
		)
		this.targetButtonHolder.add(this.targetStrongestButton)
		this.targetStrongestButton.add(new Text(
			"Strong",
			new Transform(
				this.targetStrongestButton.transform.rect.center.x,
				this.targetStrongestButton.transform.rect.center.y,
				this.targetStrongestButton.transform.z+1,
				1,
				1
			),
			new Font("Arial", 11, new Color('black'), 'center', 'center')
		))
		//
		// CREATE TARGET FIRST BUTTON
		// 
		this.targetFirstButton = new Button(
			new Transform(sbTrans.x+10,sbTrans.y+248,UI+2,32,32),
			new Color('brown'),
			0,
			true
		)
		this.targetButtonHolder.add(this.targetFirstButton)
		this.targetFirstButton.add(new Text(
			"First",
			new Transform(
				this.targetFirstButton.transform.rect.center.x,
				this.targetFirstButton.transform.rect.center.y,
				this.targetFirstButton.transform.z+1,
				1,
				1
			),
			new Font("Arial", 12, new Color('black'), 'center', 'center')
		))
		//
		// CREATE TARGET LAST BUTTON
		// 
		this.targetLastButton = new Button(
			new Transform(sbTrans.x+58,sbTrans.y+248,UI+2,32,32),
			new Color('brown'),
			0,
			true
		)
		this.targetButtonHolder.add(this.targetLastButton)
		this.targetFirstButton.add(new Text(
			"Last",
			new Transform(
				this.targetLastButton.transform.rect.center.x,
				this.targetLastButton.transform.rect.center.y,
				this.targetLastButton.transform.z+1,
				1,
				1
			),
			new Font("Arial", 12, new Color('black'), 'center', 'center')
		))
		//
		// CREATE SELL TOWER BUTTON
		// 
		var sellButton = new Button(
			new Transform(0,0,UI+2,80,32),
			new Color('red'),
			0,
			true
		)
		sellButton.moveCenterTo(new Vector2(sbTrans.rect.center.x, sbTrans.rect.bottom-32))
		this.sideBar.add(sellButton)
		this.sellButtonText = new Text(
			"Sell for 0",
			new Transform(
				sellButton.transform.rect.center.x,
				sellButton.transform.rect.center.y,
				sellButton.transform.z+1,
				1,
				1
			),
			new Font("Arial", 12, new Color('black'), 'center', 'center')
		)
		sellButton.add(this.sellButtonText)
		//
		// CREATE SELECTED TARGET BUTTON HIGHLIGHT
		// 
		this.selectedTargetButton = new Panel(
			new Transform(this.targetWeakestButton.transform.x,this.targetWeakestButton.transform.y,UI+4,32,32), 
			new Color(255,255,255,0.2)
		)
		this.selectedTargetButton.enabled = false

		//
		// CREATE onClick() FUNCTIONS FOR EACH BUTTON
		//
		this.targetWeakestButton.onClick = ()=>{
			if (_this.selectedTower){
				_this.selectedTower.targeting = _this.selectedTower.getWeakestMonster
				_this.selectedTargetButton.enabled = true
				_this.selectedTargetButton.moveTo(_this.targetWeakestButton.transform.toVector2())
			}
		}
		this.targetStrongestButton.onClick = ()=>{
			if (_this.selectedTower){
				_this.selectedTower.targeting = _this.selectedTower.getStrongestMonster
				_this.selectedTargetButton.enabled = true
				_this.selectedTargetButton.moveTo(_this.targetStrongestButton.transform.toVector2())
			}
		}
		this.targetFirstButton.onClick = ()=>{
			if (_this.selectedTower){
				_this.selectedTower.targeting = _this.selectedTower.getFirstMonster
				_this.selectedTargetButton.enabled = true
				_this.selectedTargetButton.moveTo(_this.targetFirstButton.transform.toVector2())
			}
		}
		this.targetLastButton.onClick = ()=>{
			if (_this.selectedTower){
				_this.selectedTower.targeting = _this.selectedTower.getLastMonster
				_this.selectedTargetButton.enabled = true
				_this.selectedTargetButton.moveTo(_this.targetLastButton.transform.toVector2())
			}
		}

		sellButton.onClick = () => {
			if (_this.selectedTower) {
				_this.selectedTower.sell()
				_this.selectedTower = null
				_this.sellAmount.text = ""
				_this.highlight.enabled = false
			}
		}
		this.sideBar.add(this.selectedTargetButton)
	}
}

class Tooltip extends Panel {
	constructor (transform, text, color, dynamicSize) {
		super(transform, color, 0, true)
		this._dynamic = dynamicSize
		this.tipText = text
		this.add(text)
		this.enabled = false
	}
	get tipText () {
		return this._tipText
	}
	set tipText (tipText) {
		this._tipText = tipText
		if (this._dynamic) {
			this.tipText.draw(ctx, new Vector2(-1000,-1000))
			this.transform.width = this.tipText.transform.width
			this.transform.height = this.tipText.transform.height
			if (this.tipText.font.alignment == 'center')
				this.tipText.transform.x = this.transform.rect.center.x
			if (this.tipText.font.vertAlignment == 'center')
				this.tipText.transform.y = this.transform.rect.center.y
		}
	}

	update (dt, point) {
		this.enabled = Collision.pointIsInRect(point, this.parent.transform)
						&& !input.mousedown
						&& this.parent.enabled
	}
}

function startWave (n) {
	game.waveCounter.text = "Wave: "+game.currentWave
	var nextWave = createWave(n)

	function sendNextSubwave (wave) {
		var subwave = wave.next
		if (subwave != null) {
			for (const index in subwave) {
				subwave[index].move(new Vector2(-nextWave.timeBetween * nextWave.index, 0))
				subwave[index].move(new Vector2(-32 * index), 0)
				game.map.addMonster(subwave[index])
			}
		}
	}
		
	while (nextWave.hasNext) {
		sendNextSubwave(nextWave)
	}
}

function createWave (n) {
	var wave = new Wave([], 256)
	for (var i = 0; i < n; i++) {
		var subwave = []
		for (var t = 0; t < n; t++) {
			var startPos = game.map.pathStart
			var m = new Goblin(new Transform(0,0,MONSTER,26,26))
			m.transform.x = startPos.x
			m.transform.y = startPos.y - (m.transform.height / 2)
			m.health += (2*n)
			subwave.push(m)
		}
		wave.addSubwave(subwave)
	}
	return wave
}

function countdown (n) {
	game.countdownText.enabled = true
	game.countdownText.text = n
	if (n <= 0) {
		startWave(++game.currentWave)
		game.countdownText.enabled = false
		return
	} else {
		setTimeout(function(){
			countdown(game.paused ? n : --n)
		}, 1000)
	}
	
}

var game
window.onload = function () {
	game = new Game()
	createEventListeners()
	var dt
	var lastTime = Date.now()
	function loop () {
		dt = Date.now() - lastTime
		if (!game.paused) {
			if (game.map.monsters.length == 0 && game.countdownText.enabled == false) {
				game.gold += Math.round(game.currentWave * (this.hurtThisWave ? 1.5 : 0.75))
				this.hurtThisWave = false
				countdown(5)
			}
			for (const index in game.map.monsters) {
				if (game.map.monsters[index] != undefined) {
					// if game was reset mid loop, make sure these are not called
					game.map.monsters[index].update(dt)
				}
			}
			for (const rowIndex in game.map.towers) {
				for (const colIndex in game.map.towers[rowIndex]) {
					if (game.map.towers[rowIndex][colIndex] != null) {
						game.map.towers[rowIndex][colIndex].update(dt)
					}
				}
			}
			for (const index in game.map.projectiles) {
				if (game.map.projectiles[index] != undefined) {
					// if game was reset mid loop, make sure these are not called
					game.map.projectiles[index].update(dt)
				}
			}
			
		}
		for (const index in game.tooltips) {
			game.tooltips[index].update(dt, mouse)
		}
		game.scene.draw(ctx, game.camera)
		lastTime = Date.now()
		requestAnimationFrame(loop)
	}
	loop()
}
var mouse = new Vector2()
var input = {
	'left': 	false,
	'right': 	false,
	'up': 		false,
	'down': 	false,
	'mousedown': false,
}
function createEventListeners () {
	document.addEventListener('mousemove', function (e) {
		mouse.x = e.clientX - canvas.offsetLeft
		mouse.y = e.clientY - canvas.offsetTop
		Button.handleInput('move', mouse, game.scene)
	})
	document.addEventListener('mousedown', function (e) {
		Button.handleInput('down', mouse, game.scene)
		input.mousedown = true
	})
	document.addEventListener('mouseup', function (e) {
		Button.handleInput('up', mouse, game.scene)
		input.mousedown = false
	})
	document.addEventListener('keydown', function (e) {
		if (e.key == 'a')
			input.left = true
		else if (e.key == 'd')
			input.right = true
		if (e.key == 'w')
			input.up = true
		else if (e.key == 's')
			input.down = true
		if (e.key == 'Escape') {
			// DESELECT TOWER
			game.selectedTower = null
			game.selectedTargetButton.enabled = false
			game.highlight.enabled = false
			game.sellButtonText.text = ""
		}
	})
	document.addEventListener('keyup', function (e) {
		if (e.key == 'a')
			input.left = false
		if (e.key == 'd')
			input.right = false
		if (e.key == 'w')
			input.up = false
		if (e.key == 's')
			input.down = false
	})
}
