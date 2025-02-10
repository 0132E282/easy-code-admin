import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Data } from '@/types'
import { ColumnTable, TablePageView } from '@/types/page'
import { useTranslation } from 'react-i18next'
import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ColumnsTable } from './columns-table'

type TablePageProps = {
  data: Data
  page: TablePageView
}

const TablePage = function ({ data, page }: TablePageProps) {
  const { t } = useTranslation('page');
  const currentRoute = route().current() ?? '';
  const title = t(currentRoute) !== currentRoute ? t(currentRoute) : t('index.title');
  return (
    <AuthenticatedLayout>
      {page?.filter && <>filter</>}
      <Card>
        <CardHeader className='border-b'>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className='pt-4'>
           <DataTable currentRoute={currentRoute} columns={ColumnsTable({columnsTable: page.columns})} data={data.data} />
        </CardContent>
      </Card>
    </AuthenticatedLayout>
  )
}

export default TablePage
