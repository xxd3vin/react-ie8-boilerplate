function pageBodyScript() {}
window.lfwtop = true;
window.onload = function() {};

function changeAdmin() {
  $("#ajaxForm").submit();
}
var FloatTree_TD_WIDTH = parseInt(_FloatTree_TD_WIDTH);
var FloatTree_TD_SHOW_COUNT = parseInt(_FloatTree_TD_SHOW_COUNT);
var FloatTree_LEFT_RIGHT_MARGIN = 36 + 35;

function checkRP() {
  var b = window.screen.width + "x" + window.screen.height;
  var a = new Array();
  a.push("768x1024");
  if (FloatTree_TD_SHOW_COUNT == 3 && a.toString().indexOf(b) != -1) {
    FloatTree_TD_SHOW_COUNT = 2;
  }
}
checkRP();

function NavMenu(b, a, c, d) {
  this.menuRoot = b;
  this.regMenu = a;
  this.showRegMenu = c;
  this.longLang = d;
  this.ctnObj = document.createDocumentFragment();
}
var openFrame = null;
NavMenu.prototype.create = function() {
  NavMenu.personalHeight = -1;
  NavMenu.showRegMenu = this.showRegMenu;
  this.createRoot();
  this.createRegularMenu();
  document.getElementById("float_menu_content").appendChild(this.ctnObj);
  this.bindEvent();
};
NavMenu.prototype.createRegularMenu = function() {
  if (!this.regMenu) {
    return;
  }
  var personal_url = document.getElementById("_personal_child");
  var regMenLen = this.regMenu.length;
  for (var i = 0; i < regMenLen; i++) {
    var node = this.regMenu[i];
    var dp = new DomStack();
    var li = dp.ce("li");
    li.title = node.title;
    var div = dp.ce("div");
    var a = dp.ce("a");
    with(a) {
      id = node.pkAppsnode;
      title = node.title;
      innerHTML = node.title;
    }
    a.setAttribute("isfun", node.isfun);
    a.setAttribute("isnewpage", node.isnewpage);
    a.setAttribute("funcode", node.funcode);
    a.setAttribute("funURL", node.funurl);
    a.setAttribute("pkFunnode", node.pk_funnode);
    var img = dp.ce("img", true);
    with(img) {
      id = node.pkAppsnode + "_img";
      src = "/portal/images/icon_delete.png";
    }
    img.style.visibility = "hidden";
    img.style.cursor = "pointer";
    div.appendChild(img);
    dp.endLifeCycle();
    personal_url.appendChild(li);
  }
};
var changeLinkBtn = "false";
NavMenu.prototype.bindEvent = function() {
  $(".menu li").each(function(b) {
    var a = $(this).attr("linkgroup");
    if (a && $("#menubody_" + a).length > 0) {
      initMenuConfWidth(a);
      if (IS_IPAD) {
        $(this).bind("touchend", function() {
          touchendFun($(this));
        });
      } else {
        $(this).bind("click", function(d) {
          var c = $(d.target).closest("li[id][id='" + window.pargeCard + "']").length;
          if ($("#NavMenu").is(":visible") && c > 0) {
            mouseoutFun();
            return false;
          }
          mouseoverFun($(this));
        });
      }
    }
  });
  $(document).click(function(b) {
    var a = $(b.target).closest("li[id][id='" + window.pargeCard + "']");
    var c = $(b.target).attr("class");
    if (a.length > 0 || c == "divLeftBtn" || c == "divRightBtn") {
      return false;
    }
    if ($("#NavMenu").is(":visible")) {
      mouseoutFun();
    }
  });
  if (IS_IPAD) {
    $("#NavMenu").bind("touchend", function() {
      touchendFun($(this));
    });
  }
  $("#float_menu_content").find("div[id^='divLeftBtn_']").each(function(a) {
    if (IS_IPAD) {
      $(this).bind("touchend", function() {
        changeLinkBtn = "true";
        leftBtnClick($(this).attr("id").split("_")[1]);
      });
    } else {
      $(this).click(function() {
        var b = $(this).attr("id").split("_")[1];
        leftBtnClick(b);
      });
    }
  });
  $("#float_menu_content").find("div[id^='divRightBtn_']").each(function(a) {
    if (IS_IPAD) {
      $(this).bind("touchend", function() {
        changeLinkBtn = "true";
        rigBtnClick($(this).attr("id").split("_")[1], false);
      });
    } else {
      $(this).click(function() {
        var b = $(this).attr("id").split("_")[1];
        rigBtnClick(b, false);
      });
    }
  });
  initFloatMenu();
  openFrame = function(d, b, a) {
    setContentVisible(true);
    if (b != "") {
      var c = {};
      c.frameUrl = b;
      c.title = d;
      c.pagecard = a;
      c.nonmc = "1";
      getContainer("#" + window.MenuContainerId).doAction(c);
      $(".blankPortlet .content").children("div").each(function(e) {
        if ($(this).attr("id") && $(this).attr("id").length > 0) {
          $(this).attr("placein", "0");
          $(this).hide();
        }
      });
    }
  };
};
NavMenu.prototype.createRoot = function() {
  for (rootid in this.menuRoot) {
    var dp = new DomStack();
    var rootContent = this.menuRoot[rootid];
    var menubody = dp.ce("div");
    with(menubody) {
      id = "menubody_" + rootid;
      className = "divContent";
      style.display = "none";
    }
    var menubodyTable = dp.ce("table");
    with(menubodyTable.style) {
      position = "relative";
      left = "0px";
      height = "100%";
    }
    var menubodyTbody = dp.ce("tbody");
    var menuTitleTr = dp.ce("tr", false, true);
    with(menuTitleTr) {
      align = "left";
      style.height = "36px";
    }
    var menuBodyTr = dp.ce("tr", false, true);
    with(menuBodyTr) {
      align = "left";
      style.height = "100%";
      if (!IS_IE7) {
        style.backgroundColor = "#fff";
      }
    }
    var menuTailTr = dp.ce("tr", false, true);
    menuTailTr.style.height = "33px";
    if (rootContent.length > 0) {
      for (var i = 0; i < rootContent.length; i++) {
        var fstNode = rootContent[i];
        menuTitleTr.appendChild(this.createHead(fstNode));
        menuBodyTr.appendChild(this.createBody(fstNode));
        var tailTd = dp.ce("td", true);
        tailTd.className = "td_style";
        menuTailTr.appendChild(tailTd);
      }
    }
    dp.endLifeCycle();
    var divLeftBtn = dp.ce("div", true);
    with(divLeftBtn) {
      id = "divLeftBtn_" + rootid;
      className = "divLeftBtn";
    }
    menubody.appendChild(divLeftBtn);
    var divRightBtn = dp.ce("div", true);
    with(divRightBtn) {
      id = "divRightBtn_" + rootid;
      className = "divRightBtn";
    }
    menubody.appendChild(divRightBtn);
    this.ctnObj.appendChild(menubody);
  }
};
NavMenu.prototype.createHead = function(fstNode) {
  var dp = new DomStack();
  var menuTitle = dp.ce("td");
  with(menuTitle) {
    className = "td_top top_cn";
    align = "center";
  }
  var menuTitleTable = dp.ce("table");
  var menuTitleTBody = dp.ce("tbody");
  var menuTitleTr = dp.ce("tr");
  var menuTitleTd = dp.ce("td");
  menuTitleTd.width = "55";
  var menuTitleDiv = dp.ce("div");
  menuTitleDiv.className = "floatimg";
  if (fstNode.icon && fstNode.icon != undefined && fstNode.icon != "") {
    var menuTitleImg = dp.ce("img");
    with(menuTitleImg) {
      src = "/portal/images/floatTreeIcon/" + fstNode.icon + "_pc.png";
    }
    menuTitleImg.style.width = "20px";
    menuTitleImg.style.height = "20px";
  }
  dp.endLifeCycle();
  dp = new DomStack();
  var menuTitleContentTd = dp.ce("td");
  with(menuTitleContentTd) {
    width = "95";
    align = "left";
    valign = "middle";
  }
  var menuTitleContentDiv = dp.ce("div");
  menuTitleContentDiv.className = "floatimgtitle";
  menuTitleContentDiv.innerHTML = fstNode.title;
  dp.endLifeCycle();
  menuTitleTr.appendChild(menuTitleContentTd);
  return menuTitle;
};
NavMenu.prototype.createBody = function(fstNode) {
  var contentTd = new DomStack().ce("td", true);
  with(contentTd) {
    width = "150";
    className = "td_style";
  }
  contentTd.setAttribute(IS_IE7 ? "vAlign" : "valign", "top");
  contentTd.appendChild(this.createCategory(fstNode, true));
  return contentTd;
};
NavMenu.prototype.createCategory = function(fstNode, isFirst) {
  var dp = new DomStack();
  var contentDiv = dp.ce("div");
  if (isFirst) {
    contentDiv.className = "floatmenu";
    contentDiv.style.marginLeft = "25px";
    contentDiv.style.marginTop = "10px";
  } else {
    contentDiv.className = "floatmenuitem";
  }
  with(contentDiv) {
    title = fstNode.title;
  }
  contentDiv.setAttribute("menu", "t");
  var cntentUL = dp.ce("ul");
  this.createNode(cntentUL, fstNode.nodes);
  dp.endLifeCycle();
  return contentDiv;
};
NavMenu.prototype.createNode = function(menuContentUL, nodes) {
  if (!nodes) {
    return;
  }
  for (var i = 0; i < nodes.length; i++) {
    var dp = new DomStack();
    var node = nodes[i];
    var li = dp.ce("li");
    li.title = node.title;
    var div = dp.ce("div");
    var a = dp.ce("a");
    with(a) {
      id = node.pk_menuitem;
      title = node.title;
      innerHTML = node.title;
    }
    if (node.isfun) {
      a.setAttribute("isfun", node.isfun);
      a.setAttribute("isnewpage", node.isnewpage);
      a.setAttribute("funcode", node.funcode);
      a.setAttribute("funURL", node.funurl);
      a.setAttribute("pkFunnode", node.pk_funnode);
      a.setAttribute("pk_menuitem", node.pk_menuitem);
      if (NavMenu.showRegMenu) {
        var img = dp.ce("img", true);
        with(img) {
          id = node.pk_menuitem + "_img";
          src = "/portal/images/icon_add.png";
        }
        img.style.visibility = "hidden";
        img.style.cursor = "pointer";
        div.appendChild(img);
      }
    } else {
      a.style.textDecoration = "none";
      a.style.color = "#666666";
      a.style.cursor = "default";
    }
    dp.endLifeCycle();
    if (node.nodes && node.nodes.length > 0) {
      li.appendChild(this.createCategory(node));
    }
    menuContentUL.appendChild(li);
  }
};

function DomStack() {
  this.seg = null;
}
DomStack.prototype.ce = function(a, d, c) {
  var b = DomStack[a];
  if (b) {
    b = b.cloneNode(false);
  } else {
    b = document.createElement(a);
  }
  if (!d) {
    if (this.seg) {
      this.seg.appendChild(b);
      if (!c) {
        this.seg = b;
      }
    } else {
      this.seg = b;
    }
  }
  return b;
};
DomStack.prototype.endLifeCycle = function() {};
DomStack.a = document.createElement("a");
DomStack.div = document.createElement("div");
DomStack.img = document.createElement("img");
DomStack.table = document.createElement("table");
DomStack.tbody = document.createElement("tbody");
DomStack.tr = document.createElement("tr");
DomStack.td = document.createElement("td");
DomStack.ul = document.createElement("ul");
DomStack.span = document.createElement("span");

function touchendFun(a) {
  if (changeLinkBtn == "true") {
    changeLinkBtn = "false";
    return;
  }
  var b = $("#NavMenu");
  var c = b.css("display");
  if (c == "none") {
    mouseoverFun(a);
  } else {
    mouseoutFun();
  }
}

function mouseoutFun() {
  $("#NavMenu").attr("placein", "0");
  setTimeout(function() {
    if ($("#NavMenu").attr("placein") == "0") {
      if (!IS_IE || IS_IE9_CORE) {
        $("#NavMenu").fadeOut(300);
      } else {
        $("#NavMenu").hide();
      }
      setContentVisible(true);
    }
  }, 400);
}

function mouseoverFun(b) {
  $("#NavMenu").attr("placein", "1");
  var c = b.attr("id");
  if (c != "NavMenu") {
    window.pargeCard = b.attr("id");
    var a = b.attr("linkgroup");
    $(".blankPortlet .content #float_menu_content").children("div").each(function(d) {
      var e = $(this).attr("id");
      if (!(e && e == "menubody_" + a)) {
        $(this).attr("placein", "0");
        $(this).css("height", "100%");
        $(this).hide();
        if (IS_IE7) {
          $(this).children("div").each(function(f) {
            $(this).hide();
            var g = $(this).attr("bil");
            if (!g) {
              g = $(this).css("background-image");
            }
            $(this).attr("bil", g);
            $(this).css("background-image", "none");
          });
          $(this).find(".td_top .floatimg").each(function(f) {
            $(this).hide();
            $(this).css("visibility", "hidden");
          });
        }
      }
    });
    adjustBeforeShow(b);
    setTimeout(function() {
      if ($("#NavMenu").attr("placein") == "1") {
        if (!IS_IE || IS_IE9_CORE) {
          $("#NavMenu").fadeIn("slow");
        } else {
          $("#NavMenu").show();
        }
        if (NavMenu.personalHeight == -1) {
          NavMenu.personalHeight = $("#personal_content").height();
        }
        setPersHeight($("#menubody_" + a).height(), a);
        setContentVisible(false);
      }
    }, 300);
  }
}

function adjustOftenMenu(d) {
  var a = $("#menubody_" + d);
  if (NavMenu.showRegMenu) {
    var c = a.height();
    if (IS_IE7) {
      c = a.children("table").children().height();
    }
    var b = NavMenu.personalHeight;
    if (c < b) {
      a.height(b);
    } else {
      if (c > b) {
        setPersHeight(c, d);
      }
    }
  }
}

function setPersHeight(a, b) {
  var d = $("#personal_content");
  d.height(a);
  if (IS_IE8) {
    var c = document.getElementById("menubody_" + b).offsetHeight - 36 - 33 + "px";
    d.find("#personal_td").height(c);
  }
}

function adjustBeforeShow(n) {
  var h = n.attr("linkgroup");
  var c = $("#menubody_" + h);
  c.show();
  if (IS_IE7) {
    var o = c.find(".td_top").length;
    if (o > FloatTree_TD_SHOW_COUNT) {
      var b = $("#divRightBtn_" + h);
      b.css("background-image", b.attr("bil"));
      $("#divLeftBtn_" + h).hide();
      $("#divRightBtn_" + h).show();
    } else {
      $("#divLeftBtn_" + h).hide();
      $("#divRightBtn_" + h).hide();
    }
    c.find(".td_top .floatimg").each(function(e) {
      $(this).show();
      $(this).css("visibility", "visible");
    });
  }
  adjustOftenMenu(h);
  var o = c.find(".td_top").length;
  var f = FloatTree_TD_WIDTH + 1;
  var a = 0;
  if (NavMenu.showRegMenu) {
    a = FloatTree_TD_WIDTH;
  }
  var g = $("#NavMenu");
  if (o > FloatTree_TD_SHOW_COUNT) {
    g.width(f * FloatTree_TD_SHOW_COUNT + FloatTree_LEFT_RIGHT_MARGIN + a);
  } else {
    g.width(f * o + FloatTree_LEFT_RIGHT_MARGIN + a);
  }
  var s = calcMenuPosition(n);
  var d = s.left;
  var p = s.top;
  if (n.parent().attr("id") && n.parent().attr("id") == "moreMenu") {
    d = n.parents("#moreMessage").offset().left - g.width() + 40;
    p = 86 - document.body.scrollTop;
  }
  g.css("left", d + "px");
  g.css("top", p + "px");
  if (!IS_IE7) {
    var l = $("#menubody_" + h).children("table");
    var d = parseInt(l.css("left"), 10);
    var q = window.usercode + "_" + window.pargeCard + "_" + h + "_divRightBtn";
    var r = 0;
    try {
      r = getClientCache(q);
      if (r && d == 0) {
        var k = parseInt(r, 10);
        for (var j = 0; j < k; j++) {
          rigBtnClick(h, true);
        }
        createClientCache(q, 0);
      }
    } catch (m) {}
  }
}

function calcMenuPosition(j) {
  var e = j.attr("linkgroup");
  var m = $("body").width();
  var f = $(document).find("div").get(0).offsetWidth;
  if (isNaN(f) || f <= 0) {
    f = m;
  }
  var d = parseInt((m - f) / 2, 10);
  var b = j.offset().left - 35 - 10;
  var l = j.offset().top + 33 - document.body.scrollTop;
  var c = (FloatTree_TD_WIDTH + 1);
  var i = $("#menubody_" + e).find(".td_top").length;
  var g = FloatTree_TD_SHOW_COUNT > i ? i : FloatTree_TD_SHOW_COUNT;
  var a = 0;
  if (NavMenu.showRegMenu) {
    a = FloatTree_TD_WIDTH;
  }
  var k = c * g + a + FloatTree_LEFT_RIGHT_MARGIN;
  if (b + k > d + f) {
    var n = j.offset().left + j.width() - 37 + 35 + 10;
    if (n <= d + f && n - k >= d) {
      b = n - k;
    } else {
      b = f - k + d;
    }
  }
  var h = {};
  h.left = b;
  h.top = l;
  return h;
}

function initMenuConfWidth(a) {
  var b = FloatTree_TD_WIDTH + 1;
  if (NavMenu.showRegMenu) {
    $("#personal_body").width(b);
    $("#personal_content").width(FloatTree_TD_WIDTH);
  }
  var c = $("#menubody_" + a).find(".td_top").length;
  if (c > FloatTree_TD_SHOW_COUNT) {
    $("#menubody_" + a).width(b * FloatTree_TD_SHOW_COUNT - 3);
    $("#divLeftBtn_" + a).hide();
  } else {
    $("#menubody_" + a).width(b * c - 3);
    $("#divLeftBtn_" + a).hide();
    $("#divRightBtn_" + a).hide();
  }
  $("#menubody_" + a).children("table").width(b * c);
}

function getClientCache(a) {
  var c = window.localStorage;
  var b = null;
  if (c) {
    b = c[a];
  }
  return b;
}

function recordOnclickTimes(b) {
  var a = getClientCache(b);
  if (a) {
    createClientCache(b, parseInt(a, 10) + 1);
  } else {
    createClientCache(b, 1);
  }
}

function hideOrShowImg(b) {
  if (b) {
    var a = $(b).find("img");
    if (a && a.css("visibility") == "hidden") {
      a.css("visibility", "");
    } else {
      a.css("visibility", "hidden");
    }
  }
}

function addFrqtItem(a, b, c) {
  showDialog("app/mockapp/floatLinkTree?pk=" + a + "&pk_menuitem=" + b + "&name=" + c, trans("ml_float_showmsg"), "400", "200");
}

function changeDivBtnStatus(b, d, a, c) {
  if (c < 0) {
    c = -c;
  }
  if (c > 0) {
    if (IS_IE7) {
      b.css("background-image", b.attr("bil"));
    }
    b.show();
  } else {
    b.hide();
  }
  if (c < (a - FloatTree_TD_SHOW_COUNT) * FloatTree_TD_WIDTH) {
    if (IS_IE7) {
      d.css("background-image", d.attr("bil"));
    }
    d.show();
  } else {
    d.hide();
  }
}

function leftBtnClick(a) {
  if (a) {
    var d = $("#menubody_" + a).children("table");
    var c = parseInt(d.css("left"), 10);
    var b = d.find(".td_top").size();
    if (b > FloatTree_TD_SHOW_COUNT) {
      if (c < 0) {
        c = -c;
      }
      if (c > 0) {
        c = c - (FloatTree_TD_WIDTH + 1);
        d.hide();
        d.css("left", "-" + c + "px");
        d.fadeIn("normal");
      }
      changeDivBtnStatus($("#divLeftBtn_" + a), $("#divRightBtn_" + a), b, c);
    }
  }
}

function rigBtnClick(a, e) {
  if (a) {
    var d = $("#menubody_" + a).children("table");
    var c = parseInt(d.css("left"), 10);
    var b = d.find(".td_top").size();
    if (b > FloatTree_TD_SHOW_COUNT) {
      if (c < 0) {
        c = -c;
      }
      if (c < (b - FloatTree_TD_SHOW_COUNT) * FloatTree_TD_WIDTH) {
        c = c + (FloatTree_TD_WIDTH + 1);
        d.hide();
        d.css("left", "-" + c + "px");
        d.fadeIn("normal");
        if (!e) {
          recordOnclickTimes(window.usercode + "_" + window.pargeCard + "_" + a + "_divRightBtn");
        }
      }
      changeDivBtnStatus($("#divLeftBtn_" + a), $("#divRightBtn_" + a), b, c);
    }
  }
}
var link_Pre = "P_U_R_L_";
var tipShowFlag = false;
var currentTipMeta = "";
$(function() {
  window.NCPortalSupportPortletMode = ["view", "edit", "help"];
  window.NCPortalSupportPortletModeName = {
    view: trans("ml_portlet_mode_view"),
    edit: trans("ml_portlet_mode_edit"),
    help: trans("ml_portlet_mode_help")
  };
  if (DESIGN_MODE == "N") {
    initRefreshPortlet();
    disposeURL();
    initDragable();
    initTips();
    initHeartBeat();
    RollEventFixed();
  } else {
    initPageDesigner();
  }
  IECorrect();
  fixIE7ScrollBug();
  initMsgTip();
  initScree();
  preCompressContent();
});

function initScree() {
  var a = window.screen.width;
  var b = window.screen.height;
  if (a == 1024 && b == 768) {
    $("body").children().css("min-width", "960px");
  }
}

function fixIE7ScrollBug() {
  if (IS_IE7) {
    $(document).find("html").get(0).style.overflowY = "visible";
  }
  if (IS_IE7 || IS_IE9) {
    document.body.style.position = "relative";
  } else {
    if (IS_IPAD) {
      document.body.style.WebkitOverflowScrolling = "touch";
    } else {
      if (IS_IE8) {
        document.body.style.overflow = "visible";
      } else {
        document.body.style.overflowY = "visible";
      }
    }
  }
}

function getWinSize() {
  var a, b;
  if (window.innerHeight) {
    a = window.innerWidth;
    b = window.innerHeight;
  } else {
    if (document.documentElement && document.documentElement.clientHeight) {
      a = document.documentElement.clientWidth;
      b = document.documentElement.clientHeight;
    } else {
      if (document.body) {
        a = document.body.clientWidth;
        b = document.body.clientHeight;
      }
    }
  }
  return {
    WinW: a,
    WinH: b
  };
}

function initHeartBeat() {
  EventUtil.addEventHandler(window, "unload", function() {
    var a = new Ajax();
    a.setPath("/portal/pt/home/stopBreat");
    a.get(false);
  });
}

function RollEventFixed() {
  if (document.attachEvent) {
    document.attachEvent("onmousewheel", mouseScrollFunc);
  } else {
    if (document.addEventListener) {
      document.addEventListener("DOMMouseScroll", mouseScrollFunc, false);
    }
  }
  EventUtil.addEventHandler(document.body, "scroll", mouseScrollFunc);
}

function mouseScrollFunc() {
  var b = EventUtil.getEvent();
  var a = getTarget(b);
  if (a.tagName && "MARQUEE" == a.tagName) {
    return false;
  }
  var c = document.getElementById("tipspanel");
  if (c) {
    c.style.display = "none";
  }
  $(".blankPortlet .content .divBody").attr("placein", "0").hide();
}
var refresh_circle = {};

function initTips() {
  if (CUR_PPAGE_READONLY == "false") {
    $("[tp=pBody]").mouseover(function() {
      if (tipShowFlag && currentTipMeta != "") {
        getContainer("#" + currentTipMeta).hideTips();
      }
    });
    $("[tp='portlet']").find("[tp=pHead]").mouseover(function() {
      var a = $(this).parents("[tp=portlet]");
      if (!tipShowFlag || (currentTipMeta != "" && currentTipMeta != a.attr("id"))) {
        getContainer(a).showTips();
      }
    });
    $("[tp='portlet']").find("[tp='pPart']").mouseover(function() {
      return false;
    });
  }
}

function initRefreshPortlet() {
  setInterval(checkPortletRefresh, 1000);
}

function checkPortletRefresh() {
  ensureUserStateSecurity();
  for (xa in refresh_circle) {
    var a = getContainer("#" + xa);
    if (!a.ModifiedSince || a.ModifiedSince < (new Date()).getTime() - refresh_circle[xa] * 1000) {
      a.doView();
      a.ModifiedSince = (new Date()).getTime();
    }
  }
}

function ensureUserStateSecurity() {
  try {
    var d = decodeURIComponent(getCookie("p_userId"));
    var b = getCookie("p_logoutflag");
    if ((d != null && d != "" && d != "annoyuser" && window.usercode.toLowerCase() != "annoyuser" && window.usercode.toLowerCase() != d.toLowerCase()) || "y" == b) {
      sendRedirect("/portal/app/mockapp/login.jsp?lrid=1");
    }
  } catch (a) {}
  try {
    var c = getCookie("p_forcelogoutflag");
    if (c != null && c == "1") {
      deleteCookie("p_forcelogoutflag", "/portal");
      showErrorDialog("由于当前用户在其他客户端强制登录，本客户端将退出工作台", function() {
        sendRedirect("/portal/pt/home/logout");
      }, "提示", "确定");
    }
  } catch (a) {}
}

function initIframeEnv() {
  var b = $(this).parents("[tp='portlet']");
  var a = getContainer(b).id;
  try {
    $(this).get(0).contentWindow.document._pt_container_id = a;
    $(this).get(0).contentWindow.document.getContainer = getIframeContainer;
    $(this).get(0).contentWindow.document._pt_frame_id = $(this).get(0).id;
    if ($(this).attr("flowMode") == "1") {
      setTimeout("initFrameMiniHeight('#" + $(this).get(0).id + "')", 300);
    }
  } catch (c) {}
}

function initFrameMiniHeight(b) {
  var a = window.document.body.offsetHeight - window.document.body.children[0].scrollHeight;
  if (a > 0) {
    var c = $(b).height() + a;
    if (DESIGN_MODE == "Y") {
      c = c / 2;
    }
    $(b).attr("minHeight", c);
    $(b).attr("fullHeight", c);
    $(b).height(c);
  }
  adjustIFramesHeightOnLoad($(b).get(0));
}

function initParentIframeHeight() {
  try {
    var b = parent.getParentsContainer(this._pt_frame_id);
    $(b).height(window.document.body.scrollHeight);
  } catch (a) {}
}

function initIframeArea(c, b) {
  var a = $("#" + c);
  if (b == -1) {
    a.attr("flowMode", "1");
  } else {
    if (b == 0) {
      $(function() {
        var g = $("[tp='foot']");
        var d = a.parents("[tp='portlet']");
        var e = $(window).height();
        if (g.length > 0) {
          e = e - g.offset().top - g.outerHeight(true);
        }
        e = e + getContainer(d).getOuter().height() - d.outerHeight(true);
        if (e <= 0) {
          e = d.innerHeight() - a.height() - 31;
          if (e <= 0) {
            e = getContainer(d).getOuter().height() - d.outerHeight(true);
          }
          a.height(e + a.height());
        } else {
          if (e > 0) {
            if (e < 5) {
              var f = getContainer(d).getOuter().height() - d.outerHeight(true);
              if (f > 0) {
                a.height(f + a.height());
              }
            } else {
              a.height(e + a.height());
            }
          }
        }
      });
    } else {
      a.attr("height", b);
    }
  }
  if (DESIGN_MODE == "Y") {}
}

function resizeIframe(e, c) {
  var a = $("#" + e);
  if (c == -1) {} else {
    if (c == 0) {
      var d = a.offset().top;
      if (d < 0) {
        d = 0;
      }
      var b = $(window).height() - d - 15;
      if (b > 0) {
        a.height(b);
      }
    } else {
      if (c > 0) {
        a.height(c);
      }
    }
  }
}

function getParentsContainer(a) {
  return document.getElementById(a);
}

function getIframeContainer() {
  try {
    return parent.getParentsContainer(this._pt_container_id);
  } catch (a) {
    return window.getParentsContainer(this._pt_container_id);
  }
}

function IECorrect() {
  $("iframe").each(function(a, b) {
    if ($(b).attr("src") == undefined || $(b).attr("src") == "") {
      $(b).attr("src", $(b).attr("scr"));
    }
  });
}

function disposeURL() {
  var b = [];
  try {
    b = $("a[href*=" + link_Pre + "]");
  } catch (a) {}
  burnURL(b);
  var c = [];
  try {
    c = $("form[action*=" + link_Pre + "]");
  } catch (a) {}
  burnFORM(c);
  disposeFrameURL();
}

function disposeFrameURL() {
  var a = window.frames;
  if (a == null || a.length < 1) {
    return;
  }
  try {
    for (var d = 0; d < a.length; d++) {
      var b = a[d];
      if (b.name == "portlet") {
        $(b).ready(function() {
          try {
            burnURL($(b.contentWindow.document).contents().find("a[href*=" + link_Pre + "]"));
            burnFORM($(b.contentWindow.document).contents().find("form[action*=" + link_Pre + "]"));
          } catch (f) {}
        });
      }
    }
  } catch (c) {}
}

function burnURL(a) {
  $.each(a, function(c, d) {
    var b = getTrueUrl($(d).attr("href"));
    $(d).click(function() {
      openPortlet(b);
    });
    $(d).attr("href", "javascript:void(0)");
  });
}

function burnFORM(a) {
  $.each(a, function(c, d) {
    var b = getTrueUrl($(d).attr("action"));
    $(d).submit(function() {
      openPortlet(b, $(d).serializeArray());
      return false;
    });
    $(d).attr("action", "");
  });
}

function getTrueUrl(b) {
  var c = b.indexOf(link_Pre) + 8;
  var a = b.substr(c);
  return a;
}

function openPortlet(url, fdata, fn) {
  $.ajax({
    type: "GET",
    url: url,
    data: fdata,
    cache: false,
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      if (XMLHttpRequest.status == 306) {
        window.location = ROOT_PATH;
      }
    },
    success: function(data) {
      if (data && typeof data == "object") {
        if (data.err) {
          alert(data.err);
          eval(data.exec);
        } else {
          $(data).each(function(index, el) {
            var protocol = el[RESPONSE_PROTOCOL];
            if (protocol == RESPONSE_MODE_SCRIPT) {
              eval(el.content);
            } else {
              try {
                var _ctn = getContainer("#" + el.name);
                _ctn.setCurrentMode(el.mode);
                _ctn.setContent(el.content);
              } catch (e) {}
            }
          });
          disposeURL();
          if (fn) {
            if (typeof fn == "string") {
              eval(fn);
            } else {
              if (typeof fn == "function") {
                fn.call(this);
              }
            }
          }
        }
      }
    }
  });
}

function initDragable() {
  if (CUR_PPAGE_READONLY != "true") {
    makePageDragable();
  }
}

function makePageDragable() {
  $.baseball({
    accepter: $("[tp='layout']").filter(function(a) {
      return $("[tp='layout']", this).length == 0;
    }).add($("[tp='portlet']").siblings("[tp='layout']").parent("[tp='layout']")),
    target: "[tp='portlet']",
    handle: "[tp='pHead']"
  });
}

function createClientCache(a, b) {
  try {
    var d = window.localStorage;
    if (d) {
      d[a] = b;
    }
  } catch (c) {
    if (d) {
      d.clear();
      d[a] = b;
    }
  }
}

function writeClientCache(b) {
  var e = window.localStorage;
  var d = null;
  if (e) {
    d = e[b];
  }
  if (d) {
    var a = b.split(":")[1];
    $("#" + a).find("[tp=pBody]").html(d);
  } else {
    var c = b.split(":")[1];
    getContainer("#" + c).doRestore();
  }
}

function getLocalCache(a) {
  var c = window.localStorage;
  var b = null;
  if (c) {
    b = c[a];
  }
  return b;
}
window.contentHasChanged = false;

function setContentHasChanged() {
  window.contentHasChanged = true;
}

function reSetContentChangeState() {
  window.contentHasChanged = false;
}

function setFrameContent(a) {
  if (window.contentHasChanged) {
    require("confirmdialog", function() {
      ConfirmDialogComp.showDialog(trans("ml_confirm_pageHasChanged"), changeFrameContent, null, a, null);
    });
  } else {
    changeFrameContent(a);
  }
}

function changeFrameContent(c) {
  reSetContentChangeState();
  var f = c.iframeId;
  var a = c.frameURL;
  var k = c.needScroll;
  var g = c.pagecard;
  var j = c.title;
  if (window.$adjustFrameId == f) {
    window.$adjustFrameId = "";
  }
  var b = $("#" + f);
  try {
    b[0].contentWindow.showDefaultLoadingBar();
  } catch (d) {}
  b.attr("src", "about:blank");
  var h = k ? "yes" : "no";
  b.attr("scrolling", h);
  if (k) {
    if (b.attr("minheight")) {
      b.height(parseInt(b.attr("minheight")));
    }
  } else {
    if (b.attr("fullHeight")) {
      b.height(parseInt(b.attr("fullHeight")));
    }
  }
  b.attr("src", a);
  if (g != null && g != "") {
    $("#menutd").find("li").attr("class", "");
    $("#" + g).attr("class", "current");
    initMoreMenu();
  }
  if (j != null && j != "") {
    document.title = j;
  }
}

function MFSendRedirect(b, c) {
  var g = $("[funcode=" + c + "]");
  if (g && g.length > 0) {
    var a = $(g[0]);
    var d = a.attr("funurl");
    a.attr("funurl", b);
    try {
      a.click();
    } catch (f) {}
    a.attr("funurl", d);
  }
}
var $tabs;
var $dialog;
var portlet2SystemStore = {};
var portlet2TabStore = {};
var auth_tab_counter = 1;

function showAuthDialog(a, d, b, c) {
  if (!$tabs || !$dialog) {
    initAuthDialog();
  }
  $("#authDialog").dialog();
  var e = portlet2SystemStore[d + c];
  if (!e) {
    $tabs.tabs("add", "#tabs-" + auth_tab_counter, a);
    $("div#tabs-" + auth_tab_counter + ".ui-tabs-panel").append('<iframe frameborder="0" width="100%" height="200" src="' + ROOT_PATH + "/core/uimeta.jsp?pageId=credential&model=nc.portal.sso.pagemodel.CredentialEditPageModel&wmode=dialog&portletId=" + b + "&systemCode=" + d + "&sharelevel=" + c + '"> </iframe>');
    portlet2TabStore[d + c] = auth_tab_counter;
    auth_tab_counter++;
    portlet2SystemStore[d + c] = new Array(b);
  } else {
    if (jQuery.inArray(b, e) == -1) {
      e.push(b);
    }
  }
}

function initAuthDialog() {
  $(document.body).append('<div id="authDialog" title="帐户关联"><div id="authTabs"><ul></ul></div></div>');
  $tabs = $("#authTabs").tabs({
    tabTemplate: "<li><a href='#{href}'>#{label}</a> </li>"
  });
  $dialog = $("#authDialog").dialog({
    minWidth: 480,
    maxWidth: 480,
    minHeight: 320,
    maxHeight: 320,
    buttons: {
      完成: function() {
        $(this).dialog("close");
      },
      取消: function() {
        $(this).dialog("close");
      }
    },
    close: function(a, b) {
      $("#authDialog").find("iframe").attr("src", "");
    }
  });
}

function authCorrect(b, f, a) {
  if (!$.isEmptyObject(portlet2SystemStore)) {
    var e = portlet2SystemStore[f + a];
    var c = "removeAuthForm('" + f + "','" + a + "');";
    if (e != null) {
      for (var d = 0; d < e.length; d++) {
        getContainer("#" + e[d]).doView(c);
      }
    }
  } else {
    getContainer("#" + b).doView();
  }
}

function removeAuthForm(f, b) {
  var a = portlet2TabStore[f + b];
  var c = "tabs-" + a;
  var e = $("#authTabs").children("div");
  for (var d = 0; d < e.length; d++) {
    if (e[d].id == c) {
      $tabs.tabs("remove", d);
    }
  }
  if ($("#authTabs").children("div").length == 0) {
    $dialog.dialog("close");
  }
}

function hideFrame() {
  $outer = $("[tp=framelayout]");
  $outer.show();
  if ($("#coverFrame_system").length > 0) {
    $("#coverFrame_system").find("iframe")[0].src = "";
    $("#coverFrame_system").hide();
  }
}

function openFrame(d, b) {
  $outer = $("[tp=framelayout]");
  if ($outer.size() <= 0) {
    alert("未配置显示框架!请在页面中选择一个Layout并设置样式为框架布局!");
    return false;
  }
  $outer.hide();
  if ($("#coverFrame_system").length == 0) {
    var a = $outer.height();
    $outer.parent().append('<div id="coverFrame_system"><iframe frameborder="0" width="100%" height="' + a + '"></iframe><div>');
  }
  $("#coverFrame_system").find("[tp=pTitle]").html(d);
  var c = $("#coverFrame_system_iframe");
  c[0].src = b;
  $("#coverFrame_system").show();
  initIframeArea("coverFrame_system_iframe", 0);
}

function openFrameInCurrentPage(d, b) {
  $outer = $("[tp=framelayout]");
  if ($outer.size() <= 0) {
    alert("未配置显示框架!请在页面中选择一个Layout并设置样式为框架布局!");
    return false;
  }
  $outer.hide();
  if ($("#coverFrame_system").length == 0) {
    var a = $outer.height();
    $outer.parent().append('<div id="coverFrame_system"><iframe frameborder="0" width="100%" height="' + a + '"></iframe><div>');
  }
  $("#coverFrame_system").find("[tp=pTitle]").html(d);
  var c = $("#coverFrame_system_iframe");
  c[0].src = b;
  $("#coverFrame_system").show();
  initIframeArea("coverFrame_system_iframe", 0);
}

function showFrameDailog(f, a, c, b, e) {
  if ($("#tsFrame_system").length == 0) {
    $(document.body).append('<div id="tsFrame_system"><iframe scrolling="no" marginheight="0" marginwidth="0" style="border:0px; padding:0;" frameborder="0" width="100%" src=""></iframe><div>');
  }
  $("#tsFrame_system").dialog({
    title: f,
    width: a,
    height: c,
    modal: true,
    beforeclose: function(g, h) {
      if (e == "undefined") {
        return true;
      }
      return e;
    },
    close: function(g, h) {
      $("#tsFrame_system").find("iframe")[0].src = "";
    }
  });
  var d = $("#tsFrame_system").find("iframe");
  d.height($("#tsFrame_system").height() - 5);
  d[0].src = b;
}

function closeFrameDailog() {
  $("#tsFrame_system").dialog("close");
}

function stopDefault(a) {
  if (a.preventDefault) {
    a.preventDefault();
  } else {
    a.returnValue = false;
  }
}

function adjustIFramesHeightOnLoad(b, a) {
  if (a) {
    doAdjustIFrameHeight(b, a);
  } else {
    if (window.doAdjustIFrameHeightFunc) {
      clearTimeout(window.doAdjustIFrameHeightFunc);
    }
    window._tmp_Frame = b;
    window.doAdjustIFrameHeightFunc = window.setTimeout("window.doAdjustIFrameHeight()", 500);
  }
}

function doAdjustIFrameHeight(c, b) {
  if (!c) {
    c = window._tmp_Frame;
  }
  try {
    var f = getInteger(c.getAttribute("minHeight"), 0);
    if (c.contentWindow.window.document.body != null && c.contentWindow.window.document.body.children && c.contentWindow.window.document.body.children.length > 0) {
      var a = null;
      a = c.contentWindow.window.$("div [name=flowv]");
      var h = c.contentWindow.window.document.body.children[0].scrollHeight;
      if (a != null) {
        var d = getMaxEleHeight(a);
        h = h < d ? d : h;
      }
      if (f < h) {
        c.style.height = (h + "px");
      }
    }
  } catch (g) {}
  if (!b) {
    try {
      window._tmp_Frame = null;
      delete window._tmp_Frame;
    } catch (g) {}
  }
}

function getMaxEleHeight(b) {
  var a = 0;
  for (var c = 0; c < b.length; c++) {
    var d = b[c].offsetHeight;
    if (d > a) {
      a = d;
    }
  }
  return a;
}
var msgcen_curmsgpks = null;
var msgcen_msgetag = null;
var msgcen_swtts = null;

function initMsgTip() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/portal/pt/msgcennum/getMsgNumInfor",
    sync: false,
    cache: false,
    success: function(c) {
      refreshMsgData(c);
      var a = c[0].mesboxint;
      var b = Number(a);
      if (b > 0) {
        window.setInterval("msgCenNum()", b * 60000);
      }
    }
  });
}

function refreshMsgData(c) {
  setImgDig(c[0]);
  msgcen_curmsgpks = c[1].msgpk;
  msgcen_msgetag = c[1].msgetg;
  msgcen_swtts = Number(c[0].mesboxswt);
  clearOldSessionCach();
  var d = c[1].msgs;
  var a = filterMsg(d);
  if (a.length > 0 && -1 != msgcen_swtts) {
    var b = getmsgHtml(a);
    showMsgBox(b);
  }
}

function clearOldSessionCach() {
  var a = msgcen_msgetag.substring(0, msgcen_msgetag.lastIndexOf(":"));
  var b = getMsgCach(a);
  addMsgCach(a, msgcen_msgetag);
  if (b == null || b == "") {
    return;
  }
  if (b && b != msgcen_msgetag) {
    clearMsgCach(b);
  }
}

function getMsgCach(c) {
  if (c == null || c == "") {
    return null;
  }
  var a = null;
  if (IS_IE7 && UserData.init()) {
    var b = msgcen_msgetag.substring(0, msgcen_msgetag.lastIndexOf(":")).toString();
    a = UserData.load(b, c);
  } else {
    a = getLocalCache(c);
  }
  return a;
}

function addMsgCach(c, a) {
  if (c == null || c == "") {
    return;
  }
  if (IS_IE7 && UserData.init()) {
    var b = msgcen_msgetag.substring(0, msgcen_msgetag.lastIndexOf(":")).toString();
    UserData.save(b, c, a);
  } else {
    createClientCache(c, a);
  }
}

function updateMsgCach(b, c) {
  if (b == null || b == "") {
    return;
  }
  var a = msgcen_msgetag.substring(0, msgcen_msgetag.lastIndexOf(":")).toString();
  if (IS_IE7 && UserData.init() && UserData.exist(a, b)) {
    UserData.remove(a);
    UserData.save(a, b, c);
  } else {
    createClientCache(b, c);
  }
}

function clearMsgCach(b) {
  if (b == null || b == "") {
    return;
  }
  var a = msgcen_msgetag.substring(0, msgcen_msgetag.lastIndexOf(":")).toString();
  if (IS_IE7 && UserData.init() && UserData.exist(a, b)) {
    UserData.remove(a);
  } else {
    var c = window.localStorage;
    if (c) {
      c.removeItem(b);
    }
  }
}

function msgCenNum() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/portal/pt/msgcennum/getMsgNumInfor",
    data: "",
    sync: false,
    cache: false,
    success: function(a) {
      refreshMsgData(a);
    }
  });
}

function filterMsg(d) {
  var c = getMsgCach(msgcen_msgetag);
  if (c == null || c == "") {
    return d;
  }
  var e = new Array();
  var b = new Array();
  for (var a = 0; a < d.length; a++) {
    if (c.indexOf(d[a].pk) == -1) {
      e.push(d[a]);
      b.push(d[a].pk);
    }
  }
  clearUnUsedPksCach(c);
  msgcen_curmsgpks = b.join(":");
  return e;
}

function clearUnUsedPksCach(b) {
  var c = new Array();
  var e = b.split(":");
  for (var a = 0; a < e.length; a++) {
    if (msgcen_curmsgpks.indexOf(e[a]) != -1) {
      c.push(e[a]);
    }
  }
  if (c.length < e.length) {
    var d = c.join(":");
    updateMsgCach(msgcen_msgetag, d);
  }
}

function getmsgHtml(n) {
  var o = $ce("DIV");
  o.className = "banner";
  o.id = "banner";
  for (var f = 0; f < n.length; f++) {
    var r = $ce("table");
    r.id = "table_" + f;
    var m = $ce("tr");
    var c = $ce("td");
    c.style.color = "#333333";
    c.innerHTML = n[f].sender;
    m.appendChild(c);
    r.appendChild(m);
    var g = $ce("tr");
    var e = $ce("td");
    var k = $ce("div");
    k.className = "title_div";
    var a = $ce("a");
    a.title = n[f].title;
    a.id = n[f].pk + ":" + n[f].pluginid;
    a.innerHTML = substrb(n[f].title, 66);
    k.appendChild(a);
    e.appendChild(k);
    g.appendChild(e);
    r.appendChild(g);
    var l = $ce("tr");
    var h = $ce("td");
    h.style.textAlign = "right";
    var b = $ce("div");
    b.id = "divLeftBtn_" + f;
    b.className = "divLeftBtn";
    var j = $ce("div");
    j.className = "pagenation";
    var d = (f + 1) + "/" + (n.length > 99 ? "99+" : n.length);
    var p = $ce("a");
    p.id = "msgPageA_" + f;
    p.innerHTML = d;
    j.appendChild(p);
    var q = $ce("div");
    q.id = "divRightBtn_" + f;
    q.className = "divRightBtn";
    h.appendChild(b);
    h.appendChild(j);
    h.appendChild(q);
    l.appendChild(h);
    r.appendChild(l);
    o.appendChild(r);
  }
  return o.outerHTML;
}
var UserData = {
  isinit: false,
  init: function() {
    try {
      if (!UserData.isinit) {
        document.documentElement.addBehavior("#default#userdata");
        UserData.isinit = true;
      }
      return UserData.isinit;
    } catch (a) {
      return false;
    }
  },
  save: function(user, key, tva) {
    try {
      user = user.replace(/:/g, "_");
      key = key.replace(/:/g, "_");
      var ex;
      if (!tva) {
        tva = key;
        key = user;
        user = "defaultUser";
      }
      with(document.documentElement) {
        load(user);
        expires = new Date(new Date() - (-86400000)).toGMTString();
        setAttribute(key, tva);
        save(user);
      }
    } catch (error) {}
  },
  load: function(user, key) {
    try {
      user = user.replace(/:/g, "_");
      key = key.replace(/:/g, "_");
      if (!key) {
        key = user;
        user = "defaultUser";
      }
      var ex;
      with(document.documentElement) {
        load(user);
        return getAttribute(key);
      }
    } catch (error) {
      return null;
    }
  },
  exist: function(a, b) {
    return UserData.load(a, b) != null;
  },
  remove: function(user) {
    user = user.replace(/:/g, "_");
    try {
      var ex;
      if (!user) {
        user = "defaultUser";
      }
      with(document.documentElement) {
        load(user);
        expires = new Date(new Date() - 86400000).toGMTString();
        save(user);
      }
    } catch (error) {}
  }
};

function MessageCompAfterClose(b) {
  if (b == "msgcen_messageComp") {
    var a = getMsgCach(msgcen_msgetag);
    if (a != null && a != "") {
      a = a + ":" + msgcen_curmsgpks;
      updateMsgCach(msgcen_msgetag, a);
    } else {
      a = msgcen_curmsgpks;
      addMsgCach(msgcen_msgetag, a);
    }
  }
}

function setImgDig(b) {
  var a = document.getElementById("number_digit");
  if (a) {
    a.className = "number_" + b.onerowcs + "_digit";
    a.innerHTML = b.count;
  }
}

function substrb(d, e) {
  var c = /[^\x00-\xff]/g;
  if (d.replace(c, "mm").length <= e) {
    return d;
  }
  var a = Math.floor(e / 2);
  for (var b = a; b < d.length; b++) {
    if (d.substr(0, b).replace(c, "mm").length >= e) {
      return d.substr(0, b) + "...";
    }
  }
  return d;
}

function showMsgBox(e) {
  if (e == null || e == "") {
    return;
  }
  var c = "msgcen_messageComp";
  var d = window.objects[c];
  if (d && d.Div_gen.style.display == "block") {
    d.setText(e);
    startDynSwitch();
    return;
  }
  var b = document.body.scrollWidth;
  var a = 0;
  if (b > 1200) {
    a = (b - 1200) / 2;
  }
  if (d) {
    d.showMsg();
    d.setText(e);
  } else {
    showMessage(e, {
      showPosition: "bottom-right",
      hasImg: false,
      width: "260",
      height: "100",
      isOpacity: false,
      isNew: true,
      id: c,
      x: a - 25
    });
  }
}

function startDynSwitch() {
  if (window.msgcen_interval) {
    clearInterval(window.msgcen_interval);
  }
  if (!window.msgcen_msg && window.msgcen_msg != 0) {
    window.msgcen_msg = -1;
  }
  $("#banner").msgbox(msgcen_swtts * 1000);
}
jQuery.fn.extend({
  msgbox: function(d) {
    var h = "#" + $(this).attr("id");
    var b = -1;
    var f = "divLeftBtn_mouseover";
    var g = "divRightBtn_mouseover";
    var e = $(h + " table").find("div[id^='divRightBtn_'],div[id^='divLeftBtn_']");
    e.click(function(k) {
      k.stopPropagation();
      var j = $(this).attr("id");
      var l = $(h + " table").length;
      b = parseInt(j.split("_")[1], 10);
      if ((b == (l - 1) || b == 98) && window.objects.msgcen_messageComp) {
        clearInterval(window.msgcen_interval);
      }
      if (j.indexOf("divLeftBtn") > -1) {
        window.msgcen_msg = b - 1 > -1 ? (b - 1) : 0;
      }
      if (j.indexOf("divRightBtn") > -1) {
        window.msgcen_msg = b + 1 > (l - 1) ? 0 : (b + 1);
      }
      a();
    });
    e.mouseover(function(k) {
      var j = $(this).attr("id");
      if (j.split("_")[0] == "divLeftBtn") {
        $(this).addClass(f);
      } else {
        $(this).addClass(g);
      }
    });
    e.mouseout(function(k) {
      var j = $(this).attr("id");
      if (j.split("_")[0] == "divLeftBtn") {
        $(this).removeClass(f);
      } else {
        $(this).removeClass(g);
      }
    });
    $("#banner").find(".title_div a").click(function(j) {
      openMsg("TITLE_CLICK", $(this).attr("id").split(":")[0], $(this).attr("id").split(":")[1]);
    });
    $("#banner").find("a[id^='msgPageA_']").click(function(j) {
      openPublicPortlet("pint", "MsgCenterPopupPortlet", 800, 580);
    });
    window.msgcen_interval = setInterval(c, d);
    $(this).hover(function() {
      clearInterval(window.msgcen_interval);
    }, function() {
      window.msgcen_interval = setInterval(c, d);
    });

    function c() {
      var j = $(h + " table").length;
      if ((window.msgcen_msg == (j - 1) || window.msgcen_msg == 98) && window.objects.msgcen_messageComp) {
        clearInterval(window.msgcen_interval);
        $("#table_" + window.msgcen_msg).show();
        return;
      }
      b = window.msgcen_msg;
      window.msgcen_msg = window.msgcen_msg >= (j - 1) ? 0 : ++window.msgcen_msg;
      a();
    }

    function a() {
      var j = $("#table_" + b);
      var k = $("#table_" + window.msgcen_msg);
      if (b == -1) {
        k.fadeIn(1000);
      } else {
        j.fadeOut(500);
        window.setTimeout(function() {
          j.hide();
          k.fadeIn(1000);
        }, 500);
      }
    }
    c();
  }
});

function MessageCompAfterShow(b) {
  if (b == "msgcen_messageComp") {
    var a = window.objects[b];
    a.bgLeftTopDiv.className = "portal_bg_left_top_div";
    a.bgCenterTopDiv.className = "portal_bg_center_top_div";
    a.bgRightTopDiv.className = "portal_bg_right_top_div";
    a.bgLeftCenterDiv.className = "portal_bg_left_center_div";
    a.bgCenterDiv.className = "portal_bg_center_div";
    a.bgRightCenterDiv.className = "portal_bg_right_center_div";
    a.bgLeftBottomDiv.className = "portal_bg_left_bottom_div";
    a.bgCenterBottomDiv.className = "portal_bg_center_bottom_div";
    a.bgRightBottomDiv.className = "portal_bg_right_bottom_div";
    a.closeImg.className = "portal_message_close_img";
    a.closeImg.onmouseover = function() {
      this.className = "portal_message_close_img_over";
    };
    a.closeImg.onmouseout = function() {
      this.className = "portal_message_close_img";
    };
    a.closeImg.style.top = "10px";
    a.closeImg.style.right = "10px";
    if ($("#banner").length > 0) {
      startDynSwitch();
    }
  }
}

function openMsg(d, c, a) {
  var b = new ServerProxy(null, null, true);
  b.addParam("clc", "nc.uap.portal.msg.ctrl.MainController");
  b.addParam("m_n", "doCmd");
  b.addParam("pk", c);
  b.addParam("cmd", d);
  b.addParam("pluginid", a);
  b.execute();
  setTimeout(function() {
    try {
      msgCenNum();
    } catch (f) {}
  }, 300);
}

function openPublicPortlet(d, c, a, e, f) {
  var b = "/portal/app/msg?nodecode=11110105&lrid=1";
  if (f) {
    b = b + "&category=" + f;
  }
  showDialog(b, trans("ml_openPublicPortlet_title"), a, e, c, "", {
    isShowLine: false
  }, null);
  var g = "$modalDialog" + (showDialog.dialogCount - 1);
  var j = new Listener("beforeClose");
  j.func = function() {
    msgCenNum();
  };
  window[g].addListener(j);
}

function setPublicPortletTitle(b) {
  var c = this.id.split("_");
  var a = c[2] + "_" + c[3] + "_PF";
  $("#" + a).dialog({
    title: b
  });
}

function addEventHandler(b, c, a) {
  if (b.addEventListener) {
    b.addEventListener(c, a, true);
  } else {
    if (b.attachEvent) {
      b.attachEvent("on" + c, a);
    } else {
      b["on" + c] = a;
    }
  }
}

function getElementsByName_iefix(e, b, c) {
  var d = e.getElementsByTagName(b);
  var a = new Array();
  for (i = 0, iarr = 0; i < d.length; i++) {
    att = d[i].getAttribute("name");
    if (att == c) {
      a[iarr] = d[i];
      iarr++;
    }
  }
  return a;
}

function getRequest(b) {
  if (!b) {
    b = location.search;
  }
  var a = new Object();
  if (b.indexOf("?") != -1) {
    var d = b.substring(b.indexOf("?") + 1);
    strs = d.split("&");
    for (var c = 0; c < strs.length; c++) {
      a[strs[c].split("=")[0]] = unescape(strs[c].split("=")[1]);
    }
  }
  return a;
}
var ncNodeAppletMap = new HashMap();
var systemid_defVal = "local";

function initFloatMenu() {
  $(".floatmenu").find("a").click(function() {
    var c = $(this).attr("isFun");
    var o = $(this).attr("isnewpage");
    if (c == "1") {
      var a = $(this).attr("funURL");
      if (o && o == "N") {
        var q = $(this).parents("[menu=t]");
        var u = new Array();
        u.push($(this).attr("title"));
        for (var p = 0; p < q.length; p++) {
          u.push($(q[p]).attr("title"));
        }
        var d = window.pargeCard;
        u.push($("#" + d).find("span").html());
        openFrame(u.join(",,,"), a, d);
      } else {
        if ((a.startWith("/") && a.indexOf("systemCode=NC") == -1) || a.startWith("http://") || a.startWith("https://")) {
          window.open(a);
        } else {
          if (a.indexOf("systemCode=") != -1) {
            systemid_defVal = getRequest(a)["systemCode"];
          } else {
            systemid_defVal = "local";
          }
          var t = false;
          if (a.startWith("app/mockapp/ncnode") && ncNodeAppletMap.containsKey(systemid_defVal)) {
            t = true;
          }
          if (a.startWith("/portal/pt/integr/nodes") && a.indexOf("systemCode=NC") != -1 && ncNodeAppletMap.containsKey(systemid_defVal)) {
            t = true;
          }
          if (t) {
            var b = ncNodeAppletMap.get("ch_do_" + systemid_defVal);
            if (b.closed) {
              ncNodeAppletMap.remove(systemid_defVal);
              ncNodeAppletMap.remove("ch_do_" + systemid_defVal);
            } else {
              var f = ncNodeAppletMap.get(systemid_defVal);
              var j = getRequest(a)["nodeId"];
              if (!j) {
                j = getRequest(a)["node"];
              }
              if (!j) {
                j = getRequest(a)["nodecode"];
              }
              f.callNC("nc.uap.lfw.applet.NCNodeOpener", "appletTabItem", j);
              b.focus();
              return;
            }
          }
          var n = window.screen.availWidth - 30;
          var l = window.screen.availHeight - 30;
          var s = window.screen.availWidth;
          var m = window.screen.availHeight;
          var e = s > n ? (s - n) / 2 : 0;
          var k = m > l ? (m - l) / 2 : 0;
          var h = "width=" + s + ",height=" + m + ",left=" + e + ",top=" + k;
          var r = a;
          if (!r.startWith("/")) {
            r = ROOT_PATH + "/" + a;
          }
          var g = window.open(r, "_blank");
          ncNodeAppletMap.put("ch_do_" + systemid_defVal, g);
        }
      }
    }
  });
  $(".floatmenu").find("a").each(function(b) {
    var d = $(this).attr("isFun");
    var c = $(this).attr("pkFunnode");
    var f = $(this).attr("title");
    var e = $(this).attr("pk_menuitem");
    if (d == "1") {
      if (IS_IPAD) {
        $(this).parent().bind("touchend", function() {
          changeLinkBtn = "true";
          hideOrShowImg($(this));
        });
      } else {
        $(this).parent().bind("mouseover mouseout", function() {
          hideOrShowImg($(this).parent());
        });
      }
      if ($(this).next().length > 0) {
        var a = $(this).next().attr("src");
        if (a.indexOf("add") != -1) {
          $(this).next().click(function() {
            addFrqtItem(c, e, f);
          });
        }
        if (a.indexOf("delete") != -1) {
          $(this).next().click(function() {
            callServer("/portal/pt/deleteMenu/deleteOftenMenu?pk=" + c);
          });
        }
      }
    }
  });
}

function callServer(a) {
  if (window.sys_DownFileFrame == null) {
    var b = $ce("iframe");
    b.frameborder = 0;
    b.vspace = 0;
    b.hspace = 0;
    b.style.width = "1px";
    b.style.heigh = 0;
    window.sys_DownFileFrame = b;
    document.body.appendChild(window.sys_DownFileFrame);
  }
  window.sys_DownFileFrame.src = a;
}

function compressContent(b) {
  preCompressContent();
  if (window.compressObj) {
    try {
      return window.compressObj.compress(b);
    } catch (a) {
      return null;
    }
  }
  return null;
}

function preCompressContent() {
  if (window.compressObjSign == null) {
    window.compressObjSign = 1;
    var h = document.createElement("DIV");
    h.id = "compressDivContent";
    document.body.appendChild(h);
    try {
      var b = "0.0.0";
      var f = "";
      var a = {};
      var g = {};
      g.allowscriptaccess = "always";
      var c = {};
      c.id = "Compress";
      c.name = "Compress";
      c.align = "middle";
      swfobject.embedSWF("/lfw/frame/device_pc/script/ui/external/Compress.swf", "compressDivContent", "0", "0", b, f, a, g, c);
    } catch (d) {}
  }
}

function compressPluginReady() {
  window.compressObj = document.getElementById("Compress");
  window.compressObj.style.position = "absolute";
  window.compressObj.style.right = "0px";
  window.compressObj.style.top = "0px";
}

function adjustNCFrame(a) {
  window.$adjustFrameId = a;
}

function setContentVisible(a) {
  var c = window.$adjustFrameId;
  if (c && typeof(c) != "undefined" && "" != c) {
    var b = $("#" + c);
    if (b) {
      if (a) {
        b.width("100%");
        b.css("float", "");
      } else {
        b.width("1px");
        b.css("float", "left");
      }
    }
  }
}

function _pt_defaultCreatePart(c, a) {
  var b = $('<li><a href="' + a + '">' + c + "</a></li>");
  b.appendTo($(this).find("[tp='pPart']"));
  return b;
}

function _pt_defaultCreateSep() {
  var a = "|";
  if (arguments.length == 1) {
    a = arguments[0];
  }
  var b = $("<li><a>" + a + "</a></li>");
  b.appendTo($(this).find("[tp='pPart']"));
  return b;
}

function _pt_defaultCreateBlankPart() {
  var a = $("<li></li>");
  a.appendTo($(this).find("[tp='pPart']"));
  return a;
}

function _pt_defaultSetMode(a) {}

function _pt_defaultSetTitle(a) {
  return $(this).find("[tp='pTitle']").html(a);
}

function _pt_defaultSetContent(a) {
  return $(this).find("[tp='pBody']").html(a);
}

function _pt_defaultSetExposed() {
  var b = $(this);
  if (this.clsName == undefined) {
    this.clsName = b.attr("class");
  }
  b.attr("class", "margeach");
  var a = b.find("[tp=pHead]");
  a.children().hide();
  a.attr("oheight", a.height());
  a.height(3);
  b.find("[tp=intine]").parent().prevAll().hide();
  b.find("[tp=intine]").parent().nextAll().hide();
  return this;
}

function _pt_defaultSetUnExposed() {
  var b = $(this);
  b.attr("class", this.clsName);
  var a = b.find("[tp=pHead]");
  a.children().show();
  a.height(a.attr("oheight"));
  b.find("[tp=intine]").parent().prevAll().show();
  b.find("[tp=intine]").parent().nextAll().show();
  return b;
}

function getScrollTop() {
  var a = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    a = document.documentElement.scrollTop;
  } else {
    if (document.body) {
      a = document.body.scrollTop;
    }
  }
  return a;
}

function _pt_defaultShowTips() {
  var h = $(this);
  var g = $("#tipspanel");
  g.attr("portletid", h.attr("id"));
  var b = h.position().left - g.width() + h.width();
  var l = 0;
  var e = h.find("[tp=pHead]").height();
  if (e > g.height()) {
    l = h.position().top + (e - g.height()) / 2;
  } else {
    l = h.position().top - g.height() + e;
  }
  l = l - getScrollTop();
  g.css({
    left: b,
    top: l
  });
  var f = g.find("[tp=pmodes]");
  f.empty();
  var c = this.getSupportModes();
  for (var k in c) {
    if (!isNaN(k)) {
      var d = c[k].toLowerCase();
      if (jQuery.inArray(d, NCPortalSupportPortletMode) != -1 && this.getCurrentMode() != d) {
        var a = "_toolbar_" + d + "()";
        var j = NCPortalSupportPortletModeName[d];
        f.append(" <a href='javascript:" + a + "'>" + j + "</a> ");
      }
    }
  }
  if (CUR_PPAGE_READONLY != "true") {
    f.append(" <a href='javascript:deletePortlet();' ><img src='/portal/frame/themes/" + PAGE_THEME_ID + "/homepage/moving_panel/icon/pp_close.png'></a>");
  }
  g.show();
  tipShowFlag = true;
  currentTipMeta = h.attr("id");
}

function _pt_defaultHideTips() {
  var a = $(this);
  var b = $("#tipspanel");
  b.hide();
  tipShowFlag = false;
  currentTipMeta = "";
}

function _toolbar_view() {
  if (currentTipMeta != "") {
    var a = getContainer("#" + currentTipMeta);
    a.doView(function() {
      getContainer("#" + currentTipMeta).hideTips();
    });
  }
}

function _toolbar_edit() {
  if (currentTipMeta != "") {
    var a = getContainer("#" + currentTipMeta);
    a.doEdit(function() {
      getContainer("#" + currentTipMeta).hideTips();
    });
  }
}

function _toolbar_help() {
  if (currentTipMeta != "") {
    var a = getContainer("#" + currentTipMeta);
    a.doHelp(function() {
      getContainer("#" + currentTipMeta).hideTips();
    });
  }
}

function changePortletTheme() {
  var b = $("#tipspanel").attr("portletid");
  var d = $("#" + b);
  var a = d.attr("pid");
  var e = getActionParam(b);
  e.pid = a;
  var c = "/portal/app/mockapp/cdref?model=nc.uap.portal.comm.setting.SetMorePageModel";
  c = c + "&portlet=" + b + "&pid=" + a + "&settype=portletskin";
  window.showDialog(c, trans("ml_changePortletTheme_title"), 400, 270, a, null, null, null, {
    isShowLine: false
  });
}

function setRequestParam(a) {
  var b = location.search;
  if (b.indexOf("?") != -1) {
    var d = b.substr(1);
    strs = d.split("&");
    for (var c = 0; c < strs.length; c++) {
      a[strs[c].split("=")[0]] = unescape(strs[c].split("=")[1]);
    }
  }
  return a;
}

function deletePortlet() {
  showConfirmDialog("是否删除此Portlet?", function() {
    var ptid = $("#tipspanel").attr("portletid");
    var ctr = $("#" + ptid);
    var pid = ctr.attr("pid");
    var param = getActionParam(ptid);
    param.pid = pid;
    $.ajax({
      type: "GET",
      url: ROOT_PATH + "/pt/home/doDelPortlet",
      data: param,
      cache: false,
      success: function(data) {
        var d = eval(data)[0];
        if (d && typeof d == "object") {
          alert(d.msg);
          if (d.err == 0) {
            document.location.reload();
          }
        }
      }
    });
  }, null, null, null, null, "确定", "取消", "删除提醒");
}

function _pt_getOuter() {
  return $("[tp='layout']").filter(function(a) {
    return $(this).parents("[tp='layout']").length < 1;
  });
}

function _pt_getSelfLayout() {}

function _pt_getRow() {
  return $(this).parent("[tp='layout']");
}

function _pt_doView(b) {
  var a = $(this).attr("id");
  var d = getActionParam(a);
  var c = ROOT_PATH + ACTION_URL;
  openPortlet(c, d, b);
}

function _pt_doRestore(b) {
  var a = $(this).attr("id");
  var d = getActionParam(a);
  d[PORTLET_MODE] = "restore";
  d.if_src_type = "src";
  setRequestParam(d);
  var c = ROOT_PATH + ACTION_URL;
  openPortlet(c, d);
}

function _pt_doEdit(b) {
  var a = $(this).attr("id");
  var d = getActionParam(a);
  d[PORTLET_MODE] = "edit";
  var c = ROOT_PATH + ACTION_URL;
  openPortlet(c, d, b);
}

function _pt_doHelp(b) {
  var a = $(this).attr("id");
  var d = getActionParam(a);
  d[PORTLET_MODE] = "help";
  var c = ROOT_PATH + ACTION_URL;
  openPortlet(c, d, b);
}

function _pt_doRefresh(b) {
  var a = $(this).attr("id");
  refresh_circle[a] = b;
}

function _pt_setSupportModes(a) {
  $(this).data("supportModes", a);
}

function _pt_getSupportModes() {
  return $(this).data("supportModes");
}

function _pt_getCurrentMode() {
  var a = $(this).data("currentMode");
  if (a && a != "") {
    return a;
  } else {
    return "view";
  }
}

function _pt_setCurrentMode(a) {
  return $(this).data("currentMode", a);
}

function _pt_doAction() {
  var d = $(this).attr("id").split("_");
  var h = d[0];
  var b = d[1];
  var a = d[2];
  var c = d[3];
  var e = ROOT_PATH + ACTION_URL;
  var g = arguments.length;
  var f = {};
  if (g == 0) {} else {
    if (g == 1) {
      if ($.isPlainObject(arguments[0])) {
        f = arguments[0];
        if (!f[ACTION_NAME]) {
          f[ACTION_NAME] = "processAction";
        }
        f[PAGE_NAME] = b;
        f[PORTLET_MODULE] = a;
        f[WINDOW_STATE] = "normal";
        f[PORTLET_MODE] = "view";
        f[PAGE_MODULE] = h;
        f[PORTLET_NAME] = c;
      } else {
        f[ACTION_NAME] = "processAction";
        f[PAGE_NAME] = b;
        f[PORTLET_MODULE] = a;
        f[WINDOW_STATE] = "normal";
        f[PORTLET_MODE] = "view";
        f[PAGE_MODULE] = h;
        f[PORTLET_NAME] = c;
        f.frameUrl = arguments[0];
      }
    } else {
      f = arguments[1];
      f[ACTION_NAME] = arguments[0];
      f[PAGE_NAME] = b;
      f[PORTLET_MODULE] = a;
      f[PAGE_MODULE] = h;
      f[PORTLET_NAME] = c;
      if (f[WINDOW_STATE] == null) {
        f[WINDOW_STATE] = "normal";
      }
      if (f[PORTLET_MODE] == null) {
        f[PORTLET_MODE] = "view";
      }
    }
  }
  openPortlet(e, f);
}

function getActionParam(e) {
  var d = e.split("_");
  var g = d[0];
  var b = d[1];
  var a = d[2];
  var c = d[3];
  var f = {};
  f[PAGE_NAME] = b;
  f[PORTLET_MODULE] = a;
  f[PAGE_MODULE] = g;
  f[PORTLET_NAME] = c;
  f[WINDOW_STATE] = "normal";
  f[PORTLET_MODE] = "view";
  return f;
}

function _pt_defaultdoMax() {
  var e = $(this);
  var j = this.getOuter();
  var f = j.height();
  var k = j.width() - 10;
  if (!this.oldWidth) {
    this.oldWidth = e.width();
  }
  if (!this.oldHeight) {
    this.oldHeight = e.height();
  }
  var g = e.height();
  var a = e.find("[tp='pBody']");
  var h = a.height();
  if (!a[0].oldHeight) {
    a[0].oldHeight = h;
  }
  var d = j.find("[tp=portlet]");
  for (var c = 0; c < d.length; c++) {
    var b = getContainer(d[c]);
    b.doHide();
  }
  e.parents("td").siblings().hide();
  e.parents("td").attr("_width", e.parents("td").attr("width"));
  e.parents("td").attr("width", "100%");
  e.show(500);
  e.find("[tp='pHander']").find("a").toggle();
}

function _pt_defaultdoHide() {
  var a = $(this);
  a.hide();
}

function _pt_defaultdoReSize() {
  var b = $(this);
  var a = this.getOuter();
  var d = b.find("[tp='pBody']");
  var c = d[0].oldHeight;
  b.parents("td").attr("width", b.parents("td").attr("_width")), b.parents("td").siblings().show();
  a.find("[tp=portlet]").show(500);
  b.find("[tp='pHander']").find("a").toggle();
}

function _pt_defaultAddDoMaxResize(e) {
  var d = $(this);
  var a = this.id;
  var b = e.toString();
  var c = d.find("[tp='pPart']");
  if (b.indexOf("maximized") != -1) {
    c.append('<li tp="pHander"><a onclick="getContainer(\'#' + a + '\').doMax();" style="display:none"><img src="' + ROOT_PATH + '/images/10.gif" style="border:none;cursor:pointer;"/></a><a onclick="getContainer(\'#' + a + '\').doReSize();"><img src="' + ROOT_PATH + '/images/11.gif" style="border:none;cursor:pointer;"/></a></li>');
  }
}

function getContainer(objId) {
  var _pt_tmp_container = $(objId);
  if (_pt_tmp_container == null) {
    return null;
  }
  var _pt_tmp_container_dom_ = _pt_tmp_container.get(0);
  if (typeof(_pt_tmp_container_dom_.createPart) != "function") {
    var _pt_tmp_createPart = _pt_tmp_container.attr("createPart");
    if (_pt_tmp_createPart != null) {
      _pt_tmp_container_dom_.createPart = eval(_pt_tmp_createPart);
    } else {
      _pt_tmp_container_dom_.createPart = _pt_defaultCreatePart;
    }
  }
  if (typeof(_pt_tmp_container_dom_.createSep) != "function") {
    var _pt_tmp_createSep = _pt_tmp_container.attr("createSep");
    if (_pt_tmp_createSep != null) {
      _pt_tmp_container_dom_.createSep = eval(_pt_tmp_createSep);
    } else {
      _pt_tmp_container_dom_.createSep = _pt_defaultCreateSep;
    }
  }
  if (typeof(_pt_tmp_container_dom_.createBlankPart) != "function") {
    var _pt_tmp_createBlankPart = _pt_tmp_container.attr("createBlankPart");
    if (_pt_tmp_createBlankPart != null) {
      _pt_tmp_container_dom_.createBlankPart = eval(_pt_tmp_createBlankPart);
    } else {
      _pt_tmp_container_dom_.createBlankPart = _pt_defaultCreateBlankPart;
    }
  }
  if (typeof(_pt_tmp_container_dom_.setTitle) != "function") {
    var _pt_tmp_setTitle = _pt_tmp_container.attr("setTitle");
    if (_pt_tmp_setTitle != null) {
      _pt_tmp_container_dom_.setTitle = window[_pt_tmp_setTitle];
    } else {
      _pt_tmp_container_dom_.setTitle = _pt_defaultSetTitle;
    }
  }
  if (typeof(_pt_tmp_container_dom_.setMode) != "function") {
    var _pt_tmp_setMode = _pt_tmp_container.attr("setMode");
    if (_pt_tmp_setMode != null) {
      _pt_tmp_container_dom_.setMode = eval(_pt_tmp_setMode);
    } else {
      _pt_tmp_container_dom_.setMode = _pt_defaultSetMode;
    }
  }
  if (typeof(_pt_tmp_container_dom_.setContent) != "function") {
    var _pt_tmp_setContent = _pt_tmp_container.attr("setContent");
    if (_pt_tmp_setContent != null) {
      _pt_tmp_container_dom_.setContent = eval(_pt_tmp_setContent);
    } else {
      _pt_tmp_container_dom_.setContent = _pt_defaultSetContent;
    }
  }
  if (typeof(_pt_tmp_container_dom_.setExposed) != "function") {
    var _pt_tmp_setExposed = _pt_tmp_container.attr("setExposed");
    if (_pt_tmp_setExposed != null) {
      _pt_tmp_container_dom_.setExposed = eval(_pt_defaultSetExposed);
    } else {
      _pt_tmp_container_dom_.setExposed = _pt_defaultSetExposed;
    }
  }
  if (typeof(_pt_tmp_container_dom_.setUnExposed) != "function") {
    var _pt_tmp_setUnExposed = _pt_tmp_container.attr("setUnExposed");
    if (_pt_tmp_setUnExposed != null) {
      _pt_tmp_container_dom_.setUnExposed = eval(_pt_tmp_setUnExposed);
    } else {
      _pt_tmp_container_dom_.setUnExposed = _pt_defaultSetUnExposed;
    }
  }
  if (typeof(_pt_tmp_container_dom_.doMax) != "function") {
    var _pt_tmp_doMax = _pt_tmp_container.attr("doMax");
    if (_pt_tmp_doMax != null) {
      _pt_tmp_container_dom_.doMax = eval(_pt_tmp_doMax);
    } else {
      _pt_tmp_container_dom_.doMax = _pt_defaultdoMax;
    }
  }
  if (typeof(_pt_tmp_container_dom_.doHide) != "function") {
    var _pt_tmp_doHide = _pt_tmp_container.attr("doHide");
    if (_pt_tmp_doHide != null) {
      _pt_tmp_container_dom_.doHide = eval(_pt_tmp_doHide);
    } else {
      _pt_tmp_container_dom_.doHide = _pt_defaultdoHide;
    }
  }
  if (typeof(_pt_tmp_container_dom_.doReSize) != "function") {
    var _pt_tmp_doReSize = _pt_tmp_container.attr("doReSize");
    if (_pt_tmp_doReSize != null) {
      _pt_tmp_container_dom_.doReSize = eval(_pt_tmp_doReSize);
    } else {
      _pt_tmp_container_dom_.doReSize = _pt_defaultdoReSize;
    }
  }
  if (typeof(_pt_tmp_container_dom_.showTips) != "function") {
    var _pt_tmp_showTips = _pt_tmp_container.attr("showTips");
    if (_pt_tmp_showTips != null) {
      _pt_tmp_container_dom_.showTips = eval(_pt_tmp_showTips);
    } else {
      _pt_tmp_container_dom_.showTips = _pt_defaultShowTips;
    }
  }
  if (typeof(_pt_tmp_container_dom_.hideTips) != "function") {
    var _pt_tmp_hideTips = _pt_tmp_container.attr("hideTips");
    if (_pt_tmp_hideTips != null) {
      _pt_tmp_container_dom_.hideTips = eval(_pt_tmp_hideTips);
    } else {
      _pt_tmp_container_dom_.hideTips = _pt_defaultHideTips;
    }
  }
  if (typeof(_pt_tmp_container_dom_.addDoMaxResize) != "function") {
    var _pt_tmp_addDoMaxResize = _pt_tmp_container.attr("addDoMaxResize");
    if (_pt_tmp_addDoMaxResize != null) {
      _pt_tmp_container_dom_.addDoMaxResize = eval(_pt_tmp_addDoMaxResize);
    } else {
      _pt_tmp_container_dom_.addDoMaxResize = _pt_defaultAddDoMaxResize;
    }
  }
  if (_pt_tmp_container_dom_.doView == null) {
    _pt_tmp_container_dom_.doView = _pt_doView;
  }
  if (_pt_tmp_container_dom_.doRestore == null) {
    _pt_tmp_container_dom_.doRestore = _pt_doRestore;
  }
  if (_pt_tmp_container_dom_.doEdit == null) {
    _pt_tmp_container_dom_.doEdit = _pt_doEdit;
  }
  if (_pt_tmp_container_dom_.doHelp == null) {
    _pt_tmp_container_dom_.doHelp = _pt_doHelp;
  }
  if (_pt_tmp_container_dom_.doRefresh == null) {
    _pt_tmp_container_dom_.doRefresh = _pt_doRefresh;
  }
  if (_pt_tmp_container_dom_.doAction == null) {
    _pt_tmp_container_dom_.doAction = _pt_doAction;
  }
  if (_pt_tmp_container_dom_.getOuter == null) {
    _pt_tmp_container_dom_.getOuter = _pt_getOuter;
  }
  if (_pt_tmp_container_dom_.getRow == null) {
    _pt_tmp_container_dom_.getRow = _pt_getRow;
  }
  if (_pt_tmp_container_dom_.setSupportModes == null) {
    _pt_tmp_container_dom_.setSupportModes = _pt_setSupportModes;
  }
  if (_pt_tmp_container_dom_.getSupportModes == null) {
    _pt_tmp_container_dom_.getSupportModes = _pt_getSupportModes;
  }
  if (_pt_tmp_container_dom_.setCurrentMode == null) {
    _pt_tmp_container_dom_.setCurrentMode = _pt_setCurrentMode;
  }
  if (_pt_tmp_container_dom_.getCurrentMode == null) {
    _pt_tmp_container_dom_.getCurrentMode = _pt_getCurrentMode;
  }
  return _pt_tmp_container_dom_;
}

function updatePageLayout(a) {
  $.get("/portal/pt/home/layout", a);
}(function(a) {
  a.extend({
    container: function(c) {
      var b = a.sha1(c.toString());
      if (document[b]) {} else {
        c.call(this);
        document[b] = -1;
      }
    }
  });
})(jQuery);
(function(f) {
  f.extend({
    sha1: function(j) {
      return d(c(e(j)));
    }
  });

  function c(C) {
    var z = C;
    var A = Array(80);
    var y = 1732584193;
    var v = -271733879;
    var u = -1732584194;
    var s = 271733878;
    var r = -1009589776;
    for (var o = 0; o < z.length; o += 16) {
      var q = y;
      var p = v;
      var n = u;
      var m = s;
      var k = r;
      for (var l = 0; l < 80; l++) {
        if (l < 16) {
          A[l] = z[o + l];
        } else {
          A[l] = h(A[l - 3] ^ A[l - 8] ^ A[l - 14] ^ A[l - 16], 1);
        }
        var B = g(g(h(y, 5), b(l, v, u, s)), g(g(r, A[l]), a(l)));
        r = s;
        s = u;
        u = h(v, 30);
        v = y;
        y = B;
      }
      y = g(y, q);
      v = g(v, p);
      u = g(u, n);
      s = g(s, m);
      r = g(r, k);
    }
    return new Array(y, v, u, s, r);
  }

  function b(k, j, m, l) {
    if (k < 20) {
      return (j & m) | ((~j) & l);
    }
    if (k < 40) {
      return j ^ m ^ l;
    }
    if (k < 60) {
      return (j & m) | (j & l) | (m & l);
    }
    return j ^ m ^ l;
  }

  function a(j) {
    return (j < 20) ? 1518500249 : (j < 40) ? 1859775393 : (j < 60) ? -1894007588 : -899497514;
  }

  function g(j, m) {
    var l = (j & 65535) + (m & 65535);
    var k = (j >> 16) + (m >> 16) + (l >> 16);
    return (k << 16) | (l & 65535);
  }

  function h(j, k) {
    return (j << k) | (j >>> (32 - k));
  }

  function e(l) {
    var j = ((l.length + 8) >> 6) + 1,
      m = new Array(j * 16);
    for (var k = 0; k < j * 16; k++) {
      m[k] = 0;
    }
    for (k = 0; k < l.length; k++) {
      m[k >> 2] |= l.charCodeAt(k) << (24 - (k & 3) * 8);
    }
    m[k >> 2] |= 128 << (24 - (k & 3) * 8);
    m[j * 16 - 1] = l.length * 8;
    return m;
  }

  function d(l) {
    var k = 0 ? "0123456789ABCDEF" : "0123456789abcdef";
    var m = "";
    for (var j = 0; j < l.length * 4; j++) {
      m += k.charAt((l[j >> 2] >> ((3 - j % 4) * 8 + 4)) & 15) + k.charAt((l[j >> 2] >> ((3 - j % 4) * 8)) & 15);
    }
    return m;
  }
})(jQuery);
(function(a) {
  a.baseball = function(n) {
    var f = a(n.accepter),
      g = [],
      h, q = {},
      j = a("<div style='position:absolute;height:10px;border:4px dashed;overflow:hidden; background:#D7F6FA'></div>"),
      w, l, c, e, x = true,
      b = function(m) {
        m.stopPropagation();
        m.preventDefault();
        q = {
          ex: m.clientX,
          ey: m.clientY + a(document).scrollTop(),
          x: h.position().left,
          y: h.position().top,
          w: h.width(),
          h: h.height()
        };
        a(document).mousemove(d).mouseup(k);
        if (document.body.setCapture) {
          h.get(0).setCapture();
          h.get(0).onmousewheel = s;
        }
      },
      d = function(m) {
        m.preventDefault();
        if (!l) {
          l = true;
          o();
          j.insertBefore(h);
          e = h.get(0);
          w = h.clone().css({
            position: "absolute",
            opacity: 0.5,
            left: q.x,
            top: q.y,
            width: q.w,
            "z-index": 125058687
          }).insertAfter(h);
        }
        r(m.clientX + a(document).scrollLeft(), m.clientY + a(document).scrollTop());
        w.css({
          left: m.clientX - q.ex + q.x,
          top: m.clientY - q.ey + q.y + a(document).scrollTop()
        });
      },
      k = function(m) {
        if (l) {
          var p = new Object();
          p.portletId = a(h).attr("pid");
          p.pageName = CUR_PAGE_NAME;
          p.pageModule = CUR_PPAGE_MODULE;
          var t = false;
          if (q.lonely) {
            h.appendTo(q.lonely);
            p.destinationId = a(q.lonely).attr("pid");
            t = true;
          } else {
            if (e !== h.get(0)) {
              if (x) {
                h.insertBefore(e);
              } else {
                h.insertAfter(e);
              }
              p.destinationId = a(e).attr("pid");
              p.isAfter = !x;
              t = true;
            }
          }
          if (t) {
            updatePageLayout(p);
          }
          j.remove();
          w.remove();
        }
        l = false;
        if (document.body.releaseCapture) {
          h.get(0).releaseCapture();
          h.get(0).onmousewheel = null;
        }
        a(document).unbind("mousemove", d).unbind("mouseup", k);
      },
      o = function() {
        g.length = 0;
        f.each(function(p, t) {
          var m = a(t);
          g.push([m.offset().left, m.width(), u(m), m]);
        });
      },
      u = function(p) {
        var m = [];
        p.find(n.target).each(function(y, B) {
          var t = a(B),
            z = t.offset().top,
            A = t.height();
          m.push([z + A, t.offset().left + t.width() / 2, t.offset().top + A / 2, B]);
        });
        return m;
      },
      r = function(m, C) {
        var B, z, A = Math.PI / 4;
        for (var p = 0, t; t = g[p]; p++) {
          if (m > t[0] && m < t[0] + t[1]) {
            c = t;
            break;
          }
        }
        for (var p = 0, t; t = c[2][p]; p++) {
          if (C < t[0]) {
            B = t;
            break;
          }
        }
        if (c[2].length == 0) {
          j.css({
            width: c[3].width(),
            height: h.height(),
            left: c[3].offset().left,
            top: c[3].offset().top
          });
          q.lonely = c[3];
        } else {
          q.lonely = null;
          if (B == null) {
            B = c[2][c[2].length - 1];
          }
          z = Math.atan2(B[2] - C, m - B[1]) + Math.PI;
          if (z > A && z < 3 * A) {
            v(B[3], 3, false);
          } else {
            if (z > 3 * A && z < 5 * A) {
              v(B[3], 2, false);
            } else {
              if (z > 5 * A && z < 7 * A) {
                v(B[3], 1, true);
              } else {
                v(B[3], 4, true);
              }
            }
          }
        }
      },
      v = function(p, t, m) {
        if (t == 1) {
          j.css({
            width: a(p).width(),
            height: a(p).height(),
            left: a(p).offset().left,
            top: a(p).offset().top - 4
          });
        } else {
          if (t == 2) {
            j.css({
              width: a(p).width(),
              height: a(p).height(),
              left: a(p).offset().left,
              top: a(p).offset().top - 4
            });
          } else {
            if (t == 3) {
              j.css({
                width: a(p).width(),
                height: a(p).height(),
                left: a(p).offset().left,
                top: a(p).offset().top + a(p).height()
              });
            } else {
              j.css({
                width: a(p).width(),
                height: a(p).height(),
                left: a(p).offset().left,
                top: a(p).offset().top
              });
            }
          }
        }
        if (p == e && x === m) {
          return false;
        }
        e = p;
        x = m;
      },
      s = function() {
        window.scrollTo(0, document.documentElement.scrollTop - window.event.wheelDelta / 4);
      };
    f.find(n.target).each(function(m, p) {
      (n.handle ? a(p).find(n.handle) : a(p)).mousedown(function(t) {
        h = a(p);
        b(t);
      });
    });
  };
})(jQuery);
var swfobject = function() {
  var aq = "undefined",
    aD = "object",
    ab = "Shockwave Flash",
    X = "ShockwaveFlash.ShockwaveFlash",
    aE = "application/x-shockwave-flash",
    ac = "SWFObjectExprInst",
    ax = "onreadystatechange",
    af = window,
    aL = document,
    aB = navigator,
    aa = false,
    Z = [aN],
    aG = [],
    ag = [],
    al = [],
    aJ, ad, ap, at, ak = false,
    aU = false,
    aH, an, aI = true,
    ah = function() {
      var a = typeof aL.getElementById != aq && typeof aL.getElementsByTagName != aq && typeof aL.createElement != aq,
        e = aB.userAgent.toLowerCase(),
        c = aB.platform.toLowerCase(),
        h = c ? /win/.test(c) : /win/.test(e),
        k = c ? /mac/.test(c) : /mac/.test(e),
        g = /webkit/.test(e) ? parseFloat(e.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
        d = !+"\v1",
        f = [0, 0, 0],
        l = null;
      if (typeof aB.plugins != aq && typeof aB.plugins[ab] == aD) {
        l = aB.plugins[ab].description;
        if (l && !(typeof aB.mimeTypes != aq && aB.mimeTypes[aE] && !aB.mimeTypes[aE].enabledPlugin)) {
          aa = true;
          d = false;
          l = l.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
          f[0] = parseInt(l.replace(/^(.*)\..*$/, "$1"), 10);
          f[1] = parseInt(l.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
          f[2] = /[a-zA-Z]/.test(l) ? parseInt(l.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
        }
      } else {
        if (typeof af.ActiveXObject != aq) {
          try {
            var j = new ActiveXObject(X);
            if (j) {
              l = j.GetVariable("$version");
              if (l) {
                d = true;
                l = l.split(" ")[1].split(",");
                f = [parseInt(l[0], 10), parseInt(l[1], 10), parseInt(l[2], 10)];
              }
            }
          } catch (b) {}
        }
      }
      return {
        w3: a,
        pv: f,
        wk: g,
        ie: d,
        win: h,
        mac: k
      };
    }(),
    aK = function() {
      if (!ah.w3) {
        return;
      }
      if ((typeof aL.readyState != aq && aL.readyState == "complete") || (typeof aL.readyState == aq && (aL.getElementsByTagName("body")[0] || aL.body))) {
        aP();
      }
      if (!ak) {
        if (typeof aL.addEventListener != aq) {
          aL.addEventListener("DOMContentLoaded", aP, false);
        }
        if (ah.ie && ah.win) {
          aL.attachEvent(ax, function() {
            if (aL.readyState == "complete") {
              aL.detachEvent(ax, arguments.callee);
              aP();
            }
          });
          if (af == top) {
            (function() {
              if (ak) {
                return;
              }
              try {
                aL.documentElement.doScroll("left");
              } catch (a) {
                setTimeout(arguments.callee, 0);
                return;
              }
              aP();
            })();
          }
        }
        if (ah.wk) {
          (function() {
            if (ak) {
              return;
            }
            if (!/loaded|complete/.test(aL.readyState)) {
              setTimeout(arguments.callee, 0);
              return;
            }
            aP();
          })();
        }
        aC(aP);
      }
    }();

  function aP() {
    if (ak) {
      return;
    }
    try {
      var b = aL.getElementsByTagName("body")[0].appendChild(ar("span"));
      b.parentNode.removeChild(b);
    } catch (a) {
      return;
    }
    ak = true;
    var d = Z.length;
    for (var c = 0; c < d; c++) {
      Z[c]();
    }
  }

  function aj(a) {
    if (ak) {
      a();
    } else {
      Z[Z.length] = a;
    }
  }

  function aC(a) {
    if (typeof af.addEventListener != aq) {
      af.addEventListener("load", a, false);
    } else {
      if (typeof aL.addEventListener != aq) {
        aL.addEventListener("load", a, false);
      } else {
        if (typeof af.attachEvent != aq) {
          aM(af, "onload", a);
        } else {
          if (typeof af.onload == "function") {
            var b = af.onload;
            af.onload = function() {
              b();
              a();
            };
          } else {
            af.onload = a;
          }
        }
      }
    }
  }

  function aN() {
    if (aa) {
      Y();
    } else {
      am();
    }
  }

  function Y() {
    var d = aL.getElementsByTagName("body")[0];
    var b = ar(aD);
    b.setAttribute("type", aE);
    var a = d.appendChild(b);
    if (a) {
      var c = 0;
      (function() {
        if (typeof a.GetVariable != aq) {
          var e = a.GetVariable("$version");
          if (e) {
            e = e.split(" ")[1].split(",");
            ah.pv = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)];
          }
        } else {
          if (c < 10) {
            c++;
            setTimeout(arguments.callee, 10);
            return;
          }
        }
        d.removeChild(b);
        a = null;
        am();
      })();
    } else {
      am();
    }
  }

  function am() {
    var g = aG.length;
    if (g > 0) {
      for (var h = 0; h < g; h++) {
        var c = aG[h].id;
        var m = aG[h].callbackFn;
        var a = {
          success: false,
          id: c
        };
        if (ah.pv[0] > 0) {
          var j = aS(c);
          if (j) {
            if (ao(aG[h].swfVersion) && !(ah.wk && ah.wk < 312)) {
              ay(c, true);
              if (m) {
                a.success = true;
                a.ref = av(c);
                m(a);
              }
            } else {
              if (aG[h].expressInstall && au()) {
                var e = {};
                e.data = aG[h].expressInstall;
                e.width = j.getAttribute("width") || "0";
                e.height = j.getAttribute("height") || "0";
                if (j.getAttribute("class")) {
                  e.styleclass = j.getAttribute("class");
                }
                if (j.getAttribute("align")) {
                  e.align = j.getAttribute("align");
                }
                var f = {};
                var d = j.getElementsByTagName("param");
                var l = d.length;
                for (var k = 0; k < l; k++) {
                  if (d[k].getAttribute("name").toLowerCase() != "movie") {
                    f[d[k].getAttribute("name")] = d[k].getAttribute("value");
                  }
                }
                ae(e, f, c, m);
              } else {
                aF(j);
                if (m) {
                  m(a);
                }
              }
            }
          }
        } else {
          ay(c, true);
          if (m) {
            var b = av(c);
            if (b && typeof b.SetVariable != aq) {
              a.success = true;
              a.ref = b;
            }
            m(a);
          }
        }
      }
    }
  }

  function av(b) {
    var d = null;
    var c = aS(b);
    if (c && c.nodeName == "OBJECT") {
      if (typeof c.SetVariable != aq) {
        d = c;
      } else {
        var a = c.getElementsByTagName(aD)[0];
        if (a) {
          d = a;
        }
      }
    }
    return d;
  }

  function au() {
    return !aU && ao("6.0.65") && (ah.win || ah.mac) && !(ah.wk && ah.wk < 312);
  }

  function ae(f, d, h, e) {
    aU = true;
    ap = e || null;
    at = {
      success: false,
      id: h
    };
    var a = aS(h);
    if (a) {
      if (a.nodeName == "OBJECT") {
        aJ = aO(a);
        ad = null;
      } else {
        aJ = a;
        ad = h;
      }
      f.id = ac;
      if (typeof f.width == aq || (!/%$/.test(f.width) && parseInt(f.width, 10) < 310)) {
        f.width = "310";
      }
      if (typeof f.height == aq || (!/%$/.test(f.height) && parseInt(f.height, 10) < 137)) {
        f.height = "137";
      }
      aL.title = aL.title.slice(0, 47) + " - Flash Player Installation";
      var b = ah.ie && ah.win ? "ActiveX" : "PlugIn",
        c = "MMredirectURL=" + af.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + b + "&MMdoctitle=" + aL.title;
      if (typeof d.flashvars != aq) {
        d.flashvars += "&" + c;
      } else {
        d.flashvars = c;
      }
      if (ah.ie && ah.win && a.readyState != 4) {
        var g = ar("div");
        h += "SWFObjectNew";
        g.setAttribute("id", h);
        a.parentNode.insertBefore(g, a);
        a.style.display = "none";
        (function() {
          if (a.readyState == 4) {
            a.parentNode.removeChild(a);
          } else {
            setTimeout(arguments.callee, 10);
          }
        })();
      }
      aA(f, d, h);
    }
  }

  function aF(a) {
    if (ah.ie && ah.win && a.readyState != 4) {
      var b = ar("div");
      a.parentNode.insertBefore(b, a);
      b.parentNode.replaceChild(aO(a), b);
      a.style.display = "none";
      (function() {
        if (a.readyState == 4) {
          a.parentNode.removeChild(a);
        } else {
          setTimeout(arguments.callee, 10);
        }
      })();
    } else {
      a.parentNode.replaceChild(aO(a), a);
    }
  }

  function aO(b) {
    var d = ar("div");
    if (ah.win && ah.ie) {
      d.innerHTML = b.innerHTML;
    } else {
      var e = b.getElementsByTagName(aD)[0];
      if (e) {
        var a = e.childNodes;
        if (a) {
          var f = a.length;
          for (var c = 0; c < f; c++) {
            if (!(a[c].nodeType == 1 && a[c].nodeName == "PARAM") && !(a[c].nodeType == 8)) {
              d.appendChild(a[c].cloneNode(true));
            }
          }
        }
      }
    }
    return d;
  }

  function aA(e, g, c) {
    var d, a = aS(c);
    if (ah.wk && ah.wk < 312) {
      return d;
    }
    if (a) {
      if (typeof e.id == aq) {
        e.id = c;
      }
      if (ah.ie && ah.win) {
        var f = "";
        for (var j in e) {
          if (e[j] != Object.prototype[j]) {
            if (j.toLowerCase() == "data") {
              g.movie = e[j];
            } else {
              if (j.toLowerCase() == "styleclass") {
                f += ' class="' + e[j] + '"';
              } else {
                if (j.toLowerCase() != "classid") {
                  f += " " + j + '="' + e[j] + '"';
                }
              }
            }
          }
        }
        var h = "";
        for (var k in g) {
          if (g[k] != Object.prototype[k]) {
            h += '<param name="' + k + '" value="' + g[k] + '" />';
          }
        }
        f = f.replace("'", "");
        h = h.replace("'", "");
        a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + f + ">" + h + "</object>";
        ag[ag.length] = e.id;
        d = aS(e.id);
      } else {
        var b = ar(aD);
        b.setAttribute("type", aE);
        for (var l in e) {
          if (e[l] != Object.prototype[l]) {
            if (l.toLowerCase() == "styleclass") {
              b.setAttribute("class", e[l]);
            } else {
              if (l.toLowerCase() != "classid") {
                b.setAttribute(l, e[l]);
              }
            }
          }
        }
        for (var m in g) {
          if (g[m] != Object.prototype[m] && m.toLowerCase() != "movie") {
            aQ(b, m, g[m]);
          }
        }
        a.parentNode.replaceChild(b, a);
        d = b;
      }
    }
    return d;
  }

  function aQ(b, d, c) {
    var a = ar("param");
    a.setAttribute("name", d);
    a.setAttribute("value", c);
    b.appendChild(a);
  }

  function aw(a) {
    var b = aS(a);
    if (b && b.nodeName == "OBJECT") {
      if (ah.ie && ah.win) {
        b.style.display = "none";
        (function() {
          if (b.readyState == 4) {
            aT(a);
          } else {
            setTimeout(arguments.callee, 10);
          }
        })();
      } else {
        b.parentNode.removeChild(b);
      }
    }
  }

  function aT(a) {
    var b = aS(a);
    if (b) {
      for (var c in b) {
        if (typeof b[c] == "function") {
          b[c] = null;
        }
      }
      b.parentNode.removeChild(b);
    }
  }

  function aS(a) {
    var c = null;
    try {
      c = aL.getElementById(a);
    } catch (b) {}
    return c;
  }

  function ar(a) {
    return aL.createElement(a);
  }

  function aM(a, c, b) {
    a.attachEvent(c, b);
    al[al.length] = [a, c, b];
  }

  function ao(a) {
    var b = ah.pv,
      c = a.split(".");
    c[0] = parseInt(c[0], 10);
    c[1] = parseInt(c[1], 10) || 0;
    c[2] = parseInt(c[2], 10) || 0;
    return (b[0] > c[0] || (b[0] == c[0] && b[1] > c[1]) || (b[0] == c[0] && b[1] == c[1] && b[2] >= c[2])) ? true : false;
  }

  function az(b, f, a, c) {
    if (ah.ie && ah.mac) {
      return;
    }
    var e = aL.getElementsByTagName("head")[0];
    if (!e) {
      return;
    }
    var g = (a && typeof a == "string") ? a : "screen";
    if (c) {
      aH = null;
      an = null;
    }
    if (!aH || an != g) {
      var d = ar("style");
      d.setAttribute("type", "text/css");
      d.setAttribute("media", g);
      aH = e.appendChild(d);
      if (ah.ie && ah.win && typeof aL.styleSheets != aq && aL.styleSheets.length > 0) {
        aH = aL.styleSheets[aL.styleSheets.length - 1];
      }
      an = g;
    }
    if (ah.ie && ah.win) {
      if (aH && typeof aH.addRule == aD) {
        aH.addRule(b, f);
      }
    } else {
      if (aH && typeof aL.createTextNode != aq) {
        aH.appendChild(aL.createTextNode(b + " {" + f + "}"));
      }
    }
  }

  function ay(a, c) {
    if (!aI) {
      return;
    }
    var b = c ? "visible" : "hidden";
    if (ak && aS(a)) {
      aS(a).style.visibility = b;
    } else {
      az("#" + a, "visibility:" + b);
    }
  }

  function ai(b) {
    var a = /[\\\"<>\.;]/;
    var c = a.exec(b) != null;
    return c && typeof encodeURIComponent != aq ? encodeURIComponent(b) : b;
  }
  var aR = function() {
    if (ah.ie && ah.win) {
      window.attachEvent("onunload", function() {
        var a = al.length;
        for (var b = 0; b < a; b++) {
          al[b][0].detachEvent(al[b][1], al[b][2]);
        }
        var d = ag.length;
        for (var c = 0; c < d; c++) {
          aw(ag[c]);
        }
        for (var e in ah) {
          ah[e] = null;
        }
        ah = null;
        for (var f in swfobject) {
          swfobject[f] = null;
        }
        swfobject = null;
      });
    }
  }();
  return {
    registerObject: function(a, e, c, b) {
      if (ah.w3 && a && e) {
        var d = {};
        d.id = a;
        d.swfVersion = e;
        d.expressInstall = c;
        d.callbackFn = b;
        aG[aG.length] = d;
        ay(a, false);
      } else {
        if (b) {
          b({
            success: false,
            id: a
          });
        }
      }
    },
    getObjectById: function(a) {
      if (ah.w3) {
        return av(a);
      }
    },
    embedSWF: function(l, e, h, f, c, a, b, j, g, k) {
      var d = {
        success: false,
        id: e
      };
      if (ah.w3 && !(ah.wk && ah.wk < 312) && l && e && h && f && c) {
        ay(e, false);
        aj(function() {
          h += "";
          f += "";
          var r = {};
          if (g && typeof g === aD) {
            for (var p in g) {
              r[p] = g[p];
            }
          }
          r.data = l;
          r.width = h;
          r.height = f;
          var o = {};
          if (j && typeof j === aD) {
            for (var q in j) {
              o[q] = j[q];
            }
          }
          if (b && typeof b === aD) {
            for (var m in b) {
              if (typeof o.flashvars != aq) {
                o.flashvars += "&" + m + "=" + b[m];
              } else {
                o.flashvars = m + "=" + b[m];
              }
            }
          }
          if (ao(c)) {
            var n = aA(r, o, e);
            if (r.id == e) {
              ay(e, true);
            }
            d.success = true;
            d.ref = n;
          } else {
            if (a && au()) {
              r.data = a;
              ae(r, o, e, k);
              return;
            } else {
              ay(e, true);
            }
          }
          if (k) {
            k(d);
          }
        });
      } else {
        if (k) {
          k(d);
        }
      }
    },
    switchOffAutoHideShow: function() {
      aI = false;
    },
    ua: ah,
    getFlashPlayerVersion: function() {
      return {
        major: ah.pv[0],
        minor: ah.pv[1],
        release: ah.pv[2]
      };
    },
    hasFlashPlayerVersion: ao,
    createSWF: function(a, b, c) {
      if (ah.w3) {
        return aA(a, b, c);
      } else {
        return undefined;
      }
    },
    showExpressInstall: function(b, a, d, c) {
      if (ah.w3 && au()) {
        ae(b, a, d, c);
      }
    },
    removeSWF: function(a) {
      if (ah.w3) {
        aw(a);
      }
    },
    createCSS: function(b, a, c, d) {
      if (ah.w3) {
        az(b, a, c, d);
      }
    },
    addDomLoadEvent: aj,
    addLoadEvent: aC,
    getQueryParamValue: function(b) {
      var a = aL.location.search || aL.location.hash;
      if (a) {
        if (/\?/.test(a)) {
          a = a.split("?")[1];
        }
        if (b == null) {
          return ai(a);
        }
        var c = a.split("&");
        for (var d = 0; d < c.length; d++) {
          if (c[d].substring(0, c[d].indexOf("=")) == b) {
            return ai(c[d].substring((c[d].indexOf("=") + 1)));
          }
        }
      }
      return "";
    },
    expressInstallCallback: function() {
      if (aU) {
        var a = aS(ac);
        if (a && aJ) {
          a.parentNode.replaceChild(aJ, a);
          if (ad) {
            ay(ad, true);
            if (ah.ie && ah.win) {
              aJ.style.display = "block";
            }
          }
          if (ap) {
            ap(at);
          }
        }
        aU = false;
      }
    }
  };
}();
