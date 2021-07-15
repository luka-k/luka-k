class EnemyPlate extends Plate {
    constructor(game, chords) {
        super("enemy", game, chords)

        this.used = false;
    }

    render() {
        super.render();

        this.element.setInteractive({
            cursor: 'url(' + settings.cursors.pointerCursor + '), pointer'
        });

        this.element.setAlpha(0.6);

        this.element.on('pointerover', this.onPointerOver, this);
        this.element.on('pointerout', this.onPointerOut, this);
        this.element.on('pointerdown', this.onClick, this);
    }

    onPointerOver() {
        if (this.game.battle.state != 'go' || this.used) return;

        this.element.setTint(0xffff11);
    }

    onPointerOut() {
        if (this.game.battle.state != 'go' || this.used) return;
        
        this.element.setTint();
    }

    onClick(pointer, gameObject) {
        if (this.game.battle.state != 'go' || this.used) return;

        this.game.shotSound.play();

        this.used = true;

        this.element.setTint(0xffff11);

        this.game.socket.send({
            action: "hit",
            data: {
                x: this.chords.x,  
                y: this.chords.y  
            }
        });
    }

    destroy() {
        this.element.destroy();
    }
}
