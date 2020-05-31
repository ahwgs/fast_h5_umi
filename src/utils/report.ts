/*
 * Sentry 上报
 * @Author: ahwgs
 * @Date: 2020-06-01 06:27:51
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-06-01 06:28:13
 */

import * as Sentry from '@sentry/browser';
import { ReportOptions } from '@/common/types';
/**
 * 日志上报
 * @class Report
 */
class Report {
  public options: ReportOptions;

  private static instance: Report;

  constructor(options: ReportOptions) {
    this.options = options;
  }

  // 单例模式 保证只有一个Report
  static getInstance(options: ReportOptions) {
    if (!this.instance) {
      this.instance = new Report(options);
      this.instance.install();
      this.instance.registerGlobalError();
    }
    return this.instance;
  }

  // 安装
  public install() {
    Sentry.init({
      dsn: this.options.dsn,
      release: this.options.release,
      environment: this.options.environment,
      debug: this.options.debug,
    });
  }

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

  // 发送日志
  // eslint-disable-next-line class-methods-use-this
  public log(errorInfo: AnyObject) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        if (key !== 'error') {
          scope.setExtra(key, errorInfo[key]);
        }
      });
      Sentry.captureException(errorInfo.error || new Error(''));
    });
  }
}

export default Report;
