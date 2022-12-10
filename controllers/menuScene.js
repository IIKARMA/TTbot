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
const { getUserTT, getUserVideoInfo } = require("../services/getUserTT");
const { setUser, getUsers } = require("../services/userDB");
const menuScene = new Scenes.BaseScene("menu");

menuScene.enter((ctx) => {
	ctx.reply(CMD_TEXT.thisMain, { ...mainMenu });
});
// menuScene.command("start", (ctx) =>
// 	ctx.reply(CMD_TEXT.thisMain, { ...mainMenu }),
// );
menuScene.on("message", async (ctx) => {
	try {
		console.log("ctx", ctx);
		const user = await getUsers(ctx.from.id, "auth");
		const view = await getUsers(ctx.from.id, "views");
		const msg = ctx.message;
		// await getUserVideoInfo("candy.superstar");
		return handleButton(ctx, msg, user, view);
	} catch (error) {}
});

const handleButton = async (ctx, msg, user, view) => {
	const pattern = /(\d+\.\d+|\d+)/;
	const balance = ` ${view} грн.`;
	// const balance = await user.substr(index, index + 4);
	switch (msg.text) {
		case CMD_TEXT.profile:
			await ctx.reply(user, {
				parse_mode: "HTML",
			});
			break;
		case CMD_TEXT.balance:
			await ctx.reply(`${CMD_TEXT.prayc}${balance}`, {
				disable_web_page_preview: true,
				parse_mode: "HTML",
				...calculButton,
			});

			break;
		case CMD_TEXT.tags:
			await ctx.reply("Хеш-тег для відео⤵️\n\n#КендіСуперстар");
			break;
		case CMD_TEXT.video:
			await ctx.reply(CMD_TEXT.goVideo, { ...goVideo });
			break;
		case CMD_TEXT.info:
			await ctx.reply(CMD_TEXT.full_info);
			break;
		case "Калькулятор":
			{
				ctx.scene.leave();
				ctx.scene.enter("calc");
			}
			break;
		case CMD_TEXT.menu:
			await ctx.reply(CMD_TEXT.thisMain, { ...mainMenu });
			break;
		default:
			break;
	}
};

module.exports = {
	menuScene,
};
