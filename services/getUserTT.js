const axios = require("axios");

// Get TT user info
async function getUserTT(_username) {
	// console.log("_username", _username);
	const options = {
		method: "GET",
		url: "https://tiktok82.p.rapidapi.com/getProfile",
		params: { username: _username },
		headers: {
			"X-RapidAPI-Key": process.env.X_KEY,
			"X-RapidAPI-Host": "tiktok82.p.rapidapi.com",
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

	return data;
}
module.exports = { getUserTT };
