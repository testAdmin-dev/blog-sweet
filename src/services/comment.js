import request from "./request";

// 获取评论
export const getCommentList = async ({
  article_id
}) => {
  const res = await request({
    url: '/comment',
    method: 'get',
    data: {
      article_id
    }
  });

  return res;
};

// 添加评论
export const addComment = async ({
  content,
  article_id
}) => {
  const res = await request({
    url: '/comment',
    method: 'post',
    data: {
      content,
      article_id
    }
  });

  return res;
};
