'use client'

import { AlignPlugin } from '@udecode/plate-alignment/react'
import { HEADING_LEVELS } from '@udecode/plate-heading'
import { ImagePlugin, MediaEmbedPlugin } from '@udecode/plate-media/react'
import { ParagraphPlugin } from '@udecode/plate/react'

export const alignPlugin = AlignPlugin.extend({
    inject: {
        targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS, MediaEmbedPlugin.key, ImagePlugin.key],
    },
})
