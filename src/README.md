# portalbillquery

## Release/Publish

client/portalbillquery/
  - css/
  - fonts/
  - common.build.js
  - index.build_baozhangren.js
  - index.build_zuoyeren.js

=> git@github.com:yyssc/portalbillquery.git

All release:

[https://github.com/yyssc/portalbillquery-release/releases](https://github.com/yyssc/portalbillquery-release/releases)

## React components tree

<pre>
ArchContainer
|-- Grid 布局
|   |-- Row
|   |   `-- Col
|   |       `-- AdminCardActions 数据操作按钮
|   `-- Row
|       `-- Col
|           `-- AdminTable 表格
|-- AdminEditDialog
|   `-- AdminEditForm 编辑表单
`-- AdminEditDialog
    `-- AdminEditForm 创建表单
</pre>

组件结构图

![](https://docs.google.com/drawings/d/1tDPkbnKg0LESWVVfw_bP96HA5pJObeLsaCRxSUEdUbo/pub?w=960&h=720)

## Demos

- AdminEditForm http://127.0.0.1:3008/sample/#/form

## Naming rule

### user operations

- `Create`, `Add` - create or add new entries
- `Read`, `Retrieve`, `Search`, `View` - read, retrieve, search, or view existing entries
- `Update`, `Edit` - update or edit existing entries
- `Delete`, `Deactivate`, `Remove` - delete/deactivate/remove existing entries

### Action name

`<noun>-<verb>`，比如`Project-Create`, `User-Login`，这样以object type（而不是action type）进行分组。

https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e#7f41

## 创建新页面的一般步骤

比如页面名称叫做“基础档案配置页面”，那么名称定为`ArchSetting`

1. 创建Container，位置`./containers/ArchSettingPage.js`
1. 创建Action，位置`./actions/archSetting.js`
1. 创建Action type，位置`./constants/ArchSettingActionTypes.js`
1. 创建Reducer，位置`./reducers/archSetting.js`
  - 并添加到`combineReducers()`中，位置`./reducers/index.js`
1. 添加到Sidebar中，位置`./components/Sidebar.js`
1. 添加到Router中，位置`./index.js`
1. 创建fake API，位置`../../app_admin.js`
  - 创建middleware，位置`../server/routes/fakeApiArchSetting.js`

## Redux actions and reducers

![Redux actions and reducers](https://docs.google.com/drawings/d/163ixocYs8FJHo4WalW_bsZWg0w3PwZfg7xrSDM8Kq_E/pub?w=960&h=720)

## 常用网址

- 内网测试地址 http://10.1.78.23:3008/admin
- 外网测试地址 http://101.200.74.182:3008/admin
- SSC 3.0 on Google Drive - https://drive.google.com/drive/folders/0B_RIK8efdyq-QUx6RG9yaVR2cjA?usp=sharing
- SSC 3.0 on Trello - https://trello.com/b/eDqydOZ4/ssc-3-0