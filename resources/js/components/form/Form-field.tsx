import React, { ForwardedRef, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage, FormField as FormFieldUiShadcn } from '../ui/form'
import { Input } from '../ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Image } from '../ui/image'
import { MultiSelect } from '../ui/multiple-selector'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '../ui/textarea'

type Option = {
  value: string
  label: string
  id: string
}

type FiledInputProps = {
  value?: string | number | undefined
  className?: string
  type: string
  onChange?: (value: any) => void
  options?: Option[]
  placeholder?: string
}

const FiledInput = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, FiledInputProps>(({ placeholder, options, className, type, ...field }, ref) => {
  switch (type) {
    case 'image':
      return (
        <div className={className}>
          <Image />
        </div>
      )
    case 'textarea':
      return <Textarea {...field} ref={ref as React.Ref<HTMLTextAreaElement>} />
    case 'checkbox':
      return <Checkbox className={`cursor-pointer !mt-0 ms-2 ${className}`} value={field.value} onCheckedChange={field?.onChange} {...field} />
    case 'checkbox-list':
      return options?.map(option => (
        <FormItem className='flex items-center justify-start flex-1'>
          <FormControl>
            <Checkbox
              className='!mt-0 me-2'
              checked={Array.isArray(field.value) && field.value.some(item => item.value === option?.value)}
              onCheckedChange={checked => {
                const currentValue = Array.isArray(field.value) ? field.value : []
                const filter = checked ? [...currentValue, option] : currentValue.filter((item: Option) => item.value !== option?.value)
                return field.onChange?.(filter)
              }}
            />
          </FormControl>
          <FormLabel className='text-sm !mt-0 !mb-1 font-normal cursor-pointer'>{option?.label}</FormLabel>
        </FormItem>
      ))
    case 'radio-list':
      return (
        <FormItem className='flex items-center justify-start flex-1'>
          <FormControl>
            <RadioGroup defaultValue='comfortable flex'>
              {options?.map((option, index) => (
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value={option.value} id='r1' />
                  <Label htmlFor='r1'>{option.label || option.value}</Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormLabel className='text-sm !mt-0 !mb-1 font-normal cursor-pointer'>{field?.label}</FormLabel>
        </FormItem>
      )
    case 'multiple-select':
      const data = field.value?.map((item: Option) => {
        return typeof item === 'object' ? (item.id ?? item.title ?? item.name) : item
      })
      return (
        <MultiSelect options={options ?? []} onValueChange={(value: string[]) => field.onChange?.(value)} defaultValue={Array.isArray(field.value) ? data : []} placeholder='Select frameworks' variant='inverted' animation={2} maxCount={3} {...field} />
      )
    case 'select':
      return (
        <Select>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={field.placeholder || field.name || 'select'} />
          </SelectTrigger>
          <SelectContent>{options?.map(option => <SelectItem value={option.value}>{option.label || option.value} </SelectItem>)}</SelectContent>
        </Select>
      )
    default:
      return <Input value={field.value ?? ''} type={type} {...field} ref={ref as React.Ref<HTMLInputElement>} />
  }
})

FiledInput.displayName = 'FiledInput'

type TypeFormField = {
  description?: string
  label?: string
  name: string
  type?: string
  form: UseFormReturn<any>
  className?: string
  onChange?: any
  value?: number | string
  checked?: boolean
  options?: Array<Option>
  placeholder?: string
}

export const FormField = ({ placeholder, className, options, description, label, value, name, form, type, onChange, ...props }: TypeFormField) => {
  const classNameCustom: Record<string, string> = {
    checkbox: 'items-center flex justify-start',
  }
  return (
    <div className={className}>
      <FormFieldUiShadcn
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={` ${classNameCustom[type ?? 'text'] || ''}`}>
            <FormLabel className='cursor-pointer'>{label}</FormLabel>
            {options && Array.isArray(options) ? (
              <div className='flex'>
                <FiledInput type={type ?? 'text'} {...field} options={options} placeholder={placeholder} />
              </div>
            ) : (
              <>
                <FormControl onChange={onChange} {...props}>
                  <FiledInput type={type ?? 'text'} {...field} />
                </FormControl>
              </>
            )}
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
