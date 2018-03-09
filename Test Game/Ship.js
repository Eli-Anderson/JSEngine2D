//		START OF STATE CLASSES		//
class ShipStateIdle {
    static onStateSet (ship) {}
    static onStateLeft (ship) {}
    static update (ship, dt) {
        if (ship.target === null) {
            ship.target = Vector2.zero();
        }
        ship.flyTo(ship.target);

        if (ship.alliance === AllianceEnum.FEDERATION) {
            for (const index in GameManager.ships) {
                let otherShip = GameManager.ships[index];
                if (AllianceFederationEnemies.indexOf(otherShip.alliance) >= 0) {
                    ship.stateHandler.setState(ship.stateHandler.states.COMBAT);
                    ship.target = otherShip;
                    break;
                }
            }
        }

    }
}
class ShipStateCombat {
    static onStateSet (ship) {}
    static onStateLeft (ship) {
        ship.target = null;
    }
    static update (ship, dt) {
        ship.combat(ship.target);
    }
}
class ShipStateWarping {
    static onStateSet (ship) {}
    static onStateLeft (ship) {}
    static update (ship, dt) {}
}
class ShipStateLanding {
    static onStateSet (ship) {}
    static onStateLeft (ship) {}
    static update (ship, dt) {}
}
class ShipStateBoarding {
    static onStateSet (ship) {}
    static onStateLeft (ship) {}
    static update (ship, dt) {}
}
class ShipStatePlayerControl {
    static onStateSet (ship) {}
    static onStateLeft (ship) {}
    static update (ship, dt) {}
}
class ShipStateHandler {
    constructor (ship) {
        this.ship = ship;
        this.states = {
            'IDLE': ShipStateIdle,
            'COMBAT': ShipStateCombat,
            'WARPING': ShipStateWarping,
            'LANDING': ShipStateLanding,
            'BOARDING': ShipStateBoarding,
            'PLAYER_CONTROL': ShipStatePlayerControl,
        };
        this.state = this.states.IDLE;
    }
    setState (nextState) {
        this.state.onStateLeft(this.ship);
        this.state = nextState;
        nextState.onStateSet(this.ship);
    }
    update (dt) {
        this.state.update(this.ship, dt);
    }
}

//		END OF STATE CLASSES		//


class Ship extends GameObject {
    constructor (transform, alliance, hull, shield, thruster, steering, weapons) {
        super(transform);
        this.addComponent(new SpriteRenderer(new Sprite(Color.WHITE)));
        this.addComponent(new RigidBody());
        this.getComponent(RigidBody).maxSpeed = thruster.maxSpeed;
        this.addComponent(new RectCollider(new Rect(0, 0, transform.rect.width, transform.rect.height)));
        this.alliance = alliance;
        this.hull = hull;
        this.shield = shield;
        this.thruster = thruster;
        this.steering = steering;
        this.weapons = weapons;

        this.mass = hull.mass + shield.mass + thruster.mass + steering.mass;
        weapons.forEach((w)=>{this.mass += w.mass});
        this.fireRate = 1000;
        this.fireCooldown = 0;
        this.target = null;
        this.stateHandler = new ShipStateHandler(this);
        this.stateHandler.setState(this.stateHandler.states.IDLE);
    }
    turnRight () {
        this.rotation += this.steering.turnRate;
    }
    turnLeft () {
        this.rotation -= this.steering.turnRate;
    }
    turnTowards (position) {
        let angleBetween = Vector2.angleBetween(this.transform.rect.center, position);
        if (Math.abs(angleBetween - this.rotation) < 0.01) return;

        if (this.rotation > Math.PI) {
            // looking upwards
            if (this.rotation - angleBetween < Math.PI && this.rotation - angleBetween > 0) {
                this.turnLeft();
            } else {
                this.turnRight();
            }
        }
        else {
            if (angleBetween - this.rotation < Math.PI && angleBetween - this.rotation > 0) {
                this.turnRight();
            } else {
                this.turnLeft();
            }
        }
    }
    thrustForward () {
        let directionVector = new Vector2(Math.cos(this.rotation), Math.sin(this.rotation));
        this.getComponent(RigidBody).addAcceleration(Vector2.mult(directionVector, this.thruster.thrust));
    }
    onHit (damage) {
        this.shield.health -= damage;
        if (this.shield.health < 0) {
            this.hull.health -= Math.abs(this.shield.health);
            this.shield.health = 0;
        }
        if (this.hull.health <= 0) {
            this.destruct();
        }
    }
    getTimeTo (position) {
        let dv = Vector2.sub(position, this.transform.rect.center);
        return dv.magnitude / this.getComponent(RigidBody).velocity.magnitude;
    }
    getTurnAroundDuration () {
        return Math.PI / this.steering.turnRate;
    }
    getDecelerationTime () {
        return this.getComponent(RigidBody).velocity.magnitude / (2 * this.thruster.thrust);
    }
    isTurnedTowards (position) {
        let angleBetween = Vector2.angleBetween(this.transform.rect.center, position);
        return (Math.abs(angleBetween - this.rotation) < 0.01 ||
            Math.abs(angleBetween - (this.rotation + (Math.PI * 2))) < 0.01)
    }

    decelerate (targetVelocity = this.thruster.thrust*this.thruster.thrust) {
        if (this.getComponent(RigidBody).velocity.magnitudeSquared < targetVelocity) {
            return true;
        }
        let decelerationVector = Vector2.mult(this.getComponent(RigidBody).velocity, -1);
        let decelerationPosition = Vector2.add(this.transform.rect.center, Vector2.mult(decelerationVector, 2));
        this.turnTowards(decelerationPosition);
        if (this.isTurnedTowards(decelerationPosition)) {
            this.thrustForward();
        }
        return false;
    }

    flyTo (position, acceptableDistance = 5, targetedVelocity = this.thruster.thrust) {
        if (targetedVelocity < this.thruster.thrust) targetedVelocity = this.thruster.thrust;

        let dv = Vector2.sub(this.transform.rect.center, position);
        if (this.getComponent(RigidBody).velocity.magnitudeSquared < targetedVelocity * targetedVelocity) {
            if (dv.magnitude < acceptableDistance) return true;
        }

        if (this.getTimeTo(position) > this.getDecelerationTime() + 2 * this.getTurnAroundDuration()) {
            this.turnTowards(position);
            if (this.isTurnedTowards(position)) {
                this.thrustForward();
            }
        }
        else {
            if (this.decelerate()) {
                if (dv.magnitude < acceptableDistance) return true;
            }
        }
        return false;
    }
    combat (ship) {
        if (ship.enabled === false) {
            // END COMBAT
            this.stateHandler.setState(this.stateHandler.states.IDLE);
            return;
        }
        let dv = Vector2.sub(this.transform.rect.center, ship.transform.rect.center);
        this.turnTowards(ship.transform.rect.center);
        if (this.isTurnedTowards(ship.transform.rect.center)) {
            this.fire();
            if (dv.magnitude > 50) {
                this.thrustForward();
            }
        }
    }
    fire () {
        for (const index in this.weapons) {
            let weapon = this.weapons[index];
            if (weapon.fireCooldown < weapon.fireRate) return;

            let transform = new Transform(this.transform.rect.center.x, this.transform.rect.center.y,10,3,3);
            let velocity = (new Vector2(Math.cos(this.rotation), Math.sin(this.rotation)))
                .mult(weapon.ammo.speed)
                .add(this.getComponent(RigidBody).velocity);

            let colliderFilterFunc 	= (other) => {return !( other.gameObject instanceof Projectile ||
                other.gameObject === this )};

            new weapon.ammo(transform, velocity, this);
            weapon.fireCooldown = 0;
        }
    }
    destruct () {
        this.enabled = false;
        GameManager.ships.splice(GameManager.ships.indexOf(this), 1);
    }
    update (dt) {
        this.getComponent(RigidBody).acceleration = Vector2.zero();
        this.stateHandler.update(dt);
        for (const index in this.weapons) {
            this.weapons[index].fireCooldown += dt;
        }

    }
}

class Thruster {
    constructor (maxSpeed, thrust, mass) {
        this.maxSpeed = maxSpeed;
        this.thrust = thrust;
        this.mass = mass;
    }
}
class Steering {
    constructor (turnRate, mass) {
        this.turnRate = turnRate;
        this.mass = mass;
    }
}
class Hull {
    constructor (health, mass) {
        this.health = health;
        this.mass = mass;
    }
}
class Shield {
    constructor (health, rechargeRate, mass) {
        this.health = health;
        this.rechargeRate = rechargeRate;
        this.mass = mass;
    }
}
class Blaster {
    constructor (ammo, fireRate, mass) {
        this.ammo = ammo;
        this.fireRate = fireRate;
        this.fireCooldown = 0;
        this.mass = mass;
    }
}
class Laser {
    constructor (beam, mass) {
        this.beam = beam;
        this.mass = mass;
    }
}
class Projectile extends GameObject {
    constructor (transform, velocity, colliderFilterFunc, onCollideFunc, lifespan) {
        super(transform);
        Scene.currentScene.add(this);
        this.addComponent(new SpriteRenderer(new Sprite(Color.WHITE)));
        this.addComponent(new RigidBody());
        this.getComponent(RigidBody).velocity = velocity;
        this.addComponent(new RectCollider(new Rect(0, 0, transform.rect.width, transform.rect.height)));

        this.getComponent(RectCollider).onEnter = function (other){
            if (colliderFilterFunc(other)) {
                onCollideFunc(this, other);
            }
        };

        this.lifespan = lifespan;
        this.lifeTime = 0;
    }

    update (dt) {
        this.lifeTime += dt;
        if (this.lifeTime > this.lifespan)
            this.destroy();
    }
}
class Bullet extends Projectile {
    constructor(transform, velocity, damage, filterFunc, forceMultiplier) {
        super(transform, velocity, filterFunc, (_this, other) => {
            other.gameObject.getComponent(RigidBody).addForce(Vector2.mult(velocity, forceMultiplier / other.gameObject.mass));
            other.gameObject.onHit(damage);
            _this.gameObject.destroy();
        }, 1500);
    }
}

class BasicBlast extends Bullet {
    constructor (transform, velocity, creator) {
        super(transform, velocity, 2, (other) => {return !( other.gameObject instanceof Projectile ||
            other.gameObject === creator )}, 0.05);
    }
    static get speed () {
        return 5;
    }
}


class BlasterPeewee extends Blaster {
    constructor () {
        super(BasicBlast, 200, 1);
    }
}
class ThrusterPeewee extends Thruster {
    constructor () {
        super(2, 0.01, 1);
    }
}
class SteeringPeewee extends Steering {
    constructor () {
        super(0.02, 1);
    }
}
class HullPeewee extends Hull {
    constructor () {
        super(50, 3);
    }
}
class ShieldPewee extends Shield {
    constructor () {
        super(25, 1, 2);
    }
}


class StarBarge extends Ship {
    constructor (transform) {
        super(  transform,
                AllianceEnum.FEDERATION,
                new HullPeewee(),
                new ShieldPewee(),
                new ThrusterPeewee(),
                new SteeringPeewee(),
                [new BlasterPeewee(), new BlasterPeewee()]  );
        let leftWing = new GameObject(new Transform(0,0,transform.z+1,16,10));
        let rightWing = new GameObject(new Transform(0,0,transform.z+1,16,10));
        leftWing.moveCenterTo(new Vector2(transform.rect.center.x, transform.y));
        rightWing.moveCenterTo(new Vector2(transform.rect.center.x, transform.rect.bottom));
        leftWing.addComponent(new SpriteRenderer(new Sprite(Color.GRAY)));
        rightWing.addComponent(new SpriteRenderer(new Sprite(Color.GRAY)));
        this.add(leftWing);
        this.add(rightWing);
    }
}