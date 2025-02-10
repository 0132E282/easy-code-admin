export interface User {
  id: number
  name: string
  email: string
  email_verified_at?: string
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User
  }
}

export type ResponseData<T = unknown> = {
  message: string
  data?: T
  type?: 'success' | 'error'
}
interface PaginationLinks {
  [key: string]: string
}

export type Data<T = unknown> = {
  data: T[]
  perPage: number
  currentPage: number
  path: string
  query: Record<string, any>
  fragment: string | null
  pageName: string
  onEachSide: number
  options: Record<string, any>
  total: number
  lastPage: number
  links?: PaginationLinks
}
