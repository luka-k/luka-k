class Socket {
    constructor(scene) {
        this.scene = scene;

        this.url = env.socketUrl;
    }

    create() {
        this.socket = new WebSocket(this.url + "?id=" + api.user.id);

        this.socket.onopen = this.socketOnOpen.bind(this);  
        this.socket.onclose = this.socketOnClose.bind(this);
        this.socket.onmessage = this.socketOnMessage.bind(this);
        this.socket.onerror = this.socketOnError.bind(this);
    }

    close() {
        this.socket.close();
    }

    send(data) {
        this.socket.send(JSON.stringify(data))
    }

    socketOnOpen() {
        // TODO debug mode
        console.log("Соединение установлено.");
    }

    socketOnClose(event) {
        let msg = '';

        if (event.wasClean) {
            msg = 'Обрыв соединения.\n\n';
        }

        msg += event.reason
                
        const errorModal = new ErrorModal({
            message: msg,
            cancelHandler: this.errorModalCloseHandler.bind(this)
        });
        
        errorModal.show();
    }

    socketOnError(error) {
        console.log("Ошибка " + error.message);
    }

    errorModalCloseHandler() {
        this.scene.scene.stop('gameScene');
        this.scene.scene.start('mainScene'); 
    }

    socketOnMessage(event) {
        const response = JSON.parse(event.data);

        if (response.action == undefined) {
            console.log("Не указано действие");
            return;
        }

        switch (response.action) {
            case 'player':
                this.scene.battle.fleetId = response.data.fleetId;
                break;
            case 'map':
                this.scene.battle.setPlayerGround(response.data);
                break;
            case 'state':
                this.scene.battle.changeState(response.data);
                break;
            case 'enemy':
                this.scene.battle.setEnemyInfo(response.data.enemy);
                break;
            case 'miss-p':
                this.scene.battle.missPlayerPlate(response.data);
                break;
            case 'miss-e':
                this.scene.battle.missEnemyPlate(response.data);
                break;
            case 'hitting':
                this.scene.battle.enemyShipStub(response.data);
                break;
            case 'atack':
                this.scene.battle.playerShipStub(response.data);
                break;
            case 'win':
                this.scene.battle.enemyShipStub(response.data);
                this.scene.battle.playerWin();
                break;
            case 'loss':
                this.scene.battle.playerShipStub(response.data);
                this.scene.battle.playerLoss();
                break;
            default:
                break;
        }
    }
}