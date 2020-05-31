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
- [x] 权限封装
- [x] 请求二次封装
- [x] 使用`Sentry`进行异常监控
- [ ] 使用`SSR`构建项目 
- [ ] 使用`oss`插件，构建自动上传阿里云
- [ ] 接入百度统计谷歌统计
- [ ] `plop`自动生成组件文件
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

|  属性   | 值  |
|  ----  | ----  |
| leftContent  | React.ReactNode |
| rightContent | React.ReactNode |

- 请求二次封装

自行查看`utils/request.ts`，默认导出了四种请求方式，
可自行根据业务需要调整`HttpCode`的枚举值

- 权限封装 

使用`antd-pro`的权限方案，在`pages/Authorized`可查看具体内容

在`router`中配置`authority`接受一个数组

如果是不用登录就能访问无需配置`authority`

需要登录才能访问`[user]`

需要登录并且需要二次认证之类的`[user,admin]`

- 使用`Sentry`进行异常监控

主要使用`@sentry/browser`这个包，具体使用方法可查看官方文档，这里对它进行二次封装具体在`utils/report.ts`

处理全局脚本错误
```javascript
// 注册全局错误处理
  public registerGlobalError() {
    // 全局监控资源加载错误
    window.addEventListener(
      'error',
      event => {
        // 过滤 js error
        const target = event.target || event.srcElement;
        // eslint-disable-next-line no-multi-spaces
        const isElementTarget =
          target instanceof HTMLScriptElement ||
          target instanceof HTMLLinkElement ||
          target instanceof HTMLImageElement;
        if (!isElementTarget) {
          return false;
        }
        // 上报资源地址
        const url =
          (target as HTMLScriptElement | HTMLImageElement).src || (target as HTMLLinkElement).href;

        this.log({
          error: new Error(`ResourceLoadError: ${url}`),
          type: 'resource load',
        });
      },
      true,
    );
  }
```

处理全局接口异常`utls/request.ts`
```javascript
function errorReport(
  url: string,
  error: string | Error,
  requestOptions: AxiosRequestConfig,
  response?: AnyObject,
) {
  if (window.$sentry) {
    const errorInfo: ServerApiErrorInfo = {
      error: typeof error === 'string' ? new Error(error) : error,
      type: 'request',
      requestUrl: url,
      requestOptions: JSON.stringify(requestOptions),
    };

    if (response) {
      errorInfo.response = JSON.stringify(response);
    }

    window.$sentry.log(errorInfo);
  }
}
```

注意，这里还使用了`@sentry/webpack-plugin`实现打包将`source-map`文件上传至`Sentry`服务器实现文件预览

需要在项目根目录下新建`.sentryclirc`，因为设计账号，我将该文件排除上传至`git`了。

文件格式为：
```
[defaults]
url=https://sentry.io
org=xxx  # 组织名
project=xx  # 项目名

[auth]
token=xxx  # token
```