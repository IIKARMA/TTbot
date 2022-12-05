// Get users list
async function getUsers(id) {
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

	let data = await axios
		.request(options)
		.then((response) => {
			return response.data;
		})
		.catch(function (error) {
			console.error(error);
		});
	const stats = data[0] && JSON.parse(data[0].stat);

	data = data.filter((user) => user.chatId === id);
	// console.log(data);
	if (data.length !== 0) {
		const { followerCount, videoCount, heart } = stats;
		return `🏠 Особистий кабінет   \n\n<b>Ваш ID:</b> ${data[0]?.chatId}\n<b>TikTok</b>: ${data[0]?.uniqueId}\n<b>Баланс</b>: ${data[0]?.balance}\n<b>К-сть фоловерів: ${followerCount}</b>\n<b>К-сть відео:</b> ${videoCount} \n<b>К-сть лайків:</b>${heart}`;
	} else return undefined;
}

// Added user in db
async function setUser({ chatId, user, stats }) {
	let request = require("request");

	console.log(stats);
	var options = {
		method: "POST",
		url: process.env.DB,
		headers: {
			"cache-control": "no-cache",
			"x-apikey": process.env.DB_TOKEN,
			"content-type": "application/json",
		},
		body: {
			chatId: chatId,
			uniqueId: user.uniqueId,
			balance: "0.00",
			stat: JSON.stringify(stats),
		},
		json: true,
	};

	request(options, function (error, response, body) {
		if (error) throw new Error(error);

		console.log(body);
	});
}

module.exports = { setUser, getUsers };
