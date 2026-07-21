import React from 'react';
import { Star, Quote } from 'lucide-react';
import { reviews } from '../data/reviews';
import { motion } from 'framer-motion';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCreative } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
  return (
    <section className="py-24 bg-coffee-900 text-coffee-50 relative overflow-hidden">
      {/* Decorative blurred coffee bean silhouette */}
      <div className="absolute top-[20%] left-[-100px] text-[200px] opacity-[0.03] select-none pointer-events-none">
        ☕
      </div>
      <div className="absolute bottom-[20%] right-[-100px] text-[200px] opacity-[0.03] select-none pointer-events-none">
        🫘
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.4em] font-semibold text-coffee-500 block mb-3">
            Real Feedback
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-coffee-50">
            Loved By Brewers
          </h2>
          <div className="w-16 h-[2px] bg-coffee-500 mx-auto mt-5" />
        </div>

        {/* Carousel Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={40}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-16"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <motion.div
                className="glass-dark rounded-3xl p-8 md:p-12 border border-coffee-800/40 relative max-w-2xl mx-auto flex flex-col items-center gap-6"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-coffee-500 opacity-60" />

                {/* Comment */}
                <p className="text-base md:text-xl font-heading italic leading-relaxed text-coffee-100 font-light">
                  "{review.comment}"
                </p>

                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 fill-coffee-500 stroke-transparent ${
                        i >= Math.floor(review.rating) ? 'opacity-30' : ''
                      }`}
                    />
                  ))}
                </div>

                {/* Customer Info */}
                <div className="flex items-center gap-4 mt-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-coffee-500 shadow-md bg-coffee-800"
                  />
                  <div className="text-left">
                    <h4 className="font-heading text-sm font-bold text-coffee-50">{review.name}</h4>
                    <span className="text-xxs text-coffee-400 font-mono tracking-wider">{review.role}</span>
                  </div>
                </div>

              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default Testimonials;
