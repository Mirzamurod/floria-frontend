'use client'

import { createElement, FC } from 'react'
import ReactPaginate from 'react-paginate'
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as ShadTable,
} from '../ui/table'
import { TColumns, TTable } from '@/types/table'
import { Loader2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { cn } from '@/lib/utils'
import useWindowWidth from '@/hooks/use-width'

const Table: FC<TTable> = props => {
  const {
    data,
    columns,
    mobileColumns,
    loading,
    pageCount,
    sortModel,
    paginationModel,
    footerPagination = true,
    onSortModelChange,
    onPaginationModelChange,
    pageSizeOptions = ['10', '20', '50'],
  } = props
  const width = useWindowWidth()

  const changeSortable = (column: TColumns) => {
    if (column.sortable) !column.renderCell && changeSort(column.field)
  }

  const changeSort = (field: string) => {
    if (!sortModel) onSortModelChange!({ field, sort: 'asc' })
    else {
      if (sortModel.field === field) {
        if (sortModel.sort === 'asc') onSortModelChange!({ field, sort: 'desc' })
        else onSortModelChange!(null)
      } else onSortModelChange!({ field, sort: 'asc' })
    }
  }

  return (
    <div>
      <ShadTable>
        <TableHeader>
          <TableRow>
            {[...(mobileColumns?.length && width < 768 ? mobileColumns : columns)].map(column => (
              <TableHead
                {...column}
                key={column.field}
                className={cn('px-2 min-w-28', column.className)}
                onClick={() => changeSortable(column)}
              >
                {column.headerName}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading || (!loading && !data.length) ? (
            <TableRow>
              <TableCell
                colSpan={
                  mobileColumns?.length && width < 768 ? mobileColumns.length : columns.length
                }
              >
                {loading ? (
                  <div className='flex justify-center items-center'>
                    <Loader2 className='animate-spin' />
                  </div>
                ) : (
                  <p className='text-center'>Ma'lumot yo'q</p>
                )}
              </TableCell>
            </TableRow>
          ) : (
            data.map(item => (
              <TableRow key={item._id}>
                {[...(mobileColumns?.length && width < 768 ? mobileColumns : columns)].map(
                  (column, index) => (
                    <TableCell {...column} key={index} className={cn('min-w-28', column.className)}>
                      {column.renderCell
                        ? createElement(column.renderCell as any, { row: item })
                        : item[column.field]}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </ShadTable>
      {footerPagination && !loading ? (
        <div className='mt-2 gap-3 flex justify-end items-center'>
          <Select
            value={paginationModel?.limit ?? '10'}
            onValueChange={value => onPaginationModelChange!({ page: 1, limit: value })}
          >
            <SelectTrigger className='w-auto'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions?.map(item => (
                <SelectItem value={item + ''} key={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className='w-auto'>
            <ReactPaginate
              previousLabel='<'
              nextLabel='>'
              breakLabel='...'
              initialPage={paginationModel?.page! - 1}
              pageCount={pageCount! ?? 1}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={({ selected }) =>
                onPaginationModelChange!({ page: selected! + 1, limit: paginationModel?.limit! })
              }
              containerClassName='flex gap-2 justify-center'
              pageClassName='px-3 py-[7px] text-sm font-medium rounded-md border border-green-500'
              activeClassName='bg-green-500 text-white'
              previousClassName='px-3 py-[7px] text-sm font-medium rounded-md border border-green-500'
              nextClassName='px-3 py-[7px] text-sm font-medium rounded-md border border-green-500'
              breakClassName='px-3 py-[7px] text-sm font-medium rounded-md border border-green-500 text-gray-500'
              disabledClassName='opacity-50 cursor-not-allowed'
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Table
