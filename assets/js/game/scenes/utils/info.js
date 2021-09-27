class Info {

    constructor(params) {
        this.api = params.api ?? null;
        this.game = params.game ?? null;
    }

    render() {}

    clear() {
        const infoBody = document.getElementById("info-body");
        const infoContent = document.getElementById("info-content");
        const infoBtns = document.getElementById("info-btns");

        if (infoContent) {
            infoBody.removeChild(infoContent);
        }

        if (infoBtns) {
            infoBody.removeChild(infoBtns);
        }
    }

    getPageBtns() {
        const self = this;

        const pageBtnsDiv = Forms.getDiv({
            classList: ["info-btns"]
        });

        const prevBtn = Forms.getBtn({
            text: "◄"
        });

        prevBtn.classList.add("prev-btn");

        prevBtn.addEventListener("click", function () {
            if (self.page == 0) return;

            self.page -= self.batch; 

            self.api.getRating(self);   
        });

        const nextBtn = Forms.getBtn({
            text: "►"
        });

        nextBtn.classList.add("next-btn");

        nextBtn.addEventListener("click", function () {
        
            if (self.totalPage - self.page < self.batch) return;

            self.page += self.batch;

            self.api.getRating(self);    
        });

        pageBtnsDiv.appendChild(prevBtn);
        pageBtnsDiv.appendChild(nextBtn);

        return pageBtnsDiv;
    }
}

class FleetInfo extends Info {
    getAvatar(type, fleetID) {
        const avatarFirstDiv = Forms.getDiv({
            classList: ['hangar-avatar', 'hangar-avatar-' + type]
        });

        const avatarFirst = Forms.getImage({
            src: "assets/img/game/ships/" + fleetID + "/" + type + "-v.png"
        });

        avatarFirstDiv.appendChild(avatarFirst);

        return avatarFirstDiv;
    }
}

class HangarInfo extends FleetInfo {

    constructor(params) {
        super(params);

        this.render();
    }

    render() {
        this.clear();

        const infoBody = document.getElementById("info-body");

        const infoContent = Forms.getDiv({});

        infoContent.id = "info-content";

        infoContent.classList.add("info-content");

        infoBody.appendChild(infoContent);

        this.renderData();
    }

    renderData() {
        const infoContent = document.getElementById("info-content");

        infoContent.innerHTML = '';
        
        api.user.fleet = {
            id: 1,
            skin: 1,
            charge: 3,
            service: 0
        };

        const itemDiv = Forms.getDiv({});

        itemDiv.classList.add("hangar-item");

        itemDiv.appendChild(this.getAvatar(1, api.user.fleet.skin));
        itemDiv.appendChild(this.getAvatar(2, api.user.fleet.skin));
        itemDiv.appendChild(this.getAvatar(3, api.user.fleet.skin));
        itemDiv.appendChild(this.getAvatar(4, api.user.fleet.skin));

        infoContent.appendChild(itemDiv);

        const chargeItemDiv = Forms.getDiv({
            classList: ["charge-item"]
        });

        chargeItemDiv.id = "charge-item-" + api.user.fleet.id;
        chargeItemDiv.dataset.fleetId = api.user.fleet.id;
            
        const chargeImg = Forms.getImage({
            src: "assets/img/ui/elements/charge.png"
        });

        chargeItemDiv.appendChild(chargeImg); 

        const chargeCountItem = Forms.getDiv({
            classList: ["charge-count"]
        })

        chargeCountItem.id = "charge-" + api.user.fleet.id;
        chargeCountItem.innerText = api.user.fleet.charge;

        if (!api.user.fleet.charge) {
            chargeCountItem.classList.add("hide");
        }

        chargeItemDiv.appendChild(chargeCountItem);

        itemDiv.appendChild(chargeItemDiv);

        if (!api.user.fleet.service) {
            return;
        }
        
        const timerDiv = Forms.getDiv({
            classList: ["charge-timer-item"]
        });
    
        timerDiv.id = "timer-" + api.user.fleet.id;
        timerDiv.dataset.fleetId = api.user.fleet.id;

        const leftTime = api.user.fleet.service - this.api.servertime;

        let formatted = '';

        if (leftTime === 0) {
            this.api.fleetRecharge(this, api.user.fleet.id, true);
        } else {
            const hours = Math.floor(leftTime / 60 / 60);
            const minutes = Math.floor(leftTime / 60) - (hours * 60);
            const seconds = leftTime % 60; 

            formatted = [
                hours.toString().padStart(2, '0'),
                minutes.toString().padStart(2, '0'),
                seconds.toString().padStart(2, '0')
            ].join(':');

            this.setChargeTimer(timerDiv, api.user.fleet.id, api.user.fleet.service);
        }

        timerDiv.innerText = formatted;
                
        itemDiv.appendChild(timerDiv);

        const chargeBtn = this.getChargeBtn(api.user.fleet.id);
            
        chargeItemDiv.appendChild(chargeBtn);
    }

    getChargeBtn(fleetID) {
        const chargeBtn = Forms.getBtn({
            classList: ["charge-btn", "right"],
            text: "Сервис"
        }); 

        chargeBtn.id = "charge-btn-" + fleetID;
        chargeBtn.dataset.fleetId = fleetID;
        
        chargeBtn.addEventListener("click", this.chargeBtnHandler.bind(this));

        return chargeBtn;
    }

    chargeBtnHandler(event) {
        if (event.target.classList.contains("block")) return;

        const fleetID = event.target.dataset.fleetId;

        if (this.api.user.nanoCrystall < 50) {
            alert("No money");
            return;
        }

        this.api.fleetRecharge(this, fleetID, true);
    }

    activateBtnHandler(event) {
        const fleetID = event.target.dataset.fleetId;

        this.api.fleetActivate(this, fleetID);
    }

    activateBtnRender(activeFleetID) {
        let chargeItemDivs = document.getElementsByClassName("charge-item");

        for (let chargeItemDiv of chargeItemDivs) {

            if (chargeItemDiv.id == "charge-item-" + activeFleetID) {
                let activateBtn = document.getElementById("activate-btn-" + activeFleetID);    

                chargeItemDiv.removeChild(activateBtn);

                continue;
            }

            let fleetID = chargeItemDiv.dataset.fleetId;

            let activateBtn = this.getActivateBtn(fleetID);

            chargeItemDiv.appendChild(activateBtn);
        }
    }

    getActivateBtn(fleetID) {
        const activateBtn = Forms.getBtn({
            classList: ["charge-btn", "right"],
            text: "Выбрать"
        });

        activateBtn.id = "activate-btn-" + fleetID;
        activateBtn.dataset.fleetId = fleetID;

        activateBtn.addEventListener("click", this.activateBtnHandler.bind(this));

        return activateBtn;
    }

    setChargeTimer(timerDiv, fleetID, fleetService) {
        const self = this;

        this.intervalID = setInterval(() => {
            const interval = fleetService - self.api.servertime;

            if (interval <= 0) {
                self.api.fleetRecharge(self, fleetID, false);

                return;
            }

            const hours = Math.floor((interval) / 60 / 60);
            const minutes = Math.floor((interval) / 60) - (hours * 60);
            const seconds = (interval) % 60; 

            const formatted = [
                hours.toString().padStart(2, '0'),
                minutes.toString().padStart(2, '0'),
                seconds.toString().padStart(2, '0')
            ].join(':');

            timerDiv.innerText = formatted;
        }, 1000);
    }

    renderRecharge(data, fleetID) {

        clearInterval(this.intervalID);

        const fleetCharge = document.getElementById("charge-" + fleetID);

        fleetCharge.classList.remove("hide");
        fleetCharge.innerHTML = 3;
        
        const fleetChargeBtn = document.getElementById("charge-btn-" + fleetID);

        fleetChargeBtn.classList.add("hide");

        const fleetTimer = document.getElementById("timer-" + fleetID);

        fleetTimer.remove();
    }
}

class ShopInfo extends FleetInfo {
    constructor(params) {
        super(params);

        this.page = 0;
        this.totalPage = 0;
        this.batch = 5;
    }  
    
    render() {
        this.clear();

        const infoBody = document.getElementById("info-body");

        infoBody.classList.add("big");

        const infoContent = Forms.getDiv({});

        infoContent.id = "info-content";

        infoContent.classList.add("info-content");
        infoContent.classList.add("h-90");

        infoBody.appendChild(infoContent);

        this.api.getFleet(this);
    }  
    
    renderData(data) {
        const infoContent = document.getElementById("info-content");

        infoContent.innerHTML = '';

        for (let i in data) {
            let storeItem = data[i];

            const itemDiv = Forms.getDiv({});

            itemDiv.classList.add("hangar-item");

            itemDiv.appendChild(this.getAvatar(1, storeItem.skin));
            itemDiv.appendChild(this.getAvatar(2, storeItem.skin));
            itemDiv.appendChild(this.getAvatar(3, storeItem.skin));
            itemDiv.appendChild(this.getAvatar(4, storeItem.skin));
            
            infoContent.appendChild(itemDiv);

            const storeItemInfoDiv = Forms.getDiv({});

            storeItemInfoDiv.classList.add("store-item-info");

            const storeItemNameDiv = Forms.getDiv({
                text: storeItem.title
            });

            storeItemNameDiv.classList.add("store-item-name");

            storeItemInfoDiv.appendChild(storeItemNameDiv);

            itemDiv.appendChild(storeItemInfoDiv);

            const storePriceDiv = Forms.getDiv({
                text: storeItem.price
            });

            storePriceDiv.classList.add("store-price");

            const storeBuyDiv = Forms.getDiv({});

            storeBuyDiv.classList.add("store-buy");

            const storeIcon = Forms.getImage({
                src: "assets/img/ui/elements/yellow.crystal.png"
            });

            storeBuyDiv.appendChild(storeIcon);

            storeBuyDiv.appendChild(storePriceDiv);

            const buyBtn = Forms.getBtn({
                text: "Купить"
            });
    
            buyBtn.classList.add("buy-btn");
            buyBtn.dataset.itemId = storeItem.id;
    
            buyBtn.addEventListener("click", this.buyBtnHandler.bind(this));

            storeBuyDiv.appendChild(buyBtn);

            itemDiv.appendChild(storeBuyDiv);
        }
    }

    buyBtnHandler(event) {
        this.api.buyFleet(this, event.target.dataset.itemId);
    }

    setTotalPage(count) {
        this.totalPage = count;
    }
}

class RatingInfo extends Info {
    constructor(params) {
        super(params);

        this.page = 0;
        this.totalPage = 0;
        this.batch = 5;
    }

    render() {
        const infoBody = document.getElementById("info-body");

        infoBody.classList.add("big");

        const infoContent = Forms.getDiv({
            classList: ["info-content", "h-90"]
        });

        infoContent.id = "info-content";

        const pageBtnsDiv = this.getPageBtns({
            classList: ["info-btns", "h-10"]
        });

        pageBtnsDiv.id = "info-btns";

        infoBody.appendChild(infoContent);
        infoBody.appendChild(pageBtnsDiv);

        this.api.getRating(this);
    }

    close() {
        this.page = 0;
        this.totalPage = 0;

        super.close();
    }

    renderData(data) {

        const infoContent = document.getElementById("info-content");

        infoContent.innerHTML = '';

        for (let i in data) {
            let user = data[i];

            const itemDiv = Forms.getDiv({});

            const userInfoDiv = Forms.getDiv({});
            const userNameDiv = Forms.getDiv({
                text: user.position + ". " + user.alias
            });

            //TODO информация о званиях и наградах

            const ratingStatDiv = Forms.getDiv({});

            const userLevelDiv = Forms.getDiv({
                text: user.level
            });

            const userBattleStatDiv = Forms.getDiv({
                text: user.wins + '/' + user.fails
            });

            itemDiv.classList.add("rating-item");
            
            userInfoDiv.classList.add("rating-user-info");
            userNameDiv.classList.add("ratting-user-name");

            ratingStatDiv.classList.add("rating-stat-info");
            userLevelDiv.classList.add("rating-user-level");
            userBattleStatDiv.classList.add("rating-battle-stat");

            userInfoDiv.appendChild(userNameDiv);

            ratingStatDiv.appendChild(userLevelDiv);
            ratingStatDiv.appendChild(userBattleStatDiv);

            itemDiv.appendChild(userInfoDiv);
            itemDiv.appendChild(ratingStatDiv);

            infoContent.appendChild(itemDiv);
        }
    }

    setTotalPage(count) {
        //this.totalPage = Math.round(count / this.batch);

        this.totalPage = count;
    }
}