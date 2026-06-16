import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ArrowRight } from 'lucide-react'
import { useFavoritesStore } from '../store/useFavoritesStore'
import { restaurants } from '../data/restaurants'
import RestaurantCard from '../components/restaurant/RestaurantCard'

export default function FavoritesPage() {
  const { ids } = useFavoritesStore()
  const favRestaurants = restaurants.filter(r => ids.includes(r.id))

  return (
    <main className="pt-24 pb-20">
      <div className="container-food">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-white mb-2">My Favourites ❤️</h1>
          <p className="text-gray-400">{favRestaurants.length} saved restaurant{favRestaurants.length !== 1 ? 's' : ''}</p>
        </div>

        {favRestaurants.length === 0 ? (
          <div className="text-center py-24">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 rounded-3xl bg-surface-light border border-surface-border flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-gray-600" />
            </motion.div>
            <h2 className="font-display font-bold text-2xl text-white mb-3">No favourites yet</h2>
            <p className="text-gray-500 mb-8">Tap the heart on any restaurant to save it here</p>
            <Link to="/" className="btn-red px-8 py-4">
              Explore Restaurants <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favRestaurants.map((r, i) => <RestaurantCard key={r.id} restaurant={r} index={i} />)}
          </div>
        )}
      </div>
    </main>
  )
}
