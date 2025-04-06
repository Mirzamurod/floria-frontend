'use client'

import { useTranslation } from 'react-i18next'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '../ui/menubar'
import i18n from '@/app/i18nInstance'

const Language = ({ en }: { en?: boolean }) => {
  const { i18n: i18next } = useTranslation()

  const changeLanguage = (lng: 'uz' | 'ru' | 'en') => i18next.changeLanguage(lng)

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className='capitalize'>{i18n.language}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => changeLanguage('uz')}>Uz</MenubarItem>
          <MenubarItem onClick={() => changeLanguage('ru')}>Ru</MenubarItem>
          {en ? <MenubarItem onClick={() => changeLanguage('en')}>En</MenubarItem> : null}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export default Language
