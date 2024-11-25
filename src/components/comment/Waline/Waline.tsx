import { useEffect, useState, useRef } from 'react'
import { CommentBtn } from '@/components/comment';
import { Form, MessagePlugin, Textarea, Dialog } from 'tdesign-react';
import type { FormRules, FormInstanceFunctions, Data, DialogProps } from 'tdesign-react';

import { getCommentList, addComment } from '@/services/comment';
import styles from './waline.module.less';

const { FormItem } = Form;

export function Waline({ articleId }: { articleId: number }) {
  const commentForm = useRef<FormInstanceFunctions>();

  const [commentData, setCommentData] = useState<any>([]);
  const [commentFormModalVisible, setCommentFormModalVisible] = useState(false);
  const [commentSubmitLoading, setCommentSubmitLoading] = useState(false);

  useEffect(() => {
    onLoad();
  }, [articleId])

  const onLoad = async () => {
    const res = await getCommentList({
      article_id: articleId
    });

    setCommentData(res || [])
  }

  const onOpenCommentModal = () => {
    setCommentFormModalVisible(true);
  };
  const onConfirmCommentModal= async (context:any) => {
    if (context?.e?.keyCode === 13) return;

    const result = await commentForm?.current?.validate()

    if (result === true) {
      const formData = commentForm?.current?.getFieldsValue(['content']) || {
        name: '',
        content: ''
      };


      setCommentSubmitLoading(true);
      // const formData = commentForm?.current?.getFieldsValue(['name', 'content']) || {
      //   name: '',
      //   content: ''
      // };

      const res = await addComment({
        content: formData.content,
        article_id: articleId
      })

      if (!res) {
        setCommentSubmitLoading(false);
        return;
      }
      MessagePlugin.success('感谢您的评论~');
      onLoad();
      onCancelCommentModal();
    }
  };

  // 关闭弹窗，重置表单
  const onCancelCommentModal = () => {
    setCommentFormModalVisible(false);
    setCommentSubmitLoading(false);
    commentForm?.current?.reset();
  };

  const onHandleCloseCommentModal: DialogProps['onClose'] = (context) => {
    // 点击关闭按钮、按下ESC、点击蒙层等触发
    onCancelCommentModal();
  };

  const rules: FormRules<Data> = {
    content: [
      { required: true, message: '禁止说空话！', type: 'error', },
      // { max: 200, message: '不能太长' }
    ],
  };

  return (
    <div className={`${styles.comment_box} pr-2`}>
      <div className={styles.cooment_form_box}>
        <CommentBtn
          onClick={onOpenCommentModal}
        >
          评论({commentData.length})
        </CommentBtn>
        <Dialog
          header="评论一下"
          visible={commentFormModalVisible}
          confirmOnEnter
          onClose={onHandleCloseCommentModal}
          onConfirm={onConfirmCommentModal}
          onCancel={onCancelCommentModal}
          confirmLoading={commentSubmitLoading}
          style={{
            maxWidth: '80vw',
          }}
        >
          <Form
            ref={commentForm}
            rules={rules}
            requiredMark
          >
            <div>
              <FormItem
                // label="评论"
                name="content"
                labelAlign="top"
              >
                <Textarea
                  placeholder="暂未做删除功能，谨慎其言，禁止网络暴力"
                  autosize={{
                    minRows: 3,
                    maxRows: 10
                  }}
                  maxlength={200}
                />
              </FormItem>
            </div>
          </Form>
        </Dialog>
      </div>

      <div className={`${styles.comment_list} pl-2 mt-8`}>
        {
          commentData.map((item: any) => (
            <div className={styles.comment_item} key={item.id}>
              <div className={`${styles.content_box} text-xl`}>
                <div className={`${styles.timeline_ccomment_header} pl-4 pr-4`}>
                  <div className={`${styles.text_normal}`}>
                    <span className='text-xs'>{item.create_time}</span>
                  </div>
                </div>
                <pre className={`${styles.content_body} p-4 text-xs`} dangerouslySetInnerHTML={{ __html: item.content }}>
                </pre>
                {/* <div className={`${styles.content_underneath} pl-3`}>
                  <div className={`${styles.like_box} ${styles.already_like}`}>
                    <i className='iconfont icon-heart text-xl'></i>
                    <span className='text-base ml-1'>10</span>
                  </div>
                </div> */}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}