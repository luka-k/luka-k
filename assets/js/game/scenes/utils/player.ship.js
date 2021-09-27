class PlayerShip {
    constructor(game, config) {
        this.game = game;
        
        this.cellSize = 52;
        this.marginX = 110;
        this.marginY = 180;

        this.type = config.Type;
        this.direction = config.Direction;
        this.chords = config.Chords;

        this.sprite = '';

        this.calcRenderSizes();

        this.setSprite();

        this.render();
    }

    calcRenderSizes() {
        this.x = this.chords[0][0] * this.cellSize + this.marginX;
        this.y = this.chords[0][1] * this.cellSize + this.marginY;

        console.log(this.x, this.y);

        this.width = this.coef * this.type; 
        this.height = this.coef;

        if (this.direction === 1) {
            this.width = this.coef;
            this.height = this.coef * this.type;
        }
    }

    render() {
        this.element = this.game.add.sprite(this.x, this.y, this.sprite);

        this.element.setOrigin(0, 0);

        const firstFrame = Math.floor(Math.random() * Math.floor(15));

        this.game.anims.create({
            key: this.sprite + '-fly',
            frames: this.game.anims.generateFrameNumbers(this.sprite, { start: 1, end: 15, first: 1}),
            duration: 1500,
            repeat: -1,
        });

        this.element.anims.play(this.sprite + '-fly').setScale(0.5);    
    }

    setSprite() {
        const fleetId = this.game.battle.fleetId;

        this.sprite = "ship." + fleetId + "." + this.type + "." + this.getDirectionCode(this.direction);
    }

    getDirectionCode(direction) {
        if (direction) {
            return 'v';
        }

        return 'h';
    }

    setKilled() {
        this.element.destroy();

        this.element = this.game.add.sprite(this.x, this.y, this.sprite);

        this.element.setOrigin(0, 0);

        this.element.setAlpha(0.6);

        this.element.setScale(0.5);
    }

    destroy() {
        this.element.destroy();
    }
}