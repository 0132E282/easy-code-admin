export type Settings<T> = {
  key: string
  value: T
}

export type SettingSystem = Settings<{
  title_site: string
  icon: string
  logo: string
  description?: string
  keywords?: string[]
  theme_color?: string
  maintenance_mode?: boolean
  email_admin: string
}>
