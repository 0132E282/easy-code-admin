import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import SectionItem from '../section-item'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/form/Form'

const sessions = [
  {
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
        options: [{ label: 'Tiếng Việt', value: 'vi' }],
      },
      {
        name: 'filter',
        label: 'Áp dụng bộ lọc',
        ui: 'radio-list',
        options: [
          { label: 'Dữ liệu đã lọc', value: 'current_data' },
          { label: 'Dữ liệu ngày hôm nay', value: 'current_date' },
        ],
      },
    ],
  },
]

export default function Export({ name }) {
  const form = useForm()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>{name}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[900px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className='max-h-[500px] overflow-auto'>
          <Form form={form} onSubmit={() => {}}>
            {sessions.map((session, index) => (
              <SectionItem key={index} form={form} item={session} className='border-none shadow-none' />
            ))}
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit'>xuất</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
