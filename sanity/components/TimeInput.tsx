import { set, unset } from 'sanity'
import { useCallback } from 'react'
import type { StringInputProps } from 'sanity'

export function TimeInput(props: StringInputProps) {
  const { value, onChange } = props

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      onChange(newValue ? set(newValue) : unset())
    },
    [onChange]
  )

  return (
    <input
      type="time"
      step={60}
      value={value || ''}
      onChange={handleChange}
      style={{
        width: '100%',
        padding: '0.5rem',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontFamily: 'inherit',
      }}
    />
  )
}
