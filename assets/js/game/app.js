/**
 * App configuration
 */

settings.init();
config.init();

const api = new ApiMock();

const game = new Phaser.Game(config);