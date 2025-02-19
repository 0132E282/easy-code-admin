import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { router, usePage } from '@inertiajs/react'
import { Form, FormField } from '@/components/form'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import FileItem from '@/components/filemanager/file-item'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import axios from 'axios'
import { ResponseData } from '@/types'
import { Input } from '@/components/ui/input'
import { File } from '@/model'

type FilesProps = {
  files: File[]
}

const FileManager = function ({ files }: FilesProps) {
  const form = useForm<File>()
  const [filed, setFiled] = useState<string[]>([])
  const [openModeCreate, setOpenCreate] = useState<boolean>(false)

  const handleDoubleClickFolder = (directorie: File) => {
    router.get(route('admin.file_manager.index', { path: directorie.path }))
  }

  const handleClickFile = (event: React.MouseEvent, file: File) => {
    if (event.ctrlKey) {
      setFiled(prevFiled => (prevFiled.includes(file.path.toString()) ? prevFiled.filter(f => f !== file.path.toString()) : [...prevFiled, file.path.toString()]))
    } else {
      setFiled([file.path.toString()])
    }
  }

  const handleDelete = async (data: any) => {
    try {
      const res = await axios.delete(route('admin.file_manager.delete', { path: data.path }), {
        data: { files: filed },
      })
      router.reload({ only: ['files'] })
      toast({
        title: 'Success',
        description: res.data.message,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
      })
    }
  }

  const handleSubmitCreate = async (formData: File) => {
    try {
      formData.path = route().params.path
      const data = await axios.post<ResponseData>(route('admin.file_manager.create'), {
        ...formData,
        type: 'folder',
      })
      router.reload({ only: ['files'] })
      setOpenCreate(false)
      toast({
        title: 'Success',
        description: data.data.message,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
      })
    }
  }

  const handleFileChange = async function (e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files
    try {
      const res = await axios.post(
        route('admin.file_manager.upload'),
        { files: selectedFile, path: route().params.path },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      router.reload({ only: ['files'] })
      toast({
        title: 'Success',
        description: res.data.message,
      })
    } catch (error) {}
  }

  return (
    <div className='flex flex-col h-[100vh] w-[100vw]'>
      <div className='flex gap-2 border-b py-4 px-5 justify-end items-end'>
        <div>
          <Button onClick={() => document.getElementById('file-input')?.click()}>Tải lên</Button>
          <Input id='file-input' type='file' multiple style={{ display: 'none' }} onChange={handleFileChange} />
        </div>

        {/* create fother */}
        <Dialog open={openModeCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger>
            <Button variant='outline'>Create file</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Create file</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <Form<File> id='create_file' form={form} onSubmit={handleSubmitCreate}>
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
        {/* delete files */}
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
          <FileItem
            key={file.id}
            handleClickFile={(event: React.MouseEvent, file) => {
              file.type === 'file' ? handleClickFile(event, file) : handleDoubleClickFolder(file)
            }}
            checked={filed.includes(file.path)}
            file={file}
            type={file.type}
          />
        ))}
      </div>
    </div>
  )
}

export default FileManager
