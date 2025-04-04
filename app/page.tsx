'use client'

import { useTranslation } from 'react-i18next'
import AuthGuard from '@/components/auth/AuthGuard'

export default function Home() {
  const { t } = useTranslation()

  return (
    <AuthGuard>
      <p>Dashboard</p>
      <p>{t('title')}</p>
    </AuthGuard>
  )
}
