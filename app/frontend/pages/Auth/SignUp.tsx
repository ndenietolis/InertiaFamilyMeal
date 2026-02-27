import { Layout } from '@/components/auth/Layout'
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { TypographyH2 } from '@/components/common/Typography'
import { FormInput } from '@/components/common/FormInput'

export default function SignUp() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/signup')
  }

  return (
    <Layout>
      <div className="bg-gray-900/20 backdrop-blur-md min-w-100 flex-col justify-center gap-6 p-12 rounded-2xl shadow-2xl/50">
        <TypographyH2>
          Sign Up
        </TypographyH2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormInput
            label="Username"
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            placeholder="What's your name, chef?"
            errors={errors.name}
          />
          <FormInput
            label="Email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            errors={errors.email}
          />
          <FormInput
            label="Password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            errors={errors.password}
          />
          <FormInput
            label="Confirm your password"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            errors={errors.password_confirmation}
          />
          <Button type="submit" disabled={processing}>
            Sign Up
          </Button>
        </form>
      </div>
    </Layout>
  )
}
