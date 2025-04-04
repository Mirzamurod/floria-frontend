'use client'

import { ComponentProps } from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { ToastContainer } from 'react-toastify'
import WindowWrapper from '../window-wrapper'
import { SidebarProvider } from '../ui/sidebar'
import { I18nProvider } from '@/app/i18n'

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  const { resolvedTheme } = useTheme()

  return (
    <NextThemesProvider {...props}>
      <I18nProvider>
        <WindowWrapper>
          <SidebarProvider>{children}</SidebarProvider>
        </WindowWrapper>
        <ToastContainer
          stacked
          position='bottom-right'
          theme={resolvedTheme}
          className='bg-background'
        />
      </I18nProvider>
    </NextThemesProvider>
  )
}
