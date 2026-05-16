"use client";

import { useEditor, EditorContent, type Editor as TiptapEditor } from '@tiptap/react';
import { Extension, Mark, mergeAttributes } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extensions';
import React, { useEffect } from 'react';

interface EditorProps {
    value: string;
    onChange: (data: string) => void;
    placeholder?: string;
}

const fontSizes = ['12px', '14px', '16px', '18px', '24px', '32px', '40px'];
const alignments = ['left', 'center', 'right', 'justify'] as const;

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (fontSize: string) => ReturnType;
            unsetFontSize: () => ReturnType;
        };
        textAlign: {
            setTextAlign: (alignment: typeof alignments[number]) => ReturnType;
            unsetTextAlign: () => ReturnType;
        };
    }
}

const FontSize = Mark.create({
    name: 'fontSize',

    addAttributes() {
        return {
            fontSize: {
                default: null,
                parseHTML: element => element.style.fontSize || null,
                renderHTML: attributes => {
                    if (!attributes.fontSize) {
                        return {};
                    }

                    return { style: `font-size: ${attributes.fontSize}` };
                },
            },
        };
    },

    parseHTML() {
        return [{ tag: 'span[style*="font-size"]' }];
    },

    renderHTML({ HTMLAttributes }) {
        return ['span', mergeAttributes(HTMLAttributes), 0];
    },

    addCommands() {
        return {
            setFontSize: fontSize => ({ commands }) => commands.setMark(this.name, { fontSize }),
            unsetFontSize: () => ({ commands }) => commands.unsetMark(this.name),
        };
    },
});

const TextAlign = Extension.create({
    name: 'textAlign',

    addOptions() {
        return {
            types: ['heading', 'paragraph'],
            alignments,
        };
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    textAlign: {
                        default: null,
                        parseHTML: element => element.style.textAlign || null,
                        renderHTML: attributes => {
                            if (!attributes.textAlign) {
                                return {};
                            }

                            return { style: `text-align: ${attributes.textAlign}` };
                        },
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            setTextAlign: alignment => ({ commands }) => {
                if (!this.options.alignments.includes(alignment)) {
                    return false;
                }

                return this.options.types
                    .map((type: string) => commands.updateAttributes(type, { textAlign: alignment }))
                    .every(Boolean);
            },
            unsetTextAlign: () => ({ commands }) => {
                return this.options.types
                    .map((type: string) => commands.resetAttributes(type, 'textAlign'))
                    .every(Boolean);
            },
        };
    },
});

const MenuBar = ({ editor }: { editor: TiptapEditor | null }) => {
    if (!editor) {
        return null;
    }

    const currentFontSize = editor.getAttributes('fontSize').fontSize || '';
    const currentTextAlign = editor.getAttributes('paragraph').textAlign || editor.getAttributes('heading').textAlign || 'left';

    return (
        <div className="flex flex-wrap items-center gap-1 border-b border-[#3A3541] border-opacity-[0.12] bg-[#F9FAFB] p-2 rounded-t-md">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`rounded p-1.5 transition-colors hover:bg-zinc-200 ${editor.isActive('bold') ? 'bg-zinc-200 text-[#9155FD]' : 'text-zinc-600'}`}
                title="Bold"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`rounded p-1.5 transition-colors hover:bg-zinc-200 ${editor.isActive('italic') ? 'bg-zinc-200 text-[#9155FD]' : 'text-zinc-600'}`}
                title="Italic"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="4" x2="10" y2="20"></line><line x1="14" y1="4" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="4"></line><line x1="15" y1="20" x2="9" y2="20"></line></svg>
            </button>
            <div className="mx-1 h-6 w-px bg-zinc-300" />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`rounded p-1.5 text-xs font-bold transition-colors hover:bg-zinc-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-zinc-200 text-[#9155FD]' : 'text-zinc-600'}`}
                title="H1"
            >
                H1
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`rounded p-1.5 text-xs font-bold transition-colors hover:bg-zinc-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-zinc-200 text-[#9155FD]' : 'text-zinc-600'}`}
                title="H2"
            >
                H2
            </button>
            <div className="mx-1 h-6 w-px bg-zinc-300" />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`rounded p-1.5 transition-colors hover:bg-zinc-200 ${editor.isActive('bulletList') ? 'bg-zinc-200 text-[#9155FD]' : 'text-zinc-600'}`}
                title="Bullet List"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`rounded p-1.5 transition-colors hover:bg-zinc-200 ${editor.isActive('orderedList') ? 'bg-zinc-200 text-[#9155FD]' : 'text-zinc-600'}`}
                title="Ordered List"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></svg>
            </button>
            <div className="mx-1 h-6 w-px bg-zinc-300" />
            <select
                value={currentFontSize}
                onChange={(event) => {
                    const size = event.target.value;
                    const chain = editor.chain().focus();

                    if (size) {
                        chain.setFontSize(size).run();
                    } else {
                        chain.unsetFontSize().run();
                    }
                }}
                className="h-8 rounded border border-zinc-300 bg-white px-2 text-xs font-medium text-zinc-700 outline-none transition-colors hover:bg-zinc-50 focus:border-[#9155FD]"
                title="Font Size"
            >
                <option value="">Size</option>
                {fontSizes.map(size => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                ))}
            </select>
            <div className="mx-1 h-6 w-px bg-zinc-300" />
            {alignments.map(alignment => (
                <button
                    key={alignment}
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign(alignment).run()}
                    className={`rounded p-1.5 capitalize transition-colors hover:bg-zinc-200 ${currentTextAlign === alignment ? 'bg-zinc-200 text-[#9155FD]' : 'text-zinc-600'}`}
                    title={`Align ${alignment}`}
                >
                    {alignment === 'left' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="15" y1="12" x2="3" y2="12"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>
                    )}
                    {alignment === 'center' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="6"></line><line x1="21" y1="12" x2="3" y2="12"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>
                    )}
                    {alignment === 'right' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="12" x2="9" y2="12"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg>
                    )}
                    {alignment === 'justify' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="12" x2="3" y2="12"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
                    )}
                </button>
            ))}
            <div className="mx-1 h-6 w-px bg-zinc-300" />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`rounded p-1.5 transition-colors hover:bg-zinc-200 ${editor.isActive('blockquote') ? 'bg-zinc-200 text-[#9155FD]' : 'text-zinc-600'}`}
                title="Blockquote"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </button>
            <button
                type="button"
                onClick={() => {
                    const url = window.prompt('URL');
                    if (url) {
                        editor.chain().focus().setLink({ href: url }).run();
                    }
                }}
                className={`rounded p-1.5 transition-colors hover:bg-zinc-200 ${editor.isActive('link') ? 'bg-zinc-200 text-[#9155FD]' : 'text-zinc-600'}`}
                title="Link"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            </button>
            <div className="ml-auto flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    className="rounded p-1.5 text-zinc-600 transition-colors hover:bg-zinc-200"
                    title="Undo"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    className="rounded p-1.5 text-zinc-600 transition-colors hover:bg-zinc-200"
                    title="Redo"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                </button>
            </div>
        </div>
    );
};

const Editor = ({ value, onChange, placeholder }: EditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            FontSize,
            TextAlign,
            Link.configure({
                openOnClick: false,
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Write content...',
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'max-w-none focus:outline-none min-h-[220px] max-h-[min(42vh,420px)] overflow-y-auto px-4 py-3 bg-white text-zinc-800',
            },
        },
    });

    // Synchronize content when value prop changes externally (e.g. when opening edit modal)
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    return (
        <div className="tiptap-editor-wrapper rounded-md border border-[#3A3541] border-opacity-[0.22] overflow-hidden focus-within:border-[#9155FD]">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
            <style>{`
                .tiptap p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #adb5bd;
                    pointer-events: none;
                    height: 0;
                }
                .tiptap {
                    min-height: 220px;
                    max-height: min(42vh, 420px);
                    overflow-y: auto;
                }
                .tiptap-editor-wrapper .tiptap:focus {
                    outline: none;
                }
                .tiptap-editor-wrapper .ProseMirror {
                    min-height: 220px;
                    max-height: min(42vh, 420px);
                    overflow-y: auto;
                    resize: vertical;
                }
                .tiptap-editor-wrapper .ProseMirror p {
                    margin: 0 0 0.85rem;
                }
                .tiptap-editor-wrapper .ProseMirror p:empty::after {
                    content: "\\00a0";
                }
                .tiptap-editor-wrapper .ProseMirror h1 {
                    margin: 1rem 0 0.75rem;
                    font-size: 2rem;
                    font-weight: 700;
                    line-height: 1.2;
                }
                .tiptap-editor-wrapper .ProseMirror h2 {
                    margin: 0.9rem 0 0.65rem;
                    font-size: 1.5rem;
                    font-weight: 700;
                    line-height: 1.25;
                }
                .tiptap-editor-wrapper .ProseMirror ul,
                .tiptap-editor-wrapper .ProseMirror ol {
                    margin: 0 0 0.85rem 1.5rem;
                    padding-left: 1.25rem;
                }
                .tiptap-editor-wrapper .ProseMirror ul {
                    list-style: disc;
                }
                .tiptap-editor-wrapper .ProseMirror ol {
                    list-style: decimal;
                }
                .tiptap-editor-wrapper .ProseMirror li {
                    margin: 0.25rem 0;
                    padding-left: 0.25rem;
                }
                .tiptap-editor-wrapper .ProseMirror blockquote {
                    margin: 0.85rem 0;
                    border-left: 3px solid #9155FD;
                    padding-left: 0.85rem;
                    color: #5f5867;
                }
            `}</style>
        </div>
    );
};

export default Editor;
