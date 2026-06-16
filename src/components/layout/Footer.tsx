
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-surface-border mt-20">
      <div className="container-food py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-red flex items-center justify-center text-lg">🍕</div>
              <span className="font-display font-black text-xl text-white">Foodie<span className="text-brand-red">X</span></span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">Pakistan's fastest food delivery app. Order from your favorite restaurants in minutes.</p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-surface-light border border-surface-border flex items-center justify-center text-gray-400 hover:text-brand-red hover:border-brand-red transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {[
            { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Press'] },
            { title: 'For Restaurants', links: ['Partner With Us', 'Restaurant Dashboard', 'Marketing', 'Support'] },
            { title: 'Support', links: ['Help Centre', 'Track Order', 'Refund Policy', 'Contact Us'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-semibold text-white mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}><a href="#" className="text-sm text-gray-500 hover:text-brand-red transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-surface-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">© 2026 FoodieX. Built with React + TypeScript. All rights reserved.</p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <a key={t} href="#" className="text-xs text-gray-600 hover:text-brand-red transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
