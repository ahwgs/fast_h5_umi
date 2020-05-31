import React from 'react';
import styles from './index.less';

export interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.PureComponent<any, IErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  handleTap = () => {
    window.location.href = window.location.origin;
  };

  componentDidCatch(error: any, info: any) {
    const errorInfo = {
      // @ts-ignore
      error: typeof error === 'string' ? new Error({ error }) : error,
      type: 'page error',
      errorInfo: info,
      info: error,
    };
    this.setState({
      hasError: true,
    });
    if (window.$sentry) window.$sentry.log(errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <section className={styles.warp} onClick={this.handleTap}>
          <div>抱歉，您访问的页面出问题啦</div>
          <p>点击屏幕返回首页</p>
        </section>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
