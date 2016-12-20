	
	$(expBillNavCss = function(){
	   //所有可点击的控件得到焦点后变成小手形状
		$("div[id^='expense_'][id$='_link']").each(function(i){
			$(this).css("cursor","pointer");
			var divId = $(this).attr("id");
			if(divId.indexOf("More") < 0) {			
				$(this).addClass("expcondi_div");
			}
		});		
		$("td[id^='expense_'][id$='_link']").each(function(i){
			$(this).css("cursor","pointer");
		});
	});

	
	expExpensePortletShow = function(a){
		$(a).parent().parent().find("div[id^='expense_billType_hiddenDiv']").each(function(i){
			if($(this).css("display")=="none"){
				$(this).css("display","block");
			}else {
				$(this).css("display","none");
			}		
		});		
	}
	
  enterEvent = function(e){
	var event = $.event.fix(e);
		if(event.keyCode == 13) {
			queryExpenseBillByLike();
		}
		
	}
	
   resetValue = function(){
   	 var textValue = document.getElementById("likequery").value;
   	 var proxy = new ServerProxy(null,null,true);
		proxy.addParam('clc', 'nc.bs.er.expExpensePortlet.ctrl.MainViewController');
		proxy.addParam('el', '2');
		proxy.addParam('source_id', 'main');
		proxy.addParam('source_type', 'widget');
		proxy.addParam('widget_id', 'main');
		proxy.addParam('m_n', 'resetTextValue');
		proxy.addParam('likeQueryValue', textValue);
		proxy.execute();
   }
   
	queryExpenseBillByLike = function(){
		var textValue = document.getElementById("likequery").value;
		var proxy = new ServerProxy(null,null,true);
		proxy.addParam('clc', 'nc.bs.er.expExpensePortlet.ctrl.MainViewController');
		proxy.addParam('el', '2');
		proxy.addParam('source_id', 'main');
		proxy.addParam('source_type', 'widget');
		proxy.addParam('widget_id', 'main');
		proxy.addParam('m_n', 'doQueryByLikeQuery');
		proxy.addParam('likeQueryValue', textValue);
		proxy.execute();
	}
	
	queryExpenseBillByDate = function(a,queryDate){
			$(a).parent().find("div[id^='expense_date_']").each(function(i){
				$(this).css("color","#028FD1");
				$(this).css("background-color","#F1F1F1");
			});
			$(a).css("color","#FFFFFF");
			$(a).css("background-color","#028FD1");

		var proxy = new ServerProxy(null,null,true);
		proxy.addParam('clc', 'nc.bs.er.expExpensePortlet.ctrl.MainViewController');
		proxy.addParam('el', '2');
		proxy.addParam('source_id', 'main');
		proxy.addParam('source_type', 'widget');
		proxy.addParam('widget_id', 'main');
		proxy.addParam('m_n', 'doQueryByDate');
		proxy.addParam('queryDate', queryDate);
		//proxy.addParam('likeQueryValue', textValue);
		proxy.execute();
	}
	
	queryExpenseBillByBillState = function(a,billStateQuery1,billStateQuery2,billStateQuery3){
		var billStateQuery;
		if(billStateQuery3 != null && billStateQuery3 != "") {
			billStateQuery = "'"+billStateQuery1+"'," + "'"+billStateQuery2+"'," + "'"+billStateQuery3+"'";
		}else if(billStateQuery2 != null && billStateQuery2 != ""){
			billStateQuery = "'"+billStateQuery1+"'," + "'"+billStateQuery2+"'";
		}else {
			billStateQuery = billStateQuery1;
		}
		
		
		$(a).parent().find("div[id^='expense_billstate_']").each(function(i){
			$(this).css("color","#028FD1");
			$(this).css("background-color","#F1F1F1");
		});
		$(a).css("color","#FFFFFF");
		$(a).css("background-color","#028FD1");

		var proxy = new ServerProxy(null,null,true);
		proxy.addParam('clc', 'nc.bs.er.expExpensePortlet.ctrl.MainViewController');
		proxy.addParam('el', '2');
		proxy.addParam('source_id', 'main');
		proxy.addParam('source_type', 'widget');
		proxy.addParam('widget_id', 'main');
		proxy.addParam('m_n', 'doQueryByBillState');
		proxy.addParam('billStateQuery', billStateQuery);
		proxy.execute();
	}
	
	expExpense_move = function(flag,tdObj) {
		if($(tdObj).attr("id") == "expense_wait_link") {//未完成
			if($("#wwc_div").attr("isSelected") == "1") {
				return;
			}
			if(flag == "0") {//鼠标移走
				$("#wwc_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/btn_dwc.png) no-repeat");
			}else {
				$("#wwc_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/btn_dwc_move.png) no-repeat");
			}
		
		}else if($(tdObj).attr("id") == "expense_have_link") {//已完成
		
			if($("#ywc_div").attr("isSelected") == "1") {
				return;
			}
			if(flag == "0") {//鼠标移走
				$("#ywc_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/btn_jryb.png) no-repeat");
			}else {
				$("#ywc_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/btn_jryb_move.png) no-repeat");
			}
		
		}else if($(tdObj).attr("id") == "expense_makebill_link") {//我要填单
			if($("#wytd_div").attr("isSelected") == "1") {
				return;
			}
			if(flag == "0") {//鼠标移走
				$("#wytd_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/bg_wytd.png) no-repeat");
			}else {
				$("#wytd_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/bg_wytd_move.png) no-repeat");
			}
		}
	}
	

	queryByCompleteStatus = function(a,completeStatus){
		var divObj = $(document.getElementById("$d_flowvlayout3262panelv13262"));
		
		if(completeStatus == "0"){
		    $("#li_expDateCondi").css("display","none");	
			divObj.css("display","block");
			$("#exp_allcondition").css("display","block");
			$("#li_datashow").css("display","block");
			$("#li_expBillStateCondi").css("display","block");
			$("#make_bill_div").css("display","none");	
			
			$("#wwc_div").attr("isSelected","1");
			$("#wwc_div").css("color","#FF8C00");
			$("#wwc_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/btn_dwc_selected.png) no-repeat");
		
			$("#ywc_div").attr("isSelected","0");
			$("#ywc_div").css("color","#9D9D9D");
			$("#ywc_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/btn_jryb.png) no-repeat");
		
			$("#wytd_div").attr("isSelected","0");
		    $("#wytd_div").css("color","#9D9D9D");
			$("#wytd_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/bg_wytd.png) no-repeat");

		}else if(completeStatus == "1"){
			divObj.css("display","block");
			$("#exp_allcondition").css("display","block");
			$("#li_datashow").css("display","block");
			$("#li_expDateCondi").css("display","block");			
			$("#li_expBillStateCondi").css("display","none");
			$("#make_bill_div").css("display","none");		
			
			$("#wwc_div").attr("isSelected","0");
			$("#wwc_div").css("color","#9D9D9D");
			$("#wwc_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/btn_dwc.png) no-repeat");
		
			$("#ywc_div").attr("isSelected","1");
			$("#ywc_div").css("color","#3BBB3E");
			$("#ywc_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/bg_jryb_selected.png) no-repeat");
		
			$("#wytd_div").attr("isSelected","0");
		    $("#wytd_div").css("color","#9D9D9D");
			$("#wytd_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/bg_wytd.png) no-repeat");

		}else {
			$("#exp_allcondition").css("display","none");
			$("#li_datashow").css("display","none");
			divObj.css("display","none");
			$("#make_bill_div").css("display","block");
			
			$("#wwc_div").attr("isSelected","0");
			$("#wwc_div").css("color","#9D9D9D");
			$("#wwc_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/btn_dwc.png) no-repeat");
		
			$("#ywc_div").attr("isSelected","0");
			$("#ywc_div").css("color","#9D9D9D");
			$("#ywc_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/btn_jryb.png) no-repeat");
		
			$("#wytd_div").attr("isSelected","1");
		    $("#wytd_div").css("color","#028FD1");
			$("#wytd_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/btn_wytd_selected.png) no-repeat");
		
		}
		var supportPlaceholder='placeholder'in document.createElement('input');
		if(!supportPlaceholder){
		var query_input = $("#likequery");
		query_input.val(query_input.attr("placeholder"));
		query_input.addClass("phcolor");
		    }   else{
		     var query_input = $("#likequery");
		    query_input.val("");
		    }
	   	doQueryByCompleteStatus(completeStatus);	
	}
	
	function doQueryByCompleteStatus(completeStatus) {
		var proxy = new ServerProxy(null,null,true);
		proxy.addParam('clc', 'nc.bs.er.expExpensePortlet.ctrl.MainViewController');
		proxy.addParam('el', '2');
		proxy.addParam('source_id', 'main');
		proxy.addParam('source_type', 'widget');
		proxy.addParam('widget_id', 'main');
		proxy.addParam('m_n', 'doQueryByCompleteStatus');
		proxy.addParam('completeStatus', completeStatus);
		proxy.execute(); 
	}
	
	queryExpenseBillByType = function(a,billTypeCode){
		   $(a).parent().parent().parent().find("div[id^='expense_billType_']").each(function(i){
				$(this).css("color","#028FD1");
				$(this).css("background-color","#F1F1F1");
			});
			$(a).css("color","#FFFFFF");
			$(a).css("background-color","#028FD1");
			
			var proxy = new ServerProxy(null, null, false);
			var submitRule = new SubmitRule();
			var wdr = new WidgetRule('main');
			var dsRule = new DatasetRule("Column", 'ds_current_line');
			wdr.addDsRule("Column", dsRule);
			submitRule.addWidgetRule('main', wdr);
			proxy.addParam('clc','nc.bs.er.expExpensePortlet.ctrl.MainViewController');
			proxy.addParam('m_n', 'selectBills');
			proxy.addParam("widgetId", "main");		
			proxy.addParam("expBillQueryType",billTypeCode);
			proxy.setSubmitRule(submitRule);
			proxy.execute();
	
		//if(billTypeCode == "show") {//点击其他按钮，则控制单据类型的显示
		//	$(a).parent().parent().parent().find("li[id^='li_expBillTypeCondi_display']").each(function(i){
		//		if($(this).css("display") == "none") {
		//			$(this).css("display","block");
		//		}else {
		//			$(this).css("display","none");
		//		}
		//	});
		//}else {
		 //   $(a).parent().parent().parent().find("div[id^='expense_billType_']").each(function(i){
			//	$(this).css("color","#028FD1");
			//	$(this).css("background-color","#F1F1F1");
			//});
			//$(a).css("color","#FFFFFF");
			//$(a).css("background-color","#028FD1");
			
		//	var proxy = new ServerProxy(null, null, false);
		//	var submitRule = new SubmitRule();
		//	var wdr = new WidgetRule('main');
		//	var dsRule = new DatasetRule("Column", 'ds_current_line');
		//	wdr.addDsRule("Column", dsRule);
		//	submitRule.addWidgetRule('main', wdr);
		//	proxy.addParam('clc','nc.bs.er.expExpensePortlet.ctrl.MainViewController');
		//	proxy.addParam('m_n', 'selectBills');
		//	proxy.addParam("widgetId", "main");		
		//	proxy.addParam("expBillQueryType",billTypeCode);
		//	proxy.setSubmitRule(submitRule);
		//	proxy.execute();
		//}
		
	
	}
	
function OpenExpBillPortletRender() {
};
OpenExpBillPortletRender.render = function(rowIndex, colIndex, value, header, cell) {
    var billid = getValueFromDs(rowIndex, "billid", this);
    var tradetype = getValueFromDs(rowIndex, "tradetype", this);
    var tradeName = getValueFromDs(rowIndex, "billtradename", this);
     var ishavefile = getValueFromDs(rowIndex, "ishavefile", this);
    var djzt = getValueFromDs(rowIndex, "djzt", this);
    var spzt = getValueFromDs(rowIndex, "approvestatus", this);
	var nameBuf = "<span id='isFileSpan" + rowIndex +"'></span><a style='cursor: pointer;' onclick=\"doClickExpBillCodePorlet('" + billid + "','" + tradetype + "','" + tradeName + "','" + djzt + "','" + spzt + "')\" title='"+value+"'>" + value + "</a>";
	cell.innerHTML = nameBuf;
	if(ishavefile == "1"){
		$("#isFileSpan" + rowIndex).css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/isfile.png) no-repeat");
	}
	
}


function doClickExpBillCodePorlet(billid,tradetype,tradeName,djzt,spzt){
	var proxy = new ServerProxy(null,null,true);
	proxy.addParam('clc', 'nc.bs.er.expExpensePortlet.ctrl.MainViewController');
	proxy.addParam('el', '2');
	proxy.addParam('source_id', 'main');
	proxy.addParam('source_type', 'widget');
	proxy.addParam('widget_id', 'main');
	proxy.addParam('m_n', 'doClickBillCode');
	proxy.addParam('billid', billid);
	proxy.addParam('tradetype', tradetype);
	proxy.addParam('tradeName', tradeName);
	proxy.addParam('djzt', djzt);
	proxy.addParam('spzt', spzt);
	proxy.execute();    		
}

function getValueFromDs(rowIndex, field, grid){
	var dsname = "yerbill";
	var ds = pageUI.getWidget("main").getDataset(dsname);
	var nameIdx = ds.nameToIndex(field);
	var selectedRow = grid.model.getRow(rowIndex).rowData;
	var name = selectedRow.getCellValue(nameIdx);
	return name;
}

function reloadData(){
	var proxy = new ServerProxy(null,null,true);
	proxy.addParam('clc', 'nc.bs.er.expExpensePortlet.ctrl.MainViewController');
	proxy.addParam('el', '2');
	proxy.addParam('source_id', 'main');
	proxy.addParam('source_type', 'widget');
	proxy.addParam('widget_id', 'main');
	proxy.addParam('m_n', 'reloadData');
	proxy.execute();
}

function openToMakeBill(a,tradeTypeCode,tradeTypeName){
	$(a).parent().parent().find("div[id^='menuTow_div_']").each(function(i){
		$(this).css("color","#028FD1");
		$(this).css("background-color","#FFFFFF");
	});
	$(a).css("color","#FFFFFF");
	$(a).css("background-color","#028FD1");
	
	if(tradeTypeCode == "other") {
		$(a).parent().parent().find("div[id^='menuTow_div_hidden']").each(function(i){
			if($(this).css("display") == "none") {
				$(this).css("display","block");
			}else {
				$(this).css("display","none");
			}
		});
	}else {	
		var proxy = new ServerProxy(null,null,true);
		proxy.addParam('clc', 'nc.bs.er.expExpensePortlet.ctrl.MainViewController');
		proxy.addParam('el', '2');
		proxy.addParam('source_id', 'main');
		proxy.addParam('source_type', 'widget');
		proxy.addParam('widget_id', 'main');
		proxy.addParam('m_n', 'openToMakeBill');
		proxy.addParam('tradeTypeCode', tradeTypeCode);
		proxy.addParam('tradeTypeName', tradeTypeName);
		proxy.execute();
	}
}


function expBillPortletOperateRender(){};
expBillPortletOperateRender.render = function(rowIndex, colIndex, value, header, cell)
	{				
		var printButton = $ce("A");  
		printButton.id = "printButton";
		printButton.appendChild(document.createTextNode(transs("yer_print")));
//		printButton.appendChild(document.createTextNode(transs(打印));
		printButton.style.left = "10px";
		printButton.style.color = "#0086b2";
		printButton.style.position="absolute";
		printButton.href = "javascript:void(0)";
		printButton.rowIndex = rowIndex;
		
		var row = this.model.getRow(rowIndex);
		var pk_yerbill = row.getCellValueByFieldName("pk_yerbill") ;  
		var djdl = row.getCellValueByFieldName("djdl") ;  
		var tradetype = row.getCellValueByFieldName("tradetype") ; 
		var tradeName = row.getCellValueByFieldName("billtradename") ; 
		var billno = row.getCellValueByFieldName("billno") ; 
		var pk_org = row.getCellValueByFieldName("pk_org");
	    var djzt = row.getCellValueByFieldName("djzt") ; 
    	var spzt = row.getCellValueByFieldName("approvestatus") ; 
    	var modelCode=row.getCellValueByFieldName("defitem17");
    	var ywcstatus = $("#ywc_div").attr("isSelected");
		printButton.onclick = function(e) {
			this.style.color = '#363636';
			if(!e){
				e = window.event;
			}
			var proxy = new ServerProxy(null, null, false);
			var submitRule = new SubmitRule();
			var wdr = new WidgetRule('main');
			var dsRule = new DatasetRule("Column", 'ds_current_line');
			wdr.addDsRule("Column", dsRule);
			submitRule.addWidgetRule('main', wdr);
			proxy.addParam('clc','nc.bs.er.expExpensePortlet.ctrl.MainViewController');
			proxy.addParam('m_n', 'printCenter');
			proxy.addParam('pk_yerbill', pk_yerbill);
			proxy.addParam('djdl', djdl);			
			proxy.addParam('tradetype',tradetype);
			
			proxy.setSubmitRule(submitRule);
			showDefaultLoadingBar();
			proxy.execute();
			hideDefaultLoadingBar();
			stopAll(e);
		};
		
		var copyBillView = $ce("A");  
		copyBillView.id = "copyBill";
		copyBillView.appendChild(document.createTextNode(transs("yer_copy")));
//		copyBillView.appendChild(document.createTextNode("复制"));
		copyBillView.style.left = "40px";
		copyBillView.style.color = "#0086b2";
		copyBillView.style.position="absolute";
		copyBillView.href = "#";
		
		copyBillView.onclick = function(e) {
			this.style.color = '#363636';
			if(!e){
				e = window.event;
			}
			
			var proxy = new ServerProxy(null, null, false);
			var submitRule = new SubmitRule();
			var wdr = new WidgetRule('main');
			var dsRule = new DatasetRule("Column", 'ds_current_line');
			wdr.addDsRule("Column", dsRule);
			submitRule.addWidgetRule('main', wdr);
			proxy.addParam('clc','nc.bs.er.expExpensePortlet.ctrl.MainViewController');
			proxy.addParam('m_n', 'copyBill');
			proxy.addParam('billid', pk_yerbill);
			proxy.addParam('tradetype', tradetype);
			proxy.addParam('tradeName', tradeName);
			proxy.addParam('isCopy', true);
			proxy.addParam('djzt', djzt);
			proxy.addParam('spzt', spzt);
			
			proxy.setSubmitRule(submitRule);
			showDefaultLoadingBar();
			proxy.execute();
			hideDefaultLoadingBar();
			stopAll(e);
			
		};
		
		
		var workFlowView = $ce("A");  
		workFlowView.id = "pfinfo_acomp3";
		workFlowView.appendChild(document.createTextNode(transs("yer_pf")));
//		workFlowView.appendChild(document.createTextNode("流程"));
		workFlowView.style.left = "70px";
		workFlowView.style.position="absolute";
		workFlowView.href = "#";
		
		workFlowView.onclick = function(e) {
			this.style.color = '#363636';
			if(!e){
				e = window.event;
			}
			var proxy = new ServerProxy(null, null, false);
			var submitRule = new SubmitRule();
			var wdr = new WidgetRule('main');
			var dsRule = new DatasetRule("Column", 'ds_current_line');
			wdr.addDsRule("Column", dsRule);
			submitRule.addWidgetRule('main', wdr);
			proxy.addParam('clc','nc.bs.er.expExpensePortlet.ctrl.MainViewController');
			proxy.addParam('m_n', 'linkPfinfoCenter');
			proxy.addParam('billId', pk_yerbill);
			proxy.addParam('pk_org', pk_org);
			proxy.addParam('billtype', tradetype);
			
			proxy.setSubmitRule(submitRule);
			showDefaultLoadingBar();
			proxy.execute();
			hideDefaultLoadingBar();
			stopAll(e);
		};
		
		var urgeApproveButton = $ce("A");  
		urgeApproveButton.id = "urgeApprove";
		urgeApproveButton.appendChild(document.createTextNode(transs("yer_reapprove")));
//		urgeApproveButton.appendChild(document.createTextNode("提醒审批"));
		urgeApproveButton.style.left = "100px";
		urgeApproveButton.style.color = "#0086b2";
		urgeApproveButton.style.position="absolute";
		urgeApproveButton.href = "#";
		
		urgeApproveButton.onclick = function(e) {
			this.style.color = '#363636';
			if(!e){
				e = window.event;
			}
			
			var proxy = new ServerProxy(null, null, false);
			var submitRule = new SubmitRule();
			var wdr = new WidgetRule('main');
			var dsRule = new DatasetRule("Column", 'ds_current_line');
			wdr.addDsRule("Column", dsRule);
			submitRule.addWidgetRule('main', wdr);
			proxy.addParam('clc','nc.bs.er.expExpensePortlet.ctrl.MainViewController');
			proxy.addParam('m_n', 'urgeApprove');
			proxy.addParam('billId', pk_yerbill);
			proxy.addParam('billno', billno);
			proxy.addParam('tradeName', tradeName);
			proxy.addParam('billtype', tradetype);
			proxy.setSubmitRule(submitRule);
			showDefaultLoadingBar();
			proxy.execute();
			hideDefaultLoadingBar();
			stopAll(e);
		};
		
		
		cell.style.overflow = "hidden";
		cell.style.textOverflow = "ellipsis";
		cell.style.cursor = "default";
		cell.style.textAlign = "center";
		if(djdl!='doc'){
		cell.appendChild(printButton);//供应商银行账号隐藏掉打印按钮
		}
		
		cell.appendChild(workFlowView);	
		if(djdl!='36D1'&&djdl!='F3'&&djdl!='F2'&&djdl!='F1'&&djdl!='F0'&&modelCode!='sscwo'&&djdl!='FIV'&&djdl!='doc'){//houmeng3
		cell.appendChild(copyBillView);
			if(ywcstatus != 1 && spzt != 1&& spzt != -1&& spzt != 0){
				cell.appendChild(urgeApproveButton);
			}
			}	
				
	}
	
function goToExpCheckPortletMore(){
	var actURL = "/portal/pt/home/view?pageModule=weberm&pageName=erpage&if_src=app%2Fapp_expbill_query%3Fnodecode%3DE1101001%26nodecode%3DE1101001&title=%25E6%2588%2591%25E7%259A%2584%25E5%258D%2595%25E6%258D%25AE%252C%252C%252C%25E7%25BD%2591%25E4%25B8%258A%25E6%258A%25A5%25E9%2594%2580";
	window.parent.location = actURL;
}

function MyTotalRender(){}
	MyTotalRender.render = function(rowIndex, colIndex, value, header, cell){

		if (value == null || value == ""){
			return;
		}
		
		//暂时修改如下 否则报错TODO
		cell.innerHTML = value;
		cell.tip = value;
		cell.style.textAlign = 'right';
		

	};
	
	function sumPrecisionCtrl(grid,col,sumDiv,sumvalue){
		//获取当前页面最大的精度
		var maxPrecision =	$cs_clientSession.map["bill_max_precision_client"];
		
		if(sumvalue == ""){
			sumDiv.innerHTML = "";
			return;
		}
		
		var formatSumValue = "";
		
		if(isArray_Er(sumvalue)){
			formatSumValue = formatTotal_Er(sumvalue[0], maxPrecision);
		}else{
			formatSumValue = formatTotal_Er(sumvalue, maxPrecision);
		}
		
		//设置数据格式
		
		sumDiv.innerHTML = formatSumValue;
		sumDiv.style.textAlign = 'right';
	}
	function formatTotal_Er(str, precision) {
		if (str == null || isNaN(str))
			return "";
		
		// 默认2位精度
		if (precision == null || !isNumberOnly_Er(precision))
			precision = 2;
		else
			precision = parseInt(precision);
		var digit = parseFloat(str);
		var result = (digit * Math.pow(10, precision) / Math.pow(10, precision))
				.toFixed(precision);
		
		if (result == "NaN")
			return "";
			

		
		return result;
	}
	$(function(){
		//判断浏览器是否支持placeholder属性
  		var supportPlaceholder='placeholder'in document.createElement('input');
  		placeholder=function(input){
    		var text = input.attr('placeholder');
    		defaultValue = input.val();
		    if(defaultValue == ""){
		      input.val(text).addClass("phcolor");
		    }
 	
		    input.focus(function(){
		      if(input.val() == text){
		        $(this).val("");
		      }
		    });
		    input.blur(function(){
		      if(input.val() == ""){
		        $(this).val(text).addClass("phcolor");
		      }
		    });
		    //输入的字符不为灰色
		    input.keydown(function(){
		      $(this).removeClass("phcolor");
		    });
	  };
	  //当浏览器不支持placeholder属性时，调用placeholder函数
	  if(!supportPlaceholder){
	   	placeholder($('#likequery'));
	  }
	});


	










