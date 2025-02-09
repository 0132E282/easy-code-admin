import { Card } from '@/components/ui/card'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Button } from '@/components/ui/button'
import { PropsWithChildren } from 'react'
import { Form } from '@/components/form/Form'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { Link, router } from '@inertiajs/react'
import { toast } from '@/hooks/use-toast'
import { useTranslation } from 'react-i18next'

export type FormLayoutProps<T extends FieldValues> = PropsWithChildren & {
  form: UseFormReturn<T>
  container: string
}

function createRouteName(name: string) {
  const currentRoute = route().current() ?? ''
  const routeSegments = currentRoute.split('.')
  routeSegments[routeSegments.length - 1] = name
  return routeSegments.join('.')
}

const FormLayout = <T extends FieldValues>({ children, form, container }: FormLayoutProps<T>) => {
  const { t } = useTranslation('page')
  const handleSubmit = async (data: T) => {
    try {
      const hasParams = Object.keys(route().params).length > 0
      const method = hasParams ? 'put' : 'post'
      router[method](route(route().current() ?? '', route().params), data, {
        onSuccess: page => {
          toast({
            title: 'Success',
            description: 'Your request was successful.',
          })
        },
        onError: errors => {
          toast({
            variant: 'destructive',
            title: 'error code',
            description: 'There was a problem with your request.',
          })
        },
      })
    } catch (error) {
      toast({
        title: 'error',
        description: 'error: ' + error,
      })
    }
  }
  const handleSubmitDelete = function () {
    const deleteRouteName = createRouteName('delete')
    router.delete(route(deleteRouteName, route().params), {
      onSuccess: () => {
        router.get(route(createRouteName('create')))
        toast({
          title: 'Deleted',
          description: 'The record has been successfully deleted.',
        })
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'There was a problem deleting the record.',
        })
      },
    })
  }
  return (
    <AuthenticatedLayout>
      <div className='w-full container mx-auto'>
        <Form form={form} onSubmit={handleSubmit}>
          <Card className='p-4 mb-4'>
            <Button type='submit'>{t('button.save')}</Button>
            {route().current()?.includes('edit') && (
              <>
                <Button className='ml-2' type='button'>
                  <Link href={route(createRouteName('create'))} className='ml-2'>
                    {t('button.create')}
                  </Link>
                </Button>
                <Button className='ml-2' type='button' onClick={handleSubmitDelete}>
                  {t('button.delete')}
                </Button>
              </>
            )}
            <Button className='ml-2'>{t('button.save_page')}</Button>
            <Button className='ml-2' type='button'>
              <Link href={route(route().current() ?? '', route().params)} className='ml-2'>
                {t('button.reset')}
              </Link>
            </Button>
          </Card>
          {children}
        </Form>
      </div>
    </AuthenticatedLayout>
  )
}

export default FormLayout
