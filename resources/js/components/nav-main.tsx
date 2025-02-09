'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar'
import { Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import * as Lucide from 'lucide-react'
import React from 'react'
import { Sidebar } from '@/model'

type NavMainProps = {
  items: Sidebar
}

export function NavMain({ items }: NavMainProps) {
  const { t } = useTranslation('sidebar')
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map(item => (
          <React.Fragment key={item.display_name}>
            {item?.items ? (
              <Collapsible asChild defaultOpen={item.isActive} className='group/collapsible'>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.display_name}>
                      {/* Uncomment and customize the icon logic if needed */}
                      {item.icon && Lucide[t(item.icon) as keyof typeof Lucide] && React.createElement((Lucide[t(item.icon) as keyof typeof Lucide] as React.ComponentType<LucideIcon>) ?? '')}
                      <span>{t(item.display_name)}</span>
                      <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map(subItem => (
                        <SidebarMenuSubItem key={subItem.display_name}>
                          <SidebarMenuSubButton asChild>
                            <Link href={route(subItem.route_name || '')}>
                              <span>{t(subItem.display_name)}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuButton asChild>
                <Link href={route(item.route_name) || '#'}>
                  {/* Uncomment and customize the icon logic if needed */}
                  {item.icon && Lucide[t(item.icon) as keyof typeof Lucide] && React.createElement((Lucide[t(item.icon) as keyof typeof Lucide] as React.ComponentType<LucideIcon>) ?? '')}
                  <span>{t(item.display_name)}</span>
                </Link>
              </SidebarMenuButton>
            )}
          </React.Fragment>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
