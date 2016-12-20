//require(['jquery', '/iwebap/js/TBrowser.js'], function() {
imageshowBrowser=function(ipAddr, pk_jkbx) {
	
	var url = "http://"+ipAddr+"/TIMS-Server/nc-jsp/imageshow.jsp?";
	var pars = {};
	pars.pk_jkbx=pk_jkbx;
	pars.author="author";

	for(var k in pars) {
		url += k;
		url += "="
		url += pars[k];
		url += "&";
	}
	url += "1";
	
	imageshowBrowserByUrl(url);
}

imageshowByUrl=function(evn, factoryCode, ipAddr, paraStr) {
	if(factoryCode=="tchzt"){
		imageshowBrowserByUrl(ipAddr, paraStr);
	}else{
		window.open (paraStr,'lookImage');	
	}

}
imageuploadByUrl=function(evn, factoryCode, ipAddr, paraStr) {
	if(factoryCode=="tchzt"){
		imageuploadBrowserByUrl(ipAddr, paraStr);
	}else{
		window.open (paraStr);
	}
}



imageshowBrowserByUrl=function(ipAddr, paraStr) {
	paraStr += "&author=author";
	paraStr = encodeURI(encodeURI(paraStr));
	var data = {url_img:"http://"+ipAddr+"/TIMS-Server/nc-jsp/imageshow.jsp?"+paraStr, url_download:"http://"+ipAddr+"/TIMS-Server/nc-jsp/downloadActivex.jsp"}
	openTBrowser(data);
}

imageuploadBrowser=function(ipAddr, pk_jkbx, scanType, modulename, tradtypeName, billNo, detailInfo) {
	var url = "http://"+ipAddr+"/TIMS-Server/nc-jsp/imageupload.jsp?";
	var pars = {};
	pars.pk_jkbx = pk_jkbx;
	pars.scanType = scanType;
	pars.modulename = modulename;
	pars.tradtypeName = tradtypeName;
	pars.billNo = billNo;
	pars.detailInfo = detailInfo;

	for(var k in pars) {
		url += k;
		url += "="
		url += pars[k];
		url += "&";
	}
	url += "1";

	return imageuploadBrowserByUrl(url);
}

imageuploadBrowserByUrl=function(ipAddr, paraStr) {
	paraStr = encodeURI(encodeURI(paraStr));
	var data = {url_img:"http://"+ipAddr+"/TIMS-Server/nc-jsp/imageupload.jsp?"+paraStr, url_download:"http://"+ipAddr+"/TIMS-Server/nc-jsp/downloadActivex.jsp"}
	return openTBrowser(data);
}

imageuploadBrowserSend = function(ko, ctrl){
	var data = ctrl.getValue();
	if(!data)
		return;
	
	var param = {};
	param.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
	var dataJson = ko.utils.stringifyJson(data);
	var compressType = '';
   	var compression = true;
   	if(compression){
		if(!iweb.browser.isIE8 && window.pako){
			dataJson = encodeBase64(window.pako.gzip(dataJson));
			compressType = 'gzip';
		}else{
			compression = false;
		}
   	}
	param.bill = dataJson;
	param.compressType = compressType;
	param.compression = compression;
	$.ajax({
	    type: 'GET',
        url: '/iwebap/image_ctr/imageupload?time='+ new Date().getTime(),
		data:param, 
        dataType: 'json',
        success: function (data) {
			if(data["success"] == "true"){
				var ipAddr = data["ipaddr"];
				var paraStr = encodeURI(encodeURI(data["parastr"]));
				imageuploadBrowserByUrl(ipAddr, paraStr);
			} else {
				$.showMessageDialog({type:"info",title:"提示",msg: data["message"],backdrop:true});
			} 
	    }
	}); 
}

imageshowBrowserSend = function(ko, ctrl){	
	var data = ctrl.getValue();
	if(!data)
		return;
	
	var param = {};
	param.tradetype = ctrl.app.getEnvironment().clientAttributes["tradetype"];
	var dataJson = ko.utils.stringifyJson(data);
	var compressType = '';
   	var compression = true;
   	if(compression){
		if(!iweb.browser.isIE8 && window.pako){
			dataJson = encodeBase64(window.pako.gzip(dataJson));
			compressType = 'gzip';
		}else{
			compression = false;
		}
   	}
	param.bill = dataJson;
	param.compressType = compressType;
	param.compression = compression;
	$.ajax({
	    type: 'GET',
        url: '/iwebap/image_ctr/imageshow?time='+ new Date().getTime(),
		data:param, 
        dataType: 'json',
        success: function (data) {
			if(data["success"] == "true"){
				var ipAddr = data["ipaddr"];
				var paraStr = encodeURI(encodeURI(data["parastr"]));
				imageshowBrowserByUrl(ipAddr, paraStr);
			} else {
				$.showMessageDialog({type:"info",title:"提示",msg: data["message"],backdrop:true});
			} 
        	
	    }
	}); 
}

//});
