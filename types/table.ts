import { ReactNode, StyleHTMLAttributes } from 'react'
import { ClassValue } from 'clsx'

export type TTable = {
  data: any[]
  columns: TColumns[]
  loading?: boolean
  pageCount?: number
  footerPagination?: boolean
  pageSizeOptions?: number[]
  sortModel?: TSortModel | null
  onSortModelChange?: (value: TSortModel | null) => void
  paginationModel?: { page: number; pageSize: string }
  onPaginationModelChange?: (value: { page: number; pageSize: string }) => void
}

export type TColumns = {
  field: string
  headerName: string
  sortable?: boolean
  renderCell?: ({ row }: { row: any; [x: string]: any }) => ReactNode
  className?: string
}

export type TSortModel = { field: string; sort: 'asc' | 'desc' }
