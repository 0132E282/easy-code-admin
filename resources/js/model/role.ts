import { Permission_items } from './permission'

export type role = {
  name: string
  id: number
  title: string
  permissions: Permission_items[]
}
