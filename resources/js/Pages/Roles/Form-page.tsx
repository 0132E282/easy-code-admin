import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FormField } from '@/components/form/FormField'
import { useForm } from 'react-hook-form'
import { usePage, router } from '@inertiajs/react'
import { Permission, role } from '@/model'
import { PageProps } from '@/types'
import CardPermissionItem from '@/components/roles/Card-Item'
import { useEffect } from 'react'
import FormLayout from '@/Layouts/Form-layout'
import { Form } from '@/components/ui/form'

const FormAction = function () {
  const form = useForm({})
  const { props } = usePage<
    PageProps<{
      permissions: Permission[]
      roles: any[]
      data_detail: role
    }>
  >()
  const handleClickItem = function (role: any) {
    router.get(route('admin.role.edit', { id: role.id }))
  }

  useEffect(() => {
    const permissions = props.data_detail?.permissions.map(permission => ({ id: permission.id, label: permission.display_name, value: permission.id }))
    if (props.data_detail) {
      form.reset({
        name: props.data_detail.name,
        permissions,
      })
    }
  }, [props.data_detail])
  return (
    <Form form={form}>
      <div className='flex justify-between gap-5'>
        <Card className='max-w-[400px] w-full'>
          <CardHeader>Quyền</CardHeader>
          <CardContent>
            {props?.roles.map(function (role) {
              return (
                <div key={role.id} className={`${props.data_detail?.id === role.id && 'bg-gray-200'} py-2 px-4 cursor-pointer rounded-lg transition-colors duration-300 ease-in-out hover:bg-slate-200`} onClick={() => handleClickItem(role)}>
                  {role.name}
                </div>
              )
            })}
          </CardContent>
        </Card>
        <div className='flex-1 flex flex-col gap-4'>
          <Card>
            <CardHeader>Cài đặt</CardHeader>
            <CardContent>
              <FormField label='Tên quyền' name='name' type='text' form={form} />
            </CardContent>
          </Card>
          {props?.permissions.map((permission, index) => <CardPermissionItem form={form} key={index} permission={permission} />)}
        </div>
      </div>
    </FormLayout>
  )
}
export default FormAction
