import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSum = (sum: number) => {
  return `${Number(isNaN(sum) ? 0 : sum)
    .toLocaleString()
    .replaceAll(',', ' ')} so'm`
}
