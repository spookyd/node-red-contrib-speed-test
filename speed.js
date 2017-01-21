/**
 * Created by lukedavis on 1/20/17.
 */

var speedTest = require('speedtest-net');
var speed = speedTest({maxTime: 5000});

module.exports = function (RED) {
	console.log("Setting up node");
	function FastNode(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		this.on('input', function (msg) {
			speed.on('downloadprogress', progress => {
				console.log('Download progress:', progress);
			});

			speed.on('data', function (data) {
				console.log("Got that data " + JSON.stringify(data));
				msg.payload = data;
				node.status({fill: "green", shape: "ring", text: data.speeds.download + " Mbps"});
				node.send(msg);
			});

			speed.on('error', function (error) {
				console.error(error);
			});
		});
	}

	RED.nodes.registerType("speed-speed", FastNode);
};
