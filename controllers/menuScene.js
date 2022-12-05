const { Scenes } = require("telegraf");
const { backMenuButton, mainMenu } = require("../utils/buttons");
const { Markup } = require("telegraf");
const { regExper } = require("../utils/regExp");
const { CMD_TEXT } = require("../config/constants");
const { backMain } = require("./command");
const { getUserTT } = require("../services/getUserTT");
const { setUser, getUsers } = require("../services/userDB");
const menuScene = new Scenes.BaseScene("menu");

menuScene.enter((ctx) => {
	ctx.reply(CMD_TEXT.thisMain, { ...mainMenu });
	console.log("Enter menu");
});

menuScene.on("message", async (ctx) => {
	try {
		const msg = ctx.message;
		console.log(msg.text);
		await handleButton(ctx, msg);
	} catch (error) {}
});

menuScene.hears(CMD_TEXT.menu, (ctx) => {
	return backMain(ctx);
});
const handleButton = async (ctx, msg) => {
	const user = await getUsers(ctx.from.id);
	const pattern = /\d+\.\d+/;
	const balance = user.match(pattern);
	// const balance = await user.substr(index, index + 4);
	switch (msg.text) {
		case CMD_TEXT.profile:
			ctx.reply(user, {
				parse_mode: "HTML",
			});
			break;
		case CMD_TEXT.balance:
			ctx.reply(`🏦 Банк\n\n<b>На вашому рахунку:</b> ${balance}`, {
				disable_web_page_preview: true,
				parse_mode: "HTML",
			});
			break;
		case CMD_TEXT.tags:
			ctx.reply("#️⃣Тут буде  Хеш-тег");
			break;
		case CMD_TEXT.video:
			ctx.reply("#️⃣Тут будуть відео");
			break;
		case CMD_TEXT.info:
			ctx.reply(CMD_TEXT.full_info);
			break;
		default:
			return backMain(ctx);
	}
};

module.exports = {
	menuScene,
};
