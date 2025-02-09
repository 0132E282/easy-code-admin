import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

const Index: React.FC = function () {
  return (
    <AuthenticatedLayout>
      <iframe className='h-full' src={route('admin.file_manager.index')} width='100%' height='600'></iframe>
    </AuthenticatedLayout>
  )
}

export default Index
