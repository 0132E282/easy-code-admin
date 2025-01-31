import { Form as FormSadcn } from '../ui/form'
import { ReactNode } from 'react'
import { UseFormReturn, FieldValues } from 'react-hook-form'

export type TypeFormSubmit<T extends FieldValues> = {
  onSubmit: (data: T) => void
  children: ReactNode
  form: UseFormReturn<T>
  className?: string
  id?: string
}

export const Form = <T extends FieldValues>({ onSubmit, children, form, className, id }: TypeFormSubmit<T>) => {
  return (
    <FormSadcn {...form}>
      <form id={id} className={className} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormSadcn>
  )
}
