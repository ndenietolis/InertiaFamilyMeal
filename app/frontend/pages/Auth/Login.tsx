import { Layout } from '@/components/auth/Layout'
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { TypographyH2, TypographyBody1 } from '@/components/common/Typography'
import { FormInput } from '@/components/common/FormInput'

export default function Login() {
    
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const handleSubmit = (e: React.ChangeEvent) => {
    console.log('data', e, data)
    e.preventDefault()
    post('/login')
  }

  return (
    <Layout>
      <div className="bg-gray-900/20 backdrop-blur-md min-w-100 flex-col justify-center gap-6 p-12 rounded-2xl shadow-2xl/50">
        <TypographyH2>
          Sign In
        </TypographyH2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <div className="flex flex-row justify-left gap-2 items-center">
            <Checkbox
              checked={data.remember}
              onCheckedChange={() => setData('remember', !data.remember)}
            />{' '}
            <TypographyBody1>
              Remember Me
            </TypographyBody1>
          </div>
          <Button type="submit" disabled={processing}>
            Login
          </Button>
        </form>
      </div>
    </Layout>
  )
}
