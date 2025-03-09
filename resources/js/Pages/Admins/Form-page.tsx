'use client'
import SectionItem from '@/components/section-item'
import FormLayout from '@/Layouts/Form-layout'
import { PageAdminProps, Relationships_view } from '@/types/page'
import { useForm } from 'react-hook-form'

interface FormPageProps {
  data: any
  page: PageAdminProps
  relationships_view?: Relationships_view
}

const sessions = [
  {
    title: 'Thông tin cơ bản',
    fields: [
      { name: 'name', label: 'Tên file', ui: 'text', width: 'full' },
      {
        name: 'type',
        label: 'Loại file',
        ui: 'select',
        options: [
          { label: 'SVG', value: 'svg' },
          { label: 'XLSX', value: 'xlsx' },
          { label: 'PDF', value: 'pdf' },
          { label: 'DOCX', value: 'docx' },
        ],
      },
      {
        name: 'language',
        label: 'Ngôn ngữ',
        ui: 'select',
        options: [
          { label: 'Tiếng Việt', value: 'vi' },
          { label: 'English', value: 'en' },
          { label: '中文', value: 'zh' },
          { label: '日本語', value: 'ja' },
        ],
      },
    ],
  },
  {
    title: 'Cấu hình nâng cao',
    fields: [],
  },
]

const FormPage = function ({ data, page, relationships_view }: FormPageProps) {
  const form = useForm({
    defaultValues: data,
  })
  return (
    <FormLayout form={form} container='ms'>
      <div className='flex gap-4'>
        {page?.sidebar?.left && (
          <div className='max-w-[800px] w-full'>
            {page.sidebar.left.map((item, index) => (
              <SectionItem key={index} item={item} form={form} relationships_view={relationships_view} />
            ))}
          </div>
        )}
        <div className='flex flex-1 flex-col gap-4'>
          {page.sections.map((item, index) => (
            <SectionItem key={index} item={item} form={form} relationships_view={relationships_view} />
          ))}
        </div>
        {page?.sidebar?.right && (
          <div className='max-w-[400px] w-full'>
            {page.sidebar.right.map((item, index) => (
              <SectionItem key={index} item={item} form={form} relationships_view={relationships_view} />
            ))}
          </div>
        )}
      </div>
    </FormLayout>
  )
}

export default FormPage
