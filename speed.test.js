'use strict';

var expect = require('chai').expect;
var client = require('./speed');

describe('client', function() {
	it('should get callbacks', function() {
		client(1000, function (result) {
			expect(result).to.equal(result);
		});
	});

	it('should get progress updates', function() {
		client(1000, null, function (result) {
			expect(result).to.equal(result);
		});
	});
});

// MOCK
// var callback = function() {};
//
// async function run() {
// 	var RED = {
// 		myNode: {},
// 		myConfig: {},
// 		nodes: {
// 			createNode: function (t, c) {
// 				t.status = function(a) {
// 					console.log("Got status " + a);
// 				};
// 				t.on = function(n, cb) {
// 					console.log("Setting callback for " + n);
// 					callback = cb;
// 				};
// 				t.send = function(m) {
// 					console.log("Yeah bitch");
// 				}
// 			},
// 			registerType: function (name, node) {
// 				this.myNode = node;
// 				this.myNode();
// 			}
// 		},
// 	};
// 	s(RED);
// }
//
// run();
// callback({});
