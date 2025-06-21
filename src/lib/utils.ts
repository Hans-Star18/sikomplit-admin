import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
    return new Date(date).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

// Utility function to extract plain text from Lexical editor state
export function extractTextFromLexicalState(serializedState: any): string {
    if (!serializedState || typeof serializedState !== 'object') {
        return '';
    }

    const extractTextFromNode = (node: any): string => {
        if (!node) return '';

        // If it's a text node, return its text content
        if (node.type === 'text' && node.text) {
            return node.text;
        }

        // If it has children, recursively extract text from them
        if (node.children && Array.isArray(node.children)) {
            return node.children.map(extractTextFromNode).join('');
        }

        return '';
    };

    // Start from the root node
    if (serializedState.root && serializedState.root.children) {
        return serializedState.root.children
            .map(extractTextFromNode)
            .join('\n');
    }

    return '';
}
