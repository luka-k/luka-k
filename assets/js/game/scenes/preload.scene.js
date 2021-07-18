class PreloadScene extends Scene {
    constructor() {
        super("preloadScene")
    }

    preload() {
        this.preloadImages();
        this.preloadSprites();
        this.preloadSound();

        this.loadingText();
        this.progressBox();
    }

    create() {
        this.loadMainScene();

        if (api.user.alias) return;
        
        modal = new AliasModal(this);
        
        modal.show();   
    }

    preloadImages() {
        this.load.image('space-bg', 'assets/img/background/space.png');

        this.load.image('blue-crystal', 'assets/img/ui/elements/blue.crystal.png');
        this.load.image('yellow-crystal', 'assets/img/ui/elements/yellow.crystal.png');
        this.load.image('battle-btn', 'assets/img/ui/elements/battle.btn.png');
        this.load.image('handover-btn', 'assets/img/ui/elements/hand.over.btn.png');
        this.load.image('info-btn', 'assets/img/ui/elements/info.btn.png');
        this.load.image('shop-btn', 'assets/img/ui/elements/shop.btn.png');

        this.load.image('bonus-1-btn', 'assets/img/ui/elements/bonus-1.btn.png');
        this.load.image('bonus-2-btn', 'assets/img/ui/elements/bonus-2.btn.png');
        this.load.image('bonus-3-btn', 'assets/img/ui/elements/bonus-3.btn.png');

        this.load.image('rating-btn', 'assets/img/ui/elements/rating.btn.png');
        this.load.image('score-icon', 'assets/img/ui/elements/score.icon.png');
        this.load.image('player-icon', 'assets/img/ui/elements/player.icon.png');

        this.load.image('p-grid', 'assets/img/p-grid-2.png');
        this.load.image('e-grid', 'assets/img/e-grid-2.png');

        this.load.image('field', 'assets/img/field-2.png');

        this.load.spritesheet('ship.1.1.h', 'assets/img/game/ships/1/1-h.png', { frameWidth: 80, frameHeight: 80, endFrame: 5 });
        this.load.spritesheet('ship.1.1.v', 'assets/img/game/ships/1/1-v.png', { frameWidth: 80, frameHeight: 80, endFrame: 5 });
        this.load.spritesheet('ship.1.2.h', 'assets/img/game/ships/1/2-h.png', { frameWidth: 160, frameHeight: 80, endFrame: 5 });
        this.load.spritesheet('ship.1.2.v', 'assets/img/game/ships/1/2-v.png', { frameWidth: 80, frameHeight: 160, endFrame: 5 });
        this.load.spritesheet('ship.1.3.h', 'assets/img/game/ships/1/3-h.png', { frameWidth: 240, frameHeight: 80, endFrame: 5 });
        this.load.spritesheet('ship.1.3.v', 'assets/img/game/ships/1/3-v.png', { frameWidth: 80, frameHeight: 240, endFrame: 5 });
        this.load.spritesheet('ship.1.4.h', 'assets/img/game/ships/1/4-h.png', { frameWidth: 320, frameHeight: 80, endFrame: 5 });
        this.load.spritesheet('ship.1.4.v', 'assets/img/game/ships/1/4-v.png', { frameWidth: 80, frameHeight: 320, endFrame: 5 });

        this.load.spritesheet('ship.2.1.h', 'assets/img/game/ships/2/1-h.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('ship.2.1.v', 'assets/img/game/ships/2/1-v.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('ship.2.2.h', 'assets/img/game/ships/2/2-h.png', { frameWidth: 160, frameHeight: 80 });
        this.load.spritesheet('ship.2.2.v', 'assets/img/game/ships/2/2-v.png', { frameWidth: 80, frameHeight: 160 });
        this.load.spritesheet('ship.2.3.h', 'assets/img/game/ships/2/3-h.png', { frameWidth: 240, frameHeight: 80 });
        this.load.spritesheet('ship.2.3.v', 'assets/img/game/ships/2/3-v.png', { frameWidth: 80, frameHeight: 240 });
        this.load.spritesheet('ship.2.4.h', 'assets/img/game/ships/2/4-h.png', { frameWidth: 320, frameHeight: 80 });
        this.load.spritesheet('ship.2.4.v', 'assets/img/game/ships/2/4-v.png', { frameWidth: 80, frameHeight: 320 });

        this.load.spritesheet('boom', 'assets/img/game/ships/hit.png', {frameWidth: 80, frameHeight: 80, endFrame: 30});
    }

    preloadSprites() {}

    preloadSound() {
        this.load.audio('boom', ['assets/sounds/boom.wav']);
        this.load.audio('shot', ['assets/sounds/shot.wav']);
    }

    loadingText() {
        this.loadingText = this.make.text({
            x: config.width / 2,
            y: config.height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });

        this.loadingText.setOrigin(0.5, 0.5);
    }

    progressBox() {
        const self = this;

        const progressBox = this.add.graphics();
        const progressBar = this.add.graphics();
        const percentText = this.make.text({
            x: config.width / 2,
            y: config.height / 2,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(config.width / 2 - 160, config.height / 2 - 25, 320, 50);

        percentText.setOrigin(0.5, 0.5);

        self.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(config.width / 2 - 150, config.height / 2 - 15, 300 * value, 30);

            percentText.setText(parseInt(value * 100) + '%');
        });

        self.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            percentText.destroy();  
        
            this.loadingText.destroy();
        }, this);
    }

    loadMainScene() {
        this.scene.stop('preloadScene');
        this.scene.start('mainScene');
    }
}