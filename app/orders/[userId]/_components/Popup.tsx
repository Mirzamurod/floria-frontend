import { FC, Fragment } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { customLoader, getSum } from '@/lib/utils'
import { IBouquet, IFlower } from '@/types/orders'
import { CircleX, Minus, Plus } from 'lucide-react'

interface IProps {
  bouquets: IBouquet[]
  flowers: IFlower[]
  setOpen: (value: boolean) => void
  total: (items: IBouquet[] | IFlower[]) => { totalUnit: number; totalSum: number }
  deleteItem: (type: 'bouquet' | 'flower', item: IBouquet | IFlower) => void
  changeItem: (type: 'bouquet' | 'flower', operator: '-' | '+', item: IBouquet | IFlower) => void
}

const Popup: FC<IProps> = props => {
  const { bouquets, flowers, setOpen, total, deleteItem, changeItem } = props

  return (
    <div className='max-h-[50vh] overflow-y-auto'>
      {!bouquets.length && !flowers.length ? <h3>No data</h3> : null}
      {bouquets.length ? (
        <>
          <p>Buketlar</p>
          {bouquets.map(item => (
            <Fragment key={item.bouquetId}>
              <div className='flex justify-between items-center mt-2'>
                <Image
                  // loader={customLoader}
                  src={item.image}
                  alt='Bouquet image'
                  width={40}
                  height={50}
                />
                <div className='flex gap-3 items-center py-1 px-2'>
                  <Button
                    size='icon'
                    variant='secondary'
                    onClick={() => changeItem('bouquet', '-', item)}
                  >
                    <Minus />
                  </Button>
                  <p>{item.qty}</p>
                  <Button
                    size='icon'
                    variant='secondary'
                    onClick={() => changeItem('bouquet', '+', item)}
                  >
                    <Plus />
                  </Button>
                </div>
                <div className='flex gap-1 items-center'>
                  <p>{getSum(item.price)}</p>
                  <Button size='icon' variant='ghost' onClick={() => deleteItem('bouquet', item)}>
                    <CircleX />
                  </Button>
                </div>
              </div>
            </Fragment>
          ))}
          <div className='flex justify-between items-center mt-2'>
            <p>Umumiy:</p>
            <p>{total(bouquets).totalUnit}</p>
            <p>{getSum(total(bouquets).totalSum)}</p>
          </div>
          <Separator className='my-2' />
        </>
      ) : null}
      {flowers.length ? (
        <>
          <p>Maxsus guldasta</p>
          {flowers.map(item => (
            <Fragment key={item.flowerId}>
              <div className='flex justify-between items-center mt-2'>
                <Image
                  // loader={customLoader}
                  src={item.image}
                  alt='Bouquet image'
                  width={40}
                  height={50}
                />
                <div className='flex gap-3 items-center py-1 px-2'>
                  <Button
                    size='icon'
                    variant='secondary'
                    onClick={() => changeItem('flower', '-', item)}
                  >
                    <Minus />
                  </Button>
                  <p>{item.qty}</p>
                  <Button
                    size='icon'
                    variant='secondary'
                    onClick={() => changeItem('flower', '+', item)}
                  >
                    <Plus />
                  </Button>
                </div>
                <div className='flex gap-2'>
                  <p>{getSum(item.price)}</p>
                  <Button size='icon' variant='ghost' onClick={() => deleteItem('flower', item)}>
                    <CircleX />
                  </Button>
                </div>
              </div>
            </Fragment>
          ))}
          <div className='flex justify-between items-center mt-2'>
            <p>Umumiy:</p>
            <p>{total(flowers).totalUnit}</p>
            <p>{getSum(total(flowers).totalSum)}</p>
          </div>
        </>
      ) : null}
      {bouquets.length && flowers.length ? (
        <>
          <Separator className='my-2' />
          <div className='flex justify-between items-center mt-2'>
            <p>Umumiy:</p>
            <p>{total(bouquets).totalUnit + total(flowers).totalUnit}</p>
            <p>{getSum(total(bouquets).totalSum + total(flowers).totalSum)}</p>
          </div>
        </>
      ) : null}
      <Button
        className='w-full mt-2'
        disabled={!bouquets.length && !flowers.length}
        onClick={() => setOpen(true)}
      >
        Zakaz berish
      </Button>
    </div>
  )
}

export default Popup
