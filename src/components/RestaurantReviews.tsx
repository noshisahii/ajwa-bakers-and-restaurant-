import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageCircle, X } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const initialReviews: Review[] = [
  {
    id: '1',
    name: 'Ahmad M.',
    rating: 5,
    comment: 'The Black Forest cake is an absolute masterpiece! Every bite reminds me of the good old days in Daska.',
    date: '10 May 2026',
  },
  {
    id: '2',
    name: 'Sara K.',
    rating: 4,
    comment: 'Great BBQ platter. The seekh kababs were juicy and tender. Ambiance could be a bit quieter.',
    date: '8 May 2026',
  },
  {
    id: '3',
    name: 'Bilal R.',
    rating: 5,
    comment: 'Best traditional sweets in town. The gulab jamuns melt in your mouth. Highly recommended!',
    date: '1 May 2026',
  }
];

export default function RestaurantReviews() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    
    setReviews([{
      id: Date.now().toString(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    }, ...reviews]);
    
    setNewReview({ name: '', rating: 5, comment: '' });
    setIsModalOpen(false);
  };

  return (
    <section id="reviews" className="py-24 px-4 md:px-8 bg-[#2a2825] text-[#f9f7f2] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-[#1a1917] rounded-r-full blur-3xl opacity-30 transform -translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-[#009a44] font-serif italic text-2xl mb-4 block tracking-wide">Guestbook</span>
            <h3 className="text-white font-serif text-4xl md:text-5xl lg:text-6xl">Customer Reviews</h3>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-transparent border border-[#009a44] text-[#009a44] px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-[#009a44] hover:text-white transition-all flex items-center space-x-2"
          >
            <MessageCircle size={18} />
            <span>Leave a Review</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((review, idx) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-[#009a44]/50 transition-colors"
            >
              <div className="flex space-x-1 text-[#009a44] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-500" : ""} />
                ))}
              </div>
              <p className="text-[#f9f7f2]/80 font-light italic mb-6 leading-relaxed">"{review.comment}"</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="uppercase tracking-widest text-white">{review.name}</span>
                <span className="text-[#f9f7f2]/40 font-mono">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#f9f7f2] rounded-[32px] p-8 z-[70] shadow-2xl text-[#2a2825]"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-serif font-bold text-[#e31837]">Share Your Experience</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-[#e31837]/5 rounded-full text-[#e31837] transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    required
                    maxLength={30}
                    className="w-full px-5 py-4 bg-white rounded-2xl outline-none focus:ring-2 focus:ring-[#009a44]/50 border border-transparent transition-all shadow-sm"
                    value={newReview.name}
                    onChange={e => setNewReview({...newReview, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Rating</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({...newReview, rating: star})}
                        className="p-1 focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star 
                          size={32} 
                          className={star <= newReview.rating ? "text-[#009a44] fill-[#009a44]" : "text-gray-300"} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#2a2825]/50 mb-2">Your Review</label>
                  <textarea 
                    required
                    rows={4}
                    maxLength={300}
                    className="w-full px-5 py-4 bg-white rounded-2xl outline-none focus:ring-2 focus:ring-[#009a44]/50 border border-transparent transition-all shadow-sm resize-none"
                    value={newReview.comment}
                    onChange={e => setNewReview({...newReview, comment: e.target.value})}
                  />
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-[#e31837] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#009a44] transition-all shadow-lg shadow-[#e31837]/20">
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
