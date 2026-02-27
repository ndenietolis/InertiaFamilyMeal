import React from 'react'

type Props = {
  children: React.ReactNode
}
export const Layout = ({ children }: Props) => {
  return (
    <main
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {children}
    </main>
  )
}
