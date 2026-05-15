import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, CreditCard, Wallet, MapPin, Phone, User, Landmark } from 'lucide-react';
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
        <Link to="/" className="inline-flex items-center space-x-2 text-[#009a44] hover:text-[#e31837] mb-8 font-bold text-sm tracking-widest uppercase transition-colors">
          <ChevronLeft size={16} />
          <span>Back to Home</span>
        </Link>
        
        {step === 1 ? (
          <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-xl shadow-[#e31837]/5 border border-[#e31837]/5">
                <h2 className="text-2xl font-serif text-[#e31837] font-bold mb-6">Delivery Details</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#009a44]" size={20} />
                        <input type="text" required className="w-full pl-12 pr-4 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#009a44]/50 border border-transparent transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#009a44]" size={20} />
                        <input type="tel" required className="w-full pl-12 pr-4 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#009a44]/50 border border-transparent transition-all" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Delivery Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 text-[#009a44]" size={20} />
                      <textarea rows={3} required className="w-full pl-12 pr-4 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#009a44]/50 border border-transparent transition-all resize-none"></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-xl shadow-[#e31837]/5 border border-[#e31837]/5">
                <h2 className="text-2xl font-serif text-[#e31837] font-bold mb-6">Payment Method</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'jazzcash' ? 'border-[#009a44] bg-[#009a44]/5' : 'border-gray-100 bg-white hover:border-[#009a44]/50'}`}
                  >
                    <span className={`font-bold mt-2 ${paymentMethod === 'jazzcash' ? 'text-[#009a44]' : 'text-[#2a2825]'}`}>JazzCash</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'easypaisa' ? 'border-[#009a44] bg-[#009a44]/5' : 'border-gray-100 bg-white hover:border-[#009a44]/50'}`}
                  >
                    <span className={`font-bold mt-2 ${paymentMethod === 'easypaisa' ? 'text-[#009a44]' : 'text-[#2a2825]'}`}>Easypaisa</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'bank' ? 'border-[#009a44] bg-[#009a44]/5' : 'border-gray-100 bg-white hover:border-[#009a44]/50'}`}
                  >
                    <Landmark className={paymentMethod === 'bank' ? 'text-[#009a44]' : 'text-[#2a2825]'} size={24} />
                    <span className={`font-bold mt-2 ${paymentMethod === 'bank' ? 'text-[#009a44]' : 'text-[#2a2825]'}`}>Bank Trf</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'card' ? 'border-[#009a44] bg-[#009a44]/5' : 'border-gray-100 bg-white hover:border-[#009a44]/50'}`}
                  >
                    <CreditCard className={paymentMethod === 'card' ? 'text-[#009a44]' : 'text-[#2a2825]'} size={24} />
                    <span className={`font-bold mt-2 ${paymentMethod === 'card' ? 'text-[#009a44]' : 'text-[#2a2825]'}`}>Card</span>
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                    <motion.div key="mobile" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4">
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Mobile Account Number</label>
                      <input type="tel" required placeholder={`Enter ${paymentMethod === 'jazzcash' ? 'JazzCash' : 'Easypaisa'} number`} className="w-full px-5 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#009a44]/50 border border-transparent transition-all" />
                    </motion.div>
                  )}
                  
                  {paymentMethod === 'bank' && (
                    <motion.div key="bank" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4">
                      <div className="bg-[#f9f7f2] p-5 rounded-2xl border border-[#e31837]/10">
                        <p className="text-sm text-[#2a2825]/70 mb-4">Please transfer the total amount to the following bank account and enter your Transaction ID below:</p>
                        <div className="space-y-2 mb-4 font-mono text-sm text-[#e31837]">
                          <p><strong>Bank:</strong> Habib Bank Limited (HBL)</p>
                          <p><strong>Account Title:</strong> Ajwa Bakers & Restaurant</p>
                          <p><strong>Account Number:</strong> 0000 0000 0000 0000</p>
                          <p><strong>IBAN:</strong> PK00 HABB 0000 0000 0000 0000</p>
                        </div>
                      </div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Transaction ID / Reference No.</label>
                      <input type="text" required placeholder="Enter Transaction ID" className="w-full px-5 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#009a44]/50 border border-transparent transition-all" />
                    </motion.div>
                  )}

                  {paymentMethod === 'card' && (
                    <motion.div key="card" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4">
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Card Number</label>
                      <input type="text" required placeholder="0000 0000 0000 0000" className="w-full px-5 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#009a44]/50 border border-transparent transition-all mb-4" />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Expiry Date</label>
                          <input type="text" required placeholder="MM/YY" className="w-full px-5 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#009a44]/50 border border-transparent transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">CVV</label>
                          <input type="text" required placeholder="123" className="w-full px-5 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#009a44]/50 border border-transparent transition-all" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-xl shadow-[#e31837]/5 border border-[#e31837]/5 sticky top-32">
                <h2 className="text-xl font-serif text-[#e31837] font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6 border-b border-[#e31837]/10 pb-6">
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
                  <span className="text-lg font-serif text-[#e31837] font-bold">Total</span>
                  <span className="text-xl font-mono font-bold text-[#009a44]">Rs. 3,650</span>
                </div>
                <button type="submit" form="checkout-form" className="w-full bg-[#e31837] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#009a44] transition-all shadow-lg hover:-translate-y-1">
                  Pay Securely
                </button>
              </div>
            </div>
          </form>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 bg-white rounded-[40px] shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <Wallet size={40} />
            </div>
            <h2 className="text-4xl font-serif text-[#e31837] mb-4">Payment Successful!</h2>
            <p className="text-[#2a2825]/60 mb-8 max-w-sm mx-auto">
              Your order is confirmed and is being prepared. It will be delivered to your address shortly.
            </p>
            <Link to="/" className="inline-block bg-[#009a44] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#e31837] transition-all shadow-lg border border-[#009a44]">
              Return to Menu
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
