// file: /OA_YER/weberm/src/public/nc/bs/er/expExpensePortlet/ctrl/MainViewController.java
// package nc.bs.er.expExpensePortlet.ctrl;

const debug = require('debug')('nc.bs.er.expExpensePortlet.ctrl.MainViewController');

// public class MainViewController {}

/**
 * @method getParams
 * @param {Array} paramArr
 *
 * input:
 * ```json
 * [
 *   {
 *     "k": [
 *       "clc"
 *     ],
 *     "v": [
 *       "nc.bs.er.expExpensePortlet.ctrl.MainViewController"
 *     ]
 *   },
 *   {
 *     "k": [
 *       "hasChanged"
 *     ],
 *     "v": [
 *       "false"
 *     ]
 *   }
 * ]
 * ```
 * output:
 * ```json
 * {
 *   "clc": "nc.bs.er.expExpensePortlet.ctrl.MainViewController",
 *   "hasChanged": "false"
 * }
 * ```
 */
function getParams(paramArr) {
  var param, key, val, params = {};
  for (var i in paramArr) {
    param = paramArr[i];
    key = param.k[0];
    val = param.v[0];
    params[key] = val;
  }
  return params;
}

module.exports = function Controller(req, res, root) {
  var e = root.e[0]; // the first <e> tag
  var id = e.$.id;
  
  if (e.ps) {
    var ps = e.ps[0]; // the first <ps> tag
    var params = getParams(ps.p);
    debug('params:', JSON.stringify(params));
    if (params.clc !== "nc.bs.er.expExpensePortlet.ctrl.MainViewController") {
      debug('class name is not nc.bs.er.expExpensePortlet.ctrl.MainViewController')
      res.status(404)        // HTTP status 404: NotFound
        .send('Not found');
      return;
    } else {
      // TODO 正确处理 nc.bs.er.expExpensePortlet.ctrl.MainViewController 的业务
      if (typeof params.m_n === 'string') {
        debug('Try to call method from name string');
        if (params.m_n === 'openToMakeBill') {
          openToMakeBill(req, res);
        } else {
          res.status(404)        // HTTP status 404: NotFound
            .send('Not found');
          return;
        }
      } else {
        debug('typeof params.m_n is not function')
        res.status(404)        // HTTP status 404: NotFound
          .send('Not found');
        return;
      }
    }
  } else {
    debug('e.ps not found');
    res.status(404)        // HTTP status 404: NotFound
      .send('Not found');
    return;
  }
  
  var xml2js = require('xml2js');
  var obj = {name: "Super", Surname: "Man", age: 23};
  var builder = new xml2js.Builder();
  var xml2 = builder.buildObject(obj);
  //console.log(xml2);
};

// String nc.uap.lfw.core.ctx.AppLifeCycleContext.getParameter(String key)
function getParameter(key) {
  return '261X-Cxx-31';
}


/**
 * @method openToMakeBill
 *
 * Java source:
 * ```java
 * 	public void openToMakeBill(ScriptEvent se) {
 * 		String tradeTypeCode = AppLifeCycleContext.current().getParameter(
 * 				"tradeTypeCode");
 * 		String tradeTypeName = AppLifeCycleContext.current().getParameter(
 * 				"tradeTypeName");
 * 		// nc.bs.er.expbillquery.ctrl.MainViewController control = new
 * 		// nc.bs.er.expbillquery.ctrl.MainViewController();
 * 		// control.openExpBill("", tradeTypeCode, tradeTypeName, "", "");
 * 		if (tradeTypeCode == null || "".equals(tradeTypeCode)) {
 * 			AppInteractionUtil.showMessageDialog("非法交易类型，不能制单！", false);
 * 			return;
 * 		}
 * 		Map<String, IExpPortal> codeToIExpPortalMap = ExpPortalUtil
 * 				.getCodeToIExpPortalMap();
 * 		if (codeToIExpPortalMap.get(ExpPortalUtil.getDjdl(tradeTypeCode)) == null) {
 * 			AppInteractionUtil.showMessageDialog("该单据未注册，不支持制单。", false);
 * 		} else {
 * 			codeToIExpPortalMap.get(ExpPortalUtil.getDjdl(tradeTypeCode))
 * 					.openToMakeBill(tradeTypeCode, tradeTypeName);
 * 		}
 * 
 * 	}
 * ```
*/
function openToMakeBill(req, res) {
  var tradeTypeCode = getParameter("tradeTypeCode");
  // 差旅费申请单
  if (tradeTypeCode === '261X-Cxx-31') {

var resultXML = `
<?xml version="1.0" encoding='UTF-8'?>
<xml>
    <exp-text></exp-text>
    <show-message></show-message>
    <exp-stack>
        <![CDATA[]]>
    </exp-stack>
    <success>true</success>
    <contents>
        <content>
            <![CDATA[
            <?xml version="1.0" encoding='UTF-8'?><e><isPlug>false</isPlug><pagemeta><widget id="billnav"></widget><widget id="main"></widget><cc><CD>{"widgets":[{"comps":[{"id":"grid6295"}],"id":"main"}]}</CD></cc><exec><CD>showDialog("/portal/app/app_clbx?billType=264X-Cxx-0001&nodecode=E1100308&sourcePage=mybillquery", "差旅费报销单", '1150','90%', "wfl", null, {isShowLine:false});
</CD></exec></pagemeta></e>
]]>
        </content>
    </contents>
</xml>`;
    res.send(resultXML);



  }
}
