require("dotenv").config({ path: "./config/.env" });

const { setupBot } = require("./bot");

async function setup() {
	try {
		await setupBot().launch();
		console.log("</ Бот успешно запущен >");
		process.once("SIGINT", () => setupBot().stop("SIGINT"));
		process.once("SIGTERM", () => setupBot().stop("SIGTERM"));
	} catch (error) {
		console.log(error);
	}
	return setup();
}
setup();
