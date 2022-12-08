const { Scenes } = require("telegraf");
const {
	backMenuButton,
	mainMenu,
	goVideo,
	calculButton,
} = require("../utils/buttons");
const { Markup } = require("telegraf");
const { regExper } = require("../utils/regExp");
const { calculView } = require("../utils/calculView");
const { CMD_TEXT } = require("../config/constants");
const { backMain } = require("./command");
const { getUserTT } = require("../services/getUserTT");
const { setUser, getUsers } = require("../services/userDB");
const menuScene = new Scenes.BaseScene("menu");

menuScene.enter((ctx) => {
	return ctx.reply(CMD_TEXT.thisMain, { ...mainMenu });
});
menuScene.command("start", async (ctx) => {
	return ctx.reply(CMD_TEXT.thisMain, { ...mainMenu });
});
menuScene.on("message", async (ctx) => {
	try {
		const user = await getUsers(ctx.from.id);
		const msg = ctx.message;
		return handleButton(ctx, msg, user);
	} catch (error) {}
});

const handleButton = (ctx, msg, user) => {
	const pattern = /\d+\.\d+/;
	const balance = user.match(pattern);
	// const balance = await user.substr(index, index + 4);
	switch (msg.text) {
		case CMD_TEXT.profile:
			return ctx.reply(user, {
				parse_mode: "HTML",
			});
			break;
		case CMD_TEXT.balance:
			return ctx.reply(
				`🏦 Банк\n\n10.000 - 25 грн\n100к - 250 грн\n1М - 2500 гр\n\n<b>На вашому рахунку:</b> ${balance}`,
				{
					disable_web_page_preview: true,
					parse_mode: "HTML",
					...calculButton,
				},
			);
			break;
		case CMD_TEXT.tags:
			return ctx.reply("Хеш-тег для відео⤵️\n\n#КендіСуперстар");
			break;
		case CMD_TEXT.video:
			return ctx.reply(CMD_TEXT.goVideo, { ...goVideo });
			break;
		case CMD_TEXT.info:
			return ctx.reply(CMD_TEXT.full_info);
			break;
		case "Калькулятор":
			{
				ctx.scene.leave();
				return ctx.scene.enter("calc");
			}
			break;
		case CMD_TEXT.menu:
			return ctx.reply(CMD_TEXT.thisMain, { ...mainMenu });
			break;
		default:
			break;
	}
};

module.exports = {
	menuScene,
};
