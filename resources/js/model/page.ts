import * as Lucide from 'lucide-react'

export type Sidebar = {
  display_name: string
  route_name: string
  icon?: keyof typeof Lucide
  isActive?: boolean
  items?: {
    display_name: string
    route_name: string
  }[]
}[]

export type ColumnTable = {
  header: string
  accessorKey: string
  sort: boolean
}
