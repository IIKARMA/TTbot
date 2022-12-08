require("dotenv").config();

const { setupBot } = require("./bot");

function setup() {
	try {
		setupBot().launch();
		console.log("</ Бот успешно запущен >");
	} catch (error) {
		console.log(error);
	}
}
setup();
