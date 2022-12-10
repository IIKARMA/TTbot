const { Telegraf, session } = require("telegraf");
const { Scenes } = require("telegraf");
const { CMD_TEXT } = require("./config/constants");
const {
	backMain,
	startAuthScene,
	startMenuScene,
} = require("./controllers/command");
const { menuScene } = require("./controllers/menuScene");
const { authorizationScene } = require("./controllers/authorizationScene");
const { calcScene } = require("./controllers/calculatorScene");
const { getUsers } = require("./services/userDB");
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const stage = new Scenes.Stage([authorizationScene, menuScene, calcScene]);

const setupBot = () => {
	bot.use(session());
	bot.use(stage.middleware());
	bot.use((ctx, next) => {
		next();
	});
	bot.command("start", async (ctx) => {
		try {
			let user = await getUsers(ctx.from.id, "auth");

			console.log("user", user);
			user !== undefined ? startMenuScene(ctx) : startAuthScene(ctx);
		} catch (error) {}
	});

	return bot;
};
module.exports = {
	setupBot,
};
