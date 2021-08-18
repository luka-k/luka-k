class Api {
    constructor() {
        this.xhr = new Xhr();

        this.servertime = 0;

        this.updated = false;

        this.userID = 0;
        this.user = null;

        this.init();
    }

    init() {
        setInterval(() => {
            this.heartBeat();
        }, 1000 * 60);

        setInterval(() => {
            this.servertime++;
        }, 1000);
    }

    auth(credential) {
        this.xhr.clear();

        this.xhr.method = 'POST';
        this.xhr.url = '/auth';
        this.xhr.handler = this.authHandler.bind(this);

        this.xhr.body = {
            "credential": credential
        };

        this.xhr.send();
    }

    authHandler(response) {

        console.log(response);
    }

    authOld() {
        this.xhr.clear();

        this.xhr.method = 'POST';
        this.xhr.url = '/auth';
        this.xhr.handler = this.authHandler.bind(this);

        this.xhr.body = {
            "data": {
                "userId": this.userID
            }
        };

        this.xhr.send();
    }

    authHandlerOld(response) {
        if (!response.data) return false;

        localStorage.setItem('jwt-' + this.userID, response.data.token);

        this.servertime = response.data.servertime;

        this.getUser();
    }

    heartBeat() {
        this.xhr.clear();
        
        this.xhr.jwt = true;
        this.xhr.method = 'POST';
        this.xhr.url = '/users/' + this.userID + '/heartbeat';

        this.xhr.handler = this.heartBeatHandler.bind(this);

        this.xhr.send();
    }

    heartBeatHandler(response) {
        if (!response.data) return false;

        this.servertime = response.data.servertime;
    }

    getUser() {
        this.xhr.clear();

        this.xhr.jwt = true;
        this.xhr.method = 'GET';
        this.xhr.url = '/users/' + this.userID;
        this.xhr.handler = this.getUserHandler.bind(this);

        this.xhr.send();
    }
    
    getUserHandler(response) {
        if (!response.data) return false;

        const oldUser = this.user;
        
        this.user = response.data.user;
        this.updated = true;
    
        if (response.data.isBonus) {
            const bonusModal = new BonusModal({
                text: "Ежедневный бонус получен! +100 нанокристалов!"
            });
    
            bonusModal.show();
        }

        if (oldUser == null) return;

        if (oldUser.level < this.user.level) {
            let modalText = "Поздравляем! Ваш уровень стал - " + this.user.level;

            if (oldUser.rankId < this.user.rankId) {
                modalText += "<br><br>";
                modalText += "Получено новое звание: " + this.user.rank.title;
            }

            const levelUpModal = new BonusModal({
                text: modalText
            });
    
            levelUpModal.show();    
        }

        if (this.user.haveBonus) {
            const bonusModal = new BonusModal({
                text: "Ежедневный бонус получен! +100 нанокристалов!"
            });
    
            bonusModal.show();
        }
    }

    getRating(modal) {
        this.xhr.clear();

        this.xhr.jwt = true;
        this.xhr.method = 'GET';
        this.xhr.url = '/ratings/full?page=' + modal.page;

        this.xhr.handler = function(response) {
            modal.renderData(response.data);
            modal.setTotalPage(response.count); 
        };

        this.xhr.send();  
    }

    getFleet(modal) {
        this.xhr.clear();

        this.xhr.jwt = true;
        this.xhr.method = 'GET';
        this.xhr.url = '/store/fleets?page=' + modal.page;

        this.xhr.handler = function(response) {

            modal.renderData(response.data);
            modal.setTotalPage(response.count); 
        };

        this.xhr.send();
    }

    buyFleet(modal, fleetID) {
        this.xhr.clear();

        this.xhr.jwt = true;
        this.xhr.method = 'POST';
        this.xhr.body = {
            "user_id": this.userID,
            "fleet_id": fleetID
        };

        this.xhr.url = '/store/fleets';

        this.xhr.handler = function (response) {
            console.log(data);  
        }

        this.xhr.send();
    }

    getUserFleets(modal) {
        this.xhr.clear();
        
        this.xhr.jwt = true;
        this.xhr.method = 'GET';

        this.xhr.url = '/users/' + this.userID + '/fleets';

        this.xhr.handler = function(response) {
            modal.renderData(response.data); 
        };

        this.xhr.send();
    }

    fleetRecharge(modal, fleetID, paid) {

        if (!fleetID) {
            console.log("No fleet ID");
            return;
        }

        if (typeof paid == "undefined" ) {
            console.log("Paid must be filled");
            return;
        }

        this.xhr.clear();
        
        this.xhr.jwt = true;
        this.xhr.method = 'POST';
        this.xhr.url = '/users/' + this.userID + '/fleets/' + fleetID + '/recharge';
        this.xhr.body = {
            "paid": paid
        };

        this.xhr.handler = function(response) {
            modal.renderRecharge(response.data, fleetID);
        }

        this.xhr.send();
    }

    fleetActivate(modal, fleetID) {
        if (!fleetID) {
            console.log("No fleet ID");
            return;
        }  
        
        this.xhr.clear();

        this.xhr.jwt = true;
        this.xhr.method = 'POST';
        this.xhr.url = '/users/' + this.userID + '/fleets/' + fleetID + '/activate';

        this.xhr.handler = function(response) {
            modal.activateBtnRender(response.data);
        }

        this.xhr.send();
    }

    setAlias(alias, handler) {
        this.xhr.method = 'POST';
        this.xhr.url = '/users/' + this.userID + '/alias';
        this.xhr.body = {
            "data": {
                "alias": alias
            }
        };

        this.xhr.handler = handler;

        this.xhr.send();
    }
}