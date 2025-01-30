'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ColumnDef, Row, Table } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { ColumnTable } from '@/model'
import { useTranslation } from 'react-i18next'

export type Payment = {
  id: string
  name: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}
const isValidImageUrl = (url: string) => {
  return /\.(jpeg|jpg|gif|png|svg|webp)$/i.test(url)
}
export const ColumnsTable = <T,>({ columnsTable = [] }: { columnsTable: ColumnTable[] }): ColumnDef<T>[] => {
  const { t } = useTranslation('page')
  const columns = columnsTable.map(columnTableItem => ({
    accessorKey: columnTableItem.accessorKey ?? '',
    header: ({ column }: { column: any }) => {
      let headerLabel = t(columnTableItem.header)
      if (headerLabel === columnTableItem.header) {
        const lastPart = columnTableItem.header.split('.').pop() || columnTableItem.header
        headerLabel = t('index.table.' + lastPart || headerLabel)
      }

      if (columnTableItem.sort) {
        return (
          <Button variant='ghost' className='p-0 bg-transparent hover:bg-transparent' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            {columnTableItem.header ?? ''}
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      }
      return headerLabel
    },
    cell: ({ row }: { row: Row<T> }) => {
      const value = row.getValue(columnTableItem.accessorKey)
      if (typeof value === 'string' && isValidImageUrl(value)) {
        return <img src={value} alt='Row Image' className='h-10 w-10 object-cover' />
      }
      return value ?? ''
    },
  }))

  return [
    {
      id: 'select',
      header: ({ table }: { table: Table<T> }) => (
        <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')} onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)} aria-label='Select all' />
      ),
      cell: ({ row }: { row: Row<T> }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} aria-label='Select row' />,
    },
    ...columns,
    {
      id: 'actions',
      cell: ({ row }: { row: Row<T> }) => {
        const data = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='mr-auto'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>{t('index.action.view')}</DropdownMenuItem>
              <DropdownMenuItem>{t('index.action.edit')}</DropdownMenuItem>
              <DropdownMenuItem>{t('index.action.delete')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
