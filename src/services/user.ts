import { Get } from '@/utils/request';
/**
 * 获取用户信息
 */
export async function fetchUserService() {
  return Get('/user/info');
}
