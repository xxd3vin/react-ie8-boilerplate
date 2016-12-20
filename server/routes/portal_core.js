/*jslint node:true */

'use strict';

const express = require('express');
const path = require('path');

const ROOT = path.join(__dirname, '/../..');







var key, val, obj = {};

// 点击查询按钮 2
key = `<root><e id="expExpensePortlet"><ps><p><k>clc</k><v>nc.bs.er.expExpensePortlet.ctrl.MainViewController</v></p><p><k>el</k><v>2</v></p><p><k>source_id</k><v>main</v></p><p><k>source_type</k><v>widget</v></p><p><k>widget_id</k><v>main</v></p><p><k>m_n</k><v>doQueryByLikeQuery</v></p><p><k>likeQueryValue</k><v>264X20161027000812</v></p><p><k>query_param_keyvalue</k><v>MASTER_KEY1</v></p><p><k>query_param_pageindex</k><v>0</v></p><p><k>hasChanged</k><v>false</v></p></ps><c>{c: "PageUIContext", hasChanged: false}</c><widget id="billnav"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="billnav_ds"><data><![CDATA[<dataset id='billnav.billnav_ds' currentkey='' editable='false' randomRowIndex='0'><rowsets></rowsets></dataset>]]></data></dataset></widget><widget id="main"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="yerbill"><data><![CDATA[<dataset id='main.yerbill' currentkey='MASTER_KEY1' editable='false' randomRowIndex='15'><dqps><dp name='query_param_keyvalue'>MASTER_KEY1</dp><dp name='query_param_pageindex'>0</dp></dqps><rowsets><rowset pagecount="1" pagesize="15" recordcount="0" pageindex="0" keyvalue="-1">
<rs pageindex="0">
<selected></selected>
</rs></rowset><rowset pagecount="4" pagesize="15" recordcount="46" pageindex="0" keyvalue="MASTER_KEY1">
<rs pageindex="0">
<selected></selected>
<er id="0yerbill$1"/><er id="0yerbill$2"/><er id="0yerbill$3"/><er id="0yerbill$4"/><er id="0yerbill$5"/><er id="0yerbill$6"/><er id="0yerbill$7"/><er id="0yerbill$8"/><er id="0yerbill$9"/><er id="0yerbill$10"/><er id="0yerbill$11"/><er id="0yerbill$12"/><er id="0yerbill$13"/><er id="0yerbill$14"/><er id="0yerbill$15"/></rs></rowset></rowsets></dataset>]]></data></dataset></widget><cc>{hasChanged: false}</cc></e></root>`;
val = `<?xml version="1.0" encoding='UTF-8'?>
<xml>
    <exp-text>
    </exp-text>
    <show-message>
    </show-message>
    <exp-stack>
        <![CDATA[]]>
    
    </exp-stack>
    <success>true</success>
    <contents>
        <content>
            <![CDATA[
            <?xml version="1.0" encoding='UTF-8'?><e><isPlug>false</isPlug><pagemeta><widget id="billnav">
        </widget><widget id="main"><dataset id="yerbill"><data><CD><dataset id="yerbill" focusIndex="-1" currentkey="-1" editable="false" isCleared="false" randomRowIndex="15"><dsps>
    </dsps><rowsets><rowset pagecount="1" pagesize="15" recordcount="0" pageindex="0" keyvalue="-1">
    </rowset></rowsets></dataset></CD>
                </data>
            </dataset>
        </widget><cc><CD>{"widgets":[{"comps":[{"id":"grid6295"}],"id":"main"}]}</CD></cc><exec><CD>pageUI.getWidget('main').getDataset('yerbill').setCurrentPage('MASTER_KEY11')
</CD></exec>
    </pagemeta></e>
]]>
        
</content>
</contents>
</xml>`;
obj[key] = val;

// 从输入框离开
key = `<root><e id="expExpensePortlet"><ps><p><k>clc</k><v>nc.bs.er.expExpensePortlet.ctrl.MainViewController</v></p><p><k>el</k><v>2</v></p><p><k>source_id</k><v>main</v></p><p><k>source_type</k><v>widget</v></p><p><k>widget_id</k><v>main</v></p><p><k>m_n</k><v>resetTextValue</v></p><p><k>likeQueryValue</k><v>264X20161027000812</v></p><p><k>query_param_keyvalue</k><v>MASTER_KEY1</v></p><p><k>query_param_pageindex</k><v>0</v></p><p><k>hasChanged</k><v>false</v></p></ps><c>{c: "PageUIContext", hasChanged: false}</c><widget id="billnav"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="billnav_ds"><data><![CDATA[<dataset id='billnav.billnav_ds' currentkey='' editable='false' randomRowIndex='0'><rowsets></rowsets></dataset>]]></data></dataset></widget><widget id="main"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="yerbill"><data><![CDATA[<dataset id='main.yerbill' currentkey='MASTER_KEY1' editable='false' randomRowIndex='15'><dqps><dp name='query_param_keyvalue'>MASTER_KEY1</dp><dp name='query_param_pageindex'>0</dp></dqps><rowsets><rowset pagecount="1" pagesize="15" recordcount="0" pageindex="0" keyvalue="-1">
<rs pageindex="0">
<selected></selected>
</rs></rowset><rowset pagecount="4" pagesize="15" recordcount="46" pageindex="0" keyvalue="MASTER_KEY1">
<rs pageindex="0">
<selected></selected>
<er id="0yerbill$1"/><er id="0yerbill$2"/><er id="0yerbill$3"/><er id="0yerbill$4"/><er id="0yerbill$5"/><er id="0yerbill$6"/><er id="0yerbill$7"/><er id="0yerbill$8"/><er id="0yerbill$9"/><er id="0yerbill$10"/><er id="0yerbill$11"/><er id="0yerbill$12"/><er id="0yerbill$13"/><er id="0yerbill$14"/><er id="0yerbill$15"/></rs></rowset></rowsets></dataset>]]></data></dataset></widget><cc>{hasChanged: false}</cc></e></root>`;
val = `<?xml version="1.0" encoding='UTF-8'?>
<xml>
    <exp-text>
    </exp-text>
    <show-message>
    </show-message>
    <exp-stack>
        <![CDATA[]]>
    
    </exp-stack>
    <success>true</success>
    <contents>
        <content>
            <![CDATA[
            <?xml version="1.0" encoding='UTF-8'?><e><isPlug>false</isPlug><pagemeta><widget id="billnav">
        </widget><widget id="main">
        </widget><cc><CD>{"widgets":[{"comps":[{"id":"grid6295"}],"id":"main"}]}</CD></cc>
    </pagemeta></e>
]]>
        
</content>
</contents>
</xml>`;
obj[key] = val;

// 点击查询按钮 3
key = `<root><e id="expExpensePortlet"><ps><p><k>clc</k><v>nc.bs.er.expExpensePortlet.ctrl.MainViewController</v></p><p><k>el</k><v>2</v></p><p><k>source_id</k><v>main</v></p><p><k>source_type</k><v>widget</v></p><p><k>widget_id</k><v>main</v></p><p><k>m_n</k><v>doQueryByLikeQuery</v></p><p><k>likeQueryValue</k><v>264X20161027000812</v></p><p><k>hasChanged</k><v>false</v></p></ps><c>{c: "PageUIContext", hasChanged: false}</c><widget id="billnav"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="billnav_ds"><data><![CDATA[<dataset id='billnav.billnav_ds' currentkey='' editable='false' randomRowIndex='0'><rowsets></rowsets></dataset>]]></data></dataset></widget><widget id="main"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="yerbill"><data><![CDATA[<dataset id='main.yerbill' currentkey='MASTER_KEY1' editable='false' randomRowIndex='15'><dqps><dp name='query_param_keyvalue'>MASTER_KEY1</dp><dp name='query_param_pageindex'>0</dp></dqps><rowsets><rowset pagecount="1" pagesize="15" recordcount="0" pageindex="0" keyvalue="-1">
<rs pageindex="0">
<selected></selected>
</rs></rowset><rowset pagecount="4" pagesize="15" recordcount="46" pageindex="0" keyvalue="MASTER_KEY1">
<rs pageindex="0">
<selected></selected>
<er id="0yerbill$1"/><er id="0yerbill$2"/><er id="0yerbill$3"/><er id="0yerbill$4"/><er id="0yerbill$5"/><er id="0yerbill$6"/><er id="0yerbill$7"/><er id="0yerbill$8"/><er id="0yerbill$9"/><er id="0yerbill$10"/><er id="0yerbill$11"/><er id="0yerbill$12"/><er id="0yerbill$13"/><er id="0yerbill$14"/><er id="0yerbill$15"/></rs></rowset></rowsets></dataset>]]></data></dataset></widget><cc>{hasChanged: false}</cc></e></root>`;
val = `<?xml version="1.0" encoding='UTF-8'?>
<xml>
    <exp-text>
    </exp-text>
    <show-message>
    </show-message>
    <exp-stack>
        <![CDATA[]]>
    
    </exp-stack>
    <success>true</success>
    <contents>
        <content>
            <![CDATA[
            <?xml version="1.0" encoding='UTF-8'?><e><isPlug>false</isPlug><pagemeta><widget id="billnav">
        </widget><widget id="main"><dataset id="yerbill"><data><CD><dataset id="yerbill" focusIndex="-1" currentkey="-1" editable="false" isCleared="false" randomRowIndex="15"><dsps>
    </dsps><rowsets><rowset pagecount="1" pagesize="15" recordcount="0" pageindex="0" keyvalue="-1">
    </rowset></rowsets></dataset></CD>
                </data>
            </dataset>
        </widget><cc><CD>{"widgets":[{"comps":[{"id":"grid6295"}],"id":"main"}]}</CD></cc><exec><CD>pageUI.getWidget('main').getDataset('yerbill').setCurrentPage('MASTER_KEY11')
</CD></exec>
    </pagemeta></e>
]]>
        
</content>
</contents>
</xml>`;
obj[key] = val;







// 页面加载时候的请求

var x1 = `<root><e id="expExpensePortlet"><gps><ps><p><k>source_id</k><v>yerbill</v></p><p><k>widget_id</k><v>main</v></p><p><k>event_name</k><v>onDataLoad</v></p><p><k>source_type</k><v>dataset</v></p><p><k>clc</k><v>nc.bs.er.expExpensePortlet.ctrl.MainViewController</v></p><p><k>el</k><v>2</v></p><p><k>source_id</k><v>yerbill</v></p><p><k>m_n</k><v>onDataLoad</v></p><p><k>source_type</k><v>dataset</v></p><p><k>event_name</k><v>onDataLoad</v></p><p><k>query_param_keyvalue</k><v>MASTER_KEY</v></p><p><k>query_param_pageindex</k><v>0</v></p><p><k>hasChanged</k><v>false</v></p></ps></gps><c>{c: "PageUIContext", hasChanged: false}</c><widget id="billnav"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="billnav_ds"><data><![CDATA[<dataset id='billnav.billnav_ds' currentkey='' editable='false' randomRowIndex='0'><rowsets></rowsets></dataset>]]></data></dataset></widget><widget id="main"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="yerbill"><data><![CDATA[<dataset id='main.yerbill' currentkey='' editable='false' randomRowIndex='0'><dqps><dp name='query_param_keyvalue'>MASTER_KEY</dp><dp name='query_param_pageindex'>0</dp></dqps><rowsets></rowsets></dataset>]]></data></dataset></widget><cc>{hasChanged: false}</cc></e></root>`;

var x2 = `<root><e id="expExpensePortlet"><gps><ps><p><k>clc</k><v>nc.bs.er.expExpensePortlet.ctrl.MainViewController</v></p><p><k>el</k><v>2</v></p><p><k>source_id</k><v>main</v></p><p><k>source_type</k><v>widget</v></p><p><k>widget_id</k><v>main</v></p><p><k>m_n</k><v>doQueryByCompleteStatus</v></p><p><k>completeStatus</k><v>2</v></p><p><k>query_param_keyvalue</k><v>MASTER_KEY</v></p><p><k>query_param_pageindex</k><v>0</v></p><p><k>hasChanged</k><v>false</v></p></ps></gps><c>{c: "PageUIContext", hasChanged: false}</c><widget id="billnav"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="billnav_ds"><data><![CDATA[<dataset id='billnav.billnav_ds' currentkey='' editable='false' randomRowIndex='0'><rowsets></rowsets></dataset>]]></data></dataset></widget><widget id="main"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="yerbill"><data><![CDATA[<dataset id='main.yerbill' currentkey='MASTER_KEY' editable='false' randomRowIndex='0'><dqps><dp name='query_param_keyvalue'>MASTER_KEY</dp><dp name='query_param_pageindex'>0</dp></dqps><rowsets><rowset pagecount="1" pagesize="15" recordcount="0" pageindex="0" keyvalue="MASTER_KEY">
<rs pageindex="0">
<selected></selected>
</rs></rowset></rowsets></dataset>]]></data></dataset></widget><cc>{hasChanged: false, widgets: [{id: "main", comps: [{id: "grid6295", editable: false, compType: "gridcomp"}]}]}</cc></e></root>`;

// 点击“未完成”切换标签页时候
// 估计是加载table data

var x3 = `<root><e id="expExpensePortlet"><ps><p><k>clc</k><v>nc.bs.er.expExpensePortlet.ctrl.MainViewController</v></p><p><k>el</k><v>2</v></p><p><k>source_id</k><v>main</v></p><p><k>source_type</k><v>widget</v></p><p><k>widget_id</k><v>main</v></p><p><k>m_n</k><v>doQueryByCompleteStatus</v></p><p><k>completeStatus</k><v>0</v></p><p><k>hasChanged</k><v>false</v></p></ps><c>{c: "PageUIContext", hasChanged: false}</c><widget id="billnav"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="billnav_ds"><data><![CDATA[<dataset id='billnav.billnav_ds' currentkey='' editable='false' randomRowIndex='0'><rowsets></rowsets></dataset>]]></data></dataset></widget><widget id="main"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="yerbill"><data><![CDATA[<dataset id='main.yerbill' currentkey='MASTER_KEY' editable='false' randomRowIndex='0'><dqps><dp name='query_param_keyvalue'>MASTER_KEY</dp><dp name='query_param_pageindex'>0</dp></dqps><rowsets><rowset pagecount="1" pagesize="15" recordcount="0" pageindex="0" keyvalue="MASTER_KEY">
<rs pageindex="0">
<selected></selected>
</rs></rowset></rowsets></dataset>]]></data></dataset></widget><cc>{hasChanged: false}</cc></e></root>`;

var x4 = `<root><e id="expExpensePortlet"><gps><ps><p><k>source_id</k><v>yerbill</v></p><p><k>widget_id</k><v>main</v></p><p><k>event_name</k><v>onDataLoad</v></p><p><k>source_type</k><v>dataset</v></p><p><k>clc</k><v>nc.bs.er.expExpensePortlet.ctrl.MainViewController</v></p><p><k>el</k><v>2</v></p><p><k>source_id</k><v>yerbill</v></p><p><k>m_n</k><v>onDataLoad</v></p><p><k>source_type</k><v>dataset</v></p><p><k>event_name</k><v>onDataLoad</v></p><p><k>query_param_keyvalue</k><v>MASTER_KEY1</v></p><p><k>query_param_pageindex</k><v>0</v></p><p><k>hasChanged</k><v>false</v></p></ps></gps><c>{c: "PageUIContext", hasChanged: false}</c><widget id="billnav"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="billnav_ds"><data><![CDATA[<dataset id='billnav.billnav_ds' currentkey='' editable='false' randomRowIndex='0'><rowsets></rowsets></dataset>]]></data></dataset></widget><widget id="main"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="yerbill"><data><![CDATA[<dataset id='main.yerbill' currentkey='' editable='false' randomRowIndex='0'><dqps><dp name='query_param_keyvalue'>MASTER_KEY1</dp><dp name='query_param_pageindex'>0</dp></dqps><rowsets><rowset pagecount="1" pagesize="15" recordcount="0" pageindex="0" keyvalue="-1">
</rowset></rowsets></dataset>]]></data></dataset></widget><cc>{hasChanged: false}</cc></e></root>`;


// 未知
var x5 = `<root><e id="expExpensePortlet"><gps><ps><p><k>source_id</k><v>yerbill</v></p><p><k>widget_id</k><v>main</v></p><p><k>event_name</k><v>onDataLoad</v></p><p><k>source_type</k><v>dataset</v></p><p><k>clc</k><v>nc.bs.er.expExpensePortlet.ctrl.MainViewController</v></p><p><k>el</k><v>2</v></p><p><k>source_id</k><v>yerbill</v></p><p><k>m_n</k><v>onDataLoad</v></p><p><k>source_type</k><v>dataset</v></p><p><k>event_name</k><v>onDataLoad</v></p><p><k>query_param_keyvalue</k><v>MASTER_KEY1</v></p><p><k>query_param_pageindex</k><v>1</v></p><p><k>hasChanged</k><v>false</v></p></ps></gps><c>{c: "PageUIContext", hasChanged: false}</c><widget id="billnav"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="billnav_ds"><data><![CDATA[<dataset id='billnav.billnav_ds' currentkey='' editable='false' randomRowIndex='0'><rowsets></rowsets></dataset>]]></data></dataset></widget><widget id="main"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="yerbill"><data><![CDATA[<dataset id='main.yerbill' currentkey='MASTER_KEY1' editable='false' randomRowIndex='15'><dqps><dp name='query_param_keyvalue'>MASTER_KEY1</dp><dp name='query_param_pageindex'>1</dp></dqps><rowsets><rowset pagecount="1" pagesize="15" recordcount="0" pageindex="0" keyvalue="-1">
<rs pageindex="0">
<selected></selected>
</rs></rowset><rowset pagecount="3" pagesize="15" recordcount="40" pageindex="0" keyvalue="MASTER_KEY1">
<rs pageindex="0">
<selected></selected>
<er id="0yerbill$1"/><er id="0yerbill$2"/><er id="0yerbill$3"/><er id="0yerbill$4"/><er id="0yerbill$5"/><er id="0yerbill$6"/><er id="0yerbill$7"/><er id="0yerbill$8"/><er id="0yerbill$9"/><er id="0yerbill$10"/><er id="0yerbill$11"/><er id="0yerbill$12"/><er id="0yerbill$13"/><er id="0yerbill$14"/><er id="0yerbill$15"/></rs></rowset></rowsets></dataset>]]></data></dataset></widget><cc>{hasChanged: false}</cc></e></root>`;


// 点击查询按钮
var x6 = `<root><e id="expExpensePortlet"><ps><p><k>clc</k><v>nc.bs.er.expExpensePortlet.ctrl.MainViewController</v></p><p><k>el</k><v>2</v></p><p><k>source_id</k><v>main</v></p><p><k>source_type</k><v>widget</v></p><p><k>widget_id</k><v>main</v></p><p><k>m_n</k><v>doQueryByLikeQuery</v></p><p><k>likeQueryValue</k><v>D02016103100339080</v></p><p><k>query_param_keyvalue</k><v>MASTER_KEY11</v></p><p><k>query_param_pageindex</k><v>0</v></p><p><k>hasChanged</k><v>false</v></p></ps><c>{c: "PageUIContext", hasChanged: false}</c><widget id="billnav"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="billnav_ds"><data><![CDATA[<dataset id='billnav.billnav_ds' currentkey='' editable='false' randomRowIndex='0'><rowsets></rowsets></dataset>]]></data></dataset></widget><widget id="main"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="yerbill"><data><![CDATA[<dataset id='main.yerbill' currentkey='MASTER_KEY11' editable='false' randomRowIndex='16'><dqps><dp name='query_param_keyvalue'>MASTER_KEY11</dp><dp name='query_param_pageindex'>0</dp></dqps><rowsets><rowset pagecount="1" pagesize="15" recordcount="0" pageindex="0" keyvalue="-1">
<rs pageindex="0">
<selected></selected>
</rs></rowset><rowset pagecount="1" pagesize="15" recordcount="1" pageindex="0" keyvalue="MASTER_KEY11">
<rs pageindex="0">
<selected></selected>
<er id="0yerbill$16"/></rs></rowset></rowsets></dataset>]]></data></dataset></widget><cc>{hasChanged: false}</cc></e></root>`;
var x7 = `<root><e id="expExpensePortlet"><gps><ps><p><k>source_id</k><v>yerbill</v></p><p><k>widget_id</k><v>main</v></p><p><k>event_name</k><v>onDataLoad</v></p><p><k>source_type</k><v>dataset</v></p><p><k>clc</k><v>nc.bs.er.expExpensePortlet.ctrl.MainViewController</v></p><p><k>el</k><v>2</v></p><p><k>source_id</k><v>yerbill</v></p><p><k>m_n</k><v>onDataLoad</v></p><p><k>source_type</k><v>dataset</v></p><p><k>event_name</k><v>onDataLoad</v></p><p><k>query_param_keyvalue</k><v>MASTER_KEY111</v></p><p><k>query_param_pageindex</k><v>0</v></p><p><k>hasChanged</k><v>false</v></p></ps></gps><c>{c: "PageUIContext", hasChanged: false}</c><widget id="billnav"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="billnav_ds"><data><![CDATA[<dataset id='billnav.billnav_ds' currentkey='' editable='false' randomRowIndex='0'><rowsets></rowsets></dataset>]]></data></dataset></widget><widget id="main"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="yerbill"><data><![CDATA[<dataset id='main.yerbill' currentkey='' editable='false' randomRowIndex='16'><dqps><dp name='query_param_keyvalue'>MASTER_KEY111</dp><dp name='query_param_pageindex'>0</dp></dqps><rowsets><rowset pagecount="1" pagesize="15" recordcount="0" pageindex="0" keyvalue="-1">
<rs pageindex="0">
<selected></selected>
</rs></rowset></rowsets></dataset>]]></data></dataset></widget><cc>{hasChanged: false}</cc></e></root>`;













// 作业任务处理

var obj2 = {};

// source_id = mainds
key = `<root><e id="jobList"><gps><ps><p><k>source_id</k><v>mainds</v></p><p><k>widget_id</k><v>simplequery</v></p><p><k>event_name</k><v>onDataLoad</v></p><p><k>source_type</k><v>dataset</v></p><p><k>clc</k><v>nc.ssc.task.jobquery.SeniorQueryViewCtrl</v></p><p><k>el</k><v>2</v></p><p><k>source_id</k><v>mainds</v></p><p><k>m_n</k><v>simpleQueryonDataLoad</v></p><p><k>source_type</k><v>dataset</v></p><p><k>event_name</k><v>onDataLoad</v></p><p><k>query_param_keyvalue</k><v>MASTER_KEY</v></p><p><k>query_param_pageindex</k><v>0</v></p><p><k>hasChanged</k><v>false</v></p></ps></gps><c>{c: "PageUIContext", hasChanged: false}</c><widget id="bussAndBarcode"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="FilterDS"><data><![CDATA[<dataset id='bussAndBarcode.FilterDS' currentkey='' editable='false' randomRowIndex='0'><rowsets></rowsets></dataset>]]></data></dataset></widget><widget id="simplequery"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="mainds"><data><![CDATA[<dataset id='simplequery.mainds' currentkey='' editable='true' randomRowIndex='0'><dqps><dp name='query_param_keyvalue'>MASTER_KEY</dp><dp name='query_param_pageindex'>0</dp></dqps><rowsets></rowsets></dataset>]]></data></dataset><dataset id="masterds"><data><![CDATA[<dataset id='simplequery.masterds' currentkey='MASTER_KEY' editable='true' randomRowIndex='1'><rowsets><rowset pagecount="1" pagesize="-1" recordcount="1" pageindex="0" keyvalue="MASTER_KEY">

<rs pageindex="0">

<selected>0</selected>

<focus>0</focus>

<r id='0masterds$1'><add>。,。,。</add></r></rs></rowset></rowsets></dataset>]]></data></dataset></widget><cc>{hasChanged: false, widgets: [{id: "bussAndBarcode", comps: [{id: "barCodeId", value: "", compType: "stringtext"}]}, {id: "simplequery", comps: [{id: "mainform", eles: [{id: "billcode", value: ""}, {id: "pk_billtype_mc", value: ""}, {id: "pk_billtype", value: ""}, {id: "appointtime_start", value: ""}, {id: "appointtime_end", value: ""}, {id: "pk_busiactivity_mc", value: ""}, {id: "pk_busiactivity", value: ""}], compType: "autoform"}]}]}</cc></e></root>`;
val = `<?xml version="1.0" encoding='UTF-8'?>
<xml>
    <exp-text>
    </exp-text>
    <show-message>
    </show-message>
    <exp-stack>        <![CDATA[]]>
    </exp-stack>
    <success>true</success>
    <contents>
        <content>            <![CDATA[<?xml version="1.0" encoding='UTF-8'?>
<e>
    <isPlug>false</isPlug>
    <pagemeta>
        <widget id="main">
        </widget>
        <widget id="fetchCondition">
        </widget>
        <widget id="bussAndBarcode">
        </widget>
        <widget id="filterView">
        </widget>
        <widget id="simplequery">
            <dataset id="mainds">
                <data>                    <CD><dataset id="mainds" focusIndex="0" currentkey="MASTER_KEY" editable="true" isCleared="false" randomRowIndex="1">
    <dsps>
    </dsps>
    <rowsets>
    <rowset pagecount="1" pagesize="-1" recordcount="0" pageindex="0" keyvalue="MASTER_KEY">
    <rs pageindex="0" changed="true">
<selected>0</selected>
<r id="0mainds$1" ><add>。,。,。,。,。,。,。</add></r>
</rs>
    </rowset>
    </rowsets>
</dataset>
</CD>
                </data>
            </dataset>
        </widget>
        <cc>            <CD>{"widgets":[{"comps":[{"id":"listgrid"}],"id":"main"}]}</CD>
        </cc>
    </pagemeta>
</e>
]]>
        </content>
    </contents>
</xml>`;
obj2[xxtrim(key)] = val;

// source_id = jobDataset
key = `<root><e id="jobList"><gps><ps><p><k>source_id</k><v>jobDataset</v></p><p><k>widget_id</k><v>main</v></p><p><k>event_name</k><v>onDataLoad</v></p><p><k>source_type</k><v>dataset</v></p><p><k>clc</k><v>nc.ssc.ssctaskprocess.jobList.ListViewController</v></p><p><k>el</k><v>2</v></p><p><k>source_id</k><v>jobDataset</v></p><p><k>m_n</k><v>onDataLoad_jobDataset</v></p><p><k>source_type</k><v>dataset</v></p><p><k>event_name</k><v>onDataLoad</v></p><p><k>query_param_keyvalue</k><v>MASTER_KEY</v></p><p><k>query_param_pageindex</k><v>0</v></p><p><k>hasChanged</k><v>false</v></p></ps><ps><p><k>source_id</k><v>bussAndBarcode</v></p><p><k>widget_id</k><v>bussAndBarcode</v></p><p><k>event_name</k><v>beforeShow</v></p><p><k>source_type</k><v>widget</v></p><p><k>clc</k><v>nc.ssc.ssctaskprocess.jobList.BussAndBarcodeViewController</v></p><p><k>el</k><v>0</v></p><p><k>source_id</k><v>bussAndBarcode</v></p><p><k>m_n</k><v>beforeShow_onLoadDS</v></p><p><k>source_type</k><v>widget</v></p><p><k>event_name</k><v>beforeShow</v></p><p><k>query_param_keyvalue</k><v>MASTER_KEY</v></p><p><k>query_param_pageindex</k><v>0</v></p><p><k>hasChanged</k><v>false</v></p></ps><ps><p><k>source_id</k><v>main</v></p><p><k>widget_id</k><v>main</v></p><p><k>event_name</k><v>beforeShow</v></p><p><k>source_type</k><v>widget</v></p><p><k>clc</k><v>nc.ssc.ssctaskprocess.jobList.ListViewController</v></p><p><k>el</k><v>0</v></p><p><k>source_id</k><v>main</v></p><p><k>m_n</k><v>mainListBeforeShow</v></p><p><k>source_type</k><v>widget</v></p><p><k>event_name</k><v>beforeShow</v></p><p><k>query_param_keyvalue</k><v>MASTER_KEY</v></p><p><k>query_param_pageindex</k><v>0</v></p><p><k>hasChanged</k><v>false</v></p></ps></gps><c>{c: "PageUIContext", hasChanged: false}</c><widget id="bussAndBarcode"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="FilterDS"><data><![CDATA[<dataset id='bussAndBarcode.FilterDS' currentkey='' editable='false' randomRowIndex='0'><rowsets></rowsets></dataset>]]></data></dataset></widget><widget id="simplequery"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="mainds"><data><![CDATA[<dataset id='simplequery.mainds' currentkey='MASTER_KEY' editable='true' randomRowIndex='1'><dqps><dp name='query_param_keyvalue'>MASTER_KEY</dp><dp name='query_param_pageindex'>0</dp></dqps><rowsets><rowset pagecount="1" pagesize="-1" recordcount="1" pageindex="0" keyvalue="MASTER_KEY">
<rs pageindex="0">
<selected>0</selected>
<focus>0</focus>
<r id='0mainds$1'><add>。,。,。,。,。,。,。</add></r></rs></rowset></rowsets></dataset>]]></data></dataset><dataset id="masterds"><data><![CDATA[<dataset id='simplequery.masterds' currentkey='MASTER_KEY' editable='true' randomRowIndex='1'><rowsets><rowset pagecount="1" pagesize="-1" recordcount="1" pageindex="0" keyvalue="MASTER_KEY">
<rs pageindex="0">
<selected>0</selected>
<focus>0</focus>
<r id='0masterds$1'><add>。,。,。</add></r></rs></rowset></rowsets></dataset>]]></data></dataset></widget><widget id="main"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="jobDataset"><data><![CDATA[<dataset id='main.jobDataset' currentkey='' editable='false' randomRowIndex='0'><dqps><dp name='query_param_keyvalue'>MASTER_KEY</dp><dp name='query_param_pageindex'>0</dp></dqps><rowsets></rowsets></dataset>]]></data></dataset><dataset id="listds"><data><![CDATA[<dataset id='main.listds' currentkey='' editable='false' randomRowIndex='0'><rowsets></rowsets></dataset>]]></data></dataset></widget><widget id="filterView"><c>{c: "WidgetUIContext", visible: true}</c></widget><cc>{hasChanged: false, widgets: [{id: "simplequery", comps: [{id: "mainform", eles: [{id: "billcode"}, {id: "pk_billtype_mc"}, {id: "pk_billtype"}, {id: "appointtime_start"}, {id: "appointtime_end"}, {id: "pk_busiactivity_mc"}, {id: "pk_busiactivity"}], compType: "autoform"}]}, {id: "main", comps: [{id: "listgrid", editable: false, compType: "gridcomp"}]}]}</cc></e></root>`;
val = `<?xml version="1.0" encoding='UTF-8'?>
<xml>
    <exp-text>
    </exp-text>
    <show-message>
    </show-message>
    <exp-stack>        <![CDATA[]]>
    </exp-stack>
    <success>true</success>
    <contents>
        <content>            <![CDATA[<?xml version="1.0" encoding='UTF-8'?>
<e>
    <isPlug>false</isPlug>
    <pagemeta>
        <widget id="main">
            <dataset id="jobDataset">
                <data>                    <CD><dataset id="jobDataset" focusIndex="-1" currentkey="MASTER_KEY" editable="false" isCleared="false" randomRowIndex="0">
    <dsps>
    </dsps>
    <rowsets>
    <rowset pagecount="1" pagesize="20" recordcount="0" pageindex="0" keyvalue="MASTER_KEY">
    <rs pageindex="0" changed="true">
</rs>
    </rowset>
    </rowsets>
</dataset>
</CD>
                </data>
            </dataset>
        </widget>
        <widget id="fetchCondition">
        </widget>
        <widget id="bussAndBarcode">
            <dataset id="FilterDS">
                <data>                    <CD><dataset id="FilterDS" focusIndex="0" currentkey="MASTER_KEY" editable="false" isCleared="false" randomRowIndex="5">
    <dsps>
    </dsps>
    <rowsets>
    <rowset pagecount="1" pagesize="-1" recordcount="0" pageindex="0" keyvalue="MASTER_KEY">
    <rs pageindex="0" changed="true">
<selected>0</selected>
<r id="0FilterDS$1" ><add>toDispose,%E5%BE%85%E5%A4%84%E7%90%86</add></r>
<r id="0FilterDS$2" ><add>disposed,%E5%B7%B2%E5%A4%84%E7%90%86</add></r>
<r id="0FilterDS$3" ><add>rejected,%E5%B7%B2%E9%A9%B3%E5%9B%9E</add></r>
</rs>
    </rowset>
    </rowsets>
</dataset>
</CD>
                </data>
            </dataset>
        </widget>
        <widget id="filterView">
        </widget>
        <widget id="simplequery">
        </widget>
        <cc>            <CD>{"widgets":[{"menus":[{"itemContexts":[{"childItemContexts":[{"visible":false,"id":"lookOverCredence"},{"visible":false,"id":"lookOverAdjunct"}],"id":"lookOver"}],"id":"menubar"}],"comps":[{"id":"listgrid"}],"id":"main"}]}</CD>
        </cc>
    </pagemeta>
</e>
]]>
        </content>
    </contents>
</xml>`;
obj2[xxtrim(key)] = val;

// source_id = jobDataset
key = `<root><e id="jobList"><gps><ps><p><k>source_id</k><v>jobDataset</v></p><p><k>widget_id</k><v>main</v></p><p><k>event_name</k><v>onDataLoad</v></p><p><k>source_type</k><v>dataset</v></p><p><k>clc</k><v>nc.ssc.ssctaskprocess.jobList.ListViewController</v></p><p><k>el</k><v>2</v></p><p><k>source_id</k><v>jobDataset</v></p><p><k>m_n</k><v>onDataLoad_jobDataset</v></p><p><k>source_type</k><v>dataset</v></p><p><k>event_name</k><v>onDataLoad</v></p><p><k>query_param_keyvalue</k><v>MASTER_KEY</v></p><p><k>query_param_pageindex</k><v>0</v></p><p><k>hasChanged</k><v>false</v></p></ps><ps><p><k>source_id</k><v>bussAndBarcode</v></p><p><k>widget_id</k><v>bussAndBarcode</v></p><p><k>event_name</k><v>beforeShow</v></p><p><k>source_type</k><v>widget</v></p><p><k>clc</k><v>nc.ssc.ssctaskprocess.jobList.BussAndBarcodeViewController</v></p><p><k>el</k><v>0</v></p><p><k>source_id</k><v>bussAndBarcode</v></p><p><k>m_n</k><v>beforeShow_onLoadDS</v></p><p><k>source_type</k><v>widget</v></p><p><k>event_name</k><v>beforeShow</v></p><p><k>query_param_keyvalue</k><v>MASTER_KEY</v></p><p><k>query_param_pageindex</k><v>0</v></p><p><k>hasChanged</k><v>false</v></p></ps><ps><p><k>source_id</k><v>main</v></p><p><k>widget_id</k><v>main</v></p><p><k>event_name</k><v>beforeShow</v></p><p><k>source_type</k><v>widget</v></p><p><k>clc</k><v>nc.ssc.ssctaskprocess.jobList.ListViewController</v></p><p><k>el</k><v>0</v></p><p><k>source_id</k><v>main</v></p><p><k>m_n</k><v>mainListBeforeShow</v></p><p><k>source_type</k><v>widget</v></p><p><k>event_name</k><v>beforeShow</v></p><p><k>query_param_keyvalue</k><v>MASTER_KEY</v></p><p><k>query_param_pageindex</k><v>0</v></p><p><k>hasChanged</k><v>false</v></p></ps></gps><c>{c: "PageUIContext", hasChanged: false}</c><widget id="bussAndBarcode"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="FilterDS"><data><![CDATA[<dataset id='bussAndBarcode.FilterDS' currentkey='' editable='false' randomRowIndex='0'><rowsets></rowsets></dataset>]]></data></dataset></widget><widget id="simplequery"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="mainds"><data><![CDATA[<dataset id='simplequery.mainds' currentkey='' editable='true' randomRowIndex='0'><dqps><dp name='query_param_keyvalue'>MASTER_KEY</dp><dp name='query_param_pageindex'>0</dp></dqps><rowsets></rowsets></dataset>]]></data></dataset><dataset id="masterds"><data><![CDATA[<dataset id='simplequery.masterds' currentkey='MASTER_KEY' editable='true' randomRowIndex='1'><rowsets><rowset pagecount="1" pagesize="-1" recordcount="1" pageindex="0" keyvalue="MASTER_KEY">
<rs pageindex="0">
<selected>0</selected>
<focus>0</focus>
<r id='0masterds$1'><add>。,。,。</add></r></rs></rowset></rowsets></dataset>]]></data></dataset></widget><widget id="main"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="jobDataset"><data><![CDATA[<dataset id='main.jobDataset' currentkey='' editable='false' randomRowIndex='0'><dqps><dp name='query_param_keyvalue'>MASTER_KEY</dp><dp name='query_param_pageindex'>0</dp></dqps><rowsets></rowsets></dataset>]]></data></dataset><dataset id="listds"><data><![CDATA[<dataset id='main.listds' currentkey='' editable='false' randomRowIndex='0'><rowsets></rowsets></dataset>]]></data></dataset></widget><widget id="filterView"><c>{c: "WidgetUIContext", visible: true}</c></widget><cc>{hasChanged: false, widgets: [{id: "simplequery", comps: [{id: "mainform", eles: [{id: "billcode", enable: false}, {id: "pk_billtype_mc", enable: false}, {id: "pk_billtype", enable: false}, {id: "appointtime_start", enable: false}, {id: "appointtime_end", enable: false}, {id: "pk_busiactivity_mc", enable: false}, {id: "pk_busiactivity", enable: false}], compType: "autoform"}]}, {id: "main", comps: [{id: "listgrid", editable: false, compType: "gridcomp"}]}]}</cc></e></root>`;
val = `<?xml version="1.0" encoding='UTF-8'?>
<xml>
    <exp-text>
    </exp-text>
    <show-message>
    </show-message>
    <exp-stack>        <![CDATA[]]>
    </exp-stack>
    <success>true</success>
    <contents>
        <content>            <![CDATA[<?xml version="1.0" encoding='UTF-8'?>
<e>
    <isPlug>false</isPlug>
    <pagemeta>
        <widget id="main">
            <dataset id="jobDataset">
                <data>                    <CD><dataset id="jobDataset" focusIndex="-1" currentkey="MASTER_KEY" editable="false" isCleared="false" randomRowIndex="0">
    <dsps>
    </dsps>
    <rowsets>
    <rowset pagecount="1" pagesize="20" recordcount="0" pageindex="0" keyvalue="MASTER_KEY">
    <rs pageindex="0" changed="true">
</rs>
    </rowset>
    </rowsets>
</dataset>
</CD>
                </data>
            </dataset>
        </widget>
        <widget id="fetchCondition">
        </widget>
        <widget id="bussAndBarcode">
            <dataset id="FilterDS">
                <data>                    <CD><dataset id="FilterDS" focusIndex="0" currentkey="MASTER_KEY" editable="false" isCleared="false" randomRowIndex="5">
    <dsps>
    </dsps>
    <rowsets>
    <rowset pagecount="1" pagesize="-1" recordcount="0" pageindex="0" keyvalue="MASTER_KEY">
    <rs pageindex="0" changed="true">
<selected>0</selected>
<r id="0FilterDS$1" ><add>toDispose,%E5%BE%85%E5%A4%84%E7%90%86</add></r>
<r id="0FilterDS$2" ><add>disposed,%E5%B7%B2%E5%A4%84%E7%90%86</add></r>
<r id="0FilterDS$3" ><add>rejected,%E5%B7%B2%E9%A9%B3%E5%9B%9E</add></r>
</rs>
    </rowset>
    </rowsets>
</dataset>
</CD>
                </data>
            </dataset>
        </widget>
        <widget id="filterView">
        </widget>
        <widget id="simplequery">
        </widget>
        <cc>            <CD>{"widgets":[{"menus":[{"itemContexts":[{"childItemContexts":[{"visible":false,"id":"lookOverCredence"},{"visible":false,"id":"lookOverAdjunct"}],"id":"lookOver"}],"id":"menubar"}],"comps":[{"id":"listgrid"}],"id":"main"}]}</CD>
        </cc>
    </pagemeta>
</e>
]]>
        </content>
    </contents>
</xml>`;
obj2[xxtrim(key)] = val;

// source_id = FilterDS
key = `<root><e id="jobList"><gps><ps><p><k>source_id</k><v>FilterDS</v></p><p><k>widget_id</k><v>bussAndBarcode</v></p><p><k>event_name</k><v>onAfterRowSelect</v></p><p><k>source_type</k><v>dataset</v></p><p><k>clc</k><v>nc.ssc.ssctaskprocess.jobList.BussAndBarcodeViewController</v></p><p><k>el</k><v>2</v></p><p><k>source_id</k><v>FilterDS</v></p><p><k>m_n</k><v>Dataset_FilterDS_plugevent</v></p><p><k>source_type</k><v>dataset</v></p><p><k>event_name</k><v>onAfterRowSelect</v></p><p><k>query_param_keyvalue</k><v>MASTER_KEY</v></p><p><k>query_param_pageindex</k><v>0</v></p><p><k>hasChanged</k><v>false</v></p><p><k>plugid</k><v>filterout</v></p><p><k>plugsource</k><v>bussAndBarcode</v></p><p><k>plug</k><v>1</v></p></ps></gps><c>{c: "PageUIContext", hasChanged: false}</c><widget id="bussAndBarcode"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="FilterDS"><data><![CDATA[<dataset id='bussAndBarcode.FilterDS' currentkey='MASTER_KEY' editable='false' randomRowIndex='5'><rowsets><rowset pagecount="1" pagesize="-1" recordcount="3" pageindex="0" keyvalue="MASTER_KEY">
<rs pageindex="0">
<selected>0</selected>
<focus>0</focus>
<r id='0FilterDS$1'><add>toDispose,%E5%BE%85%E5%A4%84%E7%90%86</add></r><er id="0FilterDS$2"/><er id="0FilterDS$3"/></rs></rowset></rowsets></dataset>]]></data></dataset></widget><widget id="simplequery"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="mainds"><data><![CDATA[<dataset id='simplequery.mainds' currentkey='MASTER_KEY' editable='true' randomRowIndex='1'><dqps><dp name='query_param_keyvalue'>MASTER_KEY</dp><dp name='query_param_pageindex'>0</dp></dqps><rowsets><rowset pagecount="1" pagesize="-1" recordcount="1" pageindex="0" keyvalue="MASTER_KEY">
<rs pageindex="0">
<selected>0</selected>
<focus>0</focus>
<r id='0mainds$1'><add>。,。,。,。,。,。,。</add></r></rs></rowset></rowsets></dataset>]]></data></dataset><dataset id="masterds"><data><![CDATA[<dataset id='simplequery.masterds' currentkey='MASTER_KEY' editable='true' randomRowIndex='1'><rowsets><rowset pagecount="1" pagesize="-1" recordcount="1" pageindex="0" keyvalue="MASTER_KEY">
<rs pageindex="0">
<selected>0</selected>
<focus>0</focus>
<r id='0masterds$1'><add>。,。,。</add></r></rs></rowset></rowsets></dataset>]]></data></dataset></widget><widget id="main"><c>{c: "WidgetUIContext", visible: true}</c><dataset id="jobDataset"><data><![CDATA[<dataset id='main.jobDataset' currentkey='MASTER_KEY' editable='false' randomRowIndex='0'><dqps><dp name='query_param_keyvalue'>MASTER_KEY</dp><dp name='query_param_pageindex'>0</dp></dqps><rowsets><rowset pagecount="1" pagesize="20" recordcount="0" pageindex="0" keyvalue="MASTER_KEY">
<rs pageindex="0">
<selected></selected>
</rs></rowset></rowsets></dataset>]]></data></dataset><dataset id="listds"><data><![CDATA[<dataset id='main.listds' currentkey='' editable='false' randomRowIndex='0'><rowsets></rowsets></dataset>]]></data></dataset></widget><widget id="filterView"><c>{c: "WidgetUIContext", visible: true}</c></widget><cc>{hasChanged: false, widgets: [{id: "simplequery", comps: [{id: "mainform", eles: [], compType: "autoform"}]}]}</cc></e></root>`;
val = `<?xml version="1.0" encoding='UTF-8'?>
<xml>
    <exp-text>
    </exp-text>
    <show-message>
    </show-message>
    <exp-stack>        <![CDATA[]]>
    </exp-stack>
    <success>true</success>
    <contents>
        <content>            <![CDATA[<?xml version="1.0" encoding='UTF-8'?>
<e>
    <isPlug>true</isPlug>
    <pagemeta>
        <widget id="main">
            <dataset id="jobDataset">
                <data>                    <CD><dataset id="jobDataset" focusIndex="-1" currentkey="MASTER_KEY" editable="false" isCleared="true" randomRowIndex="0">
    <dsps>
    </dsps>
    <rowsets>
    <rowset pagecount="1" pagesize="20" recordcount="0" pageindex="0" keyvalue="MASTER_KEY">
    <rs pageindex="0" changed="true">
</rs>
    </rowset>
    </rowsets>
</dataset>
</CD>
                </data>
            </dataset>
        </widget>
        <widget id="fetchCondition">
        </widget>
        <widget id="bussAndBarcode">
        </widget>
        <widget id="filterView">
        </widget>
        <widget id="simplequery">
            <dataset id="mainds">
                <data>                    <CD><dataset id="mainds" focusIndex="0" currentkey="MASTER_KEY" editable="true" isCleared="true" randomRowIndex="2">
    <dsps>
    </dsps>
    <rowsets>
    <rowset pagecount="1" pagesize="-1" recordcount="0" pageindex="0" keyvalue="MASTER_KEY">
    <rs pageindex="0" changed="true">
<selected>0</selected>
<r id="0mainds$2" ><add>。,。,。,。,。,。,。</add></r>
</rs>
    </rowset>
    </rowsets>
</dataset>
</CD>
                </data>
            </dataset>
        </widget>
        <cc>            <CD>{"widgets":[{"menus":[{"itemContexts":[{"visible":true,"id":"pointPick"}],"id":"menubar"}],"comps":[{"columnContexts":[{"column_visible":false,"id":"endtime"}],"id":"listgrid"}],"id":"main"},{"comps":[{"innerHTML":"<table  width='100%'><tr><td width='50%'><table  width='280px'><tr><td width='100px'><div style=\"float:left;line-height:16px;margin-right:20px;\">\u4e1a\u52a1\u6d3b\u52a8<\/div><\/td><td width='45px'><div><a  name='\u4e1a\u52a1\u6d3b\u52a8'  id='\u4e1a\u52a1\u6d3b\u52a8_\u5168\u90e8'  href='javascript:void(0);' onclick=\"filterBuzActive('\u4e1a\u52a1\u6d3b\u52a8','\u4e1a\u52a1\u6d3b\u52a8_\u5168\u90e8');\" style='float:left;line-height:16px;margin-right:10px;color:#e58f17;font-weight:bold;'>\u5168\u90e8<\/a><\/div><\/td><td width='1px'><div style='float:left;line-height:16px;margin-right:10px;'>|<\/div><\/td><td width='45px'><div><a  name='\u4e1a\u52a1\u6d3b\u52a8'  id='\u4e1a\u52a1\u6d3b\u52a8_\u5ba1\u6838'  href='javascript:void(0);' onclick=\"filterBuzActive('\u4e1a\u52a1\u6d3b\u52a8','\u4e1a\u52a1\u6d3b\u52a8_\u5ba1\u6838');\"  style='float:left;line-height:16px;margin-right:10px;color:#0086b2;'>\u5ba1\u6838<\/a><\/div><\/td><td width='1px'><div style='float:left;line-height:16px;margin-right:10px;'>|<\/div><\/td><td width='60px'><div><a  name='\u4e1a\u52a1\u6d3b\u52a8'  id='\u4e1a\u52a1\u6d3b\u52a8_\u590d\u6838'  href='javascript:void(0);' onclick=\"filterBuzActive('\u4e1a\u52a1\u6d3b\u52a8','\u4e1a\u52a1\u6d3b\u52a8_\u590d\u6838');\"  style='float:left;line-height:16px;margin-right:10px;color:#0086b2;'>\u590d\u6838<\/a><\/div><\/td><td width='1px'><div style='float:left;line-height:16px;margin-right:10px;'><\/div><\/td><\/tr><\/table><\/td><td><table  width='280px'><tr><td width='100px'><div style=\"float:left;line-height:16px;margin-right:20px;\">\u7d27\u6025\u72b6\u6001<\/div><\/td><td width='45px'><div><a  name='\u7d27\u6025\u72b6\u6001'  id='\u7d27\u6025\u72b6\u6001_\u5168\u90e8'  href='javascript:void(0);' onclick=\"filterexigencelevel('\u7d27\u6025\u72b6\u6001','\u7d27\u6025\u72b6\u6001_\u5168\u90e8');\" style='float:left;line-height:16px;margin-right:10px;color:#e58f17;font-weight:bold;'>\u5168\u90e8<\/a><\/div><\/td><td width='1px'><div style='float:left;line-height:16px;margin-right:10px;'>|<\/div><\/td><td width='45px'><div><a  name='\u7d27\u6025\u72b6\u6001'  id='\u7d27\u6025\u72b6\u6001_exigence'  href='javascript:void(0);' onclick=\"filterexigencelevel('\u7d27\u6025\u72b6\u6001','\u7d27\u6025\u72b6\u6001_exigence');\" style='float:left;line-height:16px;margin-right:10px;color:#0086b2;'>\u7d27\u6025<\/a><\/div><\/td><td width='1px'><div style='float:left;line-height:16px;margin-right:10px;'>|<\/div><\/td><td width='60px'><div><a  name='\u7d27\u6025\u72b6\u6001'  id='\u7d27\u6025\u72b6\u6001_unexigence'  href='javascript:void(0);' onclick=\"filterexigencelevel('\u7d27\u6025\u72b6\u6001','\u7d27\u6025\u72b6\u6001_unexigence');\" style='float:left;line-height:16px;margin-right:10px;color:#0086b2;'>\u4e0d\u7d27\u6025<\/a><\/div><\/td><td width='1px'><div style='float:left;line-height:16px;margin-right:10px;'><\/div><\/td><\/tr><\/table><\/td><\/tr><tr><td width='50%'><table  width='343px'><tr><td width='100px'><div style=\"float:left;line-height:16px;margin-right:20px;\">\u6d3e\u5de5\u65f6\u95f4<\/div><\/td><td width='45px'><div><a  name='\u6d3e\u5de5\u65f6\u95f4'  id='\u6d3e\u5de5\u65f6\u95f4_\u5168\u90e8'  href='javascript:void(0);' onclick=\"filterpaitime('\u6d3e\u5de5\u65f6\u95f4','\u6d3e\u5de5\u65f6\u95f4_\u5168\u90e8');\" style='float:left;line-height:16px;margin-right:10px;color:#e58f17;font-weight:bold;'>\u4e0d\u9650<\/a><\/div><\/td><td width='1px'><div style='float:left;line-height:16px;margin-right:10px;'>|<\/div><\/td><td width='45px'><div><a  name='\u6d3e\u5de5\u65f6\u95f4'  id='\u6d3e\u5de5\u65f6\u95f4_today'  href='javascript:void(0);' onclick=\"filterpaitime('\u6d3e\u5de5\u65f6\u95f4','\u6d3e\u5de5\u65f6\u95f4_today');\" style='float:left;line-height:16px;margin-right:10px;color:#0086b2;'>\u4eca\u5929<\/a><\/div><\/td><td width='1px'><div style='float:left;line-height:16px;margin-right:10px;'>|<\/div><\/td><td width='45px'><div><a  name='\u6d3e\u5de5\u65f6\u95f4'  id='\u6d3e\u5de5\u65f6\u95f4_week'  href='javascript:void(0);' onclick=\"filterpaitime('\u6d3e\u5de5\u65f6\u95f4','\u6d3e\u5de5\u65f6\u95f4_week');\" style='float:left;line-height:16px;margin-right:10px;color:#0086b2;'>\u672c\u5468<\/a><\/div><\/td><td width='1px'><div style='float:left;line-height:16px;margin-right:10px;'>|<\/div><\/td><td width='60px'><div><a  name='\u6d3e\u5de5\u65f6\u95f4'  id='\u6d3e\u5de5\u65f6\u95f4_month'  href='javascript:void(0);' onclick=\"filterpaitime('\u6d3e\u5de5\u65f6\u95f4','\u6d3e\u5de5\u65f6\u95f4_month');\" style='float:left;line-height:16px;margin-right:10px;color:#0086b2;'>\u672c\u6708<\/a><\/div><\/td><td width='1px'><div style='float:left;line-height:16px;margin-right:10px;'><\/div><\/td><\/tr><\/table><\/td><td><table  width='280px'><tr><td width='100px'><div style=\"float:left;line-height:16px;margin-right:20px;\">\u4efb\u52a1\u72b6\u6001<\/div><\/td><td width='45px'><div><a  name='\u4efb\u52a1\u72b6\u6001'  id='\u4efb\u52a1\u72b6\u6001_\u5168\u90e8' href='javascript:void(0);' onclick=\"filtertaskstatus('\u4efb\u52a1\u72b6\u6001','\u4efb\u52a1\u72b6\u6001_\u5168\u90e8');\" style='float:left;line-height:16px;margin-right:10px;color:#e58f17;font-weight:bold;'>\u5168\u90e8<\/a><\/div><\/td><td width='1px'><div style='float:left;line-height:16px;margin-right:10px;'>|<\/div><\/td><td width='45px'><div><a  name='\u4efb\u52a1\u72b6\u6001'  id='\u4efb\u52a1\u72b6\u6001_\u5df2\u6302\u8d77' href='javascript:void(0);' onclick=\"filtertaskstatus('\u4efb\u52a1\u72b6\u6001','\u4efb\u52a1\u72b6\u6001_\u5df2\u6302\u8d77');\" style='float:left;line-height:16px;margin-right:10px;color:#0086b2;'>\u6302\u8d77<\/a><\/div><\/td><td width='1px'><div style='float:left;line-height:16px;margin-right:10px;'>|<\/div><\/td><td width='60px'><div><a  name='\u4efb\u52a1\u72b6\u6001'  id='\u4efb\u52a1\u72b6\u6001_\u5f85\u8c03\u6574' href='javascript:void(0);' onclick=\"filtertaskstatus('\u4efb\u52a1\u72b6\u6001','\u4efb\u52a1\u72b6\u6001_\u5f85\u8c03\u6574');\" style='float:left;line-height:16px;margin-right:10px;color:#0086b2;'>\u5f85\u8c03\u6574<\/a><\/div><\/td><td width='1px'><div style='float:left;line-height:16px;margin-right:10px;'><\/div><\/td><\/tr><\/table><\/td><\/tr><tr><td colspan='2'><table><tr><td width='80px'><div style=\"float:left;line-height:16px;margin-right:20px;\">\u5355\u636e\u7c7b\u578b<\/div><\/td><td width='39px'><div><a  name='\u5355\u636e'  id='\u5355\u636e\u7c7b\u578b_\u5168\u90e8' href='javascript:void(0);' onclick=\"filterBillType('\u5355\u636e','\u5355\u636e\u7c7b\u578b_\u5168\u90e8');\" style='float:left;line-height:16px;margin-right:10px;color:#e58f17;font-weight:bold;'>\u5168\u90e8<\/a><\/div><\/td><\/tr><\/table><\/td><\/tr><\/table>","id":"funhtmlcontent"}],"id":"filterView"}]}</CD>
        </cc>
        <beforeExec>            <CD>var currForm = pageUI.getWidget('main');
var $c_main_card2370 = currForm.getCard('card2370');
if($c_main_card2370){
$c_main_card2370.setPage(0);
};
layoutInitFunc();

var currForm = pageUI.getWidget('bussAndBarcode');
var $c_bussAndBarcode_card2371 = currForm.getCard('card2371');
if($c_bussAndBarcode_card2371){
$c_bussAndBarcode_card2371.setPage(0);
};
layoutInitFunc();

var $c_card2372 = pageUI.getCard('card2372');
if($c_card2372){
$c_card2372.setPage(0);
};
layoutInitFunc();

</CD>
        </beforeExec>
    </pagemeta>
</e>
]]>
        </content>
    </contents>
</xml>`;
obj2[xxtrim(key)] = val;

console.log("======================== start ========================");
Object.keys(obj2).map(function(key) { console.log(key); console.log("---------------------------"); });
console.log("======================== end ========================");











function xxtrim(str) {
  return str.replace(/(\r\n|\n|\r)/gm,"");
}

function sendFile (i, res) {
  console.log('sendFile', i);
  res.sendFile(`${ROOT}/client/api/portal/core/${i}.xml`);
}

function expExpensePortlet(req, res, xml) {
  switch(xml) {
    // 刷新页面时候发的连续两次请求
    case x1:
      sendFile(1, res);
      break;
    case x2:
      sendFile(2, res);
      break;
      
    // 点击“未完成”切换标签页时候
    // 估计是加载table data
    case x3:
      sendFile(3, res);
      break;
    case x4:
      sendFile(4, res);
      break;
    
    case x5:
      sendFile(5, res);
      break;
      
    // 点击查询按钮
    case x6:
      sendFile(6, res);
      break;
    case x7:
      sendFile(7, res);
      break;
    
    default:
    
      if (typeof obj[xml] === 'string') {
        res.send(obj[xml]);
        break;
      }
      
      console.log("Not match any xml string, using xml2js to parse");
    
      var parseString = require('xml2js').parseString;
      parseString(req.body.xml, function (err, result) {
        //console.log(1, JSON.stringify(result));
        var root = result.root;
        var e = root.e[0]; // the first <e> tag
        var id = e.$.id;
        
        // Array object
        if (typeof e.ps === 'object') {
          var ps = e.ps[0]; // the first <ps> tag
        }
        
        if (id === 'expExpensePortlet') {
          console.log('[Controller] nc.bs.er.expExpensePortlet.ctrl.MainViewController');
          var controller = require('./nc.bs.er.expExpensePortlet.ctrl.MainViewController');
          controller(req, res, root);
        } else {
          res.status(404)        // HTTP status 404: NotFound
            .send('Not found');
        }
      });
  }
}

function jobList(req, res, xml) {
  xml = xxtrim(xml);
  console.log('key length: ', xml.length);
  console.log('key: ', xml);
  
  if (typeof obj2[xml] === 'string') {
    res.send(obj2[xml]);
  } else {
    console.log('xml key not found.');
    res.status(404)        // HTTP status 404: NotFound
      .send('Not found');
  }
}

module.exports = function (router) {
  // /portal/core
  router.post("/portal/core", function (req, res) {
    console.log('POST /portal/core');

    var xml = /*xxtrim*/(req.body.xml);
    //console.log(xml.length, xml);
    //console.log(x2.length, x2);
    //console.log('xxdebug', x2 == xml)

    var pageId = req.body.pageId;
    console.log(`pageId: ${pageId}`);
    switch(pageId) {
      case 'expExpensePortlet':
        expExpensePortlet(req, res, xml);
        break;
      case 'jobList':
        jobList(req, res, xml);
        break;
      default:
        res.status(404)        // HTTP status 404: NotFound
          .send('Not found');
    }
  });
};
