import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Clock, Truck, ArrowLeft, Plus, Minus, ShoppingBag, Leaf, Flame as FlameIcon, Zap } from 'lucide-react'
import { restaurants } from '../data/restaurants'
import { useCartStore } from '../store/useCartStore'
import { useFavoritesStore } from '../store/useFavoritesStore'
import { useToastStore } from '../store/useToastStore'
import type { MenuItem } from '../types'

export default function RestaurantDetailPage() {
  const { id } = useParams()
  const restaurant = restaurants.find(r => r.id === id)
  const [activeCategory, setActiveCategory] = useState(restaurant?.categories[0]?.id || '')
  const [addedItems, setAddedItems] = useState<Record<string, number>>({})
  const { addItem, openCart, itemCount } = useCartStore()
  const { toggle, isFav } = useFavoritesStore()
  const { add: toast } = useToastStore()

  if (!restaurant) return (
    <div className="pt-32 text-center">
      <p className="text-white text-xl mb-4">Restaurant not found</p>
      <Link to="/" className="btn-red">Go Home</Link>
    </div>
  )

  const fav = isFav(restaurant.id)

  const handleAdd = (item: MenuItem) => {
    addItem(item, restaurant)
    setAddedItems(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }))
    toast(`${item.name} added to cart! 🛒`, 'info')
    openCart()
  }

  const currentCategory = restaurant.categories.find(c => c.id === activeCategory)

  return (
    <main className="pb-20">
      {/* Cover */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img src={restaurant.coverImage} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
        <div className="absolute top-4 left-4">
          <Link to="/restaurants" className="flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-sm hover:bg-black/70 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
        <div className="absolute top-4 right-4">
          <button onClick={() => { toggle(restaurant.id); toast(fav ? 'Removed from favorites' : 'Added to favorites!', fav ? 'info' : 'success') }}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${fav ? 'bg-brand-red text-white' : 'bg-black/50 text-white hover:bg-brand-red'}`}>
            <Heart className={`w-5 h-5 ${fav ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="container-food">
        {/* Restaurant info */}
        <div className="relative -mt-16 mb-8">
          <div className="bg-surface-light border border-surface-border rounded-3xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-white mb-1">{restaurant.name}</h1>
                <p className="text-gray-400 text-sm">{restaurant.cuisine.join(' · ')}</p>
              </div>
              {!restaurant.isOpen && (
                <span className="bg-gray-700 text-gray-300 text-xs font-bold px-3 py-1.5 rounded-full shrink-0">Closed</span>
              )}
            </div>

            <p className="text-gray-400 text-sm mb-5 leading-relaxed">{restaurant.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Star, value: `${restaurant.rating}`, sub: `${restaurant.reviewCount.toLocaleString()} reviews`, color: 'text-brand-yellow' },
                { icon: Clock, value: `${restaurant.deliveryTime}`, sub: 'min delivery', color: 'text-brand-orange' },
                { icon: Truck, value: restaurant.deliveryFee === 0 ? 'FREE' : `Rs ${restaurant.deliveryFee}`, sub: 'delivery fee', color: 'text-food-green' },
                { icon: ShoppingBag, value: `Rs ${restaurant.minOrder}`, sub: 'min order', color: 'text-food-blue' },
              ].map(({ icon: Icon, value, sub, color }, i) => (
                <div key={i} className="bg-surface rounded-2xl p-3 text-center">
                  <Icon className={`w-4 h-4 ${color} mx-auto mb-1`} />
                  <p className={`font-bold text-sm ${color}`}>{value}</p>
                  <p className="text-gray-500 text-xs">{sub}</p>
                </div>
              ))}
            </div>

            {restaurant.discount && (
              <div className="mt-4 bg-brand-red/10 border border-brand-red/20 rounded-2xl px-4 py-2.5 flex items-center gap-2">
                <Zap className="w-4 h-4 text-brand-red shrink-0" />
                <p className="text-sm text-brand-red font-semibold">🎉 {restaurant.discount} on this order!</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category sidebar */}
          <div className="lg:w-48 shrink-0">
            <div className="lg:sticky lg:top-24">
              <h3 className="font-semibold text-white text-sm mb-3 uppercase tracking-wider">Menu</h3>
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {restaurant.categories.map(cat => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${
                      activeCategory === cat.id ? 'bg-brand-red text-white' : 'bg-surface-light text-gray-400 hover:text-white hover:bg-surface-border'
                    }`}>
                    <span>{cat.icon}</span> {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {currentCategory && (
                <motion.div key={currentCategory.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
                    <span>{currentCategory.icon}</span> {currentCategory.name}
                  </h2>
                  <div className="space-y-4">
                    {currentCategory.items.map(item => (
                      <motion.div key={item.id}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        className="flex gap-4 bg-surface-light border border-surface-border rounded-3xl p-4 hover:border-brand-red/30 transition-all group"
                      >
                        {/* Item image */}
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 overflow-hidden rounded-2xl">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          {item.isPopular && (
                            <div className="absolute top-2 left-2 bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">🔥 Popular</div>
                          )}
                          {item.isNew && (
                            <div className="absolute top-2 left-2 bg-food-green text-white text-[10px] font-bold px-2 py-0.5 rounded-full">✨ New</div>
                          )}
                        </div>

                        {/* Item details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-bold text-white text-sm sm:text-base line-clamp-1">{item.name}</h3>
                            <div className="flex items-center gap-1 shrink-0">
                              {item.isVeg && <Leaf className="w-4 h-4 text-food-green" />}
                              {item.spicy && item.spicy > 0 && (
                                <div className="flex">
                                  {[...Array(item.spicy)].map((_, i) => <FlameIcon key={i} className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" />)}
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-2">{item.description}</p>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-white">Rs {item.price}</span>
                              {item.originalPrice && (
                                <span className="text-gray-600 text-sm line-through">Rs {item.originalPrice}</span>
                              )}
                            </div>
                            {item.calories && <span className="text-gray-600 text-xs">{item.calories} cal</span>}
                            {item.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-brand-yellow fill-brand-yellow" />
                                <span className="text-xs text-gray-400">{item.rating}</span>
                              </div>
                            )}
                          </div>

                          {/* Add button */}
                          <div className="flex items-center justify-end">
                            {addedItems[item.id] ? (
                              <div className="flex items-center border border-surface-border rounded-xl overflow-hidden">
                                <button onClick={() => setAddedItems(prev => ({ ...prev, [item.id]: Math.max(0, (prev[item.id] || 0) - 1) }))}
                                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-red/20 transition-colors">
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-8 text-center text-sm font-bold text-white">{addedItems[item.id]}</span>
                                <button onClick={() => handleAdd(item)}
                                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-red/20 transition-colors">
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <motion.button onClick={() => handleAdd(item)} whileTap={{ scale: 0.9 }}
                                disabled={!restaurant.isOpen}
                                className="flex items-center gap-1.5 bg-brand-red hover:bg-red-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
                                <Plus className="w-4 h-4" /> Add
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Sticky cart bar */}
      {itemCount() > 0 && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }}
          className="fixed bottom-0 inset-x-0 bg-surface-light border-t border-surface-border p-4 z-40 safe-area-pb">
          <div className="container-food flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-400">{itemCount()} item{itemCount() > 1 ? 's' : ''} in cart</p>
              <p className="font-bold text-white">Rs {useCartStore.getState().subtotal()}</p>
            </div>
            <button onClick={openCart} className="btn-red px-8">
              View Cart <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </motion.div>
      )}
    </main>
  )
}
