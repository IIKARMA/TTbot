require("dotenv").config();

const { setupBot } = require("./bot");

function setup() {
	try {
		return setupBot().launch();
		console.log("</ Бот успешно запущен >");
	} catch (error) {
		console.log(error);
	}
	setup();
}
setup();
