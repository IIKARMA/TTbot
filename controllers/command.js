// Commands for bot
const { mainMenu, backMenuButton } = require("../utils/buttons");
const { CMD_TEXT } = require("../config/constants.js");

const start = (ctx) =>
	ctx.reply(CMD_TEXT.descriotionBot, {
		disable_web_page_preview: true,
		parse_mode: "HTML",
		...mainMenu,
	});
const backMain = (ctx) =>
	ctx.reply({
		disable_web_page_preview: true,
		parse_mode: "HTML",
		...mainMenu,
	});

const startAuthScene = (ctx) => ctx.scene.enter("authorization");
const startMenuScene = (ctx) => ctx.scene.enter("menu");
module.exports = {
	start,
	backMain,
	startAuthScene,
	startMenuScene,
};
