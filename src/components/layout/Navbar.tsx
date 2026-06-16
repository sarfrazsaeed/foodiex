import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, Search, Menu, X, MapPin, ChevronDown } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { useFavoritesStore } from '../../store/useFavoritesStore'
import { useScrolled } from '../../hooks/useScrolled'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const scrolled = useScrolled(20)
  const location = useLocation()
  const itemCount = useCartStore(s => s.itemCount())
  const openCart = useCartStore(s => s.openCart)
  const favCount = useFavoritesStore(s => s.ids.length)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-surface/95 backdrop-blur-xl border-b border-surface-border shadow-float' : 'bg-transparent'
      }`}
    >
      <nav className="container-food flex items-center gap-4 h-16 sm:h-20">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.4 }}
            className="w-9 h-9 rounded-xl bg-brand-red flex items-center justify-center text-lg">
            🍕
          </motion.div>
          <span className="font-display font-black text-xl text-white">
            Foodie<span className="text-brand-red">X</span>
          </span>
        </Link>

        {/* Location picker */}
        <button className="hidden md:flex items-center gap-1.5 bg-surface-light border border-surface-border rounded-xl px-3 py-2 text-sm text-gray-300 hover:border-brand-red transition-colors">
          <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
          <span className="max-w-[120px] truncate">Islamabad, Pakistan</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button>

        {/* Search bar */}
        <div className="flex-1 max-w-sm hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search restaurants, dishes..."
              className="input-food pl-10 py-2.5 text-sm" />
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-1 ml-auto">
          {[{ label: 'Home', to: '/' }, { label: 'Restaurants', to: '/restaurants' }, { label: 'Track Order', to: '/track' }].map(l => (
            <Link key={l.to} to={l.to}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${location.pathname === l.to ? 'text-brand-red bg-brand-red/10' : 'text-gray-400 hover:text-white hover:bg-surface-light'}`}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto lg:ml-0">
          <button onClick={() => setSearchOpen(s => !s)} className="w-10 h-10 rounded-xl bg-surface-light flex items-center justify-center text-gray-400 hover:text-white transition-colors md:hidden">
            <Search className="w-4 h-4" />
          </button>
          <Link to="/favorites" className="hidden sm:flex w-10 h-10 rounded-xl bg-surface-light items-center justify-center text-gray-400 hover:text-brand-red transition-colors relative">
            <Heart className="w-4 h-4" />
            {favCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">{favCount}</span>}
          </Link>
          <motion.button onClick={openCart} whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors relative">
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:block">Cart</span>
            {itemCount > 0 && (
              <motion.span key={itemCount} initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-brand-yellow text-dark text-[10px] font-black rounded-full flex items-center justify-center">
                {itemCount}
              </motion.span>
            )}
          </motion.button>
          <button onClick={() => setMobileOpen(s => !s)} className="w-10 h-10 rounded-xl bg-surface-light flex items-center justify-center text-gray-400 hover:text-white transition-colors lg:hidden">
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-surface-border bg-surface/95 backdrop-blur-xl md:hidden">
            <div className="container-food py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input value={search} onChange={e => setSearch(e.target.value)} autoFocus
                  placeholder="Search restaurants, dishes..." className="input-food pl-10" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-surface-border bg-surface/95 backdrop-blur-xl lg:hidden">
            <div className="container-food py-4 space-y-1">
              {[{ label: '🏠 Home', to: '/' }, { label: '🍽️ Restaurants', to: '/restaurants' }, { label: '❤️ Favorites', to: '/favorites' }, { label: '📦 Track Order', to: '/track' }].map(l => (
                <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${location.pathname === l.to ? 'text-brand-red bg-brand-red/10' : 'text-gray-400 hover:text-white hover:bg-surface-light'}`}>
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
