const { Scenes } = require("telegraf");
const { backMenuButton, mainMenu } = require("../utils/buttons");
const { Markup } = require("telegraf");
const { regExper } = require("../utils/regExp");
const { CMD_TEXT } = require("../config/constants");
const { backMain, startMenuScene } = require("./command");
const { getUserTT } = require("../services/getUserTT");
const { setUser, getUsers } = require("../services/userDB");
const authorizationScene = new Scenes.BaseScene("authorization");

authorizationScene.enter((ctx) => ctx.reply(CMD_TEXT.descriptionBot));

authorizationScene.hears(
	/https:\/\/www.tiktok.com\/@(?<nick>([\w.]+))[\S]+?/g,
	async (ctx) => {
		try {
			this.chatId = ctx.from.id;
			this.username = ctx.match.groups.nick.toString();

			const data = await getUserTT(this.username);

			await setUser({
				chatId: this.chatId,
				user: data.data.user,
				stats: data.data.stats,
			});

			ctx.reply(CMD_TEXT.requestTrue, { ...backMenuButton });
		} catch (error) {
			ctx.reply(CMD_TEXT.error);
		}
	}
);
authorizationScene.hears(/\w+/g, (ctx) => {
	ctx.reply(CMD_TEXT.getLink);
});

authorizationScene.hears(CMD_TEXT.menu, (ctx) => {
	ctx.scene.leave();
	ctx.scene.enter("menu");
	return backMain(ctx);
});

module.exports = {
	authorizationScene,
};
