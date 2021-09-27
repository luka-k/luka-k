class MainScene extends Scene {
    constructor() {
        super("mainScene");

        this.menu = new Menu(this, {
            type: 'main'
        });
    }

    preload() {}

    create() {
        let info = new HangarInfo({api: api});
            
        info.render(); 

        this.menu.create();

        this.input.setDefaultCursor('url(' + settings.cursors.defaultCursor + '), pointer');
    }

    update() {
        if (!api.updated) return;

        this.menu.update();

        api.updated = false;
    }
}