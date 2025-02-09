import { Button } from '@/components/ui/button'
import { Folder } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { router, usePage } from '@inertiajs/react'
import { Form } from '@/components/form/Form'
import { useForm } from 'react-hook-form'
import { FormField } from '@/components/form/FormField'
import { toast } from '@/hooks/use-toast'
import FileItem from '@/components/filemanager/file-item'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

type FilesProps = {
  files: {
    name: string
    id: number | string
    path: string
    type?: 'file' | 'folder'
  }[]
}

const FileManager = function ({ files }: FilesProps) {
  const { props } = usePage()
  const form = useForm()
  const [filed, setFiled] = useState<string[]>([])
  const [openModeCreate, setOpenCreate] = useState<boolean>(false)

  const handleDoubleClickFolder = (directorie: { path: string | number }) => {
    router.get(route('admin.file_manager.index', { path: directorie.path }))
  }

  const handleClickFile = (event: React.MouseEvent, file: { path: string | number }) => {
    if (event.ctrlKey) {
      setFiled(prevFiled => (prevFiled.includes(file.path.toString()) ? prevFiled.filter(f => f !== file.path.toString()) : [...prevFiled, file.path.toString()]))
    } else {
      setFiled([file.path.toString()])
    }
  }

  const handleDelete = async (data: any) => {
    try {
      await router.delete(route('admin.file_manager.delete', { path: data.path }), { data: { files: filed } })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
      })
    }
  }
  const handleSubmitCreate = async (data: any) => {
    try {
      data.path = route().params.path
      await router.post(route('admin.file_manager.create', { type: 'folder' }), data)
      console.log(props.auth, props)
      setOpenCreate(false)
      toast({
        title: 'Success',
        description: 'Your request was successful.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
      })
    }
  }

  return (
    <div className='flex flex-col h-[100vh] w-[100vw]'>
      <div className='flex gap-2 border-b py-4 px-5 justify-end items-end'>
        <Button>Tải lên</Button>
        <Dialog open={openModeCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger>
            <Button variant='outline'>Create file</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Create file</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <Form id='create_file' form={form} onSubmit={handleSubmitCreate}>
                <FormField form={form} label='Name' name='name' />
              </Form>
            </div>
            <DialogFooter>
              <Button type='submit' form='create_file'>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='destructive'>Xóa</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
              <AlertDialogDescription>Hành động này không thể hoàn tác. Dữ liệu của bạn sẽ bị xóa vĩnh viễn khỏi hệ thống.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleDelete} className='bg-red-600 text-white hover:bg-red-700'>
                Xác nhận xóa
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button>Chọn</Button>
      </div>
      <div className='w-full flex flex-wrap items-start justify-start p-4 gap-4'>
        {files.map((file, index) => (
          <FileItem key={file.id} handleClickFile={(event: React.MouseEvent, file) => handleClickFile(event, file)} checked={filed.includes(file.path)} file={file} type={file.type} />
        ))}
      </div>
    </div>
  )
}

export default FileManager
