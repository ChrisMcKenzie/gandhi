'use strict';

var crypto = require('crypto');

module.exports = {
	root: '',
	db: {
		host: '127.0.0.1',
		db: 'gandhi'
	},
	auth: {
		secret: 'rubber bunny'
	},
	mail: {
		transport: 'stub',
		mailOptions: {},
		messageOptions: {
			from: 'test@test.gandhi.io'
		}
	},
	modules: [
		__dirname + '/lib/modules/gandhi-component',
		__dirname + '/lib/modules/gandhi-component-start',
		__dirname + '/lib/modules/gandhi-component-form',
		__dirname + '/lib/modules/gandhi-component-message',
		__dirname + '/lib/modules/gandhi-tester-date',
		__dirname + '/lib/modules/gandhi-tester-regex'
	],
	files: {
		directory: __dirname + '/uploads'
	},
	port: 3000,
	log: false
};
