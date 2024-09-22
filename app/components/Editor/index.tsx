"use client"
import { useRef, useState } from "react";
import Quill from 'quill';
import ReactQuill from "../ReactQuill";
import { Op } from "quill/core";

const Delta = Quill.import('delta');

export default function Editor() {

  const [value, setValue] = useState<Op[]>();
  const quillRef = useRef<Quill>(null);

  const d = new Delta()
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
        onChange={setValue}
        ref={quillRef}
        defaultValue={d}
      />
      {JSON.stringify(value)}
    </div>
  )
}