
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
Input.createEventListeners(document);
new Scene('main');
new Scene('test');
let player = new Player("L. Jenkins", AllianceEnum.FEDERATION, new StarBarge(new Transform(100,100,10,32,32)));
Scene.currentScene.add(player);
let player2 = new Player("L. Jenkins", AllianceEnum.FEDERATION, new StarBarge(new Transform(100,100,10,32,32)));
Scene.getScene('test').add(player2);
let cameraObject = new CameraObject(player);

let parallaxClose = new ParallaxBackground(0.1);
let parallaxMid = new ParallaxBackground(0.05);
let parallaxFar = new ParallaxBackground(0.01);


let s = new StarBarge(new Transform(32, 32, 10, 32, 32));
let npc = new NPC("NPC A", AllianceEnum.FEDERATION, s);
Scene.currentScene.add(npc);



function loop (lastTime = Date.now()) {
	let thisTime = Date.now();
	let dt = thisTime - lastTime;
	Scene.clear(ctx);
	Input.update(dt);
	Scene.update(dt);
	PhysicsEngine.update(dt);
	Scene.draw(ctx);
	requestAnimationFrame(function(){loop(thisTime)})
}
loop();