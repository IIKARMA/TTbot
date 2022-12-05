//Buttons for bot
const { Markup } = require("telegraf");
const { CMD_TEXT } = require("../config/constants");

const mainMenu = Markup.keyboard([
	[CMD_TEXT.video, CMD_TEXT.info],
	[CMD_TEXT.tags, CMD_TEXT.balance],
	[Markup.button.text(CMD_TEXT.profile)],
]).resize();

const backMenuButton = Markup.keyboard([[CMD_TEXT.menu]]).resize();
module.exports = {
	mainMenu,
	backMenuButton,
};
