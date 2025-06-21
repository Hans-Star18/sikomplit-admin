import { LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ParagraphNode, TextNode } from 'lexical';
import type { Klass, LexicalNode, LexicalNodeReplacement } from 'lexical';

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
    [
        HeadingNode,
        ParagraphNode,
        TextNode,
        QuoteNode,
        LinkNode,
        ListNode,
        ListItemNode,
    ];
