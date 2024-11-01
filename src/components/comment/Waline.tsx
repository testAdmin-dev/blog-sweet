import { useEffect, useRef, useState } from 'react'
import { init } from '@waline/client'
import '@waline/client/style'


export function Waline({ serverURL }: { serverURL: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const walineInst = init({
      el: ref.current,
      serverURL,
      dark: "[data-theme='dark']",
      // 禁止登录
      login: 'disable',
      // 图片上传
      imageUploader: false,
      search: false,
      // 评论数量统计
      comment: true,
      locale: {
        placeholder: '发条友善的评论吧（支持 Markdown 语法）…',
      },
      // 流量太大 暂停使用
      // emoji: ['//unpkg.com/@waline/emojis@1.2.0/qq'],
      meta: ['nick', 'mail'],
      // 名称必填
      requiredMeta: ['nick'],
      // 评论字数限制
      wordLimit: 300,
      // 预览
      // texRenderer: false
      // 版权信息
      copyright: false,

    })

    console.log(walineInst)

    return () => {
      if (ref.current) {
        walineInst?.destroy()
      }
    }
  }, [serverURL])


  return <div ref={ref}></div>


}


