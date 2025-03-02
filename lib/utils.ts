import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSum = (sum: number | string) => {
  return `${Number(sum).toLocaleString().replaceAll(',', ' ')} so'm`
}

export const customLoader = ({ src }: { src: string }) => src
