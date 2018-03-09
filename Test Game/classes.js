let GameManager  = {
	ships : [],
};

class Player extends GameObject {
	constructor (name, alliance, ship) {
		super(Transform.zero());

		this.name = name;
		this.alliance = alliance;
        this.ship = ship;
        this.ship.stateHandler.setState(this.ship.stateHandler.states.PLAYER_CONTROL);
        this.ship.alliance = alliance;
        this.add(this.ship);
		this.fireRate = 100;
		this.fireCooldown = 0;
		GameManager.ships.push(this.ship);

	}
	update (dt) {
        this.ship.getComponent(RigidBody).acceleration = Vector2.zero();

		if (Input.getKeyDown('d')) this.ship.turnRight(dt);
        if (Input.getKeyDown('a')) this.ship.turnLeft(dt);

		if (Input.getKeyDown('w'))
			this.ship.thrustForward(dt);

		this.fireCooldown += dt;
		if (Input.getKeyDown(' ')) {
			this.ship.fire();
		}
		if (Input.getKeyDown('l')) {
			this.ship.flyTo(Vector2.zero());
		}
        if (Input.getKeyDown('k')) {
            this.ship.decelerate();
        }
        if (Input.getKeyDown('i')) {
			Scene.changeScene('test');
		}
        if (Input.getKeyDown('o')) {
            Scene.changeScene('main');
        }
	}
}

let AllianceEnum = Object.freeze({
	'FEDERATION' : "Federation",
	'REBELLION' : "Rebellion",
	'PIRATE' : "Pirate",
	'MARAUDER' : "Marauder"
});
let AllianceFederationEnemies = [
	AllianceEnum.PIRATE,
	AllianceEnum.MARAUDER
];

class NPC extends GameObject {
	constructor (name, alliance, ship) {
		super (Transform.zero());
        this.name = name;
        this.alliance = alliance;
        this.ship = ship;
        this.add(this.ship);
        GameManager.ships.push(this);
    }
    destroy () {
		GameManager.ships.splice(GameManager.ships.indexOf(this), 1);
		super.destroy();
	}
}

class Star extends GameObject {
	constructor(x, y) {
		super(new Transform(x,y,1,3,3));
		this.addComponent(new SpriteRenderer(new Sprite(Color.WHITE)));
		this.viewport = Camera.mainCamera.viewport;
	}
	update (dt) {
		if (this.transform.x < this.viewport.x - 10) {
			this.transform.x = this.viewport.right + 9;
			this.transform.y = this.viewport.y + Math.random() * this.viewport.height;
		} else if (this.transform.y < this.viewport.y - 10) {
			this.transform.y = this.viewport.bottom + 9;
			this.transform.x = this.viewport.x + Math.random() * this.viewport.width;
		}
		else if (this.transform.x > this.viewport.right + 10) {
			this.transform.x = this.viewport.x - 9;
			this.transform.y = this.viewport.y + Math.random() * this.viewport.height;
		} else if (this.transform.y > this.viewport.bottom + 10) {
			this.transform.y = this.viewport.y - 9;
			this.transform.x = this.viewport.x + Math.random() * this.viewport.width;
		}
	}
}
class ParallaxBackground extends GameObject {
	constructor (multiplier) {
		super(new Transform(0,0,0,720,480));
		Scene.currentScene.add(this);
		this.addComponent(new SpriteRenderer(new Sprite(Color.BLACK)));
		this.addComponent(new Parallax(Camera.mainCamera, multiplier));
		for (let i = 0; i < 10; i++) {
			this.add(new Star(Math.random() * 720, Math.random() * 480));
		}
	}
}
class CameraObject extends GameObject {
	constructor (player) {
		super(new Transform(0,0,0,720,480));
		Scene.currentScene.add(this);
		this.player = player;
		this.addComponent(new Camera(this.transform.rect.copy()));
		this.addComponent(new SpriteRenderer(new Sprite(Color.BLACK)));
	}
	update (dt) {
		this.moveTo(Vector2.lerp(
			this.transform,
			Vector2.sub(
				this.player.ship.transform.rect.center,
				new Vector2(this.transform.width/2, this.transform.height/2)
			),
			dt/(200+this.player.ship.getComponent(RigidBody).velocity.magnitude)));
	}
}