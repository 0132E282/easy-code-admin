export type Permission = {
  value: number
  id: number
  name: string
  title: string
  permission_items: Permission_items[]
}

export type Permission_items = {
  id: number
  name: string
  guard_name: string
  display_name: string
  group_name: string
  created_at: Date
  updated_at: Date
}
