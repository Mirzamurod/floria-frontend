'use client'

import { ComponentProps } from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { ToastContainer } from 'react-toastify'
import WindowWrapper from '../window-wrapper'
import { SidebarProvider } from '../ui/sidebar'

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  const { resolvedTheme } = useTheme()

  return (
    <NextThemesProvider {...props}>
      <WindowWrapper>
        <SidebarProvider>{children}</SidebarProvider>
      </WindowWrapper>
      <ToastContainer stacked position='bottom-right' theme={resolvedTheme} />
    </NextThemesProvider>
  )
}
