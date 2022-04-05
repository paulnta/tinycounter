import { Modal } from './Modal'
import classNames from 'classnames'
import { QRCodeSVG } from 'qrcode.react'
import { MdClose } from 'react-icons/md'
import { useState } from 'react'

type ShareModalProps = {
  onClose: () => void
}

export function ShareModal({ onClose }: ShareModalProps) {
  const url = window.location.href
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      throw Error('Clipboard API not available')
    }
    await navigator.clipboard.writeText(url)
    setCopied(true)
  }

  return (
    <Modal maxWidth="sm" onClickOutside={onClose}>
      <div>
        <div className="flex items-center p-4">
          <button className="icon-button" onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center px-8 mx-auto max-w-sm">
          <h3 className="text-xl font-bold text-center mb-10">
            Share this space and count on multiple devices
          </h3>
          <div className="w-56 h-56 mb-6">
            <QRCodeSVG value={url} style={{ width: '100%', height: '100%' }} />
          </div>

          <p className="text-sm text-slate-600 mb-1">or copy link</p>
          <div className="w-full flex items-center relative">
            <input
              className="flex-1 w-full pl-4 pr-20 py-3 leading-5 bg-slate-100 rounded-md text-slate-500"
              readOnly
              value={url}
            />
            <button
              onClick={onCopy}
              className={classNames('absolute top-3 right-4 leading-5 font-bold', {
                'text-cyan-500': copied,
              })}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
