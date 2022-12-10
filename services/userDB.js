// Get users list
async function getUsers(id, type) {
	let request = require("request");
	const axios = require("axios");

	var options = {
		method: "GET",
		url: process.env.DB,
		headers: {
			"cache-control": "no-cache",
			"x-apikey": process.env.DB_TOKEN,
		},
	};
	console.log(id);
	let data = await axios
		.request(options)
		.then((response) => {
			return response.data;
		})
		.catch(function (error) {
			console.error(error);
		});
	const stats = data[0] && data[0].stat;

	console.log(data);
	data = data.filter((user) => user.chatId === id);
	if (data.length > 0) {
		const { followerCount, videoCount, heart } = stats;
		return type !== "views"
			? `🏠 Особистий кабінет   \n\n<b>Ваш ID:</b> ${data[0]?.chatId}\n<b>TikTok</b>: ${data[0]?.uniqueId}\n<b>Баланс</b>: ${data[0]?.balance} грн.\n<b>К-сть фоловерів: ${followerCount}</b>\n<b>К-сть відео:</b> ${videoCount} \n<b>К-сть лайків:</b>${heart}`
			: data[0]?.balance;
	} else return undefined;
}
async function getCountViews(chatId, type) {
	let request = require("request");
	const axios = require("axios");
	const user = await getUsers(id, "views");
}
// Added user in db
async function setUser({ chatId, balance, user, stats }) {
	let request = require("request");

	var options = {
		method: "POST",
		url: process.env.DB,
		headers: {
			"cache-control": "no-cache",
			"x-apikey": process.env.DB_TOKEN,
			"content-type": "application/json",
		},
		body: {
			idTT: user.id,
			chatId: chatId,
			uniqueId: user.uniqueId,
			balance: balance ? balance : "0.00",
			stat: stats,
			secUid: user.secUid,
		},
		json: true,
	};

	request(options, function (error, response, body) {
		if (error) throw new Error(error);

		console.log(body);
	});
}

module.exports = { setUser, getUsers };
