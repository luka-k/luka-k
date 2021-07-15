class MainScene extends Scene {
    constructor() {
        super("mainScene");

        this.background = new GameBackground(this);
        this.menu = new Menu(this, {
            type: 'main'
        });
    }

    preload() {}

    create() {
        this.background.create();

        this.menu.create();

        this.input.setDefaultCursor('url(' + settings.cursors.defaultCursor + '), pointer');
    }

    update() {
        if (!api.updated) return;

        this.menu.update();

        api.updated = false;
    }
}