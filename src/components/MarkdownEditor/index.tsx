import React from 'react'
import { MarkdownEditor } from 'devkeep-md-editor/dist';

export const Markdown = () => {
    return(
        <MarkdownEditor text="hello" height={window.innerHeight}/>
    )
}