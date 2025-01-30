import { LoginForm, TypeFormSchema } from '@/components/login-form'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, router, Link } from '@inertiajs/react'
type TypePropsLogin = { status?: string; canResetPassword: boolean }

export default function Login({ status, canResetPassword }: TypePropsLogin) {
  const submitLogin = (data: TypeFormSchema) => {
    router.post('/login', data, {
      onSuccess: response => {
        console.log('Login successful', response)
        const user = response
      },
      onError: error => {
        console.log('Login failed', error)
        if (error.errors) {
          console.log(error.errors)
        }
      },
    })
  }

  return (
    <GuestLayout>
      <Head title='Log in' />
      <LoginForm submit={submitLogin} />
    </GuestLayout>
  )
}
