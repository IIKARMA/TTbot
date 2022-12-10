//Buttons for bot
const { Markup } = require("telegraf");
const { CMD_TEXT } = require("../config/constants");

const mainMenu = Markup.keyboard([
	[CMD_TEXT.video, CMD_TEXT.info],
	[CMD_TEXT.tags, CMD_TEXT.balance],
	[CMD_TEXT.profile],
]).resize();
const goVideo = Markup.inlineKeyboard("sd", [
	Markup.button.url("Перейти", "https://t.me/+QdC3HMutxt5kY2E6"),
]);

const backMenuButton = Markup.keyboard([[CMD_TEXT.menu]]).resize();
const calculButton = Markup.keyboard([["Калькулятор"], [CMD_TEXT.menu]])
	.oneTime()
	.resize();
module.exports = { goVideo, mainMenu, backMenuButton, calculButton };
