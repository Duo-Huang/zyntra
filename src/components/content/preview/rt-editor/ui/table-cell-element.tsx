'use client'

import * as React from 'react'

import type { TTableCellElement } from '@udecode/plate-table'
import type { PlateElementProps } from '@udecode/plate/react'

import { BlockSelectionPlugin, useBlockSelected } from '@udecode/plate-selection/react'
import {
    TablePlugin,
    TableRowPlugin,
    useTableCellElement,
    useTableCellElementResizable,
} from '@udecode/plate-table/react'
import { PlateElement, useEditorPlugin, useElementSelector, usePluginOption, useReadOnly } from '@udecode/plate/react'
import { cva } from 'class-variance-authority'

import { cn } from '../lib/utils'

import { blockSelectionVariants } from './block-selection'
import { ResizeHandle } from './resize-handle'

export function TableCellElement({
    isHeader,
    ...props
}: PlateElementProps<TTableCellElement> & {
    isHeader?: boolean
}) {
    const { api } = useEditorPlugin(TablePlugin)
    const readOnly = useReadOnly()
    const element = props.element

    const rowId = useElementSelector(([node]) => node.id as string, [], {
        key: TableRowPlugin.key,
    })
    const isSelectingRow = useBlockSelected(rowId)
    const isSelectionAreaVisible = usePluginOption(BlockSelectionPlugin, 'isSelectionAreaVisible')

    const { borders, colIndex, colSpan, minHeight, rowIndex, selected, width } = useTableCellElement()

    const { bottomProps, hiddenLeft, leftProps, rightProps } = useTableCellElementResizable({
        colIndex,
        colSpan,
        rowIndex,
    })

    return (
        <PlateElement
            {...props}
            as={isHeader ? 'th' : 'td'}
            className={cn(
                'bg-background h-full overflow-visible border-none p-0',
                'transition-colors duration-500 ease-out',
                element.background ? 'bg-(--cellBackground)' : 'bg-background',
                isHeader && 'text-left *:m-0',
                'before:size-full',
                selected && 'before:bg-brand/5 before:z-10',
                "before:absolute before:box-border before:content-[''] before:select-none",
                borders.bottom?.size && `before:border-b-border before:border-b`,
                borders.right?.size && `before:border-r-border before:border-r`,
                borders.left?.size && `before:border-l-border before:border-l`,
                borders.top?.size && `before:border-t-border before:border-t`
            )}
            style={
                {
                    '--cellBackground': element.background,
                    maxWidth: width || 240,
                    minWidth: width || 120,
                } as React.CSSProperties
            }
            attributes={{
                ...props.attributes,
                colSpan: api.table.getColSpan(element),
                rowSpan: api.table.getRowSpan(element),
            }}
        >
            <div className="relative z-20 box-border h-full px-3 py-2" style={{ minHeight }}>
                {props.children}
            </div>

            {!isSelectionAreaVisible && (
                <div
                    className="group absolute top-0 size-full select-none"
                    contentEditable={false}
                    suppressContentEditableWarning={true}
                >
                    {!readOnly && (
                        <>
                            <ResizeHandle
                                {...rightProps}
                                className="-top-2 -right-1 h-[calc(100%_+_8px)] w-2"
                                data-col={colIndex}
                            />
                            <ResizeHandle {...bottomProps} className="-bottom-1 h-2" />
                            {!hiddenLeft && (
                                <ResizeHandle
                                    {...leftProps}
                                    className="top-0 -left-1 w-2"
                                    data-resizer-left={colIndex === 0 ? 'true' : undefined}
                                />
                            )}

                            <div
                                className={cn(
                                    'bg-ring absolute top-0 z-30 hidden h-full w-1',
                                    'right-[-1.5px]',
                                    columnResizeVariants({ colIndex: colIndex as any })
                                )}
                            />
                            {colIndex === 0 && (
                                <div
                                    className={cn(
                                        'bg-ring absolute top-0 z-30 h-full w-1',
                                        'left-[-1.5px]',
                                        'animate-in fade-in hidden group-has-[[data-resizer-left]:hover]/table:block group-has-[[data-resizer-left][data-resizing="true"]]/table:block'
                                    )}
                                />
                            )}
                        </>
                    )}
                </div>
            )}

            {isSelectingRow && <div className={blockSelectionVariants()} contentEditable={false} />}
        </PlateElement>
    )
}

export function TableCellHeaderElement(props: React.ComponentProps<typeof TableCellElement>) {
    return <TableCellElement {...props} isHeader />
}

const columnResizeVariants = cva('hidden animate-in fade-in', {
    variants: {
        colIndex: {
            0: 'group-has-[[data-col="0"]:hover]/table:block group-has-[[data-col="0"][data-resizing="true"]]/table:block',
            1: 'group-has-[[data-col="1"]:hover]/table:block group-has-[[data-col="1"][data-resizing="true"]]/table:block',
            2: 'group-has-[[data-col="2"]:hover]/table:block group-has-[[data-col="2"][data-resizing="true"]]/table:block',
            3: 'group-has-[[data-col="3"]:hover]/table:block group-has-[[data-col="3"][data-resizing="true"]]/table:block',
            4: 'group-has-[[data-col="4"]:hover]/table:block group-has-[[data-col="4"][data-resizing="true"]]/table:block',
            5: 'group-has-[[data-col="5"]:hover]/table:block group-has-[[data-col="5"][data-resizing="true"]]/table:block',
            6: 'group-has-[[data-col="6"]:hover]/table:block group-has-[[data-col="6"][data-resizing="true"]]/table:block',
            7: 'group-has-[[data-col="7"]:hover]/table:block group-has-[[data-col="7"][data-resizing="true"]]/table:block',
            8: 'group-has-[[data-col="8"]:hover]/table:block group-has-[[data-col="8"][data-resizing="true"]]/table:block',
            9: 'group-has-[[data-col="9"]:hover]/table:block group-has-[[data-col="9"][data-resizing="true"]]/table:block',
            10: 'group-has-[[data-col="10"]:hover]/table:block group-has-[[data-col="10"][data-resizing="true"]]/table:block',
        },
    },
})
