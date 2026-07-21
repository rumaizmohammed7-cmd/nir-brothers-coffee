import React from 'react';
import { motion } from 'framer-motion';

const INSTA_POSTS = [
  { id: 1, url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop', size: 'col-span-1' },
  { id: 2, url: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=500&h=500&fit=crop', size: 'col-span-1' },
  { id: 3, url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&h=600&fit=crop', size: 'col-span-1 md:row-span-2' },
  { id: 4, url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop', size: 'col-span-1' },
  { id: 5, url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop', size: 'col-span-1' },
  { id: 6, url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=500&h=500&fit=crop', size: 'col-span-1' }
];

const InstagramGallery = () => {
  return (
    <section className="py-24 bg-coffee-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-coffee-500 block mb-3">#NIRBROTHERSCOFFEE</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-coffee-900 mb-2">Share the Connection</h2>
          <p className="text-sm text-coffee-700 font-light max-w-md mt-2">
            Follow our journey on Instagram for daily brewing tips, farm updates, and coffee stories.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {INSTA_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              className={`relative rounded-2xl overflow-hidden border border-coffee-200/40 shadow-sm group cursor-pointer ${post.size}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
            >
              {/* Image */}
              <img
                src={post.url}
                alt={`Instagram coffee post ${post.id}`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Hover overlay with Instagram icon */}
              <div className="absolute inset-0 bg-coffee-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInHover={{ scale: 1.1 }}
                  className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 text-coffee-50"
                >
                  <svg className="w-6 h-6 text-coffee-500 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InstagramGallery;
