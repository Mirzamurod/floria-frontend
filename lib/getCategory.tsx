import { TCategory } from '@/types/category'

const getCategory = (item: TCategory, language: string) => {
  return language === 'ru' ? item.nameRu || item.nameUz : item.nameUz
}

export default getCategory
