/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight, 
  Star, 
  Plus, 
  Instagram, 
  Facebook, 
  Twitter,
  Menu as MenuIcon,
  X,
  Cake,
  Utensils,
  Cookie,
  Coffee
} from 'lucide-react';
import { menuData, MenuItem } from './data/menu';

const categories = [
  { id: 'all', label: 'All Menu', icon: Coffee },
  { id: 'restaurant', label: 'Restaurant', icon: Utensils },
  { id: 'bakery', label: 'Bakery', icon: Cookie },
  { id: 'cakes', label: 'Cakes', icon: Cake },
  { id: 'sweets', label: 'Traditional Sweets', icon: Star },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredMenu = activeCategory === 'all' 
    ? menuData 
    : menuData.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center text-[#4a5d23]">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-widest">AJWA</h1>
            <span className="text-xs uppercase tracking-[0.2em] font-medium hidden sm:inline-block border-l border-[#4a5d23]/20 pl-2">Boulangerie & Restaurant</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#menu" className="text-xs font-semibold uppercase tracking-widest hover:text-[#c18f58] transition-colors">Menu</a>
            <a href="#about" className="text-xs font-semibold uppercase tracking-widest hover:text-[#c18f58] transition-colors">Our Story</a>
            <a href="#location" className="text-xs font-semibold uppercase tracking-widest hover:text-[#c18f58] transition-colors">Locations</a>
            <button className="bg-[#4a5d23] text-white px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#2a2825] transition-all shadow-lg shadow-[#4a5d23]/20">
              Order Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#f9f7f2] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-center text-xl font-serif text-[#4a5d23]">
              <a href="#menu" onClick={() => setIsMenuOpen(false)}>Menu</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>Our Story</a>
              <a href="#location" onClick={() => setIsMenuOpen(false)}>Locations</a>
              <button className="bg-[#4a5d23] text-white py-4 rounded-full text-lg font-medium shadow-lg shadow-[#4a5d23]/20">
                Order Delivery
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80" 
              className="w-full h-full object-cover"
              alt="Restaurant Interior"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#c18f58] font-serif italic text-lg md:text-2xl mb-4"
            >
              Since 1982 — The Art of Baking Heritage
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-9xl font-serif font-light mb-8 leading-tight tracking-tight"
            >
              The Essence of <br/><span className="italic font-serif">True Tradition</span>
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a href="#menu" className="bg-[#4a5d23] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#c18f58] transition-all shadow-2xl shadow-black/20">
                Explore Menu
              </a>
              <a href="#location" className="bg-transparent border-2 border-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                Dine With Us
              </a>
            </motion.div>
          </div>
        </section>

        {/* Categories / Filter Section */}
        <section id="menu" className="py-24 px-4 md:px-8 bg-[#f9f7f2]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[#c18f58] font-serif italic text-xl mb-2 block tracking-wide">Pâtisserie & Cuisine</span>
              <h3 className="text-[#4a5d23] font-serif text-5xl md:text-7xl mb-6">Our Handcrafted Menu</h3>
              <div className="w-40 h-[1px] bg-[#4a5d23]/20 mx-auto rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: -160 }}
                  whileInView={{ x: 160 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-full bg-[#4a5d23]"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center space-x-3 px-8 py-3.5 rounded-full transition-all text-xs font-bold uppercase tracking-[0.15em] border ${
                    activeCategory === cat.id 
                    ? 'bg-[#4a5d23] border-[#4a5d23] text-white shadow-xl shadow-[#4a5d23]/20' 
                    : 'bg-white border-[#4a5d23]/10 text-[#4a5d23] hover:border-[#4a5d23]/30'
                  }`}
                >
                  <cat.icon size={16} />
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Menu Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredMenu.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-24 bg-[#4a5d23] text-[#f9f7f2]">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-6 border border-white/5 rounded-[40px] transition-all group-hover:scale-105" />
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" 
                className="rounded-[32px] w-full h-[600px] object-cover relative z-10 shadow-2xl"
                alt="BBQ Platter"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-10 right-10 z-20 bg-[#c18f58] text-white px-6 py-4 rounded-2xl font-serif italic text-xl shadow-xl">
                Stone-Fired <br/> Gourmet
              </div>
            </div>
            <div className="space-y-8">
              <span className="text-[#c18f58] font-serif italic text-3xl">Signature Selection</span>
              <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] font-light">The Heritage <br/> BBQ Platter</h2>
              <p className="text-[#f9f7f2]/70 text-xl leading-relaxed max-w-lg">
                Experience the authentic taste of Daska with our masterfully grilled kebabs. Each piece is slow-fermented and marinated in heirloom spices for twenty-four hours.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4">
                {['Tender Malai Boti', 'Flame Grilled Kababs', 'Traditional Raita', 'Artisan Naan'].map((feat, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-1.5 h-1.5 bg-[#c18f58] rounded-full" />
                    <span className="font-semibold text-sm uppercase tracking-widest text-[#f9f7f2]/90">{feat}</span>
                  </div>
                ))}
              </div>
              <button className="bg-white text-[#4a5d23] px-12 py-5 rounded-full font-bold uppercase tracking-widest shadow-2xl hover:bg-[#c18f58] hover:text-white transition-all transform hover:-translate-y-1">
                View Today's Specials
              </button>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="py-24 px-4 md:px-8 bg-[#f9f7f2]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="space-y-10">
                <div>
                  <span className="text-[#c18f58] font-serif italic text-2xl mb-4 block">Visit Us</span>
                  <h3 className="text-[#4a5d23] font-serif text-5xl md:text-6xl mb-4 leading-tight">In the Heart <br/> of Daska</h3>
                  <p className="text-[#2a2825]/60 text-lg max-w-md">Our heirloom brick ovens and warm hospitality await you at our flagship location.</p>
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-[#4a5d23]/5 p-4 rounded-2xl text-[#4a5d23] shadow-sm border border-[#4a5d23]/10">
                      <MapPin size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg uppercase tracking-widest text-[#4a5d23] mb-1">Estate</h4>
                      <p className="text-[#2a2825]/70 leading-relaxed">Gujranwala Road, Daska, Sialkot, <br/> Punjab, Pakistan</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="bg-[#4a5d23]/5 p-4 rounded-2xl text-[#4a5d23] shadow-sm border border-[#4a5d23]/10">
                      <Phone size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg uppercase tracking-widest text-[#4a5d23] mb-1">Concierge</h4>
                      <p className="text-[#2a2825]/70">+92 52 6612345</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="bg-[#4a5d23]/5 p-4 rounded-2xl text-[#4a5d23] shadow-sm border border-[#4a5d23]/10">
                      <Clock size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg uppercase tracking-widest text-[#4a5d23] mb-1">Hours</h4>
                      <p className="text-[#2a2825]/70">Dine-in from 08:00 AM — Midnight</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="bg-[#4a5d23] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest shadow-xl shadow-[#4a5d23]/20 hover:bg-[#2a2825] transition-all">
                    Plan Your Visit
                  </button>
                </div>
              </div>

              <div className="h-[600px] bg-white rounded-[40px] overflow-hidden shadow-2xl relative border-8 border-white">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.2!2d74.35!3d32.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391edb161c7c3735%3A0x1c03c1ac3e519dc9!2sAjwa%20Bakers%20%26%20Restaurant%20Daska!5e0!3m2!1sen!2s!4v1715456170000!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 z-10 opacity-90"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#2a2825] text-[#f9f7f2] py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-8">
            <h2 className="text-4xl font-serif font-bold tracking-widest text-white">AJWA</h2>
            <p className="text-[#f9f7f2]/50 leading-relaxed text-lg italic font-serif">
              "Baking memories through generations with artisanal excellence and cultural heritage."
            </p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="bg-white/5 p-4 rounded-full hover:bg-[#c18f58] transition-all duration-300 transform hover:scale-110">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.3em] mb-8 text-[#c18f58]">Boulangerie</h4>
            <ul className="space-y-5 text-[#f9f7f2]/60 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Patisserie Selection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Artisan Sourdough</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Traditional Mithai</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gourmet Platters</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.3em] mb-8 text-[#c18f58]">Heritage</h4>
            <ul className="space-y-5 text-[#f9f7f2]/60 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Our Heirloom Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Quality Standards</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Career Sanctuary</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Private Dining</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.3em] mb-8 text-[#c18f58]">Journal</h4>
            <p className="text-[#f9f7f2]/50 mb-8 text-sm">Join our newsletter for artisanal recipes and exclusive invitations.</p>
            <div className="flex bg-white/5 p-1.5 rounded-full border border-white/10 focus-within:border-[#c18f58] transition-all">
              <input 
                type="email" 
                placeholder="Join the circle" 
                className="bg-transparent px-5 py-3 flex-grow outline-none text-sm placeholder:text-gray-600"
              />
              <button className="bg-[#4a5d23] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#c18f58] transition-colors shadow-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[#f9f7f2]/30 text-xs uppercase tracking-widest font-medium">Handcrafted in Daska — © 2024 Ajwa Heritage Group</p>
          <div className="flex space-x-10 text-[#f9f7f2]/30 text-[10px] font-bold uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">Privacy Dossier</a>
            <a href="#" className="hover:text-white transition-colors">Global Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MenuItemCard({ item }: { item: MenuItem; key?: string }) {
  const [selectedSize, setSelectedSize] = useState(item.options ? item.options[0].size : null);
  const [currentPrice, setCurrentPrice] = useState(item.price || (item.options ? item.options[0].price : 0));

  const handleSizeChange = (size: string, price: number) => {
    setSelectedSize(size);
    setCurrentPrice(price);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-[32px] overflow-hidden shadow-2xl shadow-[#4a5d23]/5 border border-[#4a5d23]/5 hover:shadow-3xl hover:shadow-[#4a5d23]/10 transition-all group flex flex-col"
    >
      <div className="relative aspect-4-3 overflow-hidden p-4">
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="absolute bottom-6 right-6 z-10 bg-[#c18f58] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
          {item.category}
        </div>
      </div>

      <div className="px-7 pb-8 pt-2 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-serif text-2xl font-bold text-[#2a2825]">{item.name}</h4>
          {item.popular && (
            <div className="flex items-center text-[#c18f58] bg-[#c18f58]/10 px-2 py-1 rounded-md">
              <Star size={12} className="fill-current" />
              <span className="text-[10px] font-bold ml-1 uppercase tracking-tighter">Gold Standard</span>
            </div>
          )}
        </div>
        <p className="text-[#2a2825]/50 text-sm mb-8 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {item.options && (
          <div className="mb-8 space-y-4">
            <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#4a5d23]/40">Size Selection</p>
            <div className="flex flex-wrap gap-2.5">
              {item.options.map((opt) => (
                <button
                  key={opt.size}
                  onClick={() => handleSizeChange(opt.size, opt.price)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                    selectedSize === opt.size 
                    ? 'bg-[#4a5d23] border-[#4a5d23] text-white shadow-lg shadow-[#4a5d23]/20' 
                    : 'bg-[#f9f7f2] border-[#4a5d23]/10 text-[#4a5d23] hover:border-[#4a5d23]/40'
                  }`}
                >
                  {opt.size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-[#4a5d23]/5">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#4a5d23]/40 mb-1">Estate Price</span>
            <span className="text-2xl font-mono font-bold text-[#4a5d23]">
              Rs. {currentPrice.toLocaleString()}
            </span>
          </div>
          <button className="bg-[#4a5d23] text-white p-4 rounded-2xl hover:bg-[#c18f58] transition-all shadow-lg hover:scale-110 shadow-[#4a5d23]/20">
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

