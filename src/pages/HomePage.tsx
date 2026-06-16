import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, ArrowRight, Clock, Truck, Shield, ChevronRight, Flame, Zap } from 'lucide-react'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import { RestaurantCardSkeleton } from '../components/ui/Skeleton'
import { restaurants, cuisineFilters } from '../data/restaurants'
import { useDebounce } from '../hooks/useDebounce'
import type { FilterType } from '../types'

gsap.registerPlugin(ScrollTrigger)

const heroOffers = [
  { emoji: '🍕', title: 'Pizza Night', subtitle: 'Up to 30% off', color: 'from-red-600 to-orange-500', restaurant: '2' },
  { emoji: '🍔', title: 'Burger Fest', subtitle: 'Free delivery', color: 'from-yellow-600 to-orange-600', restaurant: '3' },
  { emoji: '🍛', title: 'Desi Special', subtitle: 'Rs 50 off', color: 'from-green-600 to-teal-600', restaurant: '5' },
]

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('All')
  const [loading, setLoading] = useState(true)
  const [heroIdx, setHeroIdx] = useState(0)
  const statsRef = useRef<HTMLDivElement>(null)
  const dSearch = useDebounce(search, 300)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const iv = setInterval(() => setHeroIdx(i => (i + 1) % heroOffers.length), 3500)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-val',
        { textContent: 0 },
        { textContent: (i: number) => [50000, 500, 30, 4.8][i], duration: 2, ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true } }
      )
    })
    return () => ctx.revert()
  }, [])

  const filtered = restaurants.filter(r => {
    const matchSearch = !dSearch || r.name.toLowerCase().includes(dSearch.toLowerCase()) || r.cuisine.some(c => c.toLowerCase().includes(dSearch.toLowerCase()))
    const matchFilter =
      activeFilter === 'All' ? true :
      activeFilter === 'Top Rated' ? r.rating >= 4.6 :
      activeFilter === 'Fast Delivery' ? parseInt(r.deliveryTime) <= 30 :
      activeFilter === 'Offers' ? !!r.discount :
      r.cuisine.includes(activeFilter as never)
    return matchSearch && matchFilter
  })

  const featured = restaurants.filter(r => r.isFeatured)

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(232,25,44,0.12)_0%,transparent_60%)]" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full border border-brand-red/10 animate-spin-slow" />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-brand-red/5 animate-float" />

        <div className="container-food relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-mono uppercase tracking-widest rounded-full px-4 py-1.5 mb-6">
                <Zap className="w-3 h-3" /> Now delivering in 30 mins
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
                className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-tight text-white mb-6">
                Order Food <br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #E8192C, #FF6B35)' }}>
                  You Love
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
                From KFC to Bundoo Khan, Domino's to Biryani Centre — your favourite Pakistani restaurants, delivered in minutes.
              </motion.p>

              {/* Search */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="flex gap-3 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search KFC, pizza, biryani..."
                    className="input-food pl-12 py-4 text-base rounded-2xl" />
                </div>
                <Link to="/restaurants" className="btn-red px-6 py-4 rounded-2xl text-base shrink-0">
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4">
                {[
                  { icon: Clock, text: '30 min delivery' },
                  { icon: Truck, text: 'Free delivery on Rs 1000+' },
                  { icon: Shield, text: '100% safe & hygienic' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-gray-400">
                    <Icon className="w-4 h-4 text-brand-red" />
                    <span>{text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Rotating offer cards */}
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="relative w-[420px] h-[360px]">
                {heroOffers.map((offer, i) => (
                  <motion.div key={i}
                    animate={{ opacity: i === heroIdx ? 1 : 0, scale: i === heroIdx ? 1 : 0.9, y: i === heroIdx ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${offer.color} p-8 flex flex-col justify-between shadow-float`}
                  >
                    <div className="text-7xl animate-float">{offer.emoji}</div>
                    <div>
                      <p className="text-white/70 text-sm mb-1">Today's Special</p>
                      <h3 className="font-display font-black text-3xl text-white mb-1">{offer.title}</h3>
                      <p className="text-white/80 text-lg mb-4">{offer.subtitle}</p>
                      <Link to={`/restaurant/${offer.restaurant}`}
                        className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold px-4 py-2 rounded-xl hover:bg-white/30 transition-colors">
                        Order Now <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}

                {/* Dots */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {heroOffers.map((_, i) => (
                    <button key={i} onClick={() => setHeroIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === heroIdx ? 'bg-brand-red w-6' : 'bg-gray-600'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-gray-600 uppercase tracking-widest">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-brand-red to-transparent" />
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <div ref={statsRef} className="border-y border-surface-border bg-surface-light py-10">
        <div className="container-food grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { suffix: '+', label: 'Happy Customers', color: 'text-brand-red' },
            { suffix: '+', label: 'Restaurants',     color: 'text-brand-orange' },
            { suffix: ' min', label: 'Avg Delivery', color: 'text-food-green' },
            { suffix: '',  label: 'Avg Rating',      color: 'text-brand-yellow' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className={`font-display font-black text-4xl ${s.color}`}>
                <span className="stat-val">0</span>{s.suffix}
              </p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CUISINE FILTERS ── */}
      <section className="py-12">
        <div className="container-food">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-2xl text-white">What are you craving?</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {cuisineFilters.map(f => (
              <motion.button key={f.label} whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(f.label as FilterType)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                  activeFilter === f.label
                    ? 'bg-brand-red text-white shadow-red'
                    : 'bg-surface-light border border-surface-border text-gray-400 hover:border-brand-red hover:text-brand-red'
                }`}>
                <span>{f.emoji}</span> {f.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section className="py-4">
        <div className="container-food">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="section-label mb-1">🔥 Trending Now</p>
              <h2 className="font-display font-bold text-2xl text-white">Featured Restaurants</h2>
            </div>
            <Link to="/restaurants" className="flex items-center gap-1 text-brand-red text-sm font-medium hover:underline">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? [...Array(3)].map((_, i) => <RestaurantCardSkeleton key={i} />)
              : featured.slice(0, 3).map((r, i) => <RestaurantCard key={r.id} restaurant={r} index={i} />)
            }
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="py-12">
        <div className="container-food">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-red via-red-700 to-brand-orange p-8 sm:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-white/70 text-sm font-mono uppercase tracking-widest mb-2">Limited Time</p>
                <h2 className="font-display font-black text-4xl text-white mb-2">Free Delivery <span className="text-brand-yellow">All Day!</span></h2>
                <p className="text-white/80">On orders above Rs 1,000 from any restaurant</p>
              </div>
              <Link to="/restaurants" className="shrink-0 bg-white text-brand-red font-bold px-8 py-4 rounded-2xl hover:bg-brand-yellow transition-colors flex items-center gap-2">
                Order Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL RESTAURANTS ── */}
      <section className="py-8 pb-20">
        <div className="container-food">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="section-label mb-1"><Flame className="w-3 h-3 inline mr-1" />All Restaurants</p>
              <h2 className="font-display font-bold text-2xl text-white">{filtered.length} restaurants near you</h2>
            </div>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <RestaurantCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-display font-bold text-xl text-white mb-2">No restaurants found</h3>
              <p className="text-gray-500 mb-4">Try a different search or filter</p>
              <button onClick={() => { setSearch(''); setActiveFilter('All') }} className="btn-red">Clear Search</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((r, i) => <RestaurantCard key={r.id} restaurant={r} index={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 bg-surface-light border-y border-surface-border">
        <div className="container-food">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Simple & Fast</p>
            <h2 className="font-display font-bold text-3xl text-white">How FoodieX Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { emoji: '📍', step: '01', title: 'Choose Location', desc: 'Enter your delivery address to see restaurants near you' },
              { emoji: '🍔', step: '02', title: 'Select & Order',   desc: 'Browse menus, add items to cart and place your order' },
              { emoji: '🚴', step: '03', title: 'Fast Delivery',    desc: 'Our riders deliver your food hot and fresh in minutes' },
            ].map((s, i) => (
              <motion.div key={s.step}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="text-center">
                <div className="relative inline-flex mb-4">
                  <div className="w-20 h-20 rounded-3xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-4xl">
                    {s.emoji}
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-brand-red text-white text-xs font-black rounded-full flex items-center justify-center">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
