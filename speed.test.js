'use strict';

var proxyquire = require('proxyquire');
var expect = require('chai').expect;
var mock = require('sinon');
var client = require('./speed');

var MOCK_RED = {
	myNode: {},
	myConfig: {},
	onInputCallback: function () {
	},
	sent: {
		msg: {},
		status: {},
		config: {},
	},
	nodes: {
		// Mock for node red lifecycle
		createNode: function (t, c) {
			t.status = function (a) {
				this.sent.status = a;
			};
			t.on = function (n, cb) {
				this.onInputCallback = cb;
			};
			t.send = function (m) {
				this.sent.msg = m;
			}
		},
		registerType: function (name, node) {
			this.myNode = node;
			this.myNode();
		}
	},
};

describe('speed tests', function () {

	var onProgress = function () {
	};
	var onData = function () {
	};
	var onError = function () {
	};

	// var speedStub = {
	// 	on: function(name, cb) {
	// 		if (name === 'downloadprogress') {
	// 			onProgress = cb;
	// 		} else if (name === 'data') {
	// 			onData = cb;
	// 		} else if (name == 'error') {
	// 			onError = cb;
	// 		}
	// 	}
	//
	// };
	var speedStub = mock.stub().returns({
		on: function (name, cb) {
			console.log('Handling on call ' + name);
			if (name === 'downloadprogress') {
				onProgress = cb;
			} else if (name === 'data') {
				onData = cb;
			} else if (name == 'error') {
				onError = cb;
			}
		}
	});

	beforeEach(() => {
		client = proxyquire('./speed', {
			'speedTest': speedStub
		});
	});

	it(' updates status on download progress', () => {
		// var c = client(MOCK_RED);
		//
		// MOCK_RED.onInputCallback({payload: {}});
		// let expected = 123;
		// // onProgress(expected);
		// let actual = MOCK_RED.sent.status.text;
		// console.log('Mock ' + JSON.stringify(MOCK_RED));
		// expect(actual).to.eql(expected);
	});

});
