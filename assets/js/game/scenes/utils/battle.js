class Battle {
    constructor(scene) {
        this.scene = scene;

        this.init();
    }

    init() {
        this.playerShips = {};
        this.enemyShips = {};

        this.playerPlates = {};
        this.enemyPlates = {};

        this.enemyShips = {};

        this.fleetId = 1;
    }

    create() {
        this.setPlayerInfo();
        this.setFields();        

        this.setEnemyGround();

        this.state = 'wait';
    }

    update() {}

    setFields() {
        this.scene.playerField = this.scene.add.tileSprite(50,  250, 420, 420, 'p-grid');
        this.scene.playerField.setOrigin(0, 0);

        this.scene.enemyField = this.scene.add.tileSprite(530,  250, 420, 420, 'e-grid');
        this.scene.enemyField.setOrigin(0, 0);
    }

    setEnemyGround() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                this.enemyPlates[i + '-' + j] = new EnemyPlate(this.scene, {x: i, y: j});
            }
        }
    }

    setPlayerGround(ground) {
        for (let key in ground) {
            const ship = ground[key];

            this.playerShips[key] = new PlayerShip(this.scene, ship);
        }
    }

    setPlayerInfo() {
        this.playerName = this.scene.add.text(60, 210, api.user.alias, settings.fonts.menu);

        this.playerName.setOrigin(0, 0);
    }

    setEnemyInfo(enemy) {
        this.enemyName = this.scene.add.text(540, 210, enemy.alias, settings.fonts.menu);

        this.enemyName.setOrigin(0, 0);
    }

    missPlayerPlate(chords) {
        this.playerPlates[chords.x + '-' + chords.y] = new PlayerPlate(this.scene, chords);
    }

    missEnemyPlate(data) {
        const plate = this.enemyPlates[data.x + '-' + data.y];

        plate.destroy();

        delete this.enemyPlates[data.x + '-' + data.y];
    }

    enemyShipStub(data) {  
        const plate = this.enemyPlates[data.x + '-' + data.y];

        plate.setBoom();

        if (this.enemyShips[data.position] == undefined) {
            this.enemyShips[data.position] = new EnemyShip();
        }
        
        this.enemyShips[data.position].addChords({
            x: data.x, 
            y: data.y
        });

        if (data.status != 'kill') return;
        
        const ship = this.enemyShips[data.position];
        
        ship.calcDimensions();
        
        for (let cellX = +ship.minX - 1; cellX <= +ship.maxX + 1; cellX++) {
            if (cellX < 0 || cellX > 9) continue;

            for (let cellY = +ship.minY - 1; cellY <= +ship.maxY + 1; cellY++) {
                if (cellY < 0 || cellY > 9) continue;

                if (ship.checkChords(cellX, cellY)) continue;

                const plate = this.enemyPlates[cellX + '-' + cellY];

                if (!plate) continue;
                
                plate.destroy();
                
                delete this.enemyPlates[cellX + '-' + cellY];
            }
        }
    }
    
    playerShipStub(data) {
        const plate = new PlayerPlate(this.scene, {
            x: data.x,
            y: data.y
        });

        plate.setBoom();

        this.playerPlates[data.x + '-' + data.y] = plate;

        if (data.status == 'kill') {
            const ship = this.playerShips[data.position];
        
            ship.setKilled();
        }
    }

    changeState(data) {
        if (!data.state) return;
        
        this.state = data.state;

        if (this.state == 'go') {
            this.playerName.setColor('#f0c796');
            this.enemyName.setColor('#b0d3f5');

            return;
        }

        this.playerName.setColor('#b0d3f5');
        this.enemyName.setColor('#f0c796');
    }

    playerWin() {
        const gameEndModal = new GameEndModal({
            game: this.scene,
            text: "Вы победили!"
        });

        gameEndModal.show();

        this.init();
    }

    playerLoss() {
        const gameEndModal = new GameEndModal({
            game: this.scene,
            text: "Вы проиграли!"
        });

        gameEndModal.show();

        this.init();
    }

}