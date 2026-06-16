# 🍕 FoodieX — Pakistan's #1 Food Delivery App

> A commercial-grade food delivery frontend built with React 18 + TypeScript + Vite + GSAP + Framer Motion

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-FoodieX-E8192C?style=for-the-badge)](https://sarfrazsaeed.github.io/foodiex/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<div align="center">

**[🚀 View Live Demo](https://sarfrazsaeed.github.io/foodiex/)**

</div>

---

## 📸 Screenshots

| Homepage | Restaurant Menu | Order Tracking |
|----------|----------------|----------------|
| Hero + Filters | Full Menu + Cart | Live Step Tracker |

---

## 🌟 Features

### 🏠 Homepage
- Animated hero section with rotating offer cards (KFC, Domino's, Biryani)
- GSAP ScrollTrigger counter animation (50K+ customers, 500+ restaurants)
- Cuisine filter pills — Pizza, Burger, BBQ, Biryani, Pakistani, Desi, Healthy...
- Featured restaurants grid with skeleton loaders
- Promo banner with free delivery offer
- "How It Works" section with 3-step guide

### 🍽️ Restaurant Listing
- 12 real Pakistani restaurants — KFC, Domino's, Cheezious, Ranchers, Biryani Centre, Hardee's, Pizza Hut, Bundoo Khan, Savour Foods, Subway, Bar.B.Q Tonight, Cakes & Bakes
- Search with 300ms debounce
- Filter by cuisine type, top rated, fast delivery, offers
- Sort by rating, delivery time, delivery fee
- Restaurant cards with discount badges, promoted tags, ratings

### 📋 Restaurant Detail
- Full menu with categories (Bestsellers, Burgers, Sides, Drinks...)
- Item cards with spice level indicators 🌶️, veg badges 🌿, calorie info
- Popular and New item badges
- Add to cart with quantity selector
- Sticky cart bar at bottom when items are added

### 🛒 Cart & Checkout
- Slide-in cart drawer with Framer Motion spring animation
- Quantity management (+/-), item removal
- Free delivery hint (orders above Rs 1,000)
- 3-step checkout: Address → Payment → Confirm
- Animated credit card UI preview
- Cash on Delivery + Card payment options
- Order confirmation with success animation

### 📦 Order Tracking
- Real-time animated order steps (Confirmed → Preparing → Out for Delivery → Delivered)
- Auto-progresses every 3 seconds (demo mode)
- Rider info with name, rating, call button
- Star rating system after delivery

### ❤️ Favorites
- Save restaurants with heart button
- Persistent across sessions (Zustand + localStorage)
- Dedicated favorites page

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React 18 | 18.3.1 | Component-based UI |
| TypeScript | 5.6.2 | Type safety, strict mode |
| Vite | 6.4.3 | Build tool, HMR |
| Tailwind CSS | 3.4.15 | Utility-first styling |
| Framer Motion | 11.x | Page transitions, animations |
| GSAP | 3.12.5 | ScrollTrigger, counter animations |
| Zustand | 5.0.2 | Cart + favorites state |
| React Router v6 | 6.28.0 | 7-route SPA |
| Lucide React | 0.468 | Icon system |
| GitHub Actions | latest | CI/CD auto-deploy |

---

## 📁 Project Structure

```
foodiex/
├── src/
│   ├── components/
│   │   ├── cart/          # CartDrawer
│   │   ├── layout/        # Navbar, Footer
│   │   ├── restaurant/    # RestaurantCard
│   │   └── ui/            # Toast, Skeleton, StarRating
│   ├── data/
│   │   └── restaurants.ts # 12 Pakistani restaurants with full menus
│   ├── hooks/             # useDebounce, useScrolled
│   ├── pages/             # 7 pages
│   ├── store/             # Zustand stores (cart, favorites, toasts)
│   └── types/             # TypeScript interfaces
├── .github/workflows/     # GitHub Actions CI/CD
└── public/                # Static assets
```

---

## 🍴 Restaurants Included

| Restaurant | Cuisine | Specialty |
|-----------|---------|-----------|
| 🍗 KFC Pakistan | Fast Food | Zinger Burger, Fried Chicken |
| 🍕 Domino's Pizza | Pizza | Chicken Fajita, BBQ Chicken |
| 🍔 Cheezious | Burger | Smash Burger, Deals |
| 🔥 Ranchers | BBQ | Beef Ribs, Rancher Burger |
| 🍛 Biryani Centre | Biryani | Chicken & Mutton Biryani |
| 🍔 Hardee's | Burger | Star Burger |
| 🍕 Pizza Hut | Pizza | Super Supreme, Stuffed Crust |
| 🍢 Bundoo Khan | BBQ | Seekh Kabab (Since 1961) |
| 🥘 Savour Foods | Desi | Chicken Pulao, Karahi |
| 🥖 Subway | Healthy | Footlong Sandwiches |
| 🔥 Bar.B.Q Tonight | Premium BBQ | Gola Kabab, Prawns |
| 🎂 Cakes & Bakes | Desserts | Red Velvet, Gulab Jamun |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/sarfrazsaeed/foodiex.git
cd foodiex

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173/foodiex/](http://localhost:5173/foodiex/)

---

## 🗺 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Homepage | Hero, filters, featured restaurants |
| `/restaurants` | All Restaurants | Search, filter, sort |
| `/restaurant/:id` | Restaurant Detail | Menu, add to cart |
| `/favorites` | Favourites | Saved restaurants |
| `/checkout` | Checkout | 3-step order placement |
| `/track` | Order Tracking | Live animated tracking |
| `*` | 404 | Fun not-found page |

---

## 👨‍💻 Developer

**Sarfraz Saeed** · CS @ Air University Islamabad · Pakistan

[![GitHub](https://img.shields.io/badge/GitHub-sarfrazsaeed-181717?style=flat-square&logo=github)](https://github.com/sarfrazsaeed)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat-square&logo=linkedin)](https://linkedin.com/in/sarfraz-saeed-76a7103bb)
[![Fiverr](https://img.shields.io/badge/Fiverr-Hire_Me-1DBF73?style=flat-square&logo=fiverr)](https://www.fiverr.com/s/o8RPzzG)

---

<div align="center">

**⭐ Star this repo if you like it!**

Built with ❤️ in Pakistan 🇵🇰

</div>
