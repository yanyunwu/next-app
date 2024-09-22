import { HTMLAttributes } from "react";
import 'quill/dist/quill.snow.css'

export interface HtmlRenderProps extends HTMLAttributes<HTMLElement> {
    html: string
}

export default function HtmlRender({ html, ...props }: HtmlRenderProps) {
    return (
        <div className="ql-container ql-snow">
            <div className="ql-editor">
                <div {...props} dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    )
}