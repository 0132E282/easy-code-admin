import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Permission, Permission_items } from '@/model'
import { Label } from '../ui/label'
import { useState } from 'react'
import { FormField } from '../form/FormField'

export type CardPermissionItemProps = {
  permission: Permission
  onChange?: (data: Permission_items) => void
  form: any
}

const CardPermissionItem = ({ permission, onChange, form }: CardPermissionItemProps) => {
  const [checkAllPermission, setCheckAllPermission] = useState(false)

  const handleCheckAll = () => {
    const allPermissionIds = permission.permission_items.map(permission => ({
      id: permission.id,
      label: permission.display_name,
      value: permission.id,
    }))
    setCheckAllPermission(!checkAllPermission)
    const currentPermissions = form.getValues('permissions') || []
    if (!checkAllPermission) {
      form.setValue('permissions', [...new Set([...currentPermissions, ...allPermissionIds])])
    } else {
      form.setValue(
        'permissions',
        currentPermissions.filter((item: { id: number }) => !allPermissionIds.some(permId => permId.id === item.id)),
      )
    }
  }

  form.watch((value: { permissions: Permission[] }) => {
    const isAllChecked = permission.permission_items.every(item => value.permissions?.some(p => p.value === item.id))
    setCheckAllPermission(isAllChecked)
  })

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center space-x-2 py-1 '>
          <Checkbox onClick={handleCheckAll} checked={checkAllPermission} id={permission.name} className='cursor-pointer' />
          <Label htmlFor={permission.name} className='cursor-pointer'>
            {permission.title}
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <FormField
          options={permission.permission_items.map(permission => ({
            id: permission.id,
            label: permission.display_name,
            value: permission.id,
          }))}
          name='permissions'
          form={form}
          type='checkbox_list'
        />
      </CardContent>
    </Card>
  )
}

export default CardPermissionItem
