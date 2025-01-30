import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { File, FileIcon, FileSpreadsheet, FileText, Folder } from 'lucide-react'
import { useState } from 'react'

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

const FileManager = function ({ directories, files, treeDirectories }: FilesProps) {
  const [filed, setFiled] = useState<string[]>([])
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  const handleClickFolder = function (directorie) {
    setSelectedFolder(prevFolder => (prevFolder === directorie.id.toString() ? null : directorie.id.toString()))
  }

  const handleClickFile = function (file: { id: string | number }) {
    setFiled(prevFiled => (prevFiled.includes(file.id.toString()) ? prevFiled.filter(f => f !== file.id.toString()) : [...prevFiled, file.id.toString()]))
  }

  return (
    <div className='flex flex-col h-[100vh] w-[100vw]'>
      <div className='flex gap-2 border-b py-4 px-5 justify-end items-end'>
        <Button>Tải lên</Button>
        <Button>Xóa</Button>
        <Button disabled={Boolean(selectedFolder)}>Chọn</Button>
      </div>
      <div className='w-full flex flex-1 p-4 gap-4'>
        {directories.map(directorie => {
          return (
            <div key={directorie?.id} onClick={() => handleClickFolder(directorie)} className='flex flex-col items-center space-y-2 w-24 h-28 cursor-pointer'>
              <div className={`p-4 ${selectedFolder === directorie.id.toString() ? 'border-2 border-green-500' : 'border border-gray-300'} flex justify-center items-center bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-300`}>
                <Folder className='w-10 h-10 text-gray-700' />
              </div>
              <div className='text-center text-sm text-gray-700'>{directorie?.name ?? ''}</div>
            </div>
          )
        })}
        {files.map(file => {
          const fileExtension = file.path?.split('.').pop().toLowerCase()
          let Icon
          if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
            Icon = <img src={'/storage/' + file.path} alt='Image' className='w-10 h-10' />
          } else if (['pdf'].includes(fileExtension)) {
            Icon = <FileIcon className='w-10 h-10 text-red-500' />
          } else if (['txt', 'doc', 'docx'].includes(fileExtension)) {
            Icon = <FileText className='w-10 h-10 text-blue-500' />
          } else if (['xls', 'xlsx'].includes(fileExtension)) {
            Icon = <FileSpreadsheet className='w-10 h-10 text-green-500' />
          } else {
            Icon = <File className='w-10 h-10 text-gray-700' />
          }
          return (
            <div key={file.id} onClick={() => handleClickFile(file)} className='flex flex-col items-center space-y-2 w-24 h-28 cursor-pointer'>
              <div className={`p-4 ${filed.includes(file.id.toString()) ? 'border-2 border-green-500' : 'border border-gray-300'} flex justify-center items-center bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-300`}>{Icon}</div>
              <div className='text-center text-sm text-gray-700'>{file.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FileManager
