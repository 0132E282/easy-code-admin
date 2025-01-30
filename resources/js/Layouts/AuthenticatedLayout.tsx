import { PropsWithChildren } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppHeader } from '@/components/app-header'
export default function Authenticated({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className='flex-1 px-4 w-full h-full'>{children} </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
