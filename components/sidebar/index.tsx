import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { ChevronUp, User2 } from 'lucide-react'
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  Sidebar as ShadSidebar,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
  useSidebar,
} from '../ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { sidebar, themeConfig } from '@/lib/constants'
import { Separator } from '../ui/separator'

const Sidebar = () => {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()
  const { data: session } = useSession()

  return (
    <ShadSidebar className='bg-background z-50'>
      <SidebarHeader>
        <div className='flex gap-2 items-center'>
          <Image src={themeConfig.app.icon} alt='flower-icon' width={36} height={36} />
          <p className='text-xl'>{themeConfig.app.name}</p>
        </div>
      </SidebarHeader>
      <Separator />
      {session?.currentUser ? (
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebar?.[session?.currentUser?.role as string]?.map(item => (
                  <SidebarMenuItem key={item.title}>
                    {item.href ? (
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        onClick={() => setOpenMobile(false)}
                      >
                        <Link href={{ pathname: item.href, query: item.query }}>
                          <item.icon size={16} />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenu className='flex flex-row items-center p-2'>
                        <item.icon size={16} />
                        {item.title}
                      </SidebarMenu>
                    )}
                    {item.children?.length
                      ? item.children.map(child => (
                          <SidebarMenuSub key={child.title}>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === child.href}
                                onClick={() => setOpenMobile(false)}
                              >
                                <Link href={{ pathname: child.href, query: child.query }}>
                                  <child.icon size={16} />
                                  <span>{child.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        ))
                      : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      ) : null}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side='top' className='w-[--radix-popper-anchor-width]'>
                <DropdownMenuItem
                  asChild
                  className='cursor-pointer'
                  onClick={() => setOpenMobile(false)}
                >
                  <Link href='/profile'>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()} className='cursor-pointer'>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadSidebar>
  )
}

export default Sidebar
