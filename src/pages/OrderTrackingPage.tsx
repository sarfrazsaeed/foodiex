import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, MapPin, Phone, ChefHat, Bike, Home, Star } from 'lucide-react'

const ORDER_STEPS = [
  { id: 1, title: 'Order Confirmed',   description: 'Restaurant has received your order',           emoji: '✅', icon: CheckCircle, time: '12:30 PM' },
  { id: 2, title: 'Preparing Food',    description: 'Chef is preparing your delicious meal',         emoji: '👨‍🍳', icon: ChefHat,     time: '12:35 PM' },
  { id: 3, title: 'Out for Delivery',  description: 'Rider has picked up your order',                emoji: '🚴', icon: Bike,        time: '12:52 PM' },
  { id: 4, title: 'Delivered',         description: 'Enjoy your meal! Don\'t forget to rate us ⭐',  emoji: '🎉', icon: Home,        time: 'Estimated 1:10 PM' },
]

export default function OrderTrackingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [rating, setRating] = useState(0)
  const [rated, setRated] = useState(false)

  useEffect(() => {
    if (currentStep < 4) {
      const t = setTimeout(() => setCurrentStep(s => s + 1), 3000)
      return () => clearTimeout(t)
    }
  }, [currentStep])

  const rider = { name: 'Ahmed Khan', rating: 4.9, phone: '+92 300 1234567', eta: '12 min' }

  return (
    <main className="pt-24 pb-20">
      <div className="container-food max-w-2xl">
        <h1 className="font-display font-bold text-3xl text-white mb-2">Track Your Order</h1>
        <p className="text-gray-400 mb-8">Order #FX-{Math.floor(Math.random() * 90000 + 10000)}</p>

        {/* ETA Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-brand-red to-brand-orange rounded-3xl p-6 mb-8 flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm mb-1">Estimated Arrival</p>
            <p className="font-display font-black text-4xl text-white">{rider.eta}</p>
            <p className="text-white/70 text-sm">minutes away</p>
          </div>
          <div className="text-6xl animate-bounce-in">🚴</div>
        </motion.div>

        {/* Order steps */}
        <div className="card-food p-6 mb-6">
          <h2 className="font-bold text-white mb-6">Order Status</h2>
          <div className="space-y-0">
            {ORDER_STEPS.map((step, i) => {
              const isCompleted = currentStep > step.id
              const isActive = currentStep === step.id
                            return (
                <div key={step.id} className="flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg shrink-0 transition-all duration-500 ${
                        isCompleted ? 'bg-food-green text-white' :
                        isActive ? 'bg-brand-red text-white shadow-red' :
                        'bg-surface-light text-gray-600 border border-surface-border'
                      }`}>
                      {isCompleted ? <CheckCircle className="w-5 h-5" /> : step.emoji}
                    </motion.div>
                    {i < ORDER_STEPS.length - 1 && (
                      <motion.div
                        animate={{ height: isCompleted ? '100%' : '0%' }}
                        className={`w-0.5 my-1 transition-all duration-700 ${isCompleted ? 'bg-food-green' : 'bg-surface-border'}`}
                        style={{ height: 32 }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`pb-6 ${i === ORDER_STEPS.length - 1 ? 'pb-0' : ''}`}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className={`font-semibold text-sm transition-colors ${isActive ? 'text-brand-red' : isCompleted ? 'text-food-green' : 'text-gray-500'}`}>
                        {step.title}
                      </p>
                      {isActive && (
                        <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-brand-red" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{step.description}</p>
                    {(isCompleted || isActive) && <p className="text-xs text-gray-600 mt-1">{step.time}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Rider info */}
        {currentStep >= 3 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="card-food p-5 mb-6">
            <h3 className="font-bold text-white mb-4">Your Rider</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-red/20 flex items-center justify-center text-2xl">🧑</div>
                <div>
                  <p className="font-semibold text-white">{rider.name}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-brand-yellow fill-brand-yellow" />
                    <span className="text-xs text-gray-400">{rider.rating} rating</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${rider.phone}`}
                  className="w-10 h-10 rounded-2xl bg-food-green/10 border border-food-green/20 flex items-center justify-center text-food-green hover:bg-food-green/20 transition-colors">
                  <Phone className="w-4 h-4" />
                </a>
                <button className="w-10 h-10 rounded-2xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red hover:bg-brand-red/20 transition-colors">
                  <MapPin className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Rating (after delivery) */}
        {currentStep === 4 && !rated && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="card-food p-6 text-center">
            <p className="text-2xl mb-2">🎉</p>
            <h3 className="font-bold text-white text-lg mb-1">Food Delivered!</h3>
            <p className="text-gray-400 text-sm mb-5">How was your experience?</p>
            <div className="flex justify-center gap-2 mb-5">
              {[1, 2, 3, 4, 5].map(s => (
                <motion.button key={s} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(s)}
                  className={`text-3xl transition-all ${s <= rating ? 'opacity-100' : 'opacity-30'}`}>
                  ⭐
                </motion.button>
              ))}
            </div>
            {rating > 0 && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                onClick={() => setRated(true)} className="btn-red px-8">
                Submit Rating
              </motion.button>
            )}
          </motion.div>
        )}

        {rated && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-6">
            <p className="text-2xl mb-2">🙏</p>
            <p className="text-food-green font-semibold">Thank you for your rating!</p>
          </motion.div>
        )}

        <div className="text-center mt-8">
          <Link to="/" className="btn-outline px-8">Order More Food</Link>
        </div>
      </div>
    </main>
  )
}
