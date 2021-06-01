import { useState, useEffect } from 'react'
import cx from 'classnames'

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value: string | number | null | undefined
  className?: string
  onChange: (value: string) => void
}

export function TextField({ value, className, onChange, type, ...inputProps }: TextFieldProps) {
  const [inputValue, setValue] = useState(value)
  useEffect(() => {
    setValue(value)
  }, [value])

  return (
    <input
      {...inputProps}
      className={cx(
        'rounded-xl bg-transparent hover:bg-gray-100 focus:bg-gray-200 focus:outline-none px-3 py-2',
        className,
      )}
      value={inputValue}
      onChange={(e) => setValue(e.target.value)}
      onBlur={(e) => onChange(e.target.value)}
    />
  )
}
