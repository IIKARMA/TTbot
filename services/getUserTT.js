const axios = require("axios");
const { calculView } = require("../utils/calculView");
// Get TT user info
async function getUserTT(_username) {
	// console.log("_username", _username);
	const options = {
		method: "GET",
		url: "https://tiktok-api6.p.rapidapi.com/user/details",
		params: { username: _username },
		headers: {
			"X-RapidAPI-Key": process.env.X_KEY,
			"X-RapidAPI-Host": "tiktok-api6.p.rapidapi.com",
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
async function getUserVideoInfo(_username) {
	try {
		const options = {
			method: "GET",
			url: "https://tiktok-api6.p.rapidapi.com/user/videos",
			params: { username: _username },
			headers: {
				"X-RapidAPI-Key": process.env.X_KEY,
				"X-RapidAPI-Host": "tiktok-api6.p.rapidapi.com",
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

		console.log(data.videos);
		data = data.videos
			.map((video) => {
				if (video.description.includes("#")) {
					return video.statistics.number_of_plays;
				}
			})
			.filter((video) => video !== undefined);
		let videoView = data.reduce(sumViews, 0);
		return calculView(videoView);
	} catch (error) {}
}
function sumViews(total, num) {
	return total + Math.round(num);
}
module.exports = { getUserTT, getUserVideoInfo };
