import React from 'react';
import { ConnectProps, ConnectState } from '@/models/connect';
import { connect, useDispatch } from 'umi';
import './index.less';

interface IProps extends ConnectProps {
  loading: boolean;
  currentUser: APP.ICurrentUser;
}

const HomePage: React.FC<IProps> = props => {
  const { loading, currentUser } = props;
  const dispatch = useDispatch();
  console.log('currentUser', currentUser, loading);
  const getUser = () => {
    dispatch({
      type: 'user/fetchCurrent',
    });
  };

  React.useEffect(() => {
    getUser();
  }, [getUser]);

  return <div>首页</div>;
};

HomePage.defaultProps = {
  loading: false,
};

export default connect(({ user, loading }: ConnectState) => ({
  loading: loading.effects['user/fetchCurrent'],
  currentUser: user.currentUser,
}))(HomePage);
