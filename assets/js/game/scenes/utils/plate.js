class Plate {
    constructor(type, game, chords) {
        this.game = game;
        this.chords = chords;

        this.cellSize = 52;
        this.marginX = 100;
        this.marginY = type == "player" ? 160 : 730;

        this.fieldTemplate = 'field';
        this.boomTemplate = 'boom';
        this.skullTemplate = 'skull';

        this.boomNumber = Math.floor(Math.random() * Math.floor(4)) + 1;

        this.calcRenderSizes();
        this.render();
    }

    calcRenderSizes() {
        this.x = this.chords.x * this.cellSize + this.marginX;
        this.y = this.chords.y * this.cellSize + this.marginY;
    }

    render() {
        this.element = this.game.add.sprite(this.x, this.y, this.fieldTemplate);
        this.element.setOrigin(0, 0);
    }

    setBoom() {
        this.element.destroy();
        
        this.element = this.game.add.sprite(this.x - 20, this.y - 20, this.boomTemplate);
        this.element.setOrigin(0, 0);

        const firstFrame = this.getFirstFrame();
        const endFrame = firstFrame + 10;

        this.game.anims.create({
            key: 'boom-' + this.boomNumber,
            frames: this.game.anims.generateFrameNumbers('boom', { start: firstFrame, end: endFrame, first: firstFrame}),
            duration: 600
        });

        this.element.anims.play('boom-' + this.boomNumber); 
        
        this.game.boomSound.play();
    }

    getFirstFrame() {
        switch(this.boomNumber) {
            case 1:
                return 0; 
            case 2:
                return 6;
            case 3:
                return 12;
            case 4:
                return 18;
            case 5:
                return 24;
        }
    }

    setKilled() {
        this.element.destroy();

        this.element = this.game.add.sprite(this.x, this.y, this.skullTemplate);
        this.element.setOrigin(0, 0);
    }
}