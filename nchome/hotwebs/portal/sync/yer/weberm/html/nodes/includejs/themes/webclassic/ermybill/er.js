(function(){
	var $ = parent.$;
	var billnav = {};
	/**
	 * 首页 portlet
	 * */
	function getPortLetContent(id){
		var border = document.createElement("div");
		$(border).css({
			'width':'100%'
		});
		$("#"+id).parent().css("overflow","visible");
		$("#"+id).parent().append(border);
		var title = document.createElement("div");
		
		$(title).css({
//			'height':'20px',
//			'lineHeight':'20px',
			'textAlign':'left',
			'padding':'0px 5px',
			'color':'#666'
			,'marginTop':'5px'
		});
		$(border).append(title);
		var info = document.createElement("div");
		
		$(info).css({
			'padding':'5px 5px'
			,'textAlign':'left'
			,'marginBottom':'5px'
		});
		$(border).append(info);
		$(border).append("<div class=\"line\"></div>");
		var body = document.createElement("div");
		$(body).css({
//			'height':pageSize*40+'px'
		});
		$(border).append(body);
		var content = document.createElement("div");
		$(body).append(content);
		
		var foot = document.createElement("div");
		$(foot).css({
			'width':'120px',
			'margin-left':'auto',
			'margin-right':'auto'
		});
		$(border).append(foot);
		return {'border':border,'title':title,'info':info,'body':body,'content':content};
	}
	billnav.clearBlankPart = function(windowID){
		$($($('#'+windowID).children('[tp=pHead]')[0]).children('[tp=pPart]')).empty();
	}
	billnav.portlet = function(data,id,windowID){
		var pageSize = 6;
		var pageNum = 0;
		var curPage = 1;
		var w = getPortLetContent(id);
		var content = w.content;
		var info = w.info;
		var title = w.title;
		
		if(data){
			var li = null;
			$(title).html(data.titleS1+data.titleS2);
			//已完成和未完成
//			var exp_url = "/portal/pt/home/view?pageModule=weberm&pageName=erpage&if_src=",
//			finishedUrl = exp_url+encodeURIComponent("/portal/app/app_expcenter?nodecode=E1100101&doneType=done"),
//			unFinishedUrl = exp_url+encodeURIComponent("/portal/app/app_expcenter?nodecode=E1100101&doneType=notDone");
//			var infoTitle = data.wangshangbaoxiao+'&nbsp;,,,&nbsp;'+data.baoxiaozhongxin+'&nbsp;,,,&nbsp;'+data.jkbxcx
			var infoTitle = data.jkbxcx+'  ,,,  '+data.baoxiaozhongxin+'  ,,,  '+data.wangshangbaoxiao
			,finishedUrl = 'app/app_expcenter?nodecode=E1100101&doneType=done'
			,unFinishedUrl = 'app/app_expcenter?nodecode=E1100101&doneType=notDone';
			
//			$(info).html("<a onclick=\"fClick();\" style=\"padding-right:20px;color:#007dc4;border-right:#bbb 1px solid;\">"+data.finishS+"( "+data.doneNum+" )</a>" +
//					"<a onclick=\"unFClick();\" style=\"padding-left:10px;color:#007dc4;border-left:#eee 1px solid;\" >"+data.unfinishS+"( "+data.notDoneNum+" )</a>");
			var finishA = $ce('a'),unFinishA = $ce('a');
			$(finishA).click(function(){
				openFrame(
					infoTitle,
					finishedUrl,
					'weberm_erpage'
				);
			});
			$(finishA).css({
				"paddingRight":"20px",
				"color":"#007dc4",
				"borderRight":"#bbb 1px solid"
			});
			$(finishA).text(data.finishS+"( "+data.doneNum+" )");
			$(info).append(finishA);
			$(unFinishA).click(function(){
				openFrame(
					infoTitle,
					unFinishedUrl,
					'weberm_erpage'
				);
			});
			$(unFinishA).css({
				"paddingLeft":"10px",
				"color":"#007dc4",
				"borderLeft":"#eee 1px solid"
			});
			$(unFinishA).text(data.unfinishS+"( "+data.notDoneNum+" )");
			$(info).append(unFinishA);
			//主体列表
			var nDone = data.noeDoneArr;
			if(nDone.length<=0){
				$(title).html(data.titleS1+data.nodataS);
			}
			for(var i= 0;i<nDone.length;i++){
				var vo = nDone[i];
				li = document.createElement("div");
				$(li).css({
					'textAlign':'left',
					'border':'transparent 1px solid',
					'padding':'5px 5px',
					'color':'#0086B2'
				});
				$(content).append(li);
				var id_show = vo.id;
				if(id_show&&id_show.length>4){
					id_show = ''+id_show.substring(id_show.length-4,id_show.length);
				}
				var li_a = $ce('div');
				$(li_a).html('<span>'+vo.name+'</span>'+'&nbsp;<span>'+id_show+','+ vo.date +'</span>');
//				$(li_a).html('<table><tr><td>'+vo.name+'</td><td>'+id_show+','+ vo.date +'</td><tr></table>');
				$(li_a).css({
					'cursor':'pointer',
					'padding':'2px 0px',
					'color':'#4d4d4d'
				});
				if(!IS_IE6&&!IS_IE7){
					$(li_a).css({
						'position':'relative'
					});
				}else{
					$(li_a).attr('title',vo.id);
				}
				li_a.funurl = vo.funurl;
				li_a.billid = vo.billid;
				li_a.djlxbm = vo.djlxbm;
				li_a.funcode = vo.funcode;
				li_a.djname = vo.name;
				li_a.djid = vo.id;
				li_a.wangshangbaoxiao = data.wangshangbaoxiao;
				$(li_a).click(function(){
					openFrame(
//						this.wangshangbaoxiao+'&nbsp,,,&nbsp;'+((this.djlxbm).indexOf('264')==0?data.baoxiaodan:data.jiekuandan)+'&nbsp;,,,&nbsp;'+this.djname,
						this.djname+'  ,,,  '+((this.djlxbm).indexOf('264')==0?data.baoxiaodan:data.jiekuandan)+'  ,,,  '+this.wangshangbaoxiao,
						this.funurl+"?billType="+this.djlxbm+"&nodecode="+this.funcode+"&taskPk=ncerwfmtaskqry&openBillId="+this.billid+"&NC=Y",
						'weberm_erpage'
					);
				});
				$(li_a).mouseover(function(){
					$(this).css('text-decoration','underline');
					if(!IS_IE6&&!IS_IE7){
						billnav.showTipMessage(this,content);
					}
				});
				$(li_a).mouseout(function(){
					$(this).css('text-decoration','none');
					if(!IS_IE6&&!IS_IE7){
						billnav.clearTipMessage(this);
					}
				});
				$(li).append(li_a);
				var li_div = $ce('div'),fontL,imgR;
				$(li).append(li_div);
				fontL = $ce('span');
				$(fontL).css({
					'color':'#808080',
					'fontSize':'12px'
				});
				$(fontL).text(vo.msg);
				$(li_div).append(fontL);
				imgR = $ce('img');
				imgR.src = '../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/icon_common.png';
				$(imgR).css('cursor','pointer');
				imgR.title = data.scanFlowS;
				imgR.funurl = vo.funurl;
				imgR.billid = vo.billid;
				imgR.djlxbm = vo.djlxbm;
				$(imgR).click(function(){
					billnav.showWorkflow(this.funurl,this.billid,this.djlxbm);
				});
				$(li_div).append(imgR);
				
//				var aa= encodeURIComponent("/portal/"+vo.funurl+"?billType="+vo.djlxbm+"&nodecode="+vo.funcode+"&taskPk=ncerwfmtaskqry&openBillId="+vo.billid);
//    			var clickUrl = "/portal/pt/home/view?pageModule=weberm&pageName=erpage&if_src="+aa;
//				$(li).html("<div style=\"padding:2px 0px;\">"+
//				//onmouseout=\"billnav.clearTipMessage(this);\" onmouseover=\"billnav.showTipMessage(this,'"+vo.id+"',event);\"
//				"<a href=\""+clickUrl+"\" style=\"color:#4d4d4d;\"><span style=\"\">"+vo.name+"</span>"+"  <span>"+id_show+","+vo.date+"</span></a>" +
//						"<div class=\"clear\"></div></div>"//<div style=\"float:right;color:#999;\"><span>"+"</span></div>
//				+"<div>" 
//				+"<div style=\"float:left;color:#808080;font-size:12px;\">"+vo.msg+"</div>" 
//				+"<div title=\""+data.scanFlowS+"\" onclick=\"billnav.showWorkflow('"+vo.funurl+"','"+vo.billid+"','"+vo.djlxbm+"');\" style=\"margin-left:3px;cursor:pointer;float:left;margin-top:2px;height:11px;width:11px;background:url('../portal/sync/yer/weberm/html/nodes/includecss/themes/webclassic/ermybill/images/portallet/icon_common.png');\"></div>" 
//				+"<div class=\"clear\"></div>"
//				+"</div>");
				$(content).append("<div class=\"line\"></div>");
			}
			billnav.showWorkflow = function(funurl,billid,djlxbm){
				var url_  = getRootPath()+"/app/mockapp/pfinfo?model=nc.bs.er.linkpfinfo.PfinfoPageModel&billId="+billid+"&billType="+djlxbm;
				showDialog(url_,data.flowProgressS,1000,600,null,null);
			}
			
			var tipDivShow = null;
			billnav.clearTipMessage = function(a){
				if(tipDivShow&&tipDivShow.parentNode){
					tipDivShow.parentNode.removeChild(tipDivShow);
				}
			}
			billnav.showTipMessage = function(a){
				var id = a.djid;
				var cssLink = '/lfw/frame/device_pc/themes/webclassic/ui/ctrl/grid/grid.css';
				var css = document.createElement("link");
				$(css).attr({
					'rel':'stylesheet'
					,'type':'text/css'
					,'href':cssLink
				});
				$('head').append(css);
				var offset = $(a).offset();
				var h = $(a).height();
				var left = parseInt(offset.left)+1;
				var top = parseInt(offset.top)+h;
				var width = id!=null?id.length*10:5;
				
				var div = $ce("div");
				tipDivShow = div;
				$(div).addClass('tip_message');
				$(div).css({
					'zIndex':100
					,'position':'absolute'
//					,'float':'left'
//					,'display':'inline'
//					,'left':left+'px'
//					,'top':top+'px'
					,'width':width+'px'
					,'height':'48px'
				});
				var leftTopDiv = $ce("DIV");
				leftTopDiv.className = 'left_top_div';
				var centerTopDiv = $ce("DIV");
				centerTopDiv.className = 'center_top_div';
				var rightTopDiv = $ce("DIV");
				rightTopDiv.className = 'right_top_div';
				
				var leftCenterDiv = $ce("DIV");
				leftCenterDiv.className = 'left_center_div';
				var centerDiv = $ce("DIV");
				centerDiv.className = 'center_div';
				centerDiv.style.position = 'absolute';
				centerDiv.style.textAlign = 'center';
				centerDiv.style.height = '12px';
				centerDiv.style.margin = '0px';
				var rightCenterDiv = $ce("DIV");
				rightCenterDiv.className = 'right_center_div';
				
				var leftBottomDiv = $ce("DIV");
				leftBottomDiv.className = 'left_bottom_div';
				var centerBottomDiv = $ce("DIV");
				centerBottomDiv.className = 'center_bottom_div';
				var rightBottomDiv = $ce("DIV");
				rightBottomDiv.className = 'right_bottom_div';
				
				div.appendChild(leftTopDiv);
				div.appendChild(centerTopDiv);
				div.appendChild(rightTopDiv);
				div.appendChild(leftCenterDiv);
				div.appendChild(centerDiv);
				div.appendChild(rightCenterDiv);
				div.appendChild(leftBottomDiv);
				div.appendChild(centerBottomDiv);
				div.appendChild(rightBottomDiv);
				
				div.centerDiv = centerDiv;
				$(div.centerDiv).html(id);
				
				$(a).append(div);
			}
		}
//		else{
//			$(title).html("近一个月内，您没有单据信息！");
//		}
	};
	
	
	billnav.billnavToggle = function(a){
		$(a).parent().parent().siblings('li').each(function(){
			$(this).find('a').removeClass('a_clicked');
		});
		$(a).addClass('a_clicked');
		billnav.selectBills(a);
	}
	
	/**
	 * 
	 * */
	function forwardExpCenterDone(){
		//alert(encodeURI);
		var proxy = new ServerProxy(null, null, false);
		var submitRule = new SubmitRule();
		var wdr = new WidgetRule('main');
//		var dsRule = new DatasetRule("Column", 'ds_current_line');
//		wdr.addDsRule("Column", dsRule);
		submitRule.addWidgetRule('main', wdr);
		proxy.addParam('clc','nc.bs.er.expcenter.portlet.MyExpBillPortlet');
		proxy.addParam('m_n', 'forwardExpCenterDone');
		proxy.setSubmitRule(submitRule);
//		showDefaultLoadingBar();
		proxy.execute();
//		hideDefaultLoadingBar();
	}
	window['forwardExpCenterDone'] = forwardExpCenterDone;
	billnav.selectBills = function(a) {
		var proxy = new ServerProxy(null, null, false);
		var submitRule = new SubmitRule();
		var wdr = new WidgetRule('main');
		var dsRule = new DatasetRule("Column", 'ds_current_line');
		wdr.addDsRule("Column", dsRule);
		submitRule.addWidgetRule('main', wdr);
		proxy.addParam('clc','nc.bs.er.expcenter.ctrl.MainViewCtrl');
		proxy.addParam('m_n', 'selectBills');
		proxy.addParam("widgetId", "main");
		proxy.addParam("datasetId", window.pageUI.getWidget('main').getDatasets()[0].id);//"expcenter"
		proxy.addParam("menuitemurl",$(a).attr("menuitemurl"));
		proxy.addParam("billType",$(a).attr("billtype"));
		proxy.addParam('name',$(a).html());
		proxy.setSubmitRule(submitRule);
		showDefaultLoadingBar();
		proxy.execute();
		hideDefaultLoadingBar();
	}
	window['billnav'] = billnav;
})(window);

function openFrame_(actURL,title){
	
	parent.setPortalNavData(title); 
	window.location = actURL;
}

/**
 * 单据返回操作后调用，否则返回后直接点新增会丢失menuitem_url
 */
function selectBillBack(a) {
		var proxy = new ServerProxy(null, null, false);
		var submitRule = new SubmitRule();
		var wdr = new WidgetRule('main');
		var dsRule = new DatasetRule("Column", 'ds_current_line');
		wdr.addDsRule("Column", dsRule);
		submitRule.addWidgetRule('main', wdr);
		proxy.addParam('clc','nc.bs.er.expcenter.ctrl.SeniorQueryViewCtrl');
		proxy.addParam('m_n', 'selectBills');
		proxy.addParam("widgetId", "main");
		proxy.addParam("datasetId", window.pageUI.getWidget('main').getDatasets()[0].id);//"expcenter"
		proxy.addParam("menuitemurl",$(a).attr("menuitemurl"));
		proxy.addParam("billType",$(a).attr("billtype"));
		proxy.addParam('name',a.innerHTML);
		proxy.setSubmitRule(submitRule);
		showDefaultLoadingBar();
		proxy.execute();
		hideDefaultLoadingBar();
	}
