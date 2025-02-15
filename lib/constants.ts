import { TSidebarItem } from '@/types/sidebar'
import { Flower2, Home, List, ListOrdered, Logs } from 'lucide-react'
import { GiHerbsBundle } from 'react-icons/gi'
import { IoMdAddCircleOutline } from 'react-icons/io'

export const sidebar: TSidebarItem[] = [
  { title: 'Dashboard', icon: Home, href: '/' },
  {
    title: 'Zakazlar',
    icon: Logs,
    children: [
      { title: 'Yengi zakazlar', href: '/orders/new/list', icon: ListOrdered },
      { title: 'Eski zakazlar', href: '/orders/old/list', icon: ListOrdered },
    ],
  },
  {
    title: 'Buketlar',
    icon: GiHerbsBundle,
    children: [
      { title: "Buketlar ro'yxati", icon: List, href: '/bouquets/list' },
      { title: "Buket qo'shish", icon: IoMdAddCircleOutline, href: '/bouquets/add' },
    ],
  },
  {
    title: 'Gullar',
    icon: Flower2,
    children: [
      { title: "Gullar ro'yxati", icon: List, href: '/flowers/list' },
      { title: "Gul qo'shish", icon: IoMdAddCircleOutline, href: '/flowers/add' },
    ],
  },
]
