class ApiMock {
    constructor() {
        this.servertime = 0;

        this.updated = false;

        this.userID = "";
        this.user = null;

        this.init();
    }

    init() {
        this.getUserID();

        this.auth();

        this.heartBeat();
        this.serverTime();

        this.getUser();
    }

    getUserID() {
        this.userID = "123e4567-e89b-12d3-a456-426614174000"
    }

    auth() {
        
        localStorage.setItem(this.userID, "123e4567-e89b-12d3-a456-426614174000");

        this.servertime = Math.round(new Date().getTime() / 1000); 
    }

    heartBeat() {
        setInterval(() => {
            console.log("Heartbeat");       
        }, 1000 * 60);
    }

    serverTime() {
        setInterval(() => {
            this.servertime++;
        }, 1000);
    }

    getUser() {
        const oldUser = this.user;

        this.user = {
            userID: "123e4567-e89b-12d3-a456-426614174000",
            alias: "lukazavr",
            isBonus: false,
            level: 1,
            nano_crystall: 1000,
            anty_crystall: 100,
            wins: 2,
            fails: 3
        };

        this.updated = true;

        this.showBunusModal();

        if (oldUser == null) return;

        this.showLevelModal();
    }

    showBunusModal() {

        if (!this.user.isBonus) return;

        const bonusModal = new BonusModal({
            text: "Ежедневный бонус получен! +100 нанокристалов!"
        });
    
        bonusModal.show();
    }

    showLevelModal() {
        if (oldUser.level > this.user.level) return;
        
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