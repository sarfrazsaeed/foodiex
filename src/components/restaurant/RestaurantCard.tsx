import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Clock, Star, Truck, Tag } from 'lucide-react'
import { useFavoritesStore } from '../../store/useFavoritesStore'
import { useToastStore } from '../../store/useToastStore'
import type { Restaurant } from '../../types'

interface Props { restaurant: Restaurant; index?: number }

export default function RestaurantCard({ restaurant: r, index = 0 }: Props) {
  const { toggle, isFav } = useFavoritesStore()
  const { add } = useToastStore()
  const fav = isFav(r.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link to={`/restaurant/${r.id}`}>
        <div className="group card-food overflow-hidden cursor-pointer">
          {/* Image */}
          <div className="relative overflow-hidden h-48">
            <motion.img
              src={r.image}
              alt={r.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {r.discount && (
                <span className="flex items-center gap-1 bg-brand-red text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  <Tag className="w-3 h-3" /> {r.discount}
                </span>
              )}
              {r.promoted && (
                <span className="bg-brand-orange text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  Promoted
                </span>
              )}
              {!r.isOpen && (
                <span className="bg-gray-700 text-gray-300 text-xs font-bold px-2.5 py-1 rounded-full">
                  Closed
                </span>
              )}
            </div>

            {/* Fav */}
            <motion.button
              onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(r.id); add(fav ? 'Removed from favorites' : `${r.name} added to favorites!`, fav ? 'info' : 'success') }}
              className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${fav ? 'bg-brand-red text-white' : 'bg-black/50 text-white hover:bg-brand-red'}`}
              whileTap={{ scale: 0.8 }}
            >
              <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
            </motion.button>

            {/* Delivery time overlay */}
            <div className="absolute bottom-3 left-3">
              <span className="flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                <Clock className="w-3 h-3" /> {r.deliveryTime} min
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="font-bold text-white text-base group-hover:text-brand-red transition-colors line-clamp-1">
                {r.name}
              </h3>
              <div className="flex items-center gap-1 shrink-0">
                <Star className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
                <span className="text-sm font-bold text-white">{r.rating}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mb-3 line-clamp-1">
              {r.cuisine.join(' · ')}
            </p>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                <span>{r.deliveryFee === 0 ? 'Free delivery' : `Rs ${r.deliveryFee}`}</span>
              </div>
              <span>Min Rs {r.minOrder}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {r.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-xs text-gray-400 bg-surface border border-surface-border px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
