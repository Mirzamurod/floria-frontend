import { ReactNode } from 'react'

export type TTable = {
  data: any[]
  columns: TColumns[]
  loading?: boolean
  pageCount?: number
  footerPagination?: boolean
  pageSizeOptions?: number[]
  sortModel?: TSortModel | null
  onSortModelChange?: (value: TSortModel | null) => void
  paginationModel?: { page: number; limit: string }
  onPaginationModelChange?: (value: { page: number; limit: string }) => void
}

export type TColumns = {
  field: string
  headerName: string
  sortable?: boolean
  renderCell?: ({ row }: { row: any; [x: string]: any }) => ReactNode
  className?: string
}

export type TSortModel = { field: string; sort: 'asc' | 'desc' }
