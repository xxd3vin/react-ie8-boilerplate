
	
	expCheckPortletShow = function(a){
		$(a).parent().parent().find("div[id^='check_billType_hiddenDiv']").each(function(i){
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
				proxy.addParam('clc', 'nc.bs.er.checkportlet.ctrl.MainViewController');
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
		proxy.addParam('clc', 'nc.bs.er.checkportlet.ctrl.MainViewController');
		proxy.addParam('el', '2');
		proxy.addParam('source_id', 'main');
		proxy.addParam('source_type', 'widget');
		proxy.addParam('widget_id', 'main');
		proxy.addParam('m_n', 'doQueryByLikeQuery');
		proxy.addParam('likeQueryValue', textValue);
		proxy.execute();
	}
	
	queryBillByDate = function(a,dateQuery){
		$(a).parent().find("div[id^='check_date']").each(function(i){
			$(this).css("color","#028FD1");
			$(this).css("background-color","#F1F1F1");
		});
		$(a).css("color","#FFFFFF");
		$(a).css("background-color","#028FD1");
		var proxy = new ServerProxy(null,null,true);
		proxy.addParam('clc', 'nc.bs.er.checkportlet.ctrl.MainViewController');
		proxy.addParam('el', '2');
		proxy.addParam('source_id', 'main');
		proxy.addParam('source_type', 'widget');
		proxy.addParam('widget_id', 'main');
		proxy.addParam('m_n', 'doQueryByDate');
		proxy.addParam('queryDate', dateQuery);
		proxy.execute();    		
	}
	
	queryByApproveStatus = function(a,approveStatus){	
		if(approveStatus == "0") {//待审批
			$("#wait_approve_div").attr("isSelected","1");
			$("#wait_approve_div").css("color","#FF8C00");
			$("#wait_approve_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/bg_dsp_selected.png) no-repeat");
		
		    $("#have_approve_div").attr("isSelected","0");
			$("#have_approve_div").css("color","#9D9D9D");
			$("#have_approve_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/btn_jryb.png) no-repeat");
		
		}else {//已审批		
			$("#wait_approve_div").attr("isSelected","0");	
			$("#wait_approve_div").css("color","#9D9D9D");
			$("#wait_approve_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/bg_dsp.png) no-repeat");
		
		    $("#have_approve_div").attr("isSelected","1");
			$("#have_approve_div").css("color","#3BBB3E");
			$("#have_approve_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/bg_jryb_selected.png) no-repeat");
		
		}
		var supportPlaceholder='placeholder'in document.createElement('input');
		if(!supportPlaceholder){
		var query_input = $("#likequery");
		query_input.val(query_input.attr("placeholder"));
		query_input.addClass("phcolor");
		    } else{
		    var query_input = $("#likequery");
		    query_input.val("");
		    }
		var proxy = new ServerProxy(null,null,true);
		proxy.addParam('clc', 'nc.bs.er.checkportlet.ctrl.MainViewController');
		proxy.addParam('el', '2');
		proxy.addParam('source_id', 'main');
		proxy.addParam('source_type', 'widget');
		proxy.addParam('widget_id', 'main');
		proxy.addParam('m_n', 'doQueryByApproveStatus');
		proxy.addParam('approveStatus', approveStatus);
		proxy.execute();  
	}
	
	//待审批滑动鼠标事件
	expCheck_wait_move = function(flag) {
		if($("#wait_approve_div").attr("isSelected") == "1") {
			return;
		}
		if(flag == "0") {//鼠标移走
			$("#wait_approve_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/bg_dsp.png) no-repeat");
		}else {
			$("#wait_approve_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/bg_dsp_move.png) no-repeat");
		}
	}
	
	//已审批滑动鼠标事件
	expCheck_have_move = function(flag) {
		if($("#have_approve_div").attr("isSelected") == "1") {
			return;
		}
		if(flag == "0") {//鼠标移走
			$("#have_approve_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/btn_jryb.png) no-repeat");
		}else {
			$("#have_approve_div").css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/btn_jryb_move.png) no-repeat");
		}
	}	
		
	queryBillByType = function(a,billtypecode,djdl){
		$(a).parent().parent().parent().find("div[id^='check_billType']").each(function(i){
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
		proxy.addParam('clc','nc.bs.er.checkportlet.ctrl.MainViewController');
		proxy.addParam('m_n', 'selectBills');
		proxy.addParam("widgetId", "main");		
		proxy.addParam("billtypecode",billtypecode);
		proxy.addParam("djdl",djdl);
		proxy.setSubmitRule(submitRule);
		proxy.execute();
		
		//if(billtypecode == "show") {//点击其他按钮，则控制单据类型的显示
		//	$(a).parent().parent().parent().find("li[id^='li_expCheckTypeCondi_display']").each(function(i){
			//	if($(this).css("display") == "none") {
		//			$(this).css("display","block");
		//		}else {
		//			$(this).css("display","none");
		//		}
		//	});
		//}else {
		//	$(a).parent().find("div[id^='check_billType']").each(function(i){
		//		$(this).css("color","#028FD1");
		//		$(this).css("background-color","#F1F1F1");
		//	});
		// $(a).css("color","#FFFFFF");
		// $(a).css("background-color","#028FD1");
		
		//var proxy = new ServerProxy(null, null, false);
		//var submitRule = new SubmitRule();
		//var wdr = new WidgetRule('main');
		//var dsRule = new DatasetRule("Column", 'ds_current_line');
		//wdr.addDsRule("Column", dsRule);
		//submitRule.addWidgetRule('main', wdr);
		//proxy.addParam('clc','nc.bs.er.checkportlet.ctrl.MainViewController');
		//proxy.addParam('m_n', 'selectBills');
		//proxy.addParam("widgetId", "main");		
		//proxy.addParam("billtypecode",billtypecode);
		//proxy.addParam("djdl",djdl);
		//proxy.setSubmitRule(submitRule);
		//proxy.execute();
		//}	
		
	
			
	}
	
function OpenBillRender() {
};
OpenBillRender.render = function(rowIndex, colIndex, value, header, cell) {
    var billid = getValueFromDs(rowIndex, "billid", this);
    var billType = getValueFromDs(rowIndex, "billtype", this);
    var taskPk = getValueFromDs(rowIndex, "defitem2", this);
     var state = getValueFromDs(rowIndex, "approvestatus", this);
      var ishavefile = getValueFromDs(rowIndex, "ishavefile", this);
     var workflowtype = getValueFromDs(rowIndex, "workflowtype", this);
     var actiontype = getValueFromDs(rowIndex, "actiontype", this);
	 var isurgent = getValueFromDs(rowIndex, "defitem20", this);
	var nameBuf;
	if(isurgent == "Y"){
		nameBuf = "<span id='isFileSpan" + rowIndex +"'></span><a style='cursor: pointer;' onclick=\"doClickBillCode('" + billid + "','" + billType + "','" + taskPk + "','" + state + "','" + workflowtype + "','" + actiontype + "')\" title='"+value+"'>" + value + " " + "<span style='background:#E60012;color:#FFFFFF;padding:1px'>紧急</span>"+"</a>";	
	}else{
		nameBuf = "<span id='isFileSpan" + rowIndex +"'></span><a style='cursor: pointer;' onclick=\"doClickBillCode('" + billid + "','" + billType + "','" + taskPk + "','" + state + "','" + workflowtype + "','" + actiontype + "')\" title='"+value+"'>" + value + "</a>";	
	}
	cell.innerHTML = nameBuf;
	if(ishavefile == "1"){
		$("#isFileSpan" + rowIndex).css("background","url(../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/isfile.png) no-repeat");
	}

}

function doClickBillCode(billid,billType,taskPk,state,workflowtype,actiontype){
	var proxy = new ServerProxy(null,null,true);
	proxy.addParam('clc', 'nc.bs.er.checkportlet.ctrl.MainViewController');
	proxy.addParam('el', '2');
	proxy.addParam('source_id', 'main');
	proxy.addParam('source_type', 'widget');
	proxy.addParam('widget_id', 'main');
	proxy.addParam('m_n', 'doClickBillCode');
	proxy.addParam('billid', billid);
	proxy.addParam('billType', billType);
	proxy.addParam('taskPk',taskPk);
	proxy.addParam('state', state);
	proxy.addParam('workflowtype', workflowtype);
	proxy.addParam('actiontype', actiontype);
	proxy.execute();    		
}

function getValueFromDs(rowIndex, field, grid){
	var dsname = "yertask";
	var ds = pageUI.getWidget("main").getDataset(dsname);
	var nameIdx = ds.nameToIndex(field);
	var selectedRow = grid.model.getRow(rowIndex).rowData;
	var name = selectedRow.getCellValue(nameIdx);
	return name;
}

function approveBill(){
	var proxy = new ServerProxy(null,null,true);
	proxy.addParam('clc', 'nc.bs.er.checkportlet.ctrl.MainViewController');
	proxy.addParam('el', '2');
	proxy.addParam('source_id', 'main');
	proxy.addParam('source_type', 'widget');
	proxy.addParam('widget_id', 'main');
	proxy.addParam('m_n', 'approveBill');
	proxy.execute();
}

function reloadData(){
	var proxy = new ServerProxy(null,null,true);
	proxy.addParam('clc', 'nc.bs.er.checkportlet.ctrl.MainViewController');
	proxy.addParam('el', '2');
	proxy.addParam('source_id', 'main');
	proxy.addParam('source_type', 'widget');
	proxy.addParam('widget_id', 'main');
	proxy.addParam('m_n', 'reloadData');
	proxy.execute();

}

function MyDjOperateRender(){};
MyDjOperateRender.render = function(rowIndex, colIndex, value, header, cell)
	{		
		var row = this.model.getRow(rowIndex);
		var pk_yerbill = row.getCellValueByFieldName("pk_yertask") ;  
		var djdl = row.getCellValueByFieldName("djdl") ;  
		var tradetype = row.getCellValueByFieldName("billtype") ; 
		var pk_org = row.getCellValueByFieldName("pk_org"); 
		var billno = row.getCellValueByFieldName("billno"); 
		var taskPk = row.getCellValueByFieldName("defitem2"); 
     	var state = row.getCellValueByFieldName("approvestatus"); 
    	 var workflowtype = row.getCellValueByFieldName("workflowtype"); 
    	 var actiontype = row.getCellValueByFieldName("actiontype"); 
		 var have_approve = $("#have_approve_div").attr("isSelected");
			
		var printButton = $ce("A");  
		printButton.id = "printButton";
//		printButton.appendChild(document.createTextNode(transs("yer_print")));
		printButton.appendChild(document.createTextNode("打印"));
		printButton.style.left = "10px";
		printButton.style.color = "#0086b2";
		printButton.style.position="absolute";
		printButton.href = "javascript:void(0)";
		printButton.rowIndex = rowIndex;
				
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
			proxy.addParam('clc','nc.bs.er.expbillquery.ctrl.MainViewController');
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
		
		var approveButton = $ce("A");  
		approveButton.id = "approveButton";
		approveButton.appendChild(document.createTextNode(transs("yer_approve")));
//		approveButton.appendChild(document.createTextNode("审批"));
		approveButton.style.left = "10px";
		approveButton.style.color = "#0086b2";
		approveButton.style.position="absolute";
		approveButton.href = "javascript:void(0)";
		approveButton.rowIndex = rowIndex;
				
		approveButton.onclick = function(e) {
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
			proxy.addParam('clc','nc.bs.er.checkportlet.ctrl.MainViewController');
			proxy.addParam('m_n', 'approveBillLink');
			proxy.addParam('billId', pk_yerbill);
			proxy.addParam('pk_org', pk_org);
			proxy.addParam('billno', billno);
			proxy.addParam('billtype', tradetype);
			
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
		if(state != 1){
			workFlowView.style.left = "70px";
		}else{
		workFlowView.style.left = "49px";
		}
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
			proxy.addParam('clc','nc.bs.er.checkportlet.ctrl.MainViewController');
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
		
		cell.style.overflow = "hidden";
		cell.style.textOverflow = "ellipsis";
		cell.style.cursor = "default";
		cell.style.textAlign = "center";
		if(have_approve == 1){
			$("#approveButton").css("display", "none"); 
		}else{
			$("#approveButton").show();
		}
		if(state != 1){
			cell.appendChild(approveButton);
		}
		cell.appendChild(workFlowView);
				
	}

	
function goToExpCheckPortletMore(a){
	var actURL = "/portal/pt/home/view?pageModule=weberm&pageName=erpage&if_src=app%2Fapp_expense_approve%3Fnodecode%3DE1100901%26nodecode%3DE1100901&title=%25E6%2588%2591%25E7%259A%2584%25E5%25BE%2585%25E5%258A%259E%252C%252C%252C%25E7%25BD%2591%25E4%25B8%258A%25E6%258A%25A5%25E9%2594%2580";
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

