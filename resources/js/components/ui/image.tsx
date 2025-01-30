import * as React from 'react'

import { cn } from '@/lib/utils'
import { UploadIcon } from 'lucide-react'

const Image = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(({ className, type, ...props }, ref) => {
  return (
    <div className={cn('p-4 border-2 border-dashed h-32 w-36 flex flex-col items-center justify-center cursor-pointer group', 'border-gray-300 hover:border-rose-400 transition-all duration-200 ease-in-out')}>
      <UploadIcon width={50} className='text-gray-500 group-hover:text-rose-400 transition-colors duration-200' />
    </div>
  )
})
Image.displayName = 'Image'

export { Image }
