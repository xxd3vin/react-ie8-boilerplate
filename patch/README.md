# 补丁

`patch_Portal端单据查询优化_陈扬_20161027_SSC_v0.1.zip`

补丁发布地址：[https://github.com/xxd3vin/bgy-portalbillquery/releases](https://github.com/xxd3vin/bgy-portalbillquery/releases)

## 使用说明

在需要使用的页面中添加HTML代码，将`<div>`放在指定位置，DOM会自动展开。

## 报账人门户

先将如下代码注释掉：

```html
<!--<li id="li_expBillQueryCondi" class=""><div class="expcondi_type_div">模糊搜索</div><div id="expense_likequery_link"><span><input onblur="javascript:resetValue();" onkeydown="javascript:enterEvent(event);" type='text' placeholder="单据编号" id='likequery'/></span><span  style="color:#028FD1;cursor:pointer;" onclick="javascript:queryExpenseBillByLike();">&nbsp;&nbsp;查询</span></div></li>-->
```

然后在上述注释代码后插入：

```html
<!-- fuck UAP start -->
<link href="/iwebap/css/portalbillquery/tw-bs.3.1.1.css?v=0.13" rel="stylesheet">
<script src="/iwebap/js/portalbillquery/console-polyfill.js?v=0.13"></script>
<div id="root" class="tw-bs" style="height: 70px; background-color: rgb(241, 241, 241);"></div>
<script src="/iwebap/js/portalbillquery/common.js?v=0.13"></script>
<script src="/iwebap/js/portalbillquery/MyExpBillPortlet.js?v=0.13"></script>
<!-- fuck UAP end -->
```

发布的补丁包都带有版本信息，比如`patch_20161214_v0.13.zip`。如果静态文件（比如js文件）有更新，请在文件路径后面替换版本号，以快速有效的解决可能存在的静态文件缓存问题。

## 审批人门户

先将如下代码注释掉：

```html
<!--<li id="li_expBillQueryCondi" class=""><div class="expcondi_type_div">模糊搜索</div><div class='expcondi_div'><span style="height:50px"><input height=50px  style="width:160px" onblur="javascript:resetValue();" onkeydown="javascript:enterEvent(event);" type='text'placeholder="单据编号" id='likequery'/></span><span  style="color:#028FD1;cursor:pointer;" onclick="javascript:queryExpenseBillByLike();">&nbsp;&nbsp;查询</span></div></li>-->
```

然后在上述注释代码后插入：

```html
<!-- fuck UAP start -->
<link href="/iwebap/css/portalbillquery/tw-bs.3.1.1.css?v=0.13" rel="stylesheet">
<script src="/iwebap/js/portalbillquery/console-polyfill.js?v=0.13"></script>
<div id="root" class="tw-bs" style="height: 70px; background-color: rgb(241, 241, 241);"></div>
<script src="/iwebap/js/portalbillquery/common.js?v=0.13"></script>
<script src="/iwebap/js/portalbillquery/MYEXPPORTAL.js?v=0.13"></script>
<!-- fuck UAP end -->
```

发布的补丁包都带有版本信息，比如`patch_20161214_v0.13.zip`。如果静态文件（比如js文件）有更新，请在文件路径后面替换版本号，以快速有效的解决可能存在的静态文件缓存问题。
