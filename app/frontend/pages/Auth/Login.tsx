import { Layout } from '@/components/auth/Layout'
import { useForm } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { TypographyH2, TypographyBody1 } from '@/components/common/Typography'
import { FormInput } from '@/components/common/FormInput'

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    username_or_email: '',
    password: '',
    remember_me: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
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
            label="Username or Email"
            type="text"
            value={data.username_or_email}
            onChange={(e) => setData('username_or_email', e.target.value)}
            errors={errors.username_or_email}
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
              checked={data.remember_me}
              onCheckedChange={(checked) => setData('remember_me', checked === true)}
            />{' '}
            <TypographyBody1>
              Remember Me
            </TypographyBody1>
          </div>
          <Button type="submit" disabled={processing}>
            Login
          </Button>
          <Button asChild type="button" variant="ghost">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </form>
      </div>
    </Layout>
  )
}
