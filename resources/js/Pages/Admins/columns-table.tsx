'use client'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ColumnDef, Row, Table } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { ColumnTable} from '@/types/page'
import { useTranslation } from 'react-i18next'
import { Link, router } from '@inertiajs/react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

export type Payment = {
  id: string
  name: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string,
  actions: any
}

const isValidImageUrl = (url: string) => /\.(jpeg|jpg|gif|png|svg|webp)$/i.test(url)

export const ColumnsTable = <T,>({ columnsTable = [] }: { columnsTable: ColumnTable[] }): ColumnDef<T>[] => {
  const { t } = useTranslation('page')
  const routeNameEdit = route()?.current()?.replace(/[^.]+$/, 'edit')
  const routeNameDelete = route()?.current()?.replace(/[^.]+$/, 'delete')

  function handDeleteItem(data) {
    if (routeNameDelete) {
       router.delete(route(routeNameDelete, { 'id': data.id }))
    }
  }

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
              <DropdownMenuItem>
                <Link href={routeNameEdit && data?.id ? route(routeNameEdit, { id: data?.id }) : ''}>
                  {t('index.action.edit')}
                </Link>
              </DropdownMenuItem>
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className='cursor-pointer'  onSelect={(e) => e.preventDefault()} >
                        {t('index.action.delete')}
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t('action.columns.delete.title')}</AlertDialogTitle>
                      <AlertDialogDescription>
                         {t('action.columns.delete.message')}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={()=>handDeleteItem(data)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
