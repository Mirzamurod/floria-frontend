import { FC, useState } from 'react'
import { addDays, addHours, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface IProps {
  date?: Date
  setDate?: (date?: Date) => void
}

const DatePicker: FC<IProps> = props => {
  const { date, setDate } = props

  return (
    <Popover>
      <PopoverTrigger asChild className='mt-1'>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon />
          {date ? format(date, 'dd.MM.yyyy') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          initialFocus
          disabled={{
            before: addHours(new Date(), 3),
            after: addDays(addHours(new Date(), 3), 21),
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
