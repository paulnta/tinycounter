import React, { useRef, useEffect } from 'react'

type ModalProps = {
  children?: React.ReactElement
  onClickOutside?: () => void
}

export function Modal({ children, onClickOutside }: ModalProps) {
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
      <div className="absolute h-full w-full inset-0 bg-gray-500 opacity-75"></div>
      <div className="absolute top-24 bottom-0 w-full">
        <div
          ref={contentEl}
          className="relative h-full w-full max-w-screen-lg mx-auto bg-gray-100 rounded-t-3xl"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
