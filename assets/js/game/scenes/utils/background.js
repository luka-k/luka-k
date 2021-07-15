class GameBackground {
    constructor(scene) {
        this.scene = scene;

        this.backgound = null;
    }

    create() {
        this.backgound = this.scene.add.tileSprite(0, 0, this.scene.width, this.scene.height, 'space-bg');

        this.backgound.setOrigin(0, 0);
    }
}