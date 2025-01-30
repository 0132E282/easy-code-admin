import { FormField } from '../form/FormField'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const style = {
  md: 'w-[calc(50%-1rem)]',
  sm: 'w-[calc(50%-1rem)]',
  lg: 'w-[calc(25%-1rem)]',
  xl: 'w-[calc(33.33%-1rem)]',
  full: 'w-full',
}

export const FormPage = function ({ form, page }) {
  return (
    <div className='flex flex-col gap-4'>
      {page.map(function (item, index) {
        return (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.label}</CardTitle>
            </CardHeader>
            <CardContent className='flex gap-4 w-full flex-wrap'>
              {Array.from(item.fields).map(function (field, index) {
                const className = style[field.width] || style['full']
                return <FormField className={className + ' ' + (field.className || '')} type={field.ui} form={form} key={index} label={field.label} name={field?.name ?? ''} />
              })}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
