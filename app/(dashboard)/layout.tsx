import Logo from '@/components/Logo'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { UserButton } from '@clerk/nextjs'
import React, { ReactNode } from 'react'

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <div className=' flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
        <nav className=' flex justify-between items-center border-b h-[60px] border-border px-4 py-2'>
            <Logo/>
            <div className=' flex gap-4 items-center'>

              <ThemeSwitcher/>
              <UserButton afterSignOutUrl='/sign-in' />
              
            </div>
        </nav>
        <main>{children}</main>
    </div>
  )
}

export default Layout
