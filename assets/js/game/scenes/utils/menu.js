class Menu {
    constructor(game, config) {
        this.game = game;

        this.type = config.type;
    }

    create() {
        if (this.type == 'main') {
            this.createMainMenu();
            this.createBattleBtn();
        } else if (this.type == 'battle') {
            this.createHandOverBtn();
        }

        this.createInfoIcons();
    }

    createMainMenu() {
        this.infoBtn = this.game.add.tileSprite(100, 1150, settings.menu.itemWidth, settings.menu.itemHeight, 'info-btn');
        this.infoBtn.setOrigin(0.5, 0);
        this.infoBtn.setInteractive({
            cursor: 'url(' + settings.cursors.pointerCursor + '), pointer'
        });

        this.infoBtn.on('pointerover', function (pointer, gameObject) {
            this.infoBtn.setTint(0xff0000);
        }, this);

        this.infoBtn.on('pointerout', function (pointer, gameObject) {
            this.infoBtn.setTint();
        }, this);

        this.infoBtn.on('pointerdown', function (pointer, gameObject) {
            let info = new HangarInfo({api:api});
            
            info.render(); 
        }, this);

        this.shopBtn = this.game.add.tileSprite(360, 1150, settings.menu.itemWidth, settings.menu.itemHeight, 'shop-btn');
        this.shopBtn.setOrigin(0.5, 0);
        this.shopBtn.setInteractive({
            cursor: 'url(' + settings.cursors.pointerCursor + '), pointer'
        });

        this.shopBtn.on('pointerover', function (pointer, gameObject) {
            this.shopBtn.setTint(0xff0000);
        }, this);

        this.shopBtn.on('pointerout', function (pointer, gameObject) {
            this.shopBtn.setTint();
        }, this);

        this.shopBtn.on('pointerdown', function (pointer, gameObject) {
            let info = new ShopInfo({api:api});
            
            info.render(); 
        }, this);

        this.ratingBtn = this.game.add.tileSprite(620, 1150, settings.menu.itemWidth, settings.menu.itemHeight, 'rating-btn');
        this.ratingBtn.setOrigin(0.5, 0);
        this.ratingBtn.setInteractive({
            cursor: 'url(' + settings.cursors.pointerCursor + '), pointer'
        });

        this.ratingBtn.on('pointerover', function (pointer, gameObject) {
            this.ratingBtn.setTint(0xff0000);
        }, this);

        this.ratingBtn.on('pointerout', function (pointer, gameObject) {
            this.ratingBtn.setTint();
        }, this);

        this.ratingBtn.on('pointerdown', function (pointer, gameObject) {
             let info = new RatingInfo({api:api});
            
            info.render(); 
        }, this);
    }

    createBattleMenu() {
        this.firstBonusBtn = this.game.add.tileSprite(210, 20, settings.menu.itemWidth, settings.menu.itemHeight, 'bonus-1-btn');
        this.firstBonusBtn.setOrigin(0, 0);
        this.firstBonusBtn.setInteractive({
            cursor: 'url(' + settings.cursors.pointerCursor + '), pointer'
        });

        this.firstBonusBtn.on('pointerover', function (pointer, gameObject) {
            this.firstBonusBtn.setTint(0xff0000);
        }, this);

        this.firstBonusBtn.on('pointerout', function (pointer, gameObject) {
            this.firstBonusBtn.setTint();
        }, this);

        this.firstBonusBtn.on('pointerdown', function (pointer, gameObject) {
            //this.scene.start('gameScene');
        }, this);

        this.secondBonusBtn = this.game.add.tileSprite(300, 15, settings.menu.itemWidth, settings.menu.itemHeight, 'bonus-2-btn');
        this.secondBonusBtn.setOrigin(0, 0);
        this.secondBonusBtn.setInteractive({
            cursor: 'url(' + settings.cursors.pointerCursor + '), pointer'
        });

        this.secondBonusBtn.on('pointerover', function (pointer, gameObject) {
            this.secondBonusBtn.setTint(0xff0000);
        }, this);

        this.secondBonusBtn.on('pointerout', function (pointer, gameObject) {
            this.secondBonusBtn.setTint();
        }, this);

        this.secondBonusBtn.on('pointerdown', function (pointer, gameObject) {
            //this.scene.start('gameScene');
        }, this);

        this.thirdBonusBtn = this.game.add.tileSprite(400, 15, settings.menu.itemWidth, settings.menu.itemHeight, 'bonus-3-btn');
        this.thirdBonusBtn.setOrigin(0, 0);
        this.thirdBonusBtn.setInteractive({
            cursor: 'url(' + settings.cursors.pointerCursor + '), pointer'
        });

        this.thirdBonusBtn.on('pointerover', function (pointer, gameObject) {
            this.thirdBonusBtn.setTint(0xff0000);
        }, this);

        this.thirdBonusBtn.on('pointerout', function (pointer, gameObject) {
            this.thirdBonusBtn.setTint();
        }, this);

        this.thirdBonusBtn.on('pointerdown', function (pointer, gameObject) {
            //this.scene.start('gameScene');
        }, this);
    }

    createBattleBtn() {
        this.startBtn = this.game.add.tileSprite(70, 25, settings.menu.itemWidth, settings.menu.itemHeight, 'battle-btn');
        this.startBtn.setOrigin(0.5, 0);
        this.startBtn.setInteractive({
            cursor: 'url(' + settings.cursors.pointerCursor + '), pointer'
        });

        this.startBtn.on('pointerover', function (pointer, gameObject) {
            this.startBtn.setTint(0xff0000);
        }, this);

        this.startBtn.on('pointerout', function (pointer, gameObject) {
            this.startBtn.setTint();
        }, this);

        this.startBtn.on('pointerdown', function (pointer, gameObject) {
            if (api.user.silver <= 0) {
                console.log("Нет денег");

                return;
            }

            this.game.scene.stop('mainScene');
            this.game.scene.start('gameScene');
        }, this);
    }

    createHandOverBtn() {
        this.handOverBtn = this.game.add.tileSprite(70, 25, settings.menu.itemWidth, settings.menu.itemHeight, 'handover-btn');
        this.handOverBtn.setOrigin(0.5, 0);
        this.handOverBtn.setInteractive({
            cursor: 'url(' + settings.cursors.pointerCursor + '), pointer'
        });

        this.handOverBtn.on('pointerover', function (pointer, gameObject) {
            this.handOverBtn.setTint(0xff0000);
        }, this);

        this.handOverBtn.on('pointerout', function (pointer, gameObject) {
            this.handOverBtn.setTint();
        }, this);

        this.handOverBtn.on('pointerdown', function (pointer, gameObject) {
            this.game.socket.close();

            this.game.scene.stop('gameScene');
            this.game.scene.start('mainScene');
        }, this);
    }

    createInfoIcons() {

        this.levelIcon = this.game.add.tileSprite(320, 20, settings.menu.itemWidth, settings.menu.itemHeight, 'player-icon');
        this.levelIcon.setOrigin(0.5, 0);

        this.level = this.game.add.text(320, 80, api.user.level, settings.fonts.menu);
        this.level.setOrigin(0.5, 0);

        this.scoreIcon = this.game.add.tileSprite(440, 20, settings.menu.itemWidth, settings.menu.itemHeight, 'score-icon');
        this.scoreIcon.setOrigin(0.5, 0);

        this.score = this.game.add.text(440, 80, api.user.wins + "/" + api.user.fails, settings.fonts.menu);
        this.score.setOrigin(0.5, 0);

        this.silverIcon = this.game.add.tileSprite(550, 20, settings.menu.itemWidth, settings.menu.itemHeight, 'blue-crystal');
        this.silverIcon.setOrigin(0.5, 0);

        this.silver = this.game.add.text(550, 80, api.user.nano_crystall, settings.fonts.menu);
        this.silver.setOrigin(0.5, 0);

        this.goldIcon = this.game.add.tileSprite(660, 20, settings.menu.itemWidth, settings.menu.itemHeight, 'yellow-crystal');
        this.goldIcon.setOrigin(0.5, 0);

        this.gold = this.game.add.text(660, 80, api.user.anty_crystall, settings.fonts.menu);
        this.gold.setOrigin(0.5, 0);
    }

    update() {
        this.level.setText(api.user.level);
        this.score.setText(api.user.wins + "/" + api.user.fails);
        this.silver.setText(api.user.nano_crystall);
        this.gold.setText(api.user.anty_crystall);   
    }
}