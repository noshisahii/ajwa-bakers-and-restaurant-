import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export function Privacy() {
  return (
    <div className="min-h-screen bg-[#f9f7f2] font-sans pb-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-12">
        <Link to="/" className="inline-flex items-center space-x-2 text-[#009a44] hover:text-[#e31837] mb-12 font-bold uppercase tracking-widest text-xs transition-colors">
          <ChevronLeft size={16} />
          <span>Back to Home</span>
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 md:p-16 rounded-[40px] shadow-2xl shadow-[#e31837]/5 border border-[#e31837]/5">
          <h1 className="text-4xl md:text-5xl font-serif text-[#e31837] font-bold mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-[#2a2825]/70 leading-relaxed font-light">
            <p className="font-medium text-[#2a2825]">Last updated: {new Date().toLocaleDateString()}</p>
            <p>At Ajwa Bakers, we respect your privacy and are committed to protecting it through our compliance with this policy.</p>
            <h2 className="text-2xl font-serif text-[#2a2825] mt-10 mb-4">1. Information We Collect</h2>
            <p>We collect several types of information from and about users of our Website, including information by which you may be personally identified, such as name, postal address, e-mail address, and telephone number ("personal information").</p>
            <h2 className="text-2xl font-serif text-[#2a2825] mt-10 mb-4">2. How We Use Your Information</h2>
            <p>We use information that we collect about you or that you provide to us, including any personal information: to present our Website and its contents to you; to provide you with information, products, or services that you request from us; to fulfill any other purpose for which you provide it.</p>
            <h2 className="text-2xl font-serif text-[#2a2825] mt-10 mb-4">3. Disclosure of Your Information</h2>
            <p>We do not share, sell, or otherwise disclose your personal information for purposes other than those outlined in this Privacy Policy.</p>
            <h2 className="text-2xl font-serif text-[#2a2825] mt-10 mb-4">4. Data Security</h2>
            <p>We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
