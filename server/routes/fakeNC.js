/*jslint node:true */

'use strict';

const express = require('express');
const path = require('path');
const ncStatic = require('./NC-static');
const portalCore = require('./portal_core');

const router = express.Router();

const IP = process.env.IP || '127.0.0.1';
const PORT = process.env.PORT || '3008';
const BASE = IP + ':' + PORT;

const portalPtHomeView = {
  weberm: {
    MyExpBillPortlet: {
      file: 'MyExpBillPortlet.html'
    },
    MYEXPPORTAL: {
      file: 'MYEXPPORTAL.html'
    }
  },
  ssctptassgin: {
    daibanPortal: {
      file: 'daibanPortal.html'
    },
    SSC: {
      file: 'SSC.html'
    }
  }
};

module.exports = function () {
  const ROOT = path.join(__dirname, '/../..');
  
  ncStatic(router);
  portalCore(router);

  // /lfw/frame/script/ui/lang/ml.j?langId=simpchn
  router.get("/lfw/frame/script/ui/lang/ml.j", function (req, res) {
    var langId = req.query.langId;
    if (langId === 'simpchn') {
      res.sendFile(ROOT + '/client/ml.j.simpchn.js');
    }
  });

  // 报账人门户 http://10.10.169.63/portal/pt/home/view?pageModule=weberm&pageName=MyExpBillPortlet
  // 作业人门户 http://10.10.169.63/portal/pt/home/view?pageModule=ssctptassgin&pageName=daibanPortal
  // 共享服务 - 任务处理 - 作业任务处理 /portal/pt/home/view?pageModule=ssctptassgin&pageName=SSC
  router.get("/portal/pt/home/view", function (req, res) {
    do {
      var pageModule = portalPtHomeView[req.query.pageModule];
      if (!pageModule) {
        console.log('page module not found:', req.query.pageModule);
        break;
      }
      
      var pageName = pageModule[req.query.pageName];
      if (!pageName) {
        console.log('page name not found:', req.query.pageName);
        break;
      }
      
      res.render(pageName.file, { base: BASE });
      return;
    } while(0);
    
    res.status(404)        // HTTP status 404: NotFound
      .send('Not found');
  });

  // ppt
  router.get("/portal/ppt", function (req, res) {
    var PortletModule = req.query.PortletModule;
    var PortletName = req.query.PortletName;
    
    if (PortletModule === 'pint') {
      if (PortletName === 'MyFunctionPortlet') {
        res.sendFile(ROOT + '/client/api/portal/ppt/pint/MyFunctionPortlet.json');
      } else if (PortletName === 'MsgCenterMenuPortlet') {
        res.sendFile(ROOT + '/client/api/portal/ppt/pint/MsgCenterMenuPortlet.json');
      }
    } else if (PortletModule === 'pmng') {
      if (PortletName === 'GrpMgrPortlet') {
        res.sendFile(ROOT + '/client/api/portal/ppt/pmng/MyFunctionPortlet.json');
      }
    }

    
    else {
      res.status(404)        // HTTP status 404: NotFound
        .send('Not found');
    }
  });

  // /portal/pt/msgcennum/getMsgNumInfor
  router.get("/portal/pt/msgcennum/getMsgNumInfor", function (req, res) {
    res.sendFile(ROOT + '/client/api/portal/pt/msgcennum/getMsgNumInfor.json');
  });

  // iframe page
  // /portal/app/app_expExpensePortlet?nodecode=E1100903&nodecode=E1100903&rowCount=15&$portletWind=weberm_MyExpBillPortlet_weberm_myExpBillFunPortlet&_h3ra=http://10.10.169.63:80/portal&$langcode=simpchn&$themeid=webclassic&lrid=3566767915&$portletWind=weberm_MyExpBillPortlet_weberm_myExpBillFunPortlet&_h3ra=http://10.10.169.63:80/portal&$langcode=simpchn&$themeid=webclassic
  router.get("/portal/app/app_expExpensePortlet", function (req, res) {
    res.render('app_expExpensePortlet.html', { base: BASE });
  });
  // /portal/app/app_checkportlet?nodecode=E1100902&nodecode=E1100902&rowCount=15&$portletWind=weberm_MYEXPPORTAL_weberm_myApproveFunPortlet&_h3ra=http://127.0.0.1:3008/portal&$langcode=simpchn&$themeid=webclassic&lrid=3825480112&$portletWind=weberm_MYEXPPORTAL_weberm_myApproveFunPortlet&_h3ra=http://127.0.0.1:3008/portal&$langcode=simpchn&$themeid=webclassic
  router.get("/portal/app/app_checkportlet", function (req, res) {
    res.render('app_checkportlet.html', { base: BASE });
  });
  // /portal/app/ssctptassgin_jobList?nodecode=701003&$portletWind=ssctptassgin_SSC_pmng_MgrContentPortlet&_h3ra=http://10.10.168.209:80/portal&$langcode=simpchn&$themeid=webclassic&lrid=4200777573&$portletWind=ssctptassgin_SSC_pmng_MgrContentPortlet&_h3ra=http://10.10.168.209:80/portal&$langcode=simpchn&$themeid=webclassic
  router.get('/portal/app/ssctptassgin_jobList', function (req, res) {
    res.render('ssctptassgin_jobList.html', { base: BASE });
  })

  // bc/src/public/nc/uap/lfw/core/util/LangResoTranf.java
  // https://github.com/thimda/rsd_web/blob/master/bc/src/public/nc/uap/lfw/core/util/LangResoTranf.java
  // /portal/webtemp/html/nodes/expExpensePortlet/simpchn/ml_resource.js
  // /portal/webtemp/html/nodes/expCheckPortlet/simpchn/ml_resource.js
  router.get("/portal/webtemp/html/nodes/:pagePath/simpchn/ml_resource.js", function (req, res) {
    var /*StringBuffer*/buffer = '';
    buffer += "function transs(key){"+"\r\n";
    buffer += "  if(window.transsMap == null){\r\n";
    buffer += "\t\twindow.transsMap = new Object;\r\n";

    // AbstractPresentPlugin.js
    // bc/src/public/nc/uap/lfw/core/AbstractPresentPlugin.java 
		/**
		 * 加载多语资源信息
		 * @param properties
		 * @return
		 */
    function /*AbstractPresentPlugin.*/loadNodeLangResources(/*String*/ langResoFilePath) {
      // 需要实现从`langres.properties`中读取如下信息的方法
      if (langResoFilePath == 'html/nodes/expExpensePortlet/langres.properties') {
        return [
          {
            id: 'yer_print',
            resID: '打印'
          },
          {
            id: 'yer_copy',
            resID: '复制'
          },
          {
            id: 'yer_reapprove',
            resID: '提醒审批'
          },
          {
            id: 'yer_pf',
            resID: '流程'
          }
        ];
      }
      if (langResoFilePath == 'html/nodes/expCheckPortlet/langres.properties') {
        return [
          {
            id: 'yer_print',
            resID: '打印'
          },
          {
            id: 'yer_approve',
            resID: '审批'
          },
          {
            id: 'yer_pf',
            resID: '流程'
          }
        ];
      }
    }

    // PageControlPlugin.js
    // bc/src/public/nc/uap/lfw/core/PageControlPlugin.java 
    var pagePath = req.params.pagePath;
    // ${NCHOME}/hotwebs/portal/sync/yer/weberm/html/nodes/expCheckPortlet/langres.properties
    // ${NCHOME}/hotwebs/portal/sync/yer/weberm/html/nodes/expExpensePortlet/langres.properties
    var /*String*/ langResoFilePath = "html/nodes/" + pagePath + "/langres.properties";
    var /*Properties*/langResources = /*AbstractPresentPlugin.*/loadNodeLangResources(langResoFilePath);

    langResources.map(function (langResource) {
      buffer += "\t\twindow.transsMap[\"" + langResource.key + "\"]=\"" + langResource.resID + "\";\r\n";
    });

    buffer += "}\r\n";
    buffer += "return window.transsMap[key];";
    buffer += "\r\n}";
    res.send(buffer);
    //res.sendFile(ROOT + '/client/ml_resource.js');
  });

  // /portal/pt/menu/data/jsonp.js
  // http://10.100.2.113:3008/portal/pt/menu/data/jsonp.js?c=0000Z3100000000005HQ,0000Z701000000000001,0000ZC10000000001VWH,0000ZC10000000005BDQ,0000z010000000000002,0000z010000000000004,0001Z0100SSCMAINMENU,0001Z71000000000SFXD,0001ZZ10000000000OPK&r=true&_=1477576634885
  router.get("/portal/pt/menu/data/jsonp.js", function (req, res) {
    res.sendFile(ROOT + '/client/api/portal/pt/menu/data/jsonp.js');
  });
  
  // iweb api，需要分离到单独的文件
  router.post("/iwebap/iref_ctr/commonRefsearch/", function (req, res) {
    console.log('POST /iwebap/iref_ctr/commonRefsearch/');
    // 接收参数
    //console.log(req.body.filterPks);
    //console.log(req.body.refName);
    //console.log(req.body.cfgParam);
    //console.log(req.body.clientParam);
    //console.log(req.body["refClientPageInfo.pageSize"]);
    //console.log(req.body["refClientPageInfo.currPageIndex"]);
    if (
      decodeURIComponent(
        decodeURIComponent(
          decodeURIComponent(req.body.refName)
        )
      ) === '财务组织'
    ) {
      console.log('refName -> 财务组织');
      res.sendFile(ROOT + '/client/api/iwebap/iref_ctr/commonRefsearch.json');
    } else {
      res.status(404)        // HTTP status 404: NotFound
        .send('Not found');
    }
    
  });

  return router;
};


