﻿var IS_IE = false;
var IS_FF = false;
var IS_OPERA = false;
var IS_CHROME = false;
var IS_SAFARI = false;
var IS_WEBKIT = false;
var IS_IE6 = false;
var IS_IE7 = false;
var IS_IE8 = false;
var IS_IE9 = false;
var IS_IE10 = false;
var IS_IOS = false;
var IS_IPHONE = false;
var IS_IPAD = false;
var IS_IE8_CORE = false;
var IS_IE9_CORE = false;
var IS_IE10_ABOVE = false;
var IS_STANDARD = false;
var BROWSER_VERSION = 0;
var ua = navigator.userAgent.toLowerCase(),
  s, o = {};
if (s = ua.match(/opera.([\d.]+)/)) {
  IS_OPERA = true;
} else if (s = ua.match(/chrome\/([\d.]+)/)) {
  IS_CHROME = true;
  IS_STANDARD = true;
} else if (s = ua.match(/version\/([\d.]+).*safari/)) {
  IS_SAFARI = true;
  IS_STANDARD = true;
} else if (s = ua.match(/gecko/)) {
  IS_FF = true;
  IS_STANDARD = true;
} else if (s = ua.match(/msie ([\d.]+)/)) {
  IS_IE = true;
} else if (s = ua.match(/firefox\/([\d.]+)/)) {
  IS_FF = true;
  IS_STANDARD = true;
}
if (ua.match(/webkit\/([\d.]+)/)) {
  IS_WEBKIT = true;
}
if (ua.match(/ipad/i)) {
  IS_IOS = true;
  IS_IPAD = true;
  IS_STANDARD = true;
}
if (ua.match(/iphone/i)) {
  IS_IOS = true;
  IS_IPHONE = true;
}
if (s && s[1]) {
  BROWSER_VERSION = parseFloat(s[1]);
} else {
  BROWSER_VERSION = 0;
}
if (IS_IE) {
  var intVersion = parseInt(BROWSER_VERSION);
  var mode = document.documentMode;
  if (mode == null) {
    if (intVersion == 6) {
      IS_IE6 = true;
    } else if (intVersion == 7) {
      IS_IE7 = true;
    }
  } else {
    if (mode == 7) {
      IS_IE7 = true;
    } else if (mode == 8) {
      IS_IE8 = true;
    } else if (mode == 9) {
      IS_IE9 = true;
      IS_STANDARD = true;
    } else if (mode == 10) {
      IS_IE10 = true;
      IS_STANDARD = true;
      IS_IE10_ABOVE = true;
    } else {
      IS_STANDARD = true;
    }
    if (intVersion == 8) {
      IS_IE8_CORE = true;
    } else if (intVersion == 9) {
      IS_IE9_CORE = true;
    } else {}
  }
}
var ATTRFLOAT = IS_IE ? "styleFloat" : "cssFloat";
var Logger = new Object;
Logger.getConsole = function() {
  if (IS_FF) {
    if (window.console) {
      return window.console;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
Logger.log = function(param1, param2) {
  if (Logger.getConsole()) {
    if (param1 && param2) Logger.getConsole().log(param1, param2);
    else if (param1) Logger.getConsole().log(param1);
  }
};
Logger.info = function(param1, param2) {
  if (Logger.getConsole()) {
    if (param1 && param2) Logger.getConsole().info(param1, param2);
    else if (param1) Logger.getConsole().info(param1);
  }
};
Logger.warn = function(param1, param2) {
  if (Logger.getConsole()) {
    if (param1 && param2) Logger.getConsole().warn(param1, param2);
    else if (param1) Logger.getConsole().warn(param1);
  }
};
Logger.debug = function(param1, param2) {
  if (Logger.getConsole()) {
    if (param1 && param2) Logger.getConsole().debug(param1, param2);
    else if (param1) Logger.getConsole().debug(param1);
  }
};
Logger.error = function(param1, param2) {
  if (Logger.getConsole()) {
    if (param1 && param2) Logger.getConsole().error(param1, param2);
    else if (param1) Logger.getConsole().error(param1);
  }
};
log = function(param1, param2) {
  Logger.log(param1, param2);
};
info = function(param1, param2) {
  Logger.info(param1, param2);
};
warn = function(param1, param2) {
  Logger.warn(param1, param2);
};
debug = function(param1, param2) {
  Logger.debug(param1, param2);
};
error = function(param1, param2) {
  Logger.error(param1, param2);
};
var EventUtil = new Object;
EventUtil.currentEvent = null;
EventUtil.addEventHandler = function(oTarget, sEventType, fnHandler) {
  if (oTarget.addEventListener) {
    oTarget.addEventListener(sEventType, fnHandler, true);
  } else if (oTarget.attachEvent) {
    oTarget.attachEvent("on" + sEventType, fnHandler);
  } else {
    oTarget["on" + sEventType] = fnHandler;
  }
};
EventUtil.removeEventHandler = function(oTarget, sEventType, fnHandler) {
  if (oTarget.removeEventListener) {
    oTarget.removeEventListener(sEventType, fnHandler, true);
  } else if (oTarget.detachEvent) {
    oTarget.detachEvent("on" + sEventType, fnHandler);
  } else {
    oTarget["on" + sEventType] = null;
  }
};
EventUtil.formatEvent = function(oEvent) {
  if (IS_IE) {
    oEvent.eventPhase = 2;
    oEvent.isChar = (oEvent.charCode > 0);
    oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
    oEvent.pageY = oEvent.clientY + document.body.scrollTop;
    if (oEvent.type == "mouseout") {
      oEvent.relatedTarget = oEvent.toElement;
    } else if (oEvent.type == "mouseover") {
      oEvent.relatedTarget = oEvent.fromElement;
    }
    oEvent.preventDefault = function() {
      this.returnValue = false;
    };
    oEvent.stopPropagation = function() {
      this.cancelBubble = true;
    };
    oEvent.target = oEvent.srcElement;
    oEvent.time = (new Date()).getTime();
  }
  return oEvent;
};
EventUtil.getEvent = function() {
  var currentEvent;
  if (window.event) {
    currentEvent = this.formatEvent(window.event);
  } else {
    for (var i = 0; i < EventUtil.getEvent.caller.arguments.length; i++) {
      if (typeof(EventUtil.getEvent.caller.arguments[i].type) != "unknown" && EventUtil.getEvent.caller.arguments[i].type != null) {
        currentEvent = EventUtil.getEvent.caller.arguments[i];
        break;
      }
    }
  }
  if (currentEvent != null && currentEvent.type.startWith("key")) {
    currentEvent.key = currentEvent.keyCode ? currentEvent.keyCode : currentEvent.charCode ? currentEvent.charCode : currentEvent.which ? currentEvent.which : void 0;
    currentEvent.lfwKey = currentEvent.keyCode ? currentEvent.keyCode : currentEvent.charCode ? currentEvent.charCode : currentEvent.which ? currentEvent.which : void 0;
  }
  EventUtil.currentEvent = currentEvent;
  return currentEvent;
};

function stopEvent(e) {
  if (typeof(e) != "undefined") {
    if (e.stopPropagation) e.stopPropagation();
    else {
      e.cancelBubble = true;
    }
  }
};

function stopDefault(e) {
  if (typeof(e) != "undefined") {
    if (e.preventDefault) e.preventDefault();
    else {
      e.returnValue = false;
    }
  }
};

function stopAll(e) {
  stopEvent(e);
  stopDefault(e);
};

function getTarget(e) {
  return e.target || e.srcElement;
};

function ListenerUtil() {
  if (arguments.length == 0) return;
  this.eventMap = new HashMap;
};
ListenerUtil.prototype.addListener = function(oListener) {
  var eventMap = this.eventMap;
  if (eventMap.containsKey(oListener.name)) {
    var arrEvent = eventMap.get(oListener.name);
    arrEvent.push(oListener);
    eventMap.put(oListener.name, arrEvent);
  } else {
    eventMap.put(oListener.name, [oListener]);
  }
};
ListenerUtil.prototype.createListener = function(json) {
  var listenerjson = json.listenter;
  var listener = new Listener(json.name);
  listener.source_id = listenerjson.source_id;
  listener.widget_id = listenerjson.widget_id;
  listener.source_type = listenerjson.source_type;
  if (listenerjson.parent_source_id) listener.parent_source_id = listenerjson.parent_source_id;
  var paramsJson = json.params;
  var params = "";
  if (paramsJson != null && paramsJson.length > 0) params = paramsJson.join(",");
  if (json.onServer == true) {
    listener.func = function(params) {
      if (json.extendsParams && json.extendsParams.dataset_field_id) {
        if ("onBeforeDataChange" == json.name) {
          this.beforeDataChangeAcceptFields = json.extendsParams.dataset_field_id.split(",");
        } else if ("onAfterDataChange" == json.name) {
          this.afterDataChangeAcceptFields = json.extendsParams.dataset_field_id.split(",");
        }
      }
      var async = json.async;
      if (json.name == "onClosed") async = false;
      if (window.editMode) return;
      var proxy = new ServerProxy(listener, json.name, async);
      if (typeof beforeCallServer != 'undefined') beforeCallServer(proxy, json.name, json.name, listenerjson.source_id);
      this.addProxyParam(json.name, proxy, params);
      var proxyParams = json.proxyParams;
      for (var i = 0; i < proxyParams.length; i++) {
        var param = proxyParams[i].split("=");
        proxy.addParam(param[0], param[1]);
      }
      proxy.addParam("source_id", listenerjson.source_id);
      proxy.addParam("m_n", json.methodName);
      proxy.addParam("source_type", listenerjson.source_type);
      proxy.addParam("event_name", json.name);
      if (json.nmc != true) {
        proxy.setNmc(false);
      }
      if (json.name == "onDataLoad") {
        if (params.userObj != null) proxy.setReturnArgs(params.userObj);
      }
      ServerProxy.wrapProxy(proxy);
    };
  } else {
    var script = " listener.func = function(" + params + "){\n";
    script += json.script;
    script += "};\n";
    eval(script);
  }
  if (json.submitRule) {
    var submitRule = new SubmitRule();
    if (json.submitRule.params) {
      for (var i = 0; i < json.submitRule.params.length; i++) {
        var param = json.submitRule.params[i].split("=");
        submitRule.addParam(param[0], param[1]);
      }
    }
    this.createJsSubmitRule(json.submitRule, submitRule);
    if (json.submitRule.parentSubmitRule) {
      var parentRule = new SubmitRule();
      this.createJsSubmitRule(json.submitRule.parentSubmitRule.submitRule, parentRule);
      submitRule.setParentSubmitRule(parentRule);
    }
    listener.submitRule = submitRule;
  }
  this.addListener(listener);
};
ListenerUtil.prototype.addProxyParam = function(eventName) {
  return "";
};
ListenerUtil.prototype.createJsSubmitRule = function(submitRuleJson, submitRule) {
  if (submitRuleJson) {
    if (submitRuleJson.widgetRules) {
      for (var i = 0; i < submitRuleJson.widgetRules.length; i++) {
        this.createJsWidgetRule(submitRuleJson.widgetRules[i], submitRule);
      }
    }
  }
};
ListenerUtil.prototype.createJsWidgetRule = function(widgetRuleJson, submitRule) {
  var widgetRule = new WidgetRule(widgetRuleJson.id);
  if (widgetRuleJson.dsRules) {
    for (var i = 0; i < widgetRuleJson.dsRules.length; i++) {
      var dsRuleJson = widgetRuleJson.dsRules[i].split("=");
      var dsRule = new DatasetRule(dsRuleJson[0], dsRuleJson[1]);
      widgetRule.addDsRule(dsRuleJson[0], dsRule);
    }
  }
  if (widgetRuleJson.treeRules) {
    for (var i = 0; i < widgetRuleJson.treeRules.length; i++) {
      var treeRuleJson = widgetRuleJson.treeRules[i].split("=");
      var treeRule = new TreeRule(treeRuleJson[0], treeRuleJson[1]);
      widgetRule.addTreeRule(treeRuleJson[0], treeRule);
    }
  }
  var widgetId = widgetRuleJson.id;
  submitRule.addWidgetRule(widgetId, widgetRule);
};
ListenerUtil.prototype.removeListener = function(listenerType, oListener) {
  var eventMap = this.eventMap;
  if (eventMap.containsKey(listenerType)) {
    var arrEvent = eval(eventMap.get(listenerType));
    arrEvent.removeEle(oListener);
    eventMap.put(listenerType, arrEvent);
  }
};
ListenerUtil.prototype.addListeners = function(arrListeners) {
  for (var i = 0, n = arrListeners.length; i < n; i++) {
    this.addListener(arrListeners[i]);
  }
};
ListenerUtil.prototype.removeListeners = function(listenerType, arrListeners) {
  for (var i = 0, n = arrListeners.length; i < n; i++) {
    this.removeListener(listenerType, arrListeners[i]);
  }
};
ListenerUtil.prototype.removeAllListeners = function(listenerType) {
  var eventMap = this.eventMap;
  if (eventMap.get(listenerType)) {
    eventMap.put(listenerType, []);
  }
};
ListenerUtil.prototype.clearListenerMap = function() {
  var keys = this.eventMap.keySet();
  for (var i = 0; i < keys.length; i++) {
    var events = this.eventMap.remove(keys[i]);
    if (events != null) {
      for (var j = 0; j < events.length; j++) {
        var ev = events[j];
        for (var attr in ev) {
          ev[attr] = null;
        }
        ev = null;
      }
    }
    events = null;
  }
};
ListenerUtil.prototype.doEventFunc = function(eventName, eventObj) {
  var map = this.eventMap;
  var executed = false;
  try {
    ServerProxy.suspend = true;
    var arrListener = map.get(eventName);
    if (arrListener != null) {
      for (var i = 0; i < arrListener.length; i++) {
        var func = arrListener[i].func;
        if ((func instanceof Function) || (typeof func == 'function')) {
          if (this.beforeCallEvent(eventName, eventObj) == true) {
            var result = func.call(this, eventObj);
            executed = true;
            if (eventObj != null && eventObj.stopEvent) return result;
            if (result != null) return result;
          }
        }
      }
    }
  } catch (e) {} finally {
    if (executed == true) ServerProxy.cleanProxy();
    if (eventObj) eventObj.obj = null;
  }
};
ListenerUtil.prototype.beforeCallEvent = function(eventName, eventObj) {
  return true;
};
var Listener = function(name, bIgnoreError) {
  this.name = name;
  this.ignoreError = getBoolean(bIgnoreError, false);
};﻿
var DataType = new Object;
DataType.STRING = "String";
DataType.INTEGER = "Integer";
DataType.INT = "int";
DataType.DOUBLE = "Double";
DataType.dOUBLE = "double";
DataType.UFDOUBLE = "UFDouble";
DataType.FLOAT = "Float";
DataType.fLOAT = "float";
DataType.BYTE = "Byte";
DataType.bYTE = "byte";
DataType.BOOLEAN = "Boolean";
DataType.bOOLEAN = "boolean";
DataType.UFBOOLEAN = "UFBoolean";
DataType.DATE = "Date";
DataType.BIGDECIMAL = "BigDecimal";
DataType.LONG = "Long";
DataType.lONG = "long";
DataType.CHAR = "char";
DataType.CHARACTER = "Character";
DataType.UFDATETIME = "UFDateTime";
DataType.UFDATE = "UFDate";
DataType.UFTIME = "UFTime";
DataType.UFLITERALDATE = "UFLiteralDate";
DataType.UFDATEBEGIN = "UFDate_begin";
DataType.UFDATEEND = "UFDate_end";
DataType.UFNUMBERFORMAT = "UFNumberFormat";
DataType.Decimal = "Decimal";
DataType.Entity = "Entity";
var EditorType = new Object;
EditorType.CHECKBOX = "CheckBox";
EditorType.STRINGTEXT = "StringText";
EditorType.INTEGERTEXT = "IntegerText";
EditorType.DECIMALTEXT = "DecimalText";
EditorType.SELFDEFELE = "SelfDef";
EditorType.RADIOGROUP = "RadioGroup";
EditorType.CHECKBOXGROUP = "CheckboxGroup";
EditorType.REFERENCE = "Reference";
EditorType.COMBOBOX = "ComboBox";
EditorType.LANGUAGECOMBOBOX = "LanguageComboBox";
EditorType.LIST = "List";
EditorType.PWDTEXT = "PwdText";
EditorType.DATETEXT = "DateText";
EditorType.DATETIMETEXT = "DateTimeText";
EditorType.MONTHTEXT = "MonthText";
EditorType.YEARTEXT = "YearText";
EditorType.YEARMONTHTEXT = "YearMonthText";
EditorType.EMAILTEXT = "EmailText";
EditorType.PHONETEXT = "PhoneText";
EditorType.LINKTEXT = "LinkText";
EditorType.MONEYTEXT = "MoneyText";
EditorType.PRECENTTEXT = "PrecentText";
EditorType.TIMETEXT = "TimeText";
EditorType.SHORTDATETEXT = "ShortDateText";
EditorType.LITERALDATE = "UFLiteralDate";
EditorType.TEXTAREA = "TextArea";
EditorType.RICHEDITOR = "RichEditor";
EditorType.IMAGECOMP = "ImageComp";
EditorType.FILECOMP = "FileComp";
EditorType.SIGNCOMP = "SignComp";
var NotifyType = new Object;
NotifyType.VALUE = "value";
NotifyType.VISIBLE = "visible";
NotifyType.ENABLE = "enable";
NotifyType.READONLY = "readOnly";
NotifyType.EDITABLE = "editable";
NotifyType.MAXVALUE = "maxValue";
NotifyType.MINVALUE = "minValue";
NotifyType.TEXT = "text";
NotifyType.TEXTALIGN = "textAlign";
NotifyType.WIDTH = "width";
NotifyType.CHANGEIMG = "changeImg";
NotifyType.CHECKED = "checked";
NotifyType.COMBODATAID = "comboDataId";
NotifyType.PRECISION = "precision";
NotifyType.INDEX = "index";
NotifyType.SHOWVALUE = "showValue";
NotifyType.STATE = "state";
NotifyType.SELECTED = "selected";
NotifyType.FOCUS = "focus";
NotifyType.ROWS = "rows";
NotifyType.COLS = "cols";
NotifyType.CHANGELINE = "changeLine";
NotifyType.SELECTONLY = "selectOnly";
String.prototype.trim = function() {
  return this.replace(/^\s*(\b.*\b|)\s*$/, "$1");
};
String.prototype.replaceStr = function(strFind, strRemp) {
  var tab = this.split(strFind);
  return new String(tab.join(strRemp));
};
String.prototype.lengthb = function() {
  var str = this.replace(/[^\x00-\xff]/g, "**");
  return str.length;
};
String.prototype.replaceAll = function(AFindText, ARepText) {
  raRegExp = new RegExp(AFindText, "g");
  return this.replace(raRegExp, ARepText);
};
String.prototype.substrCH = function(nLen) {
  var i = 0;
  var j = 0;
  while (i < nLen && j < this.length) {
    var charCode = this.charCodeAt(j);
    if (charCode > 256 && i == nLen - 1) {
      break;
    } else if (charCode > 256) {
      i = i + 2;
    } else {
      i = i + 1;
    }
    j = j + 1;
  };
  return this.substr(0, j);
};
String.prototype.startWith = function(strChild) {
  return this.indexOf(strChild) == 0;
};
String.prototype.endWith = function(strChild) {
  var index = this.indexOf(strChild);
  if (index == -1) return;
  else return index == this.length - strChild.length;
};
Date.prototype.getAAAAMMJJ = function() {
  var jour = this.getDate();
  if (jour < 10)(jour = "0" + jour);
  var mois = this.getMonth() + 1;
  if (mois < 10)(mois = "0" + mois);
  var annee = this.getYear();
  return annee + "" + mois + "" + jour;
};
Date.prototype.getFomatDate = function() {
  var year = this.getFullYear();
  var month = this.getMonth() + 1;
  if (month < 10) month = "0" + month;
  var day = this.getDate();
  if (day < 10) day = "0" + day;
  return year + "-" + month + "-" + day;
};
Date.prototype.getFomatDateTime = function() {
  var year = this.getFullYear();
  var month = this.getMonth() + 1;
  if (month < 10) month = "0" + month;
  var day = this.getDate();
  if (day < 10) day = "0" + day;
  var hours = this.getHours();
  if (hours < 10) hours = "0" + hours;
  var minutes = this.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;
  var seconds = this.getSeconds();
  if (seconds < 10) seconds = "0" + seconds;
  return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
};
Array.prototype.indexOf = function(obj) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == obj) return i;
  }
  return -1;
};
Array.prototype.remove = function(index) {
  if (index < 0 || index > this.length) {
    alert("index out of bound");
    return;
  }
  this.splice(index, 1);
};
Array.prototype.removeEle = function(ele) {
  for (var i = 0, count = this.length; i < count; i++) {
    if (this[i] == ele) {
      this.splice(i, 1);
      return;
    }
  }
};
Math.UUID = function() {
  return ((new Date()).getTime() + "").substr(9);
};
String.UUID = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
Array.prototype.insert = function(index, ele) {
  if (index < 0 || index > this.length) {
    alert("index out of bound");
    return;
  }
  this.splice(index, 0, ele);
};
Array.prototype.values = function(indices) {
  if (indices == null) return null;
  var varr = new Array();
  for (var i = 0; i < indices.length; i++) {
    varr.push(this[indices[i]]);
  }
  return varr;
};
Array.prototype.clear = function() {
  this.splice(0, this.length);
};

function truncFloat(floatValue, precision) {
  if (precision) {
    if (!floatValue) floatValue = "0";
    if (floatValue.toString().indexOf(".") == -1 && precision > 0) {
      floatValue += ".";
      for (var i = 0; i < precision; i++) {
        floatValue += "0";
      }
    } else if (floatValue.toString().indexOf(".") != -1) {
      if (precision <= 0) floatValue = floatValue.toString().substring(0, floatValue.toString().indexOf(".") + 1);
      else {
        floatValue = floatValue.toString();
        if (floatValue.length < floatValue.indexOf(".") + precision + 1) {
          for (var i = 0, n = floatValue.indexOf(".") + precision + 1 - floatValue.length; i < n; i++) {
            floatValue += "0";
          }
        } else floatValue = floatValue.substring(0, floatValue.indexOf(".") + precision + 1);
      }
    }
  }
  return floatValue;
};
if (IS_IE && !IS_STANDARD) {
  window.$ge = document.getElementById;
  window.$ce = document.createElement;
} else {
  function $ge(id) {
    return document.getElementById(id);
  }

  function $ce(obj) {
    return document.createElement(obj);
  }
}

function getBoolean(value, defaultValue) {
  if (value == 'false') return false;
  else if (value == 'true') return true;
  else if (value != false && value != true) return defaultValue;
  else return value;
};

function getString(value, defaultValue) {
  if (value == null || value == "") return defaultValue;
  return value;
};

function getInteger(value, defaultValue) {
  if (isNaN(parseInt(value))) return defaultValue;
  return parseInt(value);
};

function getFloat(value, defaultValue) {
  if (isNaN(parseFloat(value))) return defaultValue;
  return parseFloat(value);
};

function isNull(value, canBlank) {
  if (value == null) return true;
  if (value == "" && !canBlank) return true;
  return false;
};

function isNotNull(value, canBlank) {
  return !isNull(value, canBlank);
};

function convertPerToDecimal(per) {
  if (per.indexOf("%") == -1) return;
  var decimal = per.substring(0, per.length - 1);
  decimal = parseInt(decimal) / 100;
  return decimal;
};

function isPercent(value) {
  return value == null ? false : ("" + value).indexOf("%") != -1;
};

function per2decimal(value) {
  var dec = value.replace("%", "");
  dec = parseInt(dec) * 0.01;
  return dec;
};

function isDigital(str) {
  var re = /^((-?)([1-9]+[0-9]*|0{1}))(\.\d+)?$/;
  return re.test(str);
};

function isAlpha(str) {
  var patrn = /^[A-Za-z]+$/;
  if (!patrn.exec(str)) return false;
  return true;
};

function isNumberOnly(str) {
  var patrn = /^[0-9]+$/;
  if (!patrn.exec(str)) return false;
  return true;
};

function isNumber(str) {
  str = str + "";
  if (str == "0") return true;
  var patrn = /(^-[1-9]\d*$)|^([1-9]\d*$)/;
  if (patrn.exec(str) == null) return false;
  else {
    if (parseInt(str) >= -9007199254740992 && parseInt(str) <= 9007199254740992) return true;
    else return false;
  }
};

function isChinese(s) {
  var patrn = /^[\u0391-\uFFE5]+$/;
  if (!patrn.exec(s)) return false;
  return true;
};

function isValidIdentifier(str) {
  str = str.trim();
  var flag = true;
  var first = str.charAt(0);
  if (!(isAlpha(first) || first == "_" || first == "$")) return false;
  for (var i = 1; i < str.length; i++) {
    let = str.charAt(i);
    if (!(isAlpha(let) || isDigital(let) ||
        let == "_")) {
      flag = false;
      break;
    }
  }
  return flag;
};

function isEmail(s) {
  var patrn = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (!patrn.exec(s)) return false;
  return true;
};

function isPhone(s) {
  var patrn = /^(?:0[0-9]{2,3}[-\\s]{1}|\\(0[0-9]{2,4}\\))[0-9]{6,8}$|^[1-9]{1}[0-9]{5,7}$|^[1-9]{1}[0-9]{10}$/;
  if (!patrn.exec(s)) return false;
  return true;
}

function convertXml(str) {
  if (str != null) {
    str = str + "";
    var reg1 = new RegExp("&", "g");
    str = str.replace(reg1, "&amp;");
    var reg2 = new RegExp("<", "g");
    str = str.replace(reg2, "&lt;");
    var reg3 = new RegExp(">", "g");
    str = str.replace(reg3, "&gt;");
    var reg4 = new RegExp("'", "g");
    str = str.replace(reg4, "&apos;");
    var reg5 = new RegExp("\"", "g");
    str = str.replace(reg5, "&quot;");
  }
  return str;
};

function insertAtCursor(myField, myValue) {
  if (myField.selectionStart || myField.selectionStart == "0") {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;
    return myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length)
  } else if (document.selection) {
    if (document.selection.type == 'Text') {
      document.selection.clear();
    }
    var _sel = document.selection.createRange();
    _sel.text = myValue;
    return myField.value;
  } else {
    return myField.value;
  }
};

function trim(vStr) {
  return vStr.replace(/(^\s+)|(\s+$)/g, "");
};

function HashMap() {
  this.length = 0;
  this.prefix = "js_hashmap_pre_";
  this.trueObj = new Object;
  this.keyObj = new Object;
};
HashMap.prototype.put = function(key, value) {
  if (this.keyObj[key] != null) this.trueObj[key] = value;
  else {
    this.trueObj[key] = value;
    this.keyObj[key] = 1;
    this.length++;
  }
};
HashMap.prototype.get = function(key) {
  return this.trueObj[key];
};
HashMap.prototype.keySet = function() {
  var arrKeySet = new Array();
  var index = 0;
  for (var strKey in this.keyObj) {
    arrKeySet[index++] = strKey;
  }
  return arrKeySet;
};
HashMap.prototype.values = function() {
  var arrValues = new Array();
  var index = 0;
  for (var strKey in this.keyObj) {
    arrValues[index++] = this.trueObj[strKey];
  }
  return arrValues;
};
HashMap.prototype.size = function() {
  return this.length;
};
HashMap.prototype.remove = function(key) {
  if (this.keyObj[key] != null) {
    var obj = this.trueObj[key];
    delete this.keyObj[key];
    delete this.trueObj[key];
    this.length--;
    return obj;
  }
  return null;
};
HashMap.prototype.clear = function() {
  this.keyObj = new Object;
  this.trueObj = new Object;
  this.length = 0;
};
HashMap.prototype.isEmpty = function() {
  return this.length == 0;
};
HashMap.prototype.containsKey = function(key) {
  return this.keyObj[key] != null;
};
HashMap.prototype.containsValue = function(value) {
  for (var strKey in this.trueObj) {
    if (this.trueObj[strKey] == value) return true;
  }
  return false;
};
HashMap.prototype.putAll = function(map) {
  if (map == null) return;
  if (map.constructor != HashMap) return;
  var arrKey = map.keySet();
  var arrValue = map.values();
  for (var i in arrKey) {
    this.put(arrKey[i], arrValue[i]);
  }
};
HashMap.prototype.toString = function() {
  var str = "";
  for (var strKey in this.keyObj) {
    str += strKey + " : " + this.trueObj[strKey] + "\r\n";
  }
  return str;
};

function Singleton(create) {
  if (window.sys_singleMap == null) window.sys_singleMap = new HashMap();
  var instance = window.sys_singleMap.get(this.componentType);
  if (instance != null) return instance;
  else {
    create = getBoolean(create, true);
    if (!create) return null;
    window.sys_singleMap.put(this.componentType, this);
    return null;
  }
};
var classWidthCache = new HashMap();

function getTextWidth(text, className) {
  var cacheKey = "NULL";
  if (className) {
    cacheKey = className;
  }
  var lengthb = 0;
  if (text) {
    lengthb = text.lengthb();
  }
  var charwidth = classWidthCache.get(cacheKey);
  if (!charwidth) {
    var tmpDiv = $ce("DIV");
    tmpDiv.innerHTML = 'U';
    tmpDiv.style.position = 'absolute';
    tmpDiv.className = className;
    tmpDiv.style.top = "0px";
    tmpDiv.style.left = "0px";
    tmpDiv.style.width = 'auto';
    tmpDiv.style.visibility = 'hidden';
    tmpDiv.style.whiteSpace = 'nowrap';
    document.body.appendChild(tmpDiv);
    charwidth = tmpDiv.offsetWidth;
    tmpDiv.innerHTML = "";
    document.body.removeChild(tmpDiv);
    classWidthCache.put(cacheKey, charwidth);
  }
  return charwidth * lengthb;
};

function getTextWidthBySize(text, fontSize) {
  var lengthb = 0;
  if (text) {
    lengthb = text.lengthb();
  }
  var tmpDiv = $ce("DIV");
  tmpDiv.innerHTML = 'U';
  tmpDiv.style.position = 'absolute';
  tmpDiv.style.fontSize = fontSize + "px";
  tmpDiv.style.top = "0px";
  tmpDiv.style.left = "0px";
  tmpDiv.style.width = 'auto';
  tmpDiv.style.visibility = 'hidden';
  tmpDiv.style.whiteSpace = 'nowrap';
  document.body.appendChild(tmpDiv);
  charwidth = tmpDiv.offsetWidth;
  tmpDiv.innerHTML = "";
  document.body.removeChild(tmpDiv);
  return charwidth * lengthb;
};

function getTextHeight(text, className) {
  var tmpDiv = $ce("div");
  tmpDiv.innerHTML = text;
  tmpDiv.style.position = "absolute";
  tmpDiv.className = className;
  tmpDiv.style.top = "0px";
  tmpDiv.style.left = "0px";
  tmpDiv.style.height = "auto";
  tmpDiv.style.visibility = "hidden";
  tmpDiv.style.whiteSpace = "nowrap";
  document.body.appendChild(tmpDiv);
  var height = tmpDiv.offsetHeight;
  document.body.removeChild(tmpDiv);
  return height;
};

function getCssHeight(className) {
  var tmpDiv = $ce("div");
  tmpDiv.className = className;
  tmpDiv.style.position = "absolute";
  document.body.appendChild(tmpDiv);
  var height = tmpDiv.offsetHeight;
  document.body.removeChild(tmpDiv);
  return height;
};

function isDivScroll(div) {
  if (div.scrollWidth > div.clientWidth) return true;
  else return false;
};

function isDivVScroll(div) {
  if (div.scrollHeight > div.clientHeight) return true;
  else return false;
};

function compFirstScrollTop(oHtml) {
  offsetTop = document.documentElement.scrollTop;
  if (IS_IE9) {
    var topWin = getLfwTop();
    if (topWin == null) topWin = getTrueParent();
    try {
      offsetTop = topWin.document.body.scrollTop;
    } catch (e) {
      Logger.error(e);
    }
  }
  return offsetTop;
};

function compFirstScrollClientHeight(oHtml) {
  var offsetTop = 0;
  while (oHtml) {
    offsetTop = oHtml.scrollTop;
    if (offsetTop != 0) {
      var clientHeight = oHtml.clientHeight;
      return clientHeight == null ? 0 : clientHeight;
    }
    oHtml = oHtml.parentNode;
  }
  return 0;
};

function compOffsetTop(oHtml, targetParent) {
  var offsetTop = 0;
  while (oHtml && oHtml != targetParent) {
    if (oHtml.offsetTop > 0) {
      offsetTop += oHtml.offsetTop;
    }
    oHtml = oHtml.offsetParent;
  }
  return offsetTop;
};

function compScrollTop(oHtml, targetParent) {
  var scrollTop = 0;
  while (oHtml && oHtml != targetParent) {
    if (oHtml.parentNode && oHtml.parentNode.scrollTop && oHtml.parentNode.nodeName != 'HTML') scrollTop += oHtml.parentNode.scrollTop;
    oHtml = oHtml.parentNode;
  }
  return scrollTop;
};

function compOffsetLeft(oHtml, targetParent) {
  var offsetLeft = 0;
  while (oHtml && oHtml != targetParent) {
    offsetLeft += oHtml.offsetLeft;
    if (oHtml.offsetParent) offsetLeft -= oHtml.offsetParent.scrollLeft;
    oHtml = oHtml.offsetParent;
  }
  return offsetLeft;
};

function positionElementInView(eleDiv) {
  if (parseInt(eleDiv.style.top) + eleDiv.offsetHeight > document.body.clientHeight) {
    var top = document.body.clientHeight - eleDiv.offsetHeight;
    if (top < 0) {
      eleDiv.style.top = "0px";
      eleDiv.style.height = document.body.clientHeight + "px";
    } else eleDiv.style.top = top + "px";
  }
};

function positionElementToScreenCenter(element, sctop, clinetHeight) {
  var height = element.offsetHeight;
  var width = element.offsetWidth;
  if (element.children) {
    for (var i = 0; i < element.children.length; i++) {
      if (element.children[i].offsetWidth > width) {
        width = element.children[i].offsetWidth;
      }
    }
  }
  var screenHeight = document.body.clientHeight;
  var screenWidth = document.body.clientWidth;
  var topWin = getLfwTop() || window;
  var topScreenHeight = topWin.document.body.clientHeight;
  var topScreenWidth = topWin.document.body.clientWidth;
  if (screenHeight > topScreenHeight) {
    screenHeight = topScreenHeight;
  }
  if (screenWidth > topScreenWidth) {
    screenWidth = topScreenWidth;
  }
  if (element.parentNode) {
    screenWidth = element.parentNode.offsetWidth < screenWidth ? element.parentNode.offsetWidth : screenWidth;
  }
  var styleTop = screenHeight - height;
  if (styleTop < 0) styleTop = 60;
  if (sctop != null) element.style.top = parseInt(styleTop / 2) + parseInt(sctop) + "px";
  else element.style.top = styleTop / 2 + "px";
  var left = screenWidth - width;
  if (left < 0) left = 0;
  element.style.left = left / 2 + "px";
};

function positionElementToScreenCenterChangeSize(element, sctop) {
  var height = element.offsetHeight;
  var width = element.offsetWidth;
  var screenHeight = document.body.clientHeight;
  var screenWidth = document.body.clientWidth;
  if (element.parentNode) {
    screenWidth = element.parentNode.offsetWidth < screenWidth ? element.parentNode.offsetWidth : screenWidth;
  }
  var rate = 1;
  var centerX = screenWidth / 2;
  var centerY = screenHeight / 2;
  if (IS_IPAD) {
    rate = width / screenWidth;
    if (height / screenHeight > rate) {
      rate = height / screenHeight;
    }
    if (rate < 1) {
      rate = 1;
    }
    centerY = centerY - 20;
  }
  element.style.top = centerY + "px";
  element.style.left = centerX + "px";
  element.style.width = 0 + "px";
  element.style.height = 0 + "px";
  element.style.overflow = "hidden";
  _changeSize(1.0, 20, element, centerX, centerY, 0, 0, width / rate, height / rate);
};

function _changeSize(step, speed, element, centerX, centerY, currWidth, currHeight, width, height) {
  var newWidth = currWidth + (width * step);
  if (newWidth > width) newWidth = width;
  var newHeight = currHeight + (height * step);
  if (newHeight > height) newHeight = height;
  var newLeft = centerX - (newWidth / 2);
  var newTop = centerY - (newHeight / 2);
  element.style.width = newWidth + "px";
  element.style.height = newHeight + "px";
  element.style.left = newLeft + "px";
  element.style.top = newTop + "px";
  if (newWidth < width || newHeight < height) {
    element.ftTimeOutFunc = setTimeout(function() {
      _changeSize(step, speed, element, centerX, centerY, newWidth, newHeight, width, height);
    }, speed);
  } else {
    element.style.overflow = "";
  }
};

function positionElementToCenter(element, reltop, clientHeight) {
  var parentWidth = 0;
  var parentHeight = 0;
  if (element.parentNode.tagName.toUpperCase() == "BODY") {
    parentWidth = document.body.clientWidth;
    parentHeight = document.body.clientHeight;
  } else {
    parentWidth = element.parentNode.offsetWidth < 1200 ? element.parentNode.offsetWidth : 1200;
    parentHeight = element.parentNode.offsetHeight;
  }
  if (clientHeight != null && clientHeight > 0) {
    parentHeight = clientHeight;
  }
  var eleWidth = element.style.width;
  var eleHeight = element.style.height;
  var index = eleWidth.indexOf("%");
  if (index != -1) {
    left = (parentWidth * (1 - translatePercentToFloat(eleWidth))) / 2;
    left = parseInt(left);
  } else if (parentWidth <= parseInt(eleWidth)) left = 0;
  else {
    left = (parentWidth - parseInt(eleWidth)) / 2;
    left = parseInt(left);
  }
  index = eleHeight.indexOf("%");
  if (index != -1) {
    topb = (parentHeight * (1 - translatePercentToFloat(eleHeight))) / 2;
    topb = parseInt(topb);
  } else if (parentHeight <= parseInt(eleHeight)) topb = 0;
  else {
    topb = (parentHeight - parseInt(eleHeight)) / 2;
    topb = parseInt(topb);
  }
  element.style.position = "absolute";
  if (reltop != null && reltop != 0) topb += reltop;
  element.style.top = topb + "px";
  element.style.left = left + "px";
};

function positionneSelonEvent(eltApos, e) {
  var droite = document.body.clientWidth - e.clientX;
  var bas = document.body.clientHeight - e.clientY;
  var scrollLeft = document.body.scrollLeft;
  var scrolltop = document.body.scrollTop;
  var canResetX = false;
  var canResetY = false;
  if (document.body.clientWidth / 2 < e.clientX) {
    canResetX = true;
  }
  if (document.body.clientHeight / 2 < e.clientY) {
    canResetY = true;
  }
  if (droite < eltApos.offsetWidth) {
    var realWidth = scrollLeft + e.clientX - eltApos.offsetWidth;
    if (realWidth < 0) realWidth = 0;
    eltApos.style.left = realWidth + "px";
  } else {
    eltApos.style.left = scrollLeft + e.clientX + "px";
  }
  if (bas < eltApos.offsetHeight && canResetY) {
    var realTop = scrolltop + e.clientY - eltApos.offsetHeight;
    if (realTop < 0) realTop = 0;
    eltApos.style.top = realTop + "px";
  } else {
    eltApos.style.top = scrolltop + e.clientY + "px";
  }
};

function positionneSelonPosFournie(node, top, left, obj) {
  var visibleWidth = document.body.clientWidth - left;
  var bas = document.body.clientHeight - top;
  var scrollLeft = document.body.scrollLeft;
  var scrolltop = document.body.scrollTop;
  var canResetX = false;
  var canResetY = false;
  if (document.body.clientWidth / 2 < left) {
    canResetX = true;
  }
  if (document.body.clientHeight / 2 < top) {
    canResetY = true;
  }
  if (visibleWidth < node.offsetWidth) {
    var leftSpace = 0;
    if (obj.parentMenu.componentType == "MENUBAR") {
      leftSpace = scrollLeft + left - (node.offsetWidth - visibleWidth);
    } else {
      leftSpace = scrollLeft + left - node.offsetWidth;
      while (obj.parentMenu && obj.parentMenu.componentType != 'MENUBAR') {
        var parentNode = obj.parentMenu.Div_gen;
        leftSpace -= parentNode.offsetWidth;
        obj = obj.parentMenu;
      }
    }
    node.style.left = leftSpace + "px";
  } else node.style.left = scrollLeft + left + "px";
  if (bas < node.offsetHeight && canResetY) {
    var realTop = scrolltop + top - node.offsetHeight;
    if (realTop < 0) realTop = 0;
    node.style.top = realTop + "px";
  } else {
    node.style.top = scrolltop + top + "px";
  }
};

function getStyleAttribute(node, type) {
  if (IS_IE) {
    var style = node.currentStyle;
    return style[type];
  } else {
    var style = document.defaultView.getComputedStyle(node, null);
    if (style) return style.getPropertyValue(type);
    return null;
  }
};

function translatePercentToFloat(percent) {
  var index = percent.indexOf("%");
  if (index == -1) {
    log("Measures.js(translatePercentToFloat), The string: " + percent + " is not in percent format!");
    return 1;
  }
  try {
    return parseInt(percent.substring(0, index)) / 100;
  } catch (exception) {
    log("Measures.js(translatePercentToFloat)," + exception.name + ":" + exception.message);
    return 1;
  }
};
var STANDARD_ZINDEX = 10000;

function getZIndex() {
  if (pageUI) {
    if (!pageUI.STANDARD_ZINDEX) pageUI.STANDARD_ZINDEX = 10000;
    return ++pageUI.STANDARD_ZINDEX;
  } else {
    return ++STANDARD_ZINDEX;
  }
};

function getTopZIndex(zindex) {
  var z_index = parseInt(zindex, 10);
  if (isNaN(z_index)) {
    z_index = getZIndex();
  } else {
    if (z_index < STANDARD_ZINDEX) {
      z_index = getZIndex();
    }
  }
  return z_index;
}

function convertWidth(width) {
  if (width == null || width == "") return width;
  width = width + "";
  if (width.indexOf('%') != -1) return width;
  if (width.indexOf('px') != -1) return width;
  return width + "px";
}

function convertHeight(height) {
  if (height == null || height == "") return height;
  height = height + "";
  if (height.indexOf('%') != -1) return height;
  if (height.indexOf('px') != -1) return height;
  return height + "px";
}
window.objects = new Object;
BaseComponent.SCROLLWIDTH = 18;
BaseComponent.prototype = new ListenerUtil;
BaseComponent.ELEMENT_ERROR = "error";
BaseComponent.ELEMENT_WARNING = "warning";
BaseComponent.ELEMENT_NORMAL = "normal";
BaseComponent.ELEMENT_SUCCESS = "success";

function BaseComponent(name, left, top, width, height) {
  if (arguments.length == 0) return;
  ListenerUtil.call(this, true);
  this.id = name;
  this.left = getInteger(left, 0);
  this.top = getInteger(top, 0);
  this.width = getString(convertWidth(width), '100%');
  this.height = getString(convertHeight(height), '100%');
  this.visible = true;
  window.objects[this.id] = this;
  this.allChildObjects = new Array();
  this.hotKey = null;
  ListenerUtil.call(this, true);
  this.ctxChanged = false;
};
BaseComponent.prototype.placeIn = function(parent) {
  var objHtml = this.getObjHtml();
  objHtml.owner = this;
  var oThis = this;
  objHtml.oncontextmenu = function(e) {
    e = EventUtil.getEvent();
    oThis.onBeforeShowMenu(e);
    oThis.oncontextmenu(e);
    clearEventSimply(e);
  };
  if (parent.add) {
    parent.add(objHtml);
  } else {
    parent.appendChild(objHtml);
  }
  this.parentHtml = objHtml.parentNode;
  this.manageSelf();
  this.ctxChanged = false;
};
BaseComponent.prototype.getObjHtml = function() {
  return this.Div_gen;
};
BaseComponent.prototype.oncontextmenu = function(e) {
  e = EventUtil.getEvent();
  if (this.contextMenu) {
    this.contextMenu.triggerObj = this;
    this.contextMenu.show(e);
    stopEvent(e);
  }
  clearEventSimply(e);
};
BaseComponent.prototype.add = function(ObjHtml) {
  if (ObjHtml.owner) {
    this.allChildObjects.push(ObjHtml.owner);
    ObjHtml.owner.parentOwner = this;
  }
  this.getObjHtml().appendChild(ObjHtml);
};
BaseComponent.prototype.manageSelf = function() {};
BaseComponent.prototype.setPosition = function(left, top) {
  this.left = getInteger(left, 0);
  this.top = getInteger(top, 0);
  this.getObjHtml().style.left = this.left + "px";
  this.getObjHtml().style.top = this.top + "px";
};
BaseComponent.prototype.setSize = function(width, height) {
  this.width = getString(width, "100%");
  this.height = getString(height, "100%");
  if (width != -1) this.getObjHtml().style.width = this.width;
  if (height != -1) this.getObjHtml().style.height = this.height;
};
BaseComponent.prototype.setBounds = function(left, top, width, height) {
  this.left = getInteger(left, 0);
  this.top = getInteger(top, 0);
  this.width = getString(convertWidth(width), "100%");
  this.height = getString(convertHeight(height), "100%");
  this.getObjHtml().style.left = this.left + "px";
  this.getObjHtml().style.top = this.top + "px";
  this.getObjHtml().style.width = this.width;
  this.getObjHtml().style.height = this.height;
};
BaseComponent.prototype.getCompWidth = function() {
  return this.width;
};
BaseComponent.prototype.getCompHeight = function() {
  return this.height;
};
BaseComponent.prototype.setZIndex = function(zIndex) {
  this.getObjHtml().style.zIndex = zIndex;
};
BaseComponent.prototype.getContentHeight = function() {
  return this.getObjHtml().offsetHeight;
};
BaseComponent.prototype.getContentWidth = function() {
  return this.getObjHtml().offsetWidth;
};
BaseComponent.prototype.destroySelf = function() {
  this.destroy();
};
BaseComponent.prototype.destroy = function() {
  if (this.allChildObjects != null) {
    this.allChildObjects = null;
  }
  var objHtml = this.getObjHtml();
  if (objHtml) {
    clearHtmlNodeProperties(objHtml);
    if (objHtml.parentNode) {
      objHtml.parentNode.removeChild(objHtml);
    }
    objHtml = null;
  }
  this.parentHtml = null;
  this.parentOwner = null;
  delete window.objects[this.id];
  window.objects[this.id] = null;
  for (var i = 0; i < window.clickHolders.length; i++) {
    if (window.clickHolders[i] == this) {
      window.clickHolders.splice(i, 1);
      break;
    }
  }
  this.clearListenerMap();
  if (this.destroyFurther) this.destroyFurther();
  clearNodeProperties(this);
};
BaseComponent.prototype.hide = function() {
  var obj = this.getObjHtml();
  if (obj != null) obj.style.display = "none";
  this.visible = false;
  this.ctxChanged = true;
};
BaseComponent.prototype.show = function() {
  var obj = this.getObjHtml();
  if (obj != null) obj.style.display = "block";
  this.visible = true;
  this.ctxChanged = true;
};
BaseComponent.prototype.hideV = function() {
  var obj = this.getObjHtml();
  if (obj != null) obj.style.visibility = "hidden";
  this.visible = false;
  this.ctxChanged = true;
};
BaseComponent.prototype.showV = function() {
  var obj = this.getObjHtml();
  obj.style.visibility = "";
  this.visible = true;
  this.ctxChanged = true;
};
BaseComponent.prototype.setClass = function(key, className) {
  if (this.classMap == null) this.classMap = new HashMap();
  this.classMap.put(key, className);
  this.onClassChange(key);
};
BaseComponent.prototype.onClassChange = function(key) {};
BaseComponent.prototype.setContextMenu = function(menu) {
  this.contextMenu = menu;
};
BaseComponent.prototype.getContextMenu = function() {
  return this.contextMenu;
};
BaseComponent.prototype.showMenu = function(e) {
  if (this.contextMenu != null) this.contextMenu.show(e);
};
BaseComponent.prototype.onBeforeShowMenu = function(e) {
  var simpleEvent = {
    "obj": this
  };
  this.doEventFunc("beforeShow", simpleEvent);
};
BaseComponent.prototype.handleHotKey = function(key) {
  if (this.hotKey != null) {
    if (key == this.hotKey && this.onclick) {
      this.onclick(null);
      return this;
    }
  }
  return null;
};
BaseComponent.prototype.setHotKey = function(hotKey) {
  this.hotKey = hotKey;
};
BaseComponent.prototype.getHotKey = function() {
  return this.hotKey;
};
BaseComponent.prototype.getChangedContext = function() {
  return this.changedObj;
};
BaseComponent.prototype.setChangedContext = function(context) {};
BaseComponent.prototype.notifyChange = function(type, value) {
  if (type == null) return;
  if (isReturning()) {
    if (this.changedObj != null && typeof this.changedObj[type] != 'undefined') delete this.changedObj[type];
    return;
  }
  if (this.changedObj == null) {
    this.changedObj = new Object;
    this.changedObj.id = this.id;
  }
  this.changedObj[type] = value;
};
BaseComponent.prototype.clearChange = function() {
  delete this.changedObj;
};
BaseComponent.prototype.hasProperty = function(property) {
  if (typeof property != "undefined") return true;
  else return false;
};
BaseComponent.prototype.isDblEvent = function(eventname) {
  if (this.currentEventName != null && this.currentEventName == eventname) return true;
  else {
    var oThis = this;
    if (this.cleanCurrEventName) clearTimeout(this.cleanCurrEventName);
    this.currentEventName = eventname;
    this.cleanCurrEventName = setTimeout(function() {
      oThis.currentEventName = null;
    }, 500);
    return false;
  }
};
window.clickHolders = new Array();
if (window.globalObject == null) window.globalObject = new Object;
SHIFT_MASK = 1 << 0;
CTRL_MASK = 1 << 1;
ALT_MASK = 1 << 3;
document.oncontextmenu = documentContextMenu;

function documentContextMenu() {
  for (var i = 0; i < window.clickHolders.length; i++) {
    if (window.clickHolders[i].outsideContextMenuClick) window.clickHolders[i].outsideContextMenuClick();
  }
  if (window.debugMode == true) return true;
  return false;
};
document.onclick = documentClick;

function documentClick(e) {
  e = EventUtil.getEvent();
  for (var i = 0; i < window.clickHolders.length; i++) {
    if (window.clickHolders[i].outsideClick) window.clickHolders[i].outsideClick(e);
  }
  window.clickHolders.trigger = null;
  clearEventSimply(e);
};
document.onmouseover = documentMouseover;

function documentMouseover() {
  for (var i = 0; i < window.clickHolders.length; i++) {
    if (window.clickHolders[i] && window.clickHolders[i].outsideOver) window.clickHolders[i].outsideOver();
  }
};
if (document.addEventListener) {
  document.addEventListener('DOMMouseScroll', documentMouseWheelFunc, false);
}
document.onmousewheel = documentMouseWheelFunc;

function documentMouseWheelFunc(e) {
  for (var i = 0; i < window.clickHolders.length; i++) {
    if (window.clickHolders[i].outsideMouseWheelClick) window.clickHolders[i].outsideMouseWheelClick(e);
  }
};
document.onkeydown = documentKeydown;

function documentKeydown(e) {
  if (!e) {
    e = window.event;
  }
  var keyCode = e.keyCode ? e.keyCode : e.charCode ? e.charCode : e.which ? e.which : void 0;
  if ((e.ctrlKey) && (keyCode == 78)) {
    stopDefault(e);
    return false;
  } else if ((e.shiftKey) && (keyCode == 121)) {
    stopDefault(e);
    return false;
  } else if ((e.ctrlKey) && (keyCode == 66)) {
    stopDefault(e);
    return false;
  } else if ((e.ctrlKey) && (keyCode == 69)) {
    stopDefault(e);
  } else if ((e.ctrlKey) && (keyCode == 82)) {
    stopDefault(e);
    return false;
  } else if ((e.ctrlKey) && (keyCode == 65)) {
    stopDefault(e);
    return false;
  } else if (keyCode == 80 && e.ctrlKey) {
    e.keyCode = 0;
    stopDefault(e);
  } else if (keyCode == 76 && e.ctrlKey) {
    stopDefault(e);
    return false;
  } else if (keyCode == 73 && e.ctrlKey) {
    stopDefault(e);
  } else if (e.ctrlKey && keyCode == 67) {} else if (e.ctrlKey && keyCode == 86) {} else if (e.ctrlKey && keyCode == 68) {
    stopDefault(e);
    return false;
  } else if (e.altKey && keyCode == 90) {
    stopDefault(e);
    return false;
  } else if (keyCode == 114) {
    e.keyCode = 505;
    stopDefault(e);
    return false;
  } else if (keyCode == 8) {
    var ev = e.srcElement || e.target;
    if (ev && ev.tagName != "INPUT" && ev.tagName != "TEXTAREA") {
      stopAll(e);
      return false;
    }
  }
  return true;
};

function documentKeyup(e) {
  return $pageKeyUpFunc(e);
};

function $pageKeyUpFunc(e) {
  if (!window.pageUI) {
    return true;
  }
  if (!e) e = window.event;
  var keyCode = e.keyCode ? e.keyCode : e.charCode ? e.charCode : e.which ? e.which : void 0;
  if (keyCode == 68 && e.ctrlKey && e.shiftKey) {
    if (window.debugMode == true) showDebugDialog();
  }
  if (window.top != window) {
    var parentPage = parent;
    while (parentPage && !parentPage.$pageKeyUpFunc) {
      if (parentPage == parentPage.parent) break;
      parentPage = parentPage.parent;
    }
    if (parentPage && parentPage.$pageKeyUpFunc) return parentPage.$pageKeyUpFunc(e);
  }
  return true;
};

function PrintProxy() {
  if (window.$pdb == null) {
    try {
      window.$pdb = new ActiveXObject("UFGears.PrintServer");
      window.$pdb.setDBName("PrintDB", "");
    } catch (error) {
      window.$pdb = null;
    }
  }
}
PrintProxy.prototype.preview = function(obj) {
  return window.$pdb.preview(obj);
};
PrintProxy.prototype.getVPrinters = function() {
  return window.$pdb.getVPrinters();
};
PrintProxy.prototype.getPhPrinters = function() {
  if (window.$pdb == null) return "";
  var pp = window.$pdb.getPhPrinters();
  eval("var data = " + pp);
  return data.data.join();
};
PrintProxy.prototype.doPrintFile = function(id) {
  var obj = getSessionAttribute("print_content_" + id);
  if (obj == null) {
    obj = parent.getSessionAttribute("print_content_" + id);
  }
  this.preview(obj);
};
PrintProxy.prototype.printOut = function(printerName, idArr) {
  for (var i = 0; i < idArr.length; i++) {
    var obj = getSessionAttribute("print_content_" + idArr[i]);
    window.$pdb.printOut(printerName, obj);
  }
};

function CacheProxy(dbName) {
  if (window.db == null) {
    try {
      window.db = new ActiveXObject("UFGears.LocalDB");
      var path = "";
      if (window.clientMode) {
        if (window.offlineCachePath) path = window.offlineCachePath;
        else path = "c:\\demo\\db";
      }
      window.db.setDbName(dbName, path);
    } catch (error) {
      window.db = null;
    }
  }
}
CacheProxy.prototype.isInitialized = function() {
  var rt = db.GetCacheObjs("1");
  eval("var obj = " + rt);
  return obj.data.length > 0;
};
CacheProxy.prototype.isCacheEnabled = function() {
  return window.db != null;
};
CacheProxy.prototype.initCache = function() {
  showProgressDialog(trans("rt_00000_1"));
  var ajax = new Ajax();
  ajax.setPath(window.globalPath + "/cache");
  ajax.addParam("type", "fullinit");
  ajax.setReturnFunc(CacheProxy.fullInitReturnFunc);
  ajax.post();
};
CacheProxy.fullInitReturnFunc = function(xmlHttpReq, returnArgs, tip, ajax) {
  try {
    var resp = xmlHttpReq.responseText;
    var init = db.initCache(resp);
  } finally {
    hideProgressDialog();
  }
};
CacheProxy.prototype.updateCache = function(versionMap) {
  var rt = db.GetCacheObjs("1");
  eval("var obj = " + rt);
  if (obj.data.length > 0) {
    var tableVersionStr = new Array;
    for (var i = 0; i < obj.data.length; i++) {
      var data = obj.data[i];
      var version = versionMap.map[data[0]];
      if (version != null) {
        if (version != data[2]) tableVersionStr.push(data[0] + "," + data[2]);
      }
    }
  }
  tableVersionStr = tableVersionStr.join(';');
  if (tableVersionStr != "") {
    showProgressDialog(trans("rt_00000_2"));
    var ajax = new Ajax();
    ajax.setPath(window.globalPath + "/cache");
    ajax.addParam("type", "update");
    ajax.addParam("tableVersion", tableVersionStr);
    ajax.setReturnFunc(CacheProxy.fullInitReturnFunc);
    ajax.post();
  }
};
CacheProxy.prototype.isTableCached = function(tableName) {
  return db.isTableCached(tableName);
};
CacheProxy.prototype.executeQuery = function(sql) {
  return db.queryAll(sql);
};
CacheProxy.prototype.executeQueryByPage = function(sql, size, index) {
  return db.queryByPage(sql, size, index);
};
CacheProxy.prototype.executeSql = function(sql) {
  return db.executeSql(sql);
};

function getPrintProxy() {
  if (window.globalObject.printInstance == null) window.globalObject.printInstance = new PrintProxy();
  return window.globalObject.printInstance;
}

function getCacheProxy(dbName) {
  if (window.clientMode) dbName = "pbase_design";
  if (window.globalObject.cacheInstance == null) window.globalObject.cacheInstance = new Object;
  if (window.globalObject.cacheInstance[dbName] == null) {
    window.globalObject.cacheInstance[dbName] = new CacheProxy(dbName);
  }
  return window.globalObject.cacheInstance[dbName];
};
window.currentLoadingLib = [];
window.idFuncArr = {};
window.FUNC_ID = 1;

function require(id, func, uuid) {
  if (isLibLoaded(id)) {
    if (uuid != null) {
      func = idFuncArr[uuid];
      if (func) func();
    } else {
      if (func) func();
    }
    return;
  }
  if (window.currentLoadingLib[id] != null) {
    if (uuid == null) {
      uuid = window.FUNC_ID++;
      idFuncArr[uuid] = func;
    }
    setTimeout("require('" + id + "', null, '" + uuid + "')", 100);
    return;
  }
  var filelib = calculateAllLibs(id);
  var idlib = filelib.idlib;
  if (idlib != null) {
    for (var i = 0; i < idlib.length; i++) window.currentLoadingLib[idlib[i]] = 1;
  }
  require_css(filelib.csslib);
  require_js(filelib.jslib, func, filelib.idlib);
}

function requireList(ids, func) {
  if (ids.length == 0) func();
  else {
    var id = ids[0];
    ids.splice(0, 1);
    require(id, function() {
      requireList(ids, func)
    });
  }
}

function isLibLoaded(id) {
  if (window.loadedLib[id] != null) return true;
  if (window.debugMode == false) {
    if (window.libArray[id] != null) return false;
    return true;
  }
  return false;
}

function calculateAllLibs(id) {
  var jsArr = [];
  var cssArr = [];
  var idArr = [];
  calculateLibs(id, jsArr, cssArr, idArr);
  var filelib = {};
  filelib.csslib = cssArr;
  filelib.jslib = jsArr;
  filelib.idlib = idArr;
  return filelib;
}

function calculateLibs(id, jsArr, cssArr, idArr) {
  if (window.loadedLib[id] != null) {
    return;
  }
  var lib = window.libArray[id];
  if (lib == null) {
    alert("lib is null:" + id);
    return;
  }
  var dps = lib.dp;
  if (dps != null) {
    for (var i = 0; i < dps.length; i++) {
      calculateLibs(dps[i], jsArr, cssArr, idArr);
    }
  }
  if (lib.jslib != null) {
    for (var i = 0; i < lib.jslib.length; i++) jsArr.push(lib.jslib[i]);
  }
  if (lib.csslib != null) {
    for (var i = 0; i < lib.csslib.length; i++) cssArr.push(lib.csslib[i]);
  }
  idArr.push(id);
}
window.cssLoadRecord = {};
window.jsLoadRecord = {};

function require_css(files) {
  if (files == null || files.length == 0) return;
  var html_doc = document.getElementsByTagName('head')[0];
  for (var i = 0; i < files.length; i++) {
    if (window.cssLoadRecord[files[i]] != null) continue;
    window.cssLoadRecord[files[i]] = 1;
    var css = document.createElement('link');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('type', 'text/css');
    var path = window.themePath + "/" + files[i] + ".css";
    css.setAttribute('href', path);
    html_doc.appendChild(css);
  }
}

function require_js(files, func, ids) {
  if (files == null || files.length == 0) {
    for (var i = 0; i < ids.length; i++) window.loadedLib[ids[i]] = 1;
    func();
    return;
  }
  var html_doc = document.getElementsByTagName('head')[0];
  if (window.jsLoadRecord[files[0]] != null) {
    if (files.length == 1) {
      for (var i = 0; i < ids.length; i++) {
        window.currentLoadingLib[ids[i]] = null;
        window.loadedLib[ids[i]] = 1;
      }
      func();
    } else {
      files.splice(0, 1);
      require_js(files, func, ids);
    }
    return;
  }
  var js = document.createElement('script');
  js.setAttribute('type', 'text/javascript');
  var path = window.baseGlobalPath + "/frame/device_pc/script/" + files[0] + ".js";
  js.setAttribute('src', path);
  html_doc.appendChild(js);
  if (!IS_IE9) {
    js.onreadystatechange = function() {
      if (js.readyState == 'complete' || js.readyState == 'loaded') {
        window.jsLoadRecord[files[0]] = 1;
        if (files.length == 1) {
          for (var i = 0; i < ids.length; i++) {
            window.currentLoadingLib[ids[i]] = null;
            window.loadedLib[ids[i]] = 1;
          }
          func();
        } else {
          files.splice(0, 1);
          require_js(files, func, ids);
        }
      }
    };
  }
  if (!IS_IE10) {
    js.onload = function() {
      window.jsLoadRecord[files[0]] = 1;
      if (files.length == 1) {
        for (var i = 0; i < ids.length; i++) {
          window.currentLoadingLib[ids[i]] = null;
          window.loadedLib[ids[i]] = 1;
        }
        func();
      } else {
        files.splice(0, 1);
        require_js(files, func, ids);
      }
    };
  }
}
NumberFormatMeta.prototype = new Object;
NumberFormatMeta.prototype.metaType = "NumberFormatMeta";

function NumberFormatMeta() {};
NumberFormatMeta.prototype.isNegRed = true;
NumberFormatMeta.prototype.isMarkEnable = true;
NumberFormatMeta.prototype.markSymbol = ",";
NumberFormatMeta.prototype.pointSymbol = ".";
NumberFormatMeta.prototype.positiveFormat = "n";
NumberFormatMeta.prototype.negativeFormat = "-n";
CurrencyFormatMeta.prototype = new NumberFormatMeta;
CurrencyFormatMeta.prototype.metaType = "CurrencyFormatMeta";
CurrencyFormatMeta.prototype.curSymbol = "";

function CurrencyFormatMeta() {
  this.positiveFormat = "$n";
  this.negativeFormat = "$-n";
};
DateTimeFormatMeta.prototype = new Object();
DateTimeFormatMeta.prototype.metaType = "DateTimeFormatMeta";
DateTimeFormatMeta.prototype.format = "yyyy-MM-dd hh:mm:ss";
DateTimeFormatMeta.prototype.speratorSymbol = "-";

function DateTimeFormatMeta() {};
DateFormatMeta.prototype = new DateTimeFormatMeta();

function DateFormatMeta() {
  this.format = "yyyy-MM-dd";
};
TimeFormatMeta.prototype = new DateTimeFormatMeta;

function TimeFormatMeta() {
  this.format = "hh:mm:ss";
};
AddressFormatMeta.prototype = new Object;

function AddressFormatMeta() {
  this.express = "C S T R P";
  this.separator = " ";
};

function AbstractMasker() {};
AbstractMasker.prototype.format = function(obj) {
  if (obj == null) return null;
  var fObj = this.formatArgument(obj);
  return this.innerFormat(fObj);
};
AbstractMasker.prototype.formatArgument = function(obj) {};
AbstractMasker.prototype.innerFormat = function(obj) {};
AbstractSplitMasker.prototype = new AbstractMasker;

function AbstractSplitMasker() {};
AbstractSplitMasker.prototype.elements = new Array;
AbstractSplitMasker.prototype.format = function(obj) {
  if (obj == null) return null;
  var fObj = this.formatArgument(obj);
  return this.innerFormat(fObj);
};
AbstractSplitMasker.prototype.formatArgument = function(obj) {
  return obj;
};
AbstractSplitMasker.prototype.innerFormat = function(obj) {
  if (obj == null || obj == "") return new FormatResult(obj);
  this.doSplit();
  var result = "";
  result = this.getElementsValue(this.elements, obj);
  return new FormatResult(result);
};
AbstractSplitMasker.prototype.getElementsValue = function(element, obj) {
  var result = "";
  if (element instanceof Array) {
    for (var i = 0; i < element.length; i++) {
      result = result + this.getElementsValue(element[i], obj);
    }
  } else {
    if (element.getValue) result = element.getValue(obj);
  }
  return result;
};
AbstractSplitMasker.prototype.getExpress = function() {};
AbstractSplitMasker.prototype.doSplit = function() {
  var express = this.getExpress();
  if (this.elements == null || this.elements.length == 0) this.elements = this.doQuotation(express, this.getSeperators(), this.getReplaceds(), 0);
};
AbstractSplitMasker.prototype.doQuotation = function(express, seperators, replaced, curSeperator) {
  if (express.length == 0) return null;
  var elements = new Array();
  var pattern = new RegExp('".*?"', "g");
  var fromIndex = 0;
  var result;
  do {
    result = pattern.exec(express);
    if (result != null) {
      var i = result.index;
      var j = pattern.lastIndex;
      if (i != j) {
        if (fromIndex < i) {
          var childElements = this.doSeperator(express.substring(fromIndex, i), seperators, replaced, curSeperator);
          if (childElements != null && childElements.length > 0) {
            elements.push(childElements);
          }
        }
      }
      elements.push(new StringElement(express.substring(i + 1, j - 1)));
      fromIndex = j;
    }
  } while (result != null);
  if (fromIndex < express.length) {
    var childElements = this.doSeperator(express.substring(fromIndex, express.length), seperators, replaced, curSeperator);
    if (childElements != null && childElements.length > 0) elements.push(childElements);
  }
  return elements;
};
AbstractSplitMasker.prototype.doSeperator = function(express, seperators, replaced, curSeperator) {
  if (curSeperator >= seperators.length) {
    var elements = new Array;
    elements.push(this.getVarElement(express));
    return elements;
  }
  if (express.length == 0) return null;
  var fromIndex = 0;
  var elements = new Array();
  var pattern = new RegExp(seperators[curSeperator], "g");
  var result;
  do {
    result = pattern.exec(express);
    if (result != null) {
      var i = result.index;
      var j = pattern.lastIndex;
      if (i != j) {
        if (fromIndex < i) {
          var childElements = this.doSeperator(express.substring(fromIndex, i), seperators, replaced, curSeperator + 1);
          if (childElements != null && childElements.length > 0) elements.push(childElements);
        }
        if (replaced[curSeperator] != null) {
          elements.push(new StringElement(replaced[curSeperator]));
        } else {
          elements.push(new StringElement(express.substring(i, j)));
        }
        fromIndex = j;
      }
    }
  } while (result != null);
  if (fromIndex < express.length) {
    var childElements = this.doSeperator(express.substring(fromIndex, express.length), seperators, replaced, curSeperator + 1);
    if (childElements != null && childElements.length > 0) elements.push(childElements);
  }
  return elements;
};
AddressMasker.prototype = new AbstractSplitMasker;

function AddressMasker(formatMeta) {
  this.formatMeta = formatMeta;
};
AddressMasker.prototype.getExpress = function() {
  return this.formatMeta.express;
};
AddressMasker.prototype.getReplaceds = function() {
  return [this.formatMeta.separator];
};
AddressMasker.prototype.getSeperators = function() {
  return ["(\\s)+?"];
};
AddressMasker.prototype.getVarElement = function(express) {
  var ex = {};
  if (express == ("C")) ex.getValue = function(obj) {
    return obj.country;
  };
  if (express == ("S")) ex.getValue = function(obj) {
    return obj.state;
  };
  if (express == ("T")) ex.getValue = function(obj) {
    return obj.city;
  };
  if (express == ("D")) ex.getValue = function(obj) {
    return obj.section;
  };
  if (express == ("R")) ex.getValue = function(obj) {
    return obj.road;
  };
  if (express == ("P")) ex.getValue = function(obj) {
    return obj.postcode;
  };
  if (typeof(ex.getValue) == undefined) return new StringElement(express);
  else return ex;
};
AddressMasker.prototype.formatArgument = function(obj) {
  return obj;
};
NumberMasker.prototype = new AbstractMasker;
NumberMasker.prototype.formatMeta = null;
NumberMasker.prototype.innerFormat = function(obj) {
  var dValue, express, seperatorIndex, strValue;
  dValue = obj.value;
  if (dValue > 0) {
    express = this.formatMeta.positiveFormat;
    strValue = dValue + '';
  } else if (dValue < 0) {
    express = this.formatMeta.negativeFormat;
    strValue = (dValue + '').substr(1, (dValue + '').length - 1);
  } else {
    express = this.formatMeta.positiveFormat;
    strValue = dValue + '';
  }
  seperatorIndex = strValue.indexOf('.');
  strValue = this.setTheSeperator(strValue, seperatorIndex);
  strValue = this.setTheMark(strValue, seperatorIndex);
  var color = null;
  if (dValue < 0 && this.formatMeta.isNegRed) {
    color = "FF0000";
  }
  return new FormatResult(express.replaceAll('n', strValue), color);
};
NumberMasker.prototype.setTheMark = function(str, seperatorIndex) {
  var endIndex, first, index;
  if (!this.formatMeta.isMarkEnable) return str;
  if (seperatorIndex <= 0) seperatorIndex = str.length;
  first = str.charCodeAt(0);
  endIndex = 0;
  if (first == 45) endIndex = 1;
  index = seperatorIndex - 3;
  while (index > endIndex) {
    str = str.substr(0, index - 0) + this.formatMeta.markSymbol + str.substr(index, str.length - index);
    index = index - 3;
  }
  return str;
};
NumberMasker.prototype.setTheSeperator = function(str, seperatorIndex) {
  var ca;
  if (seperatorIndex > 0) {
    ca = NumberMasker.toCharArray(str);
    ca[seperatorIndex] = this.formatMeta.pointSymbol;
    str = ca.join('');
  }
  return str;
};
NumberMasker.toCharArray = function(str) {
  var str = str.split("");
  var charArray = new Array();
  for (var i = 0; i < str.length; i++) {
    charArray.push(str[i]);
  }
  return charArray;
};

function NumberMasker(formatMeta) {
  this.formatMeta = formatMeta;
};
NumberMasker.prototype.formatArgument = function(obj) {
  var numberObj = {};
  numberObj.value = obj;
  return numberObj;
};
CurrencyMasker.prototype = new NumberMasker;
CurrencyMasker.prototype.formatMeta = null;

function CurrencyMasker(formatMeta) {
  this.formatMeta = formatMeta;
};
CurrencyMasker.prototype.innerFormat = function(obj) {
  var fo = (new NumberFormat(this.formatMeta)).innerFormat(obj);
  fo.value = fo.value.replace("$", this.formatMeta.curSymbol);
  return fo;
};
DateTimeMasker.prototype = new AbstractSplitMasker;
DateTimeMasker.enShortMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
DateTimeMasker.enLongMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
DateTimeMasker.prototype.formatMeta = null;

function DateTimeMasker(formatMeta) {
  this.formatMeta = formatMeta;
};
DateTimeMasker.prototype.doOne = function(express) {
  if (express.length == 0) return new "";
  var obj = new Object;
  if (express == "yyyy") {
    obj.getValue = function(o) {
      return DateTimeMasker.getyyyy(o);
    };
  }
  if (express == "yy") {
    obj.getValue = function(o) {
      return DateTimeMasker.getyy(o);
    };
  }
  if (express == "MMMM") {
    obj.getValue = function(o) {
      return DateTimeMasker.getMMMM(o);
    };
  }
  if (express == "MMM") {
    obj.getValue = function(o) {
      return DateTimeMasker.getMMM(o);
    };
  }
  if (express == "MM") {
    obj.getValue = function(o) {
      return DateTimeMasker.getMM(o);
    };
  }
  if (express == "M") {
    obj.getValue = function(o) {
      return DateTimeMasker.getM(o);
    };
  }
  if (express == "dd") {
    obj.getValue = function(o) {
      return DateTimeMasker.getdd(o);
    };
  }
  if (express == "d") {
    obj.getValue = function(o) {
      return DateTimeMasker.getd(o);
    };
  }
  if (express == "hh") {
    obj.getValue = function(o) {
      return DateTimeMasker.gethh(o);
    };
  }
  if (express == "h") {
    obj.getValue = function(o) {
      return DateTimeMasker.geth(o);
    };
  }
  if (express == "mm") {
    obj.getValue = function(o) {
      return DateTimeMasker.getmm(o);
    };
  }
  if (express == "m") {
    obj.getValue = function(o) {
      return DateTimeMasker.getm(o);
    };
  }
  if (express == "ss") {
    obj.getValue = function(o) {
      return DateTimeMasker.getss(o);
    };
  }
  if (express == "s") {
    obj.getValue = function(o) {
      return DateTimeMasker.gets(o);
    };
  }
  if (express == "HH") {
    obj.getValue = function(o) {
      return DateTimeMasker.getHH(o);
    };
  }
  if (express == "H") {
    obj.getValue = function(o) {
      return DateTimeMasker.getH(o);
    };
  }
  if (express == "t") {
    obj.getValue = function(o) {
      return DateTimeMasker.gett(o);
    };
  }
  if (express == "st") {
    obj.getValue = function(o) {
      return DateTimeMasker.gets(o) + DateTimeMasker.gett(o);
    };
  }
  if (express == "mt") {
    obj.getValue = function(o) {
      return DateTimeMasker.getm(o) + DateTimeMasker.gett(o);
    };
  }
  if (express == "yyyyMMdd") {
    obj.getValue = function(o) {
      return DateTimeMasker.getyyyy(o) + DateTimeMasker.getMM(o) + DateTimeMasker.getdd(o);
    };
  }
  if (typeof(obj.getValue) == "undefined") {
    obj.getValue = function(o) {
      return DateTimeMasker.getyyyy(o) + "-" + DateTimeMasker.getMM(o) + "-" + DateTimeMasker.getdd(o);
    };
  }
  return obj;
};
DateTimeMasker.getyyyy = function(date) {
  return date.getFullYear();
};
DateTimeMasker.getyy = function(date) {
  return ("" + date.getFullYear()).substring(2);
};
DateTimeMasker.getM = function(date) {
  return "" + (date.getMonth() + 1);
};
DateTimeMasker.getMM = function(date) {
  var month = date.getMonth() + 1;
  if (month < 10) return "0" + month;
  return month;
};
DateTimeMasker.getMMM = function(date) {
  return this.enShortMonth[date.getMonth()];
};
DateTimeMasker.getMMMM = function(date) {
  return this.enLongMonth[date.getMonth()];
};
DateTimeMasker.getdd = function(date) {
  var day = date.getDate();
  if (day < 10) return "0" + day;
  return date.getDate() + "";
};
DateTimeMasker.getd = function(date) {
  return date.getDate() + "";
};
DateTimeMasker.gethh = function(date) {
  var hh = date.getHours();
  if (hh < 10) return "0" + hh;
  return (date.getHours()) + "";
};
DateTimeMasker.geth = function(date) {
  return (date.getHours()) + "";
};
DateTimeMasker.getHH = function(date) {
  var HH = date.getHours();
  if (HH >= 12) HH = HH - 12;
  if (HH < 10) return "0" + HH;
  return (HH) + "";
};
DateTimeMasker.getH = function(date) {
  var HH = date.getHours();
  if (HH >= 12) HH = HH - 12;
  return (HH) + "";
};
DateTimeMasker.getmm = function(date) {
  var mm = date.getMinutes();
  if (mm < 10) return "0" + mm;
  return (date.getMinutes()) + "";
};
DateTimeMasker.getm = function(date) {
  return "" + (date.getMinutes());
};
DateTimeMasker.getss = function(date) {
  var ss = date.getSeconds();
  if (ss < 10) return "0" + ss;
  return (ss) + "";
};
DateTimeMasker.gets = function(date) {
  return (date.getSeconds()) + "";
};
DateTimeMasker.gett = function(date) {
  var hh = date.getHours();
  if (hh <= 12) return "AM";
  else return "PM";
};
DateTimeMasker.prototype.getExpress = function() {
  return this.formatMeta.format;
};
DateTimeMasker.prototype.getReplaceds = function() {
  return [" ", this.formatMeta.speratorSymbol, ":"];
};
DateTimeMasker.prototype.getSeperators = function() {
  return ["(\\s)+?", "-", ":"];
};
DateTimeMasker.prototype.getVarElement = function(express) {
  return this.doOne(express);
};
DateTimeMasker.prototype.formatArgument = function(obj) {
  if (obj == 0) return "";
  if (obj == null || obj == "") return obj;
  if ((typeof obj) == "string") {
    var dateArr = obj.split(" ");
    if (dateArr.length > 0) {
      var arr0 = dateArr[0].split("-");
      var date = new Date();
      date.setDate(1);
      date.setFullYear(parseInt(arr0[0], 10));
      date.setMonth(parseInt(arr0[1], 10) - 1);
      date.setDate(parseInt(arr0[2], 10));
      if (dateArr.length == 2 && dateArr[1] != undefined) {
        var arr1 = dateArr[1].split(":");
        date.setHours(parseInt(arr1[0], 10));
        date.setMinutes(parseInt(arr1[1], 10));
        date.setSeconds(parseInt(arr1[2], 10));
        if (arr1.length > 3) date.setMilliseconds(parseInt(arr1[3], 10));
      }
    }
    return date;
  }
  return (obj);
};
DateMasker.prototype = new DateTimeMasker;

function DateMasker(formatMeta) {
  this.formatMeta = formatMeta;
};
TimeMasker.prototype = new DateTimeMasker;

function TimeMasker(formatMeta) {
  this.formatMeta = formatMeta;
};
PrecentMasker.prototype = new AbstractMasker;

function PrecentMasker() {};
PrecentMasker.prototype.formatArgument = function(obj) {
  return obj;
};
PrecentMasker.prototype.innerFormat = function(obj) {
  var val = "";
  if (obj != "") {
    var objStr = String(obj);
    var objPrecision = objStr.length - objStr.indexOf(".") - 1;
    var showPrecision = objPrecision - 2;
    if (showPrecision < 0) {
      showPrecision = 0;
    }
    val = parseFloat(obj) * 100;
    val = (val * Math.pow(10, showPrecision) / Math.pow(10, showPrecision)).toFixed(showPrecision);
    val = val + "%";
  }
  return {
    value: val
  };
};

function toColorfulString(result) {
  var color;
  if (!result) {
    return '';
  }
  if (result.color == null) {
    return result.value;
  }
  color = result.color;
  return '<font color="' + color + '">' + result.value + '<\/font>';
};
StringElement.prototype = new Object();

function StringElement(value) {
  this.value = value;
};
StringElement.prototype.value = "";
StringElement.prototype.getValue = function(obj) {
  return this.value;
};
FormatResult.prototype = new Object;

function FormatResult(value, color) {
  this.value = value;
  this.color = color;
};

function Application() {
  this.pageUIMap = {};
}
Application.prototype.addPageUI = function(id, pageUI) {
  this.pageUIMap[id] = pageUI;
};
Application.prototype.getPageUI = function(id) {
  var pageUI = this.pageUIMap[id];
  if (pageUI == null) pageUI = getPopParent().pageUI;
  return pageUI;
};

function getApplication() {
  if (window.application == null) window.application = new Application();
  return window.application;
};

function getService(sName) {
  var service = new ServiceProxy(sName);
  return service;
};

function ServiceProxy(sName) {
  this.name = sName;
};
ServiceProxy.prototype.execute = function(method, args) {
  var obj = {};
  obj.rpcname = this.name;
  obj.method = method;
  for (var i = 1; i < arguments.length; i++) {
    obj["params" + (i - 1)] = arguments[i];
  }
  var data = toJSON(obj);
  var ajax = new Ajax();
  ajax.setPath(getCorePath() + "/rpc");
  ajax.setQueryStr("rpcdata=" + data);
  ajax.setReturnFunc(ServiceProxy.$returnFun);
  var innerArgs = [null, null, ajax];
  ajax.setReturnArgs(innerArgs);
  return ajax.post(false);
};
ServiceProxy.$returnFun = function(xmlHttpReq, returnArgs, exception) {
  var ajaxObj = returnArgs[2];
  var returnFunc = returnArgs[1];
  var userArgs = returnArgs[0];
  var text = xmlHttpReq.responseText;
  try {
    eval("var obj = " + text + ";");
  } catch (er) {
    eval("var obj = '" + text + "';");
  }
  return obj;
};
var ServerSet = {
  sign: {
    saveLog: function() {
      return getService("uap.lfw.sign.itf.ISignService");
    }
  }
};

function getFormularService() {
  return getService("nc.uap.lfw.core.model.formular.IEditFormularService");
};

function getFileService() {
  return getService("uap.lfw.file.comp.IFileService");
};

function getParamsMap() {
  return window.$paramsMap;
};

function getParameter(key) {
  var value = window.$paramsMap.get(key);
  return value == null ? null : decodeURIComponent(value);
};

function setParameter(key, value) {
  var param = null;
  if (typeof key === 'string') window.$paramsMap.put(key, value);
  else if (typeof key === 'object') {
    param = key;
    window.$paramsMap.put(param.key, param.value);
  }
};

function getSessionAttributeMap() {
  if (typeof $cs_clientSession != "undefined") return $cs_clientSession.map;
};

function setSessionAttribute(key, value) {
  $cs_clientSession.map[key] = value;
};

function getSessionAttribute(key) {
  if (typeof $cs_clientSession != "undefined") return $cs_clientSession.map[key];
};

function getStickString() {
  return window.$cs_clientStickKeys;
};

function getStorageData() {
  if (window.localStorage == null || window.usercode == null) return null;
  if (window.$sd_storageData != null) return window.$sd_storageData;
  else {
    if (window.localStorage.getItem(window.usercode) == null) {
      try {
        window.localStorage.setItem(window.usercode, "{}");
      } catch (e) {
        return null;
      }
    }
    var storageDataStr = window.localStorage.getItem(window.usercode);
    if (typeof(JSON) == "undefined") window.$sd_storageData = eval("(" + storageDataStr + ")");
    else window.$sd_storageData = JSON.parse(storageDataStr);
    return window.$sd_storageData;
  }
};

function saveStorageData() {
  if (window.$sd_storageData == null || window.localStorage == null || window.usercode == null) return;
  var storageDataStr = JSON.stringify(window.$sd_storageData);
  try {
    window.localStorage.setItem(window.usercode, storageDataStr);
  } catch (e) {}
};
EventUtil.addEventHandler(window, "unload", winunload);

function winunload() {
  if (window.pageUI == null) return;
  window.pageUI.$onClosed();
  if (typeof $.scrollBarDestroy == 'function') $.scrollBarDestroy();
  removeAllComponent();
};

function getMasker(type) {
  if (type != null) type = type.toUpperCase();
  if (typeof window.$maskerMeta != "undefined" && ((typeof IntegerTextComp != "undefined" && type == IntegerTextComp.prototype.componentType) || (typeof FloatTextComp != "undefined" && (type == FloatTextComp.prototype.componentType || EditorType.DECIMALTEXT.toUpperCase() == type)) || (typeof MoneyTextComp != "undefined" && type == MoneyTextComp.prototype.componentType))) {
    return new NumberMasker(window.$maskerMeta.NumberFormatMeta);
  }
  if (typeof window.$maskerMeta != "undefined" && typeof DateTextComp != "undefined" && type == DateTextComp.prototype.componentType) {
    return new DateMasker(window.$maskerMeta.DateFormatMeta);
  }
  if (typeof window.$maskerMeta != "undefined" && type == "DATETIMETEXT") {
    return new DateTimeMasker(window.$maskerMeta.DateTimeFormatMeta);
  }
  if (typeof PrecentTextComp != "undefined" && type == PrecentTextComp.prototype.componentType) {
    return new PrecentMasker();
  }
  return null;
}

function getPageId() {
  return getSessionAttribute("pageId");
};

function getPageUniqueId() {
  return getSessionAttribute("pageUniqueId");
};

function getAppUniqueId() {
  return getSessionAttribute("appUniqueId");
};

function getRootPath() {
  return window.globalPath;
};

function getCorePath() {
  return window.corePath;
};

function getNodePath() {
  return window.globalPath + "/html/nodes/" + window.$pageId;
};
if (!IS_IE) {
  Element.prototype.selectNodes = function(xPath) {
    var evaluator = new XPathEvaluator();
    var nodeList = evaluator.evaluate(xPath, this, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var nodes = new Array();
    if (nodeList != null) {
      var node = nodeList.iterateNext();
      while (node) {
        nodes.push(node);
        node = nodeList.iterateNext();
      }
    }
    return nodes;
  };
  Element.prototype.selectSingleNode = function(xPath) {
    var evaluator = new XPathEvaluator();
    var oResult = evaluator.evaluate(xPath, this, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    if (oResult != null) {
      var node = oResult.iterateNext();
      return node;
    } else {
      return null;
    }
  };
};

function createXmlDom(strXML) {
  if (window.ActiveXObject) {
    var sigArr = ["MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument", "Microsoft.XmlDom"];
    for (var i = 0; i < sigArr.length; i++) {
      try {
        var xmlDom = new ActiveXObject(sigArr[i]);
        xmlDom.async = false;
        xmlDom.loadXML(strXML);
        return xmlDom;
      } catch (error) {}
    }
  } else if (document.implementation && document.implementation.createDocument) {
    return new DOMParser().parseFromString(strXML, "text/xml");
  } else {
    throw new Error("Your browser doesn't support an XML DOM object.");
  }
};

function showProgressDialog(message, attachComp) {
  var topWin = getLfwTop();
  if (topWin == null) topWin = getTrueParent();
  topWin.ProgressDialogComp.showDialog(message);
};

function hideProgressDialog() {
  ProgressDialogComp.hideDialog();
};

function showErrorDialog(msg, func, title, okText) {
  var topWin = getLfwTop();
  if (topWin == null) topWin = getTrueParent();
  topWin.require('errordialog', function() {
    var dialog = topWin.ErrorDialogComp.showDialog(msg, title, okText, func);
  });
};

function hideErrorDialog() {
  ErrorDialogComp.hideDialog();
};

function showWarningDialog(msg) {
  var topWin = getLfwTop();
  if (topWin == null) topWin = getTrueParent();
  return topWin.WarningDialogComp.showDialog(msg);
};

function hideWarningDialog() {
  WarningDialogComp.hideDialog();
};

function hideMessageDialog() {
  MessageDialogComp.hideDialog();
};

function openWindowInCenter(url, title, height, width) {
  if (!url) {
    return;
  }
  if (url.indexOf("?") > 0) {
    url = url + "&lrid=" + Math.UUID();
  } else {
    url = url + "?lrid=" + Math.UUID();
  }
  var bodyWidth = window.screen.availWidth;
  var bodyHeight = window.screen.availHeight;
  var left = 0;
  if (typeof(width) == 'number' || width.indexOf("%") == -1) {
    var intWidth = parseInt(width);
    left = bodyWidth > intWidth ? (bodyWidth - intWidth) / 2 : 0;
    width += "px";
  } else if (width.indexOf("%") > -1) {
    var decimal = width.substring(0, width.indexOf("%")) / 100;
    width = parseInt(bodyWidth * decimal) + "px";
  } else {
    width = "800px";
  }
  var top = 0;
  if (typeof(height) == 'number' || height.indexOf("%") == -1) {
    var intHeight = parseInt(height);
    top = bodyHeight > intHeight ? (bodyHeight - intHeight) / 2 : 0;
    height += "px";
  } else {
    height = bodyHeight + "px";
  }
  window.showModalDialog(url, self, "status:no;dialogHeight:" + height + ";dialogWidth:" + width + ";dialogLeft:" + left + "px;dialogTop:" + top + "px");
};

function openNormalWindowInCenter(url, title, height, width, closeParent) {
  if (!url) {
    return;
  }
  if (url.indexOf("?") > 0) {
    url = url + "&lrid=" + Math.UUID();
  } else {
    url = url + "?lrid=" + Math.UUID();
  }
  var bodyWidth = window.screen.availWidth;
  var bodyHeight = window.screen.availHeight;
  if (isPercent(width)) width = bodyWidth * parseFloat(width) / 100;
  if (isPercent(height)) height = bodyHeight * parseFloat(height) / 100;
  var left = bodyWidth > width ? (bodyWidth - width) / 2 : 0;
  var top = bodyHeight > height ? (bodyHeight - height) / 2 : 0;
  var win = window.open(url, "", "modal=yes, height=" + height + ", width=" + width + ", left=" + left + ", top=" + top, true);
  if (closeParent) {
    if (win == window) return;
    closeWinWithNoWarn();
  }
};

function showMaxWin(url, title, closeParent) {
  if (!url) {
    return;
  }
  if (url.indexOf("?") > 0) {
    url = url + "&lrid=" + Math.UUID();
  } else {
    url = url + "?lrid=" + Math.UUID();
  }
  var win = window.open(url, title, 'resizable=no,scrollbars=yes');
  win.moveTo(-4, -4);
  var width = screen.availWidth + 8;
  var height = screen.availHeight + 7;
  win.resizeTo(width, height);
  if (closeParent) {
    if (win == window) return;
    closeWinWithNoWarn();
  }
};

function closeWinWithNoWarn() {
  var browserName = navigator.appName;
  if (IS_IE || IS_WEBKIT) {
    window.opener = null;
    window.open('', '_self');
    window.close();
  } else {
    window.open('', '_parent', '');
    window.close();
  }
};

function sendRedirect(url, funcCode) {
  if (getProxyReturnExecuting() > 0 || getProxyArray().length > 0) {
    if (isNull(funcCode)) setTimeout("sendRedirect(' " + url + "')", 100);
    else setTimeout("sendRedirect(' " + url + "', '" + funcCode + "')", 100);
    return;
  }
  if (isNull(funcCode)) window.location.href = url;
  else {
    try {
      var topWin = getLfwTop();
      if (topWin != null) {
        topWin.MFSendRedirect(url, funcCode);
      } else window.location.href = url;
    } catch (e) {
      window.location.href = url;
    }
  }
};

function showWin(pageUrl, width, height) {
  var pos = pageUrl.indexOf("?");
  var randId = (Math.random() * 10000).toString().substring(0, 4);
  if (pos == -1) pageUrl += "?randid=" + randId;
  else pageUrl += "&randid=" + randId;
  pageUrl = pageUrl + "&lrid=" + Math.UUID();
  if (width == null || width == "") width = parseInt(window.screen.width) - 200;
  if (height == null || height == "") height = parseInt(window.screen.height) - 300;
  window.showModalDialog(pageUrl, self, "dialogHeight:" + height + "px;dialogWidth:" + width + "px;center:yes;resizable:yes;status:no");
};

function showDialog(pageUrl, title, width, height, id, refDiv, attr, twin) {
  if (title) {
    title = title.replaceAll(" ", "&nbsp;");
  }
  if (showDialog.dialogCount == null) showDialog.dialogCount = 0;
  if (showDialog.dialogsTrueParent == null) showDialog.dialogsTrueParent = new Array();
  var dialogName = "$modalDialog" + showDialog.dialogCount;
  if (id == null) id = "";
  var nowWidth = document.body.clientWidth;
  var nowHeight = document.body.clientHeight;
  var topwin = getLfwTop();
  if (topwin != null) {
    var topWidth = getLfwTop().document.body.clientWidth;
    var topHeight = getLfwTop().document.body.clientHeight;
  } else {
    var topWidth = nowWidth;
    var topHeight = nowHeight;
  }
  if (width == null) width = 400;
  if (height == null) height = 300;
  var oriWidth = width;
  var oriHeight = height;
  if (!isPercent(width) && width < 0) width = nowWidth + width;
  if (!isPercent(width) && width > topWidth) width = topWidth;
  if (!isPercent(height) && height < 0) height = nowHeight + height;
  if (!isPercent(height) && height > topHeight) height = topHeight;
  if (title == 'null') title = null;
  twin = (twin == null ? window : twin);
  if (showDialog.dialogsTrueParent == null) showDialog.dialogsTrueParent = new Object();
  var topwin = getLfwTop();
  if (topwin != null && topwin != window) {
    return topwin.showDialog(pageUrl, title, width, height, id, null, attr, twin);
  }
  if (((!isPercent(width) && nowWidth < (width - 40)) || (!isPercent(height) && nowHeight < (height - 40))) && (window != top && parent.showDialog != null)) {
    showDialog.showInParent = true;
    if (parent.showDialog.dialogCount == null) parent.showDialog.dialogCount = 0;
    return parent.showDialog(pageUrl, title, width, height, id, null, attr, twin);
  } else {
    if (twin.isPopView && twin.isPopView == true) showDialog.dialogsTrueParent[showDialog.dialogCount] = twin.getTrueParent();
    else showDialog.dialogsTrueParent[showDialog.dialogCount] = twin;
  }
  var isShowLine = true;
  var isConfirmClose = false;
  if (attr) {
    isShowLine = getBoolean(attr.isShowLine, isShowLine);
    isConfirmClose = getBoolean(attr.isConfirmClose, isConfirmClose);
  }
  var topWidth = window.document.body.clientWidth;
  var topHeight = window.document.body.clientHeight;
  if (window[dialogName] == null) {
    window[dialogName] = new ModalDialogComp("g_modalDialog", title, 0, 0, width, height, null, {
      "isShowLine": isShowLine
    });
  } else {
    window[dialogName].setSize(width, height);
    window[dialogName].setTitle(title);
    window[dialogName].showLine(isShowLine);
  }
  window[dialogName].oriHeight = oriHeight;
  window[dialogName].oriWidth = oriWidth;
  window[dialogName].onAfterClose = function() {
    destroyDialog(dialogName);
  };
  if (isConfirmClose) {
    var dls = new Listener("beforeClose");
    dls.source_id = dialogName;
    dls.listener_id = 'onBeforeClose_' + dialogName;
    dls.func = function() {
      if (window["$modalDialogFrame" + id] == null || typeof(window["$modalDialogFrame" + id].contentWindow) == "unknown") return;
      if (window["$modalDialogFrame" + id].contentWindow == null) return;
      var pageui = window["$modalDialogFrame" + id].contentWindow.pageUI;
      if (pageui && window[dialogName]) return pageui.showCloseConfirm(window[dialogName]);
    };
    window[dialogName].addListener(dls);
  }
  var iframe = $ce("iframe");
  iframe.name = "in_frame";
  iframe.id = "in_frame";
  iframe.allowTransparency = "true";
  iframe.frameBorder = 0;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  if (!IS_IPAD) {
    iframe.style.position = "absolute";
    iframe.style.left = "0px";
  }
  window["$modalDialogFrame" + id] = iframe;
  window[dialogName].getContentPane().appendChild(iframe);
  window[dialogName].dialogId = id;
  var reload = false;
  if (pageUrl != null && pageUrl != "") iframe.src = pageUrl;
  else {
    if (window.domain_key != null) iframe.src = "/lfw/setdomain.jsp";
  }
  window[dialogName].closeBt.style.visibility = "hidden";
  window[dialogName].show(refDiv);
  showDialogColseIcon(id, dialogName);
  showDialog.dialogCount++;
  document.modalDialog = window[dialogName];
  if (!IS_IE7) document._pt_frame_id = iframe.id;
  return [window[dialogName], iframe];
};

function canDestroyDialog(frame) {
  try {
    if (frame && frame.contentWindow.ServerProxy && (frame.contentWindow.getProxyReturnExecuting() > 0 || frame.contentWindow.getProxyArray().length > 0)) return false;
    if (typeof frame.contentWindow.getTrueParent == 'function') {
      var parent = frame.contentWindow.getTrueParent();
      if (parent != null && parent.ServerProxy && (parent.getProxyReturnExecuting() > 0 || parent.getProxyArray().length > 0)) return false;
    }
    return true;
  } catch (e) {
    return true;
  }
};

function destroyDialog(dialogName) {
  if (dialogName == null) return;
  var dialog = window[dialogName];
  if (dialog == null) return;
  var frame = dialog.getContentPane().firstChild;
  if (frame == null) return;
  var canDestroy = canDestroyDialog(frame);
  if (canDestroy == false) {
    setTimeout("destroyDialog('" + dialogName + "')", 100);
    return;
  }
  var id = dialog.dialogId;
  var dialog = getDialog(id);
  if (dialog) {
    try {
      var frame = dialog.getContentPane().firstChild;
      if (frame.contentWindow.handleClose) {
        frame.contentWindow.handleClose();
      }
      frame.src = "";
      frame.isDestroy = true;
      window["$modalDialogFrame" + id] = null;
      showDialog.dialogsTrueParent[showDialog.dialogCount] = null;
      dialog.getContentPane().removeChild(frame);
    } catch (e) {};
    dialog = null;
  }
};

function lazyRender() {
  var iframe = lazyRender.iframe;
  var templateStr = lazyRender.templateStr;
  try {
    lazyRender.iframe = null;
    lazyRender.templateStr = null;
    iframe.contentWindow.document;
  } catch (error) {
    lazyRender.iframe = iframe;
    lazyRender.templateStr = templateStr;
    setTimeout("lazyRender()", 100);
    return;
  }
  iframe.contentWindow.document.write(templateStr);
}

function showDialogColseIcon(id, dialogName, count) {
  if (count == null) count = 1;
  if (window["$modalDialogFrame" + id] != null) {
    if (count >= 10) {
      window[dialogName].closeBt.style.visibility = "";
      return;
    }
    try {
      window["$modalDialogFrame" + id].contentWindow.renderDone;
    } catch (error) {
      count += 1;
      setTimeout("showDialogColseIcon('" + id + "', '" + dialogName + "'," + count + ")", 100);
      return;
    }
    if (window["$modalDialogFrame" + id].contentWindow.renderDone == true || count >= 10) window[dialogName].closeBt.style.visibility = "";
    else {
      count += 1;
      setTimeout("showDialogColseIcon('" + id + "', '" + dialogName + "'," + count + ")", 100);
    }
  } else {
    count += 1;
    setTimeout("showDialogColseIcon('" + id + "', '" + dialogName + "'," + count + ")", 100);
  }
}

function hideDialog(id, hideImmediate) {
  if ((hideImmediate == null || hideImmediate == false)) {
    if (typeof(id) != 'undefined' && id != null) {
      setTimeout("hideDialog('" + id + "', true)", 100);
    } else {
      setTimeout("hideDialog(null, true)", 100);
    }
    return;
  }
  var dialog = getDialog(id);
  if (dialog) {
    var frame = dialog.getContentPane().firstChild;
    if (frame && frame.contentWindow.ServerProxy && (frame.contentWindow.getProxyReturnExecuting() > 0 || frame.contentWindow.getProxyArray().length > 0)) {
      if (typeof(id) != 'undefined' && id != null) {
        setTimeout("hideDialog('" + id + "')", 100);
      } else {
        setTimeout("hideDialog()", 100);
      }
      return;
    }
    dialog.close();
  }
};

function getDialog(id) {
  for (var i = showDialog.dialogCount - 1; i >= 0; i--) {
    var dialogName = "$modalDialog" + i;
    var dialog = window[dialogName];
    if (dialog == null) continue;
    var frm = null;
    if (dialog.getContentPane) frm = dialog.getContentPane().firstChild;
    if (frm == null || (frm.isDestroy != null && frm.isDestroy == true)) continue;
    if (typeof(id) == 'undefined' || id == null) return dialog;
    if (dialog.dialogId == null) continue;
    if (dialog.dialogId == id) return dialog;
  }
  return null;
};

function closeWindow() {
  if (window.ServerProxy && window.getProxyReturnExecuting() > 0) {
    setTimeout("closeWindow()", 100);
    return;
  }
  try {
    window.close();
  } catch (e) {}
};

function getCurrentDialog(isOpen) {
  var dialogName = null;
  if (isOpen == null || isOpen == false) dialogName = "$modalDialog" + (showDialog.dialogCount);
  else dialogName = "$modalDialog" + (showDialog.dialogCount - 1);
  return window[dialogName];
};

function parentHideDialog(id) {
  if (window.opener && window.opener != window) {
    if (window.ServerProxy && (window.getProxyReturnExecuting() > 0 || window.getProxyArray().length > 0)) {
      setTimeout("parentHideDialog()", 100);
      return;
    }
    window.close();
  } else if (parent.hideDialog) parent.hideDialog(id);
}

function getTrueParent() {
  if (parent == window) {
    if (window.opener && window.opener != window) return window.opener;
    else return window;
  }
  if (parent.showDialog) {
    if (parent.showDialog.dialogsTrueParent == null) return parent;
    else {
      for (var i = parent.showDialog.dialogCount - 1; i >= 0; i--) {
        dialogName = "$modalDialog" + i;
        dialog = parent[dialogName];
        if (dialog == null) continue;
        var frame = parent["$modalDialogFrame" + dialog.dialogId];
        if (frame != null && frame.contentWindow != null && frame.contentWindow == window) {
          return parent.showDialog.dialogsTrueParent[i] != null ? parent.showDialog.dialogsTrueParent[i] : parent;
        }
      }
      return parent;
    }
  } else {
    if (parent.pageUI) return parent;
    else return window;
  }
};

function getLfwTop() {
  if (window.lfwtop) {
    window.lfwtopwin = window;
    return window.lfwtopwin;
  }
  var parentWin = window;
  window.hasShowDialogWin = window;
  try {
    parentWin.parent.document;
    parentWin = parentWin.parent;
    while (parentWin != null && parentWin != window) {
      if (parentWin.showDialog) window.hasShowDialogWin = parentWin;
      if (parentWin.lfwtop) {
        window.lfwtopwin = parentWin;
        break;
      }
      if (parentWin == parentWin.parent) break;
      parentWin.parent.document;
      parentWin = parentWin.parent;
    }
  } catch (error) {}
  if (window.lfwtopwin) return window.lfwtopwin;
  return window.hasShowDialogWin;
};

function getPopParent() {
  if (window.parentWindow != null) return window.parentWindow;
  try {
    if (window.parent != window) return getTrueParent();
    if (window.dialogArguments != null && window.parent.dialogArguments == window.dialogArguments) return window.dialogArguments;
    if (window.opener) return window.opener;
  } catch (error) {
    return null;
  }
};
window.parentWindow = getPopParent();

function compress(content) {
  if (window.debugMode == true) {
    return null;
  }
  var top = getLfwTop();
  if (top == null) return null;
  if (top.compressContent) {
    var result = top.compressContent(content);
    return result;
  }
  return null;
}

function getAppTopWindow() {
  var wid = getPopParent();
  var appTopWid = wid.parent;
  return appTopWid;
}

function showCommonDialog(pageUrl, title, width, height, id) {
  if (id == null) id = "";
  if (!pageUrl) {
    return;
  }
  if (pageUrl.indexOf("?") > 0) {
    pageUrl = pageUrl + "&lrid=" + Math.UUID();
  } else {
    pageUrl = pageUrl + "?lrid=" + Math.UUID();
  }
  var returnValue = showModalDialog(pageUrl, window, "dialogWidth:" + width + ";dialogHeight:" + height + ";status:0;help:0;");
  return returnValue;
};

function handleException(xmlHttpReq, exception, ajaxArgs, ajaxObj) {
  var doc = xmlHttpReq.responseXML;
  return handleExceptionByDoc(doc, exception, ajaxArgs, ajaxObj, xmlHttpReq);
};

function openLoginPage() {
  var url = window.globalPath + "/app/mockapp/login.jsp&randid=" + (new Date()).getTime();
  if (window.top != window) {
    var parentPage = parent;
    while (parentPage) {
      if (parentPage == parentPage.parent) break;
      parentPage = parentPage.parent;
    }
    if (parentPage) parentPage.location.href = url;
  } else {
    window.location.href = url;
  }
};

function handleExceptionByDoc(doc, exception, ajaxArgs, ajaxObj, xmlHttpReq) {
  if (exception) {
    if (xmlHttpReq != null && xmlHttpReq.status == 306) {
      openLoginPage();
    } else {
      showErrorDialog(exception);
    }
    return false;
  }
  if (doc == null) return;
  var rootNode = doc.documentElement;
  if (rootNode == null) return;
  var successNode = rootNode.selectSingleNode("success");
  if (successNode == null) return;
  var success = successNode.firstChild.nodeValue;
  if (success == "false") {
    var expTextNode = rootNode.selectSingleNode("exp-text");
    var expStackNode = rootNode.selectSingleNode("exp-stack");
    var showMessageNode = rootNode.selectSingleNode("show-message");
    var showTitleNode = rootNode.selectSingleNode("show-title");
    var expText = expTextNode.firstChild == null ? "" : expTextNode.firstChild.nodeValue;
    if (IS_IE) expStack = expStackNode.firstChild.nodeValue;
    else expStack = expStackNode.firstChild.nextSibling.data;
    var showMessage = showMessageNode.firstChild == null ? "error occurred" : showMessageNode.firstChild.nodeValue;
    var showTitle = null;
    if (showTitleNode) showTitle = showTitleNode.firstChild == null ? null : showTitleNode.firstChild.nodeValue;
    showErrorDialog(showMessage, null, showTitle, null);
    return false;
  } else if (success == "validator") {
    var expNode = rootNode.selectSingleNode("exp-text");
    var expText = null;
    if (expNode) {
      expText = expNode.firstChild.nodeValue;
    }
    var expView = changeNodeToObject(rootNode.selectSingleNode("exp-view"));
    expNode = rootNode.selectSingleNode("exp-components");
    if (expNode) {
      var exceptionMsg = null;
      var exp_children = expNode.childNodes;
      if (exp_children && exp_children.length > 0) {
        for (var k = 0; k < exp_children.length; k++) {
          var expComponent = changeNodeToObject(exp_children[k]);
          if (exp_children[k]) {
            expComponent.elements = new Array();
            var children = exp_children[k].childNodes;
            if (children && children.length > 0) {
              for (var i = 0; i < children.length; i++) {
                var element = changeNodeToObject(children[i]);
                if (typeof(element.id) != 'undefined') {
                  expComponent.elements.push(element);
                }
              }
            }
          }
          if (typeof(expView.id) == "string" && typeof(expComponent.id) == "string") {
            var widget = pageUI.getWidget(expView.id);
            if (widget) {
              var component = widget.getComponent(expComponent.id);
              if (component) {
                if (component.componentType == "AUTOFORM") {
                  if (component.errorMsg && expComponent.errorMsg) {
                    component.errorMsg.innerHTML = expComponent.errorMsg;
                    component.setWholeErrorPosition();
                    component.errorMsgDiv.style.display = "block";
                  }
                  var index = "";
                  if (component.dataset) {
                    if (component.dataset.focusRowIndex) index = "_" + component.dataset.focusRowIndex;
                  }
                  var eleArr = component.eleArr;
                  if (eleArr && eleArr.length > 0) {
                    var element;
                    for (var i = 0; i < eleArr.length; i++) {
                      element = eleArr[i];
                      if (typeof(element) == "object") {
                        for (var j = 0; j < expComponent.elements.length; j++) {
                          if (expComponent.elements[j].id == (element.id + index)) {
                            if (typeof(element.setError) == 'function') {
                              element.setError(true);
                            }
                            if (typeof(element.setErrorMessage) == 'function') {
                              element.setErrorMessage(expComponent.elements[j].errorMsg);
                            }
                            if (typeof(element.setErrorStyle) == 'function') {
                              element.setErrorStyle();
                            }
                            if (typeof(element.setErrorPosition) == 'function') {
                              element.setErrorPosition();
                            }
                            break;
                          }
                        }
                      }
                    }
                  }
                } else if (component.componentType == "GRIDCOMP") {
                  if (component.errorMsg && expComponent.errorMsg) {
                    component.errorMsg.innerHTML = expComponent.errorMsg;
                    component.setWholeErrorPosition();
                    component.errorMsgDiv.style.display = "block";
                  }
                  var eleArr = component.basicHeaders;
                  if (eleArr && eleArr.length > 0) {
                    var cell = null;
                    for (var i = 0; i < eleArr.length; i++) {
                      for (var j = 0; j < expComponent.elements.length; j++) {
                        if (eleArr[i].isHidden == false && expComponent.elements[j].id.split("_")[0] == eleArr[i].keyName) {
                          if (eleArr[i].dataDiv.cells.length == 1) {
                            cell = eleArr[i].dataDiv.cells[0];
                          } else {
                            if (expComponent.elements[j].id.split("_").length > 1) {
                              cell = eleArr[i].dataDiv.cells[expComponent.elements[j].id.split("_")[1]];
                            } else {
                              cell = eleArr[i].dataDiv.cells[0];
                            }
                          }
                          var warningIcon = cell.warningIcon;
                          if (typeof(warningIcon) == 'undefined') {
                            warningIcon = $ce("DIV");
                            warningIcon.className = "cellwarning";
                            cell.warningIcon = warningIcon;
                            cell.style.position = "relative";
                          }
                          cell.appendChild(warningIcon);
                          if (typeof(cell.errorMsg) == "string" && cell.errorMsg != "") {
                            warningIcon.style.display = "block";
                          } else {
                            warningIcon.style.display = "none";
                          }
                        }
                      }
                    }
                  }
                } else {
                  var element = component;
                  if (typeof(element.setError) == 'function') {
                    element.setError(true);
                  }
                  if (typeof(element.setErrorMessage) == 'function') {
                    element.setErrorMessage(trans("ml_thisfieldcannotnull"));
                  }
                  if (typeof(element.setErrorStyle) == 'function') {
                    element.setErrorStyle();
                  }
                  if (typeof(element.setErrorPosition) == 'function') {
                    element.setErrorPosition();
                    element.noShowErrorMsgDiv = true;
                  }
                  if (expComponent.errorMsg) {
                    exceptionMsg = expComponent.errorMsg;
                  }
                }
              } else {}
            } else {}
          }
        }
      }
      if (typeof(exceptionMsg) == "string") {
        showErrorDialog(exceptionMsg);
      }
    }
    return false;
  } else if (success == "interaction") {
    proxyReturnExecutingAdd();
    var rootNode = doc.documentElement;
    var contentsNode = rootNode.selectSingleNode("contents");
    var contentNodes = contentsNode.selectNodes("content");
    var content = getNodeValue(contentNodes[0]);
    eval("var interationInfo = " + content);
    rePostReq.dialogId = interationInfo.id;
    if (interationInfo.type == "OKCANCEL_DIALOG") {
      var msg = interationInfo.msg;
      var title = interationInfo.title;
      var okText = interationInfo.okText;
      var cancelText = interationInfo.cancelText;
      rePostReq.ajaxObj = ajaxObj.clone();
      showConfirmDialog(msg, rePostOk, rePostCancel, null, null, null, okText, cancelText, title);
    } else if (interationInfo.type == "THREE_BUTTONS_DIALOG") {
      var msg = interationInfo.msg;
      var title = interationInfo.title;
      rePostReq.ajaxObj = ajaxObj.clone();
      var topWin = getLfwTop();
      if (topWin == null) topWin = getTrueParent();
      topWin.require("threebuttondialog", function() {
        topWin.ThreeButtonsDialog.showDialog(msg, rePostOk, rePostCancel, rePostMiddle, interationInfo.btnTexts, null, null, null, null, null, title)
      });
    } else if (interationInfo.type == "MESSAGE_DIALOG") {
      var msg = interationInfo.msg;
      var title = interationInfo.title;
      var btnText = interationInfo.btnText;
      rePostReq.ajaxObj = ajaxObj.clone();
      rePostReq.okReturn = interationInfo.okReturn;
      showMessageDialog(msg, rePostOk, title, btnText, false);
    } else if (interationInfo.type == "ERROR_MESSAGE_DIALOG") {
      var msg = interationInfo.msg;
      var title = interationInfo.title;
      var btnText = interationInfo.btnText;
      rePostReq.ajaxObj = ajaxObj.clone();
      rePostReq.okReturn = interationInfo.okReturn;
      showErrorDialog(msg, rePostOk, title, btnText);
    } else if (interationInfo.type == "INPUT_DIALOG") {
      var items = interationInfo.items;
      if (items != null) {
        var title = interationInfo.title;
        var id = rePostReq.dialogId;
        ajaxObj = ajaxObj.clone();
        ajaxObj.addParam(id + "interactflag", "true");
        rePostReq.ajaxObj = ajaxObj;
        noPostCancel.ajaxObj = ajaxObj;
        var topWin = getLfwTop();
        if (topWin == null) topWin = getTrueParent();
        topWin.require("inputdialog", function() {
          var inputDlg = new topWin.InputDialogComp("input_dialog", title, 0, 0, null, null, null, rePostReq, noPostCancel);
          rePostReq.inputDlg = inputDlg;
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var inputId = item.inputId;
            var labelText = item.labelText;
            var inputType = item.inputType;
            var required = item.required;
            var value = item.value;
            if (inputType == "string" || inputType == "pswtext") {
              inputDlg.addItem(labelText, inputId, inputType, required, null, value);
            } else if (inputType == "int") {
              var attr = new Object;
              attr.minValue = item.minValue;
              attr.maxValue = item.maxValue;
              inputDlg.addItem(labelText, inputId, inputType, required, attr, value);
            } else if (inputType == "combo") {
              if (item.comboData) {
                var datas = item.comboData.allCombItems;
                var comboData = new topWin.ComboData();
                var attr = new Object;
                attr.selectOnly = item.selectOnly;
                var combData = new topWin.ComboData();
                for (var j = 0; j < datas.length; j++) {
                  var text = datas[j].text;
                  if (text == null) text = datas[j].i18nName;
                  combData.addItem(new topWin.ComboItem(text, datas[j].value));
                }
                attr.comboData = combData;
                inputDlg.addItem(labelText, inputId, inputType, required, attr, value);
              }
            } else if (inputType == "radio") {
              var datas = item.comboData.allCombItems;
              var comboData = new topWin.ComboData();
              var attr = new Object;
              attr.selectOnly = item.selectOnly;
              var combData = new topWin.ComboData();
              for (var j = 0; j < datas.length; j++) {
                var text = datas[j].text;
                if (text == null) text = datas[j].i18nName;
                combData.addItem(new topWin.ComboItem(text, datas[j].value));
              }
              attr.comboData = combData;
              inputDlg.addItem(labelText, inputId, inputType, required, attr, value);
            } else if (inputType == "languagecombotext") {
              var datas = item.comboData.allCombItems;
              var attr = new Object;
              attr.comboData = datas;
              attr.currentLangCode = item.currentLangIndex;
              attr.defaultLangCode = item.defaultLangIndex;
              inputDlg.addItem(labelText, inputId, inputType, required, attr, value);
            }
          }
          inputDlg.show();
        });
      }
    }
    return false;
  }
  return true;
};

function changeNodeToObject(expNode) {
  var expObj = new Object();
  if (expNode) {
    if (expNode.attributes && expNode.attributes.length) {
      for (var i = 0; i < expNode.attributes.length; i++) {
        if ('nodeId' == expNode.attributes[i].nodeName) {
          expObj.id = expNode.attributes[i].nodeValue;
        } else if ('errorMsg' == expNode.attributes[i].nodeName) {
          expObj.errorMsg = expNode.attributes[i].nodeValue;
        }
      }
    }
  }
  return expObj;
}

function rePostOk() {
  if (rePostReq.okReturn == null || rePostReq.okReturn == true) {
    var ajaxObj = rePostReq.ajaxObj;
    var id = rePostReq.dialogId;
    ajaxObj.addParam(id + "interactflag", "true");
    showDefaultLoadingBar();
    ajaxObj.post();
  } else {
    proxyReturnExecutingSub();
  }
  rePostReq.okReturn = null;
};

function rePostMiddle() {
  if (rePostReq.okReturn == null || rePostReq.okReturn == true) {
    var ajaxObj = rePostReq.ajaxObj;
    var id = rePostReq.dialogId;
    ajaxObj.addParam(id + "interactflag", "middle");
    showDefaultLoadingBar();
    ajaxObj.post();
  } else {
    proxyReturnExecutingSub();
  }
  rePostReq.okReturn = null;
};

function rePostCancel() {
  var ajaxObj = rePostReq.ajaxObj;
  var id = rePostReq.dialogId;
  ajaxObj.addParam(id + "interactflag", "false");
  showDefaultLoadingBar();
  ajaxObj.post();
};

function noPostCancel() {
  var ajaxObj = noPostCancel.ajaxObj;
  if (ajaxObj != null && ajaxObj.req_id != null) {
    for (i = 0; i < Ajax.REQ_ARRAY.length; i++) {
      if (Ajax.REQ_ARRAY[i] == ajaxObj.req_id) {
        Ajax.REQ_ARRAY.splice(i, 1);
        break;
      }
    }
    ajaxObj.destroySelf();
  }
  proxyReturnExecutingSub();
}

function rePostReq() {
  var ajaxObj = rePostReq.ajaxObj;
  if (rePostReq.inputDlg) {
    var dlg = rePostReq.inputDlg;
    var itemsMap = dlg.getItems();
    var resultStr = "";
    var keySet = itemsMap.keySet();
    for (var i = 0, count = keySet.length; i < count; i++) {
      var inputId = keySet[i];
      var inputComp = itemsMap.get(inputId);
      if (inputComp.componentType == "LANGUAGECOMBOBOX") {
        var options = inputComp.getOptions();
        var optionsLength = options.length;
        var inputCompValue = '';
        for (var j = 0; j < optionsLength; j++) {
          inputCompValue += options[j].langTip + ":" + options[j].value + ";";
        }
        resultStr += inputId + "=" + inputCompValue;
      } else {
        resultStr += inputId + "=" + inputComp.getValue();
      }
      if (i != count - 1) resultStr += ",";
    }
    ajaxObj.addParam("interactresult", resultStr);
    var key = rePostReq.dialogId + "interactresult";
    ajaxObj.addParam(key, resultStr);
    rePostReq.inputDlg = null;
  }
  showDefaultLoadingBar();
  ajaxObj.post();
};

function showExceptionDialog(friendMsg, errorMsg, stackMsg) {
  return showErrorDialog(friendMsg);
};

function hideExceptionDialog() {
  ExceptionDialog.hideDialog();
};

function showMessageDialog(msg, func, title, okBtnText, isShowSec) {
  var topWin = getLfwTop();
  if (topWin == null) topWin = getTrueParent();
  topWin.require("messagedialog", function() {
    var dialog = topWin.MessageDialogComp.showDialog(msg, title, okBtnText, func, isShowSec);
  });
};

function showMessage(title, attr) {
  var topWin = getLfwTop();
  if (topWin == null) topWin = getTrueParent();
  topWin.require("messagecomp", function() {
    topWin.MessageComp.showMessage(title, attr)
  })
};

function hideMessageDialog() {
  MessageDialogComp.hideDialog();
};

function showWarningDialog(msg, func) {
  var topWin = getLfwTop();
  if (topWin == null) topWin = getTrueParent();
  var dialog = topWin.WarningDialogComp.showDialog(msg);
  if (func != null) dialog.onclick = func;
  return dialog;
};

function hideWarningDialog() {
  WarningDialogComp.hideDialog();
};

function showConfirmDialog(msg, okFunc, cancelFunc, obj1, obj2, zIndex, okText, cancelText, title) {
  var topWin = getLfwTop();
  if (topWin == null) topWin = getTrueParent();
  topWin.require("confirmdialog", function() {
    topWin.ConfirmDialogComp.showDialog(msg, okFunc, cancelFunc, obj1, obj2, null, null, okText, cancelText, title)
  });
};

function showThreeButtonConfirmDialog(msg, rePostOk, rePostCancel, rePostMiddle, btnTexts, obj1, obj2, obj3, zIndex, another, title) {
  var topWin = getLfwTop();
  if (topWin == null) topWin = getTrueParent();
  topWin.require("threebuttondialog", function() {
    topWin.ThreeButtonsDialog.showDialog(msg, rePostOk, rePostCancel, rePostMiddle, btnTexts, obj1, obj2, obj3, zIndex, another, title)
  });
};

function hideConfirmDialog() {
  ConfirmDialogComp.hideDialog();
};

function getNodeValue(node) {
  if (IS_IE) return node.text;
  var firstNode = node.firstChild;
  if (firstNode == null) return null;
  var nextSibling = firstNode.nextSibling;
  if (nextSibling == null) return firstNode.data;
  return nextSibling.data;
};

function getNodeAttribute(node, attrName) {
  if (IS_IE) return node.getAttribute(attrName);
  var attrs = node.attributes;
  if (attrs == null) return null;
  for (var i = 0; i < attrs.length; i++) {
    if (attrs[i].nodeName == attrName) return attrs[i].nodeValue;
  }
  return null;
};

function getChildForType(node, type, index) {
  var nodes = node.childNodes;
  if (nodes == null) return null;
  var count = -1;
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].nodeName != null && nodes[i].nodeName.toLowerCase() == type) {
      count++;
      if (count == index) return nodes[i];
    }
  }
  return null;
};

function removeFromArray(arr, ele) {
  if (!arr) return false;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == ele) {
      arr.splice(i, 1);
      return true;
    }
  }
  return false;
};

function showStatusMsg(msg) {
  window.status = msg;
};

function getConfigAttribute(key) {
  var value = getConfigFromCookieById(key);
  if (value != null) return value;
  else return getSessionAttribute(key);
};

function getConfigFromCookieById(key) {
  var allCookie = document.cookie;
  var pos = allCookie.indexOf("LFW_CONFIG_KEY=");
  if (pos != -1) {
    var start = pos + 15;
    var end = allCookie.indexOf(";", start);
    if (end == -1) end = allCookie.length;
    var value = allCookie.substring(start, end);
    var v = value.split("$");
    if (key == "connectServerCycle") return v[0];
    else if (key == "theme") return v[1];
    else if (key == "openNodeMode") return v[2];
    else if (key == "noticeRefreshCycle") return v[3];
    else if (key == "jobRefreshCycle") return v[4];
  } else return null;
};

function setCookie(sName, sValue, oExpires, sPath, sDomain, bSecure) {
  var sCookie = sName + "=" + encodeURIComponent(sValue);
  if (oExpires) sCookie += "; expires=" + oExpires.toGMTString();
  if (sPath) sCookie += "; path=" + sPath;
  if (sDomain) sCookie += "; domain=" + sDomain;
  if (bSecure) sCookie += "; secure=" + bSecure;
  document.cookie = sCookie;
};

function getCookie(sName) {
  var sRE = "(?:; )?" + sName + "=([^;]*);?";
  var oRE = new RegExp(sRE);
  if (oRE.test(document.cookie)) {
    return decodeURIComponent(RegExp["$1"]);
  } else return null;
};

function deleteCookie(sName, sPath, sDomain) {
  setCookie(sName, "", new Date(0), sPath, sDomain);
}

function uploadSuccess(data, targetComp) {
  var comp = getComponent(targetComp);
  comp.onUploaded(data);
};

function getFromCache(key) {
  return window.globalObject[key];
};

function putToCache(key, value) {
  window.globalObject[key] = value;
};

function removeComponent(compId) {
  var comp = window["$c_" + compId];
  if (comp) {
    comp.destroySelf();
    window["$c_" + compId] = null;
  }
};

function removeAllComponent() {
  for (var i = 0; i < window.clickHolders.length; i++) {
    window.clickHolders[i] = null;
  }
  if (window.pageUI) {
    pageUI.destroySelf();
  }
  for (var i in window.objects) {
    var comp = window.objects[i];
    if (comp && comp.destroySelf) {
      comp.destroySelf();
    }
    comp = null;
  }
  window.objects = null;
};

function clearNodeProperties(node) {
  for (var i in node) {
    try {
      node[i] = null;
    } catch (error) {}
  }
}

function clearHtmlNodeProperties(node) {
  if (node != null) {
    var nodeName = node.nodeName;
    if (nodeName == "IMG" || nodeName == "img") {
      return;
    }
    try {
      node.onclick = null;
      node.onmouseover = null;
      node.keypress = null;
      node.onfocus = null;
      node.onblur = null;
      node.owner = null;
    } catch (error) {}
  }
}

function clearEvent(event) {
  try {
    for (var i in event) {
      if (i == "type" || i == "eventPhase" || i == "bubbles" || i == "cancelable" || i == "timeStamp" || i == "which" || i == "rangeParent" || i == "rangeOffset" || i == "pageX" || i == "pageY" || i == "isChar" || i == "getPreventDefault" || i == "screenX" || i == "screenY" || i == "clientX" || i == "clientY" || i == "ctrlKey" || i == "shiftKey" || i == "altKey" || i == "metaKey" || i == "button" || i == "initMouseEvent" || i == "stopPropagation" || i == "preventDefault" || i == "initEvent" || i == "view" || i == "detail" || i == "initUIEvent" || i == "CAPTURING_PHASE" || i == "AT_TARGET" || i == "BUBBLING_PHASE" || i == "mozPressure" || i == "initNSMouseEvent" || i == "explicitOriginalTarget" || i == "preventBubble" || i == "preventCapture" || i == "isTrusted" || i == "layerX" || i == "layerY" || i == "cancelBubble" || i == "MOUSEDOWN" || i == "MOUSEUP" || i == "MOUSEOVER" || i == "MOUSEOUT" || i == "MOUSEMOVE" || i == "MOUSEDRAG" || i == "CLICK" || i == "DBLCLICK" || i == "KEYDOWN" || i == "KEYUP" || i == "KEYPRESS" || i == "DRAGDROP" || i == "FOCUS" || i == "BLUR" || i == "SELECT" || i == "CHANGE" || i == "RESET" || i == "SUBMIT" || i == "SCROLL" || i == "LOAD" || i == "UNLOAD" || i == "XFER_DONE" || i == "ABORT" || i == "ERROR" || i == "LOCATE" || i == "MOVE" || i == "RESIZE" || i == "FORWARD" || i == "HELP" || i == "BACK" || i == "TEXT" || i == "ALT_MASK" || i == "CONTROL_MASK" || i == "SHIFT_MASK" || i == "META_MASK" || i == "SCROLL_PAGE_UP" || i == "SCROLL_PAGE_DOWN") {
        continue;
      }
      try {
        event[i] = null;
      } catch (error) {}
    }
  } catch (error) {}
  event = null;
};

function clearEventSimply(event) {
  if (event) {
    if (IS_IE) {
      if (event.originalTarget) event.originalTarget = null;
      if (event.target) event.target = null;
      if (event.currentTarget) event.currentTarget = null;
      if (event.relatedTarget) event.relatedTarget = null;
      try {
        event.fromElement = null;
      } catch (error) {}
      try {
        event.toElement = null;
      } catch (error) {}
      try {
        event.srcElement = null;
      } catch (error) {}
    }
    event = null;
  }
};

function addCssByStyle(cssString) {
  var doc = document;
  var style = doc.createElement("style");
  style.setAttribute("type", "text/css");
  if (style.styleSheet) {
    style.styleSheet.cssText = cssString;
  } else {
    var cssText = doc.createTextNode(cssString);
    style.appendChild(cssText);
  }
  var heads = doc.getElementsByTagName("head");
  if (heads.length) heads[0].appendChild(style);
  else doc.documentElement.appendChild(style);
}

function adjustContainerFramesHeight(syncFlag) {
  if (!IS_IE7 && !IS_IE8) syncFlag = true;
  try {
    if (!document._pt_frame_id) {
      document._pt_frame_id = getRequest()["$portletWind"] + "_iframe";
    }
    if (document._pt_frame_id) {
      var frame = parent.getParentsContainer(document._pt_frame_id);
      parent.adjustIFramesHeightOnLoad(frame, syncFlag);
    } else if (parent.document._pt_frame_id) {
      var frame = parent.parent.getParentsContainer(parent.document._pt_frame_id);
      parent.parent.adjustIFramesHeightOnLoad(frame, syncFlag);
    } else if (window.opener) {
      if (window.opener.document._pt_frame_id) {
        var frame = window.opener.parent.getParentsContainer(window.opener.document._pt_frame_id);
        window.opener.parent.adjustIFramesHeightOnLoad(frame, syncFlag);
      }
    }
  } catch (e) {}
}

function restoreContainerFramesHeight() {
  try {
    if (document._pt_frame_id) {
      parent.initFrameMiniHeight(document._pt_frame_id);
    } else if (parent.document._pt_frame_id) {
      parent.parent.initFrameMiniHeight(parent.document._pt_frame_id);
    } else if (window.opener) {
      if (window.opener.document._pt_frame_id) {
        window.opener.parent.initFrameMiniHeight(window.opener.document._pt_frame_id);
      }
    }
  } catch (e) {}
}

function uploadedExcelFile(result) {
  var proxy = new ServerProxy(null, null, false);
  var results = result.split(",");
  proxy.addParam('clc', results[0]);
  var method = results[3];
  if (method == null || method == "") method = 'onUploadedExcelFile';
  proxy.addParam('m_n', method);
  proxy.addParam('widget_id', results[2]);
  proxy.addParam('el', '2');
  proxy.addParam("excel_imp_path", results[1]);
  proxy.execute();
}

function sysDownloadFile(url) {
  if (window.sys_DownFileFrame == null) {
    var frm = $ce('iframe');
    frm.frameborder = 0;
    frm.vspace = 0;
    frm.hspace = 0;
    frm.style.width = '1px';
    frm.style.heigh = '0px';
    frm.style.display = 'none';
    window.sys_DownFileFrame = frm;
    document.body.appendChild(window.sys_DownFileFrame);
  }
  window.sys_DownFileFrame.src = url;
}

function _setOpacity(obj, value) {
  if (document.all) {
    if (value == 100) {
      obj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + value + ")";
    } else {
      obj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + value + ")";
    }
  } else {
    obj.style.opacity = value / 100;
  }
  obj.style.opacity = value / 100;
};
var ftTimeOutFunc;

function _changeOpacity(startValue, endValue, step, speed, divObj, type) {
  if (divObj.ftTimeOutFunc) {
    clearTimeout(divObj.ftTimeOutFunc);
  }
  if (step > 0) {
    if (startValue > endValue) {
      return;
    }
  } else if (step < 0) {
    if (startValue < endValue) {
      if (typeof(type) == 'string') {
        if (type == 'display') {
          divObj.style.display = "none";
        } else if (type == 'visibility') {
          divObj.style.visibility = "hidden";
        }
      }
      return;
    }
  } else if (step == 0) {
    if (startValue >= endValue) {
      if (typeof(type) == 'string') {
        if (type == 'display') {
          divObj.style.display = "block";
        } else if (type == 'visibility') {
          divObj.style.visibility = "visible";
        }
      }
    } else {
      if (typeof(type) == 'string') {
        if (type == 'display') {
          divObj.style.display = "none";
        } else if (type == 'visibility') {
          divObj.style.visibility = "hidden";
        }
      }
    }
    return;
  }
  _setOpacity(divObj, startValue);
  divObj.ftTimeOutFunc = setTimeout(function() {
    _changeOpacity(startValue + step, endValue, step, speed, divObj, type);
  }, speed);
};

function fadeInDiv(divObj, step, speed, type) {
  if (typeof(divObj) == "object") {
    if (typeof(type) == 'string') {
      if (type == 'display') {
        divObj.style.display = "block";
      } else if (type == 'visibility') {
        divObj.style.visibility = "visible";
      }
    }
    if (IS_IE && !IS_STANDARD) {
      return;
    }
    if (document.all) {
      divObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=0)";
    } else {
      divObj.style.opacity = 0;
    }
    if (typeof(step) != "number") {
      step = 20;
    }
    if (typeof(speed) != "number") {
      speed = 100;
    }
    _changeOpacity(0, 100, step, speed, divObj, type);
  }
};

function fadeOutDiv(divObj, step, speed, type) {
  if (typeof(divObj) == "object") {
    if (IS_IE && !IS_STANDARD) {
      if (typeof(type) == 'string') {
        if (type == 'display') {
          divObj.style.display = "none";
        } else if (type == 'visibility') {
          divObj.style.visibility = "hidden";
        }
      }
      return;
    }
    if (document.all) {
      divObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=100)";
    } else {
      divObj.style.opacity = 1;
    }
    if (typeof(step) != "number") {
      step = -20;
    }
    if (typeof(speed) != "number") {
      speed = 100;
    }
    _changeOpacity(100, 0, step, speed, divObj, type);
  }
};
window.__flash__removeCallback = function(e, f) {
  try {
    if (e) {
      e[f] = null
    }
  } catch (g) {}
};
window.execDynamicScript2RemoveLayout = function(id, type, params) {
  if (!id) return false;
  var obj = ("string" == typeof id) ? $ge(id) : id;
  if (!obj) return false;
  var parent;
  if (obj.objType) {
    parent = $ge(obj.id + "_raw");
    if (parent) {
      obj = parent;
      parent = obj.parentNode;
    }
  }
  if (!parent) {
    parent = obj.parentNode;
  }
  if (parent) {
    parent.removeChild(obj);
    return true
  }
  return false;
};
window.execDynamicScript2RemovePanel = function(id, type, params) {
  if (!id) return false;
  var obj = ("string" == typeof id) ? $ge(id) : id;
  if (!obj) return false;
  var parent;
  if (obj.objType) {
    parent = $ge(obj.id + "_raw");
    if (parent) {
      obj = parent;
      parent = obj.parentNode;
    }
  } else {
    parent = obj.parentNode;
  }
  if (parent) {
    parent.removeChild(obj);
    window.layoutInitFunc();
    return true
  }
  return false;
};
window.execDynamicScript2RemoveComponent = function(id, widgetId, compId, params) {
  if (!id || !widgetId || !compId) return false;
  var obj = ("string" == typeof id) ? $ge(id) : id;
  if (!obj) return false;
  var parent = obj.parentNode;
  if (parent) {
    pageUI.getWidget(widgetId).removeComponent(compId);
    parent.removeChild(obj);
    return true
  }
  return false;
};
window.execDynamicScript2RemoveFormElement2 = function(id, widgetId, formId, feId) {
  if (!id || !widgetId || !formId) return false;
  var obj = ("string" == typeof id) ? $ge(id) : id;
  if (!obj) return false;
  var parent = obj.parentNode;
  if (parent) {
    pageUI.getWidget(widgetId).getComponent(formId).removeElementById(feId);
    parent.removeChild(obj);
    return true
  }
  return false;
};
window.execDynamicScript2RemoveGridColumn = function(widgetId, gridId, keyName, params) {
  var comp = pageUI.getWidget(widgetId).getComponent(gridId);
  var header = comp.removeHeader(keyName);
  comp.paintData();
};
window.execDynamicScript2RemoveFormElement = function(widgetId, formId, keyName, params) {
  try {
    var comp = pageUI.getWidget(widgetId).getComponent(formId);
    comp.removeElementById(keyName);
    comp.pLayout.paint(true);
  } catch (e) {
    alert(e);
  }
};

function getRequest(url) {
  if (!url) url = location.search;
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substring(url.indexOf("?") + 1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
};

function execFormula(widgetId, dsId, fieldId) {
  var proxy = new ServerProxy(null, null, false);
  proxy.addParam('clc', 'nc.uap.lfw.core.app.LfwAppDefaultController');
  proxy.addParam('m_n', 'onFormular');
  proxy.addParam('widgetId', widgetId);
  proxy.addParam("dsId", dsId);
  proxy.addParam("formula_widgetId", widgetId);
  var sbr = new SubmitRule();
  var wdRule = new WidgetRule(widgetId);
  if (dsId) {
    var dsRule = new DatasetRule(dsId, "ds_all_line");
    wdRule.addDsRule(dsId, dsRule);
  }
  sbr.addWidgetRule(widgetId, wdRule);
  proxy.setSubmitRule(sbr);
  proxy.addParam("fieldId", fieldId);
  proxy.execute();
}
LoadingBarComp.prototype = new BaseComponent;
LoadingBarComp.prototype.componentType = "LOADING";
LoadingBarComp.ZINDEX = "10000";

function LoadingBarComp(parent, name, left, top, width, height, position, align, valign, zIndex, className, fixed) {
  if (arguments.length == 0) return;
  this.base = BaseComponent;
  this.base(name, left, top, width, height);
  this.parentOwner = parent;
  this.position = getString(position, "absolute");
  this.overflow = "hidden";
  this.align = align;
  this.valign = valign;
  this.zIndex = getZIndex();
  this.innerHTML = null;
  this.visible = false;
  this.className = getString(className, "panel_div_alpha");
  this.fixed = getBoolean(fixed, false);
  this.create();
};
LoadingBarComp.prototype.create = function() {
  this.Div_gen = $ce("DIV");
  this.Div_gen.style.background = "url(" + window.globalPath + "/frame/themes/images/transparent.gif)";
  this.Div_gen.id = this.id;
  if (this.fixed == true) {
    this.positionElement();
    this.Div_gen.style.width = this.width;
    this.Div_gen.style.height = this.height;
  } else {
    this.Div_gen.style.left = "0px";
    this.Div_gen.style.top = "0px";
    this.Div_gen.style.width = "100%";
    this.Div_gen.style.height = "100%";
  }
  this.Div_gen.style.position = this.position;
  this.Div_gen.style.overflow = this.overflow;
  this.Div_gen.className = this.className;
  this.Div_gen.style.zIndex = this.zIndex;
  if (this.parentOwner) {
    if (this.parentOwner.Div_gen) {
      this.parentOwner.Div_gen.appendChild(this.Div_gen);
      if (this.parentOwner.Div_gen.zIndex != null && this.parentOwner.Div_gen.zIndex > this.zIndex) this.zIndex = this.parentOwner.Div_gen.zIndex + 1;
    } else {
      this.parentOwner.appendChild(this.Div_gen);
      if (this.parentOwner.zIndex != null && this.parentOwner.zIndex > this.zIndex) this.zIndex = this.parentOwner.zIndex + 1;
    }
  } else {
    document.body.appendChild(this.Div_gen);
  }
  this.imgDiv = $ce("DIV");
  var img = $ce("IMG");
  img.style.className = "panel_vertical_middle_div";
  var langCookie = getCookie('LA_K1');
  if (langCookie != "simpchn") langCookie = "english";
  var imgSrc = window.themePath + "/ui/ctrl/loading/images/loading_" + langCookie + ".gif";
  img.src = imgSrc;
  this.imgDiv.appendChild(img);
  this.imgDiv.style.position = "absolute";
  this.imgDiv.style.left = "0px";
  this.imgDiv.style.top = "0px";
  this.imgDiv.style.width = "250px";
  this.imgDiv.style.height = "147px";
  this.imgDiv.style.visibility = "hidden";
  var topWin = getLfwTop();
  topWin = topWin == null ? window : topWin;
  if (IS_IE7) topWin = window;
  topWin.document.body.appendChild(this.imgDiv);
  this.manageSelf();
};
LoadingBarComp.prototype.positionElement = function() {
  if (this.align != null && this.align != "") {
    var parentWidth = 0;
    if (this.parentOwner == null || this.parentOwner == document.body) {
      parentWidth = document.body.clientWidth;
    } else {
      if (this.parentOwner.Div_gen != null) {
        parentWidth = this.parentOwner.Div_gen.offsetWidth;
      } else {
        parentWidth = this.parentOwner.style.offsetWidth;
      }
    }
    var left = 0;
    var eleWidth = this.width;
    if (isPercent(this.width)) {
      left = 0;
    } else if (parentWidth <= parseInt(this.width)) left = 0;
    else {
      if (this.align == "center") {
        left = (parentWidth - parseInt(this.width)) / 2;
        left = parseInt(left);
      } else if (this.align == "left") {
        left = 0;
      } else if (this.align == "right") {
        left = parentWidth - parseInt(this.width);
      }
    }
    this.Div_gen.style.left = left + "px";
  }
  if (this.valign != null && this.valign != "") {
    var parentHeight = 0;
    if (this.parentOwner == null || this.parentOwner == document.body) {
      parentHeight = document.body.clientHeight;
    } else {
      if (this.parentOwner.Div_gen != null) {
        parentHeight = this.parentOwner.Div_gen.offsetHeight;
      } else {
        parentHeight = this.parentOwner.style.offsetHeight;
      }
    }
    var top = 0;
    var eleHeight = this.height;
    if (isPercent(this.height)) {
      top = 0;
    } else if (parentHeight <= parseInt(this.height)) top = 0;
    else {
      if (this.align == "center") {
        top = (parentHeight - parseInt(this.height)) / 2;
        top = parseInt(top);
      } else if (this.align == "top") {}
    }
    this.Div_gen.style.top = top + "px";
  }
  if (this.align == null || this.align == "") {
    this.Div_gen.style.left = this.left + "px";
  }
  if (this.valign == null || this.valign == "") {
    this.Div_gen.style.top = this.top + "px";
  }
};
LoadingBarComp.prototype.manageSelf = function() {
  if (this.innerHTML != null) {
    this.Div_gen.innerHTML = this.innerHTML;
  }
};
LoadingBarComp.prototype.setInnerHTML = function(innerHTML) {
  if (innerHTML != null) {
    this.innerHTML = innerHTML;
    this.imgDiv.innerHTML = innerHTML;
  }
};
LoadingBarComp.prototype.show = function() {
  if (this.Div_gen && this.imgDiv) {
    this.Div_gen.style.zIndex = getZIndex();
    this.Div_gen.style.display = "";
    this.imgDiv.style.visibility = "visible";
    this.imgDiv.style.display = "";
    this.imgDiv.style.zIndex = getZIndex();
    this.visible = true;
    var sctop = 0;
    sctop = compFirstScrollTop();
    var topWin = getLfwTop();
    topWin = topWin == null ? window : topWin;
    topWin.positionElementToScreenCenter(this.imgDiv, sctop);
  }
};
LoadingBarComp.prototype.hide = function() {
  if (this.Div_gen) {
    this.imgDiv.style.visibility = "hidden";
    this.imgDiv.style.display = "none";
    this.Div_gen.style.display = "none";
    this.Div_gen.style.zIndex = -1;
    this.visible = false;
  }
};

function initDefaultLoadingBar(left, top, width, height, align, valign, zIndex, innerHTML) {
  window.loadingBar = new LoadingBarComp(document.body, "$loadingBar", left, top, width, height, null, align, valign, zIndex);
  window.loadingBar.setInnerHTML(innerHTML);
};

function showDefaultLoadingBar() {
  if (window.editMode) return;
  if (window.loadingBar == null) {
    window.loadingBar = new LoadingBarComp(document.body, "$loadingBar", 0, 0, "150", "50", null, "center", "center", 100000);
  }
  if (window.showLoadingBarTimeOutFunc) clearTimeout(window.showLoadingBarTimeOutFunc);
  if (IS_IE) {
    window.showLoadingBar = true;
    window.showLoadingBarDivTimeOutFunc = window.setTimeout("window.loadingBar.showDivgen()", 100);
  } else {
    window.loadingBar.Div_gen.style.display = "";
    window.loadingBar.Div_gen.style.zIndex = getZIndex();
  }
  window.showLoadingBarTimeOutFunc = window.setTimeout("window.loadingBar.show()", 1000);
};
LoadingBarComp.prototype.showDivgen = function() {
  if (window.showLoadingBar != true) return;
  if (this.Div_gen) {
    this.Div_gen.style.zIndex = getZIndex();
    this.Div_gen.style.display = "";
  }
};

function hideDefaultLoadingBar() {
  window.showLoadingBar = false;
  if (window.showLoadingBarDivTimeOutFunc) clearTimeout(window.showLoadingBarDivTimeOutFunc);
  if (window.showLoadingBarTimeOutFunc) clearTimeout(window.showLoadingBarTimeOutFunc);
  if (window.loadingBar != null) window.loadingBar.hide();
};

function Ajax() {
  this.path = null;
  this.queryStr = null;
  this.returnFunc = null;
  this.returnArgs = null;
  this.format = true;
  this.params = new HashMap();
};
Ajax.prototype.setPath = function(path) {
  this.path = path;
};
Ajax.prototype.setQueryStr = function(qryStr) {
  this.queryStr = qryStr;
};
Ajax.prototype.addParam = function(key, value) {
  this.params.put(key, value);
};
Ajax.prototype.setReturnFunc = function(returnFunc) {
  this.returnFunc = returnFunc;
};
Ajax.prototype.setReturnArgs = function(returnArgs) {
  this.returnArgs = returnArgs;
};
Ajax.prototype.setFormat = function(format) {
  this.format = format;
};
Ajax.getHttpProxy = function() {
  var xmlHttpReq;
  try {
    xmlHttpReq = new XMLHttpRequest();
  } catch (e) {
    xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xmlHttpReq;
};
Ajax.prototype.clone = function() {
  var ajax = new Ajax();
  ajax.path = this.path;
  ajax.queryStr = this.queryStr;
  ajax.returnFunc = this.returnFunc;
  ajax.returnArgs = this.returnArgs;
  ajax.format = this.format;
  ajax.params = this.params;
  return ajax;
};
Ajax.prototype.get = function(asyn) {
  if (typeof(getStickString) != "undefined") {
    var stickStr = getStickString();
    if (stickStr != null && stickStr != "") this.queryStr = mergeParameter(this.queryStr, stickStr);
  }
  asyn = getBoolean(asyn, true);
  if (this.queryStr == null) {
    this.queryStr = "";
  }
  if (this.returnFunc == null) {
    this.returnFunc = function() {};
  }
  try {
    var urlParam = this.path + (this.path.indexOf("?") == -1 ? "?" : "") + this.queryStr + "&isAjax=1";
    if (this.queryStr != "" && this.queryStr[this.queryStr.length - 1] != "&") urlParam += "&";
    else urlParam += "&";
    if (this.params.size() > 0) {
      var keys = this.params.keySet();
      for (var i = 0, count = keys.length; i < count; i++) {
        urlParam += keys[i] + "=" + encodeURIComponent(this.params.get(keys[i]));
        urlParam += "&";
      }
    }
    urlParam += "tmprandid=" + Math.random();
    var xmlHttpReq = Ajax.getHttpProxy();
    xmlHttpReq.open("GET", urlParam, asyn);
    xmlHttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    if (IS_IE10_ABOVE) {
      try {
        xmlHttpReq.responseType = 'msxml-document';
      } catch (e) {}
    }
    xmlHttpReq.send(null);
    if (!asyn) {
      if (this.format) return xmlHttpReq.responseXML;
      return xmlHttpReq.responseText;
    }
    this.addCallBack(xmlHttpReq);
  } catch (e) {
    if (IS_IE) showErrorDialog("Ajax request error:" + e.name + " " + e.message);
    else showErrorDialog("Ajax request error:" + e);
  }
};
Ajax.prototype.post = function(asyn) {
  if (typeof(getStickString) != "undefined") {
    var stickStr = getStickString();
    if (stickStr != null && stickStr != "") this.queryStr = mergeParameter(this.queryStr, stickStr);
  }
  asyn = getBoolean(asyn, true);
  if (this.queryStr == null) {
    this.queryStr = "";
  }
  if (this.returnFunc == null) {
    this.returnFunc = function() {};
  }
  var paramStr = "";
  if (this.params.size() > 0) {
    var keys = this.params.keySet();
    for (var i = 0, count = keys.length; i < count; i++) {
      paramStr += keys[i] + "=" + encodeURIComponent(this.params.get(keys[i]));
      if (i != count - 1) paramStr += "&";
    }
  }
  var xmlHttpReq = Ajax.getHttpProxy();
  xmlHttpReq.open("POST", this.path, asyn);
  xmlHttpReq.setRequestHeader("Method", "POST " + this.path + " HTTP/1.1");
  xmlHttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
  if (IS_IE10_ABOVE) {
    try {
      xmlHttpReq.responseType = 'msxml-document';
    } catch (e) {}
  }
  this.xmlHttpReq = xmlHttpReq;
  var qryStr = this.queryStr;
  if (paramStr != "") qryStr += "&" + paramStr;
  if (asyn) this.addCallBack(xmlHttpReq);
  var bodyStr = qryStr + "&isAjax=1";
  xmlHttpReq.send(bodyStr);
  if (!asyn) {
    var result = this.returnFunc(xmlHttpReq, this.returnArgs, null, this);
    this.destroySelf();
    return result;
  }
};
Ajax.prototype.addCallBack = function(xmlHttpReq) {
  var oThis = this;
  xmlHttpReq.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        oThis.returnFunc(this, oThis.returnArgs, null, oThis);
      } else if (this.status == 306) {
        oThis.returnFunc(this, oThis.returnArgs, "会话已失效,请重新登录", oThis);
      } else {
        oThis.returnFunc(this, oThis.returnArgs, "", oThis);
      }
      oThis.destroySelf();
      oThis = null;
    }
  };
  xmlHttpReq = null;
};
Ajax.prototype.destroySelf = function() {
  this.returnFunc = null;
  this.returnArgs = null;
  try {
    if (this.xmlHttpReq != null) {
      this.xmlHttpReq.onreadystatechange = null;
      this.xmlHttpReq = null;
    }
  } catch (e) {
    if (this.xmlHttpReq != null) {
      this.xmlHttpReq.onreadystatechange = function() {};
      this.xmlHttpReq = null;
    }
  }
};

function mergeParameter(sourceParam, appendParam) {
  if (sourceParam == null || sourceParam == "") return appendParam;
  else if (appendParam == null || appendParam == "") return sourceParam;
  else {
    return sourceParam + "&" + appendParam;
  }
};
escapeJSONChar = function escapeJSONChar(c) {
  if (c == "\"" || c == "\\") return "\\" + c;
  else if (c == "\b") return "\\b";
  else if (c == "\f") return "\\f";
  else if (c == "\n") return "\\n";
  else if (c == "\r") return "\\r";
  else if (c == "\t") return "\\t";
  var hex = c.charCodeAt(0).toString(16);
  if (hex.length == 1) return "\\u000" + hex;
  else if (hex.length == 2) return "\\u00" + hex;
  else if (hex.length == 3) return "\\u0" + hex;
  else return "\\u" + hex;
};
escapeJSONString = function escapeJSONString(s) {
  var parts = s.split("");
  for (var i = 0; i < parts.length; i++) {
    var c = parts[i];
    if (c == '"' || c == '\\' || c.charCodeAt(0) < 32 || c.charCodeAt(0) >= 128) parts[i] = escapeJSONChar(parts[i]);
  }
  return "\"" + parts.join("") + "\"";
};
toJSON = function toJSON(o) {
  if (o == null) {
    return "null";
  } else if (o.constructor == String) {
    return escapeJSONString(o);
  } else if (o.constructor == Number) {
    return o.toString();
  } else if (o.constructor == Boolean) {
    return o.toString();
  } else if (o.constructor == Date) {
    return '{javaClass:"java.util.Date",time:' + o.valueOf() + '}';
  } else if (o.constructor == Array || o.constructor.toString().indexOf('function Array') != -1) {
    var v = [];
    for (var i = 0; i < o.length; i++) v.push(toJSON(o[i]));
    return "[" + v.join(", ") + "]";
  } else {
    var v = [];
    for (attr in o) {
      if (o[attr] == null) v.push("\"" + attr + "\": null");
      else if (typeof o[attr] == "function") {} else v.push(attr + ": " + toJSON(o[attr]));
    }
    return "{" + v.join(", ") + "}";
  }
};
JSONRpcClient = function JSONRpcClient_ctor(serverURL, user, pass, objectID) {
  this.serverURL = serverURL;
  this.user = user;
  this.pass = pass;
  this.objectID = objectID;
  if (this.objectID) {
    this._addMethods(["listMethods"]);
    var req = this._makeRequest("listMethods", []);
  } else {
    this._addMethods(["system.listMethods"]);
    var req = this._makeRequest("system.listMethods", []);
  }
  var m = this._sendRequest(req);
  this._addMethods(m);
};
JSONRpcClient.Exception = function JSONRpcClient_Exception_ctor(code, message, javaStack) {
  this.code = code;
  var name;
  if (javaStack) {
    this.javaStack = javaStack;
    var m = javaStack.match(/^([^:]*)/);
    if (m) name = m[0];
  }
  if (name) this.name = name;
  else this.name = "JSONRpcClientException";
  this.message = message;
};
JSONRpcClient.Exception.CODE_REMOTE_EXCEPTION = 490;
JSONRpcClient.Exception.CODE_ERR_CLIENT = 550;
JSONRpcClient.Exception.CODE_ERR_PARSE = 590;
JSONRpcClient.Exception.CODE_ERR_NOMETHOD = 591;
JSONRpcClient.Exception.CODE_ERR_UNMARSHALL = 592;
JSONRpcClient.Exception.CODE_ERR_MARSHALL = 593;
JSONRpcClient.Exception.prototype = new Error();
JSONRpcClient.Exception.prototype.toString = function JSONRpcClient_Exception_toString(code, msg) {
  return this.name + ": " + this.message;
};
JSONRpcClient.default_ex_handler = function JSONRpcClient_default_ex_handler(e) {
  alert(e);
};
JSONRpcClient.toplevel_ex_handler = JSONRpcClient.default_ex_handler;
JSONRpcClient.profile_async = false;
JSONRpcClient.max_req_active = 1;
JSONRpcClient.requestId = 1;
JSONRpcClient.prototype._createMethod = function JSONRpcClient_createMethod(methodName) {
  var fn = function() {
    var args = [];
    var callback = null;
    for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
    if (typeof args[0] == "function") callback = args.shift();
    var req = fn.client._makeRequest.call(fn.client, fn.methodName, args, callback);
    if (callback == null) {
      return fn.client._sendRequest.call(fn.client, req);
    } else {
      JSONRpcClient.async_requests.push(req);
      JSONRpcClient.kick_async();
      return req.requestId;
    }
  };
  fn.client = this;
  fn.methodName = methodName;
  return fn;
};
JSONRpcClient.prototype._addMethods = function JSONRpcClient_addMethods(methodNames) {
  for (var i = 0; i < methodNames.length; i++) {
    var obj = this;
    var names = methodNames[i].split(".");
    for (var n = 0; n < names.length - 1; n++) {
      var name = names[n];
      if (obj[name]) {
        obj = obj[name];
      } else {
        obj[name] = new Object();
        obj = obj[name];
      }
    }
    var name = names[names.length - 1];
    if (!obj[name]) {
      var method = this._createMethod(methodNames[i]);
      obj[name] = method;
    }
  }
};
JSONRpcClient._getCharsetFromHeaders = function JSONRpcClient_getCharsetFromHeaders(http) {
  try {
    var contentType = http.getResponseHeader("Content-type");
    var parts = contentType.split(/\s*;\s*/);
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].substring(0, 8) == "charset=") return parts[i].substring(8, parts[i].length);
    }
  } catch (e) {}
  return "UTF-8";
};
JSONRpcClient.async_requests = [];
JSONRpcClient.async_inflight = {};
JSONRpcClient.async_responses = [];
JSONRpcClient.async_timeout = null;
JSONRpcClient.num_req_active = 0;
JSONRpcClient._async_handler = function JSONRpcClient_async_handler() {
  JSONRpcClient.async_timeout = null;
  while (JSONRpcClient.async_responses.length > 0) {
    var res = JSONRpcClient.async_responses.shift();
    if (res.canceled) continue;
    if (res.profile) res.profile.dispatch = new Date();
    try {
      res.cb(res.result, res.ex, res.profile);
    } catch (e) {
      JSONRpcClient.toplevel_ex_handler(e);
    }
  }
  while (JSONRpcClient.async_requests.length > 0 && JSONRpcClient.num_req_active < JSONRpcClient.max_req_active) {
    var req = JSONRpcClient.async_requests.shift();
    if (req.canceled) continue;
    req.client._sendRequest.call(req.client, req);
  }
};
JSONRpcClient.kick_async = function JSONRpcClient_kick_async() {
  if (JSONRpcClient.async_timeout == null) JSONRpcClient.async_timeout = setTimeout(JSONRpcClient._async_handler, 0);
};
JSONRpcClient.cancelRequest = function JSONRpcClient_cancelRequest(requestId) {
  if (JSONRpcClient.async_inflight[requestId]) {
    JSONRpcClient.async_inflight[requestId].canceled = true;
    return true;
  }
  for (var i in JSONRpcClient.async_requests) {
    if (JSONRpcClient.async_requests[i].requestId == requestId) {
      JSONRpcClient.async_requests[i].canceled = true;
      return true;
    }
  }
  for (var i in JSONRpcClient.async_responses) {
    if (JSONRpcClient.async_responses[i].requestId == requestId) {
      JSONRpcClient.async_responses[i].canceled = true;
      return true;
    }
  }
  return false;
};
JSONRpcClient.prototype._makeRequest = function JSONRpcClient_makeRequest(methodName, args, cb) {
  var req = {};
  req.client = this;
  req.requestId = JSONRpcClient.requestId++;
  var obj = {};
  obj.id = req.requestId;
  if (this.objectID) obj.method = ".obj#" + this.objectID + "." + methodName;
  else obj.method = methodName;
  obj.params = args;
  if (cb) req.cb = cb;
  if (JSONRpcClient.profile_async) req.profile = {
    "submit": new Date()
  };
  req.data = toJSON(obj);
  return req;
};
JSONRpcClient.prototype._sendRequest = function JSONRpcClient_sendRequest(req) {
  if (req.profile) req.profile.start = new Date();
  var http = JSONRpcClient.poolGetHTTPRequest();
  JSONRpcClient.num_req_active++;
  if (typeof(this.user) == "undefined") {
    http.open("POST", this.serverURL, (req.cb != null));
  } else {
    http.open("POST", this.serverURL, (req.cb != null), this.user, this.pass);
  }
  try {
    http.setRequestHeader("Content-type", "text/plain");
  } catch (e) {}
  if (req.cb) {
    var self = this;
    http.onreadystatechange = function() {
      if (http.readyState == 4) {
        http.onreadystatechange = function() {};
        var res = {
          "cb": req.cb,
          "result": null,
          "ex": null
        };
        if (req.profile) {
          res.profile = req.profile;
          res.profile.end = new Date();
        }
        try {
          res.result = self._handleResponse(http);
        } catch (e) {
          res.ex = e;
        }
        if (!JSONRpcClient.async_inflight[req.requestId].canceled) JSONRpcClient.async_responses.push(res);
        delete JSONRpcClient.async_inflight[req.requestId];
        JSONRpcClient.kick_async();
      }
    };
  } else {
    http.onreadystatechange = function() {};
  }
  JSONRpcClient.async_inflight[req.requestId] = req;
  try {
    http.send(req.data);
  } catch (e) {
    JSONRpcClient.poolReturnHTTPRequest(http);
    JSONRpcClient.num_req_active--;
    throw new JSONRpcClient.Exception(JSONRpcClient.Exception.CODE_ERR_CLIENT, "Connection failed");
  }
  if (!req.cb) return this._handleResponse(http);
};
JSONRpcClient.prototype._handleResponse = function JSONRpcClient_handleResponse(http) {
  if (!this.charset) {
    this.charset = JSONRpcClient._getCharsetFromHeaders(http);
  }
  var status, statusText, data;
  try {
    status = http.status;
    statusText = http.statusText;
    data = http.responseText;
  } catch (e) {
    JSONRpcClient.poolReturnHTTPRequest(http);
    JSONRpcClient.num_req_active--;
    JSONRpcClient.kick_async();
    throw new JSONRpcClient.Exception(JSONRpcClient.Exception.CODE_ERR_CLIENT, "Connection failed");
  }
  JSONRpcClient.poolReturnHTTPRequest(http);
  JSONRpcClient.num_req_active--;
  if (status != 200) {
    throw new JSONRpcClient.Exception(status, statusText);
  }
  var obj;
  try {
    eval("obj = " + data);
  } catch (e) {
    throw new JSONRpcClient.Exception(550, "error parsing result");
  }
  if (obj.error) throw new JSONRpcClient.Exception(obj.error.code, obj.error.msg, obj.error.trace);
  var res = obj.result;
  if (res && res.objectID && res.JSONRPCType == "CallableReference") return new JSONRpcClient(this.serverURL, this.user, this.pass, res.objectID);
  return res;
};
JSONRpcClient.http_spare = [];
JSONRpcClient.http_max_spare = 8;
JSONRpcClient.poolGetHTTPRequest = function JSONRpcClient_pool_getHTTPRequest() {
  if (JSONRpcClient.http_spare.length > 0) {
    return JSONRpcClient.http_spare.pop();
  }
  return JSONRpcClient.getHTTPRequest();
};
JSONRpcClient.poolReturnHTTPRequest = function JSONRpcClient_poolReturnHTTPRequest(http) {
  if (JSONRpcClient.http_spare.length >= JSONRpcClient.http_max_spare) delete http;
  else JSONRpcClient.http_spare.push(http);
};
JSONRpcClient.msxmlNames = ["MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
JSONRpcClient.getHTTPRequest = function JSONRpcClient_getHTTPRequest() {
  try {
    JSONRpcClient.httpObjectName = "XMLHttpRequest";
    return new XMLHttpRequest();
  } catch (e) {}
  for (var i = 0; i < JSONRpcClient.msxmlNames.length; i++) {
    try {
      JSONRpcClient.httpObjectName = JSONRpcClient.msxmlNames[i];
      return new ActiveXObject(JSONRpcClient.msxmlNames[i]);
    } catch (e) {}
  }
  JSONRpcClient.httpObjectName = null;
  throw new JSONRpcClient.Exception(0, "Can't create XMLHttpRequest object");
};
var FormaterMap = new HashMap();

function Formater() {};
Formater.prototype.format = function(value, direction) {
  if (direction == null || direction == true) return getString(value, "");
  return value;
};
Formater.prototype.valid = function(presssKey, aggValue) {
  return true;
};
BooleanFormater.trueArr = [1, 'Y', 'y', true, 'true'];
BooleanFormater.falseArr = [0, 'N', 'n', false, 'false'];

function BooleanFormater(trueArr, falseArr, defaultValue) {
  if (trueArr == null) this.trueArr = BooleanFormater.trueArr;
  else this.trueArr = trueArr;
  if (falseArr == null) this.falseArr = BooleanFormater.falseArr;
  else this.falseArr = falseArr;
  this.defaultValue = getBoolean(defaultValue, false);
};
BooleanFormater.prototype.format = function(value, direction) {
  if (direction == null || direction == true) {
    if (this.falseArr.indexOf(value) != -1) return false;
    if (this.trueArr.indexOf(value) != -1) return true;
    return this.defaultValue;
  }
  return value;
};

function StringFormater(maxSize) {
  if (maxSize == null || parseInt(maxSize) < 0) this.maxSize = -1;
  else this.maxSize = maxSize;
};
StringFormater.prototype.format = function(value) {
  if (value == null || value == "") return "";
  if (this.maxSize > 0) {
    if (value.lengthb() > this.maxSize) value = value.substrCH(this.maxSize);
  }
  return value;
};
StringFormater.prototype.valid = function(key, aggValue, currValue) {
  if (this.maxSize != -1) {
    if (aggValue.lengthb() > this.maxSize) return false;
  }
};

function DicimalFormater(precision, minValue, maxValue) {
  this.precision = getInteger(precision, 2);
  this.minValue = minValue;
  this.maxValue = maxValue;
};
DicimalFormater.prototype.format = function(value) {
  if (value == null || value == "") return "";
  if (this.minValue != null && parseFloat(value) < this.minValue) return "";
  if (this.maxValue != null && parseFloat(value) > this.maxValue) return "";
  value = value + "";
  for (var i = 0; i < value.length; i++) {
    if ("-0123456789.".indexOf(value.charAt(i)) == -1) return "";
  }
  return checkDicimalInvalid(value, this.precision);
};
DicimalFormater.prototype.valid = function(key, aggValue, currValue) {
  if ("0123456789.-".indexOf(key) == -1) {
    return false;
  }
  return checkInputDicimal(aggValue, this.precision);
};

function checkInputDicimal(value, precision) {
  if (value == null || value == "") return false;
  value = value + "";
  var freg = new RegExp(/^-?([0-9]\d*\.\d*|0\.\d*[0-9]\d*|0?\.0+|0)$/);
  if (freg.test(value)) {
    if (value.indexOf(".") != -1) {
      var intNumber = value.substr(0, value.indexOf("."));
      if (intNumber.length > 15 - precision - 1) return false;
    }
    var num = 0,
      start = 0;
    if ((start = value.indexOf(".")) != -1) {
      if ((value.substring(start + 1)).length > parseInt(precision)) return false;
    }
    return true;
  }
  var nreg = new RegExp(/^(-|\+)?\d+$/);
  if (nreg.test(value)) {
    if (value.length > 15 - precision - 1) return false;
    return true;
  }
  if (value == "-") {
    return true;
  }
  if (value == "0." || value == "-0.") return true;
  return false;
};

function checkDicimalInvalid(str, precision) {
  if (str == null || isNaN(str)) return "";
  if (str.length > 15) str = str.substring(0, 15);
  if (precision == null || !isNumberOnly(precision)) precision = 2;
  else precision = parseInt(precision);
  var digit = parseFloat(str);
  var result = (digit * Math.pow(10, precision) / Math.pow(10, precision)).toFixed(precision);
  if (result == "NaN") return "";
  return result;
};

function IntegerFormater(minValue, maxValue) {
  if (!isNumber(minValue)) this.minValue = -999999999999999;
  else this.minValue = parseInt(minValue);
  if (!isNumber(maxValue)) this.maxValue = 999999999999999;
  else this.maxValue = parseInt(maxValue);
};
IntegerFormater.prototype.format = function(value, isBlur) {
  if (value == null || value == "") return "";
  if (!IS_IE) {
    while (value.charAt(0) == "0" && value.length > 1) {
      value = value.substring(1);
    }
  }
  if (!isNumber(value)) {
    return "";
  }
  if (isBlur) {
    if (value < this.minValue || value > this.maxValue) return "";
  }
  if (checkIntegerIsValid(value, this.minValue, this.maxValue) == true) return value;
  else return "";
};
IntegerFormater.prototype.valid = function(key, aggValue, currValue) {
  var isInvalid = false;
  if ("-0123456789".indexOf(key) == -1) isInvalid = false;
  else isInvalid = true;
  if (isInvalid == true) {
    if (aggValue == "-") return true;
    else {
      if (isNumber(aggValue)) {
        if (aggValue.length > 15) return false;
        return checkIntegerIsValid(aggValue, this.minValue, this.maxValue);
      }
      return false;
    }
  } else return false;
  return true;
};

function checkIntegerIsValid(value, minValue, maxValue) {
  if (!isNumber(value)) return false;
  value = parseInt(value);
  if (!isNumber(minValue)) {
    minValue = -99999999999999;
  }
  if (!isNumber(maxValue)) {
    maxValue = 999999999999999;
  }
  if ((value > maxValue) || (minValue < 0 && value < minValue)) return false;
  else return true;
};

function DateFormater() {};
DateFormater.prototype.valid = function(key, aggValue, currValue) {
  return true;
};
DateFormater.prototype.getMaskerFormatValue = function(value) {
  if (typeof(value) == "undefined" || value == "" || value == null) {
    return "";
  }
  var type = "DATETEXT";
  if (typeof(DateTextComp) != "undefined" && typeof(DateTextComp.prototype.componentType) != "undefined") {
    type = DateTextComp.prototype.componentType;
  }
  var maskerType = this.showTimeBar ? "DateTimeText" : type;
  var masker = getMasker(maskerType);
  if (masker != null) return masker.format(value).value;
  else return value;
};
DateFormater.prototype.format = function(value) {
  if (typeof(value) == "undefined" || value == null || value == "") {
    return "";
  }
  if (value.indexOf('$') == 0) {
    return value;
  }
  if (value.length > 10) {
    var dateTimeValue = this.formatDateTime(value);
    if (dateTimeValue != "") {
      return dateTimeValue;
    }
  } else if (value.length >= 8) {
    var dateTimeValue = this.formatDate(value);
    if (dateTimeValue != "") {
      return dateTimeValue;
    }
  } else {
    return "";
  }
  var changeValue = value.replace(/-/ig, "/");
  if (!isNaN(Date.parse(changeValue))) {
    var d = new Date(changeValue);
    var nowDate = new Date();
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    if (parseInt(m) < 10) {
      m = "0" + m;
    }
    var d = d.getDate();
    if (d < 10) {
      d = "0" + d;
    }
    hour = nowDate.getHours();
    min = nowDate.getMinutes();
    sec = nowDate.getSeconds();
    return y + "-" + m + "-" + d + " " + hour + ":" + min + ":" + sec;
  } else {
    return "";
  }
};
DateFormater.prototype.formatDateTime = function(value) {
  if (typeof(value) == "undefined" || value == null || value == "") return "";
  if (value.indexOf('$') == 0) {
    return value;
  }
  var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
  var r = value.match(reg);
  if (r == null) return "";
  var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
  if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]) return r[1] + "-" + r[3] + "-" + r[4] + " " + r[5] + ":" + r[6] + ":" + r[7];
  else return "";
};
DateFormater.prototype.formatYearAndMonth = function(value) {
  var strDate = value;
  if (typeof(strDate) == "undefined" || strDate == null || strDate == "") return "";
  if (strDate.length > 7) {
    strDate = strDate.substring(0, 7);
  }
  var reg = /^(\d{1,4})(-|\/)(([0]{0,1}[1-9]{1})|([1]{1}[0-2]{1}))$/;
  var r = strDate.match(reg);
  if (r == null) {
    return "";
  } else if (r == false) {
    return "";
  }
  var year = parseInt(r[1], 10);
  var month = parseInt(r[3], 10);
  var date = 1;
  var dateObj = new Date(year, month - 1, date);
  if (dateObj.getFullYear() == year && (dateObj.getMonth() + 1) == month && dateObj.getDate() == date) {
    var m = dateObj.getMonth() + 1;
    if (m < 10) {
      m = "0" + m;
    }
    value = dateObj.getFullYear() + "-" + m;
  } else {
    value = "";
  }
  return value;
};
DateFormater.prototype.formatMonth = function(value) {
  var strDate = value;
  if (typeof(strDate) == "undefined" || strDate == null || strDate == "") return "";
  if (strDate.length > 2) {
    strDate = strDate.substring(0, 2);
  }
  var reg = /^(([0]{0,1}[1-9]{1})|([1]{1}[0-2]{1}))$/;
  var r = strDate.match(reg);
  if (r == null) {
    return "";
  } else if (r == false) {
    return "";
  }
  if (strDate < 10 && strDate.length < 2) {
    strDate = "0" + strDate;
  }
  return strDate;
};
DateFormater.prototype.formatYear = function(value) {
  var strDate = value;
  if (typeof(strDate) == "undefined" || strDate == null || strDate == "") return "";
  if (strDate.length > 4) {
    strDate = strDate.substring(0, 4);
  }
  var reg = /^\d{4}$/;
  var r = strDate.match(reg);
  if (r == null) {
    return "";
  } else if (r == false) {
    return "";
  }
  return strDate;
};
DateFormater.prototype.formatDate = function(value) {
  var strDate = value;
  if (typeof(strDate) == "undefined" || strDate == null || strDate == "") return "";
  if (value.indexOf('$') == 0) {
    return value;
  }
  if (strDate.length > 10) {
    strDate = strDate.substring(0, 10);
  }
  var reg = /^(\d{1,4})(-|\/)(([0]{0,1}[1-9]{1})|([1]{1}[0-2]{1}))(-|\/)(([0]{0,1}[1-9]{1})|([1-2]{1}[0-9]{1})|([3]{1}[0-1]{1}))$/;
  var r = strDate.match(reg);
  if (r == null) {
    return "";
  } else if (r == false) {
    return "";
  }
  var year = parseInt(r[1], 10);
  var month = parseInt(r[3], 10);
  var date = parseInt(r[7], 10);
  var dateObj = new Date(year, month - 1, date);
  if (dateObj.getFullYear() == year && (dateObj.getMonth() + 1) == month && dateObj.getDate() == date) {
    var m = dateObj.getMonth() + 1;
    if (m < 10) {
      m = "0" + m;
    }
    var d = dateObj.getDate();
    if (d < 10) {
      d = "0" + d;
    }
    value = dateObj.getFullYear() + "-" + m + "-" + d;
  } else {
    value = "";
  }
  return value;
};
DateFormater.prototype.formatTime = function(value) {
  var strDate = value;
  if (typeof(strDate) == "undefined" || strDate == null || strDate == "") return "";
  if (strDate.length > 8) {
    strDate = strDate.substring(0, 8);
  }
  var reg = /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/;
  var r = strDate.match(reg);
  if (r == null) {
    return "";
  } else if (r == false) {
    return "";
  }
  return strDate;
};
DateFormater.prototype.formatDateToString = function(date) {
  if (typeof(date) != "object" || !(date instanceof Date)) {
    date = new Date();
  }
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  if (month < 10) {
    month = new String("0" + month);
  }
  var day = date.getDate();
  if (day < 10) {
    day = new String("0" + day);
  }
  var hour = date.getHours();
  if (hour < 10) {
    hour = new String("0" + hour);
  }
  var min = date.getMinutes();
  if (min < 10) {
    min = new String("0" + min);
  }
  var sec = date.getSeconds();
  if (sec < 10) {
    sec = new String("0" + sec);
  }
  return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
};
DateFormater.prototype.formatInputValueToDateString = function(inputValue) {
  var value = this.formatDateTime(inputValue);
  if (value != "") {
    return value;
  }
  value = this.formatDate(inputValue);
  if (value != "") {
    var date = new Date();
    var hour = date.getHours();
    if (hour < 10) {
      hour = new String("0" + hour);
    }
    var min = date.getMinutes();
    if (min < 10) {
      min = new String("0" + min);
    }
    var sec = date.getSeconds();
    if (sec < 10) {
      sec = new String("0" + sec);
    }
    return value + " " + hour + ":" + min + ":" + sec;
  }
  return value;
};

function showVerifyMessage(obj, msg) {
  if (window.sys_verifyMessageDiv == null) {
    var div = $ce("DIV");
    div.style.background = "#D8E3E8";
    div.style.zIndex = getZIndex();
    div.style.position = "absolute";
    div.appendChild(document.createTextNode(""));
    window.sys_verifyMessageDiv = div;
    document.body.appendChild(window.sys_verifyMessageDiv);
    window.sys_verifyMessageDiv.style.display = "none";
  }
  window.sys_verifyCount = 0;
  if (typeof obj.getObjHtml == "function") {
    var top = compOffsetTop(obj.getObjHtml()) + obj.getObjHtml().offsetHeight;
    var left = compOffsetLeft(obj.getObjHtml());
  }
  window.sys_verifyMessageDiv.replaceChild(document.createTextNode(msg), window.sys_verifyMessageDiv.firstChild);
  window.sys_verifyMessageDiv.style.top = top + 4 + "px";
  window.sys_verifyMessageDiv.style.left = left + "px";
  window.sys_verifyMessageDiv.style.display = "block";
  setTimeout("startVerifyMessageFloating()", 100);
};

function startVerifyMessageFloating() {
  if (window.sys_verifyCount < 10) {
    window.sys_verifyMessageDiv.style.top = window.sys_verifyMessageDiv.offsetTop - 4 + "px";
    window.sys_verifyCount++;
    setTimeout("startVerifyMessageFloating()", 100);
  } else {
    window.sys_verifyMessageDiv.style.display = "none";
  }
};

function EmailFormater(maxSize) {
  if (maxSize == null || parseInt(maxSize) < 0) this.maxSize = -1;
  else this.maxSize = maxSize;
};
EmailFormater.prototype.format = function(value) {
  if (value == null || value == "") return "";
  if (this.maxSize > 0) {
    if (value.lengthb() > this.maxSize) value = value.substrCH(this.maxSize);
  }
  var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var r = value.match(reg);
  if (r == null) {
    return "";
  } else if (r == false) {
    return "";
  }
  return value;
};
EmailFormater.prototype.valid = function(key, aggValue, currValue) {
  if (this.maxSize != -1) {
    if (aggValue.lengthb() > this.maxSize) return false;
  }
};

function PhoneFormater(maxSize) {
  if (maxSize == null || parseInt(maxSize) < 0) this.maxSize = -1;
  else this.maxSize = maxSize;
};
PhoneFormater.prototype.format = function(value) {
  if (value == null || value == "") return "";
  if (this.maxSize > 0) {
    if (value.lengthb() > this.maxSize) value = value.substrCH(this.maxSize);
  }
  var reg = /^([0\+]\d{2,3}-)?(\d{11})$|^([0\+]\d{2,3}-)?(0\d{2,3}-)?(\d{7,8})(-(\d{1,4}))?$/;
  var r = value.match(reg);
  if (r == null) {
    return "";
  } else if (r == false) {
    return "";
  }
  return value;
};
PhoneFormater.prototype.valid = function(key, aggValue, currValue) {
  if (this.maxSize != -1) {
    if (aggValue.lengthb() > this.maxSize) return false;
  }
};

var layoutResizeMap = new HashMap();
var layoutInitMap = new HashMap();
var layoutMonitorArray = new Array();

function addResizeEvent(obj, func, bUndoResizeFunc) {
  if (!obj) return;
  if (bUndoResizeFunc) {
    layoutInitMap.put(obj.id, func);
  } else {
    if (IS_IE7) {
      EventUtil.addEventHandler(obj, "resize", function() {
        func.call(obj)
      });
    } else {
      layoutResizeMap.put(obj.id, func);
    }
    layoutInitMap.put(obj.id, func);
  }
};

function addAndCallResizeEvent(obj, func) {
  addResizeEvent(obj, func);
  func.call(obj);
}
var windowResizeArray = new Array;

function addWindowResize(func) {
  windowResizeArray.add(func);
};
window.onresize = windowResizeFunc;

function windowResizeFunc() {
  var e = EventUtil.getEvent();
  var keySet = layoutResizeMap.keySet();
  for (var i = 0; i < keySet.length; i++) {
    var id = keySet[i];
    var obj = $ge(id);
    var func = layoutResizeMap.get(id);
    if (obj == null || func == null) continue;
    func.call(obj, e);
  }
  for (var i = 0; i < windowResizeArray.length; i++) {
    windowResizeArray[i].call(e);
  }
  clearEvent(e);
};

function layoutInitFunc() {
  var keySet = layoutInitMap.keySet();
  for (var i = 0; i < keySet.length; i++) {
    var id = keySet[i];
    var obj = $ge(id);
    var func = layoutInitMap.get(id);
    func.call(obj);
  }
};

function resizeChildDiv(oContainer, height) {
  var arrChild = oContainer.childNodes;
  for (var i = 0; i < arrChild.length; i++) {
    if (arrChild[i].nodeName == "DIV") {
      if (arrChild[i].style.height == "100%") {
        arrChild[i].isMaxSizeDiv = true;
      }
      if (arrChild[i].isMaxSizeDiv) {
        arrChild[i].style.height = height;
      }
    }
  }
};

function borderResize(e) {
  var oBorder = this;
  var id = oBorder.id;
  var oBorderCenter = $ge(id + "_center");
  var newWidth = oBorder.offsetWidth;
  var newHeight = oBorder.offsetHeight;
  if (newWidth != oBorder.oldWidth) {
    var oBorderLeft = $ge(id + "_left");
    var oBorderRight = $ge(id + "_right");
    var width = oBorder.offsetWidth - (oBorderLeft ? oBorderLeft.offsetWidth : 0) - (oBorderRight ? oBorderRight.offsetWidth : 0);
    if (!IS_IE || IS_IE8) width -= 0.5;
    if (width < 0) width = 0;
    oBorderCenter.style.width = width + "px";
  }
  if (newHeight != oBorder.oldHeight) {
    var oBorderMiddle = $ge(id + "_middle");
    var oBorderInner = $ge(id + "_inner");
    var oBorderTop = $ge(id + "_top");
    var oBorderBottom = $ge(id + "_bottom");
    var height = oBorder.offsetHeight - (oBorderTop ? oBorderTop.offsetHeight : 0) - (oBorderBottom ? oBorderBottom.offsetHeight : 0);
    if (height < 0) height = 0;
    oBorderMiddle.style.height = height + "px";
    if (oBorderInner) oBorderInner.style.height = height + "px";
  }
  oBorder.oldWidth = oBorder.offsetWidth;
  oBorder.oldHeight = oBorder.offsetHeight;
};

function flowhResize(e) {
  var oFlow = this;
  var id = oFlow.id;
  var newWidth = oFlow.offsetWidth;
  if (true || newWidth != oFlow.oldWidth) {
    var arrKnownWidthItem = new Array();
    var arrUnknownWidthItem = new Array();
    var lastChild = null;
    if (oFlow == null || oFlow.childNodes == null) return;
    for (var i = 0; i < oFlow.childNodes.length; i++) {
      var oFlowItem = oFlow.childNodes[i];
      if (oFlowItem.id && oFlowItem.id.indexOf(id) != -1) {
        if (oFlowItem.getAttribute("haswidth") == "1") {
          arrKnownWidthItem.push(oFlowItem);
        } else {
          arrUnknownWidthItem.push(oFlowItem);
        }
        lastChild = oFlowItem;
      }
    }
    var totalWidth = oFlow.offsetWidth;
    for (var i = 0; i < arrKnownWidthItem.length; i++) {
      totalWidth -= arrKnownWidthItem[i].offsetWidth;
      var borderLeft = parseInt(arrKnownWidthItem[i].style.borderLeftWidth);
      borderLeft = isNaN(borderLeft) ? 0 : borderLeft;
      totalWidth -= borderLeft;
      var borderRight = parseInt(arrKnownWidthItem[i].style.borderRightWidth);
      borderRight = isNaN(borderRight) ? 0 : borderRight;
      totalWidth -= borderRight;
    }
    var itemLength = arrUnknownWidthItem.length;
    if (itemLength > 0) {
      var width = totalWidth / itemLength;
      width = parseInt(width);
      var lastMarginLeft = newWidth - totalWidth;
      for (var i = 0; i < itemLength; i++) {
        var tempWidth = width;
        var paddingLeft = parseInt(arrUnknownWidthItem[i].style.paddingLeft);
        paddingLeft = isNaN(paddingLeft) ? 0 : paddingLeft;
        var paddingRight = parseInt(arrUnknownWidthItem[i].style.paddingRight);
        paddingRight = isNaN(paddingRight) ? 0 : paddingRight;
        tempWidth = tempWidth - paddingLeft - paddingRight;
        var borderLeft = parseInt(arrUnknownWidthItem[i].style.borderLeftWidth);
        borderLeft = isNaN(borderLeft) ? 0 : borderLeft;
        var borderRight = parseInt(arrUnknownWidthItem[i].style.borderRightWidth);
        borderRight = isNaN(borderRight) ? 0 : borderRight;
        tempWidth = tempWidth - borderLeft - borderRight;
        if (tempWidth < 0) tempWidth = 0;
        if (i == itemLength - 1 && arrUnknownWidthItem[i] == lastChild) {
          arrUnknownWidthItem[i].style.marginLeft = lastMarginLeft + "px";
          arrUnknownWidthItem[i].style[ATTRFLOAT] = '';
          arrUnknownWidthItem[i].style.overflowX = "";
        } else arrUnknownWidthItem[i].style.width = tempWidth + "px";
        lastMarginLeft += width;
        if (arrUnknownWidthItem[i].offsetHeight == 0 && arrUnknownWidthItem[i].childNodes.length == 0) {
          arrUnknownWidthItem[i].style.height = oFlow.offsetHeight + "px";
        }
      }
    }
  }
  oFlow.oldWidth = oFlow.offsetWidth;
};

function flowhResizeEdit(e) {
  var borderWidth = 1;
  var marginWidth = 1;
  var paddingWidth = 3;
  var otherWidth = marginWidth * 2 + paddingWidth * 2 + borderWidth * 2;
  var oFlow = this;
  var id = oFlow.id;
  var newWidth = oFlow.offsetWidth;
  if (newWidth != oFlow.oldWidth) {
    var arrKnownWidthItem = new Array();
    var arrUnknownWidthItem = new Array();
    for (var i = 0; i < oFlow.childNodes.length; i++) {
      var oFlowItem = oFlow.childNodes[i];
      if (oFlowItem.id && oFlowItem.id.indexOf(id) != -1) {
        if (oFlowItem.getAttribute("haswidth") == "1") {
          arrKnownWidthItem.push(oFlowItem);
        } else {
          arrUnknownWidthItem.push(oFlowItem);
        }
      }
    }
    var totalWidth = oFlow.offsetWidth;
    for (var i = 0; i < arrKnownWidthItem.length; i++) {
      totalWidth -= (arrKnownWidthItem[i].offsetWidth + otherWidth);
    }
    var width = totalWidth / (arrUnknownWidthItem.length == 0 ? 1 : arrUnknownWidthItem.length);
    width = parseInt(width);
    for (var i = 0, n = arrUnknownWidthItem.length; i < n; i++) {
      if (i == n - 1) {
        width = (totalWidth - width * (arrUnknownWidthItem.length - 1) - otherWidth);
        if (!IS_IE || IS_IE8) width -= 1;
      }
      if (width < 0) width = 0;
      arrUnknownWidthItem[i].style.width = width + "px";
    }
  }
  oFlow.oldWidth = oFlow.offsetWidth;
};

function flowvResize(e) {
  var oFlow = this;
  var id = oFlow.id;
  var newHeight = oFlow.offsetHeight;
  if (true || newHeight != oFlow.oldHeight) {
    var arrKnownHeightItem = new Array();
    var arrUnknownHeightItem = new Array();
    for (var i = 0; i < oFlow.childNodes.length; i++) {
      var oFlowItem = oFlow.childNodes[i];
      if (oFlowItem.id && oFlowItem.id.indexOf(id) != -1) {
        if (oFlowItem.getAttribute("hasheight") == "1") {
          arrKnownHeightItem.push(oFlowItem);
        } else {
          arrUnknownHeightItem.push(oFlowItem);
        }
      }
    }
    var totalHeight = oFlow.offsetHeight;
    for (var i = 0; i < arrKnownHeightItem.length; i++) {
      totalHeight -= arrKnownHeightItem[i].offsetHeight;
    }
    var height = totalHeight / (arrUnknownHeightItem.length == 0 ? 1 : arrUnknownHeightItem.length);
    height = parseInt(height);
    for (var i = 0, n = arrUnknownHeightItem.length; i < n; i++) {
      if (i == n - 1) {
        height = (totalHeight - height * (arrUnknownHeightItem.length - 1));
      }
      var paddingTop = parseInt(arrUnknownHeightItem[i].style.paddingTop);
      paddingTop = isNaN(paddingTop) ? 0 : paddingTop;
      var paddingBottom = parseInt(arrUnknownHeightItem[i].style.paddingBottom);
      paddingBottom = isNaN(paddingBottom) ? 0 : paddingBottom;
      height = height - paddingTop - paddingBottom;
      if (height < 0) height = 0;
      arrUnknownHeightItem[i].style.height = height + "px";
    }
  }
  oFlow.oldHeight = oFlow.offsetHeight;
};

function absoluteResize(e) {
  var oLayout = this;
  var id = oLayout.id;
  var newHeight = oLayout.offsetHeight;
  var newWidth = oLayout.offsetWidth;
  if (newHeight != oLayout.oldHeight && newWidth != oLayout.oldWidth) {
    var oPreItem = null;
    var preleft = 0;
    var preright = 0;
    var pretop = 0;
    var prebottom = 0;
    for (var i = 0; i < oLayout.childNodes.length; i++) {
      var oItem = oLayout.childNodes[i];
      if (oItem.id && oItem.id.indexOf(id) != -1) {
        var left = oItem.getAttribute("attleft");
        var right = oItem.getAttribute("attright");
        var top = oItem.getAttribute("atttop");
        var bottom = oItem.getAttribute("attbottom");
        var width = oItem.getAttribute("attwidth");
        var height = oItem.getAttribute("attheight");
        var anchorLeft = oItem.getAttribute("anchorLeft");
        var anchorRight = oItem.getAttribute("anchorRight");
        var anchorTop = oItem.getAttribute("anchorTop");
        var anchorBottom = oItem.getAttribute("anchorBottom");
        var remainWidth = newWidth;
        var offsetLeft = 0;
        if (anchorLeft == "panel") {
          remainWidth = remainWidth - preright;
          offsetLeft = preright;
        } else if (anchorRight == "panel") {
          remainWidth = preleft;
        }
        if (width != 'null') {
          if (isPercent(width)) width = remainWidth * per2decimal(width);
          if (left == 'null' && right != 'null') {
            if (isPercent(right)) left = remainWidth - width - (remainWidth - width) * per2decimal(left) + offsetLeft;
            else left = remainWidth - width - right + offsetLeft;
          } else {
            if (left == 'null') left = 0;
            if (isPercent(left)) left = (remainWidth - width) * per2decimal(left) + offsetLeft;
            else left = parseInt(left) + offsetLeft;
          }
        } else {
          if (left == 'null') left = 0;
          if (right == 'null') right = 0;
          width = remainWidth - left - right;
        }
        if (left < 0) left = 0;
        oItem.style.width = width + "px";
        oItem.style.left = left + "px";
        preleft = left;
        preright = parseInt(left) + parseInt(width);
        var remainHeight = newHeight;
        var offsetTop = 0;
        if (anchorTop == "panel") {
          remainHeight = remainHeight - prebottom;
          offsetTop = prebottom;
        } else if (anchorBottom == "panel") {
          remainHeight = pretop;
        }
        if (height != 'null') {
          if (isPercent(height)) height = remainHeight * per2decimal(height);
          if (top == 'null' && bottom != 'null') {
            if (isPercent(bottom)) top = remainHeight - height - (remainHeight - height) * per2decimal(top) + offsetTop;
            else top = remainHeight - height - bottom + offsetTop;
          } else {
            if (top == 'null') top = 0;
            if (isPercent(top)) top = (remainHeight - height) * per2decimal(top) + offsetTop;
            else top = parseInt(top) + offsetTop;
          }
        } else {
          if (top == 'null') top = 0;
          if (bottom == 'null') bottom = 0;
          height = remainHeight - top - bottom;
        }
        if (top < 0) top = 0;
        oItem.style.height = height + "px";
        oItem.style.top = top + "px";
        pretop = parseInt(top);
        prebottom = parseInt(top) + parseInt(height);
      }
    }
  }
  oLayout.oldHeight = oLayout.offsetHeight;
  oLayout.oldWidth = oLayout.offsetWidth;
};

function scrollToAnchor(id, anchor, widgetId) {
  if (id == null || id == "") return;
  var divId = "$d_" + (widgetId == null || widgetId == "" ? "" : (widgetId + "_")) + id;
  var oFlow = $ge(divId);
  if (oFlow && anchor != null && anchor != "") {
    if (isDivVScroll(oFlow)) {
      var scrollTop = 0;
      for (var i = 0; i < oFlow.childNodes.length; i++) {
        var oFlowItem = oFlow.childNodes[i];
        if (oFlowItem.id && oFlowItem.id.indexOf(divId) != -1) {
          if (oFlowItem.getAttribute("anchor") == anchor) {
            oFlow.scrollTop = scrollTop;
          } else {
            scrollTop += oFlowItem.offsetHeight;
          }
        }
      }
    }
  }
};

function getFlowvPanel(id, anchor, widgetId) {
  if (id == null || id == "") return null;
  var divId = "$d_" + (widgetId == null || widgetId == "" ? "" : (widgetId + "_")) + id;
  var oFlow = $ge(divId);
  if (oFlow && anchor != null && anchor != "") {
    for (var i = 0; i < oFlow.childNodes.length; i++) {
      var oFlowItem = oFlow.childNodes[i];
      if (oFlowItem.id && oFlowItem.id.indexOf(divId) != -1) {
        if (oFlowItem.getAttribute("anchor") == anchor) {
          return oFlowItem;
        }
      }
    }
  }
};

function gridLayoutResize(e) {
  var oGridLayout = this;
  var id = oGridLayout.id;
  var colCount = oGridLayout.getAttribute("colcount");
  var newHeight = oGridLayout.offsetHeight;
  var newWidth = oGridLayout.offsetWidth;
  if (newHeight != oGridLayout.oldHeight) {
    var arrKnownHeightItem = new Array();
    var arrUnknownHeightItem = new Array();
    for (var i = 0; i < oGridLayout.childNodes.length; i++) {
      var oGridLayoutItem = oGridLayout.childNodes[i];
      if (oGridLayoutItem.id && oGridLayoutItem.id.indexOf(id) != -1 && oGridLayoutItem.getAttribute("hasheight") && oGridLayoutItem.getAttribute("hasheight") != "") {
        if (oGridLayoutItem.getAttribute("hasheight") == "1") {
          arrKnownHeightItem.push(oGridLayoutItem);
        } else {
          arrUnknownHeightItem.push(oGridLayoutItem);
        }
      }
    }
    var totalHeight = oGridLayout.offsetHeight;
    for (var i = 0; i < arrKnownHeightItem.length; i++) {
      totalHeight -= arrKnownHeightItem[i].offsetHeight;
    }
    var height = totalHeight / arrUnknownHeightItem.length;
    height = parseInt(height);
    for (var i = 0, n = arrUnknownHeightItem.length; i < n; i++) {
      if (i == n - 1) {
        height = (totalHeight - height * (arrUnknownHeightItem.length - 1));
      }
      if (height < 0) height = 0;
      arrUnknownHeightItem[i].style.height = height + "px";
    }
  }
  if (newWidth != oGridLayout.oldWidth) {
    var arrKnownWidthItem = new Array();
    var arrUnknownWidthItem = new Array();
    var arrKnownItemNum = new Array();
    var arrUnknownItemNum = new Array();
    for (var j = 0; j < oGridLayout.childNodes.length; j++) {
      var oGridLayoutRowItem = oGridLayout.childNodes[j];
      if (oGridLayoutRowItem.id && oGridLayoutRowItem.id.indexOf(id) != -1 && oGridLayoutRowItem.getAttribute("hasheight") && oGridLayoutRowItem.getAttribute("hasheight") != "") {
        for (var i = 0; i < oGridLayoutRowItem.childNodes.length; i++) {
          var oGridLayoutItem = oGridLayoutRowItem.childNodes[i];
          if (oGridLayoutItem.id && oGridLayoutItem.id.indexOf(id) != -1 && oGridLayoutItem.getAttribute("haswidth") && oGridLayoutItem.getAttribute("haswidth") != "") {
            if (oGridLayoutItem.getAttribute("haswidth") == "1") {
              arrKnownWidthItem.push(oGridLayoutItem);
              if (arrKnownItemNum.indexOf(i) == -1) arrKnownItemNum.push(i);
            } else {
              arrUnknownWidthItem.push(oGridLayoutItem);
              if (arrUnknownItemNum.indexOf(i) == -1) arrUnknownItemNum.push(i);
            }
          }
        }
      }
    }
    var totalWidth = oGridLayout.offsetWidth;
    for (var i = 0; i < arrKnownItemNum.length; i++) {
      totalWidth -= arrKnownWidthItem[i].offsetWidth;
    }
    var width = totalWidth / (arrUnknownItemNum.length == 0 ? 1 : arrUnknownItemNum.length);
    width = parseInt(width);
    var lastWidth = (totalWidth - width * (arrUnknownItemNum.length - 1));
    lastWidth = lastWidth < 0 ? 0 : lastWidth;
    var specialWidth = (lastWidth - 0.5) < 0 ? 0 : (lastWidth - 0.5);
    for (var i = 0, n = arrUnknownWidthItem.length; i < n; i++) {
      if ((i % arrUnknownItemNum.length) == 1) {
        if (!IS_IE || IS_IE8) arrUnknownWidthItem[i].style.width = specialWidth + "px";
        else arrUnknownWidthItem[i].style.width = lastWidth + "px";
      } else {
        arrUnknownWidthItem[i].style.width = (width < 0 ? 0 : width) + "px";
      }
    }
  }
  oGridLayout.oldHeight = oGridLayout.offsetHeight;
  oGridLayout.oldWidth = oGridLayout.offsetWidth;
};

function cardResize(e) {
  var oCard = this;
  var childDivArray = oCard.childNodes;
  for (var i = 0, n = childDivArray.length; i < n; i++) {
    var childDiv = childDivArray[i];
    if (childDiv.nodeName.toLowerCase() == "div" && childDiv.getAttribute("hasWidth") != 1 && childDiv.getAttribute("hasHeight") != 1) {
      if (IS_IE7 && childDiv.style.position == "absolute") {
        continue;
      }
      childDiv.style.width = oCard.offsetWidth + "px";
      if (childDiv.style.height.indexOf('%') == -1) childDiv.style.height = oCard.offsetHeight + "px";
    }
  }
};

function addLayoutMonitor(obj) {
  if (obj != null) layoutMonitorArray.push(obj);
};

function removeLayoutMonitor(obj) {
  var i = layoutMonitorArray.indexOf(obj);
  if (i != -1) layoutMonitorArray.splice(i, 1);
};

function initLayoutMonitorState() {
  for (var i = 0; i < layoutMonitorArray.length; i++) {
    if (layoutMonitorArray[i].scrollHeight == layoutMonitorArray[i].offsetHeight) layoutMonitorArray[i].vScroll = false;
    else layoutMonitorArray[i].vScroll = true;
  }
};

function executeLayoutMonitor() {
  for (var i = 0; i < layoutMonitorArray.length; i++) {
    if (layoutMonitorArray[i].vScroll == null) return;
    if (layoutMonitorArray[i].scrollHeight == layoutMonitorArray[i].offsetHeight) {
      if (layoutMonitorArray[i].vScroll == true) {
        layoutInitFunc();
        return;
      }
    } else {
      if (layoutMonitorArray[i].vScroll == false) {
        layoutInitFunc();
        return;
      }
    }
  }
};

var EventContextConstant = new Object;
EventContextConstant.eventcontext = "e";
EventContextConstant.parentcontext = "pe";
EventContextConstant.params = "ps";
EventContextConstant.groupparams = "gps";
EventContextConstant.param = "p";
EventContextConstant.key = "k";
EventContextConstant.value = "v";
EventContextConstant.context = "c";
EventContextConstant.changedcontext = "cc";
EventContextConstant.attributes = "as";
EventContextConstant.attribute = "a";
EventContextConstant.res_parameters = "dsps";
EventContextConstant.req_parameters = "dqps";
EventContextConstant.parameter = "dp";
EventContextConstant.NULL = "。";
EventContextConstant.records = "rs";
EventContextConstant.record = "r";
EventContextConstant.erecord = "er";
EventContextConstant.drecord = "dr";
ServerProxy.PROXY_ARRAY = new Array();
ServerProxy.PROXYRETURN_EXECUTING = 0;
ServerProxy.PROXYLIST_EXECUTING = false;
PageUI.prototype = new ListenerUtil;

function PageUI(title) {
  ListenerUtil.call(this, true);
  this.title = title;
  this.widgetMap = new HashMap();
  this.dialogMap = new HashMap();
  this.connMap = new HashMap();
  this.attributeMap = new HashMap();
  this.cardMap = new HashMap();
  this.tabMap = new HashMap();
  this.panelMap = new HashMap();
  this.hasChanged = false;
  this.exParams = new HashMap();
  this.plugOutMap = new HashMap();
  this.PROXY_ARRAY = new Array();
  this.PROXYRETURN_EXECUTING = 0;
  this.PROXYLIST_EXECUTING = false;
};
getProxyArray = function() {
  if (typeof(pageUI) != 'undefined') return pageUI.PROXY_ARRAY;
  else return ServerProxy.PROXY_ARRAY;
};
getProxyReturnExecuting = function() {
  if (typeof(pageUI) != 'undefined') return pageUI.PROXYRETURN_EXECUTING;
  else return ServerProxy.PROXYRETURN_EXECUTING;
};
proxyReturnExecutingAdd = function() {
  if (typeof(pageUI) != 'undefined') pageUI.PROXYRETURN_EXECUTING++;
  else ServerProxy.PROXYRETURN_EXECUTING++;
};
proxyReturnExecutingSub = function() {
  if (typeof(pageUI) != 'undefined') pageUI.PROXYRETURN_EXECUTING--;
  else ServerProxy.PROXYRETURN_EXECUTING--;
};
getProxyListExecuting = function() {
  if (typeof(pageUI) != 'undefined') return pageUI.PROXYLIST_EXECUTING;
  else return ServerProxy.PROXYLIST_EXECUTING;
};
setProxyListExecuting = function(executing) {
  if (typeof(pageUI) != 'undefined') pageUI.PROXYLIST_EXECUTING = executing;
  else ServerProxy.PROXYLIST_EXECUTING = executing;
};
PageUI.prototype.getContext = function(submitRule) {
  var context = new Object;
  context.c = "PageUIContext";
  context.hasChanged = this.hasChanged;
  var contextXmlArray = new Array();
  contextXmlArray.push("<" + EventContextConstant.context + ">");
  contextXmlArray.push(toJSON(context));
  contextXmlArray.push("</" + EventContextConstant.context + ">");
  if (submitRule != null) {
    var widgets = this.widgetMap.values();
    if (widgets != null && widgets.length > 0) {
      for (var i = 0; i < widgets.length; i++) {
        var widget = widgets[i];
        if (widget.id == null) continue;
        contextXmlArray.push("<widget id=\"" + widget.id + "\">");
        var widgetRule = submitRule.getWidgetRule(widget.id);
        contextXmlArray.push(widget.getContext(widgetRule));
        contextXmlArray.push("</widget>");
      }
    }
  }
  return contextXmlArray.join("");
};
PageUI.prototype.getChangedContext = function() {
  var context = new Object;
  context.hasChanged = this.hasChanged;
  var widgets = this.widgetMap.values();
  if (widgets != null && widgets.length > 0) {
    for (var i = 0; i < widgets.length; i++) {
      var widget = widgets[i];
      if (widget.id == null) continue;
      var ctx = null;
      ctx = widget.getChangedContext();
      if (ctx == null) continue;
      if (context["widgets"] == null) context["widgets"] = new Array();
      context["widgets"].push(ctx);
    }
  }
  return context;
};
PageUI.prototype.setChangedContext = function(context) {
  if (context == null) return;
  if (typeof(context.hasChanged) != 'undefined') {
    this.setChanged(context.hasChanged);
  }
  if (typeof(context.widgets) != 'undefined') {
    var widgets = context.widgets;
    for (var i = 0; i < widgets.length; i++) {
      var widgetCtx = widgets[i];
      var widget = this.getWidget(widgetCtx.id);
      if (widget != null) widget.setChangedContext(widgetCtx);
    }
  }
};
PageUI.prototype.addWidget = function(widget) {
  this.widgetMap.put(widget.id, widget);
};
PageUI.prototype.removeWidget = function(id) {
  var widget = this.widgetMap.remove(id);
  if (widget != null) {
    widget.destroySelf();
    widget = null;
  }
};
PageUI.prototype.getWidget = function(widgetId) {
  return this.widgetMap.get(widgetId);
};
PageUI.prototype.getWidgets = function() {
  return this.widgetMap.values();
};
PageUI.prototype.addDialog = function(id, dialog) {
  this.dialogMap.put(id, dialog);
};
PageUI.prototype.removeDialog = function(id) {
  var dialog = this.dialogMap.remove(id);
  if (dialog != null) {}
};
PageUI.prototype.getDialog = function(id) {
  return this.dialogMap.get(id);
};
PageUI.prototype.getDialogs = function() {
  return this.dialogMap.values();
};
PageUI.prototype.addAttribute = function(name, value) {
  this.attributeMap.put(name, value);
};
PageUI.prototype.getAttribute = function(name) {
  return this.attributeMap.get(name);
};
PageUI.prototype.addConnector = function(conn) {
  var arr = this.connMap.get(conn.source);
  if (arr == null) {
    arr = new Array;
    this.connMap.put(conn.source, arr);
  }
  arr.push(conn);
};
PageUI.prototype.getConnectors = function(source, signal) {
  var arr = this.connMap.get(source);
  if (arr == null) return null;
  var connArr = new Array;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].signal == signal) connArr.push(arr[i]);
  }
  return connArr;
};
PageUI.prototype.$beforePageInit = function() {
  this.doEventFunc("beforePageInit");
  adjustContainerFramesHeight(true);
};
PageUI.prototype.$afterPageInit = function() {
  var widgets = this.getWidgets();
  if (widgets != null && widgets.length > 0) {
    for (var i = 0; i < widgets.length; i++) {
      widgets[i].onBeforeShow();
    }
  }
  this.doEventFunc("afterPageInit");
  adjustContainerFramesHeight(true);
};
PageUI.prototype.$beforeInitData = function() {
  var wds = this.getWidgets();
  for (var i = 0; i < wds.length; i++) {
    wds[i].$beforeInitData();
  }
};
PageUI.prototype.destroySelf = function() {
  var widgets = pageUI.getWidgets();
  for (var i = 0, n = widgets.length; i < n; i++) {
    widgets[i].destroySelf();
  }
  this.widgetMap.clear();
  this.widgetMap = null;
  this.dialogMap.clear();
  this.dialogMap = null;
  this.connMap.clear();
  this.connMap = null;
  this.attributeMap.clear();
  this.attributeMap = null;
  this.cardMap.clear();
  this.cardMap = null;
  this.tabMap.clear();
  this.tabMap = null;
  this.panelMap.clear();
  this.panelMap = null;
  this.exParams.clear();
  this.exParams = null;
  this.plugOutMap.clear();
  this.plugOutMap = null;
  for (var i in this) {
    this[i] = null;
  }
};
PageUI.prototype.updateInitedWidgets = function() {
  this.$beforeInitData();
};
PageUI.prototype.$externalInit = function() {
  this.doEventFunc("externalInit");
};
PageUI.prototype.$beforeActive = function() {
  this.doEventFunc("beforeActive");
};
PageUI.prototype.$onClosing = function() {
  return this.doEventFunc("onClosing");
};
PageUI.prototype.$onClosed = function() {
  this.doEventFunc("onClosed");
};
PageUI.prototype.beforeDialogClose = function() {
  var result = this.doEventFunc("beforeDialogClose");
  if (result === false) return false;
  return true;
};
PageUI.prototype.onerror = function(msg, url, line) {
  showMessageDialog(msg);
};
PageUI.prototype.addTab = function(tab) {
  this.tabMap.put(tab.id, tab);
};
PageUI.prototype.getTab = function(id) {
  return this.tabMap.get(id);
};
PageUI.prototype.addCard = function(card) {
  this.cardMap.put(card.id, card);
};
PageUI.prototype.getCard = function(id) {
  return this.cardMap.get(id);
};
PageUI.prototype.addPanel = function(panel) {
  this.panelMap.put(panel.id, panel);
};
PageUI.prototype.getPanel = function(id) {
  return this.panelMap.get(id);
};
PageUI.prototype.removePanel = function(id) {
  this.panelMap.remove(id);
};
PageUI.prototype.getPlugOut = function(id) {
  return this.plugOutMap.get(id);
};
PageUI.prototype.addPlugOut = function(plugout) {
  this.plugOutMap.put(plugout.id, plugout);
};
PageUI.prototype.showCloseConfirm = function(obj) {
  if (this.hasChanged == true) {
    var topWin = getLfwTop();
    if (topWin == null) topWin = getTrueParent();
    if (!window.SaveAndExit) {
      topWin.require("confirmdialog", function() {
        topWin.ConfirmDialogComp.showDialog(trans("ml_confirm_close_dialog"), PageUI.okClose, null, obj, null)
      });
      return false;
    } else {
      topWin.require("threebuttondialog", function() {
        topWin.ThreeButtonsDialog.showDialog(trans("ml_confirm_save_dialog"), window.SaveAndExit, null, PageUI.okClose, [trans("ml_save"), trans("ml_does_not_save"), trans("ml_cancel")], obj)
      });
      return false;
    }
  } else {
    return true;
  }
};
PageUI.okClose = function(obj) {
  obj.onClosing();
  obj.hide();
  obj.onAfterClose();
};
PageUI.prototype.closeSilent = function(obj) {
  pageUI.hasChanged = false;
  closeWinWithNoWarn();
};
PageUI.prototype.toClose = function() {
  var result = this.$onClosing();
  if (result == false) return false;
  else this.$onClosed();
};
PageUI.prototype.setChanged = function(hasChanged) {
  this.hasChanged = hasChanged;
};
PageUI.prototype.hasChanged = function() {
  return this.hasChanged;
};

function Connector(id, source, target, signal, slot) {
  this.id = id;
  this.source = source;
  this.target = target;
  this.signal = signal;
  this.slot = slot;
};

function SubmitRule() {
  this.widgetRuleMap = null;
  this.tabSubmit = false;
  this.cardSubmit = false;
  this.panelSubmit = false;
  this.parentSubmitRule = null;
  this.paramMap = null;
};
SubmitRule.prototype.clone = function() {
  var submitRule = new SubmitRule();
  if (this.widgetRuleMap != null) {
    var keys = this.widgetRuleMap.keySet();
    if (keys != null) {
      for (var i = 0; i < keys.length; i++) {
        var widgetRule = this.widgetRuleMap.get(keys[i]).clone();
        submitRule.addWidgetRule(keys[i], widgetRule);
      }
    }
  }
  if (this.parentSubmitRule != null) {
    var parentSubmitRule = this.parentSubmitRule.clone();
    submitRule.setParentSubmitRule(parentSubmitRule);
  }
  if (this.paramMap != null) {
    var keys = this.paramMap.keySet();
    if (keys != null) {
      for (var i = 0; i < keys.length; i++) {
        var value = this.paramMap.get(keys[i]);
        submitRule.addParam(keys[i], value);
      }
    }
  }
  return submitRule;
};
SubmitRule.prototype.addParam = function(key, value) {
  if (this.paramMap == null) this.paramMap = new HashMap();
  this.paramMap.put(key, value);
};
SubmitRule.prototype.getParamMap = function() {
  return this.paramMap;
};
SubmitRule.prototype.setParentSubmitRule = function(submitRule) {
  this.parentSubmitRule = submitRule;
};
SubmitRule.prototype.addWidgetRule = function(id, widgetRule) {
  if (this.widgetRuleMap == null) this.widgetRuleMap = new HashMap;
  this.widgetRuleMap.put(id, widgetRule);
};
SubmitRule.prototype.getWidgetRule = function(id) {
  if (this.widgetRuleMap == null) return null;
  return this.widgetRuleMap.get(id);
};
SubmitRule.prototype.setTabSubmit = function(submit) {
  this.tabSubmit = submit;
};
SubmitRule.prototype.getTabSubmit = function() {
  return this.tabSubmit;
};
SubmitRule.prototype.setCardSubmit = function(submit) {
  this.cardSubmit = submit;
};
SubmitRule.prototype.getCardSubmit = function() {
  return this.cardSubmit;
};
SubmitRule.prototype.setPanelSubmit = function(submit) {
  this.panelSubmit = submit;
};
SubmitRule.prototype.getPanelSubmit = function() {
  return this.panelSubmit;
};

function WidgetRule(id) {
  this.id = id;
  this.dsRuleMap = null;
  this.treeRuleMap = null;
  this.gridRuleMap = null;
  this.tabSubmit = false;
  this.cardSubmit = false;
  this.panelSubmit = false;
};
WidgetRule.prototype.clone = function() {
  var widgetRule = new WidgetRule(this.id);
  if (this.dsRuleMap != null) {
    var keys = this.dsRuleMap.keySet();
    if (keys != null) {
      for (var i = 0; i < keys.length; i++) {
        var dsRule = this.dsRuleMap.get(keys[i]);
        if (dsRule) {
          dsRule = dsRule.clone();
          widgetRule.addDsRule(keys[i], dsRule);
        }
      }
    }
  }
  if (this.treeRuleMap != null) {
    var keys = this.treeRuleMap.keySet();
    if (keys != null) {
      for (var i = 0; i < keys.length; i++) {
        var treeRule = this.treeRuleMap.get(keys[i]);
        if (treeRule) {
          treeRule = treeRule.clone();
          widgetRule.addTreeRule(keys[i], treeRule);
        }
      }
    }
  }
  return widgetRule;
};
WidgetRule.prototype.addDsRule = function(id, dsRule) {
  if (this.dsRuleMap == null) this.dsRuleMap = new HashMap();
  this.dsRuleMap.put(id, dsRule);
};
WidgetRule.prototype.removeDsRule = function(id) {
  if (this.dsRuleMap == null) return;
  this.dsRuleMap.remove(id);
};
WidgetRule.prototype.setTabSubmit = function(submit) {
  this.tabSubmit = submit;
};
WidgetRule.prototype.getTabSubmit = function() {
  return this.tabSubmit;
};
WidgetRule.prototype.setCardSubmit = function(submit) {
  this.cardSubmit = submit;
};
WidgetRule.prototype.getCardSubmit = function() {
  return this.cardSubmit;
};
WidgetRule.prototype.setPanelSubmit = function(submit) {
  this.panelSubmit = submit;
};
WidgetRule.prototype.getPanelSubmit = function() {
  return this.panelSubmit;
};
WidgetRule.prototype.getId = function() {
  return this.id;
};
WidgetRule.prototype.addGridRule = function(id, grid) {
  if (this.gridRuleMap == null) this.gridRuleMap = new HashMap();
  this.gridRuleMap.put(id, grid);
};
WidgetRule.prototype.getGridRule = function(id) {
  if (this.gridRuleMap == null) return null;
  return this.gridRuleMap.get(id);
};
WidgetRule.prototype.addTreeRule = function(id, tree) {
  if (this.treeRuleMap == null) this.treeRuleMap = new HashMap();
  this.treeRuleMap.put(id, tree);
};
WidgetRule.prototype.getTreeRule = function(id) {
  if (this.treeRuleMap == null) return null;
  return this.treeRuleMap.get(id);
};
WidgetRule.prototype.getDsRule = function(id) {
  if (this.dsRuleMap == null) return null;
  return this.dsRuleMap.get(id);
};
WidgetRule.prototype.getFormRule = function(id) {
  if (this.formRuleMap == null) return null;
  return this.formRuleMap.get(id);
};
WidgetRule.prototype.addFormRule = function(id, form) {
  if (this.formRuleMap == null) this.formRuleMap = new HashMap();
  this.formRuleMap.put(id, form);
};

function DatasetRule(id, type) {
  this.id = id;
  this.type = type;
};
DatasetRule.prototype.clone = function() {
  var dsRule = new DatasetRule(this.id, this.type);
  return dsRule;
};
DatasetRule.prototype.getId = function() {
  return this.id;
};
DatasetRule.prototype.getType = function() {
  return this.type;
};

function TreeRule(id, type) {
  this.id = id;
  this.type = type;
};
TreeRule.prototype.clone = function() {
  var treeRule = new TreeRule(this.id, this.type);
  return treeRule;
};
TreeRule.prototype.getId = function() {
  return this.id;
};
TreeRule.prototype.getType = function() {
  return this.type;
};

function GridRule(id, type) {
  this.id = id;
  this.type = type;
};
GridRule.prototype.getId = function() {
  return this.id;
};
GridRule.prototype.getType = function() {
  return this.type;
};

function FormRule(id, type) {
  this.id = id;
  this.type = type;
};
FormRule.prototype.getId = function() {
  return this.id;
};
FormRule.prototype.getType = function() {
  return this.type;
};

function ServerProxy(listener, eventName, async) {
  this.params = new HashMap();
  this.returnParams = new HashMap();
  this.returnFunc = null;
  this.submitRule = null;
  this.eventName = eventName;
  this.listener = listener;
  this.async = async;
  this.nmc = true;
};
ServerProxy.prototype.destroySelf = function() {
  this.submitRule = null;
  this.params = null;
  this.returnFunc = null;
  this.eventName = null;
  this.listener = null;
};
ServerProxy.prototype.setNmc = function(nmc) {
  this.nmc = nmc;
};
ServerProxy.prototype.setAsync = function(async) {
  this.async = async;
};
ServerProxy.prototype.setParamMap = function(paramsMap) {
  this.params = paramsMap;
};
ServerProxy.prototype.addParam = function(key, value) {
  this.params.put(key, value);
};
ServerProxy.prototype.setSubmitRule = function(submitRule) {
  this.submitRule = submitRule;
};
ServerProxy.prototype.setReturnArgs = function(returnArgs) {
  this.returnArgs = returnArgs;
};
ServerProxy.prototype.setReturnFunc = function(returnFunc) {
  this.returnFunc = returnFunc;
};
ServerProxy.prototype.getSubmitRule = function() {
  var useSubmitRule = this.submitRule;
  if (useSubmitRule == null && this.listener != null) {
    useSubmitRule = this.listener.submitRule;
  }
  if (useSubmitRule == null) useSubmitRule = new SubmitRule();
  this.submitRule = useSubmitRule;
  return this.submitRule;
};
ServerProxy.prototype.getParamString = function(useSubmitRule) {
  var contextXmlArray = new Array();
  contextXmlArray.push("<" + EventContextConstant.params + ">");
  if (this.listener != null) {
    if (this.listener.source_id != null) {
      contextXmlArray.push("<" + EventContextConstant.param + ">");
      contextXmlArray.push("<" + EventContextConstant.key + ">source_id</" + EventContextConstant.key + ">");
      contextXmlArray.push("<" + EventContextConstant.value + ">" + this.listener.source_id + "</" + EventContextConstant.value + ">");
      contextXmlArray.push("</" + EventContextConstant.param + ">");
    }
    if (this.listener.listener_id != null) {
      contextXmlArray.push("<" + EventContextConstant.param + ">");
      contextXmlArray.push("<" + EventContextConstant.key + ">listener_id</" + EventContextConstant.key + ">");
      contextXmlArray.push("<" + EventContextConstant.value + ">" + this.listener.listener_id + "</" + EventContextConstant.value + ">");
      contextXmlArray.push("</" + EventContextConstant.param + ">");
    }
    if (this.listener.widget_id != null) {
      contextXmlArray.push("<" + EventContextConstant.param + ">");
      contextXmlArray.push("<" + EventContextConstant.key + ">widget_id</" + EventContextConstant.key + ">");
      contextXmlArray.push("<" + EventContextConstant.value + ">" + this.listener.widget_id + "</" + EventContextConstant.value + ">");
      contextXmlArray.push("</" + EventContextConstant.param + ">");
    }
    if (this.eventName != null) {
      contextXmlArray.push("<" + EventContextConstant.param + ">");
      contextXmlArray.push("<" + EventContextConstant.key + ">event_name</" + EventContextConstant.key + ">");
      contextXmlArray.push("<" + EventContextConstant.value + ">" + this.eventName + "</" + EventContextConstant.value + ">");
      contextXmlArray.push("</" + EventContextConstant.param + ">");
    }
    if (this.listener.source_type != null) {
      contextXmlArray.push("<" + EventContextConstant.param + ">");
      contextXmlArray.push("<" + EventContextConstant.key + ">source_type</" + EventContextConstant.key + ">");
      contextXmlArray.push("<" + EventContextConstant.value + ">" + this.listener.source_type + "</" + EventContextConstant.value + ">");
      contextXmlArray.push("</" + EventContextConstant.param + ">");
    }
    if (this.listener.parent_source_id != null) {
      contextXmlArray.push("<" + EventContextConstant.param + ">");
      contextXmlArray.push("<" + EventContextConstant.key + ">parent_source_id</" + EventContextConstant.key + ">");
      contextXmlArray.push("<" + EventContextConstant.value + ">" + this.listener.parent_source_id + "</" + EventContextConstant.value + ">");
      contextXmlArray.push("</" + EventContextConstant.param + ">");
    }
  }
  if (this.params != null && this.params.size() > 0) {
    var keySet = this.params.keySet();
    var size = this.params.size();
    for (var i = 0; i < size; i++) {
      var key = keySet[i];
      var value = this.params.get(key);
      if (value == null) value = "";
      else if (typeof value == "string") {
        value = value.replace(/\&/g, "&amp;");
        value = value.replace(/\</g, "&lt;");
      }
      contextXmlArray.push("<" + EventContextConstant.param + ">");
      contextXmlArray.push("<" + EventContextConstant.key + ">" + key + "</" + EventContextConstant.key + ">");
      contextXmlArray.push("<" + EventContextConstant.value + ">" + value + "</" + EventContextConstant.value + ">");
      contextXmlArray.push("</" + EventContextConstant.param + ">");
    }
  }
  if (pageUI.hasChanged != null) {
    contextXmlArray.push("<" + EventContextConstant.param + ">");
    contextXmlArray.push("<" + EventContextConstant.key + ">hasChanged</" + EventContextConstant.key + ">");
    contextXmlArray.push("<" + EventContextConstant.value + ">" + pageUI.hasChanged + "</" + EventContextConstant.value + ">");
    contextXmlArray.push("</" + EventContextConstant.param + ">");
  }
  var paramMap = useSubmitRule.getParamMap();
  if (paramMap != null) {
    var keys = paramMap.keySet();
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = paramMap.get(key);
      if (value == null) value = getParameter(value);
      if (value == null) value = getSessionAttribute(value);
      if (value == null) value = "";
      contextXmlArray.push("<" + EventContextConstant.param + ">");
      contextXmlArray.push("<" + EventContextConstant.key + ">" + key + "</" + EventContextConstant.key + ">");
      contextXmlArray.push("<" + EventContextConstant.value + ">" + value + "</" + EventContextConstant.value + ">");
      contextXmlArray.push("</" + EventContextConstant.param + ">");
    }
  }
  contextXmlArray.push("</" + EventContextConstant.params + ">");
  return contextXmlArray.join("");
};
ServerProxy.prototype.getPageCtxStr = function(useSubmitRule) {
  var contextXmlArray = new Array;
  contextXmlArray.push(pageUI.getContext(useSubmitRule));
  return contextXmlArray.join("");
};
ServerProxy.prototype.getParentPageCtxStr = function(useSubmitRule) {
  if (useSubmitRule != null && useSubmitRule.parentSubmitRule != null) {
    var contextXmlArray = new Array;
    contextXmlArray.push("<" + EventContextConstant.parentcontext + ">");
    if (typeof(getTrueParent().getPageId) == "function") {
      contextXmlArray.push("<" + EventContextConstant.eventcontext + " id='" + getTrueParent().getPageId() + "'>");
    } else {
      contextXmlArray.push("<" + EventContextConstant.eventcontext + " id=''>");
    }
    if (typeof(getTrueParent().pageUI) != 'undefined' && getTrueParent().pageUI != null) {
      contextXmlArray.push(getTrueParent().pageUI.getContext(useSubmitRule.parentSubmitRule));
    }
    contextXmlArray.push("</" + EventContextConstant.eventcontext + ">");
    contextXmlArray.push("</" + EventContextConstant.parentcontext + ">");
    return contextXmlArray.join("");
  }
  return "";
};
ServerProxy.prototype.execute = function() {
  if (pageUI.exParams.size() > 0) {
    var keySet = pageUI.exParams.keySet();
    var size = pageUI.exParams.size();
    for (var i = 0; i < size; i++) {
      var key = keySet[i];
      var value = pageUI.exParams.get(key);
      this.addParam(key, value);
    }
    pageUI.exParams.clear();
  }
  if (getProxyReturnExecuting() > 0) {
    getProxyArray().push(this);
    setTimeout("ServerProxy.execServerProxyList()", 100);
    return;
  }
  if (getProxyArray().length > 0) {
    getProxyArray().push(this);
    ServerProxy.execServerProxyList();
    return;
  }
  proxyReturnExecutingAdd();
  var useSubmitRule = this.getSubmitRule();
  var contextXmlArray = new Array;
  contextXmlArray.push("<root><" + EventContextConstant.eventcontext + " id=\"" + getPageId() + "\">");
  contextXmlArray.push(this.getParamString(useSubmitRule));
  contextXmlArray.push(this.getPageCtxStr(useSubmitRule));
  contextXmlArray.push("<" + EventContextConstant.changedcontext + ">");
  contextXmlArray.push(toJSON(pageUI.getChangedContext()).replace(/\&/g, "&amp;").replace(/\</g, "&lt;"));
  contextXmlArray.push("</" + EventContextConstant.changedcontext + ">");
  contextXmlArray.push("</" + EventContextConstant.eventcontext + ">");
  contextXmlArray.push(this.getParentPageCtxStr(useSubmitRule));
  contextXmlArray.push("</root>");
  var contextXml = contextXmlArray.join("");
  var innerArgsList = [
    [this.returnArgs, this.returnFunc]
  ];
  showDefaultLoadingBar();
  clearChangedData();
  ServerProxy.proxyCall(contextXml, innerArgsList, this.async, this.nmc);
};
ServerProxy.compressRequest = function(contextXml) {
  return compress(contextXml);
};
ServerProxy.proxyCall = function(contextXml, innerArgsList, async, nmc) {
  var requestXml = "type=processEvent" + (nmc == false ? "&nonmc=1" : "") + "&xml=";
  var result = null;
  if (window.debugMode == null || window.debugMode == false) result = ServerProxy.compressRequest(contextXml);
  if (result == null) requestXml += encodeURIComponent(contextXml);
  else {
    requestXml += encodeURIComponent(result);
    requestXml += "&compress=1&compressl=" + contextXml.length;
  }
  var ajax = new Ajax();
  ajax.setPath(getCorePath());
  ajax.setQueryStr(requestXml);
  ajax.setReturnFunc(ServerProxy.$returnFun);
  ajax.setReturnArgs(innerArgsList);
  return ajax.post(async == null ? true : async, true);
};
ServerProxy.$returnFun = function(xmlHttpReq, returnArgsList, exception, ajaxObj) {
  var execList = [];
  setReturning(true);
  try {
    if (handleException(xmlHttpReq, exception, returnArgsList, ajaxObj)) {
      var userArgs = returnArgsList[0][0];
      var doc = xmlHttpReq.responseXML;
      var rootNode = doc.documentElement;
      var contentsNode = rootNode.selectSingleNode("contents");
      var contentNodes = contentsNode.selectNodes("content");
      var result = true;
      if (contentNodes != null) {
        for (var i = 0, count = contentNodes.length; i < count; i++) {
          var content = getNodeValue(contentNodes[i]);
          content = content.replaceAll("<CD>", "<![CDATA[");
          content = content.replaceAll("</CD>", "]]>");
          var resultDoc = createXmlDom(content);
          var eventContextNode = resultDoc.documentElement;
          var isPlug = eventContextNode.selectSingleNode("isPlug");
          if (isPlug != null && (isPlug.text == "true" || isPlug.textContent == "true") && window.isPopView != null && window.isPopView == true) {
            if (getTrueParent().ServerProxy) {
              content = getTrueParent().ServerProxy.$updateCtx(eventContextNode, userArgs, false);
            } else {
              content = ServerProxy.$updateCtx(eventContextNode, userArgs, false);
            }
          } else content = ServerProxy.$updateCtx(eventContextNode, userArgs, false);
          var afterExecNode = eventContextNode.selectSingleNode("afterExec");
          if (afterExecNode != null) {
            var script = getNodeValue(afterExecNode);
            if (script != null && script != "") {
              execList.push(script);
            }
          }
        }
      }
      for (var i = 0; i < returnArgsList.length - 1; i++) {
        var args = returnArgsList[i];
        var returnFunc = args[1];
        var userArg = args[0];
        if (returnFunc != null) returnFunc.call(this, userArg, true);
      }
      for (var i = 0; i < execList.length; i++) {
        if (typeof execList[i] != "undefined") eval(execList[i]);
      }
      hideDefaultLoadingBar();
      return result;
    }
    hideDefaultLoadingBar();
  } catch (e) {
    Logger.error(e);
  } finally {
    setReturning(false);
    proxyReturnExecutingSub();
    adjustContainerFramesHeight();
  }
};
ServerProxy.wrapProxy = function(proxy) {
  if (pageUI.exParams.size() > 0) {
    var keySet = pageUI.exParams.keySet();
    var size = pageUI.exParams.size();
    for (var i = 0; i < size; i++) {
      var key = keySet[i];
      var value = pageUI.exParams.get(key);
      proxy.addParam(key, value);
    }
  }
  if (ServerProxy.suspend) {
    getProxyArray().push(proxy);
  } else {
    ServerProxy.cleanProxy();
  }
};
ServerProxy.cleanProxy = function() {
  ServerProxy.suspend = false;
  ServerProxy.execServerProxyList();
};
ServerProxy.execServerProxyList = function() {
  if (getProxyListExecuting() == true) {
    setTimeout("ServerProxy.execServerProxyList()", 100);
    return;
  }
  setProxyListExecuting(true);
  try {
    ServerProxy.aggregateProxyRequest();
  } finally {
    setProxyListExecuting(false);
  }
};
ServerProxy.aggregateProxyRequest = function() {
  if (getProxyReturnExecuting() > 0) {
    setTimeout("ServerProxy.execServerProxyList()", 100);
    return;
  }
  proxyReturnExecutingAdd();
  var count = getProxyArray().length;
  if (count == 0) {
    proxyReturnExecutingSub();
    return;
  }
  var submitRules = [];
  var paramList = [];
  var innerArgsList = [];
  var async = true;
  var i = 0;
  var nmc = true;
  while (getProxyArray().length > 0) {
    var proxy = getProxyArray()[0];
    if (proxy.nmc == false) nmc = false;
    var rule = proxy.getSubmitRule();
    var arr = [];
    var args = proxy.returnArgs;
    var func = proxy.returnFunc;
    if (innerArgsList.length == 0 || (args == null && func == null)) {
      submitRules.push(rule);
      paramList[i] = proxy.getParamString(rule);
      arr.push(args);
      arr.push(func);
      getProxyArray().splice(0, 1);
      innerArgsList[i] = arr;
      async = (async && proxy.async);
      proxy.destroySelf();
    } else {
      break;
    }
    i++;
  }
  var useSubmitRule = ServerProxy.mergeSubmitRules(submitRules);
  var contextXmlArray = new Array;
  contextXmlArray.push("<root><" + EventContextConstant.eventcontext + " id=\"" + getPageId() + "\">");
  contextXmlArray.push("<" + EventContextConstant.groupparams + ">");
  for (var i = 0; i < count; i++) {
    contextXmlArray.push(paramList[i]);
  }
  contextXmlArray.push("</" + EventContextConstant.groupparams + ">");
  contextXmlArray.push(pageUI.getContext(useSubmitRule));
  contextXmlArray.push("<" + EventContextConstant.changedcontext + ">");
  contextXmlArray.push(toJSON(pageUI.getChangedContext()).replace(/\&/g, "&amp;").replace(/\</g, "&lt;"));
  contextXmlArray.push("</" + EventContextConstant.changedcontext + ">");
  contextXmlArray.push("</" + EventContextConstant.eventcontext + ">");
  if (useSubmitRule != null && useSubmitRule.parentSubmitRule != null) {
    contextXmlArray.push("<" + EventContextConstant.parentcontext + ">");
    if (typeof(getTrueParent().getPageId) == "function") {
      contextXmlArray.push("<" + EventContextConstant.eventcontext + " id='" + getTrueParent().getPageId() + "'>");
    } else {
      contextXmlArray.push("<" + EventContextConstant.eventcontext + " id=''>");
    }
    if (typeof(getTrueParent().pageUI) != 'undefined' && getTrueParent().pageUI != null) {
      contextXmlArray.push(getTrueParent().pageUI.getContext(useSubmitRule.parentSubmitRule));
    }
    contextXmlArray.push("</" + EventContextConstant.eventcontext + ">");
    contextXmlArray.push("</" + EventContextConstant.parentcontext + ">");
  }
  contextXmlArray.push("</root>");
  var contextXml = contextXmlArray.join("");
  showDefaultLoadingBar();
  if (getProxyArray().length > 0) ServerProxy.execServerProxyList();
  clearChangedData();
  ServerProxy.proxyCall(contextXml, innerArgsList, async, nmc);
};
ServerProxy.mergeSubmitRules = function(rules) {
  var submitRule = new SubmitRule();
  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i].clone();
    ServerProxy.mergeSubmitRule(submitRule, rule);
  }
  return submitRule;
};
ServerProxy.mergeSubmitRule = function(targetSubmitRule, sourceSubmitRule) {
  if (sourceSubmitRule == null) return;
  if (sourceSubmitRule.tabSubmit == true) targetSubmitRule.tabSubmit = true;
  if (sourceSubmitRule.cardSubmit == true) targetSubmitRule.cardSubmit = true;
  if (sourceSubmitRule.panelSubmit == true) targetSubmitRule.panelSubmit = true;
  if (targetSubmitRule.widgetRuleMap == null && sourceSubmitRule.widgetRuleMap != null) targetSubmitRule.widgetRuleMap = sourceSubmitRule.widgetRuleMap;
  else if (sourceSubmitRule.widgetRuleMap != null) {
    var keys = sourceSubmitRule.widgetRuleMap.keySet();
    if (keys != null) {
      for (var i = 0; i < keys.length; i++) {
        var sourceWidgetRule = sourceSubmitRule.widgetRuleMap.get(keys[i]);
        if (sourceWidgetRule == null) continue;
        var targetWidgetRule = targetSubmitRule.widgetRuleMap.get(keys[i]);
        if (targetWidgetRule != null) ServerProxy.mergeWidgetRule(targetWidgetRule, sourceWidgetRule);
        else targetSubmitRule.addWidgetRule(sourceWidgetRule.getId(), sourceWidgetRule);
      }
    }
  }
  if (targetSubmitRule.parentSubmitRule == null && sourceSubmitRule.parentSubmitRule != null) targetSubmitRule.parentSubmitRule = sourceSubmitRule.parentSubmitRule.clone();
  else if (sourceSubmitRule.parentSubmitRule != null) {
    ServerProxy.mergeSubmitRule(targetSubmitRule.parentSubmitRule, sourceSubmitRule.parentSubmitRule.clone());
  }
};
ServerProxy.mergeWidgetRule = function(targetWidgetRule, sourceWidgetRule) {
  if (sourceWidgetRule == null) return;
  if (sourceWidgetRule.tabSubmit == true) targetWidgetRule.tabSubmit = true;
  if (sourceWidgetRule.cardSubmit == true) targetWidgetRule.cardSubmit = true;
  if (sourceWidgetRule.panelSubmit == true) targetWidgetRule.panelSubmit = true;
  if (targetWidgetRule.dsRuleMap == null) targetWidgetRule.dsRuleMap = sourceWidgetRule.dsRuleMap;
  else if (sourceWidgetRule.dsRuleMap != null) {
    var keys = sourceWidgetRule.dsRuleMap.keySet();
    if (keys != null) {
      for (var i = 0; i < keys.length; i++) {
        var sourceDsRule = sourceWidgetRule.dsRuleMap.get(keys[i]);
        if (sourceDsRule == null) continue;
        var targetDsRule = targetWidgetRule.dsRuleMap.get(keys[i]);
        if (targetDsRule != null) ServerProxy.mergeDsRule(targetDsRule, sourceDsRule);
        else targetWidgetRule.addDsRule(sourceDsRule.getId(), sourceDsRule);
      }
    }
  }
  if (targetWidgetRule.treeRuleMap == null) targetWidgetRule.treeRuleMap = sourceWidgetRule.treeRuleMap;
  else if (sourceWidgetRule.treeRuleMap != null) {
    var keys = sourceWidgetRule.treeRuleMap.keySet();
    if (keys != null) {
      for (var i = 0; i < keys.length; i++) {
        var sourceTreeRule = sourceWidgetRule.treeRuleMap.get(keys[i]);
        if (sourceTreeRule == null) continue;
        var targetTreeRule = targetWidgetRule.treeRuleMap.get(keys[i]);
        if (targetTreeRule != null) ServerProxy.mergeTreeRule(targetTreeRule, sourceTreeRule);
        else targetWidgetRule.addTreeRule(sourceTreeRule.getId(), sourceTreeRule);
      }
    }
  }
  if (targetWidgetRule.gridRuleMap == null) targetWidgetRule.gridRuleMap = sourceWidgetRule.gridRuleMap;
  else if (sourceWidgetRule.gridRuleMap != null) {
    var keys = sourceWidgetRule.gridRuleMap.keySet();
    if (keys != null) {
      for (var i = 0; i < keys.length; i++) {
        var sourceGridRule = sourceWidgetRule.gridRuleMap.get(keys[i]);
        if (sourceGridRule == null) continue;
        var targetGridRule = targetWidgetRule.gridRuleMap.get(keys[i]);
        if (targetGridRule != null) ServerProxy.mergeGridRule(targetGridRule, sourceGridRule);
        else targetWidgetRule.addGridRule(sourceGridRule.getId(), sourceGridRule);
      }
    }
  }
  if (targetWidgetRule.formRuleMap == null) targetWidgetRule.formRuleMap = sourceWidgetRule.formRuleMap;
  else if (sourceWidgetRule.formRuleMap != null) {
    var keys = sourceWidgetRule.formRuleMap.keySet();
    if (keys != null) {
      for (var i = 0; i < keys.length; i++) {
        var sourceFormRule = sourceWidgetRule.formRuleMap.get(keys[i]);
        if (sourceFormRule == null) continue;
        var targetFormRule = targetWidgetRule.formRuleMap.get(keys[i]);
        if (targetFormRule != null) ServerProxy.mergeFormRule(targetFormRule, sourceFormRule);
        else targetWidgetRule.addFormRule(sourceFormRule.getId(), sourceFormRule);
      }
    }
  }
};
ServerProxy.mergeDsRule = function(targetDsRule, sourceDsRule) {
  var targetRuleValue = ServerProxy.getDsRuleValue(targetDsRule.type);
  var sourceRuleValue = ServerProxy.getDsRuleValue(sourceDsRule.type);
  if (targetRuleValue < sourceRuleValue) targetDsRule.type = sourceDsRule.type;
  else if (targetRuleValue == sourceRuleValue && targetDsRule.type != sourceDsRule.type) targetDsRule.type = "ds_all_line";
};
ServerProxy.getDsRuleValue = function(type) {
  if (type = "ds_current_line") return 0;
  else if (type = "ds_current_key") return 1;
  else if (type = "ds_current_page") return 1;
  else if (type = "ds_all_sel_line") return 1;
  else if (type = "ds_all_line") return 2;
  else return -1;
};
ServerProxy.mergeTreeRule = function(targetTreeRule, sourceTreeRule) {
  var targetRuleValue = ServerProxy.getTreeRuleValue(targetTreeRule.type);
  var sourceRuleValue = ServerProxy.getTreeRuleValue(sourceTreeRule.type);
  if (targetRuleValue < sourceRuleValue) targetTreeRule.type = sourceTreeRule.type;
};
ServerProxy.getTreeRuleValue = function(type) {
  if (type = "tree_current_parent") return 0;
  else if (type = "tree_current_parent_children") return 1;
  else if (type = "tree_all") return 2;
  else return -1;
};
ServerProxy.mergeGridRule = function(targetGridRule, sourceGridRule) {
  var targetRuleValue = ServerProxy.getGridRuleValue(targetGridRule.type);
  var sourceRuleValue = ServerProxy.getGridRuleValue(sourceGridRule.type);
  if (targetRuleValue < sourceRuleValue) targetGridRule.type = sourceGridRule.type;
};
ServerProxy.getGridRuleValue = function(type) {
  if (type = "grid_current_row") return 0;
  else if (type = "grid_all_row") return 1;
  else return -1;
};
ServerProxy.mergeFormRule = function(targetFormRule, sourceFormRule) {
  var targetRuleValue = ServerProxy.getFormRuleValue(targetFormRule.type);
  var sourceRuleValue = ServerProxy.getFormRuleValue(sourceFormRule.type);
  if (targetRuleValue < sourceRuleValue) targetFormRule.type = sourceFormRule.type;
};
ServerProxy.getFormRuleValue = function(type) {
  if (type = "no_child") return 0;
  else if (type = "all_child") return 1;
  else return -1;
};
PageUI.prototype.handleHotKey = function(key) {
  var widgets = this.widgetMap.values();
  if (widgets != null && widgets.length > 0) {
    for (var i = 0; i < widgets.length; i++) {
      var widget = widgets[i];
      var comps = widget.getComponents();
      for (var j = 0, m = comps.length; j < m; j++) {
        var comp = comps[j];
        if (comp.componentType == "TOOLBAR" || comp.componentType == "BUTTON") {
          var obj = comp.handleHotKey(key);
          if (obj != null) return obj;
        }
      }
      var menus = widget.getMenus();
      for (var j = 0, m = menus.length; j < m; j++) {
        var menu = menus[j];
        var obj = menu.handleHotKey(key);
        if (obj != null) return obj;
      }
    }
  }
  return null;
};
ServerProxy.$updateCtx = function(eventContextNode, userArgs, isParent) {
  if (!window.pageUI) {
    return;
  }
  var nowUI = window.pageUI;
  if (isParent) {
    nowUI = getTrueParent().pageUI;
  }
  var result = true;
  var resultNode = eventContextNode.selectSingleNode("result");
  if (resultNode != null) {
    var rv = getNodeValue(resultNode);
    if (rv == "false") result = false;
  }
  var beforeExecNode = eventContextNode.selectSingleNode("beforeExec");
  if (beforeExecNode != null) {
    var script = getNodeValue(beforeExecNode);
    if (script != null && script != "") {
      eval(script);
    }
  }
  var attrNodes = eventContextNode.selectSingleNode(EventContextConstant.attributes);
  if (attrNodes != null) {
    var attrs = attrNodes.selectNodes(EventContextConstant.attribute);
    if (attrs != null && attrs.length > 0) {
      for (var i = 0; i < attrs.length; i++) {
        var node = attrs[i];
        var keyNode = node.selectSingleNode(EventContextConstant.key);
        var valueNode = node.selectSingleNode(EventContextConstant.value);
        var key = getNodeValue(keyNode);
        var value = getNodeValue(valueNode);
        setSessionAttribute(key, value);
      }
    }
  }
  var pagemeta = eventContextNode.selectSingleNode("pagemeta");
  var beforeExecNode = pagemeta.selectSingleNode("beforeExec");
  if (beforeExecNode != null) {
    var script = getNodeValue(beforeExecNode);
    if (script != null && script != "") {
      eval(script);
    }
  }
  var widgetNodes = pagemeta.selectNodes("widget");
  if (widgetNodes != null) {
    for (var k = 0; k < widgetNodes.length; k++) {
      var widgetNode = widgetNodes[k];
      var widgetId = getNodeAttribute(widgetNode, "id");
      var widget = nowUI.getWidget(widgetId);
      if (widget == null) continue;
      var childNodes = widgetNode.childNodes;
      if (childNodes != null) {
        for (var j = 0; j < childNodes.length; j++) {
          var child = childNodes[j];
          if (!IS_IE) {
            if (child.nodeName == "#text") continue;
          }
          if (child.nodeName == EventContextConstant.context) continue;
          if (child.nodeName == "dataset") {
            var dsId = getNodeAttribute(child, "id");
            var ds = widget.getDataset(dsId);
            if (ds == null) continue;
            var data = child.selectSingleNode("data");
            var dataXml = getNodeValue(data);
            ds.setData(dataXml, userArgs);
          }
        }
      }
    }
  }
  var changedJsonNode = pagemeta.selectSingleNode(EventContextConstant.changedcontext);
  if (changedJsonNode != null) {
    var contextStr = getNodeValue(changedJsonNode);
    if (contextStr != null && contextStr != "") {
      eval("var context = " + contextStr);
      nowUI.setChangedContext(context);
    }
  }
  var execNode = pagemeta.selectSingleNode("exec");
  if (execNode != null) {
    var script = getNodeValue(execNode);
    if (script != null && script != "") {
      eval(script);
    }
  }
  var execNode = eventContextNode.selectSingleNode("exec");
  if (execNode != null) {
    var script = getNodeValue(execNode);
    if (script != null && script != "") {
      eval(script);
    }
  }
  var pctx = eventContextNode.selectSingleNode(EventContextConstant.parentcontext);
  if (pctx != null) {
    var pctxResult = pctx.selectSingleNode(EventContextConstant.eventcontext);
    if (getTrueParent() != null) {
      getTrueParent().proxyReturnExecutingAdd();
      try {
        getTrueParent().ServerProxy.$updateCtx(pctxResult, null, false);
      } finally {
        getTrueParent().proxyReturnExecutingSub();
      }
    }
  }
  return result;
};

function triggerPlugout(widgetId, plugoutId) {
  var plugout = pageUI.getWidget(widgetId).getPlugOut(plugoutId);
  if (plugout == null) return;
  var proxy = new ServerProxy();
  proxy.addParam("widget_id", widgetId);
  proxy.addParam("plug", "1");
  proxy.addParam("plugsource", widgetId);
  proxy.addParam("plugid", plugoutId);
  proxy.addParam("plugtype", "view");
  if (plugout.submitRule != null) proxy.submitRule = plugout.submitRule;
  proxy.execute();
}

function triggerWinPlugout(plugoutId) {
  var plugout = pageUI.getPlugOut(plugoutId);
  if (plugout == null) return;
  var proxy = new ServerProxy();
  proxy.addParam("plug", "1");
  proxy.addParam("plugsource", pageUI.title);
  proxy.addParam("plugid", plugoutId);
  proxy.addParam("plugtype", "window");
  if (plugout.submitRule != null) proxy.submitRule = plugout.submitRule;
  proxy.execute();
}

function setReturning(returning) {
  if (window.pageUI != null) window.pageUI.isReturn = getBoolean(returning, false);
}

function clearChangedData() {
  if (!window.pageUI) {
    return;
  }
  var widgets = window.pageUI.getWidgets();
  if (widgets != null && widgets.length > 0) {
    for (var i = 0; i < widgets.length; i++) {
      widgets[i].clearChangedData();
    }
  }
};

function isReturning() {
  if (window.pageUI != null && window.pageUI.isReturn != null && window.pageUI.isReturn == true) return true;
  else return false;
}
$(function() {
  try {
    var lfwTop = getLfwTop() || window;
    lfwTop.preCompressContent();
  } catch (e) {}
});

function compressContent(content) {
  preCompressContent();
  if (window.compressObj) {
    try {
      return window.compressObj.compress(content);
    } catch (error) {
      return null;
    }
  }
  return null;
};

function preCompressContent() {
  if (window.compressObjSign == null) {
    window.compressObjSign = 1;
    var div = document.createElement("DIV");
    div.id = "compressDivContent";
    document.body.appendChild(div);
    try {
      var swfVersionStr = "0.0.0";
      var xiSwfUrlStr = "";
      var flashvars = {};
      var params = {};
      params.allowscriptaccess = "always";
      var attributes = {};
      attributes.id = "Compress";
      attributes.name = "Compress";
      attributes.align = "middle";
      swfobject.embedSWF("/lfw/frame/device_pc/script/ui/external/Compress.swf", "compressDivContent", "0", "0", swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
    } catch (e) {}
  }
};

Widget.prototype = new ListenerUtil;

function Widget(id, visible, dialog) {
  ListenerUtil.call(this, true);
  this.id = id;
  this.comps = new HashMap;
  this.dss = new HashMap;
  this.combodatas = new HashMap;
  this.refnodes = new HashMap;
  this.dsRelations = null;
  this.menuMap = new HashMap();
  this.cardMap = new HashMap();
  this.tabMap = new HashMap();
  this.panelMap = new HashMap();
  this.outlookMap = new HashMap();
  this.splitMap = new HashMap();
  this.plugOutMap = new HashMap();
  this.visible = visible;
  this.dialog = dialog;
  this.pageState = null;
  this.operateState = null;
};
Widget.prototype.addSplit = function(split) {
  this.splitMap.put(split.id, split);
};
Widget.prototype.getSplit = function(id) {
  return this.splitMap.get(id);
};
Widget.prototype.addTab = function(tab) {
  this.tabMap.put(tab.id, tab);
};
Widget.prototype.getTab = function(id) {
  return this.tabMap.get(id);
};
Widget.prototype.getTabs = function() {
  return this.tabMap.values();
};
Widget.prototype.addCard = function(card) {
  this.cardMap.put(card.id, card);
};
Widget.prototype.getCard = function(id) {
  return this.cardMap.get(id);
};
Widget.prototype.getCards = function() {
  return this.cardMap.values();
};
Widget.prototype.getPanel = function(id) {
  return this.panelMap.get(id);
};
Widget.prototype.getPanels = function() {
  return this.panelMap.values();
};
Widget.prototype.addPanel = function(panel) {
  this.panelMap.put(panel.id, panel);
};
Widget.prototype.addOutlook = function(outlook) {
  this.outlookMap.put(outlook.id, outlook);
};
Widget.prototype.getOutlook = function(id) {
  return this.outlookMap.get(id);
};
Widget.prototype.removePanel = function(id) {
  this.panelMap.remove(id);
};
Widget.prototype.getPlugOut = function(id) {
  return this.plugOutMap.get(id);
};
Widget.prototype.addPlugOut = function(plugout) {
  this.plugOutMap.put(plugout.id, plugout);
};
Widget.prototype.addMenu = function(menu) {
  this.menuMap.put(menu.id, menu);
};
Widget.prototype.getMenus = function() {
  return this.menuMap.values();
};
Widget.prototype.getMenu = function(id) {
  return this.menuMap.get(id);
};
Widget.prototype.setVisible = function(visible) {
  if (this.visible != visible) {
    this.visible = visible;
    if (this.dialog) {
      if (visible) {
        if (this.onBeforeShow() == false) {
          this.visible = !this.visible;
          return;
        }
        pageUI.getDialog(this.id).show();
      } else {
        var result = pageUI.getDialog(this.id).close();
        if (result == null || result == false) this.visible = !this.visible;
      }
    }
  }
  var dlgListener = new Listener("afterClose");
  var oThis = this;
  dlgListener.func = function(simpleEvent) {
    oThis.visible = false;
  };
  pageUI.getDialog(this.id).addListener(dlgListener);
  if (this.lazyInit) {
    this.lazyInit();
    this.lazyInit = null;
    this.$beforeInitData();
  }
  this.notifyChange(NotifyType.VISIBLE, this.visible);
};
Widget.prototype.onBeforeShow = function() {
  if (pageUI.renderDone) {
    var simpleEvent = {
      "obj": this
    };
    this.doEventFunc("beforeShow", simpleEvent);
  }
};
Widget.prototype.onclose = function() {
  this.doEventFunc("onclose");
};
Widget.prototype.getUserStateMap = function() {};
Widget.prototype.destroySelf = function() {
  var dss = this.getDatasets();
  for (var i = 0; i < dss.length; i++) {
    var ds = this.removeDataset(dss[i].id);
    ds.destroySelf();
  }
  var comps = this.getComponents();
  for (var i = 0; i < comps.length; i++) {
    var comp = this.removeComponent(comps[i].id);
    comp.destroySelf();
  }
  var panels = this.getPanels();
  for (var i = 0; i < panels.length; i++) {
    var panel = panels[i];
    panel.destroySelf();
  }
  var menus = this.getMenus();
  for (var i = 0; i < menus.length; i++) {
    var menu = menus[i];
    menu.destroySelf();
  }
  this.clearListenerMap();
  this.comps.clear();
  this.comps = null;
  this.dss.clear();
  this.dss = null;
  this.combodatas.clear();
  this.combodatas = null;
  this.refnodes.clear();
  this.refnodes = null;
  if (this.dsRelations != null) {
    this.dsRelations.destroySelf();
    this.dsRelations = null;
  }
  this.menuMap.clear();
  this.menuMap = null;
  this.cardMap.clear();
  this.cardMap = null;
  this.tabMap.clear();
  this.tabMap = null;
  this.panelMap.clear();
  this.panelMap = null;
  this.outlookMap.clear();
  this.outlookMap = null;
  this.splitMap.clear();
  this.splitMap = null;
  this.plugOutMap.clear();
  this.plugOutMap = null;
  for (var i in this) {
    this[i] = null;
  }
};
Widget.prototype.getActivedMenubars = function() {
  var menubars = [];
  var menus = this.menuMap.values();
  for (var i = 0, count = menus.length; i < count; i++) {
    menubars.push(menus[i]);
  }
  return menubars;
};
Widget.prototype.getContext = function(widgetRule) {
  var context = new Object;
  context.c = "WidgetUIContext";
  context.visible = this.visible;
  var contextXmlArray = new Array();
  contextXmlArray.push("<" + EventContextConstant.context + ">");
  contextXmlArray.push(toJSON(context));
  contextXmlArray.push("</" + EventContextConstant.context + ">");
  var comps = this.comps.values();
  if (comps != null && comps.length > 0) {
    for (var i = 0; i < comps.length; i++) {
      var comp = comps[i];
      var compType = comp.componentType.toLowerCase();
      var type = null;
      if (typeof TreeViewComp != "undefined" && comp.componentType == TreeViewComp.prototype.componentType) {
        var rule = widgetRule == null ? null : widgetRule.getTreeRule(comp.id);
        if (rule != null) type = rule.type;
      } else {
        continue;
      }
      var ctx = comp.getContext(type);
      if (ctx == null) continue;
      contextXmlArray.push("<" + compType + " id=\"" + comp.id + "\">");
      contextXmlArray.push("<" + EventContextConstant.context + "><![CDATA[");
      contextXmlArray.push(toJSON(ctx));
      contextXmlArray.push("]]></" + EventContextConstant.context + ">");
      contextXmlArray.push("</" + compType + ">");
    }
  }
  var dss = this.dss.values();
  if (dss != null && dss.length > 0) {
    for (var i = 0; i < dss.length; i++) {
      var ds = dss[i];
      var dsRule = null;
      var type = null;
      if (widgetRule != null) {
        dsRule = widgetRule.getDsRule(ds.id);
        if (dsRule != null) type = dsRule.type;
      }
      contextXmlArray.push("<dataset id=\"" + ds.id + "\">");
      contextXmlArray.push("<data>");
      var dsContent = searializeDataset(ds, type);
      contextXmlArray.push("<![CDATA[" + dsContent + "]]>");
      contextXmlArray.push("</data>");
      contextXmlArray.push("</dataset>");
    }
  }
  return contextXmlArray.join("");
};
Widget.prototype.getChangedContext = function() {
  var comps = this.comps.values();
  if (comps != null && comps.length > 0) {
    for (var i = 0; i < comps.length; i++) {
      var comp = comps[i];
      var compType = comp.componentType.toLowerCase();
      var ctx = null;
      if (comp.getChangedContext) ctx = comp.getChangedContext();
      if (ctx == null) continue;
      if (this.changedObj == null) {
        this.changedObj = new Object;
        this.changedObj.id = this.id;
      }
      ctx.compType = compType;
      if (this.changedObj["comps"] == null) this.changedObj["comps"] = new Array();
      this.changedObj["comps"].push(ctx);
    }
  }
  var menus = this.menuMap.values();
  if (menus != null && menus.length > 0) {
    for (var i = 0; i < menus.length; i++) {
      var menu = menus[i];
      var ctx = null;
      if (menu.getChangedContext) ctx = menu.getChangedContext();
      if (ctx == null) continue;
      if (this.changedObj == null) {
        this.changedObj = new Object;
        this.changedObj.id = this.id;
      }
      if (menu.componentType == 'CONTEXTMENU') {
        if (this.changedObj["cMenus"] == null) this.changedObj["cMenus"] = new Array();
        this.changedObj["cMenus"].push(ctx);
      } else {
        if (this.changedObj["menus"] == null) this.changedObj["menus"] = new Array();
        this.changedObj["menus"].push(ctx);
      }
    }
  }
  var tabs = this.tabMap.values();
  if (tabs != null && tabs.length > 0) {
    for (var i = 0; i < tabs.length; i++) {
      var tab = tabs[i];
      var ctx = null;
      if (tab.getChangedContext) ctx = tab.getChangedContext();
      if (ctx == null) continue;
      if (this.changedObj == null) {
        this.changedObj = new Object;
        this.changedObj.id = this.id;
      }
      if (this.changedObj["tabs"] == null) this.changedObj["tabs"] = new Array();
      this.changedObj["tabs"].push(ctx);
    }
  }
  var cards = this.cardMap.values();
  if (cards != null && cards.length > 0) {
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var ctx = null;
      if (card.getChangedContext) ctx = card.getChangedContext();
      if (ctx == null) continue;
      if (this.changedObj == null) {
        this.changedObj = new Object;
        this.changedObj.id = this.id;
      }
      if (this.changedObj["cards"] == null) this.changedObj["cards"] = new Array();
      this.changedObj["cards"].push(ctx);
    }
  }
  var panels = this.panelMap.values();
  if (panels != null && panels.length > 0) {
    for (var i = 0; i < panels.length; i++) {
      var panel = panels[i];
      var ctx = null;
      if (panel.getChangedContext) ctx = panel.getChangedContext();
      if (ctx == null) continue;
      if (this.changedObj == null) {
        this.changedObj = new Object;
        this.changedObj.id = this.id;
      }
      if (this.changedObj["panels"] == null) this.changedObj["panels"] = new Array();
      this.changedObj["panels"].push(ctx);
    }
  }
  return this.changedObj;
};
Widget.prototype.setChangedContext = function(context) {
  if (context == null) return;
  if (typeof(context.hasChanged) != 'undefined') {
    this.setChanged(context.hasChanged);
  }
  if (typeof(context.caption) != 'undefined') {
    var dialog = pageUI.getDialog("'" + this.id + "'");
    if (dialog != null) dialog.titleDiv.innerHTML = context.caption;
  }
  if (typeof(context.comps) != 'undefined') {
    var comps = context.comps;
    if (comps.length && comps.length > 0) {
      for (var i = 0; i < comps.length; i++) {
        var compCtx = comps[i];
        var comp = this.getComponent(compCtx.id);
        if (comp != null) comp.setChangedContext(compCtx);
      }
    }
  }
  if (typeof(context.cMenus) != 'undefined') {
    var cMenus = context.cMenus;
    if (cMenus.length && cMenus.length > 0) {
      for (var i = 0; i < cMenus.length; i++) {
        var cMenuCtx = cMenus[i];
        var cMenu = this.getMenu(cMenuCtx.id);
        if (cMenu != null) cMenu.setChangedContext(cMenuCtx);
      }
    }
  }
  if (typeof(context.menus) != 'undefined') {
    var menus = context.menus;
    if (menus.length && menus.length > 0) {
      for (var i = 0; i < menus.length; i++) {
        var menuCtx = menus[i];
        var menu = this.getMenu(menuCtx.id);
        if (menu != null) menu.setChangedContext(menuCtx);
      }
    }
  }
};
Widget.prototype.notifyChange = function(type, value) {
  if (isReturning()) return;
  if (type == null) return;
  if (this.changedObj == null) {
    this.changedObj = new Object;
    this.changedObj.id = this.id;
  }
  this.changedObj[type] = value;
};
Widget.prototype.clearChangedData = function() {
  delete this.changedObj;
  var comps = this.getComponents();
  if (comps != null && comps.length > 0) {
    for (var i = 0; i < comps.length; i++) {
      comps[i].clearChange();
    }
  }
  var menus = this.getMenus();
  if (menus != null && menus.length > 0) {
    for (var i = 0; i < menus.length; i++) {
      menus[i].clearChange();
    }
  }
  var tabs = this.getTabs();
  if (tabs != null && tabs.length > 0) {
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].clearChange();
    }
  }
  var cards = this.getCards();
  if (cards != null && cards.length > 0) {
    for (var i = 0; i < cards.length; i++) {
      cards[i].clearChange();
    }
  }
  var panels = this.getPanels();
  if (panels != null && panels.length > 0) {
    for (var i = 0; i < panels.length; i++) {
      panels[i].clearChange();
    }
  }
};
Widget.prototype.recordUndo = function() {
  this.oldOperateState = this.operateState;
  this.oldBusinessState = this.businessState;
  this.oldUserState = this.userState;
};
Widget.prototype.undo = function() {};
Widget.prototype.addComponent = function(comp) {
  this.comps.put(comp.id, comp);
};
Widget.prototype.addDataset = function(ds) {
  this.dss.put(ds.id, ds);
};
Widget.prototype.addComboData = function(combodata) {
  this.combodatas.put(combodata.id, combodata);
};
Widget.prototype.getComboData = function(id) {
  return this.combodatas.get(id);
};
Widget.prototype.addRefNode = function(refnode) {
  this.refnodes.put(refnode.id, refnode);
};
Widget.prototype.getRefNode = function(id) {
  return this.refnodes.get(id);
};
Widget.prototype.setDsRelations = function(dsRelations) {
  this.dsRelations = dsRelations;
};
Widget.prototype.getDsRelations = function() {
  return this.dsRelations;
};
Widget.prototype.getComponents = function() {
  return this.comps.values();
};
Widget.prototype.getComponent = function(id) {
  return this.comps.get(id);
};
Widget.prototype.getDataset = function(id) {
  return this.dss.get(id);
};
Widget.prototype.getDatasets = function() {
  return this.dss.values();
};
Widget.prototype.removeComponent = function(id) {
  return this.comps.remove(id);
};
Widget.prototype.removeDataset = function(id) {
  return this.dss.remove(id);
};
Widget.prototype.beforeWidgetInit = function() {
  this.doEventFunc("beforeWidgetInit");
};
Widget.prototype.afterWidgetInit = function() {};
Widget.prototype.afterActive = function() {};
Widget.prototype.$beforeInitData = function() {
  this.initialized = true;
  if (this.lazyInit != null) return;
  var openBillId = getParameter("openBillId");
  var openDsId = getParameter("openDsId");
  var dss = this.getDatasets();
  if (dss != null) {
    for (var j = 0; j < dss.length; j++) {
      if (openDsId == dss[j].id) dss[j].addReqParameter("openBillId", openBillId);
      if (openDsId == dss[j].id) {
        if (dss[j].dsLoaded) continue;
        dss[j].dsLoaded = true;
        dss[j].setCurrentPage(Dataset.MASTER_KEY, 0);
        dss[j].reqParameterMap.remove("openBillId");
      }
      if (!dss[j].dsLoaded && !dss[j].lazyLoad) {
        if (dss[j].compArr.length == 0 && dss[j].hasComp) continue;
        dss[j].dsLoaded = true;
        dss[j].setCurrentPage(Dataset.MASTER_KEY, 0);
      }
    }
  }
};
Widget.prototype.replaceComboData = function(cbId, keyArr, valueArr, updateDs, imageArr) {
  var cb = new ComboData(cbId);
  if (keyArr != null && keyArr.length > 0) {
    for (var i = 0; i < keyArr.length; i++) {
      if (typeof(imageArr) != "undefined") var item = new ComboItem(keyArr[i], valueArr[i], imageArr[i]);
      else var item = new ComboItem(keyArr[i], valueArr[i]);
      cb.addItem(item);
    }
  }
  this.combodatas.put(cb.id, cb);
  var comps = this.comps.values();
  for (var i = 0; i < comps.length; i++) {
    var comp = comps[i];
    if ((typeof ComboComp != "undefined" && comp instanceof ComboComp) || (typeof RadioGroupComp != "undefined" && comp instanceof RadioGroupComp) || (typeof CheckboxGroupComp != "undefined" && comp instanceof CheckboxGroupComp)) {
      this.replaceCombo(comp, cbId, cb, updateDs);
    } else if (typeof AutoFormComp != "undefined" && typeof AutoFormComp != 'undefined' && comp instanceof AutoFormComp) {
      for (var j = 0; j < comp.eleArr.length; j++) {
        if ((typeof ComboComp != "undefined" && comp.eleArr[j] instanceof ComboComp) || (typeof RadioGroupComp != "undefined" && comp.eleArr[j] instanceof RadioGroupComp) || (typeof CheckboxGroupComp != "undefined" && comp.eleArr[j] instanceof CheckboxGroupComp)) {
          this.replaceCombo(comp.eleArr[j], cbId, cb, updateDs);
        }
      }
    } else if (typeof GridComp != "undefined" && typeof GridComp != 'undefined' && comp instanceof GridComp) {
      for (var k = 0; k < comp.model.basicHeaders.length; k++) {
        if (comp.model.basicHeaders[k].comboData != null && comp.model.basicHeaders[k].comboData.id == cbId) {
          comp.model.basicHeaders[k].comboData = cb;
          comp.model.basicHeaders[k].reRender();
        }
      }
      var gridcomps = (comp.compsMap == null ? null : comp.compsMap.values());
      if (gridcomps != null && gridcomps.length > 0) {
        for (var j = 0; j < gridcomps.length; j++) {
          if ((typeof ComboComp != "undefined" && gridcomps[j] instanceof ComboComp) || (typeof RadioGroupComp != "undefined" && gridcomps[j] instanceof RadioGroupComp) || (typeof CheckboxGroupComp != "undefined" && gridcomps[j] instanceof CheckboxGroupComp)) {
            this.replaceCombo(gridcomps[j], cbId, cb, updateDs);
          }
        }
      }
    }
  }
};
Widget.prototype.replaceCombo = function(comp, cbId, cb, updateDs) {
  if (comp.comboData != null && comp.comboData.id == cbId) {
    comp.setComboData(cb, updateDs);
  }
};
Widget.prototype.widgetClosing = function() {};
Widget.prototype.widgetClosed = function() {};
Widget.prototype.callAllDsClearStatus = function() {
  var dss = this.getDatasets();
  if (dss != null && dss.length != 0) {
    for (var i = 0, count = dss.length; i < count; i++) dss[i].clearState();
  }
};
Widget.prototype.callAllDsClearUndo = function() {
  var dss = this.getDatasets();
  if (dss != null && dss.length != 0) {
    for (var i = 0; i < dss.length; i++) dss[i].clearUndo();
  }
};
Widget.prototype.dispatchEvent2Ds = function(event, masterDsId) {
  if (event == null || masterDsId == null) return;
  if (RowSelectEvent.prototype.isPrototypeOf(event)) {} else if (RowUnSelectEvent.prototype.isPrototypeOf(event)) {} else if (DataChangeEvent.prototype.isPrototypeOf(event)) {
    if (event.oldValue == event.currentValue) {
      return;
    }
    var ds = this.getDataset(masterDsId);
    var field = ds.metadata[event.cellColIndex];
    if (field.editFormular || field.validateFormular) execFormula(this.id, masterDsId, field.key);
  }
};

function createDsDataTypeMap(ds) {
  var cache = getFromCache("dstype_key");
  if (cache == null) {
    cache = new Object;
    putToCache("dstype_key", cache);
  }
  var obj = cache[ds];
  if (obj == null) {
    obj = new Object;
    obj.javaClass = 'java.util.HashMap';
    var objMap = new Object;
    obj.map = objMap;
    for (var i = 0, len = ds.metadata.length; i < len; i++) {
      var md = ds.metadata[i];
      var replaceField = null;
      if (md.field != null && md.field != "") replaceField = md.field.replace(".", "_$_");
      if (replaceField == null || replaceField == "") replaceField = md.key;
      objMap[replaceField] = md.dataType;
    }
  }
  return obj;
}
Widget.prototype.openReference = function(refNodeId, returnFuncName, dialogWidth, dialogHeight, param, refresh, filterValue) {
  var refNode = this.getRefNode(refNodeId);
  if (refNode == null) {
    showErrorDialog("Can not find refnode by id:" + refNodeId);
    return;
  }
  var trueDialogWidth = getInteger(dialogWidth, 650);
  var trueDialogHeight = getInteger(dialogHeight, 400);
  var trueReadDsName = getString(refNode.readDs, "masterDs");
  var url = window.corePath + "/" + refNode.path + "?pageId=" + refNode.pageMeta + "&widgetId=" + this.id + "&otherPageUniqueId=" + getPageUniqueId() + "&readDs=" + trueReadDsName + "&nodeId=" + refNodeId;
  if (returnFuncName != null) url += "&returnFunc=" + returnFuncName;
  if (refNode.multiSel) url += "&multiSel=1";
  if (refNode.delegator != null) url += "&delegator=" + refNode.delegator;
  if (refNode.fromNc) {
    url += "&fromNc=Y";
  }
  if (param != null) url += "&" + param;
  if (refresh) url += "&refresh=1";
  showDialog(url, refNode.name, trueDialogWidth, trueDialogHeight, 0);
  Widget.doFilterRefDialog(getString(filterValue, ""), 0);
};
Widget.doFilterRefDialog = function(value, id) {
  if (Widget.waitFilterRt != null) clearTimeout(Widget.waitFilterRt);
  if (window["$modalDialogFrame" + id].contentWindow == null || window["$modalDialogFrame" + id].contentWindow.renderDone == null) {
    Widget.waitFilterRt = setTimeout("Widget.doFilterRefDialog('" + value + "','" + id + "');", 50);
    return;
  }
  window["$modalDialogFrame" + id].contentWindow.doFilter(value);
};
WidgetListener.listenerType = "WIDGET_LISTENER";

function WidgetListener() {}
WidgetListener.prototype.beforeWidgetInit = function() {};
WidgetListener.prototype.afterWidgetInit = function() {};

function PlugOut(id) {
  this.id = id;
};
PlugOut.prototype.getItems = function() {
  return this.items;
};
PlugOut.prototype.getItem = function(itemId) {
  return this.items.get(id);
};
PlugOut.prototype.addItem = function(item) {
  if (this.items == null) this.items = new HashMap();
  this.items.put(item.id, item);
};

function PlugOutItem(name, type, source, desc) {
  this.id = name;
  this.type = type;
  this.source = source;
  this.desc = desc;
};

ButtonComp.prototype = new BaseComponent;
ButtonComp.prototype.componentType = "BUTTON";
ButtonComp.BUTTON_HEIGHT = 23;
ButtonComp.WIDTH = 90;

function ButtonComp(parent, name, left, top, width, height, text, tip, refImg, position, align, disabled, className, documentClick) {
  if (arguments.length == 0) return;
  this.base = BaseComponent;
  this.className = getString(className, "button_div");
  this.initStaticConstant();
  if (IS_IPAD) width = parseInt(width) + 11;
  this.base(name, left, top, width, height);
  this.align = align;
  this.parentOwner = parent;
  this.position = getString(position, "absolute");
  this.tip = getString(tip, "");
  this.text = getString(text, "");
  this.disabled = getBoolean(disabled, false);
  this.documentClick = getBoolean(documentClick, true);
  this.refImg = getString(refImg, "");
  this.create();
};
ButtonComp.prototype.initStaticConstant = function() {};
ButtonComp.prototype.create = function() {
  var oThis = this;
  this.Div_gen = $ce("div");
  this.Div_gen.id = this.id;
  this.Div_gen.style.position = this.position;
  this.Div_gen.style.left = this.left + "px";
  this.Div_gen.style.top = this.top + "px";
  this.Div_gen.style.width = this.width;
  this.Div_gen.style.height = this.height;
  this.Div_gen.className = this.className;
  this.Div_gen.title = this.text;
  if (IS_IE7) {
    this.parentOwner.style.width = this.width;
  }
  this.btnLeftDiv = $ce("div");
  this.btnLeftDiv.className = "btn_left_off";
  this.btnCenterDiv = $ce("div");
  this.btnCenterDiv.className = "btn_center";
  if (IS_IE) this.btnCenterDiv.style.overflowY = "hidden";
  this.btnRightDiv = $ce("div");
  this.btnRightDiv.className = "btn_right_off";
  this.Div_gen.appendChild(this.btnLeftDiv);
  this.Div_gen.appendChild(this.btnCenterDiv);
  this.Div_gen.appendChild(this.btnRightDiv);
  this.butt = $ce("button");
  this.butt.style.width = "100%";
  this.butt.className = "btn_off";
  if (this.butt.type == "submit") this.butt.setAttribute("type", "button");
  this.btnCenterDiv.appendChild(this.butt);
  this.Div_gen.tip = this.tip;
  if (this.disabled) {
    this.butt.disabled = true;
    this.btnLeftDiv.className = "btn_left_disabled";
    this.btnRightDiv.className = "btn_right_disabled";
    this.butt.className = "btn_disabled";
  }
  if (!IS_IPAD) {
    this.Div_gen.onmouseover = function(e) {
      if (oThis.disabled) return;
      e = EventUtil.getEvent();
      oThis.btnLeftDiv.className = "btn_left_on";
      oThis.btnRightDiv.className = "btn_right_on";
      oThis.butt.className = "btn_on";
      oThis.onmouseover(e);
      clearEventSimply(e);
    };
  }
  this.Div_gen.onmouseout = function(e) {
    if (oThis.disabled) return;
    e = EventUtil.getEvent();
    oThis.btnLeftDiv.className = "btn_left_off";
    oThis.btnRightDiv.className = "btn_right_off";
    oThis.butt.className = "btn_off";
    oThis.onmouseout(e);
    clearEventSimply(e);
  };
  this.Div_gen.onmousedown = function(e) {
    if (oThis.disabled) {
      return;
    }
    e = EventUtil.getEvent();
    oThis.btnLeftDiv.className = "btn_left_down";
    oThis.btnRightDiv.className = "btn_right_down";
    oThis.butt.className = "btn_down";
    oThis.onmousedown(e);
    clearEventSimply(e);
  };
  this.Div_gen.onmouseup = function(e) {
    if (oThis.disabled) {
      return;
    }
    e = EventUtil.getEvent();
    oThis.btnLeftDiv.className = "btn_left_on";
    oThis.btnRightDiv.className = "btn_right_on";
    oThis.butt.className = "btn_on";
    oThis.onmouseup(e);
    clearEventSimply(e);
  };
  this.Div_gen.onfocus = function(e) {
    if (oThis.disabled) {
      return;
    }
    e = EventUtil.getEvent();
    oThis.btnLeftDiv.className = "btn_left_focus";
    oThis.btnRightDiv.className = "btn_right_focus";
    oThis.butt.className = "btn_focus";
    oThis.onfocus(e);
    clearEventSimply(e);
  };
  this.Div_gen.onblur = function(e) {
    if (oThis.disabled) {
      return;
    }
    e = EventUtil.getEvent();
    oThis.btnLeftDiv.className = "btn_left_off";
    oThis.btnRightDiv.className = "btn_right_off";
    oThis.butt.className = "btn_off";
    oThis.onblur(e);
    clearEventSimply(e);
  };
  this.Div_gen.onclick = function(e) {
    if (oThis.isDblEvent("onclick")) return;
    if (oThis.documentClick) {
      document.onclick();
    }
    if (oThis.disabled) return;
    e = EventUtil.getEvent();
    e.triggerObj = oThis;
    oThis.onclick(e);
    stopEvent(e);
    e.triggerObj = null;
    clearEventSimply(e);
  };
  if (this.parentOwner) this.placeIn(this.parentOwner);
};
ButtonComp.prototype.manageSelf = function() {
  this.textNode = document.createTextNode(this.text);
  this.textNodeDiv = $ce("DIV");
  if (IS_IE) {
    this.textNodeDiv.style.marginTop = "3px";
  } else {
    this.textNodeDiv.style.marginBottom = "3px";
  }
  this.textNodeDiv.appendChild(this.textNode);
  if (this.refImg != "") {
    this.imgNode = $ce("img");
    this.imgNode.style.marginRight = "5px";
    var brNode = $ce("br");
    this.imgNode.src = this.refImg;
    if (this.text == null || this.text == "") {
      this.butt.appendChild(this.imgNode);
    } else {
      this.imgNode.align = "absmiddle";
      if (this.align == "left") {
        this.butt.appendChild(this.textNodeDiv);
        this.butt.appendChild(this.imgNode);
      }
      if (this.align == "right") {
        this.butt.appendChild(this.imgNode);
        this.butt.appendChild(this.textNodeDiv);
      }
      if (this.align == "top") {
        this.butt.appendChild(this.textNodeDiv);
        this.butt.appendChild(brNode);
        this.butt.appendChild(this.imgNode);
      }
      if (this.align == "bottom") {
        this.butt.appendChild(this.imgNode);
        this.butt.appendChild(brNode);
        this.butt.appendChild(this.textNodeDiv);
      }
    }
  } else {
    this.butt.appendChild(this.textNodeDiv);
  }
  this.textNodeDiv.style.whiteSpace = "nowrap";
  this.textNodeDiv.style.overflow = "hidden";
  this.textNodeDiv.style.textOverflow = "ellipsis";
};
ButtonComp.prototype.changeImage = function(imgPath) {
  if (this.refImg != null && this.refImg != "") {
    this.refImg = imgPath;
    this.imgNode.src = imgPath;
  }
};
ButtonComp.prototype.changeText = function(text) {
  var newNode = document.createTextNode(text);
  this.textNodeDiv.replaceChild(newNode, this.textNode);
  this.textNode = newNode;
  this.text = text;
  this.Div_gen.title = this.text;
  this.ctxChanged = true;
  this.notifyChange(NotifyType.TEXT, this.text);
};
ButtonComp.prototype.setActive = function(isActive) {
  var isActive = getBoolean(isActive, false);
  if (this.disabled == false && isActive == false) {
    this.butt.disabled = true;
    this.disabled = true;
    this.butt.className = "btn_disabled";
  } else if (this.disabled == true && isActive == true) {
    this.butt.disabled = false;
    this.disabled = false;
    this.butt.className = "btn_off";
  }
  this.ctxChanged = true;
  this.notifyChange(NotifyType.ENABLE, !this.disabled);
};
ButtonComp.prototype.isActive = function() {
  return !this.disabled;
};
ButtonComp.prototype.onmouseout = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onmouseout", mouseEvent);
};
ButtonComp.prototype.onmouseover = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onmouseover", mouseEvent);
};
ButtonComp.prototype.onmousedown = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onmousedown", mouseEvent);
};
ButtonComp.prototype.onmouseup = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onmouseup", mouseEvent);
};
ButtonComp.prototype.onclick = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onclick", mouseEvent);
};
BaseComponent.prototype.handleHotKey = function(key) {
  if (this.isActive() == false) return null;
  if (this.hotKey != null) {
    if (key == this.hotKey && this.onclick) {
      this.onclick(null);
      return this;
    }
  }
  return null;
};
ButtonComp.prototype.setVisible = function(visible) {
  if (visible != null && this.visible != visible) {
    if (visible == true) this.Div_gen.style.visibility = "";
    else this.Div_gen.style.visibility = "hidden";
    this.visible = visible;
  }
  this.ctxChanged = true;
  this.notifyChange(NotifyType.VISIBLE, visible);
};
ButtonComp.prototype.changeClass = function(className) {
  this.Div_gen.className = className;
};
ButtonComp.prototype.changeWidth = function(width) {
  if (width != null && convertWidth(width) != this.width) {
    this.width = (convertWidth(width));
    this.Div_gen.style.width = this.width;
    if (IS_IE7) {
      this.parentOwner.style.width = this.width;
    }
    var tempWidth = 0;
    if (isPercent(this.width)) tempWidth = this.Div_gen.offsetWidth;
    else tempWidth = getInteger(parseInt(this.width), 120);
  }
};
ButtonComp.prototype.setFamily = function(family) {
  this.family = family;
  this.butt.style.fontFamily = this.family;
};
ButtonComp.prototype.setSize = function(size) {
  this.size = size;
  this.butt.style.fontSize = this.size + "px";
};
ButtonComp.prototype.setColor = function(color) {
  this.color = color;
  this.butt.style.color = this.color;
};
ButtonComp.prototype.setWeight = function(weight) {
  this.weight = weight;
  this.butt.style.fontWeight = this.weight;
};
ButtonComp.prototype.setStyle = function(style) {
  this.style = style;
  this.butt.style.fontStyle = this.style;
};
ButtonComp.prototype.setChangedContext = function(context) {
  if (context.enable != null) this.setActive(context.enable);
  if (context.visible != null && this.visible != context.visible) this.setVisible(context.visible);
  if (context.text != null && this.text != context.text) this.changeText(context.text);
  if (context.width != null && this.width != context.width) this.changeWidth(context.width);
};

ModalDialogComp.prototype = new BaseComponent;
ModalDialogComp.prototype.componentType = "MODALDIALOG";
ModalDialogComp.HEIGHT = 200;
ModalDialogComp.WIDTH = 300;
ModalDialogComp.ZINDEX = 0;

function ModalDialogComp(name, title, left, top, width, height, className, attr) {
  if (arguments.length == 0) return;
  this.base = BaseComponent;
  this.base(name, left, top, width, height);
  this.parentOwner = document.body;
  this.title = getString(title, trans("ml_dialog"));
  this.className = getString(className, "dialog_div");
  this.isShowLine = true;
  if (attr) {
    this.isShowLine = getBoolean(attr.isShowLine, this.isShowLine);
  }
  this.create();
};
ModalDialogComp.prototype.create = function() {
  this.Div_gen = $ce("DIV");
  this.Div_gen.style.position = "absolute";
  this.Div_gen.style.left = "0px";
  this.Div_gen.style.top = "0px";
  this.Div_gen.style.width = "100%";
  this.Div_gen.style.minHeight = "100%";
  this.Div_gen.style.zIndex = getZIndex();
  this.Div_gen.style.visibility = "hidden";
  this.Div_gen.style.background = "url(" + window.globalPath + "/frame/themes/images/transparent.gif)";
  this.Div_gen.ontouchmove = function(e) {
    return false;
  };
  if (this.parentOwner) this.placeIn(this.parentOwner);
};
ModalDialogComp.prototype.manageSelf = function() {
  var oThis = this;
  this.divdialog = $ce("DIV");
  this.divdialog.className = this.className;
  this.divdialog.style.width = this.width;
  if (this.height.indexOf("%") != -1) {
    this.height = (document.body.clientHeight * translatePercentToFloat(this.height)) + "px";
  }
  this.divdialog.style.height = this.height;
  addResizeEvent(this.Div_gen, function(e) {
    if (IS_IE) {
      var topHeight = window.document.body.scrollHeight;
      oThis.Div_gen.style.height = topHeight + "px";
    }
    clearEventSimply(e);
  });
  this.divdialog.ontouchmove = function(e) {
    return false;
  };
  var frmstr = '<iframe src="" style="position:absolute; visibility:inherit; top:0px; left:0px; width:100%;height:100%; z-index:-1; border:none;" frameborder="0"></<iframe>';
  this.divdialog.innerHTML = frmstr;
  this.Div_gen.appendChild(this.divdialog);
  this.layout = $ce("table");
  this.layout.border = "0";
  this.layout.style.height = "100%";
  this.layout.style.width = "100%";
  this.layout.cellPadding = "0";
  this.layout.cellSpacing = "0";
  this.firstRow = this.layout.insertRow(-1);
  this.titleL = this.firstRow.insertCell(-1);
  this.titleC = this.firstRow.insertCell(-1);
  this.titleR = this.firstRow.insertCell(-1);
  this.secondRow = this.layout.insertRow(-1);
  this.cL = this.secondRow.insertCell(-1);
  this.cC = this.secondRow.insertCell(-1);
  this.cC.style.display = "block";
  this.cC.height = this.divdialog.offsetHeight - 66 + "px";
  this.cR = this.secondRow.insertCell(-1);
  this.thirdRow = this.layout.insertRow(-1);
  this.bL = this.thirdRow.insertCell(-1);
  this.bC = this.thirdRow.insertCell(-1);
  this.bR = this.thirdRow.insertCell(-1);
  this.divdialog.appendChild(this.layout);
  this.firstRow.className = "dialog_titlebar";
  this.thirdRow.className = "bottomdiv";
  this.titleL.className = "leftheadborderdiv";
  this.titleC.className = "centerheaddiv";
  this.titleR.className = "rightheadborderdiv";
  this.titleDiv = $ce("DIV");
  this.titleDiv.className = "dialog_title";
  this.titleDiv.innerHTML = this.title.replace("\<", "&lt;").replace("\>", "&gt");
  this.titleDiv.style.width = this.divdialog.offsetWidth - 120 + "px";
  this.titleC.appendChild(this.titleDiv);
  this.closeBt = $ce('DIV');
  this.closeBt.className = "closebt_off";
  this.titleC.appendChild(this.closeBt);
  this.closeBt.onmouseover = function(e) {
    this.className = "closebt_on";
  };
  this.closeBt.onmouseout = function(e) {
    this.className = "closebt_off";
  };
  this.closeBt.onmousedown = function(e) {
    this.className = "closebt_click";
  };
  this.closeBt.onclick = function() {
    try {
      if (oThis.getContentPane() != null) {
        var frame = oThis.getContentPane().firstChild;
        if (frame && frame.contentWindow && frame.contentWindow.document) frame.contentWindow.document.onclick();
      }
    } catch (e) {}
    oThis.close();
  };
  this.cL.className = "leftbodyborderdiv";
  this.cR.className = "rightbodyborderdiv";
  if (this.isShowLine) {
    this.cC.className = "centerbodydiv";
  } else {
    this.cC.className = "centerbodynolinediv";
  }
  this.cC.style.backgroundColor = "#FFFFFF";
  this.cC.vAlign = "top";
  this.contentDiv = $ce("DIV");
  this.contentDiv.className = "dialog_content";
  var screenWidth = document.body.clientWidth;
  var topWin = getLfwTop() || window;
  var topScreenWidth = topWin.document.body.clientWidth;
  if (screenWidth > topScreenWidth) {
    screenWidth = topScreenWidth;
  }
  if (this.divdialog.parentNode) {
    screenWidth = this.divdialog.parentNode.offsetWidth < screenWidth ? this.divdialog.parentNode.offsetWidth : screenWidth;
  }
  this.contentDiv.style.maxWidth = screenWidth + "px";
  this.cC.appendChild(this.contentDiv);
  this.bL.className = "leftbottomborderdiv";
  this.bR.className = "rightbottomborderdiv";
  this.bC.className = "centerbottomdiv";
  var drag = false;
  var oldX = 0;
  var oldY = 0;
  this.firstRow.onmousedown = function(e) {
    e = EventUtil.getEvent();
    drag = true;
    if (e.target == oThis.closeBt) {
      drag = false;
      return;
    }
    if (IS_IE) {
      oldX = e.clientX;
      oldY = e.clientY;
    } else {
      oldX = e.pageX;
      oldY = e.pageY;
    }
    if (IS_IE) this.setCapture();
    else window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
    clearEventSimply(e);
  };
  this.firstRow.onmouseup = function(e) {
    drag = false;
    oThis.topDiv.style.display = "none";
    oThis.topDiv.style.zIndex = "-1";
    if (IS_IE) this.releaseCapture();
    else window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
  };
  if (!IS_IE) {
    window.onmouseup = function() {
      drag = false;
      oThis.topDiv.style.display = "none";
      oThis.topDiv.style.zIndex = "-1";
      window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
    };
  }
  window.onmousemove = function(e) {
    e = EventUtil.getEvent();
    if (drag) {
      oThis.topDiv.style.display = "block";
      oThis.topDiv.style.zIndex = getZIndex();
      if (IS_IE) {
        if (e.clientX <= 0 || e.clientX >= document.body.clientWidth) return false;
        if (e.clientY <= 0 || e.clientY >= document.body.clientHeight) return false;
        var offsetX = e.clientX - oldX;
        var offsetY = e.clientY - oldY;
        oldX = e.clientX;
        oldY = e.clientY;
        oThis.divdialog.style.left = oThis.divdialog.style.pixelLeft + offsetX + "px";
        oThis.divdialog.style.top = oThis.divdialog.style.pixelTop + offsetY + "px";
      } else {
        var offsetX = e.pageX - oldX;
        var offsetY = e.pageY - oldY;
        oldX = e.pageX;
        oldY = e.pageY;
        oThis.divdialog.style.left = oThis.divdialog.offsetLeft + offsetX + "px";
        oThis.divdialog.style.top = oThis.divdialog.offsetTop + offsetY + "px";
      }
    }
    clearEventSimply(e);
  };
  if (IS_IE8) {
    this.firstRow.onmousemove = function(e) {
      e = EventUtil.getEvent();
      if (drag) {
        oThis.topDiv.style.display = "block";
        oThis.topDiv.style.zIndex = getZIndex();
        if (IS_IE) {
          if (e.clientX <= 0 || e.clientX >= document.body.clientWidth) return false;
          if (e.clientY <= 0 || e.clientY >= document.body.clientHeight) return false;
          var offsetX = e.clientX - oldX;
          var offsetY = e.clientY - oldY;
          oldX = e.clientX;
          oldY = e.clientY;
          oThis.divdialog.style.left = oThis.divdialog.style.pixelLeft + offsetX + "px";
          oThis.divdialog.style.top = oThis.divdialog.style.pixelTop + offsetY + "px";
        } else {
          var offsetX = e.pageX - oldX;
          var offsetY = e.pageY - oldY;
          oldX = e.pageX;
          oldY = e.pageY;
          oThis.divdialog.style.left = oThis.divdialog.offsetLeft + offsetX + "px";
          oThis.divdialog.style.top = oThis.divdialog.offsetTop + offsetY + "px";
        }
      }
      clearEventSimply(e);
    };
  }
  this.initTopDiv();
};
ModalDialogComp.prototype.showLine = function(isShowLine) {
  if (isShowLine == this.isShowLine) return;
  this.isShowLine = isShowLine;
  if (isShowLine) {
    this.cC.className = "centerbodydiv";
  } else {
    this.cC.className = "centerbodynolinediv";
  }
};
ModalDialogComp.prototype.show = function(refDiv) {
  this.Div_gen.style.visibility = "visible";
  this.Div_gen.style.display = "block";
  this.Div_gen.style.zIndex = getZIndex();
  this.visible = true;
  var sctop = 0;
  var clinetHeight = 0;
  sctop = compFirstScrollTop(this.Div_gen);
  clinetHeight = compFirstScrollClientHeight(this.Div_gen);
  this.Div_gen.top = sctop;
  if (this.divdialog.offsetWidth > 0 && this.divdialog.offsetHeight > 0) {
    var iframe = this.divdialog.children[0];
    if (iframe && iframe.tagName == 'IFRAME') {
      iframe.style.width = this.divdialog.offsetWidth - 18 * 2 + "px";
      iframe.style.height = this.divdialog.offsetHeight - 12 - 18 + "px";
      iframe.style.left = "18px";
      iframe.style.top = "12px";
    }
  }
  if (this.divdialog.offsetHeight > document.body.clientHeight) document.body.style.height = (this.divdialog.offsetHeight + 10) + "px";
  positionElementToScreenCenter(this.divdialog, sctop, clinetHeight);
  setTimeout("document.body.style.height = '100%'", 1000);
  window.onresize();
  if (window.pageUI) pageUI.hasChanged = false;
};
ModalDialogComp.prototype.setBounds = function(left, top, width, height) {
  BaseComponent.prototype.setBounds.call(this, left, top, width, height);
};
ModalDialogComp.prototype.hide = function() {
  if (this.Div_gen) {
    this.Div_gen.style.display = "none";
  }
  this.visible = false;
  var html = this.Div_gen.innerHTML;
  if (IS_IE8 && html.indexOf("cke_contents_htmlcontent_content") != -1) {
    var td = $ge("cke_contents_htmlcontent_content");
    try {
      td.childNodes[0].contentWindow.document.body.innerHTML = "";
    } catch (e) {}
  }
};
ModalDialogComp.prototype.setSize = function(width, height) {
  this.width = parseInt(width, 10) + "px";
  this.height = parseInt(height, 10) + "px";
  this.divdialog.style.width = this.width;
  this.divdialog.style.height = this.height;
  this.cC.height = this.divdialog.offsetHeight - 66 + "px";
  if (this.divdialog.offsetWidth > 0 && this.divdialog.offsetHeight > 0) {
    var iframe = this.divdialog.children[0];
    if (iframe && iframe.tagName == 'IFRAME') {
      iframe.style.width = this.divdialog.offsetWidth - 18 * 2 + "px";
      iframe.style.height = this.divdialog.offsetHeight - 12 - 18 + "px";
      iframe.style.left = "18px";
      iframe.style.top = "12px";
    }
  }
  this.titleDiv.style.width = this.divdialog.offsetWidth - 120 + "px";
};
ModalDialogComp.prototype.getContentPane = function() {
  return this.contentDiv;
};
ModalDialogComp.prototype.add = function(objHtml) {
  this.getContentPane().appendChild(objHtml);
};
ModalDialogComp.prototype.setTitle = function(title) {
  this.title = title;
  this.titleDiv.innerHTML = this.title;
};
ModalDialogComp.prototype.close = function() {
  if (this.onBeforeClose() == false) return;
  var iframe = $(this.divdialog).find('iframe')[1];
  if (iframe) {
    try {
      var _pageUI = iframe.contentWindow.pageUI;
      if (_pageUI) {
        if (iframe.contentWindow.isPopView && iframe.contentWindow.isPopView == true) {} else {
          var result = _pageUI.beforeDialogClose();
          if (result === false) return;
        }
      }
    } catch (e) {}
  }
  this.onClosing();
  this.hide();
  this.onAfterClose();
  return true;
};
ModalDialogComp.prototype.onBeforeShow = function() {
  var simpleEvent = {
    "obj": this
  };
  this.doEventFunc("beforeShow", simpleEvent);
};
ModalDialogComp.prototype.onBeforeClose = function() {
  var simpleEvent = {
    "obj": this
  };
  return this.doEventFunc("beforeClose", simpleEvent);
};
ModalDialogComp.prototype.onAfterClose = function() {
  var simpleEvent = {
    "obj": this
  };
  this.doEventFunc("afterClose", simpleEvent);
};
ModalDialogComp.prototype.onClosing = function() {
  var simpleEvent = {
    "obj": this
  };
  this.doEventFunc("onclose", simpleEvent);
};
ModalDialogComp.prototype.initTopDiv = function() {
  this.topDiv = $ce("DIV");
  this.topDiv.id = this.id + "topDiv";
  this.topDiv.style.left = "0px";
  this.topDiv.style.top = "0px";
  this.topDiv.style.width = "100%";
  this.topDiv.style.height = "100%";
  this.topDiv.style.position = "absolute";
  this.topDiv.style.overflow = "hidden";
  this.topDiv.style.background = "#666";
  _setOpacity(this.topDiv, 0);
  this.topDiv.style.display = "none";
  this.topDiv.style.zIndex = "-1";
  this.topDiv.refGrid = this;
  document.body.appendChild(this.topDiv);
};

ContextMenuComp.prototype = new BaseComponent;
ContextMenuComp.prototype.componentType = "CONTEXTMENU";
ContextMenuComp.SEP_HEIGHT = 10;
ContextMenuComp.ITEM_WIDTH = 120;

function ContextMenuComp(name, left, top, posFix) {
  this.base = BaseComponent;
  this.base(name, left, top, "", "");
  this.width = ContextMenuComp.ITEM_WIDTH;
  this.posFix = getBoolean(posFix, false);
  this.visible = false;
  this.isChildMenu = false;
  this.childItems = new Array();
  this.childMenus = new Array();
  this.seps = new Array();
  this.sepIndex = 0;
  this.create();
};
ContextMenuComp.prototype.create = function() {
  var oThis = this;
  this.Div_gen = $ce("DIV");
  this.Div_gen.className = "contextmenu_div";
  this.Div_gen.style.width = this.width + 2 * 11;
  this.Div_gen.style.position = "absolute";
  this.Div_gen.style.display = "none";
  this.Div_gen.style.zIndex = getZIndex();
  document.body.appendChild(this.Div_gen);
  var frmstr = '<iframe src="" style="position:absolute; visibility:inherit; top:4px; left:4px; width:100%;height:100%; z-index:-1; border:none;" frameborder="0"></<iframe>';
  this.Div_gen.innerHTML = frmstr;
  this.left_top = $ce("DIV");
  this.left_top.className = 'left_top_div';
  this.center_top = $ce("DIV");
  this.center_top.className = 'center_top_div';
  this.right_top = $ce("DIV");
  this.right_top.className = 'right_top_div';
  this.left_center = $ce("DIV");
  this.left_center.className = 'left_center_div';
  this.centerContent = $ce("DIV");
  this.centerContent.className = 'center_div';
  this.right_center = $ce("DIV");
  this.right_center.className = 'right_center_div';
  this.left_bottom = $ce("DIV");
  this.left_bottom.className = 'left_bottom_div';
  this.center_bottom = $ce("DIV");
  this.center_bottom.className = 'center_bottom_div';
  this.right_bottom = $ce("DIV");
  this.right_bottom.className = 'right_bottom_div';
  this.bottom_button = $ce("DIV");
  this.bottom_button.className = 'bottom_button';
  this.top_button = $ce("DIV");
  this.top_button.className = 'top_button';
  this.bottom_button.style.display = "none";
  this.top_button.style.display = "none";
  this.Div_gen.appendChild(this.centerContent);
  this.Div_gen.appendChild(this.left_top);
  this.Div_gen.appendChild(this.center_top);
  this.Div_gen.appendChild(this.right_top);
  this.Div_gen.appendChild(this.left_center);
  this.Div_gen.appendChild(this.right_center);
  this.Div_gen.appendChild(this.bottom_button);
  this.Div_gen.appendChild(this.top_button);
  this.Div_gen.appendChild(this.left_bottom);
  this.Div_gen.appendChild(this.center_bottom);
  this.Div_gen.appendChild(this.right_bottom);
  this.centerContent.style.top = "0px";
  window.clickHolders.push(this);
  this.bottom_button.onclick = function(e) {
    e = EventUtil.getEvent(e);
    stopEvent(e);
    var top = parseInt(oThis.centerContent.style.top.replace("px", "")),
      heightOuter = oThis.Div_gen.style.height,
      heightInner = oThis.centerContent.style.height ? oThis.centerContent.style.height : oThis.centerContent.offsetHeight,
      heightOuter = parseInt(heightOuter.replace("px", "")),
      offset = heightInner - heightOuter,
      top = -top + 20 > offset ? -offset : top;
    oThis.centerContent.style.top = top - 20 + 'px';
  };
  this.top_button.onclick = function(e) {
    e = EventUtil.getEvent(e);
    stopEvent(e);
    var top = parseInt(oThis.centerContent.style.top.replace("px", "")),
      top = top + 20 > 0 ? 0 : top + 20;
    oThis.centerContent.style.top = top + 'px';
  };
};
ContextMenuComp.prototype.destroySelf = function() {
  for (var i = 0, n = this.childItems.length; i < n; i++) {
    var item = this.childItems[i];
    if (typeof(item.destroySelf) == 'function') {
      item.destroySelf();
    }
  }
  for (var i = 0, n = this.childMenus.length; i < n; i++) {
    var menu = this.childMenus[i];
    menu.destroySelf();
  }
  this.destroy();
};
ContextMenuComp.prototype.outsideClick = function(e) {
  if (e != null && 2 == e.button) return;
  if (this.visible) this.hide();
};
ContextMenuComp.prototype.addZIndex = function(e) {
  this.Div_gen.style.zIndex = getInteger(this.Div_gen.style.zIndex) + 1;
};
ContextMenuComp.prototype.setPosLeft = function(left) {
  this.left = getInteger(left, 0) - 3;
  this.Div_gen.style.left = this.left + "px";
};
ContextMenuComp.prototype.setPosTop = function(top) {
  this.top = getInteger(top, 0) - 5;
  this.Div_gen.style.top = this.top + "px";
};
ContextMenuComp.prototype.setWidth = function(width) {
  this.width = getString(width, "100%");
  if (this.width.toString().indexOf("%") == -1) this.Div_gen.style.width = this.width + 2 * 11 + "px";
  else this.Div_gen.style.width = this.width;
};
ContextMenuComp.prototype.setHeight = function(height) {
  this.height = height;
  this.Div_gen.style.height = height + "px";
};
ContextMenuComp.prototype.childItemWidthUpdated = function(width) {
  if (this.width < width) {
    this.width = width;
    this.Div_gen.style.width = this.width + 2 * 11 + "px";
    for (var i = 0; i < this.childItems.length; i++) this.childItems[i].setItemWidth(width);
    for (var i = 0; i < this.seps.length; i++) this.seps[i].setItemWidth(width);
  }
};
ContextMenuComp.prototype.addMenu = function(name, caption, tip, refImg, isCheckBoxItem, isCheckBoxSelected, attrObj) {
  var oThis = this;
  var item = new MenuItemComp(this.Div_gen, name, caption, tip, refImg, "menuitem_div", false, null, isCheckBoxItem, isCheckBoxSelected, attrObj);
  var index = this.childItems.push(item);
  item.parentOwner = this;
  item.index = index - 1;
  this.addItemHtml(item);
  item.preMenuItem = this.lastAddItem;
  this.lastAddItem = item;
  return item;
};
ContextMenuComp.prototype.addSep = function(attrObj) {
  var id = this.id + "_sep_" + this.sepIndex;
  var sep = new MenuSepComp(this.Div_gen, name, "menuitem_div", attrObj);
  this.sepIndex = this.seps.push(sep);
  sep.parentOwner = this;
  sep.index = this.sepIndex - 1;
  this.addItemHtml(sep);
  return sep;
};
ContextMenuComp.prototype.getMenu = function(id) {
  for (var i = 0; i < this.childItems.length; i++) {
    if (id == this.childItems[i].name) return this.childItems[i];
  }
  return null;
};
ContextMenuComp.prototype.addItemHtml = function(item) {
  var itemWidth = item.getItemWidth();
  if (itemWidth > this.width) this.childItemWidthUpdated(itemWidth);
  else item.setItemWidth(this.width);
  this.centerContent.appendChild(item.Div_gen);
};
ContextMenuComp.prototype.addItemChildMenu = function(childMenu, item) {
  childMenu.isChildMenu = true;
  childMenu.menuParent = this;
  this.childMenus.push(childMenu);
  this.childMenus = this.childMenus.concat(childMenu.childMenus);
  childMenu.posFix = true;
  document.body.appendChild(childMenu.Div_gen);
  if (childMenu.childMenus != null) {
    for (var i = 0; i < childMenu.childMenus.length; i++) document.body.appendChild(childMenu.childMenus[i].Div_gen);
  }
  if (item != null) item.setChildMenu(childMenu);
};
ContextMenuComp.prototype.addSeparator = function() {
  var oThis = this;
  var sep = $ce("DIV");
  sep.style.position = "relative";
  sep.style.width = "100%";
  sep.style.height = ContextMenuComp.SEP_HEIGHT + "px";
  sep.innerHTML = "<hr/>";
  sep.style.background = "#fff";
  sep.onmouseover = function(e) {
    e = EventUtil.getEvent();
    if (oThis.nowActiveMenu) {
      oThis.nowActiveMenu.fermezoneMenu();
      oThis.nowActiveMenu = "";
    }
    stopEvent(e);
    clearEventSimply(e);
  };
  this.add(sep);
};
ContextMenuComp.prototype.hide = function() {
  if (!this.visible) return;
  if (this.onBeforeClose() == false) return;
  for (var i = 0, count = this.childMenus.length; i < count; i++) {
    if (this.childMenus[i].visible == true) this.childMenus[i].hide();
  }
  if (this.childItems != null) {
    for (var i = 0, count = this.childItems.length; i < count; i++) {
      if (this.childItems[i].childMenu != null && this.childItems[i].childMenu.visible == true) this.childItems[i].childMenu.hide();
    }
  }
  this.triggerObjHtml = null;
  if (this.isChildMenu) this.menuParent.nowActiveMenu = null;
  this.Div_gen.style.display = "none";
  this.visible = false;
  this.onclose();
};
ContextMenuComp.prototype.show = function(e) {
  e = EventUtil.getEvent();
  if (arguments != null && arguments.length == 2) {
    this.triggerObjHtml = arguments[1];
  }
  if (this.onBeforeShow() == false) {
    clearEventSimply(e);
    return;
  }
  this.visible = true;
  this.Div_gen.style.left = "0px";
  this.Div_gen.style.top = "0px";
  this.Div_gen.style.display = "block";
  this.Div_gen.style.zIndex = getZIndex();
  if (this.isChildMenu) this.menuParent.nowActiveMenu = this;
  if (!this.posFix) positionneSelonEvent(this.Div_gen, e);
  else {
    positionneSelonPosFournie(this.Div_gen, this.top, this.left, this);
  }
  stopDefault(e);
  this.onshow();
  var selfHeight = this.Div_gen.offsetHeight;
  var scrollTop = document.body.scrollTop;
  var selfTop = this.Div_gen.offsetTop - scrollTop;
  var pointY = e.clientY;
  if (this.posFix) pointY = this.top;
  if (selfTop == pointY) {
    var bodyHeight = document.body.clientHeight - selfTop;
  } else {
    if (selfTop < 0) {
      selfTop = 0;
      this.Div_gen.style.top = "0px";
    }
    var bodyHeight = pointY - selfTop;
  }
  if (selfHeight > bodyHeight) {
    this.Div_gen.style.height = bodyHeight - 2 + "px";
    this.bottom_button.style.display = "block";
    this.top_button.style.display = "block";
  }
  clearEventSimply(e);
};
ContextMenuComp.prototype.mouseover = function(e) {
  this.onmouseover(e);
};
ContextMenuComp.prototype.mouseout = function(item) {
  this.onmouseout(item);
};
ContextMenuComp.prototype.click = function(e) {
  var menu = e.triggerItem.parentOwner;
  while (menu.isChildMenu) menu = menu.menuParent;
  if (menu.menubar) menu.menubar.click(e);
  else menu.onclick(e);
  menu.hide();
};
ContextMenuComp.prototype.getSelectedItems = function() {
  var items = this.childItems;
  var selItems = new Array();
  if (items != null && items.length > 0) {
    for (var i = 0, count = items.length; i < count; i++) {
      if (items[i].checkbox && items[i].checkbox.checked) selItems.push(items[i]);
    }
  }
  return selItems;
};
ContextMenuComp.prototype.getVisibleItems = function() {
  var items = this.childItems;
  var visibleItems = new Array();
  if (items != null && items.length > 0) {
    for (var i = 0, count = items.length; i < count; i++) {
      if (items[i].visible == true) visibleItems.push(items[i]);
    }
  }
  return visibleItems;
};
ContextMenuComp.prototype.hideItems = function(indice) {
  if (indice == null) return;
  for (var i = 0, count = indice.length; i < count; i++) {
    var index = indice[i];
    var item = this.childItems[index];
    item.Div_gen.style.display = "none";
    item.visible = false;
  }
};
ContextMenuComp.prototype.showItems = function(indice) {
  if (indice == null) return;
  for (var i = 0, count = indice.length; i < count; i++) {
    var index = indice[i];
    var item = this.childItems[index];
    item.Div_gen.style.display = "block";
    item.visible = true;
  }
};
ContextMenuComp.prototype.handleHotKey = function(key) {
  if (this.Div_gen.style.display == "none" || this.Div_gen.style.visibility == "hidden") return null;
  var childItems = this.childItems;
  if (childItems.length > 0) {
    for (var i = 0, n = childItems.length; i < n; i++) {
      var obj = childItems[i].handleHotKey(key);
      if (obj != null) return childItems[i];
    }
  }
  return null;
};
ContextMenuComp.prototype.getItemByIndex = function(index) {
  return this.childItems[index];
};
ContextMenuComp.prototype.onBeforeClose = function() {
  var simpleEvent = {
    "obj": this
  };
  this.doEventFunc("beforeClose", simpleEvent);
};
ContextMenuComp.prototype.onclose = function() {
  var simpleEvent = {
    "obj": this
  };
  this.doEventFunc("onclose", simpleEvent);
};
ContextMenuComp.prototype.onBeforeShow = function() {
  var simpleEvent = {
    "obj": this
  };
  this.doEventFunc("beforeShow", simpleEvent);
};
ContextMenuComp.prototype.onshow = function() {
  var simpleEvent = {
    "obj": this
  };
  this.doEventFunc("onshow", simpleEvent);
};
ContextMenuComp.prototype.onmouseout = function(item) {
  var menuItemEvent = {
    "obj": this,
    "item": item
  };
  this.doEventFunc("onmouseout", menuItemEvent);
};
ContextMenuComp.prototype.onmouseover = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onmouseover", mouseEvent);
};
ContextMenuComp.prototype.onclick = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onclick", mouseEvent);
};
MenuItemComp.prototype = new BaseComponent;
MenuItemComp.prototype.componentType = "MENUITEM";
MenuItemComp.DEFAULT_CAPTION = "EMPTY_CAPTION";
MenuItemComp.DEFAULT_ITEM = "";
MenuItemComp.ITEM_HEIGHT = 27;
MenuItemComp.IMAGE_WIDTH = 16;
MenuItemComp.rightImgDownPath = window.themePath + "/ui/ctrl/menu/images/dropdown.png";
MenuItemComp.rightImgDownOverPath = window.themePath + "/ui/ctrl/menu/images/dropdown_over.png";
MenuItemComp.rightImgDownSelectedPath = window.themePath + "/ui/ctrl/menu/images/dropdown_selected.png";
MenuItemComp.refImgRightPath = window.themePath + "/ui/ctrl/menu/images/dropright.png";
MenuItemComp.refImgRightOverPath = window.themePath + "/ui/ctrl/menu/images/dropright_over.png";
MenuItemComp.refImgRightSelectedPath = window.themePath + "/ui/ctrl/menu/images/dropright_selected.png";
MenuItemComp.SHOW_ALL = 0;
MenuItemComp.SHOW_TEXT = 1;
MenuItemComp.SHOW_IMG = 2;

function MenuItemComp(parent, id, caption, tip, refImg, className, isMenuBarItem, isCheckBoxGroup, isCheckBoxItem, isCheckBoxSelected, attrObj) {
  this.base = BaseComponent;
  this.base(id);
  var oThis = this;
  this.caption = getString(caption, MenuItemComp.DEFAULT_ITEM);
  this.refImg = refImg;
  this.refImgOn = null;
  this.refImgDisable = null;
  this.showModel = MenuItemComp.SHOW_TEXT;
  if (attrObj) {
    if (attrObj.imgIconOn) this.refImgOn = attrObj.imgIconOn;
    if (attrObj.imgIconDisable) this.refImgDisable = attrObj.imgIconDisable;
    this.showModel = getInteger(attrObj.showModel, MenuItemComp.SHOW_TEXT);
  }
  this.name = id;
  this.id = id;
  this.height = MenuItemComp.ITEM_HEIGHT;
  this.childMenu = null;
  this.disabled = false;
  this.isMenuBarItem = getBoolean(isMenuBarItem, false);
  if (this.isMenuBarItem) this.isCheckBoxGroup = getBoolean(isCheckBoxGroup, false);
  else {
    this.isCheckBoxItem = getBoolean(isCheckBoxItem, false);
    if (this.isCheckBoxItem) this.isCheckBoxSelected = getBoolean(isCheckBoxSelected, false);
  }
  this.visible = true;
  if (this.isMenuBarItem && this.isCheckBoxGroup) this.selectedItem = null;
  this.className = getString(className, "contextmenu_item_div");
  this.divCenterOffClassName = "divCenter_off";
  this.divCenterOnClassName = "divCenter_on";
  this.parentHTML = parent;
  this.tip = getString(tip, this.caption);
  if (MenuItemComp.SUSPEND_CREATE == null || MenuItemComp.SUSPEND_CREATE == false) this.create();
};
MenuItemComp.prototype.create = function() {
  var oThis = this;
  this.Div_gen = $ce("DIV");
  this.Div_gen.id = "menu_div_" + this.id;
  this.parentHTML.appendChild(this.Div_gen);
  this.Div_gen.className = this.className;
  this.Div_gen.style.overflow = "hidden";
  this.Div_gen.style.position = "relative";
  this.Div_gen.style.width = "auto";
  this.Div_gen.style.height = this.height + "px";
  this.Div_gen.owner = this;
  var content = this.createContent();
  if (null != content) this.Div_gen.appendChild(content);
  this.Div_gen.onclick = function(e) {
    if (oThis.isDblEvent("onclick")) return;
    document.onclick();
    e = EventUtil.getEvent();
    e.triggerItem = oThis;
    if (oThis.isMenuBarItem == true && oThis.parentOwner.componentType == "MENUBAR" && oThis.childMenu != null) {
      if (oThis.parentOwner.nowActiveMenu != null) {
        MenuItemComp.hideChildMenus(oThis.parentOwner.nowActiveMenu);
        oThis.parentOwner.nowActiveMenu.hide();
      }
      oThis.showChildMenu(e);
    }
    if (oThis.childMenu != null && oThis.childMenu != "") {
      stopAll(e);
      e.triggerItem = null;
      clearEventSimply(e);
      return;
    }
    e.triggerObj = oThis.parentOwner.triggerObj;
    if (oThis.onclick(e) != false) oThis.parentOwner.click(e);
    stopAll(e);
    e.triggerItem = null;
    e.triggerObj = null;
    clearEventSimply(e);
  };
  this.Div_gen.oncontextmenu = function(e) {
    e = EventUtil.getEvent();
    oThis.onBeforeShowMenu(e);
    oThis.oncontextmenu(e);
    clearEventSimply(e);
  };
  this.ctxChanged = false;
};
MenuItemComp.prototype.createContent = function() {
  var oThis = this;
  if (this.isMenuBarItem == false) {
    this.leftDiv = $ce("DIV");
    this.Div_gen.appendChild(this.leftDiv);
    this.leftDiv.className = "contextmenu_item_left_div_off";
    if (this.isCheckBoxItem) {
      this.checkbox = $ce("INPUT");
      this.checkbox.type = "checkbox";
      this.checkbox.className = "checkbox_box";
      this.leftDiv.appendChild(this.checkbox);
      if (this.isCheckBoxSelected) {
        this.checkbox.defaultChecked = true;
        this.checkbox.checked = true;
      } else {
        this.checkbox.defaultChecked = false;
        this.checkbox.checked = false;
      }
      this.checkbox.onclick = function(e) {
        e = EventUtil.getEvent();
        stopEvent(e);
        clearEventSimply(e);
      }
    }
  }
  if (this.refImg) {
    if (isNull(this.caption) || this.showModel != MenuItemComp.SHOW_TEXT) {
      if (this.isMenuBarItem == false) {
        this.changeImg(this.refImg);
      }
    }
  }
  this.divCaption = $ce("DIV");
  this.Div_gen.appendChild(this.divCaption);
  this.divCaption.className = "contextmenu_item_caption_off";
  this.divCaption.style.lineHeight = MenuItemComp.ITEM_HEIGHT + "px";
  this.divLeft = $ce("DIV");
  this.divCenter = $ce("DIV");
  this.divRight = $ce("DIV");
  this.divLeft.className = "divLeft_off";
  this.divCenter.className = this.divCenterOffClassName;
  this.divRight.className = "divRight_off";
  this.divCaption.appendChild(this.divLeft);
  if (this.className == 'white_menu_div') {
    this.divCenter.style.paddingLeft = (20 - 3) + "px";
  }
  this.divCaption.appendChild(this.divCenter);
  this.divCaption.appendChild(this.divRight);
  this.captionImgDiv = $ce("DIV");
  this.captionImgDiv.className = "captionTextDiv";
  if (this.divCenter && this.divCenter != 'undefined') {
    this.divCenter.appendChild(this.captionImgDiv);
  } else {
    this.divCaption.appendChild(this.captionImgDiv);
  }
  if (this.refImg && this.isMenuBarItem != false && (isNull(this.caption) || this.showModel != MenuItemComp.SHOW_TEXT)) {
    if (this.refImg) {
      this.divCaption.style.paddingTop = "0px";
      this.changeImg(this.refImg);
    }
    this.captionTextDiv = $ce("DIV");
    this.captionTextDiv.className = "captionTextDiv";
    this.changeCaption(this.caption);
    if (this.divCenter && this.divCenter != 'undefined') {
      this.divCenter.appendChild(this.captionTextDiv);
    } else {
      this.divCaption.appendChild(this.captionTextDiv);
    }
  } else if (this.isMenuBarItem != false) {
    if (this.divCenter && this.divCenter != 'undefined') {
      if (this.divCenter.children && this.divCenter.children.length > 0) {
        this.divCenter.children[0].innerHTML = this.caption;
      } else {
        var captionDiv = $ce("DIV");
        captionDiv.className = "captionTextDiv";
        captionDiv.innerHTML = this.caption;
        this.divCenter.appendChild(captionDiv);
      }
    } else {
      this.divCaption.innerHTML = this.caption;
    }
  } else if (!IS_IE) {
    if (this.divCenter && this.divCenter != 'undefined') {
      if (this.divCenter.children && this.divCenter.children.length > 0) {
        this.divCenter.children[0].innerHTML = "&nbsp;" + this.caption;
      } else {
        var captionDiv = $ce("DIV");
        captionDiv.className = "captionTextDiv";
        captionDiv.innerHTML = "&nbsp;" + this.caption;
        this.divCenter.appendChild(captionDiv);
      }
    } else {
      this.divCaption.innerHTML = "&nbsp;" + this.caption;
    }
  } else {
    if (this.divCenter && this.divCenter != 'undefined') {
      if (this.divCenter.children && this.divCenter.children.length > 0) {
        this.divCenter.children[0].innerHTML = "&nbsp;&nbsp;&nbsp;" + this.caption;
      } else {
        var captionDiv = $ce("DIV");
        captionDiv.className = "captionTextDiv";
        captionDiv.innerHTML = "&nbsp;&nbsp;&nbsp;" + this.caption;
        this.divCenter.appendChild(captionDiv);
      }
    } else {
      this.divCaption.innerHTML = "&nbsp;&nbsp;&nbsp;" + this.caption;
    }
  }
  this.divCaption.title = this.tip;
  if (this.childMenu != null && this.childMenu != "") {
    this.createRightDiv();
  }
  this.Div_gen.onmouseover = function(e) {
    if (!IS_IPAD) {
      if (oThis.divCenter && oThis.divCenter != 'undefined') {
        oThis.divCenter.className = oThis.divCenterOnClassName;
      }
      oThis.divCaption.className = "contextmenu_item_caption_on";
      var hasLeft = false;
      var hasRight = false;
      if (oThis.divLeft && oThis.divLeft != 'undefined') {
        oThis.divLeft.className = 'divLeft_on';
        hasLeft = true;
      }
      if (oThis.divRight && oThis.divRight != 'undefined') {
        oThis.divRight.className = 'divRight_on';
        hasRight = true;
      }
      if (oThis.rightImg) {
        if (oThis.isMenuBarItem == true) {
          oThis.rightImg.src = MenuItemComp.rightImgDownSelectedPath;
        } else {
          oThis.rightImg.src = MenuItemComp.refImgRightSelectedPath;
        }
      }
      if (hasLeft && hasRight) {} else if (hasLeft) {
        oThis.sep.className = 'menuitem_seperator_right_on';
      } else if (hasRight) {
        if (oThis.preMenuItem != null && oThis.preMenuItem.sep != null) oThis.preMenuItem.sep.className = 'menuitem_seperator_left_on';
      } else {
        if (oThis.preMenuItem != null && oThis.preMenuItem.sep != null) {
          oThis.preMenuItem.sep.className = 'menuitem_seperator_left_on';
        }
        oThis.sep.className = 'menuitem_seperator_right_on';
      }
      if (oThis.isMenuBarItem == false) oThis.leftDiv.className = "contextmenu_item_left_div_on";
    }
    e = EventUtil.getEvent();
    e.triggerItem = oThis;
    var parentOwner = oThis.parentOwner;
    e.triggerObj = parentOwner.triggerObj;
    oThis.onmouseover(e);
    if (oThis.isMenuBarItem == true && oThis.parentOwner.componentType == "MENUBAR") {
      e.triggerItem = null;
      e.triggerObj = null;
      clearEventSimply(e);
      return;
    }
    if (parentOwner.nowActiveMenu != null) {
      MenuItemComp.hideChildMenus(parentOwner.nowActiveMenu);
    }
    if (oThis.childMenu != null && oThis.childMenu != "") {
      oThis.showChildMenu(e);
    }
    if (parentOwner.mouseover != null) parentOwner.mouseover(e);
    stopEvent(e);
    e.triggerItem = null;
    e.triggerObj = null;
    clearEventSimply(e);
  };
  this.Div_gen.onmouseout = function(e) {
    e = EventUtil.getEvent();
    e.triggerItem = oThis;
    if (oThis.parentOwner) e.triggerObj = oThis.parentOwner.triggerObj;
    oThis.onmouseoutChangeClass();
    if (oThis.parentOwner && oThis.parentOwner.mouseout != null) oThis.parentOwner.mouseout(e);
    stopEvent(e);
    e.triggerItem = null;
    e.triggerObj = null;
    clearEventSimply(e);
  };
};
MenuItemComp.prototype.onmouseoutChangeClass = function() {
  oThis = this;
  oThis.divCaption.className = "contextmenu_item_caption_off";
  var hasLeft = false;
  var hasRight = false;
  if (oThis.divLeft && oThis.divLeft != 'undefined') {
    oThis.divLeft.className = 'divLeft_off';
    hasLeft = true;
  }
  if (oThis.divCenter && oThis.divCenter != 'undefined') {
    oThis.divCenter.className = oThis.divCenterOffClassName;
  }
  if (oThis.divRight && oThis.divRight != 'undefined') {
    oThis.divRight.className = 'divRight_off';
    hasRight = true;
  }
  if (oThis.rightImg) {
    if (oThis.isMenuBarItem == true) {
      oThis.rightImg.src = MenuItemComp.rightImgDownPath;
    } else {
      oThis.rightImg.src = MenuItemComp.refImgRightPath;
    }
  }
  if (hasLeft && hasRight) {} else if (hasLeft) {
    oThis.sep.className = 'menuitem_seperator';
  } else if (hasRight) {
    if (oThis.preMenuItem != null && oThis.preMenuItem.sep != null) {
      oThis.preMenuItem.sep.className = 'menuitem_seperator';
    }
  } else {
    if (oThis.preMenuItem != null && oThis.preMenuItem.sep != null) {
      oThis.preMenuItem.sep.className = 'menuitem_seperator';
    }
    oThis.sep.className = 'menuitem_seperator';
  }
  if (oThis.isMenuBarItem == false) oThis.leftDiv.className = "contextmenu_item_left_div_off";
  if (oThis.childMenu != null && oThis.childMenu != "") {
    oThis.rightDiv.className = "right_div";
    if (!oThis.isMenuBarItem) {
      this.Div_gen.style.backgroundColor = "#fff";
    }
  }
  if (oThis.isMenuBarItem) this.Div_gen.style.backgroundColor = "transparent";
};
MenuItemComp.prototype.destroySelf = function() {
  if (this.childMenu) {
    try {
      this.childMenu.destroySelf();
    } catch (e) {}
  }
  this.destroy();
};
MenuItemComp.prototype.showChildMenu = function(e) {
  this.rightDiv.className = "right_div_on";
  if (!this.isMenuBarItem) {
    this.Div_gen.style.backgroundColor = "#e5ebcc";
  }
  this.parentOwner.nowActiveMenu = this.childMenu;
  if (this.isMenuBarItem == true && this.parentOwner.componentType == "MENUBAR") {
    this.childMenu.setPosLeft(compOffsetLeft(this.Div_gen, document.body));
    this.childMenu.setPosTop(compOffsetTop(this.Div_gen, document.body) + this.Div_gen.offsetHeight + 1);
  } else {
    this.childMenu.setPosLeft(compOffsetLeft(this.parentOwner.Div_gen, document.body) + this.parentOwner.Div_gen.offsetWidth - 1);
    this.childMenu.setPosTop(compOffsetTop(this.Div_gen, document.body));
  }
  this.childMenu.show(e);
};
MenuItemComp.hideChildMenus = function(menu) {
  if (menu.nowActiveMenu != null) {
    MenuItemComp.hideChildMenus(menu.nowActiveMenu);
    menu.nowActiveMenu = null;
  }
  menu.hide();
};
MenuItemComp.prototype.setSelectedItem = function(menuItem) {
  if (menuItem == null) return;
  if (this.isMenuBarItem && this.isCheckBoxGroup) {
    var items = this.parentOwner.childMenu.childItems;
    if (items != null && items.length > 0) {
      for (var i = 0, count = items.length; i < count; i++) {
        if (items[i].name == menuItem.name) items[i].checkbox.checked = true;
        else items[i].checkbox.checked = false;
      }
    }
    this.selectedItem = menuItem;
  }
};
MenuItemComp.prototype.getItemWidth = function() {
  var textWidth = getTextWidth(this.caption, "contextmenu_item_caption_on") + 10;
  var padding = getStyleAttribute(this.divCaption, "paddingRight");
  if (padding == null || padding == "") padding = 0;
  else padding = parseInt(padding, 10);
  if (this.isMenuBarItem == true) {
    if (this.childMenu) return textWidth + 2 * padding + MenuItemComp.IMAGE_WIDTH;
    else return textWidth + 2 * padding + MenuItemComp.IMAGE_WIDTH;
  } else if (this.isMenuBarItem == false) {
    if (this.childMenu) return textWidth + 2 * padding + 2 * MenuItemComp.IMAGE_WIDTH;
    else return textWidth + 2 * padding + MenuItemComp.IMAGE_WIDTH;
  }
};
MenuItemComp.prototype.setItemWidth = function(eleWidth) {
  var width = "" + eleWidth;
  if (width.indexOf("%") != -1) {
    width = this.Div_gen.offsetWidth;
  } else if (width == 0) {
    width = this.Div_gen.offsetWidth;
  }
  this.width = width;
  if (this.isMenuBarItem == true) {
    if (width == 0 && !this.leftDiv) this.Div_gen.style.width = "auto";
    else this.Div_gen.style.width = (width) + "px";
  } else this.Div_gen.style.width = (width - 2) + "px";
  if (this.isMenuBarItem == true) {
    if (this.leftDiv) this.divCaption.style.width = width - MenuItemComp.IMAGE_WIDTH - 2 + "px";
  } else {
    if (this.childMenu) {
      this.divCaption.style.width = width - MenuItemComp.IMAGE_WIDTH - 10 + "px";
    } else this.divCaption.style.width = width - MenuItemComp.IMAGE_WIDTH - 2 + "px";
  }
};
MenuItemComp.prototype.setChildMenu = function(childMenu) {
  if (isNull(childMenu, false)) {
    throw Error("can't add an empty menu to item " + this.name);
    return;
  }
  if (isNotNull(this.childMenu, false)) {
    this.childMenu = childMenu;
    childMenu.parentMenu = this.parentOwner;
  } else {
    this.createRightDiv();
    this.childMenu = childMenu;
    childMenu.parentMenu = this.parentOwner;
    if (this.width != null && this.width != "100%") this.setItemWidth(this.width);
  }
};
MenuItemComp.prototype.getMenu = function(id) {
  if (this.childMenu != null) return this.childMenu.getMenu(id);
};
MenuItemComp.prototype.addMenu = function(itemName, itemCapiton, itemTip, itemRefImg, isCheckBoxItem, isCheckBoxSelected, attrObj) {
  if (this.childMenu == null || this.childMenu == "") {
    var div = this.doCreateContainer();
    var cMenu;
    if (div == null) {
      cMenu = new ContextMenuComp("", "", "", true);
    } else {
      cMenu = div;
      div.style.position = "absolute";
      div.style.display = "none";
      div.style.border = "1px solid blue";
      div.menus = [];
      div.addMenu = function(itemName, itemCapiton, itemTip, itemRefImg, isCheckBoxItem, isCheckBoxSelected, attrObj) {
        if (this.getItemContainer == null) {
          alert("must implement getItemContainer");
          return;
        }
        var itemContainer = this.getItemContainer();
        var item = null;
        if (this.createItem != null) {
          MenuItemComp.SUSPEND_CREATE = true;
          item = new MenuItemComp(itemContainer, itemName, itemCapiton, itemTip, itemRefImg, "menuitem_div", false, null, isCheckBoxItem, isCheckBoxSelected, attrObj);
          MenuItemComp.SUSPEND_CREATE = false;
          this.createItem(item);
          item.create();
        } else item = new MenuItemComp(itemContainer, itemName, itemCapiton, itemTip, itemRefImg, "menuitem_div", false, null, isCheckBoxItem, isCheckBoxSelected, attrObj);
        div.menus.push(item);
        item.parentOwner = this;
        return item;
      };
      div.getMenu = function(id) {
        for (var i = 0, n = this.menus.length; i < n; i++) {
          if (this.menus[i].id == id) {
            return this.menus[i];
          }
        }
      };
      div.setPosLeft = function(left) {
        this.style.left = (left - 3) + "px";
      };
      div.setPosTop = function(top) {
        this.style.top = (top - 5) + "px";
      };
      div.show = function() {
        this.style.display = "";
      };
      div.hide = function() {
        this.style.display = "none";
      };
      div.click = function(e) {
        this.hide();
      };
      window.clickHolders.push(div);
      div.outsideClick = function(e) {
        if (e != null && 2 == e.button) return;
        this.hide();
      };
      document.body.appendChild(div);
    }
    cMenu.menubar = this.menubar;
    cMenu.triggerObj = this;
    this.setChildMenu(cMenu);
  }
  var item = this.childMenu.addMenu(itemName, itemCapiton, itemTip, itemRefImg, isCheckBoxItem, isCheckBoxSelected, attrObj);
  return item;
};
MenuItemComp.prototype.addSep = function(attrObj) {
  var sep = this.childMenu.addSep(attrObj);
  return sep;
};
MenuItemComp.prototype.doCreateContainer = function() {
  return this.onContainerCreate();
};
MenuItemComp.prototype.onContainerCreate = function() {
  var simpleEvent = {
    "obj": this
  };
  var result = this.doEventFunc("onContainerCreate", simpleEvent);
  return result;
};
MenuItemComp.prototype.createRightDiv = function() {
  if (this.rightDiv) return;
  this.rightDiv = $ce("DIV");
  this.rightDiv.className = "right_div";
  if (this.divCenter && this.divCenter != 'undefined') {
    this.divCenter.appendChild(this.rightDiv);
  } else {
    this.Div_gen.appendChild(this.rightDiv);
  }
  this.rightImg = $ce("IMG");
  if (this.isMenuBarItem == true) {
    this.rightImg.style.width = "11px";
    this.rightImg.style.height = "8px";
    this.rightImg.style.verticalAlign = "middle";
    this.rightImg.src = MenuItemComp.rightImgDownPath;
    if (IS_IE7) {
      this.rightDiv.style.marginTop = (MenuItemComp.ITEM_HEIGHT - 8) / 2 + "px";
    }
  } else {
    this.rightImg.style.width = "11px";
    this.rightImg.style.height = "8px";
    this.rightImg.style.verticalAlign = "middle";
    this.rightImg.style.position = "relative";
    this.rightImg.src = MenuItemComp.refImgRightPath;
  }
  this.rightDiv.appendChild(this.rightImg);
  var removeWidth = this.oriWidth;
  this.oriWidth = this.Div_gen.offsetWidth;
  if (this.menuParent) {
    this.menuParent.resetMenuItemsWidth(this, removeWidth);
  }
};
MenuItemComp.prototype.removeChildMenu = function() {
  if (isNull(this.childMenu, false)) {
    log("the item" + this.name + "'s child menu is already null");
    return;
  }
  this.childMenu = null;
  this.imgWidth -= MenuItemComp.IMAGE_WIDTH;
  try {
    this.Div_gen.removeChild(this.rightImg);
  } catch (e) {}
  this.Div_gen.style.width = this.getItemWidth() + "px";
};
MenuItemComp.prototype.setActive = function(isActive) {
  var isActive = getBoolean(isActive, false);
  if (this.disabled == false && isActive == false) {
    this.mouseoutFunc = this.Div_gen.onmouseout;
    this.mouseoverFunc = this.Div_gen.onmouseover;
    this.clickFunc = this.Div_gen.onclick;
    this.divCaption.className = "contextmenu_item_caption_banned";
    this.onmouseoutChangeClass();
    if (document.all) {
      if (this.divCenter && this.divCenter.children.length > 0) {
        for (var i = 0; i < this.divCenter.children.length; i++) {
          this.divCenter.children[i].style.color = "#CCCCCC";
        }
      } else {
        this.divCaption.style.color = "#CCCCCC";
        if (this.sep) {
          this.sep.style.color = "#CCCCCC";
        }
      }
    } else {
      if (this.divCenter && this.divCenter.children.length > 0) {
        for (var i = 0; i < this.divCenter.children.length; i++) {
          this.divCenter.children[i].style.opacity = 0.4;
        }
      } else {
        this.Div_gen.style.opacity = 0.4;
      }
    }
    this.Div_gen.onmouseout = function() {};
    this.Div_gen.onmouseover = function() {};
    this.Div_gen.onclick = function() {};
    this.disabled = true;
    if (this.refImg && this.isMenuBarItem != false && (isNull(this.caption) || this.showModel != MenuItemComp.SHOW_TEXT)) {
      if (this.refImgDisable != null && this.refImgDisable != "") {
        if (this.divCenter && this.divCenter != 'undefined') {
          if (this.divCenter.firstChild && this.divCenter.firstChild.firstChild && this.divCenter.firstChild.firstChild.src) this.divCenter.firstChild.firstChild.src = this.refImgDisable;
        } else {
          if (this.divCenter.firstChild && this.divCenter.firstChild.firstChild && this.divCenter.firstChild.firstChild.src) this.divCaption.firstChild.firstChild.src = this.refImgDisable;
        }
      }
    }
  } else if (this.disabled == true && isActive == true) {
    this.Div_gen.onmouseout = this.mouseoutFunc;
    this.Div_gen.onmouseover = this.mouseoverFunc;
    this.Div_gen.onclick = this.clickFunc;
    this.divCaption.className = "contextmenu_item_caption_off";
    this.onmouseoutChangeClass();
    if (document.all) {
      if (this.divCenter && this.divCenter.children.length > 0) {
        for (var i = 0; i < this.divCenter.children.length; i++) {
          this.divCenter.children[i].style.color = "";
        }
      } else {
        this.divCaption.style.color = "";
        if (this.sep) {
          this.sep.style.color = "";
        }
      }
    } else {
      if (this.divCenter && this.divCenter.children.length > 0) {
        for (var i = 0; i < this.divCenter.children.length; i++) {
          this.divCenter.children[i].style.opacity = 1;
        }
      } else {
        this.Div_gen.style.opacity = 1;
      }
    }
    this.disabled = false;
    if (this.refImg && this.isMenuBarItem != false) {
      if (this.divCenter && this.divCenter != 'undefined') {
        if (this.divCenter.firstChild && this.divCenter.firstChild.firstChild && this.divCenter.firstChild.firstChild.src) this.divCenter.firstChild.firstChild.src = this.refImg;
      } else {
        if (this.divCenter.firstChild && this.divCenter.firstChild.firstChild && this.divCenter.firstChild.firstChild.src) this.divCaption.firstChild.firstChild.src = this.refImg;
      }
    }
  }
  this.ctxChanged = true;
  this.notifyChange(NotifyType.ENABLE, !this.disabled);
};
MenuItemComp.prototype.hide = function() {
  this.Div_gen.style.display = "none";
  if (this.sep) this.sep.style.display = "none";
  this.visible = false;
  if (this.divLeft.style.display == "block" || this.divLeft.style.display == "") {
    this.showNextItemLeftDiv();
  }
  if (this.divRight.style.display == "block" || this.divRight.style.display == "") {
    this.showPreItemRigetDiv();
  }
  var allHide = true;
  var preMenuItem = this.preMenuItem;
  while (preMenuItem != null) {
    if (preMenuItem.visible == true) {
      allHide = false;
      break;
    }
    preMenuItem = preMenuItem.preMenuItem;
  }
  if (this.menuParent && preMenuItem && preMenuItem.Div_gen.style.display != "none") {
    this.menuParent.lastShowItem = preMenuItem;
  }
  if (allHide == true) {
    var nextMenuItem = this.nextMenuItem;
    while (nextMenuItem != null) {
      if (nextMenuItem.visible == true) {
        allHide = false;
        break;
      }
      nextMenuItem = nextMenuItem.nextMenuItem;
    }
  }
  if (allHide == true) {
    var lastMenuItem = this.getLastMenuItem();
    if (lastMenuItem.sepDiv) lastMenuItem.sepDiv.style.display = "none";
  }
  this.ctxChanged = true;
  if (this.parentOwner && this.parentOwner.resetMenuItemsWidth) this.parentOwner.resetMenuItemsWidth();
};
MenuItemComp.prototype.show = function() {
  if (this.visible == true) return;
  this.Div_gen.style.display = "block";
  if (this.sep) this.sep.style.display = "block";
  this.visible = true;
  if (this.hidePreItemRigetDiv()) this.divLeft.style.display = "none";
  if (this.hideNextItemLeftDiv()) {
    if (this.sep) this.sep.style.display = "block";
    this.divRight.style.display = "none";
    this.divCenter.style.paddingRight = "20px";
  } else {
    if (this.sep) this.sep.style.display = "none";
  }
  var lastMenuItem = this.getLastMenuItem();
  if (lastMenuItem.sepDiv) lastMenuItem.sepDiv.style.display = "block";
  this.ctxChanged = true;
  this.parentOwner.resetMenuItemsWidth();
};
MenuItemComp.prototype.getLastMenuItem = function() {
  var menuItem = this;
  while (menuItem.nextMenuItem != null) {
    menuItem = menuItem.nextMenuItem;
  }
  return menuItem;
};
MenuItemComp.prototype.showNextItemLeftDiv = function() {
  if (this.nextMenuItem == null) return;
  if (this.nextMenuItem.visible == false) this.nextMenuItem.showNextItemLeftDiv();
  this.nextMenuItem.divLeft.style.display = "block";
  this.nextMenuItem.divCenter.style.paddingLeft = "14px";
  if (this.className == 'white_menu_div') {
    this.nextMenuItem.divCenter.style.paddingLeft = "17px";
  }
};
MenuItemComp.prototype.hideNextItemLeftDiv = function() {
  if (this.nextMenuItem == null) return false;
  if (this.nextMenuItem.visible == false) return this.nextMenuItem.hideNextItemLeftDiv();
  this.nextMenuItem.divLeft.style.display = "none";
  this.nextMenuItem.divCenter.style.paddingLeft = "20px";
  return true;
};
MenuItemComp.prototype.showPreItemRigetDiv = function() {
  if (this.preMenuItem == null) return;
  if (this.preMenuItem.visible == false) this.preMenuItem.showPreItemRigetDiv();
  if (this.preMenuItem.sep) this.preMenuItem.sep.style.display = "none";
  this.preMenuItem.divRight.style.display = "block";
  this.preMenuItem.divCenter.style.paddingRight = "14px";
  if (this.className == 'white_menu_div') {
    this.preMenuItem.divCenter.style.paddingLeft = "17px";
  }
};
MenuItemComp.prototype.hidePreItemRigetDiv = function() {
  if (this.preMenuItem == null) return false;
  if (this.preMenuItem.visible == false) return this.preMenuItem.hidePreItemRigetDiv();
  if (this.preMenuItem.sep) this.preMenuItem.sep.style.display = "block";
  this.preMenuItem.divRight.style.display = "none";
  this.preMenuItem.divCenter.style.paddingRight = "20px";
  return true;
};
MenuItemComp.prototype.hidePreMenuItemRight = function() {};
MenuItemComp.prototype.isActive = function() {
  return !this.disabled;
};
MenuItemComp.prototype.changeCaption = function(caption) {
  if (this.showModel == MenuItemComp.SHOW_IMG && this.refImg) return;
  caption = getString(caption, "");
  if (this.caption != caption) {
    this.caption = caption;
  }
  if (this.isMenuBarItem == false) {
    if (this.divCenter && this.divCenter != 'undefined') {
      if (this.divCenter.children && this.divCenter.children.length > 0) {
        this.divCenter.children[0].innerHTML = this.caption;
      } else {
        var captionDiv = $ce("DIV");
        captionDiv.className = "captionTextDiv";
        captionDiv.innerHTML = this.caption;
        this.divCenter.appendChild(captionDiv);
      }
    } else {
      this.divCaption.innerHTML = this.caption;
    }
  } else {
    if (MenuItemComp.SHOW_ALL == this.showModel && this.refImg) {
      if (this.caption == null || this.caption == "") {
        this.captionImgDiv.innerHTML = "";
      } else if (!IS_IE) this.captionImgDiv.innerHTML = "&nbsp;" + this.caption;
      else this.captionImgDiv.innerHTML = "&nbsp;&nbsp;&nbsp;" + this.caption;
    } else {
      if (this.divCenter && this.divCenter != 'undefined') {
        if (this.divCenter.children && this.divCenter.children.length > 0) {
          this.divCenter.children[0].innerHTML = this.caption;
        } else {
          var captionDiv = $ce("DIV");
          captionDiv.className = "captionTextDiv";
          captionDiv.innerHTML = this.caption;
          this.divCenter.appendChild(captionDiv);
        }
      } else {
        this.divCaption.innerHTML = this.caption;
      }
    }
  }
  this.ctxChanged = true;
  this.notifyChange(NotifyType.TEXT, this.caption);
};
MenuItemComp.prototype.changeImg = function(refImg) {
  if (this.refImg != refImg) {
    this.refImg = refImg;
  }
  if (this.leftImg != null) {
    this.leftImg.src = this.refImg;
  } else {
    this.leftImg = $ce("IMG");
    this.leftImg.src = this.refImg;
    if (this.isMenuBarItem == false) {
      this.leftImg.width = MenuItemComp.IMAGE_WIDTH - 4;
      this.leftImg.height = MenuItemComp.IMAGE_WIDTH - 4;
      this.leftImg.style.left = "2px";
      this.leftImg.style.verticalAlign = "middle";
      this.leftDiv.appendChild(this.leftImg);
    } else {
      this.leftImg.style.height = "16px";
      this.leftImg.style.width = "16px";
      this.leftImg.height = "16px";
      this.leftImg.width = "16px";
      this.leftImg.style.verticalAlign = "middle";
      if (IS_IE7) {
        this.leftImg.style.marginTop = (MenuItemComp.ITEM_HEIGHT - 16) / 2 + "px";
      }
      this.captionImgDiv.appendChild(this.leftImg);
    }
  }
  this.ctxChanged = true;
  this.notifyChange(NotifyType.CHANGEIMG, this.refImg);
};
MenuItemComp.prototype.getObjHtml = function() {
  return this.Div_gen;
};
MenuItemComp.prototype.onclick = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  return this.doEventFunc("onclick", mouseEvent);
};
MenuItemComp.prototype.onmouseover = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onmouseover", mouseEvent);
};
MenuItemComp.prototype.handleHotKey = function(key) {
  if (this.isActive() == false) return null;
  if (this.hotKey != null) {
    if (key == this.hotKey && this.onclick) {
      this.onclick(null);
      return this;
    }
  }
  if (this.childMenu) {
    var childItems = this.childMenu.childItems;
    if (childItems != null && childItems.length > 0) {
      for (var i = 0, n = childItems.length; i < n; i++) {
        var obj = childItems[i].handleHotKey(key);
        if (obj != null) return obj;
      }
    }
  }
  return null;
};
ContextMenuComp.prototype.getChangedContext = function() {
  if (this.changedObj == null) {
    this.changedObj = new Object;
    this.changedObj.id = this.id;
  }
  if (this.triggerObj != null) this.changedObj.triggerId = this.triggerObj.id;
  for (var i = 0, n = this.childItems.length; i < n; i++) {
    var ctx = this.childItems[i].getChangedContext();
    if (ctx == null) continue;
    hasChanged = true;
    if (this.changedObj["items"] == null) this.changedObj["items"] = new Array();
    this.changedObj["items"].push(ctx);
  }
  return this.changedObj;
};
ContextMenuComp.prototype.clearChange = function() {
  for (var i = 0, n = this.childItems.length; i < n; i++) {
    this.childItems[i].clearChange();
  }
};
MenuItemComp.prototype.getChangedContext = function() {
  if (this.childMenu) {
    var childItems = this.childMenu.childItems;
    if (childItems != null && childItems.length > 0) {
      for (var i = 0, n = childItems.length; i < n; i++) {
        var ctx = childItems[i].getChangedContext();
        if (ctx == null) continue;
        if (this.changedObj == null) {
          this.changedObj = new Object;
          this.changedObj.id = this.id;
        }
        if (this.changedObj["childs"] == null) this.changedObj["childs"] = new Array();
        this.changedObj["childs"].push(ctx);
      }
    }
  }
  return this.changedObj;
};
MenuItemComp.prototype.setChangedContext = function(context) {
  if (context.imgIcon != null && "" != context.imgIcon && context.imgIcon != this.refImg) this.changeImg(context.imgIcon);
  if (context.text != null && context.text != this.caption) this.changeCaption(context.text);
  if (context.enable != null && context.enable == this.disabled) this.setActive(context.enable);
  if (context.tip != null) this.divCaption.title = context.tip;
  if (context.visible != null && context.visible != this.visible) {
    if (context.visible == false) this.hide();
    else this.show();
  }
  if (context.childItemContexts) {
    for (var i = 0, n = context.childItemContexts.length; i < n; i++) {
      for (var j = 0, m = this.childMenu.childItems.length; j < m; j++) {
        if (this.childMenu.childItems[j].id == context.childItemContexts[i].id) {
          this.childMenu.childItems[j].setChangedContext(context.childItemContexts[i]);
          break;
        }
      }
    }
  }
};

function MenuSepComp(parent, id, className, attrObj) {
  this.base = BaseComponent;
  this.base(id);
  var oThis = this;
  if (attrObj) {}
  this.name = id;
  this.id = id;
  this.disabled = false;
  this.visible = true;
  this.className = getString(className, "contextmenu_item_div");
  this.height = getCssHeight(this.className + "_SEP_HEIGHT");
  this.parentHTML = parent;
  this.create();
};
MenuSepComp.prototype.create = function() {
  var oThis = this;
  this.Div_gen = $ce("DIV");
  this.parentHTML.appendChild(this.Div_gen);
  this.Div_gen.className = this.className;
  this.Div_gen.style.overflow = "hidden";
  this.Div_gen.style.position = "relative";
  this.Div_gen.style.width = "auto";
  this.Div_gen.style.height = this.height + "px";
  this.Div_gen.owner = this;
  var content = this.createContent();
  if (null != content) this.Div_gen.appendChild(content);
};
MenuSepComp.prototype.createContent = function() {
  var oThis = this;
  this.leftDiv = $ce("DIV");
  this.Div_gen.appendChild(this.leftDiv);
  this.leftDiv.className = "contextmenu_item_left_div_off";
  this.divCaption = $ce("DIV");
  this.Div_gen.appendChild(this.divCaption);
  this.divCaption.className = "contextmenu_sep_caption";
};
MenuSepComp.prototype.setItemWidth = function(eleWidth) {
  var width = new String(eleWidth);
  if (width.indexOf("%") != -1) width = this.Div_gen.offsetWidth;
  this.width = width - 1;
  this.Div_gen.style.width = (width - 2) + "px";
  this.divCaption.style.width = width - MenuItemComp.IMAGE_WIDTH - 2 + "px";
};
MenuSepComp.prototype.getItemWidth = function() {
  var textWidth = 0;
  var padding = getStyleAttribute(this.divCaption, "paddingRight");
  if (padding == null || padding == "") padding = 0;
  else padding = parseInt(padding, 10);
  return textWidth + 2 * padding + MenuItemComp.IMAGE_WIDTH;
};


HtmlContentComp.prototype = new BaseComponent;
HtmlContentComp.prototype.componentType = "HTMLCONTENT";

function HtmlContentComp(parent, name, left, top, width, height, position, className) {
  this.base = BaseComponent;
  this.base(name, left, top, width, height);
  this.parentOwner = parent;
  this.create();
}
HtmlContentComp.prototype.create = function() {
  this.Div_gen = this.parentOwner;
};
HtmlContentComp.prototype.setContent = function(html) {
  if (IS_IE) {
    this.Div_gen.innerHTML = "<span style='display: none'>uapweb</span>" + html;
  } else {
    this.Div_gen.innerHTML = html;
  }
};
HtmlContentComp.prototype.getContent = function() {
  return this.Div_gen.innerHTML;
};
HtmlContentComp.prototype.clearContent = function() {
  return this.Div_gen.innerHTML = '';
};
HtmlContentComp.prototype.addContent = function(obj) {
  this.Div_gen.appendChild(obj);
};
HtmlContentComp.prototype.setVisible = function(visible) {
  if (visible) this.showV();
  else this.hideV();
  this.notifyChange(NotifyType.VISIBLE, visible);
};
HtmlContentComp.prototype.removeContent = function(obj) {
  this.Div_gen.removeChild(obj);
};
HtmlContentComp.prototype.setChangedContext = function(context) {
  if (context.innerHTML) {
    this.setContent(context.innerHTML);
  }
  if (context.visible != null && this.visible != context.visible) this.setVisible(context.visible);
};

Dataset.prototype = new ListenerUtil;
Dataset.UPDATE_SAVE = 0;
Dataset.ALL_SAVE = 1;
Dataset.ALL_NOT_SAVE = 2;
Dataset.MASTER_KEY = "MASTER_KEY";

function Dataset(id, meta, lazyLoad, editable, pageSize, needCache) {
  ListenerUtil.call(this, true);
  this.id = id;
  this.metadata = meta;
  this.lazyLoad = lazyLoad;
  this.needCache = needCache;
  if (typeof(needCache) == "undefined") this.needCache = true;
  this.dataMap = new HashMap();
  this.reqParameterMap = new HashMap();
  this.resParameterMap = new HashMap();
  this.currentKey = "";
  this.sourceRefMap = null;
  this.compArr = new Array();
  this.undoArr = new Array();
  this.silent = false;
  this.editable = editable;
  this.editableChanged = false;
  this.operateStateArray = null;
  this.pageSize = pageSize;
  this.focusRowIndex = -1;
  this.randomRowIndex = 0;
};
Dataset.prototype.addField = function(field) {
  this.metadata.push(field);
};
Dataset.prototype.removeField = function(keyName) {
  for (var i = 0; i < this.metadata.length; i++) {
    if (this.metadata[i].key == keyName) {
      this.metadata.splice(i, 1);
      break;
    }
  }
};
Dataset.prototype.destroySelf = function() {};
Dataset.prototype.getResponseParameter = function(key) {
  return this.resParameterMap.get(key);
};
Dataset.prototype.genResParameter = function(rootNode) {
  this.resParameterMap.clear();
  var nodes = rootNode.selectNodes(EventContextConstant.res_parameters + "/" + EventContextConstant.parameter);
  if (nodes != null) {
    for (var i = 0; i < nodes.length; i++) this.resParameterMap.put(getNodeAttribute(nodes[i], "name"), getNodeValue(nodes[i]));
  }
};
Dataset.prototype.modifyStruct = function(newmeta) {
  this.metadata = newmeta;
};
Dataset.prototype.clear = function() {
  this.currentKey = "";
  this.dataMap.clear();
};
Dataset.prototype.setData = function(strXML, userObj) {
  this.dataStrXML = strXML;
  this.dataUserObj = userObj;
  if (!strXML) return;
  var dom = createXmlDom(strXML);
  var rootNode = dom.documentElement;
  this.genResParameter(rootNode);
  var isCleared = getBoolean(rootNode.getAttribute("isCleared"), false);
  if (isCleared) {}
  this.randomRowIndex = rootNode.getAttribute("randomRowIndex");
  var currentkey = rootNode.getAttribute("currentkey");
  if (currentkey == EventContextConstant.NULL) currentkey = "";
  var rowsetsEle = rootNode.selectSingleNode("rowsets");
  var rowsetList = rowsetsEle.selectNodes("rowset");
  var rowsetKeys = [];
  if (rowsetList != null && rowsetList.length > 0) {
    for (var i = 0; i < rowsetList.length; i++) {
      var rowsetEle = rowsetList[i];
      var keyValue = rowsetEle.getAttribute("keyvalue");
      if (keyValue == "$NULL") keyValue = "";
      var oldKeyValue = rowsetEle.getAttribute("oldkeyvalue");
      rowsetKeys.push(keyValue);
      if (oldKeyValue != null && oldKeyValue != "") {
        this.replaceKeyValue(keyValue, oldKeyValue);
      }
      var rowSet = this.dataMap.get(keyValue);
      if (rowSet == null) {
        rowSet = new RowSet(rowsetEle, this);
        this.dataMap.put(keyValue, rowSet);
      } else {
        rowSet.setData(rowsetEle);
      }
    }
  }
  var nowKeys = this.dataMap.keySet();
  for (var i = 0; i < nowKeys.length; i++) {
    if (rowsetKeys.indexOf(nowKeys[i]) == -1) {
      this.removeRowSet(nowKeys[i]);
    }
  }
  if (currentkey != this.currentKey) {
    var rowSet = this.getRowSet(currentkey);
    var pIndex = rowSet.pageindex;
    this.setCurrentPage(currentkey, pIndex, userObj);
  }
  var editable = rootNode.getAttribute("editable");
  if ((this.editable + "") != editable) {
    this.setEditable(editable == "true" ? true : false);
  }
  var focusIndex = rootNode.getAttribute("focusIndex");
  this.focusRowIndex = focusIndex;
  if (!this.silent) {
    var event = new FocusChangeEvent();
    event.focusIndex = this.focusRowIndex;
    event.currentRowIndex = this.focusRowIndex;
    event.currentRow = this.getRow(this.focusRowIndex);
    this.dispatchEvent(event);
  }
};
Dataset.prototype.setJsonData = function(jsonData, keyValue, pageindex, userObj) {
  var rowSet = this.dataMap.get(keyValue);
  if (rowSet == null) {
    rowSet = new RowSet(null, this);
    this.dataMap.put(keyValue, rowSet);
  }
  rowSet.setJsonData(jsonData, keyValue, pageindex);
  if (keyValue != this.currentKey) {
    this.setCurrentPage(keyValue, 0, userObj);
  }
};
Dataset.prototype.setMeta = function(jsonData) {
  if (jsonData && jsonData.precision) {
    var precisions = jsonData.precision;
    for (var field in precisions) {
      var precision = precisions[field];
      var index = this.nameToIndex(field);
      if (index == -1) continue;
      var metadata = this.metadata[index];
      if (metadata.precision == null || metadata.precision != precision) {
        metadata.precision = precision;
        var event = new MetaChangeEvent();
        event.colIndex = index;
        event.precision = precision;
        this.dispatchEvent(event);
      }
    }
  }
};
Dataset.prototype.setChangedContext = function(context) {
  if (context.fields) {
    for (var i = 0, n = context.fields.length; i < n; i++) {
      var fieldctx = context.fields[i];
      if (fieldctx && fieldctx.precision) {
        var precision = fieldctx.precision;
        var index = this.nameToIndex(fieldctx.id);
        if (index == -1) continue;
        var metadata = this.metadata[index];
        if (metadata.precision == null || metadata.precision != precision) {
          metadata.precision = precision;
          var event = new MetaChangeEvent();
          event.colIndex = index;
          event.precision = precision;
          this.dispatchEvent(event);
        }
      }
    }
  }
};
Dataset.prototype.getPageCount = function() {
  var rs = this.getCurrentRowSet();
  if (rs == null) return 0;
  return rs.pagecount;
};
Dataset.prototype.getPageIndex = function() {
  var rs = this.getCurrentRowSet();
  if (rs == null) return 0;
  return rs.pageindex;
};
Dataset.prototype.initialize = function(keyValue) {
  var rowSet = this.getCurrentRowSet();
  var event = new PageChangeEvent();
  event.parentKey = keyValue;
  event.oldParentKey = this.currentKey;
  event.pageIndex = 0;
  event.oldPageIndex = (rowSet == null) ? -1 : rowSet.pageindex;
  if (keyValue != null) this.currentKey = keyValue;
  else this.currentKey = Dataset.MASTER_KEY;
  var rowSet = new RowSet(null, this);
  rowSet.keyvalue = this.currentKey;
  this.dataMap.put(this.currentKey, rowSet);
  this.dispatchEvent(event);
  this.onAfterPageChange(event);
};
Dataset.prototype.setPageSize = function(pageSize) {
  this.pageSize = pageSize;
  this.dataMap.clear();
  this.setCurrentPage(-1, -1);
};
Dataset.prototype.removeRowSet = function(keyValue) {
  this.dataMap.remove(keyValue);
  if (keyValue == this.currentKey) {
    this.currentKey = "";
    this.setCurrentPage(-1, -1, null, keyValue);
  }
};
Dataset.prototype.clearData = function(keyValue) {
  if (keyValue == null) keyValue = this.currentKey;
  if (keyValue == null) return;
  this.dataMap.remove(keyValue);
  this.initialize(keyValue);
};
Dataset.prototype.replaceKeyValue = function(newKeyValue, oldKeyValue) {
  var dsContent = this.dataMap.get(oldKeyValue);
  if (dsContent) {
    this.dataMap.put(newKeyValue, dsContent);
    this.dataMap.remove(oldKeyValue);
    if (this.currentKey == oldKeyValue) this.currentKey = newKeyValue;
  }
};
Dataset.prototype.appendCurrentPage = function(userObj, queryKey) {
  this.reqParameterMap.put(IDatasetConstant.QUERY_KEYVALUE, queryKey);
  this.onDataLoad(this.currentKey, 0, userObj);
  return;
};
Dataset.prototype.setCurrentPage = function(keyValue, index, userObj, currKey, isRefresh, append) {
  var oldCurrentKey = this.currentKey;
  if (keyValue == -1 || keyValue == "") {
    if (currKey != null && currKey != "") this.dataMap.remove(currKey);
    this.currentKey = "";
    if (!this.silent) {
      var event = new PageChangeEvent();
      event.oldParentKey = oldCurrentKey;
      this.dispatchEvent(event);
    }
    return;
  }
  if (keyValue == null) {
    if (this.currentKey == "" || this.currentKey == "-1") keyValue = Dataset.MASTER_KEY;
    else keyValue = this.currentKey;
  }
  if (!index) index = 0;
  index = parseInt(index);
  if (index == -1) {
    var rowSet = this.dataMap.get(keyValue);
    if (rowSet != null) rowSet.pageindex = -1;
    if (!this.silent) {
      var event = new PageChangeEvent();
      this.dispatchEvent(event);
    }
  }
  if (!this.isDataRequested(keyValue, index) || (isRefresh != null && isRefresh == true) || append) {
    this.reqParameterMap.put(IDatasetConstant.QUERY_PARAM_KEYVALUE, keyValue);
    this.reqParameterMap.put(IDatasetConstant.QUERY_PARAM_PAGEINDEX, index);
    this.onDataLoad(keyValue, index, userObj);
    return;
  }
  var rowSet = this.dataMap.get(keyValue);
  if (rowSet != null) {
    if (index > rowSet.pagecount - 1) {
      alert("the page index:" + index + " is not right");
      return;
    }
    if (this.onBeforePageChange(keyValue, index) == false) return;
    var event = new PageChangeEvent();
    event.parentKey = keyValue;
    event.oldParentKey = this.currentKey;
    event.pageIndex = index;
    event.oldPageIndex = rowSet.pageindex;
    event.userObject = userObj;
    this.currentKey = keyValue;
    rowSet.pageindex = index;
    if (!this.silent) this.dispatchEvent(event);
    if (this.onInternalPageChange) {
      this.onInternalPageChange(event);
    }
    if (!this.silent) this.onAfterPageChange(event);
  }
  var indices = rowSet.getSelectedIndices();
  if (indices != null && indices.length > 0) {
    for (var i = 0; i < indices.length; i++) {
      this.addRowSelectedInternal(indices[i], true, true);
    }
  }
};
Dataset.prototype.setReqParameterMap = function(paramMap) {
  this.reqParameterMap = paramMap;
};
Dataset.prototype.addReqParameter = function(key, value) {
  this.reqParameterMap.put(key, value);
};
Dataset.prototype.getRows = function() {
  var rowSet = this.getCurrentRowSet();
  if (rowSet == null) return null;
  return rowSet.getRows();
};
Dataset.prototype.getAllRows = function() {
  var rowSets = this.getRowSets();
  var rows = new Array;
  for (var i = 0; i < rowSets.length; i++) {
    var rowSet = rowSets[i];
    var tempRows = rowSet.getAllRows();
    if (tempRows != null) {
      for (var j = 0; j < tempRows.length; j++) rows.push(tempRows[j]);
    }
  }
  return rows;
};
Dataset.prototype.getRowIndexById = function(id) {
  var rows = this.getAllRows();
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].rowId == id) return i;
  }
  return -1;
};
Dataset.prototype.getRowsByScale = function(startIndex, count) {
  var rowSet = this.dataMap.get(this.currentKey);
  if (rowSet == null) return null;
  return rowSet.getRowsByScale(startIndex, count);
};
Dataset.prototype.getCurrentRowSet = function() {
  return this.getRowSet(this.currentKey);
};
Dataset.prototype.getRowSet = function(keyValue) {
  if (keyValue == null) {
    return null;
  }
  return this.dataMap.get(keyValue);
};
Dataset.prototype.getRowSets = function() {
  return this.dataMap.values();
};
Dataset.prototype.bindComponent = function(comp) {
  if (comp.treeLevel != null || comp.withRoot != null) {
    this.treeFlag = true;
  }
  if (this.compArr.indexOf(comp) != -1) return;
  if (this.lazyLoad == false) {
    if (!this.dsLoaded) {
      this.dsLoaded = true;
      this.setCurrentPage(Dataset.MASTER_KEY, 0);
      this.reqParameterMap.remove("openBillId");
    }
  }
  this.compArr.push(comp);
};
Dataset.lazyLoadDs = function(ds) {
  if (!ds.widget.initialized) {
    setTimeout("Dataset.doLazyLoadDs('" + ds.widget.id + "', '" + ds.id + "')", 20);
    return;
  }
};
Dataset.doLazyLoadDs = function(widgetId, dsId) {
  var ds = pageUI.getWidget(widgetId).getDataset(dsId);
  if (!ds.widget.initialized) {
    setTimeout("Dataset.doLazyLoadDs('" + widgetId + "', '" + dsId + "')", 20);
    return;
  }
  if (!ds.dsLoaded) {
    ds.dsLoaded = true;
    ds.setCurrentPage(Dataset.MASTER_KEY, 0);
    ds.reqParameterMap.remove("openBillId");
  }
};
Dataset.prototype.unbindComponent = function(comp) {
  var compindex = new Array();
  for (var i = 0; i < this.compArr.length; i++) {
    if (this.compArr[i] == comp) compindex.push(o);
  }
  for (var i = 0; i < compindex.length; i++) {
    this.compArr.splice(compindex[i], 1);
  }
};
Dataset.prototype.setEditable = function(editable) {
  this.editableChanged = true;
  this.editable = editable;
  for (var i = 0; i < this.compArr.length; i++) {
    if (this.compArr[i].setEditable) this.compArr[i].setEditable(editable);
  }
};
Dataset.prototype.isEditable = function(editable) {
  return this.editable;
};
Dataset.prototype.getPaginations = function() {
  var compArr = new Array;
  for (var i = 0; i < this.compArr.length; i++) {
    if (this.compArr[i] instanceof PaginationComp) compArr.push(this.compArr[i]);
  }
  return compArr;
};
Dataset.getRandomRowId = function() {
  var id = "1" + (new Date().getTime());
  var random = Math.random();
  var str = (random * 10000000000).toString();
  id += str.substring(0, 10);
  return id;
};
Dataset.prototype.nextRow = function() {
  this.changeDisplayRow(0);
};
Dataset.prototype.lastRow = function() {
  this.changeDisplayRow(3);
};
Dataset.prototype.firstRow = function() {
  this.changeDisplayRow(2);
};
Dataset.prototype.preRow = function() {
  this.changeDisplayRow(1);
};
Dataset.prototype.changeDisplayRow = function(type) {
  var dsContent = this.dataMap.get(this.currentKey);
  if (dsContent == null) throw new Error("no data");
  var currPage = dsContent.currPage;
  var oldRow = null;
  if (dsContent.selectArr[currPage].selectedIndices == null) dsContent.selectArr[currPage].selectedIndices = new Array();
  else if (dsContent.selectArr[currPage].selectedIndices.length > 0) oldRow = dsContent.getRow(dsContent.selectArr[currPage].selectedIndices[0]);
  var index = -1;
  if (type == 0) {
    if (oldRow != null) index = this.getRowIndex(oldRow);
    if (index == -1) index = 0;
    else if (index >= this.getRows().length - 1) index = 0;
    else index = index + 1;
  } else if (type == 1) {
    if (oldRow != null) index = this.getRowIndex(oldRow);
    if (index == -1) index = 0;
    else if (index == 0) index = this.getRows().length - 1;
    else index = index - 1;
  } else if (type == 2) {
    index = 0;
  } else if (type == 3) {
    index = this.getRows().length - 1;
  }
  this.addRowSelectedInternal(index, false);
};
Dataset.prototype.getRowIndex = function(row, pageIndex, keyValue) {
  var indices = this.getRowIndices([row], pageIndex, keyValue);
  return (indices == null || indices.length == 0) ? -1 : indices[0];
};
Dataset.prototype.getRowIndices = function(rows, pageIndex, keyValue) {
  var rs = null;
  if (keyValue == null) rs = this.getCurrentRowSet();
  else rs = this.getRowSet(keyValue);
  if (rs == null) return null;
  var rd = null;
  if (pageIndex == null || pageIndex == -1) {
    rd = rs.getCurrentRowData();
  } else {
    rd = rs.getRowData(pageIndex);
  }
  if (rd == null) return null;
  return rd.getRowIndices(rows);
};
Dataset.prototype.getCurrentRowData = function() {
  var rs = this.getCurrentRowSet();
  if (rs == null) return null;
  return rs.getCurrentRowData();
};
Dataset.prototype.dispatchEvent = function(event) {
  if (this.recordUndoSign) {
    if (!(event instanceof DatasetUndoEvent)) {
      this.undoArr.push(event);
    }
  }
  for (var i = 0; i < this.compArr.length; i++) {
    this.compArr[i].onModelChanged(event, this);
  }
  this.widget.dispatchEvent2Ds(event, this.id);
};
Dataset.prototype.setFocusRowIndex = function(index) {
  if (index < 0) this.focusRowIndex = -1;
  else this.focusRowIndex = index;
  var event = new FocusChangeEvent();
  event.focusIndex = this.focusRowIndex;
  event.currentRowIndex = this.focusRowIndex;
  event.currentRow = this.getRow(this.focusRowIndex);
  this.dispatchEvent(event);
  this.onFocusChange(event);
  rowData = this.getCurrentRowData();
  if (rowData != null) rowData.notifyChange(NotifyType.FOCUS, this.focusRowIndex);
};
Dataset.prototype.getFocusRowIndex = function() {
  return this.focusRowIndex;
};
Dataset.prototype.getFocusRow = function() {
  return this.getRow(this.focusRowIndex);
};
Dataset.prototype.setRowSelected = function(index) {
  this.addRowSelectedInternal(index, false);
};
Dataset.prototype.addRowSelected = function(index) {
  this.addRowSelectedInternal(index, true);
};
Dataset.prototype.addRowSelectedInternal = function(indices, isAdd, isSetCurrentPage) {
  isSetCurrentPage = getBoolean(isSetCurrentPage, false);
  var index = indices;
  if (indices instanceof Array) {
    index = indices[0];
  }
  var rowSet = this.dataMap.get(this.currentKey);
  if (rowSet == null) throw new Error("no data");
  var rowData = rowSet.getCurrentRowData();
  var selIndices = rowData.getSelectedIndices();
  if (selIndices != null && selIndices.length > 0) {
    if (!isAdd) {
      var curSelRow = this.getRow(selIndices[0]);
      if (curSelRow != null && (curSelRow.state == DatasetRow.STATE_UPD || curSelRow.state == DatasetRow.STATE_NEW)) {
        this.checkDatasetRow(curSelRow);
      }
    }
  }
  if (this.onBeforeRowSelect(index) == false) return false;
  var event = new RowSelectEvent();
  var unSelEvent = null;
  var newSelected = false;
  event.lastSelectedIndices = selIndices;
  if (indices instanceof Array) {
    event.isMultiSelect = true;
  }
  if (selIndices == null) {
    rowData.selectedIndices = new Array();
    selIndices = rowData.getSelectedIndices();
  } else if (selIndices.length > 0) {
    unSelEvent = new RowUnSelectEvent();
    unSelEvent.currentRowIndex = selIndices[0];
    if (!isAdd || index == -1) selIndices.splice(0, selIndices.length);
  }
  if (index != -1) {
    var newRow = this.getRows()[index];
    if (indices instanceof Array) {
      for (var i = 0; i < indices.length; i++) {
        var id = indices[i];
        var iid = selIndices.indexOf(id);
        if (iid == -1) {
          selIndices.push(id);
          newSelected = true;
        }
      }
    } else {
      var iid = -1;
      if (selIndices.length > 0) iid = selIndices.indexOf(index);
      if (iid == -1) {
        selIndices.push(index);
        newSelected = true;
      }
    }
    event.currentRow = newRow;
    event.currentRowIndex = index;
  }
  event.isAdd = isAdd;
  if (!this.silent && (newSelected || isSetCurrentPage)) {
    if (!isAdd) this.dispatchEvent(unSelEvent);
    this.dispatchEvent(event);
  }
  if (!this.silent && (newSelected || isSetCurrentPage)) {
    this.onAfterRowSelect(event);
  }
  rowData.notifyChange(NotifyType.SELECTED, selIndices);
};
Dataset.prototype.setError = function(rowIndex, colIndex, msg) {
  var event = new DataCheckEvent();
  event.cellColIndices = [colIndex];
  event.currentRow = this.getRow(rowIndex);
  event.rulesDescribe = [msg];
  this.dispatchEvent(event);
};
Dataset.prototype.clearError = function(rowIndex, colIndex) {
  var event = new DataCheckEvent();
  event.cellColIndices = [colIndex];
  event.currentRow = this.getRow(rowIndex);
  event.rulesDescribe = [""];
  this.dispatchEvent(event);
};
Dataset.prototype.setRowUnSelected = function(index) {
  this.getCurrentRowData().setRowUnSelected(index);
};
Dataset.prototype.setAllRowUnSelected = function() {
  var rowSet = this.dataMap.get(this.currentKey);
  if (rowSet == null) return null;
  rowSet.setAllRowUnSelected();
};
Dataset.prototype.getSelectedRows = function() {
  var rowSet = this.dataMap.get(this.currentKey);
  if (rowSet == null) return null;
  return rowSet.getSelectedRows();
};
Dataset.prototype.getSelectedRow = function() {
  var rows = this.getSelectedRows();
  return rows == null ? null : rows[0];
};
Dataset.prototype.getAllSelectedRows = function() {
  var rowArr = new Array;
  var rowSets = this.getRowSets();
  for (var i = 0; i < rowSets.length; i++) {
    var selRows = rowSets[i].getAllSelectedRows();
    if (selRows != null) {
      for (var j = 0; j < selRows.length; j++) rowArr.push(selRows[j]);
    }
  }
  return rowArr;
};
Dataset.prototype.getSelectedIndex = function() {
  var indices = this.getSelectedIndices();
  if (indices == null || indices.length == 0) return -1;
  return indices[0];
};
Dataset.prototype.getSelectedIndices = function() {
  var rowSet = this.dataMap.get(this.currentKey);
  if (rowSet == null) return null;
  var indices = rowSet.getSelectedIndices(rowSet.pageindex);
  if (indices == null) return indices;
  return indices;
};
Dataset.prototype.getUpdatedRows = function(pageIndex) {
  var dsContent = this.dataMap.get(this.currentKey);
  if (dsContent == null) throw new Error("no data");
  var currPage = pageIndex ? pageIndex : dsContent.currPage;
  var records = dsContent.getRows(currPage);
  if (records == null) return null;
  var rsArr = new Array();
  for (var i = 0; i < records.length; i++) {
    if (records[i].state == DatasetRow.STATE_UPD) rsArr.push(records[i]);
  }
  return rsArr;
};
Dataset.prototype.getDeletedRows = function() {
  var dsContent = this.getDsContent();
  if (dsContent == null) return null;
  var delArr = dsContent.deletedRows;
  if (delArr == null) return null;
  var arr = new Array;
  for (var i = 0; i < delArr.length; i++) {
    var row = delArr[i].clone();
    row.state = DatasetRow.STATE_DEL;
    row.rowId = delArr[i].rowId;
    arr.push(row);
  }
  return arr;
};
Dataset.prototype.getNewAddedRows = function(pageIndex) {
  var dsContent = this.dataMap.get(this.currentKey);
  if (dsContent == null) throw new Error("no data");
  var currPage = pageIndex ? pageIndex : dsContent.currPage;
  var records = dsContent.getRows(currPage);
  if (records == null) return records;
  var rsArr = new Array();
  for (var i = 0; i < records.length; i++) {
    if (records[i].state == DatasetRow.STATE_NEW) rsArr.push(records[i]);
  }
  return rsArr;
};
Dataset.prototype.clearState = function() {
  var dsContent = this.dataMap.get(this.currentKey);
  if (dsContent != null) {
    var records = dsContent.getRows(-1);
    if (records != null) {
      for (var i = 0; i < records.length; i++) records[i].state = DatasetRow.STATE_NRM;
    }
    dsContent.deletedRows = null;
  }
  var event = new StateClearEvent();
  this.dispatchEvent(event);
};
Dataset.prototype.recordUndo = function() {
  this.clearUndo();
  this.recordUndoSign = true;
};
Dataset.prototype.undo = function() {
  if (this.undoArr != null && this.undoArr.length > 0) {
    var undoEvent = new DatasetUndoEvent();
    this.silent = true;
    var event = null;
    log("begin to undo");
    while (this.undoArr.length > 0) {
      event = this.undoArr.pop();
      if (RowSelectEvent.prototype.isPrototypeOf(event)) {
        this.setRowUnSelected(event.currentRowIndex);
      } else if (RowUnSelectEvent.prototype.isPrototypeOf(event)) {
        this.setRowSelected(event.currentRowIndex);
      } else if (RowInsertEvent.prototype.isPrototypeOf(event)) {
        var indices = new Array();
        for (var i = event.insertedRows.length - 1; i >= 0; i--) {
          indices.push(event.insertedIndex + i);
        }
        this.deleteRows(indices);
      } else if (DataChangeEvent.prototype.isPrototypeOf(event)) {
        this.setValueAt(event.cellRowIndex, event.cellColIndex, event.oldValue);
      } else if (RowDeleteEvent.prototype.isPrototypeOf(event)) {
        for (var i = 0; i < event.deletedIndices.length; i++) {
          this.insertRow(event.deletedIndices[i], event.deletedRows[i]);
        }
      } else if (PageChangeEvent.prototype.isPrototypeOf(event)) {
        var oldParentKey = event.oldParentKey;
        if (oldParentKey == null) oldParentKey = -1;
        this.setCurrentPage(oldParentKey, event.oldPageIndex);
      }
    }
    log("undo complete");
    this.silent = false;
    this.dispatchEvent(undoEvent);
    this.recordUndoSign = false;
  }
  this.clearState();
};
Dataset.prototype.clearUndo = function() {
  this.undoArr.clear();
};
Dataset.prototype.isDataRequested = function(keyValue, index) {
  var rowSet = this.dataMap.get(keyValue);
  if (index == -1) return true;
  if (rowSet == null) return false;
  var pageIndex = index;
  if (index == null || typeof(index) == "undefined") pageIndex = rowSet.getPageIndex();
  if (pageIndex == -1) return true;
  var rowData = rowSet.getRowData(pageIndex);
  if (this.treeFlag != true && this.pageSize > 0 && rowData != null && rowData.rows != null && rowData.rows.length > this.pageSize) {
    rowSet.rowDatas = new Array();
    return false;
  }
  if (pageIndex == 0 && rowSet.pagecount > 1) {
    return (rowSet.getRowData(pageIndex) != null && rowSet.getRowData(pageIndex).rows.length > 0);
  }
  return rowSet.getRowData(pageIndex) != null;
};
Dataset.prototype.getRow = function(index) {
  var rows = this.getRows();
  if (rows != null) return rows[index];
  return null;
};
Dataset.prototype.deleteRow = function(index) {
  this.deleteRows([index]);
};
Dataset.prototype.deleteRows = function(rowIndices) {
  var oldRows = this.getRows();
  var delAll = false;
  if (rowIndices == -1) {
    rowIndices = new Array;
    delAll = true;
    var count = this.getRowCount();
    for (var i = 0; i < count; i++) rowIndices.push(i);
  } else {
    rowIndices = rowIndices.sort(defaultIntSort);
  }
  var tmpRows = new Array;
  var selIndices = this.getSelectedIndices();
  for (var i = rowIndices.length - 1; i >= 0; i--) {
    removeFromArray(selIndices, rowIndices[i]);
    if (selIndices != null) {
      for (var j = 0; j < selIndices.length; j++) {
        if (selIndices[j] > rowIndices[i]) selIndices[j]--;
      }
    }
    var delRow = oldRows[rowIndices[i]];
    if (delRow == null) {
      continue;
    }
    oldRows.splice(rowIndices[i], 1);
    var dsContent = this.dataMap.get(this.currentKey);
    if (delRow.state != DatasetRow.STATE_NEW) {
      if (dsContent.deletedRows == null) dsContent.deletedRows = new Array;
      dsContent.deletedRows.push(delRow);
    }
    tmpRows.push(delRow);
  }
  if (!this.silent) {
    var event = new RowDeleteEvent();
    event.deletedRows = tmpRows;
    event.deletedIndices = rowIndices;
    event.deleteAll = delAll;
    this.dispatchEvent(event);
    this.onAfterRowDelete(event);
  }
};
Dataset.prototype.getTotalCount = function() {};
Dataset.prototype.getRowSize = function() {
  return this.metadata.length;
};
Dataset.prototype.getPageSize = function() {
  return this.pageSize;
};
Dataset.prototype.getRowCount = function() {
  var rd = this.getCurrentRowData();
  if (rd == null) return 0;
  return rd.getRowCount();
};
Dataset.prototype.getRowCount = function() {
  var rd = this.getCurrentRowData();
  if (rd == null) return 0;
  return rd.getRowCount();
};
Dataset.prototype.getAllRowCount = function() {
  var rs = this.getCurrentRowSet();
  if (rs == null) return 0;
  return rs.getAllRowCount();
};
Dataset.prototype.setValueAt = function(rowIndex, colIndex, value) {
  var rd = this.getCurrentRowData();
  if (rd != null) rd.setValueAt(rowIndex, colIndex, value);
};
Dataset.prototype.setValuesAt = function(rowIndices, colIndex, values) {
  var rd = this.getCurrentRowData();
  if (rd != null) {
    var event = new DataChangeEvent();
    event.isBatch = true;
    event.cellColIndex = colIndex;
    event.currentValue = values[0];
    event.datasetId = this.id;
    for (var i = 0; i < rowIndices.length; i++) {
      var row = this.getRow(rowIndices[i]);
      var oldValue = row.setCellValue(colIndex, values[i]);
      oldValue = oldValue ? oldValue : " ";
    }
    if (!this.silent) {
      this.dispatchEvent(event);
      this.onAfterDataChange(event);
    }
  }
};
Dataset.prototype.setValueAtByKey = function(rowIndex, key, value, withTrigger) {
  var colIndex = this.nameToIndex(key);
  this.setValueAt(rowIndex, colIndex, value, withTrigger);
};
Dataset.prototype.getValueAt = function(rowIndex, colIndex) {
  var row = this.getRow(rowIndex);
  if (row != null) return row == null ? null : row.getCellValue(colIndex);
};
Dataset.prototype.setRow = function(rowIndex, row) {
  alert("now implemented");
};
Dataset.prototype.addEmptyRow = function() {
  return this.insertEmptyRow(this.getRowCount());
};
Dataset.prototype.insertEmptyRow = function(rowIndex) {
  if (rowIndex == null) {
    alert("rowIndex is null in function insertEmptyRow");
    return;
  }
  var row = this.getEmptyRow();
  this.insertRow(rowIndex, row);
  return row;
};
Dataset.prototype.getEmptyRow = function() {
  this.randomRowIndex++;
  var row = new DatasetRow(null, this.metadata.length);
  var rowCount = this.getRowCount(),
    lastRow = null;
  for (var i = 0, count = this.metadata.length; i < count; i++) {
    var defValue = this.metadata[i].dftValue;
    if (defValue != null) defValue = decodeURIComponent(defValue);
    row.setCellValue(i, defValue);
    if (this.metadata[i].isLock == true && rowCount > 0) {
      if (lastRow == null) lastRow = this.getRow(rowCount - 1);
      row.setCellValue(i, lastRow.getCellValue(i));
    }
  }
  row.triggerRow = true;
  return row;
};
Dataset.prototype.addRow = function(row) {
  return this.insertRow(this.getRowCount(), row);
};
Dataset.prototype.insertRow = function(rowIndex, row) {
  return this.insertRows(rowIndex, [row]);
};
Dataset.prototype.insertRows = function(rowIndex, rows) {
  if (this.onBeforeRowInsert(rowIndex, rows) == false) return;
  if (rows != null) {
    var oldRows = this.getRows();
    if (oldRows == null) {
      alert("the current data block is not initialized, key is:" + this.currentKey);
      return;
    }
    var rd = this.getCurrentRowData();
    for (var i = 0; i < rows.length; i++) {
      rows[i].state = DatasetRow.STATE_NEW;
      oldRows.splice(rowIndex + i, 0, rows[i]);
      rows[i].rowData = rd;
    }
  }
  var event = new RowInsertEvent();
  event.insertedRows = rows;
  event.insertedIndex = rowIndex;
  if (!this.silent) {
    this.dispatchEvent(event);
    this.onAfterRowInsert(event);
  }
  if (rows != null) {
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      if (row.triggerRow == null) continue;
      row.triggerRow = null;
      var rowSize = row.getSize();
      for (var j = 0; j < rowSize; j++) {
        var cellValue = row.getCellValue(j);
        if (cellValue == null) continue;
        var triggerRef = false;
        if (this.metadata[j].sourceRefField != null) {
          if (row.getCellValue(j) != null && row.getCellValue(j - 1) == null) triggerRef = true;
        }
        row.setCellValue(j, null);
        this.setValueAt(rowIndex + i, j, cellValue, triggerRef);
      }
    }
  }
  return rowIndex;
};
Dataset.prototype.removeRow = function(index) {
  this.removeRows([index]);
};
Dataset.prototype.removeRows = function(rowIndices) {
  this.getCurrentRowData().removeRows(rowIndices);
};
Dataset.prototype.getMetaData = function() {
  return this.metadata;
};
Dataset.prototype.getPrimaryKeyField = function() {
  for (var i = 0; i < this.metadata.length; i++) {
    if (this.metadata[i].isPrimaryKey) return this.metadata[i];
  }
};
Dataset.prototype.nameToIndex = function(key) {
  for (var i = 0; i < this.metadata.length; i++) {
    if (this.metadata[i].key == key) return i;
  }
  return -1;
};
Dataset.prototype.nameToIndices = function(keys) {
  var indicesArr = new Array(keys.length);
  for (var i = 0; i < keys.length; i++) {
    indicesArr[i] = this.nameToIndex(keys[i]);
    if (indicesArr[i] == -1) {
      alert(keys[i] + "在Dataset中没有正确对");
      return null;
    }
  }
  return indicesArr;
};
Dataset.prototype.getValue = function(key) {
  var currRow = this.getSelectedRow();
  if (currRow == null) return null;
  return currRow.getCellValue(this.nameToIndex(key));
};
Dataset.prototype.setValue = function(key, value) {
  var rowIndex = this.getSelectedIndex();
  if (rowIndex == -1) {
    log("no selected row when call dataset.setValue, key is:" + key);
    return;
  }
  var colIndex = this.nameToIndex(key);
  this.setValueAt(rowIndex, colIndex, value);
};
Dataset.prototype.checkDatasetCell = function(value, colIndex, row) {
  var resultStr = checkDatasetCell(this, value, colIndex, row);
  if (resultStr == "") {
    var event = new DataCheckEvent();
    event.cellColIndices = [colIndex];
    event.currentRow = row;
    event.rulesDescribe = [resultStr];
    if (!this.silent) this.dispatchEvent(event);
  }
};
Dataset.prototype.checkDatasetRow = function(row) {
  var resultArray = checkDatasetRow(this, row);
  if (resultArray != null && resultArray.length > 0) {
    var cellColIndiceAry = [];
    var rulesAry = [];
    var temp = [];
    for (var i = 0, count = resultArray.length; i < count; i++) {
      temp = resultArray[i].split(";");
      cellColIndiceAry.push(temp[0]);
      rulesAry.push(temp[1]);
    }
    var event = new DataCheckEvent();
    event.cellColIndices = cellColIndiceAry;
    event.currentRow = row;
    event.rulesDescribe = rulesAry;
    if (!this.silent) this.dispatchEvent(event);
  }
};
DatasetRow.STATE_NRM = 0;
DatasetRow.STATE_UPD = 1;
DatasetRow.STATE_NEW = 2;
DatasetRow.STATE_DEL = 3;
DatasetRow.STATE_FALSE_DEL = 4;
DatasetRow.CHANGEED = "ch";

function DatasetRow(ele, rowCount, dataset) {
  if (ele != null) {
    this.domElement = ele;
    this.rowId = this.domElement.getAttribute("id");
    this.dataEle = this.domElement.firstChild;
    for (var i = 1; i < this.domElement.childNodes.length; i++) {
      if (this.domElement.childNodes[i].tagName == DatasetRow.CHANGEED) {
        this.changedEle = this.domElement.childNodes[i];
        break;
      }
    }
    this.dataset = dataset;
    this.initialize();
    delete this.dataEle;
  } else {
    this.rowId = Dataset.getRandomRowId();
    if (rowCount != null) this.dataArr = new Array(rowCount);
    else this.dataArr = new Array();
    this.state = DatasetRow.STATE_NEW;
  }
};
DatasetRow.prototype.getCellValue = function(index) {
  return this.dataArr[index];
};
DatasetRow.prototype.getState = function() {
  return this.state;
};
DatasetRow.prototype.setState = function(state) {
  this.state = state;
};
DatasetRow.prototype.initialize = function() {
  if (IS_IE) this.dataArr = this.dataEle.text.split(",");
  else this.dataArr = this.dataEle.textContent.split(",");
  var metadata = this.dataset.metadata;
  var length = this.dataArr.length;
  for (var i = 0; i < length; i++) {
    if (this.dataArr[i] == EventContextConstant.NULL) {
      this.dataArr[i] = null;
    } else {
      this.dataArr[i] = decodeURIComponent(this.dataArr[i]);
      if (metadata[i] != null) {
        if (metadata[i].dataType == DataType.UFDATETIME || metadata[i].dataType == DataType.UFTIME) {
          if (parseInt(this.dataArr[i]) != this.dataArr[i]) continue;
          var date = new Date();
          date.setTime(this.dataArr[i]);
          this.dataArr[i] = this.dateTimeFormat(date);
        } else if (metadata[i].dataType == DataType.UFDATE || metadata[i].dataType == DataType.UFDATEBEGIN || metadata[i].dataType == DataType.UFDATEEND) {
          if (parseInt(this.dataArr[i]) != this.dataArr[i]) continue;
          var date = new Date();
          date.setTime(this.dataArr[i]);
          this.dataArr[i] = this.dateTimeFormat(date);
        } else if (metadata[i].dataType == DataType.UFLITERALDATE) {}
      }
    }
  }
  this.state = this.dataEle.nodeName;
  if (this.state == "nrm") this.state = DatasetRow.STATE_NRM;
  else if (this.state == "upd") this.state = DatasetRow.STATE_UPD;
  else if (this.state == "add") this.state = DatasetRow.STATE_NEW;
  else if (this.state == "del") this.state = DatasetRow.STATE_DEL;
  else if (this.state == "fdel") this.state = DatasetRow.STATE_FALSE_DEL;
  if (this.changedEle) {
    if (IS_IE) this.changedArr = this.changedEle.text.split(",");
    else this.changedArr = this.changedEle.textContent.split(",");
  }
};
DatasetRow.prototype.dateTimeFormat = function(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  if (parseInt(month) < 10) month = "0" + month;
  var day = date.getDate();
  if (parseInt(day) < 10) day = "0" + day;
  var hours = date.getHours();
  if (parseInt(hours) < 10) hours = "0" + hours;
  var minutes = date.getMinutes();
  if (parseInt(minutes) < 10) minutes = "0" + minutes;
  var seconds = date.getSeconds();
  if (parseInt(seconds) < 10) seconds = "0" + seconds;
  var formatString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  return formatString;
};
DatasetRow.prototype.dateFormat = function(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  if (parseInt(month) < 10) month = "0" + month;
  var day = date.getDate();
  if (parseInt(day) < 10) day = "0" + day;
  var formatString = year + "-" + month + "-" + day;
  return formatString;
};
DatasetRow.prototype.setCellValue = function(index, value) {
  var oldValue = this.dataArr[index];
  if (value != null) this.dataArr[index] = value + "";
  else this.dataArr[index] = null;
  if (!(this.state == DatasetRow.STATE_NEW || (this.state == DatasetRow.STATE_NRM && this.dataset.editable == false))) {
    this.state = DatasetRow.STATE_UPD;
    this.notifyChange(NotifyType.STATE, this.state);
  }
  this.notifyChange(NotifyType.VALUE, [index, value]);
  return oldValue;
};
DatasetRow.prototype.getSize = function() {
  return this.dataArr.length;
};
DatasetRow.prototype.clone = function() {
  var row = new DatasetRow();
  for (var i = 0; i < this.dataArr.length; i++) row.setCellValue(i, this.dataArr[i]);
  return row;
};
DatasetRow.prototype.toXml = function() {
  var prefix, postfix;
  if (this.state == DatasetRow.STATE_NEW) {
    prefix = "<add>";
    postfix = "</add>";
  } else if (this.state == DatasetRow.STATE_DEL) {
    prefix = "<del>";
    postfix = "</del>";
  } else if (this.state == DatasetRow.STATE_UPD) {
    prefix = "<upd>";
    postfix = "</upd>";
  } else if (this.state == DatasetRow.STATE_FALSE_DEL) {
    prefix = "<fdel>";
    postfix = "</fdel>";
  } else {
    prefix = "<nrm>";
    postfix = "</nrm>";
  }
  var str = "<" + EventContextConstant.record + " id='" + this.rowId + "'>" + prefix + "";
  str += this.contentToXml();
  str += postfix + "</" + EventContextConstant.record + ">";
  return str;
};
DatasetRow.prototype.contentToXml = function(strArr) {
  var arr = null;
  if (strArr != null) arr = strArr;
  else arr = new Array;
  var length = this.dataArr.length;
  for (var i = 0; i < length; i++) {
    var temp;
    if (this.dataArr[i] != null) {
      temp = this.dataArr[i];
      if (this.dataset != null && this.dataset.metadata[i] != null && (this.dataset.metadata[i].dataType == DataType.UFDATETIME || this.dataset.metadata[i].dataType == DataType.UFDATE || this.dataset.metadata[i].dataType == DataType.UFDATEBEGIN || this.dataset.metadata[i].dataType == DataType.UFDATEEND || this.dataset.metadata[i].dataType == DataType.UFTIME)) {
        temp = this.dateToUTCString(temp);
      } else if (this.dataset != null && this.dataset.metadata[i] != null && this.dataset.metadata[i].dataType == DataType.UFLITERALDATE) {}
      arr.push(encodeURIComponent(temp));
    } else {
      temp = EventContextConstant.NULL;
      arr.push(temp);
    }
    if (i != length - 1) arr.push(",");
  }
  return strArr ? null : arr.join("");
};
DatasetRow.prototype.dateToUTCString = function(date) {
  if (date.indexOf("-") > -1) date = date.replace(/\-/g, "/");
  var utcString = Date.parse(date);
  if (isNaN(utcString)) return "";
  return utcString;
};
DatasetRow.prototype.toString = function() {
  return "RowId is:" + this.rowId + " and state is:" + this.state + " and data is:" + this.dataArr;
};
Dataset.prototype.totalSum = function(cols, keyValue, index, precision, rowFilter) {
  var resultArr = new Array(cols.length);
  var rows = this.getRows(index, keyValue);
  if (rows != null && rows.length > 0) {
    var indicesArr = this.nameToIndices(cols);
    for (var i = 0; i < rows.length; i++) {
      for (var j = 0; j < indicesArr.length; j++) {
        if (resultArr[j] == null) resultArr[j] = 0;
        var v = null;
        if (rowFilter) {
          if (rowFilter(rows[i])) {
            v = rows[i].getCellValue(indicesArr[j]);
          }
        } else v = rows[i].getCellValue(indicesArr[j]);
        if (v != null && v != "") {
          var dataType = this.metadata[indicesArr[j]].dataType;
          if (dataType == DataType.INTEGER || dataType == DataType.INT) resultArr[j] += parseInt(v);
          else resultArr[j] += parseFloat(v);
        }
      }
    }
    if (precision != null) {
      precision = parseInt(precision);
      for (var i = 0; i < resultArr.length; i++) {
        resultArr[i] = resultArr[i].toFixed(precision);
      }
    }
  }
  return resultArr;
};

function EmptyDsRow(rowId) {
  this.rowId = rowId;
  this.empty = true;
};

function maskNodesToRecords(nodeList, dataset) {
  if (nodeList == null || nodeList.length == 0) return new Array;
  var records = new Array(nodeList.length);
  for (var i = 0; i < nodeList.length; i++) {
    var node = nodeList[i];
    if (node.nodeName == EventContextConstant.record) records[i] = new DatasetRow(node, null, dataset);
    else {
      var rowId = node.getAttribute("id");
      records[i] = new EmptyDsRow(rowId);
    }
  }
  return records;
};

function defaultRowSorter(row1, row2) {
  var keys = this.tempKeys;
  var orders = this.tempOrders;
  var ds = this.tempDs;
  return 0;
};

function defaultIntSort(value1, value2) {
  var intV1 = parseInt(value1);
  var intV2 = parseInt(value2);
  if (intV1 < intV2) return -1;
  else if (intV1 == intV2) return 0;
  return 1;
};

function RowSet(rootNode, dataset) {
  this.pagecount = 1;
  this.pageindex = 0;
  this.allrowcount = 0;
  this.pagesize = -1;
  this.keyvalue = null;
  this.dataset = dataset;
  this.rowDatas = new Array();
  if (rootNode != null) this.setData(rootNode);
  else {
    var rd = new RowData(null, this);
    this.rowDatas[0] = rd;
  }
};
RowSet.prototype.getPageCount = function() {
  return this.pagecount;
};
RowSet.prototype.getPageIndex = function() {
  return this.pageindex;
};
RowSet.prototype.getAllRowCount = function() {
  return this.allrowcount;
};
RowSet.prototype.setData = function(ele) {
  var pageindex = ele.getAttribute("pageindex");
  var pagecount = ele.getAttribute("pagecount");
  var pagesize = ele.getAttribute("pagesize");
  var recordcount = ele.getAttribute("recordcount");
  this.pageindex = parseInt(pageindex);
  this.pagecount = parseInt(pagecount);
  this.allrowcount = parseInt(recordcount);
  this.pagesize = parseInt(pagesize);
  this.keyvalue = ele.getAttribute("keyvalue");
  var recordsList = ele.selectNodes(EventContextConstant.records);
  if (!this.dataset.needCache) {
    var nowRowData = this.rowDatas[this.pageindex];
    this.rowDatas = new Array();
    this.rowDatas[this.pageindex] = nowRowData;
  }
  if (recordsList.length > 0) {
    for (var i = 0; i < recordsList.length; i++) {
      var records = recordsList[i];
      var pIndex = records.getAttribute("pageindex");
      var rowData = this.rowDatas[parseInt(pIndex)];
      if (rowData != null) {
        rowData.setData(records);
      } else {
        rowData = new RowData(records, this);
        this.rowDatas[parseInt(pIndex)] = rowData;
        rowData.setData(records, true);
      }
      if (this.allrowcount == 0) this.allrowcount = rowData.getRowCount();
    }
  }
};
RowSet.prototype.setJsonData = function(jsonData, keyValue, pageindex) {
  if (pageindex == null) this.pageindex = 0;
  else this.pageindex = pageindex;
  var allrowcount = jsonData.total;
  var size = jsonData.size;
  var pagecount = 1;
  if (size != -1) {
    if (allrowcount != 0 && allrowcount % size == 0) pagecount = Math.floor(allrowcount / size);
    else pagecount = Math.floor((allrowcount / size) + 1);
  }
  this.pagecount = pagecount;
  this.allrowcount = allrowcount;
  this.pagesize = size;
  this.keyvalue = keyValue;
  var rowData = this.rowDatas[parseInt(pageindex)];
  if (rowData == null) {
    rowData = new RowData(null, this);
    this.rowDatas[parseInt(pageindex)] = rowData;
  }
  rowData.setJsonData(jsonData, pageindex);
};
RowSet.prototype.getCurrentRowData = function() {
  return this.getRowData(this.pageindex);
};
RowSet.prototype.getRowData = function(pageindex) {
  return this.rowDatas[pageindex];
};
RowSet.prototype.getRowDatas = function() {
  return this.rowDatas;
};
RowSet.prototype.getSelectedIndex = function() {
  return this.getCurrentRowData().getSelectedIndex();
};
RowSet.prototype.getSelectedIndices = function() {
  return this.getCurrentRowData().getSelectedIndices();
};
RowSet.prototype.setAllRowUnSelected = function() {
  this.getCurrentRowData().setAllRowUnSelected();
};
RowSet.prototype.getSelectedRows = function() {
  return this.getCurrentRowData().getSelectedRows();
};
RowSet.prototype.getSelectedRow = function() {
  var rows = this.getSelectedRows();
  if (rows == null) return null;
  return rows[0];
};
RowSet.prototype.getAllSelectedRows = function() {};
RowSet.prototype.getRow = function(index) {
  if (this.rowDatas[this.pageindex] == null) return null;
  return this.rowDatas[this.pageindex].getRows()[index];
};
RowSet.prototype.getRows = function() {
  if (this.rowDatas[this.pageindex] == null) return null;
  return this.rowDatas[this.pageindex].getRows();
};
RowSet.prototype.getAllRows = function() {
  var rowArr = new Array;
  if (this.rowDatas == null) return rowArr;
  for (var i = 0; i < this.rowDatas.length; i++) {
    if (this.rowDatas[i]) {
      var rows = this.rowDatas[i].getRows();
      if (rows != null) {
        for (var j = 0; j < rows.length; j++) {
          rowArr.push(rows[j]);
        }
      }
    }
  }
  return rowArr;
};
RowSet.prototype.getRowsByScale = function(startIndex, count) {
  if (this.rowDatas[this.pageindex] == null) return null;
  return this.rowDatas[this.pageindex].getRowsByScale();
};
RowSet.prototype.getRowCount = function() {
  if (this.rowDatas[this.pageindex] == null) return null;
  return this.rowDatas[this.pageindex].getRowCount();
};

function RowData(ele, rowSet) {
  if (ele != null) this.pageindex = parseInt(ele.getAttribute("pageindex"));
  else this.pageindex = 0;
  this.rows = new Array;
  this.deleteRows = null;
  this.selectedIndices = null;
  this.rowSet = rowSet;
};
RowData.prototype.setJsonData = function(jsonData, pageindex) {
  this.pageindex = pageindex;
  var ds = this.rowSet.dataset;
  var keyIndexObj = new Object;
  for (var j = 0; j < jsonData.meta.length; j++) {
    var jsonKey = jsonData.meta[j].toLowerCase();
    for (var i = 0; i < ds.metadata.length; i++) {
      if (jsonKey == ds.metadata[i].key) {
        keyIndexObj[jsonData.meta[j]] = i;
        break;
      }
    }
  }
  delete this.rows;
  this.rows = [];
  for (var i = 0; i < jsonData.data.length; i++) {
    var row = new DatasetRow(null, ds.metadata.length);
    row.rowData = this;
    var jsonRow = jsonData.data[i];
    for (var j = 0; j < jsonData.meta.length; j++) {
      row.dataArr[keyIndexObj[jsonData.meta[j]]] = jsonRow[j];
    }
    this.rows[i] = row;
  }
  if (this.rowSet.keyvalue == ds.currentKey) {
    var pevent = new PageChangeEvent();
    pevent.pageIndex = this.pageindex;
    pevent.parentKey = ds.currentKey;
    ds.dispatchEvent(pevent);
  }
};
RowData.prototype.setData = function(recordsNode, isInit) {
  var isCurrent = (this.rowSet.dataset.currentKey == this.rowSet.keyvalue) && (this.rowSet.pageindex == this.pageindex);
  var selChanged = false;
  var selectNode = recordsNode.selectSingleNode("selected");
  var records = maskNodesToRecords(recordsNode.selectNodes(EventContextConstant.record + "|" + EventContextConstant.erecord), this.rowSet.dataset);
  if (selectNode != null) {
    var indicesStr = getNodeValue(selectNode);
    var indices = null;
    if (indicesStr != null) {
      indices = indicesStr.split(",");
      for (var i = 0; i < indices.length; i++) {
        indices[i] = parseInt(indices[i]);
      }
    }
    if (isCurrent) {
      if (indices != null && this.selectedIndices == null) selChanged = true;
      else if (this.selectedIndices != null && indices == null) selChanged = true;
      else if (this.selectedIndices.length != indices.length) selChanged = true;
      else {
        var oldRows = this.getRows();
        for (var i = 0; i < indices.length; i++) {
          var newIndex = indices[i];
          if (records[newIndex] == null || records[newIndex].rowId == null) {
            selChanged = true;
            break;
          }
          var oldIndex = this.selectedIndices[i];
          if (oldRows[oldIndex] == null || oldRows[oldIndex].rowId == null) {
            selChanged = true;
            break;
          }
          if (oldRows[oldIndex].rowId == records[newIndex].rowId) continue;
          selChanged = true;
          for (var j = 0; j < this.selectedIndices.length; j++) {
            oldIndex = this.selectedIndices[j];
            if (oldRows[oldIndex].rowId == records[newIndex].rowId) {
              selChanged = false;
              break;
            }
          }
          if (selChanged == true) break;
        }
      }
      if (selChanged) {
        if (this.selectedIndices != null) {
          for (var i = this.selectedIndices.length - 1; i >= 0; i--) {
            this.setRowUnSelected(this.selectedIndices[i]);
          }
        }
      }
    }
  } else {
    if (isCurrent && this.selectedIndices != null) {
      for (var i = this.selectedIndices.length - 1; i >= 0; i--) {
        this.setRowUnSelected(this.selectedIndices[i]);
      }
    }
  }
  var changed = recordsNode.getAttribute("changed");
  if (changed == "true" || isInit) {
    delete this.rows;
    delete this.deleteRows;
    delete this.selectedIndices;
    this.rows = records;
    for (var i = 0; i < this.rows.length; i++) this.rows[i].rowData = this;
    if (isCurrent) {
      var pevent = new PageChangeEvent();
      pevent.pageIndex = this.pageindex;
      pevent.parentKey = this.rowSet.dataset.currentKey;
      this.rowSet.dataset.dispatchEvent(pevent);
      selChanged = true;
    }
  } else {
    this.insertArr = new Array();
    var oldRows = this.getRows();
    var nindex = 0;
    for (var i = 0; i < records.length; i++) {
      var find = false;
      for (var j = nindex; j < oldRows.length; j++) {
        if (oldRows[j].rowId == records[i].rowId) {
          this.$updateRow(j, oldRows[j], records[i]);
          nindex++;
          find = true;
          break;
        }
      }
      if (!find) {
        this.insertArr.push(i);
      }
    }
    var deleteNodes = recordsNode.selectNodes(EventContextConstant.drecord);
    if (deleteNodes != null) {
      for (var i = 0; i < deleteNodes.length; i++) {
        var delNode = deleteNodes[i];
        var id = getNodeAttribute(delNode, "id");
        var index = this.getRowIndexById(id);
        this.removeRow(index);
      }
    }
    for (var i = 0; i < this.insertArr.length; i++) {
      var index = this.insertArr[i];
      this.insertRow(index, records[index]);
    }
  }
  if (isCurrent) {
    if (indices != null && selChanged) {
      for (var i = 0; i < indices.length; i++) {
        this.rowSet.dataset.addRowSelected(indices[i]);
      }
    }
  } else {
    this.selectedIndices = indices;
  }
};
RowData.prototype.addRow = function(row) {
  this.insertRow(this.getRowCount(), row);
};
RowData.prototype.insertRow = function(index, row) {
  this.insertRows(index, [row]);
};
RowData.prototype.setValueAt = function(rowIndex, colIndex, value) {
  var row = this.getRow(rowIndex);
  var oldValue = row.setCellValue(colIndex, value);
  if (value == oldValue) return;
  var dataset = this.rowSet.dataset;
  var event = new DataChangeEvent();
  event.currentRow = row;
  event.cellRowIndex = rowIndex;
  event.cellColIndex = colIndex;
  event.currentValue = value;
  event.oldValue = oldValue;
  event.datasetId = dataset.id;
  if (!dataset.silent) {
    dataset.dispatchEvent(event);
    dataset.checkDatasetCell(value, colIndex, row);
    dataset.onAfterDataChange(event);
  }
};
RowData.prototype.insertRows = function(index, rows) {
  var oldRows = this.getRows();
  if (index > oldRows.length) index = oldRows.length;
  var dataset = this.rowSet.dataset;
  if (dataset.onBeforeRowInsert(index, rows) == false) return;
  if (rows != null) {
    if (oldRows == null) {
      alert("the current data block is not initialized, key is:" + this.currentKey);
      return;
    }
    for (var i = 0; i < rows.length; i++) {
      oldRows.splice(index + i, 0, rows[i]);
    }
  }
  var event = new RowInsertEvent();
  event.insertedRows = rows;
  event.insertedIndex = index;
  if (!dataset.silent) {
    dataset.dispatchEvent(event);
    dataset.onAfterRowInsert(event);
  }
};
RowData.prototype.removeRow = function(index) {
  this.removeRows([index]);
};
RowData.prototype.removeRows = function(rowIndices) {
  var oldRows = this.getRows();
  var delAll = false;
  if (rowIndices == -1) {
    rowIndices = new Array;
    delAll = true;
    var count = this.getRowCount();
    for (var i = 0; i < count; i++) rowIndices.push(i);
  } else {
    rowIndices = rowIndices.sort(defaultIntSort);
  }
  this.rowSet.dataset.onBeforeRowDelete(rowIndices);
  var tmpRows = new Array;
  var selIndices = this.getSelectedIndices();
  for (var i = rowIndices.length - 1; i >= 0; i--) {
    removeFromArray(selIndices, rowIndices[i]);
    if (selIndices != null) {
      for (var j = 0; j < selIndices.length; j++) {
        if (selIndices[j] > rowIndices[i]) selIndices[j]--;
      }
    }
    var delRow = oldRows[rowIndices[i]];
    if (delRow == null) {
      continue;
    }
    oldRows.splice(rowIndices[i], 1);
    if (delRow.state != DatasetRow.STATE_NEW) {
      if (this.deletedRows == null) this.deletedRows = new Array;
      this.deletedRows.push(delRow);
    }
    tmpRows.push(delRow);
  }
  if (!this.rowSet.dataset.silent) {
    var event = new RowDeleteEvent();
    event.deletedRows = tmpRows;
    event.deletedIndices = rowIndices;
    event.deleteAll = delAll;
    this.rowSet.dataset.dispatchEvent(event);
    this.rowSet.dataset.onAfterRowDelete(event);
  }
};
RowData.prototype.$updateRow = function(index, oldRow, newRow) {
  if (newRow.empty) return;
  var ds = this.rowSet.dataset;
  var mds = ds.metadata;
  var oldState = oldRow.state;
  if (newRow.changedArr != null && newRow.changedArr.length > 0) {
    for (var i = 0; i < newRow.changedArr.length; i++) {
      var changedIndex = newRow.changedArr[i];
      var newValue = newRow.getCellValue(changedIndex);
      if (newValue == null) newValue = "";
      var oldValue = oldRow.getCellValue(changedIndex);
      if (oldValue == null) oldValue = "";
      if (newValue != oldValue) {
        this.setValueAt(index, changedIndex, newValue);
      }
    }
  } else {
    for (var i = 0; i < mds.length; i++) {
      var newValue = newRow.getCellValue(i);
      if (newValue == null) newValue = "";
      var oldValue = oldRow.getCellValue(i);
      if (oldValue == null) oldValue = "";
      if (newValue != oldValue) {
        this.setValueAt(index, i, newValue);
      }
    }
  }
  if (oldRow.state == oldState) oldRow.state = newRow.state;
  if (newRow.state == DatasetRow.STATE_FALSE_DEL) {
    var event = new DataFalseDelEvent();
    event.delRowIndex = index;
    event.delRow = newRow;
    ds.dispatchEvent(event);
  }
};
RowData.prototype.getRowIndices = function(rows) {
  var indices = new Array;
  for (var i = 0; i < rows.length; i++) {
    indices.push(this.getRowIndex(rows[i]));
  }
  return indices;
};
RowData.prototype.getRowIndex = function(row) {
  var rows = this.getRows();
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].rowId == row.rowId) return i;
  }
  return -1;
};
RowData.prototype.getRowIndexById = function(id) {
  var rows = this.getRows();
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].rowId == id) return i;
  }
  return -1;
};
RowData.prototype.getRows = function() {
  return this.rows;
};
RowData.prototype.getRow = function(index) {
  return this.rows[index];
};
RowData.prototype.getRowsByScale = function(start, count) {
  var rows = this.getRows();
  if (rows == null) return null;
  if (start >= rows.length) return null;
  var rowArr = new Array;
  for (var i = start; i < count && i < rows.length; i++) {
    rowArr.push(rows[i]);
  }
  return rowArr;
};
RowData.prototype.setRowUnSelected_ = function(index) {
  var selIndices = this.getSelectedIndices();
  if (selIndices == null) return;
  for (var i = 0; i < selIndices.length; i++) {
    if (selIndices[i] == index) {
      selIndices.splice(i, 1);
      var event = new RowUnSelectEvent();
      event.currentRowIndex = index;
      if (!this.rowSet.dataset.silent) {
        this.rowSet.dataset.dispatchEvent(event);
        this.rowSet.dataset.onAfterRowUnSelect(event);
      }
      if (selIndices.length > 0) {
        var event = new RowSelectEvent();
        event.isMultiSelect = true;
        var index = selIndices[0];
        event.currentRow = this.getRows()[index];
        event.currentRowIndex = index;
        if (!this.rowSet.dataset.silent) {
          this.rowSet.dataset.dispatchEvent(event);
        }
      }
    }
  }
};
RowData.prototype.setAllRowUnSelected = function() {
  var selIndices = this.getSelectedIndices();
  var indices = new Array();
  for (var i = 0; i < selIndices.length; i++) {
    indices.push(selIndices[i]);
  }
  this.setRowUnSelected(indices);
};
RowData.prototype.setRowUnSelected = function(indices) {
  var selIndices = this.getSelectedIndices();
  if (selIndices == null) return;
  var newUnSelected = false;
  if (indices instanceof Array) {
    var event = new RowUnSelectEvent();
    for (var i = 0; i < indices.length; i++) {
      var index = selIndices.indexOf(indices[i]);
      if (index != -1) {
        selIndices.splice(index, 1);
        newUnSelected = true;
        var event = new RowUnSelectEvent();
        event.currentRowIndex = indices[i];
        if (!this.rowSet.dataset.silent) {
          this.rowSet.dataset.dispatchEvent(event);
        }
      }
    }
    if (!this.rowSet.dataset.silent) {
      this.rowSet.dataset.onAfterRowUnSelect(event);
    }
  } else {
    var index = selIndices.indexOf(indices);
    if (index != -1) {
      newUnSelected = true;
      selIndices.splice(index, 1);
      var event = new RowUnSelectEvent();
      event.currentRowIndex = indices;
      if (!this.rowSet.dataset.silent) {
        this.rowSet.dataset.dispatchEvent(event);
        this.rowSet.dataset.onAfterRowUnSelect(event);
      }
    }
  }
  newUnSelected = false;
  if (selIndices.length > 0 && newUnSelected) {
    var event = new RowSelectEvent();
    event.isMultiSelect = true;
    var index = selIndices[selIndices.length - 1];
    if (this.rowSet.dataset.onBeforeRowSelect(index) == false) return false;
    event.currentRow = this.getRows()[index];
    event.currentRowIndex = index;
    if (!this.rowSet.dataset.silent) {
      this.rowSet.dataset.dispatchEvent(event);
      this.rowSet.dataset.onAfterRowSelect(event);
    }
  }
};
RowData.prototype.getRowCount = function() {
  var rows = this.getRows();
  if (rows == null) return 0;
  return rows.length;
};
RowData.prototype.getSelectedIndices = function() {
  return this.selectedIndices;
};
RowData.prototype.getSelectedIndex = function() {
  if (this.selectedIndices == null || this.selectedIndices.length == 0) return -1;
  return this.selectedIndices[0];
};
RowData.prototype.getSelectedRow = function() {
  var rows = this.getSelectedRows();
  if (rows == null) return null;
  return rows[0];
};
RowData.prototype.getSelectedRows = function() {
  var indices = this.getSelectedIndices();
  if (indices == null || indices.length == 0) {
    return null;
  }
  var rows = this.getRows();
  var selRows = new Array;
  for (var i = 0; i < indices.length; i++) selRows.push(rows[indices[i]]);
  return selRows;
};
IDatasetConstant = new Object;
IDatasetConstant.PREFIX_SYSTEM_QUERY_PARAM = "$$";
IDatasetConstant.QUERY_PARAM_KEYS = "query_param_keys";
IDatasetConstant.QUERY_PARAM_VALUES = "query_param_values";
IDatasetConstant.QUERY_PARAM_KEYVALUE = "query_param_keyvalue";
IDatasetConstant.QUERY_KEYVALUE = "query_keyvalue";
IDatasetConstant.QUERY_PARAM_PAGEINDEX = "query_param_pageindex";
IDatasetConstant.QUERY_RECURSIVEKEYFIELD = "recursiveKeyField";
IDatasetConstant.NORMAL_QUERY_CONDITiON = IDatasetConstant.PREFIX_SYSTEM_QUERY_PARAM + "normal_query_condition";
IDatasetConstant.FROM_QUERY_TEMPLATE = IDatasetConstant.PREFIX_SYSTEM_QUERY_PARAM + "from_query_model";
IDatasetConstant.QUERY_TEMPLATE_KEYVALUES = "$%%$query_template_keyvalues";
IDatasetConstant.QUERY_TEMPLATE_TARGET_DSID = IDatasetConstant.PREFIX_SYSTEM_QUERY_PARAM + "query_template_target_dsid";
IDatasetConstant.QUERY_TEMPLATE_TARGET_PAGEID = IDatasetConstant.PREFIX_SYSTEM_QUERY_PARAM + "query_template_target_pageId";
IDatasetConstant.QUERY_TEMPLATE_DEFAULT_ROOTPARENTID = "queryTemplateSpecialParentId";
IDatasetConstant.QUERY_TEMPLATE_CONDITION = IDatasetConstant.PREFIX_SYSTEM_QUERY_PARAM + "query_template_condition";
IDatasetConstant.QUERY_TEMPLATE_LOGICCONDITION = IDatasetConstant.PREFIX_SYSTEM_QUERY_PARAM + "query_template_logiccondition";
IDatasetConstant.IS_LOAD_OTHER_PAGE = "isLoadOtherPage";
IDatasetConstant.OTHER_PAGE_ID = "otherPageId";
IDatasetConstant.APPROVE_BILLID = "approveid";
IDatasetConstant.APPROVE_TYPE = "approve_type";
Dataset.prototype.onBeforeRowSelect = function(index) {
  var dsIndexEvent = {
    "index": index
  };
  this.doEventFunc("onBeforeRowSelect", dsIndexEvent);
  return true;
};
Dataset.prototype.onAfterRowSelect = function(rowSelectEvent) {
  this.doEventFunc("onAfterRowSelect", rowSelectEvent);
  return true;
};
Dataset.prototype.onFocusChange = function(focusChangeEvent) {
  this.doEventFunc("onFocusChange", focusChangeEvent);
  return true;
};
Dataset.prototype.onAfterRowUnSelect = function(rowUnSelectEvent) {
  this.doEventFunc("onAfterRowUnSelect", rowUnSelectEvent);
};
Dataset.prototype.onBeforeRowInsert = function(index, rows) {
  var dsBeforeRowInsertEvent = {
    "index": index,
    "rows": rows
  };
  this.doEventFunc("onBeforeRowInsert", dsBeforeRowInsertEvent);
  return true;
};
Dataset.prototype.onAfterRowInsert = function(rowInsertEvent) {
  this.doEventFunc("onAfterRowInsert", rowInsertEvent);
};
Dataset.prototype.onBeforeDataChange = function(rowIndex, colIndex, newValue, dataset) {
  var dsBeforeDataChangeEvent = {
    "rowIndex": rowIndex,
    "colIndex": colIndex,
    "newValue": newValue,
    "dataset": dataset
  };
  this.doEventFunc("onBeforeDataChange", dsBeforeDataChangeEvent);
  return true;
};
Dataset.prototype.onAfterDataChange = function(dataChangeEvent, pageIndex) {
  dataChangeEvent.pageIndex = pageIndex;
  this.doEventFunc("onAfterDataChange", dataChangeEvent);
};
Dataset.prototype.beforeCallEvent = function(eventName, eventObj) {
  if (eventName == "onAfterDataChange") {
    this.afterDataChangeAcceptFields = null;
    if (this.afterDataChangeAcceptFields == null || this.afterDataChangeAcceptFields == "") return true;
    var fields = this.afterDataChangeAcceptFields;
    var colIndex = eventObj.cellColIndex;
    var currentFieldName = this.metadata[colIndex].key;
    for (var i = 0, n = fields.length; i < n; i++) {
      if (fields[i] == currentFieldName) return true;
    }
    return false;
  } else if (eventName == "onBeforeDataChange") {
    if (this.beforeDataChangeAcceptFields == null || this.afterDataChangeAcceptField == "") return true;
    var fields = this.beforeDataChangeAcceptFields;
    var colIndex = eventObj.cellColIndex;
    var currentFieldName = this.metadata[colIndex].key;
    for (var i = 0, n = fields.length; i < n; i++) {
      if (fields[i] == currentFieldName) return true;
    }
    return false;
  }
  return true;
};
Dataset.prototype.onBeforeRowDelete = function(indices) {
  var dsBeforeRowDeleteEvent = {
    "indices": indices
  };
  this.doEventFunc("onBeforeRowDelete", dsBeforeRowDeleteEvent);
  return true;
};
Dataset.prototype.onAfterRowDelete = function(rowDeleteEvent) {
  this.doEventFunc("onAfterRowDelete", rowDeleteEvent);
};
Dataset.prototype.onAfterUndo = function(datasetUndoEvent) {
  this.doEventFunc("onAfterUndo", datasetUndoEvent);
};
Dataset.prototype.onBeforePageChange = function(key, index) {
  var dsBeforePageChangeEvent = {
    "key": key,
    "index": index
  };
  this.doEventFunc("onBeforePageChange", dsBeforePageChangeEvent);
  return true;
};
Dataset.prototype.onAfterPageChange = function(pageChangeEvent) {
  this.doEventFunc("onAfterPageChange", pageChangeEvent);
};
Dataset.prototype.onDataLoad = function(keyValue, index, userObj) {
  pageUI.exParams.clear();
  if (this.reqParameterMap.size() > 0) {
    var keySet = this.reqParameterMap.keySet();
    var size = this.reqParameterMap.size();
    for (var i = 0; i < size; i++) {
      var key = keySet[i];
      var value = this.reqParameterMap.get(key);
      pageUI.exParams.put(key, value);
    }
  }
  var dataLoadEvent = {
    "keyValue": keyValue,
    "pageIndex": index,
    "userObj": userObj
  };
  this.doEventFunc("onDataLoad", dataLoadEvent);
};
Dataset.prototype.addProxyParam = function(eventName, proxy, params) {
  if ("onAfterRowInsert" == eventName) {
    proxy.addParam('row_insert_index', params.insertedIndex);
  } else if ("onAfterDataChange" == eventName) {
    proxy.addParam('cellRowIndex', params.cellRowIndex);
    proxy.addParam('cellColIndex', params.cellColIndex);
    proxy.addParam('newValue', params.currentValue);
    proxy.addParam('oldValue', params.oldValue);
    proxy.addParam('isBatch', params.isBatch);
  }
};

function RowSelectEvent() {
  this.currentRow = null;
  this.currentRowIndex = -1;
  this.isAdd = false;
  this.lastSelectedIndices = null;
  this.isMultiSelect = false;
}
RowSelectEvent.prototype.toString = function() {
  return "row selected event:the current row is：" + this.currentRow + ",the current index is:" + this.currentRowIndex;
};

function PageChangeEvent() {
  this.parentKey = null;
  this.oldParentKey = null;
  this.pageIndex = null;
  this.oldPageIndex = null;
  this.userObject = null;
}
PageChangeEvent.prototype.toString = function() {
  return "page change event:the current parentKey：" + this.parentKey + ",the current page index:" + this.pageIndex + ",the old parentKey:" + this.oldParentKey + ",the old page index:" + this.oldPageIndex;
};

function RowInsertEvent() {
  this.insertedRows = null;
  this.insertedIndex = -1;
}
RowInsertEvent.prototype.toString = function() {
  return "row insert event:the current row is：" + this.insertedRows + ",the current row index is:" + this.insertedIndex;
};

function DataCheckEvent() {
  this.currentRow = null;
  this.cellColIndices = null;
  this.rulesDescribe = null;
};
DataCheckEvent.prototype.toString = function() {
  return "the current row is:" + this.currentRow;
};

function DataChangeEvent() {
  this.currentRow = null;
  this.cellRowIndex = -1;
  this.cellColIndex = -1;
  this.currentValue = null;
  this.oldValue = null;
  this.pageIndex = -1;
  this.isBatch = false;
};
DataChangeEvent.prototype.toString = function() {
  return "data change event:the current row is：" + this.currentRow + ",the current row index is:" + this.cellRowIndex + ",the current column is:" + this.cellColIndex + ",the current value:" + this.currentValue + ",the old value:" + this.oldValue;
};

function DataFalseDelEvent() {
  this.delRowIndex = -1;
  this.delRow = null;
};
DataFalseDelEvent.prototype.toString = function() {};

function DataColSingleChangeEvent() {
  this.currentRows = new Array();
  this.cellRowIndices = new Array();
  this.cellColIndex = -1;
  this.currentValues = new Array();
  this.oldValues = new Array();
  this.isColSingle = true;
};
DataColSingleChangeEvent.prototype.toString = function() {
  return "data col single change event:the rows are：" + this.cellRowIndices + ",the current column is:" + this.cellColIndex + ",the current values:" + this.currentValues + ",the old values:" + this.oldValues;
};

function DatasetUndoEvent() {}
DatasetUndoEvent.prototype.toString = function() {
  return "Dataset Undo Event";
};

function RowDeleteEvent() {
  this.deletedIndices = null;
  this.deletedRows = null;
  this.deleteAll = false;
}
RowDeleteEvent.prototype.toString = function() {
  return "row delete event:the deleted row index:" + this.deletedIndices + ",the deleted row is:" + this.deletedRows;
};

function RowUnSelectEvent() {
  this.currentRowIndex = -1;
  this.unSelectedIndices = null;
}
RowUnSelectEvent.prototype.toString = function() {
  return "row unselected event:the current unselected index:" + this.currentRowIndex;
};

function StateClearEvent() {}
StateClearEvent.prototype.toString = function() {
  return "state clear event";
};

function MetaChangeEvent() {
  this.colIndex = null;
  this.precision = null;
}
MetaChangeEvent.prototype.toString = function() {
  return "metaChange event:the changed colIndex:" + this.colIndex;
};

function FocusChangeEvent() {
  this.focusIndex = null;
}
FocusChangeEvent.prototype.toString = function() {
  return "focusChange event:the changed focusIndex:" + this.focusIndex;
};

function searializeDataset(ds, type) {
  var strArr = new Array;
  strArr.push("<dataset id='" + (ds.widget.id + "." + ds.id) + "' currentkey='" + ds.currentKey + "'" + " editable='" + ds.editable + "' randomRowIndex='" + ds.randomRowIndex + "'>");
  if (ds.reqParameterMap != null && ds.reqParameterMap.keySet().length > 0) {
    var keyset = ds.reqParameterMap.keySet();
    strArr.push("<" + EventContextConstant.req_parameters + ">");
    for (var j = 0; j < keyset.length; j++) {
      strArr.push("<" + EventContextConstant.parameter + " name='" + keyset[j] + "'>");
      strArr.push(ds.reqParameterMap.get(keyset[j]));
      strArr.push("</" + EventContextConstant.parameter + ">");
    }
    strArr.push("</" + EventContextConstant.req_parameters + ">");
  }
  strArr.push("<rowsets>");
  if (type == "ds_current_page" || type == "ds_current_line") {
    var rowSets = new Array();
    if (ds.getCurrentRowSet() == null) rowSets = ds.getRowSets();
    else rowSets.push(ds.getCurrentRowSet());
  } else var rowSets = ds.getRowSets();
  if (rowSets != null) {
    for (var j = 0; j < rowSets.length; j++) {
      var rowSet = rowSets[j];
      strArr.push("<rowset pagecount=\"");
      strArr.push(rowSet.pagecount);
      strArr.push("\" pagesize=\"");
      strArr.push(rowSet.pagesize);
      strArr.push("\" recordcount=\"");
      strArr.push(rowSet.allrowcount);
      strArr.push("\" pageindex=\"");
      strArr.push(rowSet.pageindex);
      strArr.push("\" keyvalue=\"");
      strArr.push(rowSet.keyvalue);
      strArr.push("\">\n");
      var rowDatas = rowSet.getRowDatas();
      if (rowDatas != null) {
        for (var i = 0; i < rowDatas.length; i++) {
          var rowData = rowDatas[i];
          if (rowData) {
            strArr.push("<" + EventContextConstant.records + " pageindex=\"" + rowData.pageindex + "\">\n");
            var selStr = "";
            var selIndices = rowData.getSelectedIndices();
            if (selIndices != null && selIndices.length > 0) selStr += selIndices.join(",");
            strArr.push("<selected>" + selStr + "</selected>\n");
            var focusRowIndex = ds.getFocusRowIndex();
            if (focusRowIndex != -1) strArr.push("<focus>" + focusRowIndex + "</focus>\n");
            strArr.push(serializeRows(ds.currentKey, rowSet, rowData, type, ds));
            strArr.push("</" + EventContextConstant.records + ">");
          }
        }
      }
      strArr.push("</rowset>");
    }
  }
  strArr.push("</rowsets>");
  strArr.push("</dataset>");
  return strArr.join("");
};

function serializeRows(currentKey, rowSet, rowData, type, ds) {
  var strArr = new Array;
  if (type == null) type = "ds_current_line";
  if (type == "ds_current_line") {
    var count = rowData.getRowCount();
    var selIndices = rowData.selectedIndices;
    for (var i = 0; i < count; i++) {
      var sel = false;
      if (selIndices != null) {
        for (var j = 0; j < selIndices.length; j++) {
          if (i == selIndices[j]) {
            strArr.push(rowData.getRow(i).toXml());
            sel = true;
            break;
          }
        }
      }
      var focusRowIndex = ds.getFocusRowIndex();
      if (focusRowIndex != -1 && (!sel) && (i == focusRowIndex)) {
        strArr.push(rowData.getRow(focusRowIndex).toXml());
        sel = true;
      }
      if (!sel) {
        strArr.push("<" + EventContextConstant.erecord + " id=\"" + rowData.getRow(i).rowId + "\"/>");
      }
    }
  } else if (type == "ds_current_page") {
    if (currentKey != rowSet.keyvalue || rowSet.pageindex != rowData.pageindex) {
      var count = rowData.getRowCount();
      for (var i = 0; i < count; i++) {
        strArr.push("<" + EventContextConstant.erecord + "/>");
      }
    } else $serializeRows(rowData.getRows(), strArr);
  } else if (type == "ds_current_key") {
    if (currentKey != rowSet.keyvalue) {} else $serializeRows(rowData.getRows(), strArr);
  } else if (type == "ds_all_line") {
    $serializeRows(rowData.getRows(), strArr);
  }
  return strArr.join("");
};

function $serializeRows(rowArr, strArr) {
  if (rowArr != null && rowArr.length > 0) {
    for (var i = 0, count = rowArr.length; i < count; i++) {
      strArr.push(rowArr[i].toXml(strArr));
    }
  }
};
Dataset.prototype.getChangedContext = function() {
  return this.changedObj;
};
Dataset.prototype.notifyChange = function(type, value) {
  return;
  if (isReturning()) return;
  if (type == null) return;
  this.createChangedObj();
  this.changedObj[type] = value;
};
Dataset.prototype.addRowSetNotify = function(rowSetChangedObj) {
  this.createChangedObj();
  if (this.changedObj.rowSets == null) this.changedObj.rowSets = new Array();
  this.changedObj.rowSets.push(rowSetChangedObj);
};
Dataset.prototype.createChangedObj = function() {
  if (this.changedObj == null) {
    this.changedObj = new Object;
    this.changedObj.id = this.id;
    this.changedObj.destroySelf = function() {
      if (this.rowSets != null && this.rowSets.length > 0) {
        for (var rowset in this.rowSets) {
          rowset.destroySelf();
        }
        delete this.rowSets;
      }
    };
  }
};
Dataset.prototype.clearChange = function() {
  this.changedObj.destroySelf();
  delete this.changedObj;
};
RowSet.prototype.notifyChange = function(type, value) {
  return;
  if (isReturning()) return;
  if (type == null) return;
  this.createChangedObj();
  this.changedObj[type] = value;
};
RowSet.prototype.addRowDataNotify = function(rowDataChangedObj) {
  this.createChangedObj();
  if (this.changedObj.rowDatas == null) this.changedObj.rowDatas = new Array();
  this.changedObj.rowDatas.push(rowDataChangedObj);
};
RowSet.prototype.createChangedObj = function() {
  if (this.changedObj == null) {
    this.changedObj = new Object;
    this.changedObj.keyvalue = this.keyvalue;
    this.dataset.addDataSetNotify(this.changedObj);
    this.changedObj.destroySelf = function() {
      this.keyvalue = null;
      if (this.rowDatas != null && this.rowDatas.length > 0) {
        for (var rowData in this.rowDatas) {
          rowData.destroySelf();
        }
        delete this.rowDatas;
      }
    };
  } else if (this.changedObj.keyvalue == null) {
    this.changedObj.keyvalue = this.keyvalue;
    this.dataset.addDataSetNotify(this.changedObj);
  }
};
RowData.prototype.notifyChange = function(type, value) {
  return;
  if (isReturning()) return;
  if (type == null) return;
  this.createChangedObj();
  this.changedObj[type] = value;
};
RowData.prototype.addRowNotify = function(rowChangedObj) {
  this.createChangedObj();
  if (this.changedObj.rows == null) this.changedObj.rows = new Array();
  this.changedObj.rows.push(rowChangedObj);
};
RowData.prototype.createChangedObj = function() {
  if (this.changedObj == null) {
    this.changedObj = new Object;
    this.changedObj.pageindex = this.pageindex;
    this.rowSet.addRowDataNotify(this.changedObj);
    this.changedObj.destroySelf = function() {
      this.pageindex = null;
      if (this.rows != null && this.rows.length > 0) {
        for (var row in this.rows) {
          rows.destroySelf();
        }
        delete this.rows;
      }
    };
  } else if (this.changedObj.pageindex == null) {
    this.changedObj.pageindex = this.pageindex;
    this.rowSet.addRowDataNotify(this.changedObj);
  }
};
DatasetRow.prototype.notifyChange = function(type, value) {
  return;
  if (isReturning()) return;
  if (type == null) return;
  this.createChangedObj();
  this.changedObj[type] = value;
};
DatasetRow.prototype.createChangedObj = function() {
  if (this.changedObj == null) {
    this.changedObj = new Object;
    this.changedObj.id = this.id;
    this.rowData.addRowNotify(this.changedObj);
    this.changedObj.destroySelf = function() {
      this.id = null;
    };
  } else if (this.changedObj.id == null) {
    this.changedObj.id = this.id;
    this.rowData.addRowNotify(this.changedObj);
  }
};
Dataset.prototype.isFieldExsit = function(colIndex) {
  var field = this.metadata[colIndex].field;
  if (field && (field.indexOf(window.pageUI.currentLanguageCode) != -1)) {
    var fieldBinded = field.substring(0, field.indexOf(window.pageUI.currentLanguageCode));
  }
  if (fieldBinded != null) {
    for (var i = 0; i < this.metadata.length; i++) {
      if (this.metadata[i].field == fieldBinded) {
        var colIndex = this.nameToIndex(fieldBinded);
        var isMulti = this.metadata[colIndex].isMulti;
        if (isMulti) {
          return fieldBinded;
        }
      }
    }
  }
  return null;
};

function checkDatasetRow(dataset, row) {
  return $rowRuleCheck(dataset, row);
};

function checkDatasetCell(dataset, value, cellIndex, row) {
  if (typeof generalLogicCheck != "undefined") generalLogicCheck();
  if (typeof specialCellLogicCheck != "undefined") {
    var result = specialCellLogicCheck(dataset, value, cellIndex, row);
    if (result != null && typeof result == "string") return result;
    else return null;
  }
  return $cellRuleCheck(dataset, value, cellIndex);
};

function checkDataset(dataset) {
  return $checkDsAllRows(dataset);
};

function $checkDsAllRows(ds) {
  var allRows = ds.getRows();
  var resultArr = null;
  for (var i = 0, count = allRows.length; i < count; i++) {
    var arr = checkDatasetRow(ds, allRows[i]);
    var rowIndex = ds.getRowIndex(allRows[i], null, null);
    if (arr != null) {
      if (resultArr == null) resultArr = new Array();
      for (var j = 0; j < arr.length; j++) {
        if (resultArr.indexOf(arr[j]) == -1) resultArr.push(rowIndex + ";" + arr[j]);
      }
    }
  }
  return resultArr;
};

function $cellRuleCheck(dataset, value, cellIndex) {
  var meta = dataset.metadata[cellIndex];
  var nullAble = meta.nullAble;
  if (nullAble != null && nullAble == false) {
    if ((value == null || value == "") && value != 0) {
      return trans('ml_thisfieldcannotnull');
    }
  }
  var result;
  var fm = meta.formater;
  if (fm != null) {
    if (value != null) result = $$formaterCherk(fm, value);
  }
  if (result != null) return result;
  var maxValue = meta.maxValue;
  var minValue = meta.minValue;
  if (maxValue != null || minValue != null) {
    if (value != null) result = $$scopeCherk(value, meta.dataType, maxValue, minValue);
  }
  if (result != null) return result;
  return "";
};

function $rowRuleCheck(dataset, row) {
  var meta = dataset.metadata;
  var errorArray = null;
  var hasSelfChecker = (typeof specialCellLogicCheck != "undefined");
  for (var i = 0, count = meta.length; i < count; i++) {
    var value = row.getCellValue(i);
    var errMsg = true;
    if (hasSelfChecker) {
      errMsg = specialCellLogicCheck(dataset, value, i, row);
    }
    if (errMsg == true) {
      if ((row.state == DatasetRow.STATE_NEW) || (row.state == DatasetRow.STATE_UPD)) {
        if (meta[i].isForeignKey || meta[i].isPrimaryKey) continue;
      }
      var nullAble = meta[i].nullAble;
      if (nullAble != null && nullAble == false) {
        if ((value == null || value == "") && value != 0) errMsg = trans('ml_nextfieldscannotnull');
      }
      var fm = meta[i].formater;
      if (fm != null) {
        if (value != null && value != "") errMsg = $$formaterCherk(fm, value);
      }
    }
    if (errMsg != null && typeof errMsg == "string") {
      if (errorArray == null) errorArray = new Array;
      errorArray.push(i + ";" + errMsg);
    }
  }
  return errorArray;
};

function $$formaterCherk(fm, value) {
  var returnstr = null;
  switch (fm) {
    case "email":
      if (!isEmail(value)) returnstr = trans("ml_rule_email");
      break;
    case "number":
      if (!isNumber(value)) returnstr = trans("ml_rule_number");
      break;
    case "chn":
      if (!isChinese(value)) returnstr = trans("ml_rule_chn");
      break;
    case "variable":
      if (!isValidIdentifier(value)) returnstr = trans("ml_rule_variable");
      break;
    case "phone":
      if (!isPhone(value)) returnstr = trans("ml_rule_phone");
      break;
    default:
      if (fm != null && fm != '') {
        var f = eval(decodeURIComponent(fm));
        if (!f.test(value)) returnstr = trans("ml_rule_other");
      }
      break;
  }
  return returnstr;
};

function $$scopeCherk(value, dataType, maxValue, minValue) {
  if (dataType) {
    if (dataType == DataType.STRING || dataType == DataType.CHAR || dataType == DataType.CHARACTER) {
      if (maxValue != null && value.length > maxValue) return "长度超出范围，最大值为:" + maxValue;
      if (minValue != null && value.length < minValue) return "长度超出范围，最小值为:" + minValue;
    } else if (dataType == DataType.INTEGER || dataType == DataType.INT || dataType == DataType.DOUBLE || dataType == DataType.dOUBLE || dataType == DataType.UFDOUBLE || dataType == DataType.FLOAT || dataType == DataType.fLOAT || dataType == DataType.BOOLEAN || dataType == DataType.bOOLEAN || dataType == DataType.UFBOOLEAN || dataType == DataType.BIGDECIMAL || dataType == DataType.LONG || dataType == DataType.lONG || dataType == DataType.UFNUMBERFORMAT || dataType == DataType.Decimal || dataType == DataType.UFDATETIME || dataType == DataType.UFDATE || dataType == DataType.UFTIME) {
      if (maxValue != null && value > maxValue) return "超出范围，最大值为:" + maxValue;
      if (minValue != null && value < minValue) return "超出范围，最小值为:" + minValue;
    }
  }
  return null;
};

MenuBarComp.menuHeight = 27;
MenuBarComp.opeWidth = 25;
MenuBarComp.prototype = new BaseComponent;
MenuBarComp.prototype.componentType = "MENUBAR";

function MenuBarComp(parent, name, left, top, width, height, position, className, attrArr) {
  this.base = BaseComponent;
  this.base(name, left, top, width, height);
  this.position = getString(position, "relative");
  this.parentOwner = parent;
  this.currVisibleChildMenu = null;
  this.nowClickedMenu = null;
  this.menuItems = null;
  this.align = "left";
  if (attrArr != null) {
    this.align = getString(attrArr.align, "left");
  }
  this.className = getString(className, "menubar_div");
  this.create();
};
MenuBarComp.prototype.create = function() {
  this.Div_gen = $ce("DIV");
  this.Div_gen.id = this.id;
  this.Div_gen.style.left = this.left + "px";
  this.Div_gen.style.top = this.top + "px";
  this.Div_gen.style.position = this.position;
  this.Div_gen.style.width = this.width;
  this.Div_gen.style.height = MenuBarComp.menuHeight + "px";
  this.Div_gen.className = this.className;
  if (this.parentOwner) this.placeIn(this.parentOwner);
};
MenuBarComp.prototype.manageSelf = function() {
  var styleStr = "";
  if (this.align == "right") styleStr = "style='float:right;'";
  else if (this.align == "center") styleStr = "style='margin-left:auto;margin-right:auto'";
  var html = "<table cellpadding='0' cellspacing='0' " + styleStr + "><tr><td class='div_left'></td><td valign='top' id='center' class='div_center'></td><td class='div_right'></td></tr></table>";
  this.Div_gen.innerHTML = html;
  var divCenter = this.Div_gen.firstChild.rows[0].cells[1];
  this.centerDiv = $ce("DIV");
  this.centerDiv.className = "center_div";
  divCenter.appendChild(this.centerDiv);
  var oThis = this;
  if (!IS_IE7) {
    addResizeEvent(this.Div_gen, function() {
      oThis.resetMenuItemsWidth();
    });
  }
};
MenuBarComp.prototype.destroySelf = function() {
  if (this.menuItems) {
    var items = this.menuItems.values();
    for (var i = 0, n = items.length; i < n; i++) {
      var item = items[i];
      item.destroySelf();
    }
  }
  this.destroy();
};
MenuBarComp.prototype.addMenu = function(menuId, menuCaption, menuTip, menuSrcImg, menuName, isCheckBoxGroup, attrObj) {
  if (this.menuItems == null) this.menuItems = new HashMap();
  var menuDivClassName = 'menu_div';
  if (this.className == 'white_menubar_div') {
    menuDivClassName = 'white_menu_div';
  }
  var menuItem = new MenuItemComp(this.centerDiv, menuId, menuCaption, menuTip, menuSrcImg, menuDivClassName, true, isCheckBoxGroup, false, false, attrObj);
  if (this.lastAddItem) {
    this.lastAddItem.sep.style.display = "block";
    this.lastAddItem.Div_gen.style.width = "auto";
    this.lastAddItem.divRight.style.display = "none";
    this.lastAddItem.divCenter.style.paddingRight = "20px";
    this.lastShowItem.sep.style.display = "block";
    this.lastShowItem.Div_gen.style.width = "auto";
    this.lastShowItem.divRight.style.display = "none";
    this.lastShowItem.divCenter.style.paddingRight = "20px";
    menuItem.divCenter.style.paddingLeft = "20px";
    menuItem.divLeft.style.display = "none";
  }
  this.menuItems.put(menuId, menuItem);
  var sep = $ce("DIV");
  sep.className = "menuitem_seperator";
  menuItem.Div_gen.appendChild(sep);
  sep.style.display = "none";
  menuItem.sep = sep;
  menuItem.parentOwner = this;
  if (this.lastAddItem) {
    this.lastAddItem.nextMenuItem = menuItem;
    menuItem.preMenuItem = this.lastAddItem;
    var removeWidth = this.lastAddItem.oriWidth;
    this.lastAddItem.oriWidth = this.lastAddItem.Div_gen.offsetWidth;
    this.resetMenuItemsWidth(this.lastAddItem, removeWidth);
    if (this.lastAddItem.visible == false) {
      this.lastAddItem.hide();
    }
  }
  this.lastAddItem = menuItem;
  this.lastShowItem = menuItem;
  menuItem.menuParent = this;
  menuItem.oriWidth = menuItem.Div_gen.offsetWidth;
  if (IS_IE7 && menuItem.divCenter && menuItem.divCenter.offsetWidth > menuItem.oriWidth) {
    menuItem.oriWidth = menuItem.divCenter.offsetWidth;
  }
  this.resetMenuItemsWidth(menuItem);
  return menuItem;
};
MenuBarComp.prototype.resetMenuItemsWidth = function(menuItem, removeWidth) {
  if (typeof(this.sumWidth) != "number") {
    this.sumWidth = 0;
  }
  if (typeof(this.sumCount) != "number") {
    this.sumCount = 0;
  }
  if (typeof(this.divSepCount) != "number") {
    this.divSepCount = 0;
  }
  if (menuItem) {
    if (menuItem.visible) {
      if (menuItem.oriWidth <= 0) {
        menuItem.oriWidth = menuItem.Div_gen.offsetWidth;
      }
      if (typeof(removeWidth) == "number") {
        this.sumWidth -= removeWidth;
        this.sumWidth += menuItem.oriWidth;
      } else {
        this.sumWidth += menuItem.oriWidth;
        this.sumCount++;
        if (menuItem.sepDiv && menuItem.sepDiv.style.display != "none") {
          this.divSepCount++;
        }
      }
    }
  } else {
    if (this.menuItems) {
      this.sumWidth = 0;
      this.sumCount = 0;
      this.divSepCount = 0;
      var childItems = this.menuItems.values();
      var n = childItems.length;
      for (var i = 0; i < n; i++) {
        if (childItems[i].visible) {
          var children = childItems[i].divCenter.children;
          var captionChild = null;
          for (var k = 0; k < children.length; k++) {
            if (children[k]) {
              var innerText = "";
              if (children[k].innerText) {
                innerText = children[k].innerText;
              } else if (children[k].textContent) {
                innerText = children[k].textContent;
              }
              if (innerText == childItems[i].caption) {
                captionChild = children[k];
              }
            }
          }
          if (captionChild != null) {
            captionChild.style.width = "";
          }
          if (childItems[i].oriWidth <= 0) {
            childItems[i].oriWidth = childItems[i].Div_gen.offsetWidth;
          }
          this.sumWidth += childItems[i].oriWidth;
          this.sumCount++;
          if (childItems[i].sepDiv && childItems[i].sepDiv.style.display != "none") {
            this.divSepCount++;
          }
        }
      }
    }
  }
  var parentOwnerWidth = this.parentOwner.offsetWidth - 20 - (this.divSepCount > 0 ? this.divSepCount * 6 : 0);
  if (parentOwnerWidth > 0 && this.sumWidth > parentOwnerWidth) {
    var childItems = this.menuItems.values();
    var n = childItems.length;
    var width = parentOwnerWidth / this.sumCount;
    for (var i = 0; i < n; i++) {
      if (childItems[i].visible) {
        childItems[i].Div_gen.style.width = "auto";
        var children = childItems[i].divCenter.children;
        var otherWidth = 0;
        var captionChild = null;
        for (var k = 0; k < children.length; k++) {
          if (children[k]) {
            var innerText = "";
            if (children[k].innerText) {
              innerText = children[k].innerText;
            } else if (children[k].textContent) {
              innerText = children[k].textContent;
            }
            if (innerText == childItems[i].caption) {
              captionChild = children[k];
            } else if (children[k].className == "right_div") {
              otherWidth += 16;
            } else {
              otherWidth += children[k].offsetWidth;
            }
          }
        }
        if (captionChild != null) {
          if (childItems[i].sep && childItems[i].sep.style.display != "none") {
            otherWidth += 3;
          }
          if (childItems[i].oriWidth >= width) {
            if ((width - otherWidth) > 46) {
              captionChild.style.width = (Math.floor(width - 46 - otherWidth)) + "px";
            } else {
              captionChild.style.width = "0px";
            }
            if (IS_IE7) {
              captionChild.style.overflow = "hidden";
            }
          }
        }
      }
    }
  }
};
MenuBarComp.prototype.addSep = function() {
  var sepDiv = $ce("DIV");
  sepDiv.className = "divSep";
  this.centerDiv.appendChild(sepDiv);
  if (this.lastAddItem) {
    this.lastAddItem.sepDiv = sepDiv;
    var allHide = true;
    var preMenuItem = this.lastAddItem;
    while (preMenuItem != null) {
      if (preMenuItem.visible == true) {
        allHide = false;
        break;
      }
      preMenuItem = preMenuItem.preMenuItem;
    }
    if (allHide == true) {
      this.lastAddItem.sepDiv.style.display = "none";
    }
    this.lastAddItem = null;
  }
};
MenuBarComp.prototype.getMenu = function(menuId) {
  if (menuId == null || menuId == "") return null;
  if (this.menuItems != null) return this.menuItems.get(menuId);
};
MenuBarComp.prototype.click = function(e) {
  var item = e.triggerItem;
  if (item && item.childMenu && item.childMenu.visible == false) {
    item.childMenu.setPosLeft(compOffsetLeft(item.Div_gen));
    item.childMenu.setPosTop(compOffsetTop(item.Div_gen) + item.Div_gen.offsetHeight);
    item.childMenu.show(e);
  } else if (item && item.childMenu && item.childMenu.visible == true) {
    item.childMenu.hide(e);
  }
  this.onclick(e);
};
MenuBarComp.prototype.mouseover = function(e) {
  this.showChildMenu(e);
  this.onmouseover(e);
};
MenuBarComp.prototype.showChildMenu = function(e) {
  var item = e.triggerItem;
  if (this.currVisibleChildMenu != null) {
    this.currVisibleChildMenu.hide();
  }
  if (item.childMenu) {
    item.childMenu.setPosLeft(compOffsetLeft(item.Div_gen));
    item.childMenu.setPosTop(compOffsetTop(item.Div_gen) + item.Div_gen.offsetHeight);
    item.childMenu.show(e);
    this.currVisibleChildMenu = item.childMenu;
  }
};
MenuBarComp.prototype.onmouseover = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onmouseover", mouseEvent);
};
MenuBarComp.prototype.onmouseout = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onmouseout", mouseEvent);
};
MenuBarComp.prototype.onclick = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onclick", mouseEvent);
};
MenuBarComp.prototype.handleHotKey = function(key) {
  if (this.Div_gen.style.display == "none" || this.Div_gen.style.visibility == "hidden") return null;
  if (this.menuItems) {
    var childItems = this.menuItems.values();
    if (childItems.length > 0) {
      for (var i = 0, n = childItems.length; i < n; i++) {
        var obj = childItems[i].handleHotKey(key);
        if (obj != null) return childItems[i];
      }
    }
  }
  return null;
};
MenuBarComp.prototype.setSelfDefItem = function(width, innerHTML) {
  var selfDef = $ce("DIV");
  selfDef.style.width = width.indexOf("%") == -1 ? getInteger(width) + "px" : width;
  selfDef.style.height = "100%";
  selfDef.style.styleFloat = "right";
  selfDef.style[ATTRFLOAT] = "right";
  selfDef.style.marginRight = "5px";
  this.centerDiv.appendChild(selfDef);
  selfDef.innerHTML = innerHTML;
  return selfDef;
};
MenuBarComp.prototype.getChangedContext = function() {
  if (this.menuItems == null) return;
  var childItems = this.menuItems.values();
  if (childItems != null && childItems.length > 0) {
    for (var i = 0, n = childItems.length; i < n; i++) {
      var ctx = childItems[i].getChangedContext();
      if (ctx == null) continue;
      if (this.changedObj == null) {
        this.changedObj = new Object;
        this.changedObj.id = this.id;
      }
      if (this.changedObj["childs"] == null) this.changedObj["childs"] = new Array();
      this.changedObj["childs"].push(ctx);
    }
  }
  return this.changedObj;
};
MenuBarComp.prototype.clearChange = function() {
  delete this.changedObj;
  if (!this.menuItems) return;
  var childItems = this.menuItems.values();
  if (childItems != null && childItems.length > 0) {
    for (var i = 0, n = childItems.length; i < n; i++) {
      childItems[i].clearChange();
    }
  }
};
MenuBarComp.prototype.setChangedContext = function(context) {
  if (context.itemContexts) {
    for (var i = 0, n = context.itemContexts.length; i < n; i++) {
      if (this.menuItems) {
        var item = this.menuItems.get(context.itemContexts[i].id);
        if (item) item.setChangedContext(context.itemContexts[i]);
      }
    }
  }
};

﻿
GridComp.HEADERROW_HEIGHT = 31;
GridComp.ROW_HEIGHT = 24;
GridComp.SELECTCOLUM_WIDTH = 30;
GridComp.CELL_BOTTOM_BORDER_WIDTH = 1;
GridComp.PAGEBAR_HEIGHT = 32;
GridComp.COLUMN_LEFT_BORDER_WIDTH = 0;
GridComp.SUMCELL_PADDING = 10;
GridComp.ROWSTATE_COLUMN_WIDTH = 13;
GridComp.MULTISEL_COLUMN_WIDTH = 30;
GridComp.SUMROW_DIV_WIDTH = 34;
GridComp.COlUMWIDTH_DEFAULT = 70;
GridComp.SCROLLBAE_HEIGHT = 17;
GridComp.CELL_LEFT_PADDING = 10;
GridComp.CELL_RIGHT_PADDING = 10;
GridComp.NOROW_DIV_HEIGHT = 34;
GridComp.EXPANDHEADER_MINWIDTH = 100;
GridComp.CHECKBOXMODEL_SELF = 0;
GridComp.CHECKBOXMODEL_SELF_SUB = 1;
GridComp.CHECKBOXMODEL_SELF_SUB_PARENT = 2;
GridComp.prototype = new BaseComponent;
GridComp.prototype.componentType = "GRIDCOMP";

function GridComp(parent, name, left, top, width, height, position, editable, isMultiSelWithBox, isShowNumCol, isShowSumRow, attr, groupHeaderIds, sortable, className, isPagenationTop, showColInfo, oddType, isGroupWithCheckbox, isShowHeader, extendCellEditor, rowRender, currentLanguageCode) {
  this.base = BaseComponent;
  this.base(name, left, top, width, height);
  this.parent = parent;
  this.position = getString(position, "absolute");
  this.className = getString(className, "grid_div");
  this.rowRender = rowRender == null ? DefaultRowRender : rowRender;
  this.currentLanguageCode = currentLanguageCode;
  this.extendCellEditor = extendCellEditor == null ? CellEditor : extendCellEditor;
  if (IS_IE7 || IS_IE9) GridComp.ROWSTATE_COLUMN_WIDTH = 14;
  this.initStaticConstant();
  this.editable = getBoolean(editable, true);
  this.selectedRowIndice = null;
  this.basicHeaders = new Array();
  this.rowHeight = GridComp.ROW_HEIGHT;
  this.headerRowHeight = GridComp.HEADERROW_HEIGHT;
  this.realWidth = 0;
  this.compsMap = null;
  this.currActivedCell = null;
  this.selectedCell = null;
  this.firstVScroll = false;
  this.defaultFixedHeaders = null;
  this.defaultDynamicHeaders = null;
  this.showComp = null;
  this.compsInited = false;
  this.isMultiSelWithBox = getBoolean(isMultiSelWithBox, false);
  this.isShowNumCol = getBoolean(isShowNumCol, false);
  this.isShowSumRow = getBoolean(isShowSumRow, false);
  this.groupHeaderIds = getString(groupHeaderIds, "");
  if (this.groupHeaderIds != "") this.groupHeaderIds = this.groupHeaderIds.split(",");
  this.sortable = getBoolean(sortable, true);
  this.pageSize = -1;
  this.flowmode = false;
  this.autoRowHeight = false;
  this.rowMinHeight = new Array();
  this.defaultRowMinHeight = new Array();
  this.isRunMode = false;
  this.isSimplePagination = false;
  this.isShowImageBtn = false;
  this.selfDefImageBtnRender = null;
  this.onPaste = null;
  this.descArray = null;
  this.checkBoxModel = GridComp.CHECKBOXMODEL_SELF;
  this.showTree = true;
  this.canCopy = true;
  this.autoExpand = 0;
  if (attr != null) {
    this.pageSize = getInteger(attr.pageSize, this.pageSize);
    this.flowmode = attr.flowmode;
    this.isRunMode = getBoolean(attr.isRunMode, this.isRunMode);
    this.isSimplePagination = getBoolean(attr.isSimplePagination, this.isSimplePagination);
    this.isShowImageBtn = getBoolean(attr.isShowImageBtn, this.isShowImageBtn);
    this.autoRowHeight = getBoolean(attr.autoRowHeight, this.autoRowHeight);
    this.canCopy = getBoolean(attr.canCopy, this.canCopy);
    this.selfDefImageBtnRender = attr.selfDefImageBtnRender;
    this.onPaste = attr.onPaste;
    this.showForm = getBoolean(attr.showForm, false);
    this.showTree = getBoolean(attr.showTree, true);
    this.isMultiSelectShow = attr.isMultiSelectShow;
    if (attr.descArray instanceof Array) {
      this.descArray = attr.descArray;
    } else if (typeof(attr.descArray) != 'undefined') {
      this.descArray = new Array();
      this.descArray.push(attr.descArray);
    }
    this.defaultLangCode = getInteger(attr.defaultLangCode, this.currentLanguageCode);
    this.autoExpand = getInteger(attr.autoExpand, 0);
  }
  this.isPagenationTop = getBoolean(isPagenationTop, true);
  this.showColInfo = getBoolean(showColInfo, true);
  this.oddType = getString(oddType, "0");
  this.oddType = "0";
  this.isGroupWithCheckbox = getBoolean(isGroupWithCheckbox, true);
  this.isShowHeader = getBoolean(isShowHeader, true);
  this.focusIndex = -1;
  window.clickHolders.push(this);
  this.outerDivId = "data_outer_scroll" + this.getId();
  this.keepScroll = false;
  this.treeLevel = null;
};
GridComp.prototype.create = function() {
  if (this.wholeDiv == null) {
    this.initWholeDiv();
    this.initDescArrayDiv();
    this.initImageBtn();
    if (this.isRunMode && typeof(this.selfDefImageBtnRender) == 'function') {
      this.selfDefImageBtnRender.call(this, this);
    }
    this.initOuterDiv();
    this.initWholeErrorMsgDiv();
  }
  this.setGridDescContent();
  if (this.parent) this.placeIn(this.parent);
};
GridComp.prototype.destroySelf = function() {
  this.basicHeaders = null;
  if (this.model) {
    this.model.destroySelf();
    this.model = null;
  }
  if (this.compsMap) {
    var comps = this.compsMap.values();
    for (var i = 0; i < comps.length; i++) {
      var comp = comps[i];
      comp.destroySelf();
    }
    this.compsMap.clear();
    this.compsMap = null;
  }
  BaseComponent.prototype.destroySelf.call(this);
};
GridComp.prototype.getObjHtml = function() {
  return this.wholeDiv;
};
GridComp.prototype.manageSelf = function() {
  var oThis = this;
  if (this.model == null) return;
  if (this.showForm) {
    this.paintFormData();
  } else {
    this.paintData();
  }
  if (this.editable) {
    setTimeout("GridComp.initEditCompsForGrid('" + this.id + "')", 100);
  }
  if (!this.showForm) {
    setTimeout("GridComp.processAutoExpandHeadersWidth('" + this.id + "','" + this.outerDivId + "')", 350);
  }
};
GridComp.prototype.isOdd = function(index) {
  if (index == null) return false;
  if (this.oddType == "0") {
    return index % 2 == 1;
  } else if (this.oddType == "1") {
    return index % 3 != 0;
  }
};
GridComp.prototype.initWholeDiv = function() {
  if (!this.wholeDiv) {
    this.wholeDiv = $ce("div");
  }
  this.wholeDiv.id = "gridWholeDiv";
  this.wholeDiv.className = "whole_grid_div";
  if (IS_CHROME) {
    this.wholeDiv.onmouseup = function() {
      destroyDargObj();
    };
  }
};
GridComp.prototype.initDescArrayDiv = function() {
  if (!this.descDiv) {
    this.descDiv = $ce("DIV");
    this.descDiv.className = "desc_div";
    this.descBKLeftDiv = $ce("DIV");
    this.descBKLeftDiv.className = "desc_bk_left_div";
    this.descDiv.appendChild(this.descBKLeftDiv);
    this.descBKMiddleDiv = $ce("DIV");
    this.descBKMiddleDiv.className = "desc_bk_middle_div";
    this.descDiv.appendChild(this.descBKMiddleDiv);
    this.descBKRightDiv = $ce("DIV");
    this.descBKRightDiv.className = "desc_bk_right_div";
    this.descDiv.appendChild(this.descBKRightDiv);
    this.wholeDiv.appendChild(this.descDiv);
  }
};
GridComp.prototype.setGridDescContent = function(descMsg) {
  this.descBKMiddleDiv.innerHTML = '';
  if (descMsg instanceof Array) {
    this.descArray = descMsg;
  } else if (typeof(descMsg) != 'undefined') {
    this.descArray = new Array();
    this.descArray.push(descMsg);
  }
  this.descBKMiddleDiv.title = "";
  if (this.descArray && this.descArray.length > 0) {
    for (var i = 0; i < this.descArray.length; i++) {
      var desc = $ce("FONT");
      desc.className = 'desc_msg';
      desc.innerHTML = this.descArray[i];
      if (i == 0) {
        desc.style.paddingLeft = '5px';
      }
      if (i == this.descArray.length - 1) {
        desc.style.borderRight = 'none';
      }
      this.descBKMiddleDiv.appendChild(desc);
    }
    this.descDiv.style.display = 'block';
    GridComp.gridResize(this.id);
  }
};
GridComp.prototype.initImageBtn = function() {
  if (typeof(this.headerBtnDiv) == 'undefined') {
    this.headerBtnDiv = $ce("div");
    this.headerBtnDiv.className = "headerbtnbar_div";
    this.wholeDiv.appendChild(this.headerBtnDiv);
  }
  if (this.isShowImageBtn) {
    this.headerBtnDiv.style.display = "block";
  } else {
    this.headerBtnDiv.style.display = "none";
  }
  if (!this.isRunMode) {
    this.headerBtnDiv.style.display = "none";
  }
  this.menubarComp = new MenuBarComp(this.headerBtnDiv, "gridMenuBar", 0, 4, "100%", "100%", null, "white_menubar_div");
  this.menubarComp.centerDiv.style.width = "auto";
  this.menubarComp.Div_gen.firstChild.style[ATTRFLOAT] = "right";
};
GridComp.prototype.setCheckBoxModel = function(checkBoxModel) {
  this.checkBoxModel = parseInt(checkBoxModel);
};
GridComp.prototype.setHeaderBtnVisible = function(visible) {
  this.isShowImageBtn = (visible == true) ? true : false;
  if (visible == true) this.headerBtnDiv.style.display = "block";
  else if (visible == false) this.headerBtnDiv.style.display = "none";
  GridComp.gridResize(this.id);
};
GridComp.prototype.addHeaderBtn = function(id, caption, imgSrc) {
  if (!this.isShowImageBtn) {
    return;
  }
  this.menubarComp.addMenu(id, caption, caption, imgSrc, null, false, null);
};
GridComp.prototype.getHeaderBtn = function(id) {
  if (!this.isShowImageBtn) {
    return;
  }
  return this.menubarComp.getMenu(id);
};
GridComp.prototype.removeHeaderBtn = function(id) {
  if (!this.isShowImageBtn) {
    return;
  }
  if (this.menubarComp.menuItems && this.menubarComp.menuItems != null && this.menuItems.values() && this.menuItems.values().length > 0) {
    var items = this.menuItems.values();
    for (var i = 0; i < items.length; i++) {
      if (items[i].id && items[i].id == id) {
        items[i].destroySelf();
        break;
      }
    }
  }
};
GridComp.prototype.removeAllHeaderBtn = function() {
  if (!this.isShowImageBtn) {
    return;
  }
  this.menubarComp.destroySelf();
};

function selfDefHeaderBtnRender(grid) {
  grid.removeAllHeaderBtn();
  grid.addHeaderBtn("gridHeaderBtn_Test", "测试", window.themePath + "/ui/ctrl/menu/images/whitemenu/toolbar_icons/add_normal.png");
}
GridComp.prototype.initWholeErrorMsgDiv = function(errorBoldMsg, errorMsg) {
  var oThis = this;
  this.errorMsgDiv = $ce("DIV");
  this.errorMsgDiv.id = "error_whole_msg_id";
  this.errorMsgDiv.style.display = "none";
  this.errorMsgDiv.className = "error_whole_msg_div";
  this.wholeMsgDiv = $ce("DIV");
  this.wholeMsgDiv.className = "whole_msg_div";
  this.errorMsgDiv.appendChild(this.wholeMsgDiv);
  var leftTopDiv = $ce("DIV");
  leftTopDiv.className = "bg_left_top";
  this.wholeMsgDiv.appendChild(leftTopDiv);
  var topMiddleDiv = $ce("DIV");
  topMiddleDiv.className = "bg_top_middle";
  this.wholeMsgDiv.appendChild(topMiddleDiv);
  var rightTopDiv = $ce("DIV");
  rightTopDiv.className = "bg_right_top";
  this.wholeMsgDiv.appendChild(rightTopDiv);
  var rightMiddleDiv = $ce("DIV");
  rightMiddleDiv.className = "bg_right_middle";
  this.wholeMsgDiv.appendChild(rightMiddleDiv);
  var rightBottomDiv = $ce("DIV");
  rightBottomDiv.className = "bg_right_bottom";
  this.wholeMsgDiv.appendChild(rightBottomDiv);
  var bottomMiddleDiv = $ce("DIV");
  bottomMiddleDiv.className = "bg_bottom_middle";
  this.wholeMsgDiv.appendChild(bottomMiddleDiv);
  var leftBottomDiv = $ce("DIV");
  leftBottomDiv.className = "bg_left_bottom";
  this.wholeMsgDiv.appendChild(leftBottomDiv);
  var leftMiddleDiv = $ce("DIV");
  leftMiddleDiv.className = "bg_left_middle";
  this.wholeMsgDiv.appendChild(leftMiddleDiv);
  this.errorCenterDiv = $ce("DIV");
  this.errorCenterDiv.className = "error_center_up_div";
  this.wholeMsgDiv.appendChild(this.errorCenterDiv);
  this.errorMsg = $ce("DIV");
  this.errorMsg.className = "errorMsg";
  this.errorCenterDiv.appendChild(this.errorMsg);
  this.warningIcon = $ce("DIV");
  this.warningIcon.className = "warning";
  this.wholeMsgDiv.appendChild(this.warningIcon);
  this.closeIcon = $ce("DIV");
  this.closeIcon.className = "close_normal";
  this.closeIcon.onmouseover = function(e) {
    this.className = "close_press";
  };
  this.closeIcon.onmouseout = function(e) {
    this.className = "close_normal";
  };
  this.closeIcon.onmouseup = function(e) {
    this.className = "close_normal";
    oThis.errorMsgDiv.style.display = "none";
  };
  this.wholeMsgDiv.appendChild(this.closeIcon);
  this.wholeDiv.appendChild(this.errorMsgDiv);
};
GridComp.prototype.hideErrorMsg = function() {
  if (this.errorMsgDiv) {
    this.errorMsgDiv.style.display = "none";
  }
};
GridComp.prototype.setWholeErrorPosition = function() {};
GridComp.prototype.onImageBtnClick = function(fun) {};
GridComp.prototype.initStaticConstant = function() {
  GridComp.HEADERROW_HEIGHT = getCssHeight(this.className + "_HEADERROW_HEIGHT");
  GridComp.ROW_HEIGHT = getCssHeight(this.className + "_ROW_HEIGHT");
  GridComp.SELECTCOLUM_WIDTH = getCssHeight(this.className + "_SELECTCOLUM_WIDTH");
  GridComp.CELL_BOTTOM_BORDER_WIDTH = getCssHeight(this.className + "_CELL_BOTTOM_BORDER_WIDTH");
};
GridComp.prototype.outsideClick = function(e) {
  if (e && e.calendar) return;
  if (this.showComp) {
    if (window.clickHolders.trigger == this.showComp) return;
    this.hiddenComp();
  }
  this.hideTipMessage(true);
  this.hideenColumnContentMenu();
  if (typeof(this.compsMap) != 'undefined' && this.compsMap != null) {
    var comps = this.compsMap.values();
    if (comps && comps.length > 0) {
      for (var i = 0; i < comps.length; i++) {
        if (comps[i].errorMsgDiv) {
          if (comps[i].componentType != "INTEGERTEXT") comps[i].errorMsgDiv.style.display = "none";
        }
      }
    }
  }
};
GridComp.prototype.outsideMouseWheelClick = function(e) {
  e = EventUtil.getEvent();
  if (e && e.calendar) return;
  if (this.showComp) {
    if (window.clickHolders.trigger == this.showComp) return;
    this.hiddenComp();
  }
  this.hideenColumnContentMenu();
  this.hideTipMessage(true);
  clearEventSimply(e);
};
GridComp.prototype.click = function(e) {
  if (IS_IPAD) {
    if (this.showComp != null) {
      if (this.showComp.blur) {
        this.showComp.blur();
      }
    }
  }
  document.onclick(e);
  this.hideenColumnContentMenu();
  if (this.isGridActive == false) return;
  var cell = this.getRealCell(e);
  var columDiv = cell.parentNode;
  var rowIndex = this.getCellRowIndex(cell);
  var colIndex = cell.colIndex;
  if (columDiv == null || (columDiv.parentNode != null && columDiv.parentNode.id != "dynamicDataDiv")) return;
  if (this.showComp != null) this.hiddenComp();
  this.setFocusIndex(rowIndex);
  if (this.onBeforeRowSelected(rowIndex, this.getRow(rowIndex)) == false) return;
  if (this.isMultiSelWithBox) {
    this.selectColumDiv.children[rowIndex].children[0].onmousedown(e);
  } else this.processCtrlSel(false, rowIndex);
  if (this.onCellClick(cell, rowIndex, colIndex) == false) {
    stopDefault(e);
    return;
  }
  if (this.model.dataset.editable == true && this.basicHeaders[colIndex].columEditable == true) {
    if (this.onBeforeEdit(rowIndex, colIndex) == false) return;
  }
  this.setCellSelected(cell, e.ctrlKey);
  this.changeSelectedCellStyle(rowIndex);
  if (typeof(this.compsMap) != 'undefined' && this.compsMap != null) {
    var comp = null;
    var comps = this.compsMap.values();
    if (comps && comps.length > 0) {
      for (var i = 0; i < comps.length; i++) {
        if (typeof(cell.editorType) == 'string' && comps[i].componentType == cell.editorType.toUpperCase()) {
          comp = comps[i];
          break;
        }
      }
    }
    if (comp != null) {
      var warningIcon = cell.warningIcon;
      if (typeof(warningIcon) == 'undefined') {
        warningIcon = $ce("DIV");
        warningIcon.className = "cellwarning";
        cell.warningIcon = warningIcon;
        cell.style.position = "relative";
      }
      cell.appendChild(warningIcon);
      if (typeof(cell.errorMsg) == "string" && cell.errorMsg != "") {
        if (typeof(comp.setError) == 'function') {
          comp.setError(true);
        }
        if (typeof(comp.setErrorMessage) == 'function') {
          comp.setErrorMessage(cell.errorMsg);
        }
        if (typeof(comp.setErrorStyle) == 'function') {
          comp.setErrorStyle();
        }
        if (typeof(comp.setErrorPosition) == 'function') {
          var top = cell.offsetTop;
          if (this.headerDiv && this.headerDiv.offsetHeight) {
            top += this.headerDiv.offsetHeight;
          }
          if (this.outerDiv && this.outerDiv.offsetTop > 0) {
            top += this.outerDiv.offsetTop;
          }
          var showColIndex = this.getShowColIndex(colIndex);
          var left = cell.offsetWidth * (showColIndex) + 10;
          comp.setErrorPosition(this.wholeDiv, left, top - 31);
        }
        warningIcon.style.display = "block";
      } else {
        if (typeof(comp.setError) == 'function') {
          comp.setError(false);
        }
        if (typeof(comp.setErrorMessage) == 'function') {
          comp.setErrorMessage("");
        }
        if (typeof(comp.setNormalStyle) == 'function') {
          comp.setNormalStyle();
        }
        warningIcon.style.display = "none";
      }
    }
  }
};
GridComp.prototype.attachEvents = function() {
  var oThis = this;
  this.dataOuterDiv.ondblclick = function(e) {
    e = EventUtil.getEvent();
    if (oThis.isGridActive == false) return;
    if (oThis.editable) return;
    var cell = oThis.getRealCell(e);
    if (cell == null || cell == this) return;
    var rowIndex = oThis.getCellRowIndex(cell);
    oThis.onRowDblClick(rowIndex, oThis.getRow(rowIndex));
    clearEventSimply(e);
  };
  this.dataOuterDiv.oncontextmenu = function(e) {
    e = EventUtil.getEvent();
    oThis.click(e);
    var result = oThis.onDataOuterDivContextMenu(e);
    if (result == false) stopAll(e);
    clearEventSimply(e);
  };
  this.dataOuterDiv.onclick = function(e) {
    e = EventUtil.getEvent();
    oThis.click(e);
    oThis.hideTipMessage(true);
    stopEvent(e);
    clearEventSimply(e);
  };
  this.dataOuterDiv.onkeydown = function(e) {
    e = EventUtil.getEvent();
    if (oThis.isGridActive == false) {
      clearEventSimply(e);
      return;
    }
    if (oThis.showComp != null) oThis.hiddenComp();
    var cell = oThis.selectedCell;
    if (cell == null) cell = getTarget(e);
    var ch = e.lfwKey;
    if (cell.tagName.toLowerCase() != "div") {
      clearEventSimply(e);
      return;
    }
    var rowIndex = oThis.getCellRowIndex(cell);
    var colIndex = cell.colIndex;
    if (ch == 40) {
      if (!oThis.isMultiSelWithBox) {
        if (rowIndex == null) {
          var selIndexs = oThis.getSelectedRowIndice();
          if (selIndexs == null || selIndexs.length == 0) rowIndex = -1;
          else rowIndex = selIndexs[0];
          oThis.model.setRowSelected(rowIndex + 1);
        } else if (rowIndex + 1 <= oThis.getRowsNum() - 1) {
          cell = oThis.getCell(rowIndex + 1, colIndex);
          oThis.setCellSelected(cell);
          oThis.model.setRowSelected(rowIndex + 1);
        }
      }
    } else if (ch == 38) {
      if (!oThis.isMultiSelWithBox) {
        if (rowIndex == null) {
          var selIndexs = oThis.getSelectedRowIndice();
          if (selIndexs == null || selIndexs.length == 0) {
            clearEventSimply(e);
            return;
          } else rowIndex = selIndexs[0];
          if (rowIndex > 0) oThis.model.setRowSelected(rowIndex - 1);
        } else if (rowIndex > 0) {
          cell = oThis.getCell(rowIndex - 1, colIndex);
          oThis.setCellSelected(cell);
          oThis.model.setRowSelected(rowIndex - 1);
        }
      }
    } else if (ch == 37) {
      if (!oThis.isMultiSelWithBox && rowIndex != null) {
        var tmpCell = oThis.getCell(rowIndex, colIndex - 1);
        var tmpRowIndex = oThis.getCellRowIndex(tmpCell);
        if (tmpCell == null) tmpCell = oThis.getVisibleCellByDirection(cell, -1);
        if (tmpCell != null) {
          oThis.setCellSelected(tmpCell);
          if (cell.rowIndex != tmpRowIndex) oThis.model.setRowSelected(tmpRowIndex);
          oThis.changeSelectedCellStyle(tmpRowIndex);
        }
      }
    } else if (ch == 39) {
      if (!oThis.isMultiSelWithBox && rowIndex != null) {
        var tmpCell = oThis.getCell(rowIndex, colIndex + 1);
        var tmpRowIndex = oThis.getCellRowIndex(tmpCell);
        if (tmpCell == null) {
          if (rowIndex + 1 <= oThis.getRowsNum() - 1) {}
          tmpCell = oThis.getVisibleCellByDirection(cell, 1);
        }
        if (tmpCell != null) {
          oThis.setCellSelected(tmpCell);
          if (cell.rowIndex != tmpRowIndex) oThis.model.setRowSelected(tmpRowIndex);
          oThis.changeSelectedCellStyle(tmpRowIndex);
        }
      }
    }
    if (!e.ctrlKey) {
      stopDefault(e);
    }
    clearEventSimply(e);
  };
  this.fixedColumDiv.ondblclick = function(e) {
    if (oThis.isGridActive == false) return;
    if (oThis.editable) return;
    e = EventUtil.getEvent();
    var cell = oThis.getRealCell(e);
    clearEventSimply(e);
    if (cell == null || cell == this) {
      return;
    }
    var rowIndex = oThis.getCellRowIndex(cell);
    oThis.onRowDblClick(cell.rowIndex, oThis.getRow(rowIndex));
  };
  this.fixedColumDiv.onclick = function(e) {
    oThis.hideenColumnContentMenu();
    if (oThis.isGridActive == false) return;
    e = EventUtil.getEvent();
    var cell = oThis.getRealCell(e);
    if (cell.id == "rowNumDiv" || cell.id == "fixedColum") {
      clearEventSimply(e);
      return;
    }
    if (cell.parentNode.id.startWith("numline") || cell.id.startWith("numline") || cell.parentNode.id.startWith("sumRowDiv") || cell.id.startWith("sumRowDiv") || cell.parentNode.id == "lineStateColumDiv") {
      clearEventSimply(e);
      return;
    }
    var columDiv = cell.parentNode;
    var rowIndex = oThis.getCellRowIndex(cell);
    var colIndex = cell.colIndex;
    if (columDiv.id == "fixedSelectColum") {} else {
      if (oThis.showComp != null) oThis.hiddenComp();
      if (oThis.onBeforeRowSelected(rowIndex, oThis.getRow(rowIndex)) == false) {
        clearEventSimply(e);
        return;
      }
      if (oThis.onCellClick(cell, rowIndex, colIndex) == false) {
        if (oThis.isMultiSelWithBox) {} else {
          oThis.processCtrlSel(false, rowIndex);
        }
        stopDefault(e);
        clearEventSimply(e);
        return;
      }
      if (oThis.onBeforeEdit(rowIndex, colIndex) == false) {
        oThis.rowSelected(rowIndex);
        clearEventSimply(e);
        return;
      }
      oThis.setCellSelected(cell, e.ctrlKey);
      if (columDiv.parentNode.id == "fixedDataDiv") {
        if (oThis.isMultiSelWithBox)
          if (oThis.model.treeLevel == null) oThis.selectColumDiv.children[rowIndex].children[0].onmousedown(e);
          else {
            oThis.processCtrlSel(false, rowIndex);
          }
      }
      stopEvent(e);
      clearEventSimply(e);
    }
  };
  this.dataOuterDiv.onscroll = function(e) {
    if (oThis.currActivedCell && oThis.showComp) {
      if (oThis.currActivedCell.editorType == EditorType.TEXTAREA) {
        var cell = oThis.currActivedCell;
        var comp = oThis.showComp;
        var bodyWidth = document.body.offsetWidth;
        var bodyHeight = document.body.offsetHeight;
        if (bodyWidth < 100 || bodyHeight < 200) {
          comp.setBounds(compOffsetLeft(cell, document.body) + GridComp.CELL_LEFT_PADDING, compOffsetTop(cell, document.body) - compScrollTop(cell, document.body) - 1, cell.offsetWidth - GridComp.CELL_RIGHT_PADDING - 1, cell.offsetHeight);
        } else {
          var compLeft = compOffsetLeft(cell, document.body) + GridComp.CELL_LEFT_PADDING;
          var compTop = compOffsetTop(cell, document.body) - compScrollTop(cell, document.body) - 1;
          if (parseInt(compLeft) + 200 > bodyWidth) compLeft = bodyWidth - 200;
          if (parseInt(compTop) + 100 > bodyHeight) compTop = bodyHeight - 100;
          comp.setBounds(compLeft, compTop, "200", "100");
        }
      } else {
        oThis.showComp.setBounds(compOffsetLeft(oThis.currActivedCell, document.body) + GridComp.CELL_LEFT_PADDING, compOffsetTop(oThis.currActivedCell, document.body) - compScrollTop(oThis.currActivedCell, document.body), oThis.currActivedCell.offsetWidth - GridComp.CELL_RIGHT_PADDING - 1, oThis.currActivedCell.offsetHeight);
        oThis.showComp.setFocus();
      }
    }
    e = EventUtil.getEvent();
    e.triggerObj = oThis;
    handleScrollEvent(e);
    if (oThis.showComp != null) {
      if (IS_IE || oThis.autoScroll != true) oThis.hiddenComp();
      else oThis.autoScroll = false;
    }
    var src = getTarget(e);
    var iScrollLeft = src.scrollLeft;
    var bgyScrollTop = src.scrollTop;
    var bgyFixColumn = this.previousSibling;
    var bgyFixHeight = bgyFixColumn.style.height;
    if (bgyFixColumn.id == "fixedColum") {
      bgyFixColumn.style.height = parseInt(bgyFixHeight) + bgyScrollTop + "px";
      bgyFixColumn.style.top = (0 - bgyScrollTop + 31) + "px";
    }
    if (oThis.dynamicHeaderDiv.oldLeft == null) {
      oThis.dynamicHeaderDiv.oldLeft = parseInt(oThis.dynamicHeaderDiv.style.left);
    }
    oThis.dynamicHeaderDiv.style.left = (oThis.dynamicHeaderDiv.oldLeft - iScrollLeft) + "px";
    if (oThis.dynamicHeaderDiv.defaultWidth + iScrollLeft > 0) oThis.dynamicHeaderDiv.style.width = (oThis.dynamicHeaderDiv.defaultWidth + iScrollLeft) + "px";
    if (oThis.sumRowDiv) {
      oThis.dynSumRowDataDiv.style.left = oThis.sumRowDiv.offsetWidth + "px";
    }
    if (oThis.isMultiSelWithBox) {
      var scrollTop = src.scrollTop;
      if (oThis.selectColumDiv) {
        oThis.selectColumDiv.style.top = (-1 * scrollTop) + "px";
      }
    }
    e.triggerObj = null;
    clearEventSimply(e);
  };
  this.outerDiv.id = oThis.id + "_outerdiv";
  addResizeEvent(this.outerDiv, function() {
    GridComp.gridResize(oThis.id);
  });
  if (document.body.children[0]) {
    if (!document.body.children[0].gridMap) {
      document.body.children[0].gridMap = new HashMap();
    }
    document.body.children[0].gridMap.put(this.id, this);
    document.body.children[0].onscroll = function(e) {
      var grids = this.gridMap.values();
      for (var i = 0; i < grids.length; i++) {
        if (grids[i].showComp != null) {
          if (grids[i].autoScroll != true) grids[i].hiddenComp();
          else grids[i].autoScroll = false;
        }
      }
      stopEvent(e);
      clearEventSimply(e);
    };
  }
};
GridComp.prototype.setScrollLeft = function(scrollLeft) {
  if (!IS_IE) this.autoScroll = true;
  if (this.showComp) {
    if (window.clickHolders.trigger == this.showComp) return;
    this.hiddenComp();
  }
  this.dataOuterDiv.scrollLeft = scrollLeft;
};
GridComp.prototype.setScrollTop = function(scrollTop) {
  if (!IS_IE) this.autoScroll = true;
  if (this.showComp) {
    if (window.clickHolders.trigger == this.showComp) return;
    this.hiddenComp();
  }
  this.dataOuterDiv.scrollTop = scrollTop;
};
GridComp.gridResize = function(gridId) {
  var grid = window.objects[gridId];
  if (grid == null) return;
  var outerDiv = grid.wholeDiv;
  var barHeight = GridComp.SCROLLBAE_HEIGHT;
  if (outerDiv.style.height != '100%') {
    outerDiv.style.height = "100%";
  }
  grid.height = "100%";
  if (outerDiv.style.width != '100%') {
    outerDiv.style.width = "100%";
  }
  grid.width = '100%';
  if (grid.showComp) {
    grid.hiddenComp();
  }
  try {
    if (!grid.flowmode) {
      var height = outerDiv.offsetHeight;
      if (grid.descDiv) height = height - grid.descDiv.offsetHeight;
      if (grid.headerBtnDiv) height = height - grid.headerBtnDiv.offsetHeight;
      if (height > 0) {}
      if (grid.pageSize != -1 && grid.needShowNoRowsDiv) height = height - grid.constant.headerHeight - GridComp.NOROW_DIV_HEIGHT;
      else if (grid.pageSize != -1 && !grid.needShowNoRowsDiv) height = height - grid.constant.headerHeight - GridComp.PAGEBAR_HEIGHT;
      else height = height - grid.constant.headerHeight;
      if (height > 0) {
        if (grid.fixedColumDiv) grid.fixedColumDiv.style.height = height + "px";
        grid.dataOuterDiv.style.height = height + "px";
      }
    }
    var cond1 = (grid.constant.outerDivWidth != null && grid.constant.outerDivWidth == outerDiv.offsetWidth);
    var cond2 = (grid.constant.outerDivHeight != null && grid.constant.outerDivHeight == outerDiv.offsetHeight);
    if (cond1 && cond2) return;
    grid.constant.outerDivWidth = outerDiv.offsetWidth;
    grid.constant.outerDivHeight = outerDiv.offsetHeight;
    grid.constant.fixedHeaderDivWidth = grid.fixedHeaderDiv.offsetWidth;
    if (grid.width.indexOf("%") != -1) {
      var fixedHeaderWidth = grid.constant.fixedHeaderDivWidth;
      var currWidth = grid.constant.outerDivWidth;
      var fixedColumDivWidth = grid.fixedColumDiv.offsetWidth;
      grid.dataOuterDiv.style.width = (currWidth - fixedColumDivWidth) + "px";
      if (grid.isVScroll()) {
        grid.headerDiv.style.width = (currWidth - barHeight) + "px";
        grid.headerDiv.defaultWidth = currWidth - barHeight;
        var dynHeaderWidth = currWidth - fixedHeaderWidth - barHeight;
        if (dynHeaderWidth > 0) grid.dynamicHeaderDiv.style.width = dynHeaderWidth + "px";
        grid.dynamicHeaderDiv.defaultWidth = dynHeaderWidth;
      } else {
        grid.headerDiv.style.width = currWidth + "px";
        grid.headerDiv.defaultWidth = currWidth;
        var dynHeaderWidth = currWidth - fixedHeaderWidth;
        if (dynHeaderWidth > 0) grid.dynamicHeaderDiv.style.width = dynHeaderWidth + "px";
        grid.dynamicHeaderDiv.defaultWidth = dynHeaderWidth;
      }
    }
    grid.setScrollLeft(0);
    if (grid.isShowSumRow && grid.sumRowDiv) {
      if (grid.dynamicColumDataDiv && grid.dynamicColumDataDiv.offsetWidth > 0) {
        grid.dynSumRowContentDiv.style.width = (grid.dynamicColumDataDiv.offsetWidth) + "px";
      } else {
        grid.dynSumRowContentDiv.style.width = (grid.dynamicHeaderDiv.offsetWidth) + "px";
      }
    }
    if (grid.stForAutoExpand != null) clearTimeout(grid.stForAutoExpand);
    grid.stForAutoExpand = setTimeout("GridComp.processAutoExpandHeadersWidth('" + gridId + "','" + this.outerDivId + "')", 100);
  } catch (e) {}
};
GridComp.prototype.getRealCell = function(e) {
  var cell = getTarget(e);
  if (cell.editorType == null) {
    var pNode = cell.parentNode;
    while (pNode != null) {
      if (pNode.editorType != null) {
        cell = pNode;
        break;
      }
      pNode = pNode.parentNode;
    }
  }
  return cell;
};
GridComp.prototype.setRowHeight = function(height) {
  height = parseInt(height);
  if (height < 10) height = 10;
  this.rowHeight = height;
};
GridComp.prototype.setHeaderRowHeight = function(height) {
  height = parseInt(height);
  if (height < 10) height = 10;
  this.headerRowHeight = height;
};
GridComp.prototype.getCell = function(rowIndex, colIndex) {
  rowIndex = parseInt(rowIndex);
  colIndex = parseInt(colIndex);
  if (rowIndex < 0 || rowIndex > this.getRowsNum() - 1) return null;
  if (colIndex < 0 || colIndex > this.basicHeaders.length - 1) return null;
  if (this.basicHeaders[colIndex] != null && this.basicHeaders[colIndex].isHidden == false) return this.basicHeaders[colIndex].dataDiv.cells[rowIndex];
  return null;
};
GridComp.prototype.getVisibleCellByDirection = function(cell, direction) {
  var rowIndex = this.getCellRowIndex(cell);
  var colIndex = cell.colIndex;
  if (direction == 1) {
    for (var j = colIndex + 1, count = this.basicHeaders.length; j < count; j++) {
      if (this.basicHeaders[j].isHidden == false) return this.basicHeaders[j].dataDiv.cells[rowIndex];
    }
    for (var i = rowIndex + 1, rowNum = this.getRowsNum(); i < rowNum; i++) {
      for (var j = 0, count = this.basicHeaders.length; j < count; j++) {
        if (this.basicHeaders[j].isHidden == false) return this.basicHeaders[j].dataDiv.cells[i];
      }
    }
  } else if (direction == -1) {
    for (var j = colIndex - 1; j >= 0; j--) {
      if (this.basicHeaders[j].isHidden == false) return this.basicHeaders[j].dataDiv.cells[rowIndex];
    }
    for (var i = rowIndex - 1; i >= 0; i--) {
      for (var j = this.basicHeaders.length - 1; j >= 0; j--) {
        if (this.basicHeaders[j].isHidden == false) return this.basicHeaders[j].dataDiv.cells[i];
      }
    }
  }
  return null;
};
GridComp.prototype.getEditableCellByDirection = function(cell, direction) {
  if (this.editable == false) return null;
  var rowIndex = this.getCellRowIndex(cell);
  var colIndex = cell.colIndex;
  if (direction == 1) {
    for (var j = colIndex + 1, count = this.basicHeaders.length; j < count; j++) {
      if (this.basicHeaders[j].isHidden == false && this.basicHeaders[j].columEditable == true && this.onBeforeEdit(rowIndex, j) != false) return this.basicHeaders[j].dataDiv.cells[rowIndex];
    }
    for (var i = rowIndex + 1, rowNum = this.getRowsNum(); i < rowNum; i++) {
      for (var j = 0, count = this.basicHeaders.length; j < count; j++) {
        if (this.basicHeaders[j].isHidden == false && this.basicHeaders[j].columEditable == true && this.onBeforeEdit(i, j) != false) return this.basicHeaders[j].dataDiv.cells[i];
      }
    }
  } else if (direction == -1) {
    for (var j = colIndex - 1; j >= 0; j--) {
      if (this.basicHeaders[j].isHidden == false && this.basicHeaders[j].columEditable == true && this.onBeforeEdit(rowIndex, j) != false) return this.basicHeaders[j].dataDiv.cells[rowIndex];
    }
    for (var i = rowIndex - 1; i >= 0; i--) {
      for (var j = this.basicHeaders.length - 1; j >= 0; j--) {
        if (this.basicHeaders[j].isHidden == false && this.basicHeaders[j].columEditable == true && this.onBeforeEdit(i, j) != false) return this.basicHeaders[j].dataDiv.cells[i];
      }
    }
  }
  return null;
};
GridComp.prototype.setCellSelected = function(cell, ctrl, shift) {
  var oThis = this;
  if (cell == null) return;
  if (this.isMultiSelWithBox && !this.editable) {
    return;
  }
  var cellClassName = cell.className;
  if (this.oldCell == null) {
    if (this.basicHeaders[cell.colIndex] != null && this.basicHeaders[cell.colIndex].isFixedHeader) cell.className += " fixedcell_select";
    else cell.className += " cell_select";
    this.oldCell = cell;
    this.oldClassName = cellClassName;
  } else {
    if (this.oldCell != cell) {
      this.oldCell.className = this.oldClassName;
      var oldRowIndex = this.getCellRowIndex(this.oldCell);
      var isOdd = this.isOdd(oldRowIndex);
      var curHeader = this.basicHeaders[this.oldCell.colIndex];
      if (!this.isMultiSelWithBox) {
        if (this.selectedRowIndice != null && this.selectedRowIndice.indexOf(oldRowIndex) != -1) {
          if (curHeader != null && curHeader.isFixedHeader) this.oldCell.className = isOdd ? "fixed_gridcell_odd fixedcell_select" : "fixed_gridcell_even fixedcell_select";
          else this.oldCell.className = isOdd ? "gridcell_odd cell_select" : "gridcell_even cell_select";
        } else {
          if (curHeader != null && curHeader.isFixedHeader) this.oldCell.className = isOdd ? "fixed_gridcell_odd" : "fixed_gridcell_even";
          else this.oldCell.className = isOdd ? "gridcell_odd" : "gridcell_even";
        }
      } else {
        if (curHeader != null && curHeader.isFixedHeader) this.oldCell.className = isOdd ? "fixed_gridcell_odd" : "fixed_gridcell_even";
        else this.oldCell.className = isOdd ? "gridcell_odd" : "gridcell_even";
      }
      this.oldCell = cell;
      this.oldClassName = cellClassName;
    }
  }
  this.selectedCell = cell;
  this.letCellVisible(cell);
  if (this.editable == true && this.basicHeaders[cell.colIndex].columEditable == true) {
    if (IS_IE9) {
      setTimeout(function() {
        oThis.setCellActive(cell)
      }, 100);
    } else {
      this.setCellActive(cell);
    }
  } else cell.focus();
  if (this.model && this.model.owner && this.model.owner.selectedCell && this.model.owner.selectedCell != null) {
    var currColIndex = this.model.owner.selectedCell.colIndex;
    if (this.model.rows && this.model.rows[0] != null) {
      var filedName = this.model.rows[0].getFiledNameByColIndex(currColIndex);
      this.notifyChange("currentColID", filedName);
    }
  }
};
GridComp.prototype.setCellActive = function(cell, ctrl) {
  if (this.editable == false) return;
  if (ctrl) return;
  this.selectedCell = cell;
  var rowIndex = this.getCellRowIndex(cell);
  var colIndex = cell.colIndex;
  var extendComp = null;
  if (this.extendCellEditor !== null) {
    var row = this.model.rows[rowIndex];
    extendComp = this.extendCellEditor.call(this, document.body, row, colIndex);
  }
  if (extendComp) {
    this.compsMap.put("extend$" + colIndex, extendComp);
    GridComp.addCompListener(this, extendComp, colIndex);
    extendComp.setBounds(compOffsetLeft(cell, document.body) + GridComp.CELL_LEFT_PADDING, compOffsetTop(cell, document.body) - compScrollTop(cell, document.body), cell.offsetWidth - GridComp.CELL_RIGHT_PADDING - 1, GridComp.ROW_HEIGHT);
    extendComp.setValue(this.model.getCellValueByIndex(rowIndex, colIndex));
    extendComp.showV();
    extendComp.setFocus();
    this.currActivedCell = cell;
    this.showComp = extendComp;
    this.showComp.extend = true;
    this.showComp.Div_gen.style.zIndex = getZIndex();
  } else {
    if (cell.editorType == null || cell.editorType == "") {
      var comp = this.compsMap.get(EditorType.STRINGTEXT);
      comp.setBounds(compOffsetLeft(cell, document.body) + GridComp.CELL_LEFT_PADDING, compOffsetTop(cell, document.body) - compScrollTop(cell, document.body) + getInteger((cell.offsetHeight - 22) / 2, 0), cell.offsetWidth - GridComp.CELL_RIGHT_PADDING - 1, cell.offsetHeight);
      comp.setValue(this.model.getCellValueByIndex(rowIndex, colIndex));
      comp.showV();
      comp.setFocus();
      this.currActivedCell = cell;
      this.showComp = comp;
    } else if (cell.editorType != EditorType.CHECKBOX && cell.editorType != EditorType.COMBOBOX && cell.editorType != EditorType.REFERENCE && cell.editorType != EditorType.TEXTAREA && cell.editorType != EditorType.MONEYTEXT && cell.editorType != EditorType.LANGUAGECOMBOBOX && cell.editorType != EditorType.RADIOGROUP) {
      var comp = this.compsMap.get(cell.editorType);
      var header = cell.parentNode.header;
      if (cell.editorType == EditorType.STRINGTEXT) comp.setMaxSize(header.maxLength);
      if (cell.editorType == EditorType.DECIMALTEXT) {
        comp.setValue(this.model.getCellValueByIndex(rowIndex, colIndex));
        comp.setPrecision(header.precision);
        if (header.floatMinValue != null) comp.setMinValue(header.floatMinValue);
        else comp.setMinValue(null);
        if (header.floatMaxValue != null) comp.setMaxValue(header.floatMaxValue);
        else comp.setMaxValue(null);
      }
      if (cell.editorType == EditorType.INTEGERTEXT) {
        comp.setIntegerMinValue(header.integerMinValue);
        comp.setIntegerMaxValue(header.integerMaxValue);
      }
      if (cell.editorType == EditorType.DATETEXT || cell.editorType == EditorType.DATETIMETEXT) {
        comp.id = header.keyName;
      }
      comp.setBounds(compOffsetLeft(cell, document.body) + GridComp.CELL_LEFT_PADDING, compOffsetTop(cell, document.body) - compScrollTop(cell, document.body) + getInteger((cell.offsetHeight - 22) / 2, 0), cell.offsetWidth - GridComp.CELL_RIGHT_PADDING - 1, cell.offsetHeight);
      comp.setValue(this.model.getCellValueByIndex(rowIndex, colIndex));
      comp.showV();
      comp.setFocus();
      this.currActivedCell = cell;
      this.showComp = comp;
    } else if (cell.editorType == EditorType.MONEYTEXT) {
      var comp = this.compsMap.get(cell.editorType + colIndex);
      var header = cell.parentNode.header;
      comp.setBounds(compOffsetLeft(cell, document.body) + GridComp.CELL_LEFT_PADDING, compOffsetTop(cell, document.body) - compScrollTop(cell, document.body) + getInteger((cell.offsetHeight - 22) / 2, 0), cell.offsetWidth - GridComp.CELL_RIGHT_PADDING - 1, cell.offsetHeight);
      comp.setValue(this.model.getCellValueByIndex(rowIndex, colIndex));
      comp.setPrecision(header.precision);
      comp.showV();
      comp.setFocus();
      this.currActivedCell = cell;
      this.showComp = comp;
    } else if (cell.editorType == EditorType.COMBOBOX) {
      var comp = this.compsMap.get(cell.editorType + colIndex);
      var header = this.basicHeaders[colIndex];
      comp.setBounds(compOffsetLeft(cell, document.body) + GridComp.CELL_LEFT_PADDING, compOffsetTop(cell, document.body) - compScrollTop(cell, document.body) + getInteger((cell.offsetHeight - 22) / 2, 0), cell.offsetWidth - GridComp.CELL_RIGHT_PADDING - 1, cell.offsetHeight);
      if (comp.oldValue) comp.oldValue = null;
      comp.showV();
      comp.setFocus();
      comp.nowCell = cell;
      var selInd = -1;
      if (header.comboData != null) {
        var keyValues = header.comboData.getValueArray();
        selInd = keyValues.indexOf(this.model.getCellValueByIndex(rowIndex, colIndex));
      }
      comp.setSelectedItem(selInd);
      comp.setMessage(this.model.getCellValueByIndex(rowIndex, colIndex));
      this.currActivedCell = cell;
      this.showComp = comp;
    } else if (cell.editorType == EditorType.LANGUAGECOMBOBOX) {
      var comp = this.compsMap.get(cell.editorType + colIndex);
      var header = this.basicHeaders[colIndex];
      comp.setBounds(compOffsetLeft(cell, document.body) + GridComp.CELL_LEFT_PADDING, compOffsetTop(cell, document.body) - compScrollTop(cell, document.body) + getInteger((cell.offsetHeight - 22) / 2, 0), cell.offsetWidth - GridComp.CELL_RIGHT_PADDING - 1, cell.offsetHeight);
      if (comp.oldValue) comp.oldValue = null;
      var gridDs = this.model.dataset;
      var currentRow = gridDs.getFocusRow();
      comp.setComboDatas4Grid(gridDs, currentRow);
      comp.showV();
      comp.setFocus();
      comp.nowCell = cell;
      this.showComp = comp;
    } else if (cell.editorType == EditorType.REFERENCE) {
      var comp = this.compsMap.get(cell.editorType + cell.colIndex);
      comp.setBounds(compOffsetLeft(cell, document.body) + GridComp.CELL_LEFT_PADDING, compOffsetTop(cell, document.body) - compScrollTop(cell, document.body) + getInteger((cell.offsetHeight - 22) / 2, 0), cell.offsetWidth - GridComp.CELL_RIGHT_PADDING - 1, cell.offsetHeight);
      comp.setValue(this.model.getCellValueByIndex(rowIndex, colIndex));
      comp.setMessage(this.model.getCellValueByIndex(rowIndex, colIndex));
      comp.showV();
      comp.setFocus();
      this.currActivedCell = cell;
      this.showComp = comp;
    } else if (cell.editorType == EditorType.TEXTAREA) {
      var comp = this.compsMap.get(cell.editorType);
      var bodyWidth = document.body.offsetWidth;
      var bodyHeight = document.body.offsetHeight;
      if (bodyWidth < 100 || bodyHeight < 200) comp.setBounds(compOffsetLeft(cell, document.body) + GridComp.CELL_LEFT_PADDING, compOffsetTop(cell, document.body) - compScrollTop(cell, document.body) - 1, cell.offsetWidth - GridComp.CELL_RIGHT_PADDING - 1, cell.offsetHeight);
      else {
        var compLeft = compOffsetLeft(cell, document.body) + GridComp.CELL_LEFT_PADDING;
        var compTop = compOffsetTop(cell, document.body) - compScrollTop(cell, document.body) - 1;
        if (parseInt(compLeft) + 200 > bodyWidth) compLeft = bodyWidth - 200;
        if (parseInt(compTop) + 100 > bodyHeight) compTop = bodyHeight - 100;
        comp.setBounds(compLeft, compTop, "200", "100");
      }
      var header = this.basicHeaders[colIndex];
      if (header.maxLength) comp.setMaxSize(header.maxLength);
      comp.setValue(this.model.getCellValueByIndex(rowIndex, colIndex));
      comp.showV();
      comp.setFocus();
      this.currActivedCell = cell;
      this.showComp = comp;
    } else if (cell.editorType == EditorType.CHECKBOX) {}
    if (this.showComp) {
      this.showComp.currColIndex = colIndex;
      this.showComp.Div_gen.style.zIndex = getZIndex();
    }
  }
};
GridComp.prototype.letCellVisible = function(cell) {
  if (cell == null) return;
  var preHeadersWidth = this.getPreHeadersWidth(cell);
  var columDiv = cell.parentNode;
  var rowIndex = this.getCellRowIndex(cell);
  if (this.dataOuterDiv) var iScrollLeft = this.dataOuterDiv.scrollLeft;
  var flag = true;
  if (preHeadersWidth == 0) {
    this.setScrollLeft(0);
    flag = false;
  } else if (iScrollLeft > preHeadersWidth) {
    var deltX = iScrollLeft - preHeadersWidth;
    this.setScrollLeft(iScrollLeft - deltX - 1);
    flag = false;
  }
  var gridWidth = this.constant.outerDivWidth;
  var gridHeight = this.constant.outerDivHeight;
  if (this.pageSize > 0) gridHeight -= GridComp.PAGEBAR_HEIGHT;
  if (flag) {
    var realWidth = columDiv.offsetLeft + cell.offsetWidth;
    var currWidth = gridWidth - this.constant.fixedColumDivWidth + iScrollLeft;
    if (realWidth > currWidth) {
      var deltX = realWidth - currWidth;
      if (this.isVScroll()) {
        this.setScrollLeft(iScrollLeft + deltX + 1 + GridComp.SCROLLBAE_HEIGHT);
      } else {
        this.setScrollLeft(iScrollLeft + deltX + 1);
      }
    }
  }
  var preRowsHeight = rowIndex * this.rowHeight;
  var iScrollTop = this.dataOuterDiv.scrollTop;
  if (iScrollTop > preRowsHeight) {
    var deltY = iScrollTop - preRowsHeight;
    this.setScrollTop(iScrollTop - deltY);
  }
  var realHeight = (rowIndex + 1) * this.rowHeight;
  if (this.isScroll()) currHeight = gridHeight - this.constant.headerHeight + iScrollTop - GridComp.SCROLLBAE_HEIGHT;
  else currHeight = gridHeight - this.constant.headerHeight + iScrollTop;
  if (realHeight > currHeight) {
    var deltY = realHeight - currHeight;
    this.setScrollTop(iScrollTop + deltY);
  }
};
GridComp.prototype.processCtrlSel = function(ctrl, rowIndex) {
  if (this.selectedRowIndice != null && this.selectedRowIndice.length > 1) {
    this.model.setRowSelected(rowIndex);
  } else {
    if (this.selectedRowIndice == null || (this.selectedRowIndice.length > 0 && this.selectedRowIndice[0] != rowIndex)) this.model.setRowSelected(rowIndex);
    else this.rowSelected(rowIndex);
  }
};
GridComp.prototype.loseFocusIndex = function() {
  var focusIndex = this.getFocusIndex();
  if (typeof(focusIndex) == 'number' && focusIndex >= 0) {
    var headers = this.basicHeaders;
    for (var i = 0; i < headers.length; i++) {
      if (headers[i].dataDiv) {
        var focusCell = headers[i].dataDiv.cells[focusIndex];
        if (typeof(focusCell) == 'object') {
          if (typeof(focusCell.className) == 'string' && focusCell.className.indexOf("cell_focus") != -1) {
            focusCell.className = focusCell.className.replace(" cell_focus", "");
          }
          focusCell.isFocusRow = false;
        }
      }
    }
    this.focusIndex = -1;
    this.model.setFocusIndex(-1);
  }
};
GridComp.prototype.setFocusIndex = function(rowIndex) {
  if (typeof(rowIndex) == 'number' && rowIndex >= 0) {
    var oldFocusRowIndex = this.getFocusIndex();
    this.model.setFocusIndex(rowIndex);
    var headers = this.basicHeaders;
    for (var i = 0; i < headers.length; i++) {
      if (headers[i].dataDiv) {
        var focusCel = null;
        if (typeof(oldFocusRowIndex) == 'number' && oldFocusRowIndex >= 0 && rowIndex != oldFocusRowIndex) {
          var focusCell = headers[i].dataDiv.cells[oldFocusRowIndex];
          if (typeof(focusCell) == 'object') {
            if (typeof(focusCell.className) == 'string' && focusCell.className.indexOf("cell_focus") != -1) {
              focusCell.className = focusCell.className.replace(" cell_focus", "");
            }
            focusCell.isFocusRow = false;
          }
        }
        focusCell = headers[i].dataDiv.cells[rowIndex];
        if (typeof(focusCell) == 'object') {
          if (typeof(focusCell.className) == 'string') {
            if (focusCell.className.indexOf("cell_focus") == -1) {
              focusCell.className += " cell_focus";
            }
          } else {
            focusCell.className = " cell_focus";
          }
          focusCell.isFocusRow = true;
        }
      }
    }
    this.focusIndex = rowIndex;
  }
};
GridComp.prototype.getFocusIndex = function() {
  return this.focusIndex;
};
GridComp.prototype.clearAllUISelRows = function() {
  var selRowsIndice = this.selectedRowIndice;
  if (selRowsIndice != null && selRowsIndice.length > 0) {
    var selIndice = [];
    for (var i = 0, count = selRowsIndice.length; i < count; i++) selIndice.push(this.selectedRowIndice[i]);
    for (var i = selIndice.length - 1; i >= 0; i--) {
      var index = selIndice[i];
      for (var j = 0, headerLength = this.basicHeaders.length; j < headerLength; j++) {
        var header = this.basicHeaders[j];
        if (header.isHidden == false) {
          if (header.dataDiv && header.dataDiv.cells) var cell = header.dataDiv.cells[index];
          if (cell != null) {
            var isOdd = this.isOdd(index);
            if (cell.isErrorCell) {
              if (header.isFixedHeader) cell.className = isOdd ? "fixed_gridcell_odd cell_error" : "fixed_gridcell_even cell_error";
              else cell.className = isOdd ? "gridcell_odd cell_error" : "gridcell_even cell_error";
            } else {
              if (header.isFixedHeader) cell.className = isOdd ? "fixed_gridcell_odd" : "fixed_gridcell_even";
              else cell.className = isOdd ? "gridcell_odd" : "gridcell_even";
            }
          }
        }
      }
      var node = this.lineStateColumDiv.cells[index];
      if (node != null && node.className != "row_state_div row_update_state" && node.className != "row_state_div row_add_state") node.className = "row_state_div";
      this.selectedRowIndice.splice(i, 1);
      if (this.selectedRowIndice.length == 0) this.selectedRowIndice = null;
    }
  }
};
GridComp.processAutoExpandHeadersWidth = function(gridId, outDivId) {
  var grid = window.objects[gridId];
  var autoHeaders = grid.getAutoExpandHeaders();
  if (autoHeaders != null && autoHeaders.length > 0) {
    var expandTotalWidth = 0;
    if (grid.isVScroll()) expandTotalWidth = grid.outerDiv.offsetWidth - grid.getNoAutoExpandHeadersWidth() - GridComp.COLUMN_LEFT_BORDER_WIDTH - 17 - 2;
    else expandTotalWidth = grid.outerDiv.offsetWidth - grid.getNoAutoExpandHeadersWidth() - GridComp.COLUMN_LEFT_BORDER_WIDTH - 2;
    if (grid.isMultiSelWithBox) expandTotalWidth = expandTotalWidth - GridComp.MULTISEL_COLUMN_WIDTH - GridComp.COLUMN_LEFT_BORDER_WIDTH;
    if (grid.isShowNumCol) expandTotalWidth = expandTotalWidth - grid.constant.rowNumHeaderDivWidth;
    var oneWidth = 0;
    if (expandTotalWidth < 0) {
      oneWidth = 101;
    } else {
      oneWidth = Math.floor(expandTotalWidth / autoHeaders.length) - GridComp.COLUMN_LEFT_BORDER_WIDTH;
    }
    if (oneWidth > GridComp.EXPANDHEADER_MINWIDTH) {
      for (var i = 0, count = autoHeaders.length; i < count; i++) {
        if (i == count - 1) {
          if (expandTotalWidth < 0) autoHeaders[i].width = oneWidth;
          else autoHeaders[i].width = expandTotalWidth - i * (oneWidth + GridComp.COLUMN_LEFT_BORDER_WIDTH) - GridComp.COLUMN_LEFT_BORDER_WIDTH;
          var dynTableDivRealWidth = grid.getDynamicTableDivRealWidth(true);
          if (IS_IE) dynTableDivRealWidth = dynTableDivRealWidth + 1;
          grid.dynamicHeaderTableDiv.style.width = dynTableDivRealWidth + "px";
          autoHeaders[i].dataTable.style.width = autoHeaders[i].width + "px";
          autoHeaders[i].cell.width = autoHeaders[i].width;
          autoHeaders[i].contentDiv.style.width = (autoHeaders[i].width - 1) + "px";
          autoHeaders[i].dataDiv.style.width = autoHeaders[i].width + "px";
          grid.dynamicColumDataDiv.style.width = dynTableDivRealWidth + "px";
          if (grid.dynSumRowContentDiv) {
            grid.dynSumRowContentDiv.style.width = dynTableDivRealWidth + "px";
          }
          if (IS_IE7) {
            if (grid.dynamicColumDataDiv.offsetWidth > grid.dataOuterDiv.offsetWidth) {
              grid.dynamicColumDataDiv.style.marginBottom = "17px";
            } else {
              grid.dynamicColumDataDiv.style.marginBottom = "0px";
            }
          }
          if (autoHeaders[i].sumCell) {
            if (autoHeaders[i].keyName == grid.basicHeaders[0].keyName) autoHeaders[i].sumCell.style.width = autoHeaders[i].width + GridComp.ROWSTATE_COLUMN_WIDTH - GridComp.SUMROW_DIV_WIDTH - (GridComp.SUMCELL_PADDING * 2) - 1 + "px";
            else autoHeaders[i].sumCell.style.width = autoHeaders[i].width - (GridComp.SUMCELL_PADDING * 2) - 1 + "px";
          }
          if (grid.dynSumRowDataDiv) grid.dynSumRowDataDiv.style.width = dynTableDivRealWidth + "px";
        } else {
          autoHeaders[i].width = oneWidth;
          autoHeaders[i].cell.width = oneWidth;
          autoHeaders[i].contentDiv.style.width = (oneWidth - 1) + "px";
          autoHeaders[i].dataTable.style.width = oneWidth + "px";
          autoHeaders[i].dataDiv.style.width = oneWidth + "px";
          if (autoHeaders[i].sumCell) {
            if (autoHeaders[i].keyName == grid.basicHeaders[0].keyName) autoHeaders[i].sumCell.style.width = autoHeaders[i].width + GridComp.ROWSTATE_COLUMN_WIDTH - GridComp.SUMROW_DIV_WIDTH - (GridComp.SUMCELL_PADDING * 2) + "px";
            else autoHeaders[i].sumCell.style.width = autoHeaders[i].width - (GridComp.SUMCELL_PADDING * 2) + "px";
          }
        }
        if (autoHeaders[i].isHidden == false) {
          for (var j = 0, rowLength = autoHeaders[i].dataDiv.cells.length; j < rowLength; j++) {
            var tempCell = autoHeaders[i].dataDiv.cells[j];
            if (tempCell) {
              tempCell.style.width = autoHeaders[i].width - GridComp.CELL_LEFT_PADDING - GridComp.CELL_RIGHT_PADDING + "px";
            }
          }
        }
        if (grid.autoRowHeight == true) {
          for (var j = 0; j < grid.model.rows.length; j++) {
            grid.adjustRowHeight(j, autoHeaders[i].dataDiv.cells[j]);
          }
        }
      }
    }
    $("#" + outDivId).perfectScrollbar('updateKeepLeft', outDivId);
  }
};
GridComp.prototype.getNoAutoExpandHeadersWidth = function() {
  if (this.basicHeaders == null) return -1;
  var width = 0;
  for (var i = 0, count = this.basicHeaders.length; i < count; i++) {
    if (this.basicHeaders[i].isHidden == false && this.basicHeaders[i].isAutoExpand == false) width += this.basicHeaders[i].width + GridComp.COLUMN_LEFT_BORDER_WIDTH;
  }
  return width;
};
GridComp.prototype.getAutoExpandHeaders = function() {
  if (this.basicHeaders == null) return null;
  var autoHeaders = [];
  for (var i = 0, count = this.basicHeaders.length; i < count; i++) {
    if (this.basicHeaders[i].isHidden == false && this.basicHeaders[i].isAutoExpand == true && this.basicHeaders[i].isGroupHeader == false) autoHeaders.push(this.basicHeaders[i]);
  }
  return autoHeaders;
};
GridComp.prototype.initConstant = function() {
  if (this.constant == null) this.constant = new Object();
  if (this.wholeDiv.offsetWidth != 0) {
    this.constant.outerDivHeight = this.wholeDiv.offsetHeight;
    this.constant.outerDivWidth = this.wholeDiv.offsetWidth;
    return true;
  } else return false;
};
GridComp.prototype.initBasicHeaders = function() {
  var basicHeaders = this.model.getBasicHeaders();
  if (this.groupHeaderIds != "") {
    this.groupHeaderColIndice = [];
    var j = 0;
    for (var i = 0, count = basicHeaders.length; i < count; i++) {
      if (j == this.groupHeaderIds.length) break;
      if (basicHeaders[i].keyName == this.groupHeaderIds[j]) {
        basicHeaders[i].isGroupBy = true;
        this.groupHeaderColIndice.push(i);
        j++;
      }
    }
  }
  if (basicHeaders != null && basicHeaders.length > 0) {
    if (this.isShowHeader) this.constant.headerHeight = this.getHeaderDepth() * (this.headerRowHeight);
    else this.constant.headerHeight = 0;
  } else {
    if (this.model.getHeaders() == null) throw new Error("grid must be initialized with headers!");
  }
};
GridComp.prototype.getHeader = function(keyName) {
  var basicHeaders = this.model.getBasicHeaders();
  if (basicHeaders == null) return null;
  else {
    for (var i = basicHeaders.length - 1; i >= 0; i--) {
      if (basicHeaders[i].keyName == keyName) return basicHeaders[i];
    }
  }
};
GridComp.prototype.removeHeader = function(keyName) {
  var header = this.model.removeHeader(keyName);
  return header;
};
GridComp.prototype.adjustScroll = function() {
  var gridWidth = this.constant.outerDivWidth;
  var gridHeight = this.constant.outerDivHeight;
  this.scroll = false;
  var dataRealWidth = this.getDynamicTableDivRealWidth(true) + this.getDynamicTableDivRealWidth(false);
  if (dataRealWidth > gridWidth) this.scroll = true;
  this.vScroll = false;
  var dataRealHeight = gridHeight - this.getRowsNum() * this.rowHeight - this.constant.headerHeight;
  if (this.pageSize > 0) dataRealHeight -= GridComp.PAGEBAR_HEIGHT;
  if (dataRealHeight < 0) this.vScroll = true;
};
GridComp.prototype.initPaginationBar = function() {
  var oThis = this;
  this.paginationBar = $ce("div");
  this.paginationBar.className = "grid_paginationbar";
  this.paginationBar.style.width = "100%";
  this.outerDiv.appendChild(this.paginationBar);
  this.paginationPanel = $ce("DIV");
  this.paginationPanel.className = "paginationPanel";
  this.paginationBar.appendChild(this.paginationPanel);
  this.paginationContent = $ce("div");
  this.paginationContent.id = "grid_paginationcontent";
  this.paginationContent.className = "pageinationbgcenter";
  this.paginationPanel.appendChild(this.paginationContent);
  if (this.constant.outerDivWidth > document.body.screenWidth) {
    this.constant.outerDivWidth = document.body.screenWidth;
  }
  this.paginationBar.style.width = this.constant.outerDivWidth + "px";
  this.paginationMessage = $ce("DIV");
  this.paginationMessage.className = "paginationMessage";
  this.paginationText1 = $ce("DIV");
  this.paginationText1.innerHTML = trans("ml_goto");
  this.paginationText1.className = "paginationText";
  this.paginationText1.style.marginRight = "5px";
  this.paginationText2 = $ce("DIV");
  this.paginationText2.className = "paginationText";
  this.paginationText2.style.marginLeft = "5px";
  this.paginationText2.style.marginRight = "10px";
  this.sumRowCountSpan = $ce("SPAN");
  this.sumRowCountSpan.innerHTML = this.model.dataset.getAllRowCount();
  this.paginationText3 = $ce("DIV");
  this.paginationText3.innerHTML = trans("ml_allLine", ["<span>" + this.model.dataset.getAllRowCount() + "</span>"]);
  this.paginationText3.className = "paginationText";
  this.paginationText3.style.marginRight = "20px";
  this.paginationText4 = $ce("DIV");
  this.paginationText4.innerHTML = trans("ml_pageRowCount", ["<span class='perPageRowCount' >" + this.pageSize + "</span>"]);
  this.paginationText4.className = "paginationText";
  this.paginationMessage.appendChild(this.paginationText1);
  if (IS_IPAD) {
    this.paginationInput = new IntegerTextComp(this.paginationMessage, 'paginationInput', 0, 4, 53, "relative");
  } else {
    this.paginationInput = new IntegerTextComp(this.paginationMessage, 'paginationInput', 0, 4, 35, "relative");
  }
  this.paginationInput.Div_gen.className = "paginationText";
  this.paginationMessage.appendChild(this.paginationText2);
  this.paginationInput.onenter = function(e) {
    var pageIndex = parseInt(this.newValue, 10) - 1;
    GridComp.pageNavgate(e, pageIndex, oThis.id);
  };
  this.paginationMessage.appendChild(this.paginationText3);
  this.paginationMessage.appendChild(this.paginationText4);
  this.paginationPanel.appendChild(this.paginationMessage);
};
GridComp.prototype.initSimplePaginationBar = function() {
  var oThis = this;
  this.paginationBar = $ce("div");
  this.paginationBar.className = "grid_paginationbar";
  this.paginationBar.style.width = "100%";
  this.outerDiv.appendChild(this.paginationBar);
  this.paginationPanel = $ce("DIV");
  this.paginationPanel.className = "paginationPanel";
  this.paginationBar.appendChild(this.paginationPanel);
  this.paginationContent = $ce("div");
  this.paginationContent.id = "grid_paginationcontent";
  this.paginationContent.className = "pageinationbgcenter";
  if (this.constant.outerDivWidth > document.body.screenWidth) {
    this.constant.outerDivWidth = document.body.screenWidth;
  }
  this.paginationBar.style.width = this.constant.outerDivWidth + "px";
  this.paginationMessage = $ce("DIV");
  this.paginationMessage.className = "simple_paginationMessage";
  this.paginationText1 = $ce("DIV");
  this.paginationText1.innerHTML = trans("ml_pagepre");
  this.paginationText1.className = "paginationText";
  this.paginationText1.style.marginRight = "12px";
  this.paginationText1.style.cursor = "pointer";
  this.paginationText1.onclick = GridComp.pagePre;
  this.paginationText1.gridId = this.id;
  this.sumPageCountSpan = $ce("SPAN");
  this.paginationText2 = $ce("DIV");
  this.paginationText2.appendChild(document.createTextNode("/"));
  this.paginationText2.appendChild(this.sumPageCountSpan);
  this.paginationText2.className = "paginationText";
  this.paginationText2.style.marginLeft = "0px";
  this.paginationText2.style.marginRight = "12px";
  this.paginationText4 = $ce("DIV");
  this.paginationText4.innerHTML = trans("ml_pagenext");
  this.paginationText4.className = "paginationText";
  this.paginationText4.style.cursor = "pointer";
  this.paginationText4.onclick = GridComp.pageNext;
  this.paginationText4.gridId = this.id;
  this.paginationMessage.appendChild(this.paginationText1);
  if (IS_IPAD) {
    this.paginationInput = new IntegerTextComp(this.paginationMessage, 'paginationInput', 0, 4, 53, "relative");
  } else {
    this.paginationInput = new IntegerTextComp(this.paginationMessage, 'paginationInput', 0, 4, 35, "relative");
  }
  this.paginationInput.Div_gen.className = "paginationText";
  this.paginationMessage.appendChild(this.paginationText2);
  this.paginationMessage.appendChild(this.paginationText4);
  this.paginationPanel.appendChild(this.paginationMessage);
  this.paginationInput.onenter = function(e) {
    var pageIndex = parseInt(this.newValue, 10) - 1;
    GridComp.pageNavgate(e, pageIndex, oThis.id);
  };
};
GridComp.prototype.processServerPagination = function(pageIndex) {
  var pageCount = this.model.getPageCount();
  if (pageIndex < 0 || pageIndex > pageCount - 1) return;
  this.processPaginationInfo(pageIndex, this.model.dataset.getAllRowCount(), pageCount, this.pageSize);
  this.model.dataset.setCurrentPage(null, pageIndex);
  adjustContainerFramesHeight();
};
GridComp.prototype.setPaginationInfo = function() {
  if (this.pageSize > 0) {
    var pageIndex = this.model.dataset.getPageIndex(null);
    this.processPaginationInfo(pageIndex, this.model.dataset.getAllRowCount(), this.model.getPageCount(), this.pageSize);
  }
};
GridComp.prototype.processPaginationInfo = function(pageIndex, rowCount, pageCount, pageRowCount) {
  if (this.sumRowCountSpan) {
    this.sumRowCountSpan.innerHTML = rowCount;
    if (this.paginationText3) this.paginationText3.innerHTML = trans("ml_allLine", ["<span>" + rowCount + "</span>"]);
  }
  if (this.sumPageCountSpan) {
    this.sumPageCountSpan.innerHTML = pageCount;
  }
  this.pageIndex = pageIndex;
  if (this.paginationBar) {
    if (pageCount <= 1) {
      this.paginationBar.style.display = "none";
      return;
    }
  } else {
    return;
  }
  this.paginationBar.style.display = "block";
  if (this.isSimplePagination) {
    this.paginationPanel.style.width = this.paginationText1.offsetWidth + 12 + this.paginationText2.offsetWidth + 12 + this.paginationText4.offsetWidth + this.paginationInput.Div_gen.offsetWidth + "px";
    this.paginationInput.input.value = pageIndex + 1;
  } else {
    this.paginationContent.innerHTML = "";
    var preDiv = $ce("div");
    preDiv.className = "pre";
    preDiv.onmouseover = GridComp.preMouseOver;
    preDiv.onmouseout = GridComp.preMouseOut;
    var preA = $ce("A");
    preA.onclick = GridComp.pagePre;
    preA.href = "#";
    preA.gridId = this.id;
    preA.pageIndex = pageIndex;
    preA.appendChild(preDiv);
    this.paginationContent.appendChild(preA);
    var pageFirst = $ce("A");
    pageFirst.onclick = GridComp.pageFirst;
    pageFirst.href = "#";
    pageFirst.gridId = this.id;
    pageFirst.pageIndex = pageIndex;
    var selectedCenterDiv = $ce("div");
    selectedCenterDiv.className = "pagefirst";
    selectedCenterDiv.innerHTML = trans("ml_pagefirst");
    pageFirst.appendChild(selectedCenterDiv);
    this.paginationContent.appendChild(pageFirst);
    var smartCutDivFirst = $ce("div");
    smartCutDivFirst.className = "smartcut";
    this.paginationContent.appendChild(smartCutDivFirst);
    var classNamePre = "un";
    if (pageCount <= 8) {
      for (var i = 0; i < pageCount; i++) {
        var a = $ce("A");
        a.onclick = GridComp.pageNavgate;
        a.href = "#";
        a.pageIndex = i;
        a.gridId = this.id;
        if (i == pageIndex) {
          classNamePre = "";
        } else {
          classNamePre = "un";
        }
        if (i + 1 <= 99) {
          var selectedDiv = $ce("div");
          selectedDiv.className = classNamePre + "selected";
          selectedDiv.innerHTML = (i + 1);
          a.appendChild(selectedDiv);
        } else {
          var selectedLeftDiv = $ce("div");
          var selectedCenterDiv = $ce("div");
          var selectedRightDiv = $ce("div");
          selectedLeftDiv.className = classNamePre + "selectedleft";
          selectedCenterDiv.className = classNamePre + "selectedcenter";
          selectedRightDiv.className = classNamePre + "selectedright";
          selectedCenterDiv.innerHTML = (i + 1);
          a.appendChild(selectedLeftDiv);
          a.appendChild(selectedCenterDiv);
          a.appendChild(selectedRightDiv);
        }
        this.paginationContent.appendChild(a);
      }
    } else {
      var beginIndex = 0;
      var endIndex = 0;
      if (pageIndex <= 1) {
        beginIndex = 0;
      } else {
        beginIndex = pageIndex - 2;
      }
      endIndex = beginIndex + 4;
      if (pageIndex >= pageCount - 6) {
        beginIndex = pageCount - 8;
        endIndex = beginIndex + 7;
      }
      if (pageIndex >= pageCount - 2) {
        beginIndex = 0;
        endIndex = beginIndex + 4;
      }
      for (var i = 0; i < pageCount; i++) {
        if ((i >= beginIndex && i <= endIndex) || (i >= pageCount - 2)) {
          var a = $ce("A");
          a.onclick = GridComp.pageNavgate;
          a.href = "#";
          a.pageIndex = i;
          a.gridId = this.id;
          if (i == pageIndex) {
            classNamePre = "";
          } else {
            classNamePre = "un";
          }
          if (i + 1 <= 99) {
            var selectedDiv = $ce("div");
            selectedDiv.className = classNamePre + "selected";
            selectedDiv.innerHTML = (i + 1);
            a.appendChild(selectedDiv);
          } else {
            var selectedLeftDiv = $ce("div");
            var selectedCenterDiv = $ce("div");
            var selectedRightDiv = $ce("div");
            selectedLeftDiv.className = classNamePre + "selectedleft";
            selectedCenterDiv.className = classNamePre + "selectedcenter";
            selectedRightDiv.className = classNamePre + "selectedright";
            selectedCenterDiv.innerHTML = (i + 1);
            a.appendChild(selectedLeftDiv);
            a.appendChild(selectedCenterDiv);
            a.appendChild(selectedRightDiv);
          }
          this.paginationContent.appendChild(a);
        } else if (i == endIndex + 1) {
          var a = $ce("A");
          var selectedDiv = $ce("div");
          selectedDiv.className = "unselected";
          selectedDiv.innerHTML = "...";
          a.appendChild(selectedDiv);
          this.paginationContent.appendChild(a);
        }
      }
    }
    var smartCutDivLast = $ce("div");
    smartCutDivLast.className = "smartcut";
    this.paginationContent.appendChild(smartCutDivLast);
    var pageLast = $ce("A");
    pageLast.onclick = GridComp.pageLast;
    pageLast.href = "#";
    pageLast.gridId = this.id;
    pageLast.pageIndex = pageIndex;
    var selectedCenterDiv = $ce("div");
    selectedCenterDiv.className = "pagelast";
    selectedCenterDiv.innerHTML = trans("ml_pagelast");
    pageLast.appendChild(selectedCenterDiv);
    this.paginationContent.appendChild(pageLast);
    var nextDiv = $ce("div");
    nextDiv.className = "next";
    nextDiv.onmouseover = GridComp.nextMouseOver;
    nextDiv.onmouseout = GridComp.nextMouseOut;
    var nextA = $ce("A");
    nextA.onclick = GridComp.pageNext;
    nextA.href = "#";
    nextA.gridId = this.id;
    nextA.pageIndex = pageIndex;
    nextA.appendChild(nextDiv);
    this.paginationContent.appendChild(nextA);
    var wholeWidth = this.paginationContent.offsetWidth + 25 + 20 + this.paginationMessage.offsetWidth;
    this.paginationPanel.style.width = wholeWidth + "px";
    if (this.outerDiv.offsetWidth < wholeWidth) {
      this.outerDiv.removeChild(this.paginationBar);
      this.isSimplePagination = true;
      this.initSimplePaginationBar();
      this.processPaginationInfo(pageIndex, rowCount, pageCount, pageRowCount);
    }
  }
  return;
};
GridComp.prototype.initHeaderDiv = function() {
  var gridWidth = this.constant.outerDivWidth;
  var gridHeight = this.constant.outerDivHeight;
  this.headerDiv = $ce("div");
  this.headerDiv.className = "headerbar_div";
  if (this.pageSize > 0 && this.isPagenationTop == true) this.headerDiv.style.top = GridComp.PAGEBAR_HEIGHT + "px";
  else this.headerDiv.style.top = "0px";
  this.outerDiv.appendChild(this.headerDiv);
  this.headerDiv.oncontextmenu = function(e) {
    e = EventUtil.getEvent();
    stopAll(e);
    clearEventSimply(e);
  };
  if (this.vScroll) {
    this.headerDiv.style.width = (gridWidth - GridComp.SCROLLBAE_HEIGHT) + "px";
    this.headerDiv.defaultWidth = gridWidth - GridComp.SCROLLBAE_HEIGHT;
  } else {
    this.headerDiv.style.width = gridWidth + "px";
    this.headerDiv.defaultWidth = gridWidth;
  }
  this.constant.headerDivWidth = this.headerDiv.defaultWidth;
  this.headerDiv.style.height = this.constant.headerHeight + "px";
  if (!this.isShowHeader) this.headerDiv.style.visibility = "hidden";
};
GridComp.prototype.initFixedHeaderDiv = function() {
  this.fixedHeaderDivWidth = 0;
  var headers = this.model.getHeaders();
  for (var i = headers.length - 1; i >= 0; i--) {
    if (headers[i].isFixedHeader) this.fixedHeaderDivWidth += this.getHeaderDefaultWidth(headers[i]);
  }
  if (this.isMultiSelWithBox) this.fixedHeaderDivWidth += (GridComp.SELECTCOLUM_WIDTH);
  this.fixedHeaderDiv = $ce("div");
  this.headerDiv.appendChild(this.fixedHeaderDiv);
  this.fixedHeaderDiv.style.height = this.constant.headerHeight + "px";
  this.fixedHeaderDiv.style.width = this.fixedHeaderDivWidth + "px";
  this.fixedHeaderDiv.style.left = "0px";
  this.fixedHeaderDiv.style.top = "0px";
  this.fixedHeaderDiv.style.position = "absolute";
  this.fixedHeaderDiv.style.zIndex = getZIndex();
  this.constant.fixedHeaderDivWidth = this.fixedHeaderDiv.offsetWidth;
};
GridComp.prototype.initRowNumHeaderDiv = function() {
  this.rowNumHeaderDiv = $ce("div");
  this.fixedHeaderDiv.appendChild(this.rowNumHeaderDiv);
  this.rowNumHeaderDiv.className = "row_num_header_div";
  this.rowNumHeaderDiv.style.height = this.constant.headerHeight + "px";
  var width = this.rowNumHeaderDiv.offsetWidth;
  this.constant.rowNumHeaderDivWidth = width;
  this.fixedHeaderDiv.style.width = (width + this.fixedHeaderDivWidth) + "px";
  this.constant.fixedHeaderDivWidth = width + this.fixedHeaderDivWidth;
};
GridComp.prototype.initLineStateHeaderDiv = function() {
  this.constant.lineStateHeaderDivWidth = 0;
  return;
};
GridComp.prototype.initSelectColumHeaderDiv = function() {
  var oThis = this;
  this.selectColumHeaderDiv = $ce("div");
  var div = this.selectColumHeaderDiv;
  this.fixedHeaderDiv.appendChild(div);
  div.id = "fixedSelectColumHeader";
  div.className = "select_headerdiv";
  div.style.left = (this.constant.rowNumHeaderDivWidth + this.constant.lineStateHeaderDivWidth) + "px";
  if (this.isShowHeader) div.style.height = (this.constant.headerHeight - 1) + "px";
  else div.style.height = "0px";
  if (this.isMultiSelectShow) {
    this.selectAllBox = $ce("INPUT");
    this.selectAllBox.type = "checkbox";
    div.appendChild(this.selectAllBox);
    this.selectAllBox.defaultChecked = false;
    this.selectAllBox.checked = false;
    this.selectAllBox.onclick = function(e) {
      e = EventUtil.getEvent();
      oThis.selectedCell = null;
      oThis.oldCell = null;
      oThis.hiddenComp();
      oThis.expandAllNodes();
      if (this.checked == false) {
        var indices = new Array;
        for (var i = 0, count = oThis.model.getRowsCount(); i < count; i++) {
          indices.push(i);
        }
        oThis.model.setRowUnSelected(indices);
      } else {
        var count = oThis.selectColumDiv.children.length;
        for (var i = count - 1; i >= 0; i--) {
          if (oThis.selectColumDiv.children[i] && oThis.selectColumDiv.children[i].children[0].checked == false) {
            oThis.selectColumDiv.children[i].children[0].onmousedown(e);
          }
        }
        this.checked = true;
      }
      oThis.loseFocusIndex();
      stopEvent(e);
      clearEventSimply(e);
    };
  }
};
GridComp.prototype.initFixedHeaderTableDiv = function() {
  var currLeft = this.constant.rowNumHeaderDivWidth + this.constant.lineStateHeaderDivWidth;
  if (this.isMultiSelWithBox) currLeft = currLeft + this.selectColumHeaderDiv.offsetWidth;
  this.fixedHeaderTableDiv = $ce("div");
  this.fixedHeaderDiv.appendChild(this.fixedHeaderTableDiv);
  this.fixedHeaderTableDiv.style.overflow = "hidden";
  this.fixedHeaderTableDiv.style.top = "0px";
  this.fixedHeaderTableDiv.style.left = currLeft + "px";
  this.fixedHeaderTableDiv.style.height = this.constant.headerHeight + "px";
  if (this.constant.fixedHeaderDivWidth - currLeft > 0) this.fixedHeaderTableDiv.style.width = (this.constant.fixedHeaderDivWidth - currLeft) + "px";
  this.constant.fixedHeaderTableDivWidth = this.constant.fixedHeaderDivWidth - currLeft;
};
GridComp.prototype.initDynamicHeaderDiv = function() {
  var gridWidth = this.constant.outerDivWidth;
  var gridHeight = this.constant.outerDivHeight;
  var fixedHeaderWidth = this.constant.fixedHeaderDivWidth;
  this.dynamicHeaderDiv = $ce("div");
  this.headerDiv.appendChild(this.dynamicHeaderDiv);
  this.dynamicHeaderDiv.style.position = "absolute";
  this.dynamicHeaderDiv.style.left = fixedHeaderWidth + "px";
  this.dynamicHeaderDiv.style.height = this.constant.headerHeight + "px";
  if (this.vScroll) {
    var dynHeaderWidth = gridWidth - fixedHeaderWidth - GridComp.SCROLLBAE_HEIGHT;
    if (dynHeaderWidth > 0) {
      this.dynamicHeaderDiv.style.width = dynHeaderWidth + "px";
      this.dynamicHeaderDiv.defaultWidth = dynHeaderWidth;
    } else {
      this.dynamicHeaderDiv.style.width = "0px";
      this.dynamicHeaderDiv.defaultWidth = dynHeaderWidth;
    }
  } else {
    var dynHeaderWidth = gridWidth - fixedHeaderWidth;
    if (dynHeaderWidth > 0) {
      this.dynamicHeaderDiv.style.width = (gridWidth - fixedHeaderWidth) + "px";
      this.dynamicHeaderDiv.defaultWidth = gridWidth - fixedHeaderWidth;
    } else {
      this.dynamicHeaderDiv.style.width = "0px";
      this.dynamicHeaderDiv.defaultWidth = dynHeaderWidth;
    }
  }
};
GridComp.prototype.initDynamicHeaderTableDiv = function() {
  this.dynamicHeaderTableDiv = $ce("div");
  this.dynamicHeaderDiv.appendChild(this.dynamicHeaderTableDiv);
  this.dynamicHeaderTableDiv.style.left = "0px";
  this.dynamicHeaderTableDiv.style.height = this.constant.headerHeight + "px";
  this.dynamicHeaderTableDiv.style.width = this.getDynamicTableDivRealWidth(true) + "px";
};
GridComp.prototype.initHeaderTables = function() {
  this.headerDepth = this.getHeaderDepth();
  this.defaultFixedHeaders = new Array();
  this.defaultDynamicHeaders = new Array();
  var headers = this.model.getHeaders();
  for (var i = 0, count = headers.length; i < count; i++) {
    if (headers[i].isFixedHeader) this.defaultFixedHeaders.push(headers[i]);
    else if (headers[i].isFixedHeader == false) this.defaultDynamicHeaders.push(headers[i]);
  }
  for (var i = 0, count = headers.length; i < count; i++) this.initHeaderTable(headers[i]);
};
GridComp.prototype.getFirstVisibleHeader = function() {
  var headers = this.model.getHeaders();
  for (var i = 0; i < headers.length; i++) {
    if (headers[i].isHidden == false) return headers[i];
  }
  return null;
};
GridComp.prototype.getLastVisibleHeader = function() {
  var headers = this.model.getHeaders();
  for (var i = headers.length - 1; i >= 0; i--) {
    if (headers[i].isHidden == false) return headers[i];
  }
  return null;
};
GridComp.prototype.getFirstDynamicVisibleHeader = function() {
  if (this.defaultDynamicHeaders == null || this.defaultDynamicHeaders.length == 0) return null;
  for (var i = 0, count = this.defaultDynamicHeaders.length; i < count; i++) {
    if (this.defaultDynamicHeaders[i].isHidden == false) return this.defaultDynamicHeaders[i];
  }
};
GridComp.prototype.getLastDynamicVisibleHeader = function() {
  if (this.defaultDynamicHeaders == null || this.defaultDynamicHeaders.length == 0) return null;
  for (var i = this.defaultDynamicHeaders.length - 1; i >= 0; i--) {
    if (this.defaultDynamicHeaders[i].isHidden == false) return this.defaultDynamicHeaders[i];
  }
};
GridComp.prototype.getFirstFixedVisibleHeader = function() {
  if (this.defaultFixedHeaders == null || this.defaultFixedHeaders.length == 0) return null;
  for (var i = 0, count = this.defaultFixedHeaders.length; i < count; i++) {
    if (this.defaultFixedHeaders[i].isHidden == false) return this.defaultFixedHeaders[i];
  }
};
GridComp.prototype.getLastFixedVisibleHeader = function() {
  if (this.defaultFixedHeaders == null || this.defaultFixedHeaders.length == 0) return null;
  for (var i = this.defaultFixedHeaders.length - 1; i >= 0; i--) {
    if (this.defaultFixedHeaders[i].isHidden == false) return this.defaultFixedHeaders[i];
  }
};
GridComp.prototype.getNextVisibleBasicHeader = function(header) {
  if (this.basicHeaders == null) throw new Error("basicHeaders为null!");
  if (header == null) return null;
  for (var i = 0; i < this.basicHeaders.length; i++) {
    if (this.basicHeaders[i] == header && this.basicHeaders[i + 1] != null) {
      for (var j = i + 1; j < this.basicHeaders.length; j++) {
        if (this.basicHeaders[j].isHidden == false) return this.basicHeaders[j];
      }
    }
  }
  return null;
};
GridComp.prototype.getLastVisibleBasicHeader = function(header) {
  if (this.basicHeaders == null) throw new Error("basicHeaders为null!");
  if (header == null) return null;
  for (var i = 0; i < this.basicHeaders.length; i++) {
    if (this.basicHeaders[i] == header) {
      for (var j = i - 1; j >= 0; j--) {
        if (this.basicHeaders[j].isHidden == false) return this.basicHeaders[j];
      }
    }
  }
  return null;
};
GridComp.prototype.createCheckBoxForSelAll = function(header) {
  var oThis = this;
  var selectBox = $ce("INPUT");
  selectBox.type = "checkbox";
  selectBox.style.verticalAlign = "middle";
  selectBox.style.marginTop = "0";
  selectBox.defaultChecked = false;
  selectBox.checked = false;
  if (this.editable == false || header.columEditable == false) selectBox.disabled = true;
  selectBox.onmousedown = function(e) {
    oThis.selectedCell = null;
    oThis.oldCell = null;
    oThis.hiddenComp();
    var ds = oThis.model.dataset;
    var colIndex = ds.nameToIndex(header.keyName);
    var dsRows = ds.getRows(null);
    if (header.valuePair == null || header.valuePair[1] == null) return;
    if (this.checked) {
      if (dsRows != null) {
        var rowIndices = new Array();
        var values = new Array();
        for (var i = 0; i < dsRows.length; i++) {
          rowIndices.push(i);
          values.push(header.valuePair[1]);
        }
        ds.setValuesAt(rowIndices, colIndex, values);
      }
      this.checked = false;
    } else {
      if (dsRows != null) {
        var rowIndices = new Array();
        var values = new Array();
        for (var i = 0; i < dsRows.length; i++) {
          rowIndices.push(i);
          values.push(header.valuePair[0]);
        }
        ds.setValuesAt(rowIndices, colIndex, values);
      }
      this.checked = true;
    }
  };
  selectBox.onclick = function(e) {
    e = EventUtil.getEvent();
    stopDefault(e);
    stopEvent(e);
    clearEventSimply(e);
  };
  return selectBox;
};
GridComp.prototype.initHeaderTable = function(header) {
  if (header.isHidden || this.isLocalHiddenColumn(header.keyName)) return;
  var oThis = this;
  var tempDiv = null;
  var totalDepth = header.getDepth();
  if (header.children != null && totalDepth < 2) return;
  var tableWidth = this.getHeaderDefaultWidth(header);
  header.dataTable = $ce("table");
  header.dataTable.headerOwner = header;
  var headerTable = header.dataTable;
  if (header.isGroupHeader != true) {
    header.dataTable.refGrid = this;
    header.dataTable.onmousedown = GRID_INIT;
    if (!IS_IE) this.headerDiv.onmouseup = GRID_END;
    header.dataTable.onmouseup = GRID_END;
    header.dataTable.refHeader = header;
    if (!IS_IE) this.headerDiv.onmousemove = GRID_DRAG;
    header.dataTable.onmousemove = GRID_DRAG;
  }
  if (header.isFixedHeader == false) this.dynamicHeaderTableDiv.appendChild(header.dataTable);
  else this.fixedHeaderTableDiv.appendChild(header.dataTable);
  header.dataTable.style.height = this.constant.headerHeight + "px";
  header.dataTable.style.width = tableWidth + "px";
  header.dataTable.cellPadding = "0px";
  header.dataTable.cellSpacing = "0px";
  var oTBody = $ce("tbody");
  header.dataTable.appendChild(oTBody);
  if (header.children == null) {
    headerTable.className = "headerdiv";
    if (header.required) headerTable.className += " header_required";
    else {
      if (header.textColor != null && header.textColor != "") headerTable.style.color = header.textColor;
    }
    var row = this.addTableRow(oTBody, null);
    var cell = row.insertCell(-1);
    cell.width = header.width;
    header.cell = cell;
    var selectBox = null;
    if (header.renderType == BooleanRender || header.editorType == EditorType.CHECKBOX || (header.dataType == DataType.UFBOOLEAN && header.editorType != EditorType.STRINGTEXT)) {
      if (header.isShowCheckBox) selectBox = this.createCheckBoxForSelAll(header);
    }
    cell.owner = header;
    tempDiv = $ce("div");
    tempDiv.className = "tempDiv";
    if (IS_IE7) tempDiv.style.overflow = "hidden";
    if (header.width && header.width > 0) {
      tempDiv.style.width = header.width - 1 + "px";
    }
    cell.appendChild(tempDiv);
    header.contentDiv = tempDiv;
    header.owner = this;
    header.textNode = $ce("DIV");
    header.textNode.id = this.id + "_" + header.keyName;
    header.textNode.style.whiteSpace = "nowrap";
    header.textNode.style.overflow = "hidden";
    header.textNode.style.textOverflow = "ellipsis";
    header.textNode.title = header.showName;
    var widgetid;
    try {
      widgetid = ((header.owner.widget) ? header.owner.widget.id : "");
    } catch (e) {
      widgetid = "";
    }
    var params = {
      uiid: "",
      eleid: this.id,
      type: "grid_header",
      widgetid: widgetid,
      subeleid: header.id
    };
    if (window.editMode) {
      new EditableListener(header.textNode, params, EditableListener.COMPOMENT_TYPE);
    }
    tempDiv.appendChild(header.textNode);
    if (!header.required) {}
    if (selectBox != null) {
      header.selectBox = selectBox;
      header.textNode.appendChild(selectBox);
    } else {}
    if (typeof(header.renderType) != "undefined" && header.renderType != null && typeof(header.renderType.headerRender) == "function") {
      header.renderType.headerRender.call(this, header.textNode, header.showName);
    } else {
      header.textNode.appendChild(document.createTextNode(header.showName));
    }
    if (this.sortable && header.sortable && this.model.treeLevel == null) {
      tempDiv.onclick = function(e) {
        e = EventUtil.getEvent();
        var tag = e.target;
        if (tag.id == "columnSettingDiv") {
          stopAll(e);
          clearEventSimply(e);
        } else {
          var offsetLeft = compOffsetLeft(this, document.body);
          var currX = e.clientX + document.body.scrollLeft;
          if (currX > offsetLeft + 15 && currX < offsetLeft + this.offsetWidth - 15) {
            if (!e.ctrlKey) {
              if (oThis.sortHeaders != null) {
                var headerDiv = null;
                for (var i = 0, count = oThis.sortHeaders.length; i < count; i++) {
                  headerDiv = oThis.sortHeaders[i].contentDiv;
                  if (headerDiv.sortImg.parentNode) headerDiv.sortImg.parentNode.removeChild(headerDiv.sortImg);
                }
                while (oThis.sortHeaders.length != 0) {
                  oThis.sortHeaders.shift().contentDiv.sortImg = null;
                }
              }
              if (oThis.sortHeader != null && oThis.sortHeader != header) {
                var lastHeaderDiv = oThis.sortHeader.contentDiv;
                if (lastHeaderDiv.sortImg) {
                  lastHeaderDiv.sortImg.parentNode.removeChild(lastHeaderDiv.sortImg);
                  lastHeaderDiv.sortImg = null;
                }
              }
            } else {
              if (oThis.sortHeader != null && oThis.sortHeader != header) {
                var lastHeaderDiv = oThis.sortHeader.contentDiv;
                lastHeaderDiv.sortImg.parentNode.removeChild(lastHeaderDiv.sortImg);
                lastHeaderDiv.sortImg = null;
                oThis.sortHeader = null;
              }
            }
            if (this.sortImg == null) {
              this.sortImg = $ce("img");
              this.sortImg.className = "sort_img";
              this.sortImg.src = window.themePath + "/ui/ctrl/grid/images/up_arrow.png";
              tempDiv.appendChild(this.sortImg);
              header.ascending = -1;
            } else {
              if (header.ascending == -1) {
                this.sortImg.src = window.themePath + "/ui/ctrl/grid/images/down_arrow.png";
                header.ascending = 1;
              } else if (header.ascending == 1) {
                this.sortImg.src = window.themePath + "/ui/ctrl/grid/images/up_arrow.png";
                header.ascending = -1;
              }
            }
            if (!e.ctrlKey) {
              oThis.model.sortable([header], null, null);
              oThis.sortHeader = header;
            } else {
              if (oThis.sortHeaders == null) oThis.sortHeaders = new Array();
              oThis.sortHeaders.push(header);
            }
          }
          stopAll(e);
          clearEventSimply(e);
        }
      };
      tempDiv.onkeyup = function(e) {
        e = EventUtil.getEvent();
        if (e.lfwKey == 17) {}
        clearEventSimply(e);
      };
    }
    headerTable.onmouseover = function(e) {
      if (!e) e = window.event;
      if (window.dragStart) return;
      if (window.editMode) return;
      if (header.contentDiv.columnSettingDiv == null) {
        var columnSettingDiv = $ce('DIV');
        columnSettingDiv.id = "columnSettingDiv";
        columnSettingDiv.onmousedown = function(e) {
          e = EventUtil.getEvent();
          var ee = {};
          ee.clientX = e.clientX;
          ee.clientY = e.clientY;
          ee.type = e.type;
          setTimeout(function() {
            oThis.hideenColumnContentMenu();
            oThis.showColumnContentMenu(ee);
            stopEvent(ee);
          }, 200);
        };
        columnSettingDiv.onmouseup = function(e) {
          if (IS_CHROME) {
            setTimeout(function() {
              destroyDargObj();
            }, 200);
          }
        };
        columnSettingDiv.onmouseover = function(e) {
          if (IS_IE9) {
            header.contentDiv.title = "";
          }
        };
        columnSettingDiv.onmouseout = function(e) {
          if (IS_IE9) {
            header.contentDiv.title = header.showName;
          }
        };
        columnSettingDiv.className = "columnSetting";
        columnSettingDiv.style.position = "absolute";
        columnSettingDiv.style.marginRight = "5px";
        header.contentDiv.appendChild(columnSettingDiv);
        header.contentDiv.columnSettingDiv = columnSettingDiv;
      }
      header.contentDiv.columnSettingDiv.style.zIndex = getZIndex();
      header.contentDiv.columnSettingDiv.style.display = "block";
      oThis.initColumnContextMenu();
    };
    headerTable.onmouseout = function(e) {
      if (!e) e = window.event;
      if (window.dragStart) return;
      if (header.contentDiv.columnSettingDiv != null) header.contentDiv.columnSettingDiv.style.display = "none";
    };
  } else {
    headerTable.className = "multiheaderdiv";
    var tempHeaders = new Array();
    for (var i = 0; i < totalDepth; i++) {
      var row = header.dataTable.insertRow(i);
      tempHeaders = header.getVisibleHeadersByLevel(i);
      for (var j = 0; j < tempHeaders.length; j++) {
        var tempHeader = tempHeaders[j];
        var cell = row.insertCell(-1);
        cell.className = "multiheadercell";
        cell.owner = tempHeader;
        cell.rowSpan = tempHeader.getRowspan(totalDepth);
        cell.colSpan = tempHeader.getColspan();
        var selectBox = null;
        var tempDiv = $ce("div");
        if (tempHeader.children == null) {
          var headerLevel = tempHeader.getHeaderLevel();
          if (headerLevel != totalDepth - 1) cell.height = (this.headerDepth - tempHeader.getHeaderLevel()) * this.headerRowHeight;
          else cell.height = this.headerRowHeight - 1;
          if (tempHeader.renderType == BooleanRender || tempHeader.editorType == EditorType.CHECKBOX || (tempHeader.dataType == DataType.UFBOOLEAN && tempHeader.editorType != EditorType.STRINGTEXT)) {
            if (tempHeader.isShowCheckBox) selectBox = this.createCheckBoxForSelAll(tempHeader);
          }
        } else {
          if (tempHeader == header) cell.height = (this.headerDepth - header.getHeaderChildrenLevel()) * this.headerRowHeight;
          else cell.height = this.headerRowHeight - 1;
        }
        if (j != 0) cell.width = tempHeader.width - 1;
        else cell.width = tempHeader.width;
        tempHeader.contentDiv = tempDiv;
        tempHeader.owner = this;
        tempHeader.textNode = $ce("DIV");
        tempDiv.appendChild(tempHeader.textNode);
        tempDiv.title = tempHeader.showName;
        if (selectBox != null) {
          header.selectBox = selectBox;
          tempHeader.textNode.appendChild(selectBox);
        } else {}
        if (typeof(tempHeader.renderType) != "undefined" && typeof(tempHeader.renderType.headerRender) == "function") {
          tempHeader.renderType.headerRender.call(this, tempHeader.textNode, tempHeader.showName);
        } else {
          tempHeader.textNode.appendChild(document.createTextNode(tempHeader.showName));
        }
        cell.appendChild(tempDiv);
      }
    }
    tempHeaders = null;
  }
  if (header.isFixedHeader) {
    headerTable.className += " fixedheaderdiv";
  }
  if (header == this.getFirstFixedVisibleHeader() || header == this.getFirstDynamicVisibleHeader()) {
    headerTable.style.borderLeftWidth = "0px";
  }
  if (header == this.getLastFixedVisibleHeader() || header == this.getLastDynamicVisibleHeader()) {
    tempDiv.style.borderRightWidth = "0px";
    headerTable.style.borderRightWidth = "0px";
  }
};
GridComp.prototype.initNoRowsDiv = function() {
  this.noRowsDiv = $ce("DIV");
  if (this.flowmode) {
    this.noRowsDiv.style.position = "relative";
    this.noRowsDiv.style.marginTop = "10px";
  } else {
    this.noRowsDiv.style.position = "absolute";
    this.noRowsDiv.style.width = "100%";
    this.noRowsDiv.style.marginTop = "3px";
  }
  this.noRowsDiv.style.marginBottom = "10px";
  this.noRowsDiv.style.textAlign = "center";
  this.noRowsDiv.innerHTML = trans("ml_grid_norow");
  this.noRowsDiv.style.display = "none";
  this.outerDiv.appendChild(this.noRowsDiv);
};
GridComp.prototype.setGridTipContent = function(html) {
  this.noRowsDiv.innerHTML = html;
  this.noRowsDiv.style.display = "";
  this.dynamicColumDataDiv.style.marginBottom = "0px";
  this.dataOuterDiv.style.overflow = "hidden";
  this.dataOuterDiv.style.display = "block";
};

function GRID_INIT(e) {
  if (window.editMode) {
    return;
  }
  e = EventUtil.getEvent();
  destroyDargObj();
  var grid = this.refGrid;
  if (grid.showComp != null) grid.hiddenComp();
  var src = getTarget(e);
  if (src.tagName != null && (src.tagName.toLowerCase() == "input" || src.tagName.toLowerCase() == "img")) {
    clearEventSimply(e);
    return;
  }
  var offsetLeft = compOffsetLeft(src, document.body);
  var outerDivScrollLeft = grid.dataOuterDiv.scrollLeft;
  var currX = e.clientX + document.body.scrollLeft;
  var dragSrc = getDragSrc(src);
  var curHeader = dragSrc.owner;
  if (curHeader == null) {
    clearEventSimply(e);
    return;
  }
  window.gridOwner = curHeader.owner;
  if (currX > offsetLeft + parseInt(dragSrc.width) - 5 && currX < offsetLeft + parseInt(dragSrc.width)) {
    window.dragHeader = curHeader;
    window.src = src;
    window.dragStart = true;
    window.src.style.cursor = 'col-resize';
    if (curHeader.contentDiv.columnSettingDiv != null) curHeader.contentDiv.columnSettingDiv.style.display = "none";
    window.dragType = 'changeWidth';
  } else if (currX > offsetLeft && currX < offsetLeft + parseInt(dragSrc.width) - 5) {
    window.dragHeader = curHeader;
    window.src = src;
    window.dragStart = true;
    window.dragType = 'swapColumn';
    window.dragSrcClone = dragSrc.cloneNode(true);
    window.dragSrcClone.style.position = "absolute";
    window.dragSrcClone.style.height = dragSrc.offsetHeight + "px";
    window.dragSrcClone.style.width = dragSrc.offsetWidth + "px";
    window.dragSrcClone.style.filter = "Alpha(Opacity=30)";
    window.dragSrcClone.style.MozOpacity = 0.3;
    document.body.appendChild(dragSrcClone);
    window.dragSrcClone.style.display = "none";
    var flagStyle = window.dragSrcClone.style;
    flagStyle.left = (e.clientX + 3) + "px";
    flagStyle.top = (e.clientY + 3) + "px";
  }
  window.dragSrc = dragSrc;
  window.dragSrcX = e.clientX + document.body.scrollLeft;
  window.defaultHeaderWidth = parseInt(window.dragSrc.width);
  window.dynamicColumDataDivWidth = window.gridOwner.dynamicColumDataDiv.offsetWidth;
  window.defaultDynamicHeaderWidth = window.gridOwner.getDynamicTableDivRealWidth(true) + 2;
  window.defaultDynHeaderTableWidth = window.gridOwner.dynamicHeaderTableDiv.offsetWidth;
  if (window.src != null && window.src.firstChild != null) {
    if (window.src.firstChild.tagName != null && window.src.firstChild.tagName.toLowerCase() == "input") window.minWidth = getTextWidth(window.src.childNodes[1].nodeValue, window.src.className) + 25;
    else window.minWidth = getTextWidth(window.src.innerHTML, window.src.nodeName) + 10;
  }
  clearEventSimply(e);
};

function GRID_END(e) {
  if (window.dragStart != null && window.dragStart) {
    if (IS_IE) window.src.releaseCapture();
    var header = window.dragHeader;
    if (window.dragType == 'changeWidth') {
      if (header.isFixedHeader == false) {
        var changedWidth = window.headerChangedWidth;
        if (changedWidth == null) {
          destroyDargObj();
          return;
        }
        var currWidth = window.defaultHeaderWidth + changedWidth;
        if (currWidth > 0 && currWidth > window.minWidth) {
          var grid = window.gridOwner;
          grid.dynamicHeaderTableDiv.style.width = (window.defaultDynHeaderTableWidth + changedWidth) + "px";
          header.dataDiv.style.width = currWidth + "px";
          if (window.dynamicColumDataDivWidth + changedWidth > 0) grid.dynamicColumDataDiv.style.width = (window.dynamicColumDataDivWidth + changedWidth) + "px";
          if (grid.dynSumRowContentDiv) {
            grid.dynSumRowContentDiv.style.width = (window.dynamicColumDataDivWidth + changedWidth) + "px";
          }
          if (IS_IE7) {
            if (grid.dynamicColumDataDiv.offsetWidth > grid.dataOuterDiv.offsetWidth) {
              grid.dynamicColumDataDiv.style.marginBottom = "17px";
            } else {
              grid.dynamicColumDataDiv.style.marginBottom = "0px";
            }
          }
          if (header == grid.getLastDynamicVisibleHeader()) header.contentDiv.style.width = (currWidth - 2) + "px";
          else header.contentDiv.style.width = (currWidth - 1) + "px";
          window.dragSrc.width = currWidth;
          header.dataTable.style.width = currWidth + "px";
          if (header.sumCell) {
            grid.dynSumRowDataDiv.style.width = (window.defaultDynHeaderTableWidth + changedWidth) + "px";
            if (header.keyName == grid.basicHeaders[0].keyName) header.sumCell.style.width = currWidth + GridComp.ROWSTATE_COLUMN_WIDTH - GridComp.SUMROW_DIV_WIDTH - (GridComp.SUMCELL_PADDING * 2) + "px";
            else header.sumCell.style.width = currWidth - (GridComp.SUMCELL_PADDING * 2) + "px";
          }
          header.width = currWidth;
          grid.adjustFixedColumDivHeight();
        }
        var grid = window.gridOwner;
        if (isDivScroll(grid.dataOuterDiv)) {
          if (grid.dataOuterDiv.scrollLeft > 0) {
            grid.setScrollLeft(grid.dataOuterDiv.scrollLeft - 1);
          }
        }
        for (var i = 0, n = header.dataDiv.childNodes.length; i < n; i++) {
          if (header.dataDiv.childNodes[i].className.indexOf("gridcell_") != -1) {
            header.dataDiv.childNodes[i].style.width = (header.dataDiv.offsetWidth - 5) + "px";
            if (header.dataDiv.childNodes[i].style.textAlign == "right") header.dataDiv.childNodes[i].style.paddingLeft = "0px";
          }
        }
      }
    } else if (window.dragType == 'swapColumn') {
      if (window.dragTargetHeader != null) {
        var grid = window.gridOwner;
        grid.changeColumnOrder(header.keyName, window.dragTargetHeader.keyName);
      }
    }
  }
  destroyDargObj();
};

function destroyDargObj() {
  window.dragStart = false;
  if (window.src) window.src.style.cursor = 'default';
  window.dragType = null;
  window.dragHeader = null;
  if (window.dragTargetHeader != null) {
    window.dragTargetHeader = null;
  }
  if (window.dragSrcClone) {
    try {
      document.body.removeChild(window.dragSrcClone);
    } catch (error) {}
    window.dragSrcClone = null;
  }
};

function GRID_DRAG(e) {
  e = EventUtil.getEvent();
  var src = getTarget(e);
  if (src.tagName != null && (src.tagName.toLowerCase() == "input" || src.tagName.toLowerCase() == "img")) {
    clearEventSimply(e);
    return;
  }
  var offsetLeft = compOffsetLeft(src, document.body);
  var currX = e.clientX + document.body.scrollLeft;
  var currY = e.clientY + document.body.scrollTop;
  var dragSrc = getDragSrc(src);
  if (window.dragStart == null || window.dragStart == false) {
    var flag = 0;
    if (currX > offsetLeft + parseInt(dragSrc.width) - 5 && currX < offsetLeft + parseInt(dragSrc.width)) {
      if (this.refHeader && this.refHeader.isGroupHeader) return;
      flag = 1;
    }
    if (flag == 1 || flag == 2) src.style.cursor = 'e-resize';
    else src.style.cursor = 'default';
  }
  if ((e.button == 1 || e.button == 0) && window.dragStart) {
    if (window.dragType == 'changeWidth') {
      window.src.style.cursor = 'col-resize';
      if (IS_IE) window.src.setCapture();
      window.headerChangedWidth = currX - window.dragSrcX;
    } else if (window.dragType == 'swapColumn' && window.dragHeader != null) {
      if (IS_IE) window.src.setCapture();
      if (window.dragSrcClone) {
        var event = EventUtil.getEvent();
        var flagStyle = window.dragSrcClone.style;
        flagStyle.left = (event.clientX + 10) + "px";
        flagStyle.top = (event.clientY + 10) + "px";
        flagStyle.display = "block";
        flagStyle.zIndex = 647;
      }
      if (window.dragTargetHeader != null) {
        var targetOffsetLeft = compOffsetLeft(window.dragTargetHeader.dataTable, document.body);
        var targetOffsetTop = compOffsetTop(window.dragTargetHeader.dataTable, document.body);
        if (currX < targetOffsetLeft || currX > targetOffsetLeft + (window.dragTargetHeader.dataTable.offsetWidth / 2) || currY < targetOffsetTop || currY > (targetOffsetTop + window.dragTargetHeader.dataTable.offsetHeight)) {
          window.dragTargetHeader = null;
          if (window.dragSrcClone) {
            window.dragSrcClone.style.filter = "Alpha(Opacity=30)";
            window.dragSrcClone.style.MozOpacity = 0.3;
          }
        }
      }
      if (window.dragTargetHeader == null) {
        var grid = window.gridOwner;
        var headers = grid.defaultDynamicHeaders;
        for (var i = 0; i < headers.length; i++) {
          if (headers[i].dataTable) {
            var headerLeft = compOffsetLeft(headers[i].dataTable, document.body);
            var headerTop = compOffsetTop(headers[i].dataTable, document.body);
            if (currX > headerLeft && currX < headerLeft + (headers[i].dataTable.offsetWidth / 2) && currY > headerTop && currY < (headerTop + headers[i].dataTable.offsetHeight)) {
              if (headers[i].keyName != window.dragHeader.keyName) {
                window.dragTargetHeader = headers[i];
                if (window.dragSrcClone) {
                  window.dragSrcClone.style.filter = "Alpha(Opacity=100)";
                  window.dragSrcClone.style.MozOpacity = 1;
                }
              }
              break;
            } else if (currX > headerLeft + (headers[i].dataTable.offsetWidth / 2) && currX < headerLeft + headers[i].dataTable.offsetWidth && currY > headerTop && currY < (headerTop + headers[i].dataTable.offsetHeight)) {
              var tempHeader = headers[i];
              if (typeof(headers[i + 1]) != "undefined") {
                tempHeader = headers[i + 1];
              }
              if (tempHeader.keyName != window.dragHeader.keyName) {
                window.dragTargetHeader = headers[i + 1];
                if (window.dragSrcClone) {
                  window.dragSrcClone.style.filter = "Alpha(Opacity=100)";
                  window.dragSrcClone.style.MozOpacity = 1;
                }
              }
              break;
            }
          }
        }
      }
    }
  }
  clearEventSimply(e);
};

function getDragSrc(src) {
  var dragSrc = null;
  if (src.nodeName == "TD") {
    dragSrc = src;
  } else if (src.nodeName == "TABLE") {
    dragSrc = src.childNodes[0].childNodes[0].childNodes[0]
  } else {
    var tempSrc = src.parentNode;
    while (tempSrc != null && tempSrc.nodeName != "TD") {
      tempSrc = tempSrc.parentNode;
    }
    if (tempSrc == null) dragSrc = src;
    else dragSrc = tempSrc;
  }
  return dragSrc;
};
GridComp.outerDivId = 0;
GridComp.prototype.getId = function() {
  return GridComp.outerDivId++;
};
GridComp.prototype.initDataOuterDiv = function() {
  this.dataOuterDiv = $ce("div");
  this.outerDiv.appendChild(this.dataOuterDiv);
  this.dataOuterDiv.className = "data_outer_div";
  this.scrollState = false;
  this.dataOuterDiv.id = this.outerDivId;
  this.dataOuterDiv.style.zIndex = 101;
  var fixedColumDivWidth = 0;
  if (this.fixedColumDiv) fixedColumDivWidth = this.fixedColumDiv.offsetWidth;
  if (this.dataOuterDiv) {
    this.dataOuterDiv.style.width = this.constant.outerDivWidth - fixedColumDivWidth + "px";
    this.dataOuterDiv.style.left = this.constant.fixedColumDivWidth + "px";
  }
  if (this.canCopy == false) {
    document.body.onselectstart = function(e) {
      return false;
    };
    document.body.ondragstart = function(e) {
      return false;
    };
    if (this.dataOuterDiv) this.dataOuterDiv.style.MozUserSelect = "none";
  }
  this.dataOuterDiv.style.overflow = "hidden";
};
GridComp.prototype.initFixedColumDiv = function() {
  var h = this.constant.headerHeight;
  this.fixedColumDiv = $ce("div");
  this.fixedColumDiv.id = "fixedColum";
  this.outerDiv.appendChild(this.fixedColumDiv);
  this.fixedColumDiv.className = "fixedcolum_div";
  this.fixedColumDiv.style.width = this.constant.fixedHeaderDivWidth + 1 + "px";
  this.constant.fixedColumDivWidth = this.constant.fixedHeaderDivWidth;
};
GridComp.prototype.adjustFixedColumDivHeight = function() {
  var oH = this.constant.outerDivHeight,
    h = this.constant.headerHeight;
  if (this.pageSize > 0 && this.isPagenationTop == true) this.fixedColumDiv.style.top = (h + GridComp.PAGEBAR_HEIGHT) + "px";
  else this.fixedColumDiv.style.top = h + "px";
  if (!this.flowmode) {
    var height = this.wholeDiv.offsetHeight;
    if (this.descDiv) height = height - this.descDiv.offsetHeight;
    if (this.headerBtnDiv) height = height - this.headerBtnDiv.offsetHeight;
    if (height > 0) {}
    if (this.pageSize == -1) height = height - this.constant.headerHeight;
    else if (this.needShowNoRowsDiv) height = height - this.constant.headerHeight - GridComp.NOROW_DIV_HEIGHT;
    else height = height - this.constant.headerHeight - GridComp.PAGEBAR_HEIGHT;
    if (height > 0) {
      this.fixedColumDiv.style.height = height + "px";
      this.dataOuterDiv.style.height = height + "px";
    } else {
      this.fixedColumDiv.style.height = "100%";
      this.dataOuterDiv.style.height = "100%";
    }
  }
};
GridComp.prototype.initRowNumDiv = function() {
  this.rowNumDiv = $ce("div");
  this.fixedColumDiv.appendChild(this.rowNumDiv);
  this.rowNumDiv.id = "rowNumDiv";
  this.rowNumDiv.className = "num_div";
  this.rowNumDiv.style.width = this.constant.rowNumHeaderDivWidth + "px";
  this.rowNumDiv.cells = new Array(this.getRowsNum());
};
GridComp.prototype.initLineStateColumDiv = function() {
  this.lineStateColumDiv = $ce("div");
  var line = this.lineStateColumDiv;
  this.fixedColumDiv.appendChild(line);
  line.id = "lineStateColumDiv";
  line.className = "state_div";
  line.style.top = "0px";
  if (this.isShowSumRow) {
    if (this.fixedColumDiv.offsetHeight > 0) {
      line.style.height = (this.fixedColumDiv.offsetHeight - GridComp.ROW_HEIGHT) + "px";
      line.defaultHeight = this.fixedColumDiv.offsetHeight - GridComp.ROW_HEIGHT;
    }
  }
  if (this.isShowNumCol) line.style.left = this.constant.rowNumHeaderDivWidth + "px";
  else line.style.left = "0px";
  line.style.width = this.constant.lineStateHeaderDivWidth + "px";
  this.lineStateColumDiv.cells = new Array(this.getRowsNum());
};
GridComp.prototype.initSumRowDiv = function() {
  this.sumRowDiv = $ce("div");
  this.sumRowDiv.id = "sumRowDiv";
  this.sumRowDiv.className = "sum_div";
  this.dynSumRowContentDiv.appendChild(this.sumRowDiv);
  this.sumRowDiv.style.left = "0px";
  this.sumRowDiv.style.top = "0px";
  this.sumRowDiv.style.height = GridComp.ROW_HEIGHT + "px";
  this.sumRowDiv.style.lineHeight = GridComp.ROW_HEIGHT + "px";
  this.sumRowDiv.style.width = 40 + "px";
  this.sumRowDiv.innerHTML = "<center>" + trans("ml_total") + "</center>";
};
GridComp.prototype.initSumRowDataDiv = function() {
  this.dynSumRowContentDiv = $ce("div");
  var cont = this.dynSumRowContentDiv;
  cont.className = "dynsumcontainer_div";
  this.dataOuterDiv.appendChild(cont);
  this.initSumRowDiv();
  if (this.dynamicHeaderDiv.defaultWidth - 2 > 0) cont.style.width = (this.dynamicHeaderDiv.defaultWidth - 2) + "px";
  else cont.style.width = "0px";
  cont.style.height = GridComp.ROW_HEIGHT + "px";
  this.dynSumRowDataDiv = $ce("div");
  var d = this.dynSumRowDataDiv;
  d.className = "dynsumrow_div";
  d.id = "dynSumRowDataDiv";
  cont.appendChild(d);
  d.style.top = "0px";
  d.style.left = "40px";
  d.defaultLeft = "40px";
  d.style.height = "100%";
  d.style.width = this.dynamicHeaderTableDiv.offsetWidth - this.sumRowDiv.offsetWidth + "px";
};
GridComp.prototype.initSumRowCells = function() {
  var firstVisibleHeader = this.getFirstVisibleHeader();
  for (var i = 0, count = this.defaultDynamicHeaders.length; i < count; i++) {
    if (this.defaultDynamicHeaders[i].isHidden == false && this.defaultDynamicHeaders[i].isGroupHeader == false) {
      if (firstVisibleHeader != null && firstVisibleHeader.keyName == this.defaultDynamicHeaders[i].keyName) this.createSumRowCell(this.defaultDynamicHeaders[i], true);
      else this.createSumRowCell(this.defaultDynamicHeaders[i], false);
    } else if (this.defaultDynamicHeaders[i].isHidden == false && this.defaultDynamicHeaders[i].isGroupHeader == true) {
      for (var j = 0; j < this.defaultDynamicHeaders[i].basicHeaders.length; j++) {
        if (this.defaultDynamicHeaders[i].basicHeaders[j].isHidden == false && this.defaultDynamicHeaders[i].isGroupHeader == false) {
          if (firstVisibleHeader != null && firstVisibleHeader.keyName == this.defaultDynamicHeaders[i].basicHeaders[j].keyName) this.createSumRowCell(this.defaultDynamicHeaders[i].basicHeaders[j], true);
          else this.createSumRowCell(this.defaultDynamicHeaders[i].basicHeaders[j], false);
        }
      }
    }
  }
};
GridComp.prototype.createSumRowCell = function(header, isFirstHeader) {
  var cell = $ce("div");
  cell.headKey = header.keyName;
  header.sumCell = cell;
  cell.className = "dynsumcell_div";
  this.dynSumRowDataDiv.appendChild(cell);
  cell.style.height = GridComp.ROW_HEIGHT + "px";
  cell.style.lineHeight = GridComp.ROW_HEIGHT + "px";
  var extendWidth = 0;
  if (isFirstHeader) {
    extendWidth = this.constant.rowNumHeaderDivWidth + 40;
  }
  if (header.dataDivWidth != null && header.dataDivWidth > 0) {
    cell.style.width = (header.dataDivWidth - GridComp.CELL_LEFT_PADDING - GridComp.CELL_RIGHT_PADDING - extendWidth) + "px";
  } else if (header.dataDiv && header.dataDiv.offsetWidth > 0) {
    cell.style.width = (header.dataDiv.offsetWidth - GridComp.CELL_LEFT_PADDING - GridComp.CELL_RIGHT_PADDING - extendWidth) + "px";
  } else if (header.width && header.width > 0) {
    cell.style.width = (header.width - GridComp.CELL_LEFT_PADDING - GridComp.CELL_RIGHT_PADDING - extendWidth) + "px";
  }
  cell.style.paddingLeft = GridComp.CELL_LEFT_PADDING + "px";
  cell.style.paddingRight = "10px";
  if (header.textAlign == "") {
    setTextAlign = "left";
  } else {
    setTextAlign = header.textAlign;
  }
  if (typeof(header.dataType) == "string") {
    switch (header.dataType) {
      case "UFDateTime":
      case "UFDate":
      case "UFTime":
      case "Date":
      case "ShortDate":
      case "Boolean":
      case "boolean":
      case "UFBoolean":
        cell.style.textAlign = "center";
        break;
      case "Integer":
        if (header.editorType && header.editorType == "ComboBox") {
          cell.style.textAlign = "left";
          break;
        }
      case "int":
      case "Double":
      case "double":
      case "UFDouble":
      case "Float":
      case "float":
      case "BigDecimal":
      case "Decimal":
      case "Long":
      case "long":
        cell.style.textAlign = "right";
        break;
      default:
        cell.style.textAlign = setTextAlign;
        break;
    }
  } else {
    cell.style.textAlign = setTextAlign;
  }
};
GridComp.prototype.initSelectColumDiv = function() {
  this.selectColumDiv = $ce("div");
  this.fixedColumDiv.appendChild(this.selectColumDiv);
  this.selectColumDiv.id = "fixedSelectColum";
  this.selectColumDiv.className = "fixed_select_colum";
  this.selectColumDiv.header = this.selectColumHeaderDiv;
  this.selectColumDiv.style.left = (this.constant.rowNumHeaderDivWidth + this.constant.lineStateHeaderDivWidth) + "px";
  this.selectColumDiv.style.width = GridComp.SELECTCOLUM_WIDTH + "px";
  var rowNum = this.getRowsNum();
  this.selectColumDiv.cells = new Array(rowNum);
  if (!this.flowmode) this.selectColumDiv.style.position = "absolute";
};
GridComp.prototype.initDynamicColumDataDiv = function() {
  var iOffsetWidth = this.constant.fixedColumDivWidth;
  var rowsNum = this.getRowsNum();
  if (this.noRowsDiv) {
    if (rowsNum <= 0) {
      this.needShowNoRowsDiv = true;
      if (this.model.dataset.lazyLoad == true) {
        setTimeout("GridComp.showNoRowsDiv('" + this.id + "');", 1500);
      } else {
        setTimeout("GridComp.showNoRowsDiv('" + this.id + "');", 500);
      }
      GridComp.gridResize(this.id);
    } else {
      this.needShowNoRowsDiv = false;
      this.noRowsDiv.style.display = "none";
    }
  }
  this.dynamicColumDataDiv = $ce("div");
  if (this.dataOuterDiv.childNodes[0] != null) this.dataOuterDiv.insertBefore(this.dynamicColumDataDiv, this.dataOuterDiv.childNodes[0]);
  else this.dataOuterDiv.appendChild(this.dynamicColumDataDiv);
  this.dynamicColumDataDiv.className = "dynamic_data_div";
  this.dynamicColumDataDiv.id = "dynamicDataDiv";
  var dynamicDataDivRealWidth = this.getDynamicTableDivRealWidth(true);
  this.realWidth = dynamicDataDivRealWidth + iOffsetWidth;
  this.dynamicColumDataDiv.style.width = (dynamicDataDivRealWidth + 2) + "px";
  if (this.dynSumRowContentDiv) {
    this.dynSumRowContentDiv.style.width = (dynamicDataDivRealWidth + 2) + "px";
  }
  if (rowsNum > 0) {
    this.dynamicColumDataDiv.style.marginBottom = "0px";
    this.dataOuterDiv.style.overflow = "hidden";
    this.dataOuterDiv.style.display = "block";
  } else {
    this.dynamicColumDataDiv.style.marginBottom = "0px";
    this.dataOuterDiv.style.overflow = "hidden";
    this.dataOuterDiv.style.display = "block";
  }
  if (this.defaultDynamicHeaders != null) {
    var len = this.defaultDynamicHeaders.length;
    var rowNum = this.getRowsNum();
    for (var i = 0; i < len; i++) {
      var tempH = this.defaultDynamicHeaders[i];
      if (tempH.basicHeaders == null && tempH.isHidden == false) {
        tempH.dataDiv = $ce("div");
        var tempDiv = tempH.dataDiv;
        tempDiv.header = tempH;
        tempDiv.cells = new Array(rowsNum);
        this.dynamicColumDataDiv.appendChild(tempDiv);
        tempDiv.style.width = tempH.width + "px";
        tempDiv.style.position = "relative";
        tempDiv.style[ATTRFLOAT] = "left";
        tempDiv.style.overflow = "hidden";
      } else if (tempH.basicHeaders != null && tempH.isHidden == false) {
        var tempHeaders = tempH.basicHeaders;
        for (var j = 0; j < tempHeaders.length; j++) {
          if (tempHeaders[j].isHidden == false) {
            tempHeaders[j].dataDiv = $ce("div");
            var tempDiv = tempHeaders[j].dataDiv;
            tempDiv.header = tempHeaders[j];
            tempDiv.cells = new Array(rowsNum);
            this.dynamicColumDataDiv.appendChild(tempDiv);
            tempDiv.style.width = tempHeaders[j].width + "px";
            tempDiv.style.position = "relative";
            tempDiv.style[ATTRFLOAT] = "left";
            tempDiv.style.overflow = "hidden";
          }
        }
      }
    }
  }
  if (isDivVScroll(this.dataOuterDiv)) {
    this.setScrollTop(0);
  }
};
GridComp.showNoRowsDiv = function(gridId) {
  if (window.loadingBar && window.loadingBar.visible) {
    setTimeout(function() {
      GridComp.showNoRowsDiv(gridId);
    }, 500);
  } else {
    var oThis = window.objects[gridId];
    if (oThis.needShowNoRowsDiv != null && oThis.needShowNoRowsDiv == true && oThis.model.rows.length == 0) {
      oThis.noRowsDiv.style.display = "";
      if (oThis.dynamicColumDataDiv) {
        oThis.dynamicColumDataDiv.style.marginBottom = "0px";
      }
      if (oThis.dataOuterDiv) {
        oThis.dataOuterDiv.style.overflow = "hidden";
        oThis.dataOuterDiv.style.display = "block";
      }
      if (oThis.formOuterDiv) {
        oThis.formOuterDiv.style.overflow = "hidden";
        oThis.formOuterDiv.style.display = "none";
      }
    }
  }
  adjustContainerFramesHeight();
};
GridComp.prototype.initFixedColumDataDiv = function() {
  var rowsNum = this.getRowsNum();
  if (this.defaultFixedHeaders != null) {
    var len = this.defaultFixedHeaders.length;
    var rowNum = this.getRowsNum();
    for (var i = 0; i < len; i++) {
      var tempH = this.defaultFixedHeaders[i];
      if (tempH.basicHeaders == null && tempH.isHidden == false) {
        tempH.dataDiv = $ce("div");
        var tempDiv = tempH.dataDiv;
        tempDiv.header = tempH;
        tempDiv.cells = new Array(rowsNum);
        this.fixedColumDiv.appendChild(tempDiv);
        tempDiv.style.width = tempH.width + "px";
        tempDiv.style.position = "relative";
        tempDiv.style[ATTRFLOAT] = "left";
        tempDiv.style.overflow = "hidden";
      } else if (tempH.basicHeaders != null && tempH.isHidden == false) {
        var tempHeaders = tempH.basicHeaders;
        for (var j = 0; j < tempHeaders.length; j++) {
          if (tempHeaders[j].isHidden == false) {
            tempHeaders[j].dataDiv = $ce("div");
            var tempDiv = tempHeaders[j].dataDiv;
            tempDiv.header = tempHeaders[j];
            tempDiv.cells = new Array(rowsNum);
            this.fixedColumDiv.appendChild(tempDiv);
            tempDiv.style.width = tempHeaders[j].width + "px";
            tempDiv.style.position = "relative";
            tempDiv.style[ATTRFLOAT] = "left";
            tempDiv.style.overflow = "hidden";
          }
        }
      }
    }
  }
  if (!this.flowmode) {
    this.fixedColumDiv.style.overflowY = "hidden";
  }
  if (isDivVScroll(this.dataOuterDiv)) {
    this.setScrollTop(0);
  }
};
GridComp.prototype.getRowsNum = function() {
  if (this.model == null) return 0;
  else return this.model.getRowsCount();
};
GridComp.prototype.getPreHeadersWidth = function(cell) {
  var totalWidth = 0;
  var len = this.basicHeaders.length;
  for (var i = 0; i < len; i++) {
    var header = this.basicHeaders[i];
    if (!header.isFixedHeader && !header.isHidden) {
      if (header != this.basicHeaders[cell.colIndex]) totalWidth += header.width;
      else break;
    }
  }
  return totalWidth;
};
GridComp.prototype.getDynamicTableDivRealWidth = function(isDynamic) {
  var headers = this.model.getHeaders();
  if (headers == null) return;
  var realWidth = 0;
  if (isDynamic) {
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i];
      if (header.isFixedHeader == false && header.isHidden == false) realWidth += this.getHeaderDefaultWidth(header) + GridComp.COLUMN_LEFT_BORDER_WIDTH;
    }
  } else if (isDynamic == false) {
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i];
      if (header.isFixedHeader && header.isHidden == false) realWidth += this.getHeaderDefaultWidth(header) + GridComp.COLUMN_LEFT_BORDER_WIDTH;
    }
  }
  return realWidth;
};
GridComp.prototype.setEditable = function(isEditable) {
  this.editable = getBoolean(isEditable, true);
  if (this.editable && this.compsInited == false) GridComp.initEditCompsForGrid(this.id);
  for (var i = 0; i < this.basicHeaders.length; i++) {
    var header = this.basicHeaders[i];
    if (header.renderType == BooleanRender) {
      if (header.columEditable == false) continue;
      if (isEditable) {
        if (header.selectBox != null) header.selectBox.disabled = false;
        if (header.dataDiv != null && header.dataDiv.cells != null) {
          for (var j = 0; j < header.dataDiv.cells.length; j++) {
            if (header.dataDiv.cells[j]) header.dataDiv.cells[j].firstChild.disabled = false;
          }
        }
      } else {
        if (header.selectBox != null) header.selectBox.disabled = true;
        if (header.dataDiv != null && header.dataDiv.cells != null) {
          for (var j = 0; j < header.dataDiv.cells.length; j++) {
            if (header.dataDiv.cells[j]) header.dataDiv.cells[j].firstChild.disabled = true;
          }
        }
      }
    } else if (header.renderType == RadioGroupRender) {
      if (header.columEditable == false) continue;
      if (header.dataDiv != null && header.dataDiv.cells != null) {
        for (var j = 0; j < header.dataDiv.cells.length; j++) {
          if (header.dataDiv.cells[j] && header.dataDiv.cells[j].comp && header.dataDiv.cells[j].comp.setActive) {
            header.dataDiv.cells[j].comp.setActive(isEditable);
          }
        }
      }
    } else if (header.renderType && header.renderType.settings && header.renderType.settings["render_editchange"] && header.renderType.settings["render_editchange"] == true) {
      header.reRender();
    }
  }
  this.notifyChange(NotifyType.EDITABLE, this.editable);
};
GridComp.prototype.setShowTree = function(showTree) {
  if (this.showTree != showTree) {
    this.showTree = showTree;
    this.model.showTree = this.showTree;
    this.model.rows = null;
    this.model.initUIRows();
    this.setModel(this.model);
    this.notifyChange("showTree", this.showTree);
  }
};
GridComp.prototype.setMultiSelect = function(isMultiSelWithBox) {
  if (isMultiSelWithBox == this.isMultiSelWithBox) return;
  this.isMultiSelWithBox = isMultiSelWithBox;
  if (this.isMultiSelWithBox == false) {
    var ds = this.model.dataset;
    ds.setAllRowUnSelected();
    ds.setRowSelected(0);
  }
  if (this.showForm) {
    this.paintFormData();
  } else {
    this.paintData();
  }
};
GridComp.prototype.setActive = function(isActive) {
  this.isGridActive = getBoolean(isActive, true);
  this.notifyChange(NotifyType.ENABLE, isActive);
};
GridComp.prototype.setSumCellValue = function(colIndex, keyName, sumValue) {
  if (this.model) {
    this.model.setSumColValueByExecuteJs(colIndex, keyName, sumValue);
  }
};
GridComp.initEditCompsForGrid = function(gridId) {
  var oThis = window.objects[gridId];
  if (oThis == null) return;
  if (!oThis.editable) return;
  if (oThis.compsInited) return;
  oThis.compsInited = true;
  var stringInited = false;
  var textAreaInited = false;
  var integerInited = false;
  var decimalInited = false;
  var dateInited = false;
  var dateTimeInited = false;
  var boolInited = false;
  var yearInited = false;
  var monthInited = false;
  var yearmonthInited = false;
  var timeInited = false;
  var emailInited = false;
  var phoneInited = false;
  var linkInited = false;
  var moneyInited = false;
  var precentInited = false;
  var addressInited = false;
  var pwdInited = false;
  var basicHeaders = oThis.basicHeaders;
  if (oThis.compsMap == null) oThis.compsMap = new HashMap();
  for (var i = 0; i < basicHeaders.length; i++) {
    var comp = null;
    if (basicHeaders[i].editorType == EditorType.TEXTAREA && textAreaInited == false) {
      var maxLen = getInteger(basicHeaders[i].maxLength, "-1");
      comp = new TextAreaComp(document.body, "textArea", 0, 0, "", "", "absolute", false, "", "", "", "", "", {
        "maxSize": maxLen
      });
      oThis.compsMap.put(EditorType.TEXTAREA, comp);
      textAreaInited = true;
    } else if (basicHeaders[i].editorType == EditorType.INTEGERTEXT && integerInited == false) {
      comp = new IntegerTextComp(document.body, "integerText", 0, 0, "100%", "absolute", "", "", "");
      oThis.compsMap.put(EditorType.INTEGERTEXT, comp);
      integerInited = true;
    } else if (basicHeaders[i].editorType == EditorType.DECIMALTEXT && decimalInited == false) {
      comp = new FloatTextComp(document.body, "floatText", 0, 0, "100%", "absolute", "", "");
      oThis.compsMap.put(EditorType.DECIMALTEXT, comp);
      decimalInited = true;
    } else if (basicHeaders[i].editorType == EditorType.CHECKBOX && boolInited == false) {
      boolInited = true;
    } else if (basicHeaders[i].editorType == EditorType.DATETEXT && dateInited == false) {
      comp = new DateTextComp(document.body, "dateText", 0, 0, "100%", "absolute", {
        readOnly: false
      });
      oThis.compsMap.put(EditorType.DATETEXT, comp);
      dateInited = true;
    } else if (basicHeaders[i].editorType == EditorType.DATETIMETEXT && dateTimeInited == false) {
      comp = new DateTextComp(document.body, "dateText", 0, 0, "100%", "absolute", {
        readOnly: false,
        editMin: basicHeaders[i].editMin,
        editSec: basicHeaders[i].editSec
      });
      comp.setShowTimeBar(true);
      oThis.compsMap.put(EditorType.DATETIMETEXT, comp);
      dateTimeInited = true;
    } else if (basicHeaders[i].editorType == EditorType.YEARTEXT && yearInited == false) {
      comp = new YearTextComp(document.body, "yearText", 0, 0, "100%", "absolute", {
        readOnly: false
      });
      oThis.compsMap.put(EditorType.YEARTEXT, comp);
      yearInited = true;
    } else if (basicHeaders[i].editorType == EditorType.MONTHTEXT && monthInited == false) {
      comp = new MonthTextComp(document.body, "monthText", 0, 0, "100%", "absolute", {
        readOnly: false
      });
      oThis.compsMap.put(EditorType.MONTHTEXT, comp);
      monthInited = true;
    } else if (basicHeaders[i].editorType == EditorType.YEARMONTHTEXT && yearmonthInited == false) {
      comp = new YearMonthTextComp(document.body, "yearmonthText", 0, 0, "100%", "absolute", {
        readOnly: false
      });
      oThis.compsMap.put(EditorType.YEARMONTHTEXT, comp);
      yearmonthInited = true;
    } else if (basicHeaders[i].editorType == EditorType.TIMETEXT && timeInited == false) {
      comp = new TimeTextComp(document.body, "timeText", 0, 0, "100%", "absolute", {
        readOnly: false
      });
      oThis.compsMap.put(EditorType.TIMETEXT, comp);
      timeInited = true;
    } else if (basicHeaders[i].editorType == EditorType.COMBOBOX) {
      comp = new ComboComp(document.body, "COMBOBOX" + i, 0, 0, "100%", "absolute", true, {
        needNullOption: basicHeaders[i].needNullOption
      }, "");
      basicHeaders[i].comboComp = comp;
      comp.Div_gen.style.height = GridComp.ROW_HEIGHT + "px";
      if (basicHeaders[i].comboData != null) {
        comp.setComboData(basicHeaders[i].comboData);
      }
      var key = EditorType.COMBOBOX + i;
      oThis.compsMap.put(key, comp);
    } else if (basicHeaders[i].editorType == EditorType.LANGUAGECOMBOBOX) {
      var maxLen = getInteger(basicHeaders[i].maxLength, 20);
      var userObj = {
        "disabled": false,
        "readOnly": false,
        "dataDivHeight": "160",
        "inputAssistant": null,
        "maxSize": maxLen
      };
      var key = EditorType.LANGUAGECOMBOBOX + i;
      comp = new LanguageComboComp(document.body, key, 0, 0, "100%", "absolute", false, userObj, "", parseInt(oThis.currentLanguageCode) - 1, parseInt(oThis.defaultLangCode) - 1);
      if (basicHeaders[i].langugeComboDatas != null && typeof(basicHeaders[i].langugeComboDatas) != "undefined") {
        comp.setComboOptions(basicHeaders[i].langugeComboDatas);
      }
      basicHeaders[i].languageComboComp = comp;
      comp.Div_gen.style.height = GridComp.ROW_HEIGHT + "px";
      oThis.compsMap.put(key, comp);
    } else if (basicHeaders[i].editorType == EditorType.REFERENCE) {
      comp = new ReferenceTextComp(document.body, "Reference" + i, 0, 0, "100%", "absolute", {
        "viewURL": basicHeaders[i].viewURL
      }, basicHeaders[i].nodeInfo);
      comp.setBindInfo(oThis.model.dataset.id, basicHeaders[i].keyName, basicHeaders[i].pkField);
      comp.refGridId = oThis.id;
      comp.refGridHeaderId = basicHeaders[i].keyName;
      comp.widget = oThis.widget;
      var key = EditorType.REFERENCE + i;
      oThis.compsMap.put(key, comp);
    } else if (basicHeaders[i].editorType == EditorType.EMAILTEXT && emailInited == false) {
      comp = new EmailTextComp(document.body, "EmailText", 0, 0, "100%", "absolute", "", "");
      oThis.compsMap.put(EditorType.EMAILTEXT, comp);
      emailInited = true;
    } else if (basicHeaders[i].editorType == EditorType.PHONETEXT && phoneInited == false) {
      comp = new PhoneTextComp(document.body, "PhoneText", 0, 0, "100%", "absolute", "", "");
      oThis.compsMap.put(EditorType.PHONETEXT, comp);
      phoneInited = true;
    } else if (basicHeaders[i].editorType == EditorType.LINKTEXT && linkInited == false) {
      comp = new LinkTextComp(document.body, "LinkText", 0, 0, "100%", "absolute", {
        "target": basicHeaders[i].target,
        "imgPath": basicHeaders[i].imgPath,
        "linkType": basicHeaders[i].linkType
      }, "");
      oThis.compsMap.put(EditorType.LINKTEXT, comp);
      linkInited = true;
    } else if (basicHeaders[i].editorType == EditorType.MONEYTEXT) {
      comp = new MoneyTextComp(document.body, "MoneyText" + i, 0, 0, "100%", "absolute", "", "");
      oThis.compsMap.put(EditorType.MONEYTEXT + i, comp);
    } else if (basicHeaders[i].editorType == EditorType.PRECENTTEXT && precentInited == false) {
      comp = new PrecentTextComp(document.body, "PrecentText", 0, 0, "100%", "absolute", "", "");
      oThis.compsMap.put(EditorType.PRECENTTEXT, comp);
      precentInited = true;
    } else if (basicHeaders[i].editorType == EditorType.PWDTEXT && pwdInited == false) {
      comp = new PswTextComp(document.body, "pswText", 0, 0, "100%", "absolute", "", "");
      oThis.compsMap.put(EditorType.PWDTEXT, comp);
      pwdInited = true;
    } else if (stringInited == false) {
      comp = new StringTextComp(document.body, "text", 0, 0, "100%", "absolute", "", "");
      oThis.compsMap.put(EditorType.STRINGTEXT, comp);
      stringInited = true;
    }
    GridComp.addCompListener(oThis, comp, i);
  }
};
GridComp.addCompListener = function(grid, comp, colIndex) {
  if (comp != null) {
    comp.ingrid = true;
    comp.colIndex = colIndex;
    var compKeyListener = new Listener("onKeyDown");
    compKeyListener.func = function(keyEvent) {
      GridComp.compKeyDownFun(grid, keyEvent.event);
    };
    comp.addListener(compKeyListener);
    comp.hideV();
    if (IS_IE) {
      comp.onPaste = function(e) {
        if (typeof(grid.onPaste) == 'function') {
          var activeCell = grid.selectedCell;
          var colIndex = activeCell.colIndex;
          var filedName = grid.model.rows[0].getFiledNameByColIndex(colIndex);
          var rowIndex = activeCell.rowIndex;
          var data = null;
          if (window.clipboardData) data = window.clipboardData.getData("text");
          var result = grid.onPaste.call(grid, filedName, rowIndex, data);
          if (result == false) return false;
          else return true;
        } else {
          return true;
        }
      };
    }
    var textListener = new Listener("valueChanged");
    textListener.func = function(valueChangeEvent) {
      GridComp.compValueChangeFun(grid, valueChangeEvent);
    };
    comp.addListener(textListener);
    var compFocusListener = new Listener("onBlur");
    compFocusListener.func = function(focusEvent) {
      GridComp.compBlurFun(grid, focusEvent);
      var obj = focusEvent.obj;
      if (comp.componentType == "EDITOR") {
        if (oThis.getFocusIndex() == -1) return;
        var index = oThis.dataset.nameToIndex(this.id);
        if (index == -1) return;
        var newValue = this.getValue();
        var oldValue = oThis.dataset.getValueAt(oThis.rowIndex, index);
        if (oldValue != newValue) {
          oThis.dataset.setValueAt(oThis.rowIndex, index, newValue);
        }
      } else {
        var selectRows = grid.getSelectedRows();
        if (typeof(selectRows) == 'undefined' || selectRows.length == 0) return;
        var selectRowIndexs = grid.getSelectedRowIndice();
        for (var i = 0; i < selectRows.length; i++) {
          var row = selectRows[i];
          if (typeof(row) == 'undefined') {
            continue;
          }
          var colIndex = comp.currColIndex;
          if (colIndex == -1) {
            continue;
          }
          var value = row.getCellValue(colIndex);
          var keyName = grid.basicHeaders[colIndex].keyName;
          var datasetColIndex = row.rowData.dataset.nameToIndex(keyName);
          var resultStr = checkDatasetCell(row.rowData.dataset, value, datasetColIndex, row);
          var cell = grid.basicHeaders[colIndex].dataDiv.cells[selectRowIndexs[i]];
          cell.errorMsg = resultStr;
          var warningIcon = cell.warningIcon;
          if (typeof(warningIcon) == 'undefined') {
            warningIcon = $ce("DIV");
            warningIcon.className = "cellwarning";
            cell.warningIcon = warningIcon;
            cell.style.position = "relative";
          }
          cell.appendChild(warningIcon);
          if (typeof(resultStr) == "string" && resultStr != "") {
            if (typeof(comp.setError) == 'function') {
              comp.setError(true);
            }
            if (typeof(comp.setErrorMessage) == 'function') {}
            if (typeof(comp.setErrorStyle) == 'function') {
              comp.setErrorStyle();
            }
            if (typeof(comp.setErrorPosition) == 'function') {
              var top = cell.offsetTop;
              if (grid.headerDiv && grid.headerDiv.offsetHeight) {
                top += grid.headerDiv.offsetHeight;
              }
              if (grid.outerDiv && grid.outerDiv.offsetTop > 0) {
                top += grid.outerDiv.offsetTop;
              }
              var left = compOffsetLeft(cell, document.body) + GridComp.CELL_LEFT_PADDING;
              comp.setErrorPosition(grid.wholeDiv, left, top - 31);
            }
            warningIcon.style.display = "block";
          } else {
            if (typeof(comp.setError) == 'function') {
              comp.setError(false);
            }
            if (typeof(comp.setErrorMessage) == 'function') {
              comp.setErrorMessage("");
            }
            if (typeof(comp.setNormalStyle) == 'function') {
              comp.setNormalStyle();
            }
            if (comp.componentType == "INTEGERTEXT") {
              if (typeof(comp.setErrorPosition) == 'function') {
                var top = cell.offsetTop;
                if (grid.headerDiv && grid.headerDiv.offsetHeight) {
                  top += grid.headerDiv.offsetHeight;
                }
                if (grid.outerDiv && grid.outerDiv.offsetTop > 0) {
                  top += grid.outerDiv.offsetTop;
                }
                var left = compOffsetLeft(cell, document.body) - cell.offsetWidth + GridComp.CELL_LEFT_PADDING + 29;
                comp.setErrorPosition(grid.wholeDiv, left, top - 31);
              }
            }
            warningIcon.style.display = "none";
          }
        }
      }
    };
    comp.addListener(compFocusListener);
  }
};
GridComp.compBlurFun = function(oThis, keyEvent) {
  var currCell = oThis.selectedCell;
  if (currCell) {
    var comp = keyEvent.obj;
    if (oThis.nextNeedActiveCell) {
      oThis.setCellSelected(oThis.nextNeedActiveCell);
      oThis.nextNeedActiveCell = null;
    }
  }
};
GridComp.compValueChangeFun = function(oThis, valueChangeEvent) {
  var currCell = oThis.selectedCell;
  if (currCell) {
    var comp = valueChangeEvent.obj;
    var newValue = valueChangeEvent.newValue;
    if ((comp.visible && comp.visible == true && comp.oldValue != newValue) || comp.componentType == "COMBOBOX") {
      var colIndex = currCell.colIndex;
      var compColIndex = comp.currColIndex;
      if (compColIndex != null && compColIndex != colIndex) return;
      var rowIndex = oThis.getCellRowIndex(currCell);
      if (comp.componentType == "COMBOBOX" && comp.colIndex != null && comp.colIndex != currCell.colIndex) colIndex = comp.colIndex;
      oThis.model.setValueAt(rowIndex, colIndex, newValue);
      oThis.onAfterEdit(rowIndex, colIndex, comp.oldValue, newValue);
    }
    if (comp.componentType == EditorType.LANGUAGECOMBOBOX.toUpperCase()) {
      var gridDs = oThis.model.dataset;
      var rowIndex = oThis.getCellRowIndex(currCell);
      var fieldId = valueChangeEvent.fieldId;
      var fieldId2 = valueChangeEvent.fieldId2;
      if (fieldId != null && typeof(fieldId) != "undefined") {
        var index = gridDs.nameToIndex(fieldId);
        gridDs.setValueAt(rowIndex, index, comp.getValue());
        if (valueChangeEvent.fieldId2 != "") {
          var languageDefaultIndex = gridDs.nameToIndex(fieldId2);
          gridDs.setValueAt(rowIndex, languageDefaultIndex, comp.getValue());
        }
      }
    }
  }
};
GridComp.compKeyDownFun = function(oThis, e) {
  e = EventUtil.getEvent();
  if ((e.lfwKey == 9 && e.shiftKey) || e.lfwKey == 9 || e.lfwKey == 13) {
    if (oThis.showComp.componentType == "REFERENCETEXT" && oThis.showComp.divIsShown == true) return;
    var activeCell = oThis.selectedCell;
    var nextActiveCell;
    if (oThis.editable) {
      nextActiveCell = oThis.getEditableCellByDirection(activeCell, 1);
      if (e.lfwKey == 9 && e.shiftKey) nextActiveCell = oThis.getEditableCellByDirection(activeCell, -1);
    }
    if (!IS_IE) {
      oThis.showComp.oldValue = null;
    }
    oThis.showComp.input.onblur();
    if ((e.lfwKey == 13) && !e.shiftKey && (nextActiveCell == null)) {
      oThis.hiddenComp();
      oThis.onLastCellEnter(e);
    }
    if (nextActiveCell != null) {
      if (activeCell.rowIndex == nextActiveCell.rowIndex) {
        oThis.hiddenComp();
        oThis.setCellSelected(nextActiveCell);
      } else if (activeCell.rowIndex != nextActiveCell.rowIndex) {
        oThis.model.setRowSelected(nextActiveCell.rowIndex);
        oThis.hiddenComp();
        oThis.setCellSelected(nextActiveCell);
      }
    }
    stopAll(e);
  } else if (e.lfwKey == 40) {
    if (oThis.showComp.componentType == "REFERENCETEXT" && oThis.showComp.divIsShown == true) return;
    var activeCell = oThis.selectedCell;
    var nextActiveCell;
    var rowIndex = oThis.getCellRowIndex(activeCell);
    var colIndex = activeCell.colIndex;
    if (oThis.model.dataset.editable == true && oThis.basicHeaders[colIndex].columEditable == true) {
      if (oThis.onBeforeEdit(rowIndex + 1, colIndex) == false) return;
    }
    oThis.showComp.input.onblur();
    var rowCount = oThis.basicHeaders[colIndex].dataDiv.children.length;
    if (rowIndex == rowCount - 1) {
      oThis.onLastCellEnter(e);
    } else {
      nextActiveCell = oThis.basicHeaders[colIndex].dataDiv.cells[rowIndex + 1];
      if (nextActiveCell) {
        oThis.model.setRowSelected(nextActiveCell.rowIndex);
        oThis.hiddenComp();
        oThis.setCellSelected(nextActiveCell);
      }
    }
  } else if (e.lfwKey == 38) {
    if (oThis.showComp.componentType == "REFERENCETEXT" && oThis.showComp.divIsShown == true) return;
    var activeCell = oThis.selectedCell;
    var nextActiveCell;
    var rowIndex = oThis.getCellRowIndex(activeCell);
    var colIndex = activeCell.colIndex;
    var rowCount = oThis.basicHeaders[colIndex].dataDiv.cells.length;
    if (oThis.model.dataset.editable == true && oThis.basicHeaders[colIndex].columEditable == true) {
      if (oThis.onBeforeEdit(rowIndex - 1, colIndex) == false) return;
    }
    oThis.showComp.input.onblur();
    nextActiveCell = oThis.basicHeaders[colIndex].dataDiv.cells[rowIndex - 1];
    if (nextActiveCell) {
      oThis.model.setRowSelected(nextActiveCell.rowIndex);
      oThis.hiddenComp();
      oThis.setCellSelected(nextActiveCell);
    }
  }
};
GridComp.compEnterFun = function(oThis) {
  var activeCell = oThis.selectedCell;
  var nextActiveCell = oThis.getEditableCellByDirection(activeCell, 1);
  if (nextActiveCell != null) {
    if (activeCell.rowIndex != nextActiveCell.rowIndex) oThis.model.setRowSelected(nextActiveCell.rowIndex);
    oThis.nextNeedActiveCell = nextActiveCell;
    oThis.hiddenComp();
  }
};
GridComp.prototype.getCellRowIndex = function(cell) {
  if (cell && cell.parentNode) {
    var nodes = cell.parentNode.childNodes;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i] == cell) return i;
    }
  }
  return 0;
};
GridComp.prototype.hiddenComp = function() {
  if (this.showComp != null) {
    this.showComp.hideV();
    if (typeof ComboComp != "undefined" && this.showComp instanceof ComboComp) {
      this.showComp.oldValue = null;
      this.showComp.selectedIndex = -1;
    }
    if (this.showComp.extend) this.showComp.destroySelf();
    this.showComp = null;
    this.currActivedCell = null;
  }
};
GridComp.prototype.getHeaderDefaultWidth = function(header) {
  if (header.parent != null) return null;
  var headerWidth = 0;
  if (header.children == null) headerWidth = header.width;
  else {
    var basicHeaders = header.basicHeaders;
    for (var j = 0, count = basicHeaders.length; j < count; j++) {
      if (basicHeaders[j].isHidden == false) headerWidth += basicHeaders[j].width;
    }
  }
  return headerWidth;
};
GridComp.prototype.addTableRow = function(tbody, posi) {
  if (posi == null || isNaN(posi)) posi = tbody.rows.length;
  tbody.insertRow(posi);
  return tbody.rows[posi];
};
GridComp.prototype.isDataDivVScroll = function() {
  return isDivVScroll(this.dataOuterDiv);
};
GridComp.prototype.isDataDivScroll = function() {
  return isDivScroll(this.dataOuterDiv);
};
GridComp.prototype.isVScroll = function() {
  if (this.flowmode) return false;
  var num = this.getRowsNum();
  if (num > 0) {
    if (num * this.rowHeight > this.constant.outerDivHeight - this.constant.headerHeight + 2) return true;
    else return false;
  } else if (num == 0) return false;
};
GridComp.prototype.isScroll = function() {
  var gridRealWidth = this.getDynamicTableDivRealWidth(true) + this.getDynamicTableDivRealWidth(false) + this.constant.rowNumHeaderDivWidth + 5;
  if (this.isMultiSelWithBox) gridRealWidth += GridComp.SELECTCOLUM_WIDTH;
  if (gridRealWidth > this.constant.outerDivWidth) return true;
  else return false;
};
GridComp.prototype.insertRow = function(row, index) {
  if (this.model == null) this.model = new GridCompModel();
  if (row == null || GridCompRow.prototype.isPrototypeOf(row)) return this.model.insertRow(row, index);
  else throw new Error("Row must be the instance of GridCompRow or null!");
};
GridComp.prototype.addRow = function(row) {
  if (this.model == null) this.model = new GridCompModel();
  if (row == null || GridCompRow.prototype.isPrototypeOf(row)) return this.model.addRow(row);
  else throw new Error("Row must be the instance of GridCompRow or null!");
};
GridComp.prototype.addRows = function(rows) {
  if (rows != null) {
    for (var i = 0; i < rows.length; i++) this.addRow(rows[i]);
  }
};
GridComp.prototype.fireRowInserted = function(index, level, parentRowIndex) {
  if (this.model.getRows().length > (index + 1)) {
    this.paintRows();
    return;
  }
  var gridHeight = this.constant.outerDivHeight;
  var areaHeight = 0;
  if (this.scroll) areaHeight = gridHeight - this.constant.headerHeight - GridComp.SCROLLBAE_HEIGHT;
  else areaHeight = gridHeight - this.constant.headerHeight;
  if (areaHeight < 0) areaHeight = 0;
  var basicHeaders = this.basicHeaders;
  var row = this.model.getRow(index);
  if (level != null) row.level = level + 1;
  this.setHeadersOffsetWidth();
  initLayoutMonitorState();
  this.addOneRow(row, index, this.dataOuterDiv.scrollLeft, this.rowHeight, this.model.getRowsCount(), parentRowIndex);
  this.clearHeadersOffsetWidth();
  if (this.scrollState) {
    $("#" + this.outerDivId).perfectScrollbar('updateAllandLeft', this.outerDivId);
  }
  executeLayoutMonitor();
};
GridComp.prototype.andLineStateAndColNum = function(rowCount, index, rowHeight, row) {
  var isOdd = this.isOdd(index);
  if (this.isShowNumCol) {
    var $n = $ce("div");
    $n.className = isOdd ? "gridcell_odd" : "gridcell_even";
    var style = $n.style;
    $n.id = "numline" + index;
    $n.rowIndex = index;
    style.height = (rowHeight - GridComp.CELL_BOTTOM_BORDER_WIDTH) + "px";
    style.lineHeight = (rowHeight - GridComp.CELL_BOTTOM_BORDER_WIDTH) + "px";
    $n.innerHTML = "<center>" + (index + 1) + "</center>";
    if (typeof(this.rowNumDiv.cells[index]) == "undefined") {
      this.rowNumDiv.appendChild($n);
    } else {
      this.rowNumDiv.insertBefore($n, this.rowNumDiv.cells[index]);
    }
  }
  var $l = $ce("div");
  $l.className = "row_state_div";
  var stl = $l.style;
  stl.height = rowHeight - GridComp.CELL_BOTTOM_BORDER_WIDTH + "px";
  if (this.lineStateColumDiv.childNodes.length == index) this.lineStateColumDiv.appendChild($l);
  else this.lineStateColumDiv.insertBefore($l, this.lineStateColumDiv.childNodes[index]);
  if (this.isShowNumCol) {
    this.rowNumDiv.cells.splice(index, 0, $n);
    var len = this.rowNumDiv.cells.length;
    for (var i = index + 1; i < len; i++) {
      if (typeof(this.rowNumDiv.cells[i]) != "undefined") {
        this.rowNumDiv.cells[i].rowIndex = i;
        this.rowNumDiv.cells[i].innerHTML = "<center>" + (i + 1) + "</center>";
      }
    }
  }
  this.lineStateColumDiv.cells.splice(index, 0, $l);
  if (row.rowData.state == DatasetRow.STATE_NEW) this.lineStateColumDiv.cells[index].className = "row_state_div row_add_state";
  else this.lineStateColumDiv.cells[index].className = "row_state_div";
};
GridComp.prototype.setCheckBoxChecked = function(checked, rowIndex) {
  if (this.groupHeaderIds.length > 0 && this.isMultiSelWithBox == true && this.isGroupWithCheckbox == true) {
    var groupRowIds = this.model.rows[rowIndex].groupRowIds;
    if (groupRowIds != null) {
      for (var i = groupRowIds.length - 1; i >= 0; i--) {
        var index = this.model.getRowIndexById(groupRowIds[i]);
        if (index != -1) {
          if (checked == true) {
            this.model.addRowSelected(index);
          } else {
            this.model.setRowUnSelected(index);
          }
        }
      }
    }
  } else {
    if (checked == true) {
      if (this.isCheckingParent != null && this.isCheckingParent == true) return;
      this.expandAndSeclectNodesByRowIndex(rowIndex);
      if (this.model.treeLevel != null && this.checkBoxModel == 2) {
        this.isCheckingParent = true;
        var pIndex = this.model.getParentRowIndex(rowIndex);
        while (pIndex != null && pIndex != -1) {
          this.model.addRowSelected(pIndex);
          pIndex = this.model.getParentRowIndex(pIndex);
        }
        this.isCheckingParent = false;
      }
      this.rowSelected(rowIndex);
      this.setFocusIndex(rowIndex);
    } else {
      this.unselectNodesByRowIndex(rowIndex);
      this.setFocusIndex(rowIndex);
    }
  }
};
GridComp.prototype.addOneRow = function(row, index, scrollLeft, rowHeight, rowCount, parentRowIndex) {
  if (this.noRowsDiv) {
    this.noRowsDiv.style.display = "none";
    this.dynamicColumDataDiv.style.marginBottom = "0px";
    this.dataOuterDiv.style.overflow = "hidden";
    this.dataOuterDiv.style.display = "block";
  }
  var isOdd = this.isOdd(index);
  var tempHeaders = [];
  var fixedheaderWidth = this.constant.fixedHeaderDivWidth;
  var scrollTop = 0;
  var oThis = this;
  if (this.firstVScroll == false) {
    if (this.isVScroll()) {
      var barWidth = GridComp.SCROLLBAE_HEIGHT;
      var dynHeaderWidth = this.constant.outerDivWidth - fixedheaderWidth - barWidth - 1 + scrollLeft;
      if (dynHeaderWidth > 0) this.dynamicHeaderDiv.style.width = dynHeaderWidth + "px";
      this.dynamicHeaderDiv.defaultWidth = dynHeaderWidth;
      this.headerDiv.defaultWidth = this.constant.outerDivWidth - barWidth - 1;
      this.firstVScroll = true;
    }
  }
  this.andLineStateAndColNum(rowCount, index, rowHeight, row);
  var checkDiv = null;
  var checkBox = null;
  if (this.isMultiSelWithBox) {
    checkDiv = $ce("div");
    checkDiv.className = isOdd ? "fixed_selectcolum_checkbox_div_odd" : "fixed_selectcolum_checkbox_div_even";
    checkDiv.editorType = "CheckBox";
    checkDiv.style.left = "0px";
    checkDiv.style.width = GridComp.SELECTCOLUM_WIDTH + "px";
    checkDiv.style.height = rowHeight - GridComp.CELL_BOTTOM_BORDER_WIDTH + "px";
    checkDiv.style.lineHeight = rowHeight - GridComp.CELL_BOTTOM_BORDER_WIDTH + "px";
    checkBox = $ce("INPUT");
    checkBox.type = "checkbox";
    checkBox.style.marginTop = "5px";
    checkDiv.appendChild(checkBox);
    this.selectColumDiv.appendChild(checkDiv);
    if (this.selectColumDiv.childNodes.length == index) this.selectColumDiv.appendChild(checkDiv);
    else this.selectColumDiv.insertBefore(checkDiv, this.selectColumDiv.childNodes[index]);
    checkBox.checked = this.model.isRowSelected(index);
    checkBox.onmousedown = function(e) {
      oThis.selectedCell = null;
      oThis.oldCell = null;
      var rowIndex = oThis.getCellRowIndex(this.parentNode);
      if (oThis.model.rows[rowIndex].loadImg && oThis.model.rows[rowIndex].loadImg.plus == true) {
        this.tempChecked = this.checked;
        oThis.setCheckBoxChecked(!this.checked, rowIndex);
      } else {
        oThis.setCheckBoxChecked(!this.checked, rowIndex);
      }
      oThis.hiddenComp();
    };
    checkBox.onclick = function(e) {
      e = EventUtil.getEvent();
      stopDefault(e);
      stopEvent(e);
      clearEventSimply(e);
    };
    this.selectColumDiv.cells.splice(index, 0, checkDiv);
  }
  var dynHeaderLen = this.defaultDynamicHeaders.length;
  var lastHeader = this.getLastDynamicVisibleHeader();
  var firstHeader = this.getFirstDynamicVisibleHeader();
  var rowsCount = this.model.getRowsCount();
  if (this.rowCells == null) var rowCells = new Array();
  for (var i = 0; i < this.model.basicHeaders.length; i++) {
    var header = this.model.basicHeaders[i];
    header.parentRowIndex = parentRowIndex;
    if (header.isHidden == true) continue;
    var cell = $ce("div");
    rowCells.push(cell);
    cell.rowIndex = index;
    if (row.level != null) cell.level = row.level;
    if (row.hasChildren && row.hasChildren != null) cell.hasChildren = row.hasChildren;
    cell.colIndex = i;
    cell.editorType = header.editorType;
    cell.className = isOdd ? "gridcell_odd" : "gridcell_even";
    cell.onmouseover = function() {
      oThis.showTipMessage(this);
      oThis.gridRowMouseOver(this);
    };
    cell.onmouseout = function() {
      oThis.hideTipMessage();
      oThis.gridRowMouseOut(this);
    };
    var cellStyle = cell.style;
    cellStyle.width = "100%";
    if (this.autoRowHeight == false) {
      cellStyle.height = rowHeight - GridComp.CELL_BOTTOM_BORDER_WIDTH + "px";
    } else {
      var minHeight = rowHeight - GridComp.CELL_BOTTOM_BORDER_WIDTH;
      cellStyle.minHeight = minHeight + "px";
      if (minHeight > this.rowMinHeight[index] || typeof(this.rowMinHeight[index]) == "undefined") {
        this.rowMinHeight[index] = minHeight;
      }
      this.defaultRowMinHeight[index] = minHeight;
    }
    cellStyle.lineHeight = rowHeight - GridComp.CELL_BOTTOM_BORDER_WIDTH + "px";
    cellStyle.paddingLeft = GridComp.CELL_LEFT_PADDING + "px";
    cellStyle.paddingRight = GridComp.CELL_RIGHT_PADDING + "px";
    if (header.textAlign == "") {
      setTextAlign = "left";
    } else {
      setTextAlign = header.textAlign;
    }
    if (typeof(header.dataType) == "string") {
      switch (header.dataType) {
        case "UFDateTime":
        case "UFDate":
        case "UFTime":
        case "Date":
        case "ShortDate":
        case "Boolean":
        case "boolean":
        case "UFBoolean":
          cellStyle.textAlign = "center";
          break;
        case "Integer":
          if (header.editorType && header.editorType == "ComboBox") {
            cell.style.textAlign = "left";
            break;
          }
        case "int":
        case "Double":
        case "double":
        case "UFDouble":
        case "Float":
        case "float":
        case "BigDecimal":
        case "Decimal":
        case "Long":
        case "long":
          cellStyle.textAlign = "right";
          break;
        default:
          cellStyle.textAlign = setTextAlign;
          break;
      }
    } else {
      cellStyle.textAlign = setTextAlign;
    }
    if (parentRowIndex != null) {
      cell.parentCell = header.dataDiv.childNodes[parentRowIndex];
    }
    if (header.dataDiv != null) {
      if (header.dataDiv.childNodes.length == index) {
        header.dataDiv.appendChild(cell);
      } else {
        header.dataDiv.insertBefore(cell, header.dataDiv.childNodes[index]);
      }
    }
    if (header.dataDivWidth != null && header.dataDivWidth > 0) {
      cellStyle.width = (header.dataDivWidth - GridComp.CELL_LEFT_PADDING - GridComp.CELL_RIGHT_PADDING) + "px";
    } else if (header.dataDiv && header.dataDiv.offsetWidth > 0) {
      cellStyle.width = (header.dataDiv.offsetWidth - GridComp.CELL_LEFT_PADDING - GridComp.CELL_RIGHT_PADDING) + "px";
    } else if (header.width && header.width > 0) {
      cellStyle.width = (header.width - GridComp.CELL_LEFT_PADDING - GridComp.CELL_RIGHT_PADDING) + "px";
    }
    var newGroupBegin = false;
    var newGroupEnd = false;
    if (header.isGroupBy == true) {
      if (header.keyName == this.groupHeaderIds[0]) {
        if ((index > 0 && row.getCellValue(i) != this.model.rows[index - 1].getCellValue(i)) || index == 0) {
          newGroupBegin = true;
          this.model.newGroupRow = this.model.rows[index];
          this.model.rows[index].groupRowIds = new Array();
          var rowId = this.model.rows[index].rowData.rowId;
          this.model.rows[index].groupRowIds.push(rowId);
        }
      } else {
        if (index == 0 || (row.getCellValue(i) != this.model.rows[index - 1].getCellValue(i)) || this.isCurrCellNeedNewGroup(row, index, i)) newGroupBegin = true;
      }
      if ((index <= (this.model.rows.length - 2) && row.getCellValue(i) != this.model.rows[index + 1].getCellValue(i)) || index == this.model.rows.length - 1) {
        newGroupEnd = true;
      }
    }
    if (header.isFixedHeader == false) {
      if (header.children == null) {
        if (dynHeaderLen > 0 && header != firstHeader && header != lastHeader) {} else {
          if (dynHeaderLen > 0 && header == lastHeader) {
            if (header.isGroupBy) {} else {
              if (header.dataDivWidth != null && header.dataDivWidth > 0) cellStyle.width = (header.dataDivWidth - GridComp.CELL_LEFT_PADDING - GridComp.CELL_RIGHT_PADDING - 1) + "px";
              else if (header.dataDiv && header.dataDiv.offsetWidth > 0) {
                cellStyle.width = (header.dataDiv.offsetWidth - GridComp.CELL_LEFT_PADDING - GridComp.CELL_RIGHT_PADDING - 1) + "px";
              } else if (header.width && header.width > 0) {
                cellStyle.width = (header.width - GridComp.CELL_LEFT_PADDING - GridComp.CELL_RIGHT_PADDING - 1) + "px";
              }
              var bottomWidth = getStyleAttribute(cell, "border-bottom-width");
              var bottomStyle = getStyleAttribute(cell, "border-bottom-style");
              var bottomColor = getStyleAttribute(cell, "border-bottom-color");
              if (bottomWidth) cell.style.borderRightWidth = bottomWidth;
              if (bottomStyle) cell.style.borderRightStyle = bottomStyle;
              if (bottomColor) cell.style.borderRightColor = bottomColor;
              cell.style.borderRightColor = "#D1DFE4";
              cell.style.borderRightStyle = "solid";
              cell.style.borderRightWidth = "1px";
            }
          }
        }
      } else {
        if (dynHeaderLen > 0) {
          if (header != firstHeader && header != lastHeader) {
            cell.className = isOdd ? "gridcell_odd" : "gridcell_even";
          } else if (header == firstHeader) {
            cell.className = isOdd ? "gridcell_odd" : "gridcell_even";
            if (j == 0) {
              cell.style.borderLeft = "0";
            }
          } else if (header == lastHeader) {
            cell.className = isOdd ? "gridcell_odd" : "gridcell_even";
          }
        }
      }
    } else {
      if (header.children == null) {
        cell.className = isOdd ? "fixed_gridcell_odd" : "fixed_gridcell_even";
      } else {
        cell.className = "fixed_colum_grid_cell";
      }
    }
    if (!header.isGroupBy) {
      this.renderCell(header.renderType, index, i, row.getCellValue(i), header, cell, parentRowIndex);
    } else if (header.isGroupBy == true) {
      var realValue = null;
      if (newGroupBegin) {
        realValue = row.getCellValue(i);
      }
      this.renderCell(header.renderType, index, i, realValue, header, cell, parentRowIndex);
      if (checkDiv != null && checkBox != null && this.isGroupWithCheckbox) {
        if (!newGroupBegin) {
          if (header.keyName == this.groupHeaderIds[0]) {
            checkDiv.removeChild(checkBox);
            var rowId = this.model.rows[index].rowData.rowId;
            this.model.newGroupRow.groupRowIds.push(rowId);
          }
        }
      }
      if (!newGroupEnd) {
        var bottomColor = getStyleAttribute(cell, "background-color");
      } else {
        if (index != 0) {
          var preCell = this.basicHeaders[i].dataDiv.cells[index - 1];
          if (preCell.style.borderBottomColor == null || preCell.style.borderBottomColor == "") {
            var bottomColor = getStyleAttribute(preCell, "background-color");
          }
        }
      }
      if (!newGroupBegin) {
        if (index != 0) {
          var preCell = this.basicHeaders[i].dataDiv.cells[index - 1];
          preCell.style.borderBottomColor = "#ffffff";
          preCell.style.backgroundColor = "#ffffff";
        }
        cell.style.backgroundColor = "#ffffff";
      }
    }
    if (header.columBgColor != null && header.columBgColor != "" && cell.style.backgroundColor != "#ffffff") {
      cellStyle.backgroundColor = header.columBgColor;
    }
    if (header.textColor != null && header.textColor != "") {
      cellStyle.color = header.textColor;
    }
    if (header.dataDiv != null && header.dataDiv.cells != null) header.dataDiv.cells.splice(index, 0, cell);
    if (this.autoRowHeight == true) {
      this.adjustRowHeight(index, cell);
    }
  }
  this.rowRender.render.call(this, row, rowCells);
  if (this.isMultiSelWithBox) {
    if (this.model.isRowSelected(index) == true) this.rowSelected(index);
  }
};
GridComp.prototype.renderCell = function(render, rowIndex, colIndex, value, header, cell, parentRowIndex) {
  if (typeof value == "string") {
    value = value.replace(/\&/g, "&amp;");
    value = value.replace(/\</g, "&lt;");
  }
  render.render.call(this, rowIndex, colIndex, value, header, cell, parentRowIndex);
  if (header.required && this.editable == true && header.columEditable == true) {
    var length = cell.children.length;
    if (length > 0) {
      for (var count = length - 1; count >= 0; count--) {
        if (cell.children[count]) {
          if (cell.children[count].tagName.toUpperCase() == 'SPAN' && cell.children[count].className.toLowerCase() == 'requiredstyle') {
            cell.removeChild(cell.children[count]);
            break;
          }
        }
      }
    }
    if (isNull(value)) {
      var requiredStar = $ce("span");
      requiredStar.className = "requiredstyle";
      requiredStar.innerHTML = "*";
      cell.appendChild(requiredStar);
    }
  }
};
GridComp.prototype.setTipSticky = function() {
  this.tipSticky = true;
};
GridComp.prototype.hideTipMessage = function(force) {
  if (!this.tipSticky || force) {
    if (GridComp.tipDiv) GridComp.tipDiv.style.display = "none";
  }
  if (this.tipRt) clearTimeout(this.tipRt);
};
GridComp.prototype.showTipMessage = function(cell) {
  if (IS_IPAD) return;
  if (this.tipRt != null) clearTimeout(this.tipRt);
  var title = cell.tip;
  if (title == null || title == "") return;
  if (cell.editorType != null && (cell.editorType == "CheckBox" || cell.editorType == "PwdText")) return;
  var left = compOffsetLeft(cell, document.body) + 1;
  var top = compOffsetTop(cell, document.body) - compScrollTop(cell, document.body) + GridComp.ROW_HEIGHT;
  var width = (cell.offsetWidth - 2) + "px";
  this.tipRt = setTimeout(function() {
    GridComp.doShowTipMessage(left, top, width, encodeURIComponent(title));
  }, 500);
};
GridComp.doShowTipMessage = function(left, top, width, title) {
  var div = GridComp.tipDiv;
  if (GridComp.tipDiv == null) {
    div = $ce("DIV");
    div.className = "tip_message";
    div.style.zIndex = getZIndex();
    GridComp.tipDiv = div;
    document.body.appendChild(div);
    GridComp.popwindow(div);
  }
  div.style.display = "";
  div.style.left = left + "px";
  div.style.top = (top - 7) + "px";
  div.centerDiv.innerHTML = decodeURIComponent(title);
  var height = getTextHeight(title);
};
GridComp.popwindow = function(parentDiv) {
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
  var rightCenterDiv = $ce("DIV");
  rightCenterDiv.className = 'right_center_div';
  var leftBottomDiv = $ce("DIV");
  leftBottomDiv.className = 'left_bottom_div';
  var centerBottomDiv = $ce("DIV");
  centerBottomDiv.className = 'center_bottom_div';
  var rightBottomDiv = $ce("DIV");
  rightBottomDiv.className = 'right_bottom_div';
  parentDiv.appendChild(centerDiv);
  parentDiv.appendChild(leftTopDiv);
  parentDiv.appendChild(centerTopDiv);
  parentDiv.appendChild(rightTopDiv);
  parentDiv.appendChild(leftCenterDiv);
  parentDiv.appendChild(rightCenterDiv);
  parentDiv.appendChild(leftBottomDiv);
  parentDiv.appendChild(centerBottomDiv);
  parentDiv.appendChild(rightBottomDiv);
  parentDiv.centerDiv = centerDiv;
};
GridComp.prototype.setHeadersOffsetWidth = function() {
  var headers = this.model.getHeaders();
  for (var i = 0, n = headers.length; i < n; i++) {
    var header = headers[i];
    if (header.dataDiv != null) {
      header.dataDivWidth = header.dataDiv.offsetWidth;
      var basicHeaders = header.basicHeaders;
      if (basicHeaders != null) {
        for (var j = 0, m = basicHeaders.length; j < m; j++) {
          var basicHeader = basicHeaders[j];
          basicHeader.dataDivWidth = basicHeader.dataDiv.offsetWidth;
        }
      }
    }
  }
  if (this.selectColumDiv) this.selectColumDiv.divWidth = this.selectColumDiv.offsetWidth;
};
GridComp.prototype.clearHeadersOffsetWidth = function() {
  var headers = this.model.getHeaders();
  for (var i = 0, n = headers.length; i < n; i++) {
    var header = headers[i];
    header.dataDivWidth = null;
    var basicHeaders = header.basicHeaders;
    if (basicHeaders != null) {
      for (var j = 0, m = basicHeaders.length; j < m; j++) {
        basicHeaders[j].dataDivWidth = null;
      }
    }
  }
  if (this.selectColumDiv) this.selectColumDiv.divWidth = null;
};
GridComp.prototype.gridRowMouseOver = function(cell) {
  if (IS_IE9) return;
  var rowIndex = this.getCellRowIndex(cell);
  if (rowIndex == this.getFocusIndex()) {
    return;
  }
  for (var i = 0, headerLength = this.basicHeaders.length; i < headerLength; i++) {
    var header = this.basicHeaders[i];
    if (header.isHidden == false) {
      if (header.dataDiv != null && header.dataDiv.cells != null) var tempCell = header.dataDiv.cells[rowIndex];
      if (tempCell != null) {
        if (!tempCell.isErrorCell) {
          var isOdd = this.isOdd(rowIndex);
          if (!(typeof(tempCell.className) == 'string' && tempCell.className.indexOf("cell_select") != -1)) {
            tempCell.oldClassName = tempCell.className;
            tempCell.className = isOdd ? "gridcell_odd gridcell_mouseover" : "gridcell_even gridcell_mouseover";
          }
        }
      }
    }
  }
};
GridComp.prototype.gridRowMouseOut = function(cell) {
  if (IS_IE9) return;
  var rowIndex = this.getCellRowIndex(cell);
  if (rowIndex == this.getFocusIndex()) {
    for (var i = 0, headerLength = this.basicHeaders.length; i < headerLength; i++) {
      var header = this.basicHeaders[i];
      if (header.isHidden == false) {
        if (header.dataDiv != null && header.dataDiv.cells != null) var tempCell = header.dataDiv.cells[rowIndex];
        if (tempCell != null) {
          if (!tempCell.isErrorCell) {
            tempCell.className = tempCell.className.replace(" gridcell_mouseover", "");
          }
        }
      }
    }
    return;
  }
  var selectedRowIndice = this.getSelectedRowIndice();
  if (selectedRowIndice && selectedRowIndice.indexOf(rowIndex) != -1) {
    this.rowSelected(rowIndex);
    return;
  }
  for (var i = 0, headerLength = this.basicHeaders.length; i < headerLength; i++) {
    var header = this.basicHeaders[i];
    if (header.isHidden == false) {
      if (header.dataDiv && header.dataDiv.cells) var tempCell = header.dataDiv.cells[rowIndex];
      if (tempCell != null) {
        if (!tempCell.isErrorCell) {
          tempCell.className = tempCell.oldClassName;
        }
      }
    }
  }
};
GridComp.prototype.isCurrCellNeedNewGroup = function(row, rowIndex, curGroupColIndex) {
  var indice = this.groupHeaderColIndice;
  if (indice != null && indice.length > 0) {
    var startIndex = indice.indexOf(curGroupColIndex) - 1;
    for (var i = startIndex; i >= 0; i--) {
      if ((row.getCellValue(indice[i]) != this.model.rows[rowIndex - 1].getCellValue(indice[i]))) return true;
    }
    return false;
  } else return false;
};
GridComp.prototype.scrollToSelectedRow = function(index) {
  this.selectedCell = null;
  this.hiddenComp();
  var displayCont = this.calcuDisplayRowNum();
  var displayContTop = displayCont[0] + 2;
  var displayContBottom = displayCont[1] - 2;
  var sRowH = index * this.rowHeight;
  if (sRowH < displayContTop * this.rowHeight) this.setScrollTop(parseFloat(this.dataOuterDiv.scrollTop) - (displayContTop * this.rowHeight - sRowH));
  else if (sRowH > displayContBottom * this.rowHeight) this.setScrollTop(parseFloat(this.dataOuterDiv.scrollTop) + (sRowH - displayContTop * this.rowHeight));
  displayCont = this.calcuDisplayRowNum();
  displayContTop = displayCont[0];
  displayContBottom = displayCont[1];
};
GridComp.prototype.nameToIndex = function(key) {
  for (var i = this.basicHeaders.length - 1; i >= 0; i--) {
    if (this.basicHeaders[i].keyName == key) return i;
  }
  return -1;
};
GridComp.prototype.getSelectedRowIndice = function() {
  if (this.isMultiSelWithBox == false) return this.selectedRowIndice;
  else {
    if (this.model.dataset != null) return this.model.getSelectedIndices();
  }
};
GridComp.prototype.getSelectedRows = function() {
  if (this.isMultiSelWithBox == false) {
    if (this.selectedRowIndice != null && this.selectedRowIndice.length > 0) return [this.getRow(this.selectedRowIndice[0])];
  } else return this.model.getSelectedRows();
};
GridComp.prototype.rowSelected = function(rowIndex, isAddSel) {
  if (isAddSel == null) {
    if (this.selectedRowIndice != null && this.selectedRowIndice.length > 0) {
      if (!this.isMultiSelWithBox && this.selectedRowIndice[0] != -1) {
        for (var i = 0, headerLength = this.basicHeaders.length; i < headerLength; i++) {
          var header = this.basicHeaders[i];
          if (header.isHidden == false) {
            var selIndex = this.selectedRowIndice[0];
            var isOdd = this.isOdd(selIndex);
            if (header.dataDiv && header.dataDiv.cells) var seleCell = header.dataDiv.cells[selIndex];
            if (seleCell != null) {
              if (seleCell.isErrorCell) {
                if (header.isFixedHeader) seleCell.className = isOdd ? "fixed_gridcell_odd cell_error" : "fixed_gridcell_even cell_error";
                else seleCell.className = isOdd ? "gridcell_odd cell_error" : "gridcell_even cell_error";
              } else {
                if (header.isFixedHeader) seleCell.className = isOdd ? "fixed_gridcell_odd" : "fixed_gridcell_even";
                else seleCell.className = isOdd ? "gridcell_odd" : "gridcell_even";
              }
            }
          }
        }
      }
    } else {
      this.selectedRowIndice = new Array();
    }
    this.changeCurrSelectedRowStyle(rowIndex);
    if (this.isMultiSelWithBox) {
      if (this.selectedRowIndice.length > 0) {
        var node = this.lineStateColumDiv.cells[this.selectedRowIndice[0]];
        if (node != null && node.className == "row_state_div row_normal_state") node.className = "row_state_div";
        var curNode = this.lineStateColumDiv.cells[rowIndex];
        if (curNode != null && curNode.className != "row_state_div row_delete_state") curNode.className = "row_state_div row_normal_state";
      }
    } else {
      var node = this.lineStateColumDiv.cells[rowIndex];
      if (node != null && node.className != "row_state_div row_update_state" && node.className != "row_state_div row_add_state" && node.className != "row_state_div row_delete_state") node.className = "row_state_div row_normal_state";
    }
    this.changeSelectedCellStyle(rowIndex);
    if (this.selectedCell != null && this.currActivedCell != null && (this.currActivedCell != this.selectedCell)) {
      if (this.selectedCell.rowIndex == rowIndex) this.selectedCell.className = "cell_select";
      else {
        var isOdd = this.isOdd(rowIndex);
        var header = this.basicHeaders[this.selectedCell.colIndex];
        if (header.isFixedHeader) this.selectedCell.className = isOdd ? "fixed_gridcell_odd" : "fixed_gridcell_even";
        else this.selectedCell.className = isOdd ? "gridcell_odd" : "gridcell_even";
      }
    }
    if (!this.isMultiSelWithBox) {
      this.selectedRowIndice[0] = rowIndex;
    } else {
      var isExist = false;
      for (var i = 0; i < this.selectedRowIndice.length; i++) {
        if (this.selectedRowIndice[i] == rowIndex) {
          isExist = true;
        }
      }
      if (!isExist) {
        this.selectedRowIndice.push(rowIndex);
      }
    }
  } else if (isAddSel) {
    if (this.selectedRowIndice == null) this.selectedRowIndice = [];
    this.changeCurrSelectedRowStyle(rowIndex);
    this.changeSelectedCellStyle(rowIndex);
    this.selectedRowIndice.push(rowIndex);
  }
  if (this.isMultiSelWithBox == false) this.onRowSelected(rowIndex);
};
GridComp.prototype.changeCurrSelectedRowStyle = function(rowIndex) {
  for (var i = 0, headerLength = this.basicHeaders.length; i < headerLength; i++) {
    var header = this.basicHeaders[i];
    if (header.isHidden == false) {
      if (header.dataDiv && header.dataDiv.cells) var tempCell = header.dataDiv.cells[rowIndex];
      if (tempCell != null) {
        if (!tempCell.isErrorCell) {
          var isOdd = this.isOdd(rowIndex);
          if (header.isFixedHeader) tempCell.className = isOdd ? "fixed_gridcell_odd cell_select" : "fixed_gridcell_even cell_select";
          else tempCell.className = isOdd ? "gridcell_odd cell_select" : "gridcell_even cell_select";
        }
      }
    }
  }
};
GridComp.prototype.changeSelectedCellStyle = function(rowIndex) {
  if (!this.isMultiSelWithBox && this.selectedCell != null && !this.selectedCell.isErrorCell) {
    var isOdd = this.isOdd(rowIndex);
    var header = this.basicHeaders[this.selectedCell.colIndex];
    if (header == null) return;
    if (header.isFixedHeader) this.selectedCell.className = isOdd ? "fixed_gridcell_odd cell_focus" : "fixed_gridcell_even cell_focus";
    else this.selectedCell.className = isOdd ? "gridcell_odd cell_focus" : "gridcell_even cell_focus";
  }
};
GridComp.prototype.getRows = function(indice) {
  if (indice == null || !(indice instanceof Array)) return null;
  var rows = new Array();
  for (var i = 0; i < indice.length; i++) rows.push(this.model.getRow(indice[i]));
  return rows;
};
GridComp.prototype.getRow = function(index) {
  if (index == null) return null;
  var tempIndex = parseInt(index);
  return this.getRows([tempIndex])[0];
};
GridComp.prototype.getDatasetRow = function(uiRowIndex) {
  var row = this.getRow(uiRowIndex);
  if (row != null) return row.rowData;
  return null;
};
GridComp.prototype.fireRowDeleted = function(indice) {
  if (this.outerDiv.offsetWidth == 0) {
    this.needPaintRows = true;
    return;
  };
  var gridWidth = this.constant.outerDivWidth;
  for (var i = 0, count = indice.length; i < count; i++) {
    if (this.currActivedCell != null && this.getCellRowIndex(this.currActivedCell) == indice[i]) this.hiddenComp();
    this.deleteRows([indice[i]]);
  }
  this.oldCell = null;
};
GridComp.prototype.deleteSeletedRow = function() {
  var selectedRowIndice = this.getSelectedRowIndice();
  if (selectedRowIndice != null && selectedRowIndice.length > 0) {
    this.model.deleteRows(selectedRowIndice);
    this.selectedRowIndice = null;
  }
};
GridComp.prototype.deleteRows = function(indice) {
  if (this.getRowsNum() == 0) {
    this.setScrollLeft(0);
  }
  initLayoutMonitorState();
  if (indice == null || indice.length <= 0) return;
  var deleCount = indice.length;
  indice.sort(ascendRule_int);
  var len = this.basicHeaders.length;
  if (this.isShowNumCol) {
    for (var i = 0; i < deleCount; i++) {
      if (this.rowNumDiv.childNodes.length - 1 >= 0) {
        var node = this.rowNumDiv.cells[indice[i]];
        if (node != null) {
          this.rowNumDiv.removeChild(node);
        }
        this.rowNumDiv.cells.splice(indice[i], 1);
      }
    }
    var cellLen = this.rowNumDiv.cells.length;
    for (var i = 0; i < cellLen; i++) {
      if (typeof(this.rowNumDiv.cells[i]) != "undefined") {
        this.rowNumDiv.cells[i].rowIndex = i;
        this.rowNumDiv.cells[i].innerHTML = "<center>" + (i + 1) + "</center>";
      }
      if (typeof(this.rowNumDiv.childNodes[i]) != "undefined") {
        this.rowNumDiv.childNodes[i].rowIndex = i;
        this.rowNumDiv.childNodes[i].innerHTML = "<center>" + (i + 1) + "</center>";
      }
    }
  }
  for (var i = 0; i < deleCount; i++) {
    if (this.lineStateColumDiv.childNodes.length - 1 >= 0) {
      var node = this.lineStateColumDiv.cells[indice[i]];
      if (node != null) {
        this.lineStateColumDiv.removeChild(node);
      }
      this.lineStateColumDiv.cells.splice(indice[i], 1);
    }
  }
  if (deleCount == 1) {
    var rowIndex = indice[0];
    var rowCount = this.model.getRowsCount();
    if (this.isMultiSelWithBox) {
      this.selectColumDiv.removeChild(this.selectColumDiv.cells[rowIndex]);
      this.selectColumDiv.cells.splice(rowIndex, 1);
    }
    for (var i = 0; i < len; i++) {
      if (this.basicHeaders[i].isHidden == false) {
        var dataDiv = this.basicHeaders[i].dataDiv;
        dataDiv.removeChild(dataDiv.cells[rowIndex]);
        dataDiv.cells.splice(rowIndex, 1);
        if (this.basicHeaders[i].isGroupBy == true) {
          this.afterDeleteChangeGroupCellStyle(rowIndex, i);
        }
      }
    }
    var signLen = this.model.getRowsCount();
    var cell = null;
    var seleCheck = null;
    for (var i = indice[0]; i < signLen; i++) {
      if (this.isMultiSelWithBox) {
        seleCheck = this.selectColumDiv.cells[i];
        seleCheck.rowIndex = seleCheck.rowIndex - 1;
      }
      for (var j = 0; j < len; j++) {
        if (this.basicHeaders[j].isHidden == false) {
          cell = this.basicHeaders[j].dataDiv.cells[i];
          cell.rowIndex = cell.rowIndex - 1;
          if (EditorType.CHECKBOX == cell.editorType && cell.checkBox) {
            cell.checkBox.rowIndex = cell.rowIndex;
          }
        }
      }
    }
    if (this.selectedRowIndice != null) {
      for (var i = 0, count = this.selectedRowIndice.length; i < count; i++) {
        if (this.selectedRowIndice[i] > rowIndex) this.selectedRowIndice[i]--;
      }
    }
  }
  if (this.selectedRowIndice != null && this.selectedRowIndice.length > 0) {
    if (this.selectedRowIndice[0] == rowIndex) this.selectedRowIndice = null;
  }
  executeLayoutMonitor();
};
GridComp.prototype.getHeaderWidth = function() {
  var headers = this.model.getHeaders();
  if (headers == null) return 0;
  var width = 0;
  for (var i = 0; i < headers.length; i++) {
    if (!headers[i].isHidden) width += headers[i].width;
  }
  return width;
};
GridComp.prototype.getHeaderDepth = function() {
  var headers = this.model.getHeaders();
  var maxDepth = 1;
  for (var i = 0; i < headers.length; i++) {
    var depth = headers[i].getDepth();
    if (maxDepth <= depth) maxDepth = depth;
  }
  return maxDepth;
};
GridComp.prototype.cellValueChangedFunc = function(rowIndex, colIndex, newValue, oldValue) {
  if (this.basicHeaders[colIndex].isHidden == false) {
    var cell = this.basicHeaders[colIndex].dataDiv.cells[rowIndex];
    var header = this.basicHeaders[colIndex];
    if (cell.firstChild != null) cell.removeChild(cell.firstChild);
    this.renderCell(this.basicHeaders[colIndex].renderType, rowIndex, colIndex, newValue, header, cell);
    if (this.autoRowHeight == true) this.adjustRowHeight(rowIndex, cell);
    var isOdd = this.isOdd(rowIndex);
    if (header.isFixedHeader) {
      if (this.selectedRowIndice != null && this.selectedRowIndice.indexOf(rowIndex) != -1) cell.className = isOdd ? "fixed_gridcell_odd cell_select" : "fixed_gridcell_even cell_select";
      else cell.className = isOdd ? "fixed_gridcell_odd" : "fixed_gridcell_even";
    } else {
      if (this.selectedRowIndice != null && this.selectedRowIndice.indexOf(rowIndex) != -1) cell.className = isOdd ? "gridcell_odd cell_select" : "gridcell_even cell_select";
      else cell.className = isOdd ? "gridcell_odd" : "gridcell_even";
    }
    cell.isErrorCell = false;
    if (this.basicHeaders[colIndex].isGroupBy == true) {
      this.changeGroupCellStyle(rowIndex, colIndex);
    }
    if (header.editorType == EditorType.TEXTAREA || header.editorType == EditorType.INTEGERTEXT || header.editorType == EditorType.DECIMALTEXT || header.editorType == EditorType.DATETEXT || header.editorType == EditorType.DATETIMETEXT || header.editorType == EditorType.YEARTEXT || header.editorType == EditorType.MONTHTEXT || header.editorType == EditorType.YEARMONTHTEXT || header.editorType == EditorType.TIMETEXT || header.editorType == EditorType.EMAILTEXT || header.editorType == EditorType.PHONETEXT || header.editorType == EditorType.LINKTEXT || header.editorType == EditorType.PRECENTTEXT || header.editorType == EditorType.PWDTEXT || header.editorType == EditorType.STRINGTEXT) {
      if (this.compsMap != null) {
        var comp = this.compsMap.get(header.editorType);
        if (comp != null && comp.visible) {
          if (this.currActivedCell != null && this.currActivedCell == cell) {
            if (comp.setValue) {
              comp.setValue(newValue);
            }
          }
        }
      }
    }
    if (header.editorType == EditorType.REFERENCE || header.editorType == EditorType.COMBOBOX || header.editorType == EditorType.MONEYTEXT || header.editorType == EditorType.LANGUAGECOMBOBOX) {
      if (this.compsMap != null) {
        var comp = this.compsMap.get(header.editorType + colIndex);
        if (comp != null && comp.visible) {
          if (this.currActivedCell != null && this.currActivedCell == cell) {
            if (comp.setValue) {
              comp.setValue(newValue);
            }
          }
        }
      }
    }
    if (this.model != null && this.model.getRow(rowIndex).rowData.state == DatasetRow.STATE_UPD) this.lineStateColumDiv.cells[rowIndex].className = "row_state_div row_update_state";
  }
  this.onCellValueChanged(rowIndex, colIndex, oldValue, newValue);
  for (var i = 0; i < this.basicHeaders.length; i++) {
    if (this.basicHeaders[i].isHidden == false && this.basicHeaders[i].refFieldsArr != null) {
      if (this.basicHeaders[i].refFieldsArr.indexOf(this.basicHeaders[colIndex].keyName) > 0) {
        var value = this.model.dataset.getValueAt(rowIndex, i);
        this.cellValueChangedFunc(rowIndex, i, value, value);
      }
    }
  }
};
GridComp.prototype.afterDeleteChangeGroupCellStyle = function(rowIndex, colIndex) {
  if (this.model.rows.length < rowIndex) return;
  var preRow = null;
  var nextRow = null;
  if (rowIndex != 0) preRow = this.model.rows[rowIndex - 1];
  if (rowIndex != this.model.rows.length) nextRow = this.model.rows[rowIndex];
  var preCell = this.basicHeaders[colIndex].dataDiv.cells[rowIndex - 1];
  var nextCell = this.basicHeaders[colIndex].dataDiv.cells[rowIndex];
  if (preRow != null && nextRow != null) {
    if (preRow.getCellValue(colIndex) == nextRow.getCellValue(colIndex)) {
      preCell.style.borderBottomColor = "#ffffff";
      nextCell.style.backgroundColor = "#ffffff";
      this.renderCell(this.basicHeaders[colIndex].renderType, rowIndex + 1, colIndex, null, this.basicHeaders[colIndex], nextCell);
      if (this.autoRowHeight == true) this.adjustRowHeight(rowIndex, nextCell);
    }
    if (preRow.getCellValue(colIndex) != nextRow.getCellValue(colIndex)) {
      preCell.style.borderBottomColor = "";
      nextCell.style.backgroundColor = "";
      var value = nextRow.getCellValue(colIndex);
      this.renderCell(this.basicHeaders[colIndex].renderType, rowIndex + 1, colIndex, value, this.basicHeaders[colIndex], nextCell);
      if (this.autoRowHeight == true) this.adjustRowHeight(rowIndex, nextCell);
    }
  }
  if (preRow == null && nextRow != null) {
    nextCell.style.backgroundColor = "";
    var value = nextRow.getCellValue(colIndex);
    this.renderCell(this.basicHeaders[colIndex].renderType, rowIndex + 1, colIndex, value, this.basicHeaders[colIndex], nextCell);
    if (this.autoRowHeight == true) this.adjustRowHeight(rowIndex, nextCell);
  }
  if (preRow != null && nextRow == null) {
    preCell.style.borderBottomColor = "";
  }
};
GridComp.prototype.changeGroupCellStyle = function(rowIndex, colIndex) {
  if (this.model.rows.length < rowIndex) return;
  var preRow = null;
  var currentRow = null;
  var nextRow = null;
  if (rowIndex != 0) preRow = this.model.rows[rowIndex - 1];
  if (rowIndex != (this.model.rows.length - 1)) nextRow = this.model.rows[rowIndex + 1];
  currentRow = this.model.rows[rowIndex];
  var currentCell = this.basicHeaders[colIndex].dataDiv.cells[rowIndex];
  if (preRow != null) {
    var preCell = this.basicHeaders[colIndex].dataDiv.cells[rowIndex - 1];
    if (preRow.getCellValue(colIndex) == currentRow.getCellValue(colIndex)) {
      var bottomColor = getStyleAttribute(preCell, "background-color");
      preCell.style.borderBottomColor = "#ffffff";
      preCell.style.backgroundColor = "#ffffff";
      currentCell.style.backgroundColor = "#ffffff";
      if (currentCell.firstChild != null) currentCell.removeChild(currentCell.firstChild);
      this.renderCell(this.basicHeaders[colIndex].renderType, rowIndex, colIndex, null, this.basicHeaders[colIndex], currentCell);
      if (this.autoRowHeight == true) this.adjustRowHeight(rowIndex, currentCell);
    } else {
      preCell.style.borderBottomColor = "";
      if (rowIndex - 2 >= 0) {
        var pre2Row = this.model.rows[rowIndex - 2];
        if (preRow.getCellValue(colIndex) == pre2Row.getCellValue(colIndex)) {
          preCell.style.backgroundColor = "#ffffff";
        } else {
          preCell.style.backgroundColor = "";
        }
      } else {
        preCell.style.backgroundColor = "";
      }
      currentCell.style.backgroundColor = "";
    }
  }
  if (nextRow != null) {
    var nextCell = this.basicHeaders[colIndex].dataDiv.cells[rowIndex + 1];
    if (nextCell.firstChild != null) nextCell.removeChild(nextCell.firstChild);
    if (nextRow.getCellValue(colIndex) == currentRow.getCellValue(colIndex)) {
      var bottomColor = getStyleAttribute(currentCell, "background-color");
      currentCell.style.borderBottomColor = "#ffffff";
      currentCell.style.backgroundColor = "#ffffff";
      nextCell.style.backgroundColor = "#ffffff";
      this.renderCell(this.basicHeaders[colIndex].renderType, rowIndex + 1, colIndex, null, this.basicHeaders[colIndex], nextCell);
      if (this.autoRowHeight == true) this.adjustRowHeight(rowIndex + 1, nextCell);
    } else {
      currentCell.style.borderBottomColor = "";
      if (rowIndex - 1 >= 0) {
        var preRow = this.model.rows[rowIndex - 1];
        if (preRow.getCellValue(colIndex) == currentRow.getCellValue(colIndex)) {
          currentCell.style.backgroundColor = "#ffffff";
        } else {
          currentCell.style.backgroundColor = "";
        }
      } else {
        currentCell.style.backgroundColor = "";
      }
      var next2Row = this.model.rows[rowIndex + 2];
      if (next2Row != null) {
        if (nextRow.getCellValue(colIndex) == next2Row.getCellValue(colIndex)) {
          nextCell.style.backgroundColor = "#ffffff";
        } else {
          nextCell.style.backgroundColor = "";
        }
      } else {
        nextCell.style.backgroundColor = "";
      }
      var value = nextRow.getCellValue(colIndex);
      this.renderCell(this.basicHeaders[colIndex].renderType, rowIndex + 1, colIndex, value, this.basicHeaders[colIndex], nextCell);
      if (this.autoRowHeight == true) this.adjustRowHeight(rowIndex + 1, nextCell);
    }
  }
};
GridComp.prototype.getVisibleColumnIds = function() {
  if (!this.model) return null;
  var headers = this.model.basicHeaders;
  if (headers == null || headers.length == 0) return null;
  var visibleColumns = [];
  for (var i = 0, count = headers.length; i < count; i++) {
    if (headers[i].isHidden == false) visibleColumns.push(headers[i].id);
  }
  return visibleColumns;
};
GridComp.prototype.getHiddenColumnIds = function() {
  var headers = this.model.basicHeaders;
  if (headers == null || headers.length == 0) return null;
  var hiddenColumns = [];
  for (var i = 0, count = headers.length; i < count; i++) {
    if (headers[i].isHidden == true) hiddenColumns.push(headers[i].keyName);
    return hiddenColumns;
  }
  return hiddenColumns;
};
GridComp.prototype.setShowColumns = function(columnIds) {
  var headers = this.model.basicHeaders;
  if (headers == null || headers.length == 0) return;
  if (columnIds == null || columnIds.length == 0) {
    for (var i = 0, count = headers.length; i < count; i++) headers[i].isHidden = true;
  } else {
    for (var i = 0, count = headers.length; i < count; i++) {
      if (columnIds.indexOf(headers[i].keyName) != -1) headers[i].isHidden = false;
      else headers[i].isHidden = true;
    }
  }
  this.setModel(this.model);
  if (this.showForm) {
    this.paintFormData();
  } else {
    this.paintData();
  }
};
GridComp.prototype.getBasicHeaderById = function(columnId) {
  var headers = this.model.basicHeaders;
  if (headers == null || headers.length == 0 || columnId == null) return;
  for (var i = 0, count = headers.length; i < count; i++) {
    if (headers[i].keyName == columnId) return headers[i];
  }
  return;
};
GridComp.prototype.setFixedColumns = function(columnIds) {
  var headers = this.model.basicHeaders;
  if (headers == null || headers.length == 0) return;
  if (columnIds == null || columnIds.length == 0) {
    for (var i = 0, count = headers.length; i < count; i++) headers[i].isFixedHeader = false;
  } else {
    for (var i = 0, count = headers.length; i < count; i++) {
      if (columnIds.indexOf(headers[i].keyName) != -1) headers[i].isFixedHeader = true;
      else headers[i].isFixedHeader = false;
    }
  }
  this.setModel(this.model);
  this.paintZone();
};
GridComp.prototype.setColumnVisible = function(columns) {
  var headers = this.model.basicHeaders;
  if (headers == null || headers.length == 0) return;
  var hasChanged = false;
  for (var i = 0; i < headers.length; i++) {
    var header = headers[i];
    if (columns.indexOf(header.keyName + ":" + String(header.isHidden)) != -1) {
      if (header.isHidden == false) {
        var visibleColumn = this.getVisibleColumnIds();
        if (visibleColumn != null && visibleColumn.length > 0 && header.id == visibleColumn[visibleColumn.length - 1] && this.autoExpand == 0) {
          header.isAutoExpand = false;
          this.model.getBasicHeaderById(visibleColumn[visibleColumn.length - 2]).isAutoExpand = true;
        }
      } else {
        var oldVisibleColumn = this.getVisibleColumnIds();
        header.isHidden = (!header.isHidden);
        var newVisibleColumn = this.getVisibleColumnIds();
        header.isHidden = (!header.isHidden);
        if (oldVisibleColumn != null && oldVisibleColumn.length > 0 && newVisibleColumn != null && newVisibleColumn.length > 0 && oldVisibleColumn[oldVisibleColumn.length - 1] != newVisibleColumn[newVisibleColumn.length - 1] && this.autoExpand == 0) {
          header.isAutoExpand = true;
          this.model.getBasicHeaderById(oldVisibleColumn[oldVisibleColumn.length - 1]).isAutoExpand = false;
          var oldWidth = this.model.getBasicHeaderById(oldVisibleColumn[oldVisibleColumn.length - 1]).oldWidth;
          this.model.getBasicHeaderById(oldVisibleColumn[oldVisibleColumn.length - 1]).width = oldWidth;
        }
      }
      header.isHidden = (!header.isHidden);
      if (header.isGroupHeader == true) {
        if (header.isHidden == true) {
          var groupHeader = header.topHeader;
          if (groupHeader != null && groupHeader.isHidden == false) {
            var childrenHeaders = groupHeader.allChildrenHeader;
            var allHidden = true;
            for (var j = 0; j < childrenHeaders.length; j++) {
              if (childrenHeaders[j].isHidden == false) {
                allHidden = false;
                break;
              }
            }
            if (allHidden == true) {
              groupHeader.isHidden = true;
            }
          }
        } else {
          var groupHeader = header.topHeader;
          if (groupHeader != null && groupHeader.isHidden == true) {
            groupHeader.isHidden = false;
          }
        }
      }
      hasChanged = true;
    }
  }
  if (hasChanged) {
    this.model.rows = null;
    this.model.initUIRows();
    this.setModel(this.model);
  }
};
GridComp.prototype.setColumnVisibleB = function(header, columnContext) {
  var hasChanged = false;
  header.isHidden = !columnContext.column_visible;
  if (header.isGroupHeader == true) {
    if (header.isHidden == true) {
      var groupHeader = header.topHeader;
      if (groupHeader != null && groupHeader.isHidden == false) {
        var childrenHeaders = groupHeader.allChildrenHeader;
        var allHidden = true;
        for (var j = 0; j < childrenHeaders.length; j++) {
          if (childrenHeaders[j].isHidden == false) {
            allHidden = false;
            break;
          }
        }
        if (allHidden == true) {
          groupHeader.isHidden = true;
        }
      }
    }
    hasChanged = true;
  } else {
    var groupHeader = header.topHeader;
    if (groupHeader != null && groupHeader.isHidden == true) {
      groupHeader.isHidden = false;
    }
    hasChanged = true;
  }
  if (hasChanged) {
    this.model.rows = null;
    this.model.initUIRows();
    this.setModel(this.model);
  }
};
GridComp.prototype.setGroupColumnVisible = function(header, groupColumnContext) {
  var hasChanged = false;
  header.isHidden = !groupColumnContext.column_visible;
  if (header.isGroupHeader == true) {
    var childrenHeaders = header.allChildrenHeader;
    if (header.isHidden == true) {
      for (var j = 0; j < childrenHeaders.length; j++) {
        if (childrenHeaders[j].isHidden == true) continue;
        childrenHeaders[j].isHidden = true;
        hasChanged = true;
      }
    } else if (header.isHidden == false) {
      hasChanged = true;
    }
  }
  if (hasChanged) {
    this.model.rows = null;
    this.model.initUIRows();
    this.setModel(this.model);
  }
};
GridComp.prototype.setColumnBgcolor = function(columns) {
  var headers = this.model.basicHeaders;
  if (headers == null || headers.length == 0) return;
  var hasChanged = false;
  for (var i = 0; i < headers.length; i++) {
    var header = headers[i];
    for (var j = 0; j < columns.length; j++) {
      var column = columns[j];
      var attrValue = column.split(":");
      var name = attrValue[0];
      var value = attrValue[1];
      if (header.keyName == name) {
        if (header.isGroupHeader == true) {
          var childrenHeaders = groupHeader.allChildrenHeader;
          for (var k = 0; k < childrenHeaders.length; k++) {
            childerHeaders[k].columBgColor = value;
          }
        } else {
          header.columBgColor = value;
        }
        hasChanged = true;
        break;
      }
    }
  }
  if (hasChanged) {
    if (this.showForm) {
      this.paintFormData();
    } else {
      this.paintData();
    }
  }
};
GridComp.prototype.setColumnBGColor = function(header, context) {
  var hasChanged = false;
  var name = context.id;
  var value = context.column_bgcolor;
  if (header.isGroupHeader == true) {
    var childrenHeaders = header.allChildrenHeader;
    for (var k = 0; k < childrenHeaders.length; k++) {
      childerHeaders[k].columBgColor = value;
    }
    hasChanged = true;
  } else {
    header.columBgColor = value;
    hasChanged = true;
  }
  if (hasChanged) {
    if (this.showForm) {
      this.paintFormData();
    } else {
      this.paintData();
    }
  }
};
GridComp.prototype.setColumnTextcolor = function(columns) {
  var headers = this.model.basicHeaders;
  if (headers == null || headers.length == 0) return;
  var hasChanged = false;
  for (var i = 0; i < headers.length; i++) {
    var header = headers[i];
    for (var j = 0; j < columns.length; j++) {
      var column = columns[j];
      var attrValue = column.split(":");
      var name = attrValue[0];
      var value = attrValue[1];
      if (header.keyName == name) {
        if (header.isGroupHeader == true) {
          var childrenHeaders = groupHeader.allChildrenHeader;
          for (var k = 0; k < childrenHeaders.length; k++) {
            childerHeaders[k].textColor = value;
          }
        } else {
          header.textColor = value;
        }
        hasChanged = true;
        break;
      }
    }
  }
  if (hasChanged) {
    if (this.showForm) {
      this.paintFormData();
    } else {
      this.paintData();
    }
  }
};
GridComp.prototype.setColumnTextColor = function(header, context) {
  var hasChanged = false;
  var value = context.column_textcolor;
  if (header.isGroupHeader == true) {
    var childrenHeaders = header.allChildrenHeader;
    for (var k = 0; k < childrenHeaders.length; k++) {
      childerHeaders[k].textColor = value;
    }
    hasChanged = true;
  } else {
    header.textColor = value;
    hasChanged = true;
  }
  if (hasChanged) {
    if (this.showForm) {
      this.paintFormData();
    } else {
      this.paintData();
    }
  }
};
GridComp.prototype.setColumnWidth = function(header, context) {
  var hasChanged = false;
  if (context.column_width != null && header.width != context.column_width) {
    var value = context.column_width;
    if (value < 35) value = 35;
    header.width = value;
    hasChanged = true;
  }
  if (hasChanged) {
    this.model.rows = null;
    this.model.initUIRows();
    this.setModel(this.model);
  }
};
GridComp.prototype.setColumnEditable = function(columns) {
  var headers = this.model.basicHeaders;
  if (headers == null || headers.length == 0) return;
  for (var i = 0; i < headers.length; i++) {
    var header = headers[i];
    if (columns.indexOf(header.keyName + ":" + String(!header.columEditable)) != -1) {
      header.columEditable = (!header.columEditable);
      if (header.columEditable == true && this.editable == false) {
        if (this.model.dataset != null && this.model.dataset.editable) this.setEditable(true);
      }
    }
    if (header.renderType == BooleanRender) {
      if (header.columEditable) {
        if (header.selectBox != null) header.selectBox.disabled = false;
        if (header.dataDiv != null && header.dataDiv.cells != null) {
          for (var j = 0; j < header.dataDiv.cells.length; j++) {
            if (header.dataDiv.cells[j]) header.dataDiv.cells[j].firstChild.disabled = false;
          }
        }
      } else {
        if (header.selectBox != null) header.selectBox.disabled = true;
        if (header.dataDiv != null && header.dataDiv.cells != null) {
          for (var j = 0; j < header.dataDiv.cells.length; j++) {
            if (header.dataDiv.cells[j]) header.dataDiv.cells[j].firstChild.disabled = true;
          }
        }
      }
    }
  }
};
GridComp.prototype.setColumnEditableB = function(header, context) {
  header.columEditable = context.column_editable;
  if (header.columEditable == true && this.editable == false) {
    if (this.model.dataset != null && this.model.dataset.editable) this.setEditable(true);
  }
  if (header.renderType == BooleanRender) {
    if (header.columEditable) {
      if (header.selectBox != null) header.selectBox.disabled = false;
      if (header.dataDiv != null && header.dataDiv.cells != null) {
        for (var j = 0; j < header.dataDiv.cells.length; j++) {
          if (header.dataDiv.cells[j]) header.dataDiv.cells[j].firstChild.disabled = false;
        }
      }
    } else {
      if (header.selectBox != null) header.selectBox.disabled = true;
      if (header.dataDiv != null && header.dataDiv.cells != null) {
        for (var j = 0; j < header.dataDiv.cells.length; j++) {
          if (header.dataDiv.cells[j]) header.dataDiv.cells[j].firstChild.disabled = true;
        }
      }
    }
  } else if (header.renderType && header.renderType.settings && header.renderType.settings["render_editchange"] && header.renderType.settings["render_editchange"] == true) {
    header.reRender();
  }
};
GridComp.prototype.setHeaderCheckBoxVisible = function(keyName, visible) {
  var headers = this.model.basicHeaders;
  if (headers == null || headers.length == 0) return;
  for (var i = 0; i < headers.length; i++) {
    if (headers[i].keyName == keyName) {
      if (headers[i].selectBox) {
        visible = getBoolean(visible, true);
        if (visible == true) headers[i].selectBox.style.display = "";
        else headers[i].selectBox.style.display = "none";
      }
      break;
    }
  }
};
GridComp.prototype.showByState = function(state) {
  var headers = this.model.basicHeaders;
  if (headers == null || headers.length == 0) return;
  var hasChanged = false;
  for (var i = 0, count = headers.length; i < count; i++) {
    if (headers[i].showState == null) continue;
    if (headers[i].showState != state) {
      if (headers[i].isHidden == false) {
        headers[i].isHidden = true;
        hasChanged = true;
      }
    } else {
      if (headers[i].isHidden == true) {
        headers[i].isHidden = false;
        hasChanged = true;
      }
    }
  }
  if (!hasChanged) return;
  this.setModel(this.model);
  this.paintZone();
};
GridComp.prototype.setModel = function(model) {
  var needInitModel = false;
  if (!window.editMode) {
    var cols = this.getLocalColumnVisible();
    if (cols != null) {
      for (var i = 0; i < cols.length; i++) {
        var header = model.getHeader(cols[i].keyName);
        if (header == null) continue;
        header.isHidden = true;
        if (this.autoExpand == 0) {
          header.isAutoExpand = false;
        }
      }
      needInitModel = true;
    }
    var orderData = this.getLocalColumnOrder();
    if (orderData != null) {
      for (var i = 0; i < orderData.length; i++) {
        var keyName = orderData[i].keyName;
        var index = orderData[i].index;
        var sourceHeader = model.getHeader(keyName);
        if (sourceHeader != null) {
          model.removeHeader(keyName);
          model.addHeader(sourceHeader, index);
        }
      }
      needInitModel = true;
    }
    if (needInitModel) {
      model.initBasicHeaders();
      model.initBindRelation();
      model.rows = null;
      model.initUIRows();
    }
  }
  if (this.model == null) {
    this.model = model;
    this.model.owner = this;
    this.basicHeaders = this.model.basicHeaders;
    this.create();
  } else {
    if (this.model != model) {
      this.model.dataset.unbindComponent(this.model);
      delete this.model;
      this.model = model;
      this.model.owner = this;
    }
    this.basicHeaders = this.model.basicHeaders;
    if (this.showForm) {
      this.paintFormData();
    } else {
      this.paintData();
    }
    if (!this.showForm) {
      setTimeout("GridComp.processAutoExpandHeadersWidth('" + this.id + "','" + this.outerDivId + "')", 350);
    }
  }
  var visibleColumns = this.getVisibleColumnIds();
  var autoHeaders = this.getAutoExpandHeaders();
  if (visibleColumns != null && visibleColumns != null && visibleColumns.length > 0 && this.autoExpand == 0 && (autoHeaders == null || autoHeaders.length == 0)) {
    model.getBasicHeaderById(visibleColumns[visibleColumns.length - 1]).isAutoExpand = true;
  }
  if (this.pageSize > 0) this.setPaginationInfo();
  if (!this.showForm) {
    if (this.isShowSumRow) {
      this.model.setSumColValue(null, null);
    }
  }
  if (this.model.dataset != null && this.model.dataset.isEditable() == false) this.setEditable(false);
  else if (this.model.dataset != null && this.model.dataset.editable && this.model.dataset.editableChanged) this.setEditable(true);
  this.initColumnContextMenu();
  if (this.columnContextMenu.menuColumn) {
    this.initColumnItemMenu(this.columnContextMenu.menuColumn);
  }
};
GridComp.prototype.removeAllChildren = function(p) {
  if (p) {
    while (p.childNodes.length > 0) p.removeChild(p.childNodes[0]);
  }
};

function handleScrollEvent(e) {
  handleScrollEvent.triggerObj = e.triggerObj;
  if (handleScrollEvent.timer != null) clearTimeout(handleScrollEvent.timer);
  handleScrollEvent.timer = setTimeout("doScroll()", 30);
};

function doScroll() {};
GridComp.parseData = function(header, data, isComputeSum) {
  if (header.dataType == DataType.BOOLEAN) {
    var formater;
    if ((formater = FormaterMap.get(header.owner.id + "$" + header.keyName)) == null) {
      formater = new BooleanFormater();
      FormaterMap.put(header.owner.id + "$" + header.keyName, formater);
    }
    return formater.format(data);
  } else if (header.dataType == DataType.CHOOSE) {
    if (header.comboData == null) return data;
    var keyValues = header.comboData.getValueArray();
    var captionValues = header.comboData.getNameArray();
    var index = keyValues.indexOf(data);
    if (index != -1) return captionValues[index];
    return "";
  } else if (header.dataType == DataType.DATE) {
    var formater;
    if ((formater = FormaterMap.get(header.owner.id + "$" + header.keyName)) == null) {
      formater = new DateFormater();
      FormaterMap.put(header.owner.id + "$" + header.keyName, formater);
    }
    return formater.format(data);
  } else if (header.dataType == DataType.INTEGER) {
    var formater;
    if ((formater = FormaterMap.get(header.owner.id + "$" + header.keyName)) == null) {
      formater = new IntegerFormater(header.integerMinValue, header.integerMaxValue);
      FormaterMap.put(header.owner.id + "$" + header.keyName, formater);
    }
    return formater.format(data);
  } else if (header.dataType == DataType.Decimal || header.dataType == DataType.FLOAT || header.dataType == DataType.fLOAT || header.dataType == DataType.UFDOUBLE || header.dataType == DataType.dOUBLE) {
    var formater;
    if (isComputeSum) {
      formater = new DicimalFormater(header.precision, null, null);
    } else {
      if ((formater = FormaterMap.get(header.owner.id + "$" + header.keyName)) == null) {
        formater = new DicimalFormater(header.precision, header.floatMinValue, header.floatMaxValue);
        FormaterMap.put(header.owner.id + "$" + header.keyName, formater);
      }
    }
    if (formater.precision != header.precision) formater.precision = header.precision;
    return formater.format(data);
  } else {
    var formater;
    if ((formater = FormaterMap.get(header.owner.id + "$" + header.keyName)) == null) {
      formater = new Formater();
      FormaterMap.put(header.owner.id + "$" + header.keyName, formater);
    }
    return formater.format(data);
  }
};
GridComp.prototype.setChangedContext = function(context) {
  if (context.enable != null) this.setActive(context.enable);
  if (context.editable != null && (this.editable == null || (this.editable != null && this.editable != context.editable))) this.setEditable(context.editable);
  if (context.gridMenuCtx != null) {
    var gridMenuCtx = context.gridMenuCtx;
    this.menubarComp.setChangedContext(gridMenuCtx);
  }
  if (context.hideErrorMsg != null) this.hideErrorMsg();
  if (context.showTree != null) this.setShowTree(context.showTree);
  if (this.model == null) return;
  var headers = this.model.basicHeaders;
  if (headers == null || headers.length == 0) return;
  if (context.columnContexts) {
    for (var i = 0, n = context.columnContexts.length; i < n; i++) {
      if (context.columnContexts[i].isColumnGroup == "isColumnGroup") {
        if (context.columnContexts[i].column_visible != null) {
          var header = this.model.getHeaderById(context.columnContexts[i].id);
          this.setGroupColumnVisible(header, context.columnContexts[i]);
        }
      }
      for (var j = 0; j < headers.length; j++) {
        if (headers[j].id == context.columnContexts[i].id) {
          var columnContext = context.columnContexts[i];
          var header = headers[j];
          if (columnContext.column_bgcolor != null) this.setColumnBGColor(header, columnContext);
          if (columnContext.column_visible != null) this.setColumnVisibleB(header, columnContext);
          if (columnContext.column_textcolor != null) this.setColumnTextColor(header, columnContext);
          if (columnContext.column_editable != null) this.setColumnEditableB(header, columnContext);
          if (columnContext.column_width != null) this.setColumnWidth(header, columnContext);
          if (columnContext.text != null) header.replaceText(columnContext.text);
          if (columnContext.precision != null) header.setPrecision(columnContext.precision);
          if (columnContext.matchValues != null) this.showComp.setMatchValues(columnContext.matchValues);
          if (columnContext.beforeOpenParam != null) this.showComp.beforeOpenParam(columnContext.beforeOpenParam);
          if (columnContext.gridTipContent != null) this.setGridTipContent(columnContext.gridTipContent);
          if (columnContext.showImageBtn != null) this.setHeaderBtnVisible(columnContext.showImageBtn);
        }
      }
    }
  }
};
GridComp.nextMouseOver = function(e) {
  var event = EventUtil.getEvent(e);
  stopAll(event);
  this.className = 'nextover';
};
GridComp.nextMouseOut = function(e) {
  var event = EventUtil.getEvent(e);
  stopAll(event);
  this.className = 'next';
};
GridComp.preMouseOver = function(e) {
  var event = EventUtil.getEvent(e);
  stopAll(event);
  this.className = 'preover';
};
GridComp.preMouseOut = function(e) {
  var event = EventUtil.getEvent(e);
  stopAll(event);
  this.className = 'pre';
};
GridComp.pageNavgate = function(e, index, gridId) {
  var event = EventUtil.getEvent(e);
  stopAll(event);
  if (this.pageIndex) {
    index = this.pageIndex;
  }
  if (this.gridId) {
    gridId = this.gridId;
  }
  var grid = window.objects[gridId];;
  if (index == grid.pageIndex) return;
  grid.processServerPagination(index);
};
GridComp.pagePre = function(e) {
  var event = EventUtil.getEvent(e);
  stopAll(event);
  var grid = window.objects[this.gridId];
  if (grid.pageIndex == 0) return;
  grid.processServerPagination(grid.pageIndex - 1);
};
GridComp.pageFirst = function(e) {
  var event = EventUtil.getEvent(e);
  stopAll(event);
  var grid = window.objects[this.gridId];
  if (grid.pageIndex == 0) return;
  grid.processServerPagination(0);
};
GridComp.pageNext = function(e) {
  var event = EventUtil.getEvent(e);
  stopAll(event);
  var grid = window.objects[this.gridId];
  if (grid.pageIndex == grid.model.getPageCount() - 1) return;
  grid.processServerPagination(grid.pageIndex + 1);
};
GridComp.pageLast = function(e) {
  var event = EventUtil.getEvent(e);
  stopAll(event);
  var grid = window.objects[this.gridId];
  if (grid.pageIndex == grid.model.getPageCount() - 1) return;
  grid.processServerPagination(grid.model.getPageCount() - 1);
};
GridComp.prototype.initColumnContextMenu = function() {
  var oThis = this;
  if (!this.columnContextMenu) {
    var menuName = this.id + "_menu";
    this.columnContextMenu = new ContextMenuComp(menuName, 0, 0, false);
    var columnCaption = trans("ml_show_column");
    var menuColumn = this.columnContextMenu.addMenu(menuName + "_column", columnCaption, null, null, false);
    this.columnContextMenu.menuColumn = menuColumn;
    var cleanCaption = trans("ml_clear_set");
    var menuClean = this.columnContextMenu.addMenu(menuName + "_clean", cleanCaption, null, null, false);
    var cleanListener = new Listener("onclick");
    cleanListener.func = function(e) {
      var defData = oThis.getLocalData();
      if (defData != null) {
        var cols = defData["colVisible"];
        defData["colVisible"] = null;
        defData["colOrder"] = null;
        saveStorageData();
        if (cols != null) {
          var columns = new Array();
          for (var i = 0; i < cols.length; i++) {
            columns.push(cols[i].keyName + ":true");
          }
          oThis.setColumnVisible(columns);
        }
      }
    };
    menuClean.addListener(cleanListener);
    if (IS_IPAD) {
      var hiddenCaption = trans("ml_hidden_menu");
      var menuHidden = this.columnContextMenu.addMenu(menuName + "_hidden", "关闭菜单", null, null, false);
      var hiddenListener = new Listener("onclick");
      hiddenListener.func = function(e) {
        this.hideTipMessage(true);
        this.hideenColumnContentMenu();
      };
      menuHidden.addListener(hiddenListener);
    }
    this.initColumnItemMenu(this.columnContextMenu.menuColumn);
  }
};
GridComp.prototype.initColumnItemMenu = function(menuColumn) {
  if (!isNull(menuColumn.childMenu, false)) {
    menuColumn.removeChildMenu();
  }
  var headers = this.model.getBasicHeaders();
  for (var i = 0; i < headers.length; i++) {
    var keyName = headers[i].keyName;
    var showName = headers[i].showName;
    if (headers[i].isHidden == false || this.isLocalHiddenColumn(keyName)) {
      var visible = !headers[i].isHidden && !this.isLocalHiddenColumn(keyName);
      this.createColumnItemMenu(menuColumn, keyName, showName, showName, visible);
    }
  }
};
GridComp.prototype.isLocalHiddenColumn = function(keyName) {
  var cols = this.getLocalColumnVisible();
  if (cols == null) return false;
  for (var i = 0; i < cols.length; i++) {
    if (keyName == cols[i].keyName) return true;
  }
  return false;
};
GridComp.prototype.createColumnItemMenu = function(parentMneu, id, name, tip, visible) {
  var oThis = this;
  visible = getBoolean(visible, true);
  var item = parentMneu.addMenu(id, name, tip, null, true, visible, null);
  item.Div_gen.onclick = function(e) {};
  item.checkbox.onclick = function(e) {
    e = EventUtil.getEvent(e);
    parentMneu.parentOwner.keepShow = true;
    item.parentOwner.keepShow = true;
    if (this.checked) {
      oThis.saveColumnVisibleToLocal(item.id, true);
      oThis.setColumnVisible([item.id + ":true"]);
    } else {
      var showColumns = oThis.getVisibleColumnIds();
      if (showColumns.length <= 1) stopAll(e);
      else {
        oThis.saveColumnVisibleToLocal(item.id, false);
        oThis.setColumnVisible([item.id + ":false"]);
      }
    }
    stopEvent(e);
  };
  item.Div_gen.onclick = function(e) {
    item.checkbox.click();
    e = EventUtil.getEvent(e);
    stopEvent(e);
  };
};
GridComp.prototype.showColumnContentMenu = function(e) {
  this.initColumnContextMenu();
  if (this.columnContextMenu && this.columnContextMenu.visible == false) this.columnContextMenu.show(e);
};
GridComp.prototype.hideenColumnContentMenu = function() {
  if (this.columnContextMenu && this.columnContextMenu.visible) this.columnContextMenu.hide();
  if (this.columnContextMenu.menuColumn.childMenu && this.columnContextMenu.menuColumn.childMenu.hide) this.columnContextMenu.menuColumn.childMenu.hide();
};
GridComp.prototype.getLocalData = function() {
  var storageData = getStorageData();
  if (storageData == null) return null;
  var selfDefData = storageData["selfDef"];
  if (selfDefData == null) return null;
  var pageId = getPageId();
  var defData = selfDefData[pageId + "_" + this.id];
  if (defData == null) return null;
  return defData;
};
GridComp.prototype.initLocalData = function() {
  var storageData = getStorageData();
  if (storageData == null) return null;
  if (storageData["selfDef"] == null) storageData["selfDef"] = {};
  var selfDefData = storageData["selfDef"];
  var pageId = getPageId();
  if (selfDefData[pageId + "_" + this.id] == null) selfDefData[pageId + "_" + this.id] = {};
  var defData = selfDefData[pageId + "_" + this.id];
  return defData;
};
GridComp.prototype.getLocalColumnVisible = function() {
  var defData = this.getLocalData();
  if (defData == null) return null;
  return defData["colVisible"];
};
GridComp.prototype.saveColumnVisibleToLocal = function(keyName, visible) {
  visible = getBoolean(visible, true);
  var changed = false;
  var defData = this.getLocalData();
  if (defData == null) defData = this.initLocalData();
  if (defData == null) return;
  if (defData["colVisible"] == null) defData["colVisible"] = new Array();
  var visibleData = defData["colVisible"];
  for (var i = 0; i < visibleData.length; i++) {
    if (visibleData[i].keyName == keyName) {
      visibleData.splice(i, 1);
      changed = true;
      break;
    }
  }
  if (visible == false) {
    var obj = {};
    obj.keyName = keyName;
    visibleData.push(obj);
    changed = true;
  }
  if (changed) saveStorageData();
};
GridComp.prototype.getLocalColumnOrder = function() {
  var defData = this.getLocalData();
  if (defData == null) return null;
  return defData["colOrder"];
};
GridComp.prototype.saveColumnOrderToLocal = function(headers) {
  var changed = false;
  var defData = this.getLocalData();
  if (defData == null) defData = this.initLocalData();
  if (defData == null) return;
  defData["colOrder"] = new Array();
  var orderData = defData["colOrder"];
  for (var i = 0; i < headers.length; i++) {
    if (headers[i] == null) continue;
    var columnObj = {};
    columnObj.keyName = headers[i].keyName;
    columnObj.index = i;
    orderData.push(columnObj);
  }
  saveStorageData();
};
GridComp.prototype.changeColumnOrder = function(sourceKeyName, targetKeyName) {
  this.keepScroll = true;
  var sourceHeader = this.model.getHeader(sourceKeyName);
  this.model.removeHeader(sourceKeyName);
  var targetHeader = this.model.getHeader(targetKeyName);
  var index = this.model.headers.indexOf(targetHeader);
  this.model.addHeader(sourceHeader, index);
  this.saveColumnOrderToLocal(this.model.headers);
  if (this.getLocalData() == null) {
    this.model.initBasicHeaders();
    this.model.initBindRelation();
    this.model.rows = null;
    this.model.initUIRows();
  }
  this.setModel(this.model);
};
GridComp.prototype.paintData = function() {
  this.clearDivs();
  if (this.model == null) return;
  var initSuccess = this.initConstant();
  if (initSuccess == false) return;
  this.initBasicHeaders();
  this.adjustScroll();
  this.initDivs();
  this.initDatas();
  if (!this.scrollState) {
    var self = this;
    $("#" + this.outerDivId).perfectScrollbar("", this.outerDivId);
    $(window).bind("resize", function() {
      $("#" + self.outerDivId).perfectScrollbar('updateAll', this.outerDivId);
    });
    this.scrollState = true;
  } else {}
  this.paintZone();
  this.attachEvents();
  this.selectedRowIndice = null;
  this.currActivedCell = null;
  if (this.showComp) this.hiddenComp();
};
GridComp.prototype.initOuterDiv = function() {
  if (this.outerDiv) {
    return;
  }
  var oThis = this;
  this.outerDiv = $ce("div");
  this.outerDiv.className = this.className;
  this.outerDiv.style.left = this.left;
  this.outerDiv.style.top = this.top;
  this.outerDiv.style.width = this.width;
  if (!this.isRunMode) {
    this.outerDiv.style.overflowX = "hidden";
  }
  if (!this.flowmode) {
    this.outerDiv.style.overflowY = "hidden";
    this.outerDiv.style.overflowX = "hidden";
  }
  this.outerDiv.onscroll = function(e) {
    if (oThis.currActivedCell && oThis.showComp) {
      oThis.showComp.setBounds(compOffsetLeft(oThis.currActivedCell, document.body) + GridComp.CELL_LEFT_PADDING, compOffsetTop(oThis.currActivedCell, document.body) - compScrollTop(oThis.currActivedCell, document.body), oThis.currActivedCell.offsetWidth - GridComp.CELL_RIGHT_PADDING - 1, oThis.currActivedCell.offsetHeight);
      oThis.showComp.setFocus();
    }
  };
  this.wholeDiv.appendChild(this.outerDiv);
};
GridComp.prototype.paintZone = function(key, rowIndex, hasParent, level) {
  if (this.model == null) {
    if (this.scrollState && !this.keepScroll) {
      $("#" + this.outerDivId).perfectScrollbar('updateAllandLeft', this.outerDivId);
    } else {
      $("#" + this.outerDivId).perfectScrollbar('updateKeepLeft', this.outerDivId);
      this.keepScroll = false;
    }
    return;
  }
  if (this.needPaintRows != null && this.needPaintRows == true) {
    this.needPaintRows = false;
    this.paintRows();
  } else {
    if (rowIndex == null) rowIndex = 0;
    var rows = this.model.getRows(key);
    if (rows == null || rows.length == 0) {
      if (this.scrollState && !this.keepScroll) {
        $("#" + this.outerDivId).perfectScrollbar('updateAllandLeft', this.outerDivId);
      } else {
        $("#" + this.outerDivId).perfectScrollbar('updateKeepLeft', this.outerDivId);
        this.keepScroll = false;
      }
      return;
    }
    var modelLen = rows.length;
    var scrollLeft = this.dataOuterDiv.scrollLeft;
    var rowHeihgt = this.rowHeight;
    var rowCount = this.model.getRowsCount();
    this.setHeadersOffsetWidth();
    initLayoutMonitorState();
    for (var i = 0; i < modelLen; i++) {
      if (hasParent) {
        if (level != null) {
          rows[i].level = level + 1;
          this.addOneRow(rows[i], rowIndex + i, scrollLeft, rowHeihgt, rowCount, rowIndex - 1);
        }
      } else this.addOneRow(rows[i], rowIndex + i, scrollLeft, rowHeihgt, rowCount, null);
    }
    if (this.selectedRowIndice && this.selectedRowIndice.length > 0) {
      for (var i = 0; i < this.selectedRowIndice.length > 0; i++) {
        this.changeCurrSelectedRowStyle(this.selectedRowIndice[i]);
      }
    }
    this.clearHeadersOffsetWidth();
    setTimeout("executeLayoutMonitor()", 500);
  }
  this.adjustFixedColumDivHeight();
  if (this.scrollState && !this.keepScroll) {
    $("#" + this.outerDivId).perfectScrollbar('updateAllandLeft', this.outerDivId);
  } else {
    $("#" + this.outerDivId).perfectScrollbar('updateKeepLeft', this.outerDivId);
    this.keepScroll = false;
  }
  this.constant.outerDivWidth = this.wholeDiv.offsetWidth;
  this.constant.outerDivHeight = this.wholeDiv.offsetHeight;
};
GridComp.prototype.clearDivs = function() {
  this.removeAllChildren(this.outerDiv);
  if (this.dataOuterDiv != null) {
    this.dataOuterDiv.style.width = "0px";
  }
};
GridComp.prototype.initDivs = function() {
  this.initHeaderDiv();
  this.initFixedHeaderDiv();
  if (this.isShowNumCol) {
    this.initRowNumHeaderDiv();
  } else this.constant.rowNumHeaderDivWidth = 0;
  this.initLineStateHeaderDiv();
  if (this.isMultiSelWithBox) this.initSelectColumHeaderDiv();
  this.initFixedHeaderTableDiv();
  this.initDynamicHeaderDiv();
  this.initDynamicHeaderTableDiv();
  if (this.isRunMode) {
    this.initNoRowsDiv();
  }
  this.initFixedColumDiv();
  this.initDataOuterDiv();
  if (this.isShowNumCol) {
    this.initRowNumDiv();
  }
  if (this.isMultiSelWithBox) this.initSelectColumDiv();
  this.initLineStateColumDiv();
  if (this.isShowSumRow) {
    this.initSumRowDataDiv();
  }
  if (this.pageSize > 0) {
    if (this.isSimplePagination) {
      this.initSimplePaginationBar();
    } else {
      this.initPaginationBar();
    }
  }
};
GridComp.prototype.initDatas = function() {
  this.initHeaderTables();
  this.initFixedColumDataDiv();
  this.initDynamicColumDataDiv();
  if (this.isShowSumRow) this.initSumRowCells();
};
GridComp.prototype.paintRows = function(sort, startIndex, count) {
  if (!this.paginationBar) {
    this.keepScroll = true;
  }
  if (this.isMultiSelWithBox) {
    if (this.selectColumDiv != null) this.selectColumDiv.parentNode.removeChild(this.selectColumDiv);
  }
  if (this.isScroll()) this.setScrollLeft(0);
  if (this.dynamicColumDataDiv != null) {
    this.setScrollLeft(0);
    this.dynamicColumDataDiv.parentNode.removeChild(this.dynamicColumDataDiv);
  }
  if (this.fixedColumDiv != null) this.fixedColumDiv.innerHTML = "";
  if (this.isShowSumRow && this.rowNumDiv != null) {
    if (this.rowNumDiv.parentNode) {
      this.rowNumDiv.parentNode.removeChild(this.rowNumDiv);
    }
    this.rowNumDiv.cells = null;
  }
  if (this.wholeDiv.offsetWidth != 0) {
    this.constant.outerDivWidth = this.wholeDiv.offsetWidth;
    var fixedColumDivWidth = 0;
    if (this.fixedColumDiv) fixedColumDivWidth = this.fixedColumDiv.offsetWidth;
    if (this.dataOuterDiv) this.dataOuterDiv.style.width = this.constant.outerDivWidth - fixedColumDivWidth + "px";
  }
  if (!sort) {
    this.model.rows = null;
    if (startIndex != null && count != null) this.model.initUIRows(startIndex, count);
    else this.model.initUIRows(startIndex);
  }
  var rowCount = this.getRowsNum();
  this.selectedRowIndice = null;
  this.currActivedCell = null;
  if (this.showComp) this.hiddenComp();
  var gridWidth = this.constant.outerDivWidth;
  var fixedHeaderDivWidth = this.constant.fixedHeaderDivWidth;
  if (this.isVScroll()) {
    this.headerDiv.style.width = (gridWidth - GridComp.SCROLLBAE_HEIGHT) + "px";
    this.headerDiv.defaultWidth = gridWidth - GridComp.SCROLLBAE_HEIGHT;
    this.headerDiv.style.left = "0px";
    this.fixedHeaderDiv.style.left = "0px";
    var dynHeaderWidth = gridWidth - fixedHeaderDivWidth - GridComp.SCROLLBAE_HEIGHT;
    if (dynHeaderWidth > 0) this.dynamicHeaderDiv.style.width = dynHeaderWidth + "px";
    this.dynamicHeaderDiv.defaultWidth = dynHeaderWidth;
  } else {
    this.headerDiv.style.width = gridWidth + "px";
    this.headerDiv.defaultWidth = gridWidth;
    this.headerDiv.style.left = "0px";
    this.fixedHeaderDiv.style.left = "0px";
    var w = gridWidth - fixedHeaderDivWidth;
    if (w < 0) w = 0;
    this.dynamicHeaderDiv.style.width = w + "px";
    this.dynamicHeaderDiv.defaultWidth = w;
  }
  this.initDynamicColumDataDiv();
  if (this.isShowNumCol) this.initRowNumDiv();
  this.initLineStateColumDiv();
  if (this.isMultiSelWithBox) this.initSelectColumDiv();
  this.initFixedColumDataDiv();
  this.paintZone();
  if (this.stForAutoExpand != null) clearTimeout(this.stForAutoExpand);
  this.stForAutoExpand = setTimeout("GridComp.processAutoExpandHeadersWidth('" + this.id + "','" + this.outerDivId + "')", 100);
};
GridComp.prototype.setGridInEdit = function() {
  if (this.editable == false) return;
  var ds = this.model.dataset;
  if (ds == null) return;
  if (ds.editable == false) return;
  var rowIndex = ds.getSelectedIndex();
  if (rowIndex == -1) return;
  var colIndex = -1;
  var headers = this.model.getHeaders();
  for (var i = 0; i < headers.length; i++) {
    if (headers[i].isHidden == false && headers[i].columEditable == true) {
      colIndex = i;
      break;
    }
  }
  if (colIndex == -1) return;
  var cell = this.getCell(rowIndex, colIndex);
  if (cell == null) return;
  this.hiddenComp();
  this.setCellSelected(cell);
};

function GridTreeLevel(id, recursivePkField, recursivePPkField, labelFields, loadField, leafField) {
  this.id = id;
  this.contextMenu = null;
  this.recursiveKeyField = recursivePkField;
  this.recursivePKeyField = recursivePPkField;
  this.labelFields = labelFields;
  this.loadField = loadField;
  this.leafField = leafField;
};
GridComp.prototype.hideChildRows = function(rowIndex) {
  for (var i = 0; i < this.model.basicHeaders.length; i++) {
    var header = this.model.basicHeaders[i];
    if (header.isHidden == true) continue;
    var dataDiv = header.dataDiv;
    var cell = dataDiv.childNodes[rowIndex];
    var parentCell = new Array();
    for (var j = rowIndex + 1; j < dataDiv.childNodes.length; j++) {
      var cCell = dataDiv.childNodes[j];
      if (cCell.parentCell == cell) {
        this.hideChildRows(j);
        if (this.selectColumDiv != null) this.selectColumDiv.cells[j].style.display = "none";
        cCell.style.display = "none";
        parentCell.push(cCell);
      } else {
        if (parentCell.length > 0) {
          for (var k = 0; k < parentCell.length; k++) {
            if (cCell.parentCell == parentCell[k]) {
              cCell.style.display = "none";
              parentCell.push(cCell);
              break;
            }
          }
        }
      }
    }
  }
};
GridComp.prototype.showChildRows = function(rowIndex) {
  for (var i = 0; i < this.model.basicHeaders.length; i++) {
    var header = this.model.basicHeaders[i];
    if (header.isHidden == true) continue;
    var dataDiv = header.dataDiv;
    var cell = dataDiv.childNodes[rowIndex];
    for (var j = rowIndex + 1; j < dataDiv.childNodes.length; j++) {
      var cCell = dataDiv.childNodes[j];
      if (cCell.style.display == "") break;
      var gridRow = this.model.getRow(j);
      if (gridRow.loadImg && gridRow.loadImg.plus == false) {
        gridRow.loadImg.plus = true;
        gridRow.loadImg.src = DefaultRender.plusImgSrc;
      }
      if (cCell.parentCell == cell) {
        if (this.selectColumDiv != null) this.selectColumDiv.cells[j].style.display = "";
        cCell.style.display = "";
      }
    }
  }
};
GridComp.prototype.loadChild = function(fk, rowIndex, level) {
  this.paintChild(fk, rowIndex, true, level);
  var pRow = this.model.getRow(rowIndex - 1);
  pRow.loadedChild = true;
};
GridComp.prototype.paintChild = function(key, rowIndex, hasParent, level) {
  this.model.initUIRows(rowIndex, null, key, level);
  this.paintZone(key, rowIndex, hasParent, level);
};
GridComp.expandAllNodes = function(gridId) {
  var oThis = window.objects[gridId];
  oThis.expandAllNodes();
};
GridComp.prototype.expandAllNodes = function() {
  if (this.model.treeLevel == null) return;
  for (var i = 0; i < this.model.rows.length; i++) {
    var gridRow = this.model.rows[i];
    if (gridRow.loadImg) {
      if (gridRow.loadImg.plus == true) {
        gridRow.loadImg.click();
      }
    }
  }
};
GridComp.prototype.expandAndSeclectNodesByRowIndex = function(index) {
  this.model.addRowSelected(index);
  var gridRow = this.model.rows[index];
  if (gridRow == null || gridRow.loadImg == null || gridRow.loadImg.plus == null || typeof(gridRow.loadImg) == "undefined" || typeof(gridRow.loadImg.plus) == "undefined") {
    return;
  }
  if (gridRow.loadImg) {
    if (gridRow.loadImg.plus == true) {
      if (typeof(gridRow.loadImg.onclick) == "function") {
        gridRow.loadImg.byCheckBox = true;
        gridRow.loadImg.onclick();
      } else if (typeof(gridRow.loadImg.click) == "function") {
        gridRow.loadImg.byCheckBox = true;
        gridRow.loadImg.click();
      }
    }
  }
  if (this.model.treeLevel == null || this.checkBoxModel == 0) return;
  var childrenRows = [];
  childrenRows = this.getChildrenRowsByRowIndex(index);
  if (childrenRows != null && childrenRows.length > 0) {
    for (var i = 0; i < childrenRows.length; i++) {
      var index = childrenRows[i];
      this.expandAndSeclectNodesByRowIndex(index);
    }
  }
};
GridComp.prototype.expandNodesByRowIndex = function(index) {
  var gridRow = this.model.rows[index];
  if (gridRow.loadImg.plus == true) {
    gridRow.loadImg.click();
  }
  if (this.model.treeLevel == null) return;
  var childrenRows = [];
  childrenRows = this.getChildrenRowsByRowIndex(index);
  if (childrenRows != null && childrenRows.length > 0) {
    for (var i = 0; i < childrenRows.length; i++) {
      var index = childrenRows[i];
      this.expandNodesByRowIndex(index);
    }
  }
};
GridComp.prototype.unselectNodesByRowIndex = function(index) {
  this.model.setRowUnSelected(index);
  if (this.model.treeLevel == null) return;
  var childrenRowIndexs = this.getChildrenRowsByRowIndex(index);
  if (childrenRowIndexs != null && childrenRowIndexs.length > 0) {
    for (var k = 0; k < childrenRowIndexs.length; k++) {
      this.unselectNodesByRowIndex(childrenRowIndexs[k]);
    }
  }
};
GridComp.prototype.getChildrenRowsByRowIndex = function(rowIndex) {
  var childrenRows = [];
  for (var i = 0; i < this.model.basicHeaders.length; i++) {
    var header = this.model.basicHeaders[i];
    if (header.isHidden == true) {
      continue;
    } else {
      var dataDiv = header.dataDiv;
      var cell = dataDiv.childNodes[rowIndex];
      for (var j = rowIndex + 1; j < dataDiv.childNodes.length; j++) {
        var cCell = dataDiv.childNodes[j];
        if (cCell.parentCell == cell) {
          childrenRows.push(j);
        }
      }
      break;
    }
  }
  return childrenRows;
};
GridComp.prototype.adjustRowHeight = function(rowIndex, cell) {
  if (typeof(this.rowMinHeight[rowIndex]) == "undefined") return;
  cell.style.textOverflow = "";
  cell.style.whiteSpace = "normal";
  cell.style.wordWrap = "break-word";
  cell.style.lineHeight = "";
  cell.style.overflow = "auto";
  cell.style.minHeight = "";
  var height = cell.offsetHeight;
  cell.realHeight = height;
  var defaultHeight = this.defaultRowMinHeight[rowIndex] == null ? GridComp.ROW_HEIGHT : this.defaultRowMinHeight[rowIndex];
  if (height < this.rowMinHeight[rowIndex]) {
    var maxHeight = defaultHeight;
    for (var i = 0; i < this.model.basicHeaders.length; i++) {
      var header = this.model.basicHeaders[i];
      if (header.isHidden == true) continue;
      if (header.dataDiv.cells && header.dataDiv.cells[rowIndex]) {
        if (header.dataDiv.cells[rowIndex].realHeight > maxHeight) maxHeight = header.dataDiv.cells[rowIndex].realHeight;
      }
    }
    this.setRowMinHeight(rowIndex, maxHeight);
  } else if (height == this.rowMinHeight[rowIndex]) {
    cell.style.minHeight = this.rowMinHeight[rowIndex] + "px";
  } else this.setRowMinHeight(rowIndex, height);
};
GridComp.prototype.setRowMinHeight = function(rowIndex, height) {
  this.rowMinHeight[rowIndex] = height;
  if (this.lineStateColumDiv) {
    this.lineStateColumDiv.cells[rowIndex].style.minHeight = height + "px";
  }
  if (this.selectColumDiv) {
    this.selectColumDiv.childNodes[rowIndex].style.minHeight = height + "px";
  }
  for (var i = 0; i < this.model.basicHeaders.length; i++) {
    var header = this.model.basicHeaders[i];
    if (header.isHidden == true) continue;
    if (header.dataDiv.cells && header.dataDiv.cells[rowIndex]) header.dataDiv.cells[rowIndex].style.minHeight = height + "px";
  }
};

function GridCompHeader(keyName, showName, width, dataType, sortable, isHidden, columEditable, defaultValue, columBgColor, textAlign, textColor, isFixedHeader, renderType, editorType, topHeader, groupHeader, isGroupHeader, isSumCol, isAutoExpand, isShowCheckBox, sumColRenderFunc, selectOnly, linkType, imgPath, target, viewURL, editMin, editSec, needNullOption) {
  width = getInteger(width, GridComp.COlUMWIDTH_DEFAULT);
  if (width < 35) {
    width = 35;
  }
  this.width = width;
  this.oldWidth = width;
  this.children = null;
  this.keyName = keyName;
  this.showName = getString(showName, "");
  this.isHidden = getBoolean(isHidden, false);
  this.parent = null;
  this.isFixedHeader = getBoolean(isFixedHeader, false);
  this.dataType = getString(dataType, DataType.STRING);
  this.sortable = getBoolean(sortable, true);
  this.textAlign = getString(textAlign, "left");
  this.columBgColor = getString(columBgColor, "");
  this.textColor = getString(textColor, "#333");
  this.defaultValue = getString(defaultValue, "");
  this.columEditable = getBoolean(columEditable, true);
  this.parser = null;
  this.renderType = renderType;
  this.editorType = getString(editorType, EditorType.STRINGTEXT);
  this.isSumCol = getBoolean(isSumCol, false);
  if (sumColRenderFunc) {
    this.sumColRenderFunc = sumColRenderFunc;
  }
  this.isAutoExpand = getBoolean(isAutoExpand, false);
  this.isGroupBy = false;
  this.isShowCheckBox = getBoolean(isShowCheckBox, true);
  this.isGroupHeader = getBoolean(isGroupHeader, false);
  this.selectOnly = getBoolean(selectOnly, true);
  this.linkType = getString(linkType, "");
  this.imgPath = getString(imgPath, "");
  this.target = getString(target, "");
  this.viewURL = getString(viewURL, "");
  this.editMin = getBoolean(editMin, true);
  this.editSec = getBoolean(editSec, true);
  this.needNullOption = getBoolean(needNullOption, false);
  this.refFieldArr = null;
  if (this.isGroupHeader) {
    this.topHeader = topHeader;
    if (this.topHeader == null || this.topHeader == "") this.allChildrenHeader = new Array();
    else this.topHeader.allChildrenHeader.push(this);
    if (groupHeader != null && groupHeader != "") {
      if (groupHeader.isHidden == true) this.isHidden == true;
      groupHeader.addChildHeader(this);
    }
  }
};
GridCompHeader.prototype.precisionNullType = "nullType";
GridCompHeader.prototype.precisionPositiveType = "positiveType";
GridCompHeader.prototype.precisionNegativeType = "negativeType";
GridCompHeader.prototype.replaceText = function(text) {
  if (this.textNode && text != null) {
    this.textNode.innerHTML = "";
    this.textNode.appendChild(document.createTextNode(text));
    this.showName = text;
  }
};
GridCompHeader.prototype.setShowState = function(state) {
  this.showState = state;
};
GridCompHeader.prototype.setRefFields = function(refFields) {
  this.refFieldsArr = refFields;
};
GridCompHeader.prototype.addChildHeader = function(header) {
  if (this.children == null) this.children = new Array();
  this.children.push(header);
  header.parent = this;
};
GridCompHeader.prototype.getHeadersByLevel = function(level) {
  var headers = this.getAllChildrenHeaderByLevel(level);
  return headers;
};
GridCompHeader.prototype.getAllLeftHeaders = function() {
  if (this.children == null) return;
  var depth = this.getDepth();
  var headers = new Array();
  var temp = null;
  for (var i = 0; i < depth; i++) {
    temp = this.getVisibleHeadersByLevel(i);
    if (temp != null && temp.length > 0) headers.push(temp[0]);
  }
  return headers;
};
GridCompHeader.prototype.getVisibleHeadersByLevel = function(level) {
  if (this.isHidden) return null;
  var headers = this.getAllChildrenHeaderByLevel(level);
  var temp = new Array();
  for (var i = 0; i < headers.length; i++) {
    if (headers[i].isHidden == false) temp.push(headers[i]);
  }
  headers = null;
  return temp;
};
GridCompHeader.prototype.getAllChildrenHeaderByLevel = function(level) {
  var temp = new Array();
  if (this.parent == null && this.children != null) {
    if (level == 0) {
      temp.push(this);
      return temp;
    } else {
      if (this.allChildrenHeader != null && this.allChildrenHeader.length > 0) {
        for (var i = 0; i < this.allChildrenHeader.length; i++) {
          if (this.allChildrenHeader[i].getHeaderLevel() == level) return this.allChildrenHeader[i].parent.children;
        }
      }
    }
  } else if (this.parent != null && this.children == null) {
    temp.push(this);
    return temp;
  } else {
    var currHeaderLevel = this.getHeaderLevel();
    var header = this;
    while (header.parent != null) header = header.parent;
    for (var i = 0; i < header.allChildrenHeader.length; i++) {
      if (header.allChildrenHeader[i].getHeaderLevel() == currHeaderLevel + 1 + level) return header.allChildrenHeader[i].parent.children;
    }
  }
  return temp;
};
GridCompHeader.prototype.getDepth = function() {
  return 1 + this.getMaxDepth(this);
};
GridCompHeader.prototype.getMaxDepth = function() {
  var maxDepth = 0;
  if (this.children != null) {
    var childs = this.children;
    for (var i = 0; i < childs.length; i++) {
      if (!childs[i].isHidden) {
        var depth = 1 + childs[i].getMaxDepth();
        if (depth > maxDepth) maxDepth = depth;
      }
    }
  }
  return maxDepth;
};
GridCompHeader.prototype.getHeaderLevel = function() {
  var level = 0;
  if (this.parent != null) level = 1 + this.parent.getHeaderLevel();
  return level == 0 ? 0 : level;
};
GridCompHeader.prototype.getColspan = function() {
  var w = 0;
  if (this.children != null) {
    for (var i = 0; i < this.children.length; i++) {
      if (!this.children[i].isHidden) {
        var ret = this.children[i].getColspan();
        w += ret;
      }
    }
  }
  return w == 0 ? 1 : w;
};
GridCompHeader.prototype.getBasicHeaders = function() {
  var basicHeaders = new Array();
  if (this.children == null) {
    basicHeaders.push(this);
  } else {
    this.getBasicHeader(this, basicHeaders);
  }
  return basicHeaders;
};
GridCompHeader.prototype.getBasicHeader = function(header, basicHeaders) {
  for (var i = 0; i < header.children.length; i++) {
    var childrenHeader = header.children[i];
    if (childrenHeader.children == null) basicHeaders.push(childrenHeader);
    else this.getBasicHeader(childrenHeader, basicHeaders);
  }
};
GridCompHeader.prototype.getBasicHeadersBySpecify = function() {
  var headers = new Array();
  if (this.children == null) {
    headers.push(this);
    return headers;
  } else {
    if (this.parent == null) return this.getBasicHeaders();
    else {
      var childLevel = this.getHeaderChildrenLevel();
      for (var i = 0; i <= childLevel; i++) {
        var currLevelHeaders = this.getAllChildrenHeaderByLevel(i);
        for (var j = 0; j < currLevelHeaders.length; j++) {
          if (currLevelHeaders[j].children == null) headers.push(currLevelHeaders[j]);
        }
      }
      return headers;
    }
  }
};
GridCompHeader.prototype.getDepthestHeadersNum = function() {
  if (this.parent != null) return null;
  return this.getColspan();
};
GridCompHeader.prototype.getRowspan = function(totalDepth) {
  var childLevel = 0;
  if (this.children != null) childLevel = this.getHeaderChildrenLevel();
  var rowspan = totalDepth - this.getHeaderLevel() - childLevel;
  return rowspan;
};
GridCompHeader.prototype.getHeaderChildrenLevel = function() {
  return this.getMaxDepth();
};
GridCompHeader.prototype.setFloatMinValue = function(minValue) {
  if (!isNaN(parseFloat(minValue))) {
    this.floatMinValue = parseFloat(minValue);
  } else this.floatMinValue = null;
};
GridCompHeader.prototype.setFloatMaxValue = function(maxValue) {
  if (!isNaN(parseFloat(maxValue))) {
    this.floatMaxValue = parseFloat(maxValue);
  } else this.floatMaxValue = null;
};
GridCompHeader.prototype.setIntegerMinValue = function(minValue) {
  if (minValue != null) {
    if (isNumber(minValue)) {
      if ((parseInt(minValue) >= -9007199254740992) && (parseInt(minValue) <= 9007199254740992)) this.integerMinValue = minValue;
      else this.integerMinValue = "";
    } else this.integerMinValue = -9007199254740992;
  }
};
GridCompHeader.prototype.setIntegerMaxValue = function(maxValue) {
  if (maxValue != null) {
    if (isNumber(maxValue)) {
      if (parseInt(maxValue) >= -9007199254740992 && parseInt(maxValue) <= 9007199254740992) this.integerMaxValue = maxValue;
      else this.integerMaxValue = "";
    } else this.integerMaxValue = 9007199254740992;
  }
};
GridCompHeader.prototype.setPrecision = function(precision, fromDs) {
  fromDs = (fromDs == null) ? false : fromDs;
  if (fromDs == true) {
    this.precisionFromDs = true;
  }
  if (this.precisionFromDs != null && this.precisionFromDs == true && fromDs == false) return;
  if (this.precision == null || this.precision != precision) {
    this.precision = getString(precision + "", "");
    if (this.precision == "" || this.precision == "null" || this.precision == "undefined") {
      this.precisionType = this.precisionNullType;
    } else {
      if (getInteger(precision, 0) < 0) {
        this.precisionType = this.precisionPositiveType;
        this.precision = this.precision.substring(1);
      } else {
        this.precisionType = this.precisionNegativeType;
      }
    }
    this.reRender();
    this.reSetDataset();
  }
};
GridCompHeader.prototype.reRender = function() {
  if (this.dataDiv && this.dataDiv.cells) {
    var grid = this.owner;
    for (var i = 0; i < this.dataDiv.cells.length; i++) {
      var cell = this.dataDiv.cells[i];
      if (cell == null) continue;
      var value = grid.model.getCellValueByIndex(i, cell.colIndex);
      if (cell.firstChild != null) cell.removeChild(cell.firstChild);
      if (this.renderType && this.renderType.render) {
        grid.renderCell(this.renderType, i, this.dataDiv.cells[i].colIndex, value, this, cell);
      }
      if (this.autoRowHeight == true) this.adjustRowHeight(i, cell);
    }
  }
};
GridCompHeader.prototype.reSetDataset = function() {
  if (this.dataDiv && this.dataDiv.cells) {
    var grid = this.owner;
    var dataset = grid.model.dataset;
    if (dataset == null) return;
    for (var i = 0; i < this.dataDiv.cells.length; i++) {
      var cell = this.dataDiv.cells[i];
      if (cell == null) continue;
      var index = dataset.nameToIndex(this.keyName);
      dataset.setValueAt(i, index, cell.value);
    }
  }
};
GridCompHeader.prototype.setMaxLength = function(maxLength) {
  this.maxLength = parseInt(maxLength);
};
GridCompHeader.prototype.setRequired = function(isRequired) {
  this.required = getBoolean(isRequired, false);
};
GridCompHeader.prototype.setNodeInfo = function(nodeInfo) {
  this.nodeInfo = nodeInfo;
};
GridCompHeader.prototype.setViewURL = function(viewURL) {
  this.viewURL = viewURL;
};
GridCompHeader.prototype.setPkField = function(pkField) {
  this.pkField = pkField;
};
GridCompHeader.prototype.setValuePair = function(valuePair) {
  this.valuePair = valuePair;
};
GridCompHeader.prototype.setShowImgOnly = function(showImgOnly) {
  this.showImgOnly = showImgOnly;
};
GridCompHeader.prototype.setHeaderComboBoxComboData = function(comboData) {
  this.comboData = comboData;
};
GridCompHeader.prototype.setHeaderLanguageComboBoxs = function(langugeComboDatas) {
  this.langugeComboDatas = langugeComboDatas;
};
GridCompHeader.prototype.destroySelf = function() {
  this.comboData = null;
  if (this.langugeComboDatas != null) this.langugeComboDatas = null;
  this.textNode = null;
  this.renderType = null;
  this.editorType = null;
  this.parent = null;
  this.topHeader = null;
  this.sumColRenderFunc = null;
  this.dataDiv = null;
  this.cell = null;
  if (this.dataTable) {
    this.dataTable.headerOwner = null;
    this.dataTable = null;
  }
  this.owner = null;
};
GridCompRow = Array;
GridCompRow.prototype.setRowData = function(row) {
  this.rowData = row;
};
GridCompRow.prototype.getRowData = function() {
  return this.rowData;
};
GridCompRow.prototype.setBindRelation = function(relation) {
  this.relation = relation;
};
GridCompRow.prototype.getCellValueByFieldName = function(name) {
  var dataset = this.rowData.dataset;
  var dsIndex = dataset.nameToIndex(name);
  return this.rowData.getCellValue(dsIndex);
};
GridCompRow.prototype.getColIndexByFieldName = function(name) {
  var dataset = this.rowData.dataset;
  var dsIndex = dataset.nameToIndex(name);
  for (var i = 0; i < this.relation.length; i++) {
    if (this.relation[i] == dsIndex) return i;
  }
  return -1;
};
GridCompRow.prototype.getFiledNameByColIndex = function(colIndex) {
  var dsColIndex = this.relation[colIndex];
  if (typeof(dsColIndex) == "undefined" || dsColIndex == -1) return null;
  var dataset = this.rowData.dataset;
  if (dataset.metadata[dsColIndex]) return dataset.metadata[dsColIndex].key;
  else return null;
};
GridCompRow.prototype.getCellValue = function(index) {
  if (this.relation != null) {
    if (index >= this.rowData.length || index < 0) showErrorDialog("Index out of bounds exception!");
    else {
      var relPosi = this.relation[index];
      return this.rowData.getCellValue(relPosi);
    }
  }
};
GridCompRow.prototype.setCellValue = function(index, value) {
  if (this.relation != null) {
    if (index >= this.rowData.length || index < 0) showErrorDialog("Index out of bounds exception!");
    else {
      var relPosi = this.relation[index];
      this.rowData.setCellValue(relPosi, value);
    }
  }
};
GridComp.prototype.paintFormData = function() {
  this.clearDivs();
  if (this.model == null) return;
  this.initConstant();
  this.initFormDivs();
  this.paintFormZone();
  this.attachFormEvents();
  if (this.showComp) this.hiddenComp();
};
GridComp.prototype.initFormDivs = function() {
  this.constant.fixedHeaderDivWidth = GridComp.SELECTCOLUM_WIDTH;
  this.initLineStateHeaderDiv();
  if (this.isRunMode) {
    this.initNoRowsDiv();
  }
  this.initFixedColumDiv();
  this.initFormOuterDiv();
  if (this.pageSize > 0) {
    if (this.isSimplePagination) {
      this.initSimplePaginationBar();
    } else {
      this.initPaginationBar();
    }
  }
};
GridComp.prototype.initFormOuterDiv = function() {
  this.formOuterDiv = $ce("div");
  this.outerDiv.appendChild(this.formOuterDiv);
  this.formOuterDiv.style.zIndex = 101;
  this.formOuterDiv.style.width = this.constant.outerDivWidth;
  this.formOuterDiv.style.left = "0px";
  if (this.canCopy == false) {
    document.body.onselectstart = function(e) {
      return false;
    };
    document.body.ondragstart = function(e) {
      return false;
    };
    this.formOuterDiv.style.MozUserSelect = "none";
  }
};
GridComp.prototype.paintFormZone = function(key, rowIndex, hasParent, level) {
  if (this.model == null) return;
  if (this.needPaintRows != null && this.needPaintRows == true) {
    this.needPaintRows = false;
    this.paintFormRows();
  } else {
    if (rowIndex == null) rowIndex = 0;
    var rows = this.model.getRows(key);
    if (rows == null || rows.length == 0) return;
    var modelLen = rows.length;
    var scrollLeft = this.formOuterDiv.scrollLeft;
    var rowHeihgt = this.rowHeight;
    var rowCount = this.model.getRowsCount();
    initLayoutMonitorState();
    this.cellForms = new Array();
    for (var i = 0; i < modelLen; i++) {
      if (hasParent) {
        if (level != null) {
          rows[i].level = level + 1;
          this.addFormOneRow(rows[i], rowIndex + i, scrollLeft, rowHeihgt, rowCount, rowIndex - 1);
        }
      } else this.addFormOneRow(rows[i], rowIndex + i, scrollLeft, rowHeihgt, rowCount, null);
    }
    this.clearHeadersOffsetWidth();
    setTimeout("executeLayoutMonitor()", 500);
  }
};
GridComp.prototype.paintFormRows = function(sort, startIndex, count) {
  this.constant.outerDivWidth = this.wholeDiv.offsetWidth;
  var fixedColumDivWidth = 0;
  this.formOuterDiv.style.width = this.constant.outerDivWidth;
  if (!sort) {
    this.model.rows = null;
    if (startIndex != null && count != null) this.model.initUIRows(startIndex, count);
    else this.model.initUIRows(startIndex);
  }
  var rowCount = this.getRowsNum();
  this.selectedRowIndice = null;
  this.currActivedCell = null;
  if (this.showComp) this.hiddenComp();
  var gridWidth = this.constant.outerDivWidth;
  this.initFormColumDataDiv();
  this.paintFormZone();
};
GridComp.prototype.initFormColumDataDiv = function() {
  var rowsNum = this.getRowsNum();
  if (this.noRowsDiv) {
    if (rowsNum <= 0) {
      this.needShowNoRowsDiv = true;
      if (this.model.dataset.lazyLoad == true) {
        setTimeout("GridComp.showNoRowsDiv('" + this.id + "');", 1500);
      } else {
        setTimeout("GridComp.showNoRowsDiv('" + this.id + "');", 500);
      }
    } else {
      this.needShowNoRowsDiv = false;
      this.noRowsDiv.style.display = "none";
    }
  }
  this.formColumDataDiv = $ce("div");
  if (this.formOuterDiv.childNodes[0] != null) {
    this.removeAllChildren(this.formOuterDiv);
  }
  this.formOuterDiv.appendChild(this.formColumDataDiv);
  this.formColumDataDiv.id = "formColumDataDiv";
  var formDataDivRealWidth = this.formOuterDiv.offsetWidth;
  this.realWidth = formDataDivRealWidth;
  this.formColumDataDiv.style.width = formDataDivRealWidth + "px";
  if (rowsNum > 0) {
    this.formColumDataDiv.style.marginBottom = "17px";
    this.formOuterDiv.style.overflow = "auto";
    this.formOuterDiv.style.display = "block";
  } else {
    this.formColumDataDiv.style.marginBottom = "0px";
    this.formOuterDiv.style.overflow = "hidden";
    this.formOuterDiv.style.display = "none";
  }
  if (isDivVScroll(this.formOuterDiv)) {
    this.setScrollTop(0);
  }
};
GridComp.prototype.addFormOneRow = function(row, index, scrollLeft, rowHeight, rowCount, parentRowIndex) {
  if (this.noRowsDiv) {
    this.noRowsDiv.style.display = "none";
    this.formColumDataDiv.style.marginBottom = "17px";
    this.formOuterDiv.style.overflow = "auto";
    this.formOuterDiv.style.display = "block";
  }
  var isOdd = this.isOdd(index);
  var cell = $ce("div");
  var rowCells = new Array();
  rowCells.push(cell);
  cell.rowIndex = index;
  if (row.hasChildren && row.hasChildren != null) cell.hasChildren = row.hasChildren;
  var cellStyle = cell.style;
  cellStyle.width = "100%";
  cell.className = isOdd ? "gridformcell_odd" : "gridformcell_even";
  this.formColumDataDiv.appendChild(cell);
  var formCompId = 'grid_cell_form' + index;
  var formAttr = {
    'eleWidth': '250',
    'labelMinWidth': '0',
    'formRender': null,
    'ellipsis': false
  };
  var cellForm = new AutoFormComp(cell, formCompId, 2, false, 22, 1, formAttr);
  this.cellForms.push(cellForm);
  for (var i = 0; i < this.model.basicHeaders.length; i++) {
    var header = this.model.basicHeaders[i];
    if (header.isHidden == true) continue;
    var eleId = header.keyName;
    var field = header.keyName;
    var eleWidth = header.width;
    var height = rowHeight - GridComp.CELL_BOTTOM_BORDER_WIDTH + "px";
    var rowSpan = 1;
    var colSpan = 1;
    var type = header.editorType;
    var userObject = {};
    var disabled = !header.columEditable;
    var readOnly = !header.columEditable;
    var dataset = null;
    if (type == "Reference") {
      dataset = this.model.dataset.id;
    }
    var labelName = header.showName;
    var labelColor = header.textColor;
    var nextLine = false;
    var required = header.required;
    var tip = null;
    var inputAssistant = null;
    var showTip = null;
    var description = null;
    var isAttachNext = false;
    var className = null;
    var cellFormEle = cellForm.createElement(eleId, field, eleWidth, height, rowSpan, colSpan, type, userObject, disabled, readOnly, dataset, labelName, labelColor, nextLine, required, tip, inputAssistant, showTip, description, isAttachNext, className);
  }
  cellForm.setDataset(this.model.dataset, index);
  if (IS_IE) {
    try {
      cellForm.pLayout.paint(true);
    } catch (e) {}
  }
  this.rowRender.render.call(this, row, rowCells);
};
GridComp.prototype.formCellValueChangedFunc = function(rowIndex, colIndex, newValue, oldValue) {
  if (this.model.basicHeaders[colIndex].isHidden == false) {
    var a = this.cellForms[rowIndex];
    var b = a.getElementByIndex(colIndex);
    b.setValue(newValue);
  }
  this.onCellValueChanged(rowIndex, colIndex, oldValue, newValue);
};
GridComp.prototype.formFireRowDeleted = function(indice) {
  if (this.outerDiv.offsetWidth == 0) {
    this.needPaintRows = true;
    return;
  };
  var gridWidth = this.constant.outerDivWidth;
  for (var i = 0, count = indice.length; i < count; i++) {
    if (this.currActivedCell != null && this.getCellRowIndex(this.currActivedCell) == indice[i]) this.hiddenComp();
    this.deleteFormRows([indice[i]]);
  }
  this.oldCell = null;
};
GridComp.prototype.deleteFormRows = function(indice) {
  initLayoutMonitorState();
  if (indice == null || indice.length <= 0) return;
  var deleCount = indice.length;
  indice.sort(ascendRule_int);
  var len = this.basicHeaders.length;
  for (var i = 0; i < deleCount; i++) {
    var index = indice[i];
    this.formColumDataDiv.removeChild(this.formColumDataDiv.childNodes[index]);
  }
};
GridComp.prototype.formFireRowInserted = function(index, level, parentRowIndex) {
  var gridHeight = this.constant.outerDivHeight;
  var areaHeight = 0;
  if (this.scroll) areaHeight = gridHeight - this.constant.headerHeight - GridComp.SCROLLBAE_HEIGHT;
  else areaHeight = gridHeight - this.constant.headerHeight;
  if (areaHeight < 0) areaHeight = 0;
  var basicHeaders = this.basicHeaders;
  var row = this.model.getRow(index);
  if (level != null) row.level = level + 1;
  this.setHeadersOffsetWidth();
  initLayoutMonitorState();
  this.addFormOneRow(row, index, this.formOuterDiv.scrollLeft, this.rowHeight, this.model.getRowsCount(), parentRowIndex);
  this.clearHeadersOffsetWidth();
  if (this.scrollState) {
    $("#" + this.outerDivId).perfectScrollbar('updateAllandLeft', this.outerDivId);
  }
  executeLayoutMonitor();
};
GridComp.prototype.attachFormEvents = function() {
  var oThis = this;
  this.formOuterDiv.onclick = function(e) {
    e = EventUtil.getEvent();
    oThis.formClick(e);
    stopEvent(e);
    clearEventSimply(e);
  };
  this.outerDiv.id = oThis.id + "_outerdiv";
  addResizeEvent(this.outerDiv, function() {
    GridComp.gridResize(oThis.id);
  });
  if (document.body.children[0]) {
    if (!document.body.children[0].gridMap) {
      document.body.children[0].gridMap = new HashMap();
    }
    document.body.children[0].gridMap.put(this.id, this);
    document.body.children[0].onscroll = function(e) {
      var grids = this.gridMap.values();
      for (var i = 0; i < grids.length; i++) {
        if (grids[i].showComp != null) {
          if (grids[i].autoScroll != true) grids[i].hiddenComp();
          else grids[i].autoScroll = false;
        }
      }
      stopEvent(e);
      clearEventSimply(e);
    };
  }
};
GridComp.prototype.formClick = function(e) {
  document.onclick(e);
  this.hideenColumnContentMenu();
  if (this.isGridActive == false) return;
  var cell = this.getRealFormCell(e);
  var rowIndex = this.getCellRowIndex(cell);
  if (this.showComp != null) this.hiddenComp();
  this.setFormFocusIndex(rowIndex);
  this.processCtrlSel(false, rowIndex);
};
GridComp.prototype.getRealFormCell = function(e) {
  var cell = getTarget(e);
  var pNode = cell;
  while (pNode != null) {
    if (pNode.parentNode.id == "formColumDataDiv") {
      cell = pNode;
      break;
    }
    pNode = pNode.parentNode;
  }
  return cell;
};
GridComp.prototype.setFormFocusIndex = function(rowIndex) {
  if (typeof(rowIndex) == "number" && rowIndex >= 0) {
    var oldFocusRowIndex = this.getFocusIndex();
    this.model.setFocusIndex(rowIndex);
    var headers = this.basicHeaders;
    if (typeof(oldFocusRowIndex) == "number" && oldFocusRowIndex >= 0 && rowIndex != oldFocusRowIndex) {
      var oldFocusCell = this.formColumDataDiv.childNodes[oldFocusRowIndex];
      if (typeof(oldFocusCell) == "object") {
        if (typeof(oldFocusCell.className) == "string" && oldFocusCell.className.indexOf("cell_focus") != -1) {
          oldFocusCell.className = oldFocusCell.className.replace(" cell_focus", "");
        }
        oldFocusCell.isFocusRow = false;
      }
    }
    var focusCell = this.formColumDataDiv.childNodes[rowIndex];
    if (typeof(focusCell) == "object") {
      if (typeof(focusCell.className) == "string") {
        if (focusCell.className.indexOf("cell_focus") == -1) {
          focusCell.className += " cell_focus";
        }
      } else {
        focusCell.className = " cell_focus";
      }
      focusCell.isFocusRow = true;
    }
    this.focusIndex = rowIndex;
  }
};
GridComp.prototype.getShowColIndex = function(colIndex) {
  var showColIndex = -1;
  for (var i = 0; i < this.basicHeaders.length; i++) {
    if (i <= colIndex) {
      if (!this.basicHeaders[i].isHidden) {
        showColIndex++;
      }
    }
  }
  return showColIndex;
};
GridComp.prototype.onCellClick = function(cell, rowIndex, colIndex) {
  var cellEvent = {
    "obj": this,
    "cell": cell,
    "rowIndex": rowIndex,
    "colIndex": colIndex
  };
  this.doEventFunc("onCellClick", cellEvent);
};
GridComp.prototype.getCellEditor = function(cell, rowIndex, colIndex) {
  var cellEvent = {
    "obj": this,
    "cell": cell,
    "rowIndex": rowIndex,
    "colIndex": colIndex
  };
  this.doEventFunc("cellEdit", cellEvent);
};
GridComp.prototype.onAfterEdit = function(rowIndex, colIndex, oldValue, newValue) {
  var afterCellEditEvent = {
    "obj": this,
    "rowIndex": rowIndex,
    "colIndex": colIndex,
    "oldValue": oldValue,
    "newValue": newValue
  };
  this.doEventFunc("afterEdit", afterCellEditEvent);
};
GridComp.prototype.onBeforeEdit = function(rowIndex, colIndex) {
  var beforeCellEditEvent = {
    "obj": this,
    "rowIndex": rowIndex,
    "colIndex": colIndex
  };
  var result = this.doEventFunc("beforeEdit", beforeCellEditEvent);
  if (result != null) return result;
};
GridComp.prototype.onCellValueChanged = function(rowIndex, colIndex, oldValue, newValue) {
  var cellValueChangedEvent = {
    "obj": this,
    "rowIndex": rowIndex,
    "colIndex": colIndex,
    "oldValue": oldValue,
    "newValue": newValue
  };
  this.doEventFunc("cellValueChanged", cellValueChangedEvent);
};
GridComp.prototype.onBeforeRowSelected = function(rowIndex, row) {
  var rowEvent = {
    "obj": this,
    "rowIndex": rowIndex,
    "row": row
  };
  return this.doEventFunc("beforeRowSelected", rowEvent);
};
GridComp.prototype.onRowDblClick = function(rowIndex, row) {
  var rowEvent = {
    "obj": this,
    "rowIndex": rowIndex,
    "row": row
  };
  this.doEventFunc("onRowDbClick", rowEvent);
};
GridComp.prototype.onRowSelected = function(rowIndex) {
  var rowSelectedEvent = {
    "obj": this,
    "rowIndex": rowIndex
  };
  this.doEventFunc("onRowSelected", rowSelectedEvent);
};
GridComp.prototype.onLinkClick = function(rowIndex, colIndex, value) {
  var linkClickEvent = {
    "obj": this,
    "rowIndex": rowIndex,
    "colIndex": colIndex,
    "value": value
  };
  this.doEventFunc("onLinkClick", linkClickEvent);
};
GridComp.prototype.onDataOuterDivContextMenu = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  return this.doEventFunc("onDataOuterDivContextMenu", mouseEvent);
};
GridComp.prototype.onLastCellEnter = function(e) {
  var gridEvent = {
    "obj": this,
    "event": e
  };
  return this.doEventFunc("onLastCellEnter", gridEvent);
};
GridComp.prototype.processPageCount = function(pageInfo) {
  var processPageCountEvent = {
    "obj": this,
    "pageInfo": pageInfo
  };
  this.doEventFunc("processPageCount", processPageCountEvent);
  return pageInfo;
};
GridComp.prototype.onBeforePaste = function(e) {
  var gridEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onBeforePaste", gridEvent);
};
GridComp.prototype.addProxyParam = function(eventName, proxy, params) {
  if ("afterEdit" == eventName) {
    proxy.addParam('rowIndex', params.rowIndex);
    proxy.addParam('colIndex', params.colIndex);
    proxy.addParam('newValue', params.newValue);
    proxy.addParam('oldValue', params.oldValue);
  } else if ("onLinkClick" == eventName) {
    proxy.addParam('rowIndex', params.rowIndex);
    proxy.addParam('colIndex', params.colIndex);
    proxy.addParam('value', params.value);
  } else if ("beforeEdit" == eventName) {
    proxy.addParam('rowIndex', params.rowIndex);
    proxy.addParam('colIndex', params.colIndex);
  } else if ("onCellClick" == eventName || "cellEdit" == eventName) {
    proxy.addParam('rowIndex', params.rowIndex);
    proxy.addParam('colIndex', params.colIndex);
  } else if ("cellValueChanged" == eventName) {
    proxy.addParam('rowIndex', params.rowIndex);
    proxy.addParam('colIndex', params.colIndex);
  }
};
GridCompModel = Array;
GridCompModel.prototype.setHeaders = function(headers) {
  this.headers = headers;
};
GridCompModel.prototype.getHeaders = function() {
  return this.headers;
};
GridCompModel.prototype.getHeader = function(keyName) {
  for (var i = 0; i < this.headers.length; i++) {
    if (this.headers[i].keyName == keyName) {
      return this.headers[i];
    }
  }
  return null;
};
GridCompModel.prototype.getHeaderById = function(id) {
  for (var i = 0; i < this.headers.length; i++) {
    if (this.headers[i].id == id) {
      return this.headers[i];
    }
  }
  return null;
};
GridCompModel.prototype.getBasicHeaderById = function(id) {
  for (var i = 0; i < this.basicHeaders.length; i++) {
    if (this.basicHeaders[i].id == id) {
      return this.basicHeaders[i];
    }
  }
  return null;
};
GridCompModel.prototype.removeHeader = function(keyName) {
  for (var i = 0; i < this.headers.length; i++) {
    if (this.headers[i].keyName == keyName) {
      var header = this.headers[i];
      this.headers.splice(i, 1);
      return header;
    }
  }
  return null;
};
GridCompModel.prototype.getRow = function(index) {
  var tempIndex = parseInt(index);
  var row = this.rows[index];
  return row;
};
GridCompModel.prototype.getRowIndexById = function(id) {
  for (var i = 0, n = this.rows.length; i < n; i++) {
    if (this.rows[i].rowData.rowId == id) return i;
  }
  return -1;
};
GridCompModel.prototype.getRowIndexByValue = function(field, value) {
  for (var i = 0, n = this.rows.length; i < n; i++) {
    if (this.rows[i].getCellValueByFieldName(field) == value) return i;
  }
  return -1;
};
GridCompModel.prototype.getCellValueByIndex = function(rowIndex, colIndex) {
  var tempRowIndex = parseInt(rowIndex);
  var tempColIndex = parseInt(colIndex);
  if (tempRowIndex < 0 || tempRowIndex >= this.dataset.getRowCount()) return null;
  if (colIndex > this.basicHeaders.length - 1) return null;
  return this.rows[rowIndex].getCellValue(colIndex);
};
GridCompModel.prototype.getRows = function(key) {
  if (key != null) {
    return this.rowsMap[key];
  }
  if (this.rows == null || this.rows.length == 0) return null;
  return this.rows;
};
GridCompModel.prototype.sortable = function(sortHeaders, sortFuncs, ascendings) {
  if (this.rows == null || this.rows.length == 0) return;
  if (sortHeaders == null || sortHeaders.length == 0) return;
  if (sortFuncs != null && sortHeaders.length != sortFunsc.length) return;
  if (sortFuncs == null || ascendings.length == 0) {
    sortFuncs = new Array(sortHeaders.length);
    var dataType = null;
    for (var i = 0, count = sortHeaders.length; i < count; i++) {
      dataType = sortHeaders[i].dataType;
      if (dataType == DataType.INTEGER || dataType == DataType.INT) sortFuncs[i] = sortRowsByIntergerColum;
      else if (dataType == DataType.dOUBLE || dataType == DataType.UFDOUBLE || dataType == DataType.DOUBLE) sortFuncs[i] = sortRowsByDecimalColum;
      else sortFuncs[i] = defaultSortRows;
    }
  }
  if (ascendings == null || ascendings.length == 0) {
    ascendings = new Array(sortHeaders.length);
    for (var i = 0, count = ascendings.length; i < count; i++) ascendings[i] = -1;
  }
  if (sortHeaders.length == 1) {
    sortFuncs[0].index = this.basicHeaders.indexOf(sortHeaders[0]);
    sortFuncs[0].ascending = ascendings[0];
    var row1 = this.rows[0];
    var row2 = null;
    var needSort = false;
    for (var i = 1; i < this.rows.length; i++) {
      row2 = this.rows[i];
      if (row1.getCellValue(sortFuncs[0].index) != row2.getCellValue(sortFuncs[0].index)) {
        needSort = true;
        break;
      }
      row1 = this.rows[i];
    }
    if (needSort == true) {
      this.rows.sort(sortFuncs[0]);
      if (sortFuncs[0].ascending != sortHeaders[0].ascending) {
        this.rows.reverse();
      }
    }
  } else {
    for (var i = 0, count = sortHeaders.length; i < count; i++) {
      sortFuncs[i].index = this.basicHeaders.indexOf(sortHeaders[i]);
      sortFuncs[i].ascending = ascendings[i];
      this.rows.sort(sortFuncs[i]);
    }
  }
  this.owner.paintRows(true);
};
GridCompModel.prototype.initUIRows = function(startIndex, count, key, level) {
  if (this.rows == null) {
    this.rows = new Array;
  }
  var dsRows = null;
  if (startIndex == null) startIndex = 0;
  this.showTree = getBoolean(this.showTree, true);
  if (this.treeLevel != null && this.showTree == true) dsRows = this.filterRows(this.dataset, key);
  else dsRows = this.dataset.getRows();
  if (dsRows != null) {
    var bindRelation = this.bindRelation;
    var mrows = [];
    for (var i = 0, count = dsRows.length; i < count; i++) {
      var row = new GridCompRow();
      row.rowData = dsRows[i];
      row.relation = bindRelation;
      this.rows.splice(startIndex + i, 0, row);
      mrows[i] = row;
      mrows[i].hasChildren = this.hasChildren(this.dataset, dsRows[i]);
      if (level != null) mrows[i].level = level + 1;
    }
    if (key != null) {
      if (this.rowsMap == null) this.rowsMap = new Object;
      this.rowsMap[key] = mrows;
    }
  } else {
    if (key != null) {
      if (this.rowsMap == null) this.rowsMap = new Object;
      this.rowsMap[key] = [];
    }
  }
};
GridCompModel.prototype.getUIRowIndex = function(dsRow) {
  if (!dsRow) return -1;
  var rows = this.rows;
  for (var i = 0, count = rows.length; i < count; i++) {
    if (rows[i].rowData.rowId == dsRow.rowId) return i;
  }
  return -1;
};
GridCompModel.prototype.setValueAt = function(rowIndex, colIndex, newValue) {
  if (this.dataset == null) showErrorDialog("dataset is null!");
  else {
    var dsRow = this.rows[rowIndex].rowData;
    var oldValue = dsRow.getCellValue(this.bindRelation[colIndex]);
    if (oldValue != newValue) this.dataset.setValueAt(this.dataset.getRowIndex(dsRow), this.bindRelation[colIndex], newValue);
  }
};
GridCompModel.prototype.setCellValueAt = function(rowIndex, colIndex, newValue, oldValue) {
  if (this.dataset == null) showErrorDialog("dataset is null!");
  else {
    var dsRow = this.rows[rowIndex].rowData;
    var index = this.dataset.getRowIndex(dsRow);
    var row = this.dataset.getRow(index);
    row.setCellValue(this.bindRelation[colIndex], newValue);
    this.owner.cellValueChangedFunc(rowIndex, colIndex, newValue, oldValue);
  }
};
GridCompModel.prototype.onModelChanged = function(event) {
  var g = this.owner;
  if (!g) return;
  var showForm = g.showForm;
  if (RowSelectEvent.prototype.isPrototypeOf(event) && !showForm) {
    if (event.currentRow == null) return;
    var index = this.getUIRowIndex(event.currentRow);
    if (index == -1 && this.treeLevel != null) {
      var pkField = this.treeLevel.recursiveKeyField;
      var ppkField = this.treeLevel.recursivePKeyField;
      var parentIndex = this.dataset.nameToIndex(ppkField);
      var parentKey = event.currentRow.getCellValue(parentIndex);
      if (isNotNull(parentKey)) {
        var pRowIndex = this.getRowIndexByValue(pkField, parentKey);
        if (pRowIndex == -1) {
          var parentKeys = this.getParentKeys(this.dataset, parentKey);
          parentKeys.push(parentKey);
          while (parentKeys.length > 0) {
            var pKey = parentKeys[0];
            var index = this.getRowIndexByValue(pkField, pKey);
            if (index != -1) {
              var pRow = this.getRow(index);
              if (pRow.loadedChild != null && pRow.loadedChild == true) {
                g.showChildRows(pRowIndex);
              } else {
                expandGridChild.call(pRow.loadImg);
              }
            }
            parentKeys.splice(0, 1);
          }
        } else {
          var pRow = this.getRow(pRowIndex);
          var level = pRow.level == null ? 0 : pRow.level;
          if (pRow.loadedChild != null && pRow.loadedChild == true) {
            g.showChildRows(pRowIndex);
          } else if (pRow && pRow.loadImg) {
            expandGridChild.call(pRow.loadImg);
          }
        }
      }
      index = this.getUIRowIndex(event.currentRow);
    }
    if (index == -1) {
      if (g.selectedRowIndice != null && g.selectedRowIndice.length == 1) g.clearAllUISelRows();
      return;
    }
    if (g.isMultiSelWithBox == false) {
      if (event.isAdd) {
        g.rowSelected(index, true);
      } else {
        if (g.selectedRowIndice != null && g.selectedRowIndice.length > 0) g.clearAllUISelRows();
        g.rowSelected(index);
        if (g.oldCell != null && g.oldCell.rowIndex != index) {
          g.oldCell.className = g.oldClassName;
        }
      }
      if (g.getFocusIndex() != index) g.setFocusIndex(index);
    } else if (g.isMultiSelWithBox) {
      if (event.isMultiSelect) {
        var selRows = this.dataset.getSelectedRows();
        if (selRows != null && selRows.length > 0) {
          for (var i = 0, count = selRows.length; i < count; i++) {
            var rowIndex = this.getUIRowIndex(selRows[i]);
            if (rowIndex != -1) {
              var cell = g.selectColumDiv.cells[rowIndex];
              if (cell != null && cell.firstChild != null && cell.firstChild.checked != true) {
                cell.firstChild.checked = true;
                g.setCheckBoxChecked(true, rowIndex);
              }
            }
          }
        }
        g.clearAllUISelRows();
        this.setFocusIndex(-1);
      } else {
        var cell = g.selectColumDiv.cells[index];
        if (cell != null && cell.firstChild != null && cell.firstChild.checked != true) {
          cell.firstChild.checked = true;
          g.setCheckBoxChecked(true, index);
        }
        g.rowSelected(index);
      }
      var tempCheck = true;
      var tempCells = g.selectColumDiv.cells;
      if (tempCells) {
        var tempLen = tempCells.length;
        for (var k = 0; k < tempLen; k++) {
          if (tempCells[k] && tempCells[k].firstChild && tempCells[k].firstChild.checked == false) {
            tempCheck = false;
            break;
          }
        }
        if (tempCheck) {
          if (g.selectAllBox) g.selectAllBox.checked = true;
        }
      }
    }
  } else if (RowUnSelectEvent.prototype.isPrototypeOf(event) && !showForm) {
    var index = this.getUIRowIndex(this.dataset.getRow(event.currentRowIndex));
    if (index == -1) return;
    if (g.isMultiSelWithBox) {
      var cell = this.owner.selectColumDiv.cells[index];
      if (cell != null && cell.firstChild != null && cell.firstChild.checked != false) {
        cell.firstChild.checked = false;
        cell.firstChild.tempChecked = null;
        g.setCheckBoxChecked(false, index);
      }
      if (g.selectAllBox) g.selectAllBox.checked = false;
    }
    var headerLength = g.basicHeaders.length,
      selIndice = g.selectedRowIndice;
    if (selIndice != null && selIndice.length > 0) {
      var header = null,
        cell = null;
      for (var i = 0; i < selIndice.length; i++) {
        if (index == selIndice[i]) {
          for (var j = 0; j < headerLength; j++) {
            header = this.basicHeaders[j];
            if (header.isHidden == false) {
              if (header.dataDiv != null && header.dataDiv.cells != null) cell = header.dataDiv.cells[index];
              if (cell != null) {
                var isOdd = g.isOdd(index);
                if (header.isFixedHeader) {
                  if (cell.isErrorCell) cell.className = isOdd ? "fixed_gridcell_odd cell_error" : "fixed_gridcell_even cell_error";
                  else cell.className = isOdd ? "fixed_gridcell_odd" : "fixed_gridcell_even";
                } else {
                  if (cell.isErrorCell) cell.className = isOdd ? "gridcell_odd cell_error" : "gridcell_even cell_error";
                  else cell.className = isOdd ? "gridcell_odd" : "gridcell_even";
                }
                if (g.hasBorder) $(cell).addClass("cellExtendCss");
              }
            }
          }
          var node = g.lineStateColumDiv.cells[selIndice[i]];
          if (node.className != "row_state_div row_update_state" && node.className != "row_state_div row_add_state") {
            node.className = "row_state_div";
          }
          g.selectedRowIndice.splice(i, 1);
          if (g.selectedRowIndice.length == 0) g.selectedRowIndice = null;
          break;
        }
      }
    }
    if (g.isMultiSelWithBox == false) {
      g.setFocusIndex(-1);
    }
  } else if (DataChangeEvent.prototype.isPrototypeOf(event)) {
    var isBatch = event.isBatch;
    var dataset = g.model.dataset;
    if (isBatch == false) {
      var rowIndex = this.getUIRowIndex(event.currentRow);
      if (rowIndex == -1) return;
      var changColIndex = event.cellColIndex;
      var fieldBinded = dataset.isFieldExsit(changColIndex);
      if (fieldBinded != null) changColIndex = dataset.nameToIndex(fieldBinded);
      var colIndex = this.bindRelation.indexOf(changColIndex);
      if (colIndex != -1) {
        if (showForm) {
          g.formCellValueChangedFunc(rowIndex, colIndex, event.currentValue, event.oldValue);
        } else {
          g.cellValueChangedFunc(rowIndex, colIndex, event.currentValue, event.oldValue);
        }
        if (g.isShowSumRow && this.basicHeaders[colIndex].isSumCol && !showForm) {
          this.setSumColValue(colIndex, this.basicHeaders[colIndex].keyName);
        }
      }
      if (this.treeLevel && !showForm) {
        var ppkField = this.treeLevel.recursivePKeyField;
        var parentIndex = this.dataset.nameToIndex(ppkField);
        if (event.cellColIndex == parentIndex) {
          var rowData = event.currentRow;
          var gridRow = new GridCompRow();
          gridRow.setRowData(rowData);
          gridRow.setBindRelation(this.bindRelation);
          var oldpk = event.oldValue;
          var newpk = event.currentValue;
          var pkField = this.treeLevel.recursiveKeyField;
          var oldrowIndex = this.getRowIndexByValue(pkField, oldpk);
          var oldpRow = this.getRow(oldrowIndex);
          if (oldrowIndex == -1 || (oldpRow.loadedChild != null && oldpRow.loadedChild == true)) {
            this.rows.splice(rowIndex, 1);
            g.fireRowDeleted([rowIndex]);
          } else {
            expandGridChild.call(oldpRow.loadImg);
          }
          var newrowIndex = this.getRowIndexByValue(pkField, newpk);
          if (newrowIndex == -1) {
            gridIndex = this.getRowsCount();
            this.rows.splice(gridIndex, 0, gridRow);
            g.fireRowInserted(gridIndex);
          } else {
            var newpRow = this.getRow(newrowIndex);
            var newlevel = this.getRow(newrowIndex).level == null ? 0 : this.getRow(newrowIndex).level;
            if (newpRow.loadedChild != null && newpRow.loadedChild == true) {
              g.showChildRows(newrowIndex);
              gridIndex = this.getChildrenCount(newrowIndex) + newrowIndex + 1;
              this.rows.splice(gridIndex, 0, gridRow);
              g.fireRowInserted(gridIndex, newlevel, newrowIndex);
            } else {
              if (newpRow) {
                var firstHeader = this.getHeaderById(g.getVisibleColumnIds()[0]);
                var r = firstHeader.renderType;
                var colindex = newpRow.getColIndexByFieldName(firstHeader.keyName);
                var fcell = g.getCell(newrowIndex, colindex);
                fcell.hasChildren = true;
                r.render.call(g, newrowIndex, colindex, newpRow.getCellValue(colindex), firstHeader, fcell, this.getParentRowIndex(newrowIndex));
              }
              expandGridChild.call(newpRow.loadImg);
            }
          }
        }
      }
    } else {
      if (this.rows == null || this.rows.length == 0) return;
      var colIndex = event.cellColIndex;
      var uiColIndex = this.bindRelation.indexOf(colIndex);
      if (uiColIndex == -1) return;
      var currentValue = event.currentValue;
      for (var i = 0; i < this.rows.length; i++) {
        var oldValue = this.getCellValueByIndex(i, colIndex);
        if (showForm) {
          g.formCellValueChangedFunc(i, uiColIndex, currentValue, oldValue);
        } else {
          g.cellValueChangedFunc(i, uiColIndex, currentValue, oldValue);
        }
        if (g.isShowSumRow && this.basicHeaders[uiColIndex].isSumCol && !showForm) {
          this.setSumColValue(uiColIndex, this.basicHeaders[uiColIndex].keyName);
        }
      }
    }
  } else if (DataCheckEvent.prototype.isPrototypeOf(event) && !showForm) {
    var row = event.currentRow;
    var colIndice = event.cellColIndices;
    var rowIndex = this.getUIRowIndex(row);
    if (rowIndex == -1) return;
    var colIndices = [];
    for (var i = 0, count = event.cellColIndices.length; i < count; i++) {
      var index = this.bindRelation.indexOf(event.cellColIndices[i]);
      if (index != -1) colIndices.push(this.bindRelation.indexOf(event.cellColIndices[i]));
    }
    for (var i = 0, count = colIndices.length; i < count; i++) {
      var header = g.basicHeaders[colIndices[i]];
      if (header.isHidden) return;
      var cell = header.dataDiv.cells[rowIndex];
      if (cell != null) {
        if (event.rulesDescribe[i] != "") {
          cell.isErrorCell = true;
          var isOdd = g.isOdd(rowIndex);
          if (header.isFixedHeader) cell.className = isOdd ? "fixed_gridcell_odd cell_error" : "fixed_gridcell_even cell_error";
          else cell.className = isOdd ? "gridcell_odd cell_error" : "gridcell_even cell_error";
          cell.tip = event.rulesDescribe[i];
        } else {
          cell.isErrorCell = false;
          var isOdd = g.isOdd(rowIndex);
          if (header.isFixedHeader) cell.className = isOdd ? "fixed_gridcell_odd" : "fixed_gridcell_even";
          else cell.className = isOdd ? "gridcell_odd" : "gridcell_even";
          var title = row.getCellValue(colIndice);
          var editorType = header.editorType;
          if ("ComboBox" == editorType) {
            if (header.comboData != null && header.comboData.getValueArray() != null) {
              var varr = header.comboData.getValueArray();
              var vs = (title == null) ? [] : title.split(",");
              var indices = new Array;
              for (var i = 0; i < vs.length; i++) {
                var index = varr.indexOf(vs[i]);
                indices.push(index);
              }
              var parsedValueArr = new Array;
              if (indices.length > 0) {
                var narr = header.comboData.getNameArray();
                for (var i = 0; i < indices.length; i++) {
                  if (indices[i] != null && indices[i] != -1) parsedValueArr.push(narr[indices[i]]);
                  else parsedValueArr.push("");
                }
              }
              title = parsedValueArr.join(",");
            }
          }
          if ("DateText" == editorType) {
            var maskerType = "DATETEXT";
            var masker = getMasker(maskerType);
            if (masker != null) title = toColorfulString(masker.format(title));
          }
          cell.tip = title;
        }
        if (g.hasBorder) $(cell).addClass("cellExtendCss");
      }
    }
  } else if (PageChangeEvent.prototype.isPrototypeOf(event)) {
    if (g.isMultiSelWithBox && g.selectAllBox && g.selectAllBox.checked == true) {
      g.selectAllBox.checked = false;
    }
    if (showForm) {
      g.paintFormRows(false, event.pageIndex);
    } else {
      if (!g.paginationBar) {
        g.keepScroll = true;
      }
      g.paintRows(false, event.pageIndex);
    }
    if (g.isShowSumRow && !showForm) this.setSumColValue(null, null);
    g.setPaginationInfo();
    if (g.basicHeaders) {
      for (var i = 0, count = g.basicHeaders.length; i < count; i++) {
        var headerDiv = g.basicHeaders[i].contentDiv;
        if (headerDiv && headerDiv.sortImg && headerDiv.sortImg.parentNode) {
          headerDiv.sortImg.parentNode.removeChild(headerDiv.sortImg);
          headerDiv.sortImg = null;
        }
      }
    }
  } else if (RowInsertEvent.prototype.isPrototypeOf(event)) {
    if (g.isMultiSelWithBox && g.selectAllBox && g.selectAllBox.checked == true) {
      g.selectAllBox.click();
    }
    var rows = event.insertedRows;
    if (rows == null || rows.length == 0) return;
    var rowIndices = this.dataset.getRowIndices(rows);
    if (rowIndices != null) {
      var insertIndex = event.insertedIndex;
      var gridIndex = insertIndex;
      if (this.treeLevel != null) {
        var pkField = this.treeLevel.recursiveKeyField;
        for (var i = 0, count = rows.length; i < count; i++) {
          var rowData = rows[i];
          var gridRow = new GridCompRow();
          gridRow.setRowData(rowData);
          gridRow.setBindRelation(this.bindRelation);
          var parentKey = this.getParentKey(gridRow);
          if (parentKey == null || parentKey == "") {
            gridIndex = this.getRowsCount();
            this.rows.splice(gridIndex, 0, gridRow);
            if (showForm) {
              g.formFireRowInserted(gridIndex);
            } else {
              g.fireRowInserted(gridIndex);
            }
          } else {
            var pRowIndex = this.getRowIndexByValue(pkField, parentKey);
            if (pRowIndex == -1) {
              var parentKeys = this.getParentKeys(this.dataset, parentKey);
              parentKeys.push(parentKey);
              while (parentKeys.length > 0) {
                var pKey = parentKeys[0];
                var index = this.getRowIndexByValue(pkField, pKey);
                if (index == -1) {
                  gridIndex = this.getRowsCount();
                  this.rows.splice(gridIndex, 0, gridRow);
                  if (showForm) {
                    g.formFireRowInserted(gridIndex);
                  } else {
                    g.fireRowInserted(gridIndex);
                  }
                  break;
                } else {
                  var pRow = this.getRow(index);
                  if (pRow.loadedChild != null && pRow.loadedChild == true) {
                    g.showChildRows(pRowIndex);
                  } else {
                    if (pRow) {
                      var firstHeader = this.getHeaderById(g.getVisibleColumnIds()[0]);
                      var r = firstHeader.renderType;
                      var colindex = pRow.getColIndexByFieldName(firstHeader.keyName);
                      var fcell = g.getCell(pRowIndex, colindex);
                      fcell.hasChildren = true;
                      r.render.call(g, pRowIndex, colindex, pRow.getCellValue(colindex), firstHeader, fcell, this.getParentRowIndex(pRowIndex));
                    }
                    expandGridChild.call(pRow.loadImg);
                  }
                }
                parentKeys.splice(0, 1);
              }
            } else {
              var pRow = this.getRow(pRowIndex);
              var level = pRow.level == null ? 0 : pRow.level;
              if (pRow.loadedChild != null && pRow.loadedChild == true) {
                g.showChildRows(pRowIndex);
                gridIndex = this.getChildrenCount(pRowIndex) + pRowIndex + 1;
                this.rows.splice(gridIndex, 0, gridRow);
                if (showForm) {
                  g.formFireRowInserted(gridIndex, level, pRowIndex);
                } else {
                  g.fireRowInserted(gridIndex, level, pRowIndex);
                }
              } else {
                if (pRow) {
                  var firstHeader = this.getHeaderById(g.getVisibleColumnIds()[0]);
                  var r = firstHeader.renderType;
                  var colindex = pRow.getColIndexByFieldName(firstHeader.keyName);
                  var fcell = g.getCell(pRowIndex, colindex);
                  fcell.hasChildren = true;
                  r.render.call(g, pRowIndex, colindex, pRow.getCellValue(colindex), firstHeader, fcell, this.getParentRowIndex(pRowIndex));
                  if (pRow.loadImg) {
                    if (pRow.loadImg.click) {
                      expandGridChild.call(pRow.loadImg);
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        for (var i = 0, count = rows.length; i < count; i++) {
          var rowData = rows[i];
          var row = new GridCompRow();
          row.setRowData(rowData);
          row.setBindRelation(this.bindRelation);
          this.rows.splice(gridIndex, 0, row);
          if (showForm) {
            g.formFireRowInserted(gridIndex);
          } else {
            g.fireRowInserted(gridIndex);
          }
          gridIndex++;
        }
      }
      if (g.isShowSumRow && !showForm) this.setSumColValue(null, null);
    }
    if (g.sumRowCountSpan && !showForm) {
      var count = parseInt(g.sumRowCountSpan.innerHTML) + rowIndices.length;
      g.sumRowCountSpan.innerHTML = count;
    }
    if (gridIndex == 1 && !showForm) {
      g.adjustFixedColumDivHeight();
    }
  } else if (RowDeleteEvent.prototype.isPrototypeOf(event)) {
    if (event.deleteAll == false) {
      var indice = new Array();
      for (var i = 0, count = event.deletedIndices.length; i < count; i++) {
        var index = this.getUIRowIndex(event.deletedRows[i]);
        if (index != -1) {
          this.rows.splice(index, 1);
          indice.push(index);
        }
      }
      if (showForm) {
        g.formFireRowDeleted(indice);
      } else {
        g.fireRowDeleted(indice);
      }
      if (g.sumRowCountSpan && !showForm) {
        var count = parseInt(g.sumRowCountSpan.innerHTML) - indice.length;
        g.sumRowCountSpan.innerHTML = count;
      }
    } else if (event.deleteAll) {
      var indice = new Array();
      for (var i = 0, count = event.deletedIndices.length; i < count; i++) {
        var index = this.getUIRowIndex(event.deletedRows[i]);
        if (index != -1) {
          this.rows.splice(index, 1);
          indice.push(index);
        }
      }
      if (showForm) {
        g.formFireRowDeleted(indice);
      } else {
        g.fireRowDeleted(indice);
      }
      if (g.sumRowCountSpan && !showForm) {
        g.sumRowCountSpan.innerHTML = 0;
      }
    }
    if (g.isShowSumRow && !showForm) this.setSumColValue(null, null);
  } else if (DatasetUndoEvent.prototype.isPrototypeOf(event)) {
    g.paintRows();
    var indice = new Array();
    var selectedRows = this.dataset.getSelectedRows();
    var UIIndex = -1;
    if (selectedRows != null && selectedRows.length > 0) {
      for (var i = 0, count = selectedRows.length; i < count; i++) {
        UIIndex = this.getUIRowIndex(selectedRows[i]);
        if (UIIndex != -1) indice.push(UIIndex);
      }
      g.selectedRowIndice = indice;
      g.rowSelected(indice[0]);
    } else if (selectedRows != null && selectedRows.length == 0) {
      if (g.selectedRowIndice != null && g.selectedRowIndice.length == 0) g.selectedRowIndice = null;
    }
    if (g.isShowSumRow && !showForm) this.setSumColValue(null, null);
  } else if (StateClearEvent.prototype.isPrototypeOf(event) && !showForm) {
    for (var i = 0, count = g.lineStateColumDiv.childNodes.length; i < count; i++) {
      g.lineStateColumDiv.childNodes[i].className = "row_state_div";
    }
  } else if (MetaChangeEvent.prototype.isPrototypeOf(event)) {
    if (event.precision != null) {
      var index = this.bindRelation.indexOf(event.colIndex);
      if (index != -1) {
        this.basicHeaders[index].setPrecision(event.precision, true);
      }
    }
  } else if (DataFalseDelEvent.prototype.isPrototypeOf(event)) {
    var index = event.delRowIndex;
    var indice = new Array();
    indice.push(index);
    if (showForm) {
      g.formFireRowDeleted(indice);
    } else {
      g.fireRowDeleted(indice);
    }
    if (g.sumRowCountSpan && !showForm) {
      var count = parseInt(g.sumRowCountSpan.innerHTML) - indice.length;
      g.sumRowCountSpan.innerHTML = count;
    }
  }
  if (g.errorMsgDiv) {
    g.errorMsgDiv.style.display = "none";
  }
  if (g.offsetTimeout) clearTimeout(g.offsetTimeout);
  g.offsetTimeout = setTimeout(function() {
    g.offsetTimeout = null;
    if (g.wholeDiv) {
      g.constant.outerDivWidth = g.wholeDiv.offsetWidth;
      g.constant.outerDivHeight = g.wholeDiv.offsetHeight;
    }
  }, 500);
};
GridCompModel.prototype.setSumColValueByExecuteJs = function(gridColIndex, dsColName, sum) {
  if (dsColName == null || sum == null || gridColIndex == null) return;
  if (this.basicHeaders[gridColIndex].isSumCol) {
    var header = this.basicHeaders[gridColIndex];
    var sumCells = this.owner.dynSumRowDataDiv.childNodes;
    for (var i = 0; i < sumCells.length; i++) {
      if (sumCells[i].headKey == dsColName) {
        if (header.textAlign != null) textAlign = header.textAlign;
        if (header.sumColRenderFunc) {
          header.sumColRenderFunc.call(window, this.owner, this, sumCells[i], sum);
        } else {
          if (isNaN(sum)) sumCells[i].innerHTML = sum;
          else {
            var colorSum = toColorfulString(new NumberMasker(window.$maskerMeta.NumberFormatMeta).format(sum));
            sumCells[i].innerHTML = colorSum;
          }
        }
      }
    }
  }
};
GridCompModel.prototype.setSumColValue = function(gridColIndex, dsColName) {
  var textAlign = "center";
  if (gridColIndex == null && dsColName == null) {
    for (var i = 0, count = this.basicHeaders.length; i < count; i++) {
      var header = this.basicHeaders[i];
      if (header.isHidden == false && header.isSumCol) {
        var sum = this.dataset.totalSum([header.keyName], null, null, header.precision);
        var sumCells = this.owner.dynSumRowDataDiv.childNodes;
        if (typeof(sum[0]) != "undefined") sum = sum[0] + "";
        else sum = "";
        sum = GridComp.parseData(header, sum, true);
        for (var j = 0, count1 = sumCells.length; j < count1; j++) {
          if (sumCells[j].headKey == header.keyName) {
            if (header.textAlign != null) textAlign = header.textAlign;
            if (header.sumColRenderFunc) {
              header.sumColRenderFunc.call(window, this.owner, this, sumCells[j], sum);
            } else {
              if (isNaN(sum)) sumCells[i].innerHTML = sum;
              else {
                var colorSum = toColorfulString(new NumberMasker(window.$maskerMeta.NumberFormatMeta).format(sum));
                sumCells[j].innerHTML = colorSum;
              }
            }
          }
        }
      }
    }
  } else {
    if (this.basicHeaders[gridColIndex].isSumCol) {
      var header = this.basicHeaders[gridColIndex];
      var sum = this.dataset.totalSum([dsColName], null, null, header.precision);
      var sumCells = this.owner.dynSumRowDataDiv.childNodes;
      sum = GridComp.parseData(header, sum, true);
      for (var i = 0, count = sumCells.length; i < count; i++) {
        if (sumCells[i].headKey == header.keyName) {
          if (header.textAlign != null) textAlign = header.textAlign;
          if (header.sumColRenderFunc) {
            header.sumColRenderFunc.call(window, this.owner, this, sumCells[i], sum);
          } else {
            if (isNaN(sum)) sumCells[i].innerHTML = sum;
            else {
              var colorSum = toColorfulString(new NumberMasker(window.$maskerMeta.NumberFormatMeta).format(sum));
              sumCells[i].innerHTML = colorSum;
            }
          }
        }
      }
    }
  }
};
GridCompModel.prototype.addHeader = function(header, index) {
  if (this.headers == null) this.headers = new Array();
  if (index != -1 && typeof index != "undefined") this.headers.splice(index, 0, header);
  else this.headers.push(header);
};
GridCompModel.prototype.setRows = function(rows) {
  this.initBasicHeaders();
  this.rows = rows;
};
GridCompModel.prototype.setDataSet = function(dataset) {
  if (this.headers == null) {
    showErrorDialog("You must init headers before setDataSet!");
    return;
  }
  this.dataset = dataset;
  this.initBasicHeaders();
  this.initBindRelation();
  dataset.bindComponent(this);
  this.rows = null;
  this.initUIRows();
};
GridCompModel.prototype.initBindRelation = function() {
  if (this.basicHeaders == null || this.dataset == null) return;
  this.bindRelation = new Array();
  for (var i = 0, count = this.basicHeaders.length; i < count; i++) {
    var index = this.dataset.nameToIndex(this.basicHeaders[i].keyName);
    this.bindRelation.push(index);
    var metadata = this.dataset.metadata[index];
    if (metadata && metadata.precision != null) this.basicHeaders[i].setPrecision(metadata.precision, true);
  }
};
GridCompModel.prototype.getPageCount = function() {
  var pageInfo = this.dataset.getPageCount();
  return pageInfo;
};
GridCompModel.prototype.initBasicHeaders = function() {
  var header = null;
  var basics = null;
  this.basicHeaders = new Array();
  for (var i = 0, count = this.headers.length; i < count; i++) {
    header = this.headers[i];
    if (header.children == null) this.basicHeaders.push(header);
    else {
      basics = header.getBasicHeaders();
      header.basicHeaders = basics;
      for (var j = 0; j < basics.length; j++) {
        this.basicHeaders.push(basics[j]);
        basics[j].topHeader = header;
      }
    }
  }
};
GridCompModel.prototype.getBasicHeaders = function() {
  return this.basicHeaders;
};
GridCompModel.prototype.getRowsCount = function() {
  if (this.dataset == null) return 0;
  else return this.rows == null ? 0 : this.rows.length;
};
GridCompModel.prototype.getNewAddedRows = function() {
  if (this.dataset != null) {
    var newAdded = this.dataset.getNewAddedRows();
    if (newAdded != null && newAdded.length > 0) {
      var rows = new Array(newAdded.length);
      for (var i = 0, count = newAdded.length; i < count; i++) {
        var row = new GridCompRow();
        row.rowData = newAdded[i];
        rows[i] = row;
      }
      return rows;
    } else return null;
  }
  return null;
};
GridCompModel.prototype.getUpdatedRows = function() {
  if (this.dataset != null) {
    var updateRows = this.dataset.getUpdatedRows();
    if (updateRows != null && updateRows.length > 0) {
      var rows = new Array(updateRows.length);
      for (var i = 0, count = updateRows.length; i < count; i++) {
        var row = new GridCompRow();
        row.rowData = updateRows[i];
        rows.push(row);
      }
      return rows;
    } else return null;
  }
  return null;
};
GridCompModel.prototype.deleteRow = function(index) {
  if (this.dataset != null) this.dataset.deleteRows([index]);
};
GridCompModel.prototype.deleteRows = function(indice) {
  if (this.dataset != null) this.dataset.deleteRows(indice);
};
GridCompModel.prototype.getDeletedRows = function() {
  if (this.dataset != null) return this.dataset.getDeletedRows();
};
GridCompModel.prototype.getSelectedRows = function() {
  if (this.dataset != null) {
    var selectedRowsIndice = this.owner.selectedRowIndice,
      selectedRows = [];
    if (selectedRowsIndice != null && selectedRowsIndice.length > 0) {
      for (var i = 0; i < selectedRowsIndice.length; i++) {
        selectedRows.push(this.rows[selectedRowsIndice[i]]);
      }
    }
    if (selectedRows != null && selectedRows.length > 0) {
      var rows = new Array(selectedRows.length);
      for (var i = 0, count = selectedRows.length; i < count; i++) {
        var row = new GridCompRow();
        row.rowData = selectedRows[i];
        rows.push(row);
      }
      return rows;
    } else return null;
  }
  return null;
};
GridCompModel.prototype.isRowSelected = function(index) {
  var selRows = this.dataset.getSelectedRows();
  if (selRows != null && selRows.length > 0) {
    for (var i = 0, count = selRows.length; i < count; i++) {
      var rowIndex = this.getUIRowIndex(selRows[i]);
      if (rowIndex == index) return true;
    }
  }
  return false;
};
GridCompModel.prototype.setFocusIndex = function(index) {
  if (this.dataset != null) {
    if (index == -1) {
      this.dataset.setFocusRowIndex(-1);
    } else {
      var gridRow = this.getRow(index);
      if (gridRow != null) {
        var realIndex = this.dataset.getRowIndex(gridRow.rowData);
        this.dataset.setFocusRowIndex(realIndex);
      }
    }
  }
};
GridCompModel.prototype.setRowSelected = function(index) {
  if (this.dataset != null) {
    var gridRow = this.getRow(index);
    if (gridRow != null) {
      var realIndex = this.dataset.getRowIndex(gridRow.rowData);
      this.dataset.setRowSelected(realIndex);
    }
  }
};
GridCompModel.prototype.addRowSelected = function(indices) {
  if (this.dataset != null) {
    if (indices instanceof Array) {
      var realIndices = new Array;
      for (var i = 0; i < indices.length; i++) {
        var index = indices[i];
        var gridRow = this.getRow(index);
        var realIndex = this.dataset.getRowIndex(gridRow.rowData);
        realIndices.push(realIndex);
      }
      this.dataset.addRowSelected(realIndices);
    } else {
      var gridRow = this.getRow(indices);
      var realIndex = this.dataset.getRowIndex(gridRow.rowData);
      this.dataset.addRowSelected(realIndex);
    }
  }
};
GridCompModel.prototype.setRowUnSelected = function(indices) {
  if (this.dataset != null) {
    if (indices instanceof Array) {
      var realIndices = new Array;
      for (var i = 0; i < indices.length; i++) {
        var gridRow = this.getRow(indices[i]);
        var realIndex = this.dataset.getRowIndex(gridRow.rowData);
        realIndices.push(realIndex);
      }
      this.dataset.setRowUnSelected(realIndices);
    } else {
      var gridRow = this.getRow(indices);
      if (gridRow && gridRow.rowData) {
        var realIndex = this.dataset.getRowIndex(gridRow.rowData);
        this.dataset.setRowUnSelected(realIndex);
      }
    }
  }
};
GridCompModel.prototype.insertRow = function(row, index) {
  if (this.dataset != null) {
    var newRow = new GridCompRow();
    var headers = this.basicHeaders;
    if (row == null) {
      var dsRow = this.dataset.insertEmptyRow(index);
      newRow.rowData = dsRow;
      newRow.relation = this.bindRelation;
    } else {
      var dsRow = new DatasetRow();
      for (var i = 0, count = headers.length; i < count; i++) dsRow.setCellValue(this.bindRelation[i], row.getCellValue(i));
      this.dataset.insertRow(index, dsRow);
      newRow.rowData = dsRow;
      newRow.relation = this.bindRelation;
    }
    return newRow;
  }
};
GridCompModel.prototype.addRow = function(row) {
  var ds = this.dataset;
  if (this.basicHeaders == null || this.basicHeaders.length == 0) {
    showErrorDialog("basicHeaders为null!");
    return;
  }
  var headers = this.basicHeaders;
  if (this.dataset != null) {
    var newRow = new GridCompRow();
    if (row == null) {
      var dsRow = this.dataset.addEmptyRow();
      newRow.rowData = dsRow;
      newRow.relation = this.bindRelation;
    } else {
      if (!GridCompRow.prototype.isPrototypeOf(row)) {
        showErrorDialog("the parameter 'row' must be the instance of GridCompRow");
        return;
      }
      var dsRow = new DatasetRow();
      for (var i = 0, count = headers.length; i < count; i++) dsRow.setCellValue(this.bindRelation[i], row.getCellValue(i));
      newRow.rowData = dsRow;
      newRow.relation = this.bindRelation;
    }
    return newRow;
  }
};
GridCompModel.prototype.setEditable = function(isEditable) {
  this.owner.setEditable(isEditable);
};
GridCompModel.prototype.destroySelf = function() {
  this.bindRelation = null;
  this.dataset = null;
  this.rows = null;
  this.headers = null;
  this.owner = null;
  this.splice(0, this.length);
};
GridCompModel.prototype.getSelectedIndices = function() {
  if (this.owner != null) return this.owner.selectedRowIndice;
};
GridCompModel.prototype.getSelectedIndex = function() {
  var indices = this.getSelectedIndices();
  if (indices == null || indices.length == 0) return -1;
  return indices[0];
};
GridCompModel.prototype.getFocusIndex = function() {
  if (this.dataset != null) return this.dataset.getFocusRowIndex();
};
GridCompModel.prototype.setTreeLevel = function(level) {
  this.treeLevel = level;
};
GridCompModel.prototype.hasChildren = function(ds, row) {
  if (!this.treeLevel) return false;
  var ppkField = this.treeLevel.recursivePKeyField;
  var parentIndex = ds.nameToIndex(ppkField);
  var pkField = this.treeLevel.recursiveKeyField;
  var index = ds.nameToIndex(pkField);
  var rows = this.dataset.getRows();
  if (rows == null) return false;
  var rowArr = [];
  var pk_parent = row.getCellValue(index);
  if (getString(pk_parent, "") != "") {
    for (var i = 0; i < rows.length; i++) {
      var ppkValue = rows[i].getCellValue(parentIndex);
      if (ppkValue == pk_parent) return true;
    }
  }
  return false;
};
GridCompModel.prototype.getParentKey = function(gridRow) {
  if (!this.treeLevel) return null;
  var ppkField = this.treeLevel.recursivePKeyField;
  return gridRow.getCellValueByFieldName(ppkField);
};
GridCompModel.prototype.getChildrenCount = function(parentRowIndex) {
  var ppkField = this.treeLevel.recursivePKeyField;
  var pkField = this.treeLevel.recursiveKeyField;
  var pGridRow = this.getRow(parentRowIndex);
  var parentKey = pGridRow.getCellValueByFieldName(pkField);
  var count = 0;
  for (var i = 0, n = this.rows.length; i < n; i++) {
    if (this.rows[i].getCellValueByFieldName(ppkField) == parentKey) {
      count++;
      var count2 = 0;
      count2 = this.getChildrenCount(i);
      count = count + count2;
    }
  };
  return count;
};
GridCompModel.prototype.getParentRowIndex = function(index) {
  if (!this.treeLevel) return null;
  var ds = this.dataset;
  var ppkField = this.treeLevel.recursivePKeyField;
  var parentIndex = ds.nameToIndex(ppkField);
  var pkField = this.treeLevel.recursiveKeyField;
  var row = this.rows[index].rowData;
  var parentValue = row.getCellValue(parentIndex);
  if (parentValue == null) return null;
  var pIndex = this.getRowIndexByValue(pkField, parentValue);
  return pIndex;
};
GridCompModel.prototype.filterRows = function(ds, key) {
  if (this.treeLevel == null) {
    alert("不是树表，不支持此方法");
    return;
  }
  if (key == null) key = "";
  var ppkField = this.treeLevel.recursivePKeyField;
  var index = ds.nameToIndex(ppkField);
  var pkField = this.treeLevel.recursiveKeyField;
  var pkIndex = ds.nameToIndex(pkField);
  var rows = this.dataset.getRows();
  if (rows == null) return null;
  var allPks = new Array();
  for (var i = 0; i < rows.length; i++) {
    var pkValue = rows[i].getCellValue(pkIndex);
    allPks.push(pkValue);
  }
  for (var i = 0; i < rows.length; i++) {
    var ppkValue = rows[i].getCellValue(index);
    if (ppkValue == null) continue;
    if (allPks.indexOf(ppkValue) == -1) {
      rows[i].setCellValue(index, null);
    }
  }
  var rowArr = [];
  for (var i = 0; i < rows.length; i++) {
    var ppkValue = rows[i].getCellValue(index);
    if (ppkValue == null) ppkValue = "";
    if (key == ppkValue) {
      rowArr.push(rows[i]);
    }
  }
  return rowArr;
};
GridCompModel.prototype.getParentKeys = function(ds, key) {
  var parentKeys = new Array();
  var parentKey = this.getParentKeyFromDs(ds, key);
  while (parentKey != null) {
    parentKeys.splice(0, 0, parentKey);
    parentKey = this.getParentKeyFromDs(ds, parentKey);
  }
  return parentKeys;
};
GridCompModel.prototype.getParentKeyFromDs = function(ds, key) {
  var ppkField = this.treeLevel.recursivePKeyField;
  var parentIndex = ds.nameToIndex(ppkField);
  var pkField = this.treeLevel.recursiveKeyField;
  var pkIndex = ds.nameToIndex(pkField);
  var rows = this.dataset.getRows();
  if (rows == null) return null;
  for (var i = 0; i < rows.length; i++) {
    var pkValue = rows[i].getCellValue(pkIndex);
    if (pkValue == key) return rows[i].getCellValue(parentIndex);
  }
  return null;
};

function defaultSortRows(row1, row2) {
  var index = defaultSortRows.index;
  var ascending = defaultSortRows.ascending;
  var value1 = getString(row1.getCellValue(index), "");
  var value2 = getString(row2.getCellValue(index), "");
  return value1.localeCompare(value2);
};

function sortRowsByIntergerColum(row1, row2) {
  var index = sortRowsByIntergerColum.index;
  var ascending = sortRowsByIntergerColum.ascending;
  if (parseInt(row1.getCellValue(index)) < parseInt(row2.getCellValue(index))) return ascending == -1 ? -1 : 1;
  else if (parseInt(row1.getCellValue(index)) > parseInt(row2.getCellValue(index))) return ascending == -1 ? 1 : -1;
  else return 0;
};

function sortRowsByDecimalColum(row1, row2) {
  var index = sortRowsByDecimalColum.index;
  var ascending = sortRowsByDecimalColum.ascending;
  if (parseFloat(row1.getCellValue(index)) < parseFloat(row2.getCellValue(index))) return (ascending == -1) ? -1 : 1;
  else if (parseFloat(row1.getCellValue(index)) > parseFloat(row2.getCellValue(index))) return (ascending == -1) ? 1 : -1;
  else return 0;
};
DefaultRender.HEADERROW_HEIGHT = 29;
DefaultRender.plusImgSrc = window.themePath + "/ui/ctrl/grid/images/folder_off.png";
DefaultRender.minusImgSrc = window.themePath + "/ui/ctrl/grid/images/folder_on.png";

function DefaultRender() {};
DefaultRender.render = function(rowIndex, colIndex, value, header, cell, parentRowIndex) {
  var grid = this;
  var cellStyle = cell.style;
  cellStyle.overflow = "hidden";
  cellStyle.cursor = "default";
  cellStyle.textOverflow = "ellipsis";
  var cellHeight = 0;
  if (isPercent(cellStyle.height)) cellHeight = cell.offsetHeight;
  else cellHeight = parseInt(cellStyle.height);
  if (cellHeight > grid.rowHeight) {
    cellStyle.whiteSpace = "normal";
    cellStyle.wordWrap = "break-word";
    cellStyle.lineHeight = "";
    cellStyle.overflow = "auto";
  }
  if (value == null) value = "";
  cell.tip = value;
  cell.innerHTML = "";
  var firstHeader = grid.getFirstVisibleHeader();
  if ((parentRowIndex != null || cell.level != null) && firstHeader.keyName == header.keyName) {
    if (cell.level != null) {
      for (var i = 0; i < cell.level; i++) {
        cell.innerHTML += '<span style="float:left">&nbsp;&nbsp;&nbsp;&nbsp;</span>';
      }
    } else {
      cell.innerHTML = '<span style="float:left">&nbsp;&nbsp;&nbsp;&nbsp;</span>';
    }
  } else {
    cell.innerHTML = "";
  }
  if (grid.model.treeLevel != null && firstHeader.keyName == header.keyName && grid.showTree == true && cell.hasChildren && cell.hasChildren != null && cell.hasChildren == true) {
    var gridRow = grid.model.getRow(rowIndex);
    var loadImg = $ce("IMG");
    loadImg.style[ATTRFLOAT] = "left";
    if (cell.hasChildren && cell.hasChildren != null && cell.hasChildren == true) loadImg.src = DefaultRender.plusImgSrc;
    else loadImg.src = DefaultRender.minusImgSrc;
    loadImg.plus = true;
    loadImg.initialized = false;
    if (gridRow.loadImg) {
      loadImg.plus = gridRow.loadImg.plus;
      loadImg.initialized = gridRow.loadImg.initialized;
    }
    loadImg.style.margin = "6px";
    loadImg.style.marginTop = "9px";
    loadImg.style.width = "8px";
    loadImg.style.height = "8px";
    loadImg.owner = grid;
    loadImg.row = gridRow.rowData;
    loadImg.cell = cell;
    if (cell.level == null) cell.level = 0;
    loadImg.onclick = expandGridChild;
    cell.appendChild(loadImg);
    gridRow.loadImg = loadImg;
  }
  var userDiv = null;
  if (typeof fillCellContent != "undefined") {
    userDiv = fillCellContent.call(this, grid, rowIndex, colIndex, value, header, parentRowIndex);
  }
  if (userDiv == null) {
    var textSpan = $ce("SPAN");
    if (IS_IE7) textSpan.style.display = "inline-block";
    else textSpan.style.display = "block";
    textSpan.style.overflow = "hidden";
    textSpan.style.space = "nowrap";
    textSpan.style.textOverflow = "ellipsis";
    value = value.replaceAll("<", "&lt;");
    value = value.replaceAll(">", "&gt;");
    if (typeof(value) == "string") value = value.replaceAll("\n", "<br/>");
    textSpan.innerHTML = value;
    cell.appendChild(textSpan);
  } else cell.appendChild(userDiv);
  if (loadImg) {
    cell.style.cursor = "pointer";
    cell.onclick = function(e) {
      e = EventUtil.getEvent();
      if (header.columEditable != true || grid.editable != true) {
        expandGridChild.call(loadImg);
        if (grid.isMultiSelWithBox) {
          var cell = grid.getRealCell(e);
          var rowIndex = grid.getCellRowIndex(cell);
          grid.selectColumDiv.children[rowIndex].children[0].onmousedown(e);
          stopEvent(e);
          clearEventSimply(e);
        } else {
          grid.click(e);
        }
      }
    };
  }
};

function LanguageComboRender() {};
LanguageComboRender.render = function(rowIndex, colIndex, value, header, cell, parentRowIndex) {
  var grid = this;
  var ds = grid.model.dataset;
  var grid = this;
  var cellStyle = cell.style;
  cellStyle.overflow = "hidden";
  cellStyle.cursor = "default";
  cellStyle.textOverflow = "ellipsis";
  if (cell.offsetHeight > grid.rowHeight) {
    cellStyle.whiteSpace = "normal";
    cellStyle.wordWrap = "break-word";
    cellStyle.lineHeight = "";
    cellStyle.overflow = "auto";
  }
  if (value == null) value = "";
  cell.innerHTML = "";
  var firstHeader = grid.getFirstVisibleHeader();
  if ((parentRowIndex != null || cell.level != null) && firstHeader.keyName == header.keyName) {
    if (cell.level != null) {
      for (var i = 0; i < cell.level; i++) {
        cell.innerHTML += '<span style="float:left">&nbsp;&nbsp;&nbsp;&nbsp;</span>';
      }
    } else {
      cell.innerHTML = '<span style="float:left">&nbsp;&nbsp;&nbsp;&nbsp;</span>';
    }
  } else {
    cell.innerHTML = "";
  }
  if (grid.model.treeLevel != null && firstHeader.keyName == header.keyName && grid.showTree == true && cell.hasChildren && cell.hasChildren != null && cell.hasChildren == true) {
    var gridRow = grid.model.getRow(rowIndex);
    var loadImg = $ce("IMG");
    loadImg.style[ATTRFLOAT] = "left";
    if (cell.hasChildren && cell.hasChildren != null && cell.hasChildren == true) loadImg.src = DefaultRender.plusImgSrc;
    else loadImg.src = DefaultRender.minusImgSrc;
    loadImg.plus = true;
    loadImg.initialized = false;
    if (gridRow.loadImg) {
      loadImg.plus = gridRow.loadImg.plus;
      loadImg.initialized = gridRow.loadImg.initialized;
    }
    loadImg.style.margin = "6px";
    loadImg.style.marginTop = "9px";
    loadImg.style.width = "8px";
    loadImg.style.height = "8px";
    loadImg.owner = grid;
    loadImg.row = gridRow.rowData;
    loadImg.cell = cell;
    if (cell.level == null) cell.level = 0;
    loadImg.onclick = expandGridChild;
    cell.appendChild(loadImg);
    gridRow.loadImg = loadImg;
  }
  var realShowContent = "";
  realShowContent = getRealShowValue(grid, rowIndex, header.keyName, value);
  cell.tip = realShowContent;
  var userDiv = null;
  if (typeof fillCellContent != "undefined") {
    userDiv = fillCellContent.call(this, grid, rowIndex, colIndex, realShowContent, header, parentRowIndex);
  }
  if (userDiv == null) {
    var textSpan = $ce("SPAN");
    if (typeof(value) == "string") value = value.replaceAll("\n", "<br/>");
    textSpan.innerHTML = realShowContent;
    cell.appendChild(textSpan);
  } else cell.appendChild(userDiv);
  if (loadImg) {
    cell.style.cursor = "pointer";
    cell.onclick = function(e) {
      e = EventUtil.getEvent();
      if (header.columEditable != true || grid.editable != true) {
        expandGridChild.call(loadImg);
        if (grid.isMultiSelWithBox) {
          var cell = grid.getRealCell(e);
          var rowIndex = grid.getCellRowIndex(cell);
          grid.selectColumDiv.children[rowIndex].children[0].onmousedown(e);
          stopEvent(e);
          clearEventSimply(e);
        } else {
          grid.click(e);
        }
      }
    };
  }
};

function TextAreaRender() {};

function getRealShowValue(grid, rowIndex, fieldName, value) {
  var realShowContent = "";
  var currentLanguageCode = grid.currentLanguageCode;
  if (typeof(currentLanguageCode) == "undefined" || currentLanguageCode == null) {
    currentLanguageCode = "1";
  }
  if (currentLanguageCode != "1") {
    var langFieldName = fieldName + currentLanguageCode;
    var gridRow = grid.model.getRow(rowIndex);
    realShowContent = gridRow.getCellValueByFieldName(langFieldName);
    if (realShowContent == null || typeof(realShowContent) == "undefined" || "" == realShowContent || "null" == realShowContent) {
      realShowContent = value;
    }
  } else {
    realShowContent = value;
  }
  return realShowContent;
}

function expandGridChild(e) {
  var grid = this.owner;
  if (this.plus) {
    if (!this.initialized) {
      var ds = grid.model.dataset;
      var rowIndex = grid.getCellRowIndex(this.parentNode);
      var index = ds.nameToIndex(grid.model.treeLevel.recursiveKeyField);
      var row = this.row;
      var key = row.getCellValue(index);
      grid.loadChild(key, rowIndex + 1, this.cell.level);
      this.initialized = true;
    } else {
      var rowIndex = grid.getCellRowIndex(this.parentNode);
      grid.showChildRows(rowIndex);
    }
    this.plus = false;
    this.src = DefaultRender.minusImgSrc;
  } else {
    var rowIndex = grid.getCellRowIndex(this.parentNode);
    grid.hideChildRows(rowIndex);
    this.plus = true;
    this.src = DefaultRender.plusImgSrc;
  }
  adjustContainerFramesHeight();
  if (!(this.byCheckBox != null && this.byCheckBox == true)) {
    e = EventUtil.getEvent();
  }
  if (e) {
    stopAll(e);
    stopEvent(e);
  }
};

function ImageRender() {};
ImageRender.render = function(rowIndex, colIndex, value, header, cell) {};

function BooleanRender() {};
BooleanRender.render = function(rowIndex, colIndex, value, header, cell) {
  cell.style.overflow = "hidden";
  cell.style.textOverflow = "ellipsis";
  cell.style.cursor = "default";
  cell.style.textAlign = "center";
  value = (value == null) ? "" : value.toString();
  var grid = header.owner;
  if (GridComp.ROW_HEIGHT == DefaultRender.HEADERROW_HEIGHT) cell.style.paddingTop = "0px";
  else cell.style.paddingTop = "0px";
  var checkBox = $ce("INPUT");
  checkBox.type = "checkbox";
  checkBox.style.marginTop = "5px";
  checkBox.rowIndex = rowIndex;
  checkBox.colIndex = colIndex;
  cell.innerHTML = "";
  cell.appendChild(checkBox);
  cell.checkBox = checkBox;
  if (!header.valuePair) header.valuePair = ['Y', 'N'];
  if (header.valuePair != null) {
    if (value == header.valuePair[0]) {
      cell.trueValue = value;
      checkBox.defaultChecked = true;
      checkBox.checked = true;
    } else if (value == header.valuePair[1]) {
      cell.trueValue = value;
      checkBox.defaultChecked = false;
      checkBox.checked = false;
    }
    if (header.columEditable == false || grid.editable == false) checkBox.disabled = true;
    checkBox.onmousedown = function(e) {
      if (header.columEditable == false || grid.editable == false) {
        this.disabled = true;
        return false;
      }
      rowIndex = cell.rowIndex;
      if (this.checked == true) grid.model.setValueAt(rowIndex, colIndex, header.valuePair[1]);
      else grid.model.setValueAt(rowIndex, colIndex, header.valuePair[0]);
    };
    checkBox.onclick = function(e) {
      e = EventUtil.getEvent();
      stopDefault(e);
      stopEvent(e);
      clearEventSimply(e);
    };
  }
};

function BooleanImageRender() {};
BooleanImageRender.render = function(rowIndex, colIndex, value, header, cell) {
  cell.style.overflow = "hidden";
  cell.style.textOverflow = "ellipsis";
  cell.style.cursor = "default";
  value = (value == null) ? "" : value.toString();
  var grid = header.owner;
  if (header.valuePair != null) {
    if (value == header.valuePair[0]) cell.style.background = "#ffffff url('" + window.globalPath + "/html/image/checked.gif" + "') no-repeat center center";
    else if (value == header.valuePair[1]) cell.style.background = "#ffffff url('" + window.globalPath + "/html/image/unchecked.gif" + "') no-repeat center center";
  }
};

function IntegerRender() {};
IntegerRender.render = function(rowIndex, colIndex, value, header, cell) {
  cell.style.overflow = "hidden";
  cell.style.textOverflow = "ellipsis";
  cell.style.cursor = "default";
  cell.style.textAlign = "right";
  cell.innerHTML = "";
  var cellValue = GridComp.parseData(header, value);
  var result = getMasker(IntegerTextComp.prototype.componentType).format(cellValue);
  var cellDisplayVal = toColorfulString(result);
  cell.tip = cellDisplayVal;
  cell.innerHTML = cellDisplayVal;
};

function DecimalRender() {};
DecimalRender.render = function(rowIndex, colIndex, value, header, cell) {
  cell.style.overflow = "hidden";
  cell.style.textOverflow = "ellipsis";
  cell.style.cursor = "default";
  cell.style.textAlign = "right";
  cell.innerHTML = "";
  var cellValue = "";
  if (value) {
    if (isReturning()) {
      if (header.precisionType == header.precisionNegativeType) {
        cellValue = GridComp.parseData(header, value);
      } else if (header.precisionType == header.precisionPositiveType) {
        value = value + "";
        if (value.length - value.indexOf(".") - 1 < header.precision || value.indexOf(".") == -1) {
          value = GridComp.parseData(header, value);
        } else if (value.length - value.indexOf(".") - 1 == header.precision) {
          value = value;
        } else {
          var overLength = value.length - value.indexOf(".") - header.precision - 1;
          for (var i = 0; i < overLength; i++) {
            if (value.charAt(value.length - 1) == "0") {
              value = value.substring(0, value.length - 1);
            } else {
              break;
            }
          }
        }
        cellValue = value;
      } else {
        cellValue = value;
      }
    } else {
      if (header.precisionType != header.precisionNullType) {
        cellValue = GridComp.parseData(header, value);
      } else {
        cellValue = value;
      }
    }
  }
  cell.value = cellValue;
  var result = getMasker(FloatTextComp.prototype.componentType).format(cellValue);
  var cellDisplayVal = toColorfulString(result);
  cell.tip = cellValue;
  if (cell.firstChild != null) cell.removeChild(cell.firstChild);
  cell.innerHTML = cellDisplayVal;
};

function ComboRender() {};
ComboRender.render = function(rowIndex, colIndex, value, header, cell) {
  cell.style.overflow = "hidden";
  cell.style.textOverflow = "ellipsis";
  cell.style.cursor = "default";
  var parsedValue = "";
  if (header.comboData != null && header.comboData.getValueArray() != null) {
    var varr = header.comboData.getValueArray();
    var vs = (value == null) ? [] : value.split(",");
    var indices = new Array;
    for (var i = 0; i < vs.length; i++) {
      var index = varr.indexOf(vs[i].trim());
      indices.push(index);
    }
    var parsedValueArr = new Array;
    if (indices.length > 0) {
      var narr = header.comboData.getNameArray();
      for (var i = 0; i < indices.length; i++) {
        if (indices[i] != null && indices[i] != -1) parsedValueArr.push(narr[indices[i]]);
        else {
          if (header.selectOnly == true) {
            parsedValueArr.push("");
          } else {
            parsedValueArr.push(vs[i]);
          }
        }
      }
    }
    parsedValue = parsedValueArr.join(",");
  }
  if (header.showImgOnly == true) {
    cell.style.background = "url(" + parsedValue + ") no-repeat center";
    cell.style.backgroundColor = "";
  } else {
    cell.tip = parsedValue;
    cell.innerHTML = "";
    cell.appendChild(document.createTextNode(parsedValue));
  }
};
ComboRender.changeRender = function(grid, colIndex, comboData) {
  var header = grid.basicHeaders[colIndex];
  header.setHeaderComboBoxComboData(comboData);
  var comp = header.comboComp;
  if (comp) {
    comp.clearOptions();
    if (comboData != null) {
      var keyValues = comboData.getValueArray();
      var captionValues = comboData.getNameArray();
      if (header.showImgOnly) {
        for (var j = 0, count = keyValues.length; j < count; j++) comp.createOption(captionValues[j], keyValues[j], null, false, -1, true);
      } else {
        for (var j = 0, count = keyValues.length; j < count; j++) comp.createOption(captionValues[j], keyValues[j], null, false, -1, false);
      }
    }
  }
};

function EmailRender() {};
EmailRender.render = function(rowIndex, colIndex, value, header, cell) {
  if (value != null && value.trim() != "") {
    cell.style.overflow = "hidden";
    cell.style.textOverflow = "ellipsis";
    cell.style.cursor = "default";
    var mailContent = "<a href='mailto:" + value + "?subject='' enctype='text/plain' target='_blank'>" + value + "</a>";
    cell.tip = value;
    cell.innerHTML = mailContent;
  }
};

function UrlRender() {};
UrlRender.render = function(rowIndex, colIndex, value, header, cell) {
  if (value != null && value.trim() != "") {
    cell.style.overflow = "hidden";
    cell.style.textOverflow = "ellipsis";
    cell.style.cursor = "default";
    var urlContent = "<a href='#' onclick=\"window.open('http://" + value + "');return false;\">" + value + "</a>";
    cell.tip = value;
    cell.innerHTML = urlContent;
  }
};

function LinkRender() {};
LinkRender.render = function(rowIndex, colIndex, value, header, cell) {
  var grid = this;
  var grid = this;
  var cellStyle = cell.style;
  cellStyle.overflow = "hidden";
  cellStyle.cursor = "default";
  cellStyle.textOverflow = "ellipsis";
  var cellHeight = 0;
  if (isPercent(cellStyle.height)) cellHeight = cell.offsetHeight;
  else cellHeight = parseInt(cellStyle.height);
  if (cellHeight > grid.rowHeight) {
    cellStyle.whiteSpace = "normal";
    cellStyle.wordWrap = "break-word";
    cellStyle.lineHeight = "";
    cellStyle.overflow = "auto";
  }
  if (value == null) value = "";
  cell.tip = value;
  cell.innerHTML = "";
  var userDiv = null;
  if (typeof fillCellContent != "undefined") {
    userDiv = fillCellContent.call(this, grid, rowIndex, colIndex, value, header, parentRowIndex);
  }
  if (userDiv == null) {
    var textSpan = $ce("SPAN");
    if (typeof(value) == "string") value = value.replaceAll("\n", "<br/>");
    cell.appendChild(textSpan);
  } else cell.appendChild(userDiv);
  var a = $ce("a");
  a.href = "javascript:void(0)";
  a.onclick = function(e) {
    grid.onLinkClick(rowIndex, colIndex, value);
    e = EventUtil.getEvent();
    stopAll(e);
    clearEventSimply(e);
  };
  a.innerHTML = value;
  textSpan.appendChild(a);
};

function CheckBoxRender() {};
CheckBoxRender.render = function(rowIndex, colIndex, value, header, cell) {
  cell.style.overflow = "hidden";
  cell.style.textOverflow = "ellipsis";
  cell.style.cursor = "default";
  if (value == 1) cell.style.background = "#ffffff url('" + window.globalPath + "/html/image/checked.gif" + "') no-repeat center center";
  else if (value == 0) cell.style.background = "#ffffff url('" + window.globalPath + "/html/image/unchecked.gif" + "') no-repeat center center";
};

function SexRender() {};
SexRender.render = function(rowIndex, colIndex, value, header, cell) {
  cell.style.overflow = "hidden";
  cell.style.textOverflow = "ellipsis";
  cell.style.cursor = "default";
  if (value == 1) cell.style.background = "#ffffff url('" + window.globalPath + "/html/image/woman.gif" + "') no-repeat center center";
  else if (value == 0) cell.style.background = "#ffffff url('" + window.globalPath + "/html/image/man.gif" + "') no-repeat center center";
};

function DateRender() {};
DateRender.render = function(rowIndex, colIndex, value, header, cell) {
  cell.style.overflow = "hidden";
  cell.style.textOverflow = "ellipsis";
  cell.style.cursor = "default";
  if (value != null && value.length > 10) value = value.substring(0, 10);
  else if (value == null) value = "";
  else if (value == 0) value = "";
  if (value == null) value = "";
  var showValue = value;
  var maskerType = "DATETEXT";
  var masker = getMasker(maskerType);
  if (masker != null) showValue = toColorfulString(masker.format(value));
  cell.tip = showValue;
  cell.innerHTML = showValue;
};

function DateTimeRender() {};
DateTimeRender.render = function(rowIndex, colIndex, value, header, cell) {
  cell.style.overflow = "hidden";
  cell.style.textOverflow = "ellipsis";
  cell.style.cursor = "default";
  if (value == null) value = "";
  var showValue = value;
  var maskerType = "DateTimeText";
  var masker = getMasker(maskerType);
  if (masker != null) showValue = toColorfulString(masker.format(value));
  cell.tip = showValue;
  cell.innerHTML = showValue;
};

function ascendRule_int(a, b) {
  if (parseInt(a) < parseInt(b)) return -1;
  else if (parseInt(a) > parseInt(b)) return 1;
  else return 0;
};

function DefaultRowRender() {};
DefaultRowRender.render = function(row, rowCells) {};

function CellEditor(parent, row, colIndex) {};

function RadioGroupRender() {};
RadioGroupRender.render = function(rowIndex, colIndex, value, header, cell) {
  var grid = this;
  var selInd = -1;
  var showValue = value;
  var comp = new RadioGroupComp(cell, "RadioGroup" + rowIndex + colIndex, 0, rowIndex * 24, "100%", "absolute", {
    disabled: !grid.editable,
    readOnly: !grid.editable
  }, "");
  cell.style.overflow = "hidden";
  cell.style.textOverflow = "ellipsis";
  cell.style.cursor = "default";
  cell.comp = comp;
  if (header.comboData != null) {
    comp.setComboData(header.comboData);
    var keyValues = header.comboData.getValueArray();
    selInd = keyValues.indexOf(value);
    showValue = header.comboData.getNameByValue(value);
  }
  comp.setSelectedItem(selInd);
  cell.tip = showValue;
  var textListener = new Listener("valueChanged");
  textListener.func = function(valueChangeEvent) {
    grid.selectedCell = cell;
    GridComp.compValueChangeFun(grid, valueChangeEvent);
    var comp = valueChangeEvent.obj;
    var newValue = comp.getValue();
    var showValue = newValue;
    if (header.comboData != null) {
      showValue = header.comboData.getNameByValue(newValue);
    }
    cell.tip = showValue;
  };
  comp.addListener(textListener);
};

function PwdRender() {};
PwdRender.render = function(rowIndex, colIndex, value, header, cell, parentRowIndex) {
  cell.style.overflow = "hidden";
  cell.style.textOverflow = "ellipsis";
  cell.style.cursor = "default";
  cell.innerHTML = "●●●●●●";
};

function TreeLevel(id, dataset, type, recursivePkField, recursivePPkField, labelFields, masterKeyField, detailKeyParameter, labelDelims, loadField) {
  this.id = id;
  this.contextMenu = null;
  this.dataset = dataset;
  this.type = type;
  this.recursiveKeyField = recursivePkField;
  this.recursivePKeyField = recursivePPkField;
  this.labelFields = labelFields;
  this.masterKeyField = masterKeyField;
  this.labelDelims = labelDelims;
  this.loadField = loadField;
  this.detailKeyParameter = detailKeyParameter;
  this.parentLevel = null;
  this.childrenLevel = [];
};
TreeLevel.prototype.setContextMenu = function(menu) {
  this.contextMenu = menu;
};
TreeLevel.prototype.addTreeLevel = function(treeLevel) {
  treeLevel.parentLevel = this;
  this.childrenLevel.push(treeLevel);
};
TreeLevel.prototype.destroySelf = function() {
  if (this.childrenLevel != null) {
    for (var i = 0; i < this.childrenLevel.length; i++) {
      var clevel = this.childrenLevel[i];
      clevel.destroySelf();
    }
  }
  this.parentLevel = null;
  this.childrenLevel = null;
  this.contextMenu = null;
};

LabelComp.prototype = new BaseComponent;
LabelComp.prototype.componentType = "LABEL";

function LabelComp(parent, name, left, top, text, position, className, attr) {
  this.base = BaseComponent;
  this.base(name, left, top, "", "");
  this.text = text;
  this.parentOwner = parent;
  this.position = getString(position, "absolute");
  this.className = getString(className, "normallabel");
  this.textAlign = "left";
  if (attr) {
    this.textAlign = getString(attr.textAlign, this.textAlign);
  }
  this.noLineHeight = false;
  this.create();
};
LabelComp.prototype.create = function() {
  this.Div_gen = $ce("DIV");
  this.Div_gen.id = this.id;
  this.Div_gen.style.position = this.position;
  this.Div_gen.style.left = this.left + "px";
  this.Div_gen.style.top = this.top + "px";
  this.Div_gen.className = this.className;
  this.Div_gen.style.textOverflow = "ellipsis";
  this.Div_gen.style.overflow = "hidden";
  this.Div_gen.style.whiteSpace = "nowrap";
  this.Div_gen.style.cursor = "default";
  this.Div_gen.title = this.text;
  this.Div_gen.style.textAlign = this.textAlign;
  this.Div_gen.appendChild(document.createTextNode(this.text));
  if (this.parentOwner) {
    this.placeIn(this.parentOwner);
  }
};
LabelComp.prototype.manageSelf = function() {
  var oThis = this;
  this.Div_gen.onmouseover = function(e) {
    e = EventUtil.getEvent();
    oThis.onmouseover(e);
    clearEventSimply(e);
  };
  this.Div_gen.onmouseout = function(e) {
    e = EventUtil.getEvent();
    oThis.onmouseout(e);
    clearEventSimply(e);
  };
};
LabelComp.prototype.setTextAlign = function(textAlign) {
  this.textAlign = textAlign;
  this.Div_gen.style.textAlign = this.textAlign;
};
LabelComp.prototype.setHeight = function(height) {
  this.height = height;
  this.Div_gen.style.height = getString(convertHeight(this.height), '100%');
  if (!this.noLineHeight) {
    if (this.Div_gen.offsetHeight == 0) {
      this.Div_gen.style.lineHeight = getString(convertHeight(this.height), '100%');
    } else this.Div_gen.style.lineHeight = this.Div_gen.offsetHeight + "px";
  }
};
LabelComp.prototype.setWidth = function(width) {
  this.width = width;
  this.Div_gen.style.width = getString(convertWidth(this.width), '100%');
  this.Div_gen.style.lineWidth = getString(convertWidth(this.width), '100%');
};
LabelComp.prototype.setColor = function(color) {
  this.color = color;
  this.Div_gen.style.color = this.color;
  this.ctxChanged = true;
  this.notifyChange("color", this.color);
};
LabelComp.prototype.setStyle = function(style) {
  this.style = style;
  this.Div_gen.style.fontStyle = this.style;
};
LabelComp.prototype.setWeight = function(weight) {
  this.weight = weight;
  this.Div_gen.style.fontWeight = this.weight;
};
LabelComp.prototype.setSize = function(size) {
  this.size = size;
  this.Div_gen.style.fontSize = this.size + "px";
};
LabelComp.prototype.setFamily = function(family) {
  this.family = family;
  this.Div_gen.style.fontFamily = this.family;
};
LabelComp.prototype.setMaxWidth = function(maxWidth) {
  this.maxWidth = maxWidth;
  if (this.maxWidth && this.maxWidth.indexOf("%") == -1) {
    var maxWidth = parseInt(this.maxWidth, 10);
    this.Div_gen.style.maxWidth = maxWidth + "px";
  }
};
LabelComp.prototype.setDecoration = function(decoration) {
  this.decoration = decoration;
  this.Div_gen.style.textDecoration = decoration;
};
LabelComp.prototype.changeText = function(text) {
  this.Div_gen.removeChild(this.Div_gen.firstChild);
  this.text = text;
  this.Div_gen.appendChild(document.createTextNode(this.text));
  this.ctxChanged = true;
  this.notifyChange(NotifyType.TEXT, this.text);
  this.Div_gen.style.lineHeight = getString(convertHeight(this.height), '100%');
  this.noLineHeight = false;
};
LabelComp.prototype.setInnerHTML = function(html) {
  this.Div_gen.innerHTML = html;
  if (this.maxWidth && this.maxWidth.indexOf("%") == -1) {
    var maxWidth = parseInt(this.maxWidth, 10);
    if (IS_IE && maxWidth < this.Div_gen.offsetWidth) {
      this.Div_gen.style.width = maxWidth + "px";
    }
  }
  this.Div_gen.style.lineHeight = null;
  this.noLineHeight = true;
};
LabelComp.prototype.inactive = function() {
  this.Div_gen.className = "label_inactive";
  this.disabled = true;
  this.ctxChanged = true;
  this.notifyChange(NotifyType.ENABLE, !this.disabled);
};
LabelComp.prototype.active = function() {
  this.Div_gen.className = this.className;
  this.disabled = false;
  this.ctxChanged = true;
  this.notifyChange(NotifyType.ENABLE, !this.disabled);
};
LabelComp.prototype.onmouseover = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onmouseover", mouseEvent);
};
LabelComp.prototype.onmouseout = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onmouseout", mouseEvent);
};
LabelComp.prototype.changeClass = function(className) {
  this.Div_gen.className = className;
};
LabelComp.prototype.setVisible = function(visible) {
  if (this.visible == visible) return;
  if (visible) this.showV();
  else this.hideV();
  this.notifyChange(NotifyType.VISIBLE, visible);
};
LabelComp.prototype.setChangedContext = function(context) {
  if (context.enable != null && context.enable == true) this.active();
  else if (context.enable != null && context.enable == false) this.inactive();
  if (context.text != null && context.text != this.text) this.changeText(context.text);
  if (context.innerHTML != null) {
    if (IS_IE8) {
      context.innerHTML = context.innerHTML.replace(/\<marquee>/g, "");
      context.innerHTML = context.innerHTML.replace(/\<\/marquee>/g, "");
    }
    this.setInnerHTML(context.innerHTML);
  }
  if (context.color != null) this.setColor(context.color);
  if (context.style != null) this.setStyle(context.style);
  if (context.weight != null) this.setWeight(context.weight);
  if (context.size != null) this.setSize(context.size);
  if (context.family != null) this.setFamily(context.family);
  if (context.visible != null && context.visible != this.visible) {
    this.setVisible(context.visible);
  }
  if (context.decoration != null) this.setDecoration(context.decoration);
};

TextComp.prototype = new BaseComponent;
TextComp.prototype.componentType = "TEXT";
TextComp.prototype.inputClassName_init = IS_IE7 ? "text_input" : "input_normal_center_bg text_input";
TextComp.prototype.inputClassName_inactive = IS_IE7 ? "text_input_inactive" : "input_disable_center_bg text_input_inactive";
TextComp.prototype.inputClassName_readonly = IS_IE7 ? "text_input_inactive" : "input_readonly_center_bg text_input_inactive";
TextComp.prototype.label_input_margin = 10;

function TextComp(parent, name, left, top, width, dataType, position, attrArr, className) {
  if (arguments.length == 0) return;
  this.base = BaseComponent;
  this.base(name, left, top, width, "");
  this.dataType = getString(dataType, "A");
  this.parentOwner = parent;
  this.position = getString(position, "absolute");
  if (this.dataType == "P") this.inputType = "password";
  else if (this.dataType == "HI") this.inputType = "hidden";
  else if (this.dataType == "C") this.inputType = "checkbox";
  else if (this.dataType == "F") {
    this.inputType = "file";
  } else this.inputType = "text";
  this.uppercase = false;
  this.maxSize = -1;
  this.value = getString(this.value, "");
  this.disabled = false;
  this.readOnly = false;
  this.nullable = true;
  this.mayFocus = false;
  this.isError = false;
  this.checkResult = BaseComponent.ELEMENT_NORMAL;
  this.message;
  this.errorMessage;
  this.focused = false;
  this.designModel = false;
  if (attrArr != null) {
    this.maxSize = getInteger(attrArr.maxSize, this.maxSize);
    this.disabled = getBoolean(attrArr.disabled, false);
    this.nullable = getBoolean(attrArr.nullable, true);
    this.value = getString(attrArr.value, this.value);
    this.readOnly = getBoolean(attrArr.readOnly, false);
    if (IS_IE8) {
      if (this.readOnly) {
        this.readOnly = false;
        this.disabled = true;
      }
    }
    this.tabIndex = getInteger(attrArr.tabIndex, -1);
    this.tip = getString(attrArr.tip, "");
    this.showTipMessage = getString(attrArr.showTipMessage, "");
    this.designModel = getBoolean(attrArr.designModel, false);
    this.inputAssistant = getString(attrArr.inputAssistant, "");
    if (attrArr.height != null) this.height = convertHeight(attrArr.height);
    if (this.dataType != "C" && this.dataType != "RA") {
      this.labelText = getString(attrArr.labelText, "");
      if ("" != this.labelText) this.hasLabel = true;
      this.labelAlign = getString(attrArr.labelAlign, "left");
      this.labelWidth = getInteger(attrArr.labelWidth, 0);
      if (0 == this.labelWidth && "" != this.labelText) this.labelWidth = getTextWidth(this.labelText);
    }
    this.stopHideDiv = attrArr.stopHideDiv == true ? true : false;
  }
  if (this.dataType == 'A' || this.dataType == 'P') {
    if (this.maxSize != -1) {
      if (this.value.lengthb() > this.maxSize) this.value = this.value.substrCH(this.maxSize);
    }
  }
  if (IS_IPAD) {
    window.clickHolders.push(this);
  }
  this.className = getString(className, "text_div");
  this.create();
};
TextComp.prototype.setEditFormular = function(editFormular) {
  this.editFormular = editFormular;
};
TextComp.prototype.setValidateFormular = function(validateFormular) {
  this.validateFormular = validateFormular;
};
TextComp.prototype.setTip = function(tip) {
  this.tip = tip;
};
TextComp.prototype.postProcessNewValue = function(value) {
  return value;
};
TextComp.prototype.create = function() {
  var oThis = this;
  this.Div_gen = $ce("DIV");
  this.Div_gen.id = this.id;
  this.Div_gen.style.position = this.position;
  this.Div_gen.style.left = this.left + "px";
  this.Div_gen.style.top = this.top + "px";
  this.Div_gen.style.width = this.width == null ? '120px' : this.width;
  this.Div_gen.style.height = "100%";
  this.initErrorMsg();
  if (this.parentOwner) this.placeIn(this.parentOwner);
  if (this.readOnly) this.setReadOnly(this.readOnly);
  this.ctxChanged = false;
};
TextComp.prototype.manageSelf = function() {
  this.Div_text = $ce("DIV");
  this.Div_text.id = this.id + "_textdiv";
  this.Div_text.className = this.className;
  this.Div_text.style.position = "relative";
  this.Div_text.style.top = "0px";
  var width = 0;
  if (isPercent(this.width)) width = this.Div_gen.offsetWidth;
  else width = getInteger(parseInt(this.width), 120);
  if (width == 0) {
    if (this.parentOwner.style.width && this.parentOwner.style.width.indexOf("%") == -1) {
      width = parseInt(this.parentOwner.style.width, 10);
    }
    if (width == 0) {
      width = 120;
    }
  }
  this.Div_text.style.width = (width - 4) < 0 ? 0 : (width - 4) + "px";
  if (IS_FF) this.Div_text.style.height = 23 + "px";
  if (this.hasLabel) this.Div_text.style.width = (width - this.labelWidth - this.label_input_margin) < 0 ? 0 : (width - this.labelWidth - this.label_input_margin) + "px";
  this.Div_text.style.overflow = "hidden";
  if (this.hasLabel) {
    this.labelDiv = $ce("DIV");
    this.labelDiv.style.width = (this.labelWidth) < 0 ? 0 : (this.labelWidth) + "px";
    if (this.labelAlign == "left") {
      this.labelDiv.style[ATTRFLOAT] = "left";
      this.Div_text.style[ATTRFLOAT] = "right";
      this.Div_gen.appendChild(this.labelDiv);
      this.Div_gen.appendChild(this.Div_text);
    } else if (this.labelAlign == "right") {
      this.Div_text.style[ATTRFLOAT] = "left";
      this.labelDiv.style[ATTRFLOAT] = "right";
      this.Div_gen.appendChild(this.Div_text);
      this.Div_gen.appendChild(this.labelDiv);
    }
    this.label = new LabelComp(this.labelDiv, this.id + "_label", "0px", "3px", this.labelText, "relative", "textcomp_normallabel");
  } else {
    this.Div_gen.appendChild(this.Div_text);
  }
  var width = parseInt(this.Div_text.style.width, 10);
  width = width < 10 ? 10 : width;
  var oThis = this;
  this.input = $ce("INPUT");
  this.input.type = this.inputType;
  if (!IS_STANDARD && (this.input.type == 'text' || this.input.type == 'password')) {
    this.input.style.paddingTop = "4px";
  }
  if (IS_IPAD || IS_SAFARI) {
    this.input.style.paddingLeft = "0px";
    this.input.style.paddingRight = "0px"
  }
  var left_div = $ce("DIV");
  left_div.className = "input_normal_left_bg";
  this.Div_text.appendChild(left_div);
  var center_div = $ce("DIV");
  center_div.className = "input_normal_center_div_bg";
  center_div.style.width = (width - 3 * 2) + "px";
  center_div.appendChild(this.input);
  this.Div_text.appendChild(center_div);
  if (IS_IE7) {
    this.input.style.marginTop = "3px";
  }
  var right_div = $ce("DIV");
  right_div.className = "input_normal_right_bg";
  this.Div_text.appendChild(right_div);
  if (this.dataType == "I" || this.dataType == "N") {
    this.input.style.textAlign = "right";
    this.input.style.imeMode = "disabled";
  }
  this.input.name = this.id;
  if (this.tabIndex != -1) this.input.tabIndex = this.tabIndex;
  if (this.maxSize != -1) this.input.maxLength = this.maxSize;
  this.input.readOnly = this.readOnly;
  this.input.style.width = (width - 10) + "px";
  if (this.Div_text.children.length == 3) {
    var centerWidth = width - 3 * 2;
    this.Div_text.children[1].style.width = centerWidth + "px";
    this.input.style.width = (centerWidth - 2 * 2) + "px";
  }
  if (!IS_IE6) this.input.style.height = "100%";
  this.input.className = this.inputClassName_init;
  if (this.disabled) {
    this.input.disabled = true;
    this.input.className = this.inputClassName_inactive;
    if (this.Div_text != null) {
      this.Div_text.className = this.className + " text_inactive_bgcolor";
      if (this.Div_text.children.length == 3) {
        var children = this.Div_text.children;
        for (var i = 0; i < children.length; i++) {
          if (typeof(children[i]) != "undefined") {
            children[i].className = children[i].className.replaceStr('input_normal', 'input_disable');
          }
        }
      }
    }
  }
  if (window.editMode) {
    this.input.style.visibility = "hidden";
  }
  this.input.onkeyup = function(e) {
    oThis.ctxChanged = true;
    e = EventUtil.getEvent();
    if (oThis.dataType == 'A' || oThis.dataType == 'P') {
      if (oThis.maxSize != -1) {
        var text = oThis.input.value;
        if (text.lengthb() > oThis.maxSize) {
          text = text.substrCH(oThis.maxSize);
          oThis.input.value = text;
        }
      }
    }
    oThis.onkeyup(e);
    clearEventSimply(e);
    if (window.pageUI) window.pageUI.setChanged(true);
  };
  this.input.onkeydown = function(e) {
    oThis.ctxChanged = true;
    e = EventUtil.getEvent();
    var keyCode = e.lfwKey;
    if (oThis.onkeydown(e) == false) {
      stopAll(e);
      clearEventSimply(e);
      return;
    }
    var con = (keyCode == 13 || (keyCode == 9 && e.shiftKey) || keyCode == 9);
    if (this.readOnly == true && !con) {
      stopAll(e);
      clearEventSimply(e);
      return false;
    }
    if (keyCode == 8 || keyCode == 46) oThis.haschanged(e);
    clearEventSimply(e);
  };
  this.input.onkeypress = function(e) {
    oThis.ctxChanged = true;
    e = EventUtil.getEvent();
    var keyCode = e.lfwKey;
    var con = (keyCode == 13 || (keyCode == 9 && e.shiftKey) || keyCode == 9);
    if (this.readOnly == true && !con) {
      stopAll(e);
      clearEventSimply(e);
      return false;
    }
    var formater = oThis.getFormater();
    if (keyCode == 13) {
      if (oThis.dataType == "N") {
        if (oThis.precisionType != oThis.precisionNullType) {
          oThis.newValue = oThis.getFormater().format(oThis.input.value);
        } else {
          oThis.newValue = oThis.input.value;
        }
      } else {
        oThis.newValue = oThis.getFormater().format(oThis.input.value);
      }
      if (oThis.processEnter) oThis.processEnter();
      if (typeof(oThis.fieldId) == 'undefined') oThis.input.blur();
      if (IS_IE) {
        setTimeout(function() {
          oThis.onenter(e);
        }, 100);
      } else {
        oThis.onenter(e);
      }
      clearEventSimply(e);
      return true;
    } else if (keyCode == 8) {
      oThis.haschanged(e);
      clearEventSimply(e);
      return true;
    } else if (keyCode == 118 && e.ctrlKey == true) {
      clearEventSimply(e);
      return true;
    }
    if (!IS_IE && (keyCode == 37 || keyCode == 39 || keyCode == 9)) {
      clearEventSimply(e);
      return true;
    }
    var key;
    if (keyCode) {
      key = String.fromCharCode(keyCode);
    }
    var currValue = oThis.input.value;
    if (oThis.dataType != "F") {
      var aggValue = insertAtCursor(this, key);
    }
    if (!IS_IE && aggValue == "") {
      aggValue = key;
    }
    if (this.selectionStart || this.selectionStart == "0") {} else if (document.selection) {
      document.execCommand("undo");
    }
    if (oThis.dataType == "N") {
      if (oThis.precisionType != oThis.precisionNullType) {
        if (formater.valid(key, aggValue, currValue) == false) {
          clearEventSimply(e);
          return false;
        }
      }
    } else {
      if (formater.valid(key, aggValue, currValue) == false) {
        clearEventSimply(e);
        return false;
      }
    }
    if (oThis.afterValid(keyCode, key) == false) {
      clearEventSimply(e);
      return false;
    }
    if (window.pageUI) window.pageUI.setChanged(true);
    clearEventSimply(e);
    return true;
  };
  this.input.onfocus = function(e) {
    e = EventUtil.getEvent();
    oThis.focused = true;
    oThis.warnIcon.style.display = "none";
    if (oThis.isError && typeof(oThis.errorMessage) == 'string' && oThis.errorMessage != '') {
      oThis.errorCenterDiv.innerHTML = oThis.errorMessage;
      if (!oThis.noShowErrorMsgDiv) {
        oThis.errorMsgDiv.style.display = "block";
      }
    }
    if (oThis.isError == false && oThis.dataType == 'I') oThis.errorMsgDiv.style.display = "none";
    if (oThis.input.value != oThis.newValue) {
      var value = oThis.postProcessNewValue(oThis.newValue);
      oThis.input.value = value;
    }
    if (oThis.Div_text.children.length == 3) {
      var children = oThis.Div_text.children;
      for (var i = 0; i < children.length; i++) {
        children[i].className = children[i].className.replaceStr('input_normal', 'input_highlight');
      }
      oThis.input.className = oThis.input.className.replaceStr('input_normal_center_bg', 'input_highlight_center_bg');
    }
    var length = oThis.input.value.length;
    if (oThis.input.createTextRange) {
      var r = oThis.input.createTextRange();
      r.collapse(true);
      r.moveStart('character', length);
      r.select();
    } else if (oThis.input.setSelectionRange) {
      oThis.input.setSelectionRange(length, length);
    }
    oThis.focus(e);
    oThis.hideTip();
    clearEventSimply(e);
  };
  this.input.onblur = function(e) {
    e = EventUtil.getEvent();
    oThis.focused = false;
    if (oThis.Div_text.children.length == 3) {
      var children = oThis.Div_text.children;
      for (var i = 0; i < children.length; i++) {
        if (typeof(children[i]) != "undefined") {
          children[i].className = children[i].className.replaceStr('input_highlight', 'input_normal');
        }
      }
      oThis.input.className = oThis.input.className.replaceStr('input_highlight_center_bg', 'input_normal_center_bg');
    }
    oThis.blur(e);
    if (!oThis.ingrid) {
      oThis.setValue(oThis.input.value);
    }
    oThis.showTip();
    clearEventSimply(e);
  };
  this.input.onselect = function(e) {
    e = EventUtil.getEvent();
    oThis.onselect(e);
    clearEventSimply(e);
  };
  this.input.onmouseover = function(e) {
    e = EventUtil.getEvent();
    oThis.onmouseover(e);
    clearEventSimply(e);
  };
  this.input.onclick = function(e) {
    oThis.warnIcon.style.display = "none";
    if (oThis.isError && typeof(oThis.errorMessage) == 'string' && oThis.errorMessage != '') {
      oThis.errorCenterDiv.innerHTML = oThis.errorMessage;
      if (!oThis.noShowErrorMsgDiv) {
        oThis.errorMsgDiv.style.display = "block";
      }
    }
    e = EventUtil.getEvent();
    oThis.onclick(e);
    window.clickHolders.trigger = oThis;
    document.onclick(e);
    stopEvent(e);
    clearEventSimply(e);
  };
  this.input.onpaste = function(e) {
    if (IS_SAFARI) {
      var text = e.clipboardData && e.clipboardData.getData ? e.clipboardData.getData('text/plain') : window.clipboardData && window.clipboardData.getData ? window.clipboardData.getData('Text') : false;
      if (text) oThis.setValue(text);
      return false;
    }
    if (oThis.onPaste) {
      var result = oThis.onPaste.call(oThis, e);
      if (result == false) {
        document.onclick(e);
        return false;
      } else return true;
    } else return true;
  };
  if (this.value != null) this.setValue(this.value);
  else this.showTip();
};
TextComp.prototype.setError = function(error) {
  this.isError = error;
};
TextComp.prototype.setValgin = function(valgin) {
  this.valgin = valgin;
  this.Div_gen.style.display = "table-cell";
  this.Div_gen.style.verticalAlign = "middle";
};
TextComp.prototype.checkTip = function() {
  if (this.tip != null && this.tip != "" && this.input.type == "text") return true;
  else return false;
};
TextComp.prototype.showTip = function() {
  if (this.checkTip()) {
    if (this.input.value == "") {
      if (this.isRequired) this.input.value = this.tip + "   ";
      else this.input.value = this.tip;
      this.input.style.color = "gray";
    }
  }
};
TextComp.prototype.hideTip = function() {
  if (this.checkTip()) {
    if (this.input.value == this.tip) {
      this.input.value = "";
      this.input.style.color = "black";
    }
  }
};
TextComp.prototype.setFormater = function(formater) {
  this.formater = formater;
};
TextComp.prototype.setTabIndex = function(index) {
  this.input.tabIndex = index;
};
TextComp.prototype.getFormater = function() {
  if (this.formater == null) return this.createDefaultFormater();
};
TextComp.prototype.createDefaultFormater = function() {
  return new StringFormater(this.maxSize);
};
TextComp.prototype.afterValid = function(keyCode, key) {};
TextComp.prototype.setBounds = function(left, top, width, height) {
  this.left = left;
  this.top = top;
  this.width = getString(convertWidth(width), "100%");
  this.height = getString(convertHeight(height), "100%");
  this.Div_gen.style.left = this.left + "px";
  this.Div_gen.style.top = this.top + "px";
  this.Div_gen.style.width = this.width;
  this.Div_gen.style.height = this.height;
  if (this.Div_text != null) {
    var tempWidth = 0;
    if (isPercent(this.width)) tempWidth = this.Div_gen.offsetWidth;
    else tempWidth = getInteger(parseInt(this.width), 120);
    this.Div_text.style.width = tempWidth - 4 + "px";
    if (this.hasLabel) this.Div_text.style.width = tempWidth - this.labelWidth - this.label_input_margin + "px";
    var pixelWidth = parseInt(this.Div_text.style.width, 10);
    if (this.Div_text.children.length == 3) {
      var centerWidth = pixelWidth - 3 * 2;
      this.Div_text.children[1].style.width = centerWidth + "px";
      this.input.style.width = (centerWidth - 2 * 2) + "px";
    }
  }
};
TextComp.prototype.outsideContextMenuClick = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("outsideContextMenuClick", mouseEvent);
};
TextComp.prototype.outsideClick = function(e) {
  if (window.clickHolders.trigger == this) return;
  if (IS_IPAD) {
    this.input.blur(e);
  }
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("outsideClick", mouseEvent);
};
TextComp.prototype.onselect = function() {
  if (this.maxSize != -1) this.input.value.maxLength = (this.maxSize + 1);
  var simpleEvent = {
    "obj": this
  };
  this.doEventFunc("onselect", simpleEvent);
};
TextComp.prototype.focus = function(e) {
  this.oldValue = this.newValue;
  if (this.visible == true) {
    if (this.dataType == "P") {
      this.input.select();
    }
    this.onfocus(e);
  }
};
TextComp.prototype.blur = function(e) {
  if (this.visible == true) {
    this.input.value = this.input.value.trim();
    var value = this.input.value;
    if (this.dataType != 'P') {
      if (this.showTipMessage && this.showTipMessage != null) this.setMessage(this.showTipMessage);
      else this.setMessage(value);
    }
    if (this.dataType != 'I') {
      this.newValue = this.getFormater().format(value);
    } else {
      this.newValue = this.getFormater().format(value, true);
    }
    var verifyR = this.verify(value);
    if (this.dataType == 'I') this.input.value = this.newValue;
    if (this.newValue != this.oldValue) this.valueChanged(this.oldValue, this.newValue);
    this.onblur(e);
    if (this.nullable == false && isNull(this.newValue) && this.isError == false) {
      this.setError(true);
      this.setErrorStyle();
    }
  }
};
TextComp.prototype.verify = function(oldValue) {
  return true;
};
TextComp.prototype.setMessage = function(message) {
  if (!this.isError) {
    this.message = message;
    this.errorMessage = "";
    this.setTitle(message);
  }
};
TextComp.prototype.setErrorMessage = function(errorMessage) {
  if (this.isError) {
    this.message = "";
    this.errorMessage = errorMessage;
    this.errorCenterDiv.innerHTML = this.errorMessage;
  }
};
TextComp.prototype.setTitle = function(title) {
  if (title != null && title != "") {
    if (this.input != null) {
      this.input.title = title;
    }
    if (this.Div_gen != null) this.Div_gen.title = title;
  } else if (title == "") {
    if (this.input != null) {
      this.input.title = "";
    }
    if (this.Div_gen != null) this.Div_gen.title = "";
  }
};
TextComp.prototype.setLabelText = function(text) {
  var label = this.getLabel();
  if (label) label.changeText(text);
  else {
    if (!isNull(text)) {
      this.labelText = text;
      this.hasLabel = true;
      this.labelDiv = $ce("DIV");
      this.labelWidth = getTextWidth(this.labelText);
      this.setLabelTextWidth(this.labelWidth);
      if (this.labelAlign == "left") {
        this.labelDiv.style[ATTRFLOAT] = "left";
        this.Div_text.style[ATTRFLOAT] = "right";
        this.Div_gen.appendChild(this.labelDiv);
      } else if (this.labelAlign == "right") {
        this.Div_text.style[ATTRFLOAT] = "left";
        this.labelDiv.style[ATTRFLOAT] = "right";
        this.Div_gen.appendChild(this.labelDiv);
      }
      this.label = new LabelComp(this.labelDiv, this.id + "_label", "0px", "3px", this.labelText, "relative", "textcomp_normallabel");
    }
  }
  this.labelText = text;
};
TextComp.prototype.isShowLabel = function(isShowLabel) {
  if (!isShowLabel) {
    this.labelDiv.style.display = "none";
    this.labelDiv.style.width = "0px";
    this.Div_gen.style.width = this.Div_text.style.width;
  }
};
TextComp.prototype.setLabelTextAligh = function(aligh) {
  if (this.hasLabel) {
    if ("left" == aligh && this.labelAlign != "left") {
      this.labelDiv.style[ATTRFLOAT] = "left";
      this.Div_text.style[ATTRFLOAT] = "right";
      this.labelAlign = "left";
      this.notifyChange(NotifyType.TEXTALIGN, this.labelAlign);
    } else if ("right" == aligh && this.labelAlign != "right") {
      this.Div_text.style[ATTRFLOAT] = "left";
      this.labelDiv.style[ATTRFLOAT] = "right";
      this.labelAlign = "right";
      this.notifyChange(NotifyType.TEXTALIGN, this.labelAlign);
    }
  }
};
TextComp.prototype.setLabelTextWidth = function(width) {
  if (this.hasLabel) {
    if (isPercent(width)) var tempWidth = this.labelDiv.offsetWidth;
    else tempWidth = getInteger(parseInt(width));
    this.labelWidth = tempWidth;
    this.notifyChange(NotifyType.WIDTH, this.labelWidth);
    this.labelDiv.style.width = tempWidth + "px";
    var allWidth = this.parentOwner.offsetWidth;
    this.Div_text.style.width = allWidth - this.labelWidth - this.label_input_margin + "px";
    var pixelWidth = parseInt(this.Div_text.style.width, 10);
    if (this.Div_text.children.length == 3) {
      var centerWidth = pixelWidth - 3 * 2;
      this.Div_text.children[1].style.width = centerWidth + "px";
      this.input.style.width = (centerWidth - 2 * 2) + "px";
    }
  }
};
TextComp.prototype.setFamily = function(family) {
  this.family = family;
  this.input.style.fontFamily = this.family;
};
TextComp.prototype.setSize = function(size) {
  this.size = size;
  this.input.style.fontSize = this.size + "px";
};
TextComp.prototype.setColor = function(color) {
  this.color = color;
  this.input.style.color = this.color;
};
TextComp.prototype.setWeight = function(weight) {
  this.weight = weight;
  this.input.style.fontWeight = this.weight;
};
TextComp.prototype.setStyle = function(style) {
  this.style = style;
  this.input.style.fontStyle = this.style;
};
TextComp.prototype.setBgcolor = function(bgcolor) {
  this.bgcolor = bgcolor;
};
TextComp.prototype.setCheckResult = function(checkResult) {
  this.checkResult = checkResult;
};
TextComp.prototype.showFloatMessageDiv = function() {
  var text = "";
  var messageType = this.checkResult;
  if (messageType == BaseComponent.ELEMENT_SUCESS) {
    return;
  } else if (messageType == BaseComponent.ELEMENT_ERROR || messageType == BaseComponent.ELEMENT_WARNING) {
    if (this.isError && this.errorMessage != null && this.errorMessage != "") {
      text = this.errorMessage;
    } else {
      return;
    }
  } else if (messageType == BaseComponent.ELEMENT_NORMAL) {
    if (this.inputAssistant != null && this.inputAssistant != "") {
      text = this.inputAssistant;
    } else {
      return;
    }
  }
  var textWidth = getTextWidth(text, this.className + "_FLOAT_MESSAGE_TEXT");
  if (textWidth == null || textWidth < 150) textWidth = 150;
  if (!window.floatMessageDiv) {
    var floatMessageDiv = $ce("div");
    floatMessageDiv.style.display = "none";
    floatMessageDiv.style.position = "absolute";
    floatMessageDiv.style.zIndex = getZIndex();
    window.floatMessageDiv = floatMessageDiv;
    document.body.appendChild(floatMessageDiv);
    var leftDiv = $ce("div");
    leftDiv.className = "div_left";
    window.floatMessageDiv.appendChild(leftDiv);
    var rightDiv = $ce("div");
    rightDiv.className = "div_right";
    window.floatMessageDiv.appendChild(rightDiv);
    var centerDiv = $ce("div");
    centerDiv.className = "div_center";
    window.floatMessageDiv.appendChild(centerDiv);
    window.floatMessageDiv.centerDiv = centerDiv;
    var arrowDiv = $ce("div");
    arrowDiv.className = "div_arrow";
    window.floatMessageDiv.appendChild(arrowDiv);
    var textDiv = $ce("div");
    textDiv.className = "div_text";
    window.floatMessageDiv.appendChild(textDiv);
    window.floatMessageDiv.textDiv = textDiv;
  }
  if (messageType == BaseComponent.ELEMENT_ERROR) window.floatMessageDiv.className = this.className + "_float_message_div_error";
  else if (messageType == BaseComponent.ELEMENT_WARNING) window.floatMessageDiv.className = this.className + "_float_message_div_warning";
  else if (messageType == BaseComponent.ELEMENT_NORMAL) window.floatMessageDiv.className = this.className + "_float_message_div_normal";
  window.floatMessageDiv.style.width = (textWidth + getCssHeight(this.className + "_FLOAT_MESSAGE_LEFT_WIDTH") + getCssHeight(this.className + "_FLOAT_MESSAGE_RIGHT_WIDTH")) + "px";
  window.floatMessageDiv.centerDiv.style.width = textWidth + "px";
  window.floatMessageDiv.style.top = (compOffsetTop(this.Div_gen, document.body) + this.Div_gen.offsetHeight) + "px";
  window.floatMessageDiv.style.left = compOffsetLeft(this.Div_gen, document.body) + "px";
  window.floatMessageDiv.textDiv.innerHTML = text;
  window.floatMessageDiv.style.display = "block";
};
TextComp.prototype.hideFloatMessageDiv = function() {
  if (window.floatMessageDiv) {
    window.floatMessageDiv.style.display = "none";
  }
};
TextComp.prototype.setFocus = function() {
  if (this.visible == true) {
    if (this.disabled) {
      this.mayFocus = true;
    } else {
      var oThis = this;
      if (IS_IE) {
        this.input.focus();
        this.input.select();
      } else {
        window.setTimeout(function() {
          if (oThis.input) {
            oThis.input.focus();
            oThis.input.select();
          }
        }, 50);
      }
    }
  }
  this.ctxChanged = true;
};
TextComp.prototype.getValue = function() {
  if (this.newValue != null) {
    return this.newValue;
  } else if (this.value != null) {
    return this.value;
  } else {
    return "";
  }
};
TextComp.prototype.setValue = function(text) {
  text = getString(text, "");
  if (this.dataType == 'A' || this.dataType == 'P') {
    if (this.maxSize != -1) {
      if (text.lengthb() > this.maxSize) text = text.substrCH(this.maxSize);
    }
  }
  this.oldValue = this.newValue;
  this.newValue = text;
  this.maskValue();
  if (IS_IE8) this.input.value = "0";
  if (this.focused) {
    this.input.value = this.newValue;
    if (this.dataType == 'D') {
      this.input.value = this.postProcessNewValue(this.newValue);
    }
  } else this.input.value = this.showValue;
  if (this.disabled) this.input.value = this.showValue;
  if (this.dataType != 'P') {
    if (this.showTipMessage && this.showTipMessage != null) this.setMessage(this.showTipMessage);
    else this.setMessage(this.showValue);
  }
  if (this.checkTip()) {
    if (this.input.value == "") this.showTip();
    else this.input.style.color = "black";
  }
  if (this.textColor != null) this.input.style.color = "red";
  if (this.componentType == "FLOATTEXT") {
    if (this.newValue.indexOf(',') != -1) return;
  }
  if (this.newValue != this.oldValue)
    if (!this.disabled) this.valueChanged(this.oldValue, this.newValue);
  this.ctxChanged = true;
  this.notifyChange(NotifyType.VALUE, this.newValue);
};
TextComp.prototype.addCharCode = function(charCode) {
  if (charCode == null) return;
  var oldValue = this.getValue();
  if (oldValue != null) oldValue = oldValue.toString();
  else oldValue = "";
  var newValue = "";
  var formater = this.getFormater();
  if (charCode == 8) {
    if (oldValue == "") {
      return;
    } else {
      newValue = oldValue.substring(0, oldValue.length - 1);
      this.setValue(newValue);
    }
  } else {
    var charValue = String.fromCharCode(charCode);
    newValue = oldValue + charValue;
    if (formater.valid(charValue, newValue, oldValue) == false) return;
    if (this.afterValid(charCode, charValue) == false) return;
    this.setValue(newValue);
  }
};
TextComp.prototype.getShowValue = function() {
  return this.showValue;
};
TextComp.prototype.setShowValue = function(text) {
  this.showValue = text;
  this.input.value = text;
};
TextComp.prototype.maskValue = function() {
  var masker = getMasker(this.componentType);
  if (masker != null) {
    this.showValue = masker.format(this.newValue).value;
    this.textColor = masker.format(this.newValue).color;
  } else this.showValue = this.newValue;
};
TextComp.prototype.setActive = function(isActive) {
  var isActive = getBoolean(isActive, false);
  if (this.disabled == false && isActive == false) {
    this.disabled = true;
    this.input.disabled = true;
    if (IS_IPAD) {
      this.input.style.color = "#000000";
    }
    this.input.className = this.inputClassName_inactive;
    if (this.Div_text != null) {
      this.Div_text.className = this.className + " " + this.className + "_inactive_bgcolor";
      if (this.Div_text.children.length == 3) {
        var children = this.Div_text.children;
        for (var i = 0; i < children.length; i++) {
          if (typeof(children[i]) != "undefined") {
            children[i].className = children[i].className.replaceStr('input_normal', 'input_disable');
            if (this.focused == true) children[i].className = children[i].className.replaceStr('input_highlight', 'input_disable');
            if (this.readOnly) children[i].className = children[i].className.replaceStr('input_readonly', 'input_disable');
          }
        }
      }
    }
  } else if (this.disabled == true && isActive == true) {
    this.disabled = false;
    this.input.disabled = false;
    this.input.className = this.inputClassName_init;
    if (this.Div_text != null) {
      this.Div_text.className = this.className;
      if (this.Div_text.children.length == 3) {
        var children = this.Div_text.children;
        for (var i = 0; i < children.length; i++) {
          if (typeof(children[i]) != "undefined") {
            children[i].className = children[i].className.replaceStr('input_disable', 'input_normal');
          }
        }
      }
    }
    if (this.mayFocus) {
      this.input.focus();
      this.mayFocus = false;
    }
  }
  this.ctxChanged = true;
  this.notifyChange(NotifyType.ENABLE, !this.disabled);
};
TextComp.prototype.isActive = function() {
  return !this.disabled;
};
TextComp.prototype.checkInteger = function(data) {
  if (data == null || data == "") return false;
  else if (!isNumber(data)) return false;
  return true;
};
TextComp.prototype.setMaxSize = function(size) {
  this.maxSize = parseInt(size, 10);
};
TextComp.prototype.setReadOnly = function(readOnly) {
  if (IS_IE8) {
    this.setActive(!readOnly);
    return;
  }
  this.input.readOnly = readOnly;
  this.readOnly = readOnly;
  if (readOnly) {
    this.input.className = this.inputClassName_readonly;
    if (this.Div_text != null) {
      this.Div_text.className = this.className + " " + "text_div_readonly";
      if (this.Div_text.children.length == 3) {
        var children = this.Div_text.children;
        for (var i = 0; i < children.length; i++) {
          if (typeof(children[i]) != "undefined") {
            children[i].className = children[i].className.replaceStr('input_normal', 'input_readonly');
          }
        }
      }
    }
  } else {
    this.input.className = this.inputClassName_init;
    if (this.Div_text != null) {
      this.Div_text.className = this.className;
      if (this.Div_text.children.length == 3) {
        var children = this.Div_text.children;
        for (var i = 0; i < children.length; i++) {
          if (typeof(children[i]) != "undefined") {
            children[i].className = children[i].className.replaceStr('input_readonly', 'input_normal');
          }
        }
      }
    }
  }
  this.ctxChanged = true;
  this.notifyChange(NotifyType.READONLY, this.readOnly);
};
TextComp.prototype.setErrorStyle = function() {
  if (!this.readOnly && this.isError) {
    if (this.Div_text != null) {
      this.Div_text.className = this.className + " " + "text_div_error";
    }
    if (this.componentType == "REFERENCETEXT") {
      this.warnIcon.style.right = "25px";
    } else if (this.componentType == "LANGUAGECOMBOBOX") {
      this.warnIcon.style.right = "25px";
    } else if (this.componentType == "COMBOBOX") {
      this.warnIcon.style.right = "25px";
    } else if (this.componentType == "DATETEXT" || this.componentType == "YEARMONTHTEXT" || this.componentType == "YEARTEXT" || this.componentType == "MONTHTEXT") {
      this.warnIcon.style.right = "25px";
    } else {
      this.warnIcon.style.right = "10px";
    }
    if (IS_IPAD) {
      this.warnIcon.style.right = (parseInt(this.warnIcon.style.right, 10) + 10) + "px";
    }
    this.warnIcon.style.display = "block";
  }
};
TextComp.prototype.setWarningStyle = function() {
  if (!this.readOnly) {
    if (this.Div_text != null) this.Div_text.className = this.className + " " + this.className + "_warning_bgcolor";
  }
};
TextComp.prototype.setFocusStyle = function() {
  if (!this.readOnly) {
    if (this.Div_text != null && -1 == this.Div_text.className.indexOf("_error_bgcolor") && -1 == this.Div_text.className.indexOf("_warning_bgcolor")) this.Div_text.className = this.className + " " + this.className + "_focus_bgcolor";
  }
};
TextComp.prototype.setBlurStyle = function() {
  if (!this.readOnly) {
    if (this.Div_text != null && -1 == this.Div_text.className.indexOf("_error_bgcolor") && -1 == this.Div_text.className.indexOf("_warning_bgcolor")) this.Div_text.className = this.className;
  }
};
TextComp.prototype.setNormalStyle = function() {
  if (!this.readOnly) {
    if (this.Div_text != null) {
      this.Div_text.className = this.className;
    }
    this.warnIcon.style.display = "none";
  }
};
TextComp.prototype.setErrorPosition = function(parentElement, left, top) {
  if (typeof(parentElement) != 'undefined' && typeof(left) == 'number' && typeof(top) == 'number') {
    parentElement.appendChild(this.errorMsgDiv);
    this.errorMsgDiv.style.top = top + "px";
    this.errorMsgDiv.style.left = left + "px";
    if (top < 0 || left < 0) {
      this.errorMsgDiv.style.display = "none";
    }
  } else if (typeof(parentElement) != 'undefined') {
    var currParentElement = this.parentOwner;
    var tempTop = 0;
    var tempLeft = 0;
    while (typeof(currParentElement) == "object") {
      if (currParentElement.className && currParentElement.className == parentElement.className) {
        parentElement.appendChild(this.errorMsgDiv);
        this.errorMsgDiv.style.visibility = "hidden";
        this.errorMsgDiv.style.display = "block";
        this.errorMsgDiv.style.top = tempTop + 5 - this.errorMsgDiv.offsetHeight + "px";
        this.errorMsgDiv.style.left = tempLeft + 10 + "px";
        var top = tempTop + 5 - this.errorMsgDiv.offsetHeight;
        var left = tempLeft + 10;
        if (top < 0 || left < 0) {
          this.errorMsgDiv.style.display = "none";
        }
        this.errorMsgDiv.style.display = "none";
        this.errorMsgDiv.style.visibility = "visible";
        break;
      }
      if (typeof(currParentElement.offsetLeft) == "number") {
        tempLeft += currParentElement.offsetLeft;
      }
      if (typeof(currParentElement.offsetTop) == "number") {
        tempTop += currParentElement.offsetTop;
      }
      if (typeof(currParentElement.offsetParent) == "object") {
        currParentElement = currParentElement.offsetParent;
      } else if (typeof(currParentElement.parentOwner) == "object") {
        currParentElement = currParentElement.parentOwner;
      } else {
        currParentElement = currParentElement.parentNode;
      }
    }
  } else {
    parentElement = this.parentOwner;
    var tempTop = 0;
    var tempLeft = 0;
    while (parentElement != null && typeof(parentElement) == "object") {
      if (parentElement.id && parentElement.id.indexOf('_um') != -1) {
        document.body.appendChild(this.errorMsgDiv);
        this.errorMsgDiv.style.visibility = "hidden";
        this.errorMsgDiv.style.display = "block";
        var offSetInfo = $(this.Div_gen).offset();
        this.errorMsgDiv.style.top = offSetInfo.top - this.errorMsgDiv.offsetHeight + "px";
        this.errorMsgDiv.style.left = offSetInfo.left + 10 + "px";
        var top = offSetInfo.top - this.errorMsgDiv.offsetHeight;
        var left = offSetInfo.left + 10;
        if (top < 0 || left < 0) {
          this.errorMsgDiv.style.display = "none";
        }
        if (this.componentType != "INTEGERTEXT") this.errorMsgDiv.style.display = "none";
        this.errorMsgDiv.style.visibility = "visible";
        break;
      }
      if (typeof(parentElement.offsetLeft) == 'number') {
        tempLeft += parentElement.offsetLeft;
      }
      if (typeof(parentElement.offsetTop) == 'number') {
        tempTop += parentElement.offsetTop;
        parentElement = parentElement.offsetParent;
        continue;
      }
      if (typeof(parentElement.parentOwner) == "object") {
        parentElement = parentElement.parentOwner;
      } else {
        parentElement = parentElement.parentNode;
      }
    }
  }
};
TextComp.prototype.getLabel = function() {
  return this.label;
};
TextComp.prototype.onblur = function(e) {
  this.setBlurStyle();
  var focusEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onBlur", focusEvent);
};
TextComp.prototype.onclick = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onclick", mouseEvent);
};
TextComp.prototype.onfocus = function(e) {
  this.setFocusStyle();
  var focusEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onFocus", focusEvent);
};
TextComp.prototype.haschanged = function(e) {
  var keyEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onTextChanged", keyEvent);
};
TextComp.prototype.onenter = function(e) {
  var keyEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onEnter", keyEvent);
};
TextComp.prototype.onkeydown = function(e) {
  var keyEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onKeyDown", keyEvent);
};
TextComp.prototype.onkeyup = function(e) {
  var keyEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onKeyUp", keyEvent);
};
TextComp.prototype.onmouseover = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onMouseOver", mouseEvent);
};
TextComp.prototype.valueChanged = function(oldValue, newValue) {
  var valueChangeEvent = {
    "obj": this,
    "oldValue": oldValue,
    "newValue": newValue
  };
  this.notifyChange(NotifyType.VALUE, this.newValue);
  this.doEventFunc("valueChanged", valueChangeEvent);
  if (this.editFormular || this.validateFormular) execFormula(this.widget.id, null, this.id);
};
TextComp.prototype.setChangedContext = function(context) {
  if (context.enable != null) this.setActive(context.enable);
  if (context.focus != null) this.setFocus();
  if (context.readOnly != null && this.readOnly != context.readOnly) this.setReadOnly(context.readOnly);
  if (context.value != null && context.value != this.input.value) {
    this.setValue(context.value);
  }
  if (context.visible != null && this.visible != context.visible) this.setVisible(context.visible);
  if (context.text != null && this.labelText != context.text) this.setLabelText(context.text);
  if (context.isShowLabel != null) this.isShowLabel(context.isShowLabel);
  if (context.designModel != null) this.setDesignModel(context.designModel);
  if (context.textAlign != null && this.labelAlign != context.textAlign) this.setLabelTextAligh(context.textAlign);
  if (context.width != null && this.labelWidth != context.width) this.setLabelTextWidth(context.width);
};
TextComp.prototype.setVisible = function(visible) {
  if (visible) this.showV();
  else this.hideV();
  this.notifyChange(NotifyType.VISIBLE, visible);
};
TextComp.prototype.setDesignModel = function(designModel) {
  this.designModel = designModel;
  this.notifyChange("designModel", designModel);
};
TextComp.prototype.initErrorMsg = function() {
  var oThis = this;
  this.errorMsgDiv = $ce("DIV");
  this.errorMsgDiv.style.display = "none";
  this.errorMsgDiv.className = "error_msg_div";
  var errorLeftDiv = $ce("DIV");
  errorLeftDiv.className = "error_left_div";
  this.errorMsgDiv.appendChild(errorLeftDiv);
  var errorCenterDiv = $ce("DIV");
  errorCenterDiv.className = "error_center_div";
  this.errorMsgDiv.appendChild(errorCenterDiv);
  var errorRightDiv = $ce("DIV");
  errorRightDiv.className = "error_right_div";
  this.errorMsgDiv.appendChild(errorRightDiv);
  this.errorCenterDiv = $ce("DIV");
  this.errorCenterDiv.className = "error_content_div";
  this.errorMsgDiv.appendChild(this.errorCenterDiv);
  this.errorMsgDiv.onclick = function(e) {
    oThis.input.onclick(e);
    if (oThis.visible != false) oThis.input.focus();
    this.style.display = "none";
  };
  this.Div_gen.appendChild(this.errorMsgDiv);
  this.warnIcon = $ce("DIV");
  this.warnIcon.style.display = "none";
  this.warnIcon.className = "warn_icon";
  this.warnIcon.onmouseover = function(e) {};
  this.warnIcon.onmouseout = function(e) {};
  this.Div_gen.appendChild(this.warnIcon);
  this.closeIcon = $ce("DIV");
  this.closeIcon.className = "up_close_normal";
  this.closeIcon.onmouseover = function(e) {
    this.className = "down_close_press";
  };
  this.closeIcon.onmouseout = function(e) {
    this.className = "up_close_normal";
  };
  this.closeIcon.onmouseup = function(e) {
    this.className = "up_close_normal";
    oThis.errorMsgDiv.style.display = "none";
  };
  this.errorMsgDiv.appendChild(this.closeIcon);
};

StringTextComp.prototype = new TextComp;
StringTextComp.prototype.componentType = "STRINGTEXT";

function StringTextComp(parent, name, left, top, width, position, attrArr, className) {
  if (arguments.length == 0) return;
  this.base = TextComp;
  this.base(parent, name, left, top, width, "A", position, attrArr, className);
};
StringTextComp.prototype.verify = function(oldValue) {
  if (this.newValue == oldValue) {
    return true;
  }
  var value = this.getValue();
  if (value != null) value = value.trim();
  var beforeFormatL = oldValue.length;
  var afterFormatL = this.newValue.length;
  if (beforeFormatL > afterFormatL) showVerifyMessage(this, trans("ml_thevaluebeyondthemaxlength"));
};
StringTextComp.prototype.createDefaultFormater = function() {
  return new StringFormater(this.maxSize);
};
StringTextComp.prototype.processEnter = function() {
  var inputValue = this.getValue();
  if (inputValue == null) inputValue = "";
  else inputValue = inputValue.trim();
  if (inputValue == this.oldValue && inputValue == "") {
    return;
  }
  var beforeFormatL = inputValue.length;
  value = this.getFormater().format(inputValue);
  var afterFormatL = value.length;
  if (beforeFormatL > afterFormatL) showVerifyMessage(this, trans("ml_thevaluebeyondthemaxlength"));
  this.setMessage(value);
  this.input.value = value;
  this.input.blur();
};
StringTextComp.prototype.setMaxSize = function(size) {
  this.maxSize = parseInt(size);
};

function DsRelation(id, masterDataset, masterKeyField, detailDataset, detailForeignkey) {
  this.id = id;
  this.masterDataset = masterDataset;
  this.masterKeyField = masterKeyField;
  this.detailDataset = detailDataset;
  this.detailForeignkey = detailForeignkey;
};

function DsRelations() {
  this.relationMap = new HashMap();
};
DsRelations.prototype.addRelation = function(relation) {
  var relationArr;
  if ((relationArr = this.relationMap.get(relation.masterDataset)) == null) {
    relationArr = new Array;
    this.relationMap.put(relation.masterDataset, relationArr);
  }
  relationArr.push(relation);
};
DsRelations.prototype.removeRelation = function(id) {
  var masterArr = this.relationMap.values();
  for (var i = 0; i < masterArr.length; i++) {
    for (var j = 0; j < masterArr[i].length; j++) {
      if (masterArr[i][j].id == id) break;
    }
  }
};
DsRelations.prototype.getRelationsByMasterDataset = function(masterDsId) {
  return this.relationMap.get(masterDsId);
};
DsRelations.prototype.getRelationsBySlaveDataset = function(slaveDsId) {
  var relArr = null;
  var relations = this.relationMap.values();
  if (relations != null && relations.length > 0) {
    for (var i = 0; i < relations.length; i++) {
      for (var j = 0; j < relations[i].length; j++) {
        var relation = relations[i][j];
        if (relation.detailDataset == slaveDsId) {
          if (relArr == null) relArr = new Array;
          relArr.push(relation);
        }
      }
    }
  }
  return relArr;
};
DsRelations.prototype.destroySelf = function() {
  this.relationMap.clear();
  this.relationMap = null;
};

function ComboData(id) {
  this.id = id;
  this.combItems = new Array;
};
ComboData.prototype.getValueArray = function() {
  if (this.combItems.length == 0) return [];
  var result = new Array;
  for (var i = 0; i < this.combItems.length; i++) result.push(this.combItems[i].value);
  return result;
};
ComboData.prototype.getNameArray = function() {
  if (this.combItems.length == 0) return [];
  var result = new Array;
  for (var i = 0; i < this.combItems.length; i++) {
    result.push(this.combItems[i].i18nName);
  }
  return result;
};
ComboData.prototype.getImageArray = function() {
  if (this.combItems.length == 0) return [];
  var result = new Array;
  for (var i = 0; i < this.combItems.length; i++) {
    result.push(this.combItems[i].image);
  }
  return result;
};
ComboData.prototype.getNameByValue = function(value) {
  if (this.combItems.length == 0) return [];
  for (var i = 0; i < this.combItems.length; i++) {
    if (this.combItems[i].value == value) return this.combItems[i].i18nName;
  }
  return null;
};
ComboData.prototype.getValueByName = function(name) {
  if (this.combItems.length == 0) return [];
  for (var i = 0; i < this.combItems.length; i++) {
    if (this.combItems[i].i18nName == name) return this.combItems[i].value;
  }
  return null;
};
ComboData.prototype.addItem = function(item) {
  this.combItems.push(item);
};

function ComboItem(name, value, image) {
  this.i18nName = name;
  if (typeof(value) == "string") {
    value = value.replace(/&#92;/g, "\\");
  }
  this.value = value;
  this.image = image;
};

function RefNodeInfo(id, name, pageMeta, readDs, writeDs, readFields, writeFields, filterSql, userObj, multiSel, usePower, selLeafOnly, allowExtendValue, dialogWidth, dialogHeight, dataListener, isRead, refType, attrArr) {
  this.id = id;
  this.name = name;
  this.pageMeta = pageMeta;
  this.readDs = readDs;
  this.writeDs = writeDs;
  this.readFields = readFields;
  this.writeFields = writeFields;
  this.userObj = userObj;
  this.filterSql = filterSql;
  this.multiSel = multiSel;
  this.referenceList = new Array();
  this.usePower = usePower;
  this.selLeafOnly = selLeafOnly;
  this.allowExtendValue = getBoolean(allowExtendValue, false);
  this.dialogWidth = dialogWidth;
  this.dialogHeight = dialogHeight;
  this.dataListener = dataListener;
  this.isRead = getBoolean(isRead, false);
  this.refType = refType;
  this.refModelClassName = "nc.uap.lfw.reference.app.AppDefaultReferencePageModel";
  this.showSelResult = false;
  if (attrArr) {
    this.refModelClassName = getString(attrArr.refModelClassName, this.refModelClassName);
    this.showSelResult = getBoolean(attrArr.showSelResult, this.showSelResult);
  }
};
RefNodeInfo.prototype.setFilterSql = function(filterSql) {
  this.filterSql = filterSql;
  for (var i = 0; i < this.referenceList.length; i++) {
    this.referenceList[i].setFilterSql(filterSql);
  }
};
RefNodeInfo.prototype.bindReference = function(reference) {
  if (this.referenceList.indexOf(reference) == -1) this.referenceList.push(reference);
};
SelfRefNodeInfo.prototype = new RefNodeInfo;

function SelfRefNodeInfo(id, text, url, dialogWidth, dialogHeight, isRead) {
  this.id = id;
  this.url = url;
  this.name = text;
  this.dialogWidth = dialogWidth;
  this.dialogHeight = dialogHeight;
  this.isRead = getBoolean(isRead, false);
  this.allowExtendValue = false;
}
SelfRefNodeInfo.prototype.setPath = function(path) {
  this.url = path;
};
RefNodeInfo.prototype.setDialogWidth = function(dialogWidth) {
  this.dialogWidth = dialogWidth;
};
RefNodeInfo.prototype.setDataListener = function(dataListener) {
  this.dataListener = dataListener;
};
RefNodeInfo.prototype.setDialogHight = function(dialogHeight) {
  this.dialogHeight = dialogHeight;
};
RefNodeInfo.prototype.setName = function(name) {
  this.name = name;
};
SelfRefNodeInfo.prototype.setName = function(name) {
  this.name = name;
};

function RefNodeRelations() {
  this.relationMap = new HashMap();
};
RefNodeRelations.prototype.addRelation = function(relation) {
  this.relationMap.put(relation.id, relation);
};
RefNodeRelations.prototype.removeRelation = function(id) {
  if (this.relationMap.containsKey(id)) this.relationMap.remove(id);
};
RefNodeRelations.prototype.getRelationsByMasterFieldId = function(masterFieldId, dsId) {
  var relArr = new Array;
  var relations = this.relationMap.values();
  for (var i = 0, n = relations.length; i < n; i++) {
    var relation = relations[i];
    var masterFields = relation.masterFieldInfos;
    for (var j = 0, m = masterFields.length; j < m; j++) {
      var masterField = masterFields[j];
      if (masterField.dsId == dsId && masterField.fieldId == masterFieldId) relArr.push(relation);
    }
  }
  return relArr;
};
RefNodeRelations.prototype.getRelationBySlaveRefNode = function(slaveRefNode, dsId) {
  var relations = this.relationMap.values();
  if (relations != null && relations.length > 0) {
    for (var i = 0, n = relations.length; i < n; i++) {
      var relation = relations[i];
      if ((relation.targetDsId == null || relation.targetDsId == "null" || relation.targetDsId == dsId) && relation.detailRefNode == slaveRefNode) {
        return relation;
      }
    }
  }
  return null;
};

function bindRefNode2Dataset() {
  if (window.$refNodeRelations != null) {
    var widget = window.$refNodeRelations.widget;
    var relations = window.$refNodeRelations.relationMap.values();
    var acceptFieldMap = new HashMap();
    for (var i = 0, n = relations.length; i < n; i++) {
      var relation = relations[i];
      for (var j = 0, m = relation.masterFieldInfos.length; j < m; j++) {
        var dsId = relation.masterFieldInfos[j].dsId;
        var arr = acceptFieldMap.get(dsId);
        if (arr == null) {
          arr = new Array;
          acceptFieldMap.put(dsId, arr);
        }
        arr.push(relation.masterFieldInfos[j].fieldId);
      }
    }
    var keys = acceptFieldMap.keySet();
    for (var i = 0, n = keys.length; i < n; i++) {
      var dsId = keys[i];
      var ds = widget.getDataset(dsId);
      ds.$temp_af = acceptFieldMap.get(dsId);
      var listener = new Listener("onAfterDataChange");
      listener.func = function(dataChangeEvent) {
        var fields = this.$temp_af;
        var colIndex = dataChangeEvent.cellColIndex;
        var currentFieldName = this.metadata[colIndex].key;
        var find = false;
        for (var i = 0, n = fields.length; i < n; i++) {
          if (fields[i] == currentFieldName) {
            find = true;
            break;
          }
        }
        if (!find) return;
        doProcessFieldRelation(dataChangeEvent);
      };
      ds.addListener(listener);
    }
  }
};

function doProcessFieldRelation(dataChangeEvent) {
  var newValue = dataChangeEvent.currentValue;
  var oldValue = dataChangeEvent.oldValue;
  if (window.$refNodeRelations != null && newValue != oldValue) {
    var colIndex = dataChangeEvent.cellColIndex;
    var widget = window.$refNodeRelations.widget;
    var fieldId = widget.getDataset(dataChangeEvent.datasetId).metadata[colIndex].key;
    var relations = window.$refNodeRelations.relationMap.values();
    for (var i = 0, n = relations.length; i < n; i++) {
      var relation = relations[i];
      var masterFields = relation.masterFieldInfos;
      for (var j = 0, m = masterFields.length; j < m; j++) {
        var masterField = masterFields[j];
        if (masterField.dsId == dataChangeEvent.datasetId && masterField.fieldId == fieldId) {
          var refNodeId = relation.detailRefNode;
          var refNode = widget.getRefNode(refNodeId);
          for (var k = 0, l = refNode.referenceList.length; k < l; k++) {
            refNode.referenceList[k].clearValue();
          }
        }
      }
    }
  }
};

function RefNodeRelation(id, masterFieldInfos, detailRefNode, targetDsId, clearDetail) {
  this.id = id;
  this.masterFieldInfos = eval(masterFieldInfos);
  this.detailRefNode = detailRefNode;
  this.targetDsId = targetDsId;
  this.clearDetail = clearDetail;
};


ComboComp.prototype = new TextComp;
ComboComp.prototype.componentType = "COMBOBOX";
ComboComp.dataDivDefaultHeight = 80;
ComboComp.defaultVisibleOptionsNum = 10;
ComboComp.prototype.imageWidth = 17;
ComboComp.prototype.imageHeight = 17;
ComboComp.pushImgNMPath = window.themePath + "/ui/ctrl/text/images/combo_nm.png";
ComboComp.pushImgONPath = window.themePath + "/ui/ctrl/text/images/combo_on.png";
ComboComp.pushImgDisablePath = window.themePath + "/ui/ctrl/text/images/combo_disable.png";

function ComboComp(parent, name, left, top, width, position, selectOnly, attrArr, className) {
  this.base = TextComp;
  this.options = new Array();
  this.selectedIndex = -1;
  this.lastSelectedIndex = -1;
  window.clickHolders.push(this);
  this.showImgOnly = false;
  this.selectOnly = getBoolean(selectOnly, true);
  this.shownOptions = new Array();
  this.allowExtendValue = false;
  this.notFindComboDataValue = "";
  this.visibleOptionsNum = ComboComp.defaultVisibleOptionsNum;
  this.multiSelect = false;
  this.needNullOption = false;
  this.realValue = "";
  if (attrArr != null) {
    if (attrArr.dataDivHeight != null) this.dataDivHeight = parseInt(attrArr.dataDivHeight);
    if (attrArr.allowExtendValue == true) this.allowExtendValue = true;
    if (attrArr.multiSelect == true) this.multiSelect = true;
    if (attrArr.needNullOption == true) this.needNullOption = true;
    if (typeof(attrArr.visibleOptionsNum) != "undefined") this.visibleOptionsNum = getInteger(attrArr.visibleOptionsNum, this.visibleOptionsNum);
  }
  this.base(parent, name, left, top, width, "A", position, attrArr, className);
};
ComboComp.prototype.manageSelf = function() {
  TextComp.prototype.manageSelf.call(this);
  var oThis = this;
  if (this.readOnly != true) {
    this.Div_text.onclick = function(e) {
      e = EventUtil.getEvent();
      oThis.click(e);
    };
    this.input.onclick = function(e) {
      oThis.warnIcon.style.display = "none";
      if (oThis.isError && typeof(oThis.errorMessage) == 'string' && oThis.errorMessage != '') {
        oThis.errorCenterDiv.innerHTML = oThis.errorMessage;
        if (!oThis.noShowErrorMsgDiv) {
          oThis.errorMsgDiv.style.display = "block";
        }
      }
      e = EventUtil.getEvent();
      oThis.onclick(e);
      window.clickHolders.trigger = oThis;
      document.onclick(e);
      oThis.click(e);
      stopEvent(e);
      clearEventSimply(e);
    };
  }
  this.input.style.position = "relative";
  this.input.style[ATTRFLOAT] = "left";
  if (this.readOnly == true || (this.selectOnly == true && this.allowExtendValue == false)) this.input.readOnly = true;
  this.input.onblur = function(e) {
    e = EventUtil.getEvent();
    if (IS_IE) {
      if (document.activeElement && (document.activeElement.id == (oThis.id + "comb_sel_button") || document.activeElement.parentNode.id == (oThis.id + "comb_data_div"))) {
        stopEvent(e);
        clearEventSimply(e);
        return false;
      }
    }
    if (oThis.Div_text.children.length == 3) {
      var children = oThis.Div_text.children;
      for (var i = 0; i < children.length; i++) {
        children[i].className = children[i].className.replaceStr('input_highlight', 'input_normal');
      }
      oThis.input.className = oThis.input.className.replaceStr('input_highlight_center_bg', 'input_normal_center_bg');
    }
    oThis.blur(e);
    clearEventSimply(e);
  };
  this.input.onkeydown = function(e) {
    e = EventUtil.getEvent();
    var ch = e.lfwKey;
    if (oThis.onkeydown(e) == false) {
      stopAll(e);
      clearEventSimply(e);
      return;
    }
    var currIndex = oThis.getSelectedIndex();
    var nextIndex = -1;
    if (ch == 40) {
      if (!oThis.isShown) {
        oThis.showData();
        clearEventSimply(e);
        return;
      }
      if (currIndex < oThis.options.length - 1) {
        nextIndex = currIndex + 1;
        while (nextIndex < oThis.options.length && oThis.options[nextIndex].Div_gen.style.display == "none") nextIndex++;
        if (nextIndex < oThis.options.length) oThis.setSelectedItem(nextIndex);
        else if (nextIndex == oThis.options.length) oThis.setSelectedItem(currIndex);
      } else if (currIndex == oThis.options.length - 1) oThis.setSelectedItem(currIndex);
      oThis.valueChanged(nextIndex == -1 ? null : oThis.options[nextIndex].value, currIndex == -1 ? null : oThis.options[currIndex].value);
    } else if (ch == 38) {
      if (currIndex > 0) {
        nextIndex = currIndex - 1;
        while (nextIndex >= 0 && oThis.options[nextIndex].Div_gen.style.display == "none") nextIndex--;
        if (nextIndex >= 0) oThis.setSelectedItem(nextIndex);
      }
      oThis.valueChanged(nextIndex == -1 ? null : oThis.options[nextIndex].value, currIndex == -1 ? null : oThis.options[currIndex].value);
    } else if ((ch == 9 && e.shiftKey) || ch == 9 || ch == 13) {
      oThis.hideData();
      return true;
    }
    clearEventSimply(e);
    if (ch == 8) {
      if (!oThis.selectOnly || (oThis.selectOnly && oThis.allowExtendValue)) {
        var oldValue = oThis.input.value;
        oThis.input.value = oldValue.substring(0, oldValue.length - 1);
      }
      stopAll(e);
    }
    return;
  };
  this.input.onkeyup = function(e) {
    e = EventUtil.getEvent();
    var ch = e.lfwKey;
    if ((!oThis.selectOnly || (oThis.selectOnly && oThis.allowExtendValue)) && !oThis.showImgOnly && !oThis.readOnly) {
      if (ch != 38 && ch != 40 && ch != 37 && ch != 39 && ch != 9 && ch != 13) {
        oThis.isKeyPressed = true;
        if (!oThis.isShown && !(ch == 32 && e.ctrlKey) && ch != 20 && ch != 16 && ch != 17 && ch != 18 && ch != 33 && ch != 34 && ch != 91) {
          if (ComboComp.showDataDivTimeOut != null) clearTimeout(ComboComp.showDataDivTimeOut);
          ComboComp.showDataDivTimeOut = setTimeout("ComboComp.showDataDiv('" + oThis.id + "');", 300);
        }
        oThis.doFilter();
      }
    }
    clearEventSimply(e);
  };
  this.input.onfocus = function(e) {
    e = EventUtil.getEvent();
    if (oThis.Div_text.children.length == 3) {
      var children = oThis.Div_text.children;
      for (var i = 0; i < children.length; i++) {
        children[i].className = children[i].className.replaceStr('input_normal', 'input_highlight');
      }
      oThis.input.className = oThis.input.className.replaceStr('input_normal_center_bg', 'input_highlight_center_bg');
    }
    oThis.focus(e);
    oThis.hideTip();
    clearEventSimply(e);
  };
  this.divButton = $ce("DIV");
  if (this.Div_text.children.length == 3) {
    this.Div_text.children[1].appendChild(this.divButton);
  } else {
    this.Div_text.appendChild(this.divButton);
  }
  this.divButton.id = this.id + "$comb_sel_button";
  this.divButton.style.position = "absolute";
  this.divButton.style.cursor = "pointer";
  this.divButton.style.width = this.imageWidth + "px";
  this.divButton.style.height = this.imageHeight + "px";
  this.divButton.style.right = "0px";
  this.divButton.style.top = "50%";
  this.pushImg = $ce("IMG");
  this.pushImg.src = ComboComp.pushImgNMPath;
  this.pushImg.style.height = "5px";
  this.pushImg.style.width = "7px";
  this.pushImg.style.marginLeft = "5px";
  this.pushImg.style.marginTop = "7px";
  this.pushImg.style.top = "-50%";
  this.pushImg.style.position = "relative";
  this.divButton.appendChild(this.pushImg);
  if (this.readOnly != true) {
    this.divButton.onclick = function(e) {
      e = EventUtil.getEvent();
      oThis.click(e);
      clearEventSimply(e);
    };
    this.divButton.onmouseover = function(e) {
      e = EventUtil.getEvent();
      oThis.pushImg.src = ComboComp.pushImgONPath;
      clearEventSimply(e);
    };
    this.divButton.onmouseout = function(e) {
      e = EventUtil.getEvent();
      oThis.pushImg.src = ComboComp.pushImgNMPath;
      clearEventSimply(e);
    };
  } else {
    this.Div_text.className = this.className + " " + this.className + "_readonly";
    this.divButton.style.visibility = "hidden";
  }
  this.comboDiv = $ce("DIV");
  this.comboDiv.className = 'combo_div';
  this.comboLeftTopDiv = $ce("DIV");
  this.comboLeftTopDiv.className = 'combo_left_top_div';
  this.comboCenterTopDiv = $ce("DIV");
  this.comboCenterTopDiv.className = 'combo_center_top_div';
  this.comboRightTopDiv = $ce("DIV");
  this.comboRightTopDiv.className = 'combo_right_top_div';
  this.comboLeftCenterDiv = $ce("DIV");
  this.comboLeftCenterDiv.className = 'combo_left_center_div';
  this.comboCenterDiv = $ce("DIV");
  this.comboCenterDiv.className = 'combo_center_div';
  this.comboRightCenterDiv = $ce("DIV");
  this.comboRightCenterDiv.className = 'combo_right_center_div';
  this.comboLeftBottomDiv = $ce("DIV");
  this.comboLeftBottomDiv.className = 'combo_left_bottom_div';
  this.comboCenterBottomDiv = $ce("DIV");
  this.comboCenterBottomDiv.className = 'combo_center_bottom_div';
  this.comboRightBottomDiv = $ce("DIV");
  this.comboRightBottomDiv.className = 'combo_right_bottom_div';
  this.comboDiv.appendChild(this.comboLeftTopDiv);
  this.comboDiv.appendChild(this.comboCenterTopDiv);
  this.comboDiv.appendChild(this.comboRightTopDiv);
  this.comboDiv.appendChild(this.comboLeftCenterDiv);
  this.comboDiv.appendChild(this.comboCenterDiv);
  this.comboDiv.appendChild(this.comboRightCenterDiv);
  this.comboDiv.appendChild(this.comboLeftBottomDiv);
  this.comboDiv.appendChild(this.comboCenterBottomDiv);
  this.comboDiv.appendChild(this.comboRightBottomDiv);
  this.dataDiv = $ce("DIV");
  this.dataDiv.id = this.id + "comb_data_div";
  this.dataDiv.className = "combobox_data_div";
  this.dataDiv.style.zIndex = getZIndex();
  document.body.appendChild(this.dataDiv);
  this.dataDiv.style.width = this.width == null ? '120px' : this.width;
  this.dataDiv.style.overflow = "auto";
  this.dataDiv.style.display = "none";
  this.dataDiv.style.position = "absolute";
  var frmstr = '<iframe src="" style="position:absolute; visibility:inherit; width:100%;height:100%; z-index:-1; border:none;" frameborder="0"></<iframe>';
  this.dataDiv.innerHTML = frmstr;
  this.dataDiv.appendChild(this.comboDiv);
  if (this.disabled == true) {
    this.disabled = false;
    this.setActive(false);
  }
  this.dataDiv.onmousewheel = function(e) {
    e = EventUtil.getEvent();
    stopEvent(e);
    clearEventSimply(e);
  }
};
ComboComp.prototype.focus = function(e) {
  this.oldValue = this.getValue();
  if (this.visible == true) {
    this.isKeyPressed = false;
    this.onfocus(e);
  }
};
ComboComp.prototype.setReadOnly = function(readOnly) {
  if ((this.selectOnly == true && this.allowExtendValue == false) && readOnly == false) {
    this.input.readOnly = true;
  } else {
    this.input.readOnly = readOnly;
  }
  this.readOnly = readOnly;
  if (readOnly) {
    TextComp.prototype.setReadOnly.call(this, true);
    this.divTextClickFunc = this.Div_text.onclick;
    this.Div_text.onclick = function() {};
    this.inputClickFunc = this.Div_text.onclick;
    this.input.onclick = function() {};
    this.divButton.style.visibility = "hidden";
  } else {
    TextComp.prototype.setReadOnly.call(this, false);
    this.Div_text.onclick = this.divTextClickFunc;
    this.input.onclick = this.inputClickFunc;
    this.divButton.style.visibility = "";
  }
  this.ctxChanged = true;
  this.notifyChange(NotifyType.READONLY, this.readOnly);
};
ComboComp.prototype.blur = function(e) {
  if (this.readOnly == false) {
    if (this.showImgOnly == false && (!this.selectOnly || (this.selectOnly && this.allowExtendValue))) {
      var inputCaption = this.input.value;
      var options = this.getOptions();
      if (inputCaption == null || inputCaption.trim() == "") this.setNullValue(true);
      else {
        var matched = false;
        for (var i = 0; i < options.length; i++) {
          if (options[i].caption == inputCaption) {
            this.setSelectedItem(i);
            matched = true;
            break;
          }
        }
        if (matched == false) {
          for (var i = 0; i < options.length; i++) {
            if (options[i].caption == inputCaption || (options[i].caption).startWith(inputCaption)) {
              this.setSelectedItem(i);
              break;
            } else {
              if (this.allowExtendValue) {
                this.selectedIndex = -1;
                this.valueChanged(inputCaption, this.getValue());
              } else this.setNullValue(true);
            }
          }
        }
      }
      this.isKeyPressed = false;
    }
  }
  if (this.visible == true) {
    if (this.showTipMessage && this.showTipMessage != null) this.setMessage(this.showTipMessage);
    else this.setMessage(this.input.value);
  }
  this.onblur(e);
};
ComboComp.prototype.itemclick = function(item) {
  if (this.multiSelect) {
    if (isNotNull(this.realValue)) {
      var values = this.realValue.split(";");
      for (var i = 0; i < values.length; i++) {
        var option = this.getOption(values[i]);
        if (isNotNull(option)) {
          option.selectBox.click();
        }
      }
    }
  }
  if (item.index != this.selectedIndex) {
    this.setSelectedItem(item.index);
  }
  this.hideData();
  this.setFocus();
  this.doEventFunc("onitemclick");
};
ComboComp.prototype.createOption = function(caption, value, refImg, selected, index, showImgOnly) {
  if (index == null || index == -1) {
    if (value == "") {
      var option = new OptionComp(caption, value, refImg, selected, showImgOnly, false);
    } else {
      var option = new OptionComp(caption, value, refImg, selected, showImgOnly, this.multiSelect);
    }
    var index = this.options.push(option);
    option.setParentOwner(this);
    option.setIndex(index - 1);
    this.comboCenterDiv.appendChild(option.Div_gen);
    if (selected) this.setSelectedItem(index - 1);
  }
};
ComboComp.prototype.setBounds = function(left, top, width, height) {
  this.left = left;
  this.top = top;
  this.width = getString(convertWidth(width), this.Div_gen.offsetWidth + "px");
  this.height = getString(convertHeight(height), this.Div_gen.offsetHeight + "px");
  this.Div_gen.style.left = left + "px";
  this.Div_gen.style.top = top + "px";
  this.Div_gen.style.width = this.width;
  this.Div_gen.style.height = this.height;
  var tempWidth = 0;
  if (isPercent(this.width)) tempWidth = this.Div_gen.offsetWidth;
  else tempWidth = getInteger(parseInt(this.width), 120);
  this.Div_text.style.width = tempWidth - 4 + "px";
  if (this.hasLabel) this.Div_text.style.width = tempWidth - this.labelWidth - 10 + "px";
  var pixelHeight = this.Div_text.offsetHeight;
  var pixelWidth = this.Div_text.offsetWidth;
  this.input.style.width = pixelWidth - this.imageWidth + "px";
  if (this.Div_text.children.length == 3) {
    var centerWidth = pixelWidth - 3 * 2;
    this.Div_text.children[1].style.width = centerWidth + "px";
    var imgWidth = (this.Div_text.children[1].children.length - 1) * this.imageWidth;
    var inputWidth = centerWidth - imgWidth;
    if (IS_IE) {
      inputWidth -= 3;
    }
    this.input.style.width = inputWidth - 2 + "px";
  }
};
ComboComp.prototype.showV = function() {
  var obj = this.getObjHtml();
  obj.style.visibility = "";
  this.visible = true;
  var offHgt = this.Div_text.offsetHeight;
  if (offHgt > 0 && (offHgt - this.pushImg.height) > 0) {}
  if (this.Div_text.children.length == 3) {
    if (this.Div_text.children[1].offsetHeight > 0 && this.pushImg.height > 0 && (this.Div_text.children[1].offsetHeight - this.pushImg.height) > 0) {}
  }
  this.ctxChanged = true;
  this.notifyChange(NotifyType.VISIBLE, this.visible);
};
ComboComp.prototype.hideV = function() {
  BaseComponent.prototype.hideV.call(this);
  this.hideData();
  this.ctxChanged = true;
  this.notifyChange(NotifyType.VISIBLE, this.visible);
};
ComboComp.prototype.click = function(e) {
  if (!this.isShown) {
    e = EventUtil.getEvent();
    this.showData();
    this.isShown = true;
  } else {
    this.hideData();
    this.isShown = false;
  }
  if (this.stopHideDiv != true) {
    window.clickHolders.trigger = this;
    document.onclick();
  }
  stopEvent(e);
  clearEventSimply(e);
};
ComboComp.showDataDiv = function(id) {
  var combo = window.objects[id];
  if (combo != null) combo.showData();
};
ComboComp.prototype.showData = function() {
  if (!this.isShown) {
    this.dataDiv.style.left = compOffsetLeft(this.Div_text) + "px";
    this.dataDiv.style.top = "0px";
    this.dataDiv.style.zIndex = getZIndex();
    this.dataDiv.style.width = this.Div_text.offsetWidth + "px";
    if (this.Div_text.offsetWidth == 0) {
      this.dataDiv.style.width = this.width == null ? '120px' : this.width;
    }
    if (this.dataDivHeight != null) this.dataDiv.style.height = this.dataDivHeight + "px";
    else {
      if (this.options.length <= this.visibleOptionsNum) this.dataDiv.style.height = (this.options.length * OptionComp.ITEM_HEIGHT + 11 * 2 + 1) + "px";
      else {
        this.dataDiv.style.height = (this.visibleOptionsNum * OptionComp.ITEM_HEIGHT + 11 * 2) + "px";
      }
    }
    this.comboDiv.style.height = (this.options.length * OptionComp.ITEM_HEIGHT) + 11 * 2 + "px";
    this.dataDiv.style.display = "block";
    var top = (compOffsetTop(this.Div_text) - compScrollTop(this.Div_text) + this.Div_text.offsetHeight);
    if (top + this.dataDiv.offsetHeight > document.body.clientHeight) {
      top = document.body.clientHeight - this.dataDiv.offsetHeight;
      if (top < 0) {
        top = "0px";
      }
    }
    this.dataDiv.style.top = top + "px";
    positionElementInView(this.dataDiv);
    if (IS_IE6 || IS_IE7) {
      if (this.dataDiv.scrollHeight > this.dataDiv.clientHeight) {
        this.comboDiv.style.width = this.dataDiv.offsetWidth - BaseComponent.SCROLLWIDTH + "px";
      }
    }
    this.isShown = true;
    if ((!this.selectOnly || (this.selectOnly && this.allowExtendValue)) && !this.showImgOnly && !this.readOnly) {
      if (this.isKeyPressed) {
        this.doFilter();
      } else {
        for (var i = 0, n = this.options.length; i < n; i++) {
          this.options[i].Div_gen.style.display = "block";
        }
      }
    }
    this.resetSelStyle();
  }
};
ComboComp.prototype.getOptions = function() {
  if (this.options != null) return this.options;
  else return null;
};
ComboComp.prototype.getOption = function(value) {
  if (value == null || value == "") return;
  var options = this.options;
  if (options != null && options.length > 0) {
    for (var i = 0; i < options.length; i++) {
      if (options[i].value == value) {
        return options[i];
      }
    }
  }
  return null;
};
ComboComp.prototype.clearOptions = function() {
  if (this.options == null) return;
  this.comboCenterDiv.innerHTML = "";
  this.options = null;
  this.options = new Array();
  this.selectedIndex = -1;
  this.input.value = "";
  this.shownOptions.clear();
};
ComboComp.prototype.clearOption = function(value) {
  if (value == null || value == "") return;
  var options = this.options;
  if (options != null && options.length > 0) {
    for (var i = 0; i < options.length; i++) {
      if (options[i].value == value) {
        this.comboCenterDiv.removeChild(options[i].Div_gen);
        this.options.splice(i, 0, 1);
        this.shownOptions.removeEle(options[i]);
        return;
      }
    }
  }
};
ComboComp.prototype.setComboData = function(comboData, updateDs) {
  var oldValue = (this.getValue() == null && this.notFindComboDataValue != "") ? this.notFindComboDataValue : this.getValue();
  this.clearOptions();
  if (!comboData) return;
  this.comboData = comboData;
  var nameArr = comboData.getNameArray();
  var valueArr = comboData.getValueArray();
  var imageArr = comboData.getImageArray();
  if (nameArr != null) {
    if (this.needNullOption) {
      this.createOption("", "", "", false, -1, this.showImgOnly);
    }
    for (var i = 0; i < nameArr.length; i++) {
      var selected = false;
      this.createOption(nameArr[i], valueArr[i], imageArr[i], selected, -1, this.showImgOnly);
    }
  }
  if (oldValue != null) this.setValue(oldValue, false);
};
ComboComp.prototype.setTitle = function(title) {
  if (!this.isError) {
    if (title != null && title != "") {
      var titleName = "";
      if (this.comboData) {
        if (this.multiSelect) {
          var titles = title.split(";");
          for (var i = 0; i < titles.length; i++) {
            if (titles[i] != "" && titles[i] != "null") {
              titleName += this.comboData.getNameByValue(titles[i]) + ";";
            }
          }
        } else {
          titleName = this.comboData.getNameByValue(title);
        }
      }
      if (titleName != null && titleName != "") {
        this.Div_gen.title = titleName;
        if (this.input != null) this.input.title = titleName;
      } else {
        this.Div_gen.title = title;
        if (this.input != null) this.input.title = title;
      }
    } else if (title == "") {
      if (this.input != null) this.input.title = "";
      this.Div_gen.title = "";
    }
  } else {
    if (title != null && title != "") {
      if (this.input != null) this.input.title = title;
      this.Div_gen.title = title;
    } else if (title == "") {
      if (this.input != null) this.input.title = "";
      this.Div_gen.title = "";
    }
  }
};
ComboComp.prototype.doFilter = function() {
  if (this.isShown) {
    var inputCaption = this.input.value;
    if (inputCaption == "") {
      for (var i = 0, n = this.options.length; i < n; i++) {
        this.options[i].Div_gen.style.display = "block";
      }
    } else {
      for (var i = 0, n = this.options.length; i < n; i++) {
        if (this.options[i].caption == inputCaption || this.options[i].caption == "" || (this.options[i].caption).indexOf(inputCaption) >= 0) {
          this.options[i].Div_gen.style.display = "block";
        } else {
          this.options[i].Div_gen.style.display = "none";
        }
      }
    }
  }
};
ComboComp.prototype.setSelectedItem = function(index) {
  index = parseInt(index);
  if (isNaN(index) || index > this.options.length) return;
  if (index < 0) {
    this.setNullValue(true);
    return;
  }
  var oldSelectedIndex = this.selectedIndex;
  var option = this.options[index];
  if (this.selectedIndex == option.index && this.input.value == option.caption) return;
  this.selectedIndex = option.index;
  if (option.showImgOnly == true) {
    this.input.style.backgroundImage = "url(" + option.caption + ")";
    this.input.style.backgroundRepeat = "no-repeat";
    this.input.style.backgroundPosition = "center";
    this.input.className = this.inputClassName_init;
    if (this.disabled == true) this.input.className = this.inputClassName_init + " text_inactive_bgcolor";
  } else {
    this.input.value = option.caption;
    this.oldValue = option.value;
    if (this.disabled == true) {
      this.input.className = this.inputClassName_inactive;
      this.Div_text.className = this.className + " text_inactive_bgcolor";
    } else {
      this.input.className = this.inputClassName_init;
      this.Div_text.className = this.className;
    }
  }
  if (this.isShown) this.resetSelStyle();
  if (index != oldSelectedIndex) {
    this.ctxChanged = true;
    this.notifyChange(NotifyType.VALUE, this.getValue());
    this.valueChanged(option == null ? null : option.value, this.options[oldSelectedIndex] == null ? null : this.options[oldSelectedIndex].value);
  }
};
ComboComp.prototype.resetSelStyle = function() {
  for (var i = 0, n = this.options.length; i < n; i++) {
    if (this.selectedIndex == i) this.options[i].setSelStyle();
    else this.options[i].setUnSelStyle();
  }
};
ComboComp.prototype.setValue = function(value, updateDs) {
  var sendValueChanged = updateDs == null ? true : updateDs;
  if (value == null) {
    this.setNullValue(true);
    return;
  }
  if (this.readOnly == true) {
    if (this.setValueByOption(value) != true) {
      this.notFindComboDataValue = value;
      if (this.options.length > 0 && sendValueChanged) this.setNullValue(true);
      else this.setNullValue(false);
    }
  } else {
    if ((this.selectOnly == true && this.allowExtendValue == false)) {
      if (this.setValueByOption(value) != true) {
        this.notFindComboDataValue = value;
        if (this.options.length > 0 && sendValueChanged) this.setNullValue(true);
        else this.setNullValue(false);
      }
    } else {
      if (this.setValueByOption(value) != true) {
        this.input.value = value;
        this.notFindComboDataValue = "";
      }
    }
  }
  this.ctxChanged = true;
  this.notifyChange(NotifyType.VALUE, this.getValue());
};
ComboComp.prototype.setNullValue = function(isValueChanged) {
  var oldValue = this.getValue();
  this.selectedIndex = -1;
  if (this.input.value != "") {
    this.input.value = "";
  }
  if (isValueChanged == true) this.valueChanged(null, oldValue);
  this.notifyChange(NotifyType.VALUE, this.getValue());
};
ComboComp.prototype.setValueByOption = function(value) {
  if (this.multiSelect) {
    var values = value.split(";");
    var captionStr = "";
    var valueStr = "";
    var oldRealValue = this.getValue();
    if (this.needNullOption) {
      for (var i = 1; i < this.options.length; i++) {
        if (this.options[i].selectBox) {
          if (this.options[i].selectBox.checked) {
            this.options[i].selectBox.click();
          }
        }
      }
    } else {
      for (var i = 0; i < this.options.length; i++) {
        if (this.options[i].selectBox) {
          if (this.options[i].selectBox.checked) {
            this.options[i].selectBox.click();
          }
        }
      }
    }
    for (var i = 0; i < values.length; i++) {
      if (values[i] != "") {
        for (var j = 0; j < this.options.length; j++) {
          if (values[i] == this.options[j].value) {
            captionStr += this.options[j].caption + ";";
            valueStr += this.options[j].value + ";";
            this.options[j].selectBox.click();
            break;
          } else {
            if (j == this.options.length - 1) {
              return false;
            }
          }
        }
      }
    }
    this.input.value = captionStr;
    this.realValue = valueStr;
    if (this.realValue != oldRealValue) {
      this.ctxChanged = true;
      this.notifyChange(NotifyType.VALUE, this.getValue());
      this.valueChanged(this.realValue, oldRealValue)
    }
    this.notFindComboDataValue = "";
    return true;
  } else {
    for (var i = 0; i < this.options.length; i++) {
      if (value == this.options[i].value) {
        this.setSelectedItem(i);
        this.notFindComboDataValue = "";
        return true;
      }
    }
  }
};
ComboComp.prototype.getValue = function() {
  return this.getSelectedValue();
};
ComboComp.prototype.setShowImgOnly = function(show) {
  this.showImgOnly = show;
};
ComboComp.prototype.getValueIndex = function(value) {
  if (value != null) {
    for (var i = 0; i < this.options.length; i++) {
      if (this.options[i].value == value) return i;
    }
  }
  return -1;
};
ComboComp.prototype.getSelectedIndex = function() {
  return this.selectedIndex;
};
ComboComp.prototype.getSelectedValue = function() {
  if (this.multiSelect) {
    return this.realValue;
  } else {
    if (this.readOnly == true) {
      if (this.selectedIndex == -1) return null;
      return this.options[this.selectedIndex].value;
    } else {
      if (this.selectOnly == true && this.allowExtendValue == false) {
        if (this.selectedIndex == -1) return null;
        return this.options[this.selectedIndex].value;
      } else {
        if (this.selectedIndex == -1) {
          if (this.input.value == "") return null;
          else return this.input.value;
        }
        return this.options[this.selectedIndex].value;
      }
    }
  }
};
ComboComp.prototype.getSelectedCaption = function() {
  if (this.selectedIndex == -1) return null;
  return this.options[this.selectedIndex].caption;
};
ComboComp.prototype.outsideMouseWheelClick = function() {
  this.hideData();
};
ComboComp.prototype.outsideContextMenuClick = function() {
  this.hideData();
};
ComboComp.prototype.outsideClick = function() {
  if (window.clickHolders.trigger == this) return;
  this.hideData();
};
ComboComp.prototype.setActive = function(isActive) {
  var isActive = getBoolean(isActive, false);
  if (this.disabled == false && isActive == false) {
    TextComp.prototype.setActive.call(this, false);
    this.divTextClickFunc = this.Div_text.onclick;
    this.divButtonClickFunc = this.divButton.onclick;
    this.divButtonMouseOutFuc = this.divButton.onmouseout;
    this.divButtonMouseOverFuc = this.divButton.onmouseover;
    this.Div_text.onclick = function() {};
    this.divButton.onclick = function() {};
    this.divButton.onmouseout = function() {};
    this.divButton.onmouseover = function() {};
    this.divButton.style.cursor = "default";
    this.pushImg.src = ComboComp.pushImgDisablePath;
    this.divButton.style.visibility = "hidden";
  } else if (this.disabled == true && isActive == true) {
    TextComp.prototype.setActive.call(this, true);
    this.Div_text.onclick = this.divTextClickFunc;
    this.divButton.onclick = this.divButtonClickFunc;
    this.divButton.onmouseout = this.divButtonMouseOutFuc;
    this.divButton.onmouseover = this.divButtonMouseOverFuc;
    this.divButton.style.cursor = "pointer";
    this.pushImg.src = ComboComp.pushImgNMPath;
    this.divButton.style.visibility = "";
  }
  this.ctxChanged = true;
  this.notifyChange(NotifyType.ENABLE, !this.disabled);
};
ComboComp.prototype.hideData = function() {
  if (this.dataDiv && this.isShown) {
    if (this.multiSelect) {
      var captionStr = "";
      var valueStr = "";
      var indexStr = "";
      if (this.needNullOption) {
        for (var i = 1; i < this.options.length; i++) {
          var option = this.options[i];
          if (option.selectBox.checked) {
            captionStr += option.caption + ";";
            valueStr += option.value + ";";
            indexStr += i + ";";
          }
        }
      } else {
        for (var i = 0; i < this.options.length; i++) {
          var option = this.options[i];
          if (option.selectBox.checked) {
            captionStr += option.caption + ";";
            valueStr += option.value + ";";
            indexStr += i + ";";
          }
        }
      }
      this.input.value = captionStr;
      var oldSelectedValue = this.realValue;
      this.realValue = valueStr;
      this.selectedIndex = indexStr;
      if (oldSelectedValue != this.realValue) {
        this.ctxChanged = true;
        this.notifyChange(NotifyType.VALUE, this.getValue());
        this.valueChanged(this.realValue, oldSelectedValue)
      }
    }
    this.dataDiv.style.display = "none";
    this.isShown = false;
  }
};
ComboComp.prototype.valueChanged = function(newValue, oldValue) {
  var valueChangeEvent = {
    "obj": this,
    "newValue": newValue,
    "oldValue": oldValue
  };
  this.doEventFunc("valueChanged", valueChangeEvent);
  if (this.editFormular || this.validateFormular) execFormula(this.widget.id, null, this.id);
};
ComboComp.prototype.setSelectOnly = function(selectOnly) {
  this.selectOnly = getBoolean(selectOnly, true);
  this.setReadOnly(this.readOnly);
};
ComboComp.prototype.setAllowExtendValue = function(allowExtendValue) {
  this.allowExtendValue = getBoolean(allowExtendValue, false);
};
OptionComp.DEFAULT_VALUE = "DEFAULT";
OptionComp.prototype.componentType = "OPTION";
OptionComp.ITEM_HEIGHT = 19;
OptionComp.IMAGE_WIDTH = 19;
OptionComp.SELECT_WIDTH = 19;

function OptionComp(caption, value, refImg, selected, showImgOnly, multiSelect) {
  var oThis = this;
  this.caption = getString(caption, "");
  this.value = value;
  this.selected = getBoolean(selected, false);
  this.refImg = refImg;
  this.showImgOnly = getBoolean(showImgOnly, false);
  this.multiSelect = getBoolean(multiSelect, false);
  this.Div_gen = $ce("DIV");
  this.Div_gen.id = this.value;
  this.Div_gen.title = this.caption;
  this.Div_gen.style.width = "100%";
  this.Div_gen.style.height = OptionComp.ITEM_HEIGHT + "px";
  this.Div_gen.style.overflow = "hidden";
  this.Div_gen.style.position = "relative";
  this.Div_gen.className = "option_unsel";
  this.index = -1;
  if (this.showImgOnly == true) {
    var img = "<img src='" + this.caption + "' width='16px' height='16px'/>";
    var table = "<table width='100%' height='" + OptionComp.ITEM_HEIGHT + "px'><tr><td align='center' valign='middle'>" + img + "</td></tr></table>";
    this.Div_gen.innerHTML = table;
    var oThis = this;
    this.Div_gen.onmouseover = function() {
      if (typeof(ComboComp) != 'undefined' && ComboComp.prototype.isPrototypeOf(oThis.parentOwner)) {
        var options = oThis.parentOwner.options;
        for (var i = 0, n = options.length; i < n; i++) {
          if (options[i] == oThis) options[i].setSelStyle();
          else options[i].setUnSelStyle();
        }
      } else oThis.setSelStyle();
    };
    this.Div_gen.onmouseout = function() {
      if (ComboComp.prototype.isPrototypeOf(oThis.parentOwner)) {
        oThis.setUnSelStyle();
      }
    };
    this.Div_gen.onclick = function(e) {
      e = EventUtil.getEvent();
      if (!oThis.parentOwner) alert("parent container is null, may be \r\nthis item is not create through method\r\n\"ComboComp.prototype.createOption\"");
      if (ComboComp.prototype.isPrototypeOf(oThis.parentOwner)) {
        oThis.parentOwner.itemclick(oThis);
      }
      stopEvent(e);
      clearEventSimply(e);
    };
  } else {
    if (isNotNull(this.refImg, false)) {
      this.divImg = $ce("DIV");
      this.divImg.style.position = "absolute";
      this.divImg.style.left = "0px";
      this.divImg.style.width = OptionComp.IMAGE_WIDTH - 4 + "px";
      this.divImg.style.height = OptionComp.IMAGE_WIDTH - 4 + "px";
      this.img = $ce("IMG");
      this.img.src = window.themePath + this.refImg;
      this.img.style.width = OptionComp.IMAGE_WIDTH - 4 + "px";
      this.img.style.height = OptionComp.IMAGE_WIDTH - 4 + "px";
      this.divImg.appendChild(this.img);
      this.Div_gen.appendChild(this.divImg);
    }
    this.selectBoxWidth = 0;
    if (this.multiSelect) {
      this.selectBoxDiv = $ce("DIV");
      this.selectBoxDiv.style.position = "absolute";
      this.selectBoxDiv.style.left = "0px";
      this.selectBoxDiv.style.width = OptionComp.SELECT_WIDTH + "px";
      this.selectBox = $ce("INPUT");
      this.selectBox.type = "checkbox";
      if (IS_IE) {
        this.selectBox.style.marginTop = "-3px";
      }
      if (IS_FF) {
        this.selectBox.style.marginTop = "0px";
      }
      this.selectBoxWidth = OptionComp.SELECT_WIDTH;
      this.selectBoxDiv.appendChild(this.selectBox);
      this.Div_gen.appendChild(this.selectBoxDiv);
    }
    this.divCaption = $ce("DIV");
    this.divCaption.style.position = "absolute";
    this.divCaption.style.whiteSpace = "nowrap";
    this.divCaption.style.textOverflow = "ellipsis";
    this.divCaption.style.overflow = "hidden";
    if (isNotNull(this.refImg, false)) this.divCaption.style.left = OptionComp.ITEM_HEIGHT + this.selectBoxWidth + "px";
    else this.divCaption.style.left = 3 + this.selectBoxWidth + "px";
    this.divCaption.appendChild(document.createTextNode(this.caption));
    this.Div_gen.appendChild(this.divCaption);
    this.Div_gen.onmouseover = function() {
      if (typeof(ComboComp) != 'undefined' && ComboComp.prototype.isPrototypeOf(oThis.parentOwner)) {
        var options = oThis.parentOwner.options;
        for (var i = 0, n = options.length; i < n; i++) {
          if (options[i] == oThis) options[i].setSelStyle();
          else options[i].setUnSelStyle();
        }
      } else oThis.setSelStyle();
    };
    this.Div_gen.onmouseout = function() {
      if (typeof(ListComp) != 'undefined' && ListComp.prototype.isPrototypeOf(oThis.parentOwner)) {
        if (oThis.parentOwner.selectedItems != null && (oThis.parentOwner.selectedItems).indexOf(oThis) != -1) this.className = "option_click";
        else oThis.setUnSelStyle();
      } else if (typeof(ComboComp) != 'undefined' && ComboComp.prototype.isPrototypeOf(oThis.parentOwner)) {
        oThis.setUnSelStyle();
      }
    };
    this.Div_gen.onclick = function(e) {
      e = EventUtil.getEvent();
      if (!oThis.parentOwner) alert("parent container is null, may be \r\nthis item is not create through method\r\n\"ComboComp.prototype.createOption\"");
      if (ComboComp.prototype.isPrototypeOf(oThis.parentOwner)) {
        if (oThis.multiSelect) {
          if (e.target.type != "checkbox") {
            oThis.selectBox.click();
          }
        } else {
          oThis.parentOwner.itemclick(oThis);
        }
      } else {
        if (oThis.parentOwner.multiSel) {
          if (e.ctrlKey) oThis.parentOwner.addItemSelected(oThis);
          else oThis.parentOwner.setItemSelected(oThis);
        } else {
          var ds = oThis.parentOwner.dataset;
          if (ds != null) {
            ds.setRowSelected(ds.getRowIndex(oThis.optionData));
          } else oThis.parentOwner.setItemSelected(oThis);
        }
      }
      stopEvent(e);
      clearEventSimply(e);
    };
    this.Div_gen.ondblclick = function() {};
  }
};
OptionComp.prototype.setSelStyle = function() {
  this.Div_gen.className = "option_sel";
};
OptionComp.prototype.setUnSelStyle = function() {
  this.Div_gen.className = "option_unsel";
};
OptionComp.prototype.setIndex = function(index) {
  this.index = index;
};
OptionComp.prototype.setParentOwner = function(parentOwner) {
  this.parentOwner = parentOwner;
};
OptionComp.prototype.getObjHtml = function() {
  return this.Div_gen;
};

FloatTextComp.prototype = new TextComp;
FloatTextComp.prototype.componentType = "FLOATTEXT";
FloatTextComp.prototype.precisionNullType = "nullType";
FloatTextComp.prototype.precisionPositiveType = "positiveType";
FloatTextComp.prototype.precisionNegativeType = "negativeType";

function FloatTextComp(parent, name, left, top, width, position, precision, maxValue, minValue, attrArr, className) {
  if (arguments.length == 0) {
    return;
  }
  this.precision = getString(precision + "", "");
  if (this.precision == "" || this.precision == "null" || this.precision == "undefined") {
    this.precisionType = this.precisionNullType;
  } else {
    if (getInteger(precision, 0) < 0) {
      this.precisionType = this.precisionPositiveType;
      this.precision = this.precision.substring(1);
    } else {
      this.precisionType = this.precisionNegativeType;
    }
  }
  this.focused = false;
  this.maxValue = getInteger(maxValue, "9999999999999999");
  this.minValue = getInteger(minValue, "-9999999999999999");
  if (attrArr != null) {
    if (attrArr.tip == null || attrArr.tip == "") {
      if (minValue != null && maxValue != null) attrArr.tip = this.minValue + "～" + this.maxValue;
      else if (minValue != null) attrArr.tip = ">=" + this.minValue;
      else if (maxValue != null) attrArr.tip = "<=" + this.maxValue;
    }
  }
  this.base = TextComp;
  this.base(parent, name, left, top, width, "N", position, attrArr, className);
};
FloatTextComp.prototype.manageSelf = function() {
  TextComp.prototype.manageSelf.call(this);
  var oThis = this;
  this.input.onblur = function(e) {
    e = EventUtil.getEvent();
    oThis.focused = false;
    if (oThis.Div_text.children.length == 3) {
      var children = oThis.Div_text.children;
      for (var i = 0; i < children.length; i++) {
        if (typeof(children[i]) != "undefined") {
          children[i].className = children[i].className.replaceStr('input_highlight', 'input_normal');
        }
      }
      oThis.input.className = oThis.input.className.replaceStr('input_highlight_center_bg', 'input_normal_center_bg');
    }
    oThis.blur(e);
    if (!oThis.ingrid) {
      if (!(typeof(oThis.input.value) == "string" && oThis.input.value.indexOf(",") != -1)) {
        oThis.setValue(oThis.input.value);
      }
    }
    oThis.showTip();
    clearEventSimply(e);
  };
  this.input.onfocus = function(e) {
    e = EventUtil.getEvent();
    oThis.focused = true;
    var length = oThis.input.value.length;
    if (oThis.input.createTextRange) {
      var r = oThis.input.createTextRange();
      r.collapse(true);
      r.moveStart('character', length);
      r.select();
    } else if (oThis.input.setSelectionRange) {
      oThis.input.setSelectionRange(length, length);
    }
    oThis.focus(e);
    clearEventSimply(e);
  };
  this.input.onkeyup = function(e) {
    oThis.ctxChanged = true;
    e = EventUtil.getEvent();
    oThis.onkeyup(e);
    clearEventSimply(e);
    if (window.pageUI) window.pageUI.setChanged(true);
  };
};
FloatTextComp.prototype.processEnter = function() {
  var inputValue = this.getValue().trim();
  if (inputValue != "") {
    if (this.precisionType != this.precisionNullType) inputValue = this.getFormater().format(inputValue, this.minValue, this.maxValue);
    if (inputValue == "") {
      this.input.value = "";
      this.setMessage("");
      this.setFocus();
    } else {
      this.setCorrectValue(inputValue);
    }
  }
};
FloatTextComp.prototype.createDefaultFormater = function() {
  return new DicimalFormater(this.precision, this.minValue, this.maxValue);
};
FloatTextComp.prototype.blur = function() {
  if (this.visible == false) return;
  var valueStr = "var value = this.input.value.trim().replace(/\\" + window.$maskerMeta.NumberFormatMeta.markSymbol + "/g,'').replace(/\\" + window.$maskerMeta.NumberFormatMeta.pointSymbol + "/g,'.');";
  eval(valueStr);
  if (this.dataType == 'N' && value == "") {
    this.setCorrectValue("");
    this.valueChanged(this.oldValue, value);
  }
  if (this.dataType == 'N' && value != "") {
    if (this.oldValue != value && this.precisionType != this.precisionNullType) value = this.getFormater().format(value, this.minValue, this.maxValue);
    this.valueChanged(this.oldValue, value);
    if (value == "") {
      showVerifyMessage(this, trans("ml_decimalmustbetween", [this.minValue, this.maxValue]));
      this.input.value = "";
      this.setMessage("");
      this.setFocus();
    }
  }
  this.onblur();
};
FloatTextComp.prototype.focus = function(e) {
  this.warnIcon.style.display = "none";
  if (this.isError && typeof(this.errorMessage) == 'string' && this.errorMessage != '') {
    this.errorCenterDiv.innerHTML = this.errorMessage;
    this.errorMsgDiv.style.display = "block";
  }
  e = EventUtil.getEvent();
  if (this.Div_text.children.length == 3) {
    var children = this.Div_text.children;
    for (var i = 0; i < children.length; i++) {
      children[i].className = children[i].className.replaceStr('input_normal', 'input_highlight');
    }
    this.input.className = this.input.className.replaceStr('input_normal_center_bg', 'input_highlight_center_bg');
  }
  this.input.style.color = "black";
  this.input.value = this.newValue;
  this.oldValue = this.newValue;
  if (this.visible == true) {
    this.onfocus(e);
  }
  this.hideTip();
};
FloatTextComp.prototype.setFocus = function() {
  var oThis = this;
  if (this.visible == true) {
    if (this.disabled) {
      this.mayFocus = true;
    } else {
      if (IS_IE) {
        this.input.focus();
        this.input.select();
      } else {
        window.setTimeout(function() {
          oThis.input.focus();
          oThis.input.select();
        }, 50);
      }
    }
  }
  this.ctxChanged = true;
};
FloatTextComp.prototype.setPrecision = function(precision, fromDs) {
  fromDs = (fromDs == null) ? false : fromDs;
  if (fromDs == true) {
    this.precisionFromDs = true;
  }
  if (this.precisionFromDs != null && this.precisionFromDs == true && fromDs == false) return;
  this.precision = getString(precision + "", "");
  if (this.precision == "" || this.precision == "null") {
    this.precisionType = this.precisionNullType;
  } else {
    if (getInteger(precision, 0) < 0) {
      this.precisionType = this.precisionPositiveType;
      this.precision = this.precision.substring(1);
    } else {
      this.precisionType = this.precisionNegativeType;
    }
  }
  this.getFormater().precision = this.precision;
  var text = this.getValue();
  if (text != "") {
    if (this.precisionType != this.precisionNullType) text = this.getFormater().format(text);
    this.setValue(text);
    this.notifyChange(NotifyType.PRECISION, this.precision);
  }
};
FloatTextComp.prototype.setValue = function(text) {
  var valueStr = "var text = getString(text,'').trim().replace(/\\" + window.$maskerMeta.NumberFormatMeta.markSymbol + "/g,'').replace(/\\" + window.$maskerMeta.NumberFormatMeta.pointSymbol + "/g,'.');";
  eval(valueStr);
  if (text != null) {
    text.replace(/[^\w|^.|^+|^-]/ig, '')
  }
  var textValue = parseFloat(text);
  if (isNaN(textValue)) {
    textValue = "";
    text = "";
  }
  this.oldValue = this.newValue;
  if (isReturning()) {
    if (this.precisionType == this.precisionNegativeType) text = this.getFormater().format(text);
    if (this.precisionType == this.precisionPositiveType) {
      text = text + "";
      if (text.length - text.indexOf(".") - 1 < this.precision || text.indexOf(".") == -1) {
        text = this.getFormater().format(text);
      } else if (text.length - text.indexOf(".") - 1 == this.precision) {
        text = text;
      } else {
        var overLength = text.length - text.indexOf(".") - this.precision - 1;
        for (var i = 0; i < overLength; i++) {
          if (text.charAt(text.length - 1) == "0") {
            text = text.substring(0, text.length - 1);
          } else {
            break;
          }
        }
      }
    }
    this.newValue = text;
  } else {
    if (this.oldValue != text && this.precisionType != this.precisionNullType) text = this.getFormater().format(text);
    this.newValue = text;
  }
  var masker = getMasker(this.componentType);
  if (this.focused) {
    this.showValue = this.newValue;
  } else {
    if (masker != null) this.showValue = masker.format(this.newValue).value;
  }
  if (this.showValue == "") {
    this.input.value = "";
    this.setMessage("");
  } else {
    this.input.value = this.showValue;
    this.setMessage(this.showValue);
  }
  if (this.checkTip()) {
    if (this.input.value == "") this.showTip();
    else this.input.style.color = "black";
  }
  if (masker.format(this.newValue).color != null) this.input.style.color = "red";
  else this.input.style.color = "black";
  if (this.newValue != this.oldValue) {
    this.valueChanged(this.oldValue, this.newValue);
  } else if (typeof(this.oldValue) == "string" && this.oldValue.trim() == "" && this.newValue === 0) {
    this.valueChanged(this.oldValue, this.newValue);
  } else if (this.oldValue === 0 && typeof(this.newValue) == "string" && this.newValue.trim() == "") {
    this.valueChanged(this.oldValue, this.newValue);
  }
  this.ctxChanged = true;
};
FloatTextComp.prototype.setTitle = function(title) {
  if (title != null && title != "") {
    if (this.input != null) {
      this.input.title = title;
    }
    if (this.Div_gen != null) this.Div_gen.title = title;
  } else if (title == "") {
    if (this.input != null) {
      this.input.title = "";
    }
    if (this.Div_gen != null) this.Div_gen.title = "";
  }
};
FloatTextComp.prototype.setCorrectValue = function(text) {
  this.setMessage(text);
  this.input.value = text;
};
FloatTextComp.prototype.setChangedContext = function(context) {
  TextComp.prototype.setChangedContext.call(this, context);
  if (context.precision != null) {
    this.setPrecision(context.precision);
  }
};
FloatTextComp.prototype.setMaxValue = function(maxValue) {
  if (!isNaN(parseFloat(maxValue))) {
    this.maxValue = parseFloat(maxValue);
  } else this.maxValue = null;
};
FloatTextComp.prototype.setMinValue = function(minValue) {
  if (!isNaN(parseFloat(minValue))) {
    this.minValue = parseFloat(minValue);
  } else this.minValue = null;
};

CalendarComp.prototype = new BaseComponent;
CalendarComp.prototype.componentType = "CALENDAR";
CalendarComp.imagePath = window.themePath + "/ui/ctrl/calendar/images/";
CalendarComp.prototype.upImagePath = CalendarComp.imagePath + "up.gif";
CalendarComp.prototype.downImagePath = CalendarComp.imagePath + "down.gif";
CalendarComp.prototype.leftImagePath = CalendarComp.imagePath + "arrow_left.png";
CalendarComp.prototype.rightImagePath = CalendarComp.imagePath + "arrow_right.png";
var MONTHS = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
var WEEKDAYS_FULL = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
var WEEKDAYS = null;
var MONTH_DAY_COUNT = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31");
var currDate = new Date();
var DimanchePaques = false;

function CalendarComp(isState, parent) {
  if (WEEKDAYS == null) WEEKDAYS = new Array(trans("ml_seven"), trans("ml_one"), trans("ml_two"), trans("ml_three"), trans("ml_four"), trans("ml_five"), trans("ml_six"));
  this.getInstance = Singleton;
  this.isState = getBoolean(isState, false);
  this.parentComp = parent;
  this.compId = null;
  if (!this.isState) {
    if (instance = this.getInstance()) {
      return instance;
    } else {
      this.base = BaseComponent;
      this.base("Calendar", "", "", "", "");
      this.dateObject = new Date();
      this.day = this.dateObject.getDate();
      this.month = this.dateObject.getMonth() + 1;
      this.year = this.dateObject.getFullYear();
      this.weekDay = this.dateObject.getDay();
      this.parentOwner = document.body;
      this.create();
    }
  } else {
    this.base = BaseComponent;
    this.base("Calendar", "", "", "", "");
    this.dateObject = new Date();
    this.day = this.dateObject.getDate();
    this.month = this.dateObject.getMonth() + 1;
    this.year = this.dateObject.getFullYear();
    this.weekDay = this.dateObject.getDay();
    this.parentOwner = document.body;
    this.oldDayCell = null;
    this.oldDayCellColor = null;
    this.parentOwner = parent;
    this.create();
  }
  window.clickHolders.push(this);
};
CalendarComp.prototype.create = function() {
  var oThis = this;
  this.Div_gen = $ce("DIV");
  this.Div_gen.id = "Calendar";
  this.Div_gen.className = "calendar_div";
  this.Div_gen.style.zIndex = getZIndex();
  this.Div_gen.onclick = function(e) {
    e = EventUtil.getEvent();
    stopAll(e);
    clearEventSimply(e);
  };
  this.bgDiv();
};
CalendarComp.prototype.bgDiv = function() {
  this.bgDiv = $ce("DIV");
  var frmstr = '<iframe src="" style="position:absolute; visibility:inherit; top:0px; left:0px; width:100%;height:100%; z-index:-1; border:none;" frameborder="0"></<iframe>';
  this.bgDiv.innerHTML = frmstr;
  this.bgDiv.className = 'background_div';
  this.bgLeftTopDiv = $ce("DIV");
  this.bgLeftTopDiv.className = 'bg_left_top_div';
  this.bgCenterTopDiv = $ce("DIV");
  this.bgCenterTopDiv.className = 'bg_center_top_div';
  this.bgRightTopDiv = $ce("DIV");
  this.bgRightTopDiv.className = 'bg_right_top_div';
  this.bgLeftCenterDiv = $ce("DIV");
  this.bgLeftCenterDiv.className = 'bg_left_center_div';
  this.bgCenterDiv = $ce("DIV");
  this.bgCenterDiv.className = 'bg_center_div';
  this.bgRightCenterDiv = $ce("DIV");
  this.bgRightCenterDiv.className = 'bg_right_center_div';
  this.bgLeftBottomDiv = $ce("DIV");
  this.bgLeftBottomDiv.className = 'bg_left_bottom_div';
  this.bgCenterBottomDiv = $ce("DIV");
  this.bgCenterBottomDiv.className = 'bg_center_bottom_div';
  this.bgRightBottomDiv = $ce("DIV");
  this.bgRightBottomDiv.className = 'bg_right_bottom_div';
  this.bgDiv.appendChild(this.bgLeftTopDiv);
  this.bgDiv.appendChild(this.bgCenterTopDiv);
  this.bgDiv.appendChild(this.bgRightTopDiv);
  this.bgDiv.appendChild(this.bgLeftCenterDiv);
  this.bgDiv.appendChild(this.bgCenterDiv);
  this.bgDiv.appendChild(this.bgRightCenterDiv);
  this.bgDiv.appendChild(this.bgLeftBottomDiv);
  this.bgDiv.appendChild(this.bgCenterBottomDiv);
  this.bgDiv.appendChild(this.bgRightBottomDiv);
  this.Div_gen.appendChild(this.bgDiv);
};
CalendarComp.prototype.manageSelf = function() {
  var oThis = this;
  this.opBar = $ce("DIV");
  this.opBar.className = "opBar";
  this.bgCenterDiv.appendChild(this.opBar);
  var drag = false;
  var oldX = 0;
  var oldY = 0;
  this.opBar.onmousedown = function(e) {
    e = EventUtil.getEvent();
    drag = true;
    if (IS_IE) {
      oldX = e.clientX;
      oldY = e.clientY;
    } else {
      oldX = e.pageX;
      oldY = e.pageY;
    }
    if (IS_IE) this.setCapture();
    else window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
    clearEventSimply(e);
  };
  this.opBar.onmouseup = function(e) {
    drag = false;
    if (IS_IE) this.releaseCapture();
    else window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
  };
  if (!IS_IE) {
    window.onmouseup = function() {
      drag = false;
      window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
    };
  }
  this.opBar.onmousemove = function(e) {
    e = EventUtil.getEvent();
    if (drag) {
      if (IS_IE) {
        if (e.clientX <= 0 || e.clientX >= document.body.clientWidth) return false;
        if (e.clientY <= 0 || e.clientY >= document.body.clientHeight) return false;
        var offsetX = e.clientX - oldX;
        var offsetY = e.clientY - oldY;
        oldX = e.clientX;
        oldY = e.clientY;
        oThis.Div_gen.style.left = oThis.Div_gen.style.pixelLeft + offsetX + "px";
        oThis.Div_gen.style.top = oThis.Div_gen.style.pixelTop + offsetY + "px";
      } else {
        var offsetX = e.pageX - oldX;
        var offsetY = e.pageY - oldY;
        oldX = e.pageX;
        oldY = e.pageY;
        oThis.Div_gen.style.left = oThis.Div_gen.offsetLeft + offsetX + "px";
        oThis.Div_gen.style.top = oThis.Div_gen.offsetTop + offsetY + "px";
      }
      clearEventSimply(e);
    }
  };
  this.weekBar = $ce("DIV");
  this.weekBar.className = "weekBar";
  if (!this.hiddenDayBar) {
    this.bgCenterDiv.appendChild(this.weekBar);
  }
  var marginLeft = 5;
  this.preYearDiv = $ce("DIV");
  this.preYearDiv.className = "preDiv";
  this.preYearDiv.style.left = marginLeft + "px";
  this.opBar.appendChild(this.preYearDiv);
  this.yearInput = $ce("INPUT");
  this.yearInput.className = "calendar_bar_input";
  this.yearInput.style.left = marginLeft + 15 + "px";
  this.opBar.appendChild(this.yearInput);
  this.nextYearDiv = $ce("DIV");
  this.nextYearDiv.className = "nextDiv";
  this.nextYearDiv.style.left = marginLeft + 70 + "px";
  this.opBar.appendChild(this.nextYearDiv);
  this.yearInput.onchange = function(e) {
    var currYear = this.value.replace(trans("ml_year"), "");
    oThis.changeDate(parseInt(currYear, 10), oThis.month);
    e = EventUtil.getEvent();
    stopEvent(e);
    clearEventSimply(e);
  };
  this.yearInput.onmousedown = function(e) {
    e = EventUtil.getEvent();
    clearEventSimply(e);
    stopAll(e);
  };
  this.preYearDiv.onclick = function(e) {
    e = EventUtil.getEvent();
    oThis.changeDate(oThis.year - 1, oThis.month);
    stopEvent(e);
    clearEventSimply(e);
  };
  this.nextYearDiv.onclick = function(e) {
    e = EventUtil.getEvent();
    oThis.changeDate(oThis.year + 1, oThis.month);
    stopEvent(e);
    clearEventSimply(e);
  };
  this.preMonButt = $ce("DIV");
  this.preMonButt.className = "preDiv";
  this.preMonButt.style.left = marginLeft + 125 + "px";
  this.opBar.appendChild(this.preMonButt);
  this.monthInput = $ce("INPUT");
  this.monthInput.className = "calendar_bar_input";
  this.monthInput.style.left = marginLeft + 140 + "px";
  this.monthInput.style.width = "20px";
  this.monthInput.onmousedown = function(e) {
    e = EventUtil.getEvent();
    clearEventSimply(e);
    stopAll(e);
  };
  this.opBar.appendChild(this.monthInput);
  this.nextMonButt = $ce("DIV");
  this.nextMonButt.className = "nextDiv";
  this.nextMonButt.style.left = marginLeft + 178 + "px";
  this.opBar.appendChild(this.nextMonButt);
  this.preMonButt.onclick = function() {
    oThis.changeDate(oThis.year, oThis.month - 1);
  };
  this.nextMonButt.onclick = function() {
    oThis.changeDate(oThis.year, oThis.month + 1);
  };
  this.monthInput.onchange = function(e) {
    var currMonth = this.value.replace(trans("ml_month"), "");
    oThis.changeDate(oThis.year, parseInt(currMonth, 10));
    e = EventUtil.getEvent();
    stopEvent(e);
    clearEventSimply(e);
  };
  if (!this.hiddenDayBar) {
    for (j = 0; j < 7; j++) {
      var divWeekday = $ce("DIV");
      divWeekday.id = "calendar_day";
      divWeekday.className = "calendar_day";
      divWeekday.style.left = (j * 30) + "px";
      if (j == this.weekDay) {
        divWeekday.className += " calendar_current_day";
      }
      this.weekBar.appendChild(divWeekday);
      divWeekday.appendChild(document.createTextNode(WEEKDAYS[j]));
    }
  }
  var sepBelowDivWeek = $ce("hr");
  sepBelowDivWeek.style.position = "absolute";
  sepBelowDivWeek.style.width = this.opBar.offsetWidth - 40 + "px";
  if (!IS_IE || IS_IE8) sepBelowDivWeek.style.top = 55 + "px";
  else sepBelowDivWeek.style.top = 60 + "px";
  sepBelowDivWeek.style.left = "18px";
  sepBelowDivWeek.style.color = "#c6d6e9";
  sepBelowDivWeek.size = 1;
  div_Calendar = $ce("DIV");
  div_Calendar.className = "calendarDiv";
  if (!this.hiddenDayBar) {
    this.bgCenterDiv.appendChild(div_Calendar);
  }
  this.resetCalendar();
};
CalendarComp.prototype.outsideClick = function(e) {
  this.hide();
};
CalendarComp.prototype.outsideMouseWheelClick = function(e) {
  this.hide();
};
CalendarComp.prototype.show = function(left, top, showTimeBar, dateValue, hiddenDayBar, attrArr) {
  var oThis = this;
  this.left = left;
  this.top = top;
  this.Div_gen.style.top = "0px";
  this.Div_gen.style.left = this.left + "px";
  if (showTimeBar) {
    this.showTimeBar = true;
  } else {
    this.showTimeBar = false;
  }
  if (hiddenDayBar) {
    this.hiddenDayBar = true;
  } else {
    this.hiddenDayBar = false;
  }
  this.editMin = true;
  this.editSec = true;
  if (attrArr) {
    this.editMin = getBoolean(attrArr.editMin, true);
    this.editSec = getBoolean(attrArr.editSec, true);
  }
  var oldDateObject = this.dateObject;
  if (dateValue != null && dateValue != "") {
    if (dateValue.indexOf("-") > -1) dateValue = dateValue.replace(/\-/g, "/");
    this.dateObject = new Date(dateValue);
    if (isNaN(this.dateObject.getFullYear())) {
      var values = dateValue.split("-");
      if (values && values.length == 3) {
        var year = parseInt(values[0], 10);
        var month = parseInt(values[1], 10) - 1;
        var day = parseInt(values[2], 10);
        if (isNaN(year) || isNaN(month) || isNaN(day)) {
          this.dateObject = new Date();
        } else {
          this.dateObject = new Date(year, month, day);
        }
      } else {
        this.dateObject = new Date();
      }
    }
  } else {
    this.dateObject = new Date();
  }
  this.Div_gen.style.visibility = 'visible';
  if (this.dateObject.getAAAAMMJJ() != oldDateObject.getAAAAMMJJ()) {
    this.day = this.dateObject.getDate();
    this.month = this.dateObject.getMonth() + 1;
    this.year = this.dateObject.getFullYear();
  }
  if (showTimeBar) {
    if (this.timeBar == null) {
      this.timeBar = $ce("DIV");
      if (!this.hiddenDayBar) {
        this.bgCenterDiv.appendChild(this.timeBar);
      }
      this.timeBar.style.position = "absolute";
      this.timeBar.style.width = "100%";
      this.timeBar.style.height = "55px";
      this.timeBar.style.top = (this.Div_gen.offsetHeight - 75) + "px";
      this.timeBar.style.left = "0px";
      this.timeBar.style.visibility = "hidden";
      var marginLeft = 10;
      this.hourInput = $ce("input");
      this.hourInput.className = "calendar_bar_input";
      this.hourInput.style.width = "20px";
      this.hourInput.style.left = marginLeft + "px";
      this.timeBar.appendChild(this.hourInput);
      this.hourInput.onclick = function(e) {
        if (!e) e = window.event;
        stopAll(e);
      };
      this.hourDiv = $ce("DIV");
      this.hourDiv.style.position = "absolute";
      this.hourDiv.className = "calendar_bar_img_div";
      this.hourDiv.style.left = marginLeft + 36 + "px";
      this.timeBar.appendChild(this.hourDiv);
      this.preHourImg = $ce("img");
      this.preHourImg.src = this.upImagePath;
      this.preHourImg.className = "calendar_bar_imgup";
      this.hourDiv.appendChild(this.preHourImg);
      this.preHourImg.onclick = function(e) {
        if (!e) e = window.event;
        var value = oThis.hourInput.value;
        if (value == null || value == "") value = 0;
        else value = parseInt(value, 10);
        value++;
        if (value > 23) value = 23;
        else if (value < 0) value = 0;
        oThis.hourInput.value = value;
        stopAll(e);
      };
      this.nextHourImg = $ce("img");
      this.nextHourImg.src = this.downImagePath;
      this.nextHourImg.className = "calendar_bar_imgdown";
      this.hourDiv.appendChild(this.nextHourImg);
      this.nextHourImg.onclick = function(e) {
        if (!e) e = window.event;
        var value = oThis.hourInput.value;
        if (value == null || value == "") value = 0;
        else value = parseInt(value, 10);
        value--;
        if (value < 0) value = 0;
        else if (value > 23) value = 23;
        oThis.hourInput.value = value;
        stopAll(e);
      };
      var hourText = $ce("DIV");
      hourText.style.position = "absolute";
      this.timeBar.appendChild(hourText);
      hourText.style.width = "10px";
      hourText.style.left = marginLeft + 53 + "px";
      hourText.style.top = "8px";
      hourText.innerHTML = trans("ml_hour");
      this.minInput = $ce("input");
      this.minInput.className = "calendar_bar_input";
      if (!this.editMin) {
        this.minInput.disabled = true;
      }
      this.minInput.style.width = "20px";
      this.minInput.style.left = marginLeft + 68 + "px";
      this.timeBar.appendChild(this.minInput);
      this.minInput.onclick = function(e) {
        if (!e) e = window.event;
        stopAll(e);
      };
      this.minDiv = $ce("DIV");
      this.minDiv.style.position = "absolute";
      this.minDiv.className = "calendar_bar_img_div";
      this.minDiv.style.left = marginLeft + 104 + "px";
      this.timeBar.appendChild(this.minDiv);
      this.preMinImg = $ce("img");
      this.preMinImg.src = this.upImagePath;
      this.preMinImg.className = "calendar_bar_imgup";
      this.minDiv.appendChild(this.preMinImg);
      this.preMinImg.onclick = function(e) {
        if (!oThis.editMin) return;
        if (!e) e = window.event;
        var value = oThis.minInput.value;
        if (value == null || value == "") value = 0;
        else value = parseInt(value, 10);
        value++;
        if (value > 59) value = 59;
        else if (value < 0) value = 0;
        oThis.minInput.value = value;
        stopAll(e);
      };
      this.nextMinImg = $ce("img");
      this.nextMinImg.src = this.downImagePath;
      this.nextMinImg.className = "calendar_bar_imgdown";
      this.minDiv.appendChild(this.nextMinImg);
      this.nextMinImg.onclick = function(e) {
        if (!oThis.editMin) return;
        if (!e) e = window.event;
        var value = oThis.minInput.value;
        if (value == null || value == "") value = 0;
        else value = parseInt(value, 10);
        value--;
        if (value < 0) value = 0;
        else if (value > 59) value = 59;
        oThis.minInput.value = value;
        stopAll(e);
      };
      var minText = $ce("DIV");
      minText.style.position = "absolute";
      this.timeBar.appendChild(minText);
      minText.style.width = "10px";
      minText.style.left = marginLeft + 121 + "px";
      minText.style.top = "8px";
      minText.innerHTML = trans("ml_min");
      this.secInput = $ce("input");
      this.secInput.className = "calendar_bar_input";
      if (!this.editSec) {
        this.secInput.disabled = true;
      }
      this.secInput.style.width = "20px";
      this.secInput.style.left = marginLeft + 136 + "px";
      this.timeBar.appendChild(this.secInput);
      this.secInput.onclick = function(e) {
        if (!e) e = window.event;
        stopAll(e);
      };
      this.secDiv = $ce("DIV");
      this.secDiv.style.position = "absolute";
      this.secDiv.className = "calendar_bar_img_div";
      this.secDiv.style.left = marginLeft + 172 + "px";
      this.timeBar.appendChild(this.secDiv);
      this.preSecImg = $ce("img");
      this.preSecImg.src = this.upImagePath;
      this.preSecImg.className = "calendar_bar_imgup";
      this.secDiv.appendChild(this.preSecImg);
      this.preSecImg.onclick = function(e) {
        if (!oThis.editSec) return;
        if (!e) e = window.event;
        var value = oThis.secInput.value;
        if (value == null || value == "") value = 0;
        else value = parseInt(value, 10);
        value++;
        if (value > 59) value = 59;
        else if (value < 0) value = 0;
        oThis.secInput.value = value;
        stopAll(e);
      };
      this.nextSecImg = $ce("img");
      this.nextSecImg.src = this.downImagePath;
      this.nextSecImg.className = "calendar_bar_imgdown";
      this.secDiv.appendChild(this.nextSecImg);
      this.nextSecImg.onclick = function(e) {
        if (!oThis.editSec) return;
        if (!e) e = window.event;
        var value = oThis.secInput.value;
        if (value == null || value == "") value = 0;
        else value = parseInt(value, 10);
        value--;
        if (value < 0) value = 0;
        else if (value > 59) value = 59;
        oThis.secInput.value = value;
        stopAll(e);
      };
      var secText = $ce("DIV");
      secText.style.position = "absolute";
      this.timeBar.appendChild(secText);
      secText.style.width = "10px";
      secText.style.left = marginLeft + 190 + "px";
      secText.style.top = "8px";
      secText.innerHTML = trans("ml_sec");
      var btnDiv = $ce("DIV");
      this.timeBar.appendChild(btnDiv);
      btnDiv.style.height = "30px";
      btnDiv.style.width = "100%";
      btnDiv.style.top = "30px";
      btnDiv.style.position = "absolute";
      if (this.hiddenDayBar) {
        this.bgCenterDiv.appendChild(btnDiv);
        btnDiv.style.top = "40px";
      }
      this.okBtDiv = $ce("DIV");
      this.okBtDiv.style[ATTRFLOAT] = "right";
      this.okBtDiv.style.marginRight = "8px";
      this.cancelBtDiv = $ce("DIV");
      this.cancelBtDiv.style[ATTRFLOAT] = "right";
      this.cancelBtDiv.style.marginRight = "8px";
      if (!IS_IE) {
        this.okBtDiv.style.textAlign = "-moz-right";
        this.cancelBtDiv.style.textAlign = "-moz-left";
      }
      btnDiv.appendChild(this.cancelBtDiv);
      btnDiv.appendChild(this.okBtDiv);
      this.okText = trans("ml_ok");
      this.cancelText = trans("ml_cancel");
      this.okBt = new ButtonComp(this.okBtDiv, "okBt", 0, 0, "60", "23", this.okText == null ? trans("ml_ok") : this.okText, "", '', "relative", "", false, "blue_button_div", false);
      this.okBt.onclick = function(e) {
        oThis.onClick(oThis.day);
      };
      this.cancelBt = new ButtonComp(this.cancelBtDiv, "cancelBt", 0, 0, "60", "23", this.cancelText == null ? trans("ml_cancel") : this.cancelText, "", '', "relative", "", false, "button_div", false);
      this.cancelBt.onclick = function(e) {
        oThis.hide();
      };
    }
    this.hourInput.value = this.dateObject.getHours();
    this.minInput.value = this.dateObject.getMinutes();
    this.secInput.value = this.dateObject.getSeconds();
    if (typeof calendarChange != "undefined") {
      calendarChange.call(this, oThis);
    }
  }
  if (this.hiddenDayBar) {
    if (this.timeBar == null) {
      this.timeBar = $ce("DIV");
      this.bgCenterDiv.appendChild(this.timeBar);
      this.timeBar.style.position = "absolute";
      this.timeBar.style.width = "100%";
      this.timeBar.style.height = "55px";
      this.timeBar.style.top = (this.Div_gen.offsetHeight - 75) + "px";
      this.timeBar.style.left = "0px";
      this.timeBar.style.visibility = "hidden";
      var btnDiv = $ce("DIV");
      this.timeBar.appendChild(btnDiv);
      btnDiv.style.height = "30px";
      btnDiv.style.width = "100%";
      btnDiv.style.top = "30px";
      btnDiv.style.position = "absolute";
      this.okBtDiv = $ce("DIV");
      this.okBtDiv.style[ATTRFLOAT] = "right";
      this.okBtDiv.style.marginRight = "8px";
      this.cancelBtDiv = $ce("DIV");
      this.cancelBtDiv.style[ATTRFLOAT] = "right";
      this.cancelBtDiv.style.marginRight = "8px";
      if (!IS_IE) {
        this.okBtDiv.style.textAlign = "-moz-right";
        this.cancelBtDiv.style.textAlign = "-moz-left";
      }
      btnDiv.appendChild(this.cancelBtDiv);
      btnDiv.appendChild(this.okBtDiv);
      this.okText = trans("ml_ok");
      this.cancelText = trans("ml_cancel");
      this.okBt = new ButtonComp(this.okBtDiv, "okBt", 0, 0, "60", "23", this.okText == null ? trans("ml_ok") : this.okText, "", '', "relative", "", false, "blue_button_div");
      this.okBt.onclick = function(e) {
        oThis.onClick(oThis.day);
      };
      this.cancelBt = new ButtonComp(this.cancelBtDiv, "cancelBt", 0, 0, "60", "23", this.cancelText == null ? trans("ml_cancel") : this.cancelText, "", '', "relative", "", false, "button_div");
      this.cancelBt.onclick = function(e) {};
    }
  }
  if (this.hiddenDayBar) {
    this.timeBar.style.visibility = "visible";
  } else {
    if (showTimeBar) this.timeBar.style.visibility = "visible";
    else {
      if (this.timeBar != null) this.timeBar.style.visibility = "hidden";
    }
  }
  if (this.parentOwner && !this.isPlaceIn) {
    this.placeIn(this.parentOwner);
    this.isPlaceIn = true;
  }
  this.resetCalendar();
};
CalendarComp.prototype.setDate = function(y, m, d) {
  this.day = d;
  this.month = m;
  this.year = y;
  this.dateObject = new Date(y, m - 1, d);
};
CalendarComp.prototype.changeDate = function(y, m) {
  if (this.dateObject == null) this.dateObject = currDate;
  var d = this.dateObject.getDate();
  if (m == 13) {
    m = 1;
    y++;
  }
  if (m == 0) {
    m = 12;
    y--;
  }
  if (d == 30 || d == 31) {
    if (d > MONTH_DAY_COUNT[m - 1]) d = MONTH_DAY_COUNT[m - 1];
  }
  this.setDate(y, m, d);
  this.resetCalendar();
};
CalendarComp.prototype.onClick = function(day) {
  var tmpDay = day;
  var tmpMonth = 0 + this.month;
  var tmpYear = this.year;
  if (tmpDay < 10) {
    tmpDay = "0" + tmpDay;
  }
  if (tmpMonth < 10) {
    tmpMonth = "0" + tmpMonth;
  }
  if (this.hiddenDayBar) {
    this.onclick(tmpYear + "-" + tmpMonth);
  } else {
    if (this.showTimeBar) {
      var hour = this.hourInput.value;
      if (hour != null) {
        hour = parseInt(hour, 10);
        if (!isNumber(hour) || hour < 0 || hour >= 24) hour = "00";
        else if (hour < 10) hour = "0" + hour;
      } else {
        hour = "00";
      }
      var min = this.minInput.value;
      if (min != null) {
        min = parseInt(min, 10);
        if (!isNumber(min) || min < 0 || min >= 60) min = "00";
        else if (min < 10) min = "0" + min;
      } else {
        min = "00";
      }
      var sec = this.secInput.value;
      if (sec != null) {
        sec = parseInt(sec, 10);
        if (!isNumber(sec) || sec < 0 || sec >= 60) sec = "00";
        else if (sec < 10) sec = "0" + sec;
      } else {
        sec = "00";
      }
      this.onclick(tmpYear + "-" + tmpMonth + "-" + tmpDay + " " + hour + ":" + min + ":" + sec);
      this.hourInput.value = hour;
      this.minInput.value = min;
      this.secInput.value = sec;
    } else {
      var d = new Date();
      hour = d.getHours();
      min = d.getMinutes();
      sec = d.getSeconds();
      if (hour != null) {
        hour = parseInt(hour, 10);
        if (!isNumber(hour) || hour < 0 || hour >= 24) hour = "00";
        else if (hour < 10) hour = "0" + hour;
      } else {
        hour = "00";
      }
      if (min != null) {
        min = parseInt(min, 10);
        if (!isNumber(min) || min < 0 || min >= 60) min = "00";
        else if (min < 10) min = "0" + min;
      } else {
        min = "00";
      }
      if (sec != null) {
        sec = parseInt(sec, 10);
        if (!isNumber(sec) || sec < 0 || sec >= 60) sec = "00";
        else if (sec < 10) sec = "0" + sec;
      } else {
        sec = "00";
      }
      this.onclick(tmpYear + "-" + tmpMonth + "-" + tmpDay + " " + hour + ":" + min + ":" + sec);
    }
  }
  if (!this.isState) {
    this.hide();
  }
};
CalendarComp.prototype.hide = function() {
  this.Div_gen.style.visibility = "hidden";
  if (this.timeBar) this.timeBar.style.visibility = "hidden";
};
CalendarComp.prototype.resetCalendar = function() {
  if (this.day != this.dateObject.getDate()) this.day = this.dateObject.getDate();
  div_Calendar.innerHTML = "";
  this.yearInput.value = this.year;
  this.monthInput.value = this.month;
  var tmpDate = new Date(this.year, (this.month) - 1);
  this.currDay = tmpDate.getDay();
  if (this.currDay == 0) {
    this.currDay = 7;
  }
  if (isRunNian(this.year)) {
    MONTH_DAY_COUNT[1] = 29;
  } else {
    MONTH_DAY_COUNT[1] = 28;
  }
  var day = 0;
  if (this.hiddenDayBar) {
    this.realHeight = 90;
    this.Div_gen.style.height = this.realHeight + "px";
  } else {
    var dayLine = 0;
    if (((MONTH_DAY_COUNT[(this.month) - 1]) == 31 && tmpDate.getDay() >= 5) || ((MONTH_DAY_COUNT[(this.month) - 1]) == 30 && tmpDate.getDay() >= 6)) {
      dayLine = 6;
    } else if (((MONTH_DAY_COUNT[(this.month) - 1]) == 28 && tmpDate.getDay() == 0)) {
      dayLine = 4;
    } else {
      dayLine = 5;
    }
    if (this.showTimeBar == true) {
      this.realHeight = this.opBar.offsetHeight + this.weekBar.offsetHeight + dayLine * 31 + (this.timeBar ? this.timeBar.offsetHeight : 0);
      this.Div_gen.style.height = this.realHeight + "px";
    } else {
      this.realHeight = this.opBar.offsetHeight + this.weekBar.offsetHeight + dayLine * 31;
    }
  }
  if (this.timeBar) this.timeBar.style.top = (this.Div_gen.offsetHeight - 75) + "px";
  var oThis = this;
  for (s = 0; s < 6; s++) {
    for (j = 0; j < 7; j++) {
      day = 7 * s + j - this.currDay + 1;
      var dayCell = $ce("DIV");
      dayCell.id = "dayCell";
      dayCell.className = "calendar_day_cell";
      dayCell.style.left = (j * 30) + "px";
      if (7 - this.currDay > 0) {
        dayCell.style.top = (s * 24) + "px";
      } else {
        dayCell.style.top = ((s - 1) * 24) + "px";
      }
      if (isWeekEnd(j)) {
        dayCell.className = dayCell.className + " calendar_rest_day_cell";
      }
      if (day > 0 && (day <= MONTH_DAY_COUNT[(this.month) - 1])) {
        div_Calendar.appendChild(dayCell);
        dayCell.appendChild(document.createTextNode(day));
        dayCell.onclick = function(e) {
          e = EventUtil.getEvent();
          if (oThis.isState) {
            if (oThis.oldDayCell) {
              oThis.oldDayCell.style.color = oThis.oldDayCellColor;
            }
            oThis.oldDayCell = this.firstChild.parentNode;
            oThis.oldDayCellColor = this.firstChild.parentNode.style.color;
            this.firstChild.parentNode.style.color = "yellow";
          }
          if (oThis.showTimeBar) {
            oThis.currentDayCell.className = oThis.currentDayCell.className.replace(" calendar_current_day_cell", "");
            oThis.currentDayCell = this;
            oThis.currentDayCell.className = oThis.currentDayCell.className + " calendar_current_day_cell";
            oThis.day = this.firstChild.nodeValue;
            if (typeof calendarChange != "undefined") {
              calendarChange.call(this, oThis);
            }
          } else {
            oThis.onClick(this.firstChild.nodeValue);
          }
          stopAll(e);
          clearEventSimply(e);
        };
      }
      if (this.dateObject == null) this.dateObject = currDate;
      if ((day == (this.dateObject.getDate())) && (this.month == (this.dateObject.getMonth() + 1)) && (this.year == (this.dateObject.getFullYear()))) {
        dayCell.className = dayCell.className + " calendar_current_day_cell";
        this.currentDayCell = dayCell;
      }
    }
    if (day >= MONTH_DAY_COUNT[(this.month) - 1]) {
      break;
    }
  }
  if (this.parentComp) {
    var top = (compOffsetTop(this.parentComp.Div_gen) - compScrollTop(this.parentComp.Div_gen) + this.parentComp.Div_gen.offsetHeight);
  } else {
    var top = this.Div_gen.offsetTop;
  }
  if (top > 0) {
    if (top + this.realHeight > document.body.clientHeight) {
      if ((top - 20) > this.realHeight) {
        top = top - 20 - this.realHeight;
      } else {
        top = document.body.clientHeight - this.realHeight;
      }
    }
    this.Div_gen.style.top = top + "px";
  }
  var left = this.Div_gen.offsetLeft;
  if (left > 0) {
    if (left + this.Div_gen.offsetWidth > document.body.clientWidth) {
      left = document.body.clientWidth - this.Div_gen.offsetWidth;
    }
    this.Div_gen.style.left = left + "px";
  }
  this.Div_gen.style.height = this.realHeight + "px";
};

function isRunNian(year) {
  return (((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) ? true : false);
};

function isWeekEnd(day) {
  return (((day == 0) || (day == 6)) ? true : false);
};

DateTextComp.prototype = new TextComp;
DateTextComp.prototype.componentType = "DATETEXT";
DateTextComp.CALANDER_HEIGHT = 298;
DateTextComp.CALANDER_WIDTH = 235;
DateTextComp.prototype.imageWidth = 15;
DateTextComp.prototype.imageHeight = 16;
DateTextComp.refImgNMPath = window.themePath + '/ui/ctrl/text/images/date_nm.png';
DateTextComp.refImgONPath = window.themePath + "/ui/ctrl/text/images/date_on.png";
DateTextComp.refImgDisablePath = window.themePath + "/ui/ctrl/text/images/date_disable.png";

function DateTextComp(parent, name, left, top, width, position, attrArr, className) {
  if (attrArr && attrArr.value && attrArr.value.indexOf("/") == -1 && attrArr.value.indexOf("-")) {
    var value = parseInt(attrArr.value);
    if (value == attrArr.value) {
      var date = new Date();
      date.setTime(value);
      attrArr.value = this.dateFormat(date);
    }
  }
  this.showTimeBar = false;
  this.hiddenDayBar = false;
  this.editMin = true;
  this.editSec = true;
  if (attrArr) {
    this.showTimeBar = getBoolean(attrArr.showTimeBar, false);
    this.editMin = getBoolean(attrArr.editMin, true);
    this.editSec = getBoolean(attrArr.editSec, true);
  }
  if (!this.editMin) this.editSec = false;
  this.base = TextComp;
  this.base(parent, name, left, top, width, "D", position, attrArr, className);
};
DateTextComp.prototype.manageSelf = function() {
  TextComp.prototype.manageSelf.call(this);
  var oThis = this;
  this.input.style.position = "relative";
  this.input.style[ATTRFLOAT] = "left";
  this.divButton = $ce("DIV");
  this.divButton.id = this.id + "$date_sel_button";
  this.divButton.style.position = "absolute";
  this.divButton.style.cursor = "pointer";
  this.divButton.style.width = this.imageWidth + "px";
  this.divButton.style.height = this.imageHeight + "px";
  this.divButton.style.right = "0px";
  var divButtonTop = (this.Div_text.offsetHeight - this.imageHeight) / 2;
  if (divButtonTop < 0) {
    divButtonTop = 0;
  }
  this.divButton.style.top = divButtonTop + "px";
  this.refImg = $ce("IMG");
  this.refImg.src = DateTextComp.refImgNMPath;
  this.refImg.style.height = this.imageHeight + "px";
  this.refImg.style.width = this.imageWidth + "px";
  this.divButton.appendChild(this.refImg);
  if (this.Div_text.children.length == 3) {
    this.Div_text.children[1].appendChild(this.divButton);
  } else {
    this.Div_text.appendChild(this.divButton);
  }
  this.input.onblur = function(e) {
    e = EventUtil.getEvent();
    oThis.focused = false;
    if (this.readOnly) return;
    if (oThis.Div_text.children.length == 3) {
      var children = oThis.Div_text.children;
      for (var i = 0; i < children.length; i++) {
        if (children[i]) {
          children[i].className = children[i].className.replaceStr('input_highlight', 'input_normal');
        }
      }
      oThis.input.className = oThis.input.className.replaceStr('input_highlight_center_bg', 'input_normal_center_bg');
    }
    oThis.blur(e);
    clearEventSimply(e);
  };
  this.divButton.onmouseover = function(e) {
    oThis.refImg.src = DateTextComp.refImgONPath;
  };
  this.divButton.onmouseout = function(e) {
    oThis.refImg.src = DateTextComp.refImgNMPath;
  };
  this.divButton.onclick = function(e) {
    e = EventUtil.getEvent();
    e.calendar = true;
    var event = e;
    if (this.stopHideDiv != true) {
      window.clickHolders.trigger = oThis;
      document.onclick();
    }
    oThis.openCalendar(e);
    stopEvent(e);
    clearEventSimply(e);
  };
  if (this.disabled) {
    this.disabled = false;
    this.setActive(false);
  }
  if (this.value) this.setValue(this.value);
};
DateTextComp.prototype.setShowTimeBar = function(showTimeBar) {
  this.showTimeBar = showTimeBar;
};
DateTextComp.prototype.setHiddenDayBar = function(hiddenDayBar) {
  this.hiddenDayBar = hiddenDayBar;
};
DateTextComp.prototype.processEnter = function() {
  var inputValue = this.input.value.trim();
  if (inputValue == "") {
    inputValue = this.getFormater().formatDateToString();
  }
  if (this.hiddenDayBar) {
    inputValue = this.getFormater().formatYearAndMonth(inputValue);
  } else {
    inputValue = this.getFormater().formatInputValueToDateString(inputValue);
  }
  if (!this.editMin) {
    var i = inputValue.indexOf(":");
    inputValue = inputValue.substr(0, i + 1) + "00:00";
  }
  if (!this.editSec) {
    var i = inputValue.indexOf(":");
    var j = inputValue.indexOf(":", i + 1);
    inputValue = inputValue.substr(0, j + 1) + "00";
  }
  if (this.newValue == "" || this.newValue == null || this.newValue != inputValue) {
    this.newValue = inputValue;
  }
  this.verify();
  this.setMessage(this.newValue);
  if (this.newValue != this.oldValue) {
    this.valueChanged(this.oldValue, this.newValue);
  }
};
DateTextComp.prototype.createDefaultFormater = function() {
  var dateFormater = new DateFormater();
  dateFormater.showTimeBar = this.showTimeBar;
  return dateFormater;
};
DateTextComp.prototype.blur = function() {
  if (this.visible == true) {
    var isNeedVerify = true;
    var inputValue = this.input.value.trim();
    var maskerType = this.showTimeBar ? "DateTimeText" : this.componentType;
    var masker = getMasker(maskerType);
    if (masker != null) {
      if (masker.format(inputValue).value != this.showValue) {
        if (inputValue == "") {
          isNeedVerify = false;
        }
        if (this.hiddenDayBar) {
          inputValue = this.getFormater().formatYearAndMonth(inputValue);
        } else {
          inputValue = this.getFormater().formatInputValueToDateString(inputValue);
        }
        if (!this.editMin) {
          var i = inputValue.indexOf(":");
          inputValue = inputValue.substr(0, i + 1) + "00:00";
        }
        if (!this.editSec) {
          var i = inputValue.indexOf(":");
          var j = inputValue.indexOf(":", i + 1);
          inputValue = inputValue.substr(0, j + 1) + "00";
        }
        if (this.newValue == "" || this.newValue == null || this.newValue != inputValue) {
          this.newValue = inputValue;
        }
        if (isNeedVerify) {
          this.verify();
        }
        this.setMessage(this.newValue);
        if (this.newValue != this.oldValue) {
          this.valueChanged(this.oldValue, this.newValue);
        }
      }
      this.input.value = this.showValue;
    }
    this.onblur();
  }
};
DateTextComp.prototype.getUtcValue = function() {
  var date = this.newValue;
  if (date.indexOf("-") > -1) date = date.replace(/\-/g, "/");
  var utcValue = Date.parse(date);
  if (isNaN(utcValue)) return "";
  return utcValue.toString();
};
DateTextComp.prototype.dateFormat = function(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  if (parseInt(month) < 10) month = "0" + month;
  var day = date.getDate();
  if (parseInt(day) < 10) day = "0" + day;
  var hours = date.getHours();
  if (parseInt(hours) < 10) hours = "0" + hours;
  var minutes = date.getMinutes();
  if (parseInt(minutes) < 10) minutes = "0" + minutes;
  var seconds = date.getSeconds();
  if (parseInt(seconds) < 10) seconds = "0" + seconds;
  var formatString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  return formatString;
};
DateTextComp.prototype.verify = function() {
  if (this.newValue == "") {
    showVerifyMessage(this, trans("ml_dateisinvalid"));
    return false;
  }
  return true;
};
DateTextComp.prototype.openCalendar = function(e) {
  var oThis = this;
  var left = 0;
  if (document.body.clientWidth < e.clientX + 100) left = e.clientX - 200 - 10;
  else left = e.clientX - 100 - 10;
  if (left < 0) left = 0;
  if (!this.calendar) {
    this.calendar = new CalendarComp(false, this);
  }
  this.calendar.compId = this.id;
  this.calendar.parentComp = this;
  if (this.calendar.Div_gen.style.zIndex < STANDARD_ZINDEX) {
    this.calendar.Div_gen.style.zIndex = getZIndex();
  }
  this.calendar.onclick = function(date) {
    oThis.setFocus();
    oThis.oldValue = oThis.getValue();
    oThis.setValue(date);
    oThis.setMessage(date);
    oThis.valueChanged(oThis.oldValue, oThis.newValue);
  };
  var top = compOffsetTop(this.input) + this.Div_gen.offsetHeight;
  var dateValue = this.getValue().trim();
  this.calendar.Div_gen.style.height = "0px";
  this.calendar.show(left, top, this.showTimeBar, dateValue, this.hiddenDayBar, {
    editMin: this.editMin,
    editSec: this.editSec
  });
};
DateTextComp.prototype.hideV = function() {
  this.Div_gen.style.visibility = "hidden";
  this.visible = false;
  if (this.calendar != null) this.calendar.hide();
};
DateTextComp.prototype.showV = function() {
  var obj = this.getObjHtml();
  obj.style.visibility = "";
  this.visible = true;
  var offHgt = this.Div_text.offsetHeight;
  if (offHgt > 0 && (offHgt - this.refImg.height) > 0) {}
  if (this.Div_text.children.length == 3) {
    if (this.Div_text.children[1].offsetHeight > 0 && this.refImg.height > 0 && (this.Div_text.children[1].offsetHeight - this.refImg.height) > 0) {}
  }
};
DateTextComp.prototype.setValue = function(text) {
  var tempText = text;
  if (this.hiddenDayBar) {
    tempText = this.getFormater().formatYearAndMonth(tempText);
  } else {
    tempText = this.getFormater().formatInputValueToDateString(tempText);
  }
  TextComp.prototype.setValue.call(this, tempText);
  this.notifyChange(NotifyType.VALUE, this.getUtcValue());
};
DateTextComp.prototype.setMessage = function(message) {
  if (!this.isError) {
    this.maskValue();
    this.message = this.showValue;
    this.errorMessage = "";
    this.setTitle(this.message);
  }
};
DateTextComp.prototype.maskValue = function() {
  if (!this.hiddenDayBar) {
    var maskerType = this.showTimeBar ? "DateTimeText" : this.componentType;
    var masker = getMasker(maskerType);
    if (this.newValue != null && this.newValue.indexOf('$') == 0) masker = null;
    if (masker != null) this.showValue = toColorfulString(masker.format(this.newValue));
    else this.showValue = this.newValue;
  } else {
    this.showValue = this.newValue;
  }
};
DateTextComp.prototype.postProcessNewValue = function(value) {
  if (this.showTimeBar) {
    return value;
  } else {
    return value.substring(0, 10);
  }
};
DateTextComp.prototype.setBounds = function(left, top, width, height) {
  this.left = left;
  this.top = top;
  this.width = getString(convertWidth(width), this.Div_gen.offsetWidth + "px");
  this.height = getString(convertHeight(height), this.Div_gen.offsetHeight + "px");
  this.Div_gen.style.left = this.left + "px";
  this.Div_gen.style.top = this.top + "px";
  this.Div_gen.style.width = this.width;
  this.Div_gen.style.height = this.height;
  var tempWidth = 0;
  if (isPercent(this.width)) tempWidth = this.Div_gen.offsetWidth;
  else tempWidth = getInteger(parseInt(this.width), 120);
  this.Div_text.style.width = tempWidth - 4 + "px";
  if (this.hasLabel) this.Div_text.style.width = tempWidth - this.labelWidth - 10 + "px";
  var pixelHeight = this.Div_text.offsetHeight;
  var pixelWidth = this.Div_text.offsetWidth;
  this.input.style.width = pixelWidth - this.imageWidth + "px";
  if (this.Div_text.children.length == 3) {
    var centerWidth = pixelWidth - 3 * 2;
    this.Div_text.children[1].style.width = centerWidth + "px";
    var imgWidth = (this.Div_text.children[1].children.length - 1) * this.imageWidth;
    var inputWidth = centerWidth - imgWidth;
    if (IS_IE) {
      inputWidth -= 3;
    }
    this.input.style.width = inputWidth + "px";
  }
};
DateTextComp.prototype.setActive = function(isActive) {
  var isActive = getBoolean(isActive, false);
  if (this.disabled == false && isActive == false) {
    TextComp.prototype.setActive.call(this, false);
    this.divButtonClickFunc = this.divButton.onclick;
    this.divButtonMouseOutFuc = this.divButton.onmouseout;
    this.divButtonMouseOverFuc = this.divButton.onmouseover;
    this.divButton.onclick = null;
    this.divButton.onmouseout = null;
    this.divButton.onmouseover = null;
    this.divButton.style.cursor = "default";
    this.refImg.src = DateTextComp.refImgDisablePath;
    this.divButton.style.visibility = "hidden";
  } else if (this.disabled == true && isActive == true) {
    TextComp.prototype.setActive.call(this, true);
    this.divButton.onclick = this.divButtonClickFunc;
    this.divButton.onmouseout = this.divButtonMouseOutFuc;
    this.divButton.onmouseover = this.divButtonMouseOverFuc;
    this.divButton.style.cursor = "pointer";
    this.refImg.src = DateTextComp.refImgNMPath;
    this.divButton.style.visibility = "";
  }
};
DateTextComp.prototype.setReadOnly = function(readOnly) {
  this.input.readOnly = readOnly;
  this.readOnly = readOnly;
  if (readOnly) {
    TextComp.prototype.setReadOnly.call(this, true);
    this.divButton.style.visibility = "hidden";
  } else {
    TextComp.prototype.setReadOnly.call(this, false);
    this.divButton.style.visibility = "";
  }
};
DateTextComp.prototype.isActive = function() {
  return !this.disabled;
};
DateTextComp.prototype.setTitle = function(title) {
  if (title != null && title != "") {
    if (this.input != null) {
      this.input.title = title;
    }
    if (this.Div_gen != null) this.Div_gen.title = title;
  } else if (title == "") {
    if (this.input != null) {
      this.input.title = "";
      this.input.value = "";
    }
    if (this.Div_gen != null) this.Div_gen.title = "";
  }
};

ReferenceTextComp.prototype = new TextComp;
ReferenceTextComp.prototype.componentType = "REFERENCETEXT";
ReferenceTextComp.DIALOG_INDEX = 0;
ReferenceTextComp.prototype.imageWidth = 17;
ReferenceTextComp.prototype.imageHeight = 17;
ReferenceTextComp.DEFAULT = 0;
ReferenceTextComp.TREE = 1;
ReferenceTextComp.GRID = 0;
ReferenceTextComp.GRIDTREE = 2;
ReferenceTextComp.TREETREE = 3;
ReferenceTextComp.REF_NM_IMG = window.themePath + "/ui/ctrl/text/images/ref_nm.png";
ReferenceTextComp.REF_ON_IMG = window.themePath + "/ui/ctrl/text/images/ref_on.png";
ReferenceTextComp.REF_DIS_IMG = window.themePath + "/ui/ctrl/text/images/ref_disable.png";
ReferenceTextComp.VIEW_URL_IMP = window.themePath + "/ui/ctrl/message/images/close_normal.png";
ReferenceTextComp.VIEW_URL_IMP_HIGHlIGHT = window.themePath + "/ui/ctrl/message/images/close_highlight.png";
ReferenceTextComp.ITEM_HEIGHT = 14;
ReferenceTextComp.defaultVisibleOptionsNum = 10;
window.PAGEWIDTH = 1500;
window.PAGEHEIGHT = 1500;

function ReferenceTextComp(parent, name, left, top, width, position, attrArr, nodeInfo, className) {
  this.refCodeName = null;
  this.refType = ReferenceTextComp.DEFAULT;
  this.isShowLine = true;
  if (attrArr) {
    this.isShowLine = getBoolean(attrArr.isShowLine, this.isShowLine);
    if (attrArr.refFormId) this.refFormId = attrArr.refFormId;
    if (attrArr.refFormeleID) this.refFormeleID = attrArr.refFormeleID;
    if (attrArr.viewURL) this.viewURL = attrArr.viewURL;
  }
  if (attrArr && attrArr.refType) {
    this.refType = getInteger(attrArr.refType, this.refType);
  } else {
    if (nodeInfo) this.refType = getInteger(nodeInfo.refType, this.refType);
  }
  this.showValue = null;
  this.trueValue = null;
  this.nodeInfo = nodeInfo;
  if (this.nodeInfo != null) nodeInfo.bindReference(this);
  if (!attrArr) {
    attrArr = {};
  }
  var showSelResultWidth = 0;
  var showSelResultHeight = 0;
  if (this.nodeInfo && this.nodeInfo.showSelResult) {
    showSelResultWidth = 400;
  }
  TextComp.call(this, parent, name, left, top, width, "R", position, attrArr, className);
  this.isDialog = true;
  this.refIndex = "ref_" + (ReferenceTextComp.DIALOG_INDEX++);
  this.refresh = false;
  this.dialogWidth = 800;
  this.divWidth = 600;
  this.dialogHeight = 460;
  this.divHeight = 460;
  if (this.refType == ReferenceTextComp.TREE) {
    this.dialogWidth = 40 + 310;
    this.divWidth = 40 + 310;
    this.dialogHeight = 48 + 412 + 45;
    this.divHeight = 48 + 412 + 45;
  } else if (this.refType == ReferenceTextComp.GRID) {
    this.dialogWidth = 800 + showSelResultWidth;
    this.divWidth = 40 + 618;
    this.dialogHeight = 48 + 422 + 45 + showSelResultHeight;
    this.divHeight = 48 + 422 + 45;
  } else if (this.refType == ReferenceTextComp.GRIDTREE) {
    this.dialogWidth = 40 + 240 + 525 + showSelResultWidth;
    this.divWidth = 40 + 240 + 525;
    this.dialogHeight = 48 + 422 + 45 + showSelResultHeight;
    this.divHeight = 48 + 422 + 45;
  } else if (this.refType == ReferenceTextComp.TREETREE) {
    this.dialogWidth = 40 + 240 + 240 + 80 + 4;
    this.divWidth = 40 + 240 + 240 + 80 + 4;
    this.dialogHeight = 48 + 400 + 20 + 45;
    this.divHeight = 48 + 400 + 20 + 45;
  }
  if (this.dialogWidth >= window.PAGEWIDTH) this.dialogWidth = window.PAGEWIDTH - 100;
  if (this.dialogHeight >= window.PAGEHEIGHT) this.dialogHeight = window.PAGEHEIGHT - 100;
  if (this.nodeInfo != null) {
    if (nodeInfo.dialogHeight) this.dialogHeight = nodeInfo.dialogHeight;
    if (nodeInfo.dialogWidth) this.dialogWidth = nodeInfo.dialogWidth;
  }
  this.refreshRefPage = false;
  if (this.nodeInfo != null && this.nodeInfo.refreshRefPage) {
    this.refreshRefPage = getBoolean(this.nodeInfo.refreshRefPage, false);
  }
  this.inputType = null;
  this.datasetId = null;
  this.field = null;
  window.clickHolders.push(this);
};
ReferenceTextComp.prototype.manageSelf = function() {
  var oThis = this;
  TextComp.prototype.manageSelf.call(this);
  oThis.Div_gen.onmouseover = function(e) {
    if (getString(oThis.viewURL, "") != "" && getString(oThis.viewURL, "") != "null") {
      var value = oThis.getPkValue();
      if (getString(value, "") != "") {
        oThis.showTimeoutFunc = setTimeout(function() {
          oThis.showViewURL();
        }, 500);
      }
    }
  };
  oThis.Div_gen.onmouseout = function(e) {
    if (getString(oThis.viewURL, "") != "" && getString(oThis.viewURL, "") != "null") {
      if (oThis.showTimeoutFunc) {
        clearTimeout(oThis.showTimeoutFunc);
      }
    }
  };
  this.input.style.position = "relative";
  this.input.style[ATTRFLOAT] = "left";
  this.divButton = $ce("DIV");
  this.divButton.id = this.id + "_ref_sel_button";
  this.divButton.style.position = "absolute";
  this.divButton.style.cursor = "pointer";
  this.divButton.style.width = this.imageWidth + "px";
  this.divButton.style.height = this.imageHeight + "px";
  this.divButton.style.right = "0px";
  var divButtonTop = (this.Div_text.offsetHeight - this.imageHeight) / 2;
  if (divButtonTop < 0) {
    divButtonTop = 0;
  }
  this.divButton.style.top = divButtonTop + "px";
  this.refImg = $ce("IMG");
  this.refImg.src = ReferenceTextComp.REF_NM_IMG;
  this.refImg.style.height = this.imageHeight + "px";
  this.refImg.style.width = this.imageWidth + "px";
  this.divButton.appendChild(this.refImg);
  this.refImg.onmouseover = function(e) {
    oThis.imgover = true;
  };
  this.refImg.onmouseout = function(e) {
    oThis.imgover = false;
  };
  if (this.Div_text.children.length == 3) {
    this.Div_text.children[1].appendChild(this.divButton);
  } else {
    this.Div_text.appendChild(this.divButton);
  }
  this.divButton.onclick = function(e) {
    e = EventUtil.getEvent();
    e.triggerObj = oThis;
    oThis.isFromDiv = true;
    if (oThis.onclick() != false) {
      oThis.needRef = true;
      var pageWidth = document.body.offsetWidth;
      var pageHeight = document.body.offsetHeight;
      if (oThis.isDialog != false || oThis.divWidth > pageWidth || oThis.divHeight > pageHeight) {
        oThis.focus(e);
        oThis.input.onblur(e);
        oThis.openRefDialog(e, true);
      } else {
        if (oThis.divIsShown) oThis.hideRefDiv();
        else oThis.openRefDiv(e);
      }
    }
    if (this.stopHideDiv != true) {
      window.clickHolders.trigger = oThis;
      document.onclick();
    }
    stopAll(e);
    e.triggerObj = null;
    clearEventSimply(e);
  };
  this.divButton.onmouseover = function(e) {
    if (!this.disabled) oThis.refImg.src = ReferenceTextComp.REF_ON_IMG;
  };
  this.divButton.onmouseout = function(e) {
    if (!this.disabled) oThis.refImg.src = ReferenceTextComp.REF_NM_IMG;
  };
  this.input.onfocus = function(e) {
    e = EventUtil.getEvent();
    oThis.warnIcon.style.display = "none";
    if (oThis.isError && typeof(oThis.errorMessage) == 'string' && oThis.errorMessage != '') {
      oThis.errorCenterDiv.innerHTML = oThis.errorMessage;
      oThis.errorMsgDiv.style.display = "block";
    }
    if (this.readOnly) return;
    if (oThis.isFromDiv != true) {
      oThis.oldValue = oThis.getValue();
    } else {
      oThis.oldValue = null;
    }
    oThis.isFromDiv = false;
    if (oThis.trueValue != null) {
      oThis.setValue(oThis.trueValue);
    }
    var cnodes = oThis.Div_text.childNodes;
    if (cnodes.length == 3) {
      for (var i = 0; i < cnodes.length; i++) {
        cnodes[i].className = cnodes[i].className.replaceStr('input_normal', 'input_highlight');
      }
      oThis.input.className = oThis.input.className.replaceStr('input_normal_center_bg', 'input_highlight_center_bg');
    }
    oThis.focus(e);
    oThis.needRef = true;
    oThis.hideTip();
    clearEventSimply(e);
  };
  this.input.onblur = function(e) {
    if (this.readOnly) return;
    e = EventUtil.getEvent();
    if (oThis.imgover) {
      oThis.imgover = false;
      return;
    }
    if (oThis.Div_text.children.length == 3) {
      var children = oThis.Div_text.children;
      for (var i = 0; i < children.length; i++) {
        if (typeof(children[i]) != "undefined") {
          children[i].className = children[i].className.replaceStr('input_highlight', 'input_normal');
        }
      }
      oThis.input.className = oThis.input.className.replaceStr('input_highlight_center_bg', 'input_normal_center_bg');
    }
    oThis.blur(e);
    oThis.needRef = false;
    oThis.showTip();
    clearEventSimply(e);
  };
  this.input.onclick = function(e) {
    window.clickHolders.trigger = oThis;
    document.onclick();
    e = EventUtil.getEvent();
    stopEvent(e);
    clearEventSimply(e);
  };
  if (this.disabled) {
    this.disabled = false;
    this.setActive(false);
  }
  var keyUpListener = new Listener("onKeyUp");
  keyUpListener.func = function(e) {
    e = e.event;
    if ((e.keyCode == 9 && e.shiftKey) || e.keyCode == 9) {
      if (oThis.divIsShown == true) {
        oThis.hideRefDiv();
      }
    } else if (e.keyCode == 40) {
      oThis.focusSearchResult(1);
      if (oThis.refGridId != null && oThis.divIsShown == true) {
        e.stopEvent = true;
        var e = EventUtil.getEvent();
        stopAll(e);
        clearEventSimply(e);
      }
    } else if (e.keyCode == 38) {
      oThis.focusSearchResult(-1);
      if (oThis.refGridId != null && oThis.divIsShown == true) {
        e.stopEvent = true;
        var e = EventUtil.getEvent();
        stopAll(e);
        clearEventSimply(e);
      }
    } else if (e.keyCode != 13) {
      var value = oThis.input.value;
      if (!(e.keyCode == 32 && e.ctrlKey) && e.keyCode != 20 && e.keyCode != 16 && e.keyCode != 17 && e.keyCode != 18 && e.keyCode != 33 && e.keyCode != 34 && e.keyCode != 91) {
        if (oThis.showRefDivTimeOut != null) clearTimeout(oThis.showRefDivTimeOut);
        oThis.needRef = true;
        oThis.showRefDivTimeOut = setTimeout("ReferenceTextComp.showRefDivAndDoFilter('" + oThis.id + "','" + value + "');", 1000);
      }
    } else if (e.keyCode == 113) {
      oThis.openRefDialog(e, oThis.refreshRefPage || oThis.refresh);
    } else if (e.keyCode == 13) {
      if (oThis.refGridId != null && oThis.divIsShown == true) {
        var selIndex = oThis.comboCenterDiv.selIndex;
        var node = oThis.comboCenterDiv.childNodes[selIndex];
        if (node != null) {
          ReferenceTextComp.searchClick.call(node);
        }
        oThis.hideRefDiv();
        e.stopEvent = true;
        var e = EventUtil.getEvent();
        stopAll(e);
        clearEventSimply(e);
      }
    }
    if (oThis.divIsShown == true) {
      e.stopEvent = true;
    }
  };
  this.addListener(keyUpListener);
  var keyEnterListener = new Listener("onEnter");
  keyEnterListener.func = function(e) {
    if (oThis.divIsShown == true) {
      var selIndex = oThis.comboCenterDiv.selIndex;
      var node = oThis.comboCenterDiv.childNodes[selIndex];
      if (node != null) {
        ReferenceTextComp.searchClick.call(node);
      }
      oThis.hideRefDiv();
      oThis.input.value = value;
      e.stopEvent = true;
    }
  };
  this.addListener(keyEnterListener);
  var blurListener = new Listener("onBlur");
  blurListener.func = function(e) {
    if (this.isFromDiv) return;
    var value = oThis.input.value;
    oThis.doBlurSearch(value);
  };
  this.addListener(blurListener);
  if (this.nodeInfo && this.nodeInfo.isRead) {
    this.setSelectOnly(true);
  }
};
ReferenceTextComp.prototype.setReadOnly = function(readOnly) {
  this.input.readOnly = readOnly;
  this.readOnly = readOnly;
  if (readOnly) {
    TextComp.prototype.setReadOnly.call(this, true);
    this.divButton.style.visibility = "hidden";
  } else {
    TextComp.prototype.setReadOnly.call(this, false);
    this.divButton.style.visibility = "";
  }
  this.notifyChange(NotifyType.READONLY, this.readOnly);
};
ReferenceTextComp.prototype.setSelectOnly = function(selectOnly) {
  this.selectOnly = getBoolean(selectOnly, false);
  this.input.readOnly = this.selectOnly;
  if (this.disabled || this.readOnly) {
    this.Div_text.className = this.className;
    this.input.className = this.inputClassName_init;
    if (this.Div_text.children.length == 3) {
      var children = this.Div_text.children;
      for (var i = 0; i < children.length; i++) {
        if (typeof(children[i]) != "undefined") {
          if (this.disabled) children[i].className = children[i].className.replaceStr('input_disable', 'input_normal');
          if (this.readOnly) children[i].className = children[i].className.replaceStr('input_readonly', 'input_normal');
        }
      }
    }
    this.divButton.style.visibility = "";
  }
  this.notifyChange(NotifyType.SELECTONLY, this.selectOnly);
};
ReferenceTextComp.prototype.blur = function(e) {
  if (this.visible == true) {
    var value = this.input.value;
    if (this.dataType != 'P') {
      if (this.showTipMessage && this.showTipMessage != null) this.setMessage(this.showTipMessage);
      else this.setMessage(value);
    }
    this.newValue = this.getFormater().format(value);
    var verifyR = this.verify(value);
    if (verifyR == null || verifyR) {
      if (this.newValue != this.oldValue || this.newValue == "") {
        this.valueChanged(this.oldValue, this.newValue, NotifyType.SHOWVALUE);
        this.onblur(e);
      }
    }
  }
};
ReferenceTextComp.prototype.doBlurSearch = function(value) {
  if (this.doBlurSearchFromCache(value) != true) {
    var rts = this.doMatchRefPkService(value);
  }
};
ReferenceTextComp.prototype.doMatchRefPkService = function(value) {
  var proxy = new ServerProxy(null, null, false);
  if (this.nodeInfo && this.nodeInfo.dataListener && this.nodeInfo.dataListener != null) proxy.addParam("clc", this.nodeInfo.dataListener);
  else proxy.addParam("clc", "nc.uap.lfw.reference.app.AppReferenceController");
  proxy.addParam("m_n", "matchRefPk");
  proxy.addParam("matchValue", value);
  proxy.addParam("widgetId", this.widget.id);
  proxy.addParam("refNodeId", this.nodeInfo.id);
  proxy.addParam("widget_id", this.widget.id);
  proxy.addParam("referenceTextId", this.id);
  proxy.addParam('el', '2');
  proxy.addParam("datasetId", this.datasetId);
  var ds = this.widget.getDataset(this.datasetId);
  if (ds) {
    var selectIndex = ds.getFocusRowIndex();
    proxy.addParam("selectIndex", selectIndex);
    var dsRule = new DatasetRule(this.datasetId, 'ds_all_line');
    var viewRule = new WidgetRule(this.widget.id);
    viewRule.addDsRule(this.datasetId, dsRule);
    var submitRule = new SubmitRule();
    submitRule.addWidgetRule(this.widget.id, viewRule);
    proxy.setSubmitRule(submitRule);
  }
  proxy.execute();
};

function doSearchFun(result, args, success, rt) {
  var searchValues = getSessionAttribute('matchsValues');
  if (searchValues != null) rt = searchValues.split(";");
  if (searchValues == "") rt = new Array();
}
ReferenceTextComp.prototype.clearValue = function() {
  var ds = this.widget.getDataset(this.datasetId);
  var index = ds.nameToIndex(this.field);
  var rowIndex = ds.getSelectedIndex();
  ds.setValueAt(rowIndex, index - 1, "");
  ds.setValueAt(rowIndex, index, "");
  this.setValue("");
  this.setRefresh(true);
};
ReferenceTextComp.prototype.doBlurSearchFromCache = function(value) {
  return false;
};
ReferenceTextComp.showRefDivAndDoFilter = function(id, value) {
  var refComp = window.objects[id];
  if (refComp != null) {
    if (refComp.nodeInfo && refComp.nodeInfo.multiSel) return;
    if (!refComp.needRef) return;
    ReferenceTextComp.doOpenRefDiv(refComp, value);
  }
};
ReferenceTextComp.doOpenRefDiv = function(refComp, value) {
  refComp.openRefDiv(value);
  if (this.stopHideDiv != true) {
    window.clickHolders.trigger = refComp;
    document.onclick();
  }
};
ReferenceTextComp.doFilter = function(value, frameId, doIt) {
  if (doIt == true) {
    if (ReferenceTextComp.waitFilterRt != null) clearTimeout(ReferenceTextComp.waitFilterRt);
    if (window[frameId] == null || window[frameId].contentWindow == null || window[frameId].contentWindow.renderDone == null) {
      ReferenceTextComp.waitFilterRt = setTimeout("ReferenceTextComp.doFilter('" + value + "','" + frameId + "'," + doIt + ");", 50);
      return;
    }
    window[frameId].contentWindow.doFilter(value);
  }
};
ReferenceTextComp.prototype.showV = function() {
  var obj = this.getObjHtml();
  obj.style.visibility = "";
  this.visible = true;
  var offHgt = this.Div_text.offsetHeight;
  if (offHgt > 0 && (offHgt - this.refImg.height) > 0) {}
  if (this.Div_text.children.length == 3) {
    if (this.Div_text.children[1].offsetHeight > 0 && this.refImg.height > 0 && (this.Div_text.children[1].offsetHeight - this.refImg.height) > 0) {}
  }
  this.notifyChange(NotifyType.VISIBLE, this.visible);
};
ReferenceTextComp.prototype.setBounds = function(left, top, width, height) {
  this.left = left;
  this.top = top;
  this.width = getString(convertWidth(width), this.Div_gen.offsetWidth + "px");
  this.height = getString(convertHeight(height), this.Div_gen.offsetHeight + "px");
  this.Div_gen.style.left = this.left + "px";
  this.Div_gen.style.top = this.top + "px";
  this.Div_gen.style.width = this.width;
  this.Div_gen.style.height = this.height;
  var tempWidth = 0;
  if (isPercent(this.width)) tempWidth = this.Div_gen.offsetWidth;
  else tempWidth = getInteger(parseInt(this.width), 120);
  this.Div_text.style.width = tempWidth - 4 + "px";
  if (this.hasLabel) this.Div_text.style.width = tempWidth - this.labelWidth - 10 + "px";
  var pixelHeight = this.Div_text.offsetHeight;
  var pixelWidth = this.Div_text.offsetWidth;
  if (IS_IE8 && (pixelHeight == 0 || pixelWidth == 0)) return;
  this.input.style.width = (pixelWidth - this.imageWidth) + "px";
  if (this.Div_text.children.length == 3) {
    var centerWidth = pixelWidth - 3 * 2;
    this.Div_text.children[1].style.width = centerWidth + "px";
    var imgWidth = (this.Div_text.children[1].children.length - 1) * this.imageWidth;
    var inputWidth = centerWidth - imgWidth;
    if (IS_IE) {
      inputWidth -= 3;
    }
    this.input.style.width = (inputWidth) + "px";
  }
};
ReferenceTextComp.prototype.setDialogWidth = function(width) {
  this.dialogWidth = width;
};
ReferenceTextComp.prototype.setDialogHeight = function(height) {
  this.dialogHeight = height;
};
ReferenceTextComp.prototype.setDivWidth = function(width) {
  this.divWidth = width;
};
ReferenceTextComp.prototype.setDivHeight = function(height) {
  this.divHeight = height;
};
ReferenceTextComp.prototype.setRefresh = function(refresh) {
  this.refresh = refresh;
  this.refreshRefPage = refresh;
};
ReferenceTextComp.prototype.setFilterSql = function(filterSql) {
  this.nodeInfo.filterSql = filterSql;
  this.refresh = true;
};
ReferenceTextComp.prototype.openRefDialog = function(e, isRefreshDialog) {
  if (this.nodeInfo instanceof SelfRefNodeInfo) {
    var param = this.beforeOpenRefPage();
    if (param == false) return;
    if (typeof globalBeforeOpenRefDialog != "undefined") param = globalBeforeOpenRefDialog(this);
    if (typeof(param) == "boolean" && param == false) return;
    var appUniqueId = getAppUniqueId();
    var url = this.nodeInfo.url;
    if (url.indexOf("?") == -1) url += "?";
    else url += "&";
    var _appUniqueId = "&appUniqueId=" + appUniqueId;
    url = url + "widgetId=" + this.widget.id + "&otherPageId=" + getPageId() + "&otherPageUniqueId=" + getPageUniqueId() + "&nodeId=" + this.nodeInfo.id + "&owner=" + this.id + _appUniqueId + "&isReference=true";
    if (param != null && param != true && param.trim().length != 0)   url += "&param=" + param;
    var value = this.getPkValue();
    if (getString(value, "") != "") url += "&pk=" + value;
    if (this.nodeInfo.dialogWidth && 　this.nodeInfo.dialogWidth　 != null && this.nodeInfo.dialogWidth != "") this.dialogWidth = this.nodeInfo.dialogWidth;
    if (this.nodeInfo.dialogHeight && 　this.nodeInfo.dialogHeight　 != null && this.nodeInfo.dialogHeight != "") this.dialogHeight = this.nodeInfo.dialogHeight;
    showDialog(url, this.nodeInfo.name, this.dialogWidth, this.dialogHeight, this.refIndex, null, {
      "isShowLine": this.isShowLine
    });
  } else {
    this.getExtendsParam();
    var param = this.beforeopenParamValue;
    if (param == 'undefined' || param == null) {
      var param = this.beforeOpenRefPage();
      if (param == false) return;
    }
    if (typeof globalBeforeOpenRefDialog != "undefined") param = globalBeforeOpenRefDialog(this);
    if (param != "" && param == false) return;
    if (this.nodeInfo.id != null) window.$nowRefNodeId = this.nodeInfo.id;
    var oThis = this;
    var url = null;
    if (window.appType != null && window.appType == "true") {
      var appUniqueId = getAppUniqueId();
      var refModelClassName = "nc.uap.lfw.reference.app.AppDefaultReferencePageModel";
      if (this.nodeInfo.refModelClassName) {
        refModelClassName = this.nodeInfo.refModelClassName;
      }
      url = window.globalPath + "/app/" + window.appId + "/" + this.nodeInfo.id + "?pageId=" + encodeURIComponent(this.nodeInfo.pageMeta) + "&widgetId=" + this.widget.id + "&otherPageId=" + getPageId() + "&otherPageUniqueId=" + getPageUniqueId() + "&nodeId=" + this.nodeInfo.id + "&owner=" + this.id + "&appUniqueId=" + appUniqueId + "&isReference=true&model=" + refModelClassName;
    } 
    if (param != null && param != true && param.trim().length != 0)   url += "&param=" + param;
    var value = this.getPkValue();
    if (getString(value, "") != "") url += "&pk=" + value;
    this.refIndex = this.nodeInfo.id;
    if (this.refresh) {
      this.refresh = false;
    }
    if (isRefreshDialog) showDialog(url, this.nodeInfo.name, this.dialogWidth, this.dialogHeight, this.refIndex, null, {
      "isShowLine": this.isShowLine
    });
    else showDialog(url, this.nodeInfo.name, this.dialogWidth, this.dialogHeight, this.refIndex, null, {
      "isShowLine": this.isShowLine
    });
    var iframeId = "$modalDialogFrame" + this.refIndex;
  }
};
ReferenceTextComp.prototype.openRefDiv = function(value) {
  var rt = new Array();
  var proxy = new ServerProxy(null, null, true);
  if (this.nodeInfo && this.nodeInfo.dataListener && this.nodeInfo.dataListener != null) proxy.addParam("clc", this.nodeInfo.dataListener);
  else proxy.addParam("clc", "nc.uap.lfw.reference.app.AppReferenceController");
  proxy.addParam("m_n", "matchSearch");
  proxy.addParam("matchValue", value);
  proxy.addParam("widgetId", this.widget.id);
  proxy.addParam("widget_id", this.widget.id);
  proxy.addParam("datasetId", this.datasetId);
  proxy.addParam('el', '2');
  if (this.nodeInfo) proxy.addParam("refNodeId", this.nodeInfo.id);
  proxy.addParam("referenceTextId", this.id);
  proxy.addParam('refFormId', this.refFormId);
  proxy.addParam("refFormeleID", this.refFormeleID);
  proxy.addParam('refGridId', this.refGridId);
  proxy.addParam("refGridHeaderId", this.refGridHeaderId);
  proxy.addParam("datasetId", this.datasetId);
  proxy.execute();
};
ReferenceTextComp.prototype.fillSearchDiv = function(rt) {
  this.showDiv(rt);
};
ReferenceTextComp.prototype.setActive = function(isActive) {
  var isActive = getBoolean(isActive, false);
  if ((this.disabled == false && isActive == false) || (this.divButtonClickFunc == null && isActive == false)) {
    TextComp.prototype.setActive.call(this, false);
    this.divButtonClickFunc = this.divButton.onclick;
    this.divButtonMouseOutFuc = this.divButton.onmouseout;
    this.divButtonMouseOverFuc = this.divButton.onmouseover;
    this.divButton.style.visibility = "hidden";
    this.divButton.onclick = null;
    this.divButton.onmouseout = null;
    this.divButton.onmouseover = null;
    this.divButton.style.cursor = "default";
    this.refImg.src = ReferenceTextComp.REF_DIS_IMG;
  } else if (this.disabled == true && isActive == true) {
    TextComp.prototype.setActive.call(this, true);
    this.divButton.style.visibility = "";
    this.divButton.onclick = this.divButtonClickFunc;
    this.divButton.onmouseout = this.divButtonMouseOutFuc;
    this.divButton.onmouseover = this.divButtonMouseOverFuc;
    this.divButton.style.cursor = "pointer";
    this.refImg.src = ReferenceTextComp.REF_NM_IMG;
  }
  if (this.nodeInfo && this.nodeInfo.isRead) {
    this.setSelectOnly(true);
  }
  this.notifyChange(NotifyType.ENABLE, !this.disabled);
};
ReferenceTextComp.prototype.isActive = function() {
  return !this.disabled;
};
ReferenceTextComp.prototype.onclick = function(e) {
  var mouseEvent = {
    "obj": this,
    "event": e
  };
  this.doEventFunc("onclick", mouseEvent);
  return true;
};
ReferenceTextComp.prototype.getRefDlgWindow = function() {
  return window["$modalDialogFrame" + this.refIndex].contentWindow;
};
ReferenceTextComp.prototype.setBindInfo = function(dataset, field, pkField) {
  this.datasetId = dataset;
  this.field = field;
  this.pkField = pkField;
};
ReferenceTextComp.prototype.setValue = function(value) {
  value = getString(value, "");
  if (null != this.datasetId) {
    this.input.value = value;
    if (this.checkTip()) {
      if (this.input.value == "") this.showTip();
      else this.input.style.color = "black";
    }
  }
  this.value = value;
  this.oldValue = this.newValue;
  this.newValue = value;
  this.inputType = 2;
  if (this.newValue != this.oldValue) {
    this.valueChanged(this.oldValue, this.newValue, NotifyType.VALUE);
  }
  this.notifyChange(NotifyType.VALUE, this.value);
};
ReferenceTextComp.prototype.setShowValue = function(showValue) {
  showValue = getString(showValue, "");
  this.setMessage(showValue);
  this.showValue = showValue;
  this.input.value = showValue;
  if (this.checkTip()) {
    if (this.input.value == "") this.showTip();
    else this.input.style.color = "black";
  }
  this.oldShowValue = showValue;
  this.notifyChange(NotifyType.SHOWVALUE, this.showValue);
};
ReferenceTextComp.prototype.setMatchValues = function(matchValues) {
  if (this.nodeInfo && this.nodeInfo.isRead) {
    return;
  }
  this.matchValues = matchValues;
  var rt = null;
  if (matchValues != null) rt = matchValues.split(";");
  if (matchValues == "") rt = new Array();
  this.fillSearchDiv(rt);
};
ReferenceTextComp.prototype.valueChanged = function(oldValue, newValue, notifyType) {
  var valueChangeEvent = {
    "obj": this,
    "oldValue": oldValue,
    "newValue": newValue
  };
  this.notifyChange(notifyType, this.newValue);
  this.doEventFunc("valueChanged", valueChangeEvent);
  if (this.editFormular || this.validateFormular) execFormula(this.widget.id, null, this.id);
};
ReferenceTextComp.prototype.beforeOpenParam = function(beforeopenParam) {
  this.beforeopenParamValue = beforeopenParam;
};
ReferenceTextComp.prototype.beforeOpenRefPage = function() {
  var simpleEvent = {
    "obj": this
  };
  this.doEventFunc("beforeOpenReference", simpleEvent);
  return true;
};
ReferenceTextComp.prototype.getExtendsParam = function() {
  var proxy = new ServerProxy(null, null, false);
  if (this.nodeInfo && this.nodeInfo.dataListener && this.nodeInfo.dataListener != null) proxy.addParam("clc", this.nodeInfo.dataListener);
  else proxy.addParam("clc", "nc.uap.lfw.reference.app.AppReferenceController");
  proxy.addParam("m_n", "getExtendsParam");
  proxy.addParam("widgetId", this.widget.id);
  proxy.addParam("widget_id", this.widget.id);
  proxy.addParam("datasetId", this.datasetId);
  proxy.addParam('el', '2');
  proxy.addParam("refNodeId", this.nodeInfo.id);
  proxy.addParam("referenceTextId", this.id);
  proxy.addParam('refFormId', this.refFormId);
  proxy.addParam("refFormeleID", this.refFormeleID);
  proxy.addParam('refGridId', this.refGridId);
  proxy.addParam("refGridHeaderId", this.refGridHeaderId);
  proxy.addParam("datasetId", this.datasetId);
  proxy.execute();
};
ReferenceTextComp.prototype.setChangedContext = function(context) {
  TextComp.prototype.setChangedContext.call(this, context);
  if (context.showValue != null && (context.showValue != this.input.value || context.showValue != this.showValue)) {
    this.showValue = context.showValue;
    if (context.value != this.value) this.value = context.value;
    this.setShowValue(context.showValue);
  }
  if (context.selectOnly != null && context.selectOnly != this.selectOnly) {
    this.setSelectOnly(context.selectOnly);
  }
};
ReferenceTextComp.prototype.showDiv = function(rt) {
  if (!this.dataDiv) {
    this.comboDiv = $ce("DIV");
    this.comboDiv.className = 'combo_div';
    this.comboLeftTopDiv = $ce("DIV");
    this.comboLeftTopDiv.className = 'combo_left_top_div';
    this.comboCenterTopDiv = $ce("DIV");
    this.comboCenterTopDiv.className = 'combo_center_top_div';
    this.comboRightTopDiv = $ce("DIV");
    this.comboRightTopDiv.className = 'combo_right_top_div';
    this.comboLeftCenterDiv = $ce("DIV");
    this.comboLeftCenterDiv.className = 'combo_left_center_div';
    this.comboCenterDiv = $ce("DIV");
    this.comboCenterDiv.className = 'combo_center_div';
    this.comboRightCenterDiv = $ce("DIV");
    this.comboRightCenterDiv.className = 'combo_right_center_div';
    this.comboLeftBottomDiv = $ce("DIV");
    this.comboLeftBottomDiv.className = 'combo_left_bottom_div';
    this.comboCenterBottomDiv = $ce("DIV");
    this.comboCenterBottomDiv.className = 'combo_center_bottom_div';
    this.comboRightBottomDiv = $ce("DIV");
    this.comboRightBottomDiv.className = 'combo_right_bottom_div';
    this.comboDiv.appendChild(this.comboLeftTopDiv);
    this.comboDiv.appendChild(this.comboCenterTopDiv);
    this.comboDiv.appendChild(this.comboRightTopDiv);
    this.comboDiv.appendChild(this.comboLeftCenterDiv);
    this.comboDiv.appendChild(this.comboCenterDiv);
    this.comboDiv.appendChild(this.comboRightCenterDiv);
    this.comboDiv.appendChild(this.comboLeftBottomDiv);
    this.comboDiv.appendChild(this.comboCenterBottomDiv);
    this.comboDiv.appendChild(this.comboRightBottomDiv);
    this.dataDiv = $ce("DIV");
    this.dataDiv.id = this.id + "comb_data_div";
    this.dataDiv.className = "combobox_data_div";
    this.dataDiv.style.zIndex = getZIndex();
    document.body.appendChild(this.dataDiv);
    this.dataDiv.style.width = this.width == null ? '120px' : this.width;
    this.dataDiv.style.overflow = "auto";
    this.dataDiv.style.display = "none";
    this.dataDiv.style.position = "absolute";
    this.dataDiv.appendChild(this.comboDiv);
    this.comboCenterDiv.owner = this;
  }
  var optionLength = 1;
  if (rt != null) {
    optionLength = rt.length;
    if (optionLength < 3) optionLength = 3;
  }
  this.dataDiv.style.left = compOffsetLeft(this.Div_text) + "px";
  this.dataDiv.style.top = (compOffsetTop(this.Div_text) - compScrollTop(this.Div_text) + this.Div_text.offsetHeight) + "px";
  this.dataDiv.style.zIndex = getZIndex();
  this.dataDiv.style.width = this.Div_text.offsetWidth + "px";
  if (this.Div_text.offsetWidth == 0) {
    this.dataDiv.style.width = this.width == null ? '120px' : this.width;
  }
  if (this.dataDivHeight != null) this.dataDiv.style.height = this.dataDivHeight + "px";
  else {
    if (optionLength <= ReferenceTextComp.defaultVisibleOptionsNum) this.dataDiv.style.height = (optionLength * ReferenceTextComp.ITEM_HEIGHT + 11 * 2) + "px";
    else {
      this.dataDiv.style.height = (ReferenceTextComp.defaultVisibleOptionsNum * ReferenceTextComp.ITEM_HEIGHT + 11 * 2) + "px";
    }
  }
  this.comboDiv.style.height = (optionLength * ReferenceTextComp.ITEM_HEIGHT) + 11 * 2 + "px";
  this.comboCenterDiv.innerHTML = "";
  this.comboCenterDiv.selIndex = null;
  if (rt != null) {
    for (var i = 0; i < rt.length; i++) {
      var div = $ce("DIV");
      div.style.height = ReferenceTextComp.ITEM_HEIGHT + "px";
      div.style.overflow = "hidden";
      div.style.textOverflow = "ellipsis";
      div.style.whiteSpace = "nowrap";
      div.style.cursor = "pointer";
      div.onmousedown = ReferenceTextComp.searchDown;
      div.onclick = ReferenceTextComp.searchClick;
      var pair = rt[i].split(",");
      div.value = pair[0];
      if (pair[1] == null || pair[1] == '') {
        div.innerHTML = pair[0];
        div.name = '';
      } else {
        if (!(/.{0,}HIDDEN_CODE$/.test("" + pair[0]))) {
          div.innerHTML = pair[0] + " " + pair[1];
          div.title = pair[0] + " " + pair[1];
        } else {
          div.innerHTML = pair[1];
          div.title = pair[1];
        }
        div.name = pair[1];
      }
      div.allowExtendValue = this.nodeInfo.allowExtendValue;
      this.comboCenterDiv.appendChild(div);
    }
  }
  this.dataDiv.style.display = "block";
  positionElementInView(this.dataDiv);
  this.divIsShown = true;
  this.focusSearchResult(0);
  return this.dataDiv;
};
ReferenceTextComp.searchDown = function() {
  var textComp = this.parentNode.owner;
  textComp.isFromDiv = true;
};
ReferenceTextComp.searchClick = function() {
  var div = this;
  var value = div.value;
  var name = div.name;
  if (div.allowExtendValue) {
    name = div.name;
  }
  if (isNull(name)) {
    name = value;
  }
  var textComp = this.parentNode.owner;
  textComp.isFromDiv = true;
  textComp.setFocus();
  var oldShowValue = textComp.input.value;
  if (oldShowValue != null && oldShowValue.indexOf(",") != -1) {
    var rv = oldShowValue.substr(0, oldShowValue.lastIndexOf(",")) + "," + value;
    if (textComp.refFormId != null) {
      textComp.setValue(rv);
    } else {
      textComp.setShowValue(rv);
    }
  } else {
    if (textComp.refFormId != null || textComp.refGridId != null) {
      textComp.doBlurSearch(name);
    } else textComp.setShowValue(name);
  }
  textComp.oldValue = null;
  var e = EventUtil.getEvent();
  textComp.dataDiv.style.display = "none";
  stopAll(e);
};
ReferenceTextComp.prototype.focusSearchResult = function(dir) {
  if (!this.divIsShown) return;
  var nodes = this.comboCenterDiv.childNodes;
  if (nodes.length == 0) return;
  var selIndex = this.comboCenterDiv.selIndex;
  var oldSelIndex = selIndex;
  var size = nodes.length;
  if (selIndex == null) selIndex = 0;
  else {
    if (dir > 0) {
      selIndex++;
    } else if (dir < 0) {
      selIndex--;
    }
  }
  if (selIndex > size - 1) return;
  this.comboCenterDiv.selIndex = selIndex;
  nodes[selIndex].style.background = 'yellow';
  if (oldSelIndex != null && oldSelIndex <= size - 1) nodes[oldSelIndex].style.background = '';
};
ReferenceTextComp.prototype.hideRefDiv = function() {
  if (this.dataDiv && this.divIsShown) {
    this.dataDiv.style.display = "none";
    this.comboCenterDiv.selIndex = null;
    this.divIsShown = false;
  }
};
ReferenceTextComp.prototype.outsideClick = function(e) {
  if (window.clickHolders.trigger == this) return;
  this.input.blur();
  this.hideRefDiv();
};
ReferenceTextComp.prototype.setViewURL = function(viewURL) {
  var oldViewURL = this.viewURL;
  this.viewURL = viewURL;
};
ReferenceTextComp.prototype.hideViewURL = function() {
  if (this.urlBgDiv) {
    this.urlBgDiv.style.display = "none";
    this.urlBgDiv.style.zIndex = "-1";
  }
};
ReferenceTextComp.prototype.showViewURL = function() {
  var oThis = this;
  if (oThis.hideTimeoutFunc) clearTimeout(oThis.hideTimeoutFunc);
  if (this.urlBgDiv) {} else {
    this.urlBgDiv = $ce("DIV");
    this.urlBgDiv.className = 'background_div';
    this.urlBgDiv.style.position = "absolute";
    this.urlBgDiv.style.width = "93px";
    this.urlBgDiv.style.height = "40px";
    this.bgLeftTopDiv = $ce("DIV");
    this.bgLeftTopDiv.className = 'bg_left_top_div';
    this.bgCenterTopDiv = $ce("DIV");
    this.bgCenterTopDiv.className = 'bg_center_top_div';
    this.bgRightTopDiv = $ce("DIV");
    this.bgRightTopDiv.className = 'bg_right_top_div';
    this.bgLeftCenterDiv = $ce("DIV");
    this.bgLeftCenterDiv.className = 'bg_left_center_div';
    this.bgCenterDiv = $ce("DIV");
    this.bgCenterDiv.className = 'bg_center_div';
    this.bgCenterDiv.style.width = "70px";
    this.bgCenterDiv.style.height = "17px";
    this.bgRightCenterDiv = $ce("DIV");
    this.bgRightCenterDiv.className = 'bg_right_center_div';
    this.bgLeftBottomDiv = $ce("DIV");
    this.bgLeftBottomDiv.className = 'bg_left_bottom_div';
    this.bgCenterBottomDiv = $ce("DIV");
    this.bgCenterBottomDiv.className = 'bg_center_bottom_div';
    this.bgRightBottomDiv = $ce("DIV");
    this.bgRightBottomDiv.className = 'bg_right_bottom_div';
    this.urlBgDiv.appendChild(this.bgLeftTopDiv);
    this.urlBgDiv.appendChild(this.bgCenterTopDiv);
    this.urlBgDiv.appendChild(this.bgRightTopDiv);
    this.urlBgDiv.appendChild(this.bgLeftCenterDiv);
    this.urlBgDiv.appendChild(this.bgCenterDiv);
    this.urlBgDiv.appendChild(this.bgRightCenterDiv);
    this.urlBgDiv.appendChild(this.bgLeftBottomDiv);
    this.urlBgDiv.appendChild(this.bgCenterBottomDiv);
    this.urlBgDiv.appendChild(this.bgRightBottomDiv);
    this.urlTextDiv = $ce("DIV");
    this.urlTextDiv.style.width = "50px";
    this.urlTextDiv.style.position = "absolute";
    this.urlTextDiv.style.height = this.imageHeight + "px";
    this.urlTextDiv.innerHTML = "<a>参照信息</a>";
    this.closeImg = $ce("IMG");
    this.closeImg.src = ReferenceTextComp.VIEW_URL_IMP;
    this.closeImg.style.left = "53px";
    this.closeImg.style.position = "absolute";
    this.closeImg.style.height = this.imageHeight + "px";
    this.closeImg.style.width = this.imageWidth + "px";
    this.closeImg.onclick = function() {
      oThis.hideViewURL();
    };
    this.closeImg.onmouseover = function() {
      this.src = ReferenceTextComp.VIEW_URL_IMP_HIGHlIGHT;
    };
    this.closeImg.onmouseout = function() {
      this.src = ReferenceTextComp.VIEW_URL_IMP;
    };
    this.bgCenterDiv.appendChild(this.urlTextDiv);
    this.bgCenterDiv.appendChild(this.closeImg);
    document.body.appendChild(this.urlBgDiv);
    this.urlTextDiv.onclick = function(e) {
      e = EventUtil.getEvent();
      var value = oThis.getPkValue();
      if (value != null && value != "") window.open(oThis.viewURL.replace(/\${replace_pk}/g, value));
      stopAll(e);
      clearEventSimply(e);
    };
  }
  var left = compOffsetLeft(this.Div_text) + this.Div_text.offsetWidth - 93;
  var top = (compOffsetTop(this.Div_text) - compScrollTop(this.Div_text) - 35);
  if (left < 0) left = 0;
  if (top < 0) top = 0;
  this.urlBgDiv.style.left = left + "px";
  this.urlBgDiv.style.top = top + "px";
  this.urlBgDiv.style.zIndex = getZIndex();
  this.urlBgDiv.style.display = "";
  oThis.hideTimeoutFunc = setTimeout(function() {
    oThis.hideViewURL();
  }, 2000);
};
ReferenceTextComp.prototype.getPkValue = function() {
  if (this.datasetId != null) {
    var ds = this.widget.getDataset(this.datasetId);
    var index = -1;
    if (getString(this.pkField, "") != "") {
      index = ds.nameToIndex(this.pkField);
    }
    if (index < 0 && getString(this.field, "") != "") {
      index = ds.nameToIndex(this.field);
    }
    var row = ds.getSelectedRow();
    var value = "";
    if (index >= 0) {
      value = row.getCellValue(index);
    }
  } else {
    var value = this.getValue();
  }
  return value;
};
ReferenceTextComp.prototype.outsideMouseWheelClick = function() {
  this.hideRefDiv();
};

IntegerTextComp.prototype = new TextComp;
IntegerTextComp.prototype.componentType = "INTEGERTEXT";

function IntegerTextComp(parent, name, left, top, width, position, maxValue, minValue, attrArr, className) {
  this.base = TextComp;
  this.maxValue = getInteger(maxValue, "999999999999999");
  this.minValue = getInteger(minValue, "-999999999999999");
  if (attrArr != null) {
    if (attrArr.tip == null || attrArr.tip == "") {
      if ((minValue != null && (minValue != -999999999999999 && minValue != -2147483648)) && (maxValue != null && (maxValue != 999999999999999 && maxValue != 2147483647))) attrArr.tip = this.minValue + "～" + this.maxValue;
      else if (minValue != null && (minValue != -999999999999999 && minValue != -2147483648)) attrArr.tip = ">=" + this.minValue;
      else if (maxValue != null && (maxValue != 999999999999999 && maxValue != 2147483647)) attrArr.tip = "<=" + this.maxValue;
    }
  }
  this.base(parent, name, left, top, width, "I", position, attrArr, className);
};
IntegerTextComp.prototype.processEnter = function() {
  var inputValue = this.getValue().trim();
  if (inputValue != "") {
    inputValue = this.getFormater().format(inputValue, true);
    if (inputValue == "") {
      if (!this.ingrid) this.setErrorPosition();
      this.errorCenterDiv.innerHTML = trans("ml_integermustbetween", [this.minValue, this.maxValue]);
      this.errorMsgDiv.style.display = "block";
      this.input.value = "";
      this.setFocus();
    } else {
      this.setMessage(inputValue);
      this.input.value = inputValue;
    }
  }
};
IntegerTextComp.prototype.createDefaultFormater = function() {
  return new IntegerFormater(this.minValue, this.maxValue);
};
IntegerTextComp.prototype.verify = function(oldValue) {
  if (this.newValue == "" && this.input.value != "") {
    if (!this.ingrid) this.setErrorPosition();
    this.errorCenterDiv.innerHTML = trans("ml_integermustbetween", [this.minValue, this.maxValue]);
    this.errorMsgDiv.style.display = "block";
    this.input.value = "";
    this.setMessage("");
  }
};
IntegerTextComp.prototype.setChangedContext = function(context) {
  TextComp.prototype.setChangedContext.call(this, context);
  if (context.maxValue != null) {
    this.setIntegerMaxValue(context.maxValue);
  }
  if (context.minValue != null) {
    this.setIntegerMinValue(context.minValue);
  }
};
IntegerTextComp.prototype.setIntegerMaxValue = function(maxValue) {
  if (maxValue != null) {
    if (isNumber(maxValue)) {
      if (parseInt(maxValue) >= -999999999999999 && parseInt(maxValue) <= 999999999999999) {
        this.maxValue = maxValue;
        this.notifyChange(NotifyType.MAXVALUE, this.maxValue);
      }
    }
  }
};
IntegerTextComp.prototype.setIntegerMinValue = function(minValue) {
  if (minValue != null) {
    if (isNumber(minValue)) {
      if ((parseInt(minValue) >= -999999999999999) && (parseInt(minValue) <= 999999999999999)) {
        this.minValue = minValue;
        this.notifyChange(NotifyType.MINVALUE, this.minValue);
      }
    }
  }
};
IntegerTextComp.prototype.setValue = function(text) {
  text = text == null ? "" : text + "";
  var valueStr = "var text = text.replace(/\\" + window.$maskerMeta.NumberFormatMeta.markSymbol + "/g,'');";
  eval(valueStr);
  if (!checkIntegerIsValid(text, null, null)) {
    text = "";
    this.input.value = "";
    this.setMessage("");
  }
  TextComp.prototype.setValue.call(this, text + "");
};