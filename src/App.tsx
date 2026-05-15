import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link } from 'react-router-dom';
import BookTable from './pages/BookTable';
import Checkout from './pages/Checkout';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import RestaurantReviews from './components/RestaurantReviews';
import ItemReviewsModal from './components/ItemReviewsModal';
import Logo from './components/Logo';
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
  Coffee,
  Minus,
  Trash2,
  Flame,
  Search
} from 'lucide-react';
import { menuData, MenuItem } from './data/menu';
import { CartProvider, useCart } from './context/CartContext';

const categories = [
  { id: 'all', label: 'All Menu', icon: Coffee },
  { id: 'popular', label: 'Popular Items', icon: Flame },
  { id: 'restaurant', label: 'Restaurant', icon: Utensils },
  { id: 'bakery', label: 'Bakery', icon: Cookie },
  { id: 'cakes', label: 'Cakes', icon: Cake },
  { id: 'sweets', label: 'Traditional Sweets', icon: Star },
];

export function Home() {
  const { cart, addToCart, updateQuantity, isCartOpen, setIsCartOpen, cartTotal, cartCount } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchResults = searchQuery
    ? menuData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setIsLoadingMenu(true);
    setTimeout(() => {
      setIsLoadingMenu(false);
    }, 600);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingMenu(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredMenu = activeCategory === 'all' 
    ? menuData 
    : activeCategory === 'popular'
      ? menuData.filter(item => item.popular)
      : menuData.filter(item => item.category === activeCategory);



  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f9f7f2]">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-colors duration-300 ${scrolled ? 'bg-[#2a2825] shadow-lg py-4' : 'bg-transparent py-6'}`}>
        <div className={`max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center transition-colors duration-300 ${scrolled ? 'text-[#f9f7f2]' : 'text-white'}`}>
          <div className="flex items-center space-x-2">
            <Link to="/">
              <Logo className="w-16 h-16 md:w-20 md:h-20" />
            </Link>
          </div>

          <div className="flex items-center space-x-2 md:space-x-8">
            {/* Search Component */}
            <div className="relative flex items-center">
              <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'w-48 sm:w-64 bg-white/10 rounded-full border border-white/20' : 'w-10'}`}>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`p-2 transition-colors ${scrolled ? 'text-[#f9f7f2] hover:text-[#009a44]' : 'text-white hover:text-[#009a44]'}`}
                >
                  <Search size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`bg-transparent outline-none text-sm transition-all duration-300 ${isSearchOpen ? 'w-full opacity-100 pr-4' : 'w-0 opacity-0'} ${scrolled ? 'text-[#f9f7f2] placeholder-[#f9f7f2]/50' : 'text-white placeholder-white/50'}`}
                />
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {isSearchOpen && searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-14 right-0 w-[calc(100vw-2rem)] sm:w-80 bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden flex flex-col max-h-[60vh] z-[80]"
                  >
                    <div className="overflow-y-auto p-2 hide-scrollbar">
                      {searchResults.length === 0 ? (
                        <div className="p-4 text-center text-sm text-[#2a2825]/50">No items found.</div>
                      ) : (
                        searchResults.map(item => (
                          <div 
                            key={item.id} 
                            className="flex items-center gap-3 p-3 hover:bg-black/5 rounded-xl transition-colors cursor-pointer"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                              handleCategoryChange('all');
                              const el = document.getElementById('storefront');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div className="flex-1">
                              <h4 className="text-sm font-bold text-[#2a2825]">{item.name}</h4>
                              <p className="text-xs text-[#2a2825]/60 line-clamp-1">{item.description}</p>
                            </div>
                            <span className="text-sm font-bold text-[#e31837]">
                              Rs.{item.price}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
            <a href="#dine-in" className="text-xs font-semibold uppercase tracking-widest hover:text-[#009a44] transition-colors">Dine-In</a>
            <a href="#storefront" className="text-xs font-semibold uppercase tracking-widest hover:text-[#009a44] transition-colors">Order Online</a>
            <a href="#location" className="text-xs font-semibold uppercase tracking-widest hover:text-[#009a44] transition-colors">Location</a>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:text-[#009a44] transition-colors"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#009a44] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Link to="/book-table" className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg text-white ${scrolled ? 'bg-[#009a44] hover:bg-white hover:text-[#2a2825] shadow-[#009a44]/20' : 'bg-[#e31837] hover:bg-[#009a44] shadow-black/20'}`}>
              Book a Table
            </Link>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 hover:text-[#009a44] transition-colors"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#009a44] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="p-3 hover:text-[#009a44] transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#f9f7f2] z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-[#e31837]/10 flex justify-between items-center bg-white">
                <h2 className="font-serif text-2xl font-bold text-[#e31837]">Your Order</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-3 hover:bg-[#e31837]/5 rounded-full text-[#e31837] transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-[#2a2825]/40 space-y-4">
                    <ShoppingBag size={48} />
                    <p className="font-serif text-xl">Your cart is empty.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.cartId} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-[#e31837]/5">
                      <img src={item.item.image} alt={item.item.name} className="w-20 h-20 object-cover rounded-xl" />
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-[#2a2825] leading-tight">{item.item.name}</h4>
                          {item.size && <p className="text-xs text-[#2a2825]/60 mt-1 uppercase tracking-widest">{item.size}</p>}
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <span className="font-mono font-bold text-[#e31837]">Rs. {item.price.toLocaleString()}</span>
                          <div className="flex items-center space-x-1 bg-[#f9f7f2] rounded-full p-1">
                            <button onClick={() => updateQuantity(item.cartId, -1)} className="w-11 h-11 flex justify-center items-center rounded-full hover:bg-black/5 hover:text-[#009a44]">
                              <Minus size={16} />
                            </button>
                            <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.cartId, 1)} className="w-11 h-11 flex justify-center items-center rounded-full hover:bg-black/5 hover:text-[#009a44]">
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="bg-white p-6 border-t border-[#e31837]/10 space-y-4 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                  <div className="flex justify-between items-center text-sm font-medium text-[#2a2825]/70">
                    <span>Subtotal</span>
                    <span className="font-mono">Rs. {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-[#e31837]/10 pt-4 mb-6">
                    <span className="text-xl font-serif text-[#e31837] font-bold">Total</span>
                    <span className="text-2xl font-mono font-bold text-[#e31837]">Rs. {cartTotal.toLocaleString()}</span>
                  </div>
                  <Link to="/checkout" className="block text-center w-full bg-[#e31837] text-white py-4 rounded-full font-bold uppercase tracking-widest shadow-xl hover:bg-[#009a44] transition-all transform hover:-translate-y-1">
                    Proceed to Checkout
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#f9f7f2] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-center text-xl font-serif text-[#e31837]">
              <a href="#dine-in" onClick={() => setIsMenuOpen(false)}>Dine-In Menu</a>
              <a href="#storefront" onClick={() => setIsMenuOpen(false)}>Order Online</a>
              <a href="#location" onClick={() => setIsMenuOpen(false)}>Locations</a>
              <Link to="/book-table" className="block w-full bg-[#e31837] text-white py-4 rounded-full text-lg font-medium shadow-lg shadow-[#e31837]/20">
                Book a Table
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1920&q=80" 
              className="w-full h-full object-cover"
              alt="Restaurant Interior"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto mt-10">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#009a44] font-serif italic text-xl md:text-3xl mb-6"
            >
              Ajwa Bakers & Restaurant
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-9xl font-serif font-light mb-10 leading-[1.1] tracking-tight"
            >
              Freshly Baked <br/><span className="italic font-serif">Every Day</span>
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <a href="#storefront" className="bg-[#009a44] text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#2a2825] transition-all shadow-2xl">
                Order for Takeout
              </a>
              <a href="#dine-in" className="bg-transparent border border-white/40 px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all backdrop-blur-sm">
                Dine-In Menu
              </a>
            </motion.div>
          </div>
        </section>

        {/* Dine-In Experience Section */}
        <section id="dine-in" className="py-24 bg-[#2a2825] text-[#f9f7f2] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#35332f] rounded-l-full blur-3xl opacity-30 transform translate-x-1/3" />
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-10">
              <div>
                <span className="text-[#009a44] font-serif italic text-3xl mb-4 block">Dine With Us</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif leading-[1.1] font-light">Great Food, <br/> Good Times.</h2>
              </div>
              <p className="text-[#f9f7f2]/60 text-lg leading-relaxed max-w-lg font-light">
                Whether you're craving our famous BBQ or just want a quiet corner for coffee and cake, our dining area is perfect for family gatherings and catching up with friends.
              </p>
              
              <div className="space-y-8 pt-6 border-t border-white/10">
                <div className="flex justify-between items-end border-b border-white/10 pb-4 group cursor-pointer hover:border-[#009a44] transition-colors">
                  <div>
                    <h4 className="font-serif text-2xl text-white group-hover:text-[#009a44] transition-colors">The Heritage BBQ Platter</h4>
                    <p className="text-sm text-[#f9f7f2]/50 mt-2 font-light">Tikka, seekh kababs, and fresh naan straight from the tandoor.</p>
                  </div>
                  <span className="font-mono text-[#009a44]">Rs. 3,500</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-4 group cursor-pointer hover:border-[#009a44] transition-colors">
                  <div>
                    <h4 className="font-serif text-2xl text-white group-hover:text-[#009a44] transition-colors">Velvet Black Forest</h4>
                    <p className="text-sm text-[#f9f7f2]/50 mt-2 font-light">Freshly baked chocolate sponge with a creamy vanilla filling.</p>
                  </div>
                  <span className="font-mono text-[#009a44]">Rs. 1,800</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-4 group cursor-pointer hover:border-[#009a44] transition-colors">
                  <div>
                    <h4 className="font-serif text-2xl text-white group-hover:text-[#009a44] transition-colors">Local Sweets</h4>
                    <p className="text-sm text-[#f9f7f2]/50 mt-2 font-light">Warm gulab jamun, rasgulla, and fresh traditional sweets.</p>
                  </div>
                  <span className="font-mono text-[#009a44]">Rs. 1,200</span>
                </div>
              </div>
              
              <div className="pt-6">
                <Link to="/book-table" className="inline-block bg-transparent border border-[#009a44] text-[#009a44] px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#009a44] hover:text-white transition-all text-center">
                  Reserve Your Table
                </Link>
              </div>
            </div>

            <div className="relative h-[400px] md:h-[500px] lg:h-[700px] w-full rounded-[40px] overflow-hidden group mt-12 lg:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Dine in BBQ"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a2825] via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                <p className="font-serif italic text-white text-xl">"Best bakery in Daska! Their Black Forest cake is always a hit at our family birthdays."</p>
                <p className="text-[#009a44] text-sm uppercase tracking-widest mt-4 font-bold">— Local Guide</p>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Storefront / Menu Section */}
        <section id="storefront" className="py-32 px-4 md:px-8 bg-[#f9f7f2]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[#009a44] font-serif italic text-2xl mb-4 block tracking-wide">Order Online</span>
              <h3 className="text-[#e31837] font-serif text-4xl md:text-5xl lg:text-7xl mb-8">Get It Delivered</h3>
              <div className="w-40 h-[1px] bg-[#e31837]/20 mx-auto rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: -160 }}
                  whileInView={{ x: 160 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-full bg-[#e31837]"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center space-x-3 px-8 py-3.5 rounded-full transition-all text-sm font-bold uppercase tracking-[0.1em] border ${
                    activeCategory === cat.id 
                    ? 'bg-[#e31837] border-[#e31837] text-white shadow-xl shadow-[#e31837]/20' 
                    : 'bg-white border-[#e31837]/10 text-[#2a2825] hover:border-[#e31837]/30'
                  }`}
                >
                  <cat.icon size={18} />
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Menu Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              <AnimatePresence mode="popLayout">
                {isLoadingMenu ? (
                  [...Array(6)].map((_, index) => (
                    <MenuItemSkeleton key={`skeleton-${index}`} index={index} />
                  ))
                ) : (
                  filteredMenu.map((item, index) => (
                    <MenuItemCard key={item.id} item={item} index={index} onAddToCart={addToCart} />
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <RestaurantReviews />

        {/* Location Section */}
        <section id="location" className="py-24 px-4 md:px-8 bg-white border-t border-[#e31837]/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div className="space-y-10">
                <div>
                  <span className="text-[#009a44] font-serif italic text-2xl mb-4 block">Visit Us</span>
                  <h3 className="text-[#e31837] font-serif text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">Our Daska <br/> Branch</h3>
                  <p className="text-[#2a2825]/60 text-lg max-w-md">Drop by our main branch for fresh bread, cakes, or a family dinner.</p>
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-[#e31837]/5 p-4 rounded-2xl text-[#e31837] shadow-sm border border-[#e31837]/10">
                      <MapPin size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg uppercase tracking-widest text-[#e31837] mb-1">Address</h4>
                      <p className="text-[#2a2825]/70 leading-relaxed">Gujranwala Road, Daska, Sialkot, <br/> Punjab, Pakistan</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="bg-[#e31837]/5 p-4 rounded-2xl text-[#e31837] shadow-sm border border-[#e31837]/10">
                      <Phone size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg uppercase tracking-widest text-[#e31837] mb-1">Call Us</h4>
                      <p className="text-[#2a2825]/70">+92 52 6612345</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="bg-[#e31837]/5 p-4 rounded-2xl text-[#e31837] shadow-sm border border-[#e31837]/10">
                      <Clock size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg uppercase tracking-widest text-[#e31837] mb-1">Hours</h4>
                      <p className="text-[#2a2825]/70">Dine-in & Takeaway: 08:00 AM — Midnight</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="bg-[#e31837] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest shadow-xl shadow-[#e31837]/20 hover:bg-[#009a44] transition-all">
                    Plan Your Visit
                  </button>
                </div>
              </div>

              <div className="h-[400px] lg:h-[600px] w-full bg-[#f9f7f2] rounded-[40px] overflow-hidden shadow-2xl relative border-8 border-white mt-12 lg:mt-0">
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
      <footer className="bg-[#1a1917] text-[#f9f7f2] py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-8">
            <Logo className="w-24 h-24 md:w-32 md:h-32" />
            <p className="text-[#f9f7f2]/50 leading-relaxed text-lg italic font-serif">
              "Serving the Daska community with fresh bakery items and delicious meals for over 30 years."
            </p>
              <div className="flex space-x-4">
                <a href="https://instagram.com/ajwabakersdaska" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-4 rounded-full hover:bg-[#009a44] transition-all duration-300 transform hover:scale-110">
                  <Instagram size={20} />
                </a>
                <a href="https://facebook.com/ajwabakers.daska" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-4 rounded-full hover:bg-[#009a44] transition-all duration-300 transform hover:scale-110">
                  <Facebook size={20} />
                </a>
                <a href="https://twitter.com/ajwadaska" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-4 rounded-full hover:bg-[#009a44] transition-all duration-300 transform hover:scale-110">
                  <Twitter size={20} />
                </a>
              </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.3em] mb-8 text-[#009a44]">Bakery Menu</h4>
            <ul className="space-y-5 text-[#f9f7f2]/60 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Fresh Cakes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fresh Bread</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Local Sweets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Party Platters</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.3em] mb-8 text-[#009a44]">About Us</h4>
            <ul className="space-y-5 text-[#f9f7f2]/60 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Ingredients</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Book a Hall</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.3em] mb-8 text-[#009a44]">Connect</h4>
            <p className="text-[#f9f7f2]/50 mb-8 text-sm">Get updates on new menu items and special offers.</p>
            <div className="flex bg-white/5 p-1.5 rounded-full border border-white/10 focus-within:border-[#009a44] transition-all">
              <input 
                type="email" 
                placeholder="Join the circle" 
                className="bg-transparent px-5 py-3 flex-grow outline-none text-sm placeholder:text-gray-500"
              />
              <button className="bg-[#009a44] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-[#2a2825] transition-colors shadow-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[#f9f7f2]/30 text-xs uppercase tracking-widest font-medium">Baking in Daska — © 2024 Ajwa Bakers</p>
          <div className="flex space-x-10 text-[#f9f7f2]/30 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-table" element={<BookTable />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </CartProvider>
  );
}

function MenuItemCard({ item, onAddToCart, index }: { item: MenuItem; onAddToCart: (item: MenuItem, size: string | null, price: number) => void; index?: number }) {
  const [selectedSize, setSelectedSize] = useState(item.options ? item.options[0].size : null);
  const [currentPrice, setCurrentPrice] = useState(item.price || (item.options ? item.options[0].price : 0));
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const handleSizeChange = (size: string, price: number) => {
    setSelectedSize(size);
    setCurrentPrice(price);
  };

  return (
    <>
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ 
          duration: 0.4, 
          delay: index !== undefined ? index * 0.05 : 0,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-[#e31837]/5 border border-[#e31837]/5 hover:shadow-2xl hover:shadow-[#e31837]/10 transition-all group flex flex-col"
      >
      <div className="relative aspect-4-3 overflow-hidden p-3">
        <div className="w-full h-full rounded-[24px] overflow-hidden relative">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a2825]/60 via-[#2a2825]/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur text-[#2a2825] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
          {item.category}
        </div>
      </div>

      <div className="px-8 pb-8 pt-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3 gap-4">
          <h4 className="font-serif text-2xl font-bold text-[#2a2825] leading-tight">{item.name}</h4>
          {item.popular && (
            <div className="flex-shrink-0 flex items-center text-[#009a44]">
              <Star size={16} className="fill-current" />
            </div>
          )}
        </div>
        <p className="text-[#2a2825]/50 text-sm mb-4 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        <button 
          onClick={() => setIsReviewOpen(true)}
          className="flex items-center space-x-1 text-[#009a44] hover:text-[#e31837] transition-colors mb-4 text-sm font-medium py-2"
        >
          <div className="flex space-x-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < 4 ? "fill-current" : ""} />
            ))}
          </div>
          <span className="ml-2 text-xs uppercase tracking-widest text-[#2a2825]/50 hover:text-[#e31837]">(See Reviews)</span>
        </button>

        {item.options ? (
          <div className="mb-8 space-y-4">
            <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#2a2825]/40">Select Size</p>
            <div className="flex flex-wrap gap-2.5">
              {item.options.map((opt) => (
                <button
                  key={opt.size}
                  onClick={() => handleSizeChange(opt.size, opt.price)}
                  className={`px-4 py-3 min-h-[44px] rounded-xl text-[10px] font-bold uppercase tracking-[0.1em] transition-all border ${
                    selectedSize === opt.size 
                    ? 'bg-[#2a2825] border-[#2a2825] text-white shadow-lg' 
                    : 'bg-[#f9f7f2] border-transparent text-[#2a2825] hover:border-[#2a2825]/20 hover:bg-white'
                  }`}
                >
                  {opt.size}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-8 flex-grow"></div>
        )}

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-[#e31837]/10">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#2a2825]/30 mb-1">Price</span>
            <span className="text-2xl font-mono font-bold text-[#2a2825]">
              Rs. {currentPrice.toLocaleString()}
            </span>
          </div>
          <button 
            onClick={() => onAddToCart(item, selectedSize, currentPrice)}
            className="bg-[#009a44] text-white px-6 py-4 rounded-2xl hover:bg-[#e31837] transition-all shadow-lg shadow-[#009a44]/20 hover:scale-105 flex items-center space-x-2 group-hover:shadow-xl"
          >
            <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">Add to Cart</span>
            <Plus size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </motion.div>
    <ItemReviewsModal item={item} isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} />
    </>
  );
}

function MenuItemSkeleton({ index }: { index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-[#e31837]/5 border border-[#e31837]/5 flex flex-col"
    >
      <div className="relative aspect-4-3 p-3">
        <div className="w-full h-full rounded-[24px] bg-black/5 animate-pulse" />
      </div>
      <div className="px-8 pb-8 pt-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3 gap-4">
            <div className="h-6 bg-black/5 rounded animate-pulse w-1/2" />
        </div>
        <div className="h-4 bg-black/5 rounded animate-pulse w-full mb-2" />
        <div className="h-4 bg-black/5 rounded animate-pulse w-2/3 mb-4" />
        <div className="flex space-x-1 mb-4 h-4">
          <div className="w-24 h-4 bg-black/5 rounded animate-pulse" />
        </div>
        <div className="mt-auto space-y-6">
          <div className="flex space-x-2">
            <div className="h-11 bg-black/5 rounded-xl animate-pulse flex-1" />
            <div className="h-11 bg-black/5 rounded-xl animate-pulse flex-1" />
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="h-6 bg-black/5 rounded animate-pulse w-16" />
            <div className="h-8 bg-black/5 rounded-full animate-pulse w-20" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
