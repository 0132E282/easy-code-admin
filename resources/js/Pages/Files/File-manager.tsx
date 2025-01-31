import { Button } from '@/components/ui/button'
import { Folder } from 'lucide-react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { router } from '@inertiajs/react'
import { Form } from '@/components/form/Form'
import { useForm } from 'react-hook-form'
import { FormField } from '@/components/form/FormField'
import { toast } from '@/hooks/use-toast'
import FileItem from '@/components/filemanager/file-item'

type FilesProps = {
  directories: {
    name: string
    id: number | string
    path: string
  }[]
  files: {
    name: string
    id: number | string
    path: string
  }[]
}

const FileManager = function ({ directories, files }: FilesProps) {
  const [filed, setFiled] = useState<string[]>([])
  const [openModeCreate, setOpenCreate] = useState<boolean>(false)
  const form = useForm()

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
      await router.delete(route('admin.file_manager.delete', {path: data.path }))
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
  const handleSubmitCreate = async (data: any) => {
    try {
      data.path = route().params.path
      await router.post(route('admin.file_manager.create', { type: 'folder' }), data)
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
        <Button>Xóa</Button>
        <Button>Chọn</Button>
      </div>
      <div className='w-full flex flex-wrap items-start justify-start p-4 gap-4'>
        {directories.length === 0 && files.length === 0 ? (
          <div className='w-full m-auto flex flex-col items-center justify-center text-center text-gray-500'>
            <Folder className='w-20 h-20 text-gray-400 mb-4' />
            <span>Không có file hoặc thư mục nào.</span>
          </div>
        ) : (
          <>
            {directories.map(directorie => (
              <FileItem handleDoubleClickFolder={() => handleDoubleClickFolder(directorie)} file={directorie} key={directorie.id} type='folder' />
            ))}
            {files.map(file => (
              <FileItem handleClickFile={(event: React.MouseEvent, file) => handleClickFile(event, file)} checked={filed.includes(file.path)} file={file} key={file.id} type='file' />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default FileManager
