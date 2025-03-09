import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Data } from '@/types'
import { TablePageView } from '@/types/page'
import { useTranslation } from 'react-i18next'
import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ColumnsTable } from './Column-table'
import { Button, buttonVariants } from '@/components/ui/button'
import { Link } from '@inertiajs/react'
import { Export, Import } from '@/components/plugins'

type TablePageProps = {
  data: Data
  page: TablePageView
}

type ActionPageProps = {
  actions: { name: string; label?: string; type: string }[]
  routeModule: string
  t: (key: string) => string
}

const ActionPage = ({ actions, routeModule, t }: ActionPageProps) => {
  return (
    <div className='ms-auto gap-4 flex'>
      {actions.map(action => {
        const label = action.label || t(`button.${action.name}`) // Fix lỗi cú pháp
        switch (action.type) {
          case 'link': {
            const link = route().has(`${routeModule}.${action.name}`) ? route(`${routeModule}.${action.name}`) : '#'
            return (
              <Link key={action.name} href={link} className={buttonVariants({ variant: 'outline' })}>
                {label}
              </Link>
            )
          }
          case 'button':
            return (
              <Button key={action.name} variant='outline'>
                {label}
              </Button>
            )
          case 'component':
            const Component = action.component
            return <Component key={action.name} {...action} />
          default:
            return null
        }
      })}
    </div>
  )
}

const TablePage = ({ data, page }: TablePageProps) => {
  const { t } = useTranslation('page')
  const currentRoute = route().current() ?? ''
  const routeModule = currentRoute.split('.').slice(0, -1).join('.')

  const actions = [
    {
      name: 'export',
      type: 'component',
      component: Export,
    },
    {
      name: 'import',
      type: 'component',
      component: Import,
    },
    {
      name: 'create',
      type: 'link',
    },
    {
      name: 'delete-multiple',
      type: 'button',
    },
  ]

  return (
    <AuthenticatedLayout>
      <div className='gap-4 flex flex-col'>
        <Card>
          <CardHeader className='border-b py-3'>
            <div className='flex justify-between items-center'>
              <CardTitle>{t(page?.title)}</CardTitle>
              <ActionPage actions={[...actions, ...(page?.plugins || [])]} routeModule={routeModule} t={t} />
            </div>
          </CardHeader>
          <CardContent className='pt-4'>
            <DataTable currentRoute={currentRoute} columns={ColumnsTable({ columnsTable: page.columns })} data={data.data} />
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  )
}

export default TablePage
