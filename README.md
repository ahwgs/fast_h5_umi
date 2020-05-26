# umi h5 快速启动模版

### 快速开始

#### 脚本
- 安装依赖
```
yarn 
```
- 启动项目
```
yarn start
```

### 功能列表
- [x] git message 校验
- [x] eslint+prettier代码格式化
- [x] 高清方案配置(移动端适配)
- [x] 应用多环境管理
- [x] mock方案集成
- [x] 全局样式注入
- [x] 通用布局组件封装 
- [x] 使用`dva`
- [x] 使用`antd-mobile`组件库
- [x] `h5`内部导航封装
- [ ] 权限封装
- [ ] 请求二次封装
- [ ] 使用`Sentry`进行异常监控
- [ ] 使用`SSR`构建项目 
- [ ] 使用oss插件，构建自动上传阿里云
- [ ] 接入百度统计谷歌统计
- [ ] plop自动生成组件文件
- [ ] 待补充...

#### 具体描述

- 高清方案

也就是移动端适配，目前采用的是`@alitajs/hd`,因为官方还没将高清方案的代码合并，待后续换成`umi-plugin-hd`

- 多环境封装

采用在脚本中添加`PRO_VAR`方式区分，目前`start`脚本默认使用本地`mock`，其他分别对应相应环境

- 全局样式注入

使用时，在编写`less`样式时，可使用`styles/index.less`下引入的所有样式，包括`mixins/`下工具，以及`themes/default`下`antd-mobile`的主题变量

不需要单独在每个页面单独引入

也可在`config/theme.config.ts`下修改`antd-mobile`变量值

栗子:
```less
.page{
  display: flex;
  font-size: 15px;
  color: @brand-primary; // antd-mobile主题变量 并且在config/theme.config.ts 修改过
  background-color: @brand-important; // antd-mobile主题变量 默认没有修改过
  .ellipsis(); // styles/mixins/util.less 的工具样式
}
```

- `h5`导航封装

具体可查看`BasicLayout`以及`NavgationBar`

可在页面内使用`utils/nav.ts`下的`setOption`对导航进行设置

目前导航支持设置参数有：
