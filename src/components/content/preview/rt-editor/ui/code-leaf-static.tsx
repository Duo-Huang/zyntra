import type { SlateLeafProps } from '@udecode/plate'

import { SlateLeaf } from '@udecode/plate'

export function CodeLeafStatic(props: SlateLeafProps) {
    return (
        <SlateLeaf
            {...props}
            as="code"
            className="bg-muted rounded-md px-[0.3em] py-[0.2em] font-mono text-sm whitespace-pre-wrap transition-colors duration-500 ease-out"
        >
            {props.children}
        </SlateLeaf>
    )
}
