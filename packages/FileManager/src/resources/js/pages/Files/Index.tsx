import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

const IndexPage: React.FC = () => {
  return (
    <AuthenticatedLayout>
      <iframe src={route('admin.file_manager.index')} width='100%' height='600'></iframe>
    </AuthenticatedLayout>
  )
}

export default IndexPage
