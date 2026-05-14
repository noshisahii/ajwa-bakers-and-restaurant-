import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, CreditCard, Wallet, MapPin, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('jazzcash');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-[#f9f7f2] pt-32 pb-24 px-4 md:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center space-x-2 text-[#c18f58] hover:text-[#4a5d23] mb-8 font-bold text-sm tracking-widest uppercase transition-colors">
          <ChevronLeft size={16} />
          <span>Back to Home</span>
        </Link>
        
        {step === 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-[#4a5d23]/5 border border-[#4a5d23]/5">
                <h2 className="text-2xl font-serif text-[#4a5d23] font-bold mb-6">Delivery Details</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c18f58]" size={20} />
                        <input type="text" required className="w-full pl-12 pr-4 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#c18f58]/50 border border-transparent transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c18f58]" size={20} />
                        <input type="tel" required className="w-full pl-12 pr-4 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#c18f58]/50 border border-transparent transition-all" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Delivery Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 text-[#c18f58]" size={20} />
                      <textarea rows={3} required className="w-full pl-12 pr-4 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#c18f58]/50 border border-transparent transition-all resize-none"></textarea>
                    </div>
                  </div>
                </form>
              </div>

              <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-[#4a5d23]/5 border border-[#4a5d23]/5">
                <h2 className="text-2xl font-serif text-[#4a5d23] font-bold mb-6">Payment Method</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <button 
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'jazzcash' ? 'border-[#c18f58] bg-[#c18f58]/5' : 'border-gray-100 bg-white hover:border-[#c18f58]/50'}`}
                  >
                    <span className="font-bold text-[#2a2825] mt-2">JazzCash</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'easypaisa' ? 'border-[#c18f58] bg-[#c18f58]/5' : 'border-gray-100 bg-white hover:border-[#c18f58]/50'}`}
                  >
                    <span className="font-bold text-[#2a2825] mt-2">Easypaisa</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'card' ? 'border-[#c18f58] bg-[#c18f58]/5' : 'border-gray-100 bg-white hover:border-[#c18f58]/50'}`}
                  >
                    <CreditCard className={paymentMethod === 'card' ? 'text-[#c18f58]' : 'text-gray-400'} size={24} />
                    <span className="font-bold text-[#2a2825] mt-2">Card</span>
                  </button>
                </div>

                {paymentMethod !== 'card' && (
                  <motion.div initial={{ opacity: 0, h: 0 }} animate={{ opacity: 1, h: 'auto' }} className="space-y-4">
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Mobile Account Number</label>
                    <input type="tel" placeholder={`Enter ${paymentMethod === 'jazzcash' ? 'JazzCash' : 'Easypaisa'} number`} className="w-full px-5 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#c18f58]/50 border border-transparent transition-all" />
                  </motion.div>
                )}
                
                {paymentMethod === 'card' && (
                  <motion.div initial={{ opacity: 0, h: 0 }} animate={{ opacity: 1, h: 'auto' }} className="space-y-4">
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-5 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#c18f58]/50 border border-transparent transition-all mb-4" />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full px-5 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#c18f58]/50 border border-transparent transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">CVV</label>
                        <input type="text" placeholder="123" className="w-full px-5 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#c18f58]/50 border border-transparent transition-all" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-[#4a5d23]/5 border border-[#4a5d23]/5 sticky top-32">
                <h2 className="text-xl font-serif text-[#4a5d23] font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6 border-b border-[#4a5d23]/10 pb-6">
                  {/* Since cart state is in App, we are rendering static or passed mock data in this isolated page. For full integration we'd read from context. Let's just assume we read from localstorage or keep it simple */}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2a2825]/70">Subtotal</span>
                    <span className="font-mono font-bold text-[#2a2825]">Rs. 3,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2a2825]/70">Delivery Fee</span>
                    <span className="font-mono font-bold text-[#2a2825]">Rs. 150</span>
                  </div>
                </div>
                <div className="flex justify-between mb-8">
                  <span className="text-lg font-serif text-[#4a5d23] font-bold">Total</span>
                  <span className="text-xl font-mono font-bold text-[#c18f58]">Rs. 3,650</span>
                </div>
                <button onClick={handleSubmit} className="w-full bg-[#4a5d23] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#c18f58] transition-all shadow-lg hover:-translate-y-1">
                  Pay Securely
                </button>
              </div>
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 bg-white rounded-[40px] shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <Wallet size={40} />
            </div>
            <h2 className="text-4xl font-serif text-[#4a5d23] mb-4">Payment Successful!</h2>
            <p className="text-[#2a2825]/60 mb-8 max-w-sm mx-auto">
              Your order is confirmed and is being prepared. It will be delivered to your address shortly.
            </p>
            <Link to="/" className="inline-block bg-[#c18f58] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#4a5d23] transition-all shadow-lg border border-[#c18f58]">
              Return to Menu
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
