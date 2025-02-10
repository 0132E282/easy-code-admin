import { Form } from '@/components/form/Form'
import { FormField } from '@/components/form/Form-field'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { SettingSystem } from '@/model/settings'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const System = function () {
  const form = useForm<SettingSystem>({})
  const submit = function (value: SettingSystem) {}

  return (
    <AuthenticatedLayout>
      <Form<SettingSystem> form={form} onSubmit={submit} className='gap-6 flex flex-col'>
        <Card>
          <CardHeader className='border-b'>
            <CardTitle>Website</CardTitle>
          </CardHeader>
          <CardContent className='py-4'>
            <FormField label='Tên website' name='title' type='text' form={form} />
            <FormField label='Logo' name='password' type='password' form={form} />
            <FormField label='Icon' name='password' type='password' form={form} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='border-b'>
            <CardTitle>Admin</CardTitle>
          </CardHeader>
          <CardContent className='py-4'>
            <FormField label='Email admin' name='title' type='text' form={form} />
          </CardContent>
        </Card>
        <div>
          <Button>Lưu cài đặt</Button>
        </div>
      </Form>
    </AuthenticatedLayout>
  )
}

export default System
