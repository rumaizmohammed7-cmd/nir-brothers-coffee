import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQAccordion = ({ question, answer, isOpen, onToggle }) => (
  <div className="border-b border-coffee-200/40 pb-4">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between text-left py-4 focus:outline-none"
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

const FAQ = () => {
  useEffect(() => {
    document.title = "FAQ & Sourcing Help | NIR Brothers Coffee";
  }, []);

  const [openIdx, setOpenIdx] = useState(null);

  const faqData = [
    { question: 'What is special about NIR shade-grown coffee?', answer: 'Most commercial coffees are sun-grown in massive deforested fields, which speeds up ripening but increases bitterness. Our coffee grows beneath indigenous shade canopies, slowing down the cherry ripening cycle. This slow growth locks in sugars and lowers bitter acids, providing a naturally smooth, chocolatey cup.' },
    { question: 'How should I store my NIR coffee beans?', answer: 'Store your coffee beans inside our foil-lined bag and lock it with the zipper, or transfer them to an airtight ceramic container. Keep it in a cool, dark kitchen cabinet. Never freeze or refrigerate your beans, as temperature changes draw out condensation and ruin delicate essential oils.' },
    { question: 'What is the ideal shelf-life of roasted coffee?', answer: 'For the best aromatic experience, we recommend brewing within 4 to 6 weeks of the roast date printed on your bag. However, our degassing valve keeps the beans fresh for up to 3-6 months if sealed correctly.' },
    { question: 'Can I set up a weekly or monthly subscription?', answer: 'Yes! We offer flexible subscription plans that deliver fresh-roasted beans direct to your doorstep. You can select your roast category, frequency, and pause or cancel anytime. Get in touch with our sourcing team to activate it.' }
  ];

  return (
    <div className="py-24 bg-coffee-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-8">
        
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-coffee-500 block mb-3">FAQ</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-coffee-900 mb-4 flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-coffee-500" />
            <span>Sourcing & Brewing FAQs</span>
          </h1>
          <div className="w-16 h-[2px] bg-coffee-500 mx-auto mt-4" />
        </div>

        <div className="bg-white/40 p-6 md:p-8 rounded-3xl border border-coffee-200/30 glass-card flex flex-col gap-4">
          {faqData.map((faq, idx) => (
            <FAQAccordion
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIdx === idx}
              onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQ;
