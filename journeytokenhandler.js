'use strict';

const axios = require('axios');

const restUrl = process.env.restUrl;

exports.validateToken = async function (req, res, next) {
    const fuelAuth = req.headers.Authorization;
    const contextUrl = restUrl + "platform/v1/tokenContext";

    console.log(`Authentication Header: ${fuelAuth}`);

    try {
        const response = await axios({
            url: contextUrl,
            header: { fuelAuth }
        });

        console.log(response);
        res.locals.authenticated = true;

        next();
    } catch (error) {
        console.log(error);
        res.locals.authenticated = false;
        res.sendStatus(403);
    }
}


const validateTokenContext = (fuel2Token) => new Promise((resolve, reject) => {

	console.dir("The context endpoint is: ");

	console.dir(contextUrl);

	console.dir("The fuel token passed to this function is: ");

	console.dir(fuel2Token);

	axios({
		method: 'get',
		url: contextUrl,
		headers: {'Authorization': 'Bearer '.concat(fuel2Token)}
	})
	.then(function (tokenResponse) {
		console.dir('Token Response');
		console.dir(tokenResponse);
		return resolve(tokenResponse);
	})
	.catch(function (error) {
		console.dir("Error getting token context response");
		console.dir(error);
		return reject(error);
	});
});