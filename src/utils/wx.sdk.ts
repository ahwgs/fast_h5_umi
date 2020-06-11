// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable func-names */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */
/*
 * 微信JSSDK二次封装
 * @Author: ahwgs
 * @Date: 2020-06-11 23:29:03
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-06-12 00:19:51
 */
import wx from 'weixin-js-sdk';

// 失败回调定义
interface ErrorMsg {
  errMsg: string;
}

// 成功回调定义
interface SuccessMsg {
  result: string | undefined;
}

// 图片大小定义
interface SizeType {
  [index: number]: 'original' | 'compressed'; // 原图还是压缩图，默认二者都有
}

//
interface SourceType {
  [index: number]: 'album' | 'camera'; // 可以指定来源是相册还是相机，默认二者都有
}

// 扫码类型定义
interface ScanType {
  [index: number]: 'qrCode' | 'barCode'; // 可以指定扫二维码还是一维码，默认二者都有
}

// 卡卷定义
interface CardType {
  cardId: string; //
  cardExt: string;
}

const wxJS: AnyObject = {};
/**
 * 初始化微信
 * @param params
 */
wxJS.config = function config(params: {
  debug?: boolean; // 是否开启调试
  appId: string; // appid
  timestamp: string; // 必填，生成签名的时间戳
  nonceStr: string; // 必填，生成签名的随机串
  signature: string; // 必填，签名，见附录1
  jsApiList: any[]; // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    wx.config(params);
    wx.ready(resolve);
    wx.error((res: ErrorMsg) => {
      reject(new Error(res.errMsg));
    });
  });
};
/**
 * 判断当前客户端版本是否支持指定JS接口
 * @param params
 */
wxJS.checkJsApi = function checkJsApi(params: {
  jsApiList: any; // 需要检测的JS接口列表，所有JS接口列表见附录2
  success?: Function;
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.checkJsApi(params);
  });
};
/**
 * 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
 * @param params
 */
wxJS.onMenuShareTimeline = function onMenuShareTimeline(params: {
  title: string; // 分享标题
  link: string; // 分享链接，该链接域名必须与当前企业的可信域名一致
  imgUrl: string; // 分享图标
  success?: Function; // 用户确认分享后执行的回调函数
  cancel?: Function; // 用户取消分享后执行的回调函数
  fail?: Function; // 失败回调
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = function (res: SuccessMsg) {
      res.result = 'success';
      resolve(res);
    };
    params.cancel = function () {
      resolve({ result: 'cancel' });
    };
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.onMenuShareTimeline(params);
  });
};
/**
 * 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
 * @param params
 */
wxJS.updateAppMessageShareData = function (params: {
  title: string; // 分享标题
  desc: string; // 分享描述
  link: string; // 分享链接，该链接域名必须与当前企业的可信域名一致
  imgUrl: string; // 分享图标
  type: 'music' | 'video' | 'link'; // 分享类型,music、video或link，不填默认为link
  dataUrl?: string | null; // 如果type是music或video，则要提供数据链接，默认为空
  success?: Function; // 用户确认分享后执行的回调函数
  cancel?: Function; // 用户取消分享后执行的回调函数
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = function (res: SuccessMsg) {
      res.result = 'success';
      resolve(res);
    };
    params.cancel = function () {
      resolve({ result: 'cancel' });
    };
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.updateAppMessageShareData(params);
  });
};
/**
 * 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
 * @param params
 */
wxJS.updateTimelineShareData = function (params: {
  title: string; // 分享标题
  link: string; // 分享链接，该链接域名必须与当前企业的可信域名一致
  imgUrl: string; // 分享图标
  success?: Function; // 用户确认分享后执行的回调函数
  cancel?: Function; // 用户取消分享后执行的回调函数
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = function (res: SuccessMsg) {
      res.result = 'success';
      resolve(res);
    };
    params.cancel = function () {
      resolve({ result: 'cancel' });
    };
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.updateTimelineShareData(params);
  });
};
/**
 * 获取“分享给朋友”按钮点击状态及自定义分享内容接口
 * @param params
 */
wxJS.onMenuShareAppMessage = function (params: {
  title: string; // 分享标题
  desc: string; // 分享描述
  link: string; // 分享链接，该链接域名必须与当前企业的可信域名一致
  imgUrl: string; // 分享图标
  type: 'music' | 'video' | 'link'; // 分享类型,music、video或link，不填默认为link
  dataUrl?: string | null; // 如果type是music或video，则要提供数据链接，默认为空
  success?: Function; // 用户确认分享后执行的回调函数
  cancel?: Function; // 用户取消分享后执行的回调函数
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = function (res: SuccessMsg) {
      res.result = 'success';
      resolve(res);
    };
    params.cancel = function () {
      resolve({ result: 'cancel' });
    };
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.onMenuShareAppMessage(params);
  });
};
/**
 * 获取“分享到QQ”按钮点击状态及自定义分享内容接口
 * @param params
 */
wxJS.onMenuShareQQ = function (params: {
  title: string; // 分享标题
  desc: string; // 分享描述
  link: string; // 分享链接
  imgUrl: string; // 分享图标
  success?: Function; // 用户确认分享后执行的回调函数
  cancel?: Function; // 用户取消分享后执行的回调函数
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = function (res: SuccessMsg) {
      res.result = 'success';
      resolve(res);
    };
    params.cancel = function () {
      resolve({ result: 'cancel' });
    };
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.onMenuShareQQ(params);
  });
};
/**
 * 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
 * @param params
 */
wxJS.onMenuShareWeibo = function (params: {
  title: string; // 分享标题
  desc: string; // 分享描述
  link: string; // 分享链接
  imgUrl: string; // 分享图标
  success?: Function; // 用户确认分享后执行的回调函数
  cancel?: Function; // 用户取消分享后执行的回调函数
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = function (res: SuccessMsg) {
      res.result = 'success';
      resolve(res);
    };
    params.cancel = function () {
      resolve({ result: 'cancel' });
    };
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.onMenuShareWeibo(params);
  });
};
/**
 * 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
 * @param params
 */
wxJS.onMenuShareQZone = function (params: {
  title: string; // 分享标题
  desc: string; // 分享描述
  link: string; // 分享链接
  imgUrl: string; // 分享图标
  success?: Function; // 用户确认分享后执行的回调函数
  cancel?: Function; // 用户取消分享后执行的回调函数
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = function (res: SuccessMsg) {
      res.result = 'success';
      resolve(res);
    };
    params.cancel = function () {
      resolve({ result: 'cancel' });
    };
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.onMenuShareQZone(params);
  });
};

/**
 * 拍照或从手机相册中选图接口
 * @param params
 */
wxJS.chooseImage = function (params: {
  count: number; // 选择数量 默认9
  sizeType: SizeType;
  sourceType: SourceType; // 可以指定来源是相册还是相机，默认二者都有
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.chooseImage(params);
  });
};

/**
 * 获取本地图片接口（微信新增API）
 * @param params
 */
wxJS.getLocalImgData = function (params: {
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.getLocalImgData(params);
  });
};

/**
 * 预览图片接口
 * @param params
 */
wxJS.previewImage = function (params: {
  current: string; // 当前显示图片的http链接
  urls: string[]; // 需要预览的图片http链接列表
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.previewImage(params);
  });
};
/**
 * 上传图片接口
 * @param params
 */
wxJS.uploadImage = function (params: {
  localId: string; // 需要上传的图片的本地ID，由chooseImage接口获得
  isShowProgressTips: number; // 默认为1，显示进度提示
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.uploadImage(params);
  });
};
/**
 * 下载图片接口
 * @param params
 */
wxJS.downloadImage = function (params: {
  serverId: string; // 需要下载的图片的服务器端ID，由uploadImage接口获得
  isShowProgressTips: number; // 默认为1，显示进度提示
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.downloadImage(params);
  });
};
/**
 * 开始录音
 * @param params
 */
wxJS.startRecord = function (params: {
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.startRecord(params);
  });
};
/**
 * 停止录音
 * @param params
 */
wxJS.stopRecord = function (params: {
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.stopRecord(params);
  });
};
/**
 * 监听录音自动停止接口
 * @param params
 */
wxJS.onVoiceRecordEnd = function (params: {
  success?: Function; // 成功回调
  complete?: Function;
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.complete = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.onVoiceRecordEnd(params);
  });
};
/**
 * 播放语音接口
 * @param params
 */
wxJS.playVoice = function (params: {
  localId: string;
  // 需要播放的音频的本地ID，由stopRecord接口获得
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.playVoice(params);
  });
};
/**
 * 暂停播放接口
 * @param params
 */
wxJS.pauseVoice = function (params: {
  localId: string; // 需要暂停的音频的本地ID，由stopRecord接口获得
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.pauseVoice(params);
  });
};
/**
 * 停止播放接口
 * @param params
 */
wxJS.stopVoice = function (params: {
  localId: string; // 需要停止的音频的本地ID，由stopRecord接口获得
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.stopVoice(params);
  });
};
/**
 * 监听语音播放完毕接口
 * @param params
 */
wxJS.onVoicePlayEnd = function (params: {
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.onVoicePlayEnd(params);
  });
};
/**
 * 上传语音接口
 * @param params
 */
wxJS.uploadVoice = function (params: {
  localId: string; // 需要上传的音频的本地ID，由stopRecord接口获得
  isShowProgressTips: number; // 默认为1，显示进度提示
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.uploadVoice(params);
  });
};
/**
 * 下载语音接口
 * @param params
 */
wxJS.downloadVoice = function (params: {
  serverId: string; // 需要下载的音频的服务器端ID，由uploadVoice接口获得
  isShowProgressTips: number; // 默认为1，显示进度提示
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.downloadVoice(params);
  });
};
/**
 * 识别音频并返回识别结果接口
 * @param params
 */
wxJS.translateVoice = function (params: {
  localId: string; // 需要识别的音频的本地Id，由录音相关接口获得
  isShowProgressTips: number; // 默认为1，显示进度提示
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.translateVoice(params);
  });
};
/**
 * 获取网络状态接口
 * @param params
 */
wxJS.getNetworkType = function (params: {
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.getNetworkType(params);
  });
};
/**
 * 获取地理位置接口
 * @param params
 * @returns latitude 纬度，浮点数，范围为90 ~ -90
 * @returns longitude  // 经度，浮点数，范围为180 ~ -180。
 * @returns speed  // 速度，以米/每秒计
 * @returns accuracy // 位置精度
 */
wxJS.getLocation = function (params: {
  type: 'wgs84' | 'gcj02'; // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.getLocation(params);
  });
};
/**
 * 开启查找周边ibeacon设备接口
 * @param params
 */
wxJS.startSearchBeacons = function (params: { complete?: Function; fail?: Function }) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.complete = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.startSearchBeacons(params);
  });
};
/**
 * 关闭查找周边ibeacon设备接口
 * @param params
 */
wxJS.stopSearchBeacons = function (params: { complete?: Function; fail?: Function }) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.complete = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.stopSearchBeacons(params);
  });
};
/**
 * 监听周边ibeacon设备接口
 * @param params
 */
wxJS.onSearchBeacons = function (params: { complete?: Function; fail?: Function }) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.complete = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.onSearchBeacons(params);
  });
};
/**
 * 调起微信扫一扫接口
 * @param params
 */
wxJS.scanQRCode = function (params: {
  desc: string;
  needResult: 0 | 1; // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
  scanType: ScanType; // 可以指定扫二维码还是一维码，默认二者都有
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.scanQRCode(params);
  });
};
/**
 * 拉取适用卡券列表并获取用户选择信息
 * @param params
 */
wxJS.chooseCard = function (params: {
  shopId?: string; // 门店Id
  cardType?: string; // 卡券类型
  cardId?: string; // 卡券Id
  timestamp: number; // 卡券签名时间戳
  nonceStr: string; // 卡券签名随机串
  signType: 'SHA1'; // 签名方式，默认'SHA1'
  cardSign: string; // 卡券签名
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.chooseCard(params);
  });
};

/**
 * 批量添加卡券接口
 * @param params
 */
wxJS.addCard = function (params: {
  cardList: CardType[]; // 需要添加的卡券列表
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.addCard(params);
  });
};
/**
 * 发起一个微信支付请求
 * @param params
 */
wxJS.chooseWXPay = function (params: {
  appId: string; // 公众号id
  timeStamp: string;
  nonceStr: string;
  package: string; // 订单详情扩展字符串
  signType: 'MD5' | 'HMAC-SHA256' | 'MD5'; // 签名方式
  paySign: string; // 签名
  success?: Function; // 成功回调
  fail?: Function;
}) {
  params = params || {};
  return new Promise((resolve, reject) => {
    params.success = resolve;
    params.fail = function (res: ErrorMsg) {
      reject(new Error(res.errMsg));
    };
    wx.chooseWXPay(params);
  });
};

export default wxJS;
