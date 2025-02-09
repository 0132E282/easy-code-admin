import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import IndexPage from '@/components/page/index-page'
import { User } from '@/types'
import { ColumnsTable } from '@/components/page'
import { ColumnTable } from '@/types/pages'

type IndexUserProp = {
  data: any
  columns: ColumnTable[]
}

const Index = function ({ data, columns }: IndexUserProp) {
  return (
    <AuthenticatedLayout>
      <IndexPage<User[]> data={data.data} columns={ColumnsTable<User[]>({ columnsTable: columns })} />
    </AuthenticatedLayout>
  )
}

export default Index
