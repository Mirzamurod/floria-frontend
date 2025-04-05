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
    { title: 'dashboard', icon: Home, href: '/' },
    {
      title: 'orders',
      icon: Logs,
      children: [
        { title: 'neworders', href: '/orders/status/new', icon: ListOrdered },
        { title: 'oldorders', href: '/orders/status/old', icon: ListOrdered },
        { title: 'cancelledorders', href: '/orders/status/cancelled', icon: ListOrdered },
        { title: 'unsubmittedorders', href: '/orders/status/unsubmitted', icon: ListOrdered },
      ],
    },
    {
      title: 'bouquets',
      icon: GiHerbsBundle,
      children: [
        { title: 'bouquetslist', icon: List, href: '/bouquets/list' },
        { title: 'addbouquet', icon: IoMdAddCircleOutline, href: '/bouquets/add' },
      ],
    },
    {
      title: 'flowers',
      icon: Flower2,
      children: [
        { title: 'flowerslist', icon: List, href: '/flowers/list' },
        { title: 'addflower', icon: IoMdAddCircleOutline, href: '/flowers/add' },
      ],
    },
    {
      title: 'category',
      icon: Flower2,
      children: [
        { title: 'categorylist', icon: List, href: '/category/list' },
        { title: 'addcategory', icon: IoMdAddCircleOutline, href: '/category/add' },
      ],
    },
  ],
  admin: [
    { title: 'dashboard', icon: Home, href: '/' },
    {
      title: 'users',
      icon: Users,
      children: [{ title: 'userslist', href: '/users/list', icon: Users }],
    },
  ],
}
