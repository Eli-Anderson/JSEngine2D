class AbstractCard extends GameObject {
    constructor(transform) {
        super(transform);
        this.addComponent(new Draggable());
        this.addComponent(new SpriteRenderer(new Sprite(Color.WHITE, transform.rect.copy())))
    }
}

class PlayingCard extends AbstractCard {
    constructor(transform, name, font) {
        super(transform);
        this.addComponent(new TextRenderer(name, font));
    }
}

class DeckOfCards extends GameObject {
    constructor(position, size) {
        super(Transform.zero());
        let suits = ['hearts', 'clubs', 'spades', 'diamonds'];
        let font = new Font("Arial", 16, Color.BLACK, 'center', 'center');
        for (let i=2; i < 10; i++) {
            for (const index in suits) {
                this.add(new PlayingCard(new Transform(0,0,0,96,128), i+' of '+suits[index], font));
            }
        }
        Scene.currentScene.add(this);
    }
}