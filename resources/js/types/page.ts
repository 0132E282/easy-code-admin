import * as Lucide from 'lucide-react'
import { PropsWithChildren } from 'react'

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

export type Filed = {
  name: string
  ui: 'image' | 'number' | 'selector' | 'checkbox' | 'text' | 'textarea' | 'radio' | 'switch' | 'date' | 'time' | 'color' | 'range'
  width: 'md' | 'sm' | 'lg' | 'xl' | 'full'
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export type Section = {
  className?: string
  label?: string
  fields?: Filed[]
  placeholder?: string
}

export type PageAdminProps = {
  container: 'xl' | 'lg' | 'md' | 'sm'
  sections: Array<Section>
  sidebar: {
    right?: Section[]
    left?: Section[]
  }
}

export type Component = PropsWithChildren & {
  className?: string
}

export type Option = {
  label: string
  id: string
  value: string
}

export type Relationships_view = Record<
  string,
  {
    placeholder?: string
    options: Option[]
  }
>
