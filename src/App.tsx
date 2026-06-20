import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CartDrawer from './components/cart/CartDrawer'
import ToastContainer from './components/ui/Toast'
import HomePage from './pages/HomePage'
import RestaurantsPage from './pages/RestaurantsPage'
import RestaurantDetailPage from './pages/RestaurantDetailPage'
import FavoritesPage from './pages/FavoritesPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderTrackingPage from './pages/OrderTrackingPage'
import NotFoundPage from './pages/NotFoundPage'

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"                    element={<HomePage />} />
        <Route path="/restaurants"         element={<RestaurantsPage />} />
        <Route path="/restaurant/:id"      element={<RestaurantDetailPage />} />
        <Route path="/favorites"           element={<FavoritesPage />} />
        <Route path="/checkout"            element={<CheckoutPage />} />
        <Route path="/track"               element={<OrderTrackingPage />} />
        <Route path="*"                    element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-surface flex flex-col">
        <Navbar />
        <div className="flex-1">
          <AppRoutes />
        </div>
        <Footer />
        <CartDrawer />
        <ToastContainer />
      </div>
    </BrowserRouter>
  )
}
