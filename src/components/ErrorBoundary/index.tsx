import React from 'react';
import Icon from '@/common/icons';
import styles from './index.less';

export interface IErrorBoundaryState {
  hasError: boolean;
}

export interface IErrorBoundaryProps {
  error?: string | React.ReactNode;
  onErrorClick?: Function;
}

class ErrorBoundary extends React.PureComponent<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  handleTap = () => {
    const { onErrorClick } = this.props;
    if (onErrorClick) {
      onErrorClick();
      return;
    }
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
    const { children, error } = this.props;
    if (hasError) {
      return (
        <section className={styles.warp} onClick={this.handleTap}>
          <section className={styles.error}>
            <img src={Icon.emptyErrorIcon} alt="" />
            <p>
              {error && typeof error === 'string'
                ? error
                : '抱歉，您访问的页面出问题啦,点击屏幕返回首页'}
            </p>
          </section>
          {error && typeof error === 'string' ? <p>{error}</p> : error}
        </section>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
