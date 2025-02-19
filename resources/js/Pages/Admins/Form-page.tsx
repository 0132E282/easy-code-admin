import FormLayout from '@/Layouts/Form-layout'
import { PageAdminProps, Relationships_view, Section } from '@/types/page';
import { useEffect } from 'react'
import { useForm,FieldValues, UseFormReturn } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormField } from '@/components/form'

const style: Record<string, string> = {
  md: 'w-[calc(50%-1rem)]',
  sm: 'w-[calc(50%-1rem)]',
  lg: 'w-[calc(25%-1rem)]',
  xl: 'w-[calc(33.33%-1rem)]',
  full: 'w-full',
}

interface FormPageProps {
  data: any; 
  page:  PageAdminProps; 
  relationships_view?: Relationships_view;
}

type SectionItemProps<T extends FieldValues> = {
  item: Section
  form: UseFormReturn<T>
  relationships_view?: Relationships_view
}

const SectionItem = function <T extends FieldValues>({ item, form, relationships_view }: SectionItemProps<T>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.label}</CardTitle>
      </CardHeader>
      <CardContent className='flex gap-4 w-full flex-wrap'>
        {item?.fields?.map((field, index) => {
          const className = style[field.width] || style['full']
          const relationships = relationships_view?.[field.name] || null
          return (
            <FormField
              key={index}
              placeholder={field.placeholder || relationships?.placeholder || ''}
              options={relationships?.options}
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


const FormPage = function ({ data, page, relationships_view }: FormPageProps) {
  const form = useForm();
  
  useEffect(() => {
    form.reset(data)
  }, [data]);

  return (
    <FormLayout form={form} container='ms'>
      <div className='flex gap-4'>
          {page?.sidebar?.left && (
            <div className='max-w-[400px] w-full'>
              {page.sidebar.left.map((item, index) => (
                <SectionItem key={index} item={item} form={form} relationships_view={relationships_view} />
              ))}
            </div>
          )}
          <div className='flex flex-1 flex-col gap-4'>
            {page.sections.map((item, index) => (
              <SectionItem key={index} item={item} form={form} relationships_view={relationships_view} />
            ))}
          </div>
          {page?.sidebar?.right && (
            <div className='max-w-[400px] w-full'>
              {page.sidebar.right.map((item, index) => (
                <SectionItem key={index} item={item} form={form} relationships_view={relationships_view} />
              ))}
            </div>
          )}
      </div>
    </FormLayout>
  );
}

export default FormPage;