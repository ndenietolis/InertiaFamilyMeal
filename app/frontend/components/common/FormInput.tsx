import { Input } from '@/components/ui/input'
import { FieldLabel } from '@/components/ui/field'
// import { FormDataErrors } from '@inertiajs/react'

type Props = {
  label: string
  type: string
  name?: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  errors?: string | string[]
}

export const FormInput = ({ label, type, name, value, onChange, placeholder, errors }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <FieldLabel className="pr-20">{label}</FieldLabel>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-white/30 border-black/50"
      />
      {Array.isArray(errors) && errors.map((error) => <div key={error}>{error}</div>)}
      {typeof errors === 'string' && <div>{errors}</div>}
    </div>
  )
}
