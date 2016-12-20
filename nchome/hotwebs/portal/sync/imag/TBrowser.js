openTBrowser = function (data) {}
 // var socket;
// var isConnect;
var urlChangeFlag = 0;
// socket = io.connect('http://localhost:9456', {
		// "reconnection" : false,
		// "timeout" : 5000,
		// "transports" : ['polling']
	// });
// socket.on('connect_error', function () {
	// isConnect = false;
// });
// socket.on('connect', function () {
	// socket.emit('checkRegister');
// });
// socket.on('sendData', function (msg) {
	// isConnect = msg.result;
// });
// openTBrowser = function (data) {
	// var browID = setInterval(function () {
			// if (typeof isConnect != "undefined") {
				// clearInterval(browID);
				// if (!isConnect) {
					// urlChangeFlag = 0;
					// window.open(data.url_download, "Download", "height=400, width=800, top=100, left=100, toolba=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
				// } else {
					// urlChangeFlag = 1;
					// window.location.href = "TURLProtocol:" + data.url_img;
				// }
			// }
		// }, 1000);
// };
isUrlChanged = function () {
	return urlChangeFlag;
}
resetUrlChanged = function () {
	// urlChangeFlag = 0;
}
