import { FormPage } from '@/components/page'
import FormLayout from '@/Layouts/Form-layout'
import { useForm } from 'react-hook-form';

const FormAction = function ({ page, relationships_view }) {
  const form = useForm()
  return (
    <FormLayout form={form} container='ms'>
      <FormPage form={form} page={page} relationships_view={relationships_view} />
    </FormLayout>
  )
}

export default FormAction
