import { useState } from 'react'

interface TextInputProps {
  onUpdate: Function
}
export const TextInput = (props: TextInputProps) => {
  const [value, setValue] = useState('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    props.onUpdate(e.target.value)
  }
  return <input type="text" value={value} onChange={onChange} />
}
