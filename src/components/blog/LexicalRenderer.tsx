'use client'

import type { ReactNode } from 'react'

type RichTextNode = {
  readonly type?: string
  readonly tag?: string
  readonly listType?: 'bullet' | 'number'
  readonly format?: number
  readonly text?: string
  readonly url?: string
  readonly fields?: {
    readonly url?: string
  }
  readonly children?: ReadonlyArray<RichTextNode>
}

type RichTextRoot = {
  readonly root?: {
    readonly children?: ReadonlyArray<RichTextNode>
  }
}

type LexicalRendererProps = {
  readonly content: Record<string, unknown>
}

const IS_BOLD = 1
const IS_ITALIC = 1 << 1
const IS_UNDERLINE = 1 << 3

function wrapFormattedText(node: RichTextNode, text: ReactNode): ReactNode {
  const format = typeof node.format === 'number' ? node.format : 0
  let current = text

  if ((format & IS_BOLD) !== 0) current = <strong>{current}</strong>
  if ((format & IS_ITALIC) !== 0) current = <em>{current}</em>
  if ((format & IS_UNDERLINE) !== 0) current = <span className="underline underline-offset-2">{current}</span>

  return current
}

function renderChildren(children: ReadonlyArray<RichTextNode> | undefined): ReactNode {
  if (!children) return null
  return children.map((child, index) => renderNode(child, index))
}

function renderNode(node: RichTextNode, index: number): ReactNode {
  const key = `${node.type ?? 'node'}-${index}`

  switch (node.type) {
    case 'paragraph':
      return (
        <p key={key} className="mb-4 text-base leading-8 text-foreground last:mb-0">
          {renderChildren(node.children)}
        </p>
      )

    case 'heading': {
      const headingClass =
        node.tag === 'h3'
          ? 'mb-4 mt-8 font-heading text-2xl font-semibold leading-tight text-foreground'
          : 'mb-4 mt-10 font-heading text-3xl font-semibold leading-tight text-foreground'

      if (node.tag === 'h3') {
        return (
          <h3 key={key} className={headingClass}>
            {renderChildren(node.children)}
          </h3>
        )
      }

      return (
        <h2 key={key} className={headingClass}>
          {renderChildren(node.children)}
        </h2>
      )
    }

    case 'list': {
      if (node.listType === 'number') {
        return (
          <ol key={key} className="mb-4 list-decimal space-y-1 pl-6 text-base leading-8 text-foreground">
            {renderChildren(node.children)}
          </ol>
        )
      }

      return (
        <ul key={key} className="mb-4 list-disc space-y-1 pl-6 text-base leading-8 text-foreground">
          {renderChildren(node.children)}
        </ul>
      )
    }

    case 'listitem':
      return <li key={key}>{renderChildren(node.children)}</li>

    case 'quote':
      return (
        <blockquote
          key={key}
          className="my-6 border-l-2 border-terracotta pl-4 text-base italic leading-8 text-muted-foreground"
        >
          {renderChildren(node.children)}
        </blockquote>
      )

    case 'link': {
      const href = node.fields?.url ?? node.url ?? '#'
      return (
        <a
          key={key}
          href={href}
          className="text-terracotta underline underline-offset-2 transition-opacity hover:opacity-80"
        >
          {renderChildren(node.children)}
        </a>
      )
    }

    case 'linebreak':
      return <br key={key} />

    case 'text':
      return <span key={key}>{wrapFormattedText(node, node.text ?? '')}</span>

    default:
      return <span key={key}>{renderChildren(node.children)}</span>
  }
}

export function LexicalRenderer({ content }: LexicalRendererProps) {
  const richText = content as RichTextRoot
  const children = richText.root?.children ?? []

  return <div className="max-w-[720px]">{children.map((node, index) => renderNode(node, index))}</div>
}
