
"use client"
import { create } from '@/hooks/useCreatePost';
// import { useCreatePost } from '@/hooks/useCreatePost';
import { prisma } from '@/utils/prisma';
// import Editor from "@/components/Editor";
import dynamic from 'next/dynamic';
import { Op } from 'quill/core';
import { useState } from 'react';

const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false, // 禁用服务器端渲染
});

export default function Page() {
  const [value, setValue] = useState<Op[]>()
  const [html, setHtml] = useState('')
  // const { runAsync } = useCreatePost()


  return <div className="p-2">
    <Editor value={value} onChange={(value, html) => {
      setValue(value)
      setHtml(html)
    }} />
    <button onClick={() =>
      value && create(JSON.stringify(value), html).then(value => {
        console.log('value', value, html)
      })
    }>
      提交
    </button>
  </div>
}