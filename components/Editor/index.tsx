"use client"
import { useRef, useState } from "react";
import Quill from 'quill';
import ReactQuill from "../ReactQuill";
import { Delta, Op, Range } from "quill/core";
import Uploader from "quill/modules/uploader";
import Emitter from "quill/core/emitter";


const QuillDelta = Quill.import('delta');

export interface EditorProps {
  value?: Op[]
  onChange?: (value: Op[], html: string) => void
}

export default function Editor({ value, onChange }: EditorProps) {

  const quillRef = useRef<Quill>(null);

  const d = new QuillDelta()
    .insert('Hello')
    .insert('\n', { header: 1 })
    .insert('Some ')
    .insert('initial', { bold: true })
    .insert(' ')
    .insert('content', { underline: true })
    .insert('\n')


  return (
    <div>
      <ReactQuill
        value={value}
        onChange={onChange}
        ref={quillRef}
        defaultValue={d}
        quillOptions={{
          theme: 'snow',
          modules: {
            toolbar: [
              { header: [1, 2, 3, 4, 5, 6, false] }, // 标题
              'bold',             // 加粗
              'italic',           // 斜体
              'blockquote',       // 引用
              'link',             // 超链接
              'image',            // 插入图片
              'video',            // 插入视频
              'code',             // 行内代码
              'code-block',       // 代码块
              { list: 'bullet' }, // 无序列表
              { list: 'ordered' }, // 有序列表
              'strike',           // 删除线
              { 'align': [] },    // 对齐方式
              'formula'           // 公式
            ],
            uploader: {
              handler(range: Range, files: File[]) {
                if (!this.quill.scroll.query('image')) {
                  return;
                }
                const promises = files.map<Promise<string>>((file) => {
                  return new Promise((resolve) => {
                    const blob = new Blob([file], { type: file.type })
                    const url = URL.createObjectURL(blob)
                    console.log('url ===> ', url)
                    resolve(url)
                  });
                });
                Promise.all(promises).then((images) => {
                  const update = images.reduce((delta, image) => {
                    return delta.insert({ image });
                  }, new Delta().retain(range.index).delete(range.length)) as Delta;
                  this.quill.updateContents(update, Emitter.sources.USER);
                  this.quill.setSelection(
                    range.index + images.length,
                    Emitter.sources.SILENT,
                  );
                });
              }
            } as typeof Uploader.DEFAULTS
          }
        }}
      />
      {JSON.stringify(value)}
    </div>
  )
}