import { useTranslation } from 'react-i18next'
import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const IndexPage = function <T>({ columns = [], data = {} }) {
  const { t } = useTranslation('page')
  return (
    <Card>
      <CardHeader className='border-b'>
        <CardTitle>{t(route().current() ?? '') !== route().current() ? t(route().current() ?? '') : t('index.title')}</CardTitle>
      </CardHeader>
      <CardContent className='pt-4'>
        <DataTable columns={columns} data={data.data} />
      </CardContent>
    </Card>
  )
}

export default IndexPage
