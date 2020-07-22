import React from 'react';
import { ConnectState } from '@/models/connect';
import { connect, ConnectProps } from 'umi';
import styles from './index.less';

interface IProps extends ConnectProps {
  loading: boolean;
  currentUser: APP.ICurrentUser;
}

const HomePage: React.FC<IProps> = props => {
  const { loading, currentUser } = props;

  React.useEffect(() => {}, []);
  return (
    <main className={styles.container}>
      <h2>基于react+typescript+umi3.x+antd-mobile+custom component构建h5通用模板</h2>
      <div className={styles.info}>
        <h3>下面数据取自model</h3>
        <p>当前loading状态：{loading}</p>
        <p>当前用户：{currentUser?.name}</p>
      </div>
      <section>
        <h3>主要功能：</h3>
        <ul>
          <li>- [x] git message 校验</li>
          <li>- [x] eslint+prettier代码格式化</li>
          <li>- [x] 高清方案配置(移动端适配)</li>
          <li>- [x] 应用多环境管理</li>
          <li>- [x] mock方案集成</li>
          <li>- [x] 全局样式注入</li>
          <li>- [x] 通用布局组件封装</li>
          <li>- [x]使用dva</li>
          <li>- [x] 使用antd-mobile组件库</li>
          <li>- [x] h5内部导航封装</li>
          <li>- [x] 权限封装</li>
          <li>- [x] 请求二次封装</li>
          <li>- [x] 使用Sentry进行异常监控</li>
          <li>- [x] 编写oss插件，构建自动上传阿里云</li>
          <li>- [x] 接入百度统计谷歌统计</li>
          <li>- [x] analyze打包资源分析</li>
          <li>- [x] 微信`js-sdk`二次封装</li>
        </ul>
      </section>
    </main>
  );
};

HomePage.defaultProps = {
  loading: false,
};

export default connect(({ user, loading }: ConnectState) => ({
  loading: loading.effects['user/fetchCurrent'],
  currentUser: user.currentUser,
}))(HomePage);
