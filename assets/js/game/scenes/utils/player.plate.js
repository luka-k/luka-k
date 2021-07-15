class PlayerPlate extends Plate{
    constructor(game, chords) {
        super("player", game, chords);

        this.game.shotSound.play();
    }
}