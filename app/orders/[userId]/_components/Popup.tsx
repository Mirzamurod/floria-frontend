import { FC, Fragment } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getSum } from '@/lib/utils'
import { IBouquet, IFlower } from '@/types/orders'

interface IProps {
  bouquets: IBouquet[]
  flowers: IFlower[]
  setOpen: (value: boolean) => void
  total: (items: IBouquet[] | IFlower[]) => { totalUnit: number; totalSum: number }
}

const Popup: FC<IProps> = props => {
  const { bouquets, flowers, setOpen, total } = props

  return (
    <>
      {!bouquets.length && !flowers.length ? <h3>No data</h3> : null}
      {bouquets.length ? (
        <>
          <p>Buketlar</p>
          {bouquets.map(item => (
            <Fragment key={item.bouquetId}>
              <div className='flex justify-between items-center mt-2'>
                <Image src={item.image} alt='Bouquet image' width={40} height={50} />
                <p>{item.qty}</p>
                <p>{getSum(item.price)}</p>
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
                <Image src={item.image} alt='Bouquet image' width={40} height={50} />
                <p>{item.qty}</p>
                <p>{getSum(item.price)}</p>
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
    </>
  )
}

export default Popup
