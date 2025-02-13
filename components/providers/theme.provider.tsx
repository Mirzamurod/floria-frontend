'use client'

import { ComponentProps } from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { ToastContainer } from 'react-toastify'
import WindowWrapper from '../window-wrapper'

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  const { resolvedTheme } = useTheme()

  return (
    <NextThemesProvider {...props}>
      <WindowWrapper>{children}</WindowWrapper>
      <ToastContainer stacked position='bottom-right' theme={resolvedTheme} />
    </NextThemesProvider>
  )
}
