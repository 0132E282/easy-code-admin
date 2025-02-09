import { File, FileIcon, FileSpreadsheet, FileText, Folder } from 'lucide-react'
import * as ContextMenu from '@radix-ui/react-context-menu'
import { useState } from 'react'
import { File as FileType } from '@/model'

type FileItemProps = {
  file: FileType
  checked?: boolean
  type?: 'file' | 'folder'
  handleClickFile?: (event: React.MouseEvent, file: FileType) => void
  handleDoubleClickFolder?: (file: FileType) => void
  onDelete?: (id: number | string) => void
  onRename?: (id: number | string, newName: string) => void
}

const FileItem = function ({ file, handleClickFile, type, handleDoubleClickFolder, checked, onDelete, onRename }: FileItemProps) {
  const [isRenaming, setIsRenaming] = useState(false)
  const [newName, setNewName] = useState(file.name)

  const fileExtension = file?.path.split('.').pop()?.toLowerCase()
  let Icon
  if (type === 'file' && fileExtension) {
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
  } else {
    Icon = <Folder className='w-10 h-10 text-gray-700' />
  }

  const handleRename = () => {
    if (newName !== file.name) {
      onRename?.(file.id, newName)
    }
    setIsRenaming(false)
  }

  const menuItems = [
    { label: 'Rename', action: () => setIsRenaming(true), className: 'text-blue-600' },
    { label: 'Delete', action: () => onDelete?.(file.id), className: 'text-red-600' },
    ...(type === 'folder'
      ? [
          { label: 'Properties', action: () => console.log('Properties clicked'), className: 'text-gray-700' },
          { label: 'Share Folder', action: () => console.log('Share Folder clicked'), className: 'text-gray-700' },
        ]
      : []),
  ]

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <div
          key={file.id}
          onClick={(event: React.MouseEvent) => handleClickFile && handleClickFile(event, file)}
          onDoubleClick={() => handleDoubleClickFolder && handleDoubleClickFolder(file)}
          className='flex flex-col items-center space-y-2 w-24 cursor-pointer'
        >
          <div className={`p-4 ${checked ? 'border-2 border-green-500' : 'border border-gray-300'} flex justify-center items-center bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-300`}>{Icon}</div>
          <div className='max-w-full text-justify text-sm text-gray-700 overflow-hidden text-ellipsis'>
            {isRenaming ? <textarea value={newName} onChange={e => setNewName(e.target.value)} onBlur={handleRename} autoFocus className='border border-gray-300 p-1 text-sm max-w-full min-h-[30px] resize-none' /> : file.name}
          </div>
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Content className='bg-white shadow-lg rounded-md p-2 w-48 border border-gray-200'>
        {menuItems.map((item, index) => (
          <ContextMenu.Item key={index} className={`py-1 px-4 ${item.className} hover:bg-gray-100 rounded-md transition-all cursor-pointer`} onClick={item.action}>
            {item.label}
          </ContextMenu.Item>
        ))}
        {type === 'folder' && <ContextMenu.Separator className='my-1 border-gray-200' />}
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}

export default FileItem
