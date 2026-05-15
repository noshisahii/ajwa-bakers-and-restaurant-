import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Users, Phone, MapPin, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BookTable() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    phone: '',
    email: '',
    specialRequest: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-[#f9f7f2] pt-32 pb-24 px-4 md:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center space-x-2 text-[#c18f58] hover:text-[#4a5d23] mb-8 font-bold text-sm tracking-widest uppercase transition-colors">
          <ChevronLeft size={16} />
          <span>Back to Home</span>
        </Link>
        
        <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-[#4a5d23]/5 border border-[#4a5d23]/5">
          {step === 1 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-center mb-10">
                <span className="text-[#c18f58] font-serif italic text-2xl mb-2 block">Reserve a Table</span>
                <h1 className="text-4xl md:text-5xl font-serif text-[#4a5d23] font-bold">Book a Table</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c18f58]" size={20} />
                      <input 
                        type="date" 
                        required
                        className="w-full pl-12 pr-4 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#c18f58]/50 border border-transparent transition-all"
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c18f58]" size={20} />
                      <select 
                        required
                        className="w-full pl-12 pr-4 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#c18f58]/50 border border-transparent transition-all"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                      >
                        <option value="">Select Time</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="21:00">9:00 PM</option>
                        <option value="22:00">10:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Number of Guests</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c18f58]" size={20} />
                    <select 
                      className="w-full pl-12 pr-4 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#c18f58]/50 border border-transparent transition-all"
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#4a5d23]/5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      className="w-full px-5 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#c18f58]/50 border border-transparent transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+92 300 1234567"
                      className="w-full px-5 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#c18f58]/50 border border-transparent transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Special Requests (Optional)</label>
                  <textarea 
                    rows={3}
                    placeholder="Anniversary, dietary requirements, etc."
                    className="w-full px-5 py-4 bg-[#f9f7f2] rounded-2xl outline-none focus:ring-2 focus:ring-[#c18f58]/50 border border-transparent transition-all resize-none"
                    value={formData.specialRequest}
                    onChange={(e) => setFormData({...formData, specialRequest: e.target.value})}
                  />
                </div>

                <div className="pt-6">
                  <button type="submit" className="w-full bg-[#4a5d23] text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#c18f58] transition-all shadow-lg hover:-translate-y-1">
                    Confirm Reservation
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <Calendar size={40} />
              </div>
              <h2 className="text-4xl font-serif text-[#4a5d23] mb-4">Reservation Confirmed!</h2>
              <p className="text-[#2a2825]/60 mb-8 max-w-sm mx-auto">
                Thank you, {formData.name}. We've reserved a table for {formData.guests} on {formData.date} at {formData.time}. We'll send a confirmation SMS to {formData.phone} shortly.
              </p>
              <Link to="/" className="inline-block bg-[#c18f58] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#4a5d23] transition-all shadow-lg">
                Return to Home
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
