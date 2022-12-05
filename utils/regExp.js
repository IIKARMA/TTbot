const regExper = (str) => {
	const patternLink = /https:\/\/www.tiktok.com\/@\w+/g;
	// let res = patternLink.test(str);
	let res = str.match(patternLink);
	return res;
};
module.exports = {
	regExper,
};
