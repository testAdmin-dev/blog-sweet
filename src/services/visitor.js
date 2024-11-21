import request from './request';

// 记录访客
export const recordVisitorsApi = async () => {
  const res = await request({
    url: '/visitors_log',
    method: 'post'
  });

  return res;
}

// 获取访客人数
export const getVisitorsNumber = async () => {
  const res = await request({
    url: '/visitors_log',
    method: 'get'
  });

  return res;
}