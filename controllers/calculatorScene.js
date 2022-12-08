const { Scenes } = require("telegraf");
const {
	backMenuButton,
	mainMenu,
	goVideo,
	calculButton,
} = require("../utils/buttons");
const { Markup } = require("telegraf");
const { calculView } = require("../utils/calculView");
const { CMD_TEXT } = require("../config/constants");
const { backMain } = require("./command");

const calcScene = new Scenes.BaseScene("calc");
calcScene.enter((ctx) => {
	return ctx.reply(CMD_TEXT.writeCountViews);
	console.log("Enter calc");
});

calcScene.hears(/\d+/, async (ctx) => {
	ctx.reply(calculView(ctx.match.input), { ...backMenuButton });
});
calcScene.hears(CMD_TEXT.menu, async (ctx) => {
	ctx.scene.leave();
	ctx.scene.enter("menu");
});
module.exports = { calcScene };
