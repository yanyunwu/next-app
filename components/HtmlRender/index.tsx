import React, { HTMLAttributes } from "react";
import cls from 'classnames'
import 'quill/dist/quill.snow.css'
import './styles.scss'

export interface HtmlRenderProps extends HTMLAttributes<HTMLElement> {
    html: string
    editorClassName?: string
    editorStyle?: React.CSSProperties
}

export default function HtmlRender({ html, className, editorClassName, editorStyle, ...props }: HtmlRenderProps) {
    return (
        <div {...props} className={cls(className, 'ql-html-render ql-container ql-snow')}>
            <div className={cls(editorClassName, 'ql-editor')} style={editorStyle}>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    )
}