import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle, AlertCircle, ShoppingBag, AlertTriangle } from 'lucide-react'
import { useToastStore } from '../../store/useToastStore'

const icons = {
  success: <CheckCircle className="w-4 h-4 text-food-green" />,
  error:   <AlertCircle className="w-4 h-4 text-brand-red" />,
  info:    <ShoppingBag className="w-4 h-4 text-brand-orange" />,
  warning: <AlertTriangle className="w-4 h-4 text-brand-yellow" />,
}

export default function ToastContainer() {
  const { toasts, remove } = useToastStore()
  return (
    <div className="fixed bottom-6 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex items-center gap-3 bg-surface-light border border-surface-border rounded-2xl px-4 py-3 shadow-float"
          >
            {icons[t.type]}
            <p className="text-sm text-white flex-1">{t.message}</p>
            <button onClick={() => remove(t.id)} className="text-gray-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
