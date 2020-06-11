/*
 * user相关mock
 * @Author: ahwgs
 * @Date: 2020-05-23 02:03:32
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-06-01 06:58:07
 */

function fetchLogin(req: any, res: any) {
  const { phone, password } = req.body;
  if (phone === '15912341234' && password === '123456') {
    res.cookie('userToken', 'xff651c19f5824f769cedc5878fd33bd9|0f58fdb0959e07681a930ace0bbf47ca', {
      maxAge: 31536000000,
      httpOnly: true,
    });
    res.send({
      data: true,
      code: 0,
      hasError: false,
    });
    return;
  }
  // 用户名或者密码错误
  res.send({
    data: true,
    code: 2001,
    hasError: false,
  });
}

const userInfo = {
  data: {
    name: 'fast-h5-umi',
    status: 1,
  },
  code: 0,
  hasError: false,
  message: 'success',
};

export default {
  'POST /api/users/login': fetchLogin,
  'GET /api/user/info': userInfo,
};
