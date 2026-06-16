import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import RestaurantCard from '../components/restaurant/RestaurantCard'

import { restaurants, cuisineFilters } from '../data/restaurants'
import { useDebounce } from '../hooks/useDebounce'
import type { FilterType } from '../types'

export default function RestaurantsPage() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('All')
  const [sortBy, setSortBy] = useState<'rating' | 'delivery' | 'fee'>('rating')
  const dSearch = useDebounce(search, 300)

  const filtered = restaurants
    .filter(r => {
      const s = !dSearch || r.name.toLowerCase().includes(dSearch.toLowerCase()) || r.cuisine.some(c => c.toLowerCase().includes(dSearch.toLowerCase()))
      const f = activeFilter === 'All' ? true : activeFilter === 'Top Rated' ? r.rating >= 4.6 : activeFilter === 'Fast Delivery' ? parseInt(r.deliveryTime) <= 30 : activeFilter === 'Offers' ? !!r.discount : r.cuisine.includes(activeFilter as never)
      return s && f
    })
    .sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : sortBy === 'delivery' ? parseInt(a.deliveryTime) - parseInt(b.deliveryTime) : a.deliveryFee - b.deliveryFee)

  return (
    <main className="pt-24 pb-20">
      <div className="container-food">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-white mb-2">All Restaurants</h1>
          <p className="text-gray-400">{filtered.length} restaurants available near you</p>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search restaurants or cuisines..." className="input-food pl-11" />
          </div>
          <div className="flex gap-2">
            <select value={sortBy} onChange={e => setSortBy(e.target.value as never)}
              className="input-food appearance-none cursor-pointer min-w-[160px]">
              <option value="rating">Top Rated</option>
              <option value="delivery">Fastest Delivery</option>
              <option value="fee">Lowest Fee</option>
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {cuisineFilters.map(f => (
            <motion.button key={f.label} whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(f.label as FilterType)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-medium whitespace-nowrap shrink-0 transition-all ${
                activeFilter === f.label ? 'bg-brand-red text-white' : 'bg-surface-light border border-surface-border text-gray-400 hover:border-brand-red hover:text-brand-red'
              }`}>
              {f.emoji} {f.label}
              {activeFilter === f.label && f.label !== 'All' && (
                <X className="w-3 h-3 ml-1" onClick={e => { e.stopPropagation(); setActiveFilter('All') }} />
              )}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="font-display font-bold text-xl text-white mb-2">No restaurants found</h3>
            <button onClick={() => { setSearch(''); setActiveFilter('All') }} className="btn-red mt-4">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r, i) => <RestaurantCard key={r.id} restaurant={r} index={i} />)}
          </div>
        )}
      </div>
    </main>
  )
}
