'use client'

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '../ui/menubar'
import i18n from '@/app/i18nInstance'
import { useTranslation } from 'react-i18next'

const Language = () => {
  const { i18n: i18next } = useTranslation()

  const changeLanguage = (lng: 'uz' | 'ru' | 'en') => i18next.changeLanguage(lng)

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className='capitalize'>{i18n.language}</MenubarTrigger>
        <MenubarContent>
          {['uz', 'ru', 'en'].map(lang => (
            <MenubarItem
              key={lang}
              className='capitalize'
              onClick={() => changeLanguage(lang as 'uz' | 'ru' | 'en')}
            >
              {lang}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export default Language
