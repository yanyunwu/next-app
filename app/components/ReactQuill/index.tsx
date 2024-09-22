"use client"
import React, { forwardRef, useEffect, useRef, useImperativeHandle, HTMLAttributes } from 'react';
import Quill from 'quill';
import { Delta, Op } from 'quill/core';
import { isEqual } from 'lodash-es';
import { useForeverCallback } from '@/app/hooks';

import 'quill/dist/quill.snow.css'
import './styles.css'


export interface ReactQuillProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  readOnly?: boolean
  value?: Op[]
  defaultValue?: Delta | Op[]
  onChange?: (value: Op[]) => void
}


const ReactQuill = forwardRef<Quill | null, ReactQuillProps>(
  ({ defaultValue, readOnly, value, onChange, ...props }, ref) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const defaultValueRef = useRef<Delta | Op[] | undefined>(defaultValue);
    const quillRef = useRef<Quill | null>(null)
    const onForeverChange = useForeverCallback(onChange)

    useImperativeHandle(ref, () => quillRef.current!, [])

    useEffect(() => {
      quillRef.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current!;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div'),
      );
      const quill = new Quill(editorContainer, {
        theme: 'snow',
      });

      quillRef.current = quill

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, () => {
        const content = quill.getContents()
        onForeverChange(content.ops)
      });

      return () => {
        quillRef.current = null;
        container.innerHTML = '';
      };
    }, [ref]);


    useEffect(() => {
      const content = quillRef.current?.getContents()
      if (value && !isEqual(value, content?.ops)) {
        quillRef.current?.setContents(value)
      }
    }, [value])

    return <div ref={containerRef} {...props} />;
  },
);

ReactQuill.displayName = 'Editor';

export default ReactQuill;