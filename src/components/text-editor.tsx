'use client';

import { Editor } from '@/components/blocks/editor-00/editor';
import { extractTextFromLexicalState } from '@/lib/utils';
import type { SerializedEditorState } from 'lexical';
import { useEffect, useState } from 'react';

// Helper function to create editor state structure
const createEditorState = (text: string = ''): SerializedEditorState =>
    ({
        root: {
            children: [
                {
                    children: [
                        {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text,
                            type: 'text',
                            version: 1,
                        },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
        },
    }) as unknown as SerializedEditorState;

const initialValue = createEditorState();

export default function TextEditor({
    value,
    onChange,
    className,
    returnPlainText = false,
    disabled = false,
}: {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    returnPlainText?: boolean;
    disabled?: boolean;
}) {
    const [editorState, setEditorState] = useState<SerializedEditorState>(
        () => {
            if (returnPlainText) {
                return value && value.trim()
                    ? createEditorState(value)
                    : initialValue;
            } else {
                try {
                    return value ? JSON.parse(value) : initialValue;
                } catch {
                    return initialValue;
                }
            }
        },
    );

    useEffect(() => {
        if (returnPlainText) {
            setEditorState(
                value && value.trim() ? createEditorState(value) : initialValue,
            );
        } else {
            if (value) {
                try {
                    const parsedValue = JSON.parse(value);
                    setEditorState(parsedValue);
                } catch {
                    console.error('Failed to parse editor value');
                }
            }
        }
    }, [value, returnPlainText]);

    const handleSerializedChange = (serializedValue: SerializedEditorState) => {
        setEditorState(serializedValue);

        if (returnPlainText) {
            const plainText = extractTextFromLexicalState(serializedValue);
            onChange(plainText);
        } else {
            onChange(JSON.stringify(serializedValue));
        }
    };

    return (
        <div className={className}>
            <Editor
                editorSerializedState={editorState}
                onSerializedChange={handleSerializedChange}
                disabled={disabled}
            />
        </div>
    );
}
