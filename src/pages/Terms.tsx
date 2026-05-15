import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export function Terms() {
  return (
    <div className="min-h-screen bg-[#f9f7f2] font-sans pb-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-12">
        <Link to="/" className="inline-flex items-center space-x-2 text-[#009a44] hover:text-[#e31837] mb-12 font-bold uppercase tracking-widest text-xs transition-colors">
          <ChevronLeft size={16} />
          <span>Back to Home</span>
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 md:p-16 rounded-[40px] shadow-2xl shadow-[#e31837]/5 border border-[#e31837]/5">
          <h1 className="text-4xl md:text-5xl font-serif text-[#e31837] font-bold mb-8">Terms of Service</h1>
          <div className="space-y-6 text-[#2a2825]/70 leading-relaxed font-light">
            <p className="font-medium text-[#2a2825]">Last updated: {new Date().toLocaleDateString()}</p>
            <p>These terms and conditions outline the rules and regulations for the use of Ajwa Bakers's Website.</p>
            <h2 className="text-2xl font-serif text-[#2a2825] mt-10 mb-4">1. General</h2>
            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Ajwa Bakers if you do not agree to take all of the terms and conditions stated on this page.</p>
            <h2 className="text-2xl font-serif text-[#2a2825] mt-10 mb-4">2. Cookies</h2>
            <p>We employ the use of cookies. By accessing Ajwa Bakers, you agreed to use cookies in agreement with the Ajwa Bakers's Privacy Policy.</p>
            <h2 className="text-2xl font-serif text-[#2a2825] mt-10 mb-4">3. License</h2>
            <p>Unless otherwise stated, Ajwa Bakers and/or its licensors own the intellectual property rights for all material on Ajwa Bakers. All intellectual property rights are reserved. You may access this from Ajwa Bakers for your own personal use subjected to restrictions set in these terms and conditions.</p>
            <h2 className="text-2xl font-serif text-[#2a2825] mt-10 mb-4">4. Orders and Payments</h2>
            <p>All orders are subject to availability and confirmation of the order price. Dispatch times may vary according to availability and subject to any delays resulting from postal delays or force majeure for which we will not be responsible.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
