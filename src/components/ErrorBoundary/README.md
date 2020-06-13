## ErrorBoundary

基于`react 16`的`componentDidCatch`生命周期实现，做异常处理

也可在此组件中做组件异常上报

### API

#### Props

|  属性   | 值  | 描述 | 默认值
|  ----  | ----  | ---- | ----
| `error`  | `string | React.ReactNode` | 错误内容，可以是文案也可以是组件 | 抱歉，您访问的页面出问题啦,点击屏幕返回首页
| `onErrorClick` | `Function` | 错误发生后点击事件 | 返回应用首页
