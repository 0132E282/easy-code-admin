import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'

const Import: React.FC<{ name: string }> = ({ name }) => {
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files))
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>{name}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Import profile</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-6 px-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300'>
          <Label htmlFor='file-upload' className='flex flex-col items-center gap-3 cursor-pointer'>
            <Upload className='w-12 h-12 text-gray-500 group-hover:text-gray-700 transition-all duration-300' />
            <span className='text-gray-700 font-medium underline decoration-dashed'>Upload File</span>
          </Label>
          <Input id='file-upload' type='file' className='hidden' multiple onChange={handleFileChange} />
        </div>

        {/* Hiển thị danh sách file đã chọn */}
        {files.length > 0 && (
          <div className='mt-2 text-sm text-gray-600 text-center'>
            {files.map((file, index) => (
              <div key={index}>
                📄 <strong>File Selected:</strong> {file.name}
              </div>
            ))}
          </div>
        )}
        <p className='text-sm text-gray-600 mt-2'>
          Tải file mẫu{' '}
          <a href='#' className='text-blue-600 underline hover:text-blue-800'>
            Download
          </a>
        </p>
        <DialogFooter>
          <Button type='submit'>Import</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Import
