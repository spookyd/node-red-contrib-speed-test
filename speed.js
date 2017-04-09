/**
 * Created by lukedavis on 1/20/17.
 */

const speedTest = require('speedtest-net');

/**
 * Creates instance of Speed Node for use with Node-Red https://nodered.org
 *
 * @param RED - The RED instance passed in as part of the Node Red life cycle
 */
module.exports = function(RED) {
	function SpeedNode(config) {
		var node = this;
		var speed = {};
		RED.nodes.createNode(this, config);
		this.on('input', msg => {
			speed = speedTest({maxTime: 5000});
				node.status({fill: "red", shape: "ring", text: "testing ..."});

			speed.on('downloadprogress', progress => {
				node.status({fill: "yellow", shape: "dot", text: progress + " %"});
			});

			speed.on('data', data => {
				msg.speedResults = data;
				node.status({fill: "green", shape: "dot", text: data.speeds.download + " Mbps"});
				// Since this is the final callback we care about, remove speed instance
				speed = null;
				node.send(msg);
			});

			speed.on('error', error => {
				node.error(error);
				// We need to , remove speed instance
				speed = null;
			});
		});
	}

	RED.nodes.registerType("node-red-contrib-speed-test", SpeedNode);
};
