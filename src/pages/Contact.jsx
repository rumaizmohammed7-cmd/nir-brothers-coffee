import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-coffee-200/40 pb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left py-3 focus:outline-none"
      >
        <span className="font-heading text-sm md:text-base font-bold text-coffee-900">{question}</span>
        <ChevronDown
          className={`w-4 h-4 text-coffee-500 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-xs md:text-sm text-coffee-700 leading-relaxed font-light mt-2 pr-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Sourcing Team | NIR Brothers Coffee";
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      // Save message to localStorage for Admin dashboard view
      const existing = JSON.parse(localStorage.getItem('nir_messages') || '[]');
      const newMsg = {
        id: 'msg-' + Date.now(),
        date: new Date().toLocaleString(),
        ...formData
      };
      localStorage.setItem('nir_messages', JSON.stringify([newMsg, ...existing]));

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const faqs = [
    { question: 'When is NIR coffee roasted?', answer: 'We roast our coffee beans twice a week (Tuesdays and Fridays) at our Bangalore facility. Your bag is packed immediately after degassing and shipped within 24 hours of roasting.' },
    { question: 'What is the shipping cost and timeline?', answer: 'We offer free shipping on all orders above ₹500 across India. For orders below ₹500, a flat shipping fee of ₹49 is charged. Delivery typically takes 2-4 business days for metros and 3-5 days elsewhere.' },
    { question: 'Can I change my grind size after ordering?', answer: 'Since we custom-grind your coffee bags immediately prior to shipping, we can update your grind selection if the order has not been dispatched. Please email us within 2 hours of ordering.' },
    { question: 'Do you support wholesale subscriptions?', answer: 'Yes! We supply cafes, workspace lounges, and corporate offices with custom roasting programs and bulk subscriptions. Get in touch via the form below.' }
  ];

  return (
    <div className="py-24 bg-coffee-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-coffee-500 block mb-3">NIR Sourcing</span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-coffee-900 mb-4">Connect With Our Roasters</h1>
          <p className="text-sm text-coffee-700 font-light max-w-md mx-auto">
            Queries about our estate yields, custom roasts, or wholesale subscription guides? Reach out to Noushad, Irsad, and Rasheed directly.
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card rounded-2xl p-6 bg-white/60 border border-coffee-200/20 text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-coffee-100 flex items-center justify-center text-coffee-800 mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-sm font-bold text-coffee-900 mb-1">Direct Sourcing Mail</h3>
            <p className="text-xs text-coffee-700 font-light">roasters@nirbrothers.coffee</p>
          </div>
          <div className="glass-card rounded-2xl p-6 bg-white/60 border border-coffee-200/20 text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-coffee-100 flex items-center justify-center text-coffee-800 mb-4">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-sm font-bold text-coffee-900 mb-1">Estate Hotline</h3>
            <p className="text-xs text-coffee-700 font-light">+91 98450 12345 (10am - 6pm)</p>
          </div>
          <div className="glass-card rounded-2xl p-6 bg-white/60 border border-coffee-200/20 text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-coffee-100 flex items-center justify-center text-coffee-800 mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-sm font-bold text-coffee-900 mb-1">Roastery & Experience Room</h3>
            <p className="text-xs text-coffee-700 font-light">12, Canopy Lane, Indiranagar, Bangalore, India</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="glass-card rounded-3xl p-8 bg-white/60 border border-coffee-200/20 flex flex-col gap-6">
            <h2 className="text-2xl font-heading font-bold text-coffee-900">Send Sourcing Message</h2>
            
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white text-xs px-4 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white text-xs px-4 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-white text-xs px-4 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">Write Message</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white text-xs px-4 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-coffee-800 text-coffee-50 hover:bg-coffee-500 hover:text-coffee-900 py-3.5 rounded-xl font-heading text-xs font-bold tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 mt-2"
              >
                <span>SEND DISPATCH</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            {submitted && (
              <p className="text-xs text-green-700 font-mono">
                Message successfully routed! Noushad, Irsad, or Rasheed will reply shortly.
              </p>
            )}
          </div>

          {/* FAQs Accordion */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-heading font-bold text-coffee-900 flex items-center gap-2">
              <HelpCircle className="text-coffee-500 w-6 h-6" />
              <span>Roastery FAQs</span>
            </h2>
            
            <div className="flex flex-col gap-4 bg-white/40 p-6 md:p-8 rounded-3xl border border-coffee-200/30 glass-card">
              {faqs.map((faq, idx) => (
                <FAQItem
                  key={idx}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaqIdx === idx}
                  onToggle={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
