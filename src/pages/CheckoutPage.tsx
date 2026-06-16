import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, MapPin, CreditCard, Check, Lock, Truck, Clock } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'
import { useToastStore } from '../store/useToastStore'

const steps = [
  { id: 1, title: 'Delivery Address', icon: MapPin },
  { id: 2, title: 'Payment',          icon: CreditCard },
  { id: 3, title: 'Confirm',          icon: Check },
]

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [ordered, setOrdered] = useState(false)
  const [address, setAddress] = useState({ name: '', phone: '', street: '', city: 'Islamabad', area: '', instructions: '' })
  const [payment, setPayment] = useState({ method: 'cod', number: '', expiry: '', cvv: '', name: '' })
  const { items, subtotal, deliveryFee, clearCart } = useCartStore()
  const { add: toast } = useToastStore()

  const sub = subtotal()
  const fee = deliveryFee()
  const total = sub + fee

  const placeOrder = () => {
    setOrdered(true)
    clearCart()
    toast('Order placed! 🎉 Track it in real-time', 'success')
  }

  if (items.length === 0 && !ordered) {
    return (
      <div className="pt-32 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <p className="font-display font-bold text-xl text-white mb-4">Your cart is empty</p>
        <Link to="/" className="btn-red px-8">Order Food</Link>
      </div>
    )
  }

  if (ordered) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }} className="text-center max-w-md">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ delay: 0.3, duration: 0.6 }}
            className="w-28 h-28 rounded-full bg-food-green/20 border-2 border-food-green flex items-center justify-center mx-auto mb-6">
            <Check className="w-14 h-14 text-food-green" />
          </motion.div>
          <h1 className="font-display font-black text-3xl text-white mb-3">Order Confirmed! 🎉</h1>
          <p className="text-gray-400 mb-2">Your food is being prepared</p>
          <p className="text-gray-500 text-sm mb-8">Estimated delivery: 30-45 minutes</p>
          <div className="card-food p-5 mb-8 text-left space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-400">Order Total</span><span className="text-white font-bold">Rs {total}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Payment</span><span className="text-white">{payment.method === 'cod' ? 'Cash on Delivery' : 'Card'}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Delivery to</span><span className="text-white">{address.area || address.city}</span></div>
          </div>
          <div className="flex gap-3">
            <Link to="/track" className="btn-red flex-1">Track Order</Link>
            <Link to="/" className="btn-outline flex-1">Order More</Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="pt-24 pb-20">
      <div className="container-food max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to menu
        </Link>

        <h1 className="font-display font-bold text-3xl text-white mb-8">Checkout</h1>

        {/* Step indicators */}
        <div className="flex items-center mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className={`flex items-center gap-2 ${step >= s.id ? 'text-brand-red' : 'text-gray-600'}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 transition-all ${
                  step > s.id ? 'bg-brand-red border-brand-red text-white' : step === s.id ? 'border-brand-red text-brand-red' : 'border-surface-border text-gray-600'
                }`}>
                  {step > s.id ? <Check className="w-5 h-5" /> : <s.icon className="w-4 h-4" />}
                </div>
                <span className="text-sm font-medium hidden sm:block">{s.title}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 transition-colors ${step > s.id ? 'bg-brand-red' : 'bg-surface-border'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="address" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="card-food p-6 space-y-4">
                  <h2 className="font-bold text-white text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-brand-red" /> Delivery Address
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Full Name</label>
                      <input className="input-food" placeholder="Sarfraz Saeed" value={address.name} onChange={e => setAddress(a => ({ ...a, name: e.target.value }))} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Phone Number</label>
                      <input className="input-food" placeholder="+92 300 1234567" value={address.phone} onChange={e => setAddress(a => ({ ...a, phone: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Street Address</label>
                    <input className="input-food" placeholder="House/Flat No, Street" value={address.street} onChange={e => setAddress(a => ({ ...a, street: e.target.value }))} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Area</label>
                      <input className="input-food" placeholder="F-7, Blue Area..." value={address.area} onChange={e => setAddress(a => ({ ...a, area: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-1.5">City</label>
                      <select className="input-food" value={address.city} onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}>
                        {['Islamabad', 'Rawalpindi', 'Lahore', 'Karachi', 'Peshawar'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Delivery Instructions (Optional)</label>
                    <textarea className="input-food resize-none h-20" placeholder="Gate code, floor number, landmark..." value={address.instructions} onChange={e => setAddress(a => ({ ...a, instructions: e.target.value }))} />
                  </div>
                  <button onClick={() => setStep(2)} className="btn-red w-full py-4 mt-2">
                    Continue to Payment <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="card-food p-6 space-y-4">
                  <h2 className="font-bold text-white text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-brand-red" /> Payment Method
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'cod', label: 'Cash on Delivery', emoji: '💵' },
                      { value: 'card', label: 'Credit/Debit Card', emoji: '💳' },
                    ].map(m => (
                      <button key={m.value} onClick={() => setPayment(p => ({ ...p, method: m.value }))}
                        className={`p-4 rounded-2xl border-2 text-center transition-all ${payment.method === m.value ? 'border-brand-red bg-brand-red/10' : 'border-surface-border bg-surface-light hover:border-brand-red/50'}`}>
                        <div className="text-2xl mb-1">{m.emoji}</div>
                        <p className="text-sm font-medium text-white">{m.label}</p>
                      </button>
                    ))}
                  </div>

                  {payment.method === 'card' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                      {/* Card preview */}
                      <div className="relative h-40 bg-gradient-to-br from-brand-red via-red-700 to-brand-orange rounded-2xl p-5 overflow-hidden">
                        <div className="absolute top-4 right-4 text-white/20 font-mono font-bold text-2xl">VISA</div>
                        <p className="text-white/60 text-xs mb-6">Credit Card</p>
                        <p className="font-mono text-white text-lg tracking-widest mb-4">
                          {payment.number ? payment.number.replace(/(.{4})/g, '$1 ').trim() : '•••• •••• •••• ••••'}
                        </p>
                        <div className="flex justify-between">
                          <div><p className="text-white/50 text-xs">Name</p><p className="text-white text-sm">{payment.name || 'YOUR NAME'}</p></div>
                          <div><p className="text-white/50 text-xs">Expiry</p><p className="text-white text-sm">{payment.expiry || 'MM/YY'}</p></div>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">Card Number</label>
                        <input className="input-food font-mono" placeholder="1234 5678 9012 3456" maxLength={16} value={payment.number} onChange={e => setPayment(p => ({ ...p, number: e.target.value.replace(/\D/g, '') }))} />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">Cardholder Name</label>
                        <input className="input-food" placeholder="Sarfraz Saeed" value={payment.name} onChange={e => setPayment(p => ({ ...p, name: e.target.value }))} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">Expiry</label>
                          <input className="input-food" placeholder="MM/YY" maxLength={5} value={payment.expiry} onChange={e => setPayment(p => ({ ...p, expiry: e.target.value }))} />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">CVV</label>
                          <input className="input-food" placeholder="•••" maxLength={3} type="password" value={payment.cvv} onChange={e => setPayment(p => ({ ...p, cvv: e.target.value }))} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex items-center gap-2 bg-food-green/10 border border-food-green/20 rounded-2xl px-4 py-2.5 text-xs text-food-green">
                    <Lock className="w-3.5 h-3.5 shrink-0" /> Your payment info is 100% secure and encrypted
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep(1)} className="btn-outline flex-1 py-3.5">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button onClick={() => setStep(3)} className="btn-red flex-1 py-3.5">
                      Review Order <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="card-food p-6">
                  <h2 className="font-bold text-white text-lg mb-5 flex items-center gap-2">
                    <Check className="w-5 h-5 text-brand-red" /> Review Your Order
                  </h2>
                  <div className="space-y-3 mb-6">
                    {items.map(ci => (
                      <div key={ci.item.id} className="flex gap-3 items-center">
                        <img src={ci.item.image} alt={ci.item.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">{ci.item.name}</p>
                          <p className="text-xs text-gray-500">×{ci.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-white">Rs {ci.totalPrice}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-surface rounded-2xl p-4 mb-6 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400"><span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-brand-red" />Deliver to</span><span className="text-white text-right max-w-[180px] truncate">{address.area ? `${address.area}, ${address.city}` : address.city}</span></div>
                    <div className="flex justify-between text-gray-400"><span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5 text-brand-red" />Payment</span><span className="text-white">{payment.method === 'cod' ? 'Cash on Delivery' : `Card ••${payment.number.slice(-2) || '00'}`}</span></div>
                    <div className="flex justify-between text-gray-400"><span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-brand-red" />Est. delivery</span><span className="text-white">{items[0]?.restaurant.deliveryTime} min</span></div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="btn-outline flex-1 py-3.5">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <motion.button onClick={placeOrder} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="btn-red flex-1 py-3.5 text-base">
                      🎉 Place Order · Rs {total}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="card-food p-5 h-fit">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-red" /> Order Summary
            </h3>
            {items.length > 0 && (
              <p className="text-xs text-gray-500 mb-3 bg-surface rounded-xl px-3 py-2">
                From {items[0].restaurant.name}
              </p>
            )}
            <div className="space-y-2.5 mb-4">
              {items.map(ci => (
                <div key={ci.item.id} className="flex justify-between text-sm">
                  <span className="text-gray-400 truncate max-w-[140px]">{ci.item.name} ×{ci.quantity}</span>
                  <span className="text-white font-medium shrink-0">Rs {ci.totalPrice}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-surface-border pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-400"><span>Subtotal</span><span className="text-white">Rs {sub}</span></div>
              <div className="flex justify-between text-gray-400"><span>Delivery fee</span><span className={fee === 0 ? 'text-food-green' : 'text-white'}>{fee === 0 ? 'FREE' : `Rs ${fee}`}</span></div>
              <div className="flex justify-between font-bold text-white border-t border-surface-border pt-2">
                <span>Total</span><span className="text-brand-red text-lg">Rs {total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
