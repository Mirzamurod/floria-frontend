import { TSidebar } from '@/types/sidebar'
import { Flower2, Home, List, ListOrdered, Logs, Users } from 'lucide-react'
import { GiHerbsBundle } from 'react-icons/gi'
import { IoMdAddCircleOutline } from 'react-icons/io'

export const themeConfig = { app: { name: 'Floria', icon: '/flower-icon.webp' } }

export const yandexgo = ({
  start_lat,
  start_lon,
  end_lat,
  end_lon,
}: {
  start_lat?: number
  start_lon?: number
  end_lat?: number
  end_lon?: number
}) =>
  `https://3.redirect.appmetrica.yandex.com/route?start-lat=${start_lat}&start-lon=${start_lon}&end-lat=${end_lat}&end-lon=${end_lon}&appmetrica_tracking_id=1178268795219780156`

export const sidebar: TSidebar = {
  client: [
    { title: 'Dashboard', icon: Home, href: '/' },
    {
      title: 'Zakazlar',
      icon: Logs,
      children: [
        { title: 'Yangi zakazlar', href: '/orders/status/new', icon: ListOrdered },
        { title: 'Eski zakazlar', href: '/orders/status/old', icon: ListOrdered },
        { title: "Bekor bo'lganlar", href: '/orders/status/cancelled', icon: ListOrdered },
        { title: 'Topshirilmagan zakazlar', href: '/orders/status/unsubmitted', icon: ListOrdered },
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
    {
      title: 'Kategoriya',
      icon: Flower2,
      children: [
        { title: "Kategoriya ro'yxati", icon: List, href: '/category/list' },
        { title: "Kategoriya qo'shish", icon: IoMdAddCircleOutline, href: '/category/add' },
      ],
    },
  ],
  admin: [
    { title: 'Dashboard', icon: Home, href: '/' },
    {
      title: 'Users',
      icon: Users,
      children: [{ title: 'Users List', href: '/users/list', icon: Users }],
    },
  ],
}
