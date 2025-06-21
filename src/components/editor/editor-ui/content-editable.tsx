import { ContentEditable as LexicalContentEditable } from '@lexical/react/LexicalContentEditable';
import type { JSX } from 'react';

type Props = {
    placeholder: string;
    className?: string;
    placeholderClassName?: string;
    disabled?: boolean;
};

export function ContentEditable({
    placeholder = '',
    className,
    placeholderClassName,
    disabled = false,
}: Props): JSX.Element {
    return (
        <LexicalContentEditable
            className={
                className ??
                `ContentEditable__root relative block min-h-[200px] w-full resize-none overflow-auto border-0 bg-transparent p-2 text-sm leading-relaxed focus:ring-0 focus:outline-none ${
                    disabled ? 'cursor-not-allowed opacity-50' : ''
                }`
            }
            aria-placeholder={placeholder}
            aria-disabled={disabled}
            contentEditable={!disabled}
            placeholder={
                <div
                    className={
                        placeholderClassName ??
                        `text-muted-foreground pointer-events-none absolute top-3 left-4 overflow-hidden text-sm leading-relaxed select-none`
                    }
                >
                    {placeholder}
                </div>
            }
        />
    );
}
