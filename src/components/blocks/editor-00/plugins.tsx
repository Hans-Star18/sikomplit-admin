import { ContentEditable } from '@/components/editor/editor-ui/content-editable';
import { Button } from '@/components/ui/button';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { IconArrowBack, IconArrowForward } from '@tabler/icons-react';
import { REDO_COMMAND, UNDO_COMMAND } from 'lexical';

function ToolbarPlugin({ disabled }: { disabled?: boolean }) {
    const [editor] = useLexicalComposerContext();

    return (
        <div className="bg-muted/50 border-b p-2">
            <div className="flex flex-wrap items-center gap-1">
                <div className="ml-auto flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                            editor.dispatchCommand(UNDO_COMMAND, undefined);
                        }}
                        className="h-8 w-8 p-0"
                    >
                        <IconArrowBack className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                            editor.dispatchCommand(REDO_COMMAND, undefined);
                        }}
                        className="h-8 w-8 p-0"
                    >
                        <IconArrowForward className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function Plugins({ disabled }: { disabled?: boolean }) {
    return (
        <div className="relative">
            <ToolbarPlugin disabled={disabled} />
            <div className="relative">
                <RichTextPlugin
                    contentEditable={
                        <div className="min-h-[200px]">
                            <div className="">
                                <ContentEditable
                                    placeholder=""
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
            </div>
        </div>
    );
}
