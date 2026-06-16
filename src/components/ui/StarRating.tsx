import { Star } from 'lucide-react'
interface Props { rating: number; count?: number; size?: 'sm'|'md' }
export default function StarRating({ rating, count, size='sm' }: Props) {
  const sz = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
  return (
    <div className="flex items-center gap-1">
      <Star className={`${sz} text-brand-yellow fill-brand-yellow`} />
      <span className="text-sm font-semibold text-white">{rating}</span>
      {count && <span className="text-xs text-gray-500">({count.toLocaleString()})</span>}
    </div>
  )
}
