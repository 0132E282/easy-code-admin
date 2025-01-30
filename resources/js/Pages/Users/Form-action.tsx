import { FormPage } from '@/components/page'
import FormLayout from '@/Layouts/Form-layout'
import { useForm } from 'react-hook-form'

const FormAction = function ({ page }) {
  const form = useForm()
  return (
    <FormLayout form={form}>
      <FormPage form={form} page={page} />
    </FormLayout>
  )
}

export default FormAction
