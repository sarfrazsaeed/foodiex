import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/useCartStore'

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart, subtotal, deliveryFee, itemCount } = useCartStore()
  const sub = subtotal()
  const fee = deliveryFee()
  const total = sub + fee

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]" />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-surface border-l border-surface-border z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-surface-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-red flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white">Your Cart</h2>
                  {itemCount() > 0 && <p className="text-xs text-gray-400">{itemCount()} items</p>}
                </div>
              </div>
              <button onClick={closeCart} className="w-9 h-9 rounded-xl bg-surface-light flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="font-display font-bold text-xl text-white mb-2">Your cart is empty</p>
                  <p className="text-gray-500 text-sm mb-6">Add some delicious food to get started!</p>
                  <button onClick={closeCart} className="btn-red">Browse Restaurants</button>
                </div>
              ) : (
                <>
                  {/* Restaurant name */}
                  <div className="flex items-center gap-2 bg-surface-light rounded-2xl px-4 py-2.5">
                    <span className="text-base">🏪</span>
                    <span className="text-sm font-semibold text-white">{items[0]?.restaurant.name}</span>
                  </div>

                  {items.map((ci, i) => (
                    <motion.div key={ci.item.id}
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-3 bg-surface-light rounded-2xl p-3 border border-surface-border"
                    >
                      <img src={ci.item.image} alt={ci.item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white line-clamp-1">{ci.item.name}</p>
                        <p className="text-xs text-brand-red font-bold mt-0.5">Rs {ci.item.price}</p>
                        {ci.specialInstructions && (
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">Note: {ci.specialInstructions}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-surface-border rounded-xl overflow-hidden">
                            <button onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-red/20 transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-sm font-bold text-white">{ci.quantity}</span>
                            <button onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-red/20 transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">Rs {ci.totalPrice}</span>
                            <button onClick={() => removeItem(ci.item.id)} className="text-gray-600 hover:text-brand-red transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {sub > 0 && sub < 1000 && (
                    <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-2xl px-4 py-2.5 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-brand-orange shrink-0" />
                      <p className="text-xs text-brand-orange">Add Rs {1000 - sub} more for free delivery! 🎉</p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-surface-border px-6 py-5 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400"><span>Subtotal</span><span className="text-white">Rs {sub}</span></div>
                  <div className="flex justify-between text-gray-400"><span>Delivery</span><span className={fee === 0 ? 'text-food-green font-medium' : 'text-white'}>{fee === 0 ? 'FREE' : `Rs ${fee}`}</span></div>
                  <div className="flex justify-between font-bold text-white border-t border-surface-border pt-2"><span>Total</span><span className="text-brand-red text-lg">Rs {total}</span></div>
                </div>
                <Link to="/checkout" onClick={closeCart} className="btn-red w-full py-4 text-base rounded-2xl">
                  Place Order · Rs {total} <ArrowRight className="w-5 h-5" />
                </Link>
                <button onClick={clearCart} className="w-full text-center text-xs text-gray-600 hover:text-brand-red transition-colors">
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
