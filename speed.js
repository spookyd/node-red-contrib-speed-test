/**
 * Created by lukedavis on 1/20/17.
 */

const speedTest = require('speedtest-net');
const speed = speedTest({maxTime: 5000});

var SpeedNode = function (RED) {
	var node = this;
	this.msg = {};
	RED.nodes.registerType("speed-test", function (configuration) {
		node.config = configuration;
		RED.nodes.createNode(node, node.config);
		node.on('input', node.registerListeners(node));
	});

};

SpeedNode.config = {};
SpeedNode.msg = {};

SpeedNode.prototype.registerListeners = function (node) {
	return function (msg) {
		node.msg = msg;
		speed.on('downloadprogress', node.updateProgress(node));
		speed.on('data', node.handleCompletion(node));
		speed.on('error', node.handleError(node));
	}
};

SpeedNode.prototype.updateProgress = function (node) {
	return function (progress) {
		node.status({fill: "yellow", shape: "dot", text: progress + " %"});
	}
};

SpeedNode.prototype.handleCompletion = function (node) {
	return function (data) {
		node.msg.payload = data;
		node.status({fill: "green", shape: "dot", text: data.speeds.download + " Mbps"});
		node.send(node.msg);
	}
};

SpeedNode.prototype.handleError = function (node) {
	return function (error) {
		node.error('Speedtest error: ' + error)
	}
};

// module.exports = SpeedNode;

module.exports = function(RED) {
	console.log("Setting up node");
	function SpeedNode(config) {
		var node = this;
		RED.nodes.createNode(this, config);
		this.on('input', msg => {
			speed.on('downloadprogress', progress => {
				node.status({fill: "yellow", shape: "dot", text: progress + " %"});
			});

			speed.on('data', data => {
				msg.payload = data;
				node.status({fill: "green", shape: "dot", text: data.speeds.download + " Mbps"});
				node.send(msg);
			});

			speed.on('error', error => {
				node.error(error);
			});
		});
	}

	RED.nodes.registerType("speed-test", SpeedNode);
};
