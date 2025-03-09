'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormField } from '@/components/form'
import { Relationships_view, Section } from '@/types/page'
import { FieldValues, UseFormReturn } from 'react-hook-form'

const style: Record<string, string> = {
  md: 'w-[calc(50%-1rem)]',
  sm: 'w-[calc(50%-1rem)]',
  lg: 'w-[calc(25%-1rem)]',
  xl: 'w-[calc(33.33%-1rem)]',
  full: 'w-full',
}

type SectionItemProps<T extends FieldValues> = {
  item: Section
  form: UseFormReturn<T>
  relationships_view?: Relationships_view
  className?: string
}

const SectionItem = function <T extends FieldValues>({ item, form, relationships_view, className }: SectionItemProps<T>) {
  return (
    <Card className={className}>
      {item.label && (
        <CardHeader>
          <CardTitle>{item.label}</CardTitle>
        </CardHeader>
      )}
      <CardContent className='flex gap-4 w-full flex-wrap'>
        {item?.fields?.map((field, index) => {
          const className = style[field.width] || style['full']
          const relationships = relationships_view?.[field.name] || null
          return (
            <FormField
              key={index}
              placeholder={field.placeholder || relationships?.placeholder || ''}
              options={field.options || relationships?.options}
              className={`${className} ${field.className || ''}`}
              type={field.ui}
              form={form}
              label={field.label}
              name={field.name || ''}
            />
          )
        })}
      </CardContent>
    </Card>
  )
}

export default SectionItem
