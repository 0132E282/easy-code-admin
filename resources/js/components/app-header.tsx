import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { usePage } from '@inertiajs/react'
import React from 'react'

export const AppHeader = function () {
  const { breadcrumbs } = usePage()?.props

  return (
    <header className='flex mb-4 border-b h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />

        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs?.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>{index === breadcrumbs.length - 1 ? <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage> : <BreadcrumbLink href={breadcrumb.url}>{breadcrumb.title}</BreadcrumbLink>}</BreadcrumbItem>

                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator className='hidden md:block' />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
