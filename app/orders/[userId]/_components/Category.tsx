import { FC } from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useAppSelector } from '@/store'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface IProps {
  active: string
  setActive: (active: string) => void
}

const Category: FC<IProps> = props => {
  const { active, setActive } = props
  const { isLoading, categories } = useAppSelector(state => state.category)

  const changeActive = (text: string) => setActive(text)

  return (
    <ScrollArea className='mb-2 whitespace-nowrap'>
      <div className='flex w-max space-x-2'>
        {isLoading ? (
          [...new Array(3)].map((_, index) => <Skeleton key={index} />)
        ) : (
          <>
            <Button
              size='sm'
              onClick={() => changeActive('')}
              variant={active === '' ? 'default' : 'outline'}
            >
              Hammasi
            </Button>
            {categories.map(category => (
              <Button
                size='sm'
                key={category._id}
                onClick={() => changeActive(category._id)}
                variant={active === category._id ? 'default' : 'outline'}
              >
                {category.name}
              </Button>
            ))}
          </>
        )}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}

export default Category
