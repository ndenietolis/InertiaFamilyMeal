import React from 'react'
import { Head } from '@inertiajs/react'
import { NavBar } from '@/components/common/NavBar'

type Props = {
  title: string
  children: React.ReactNode
}
export const Layout = ({ title, children }: Props) => {
  return (
    <>
      <Head title={title} />
      <main
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <NavBar />
        {children}
      </main>
    </>
  )
}
