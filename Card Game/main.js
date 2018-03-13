
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
Input.createEventListeners(canvas);
new Scene('main');
new Camera(new Rect(0,0,720,480));
new DeckOfCards();


function loop (lastTime = Date.now()) {
	let thisTime = Date.now();
	let dt = thisTime - lastTime;
	Scene.clear(ctx, Color.GRAY);
	Input.update(dt);
	Scene.update(dt);
	PhysicsEngine.update(dt);
	Scene.draw(ctx);
	requestAnimationFrame(function(){loop(thisTime)})
}
loop();