import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageCircle, X } from 'lucide-react';
import { MenuItem } from '../data/menu';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const mockReviewsByItem: Record<string, Review[]> = {
  // Let's generate a couple generically
};

export default function ItemReviewsModal({ item, isOpen, onClose }: { item: MenuItem; isOpen: boolean; onClose: () => void }) {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'r1',
      name: 'Customer',
      rating: 5,
      comment: `Absolutely loved the ${item.name}! Will order again.`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    }
  ]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [isFormOpen, setIsFormOpen] = useState(false);

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
    setIsFormOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[80] backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl max-h-[85vh] bg-[#f9f7f2] rounded-[32px] overflow-hidden z-[90] shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-[#e31837]/10 bg-white">
              <h2 className="text-2xl font-serif font-bold text-[#e31837]">Reviews: {item.name}</h2>
              <button onClick={onClose} className="p-3 hover:bg-[#e31837]/5 rounded-full text-[#e31837] transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto flex-grow p-6">
              {isFormOpen ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-serif text-xl font-bold text-[#e31837] mb-4">Write a Review</h3>
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

                  <div className="pt-4 flex gap-4">
                    <button type="button" onClick={() => setIsFormOpen(false)} className="w-full bg-[#f9f7f2] border border-[#009a44] text-[#009a44] py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#009a44] hover:text-white transition-all">
                      Cancel
                    </button>
                    <button type="submit" className="w-full bg-[#e31837] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#009a44] transition-all shadow-lg">
                      Submit
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                 {reviews.length === 0 ? (
                    <p className="text-center text-[#2a2825]/50 italic">No reviews yet. Be the first!</p>
                 ) : (
                   reviews.map(review => (
                     <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-[#e31837]/5">
                       <div className="flex justify-between items-start mb-3">
                         <div>
                            <span className="font-bold text-[#2a2825]">{review.name}</span>
                            <div className="flex space-x-1 mt-1 text-[#009a44]">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-400" : ""} />
                              ))}
                            </div>
                         </div>
                         <span className="text-[#2a2825]/40 text-xs font-mono">{review.date}</span>
                       </div>
                       <p className="text-[#2a2825]/70 text-sm leading-relaxed">"{review.comment}"</p>
                     </div>
                   ))
                 )}
                </div>
              )}
            </div>

            {!isFormOpen && (
              <div className="p-6 bg-white border-t border-[#e31837]/10">
                <button 
                  onClick={() => setIsFormOpen(true)}
                  className="w-full bg-[#009a44] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#e31837] transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <MessageCircle size={18} />
                  <span>Write a Review</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
