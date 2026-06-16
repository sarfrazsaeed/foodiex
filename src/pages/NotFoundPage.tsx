import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, UtensilsCrossed } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center text-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,25,44,0.08)_0%,transparent_60%)]" />
      <div className="relative z-10">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity }}
            className="text-8xl mb-6">🍕</motion.div>
          <h1 className="font-display font-black text-6xl text-white mb-3">404</h1>
          <p className="font-display font-bold text-2xl text-white mb-3">Page Not Found</p>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            Looks like this page went out for delivery and never came back! Let's get you back to the menu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-red px-8 py-3.5"><Home className="w-5 h-5" /> Go Home</Link>
            <Link to="/restaurants" className="btn-outline px-8 py-3.5"><UtensilsCrossed className="w-5 h-5" /> Browse Food</Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
