class Modal {
    constructor(params) {
        this.game = params.game ?? null;
    }

    init(config) {
        this.hasClose = config.hasClose ?? true;
        
        this.acceptHandler = config.acceptHandler ?? null;
        this.cancelHandler = config.cancelHandler ?? null;

        this.setTitle(config.title ?? "Информация")

        this.addCloseBtn();
    }

    show() {
        const modal = document.getElementById("modal");

        modal.style.display = "block";
    }

    close() {
        const modal = document.getElementById("modal");
        
        modal.style.display = "none";

        this.clear();

        if (typeof this.cancelHandler !== 'function') return;

        this.cancelHandler();
    }

    clear() {
        const modalBody = document.getElementById("modal-body");

        modalBody.classList.remove("small");
        modalBody.classList.remove("middle");
        modalBody.classList.remove("big");

        const modalContent = document.getElementById("modal-content");

        if (modalContent) {
            modalBody.removeChild(modalContent);
        }

        const modalChoice = document.getElementById("modal-choice");

        if (modalChoice) {
            modalBody.removeChild(modalChoice);
        }

        const modalBtns = document.getElementById("modal-btns");

        if (modalBtns) {
            modalBody.removeChild(modalBtns);
        }
    }

    addCloseBtn() {
        if (!this.hasClose) return;
        
        const modalBody = document.getElementById("modal-body");

        const btnClose = document.createElement("div");

        btnClose.classList.add("btn-close");

        btnClose.addEventListener("click", this.close.bind(this));

        if (this.cancelHandler) {
            btnClose.addEventListener("click", this.cancelHandler);
        }

        modalBody.appendChild(btnClose);
    }

    setTitle(title) {
        const modalTitle = document.getElementById("modal-title");

        modalTitle.innerText = title;
    }

    getPageBtns() {
        const self = this;

        const pageBtnsDiv = Forms.getDiv({
            classList: ["modal-btns"]
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

    getContentBlock() {
        alert("modal.addContent - implement me");
    }

    getChoiceBlock() {
        alert("modal.addCoiceBlock - implement me");
    }
}

class ErrorModal extends Modal {
    constructor(data) {
        super({});

        this.init({
            title: "Ошибка",
            hasClose: true,
            cancelHandler: data.cancelHandler,
        }, data);
    }

    init(config, data) {
        this.clear();
        
        const modalBody = document.getElementById("modal-body");

        modalBody.classList.add("small");

        const contentBlock = this.getContentBlock(data);

        modalBody.appendChild(contentBlock);

        super.init(config);
    }

    getContentBlock(data) {
        const modalContent = Forms.getDiv({
            classList: ["modal-content", "h-100"]
        });

        modalContent.id = 'modal-content';

        const aliasText = Forms.getDiv({
            text: data.message,
            classList: ["alias-text"]
        });

        modalContent.appendChild(aliasText);

        return modalContent;
    }
}

class AliasModal extends Modal {
    constructor(scene) {
        super(scene);

        this.init({
            title: "Псевдоним",
            hasClose: false
        });
    }

    init(config) {
        super.init(config);

        const modalBody = document.getElementById("modal-body");

        modalBody.classList.add("small");

        const contentBlock = this.getContentBlock();
        const choiceBlock = this.getChoiceBlock();

        modalBody.appendChild(contentBlock);
        modalBody.appendChild(choiceBlock);
    }

    getContentBlock() {

        const modalContent = Forms.getDiv({
            classList: ["modal-content", "h-80"]
        });

        modalContent.id = 'modal-content';

        const aliasText = Forms.getDiv({
            text: "Придумайте себе псевдоним.",
            classList: ["alias-text"]
        });

        modalContent.appendChild(aliasText);

        const aliasInput = Forms.getInput({
            classList: ["text-input", "alias-input"]
        });

        aliasInput.id = "alias-input";

        modalContent.appendChild(aliasInput);

        return modalContent;
    }

    getChoiceBlock(params) {
        const modalChoice = Forms.getDiv({
            classList: ["modal-choice", "h-20"]
        });

        modalChoice.id = "modal-choice";

        const yesBtn = Forms.getBtn({
            text: "Ok",
            classList: ["ok-btn"]
        });  

        yesBtn.addEventListener("click", this.yesHandler.bind(this));

        modalChoice.appendChild(yesBtn);

        return modalChoice;
    }

    yesHandler() {
        const aliasInput = document.getElementById("alias-input");

        if (aliasInput.value == "") {
            aliasInput.classList.add("error");

            return;
        }

        api.setAlias(aliasInput.value);

        this.close();
    }
}

class BonusModal extends Modal {
    constructor(params) {
        super({});

        this.text = params.text ?? 'Получен какой то бонус. Не понятно за что!';

        this.init();
    }

    init() {
        const modalBody = document.getElementById("modal-body");

        modalBody.classList.add("small");

        const contentBlock = this.getContentBlock();
        const choiceBlock = this.getChoiceBlock();

        modalBody.appendChild(contentBlock);
        modalBody.appendChild(choiceBlock);

        super.init({
            "title": "Ежедневный бонус"
        });
    }

    getContentBlock() {
        const modalContent = Forms.getDiv({
            classList: ["modal-content", "h-80"]
        });

        modalContent.id = 'modal-content';

        const modalText = Forms.getDiv({
            classList: ["single-text"],
            text: this.text
        });

        modalContent.appendChild(modalText);

        return modalContent;
    }

    getChoiceBlock() {
        const modalChoice = Forms.getDiv({
            classList: ["modal-choice", "h-20"]
        });

        modalChoice.id = "modal-choice";

        const yesBtn = Forms.getBtn({
            text: "Ok",
            classList: ["ok-btn"]
        });  

        yesBtn.addEventListener("click", this.close.bind(this));

        modalChoice.appendChild(yesBtn);

        return modalChoice;
    }
}

class GameEndModal extends Modal {
    constructor(params) {
        super(params);

        this.text = params.text ?? "Кажется игра закончилась!";

        this.init();
    }

    init() {
        const modalBody = document.getElementById("modal-body");

        modalBody.classList.add("small");

        const contentBlock = this.getContentBlock();
        const choiceBlock = this.getChoiceBlock();

        modalBody.appendChild(contentBlock);
        modalBody.appendChild(choiceBlock);
    }

    getContentBlock() {
        const modalContent = Forms.getDiv({
            classList: ["modal-content", "h-80"]
        });

        modalContent.id = 'modal-content';

        const modalText = Forms.getDiv({
            text: this.text
        });

        modalContent.appendChild(modalText);

        return modalContent;
    }

    getChoiceBlock() {
        const modalChoice = Forms.getDiv({
            classList: ["modal-choice", "h-20"]
        });

        modalChoice.id = "modal-choice";

        const yesBtn = Forms.getBtn({
            text: "Ok",
            classList: ["center"]
        });  

        yesBtn.addEventListener("click", this.close.bind(this));
        yesBtn.addEventListener("click", this.closeBtnHandler.bind(this));

        modalChoice.appendChild(yesBtn);

        return modalChoice;
    }

    closeBtnHandler() {
        api.getUser();

        this.game.scene.stop('gameScene');
        this.game.scene.start('mainScene');           
    }
}

class RatingModal extends Modal {
    constructor(api) {
        super([]);

        this.api = api;
        this.page = 0;
        this.totalPage = 0;
        this.batch = 5;

        this.init();
    }

    init() {
        const modalBody = document.getElementById("modal-body");

        modalBody.classList.add("big");

        const modalContent = Forms.getDiv({
            classList: ["modal-content", "h-90"]
        });

        modalContent.id = "modal-content";

        const pageBtnsDiv = this.getPageBtns({
            classList: ["modal-btns", "h-10"]
        });

        pageBtnsDiv.id = "modal-btns";

        modalBody.appendChild(modalContent);
        modalBody.appendChild(pageBtnsDiv);

        this.api.getRating(this);

        super.init({
            "title": "Рейтинг"
        });
    }

    close() {
        this.page = 0;
        this.totalPage = 0;

        super.close();
    }

    renderData(data) {

        const modalContent = document.getElementById("modal-content");

        modalContent.innerHTML = '';

        for (let i in data) {
            let user = data[i];

            const itemDiv = Forms.getDiv({});

            const avatarDiv = Forms.getDiv({});
            const avatar = Forms.getImage({
                src: user.avatar
            });

            const userInfoDiv = Forms.getDiv({});
            const userNameDiv = Forms.getDiv({
                text: user.first_name + ' ' + user.last_name
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

            avatarDiv.classList.add("rating-avatar");
            
            userInfoDiv.classList.add("rating-user-info");
            userNameDiv.classList.add("ratting-user-name");

            ratingStatDiv.classList.add("rating-stat-info");
            userLevelDiv.classList.add("rating-user-level");
            userBattleStatDiv.classList.add("rating-battle-stat");

            avatarDiv.appendChild(avatar);

            userInfoDiv.appendChild(userNameDiv);

            ratingStatDiv.appendChild(userLevelDiv);
            ratingStatDiv.appendChild(userBattleStatDiv);

            itemDiv.appendChild(avatarDiv);
            itemDiv.appendChild(userInfoDiv);
            itemDiv.appendChild(ratingStatDiv);

            modalContent.appendChild(itemDiv);
        }
    }

    setTotalPage(count) {
        //this.totalPage = Math.round(count / this.batch);

        this.totalPage = count;
    }
}

/**
 * FleetModal parent class for store and garage
 */
class FleetModal extends Modal {
    constructor(api) {
        super([]);

        this.api = api;
    }
    
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

class ShopModal extends FleetModal {
    constructor(api) {
        super(api);

        this.page = 0;
        this.totalPage = 0;
        this.batch = 5;

        this.init();
    }  
    
    init() {
        const modalBody = document.getElementById("modal-body");

        modalBody.classList.add("big");

        const modalContent = Forms.getDiv({});

        modalContent.id = "modal-content";

        modalContent.classList.add("modal-content");
        modalContent.classList.add("h-90");

        const pageBtnsDiv = this.getPageBtns();

        pageBtnsDiv.id = "modal-btns";

        modalBody.appendChild(modalContent);
        modalBody.appendChild(pageBtnsDiv);

        this.api.getFleet(this);

        super.init({
            "title": "Магазин",
            hasClose: true
        });
    }  
    
    close() {
        this.page = 0;
        this.totalPage = 0;

        super.close();
    }

    renderData(data) {
        const modalContent = document.getElementById("modal-content");

        modalContent.innerHTML = '';

        for (let i in data) {
            let storeItem = data[i];

            const itemDiv = Forms.getDiv({});

            itemDiv.classList.add("hangar-item");

            itemDiv.appendChild(this.getAvatar(1, storeItem.skin));
            itemDiv.appendChild(this.getAvatar(2, storeItem.skin));
            itemDiv.appendChild(this.getAvatar(3, storeItem.skin));
            itemDiv.appendChild(this.getAvatar(4, storeItem.skin));
            
            modalContent.appendChild(itemDiv);

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

class GarageModal extends FleetModal {
    constructor(api) {
        super(api);

        this.intervalID = null;

        this.init();
    }   
    
    init() {
        const modalBody = document.getElementById("modal-body");

        modalBody.classList.add("big");

        this.api.getUserFleets(this);

        const modalContent = Forms.getDiv({});

        modalContent.id = "modal-content";

        modalContent.classList.add("modal-content");
        modalContent.classList.add("h-100");

        modalBody.appendChild(modalContent);

        super.init({
            "title": "Флот",
            hasClose: true
        });
    }

    close() {
        super.close();

        clearInterval(this.intervalID);
    }

    renderData(data) {
        const modalContent = document.getElementById("modal-content");

        modalContent.innerHTML = '';

        for (let i in data) {
            let fleet = data[i];

            const itemDiv = Forms.getDiv({});

            itemDiv.classList.add("hangar-item");

            itemDiv.appendChild(this.getAvatar(1, fleet.skin));
            itemDiv.appendChild(this.getAvatar(2, fleet.skin));
            itemDiv.appendChild(this.getAvatar(3, fleet.skin));
            itemDiv.appendChild(this.getAvatar(4, fleet.skin));

            modalContent.appendChild(itemDiv);

            const chargeItemDiv = Forms.getDiv({
                classList: ["charge-item"]
            });

            chargeItemDiv.id = "charge-item-" + fleet.id;
            chargeItemDiv.dataset.fleetId = fleet.id;
            
            const chargeImg = Forms.getImage({
                src: "assets/img/ui/elements/charge.png"
            });

            chargeItemDiv.appendChild(chargeImg); 

            const chargeCountItem = Forms.getDiv({
                classList: ["charge-count"]
            })

            chargeCountItem.id = "charge-" + fleet.id;
            chargeCountItem.innerText = fleet.charge;

            if (!fleet.charge) {
                chargeCountItem.classList.add("hide");
            }

            chargeItemDiv.appendChild(chargeCountItem);

            itemDiv.appendChild(chargeItemDiv);

            if (fleet.service) {
                const timerDiv = Forms.getDiv({
                    classList: ["charge-timer-item"]
                });
    
                timerDiv.id = "timer-" + fleet.id;
                timerDiv.dataset.fleetId = fleet.id;

                const leftTime = fleet.service - this.api.servertime;

                let formatted = '';

                if (leftTime > 0) {
                    const hours = Math.floor(leftTime / 60 / 60);
                    const minutes = Math.floor(leftTime / 60) - (hours * 60);
                    const seconds = leftTime % 60; 

                    formatted = [
                        hours.toString().padStart(2, '0'),
                        minutes.toString().padStart(2, '0'),
                        seconds.toString().padStart(2, '0')
                    ].join(':');

                    this.setChargeTimer(timerDiv, fleet.id, fleet.service);
                } else {
                    this.api.fleetRecharge(this, fleet.id, true);
                }

                timerDiv.innerText = formatted;
                
                itemDiv.appendChild(timerDiv);

                const chargeBtn = this.getChargeBtn(fleet.id);
            
                chargeItemDiv.appendChild(chargeBtn);

                return;
            }
        
            if (fleet.id != this.api.user.fleet_id) {
                const activateBtn = this.getActivateBtn(fleet.id);
    
                chargeItemDiv.appendChild(activateBtn);
            }
        }
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

