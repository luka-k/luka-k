class EnemyShip {
    constructor() {
        this.chords = [];
    }

    addChords(chords) {
        this.chords.push(chords);
    }

    checkChords(x, y) {

        if (this.chordsX.includes(x) && this.chordsY.includes(y)) {
            return true;
        }

        return false;
    }

    calcDimensions() {
        this.minX = this.chords[0].x;
        this.minY = this.chords[0].y;

        this.maxX = 0;
        this.maxY = 0;

        this.chordsX = [];
        this.chordsY = [];

        for (let index in this.chords) {
            const ch = this.chords[index];

            this.chordsX.push(+ch.x);
            this.chordsY.push(+ch.y);

            if (ch.x < this.minX) {
                this.minX = ch.x;
            }
            
            if (ch.y < this.minY) {
                this.minY = ch.y;
            }

            if (ch.x > this.maxX) {
                this.maxX = ch.x;
            }

            if (ch.y > this.maxY) {
                this.maxY = ch.y;
            }
        }
    }
}