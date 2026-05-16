"use client";

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Bold,
    Essentials,
    Italic,
    Paragraph,
    Undo,
    Heading,
    List,
    Link,
    Indent,
    BlockQuote,
    Table,
    TableToolbar
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

interface EditorProps {
    value: string;
    onChange: (data: string) => void;
    placeholder?: string;
}

const Editor = ({ value, onChange, placeholder }: EditorProps) => {
    return (
        <div className="ck-editor-wrapper custom-editor">
            <CKEditor
                editor={ClassicEditor}
                config={{
                    toolbar: {
                        items: [
                            'undo', 'redo',
                            '|', 'heading',
                            '|', 'bold', 'italic',
                            '|', 'link', 'insertTable', 'blockQuote',
                            '|', 'bulletedList', 'numberedList', 'outdent', 'indent'
                        ]
                    },
                    plugins: [
                        Bold, Essentials, Italic, Paragraph, Undo, Heading, List, Link, Indent, BlockQuote, Table, TableToolbar
                    ],
                    placeholder: placeholder || 'Type your content here...',
                    initialData: value,
                }}
                data={value}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
            />
            <style jsx global>{`
                .ck-editor__editable_inline {
                    min-height: 200px;
                    border-bottom-left-radius: 0.375rem !important;
                    border-bottom-right-radius: 0.375rem !important;
                }
                .ck-toolbar {
                    border-top-left-radius: 0.375rem !important;
                    border-top-right-radius: 0.375rem !important;
                    background-color: #f9fafb !important;
                    border-color: rgba(58, 53, 65, 0.22) !important;
                }
                .ck.ck-editor__main>.ck-editor__editable {
                    border-color: rgba(58, 53, 65, 0.22) !important;
                }
                .ck.ck-editor__main>.ck-editor__editable.ck-focused {
                    border-color: #9155FD !important;
                    box-shadow: none !important;
                }
            `}</style>
        </div>
    );
};

export default Editor;
