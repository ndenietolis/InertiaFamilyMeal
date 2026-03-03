
import { Link, router, usePage } from '@inertiajs/react'
import { Button } from '@/components/ui/button'

type SharedProps = {
  auth?: {
    user?: {
      id: number
      email: string
    } | null
  }
}

export const NavBar = () => {
  const { props } = usePage<SharedProps>()
  const isLoggedIn = Boolean(props.auth?.user)

  return (
    <div className="flex items-center justify-end gap-3 bg-gray-900/20 p-4 backdrop-blur-md shadow-xs/20">
      {isLoggedIn ? (
        <>
          <Button asChild type="button" variant="ghost">
            <Link href="/kitchen">Kitchen</Link>
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.delete('/logout')}>
            Logout
          </Button>
        </>
      ) : (
        <Button asChild type="button" variant="secondary">
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  )
}
