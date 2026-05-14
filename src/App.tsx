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
  Coffee,
  Minus,
  Trash2
} from 'lucide-react';
import { menuData, MenuItem } from './data/menu';

const categories = [
  { id: 'all', label: 'All Menu', icon: Coffee },
  { id: 'restaurant', label: 'Restaurant', icon: Utensils },
  { id: 'bakery', label: 'Bakery', icon: Cookie },
  { id: 'cakes', label: 'Cakes', icon: Cake },
  { id: 'sweets', label: 'Traditional Sweets', icon: Star },
];

interface CartItem {
  cartId: string;
  item: MenuItem;
  size: string | null;
  price: number;
  quantity: number;
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredMenu = activeCategory === 'all' 
    ? menuData 
    : menuData.filter(item => item.category === activeCategory);

  const addToCart = (item: MenuItem, size: string | null, price: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id && i.size === size);
      if (existing) {
        return prev.map(i => i.cartId === existing.cartId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { cartId: `${item.id}-${size || 'default'}`, item, size, price, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.cartId === cartId) {
        return { ...i, quantity: Math.max(0, i.quantity + delta) };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f9f7f2]">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-colors duration-300 ${scrolled ? 'bg-[#2a2825] shadow-lg py-4' : 'bg-transparent py-6'}`}>
        <div className={`max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center transition-colors duration-300 ${scrolled ? 'text-[#f9f7f2]' : 'text-white'}`}>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-widest">AJWA</h1>
            <span className={`text-xs uppercase tracking-[0.2em] font-medium hidden sm:inline-block border-l pl-2 ${scrolled ? 'border-[#f9f7f2]/20 text-[#c18f58]' : 'border-white/20 text-[#c18f58]'}`}>Bakery & Restaurant</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#dine-in" className="text-xs font-semibold uppercase tracking-widest hover:text-[#c18f58] transition-colors">Dine-In</a>
            <a href="#storefront" className="text-xs font-semibold uppercase tracking-widest hover:text-[#c18f58] transition-colors">Order Online</a>
            <a href="#location" className="text-xs font-semibold uppercase tracking-widest hover:text-[#c18f58] transition-colors">Location</a>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:text-[#c18f58] transition-colors"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c18f58] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg text-white ${scrolled ? 'bg-[#c18f58] hover:bg-white hover:text-[#2a2825] shadow-[#c18f58]/20' : 'bg-[#4a5d23] hover:bg-[#c18f58] shadow-black/20'}`}>
              Book a Table
            </button>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:text-[#c18f58] transition-colors"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c18f58] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
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
              <div className="p-6 border-b border-[#4a5d23]/10 flex justify-between items-center bg-white">
                <h2 className="font-serif text-2xl font-bold text-[#4a5d23]">Your Order</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-[#4a5d23]/5 rounded-full text-[#4a5d23] transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-[#2a2825]/40 space-y-4">
                    <ShoppingBag size={48} />
                    <p className="font-serif text-xl">Your culinary basket is empty.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.cartId} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-[#4a5d23]/5">
                      <img src={item.item.image} alt={item.item.name} className="w-20 h-20 object-cover rounded-xl" />
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-[#2a2825] leading-tight">{item.item.name}</h4>
                          {item.size && <p className="text-xs text-[#2a2825]/60 mt-1 uppercase tracking-widest">{item.size}</p>}
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <span className="font-mono font-bold text-[#4a5d23]">Rs. {item.price.toLocaleString()}</span>
                          <div className="flex items-center space-x-3 bg-[#f9f7f2] rounded-full px-2 py-1">
                            <button onClick={() => updateQuantity(item.cartId, -1)} className="p-1 hover:text-[#c18f58]">
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.cartId, 1)} className="p-1 hover:text-[#c18f58]">
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="bg-white p-6 border-t border-[#4a5d23]/10 space-y-4 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                  <div className="flex justify-between items-center text-sm font-medium text-[#2a2825]/70">
                    <span>Subtotal</span>
                    <span className="font-mono">Rs. {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-[#4a5d23]/10 pt-4 mb-6">
                    <span className="text-xl font-serif text-[#4a5d23] font-bold">Total</span>
                    <span className="text-2xl font-mono font-bold text-[#4a5d23]">Rs. {cartTotal.toLocaleString()}</span>
                  </div>
                  <button className="w-full bg-[#4a5d23] text-white py-4 rounded-full font-bold uppercase tracking-widest shadow-xl hover:bg-[#c18f58] transition-all transform hover:-translate-y-1">
                    Proceed to Checkout
                  </button>
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
            <div className="flex flex-col space-y-6 text-center text-xl font-serif text-[#4a5d23]">
              <a href="#dine-in" onClick={() => setIsMenuOpen(false)}>Dine-In Menu</a>
              <a href="#storefront" onClick={() => setIsMenuOpen(false)}>Order Online</a>
              <a href="#location" onClick={() => setIsMenuOpen(false)}>Locations</a>
              <button className="bg-[#4a5d23] text-white py-4 rounded-full text-lg font-medium shadow-lg shadow-[#4a5d23]/20">
                Book a Table
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
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
              className="text-[#c18f58] font-serif italic text-xl md:text-3xl mb-6"
            >
              Ajwa Bakers & Restaurant
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-9xl font-serif font-light mb-10 leading-[1.1] tracking-tight"
            >
              A Heritage of <br/><span className="italic font-serif">Fine Taste</span>
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <a href="#storefront" className="bg-[#c18f58] text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#2a2825] transition-all shadow-2xl">
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
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div>
                <span className="text-[#c18f58] font-serif italic text-3xl mb-4 block">The Dine-In Experience</span>
                <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] font-light">Culinary Art, <br/> Served Fresh.</h2>
              </div>
              <p className="text-[#f9f7f2]/60 text-lg leading-relaxed max-w-lg font-light">
                Our dining rooms offer a sanctuary for culinary exploration. From stone-fired pizzas to heirloom BBQ recipes passed down through generations, every plate is crafted with devotion.
              </p>
              
              <div className="space-y-8 pt-6 border-t border-white/10">
                <div className="flex justify-between items-end border-b border-white/10 pb-4 group cursor-pointer hover:border-[#c18f58] transition-colors">
                  <div>
                    <h4 className="font-serif text-2xl text-white group-hover:text-[#c18f58] transition-colors">The Heritage BBQ Platter</h4>
                    <p className="text-sm text-[#f9f7f2]/50 mt-2 font-light">Slow-marinated malai boti, seekh kababs, fresh naan.</p>
                  </div>
                  <span className="font-mono text-[#c18f58]">Rs. 3,500</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-4 group cursor-pointer hover:border-[#c18f58] transition-colors">
                  <div>
                    <h4 className="font-serif text-2xl text-white group-hover:text-[#c18f58] transition-colors">Velvet Black Forest</h4>
                    <p className="text-sm text-[#f9f7f2]/50 mt-2 font-light">Signature dark chocolate sponge, Madagascar vanilla cream.</p>
                  </div>
                  <span className="font-mono text-[#c18f58]">Rs. 1,800</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-4 group cursor-pointer hover:border-[#c18f58] transition-colors">
                  <div>
                    <h4 className="font-serif text-2xl text-white group-hover:text-[#c18f58] transition-colors">Saffron Gulab Jamun</h4>
                    <p className="text-sm text-[#f9f7f2]/50 mt-2 font-light">Warm milk-solid spheres, Iranian saffron, rose syrup.</p>
                  </div>
                  <span className="font-mono text-[#c18f58]">Rs. 1,200</span>
                </div>
              </div>
              
              <div className="pt-6">
                <button className="bg-transparent border border-[#c18f58] text-[#c18f58] px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#c18f58] hover:text-white transition-all">
                  Reserve Your Table
                </button>
              </div>
            </div>

            <div className="relative h-[700px] w-full rounded-[40px] overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Dine in BBQ"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a2825] via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                <p className="font-serif italic text-white text-xl">"A maestro of flavors right in the heart of Daska. The ambiance perfectly complements the exceptional food."</p>
                <p className="text-[#c18f58] text-sm uppercase tracking-widest mt-4 font-bold">— Local Guide</p>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Storefront / Menu Section */}
        <section id="storefront" className="py-32 px-4 md:px-8 bg-[#f9f7f2]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[#c18f58] font-serif italic text-2xl mb-4 block tracking-wide">The Digital Storefront</span>
              <h3 className="text-[#4a5d23] font-serif text-5xl md:text-7xl mb-8">Order & Enjoy at Home</h3>
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
                  className={`flex items-center space-x-3 px-8 py-3.5 rounded-full transition-all text-sm font-bold uppercase tracking-[0.1em] border ${
                    activeCategory === cat.id 
                    ? 'bg-[#4a5d23] border-[#4a5d23] text-white shadow-xl shadow-[#4a5d23]/20' 
                    : 'bg-white border-[#4a5d23]/10 text-[#2a2825] hover:border-[#4a5d23]/30'
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
                {filteredMenu.map((item) => (
                  <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="py-24 px-4 md:px-8 bg-white border-t border-[#4a5d23]/5">
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
                      <p className="text-[#2a2825]/70">Dine-in & Takeaway: 08:00 AM — Midnight</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="bg-[#4a5d23] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest shadow-xl shadow-[#4a5d23]/20 hover:bg-[#c18f58] transition-all">
                    Plan Your Visit
                  </button>
                </div>
              </div>

              <div className="h-[600px] bg-[#f9f7f2] rounded-[40px] overflow-hidden shadow-2xl relative border-8 border-white">
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
            <h2 className="text-4xl font-serif font-bold tracking-widest text-[#c18f58]">AJWA</h2>
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
            <p className="text-[#f9f7f2]/50 mb-8 text-sm">Join our newsletter for artisanal recipes.</p>
            <div className="flex bg-white/5 p-1.5 rounded-full border border-white/10 focus-within:border-[#c18f58] transition-all">
              <input 
                type="email" 
                placeholder="Join the circle" 
                className="bg-transparent px-5 py-3 flex-grow outline-none text-sm placeholder:text-gray-500"
              />
              <button className="bg-[#c18f58] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-[#2a2825] transition-colors shadow-lg">
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

function MenuItemCard({ item, onAddToCart }: { item: MenuItem; onAddToCart: (item: MenuItem, size: string | null, price: number) => void }) {
  const [selectedSize, setSelectedSize] = useState(item.options ? item.options[0].size : null);
  const [currentPrice, setCurrentPrice] = useState(item.price || (item.options ? item.options[0].price : 0));

  const handleSizeChange = (size: string, price: number) => {
    setSelectedSize(size);
    setCurrentPrice(price);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-[#4a5d23]/5 border border-[#4a5d23]/5 hover:shadow-2xl hover:shadow-[#4a5d23]/10 transition-all group flex flex-col"
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
            <div className="flex-shrink-0 flex items-center text-[#c18f58]">
              <Star size={16} className="fill-current" />
            </div>
          )}
        </div>
        <p className="text-[#2a2825]/50 text-sm mb-8 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {item.options ? (
          <div className="mb-8 space-y-4">
            <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#2a2825]/40">Select Size</p>
            <div className="flex flex-wrap gap-2.5">
              {item.options.map((opt) => (
                <button
                  key={opt.size}
                  onClick={() => handleSizeChange(opt.size, opt.price)}
                  className={`px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.1em] transition-all border ${
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

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-[#4a5d23]/10">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#2a2825]/30 mb-1">Price</span>
            <span className="text-2xl font-mono font-bold text-[#2a2825]">
              Rs. {currentPrice.toLocaleString()}
            </span>
          </div>
          <button 
            onClick={() => onAddToCart(item, selectedSize, currentPrice)}
            className="bg-[#c18f58] text-white px-6 py-4 rounded-2xl hover:bg-[#4a5d23] transition-all shadow-lg shadow-[#c18f58]/20 hover:scale-105 flex items-center space-x-2 group-hover:shadow-xl"
          >
            <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">Add to Cart</span>
            <Plus size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
