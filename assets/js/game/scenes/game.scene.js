class GameScene extends Scene {
    constructor() {
        super('gameScene');
        
        this.background = new GameBackground(this);

        this.menu = new Menu(this, {
            type: 'battle'
        });

        this.battle = new Battle(this);
        this.socket = new Socket(this);
    }

    preload() {
        this.boomSound = this.sound.add('boom');
        this.shotSound = this.sound.add('shot');
    }

    create() {
        this.background.create();
        this.menu.create();
        this.battle.create();
        //this.socket.create();
    }

    update() {
        this.battle.update();
    }
}