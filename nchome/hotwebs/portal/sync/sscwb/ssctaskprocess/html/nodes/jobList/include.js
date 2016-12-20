document.write("<script type='text/javascript' src='/portal/sync/imag/socket.io.js'></script>");
document.write("<script type='text/javascript' src='/portal/sync/imag/TBrowser.js'></script>");
document.write("<script type='text/javascript' src='/portal/sync/imag/ImageBrowser.js'></script>");

function HyperLinkRender() {}
	HyperLinkRender.render = function(rowIndex, colIndex, value, header, cell){
	cell.style.overflow = "hidden";
	cell.style.textOverflow = "ellipsis";
	cell.tip = value;
	
	var row = this.model.getRow(rowIndex);
	var billType = row.getCellValueByFieldName("pk_billtype") ;  
	var billcode = row.getCellValueByFieldName("billcode");
	var taskPk = row.getCellValueByFieldName("pk_ssctask");
	var billid = row.getCellValueByFieldName("billid");
	var pk_transactype = row.getCellValueByFieldName("pk_transactype");
	var exigence = row.getCellValueByFieldName("exigencelevel");
	var pk_taskstate_name = row.getCellValueByFieldName("pk_taskstate_name");
	var pk_taskstate = row.getCellValueByFieldName("pk_taskstate");
	var isappointed = row.getCellValueByFieldName("isappointed");
	var funurl = "app/ssctaskprocesscardui";
	var a = $ce("a");
	$(a).attr('funcode',"701004");
	$(a).attr('funurl',funurl);
	var html = "";
	
	var html2 = "<span style='background:#E60012;color:#FFFFFF;padding:1px'>紧急</span>";
	var html3 = "<span style='background:#ff8c00;color:#FFFFFF;padding:1px'>强制分配</span>";
	if(isappointed == "Y") {
		html = html + " " + html3;
	}
	if(pk_taskstate == "0001Z0TASKSTATE00003") {
  		pk_taskstate_name = "挂起";
 	}
 	var html1 = "<span style='background:#028fd1;color:#FFFFFF;padding:1px'>"+pk_taskstate_name+"</span>";
	if(pk_taskstate == "0001Z0TASKSTATE00003" || pk_taskstate == "0001Z0TASKSTATE00004") {
		html = html + " " + html1;
	}
	if(exigence == "exigence") {
		html = html + " " + html2;
	}
	var textSpan = $ce("SPAN");
	textSpan.innerHTML = html;
	a.href = "javascript:void(0)";
	a.innerHTML = value;
	a.onclick = function(e){
		this.style.color = '#363636';
		if(e==null)
			stopAll(event);
		else
			stopAll(e);
		
		var funurl = $(this).attr('funurl');
		var funcode = $(this).attr('funcode');
		if(funurl!='null'&&funcode!='null'){
		var proxy = new ServerProxy(null, null, false);
		var submitRule = new SubmitRule();
		var wdr = new WidgetRule('main');
		var dsRule = new DatasetRule("jobDataset", 'ds_all_line');
		wdr.addDsRule("jobDataset", dsRule);
		submitRule.addWidgetRule('main', wdr);
		proxy.addParam('clc', 'nc.ssc.ssctaskprocess.jobList.ListViewController');
		proxy.addParam('m_n', 'doClick');
		proxy.addParam('billId', billid);
		proxy.addParam('billType', billType);
		proxy.addParam('taskID',taskPk);
		proxy.addParam('billCode',billcode);
		proxy.addParam('pk_transactype',pk_transactype);
		proxy.addParam('pk_taskstate',pk_taskstate);
		proxy.setSubmitRule(submitRule);
		proxy.addParam("rowIndex", rowIndex);
		proxy.addParam("href","/portal/"+$(this).attr('funurl')+"?billType="+billType+"&nodecode="+$(this).attr('funcode') +"&billId=billid"+"&billCode=billcode"+"&taskID=taskPk"+"&pk_transactype=pk_transactype");
		proxy.execute();
		}
	} 
	var nSpan = $ce("SPAN");
	nSpan.innerHTML = "&nbsp;";
	cell.appendChild(a);
	cell.appendChild(nSpan);
	cell.appendChild(textSpan);
	
};
 

function lookOrverImag0(url) { 
	window.open (url,"_blank","resizable=yes,titlebar=no,location=no,toolbar=no,menubar=no;top=100"); 
};

function filterBuzActive(name,type) { 
	var eleall = document.getElementsByName(name);
                   if(eleall.length) {//多个
                            for(var i = 0;i < eleall.length;i++) {
                                     //alert(eleall[i].id);
                                     if(eleall[i].id==type){//选中项加粗
                                    		   eleall[i].style.color="#e58f17";
                                               eleall[i].style.fontWeight="bold";
                                     }else{//其他为不选中
                                               eleall[i].style.fontWeight="normal";
                                               eleall[i].style.color="#0086b2";
                                     }
                            }
                   }else{//一个
                   			eleall[i].style.color="#e58f17";
                            eleall.style.fontWeight="bold";
                   }
	var proxy = new ServerProxy(null,null,false);
	proxy.addParam('clc', 'nc.ssc.ssctaskprocess.jobList.FilterViewController');
	proxy.addParam('m_n', 'filterBuzActive');
	proxy.addParam('type',type);
	proxy.execute();
};

function filterBillType(name,type) { 
	 var eleall = document.getElementsByName(name);
                   if(eleall.length) {//多个
                            for(var i = 0;i < eleall.length;i++) {
                                     //alert(eleall[i].id);
                                     if(eleall[i].id==type){//选中项加粗
                                    		 eleall[i].style.color="#e58f17";
                                               eleall[i].style.fontWeight="bold";
                                     }else{//其他为不选中
                                               eleall[i].style.fontWeight="normal";
                                               eleall[i].style.color="#0086b2";
                                     }
                            }
                   }else{//一个
                   			eleall[i].style.color="#e58f17";
                            eleall.style.fontWeight="bold";
                   }
	
	var proxy = new ServerProxy(null,null,false);
	proxy.addParam('clc', 'nc.ssc.ssctaskprocess.jobList.FilterViewController');
	proxy.addParam('m_n', 'filterTypeOnServer');
	proxy.addParam('type',type);
	proxy.execute();
};


function filterexigencelevel(name,type){//锟斤拷锟斤拷状态
	//all	全锟斤拷
	//y		锟斤拷锟斤拷
	//n		锟斤拷锟斤拷
	var eleall = document.getElementsByName(name);
                   if(eleall.length) {//多个
                            for(var i = 0;i < eleall.length;i++) {
                                     //alert(eleall[i].id);
                                     if(eleall[i].id==type){//选中项加粗
                                     		eleall[i].style.color="#e58f17";
                                               eleall[i].style.fontWeight="bold";
                                     }else{//其他为不选中
                                               eleall[i].style.fontWeight="normal";
                                                 eleall[i].style.color="#0086b2";
                                     }
                            }
                   }else{//一个
                   			eleall[i].style.color="#e58f17";
                            eleall.style.fontWeight="bold";
                   }
	var proxy = new ServerProxy(null,null,false);
	proxy.addParam('clc', 'nc.ssc.ssctaskprocess.jobList.FilterViewController');
	proxy.addParam('m_n', 'filterExigenceLevel');
	proxy.addParam('type',type);
	proxy.execute();
}

function filtertaskstatus(name,type){//锟斤拷锟斤拷状态
	//all	全锟斤拷
	//gq	锟斤拷锟斤拷
	//dtz	锟斤拷锟斤拷锟�
	var eleall = document.getElementsByName(name);
                   if(eleall.length) {//多个
                            for(var i = 0;i < eleall.length;i++) {
                                     //alert(eleall[i].id);
                                     if(eleall[i].id==type){//选中项加粗
                                     			eleall[i].style.color="#e58f17";
                                               eleall[i].style.fontWeight="bold";
                                     }else{//其他为不选中
                                               eleall[i].style.fontWeight="normal";
                                               eleall[i].style.color="#0086b2";
                                     }
                            }
                   }else{//一个
                   			eleall[i].style.color="#e58f17";
                            eleall.style.fontWeight="bold";
                   }
	var proxy = new ServerProxy(null,null,false);
	proxy.addParam('clc', 'nc.ssc.ssctaskprocess.jobList.FilterViewController');
	proxy.addParam('m_n', 'filterTaskStatus');
	proxy.addParam('type',type);
	proxy.execute();
}

function filterpaitime(name,type){//锟缴癸拷时锟斤拷
	//all	锟斤拷锟斤拷
	//today	锟斤拷锟斤拷
	//week	锟斤拷锟斤拷
	//month	锟斤拷锟斤拷
	var eleall = document.getElementsByName(name);
                   if(eleall.length) {//多个
                            for(var i = 0;i < eleall.length;i++) {
                                     //alert(eleall[i].id);
                                     if(eleall[i].id==type){//选中项加粗
                                     			eleall[i].style.color="#e58f17";
                                               eleall[i].style.fontWeight="bold";
                                     }else{//其他为不选中
                                               eleall[i].style.fontWeight="normal";
                                               eleall[i].style.color="#0086b2";
                                     }
                            }
                   }else{//一个
                   			eleall[i].style.color="#e58f17";
                            eleall.style.fontWeight="bold";
                   }
	var proxy = new ServerProxy(null,null,false);
	proxy.addParam('clc', 'nc.ssc.ssctaskprocess.jobList.FilterViewController');
	proxy.addParam('m_n', 'filterPaiTime');
	proxy.addParam('type',type);
	proxy.execute();
}
function filterfinishtime(name,type){//锟缴癸拷时锟斤拷
	//all	锟斤拷锟斤拷
	//today	锟斤拷锟斤拷
	//week	锟斤拷锟斤拷
	//month	锟斤拷锟斤拷
	var eleall = document.getElementsByName(name);
                   if(eleall.length) {//多个
                            for(var i = 0;i < eleall.length;i++) {
                                     //alert(eleall[i].id);
                                     if(eleall[i].id==type){//选中项加粗
                                     			eleall[i].style.color="#e58f17";
                                               eleall[i].style.fontWeight="bold";
                                     }else{//其他为不选中
                                               eleall[i].style.fontWeight="normal";
                                               eleall[i].style.color="#0086b2";
                                     }
                            }
                   }else{//一个
                   			eleall[i].style.color="#e58f17";
                            eleall.style.fontWeight="bold";
                   }
	var proxy = new ServerProxy(null,null,false);
	proxy.addParam('clc', 'nc.ssc.ssctaskprocess.jobList.FilterViewController');
	proxy.addParam('m_n', 'filterFinishTime');
	proxy.addParam('type',type);
	proxy.execute();
}

function initFillterSelected(){//锟斤拷始锟斤拷筛选锟斤拷锟窖★拷锟阶刺�全锟斤拷/锟斤拷锟斤拷)
	//锟斤拷锟斤拷状态
	var linkcomp1 = pageUI.getWidget("filterView").getComponent("link1101");
		linkcomp1.a.style.fontWeight="bold";
		linkcomp1.a.style.color="#0099FF";
		var linkcomp2 = pageUI.getWidget("filterView").getComponent("link0188");
		linkcomp2.a.style.fontWeight="normal";
		linkcomp2.a.style.color="#99CCFF";
		var linkcomp3 = pageUI.getWidget("filterView").getComponent("link2606");
		linkcomp3.a.style.fontWeight="normal";
		linkcomp3.a.style.color="#99CCFF";
		//锟斤拷锟斤拷状态		
		var linkcomp1 = pageUI.getWidget("filterView").getComponent("link7251");
		linkcomp1.a.style.fontWeight="bold";
		linkcomp1.a.style.color="#0099FF";
		var linkcomp2 = pageUI.getWidget("filterView").getComponent("link5805");
		linkcomp2.a.style.fontWeight="normal";
		linkcomp2.a.style.color="#99CCFF";
		var linkcomp3 = pageUI.getWidget("filterView").getComponent("link5797");
		linkcomp3.a.style.fontWeight="normal";
		linkcomp3.a.style.color="#99CCFF";
		//锟斤拷锟斤拷状态
		var linkcomp1 = pageUI.getWidget("filterView").getComponent("link4980");
		linkcomp1.a.style.fontWeight="bold";
		linkcomp1.a.style.color="#0099FF";
		var linkcomp2 = pageUI.getWidget("filterView").getComponent("link1651");
		linkcomp2.a.style.fontWeight="normal";
		linkcomp2.a.style.color="#99CCFF";
		var linkcomp3 = pageUI.getWidget("filterView").getComponent("link8900");
		linkcomp3.a.style.fontWeight="normal";
		linkcomp3.a.style.color="#99CCFF";
	//锟缴癸拷时锟斤拷
	var linkcomp1 = pageUI.getWidget("filterView").getComponent("link8517");
		linkcomp1.a.style.fontWeight="bold";
		linkcomp1.a.style.color="#0099FF";
		var linkcomp2 = pageUI.getWidget("filterView").getComponent("link7358");
		linkcomp2.a.style.fontWeight="normal";
		linkcomp2.a.style.color="#99CCFF";
		var linkcomp3 = pageUI.getWidget("filterView").getComponent("link2070");
		linkcomp3.a.style.fontWeight="normal";
		linkcomp3.a.style.color="#99CCFF";
		var linkcomp4 = pageUI.getWidget("filterView").getComponent("link8721");
		linkcomp4.a.style.fontWeight="normal";
		linkcomp4.a.style.color="#99CCFF";
}


