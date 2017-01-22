'use strict';

var expect = require('chai').expect;
var mock = require('sinon');
var client = require('./speed');

var MOCK_RED = {
	myNode: {},
	myConfig: {},
	callback: function() {},
	sent: {
		msg: {},
		status: {},
		config: {},
	},
	nodes: {
		createNode: function (t, c) {
			t.status = function (a) {
				this.sentMsg = a;
			};
			t.on = function (n, cb) {
				console.log("Setting callback for " + n);
				this.callback = cb;
			};
			t.send = function (m) {
				console.log("Yeah bitch");
			}
		},
		registerType: function (name, node) {
			this.myNode = node;
			this.myNode();
		}
	},
};

describe('speed tests', function () {

});
