/**
 * App configuration
 */

settings.init();
config.init();

console.log(config);

//const api = new Api();
const api = new ApiMock();

const intervalID = setInterval(() => {
    
    if (!api.user) return;
    
    const game = new Phaser.Game(config);

    clearInterval(intervalID);
}, 100);