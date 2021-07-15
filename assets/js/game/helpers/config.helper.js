/**
 * Game config
 */
const config = {
    parent: "game-wrap",
    width: settings.width,
    height: settings.height,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },  
    scene: [PreloadScene, MainScene, GameScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    init() {
        this.width = settings.width;
        this.height = settings.height;
    }
};