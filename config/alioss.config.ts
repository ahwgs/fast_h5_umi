/**
 * Oss上传路径 对应桶内路径
 */
const uploadPath = '/fast_h5_umi';
const { PRO_VAR } = process.env;

// 静态资源文件前缀
const publicPathMap = {
  dev: '/',
  test: 'https://cdn.xxx.com/fast_h5_umi/',
  pro: 'https://cdn.xxx.com/fast_h5_umi/',
};

/**
 * oss 存储区域
 */
const ossRegionMap = {
  test: 'oss-cn-beijing',
  pro: 'oss-cn-hangzhou',
};

/**
 * oss存储桶
 */
const ossBucketMap = {
  test: 'xxxx',
  pro: 'xxxx',
};

/**
 * oss 插件配置
 */
const ossPluginOpt = {
  ossConfig: {
    region: ossRegionMap[PRO_VAR],
    bucket: ossBucketMap[PRO_VAR],
    secure: true,
  },
  configName: '.alioss',
  enabled: PRO_VAR === 'test' || PRO_VAR === 'pro',
  cdnPrefix: publicPathMap[PRO_VAR]?.replace(uploadPath, ''), // CDN前缀
  uploadPath, // 文件上传路径
  exclude: '', // 排除文件
  ignoreHtml: true, // 不上传html
};

export default ossPluginOpt;
