export type TSidebarItem = {
  title?: string
  href?: string
  icon?: any
  query?: { [x: string]: any }
  children?: TSidebarItem[]
}
