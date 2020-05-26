/*
 * 顶部导航
 * @Author: ahwgs
 * @Date: 2020-05-26 22:33:58
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-05-27 00:02:25
 */
import React from 'react';

import { NavBar, Icon } from 'antd-mobile';
import { history } from 'umi';
import { NavigationBarOption } from '@/common/types';

export interface NavigationBarProps {
  title: string;
  ref?: any;
}

export interface NavigationBarState {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

class NavigationBar extends React.PureComponent<NavigationBarProps, NavigationBarState> {
  constructor(props: NavigationBarProps) {
    super(props);
    this.state = {
      leftContent: null,
      rightContent: null,
    };
  }

  onLeftClick = () => {
    const { leftContent } = this.state;
    if (leftContent) return;
    history.goBack();
  };

  setOption = (option: NavigationBarOption) => {
    const { leftContent, rightContent } = option;
    this.setState({
      leftContent,
      rightContent,
    });
  };

  render() {
    const { title } = this.props;

    const { rightContent, leftContent } = this.state;

    const rightContentRender = () => {
      if (rightContent && typeof rightContent !== 'string') {
        return [rightContent];
      }

      return null;
    };

    const leftContentRender = () => {
      if (leftContent && typeof leftContent !== 'string') {
        return [leftContent];
      }
      return null;
    };

    return (
      <NavBar
        mode="light"
        leftContent={leftContentRender()}
        icon={leftContent ? null : <Icon type="left" />}
        onLeftClick={this.onLeftClick}
        rightContent={rightContentRender()}
      >
        {title}
      </NavBar>
    );
  }
}

export default NavigationBar;
