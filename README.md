# node-red-contrib-fast-test [![Build Status](https://travis-ci.org/spookyd/node-red-contrib-speed-test.svg?branch=master)](https://travis-ci.org/spookyd/node-red-contrib-speed-test)

> Test your download speed using [speedtest.net](https://speedtest.net)

## Install

Ensure you have [Node.js](https://nodejs.org) version 4+ installed. Then run the following:

## Usage

Currently, no configuration is needed to use this node.
An input is required to fire the speed test; any input will trigger a new test.
After the test is complete, the results can be found in the output, `msg.payload.speedResults`.

### Data Model

```
  speeds: {
    download: download bandwidth in megabits per second
    upload: upload bandwidth in megabits per second
    originalDownload: unadjusted download bandwidth in bytes per second
    originalUpload: unadjusted upload bandwidth in bytes per second
  }
  client: {
    ip: ip of client
    lat: latitude of client
    lon: longitude of client
    isp: client's isp
    isprating: some kind of rating
    rating: another rating, which is always 0 it seems
    ispdlavg: avg download speed by all users of this isp in Mbps
    ispulavg: same for upload
  }
  server: {
    host: test server url
    lat: latitude of server
    lon: longitude of something
    location: name of a location, usually a city, but can be anything
    country: name of the country
    cc: country code
    sponsor: who pays for the test server
    distance: distance from client to server (SI)
    distanceMi: distance from client to server (Imperial)
    ping: how long it took to download a small file from the server, in ms
    id: the id of the server
  }
```

## Example

Currently, I have a speed test on a 15 minute repeat trigger.
After the test is complete, the output is logged to a file.

```
[{
	"id": "7fdc1b50.b6ce74",
	"type": "tab",
	"label": "Flow 2"
}, {
	"id": "6ecabfce.dab84",
	"type": "inject",
	"z": "7fdc1b50.b6ce74",
	"name": "Refresh Timer",
	"topic": "",
	"payload": "",
	"payloadType": "date",
	"repeat": "900",
	"crontab": "",
	"once": true,
	"x": 144.5,
	"y": 132,
	"wires": [
		["662adda6.ab48c4"]
	]
}, {
	"id": "662adda6.ab48c4",
	"type": "speed-test",
	"z": "7fdc1b50.b6ce74",
	"name": "",
	"x": 341.5,
	"y": 191,
	"wires": [
		["3c6c82c5.03230e"]
	]
}, {
	"id": "3c6c82c5.03230e",
	"type": "file",
	"z": "7fdc1b50.b6ce74",
	"name": "Logger",
	"filename": "/home/pi/log/speed-test.log",
	"appendNewline": true,
	"createDir": true,
	"overwriteFile": "false",
	"x": 533.5,
	"y": 250,
	"wires": []
}]
```


## Related

- [speedtest.net](https://github.com/ddsol/speedtest.net) - Test your internet connection speed and ping using speedtest.net


## License

MIT © [Luke Davis](https://lucky13.technologies)
