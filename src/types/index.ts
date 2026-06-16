export interface Restaurant {
  id: string
  name: string
  cuisine: CuisineType[]
  rating: number
  reviewCount: number
  deliveryTime: string
  deliveryFee: number
  minOrder: number
  image: string
  coverImage: string
  tags: string[]
  isOpen: boolean
  isFeatured?: boolean
  discount?: string
  description: string
  address: string
  categories: MenuCategory[]
  promoted?: boolean
}

export type CuisineType = 'Pizza' | 'Burger' | 'Chinese' | 'Pakistani' | 'BBQ' | 'Biryani' | 'Desserts' | 'Healthy' | 'Wraps' | 'Shawarma' | 'Fast Food' | 'Desi'

export interface MenuCategory {
  id: string
  name: string
  icon: string
  items: MenuItem[]
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  isPopular?: boolean
  isNew?: boolean
  isVeg?: boolean
  calories?: number
  rating?: number
  spicy?: number
}

export interface CartItem {
  item: MenuItem
  restaurant: Restaurant
  quantity: number
  specialInstructions: string
  totalPrice: number
}

export interface OrderStep {
  id: number
  title: string
  description: string
  emoji: string
  completed: boolean
  active: boolean
  time?: string
}

export type FilterType = CuisineType | 'All' | 'Top Rated' | 'Fast Delivery' | 'Offers'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}
