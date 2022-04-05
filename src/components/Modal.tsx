import React, { useRef, useEffect } from 'react'
import classnames from 'classnames'

type ModalProps = {
  children?: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg'
  onClickOutside?: () => void
}

export function Modal(props: ModalProps) {
  const { children, onClickOutside, maxWidth = 'lg' } = props
  const contentEl = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!contentEl.current?.contains(e.target as Node)) {
        onClickOutside?.()
      }
    }
    document.addEventListener('click', listener)
    return () => document.removeEventListener('click', listener)
  }, [contentEl, onClickOutside])

  return (
    <div className="fixed z-10 inset-0">
      <div className="absolute h-full w-full inset-0 bg-slate-500 opacity-75"></div>
      <div className="absolute top-24 bottom-0 w-full">
        <div
          ref={contentEl}
          className={classnames('relative h-full w-full mx-auto bg-white rounded-t-3xl', {
            'max-w-screen-sm': maxWidth === 'sm',
            'max-w-screen-md': maxWidth === 'md',
            'max-w-screen-lg': maxWidth === 'lg',
          })}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
