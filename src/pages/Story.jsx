import React, { useEffect } from 'react';
import heritageImg from '../assets/images/story_heritage.jpg';

const Story = () => {
  useEffect(() => {
    document.title = "Our Sourcing Heritage | NIR Brothers Coffee";
  }, []);

  const timelineEvents = [
    { year: '1984', title: 'The Ancestral Estate', desc: 'Our grandfather starts a shade-grown coffee plantation in Mudigere, farming Robusta under indigenous tree canopies.' },
    { year: '2002', title: 'Arabica Sourcing Sights', desc: 'Family acquires farming plots in Talagur, Chikkamaglore, harvesting high-grade specialty Arabica.' },
    { year: '2016', title: 'The NIR Brothers Take Charge', desc: 'Noushad, Irsad, and Rasheed NIR take leadership, upgrading the plantation to a 100% direct-trade sourcing model.' },
    { year: '2024', title: 'Going Direct to Cup', desc: 'NIR Brothers Coffee is born, bringing micro-batch roasted single-estate filter coffee directly to brewers nationwide.' }
  ];

  return (
    <div className="py-24 bg-coffee-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-coffee-500 block mb-3">Our Heritage</span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-coffee-900 mb-4">The NIR Brothers Story</h1>
          <div className="w-16 h-[2px] bg-coffee-500 mx-auto mt-4" />
        </div>

        {/* Story Intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="rounded-3xl overflow-hidden shadow-md aspect-[3/2]">
            <img src={heritageImg} alt="Noushad, Irsad, and Rasheed NIR in the rustic barn" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-coffee-900 mb-4">Three Brothers. One Passion.</h2>
            <p className="text-sm text-coffee-700 leading-relaxed font-light mb-4">
              Growing up on our family’s Mudigere estate, coffee was not an industry; it was our landscape. We spent summers helping our grandfather hand-sort raw cherries and observing the slow roasting process on clay pans.
            </p>
            <p className="text-sm text-coffee-700 leading-relaxed font-light">
              As we grew older, we realized that the commercial coffee supply chain was heavily broken—with middle-agents taking the bulk of the margins while growers received low compensation. We launched NIR Brothers to establish a direct pipeline from our farms to your cups.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-coffee-900 text-center mb-12">Our Sourcing Heritage</h2>
          <div className="relative border-l border-coffee-200 ml-4 md:ml-32 pl-8 flex flex-col gap-12">
            {timelineEvents.map((evt, idx) => (
              <div key={idx} className="relative group">
                {/* Year tag left on desktop */}
                <span className="absolute -left-[140px] top-1 text-lg font-mono font-bold text-coffee-500 hidden md:inline">
                  {evt.year}
                </span>
                
                {/* Node indicator */}
                <div className="absolute -left-[41px] top-2 w-5 h-5 rounded-full bg-coffee-50 border-4 border-coffee-500 group-hover:bg-coffee-900 transition-colors" />

                <div className="glass-card rounded-2xl p-6 bg-white/40 border border-coffee-200/30">
                  <span className="text-xs font-mono font-bold text-coffee-500 md:hidden block mb-1">
                    {evt.year}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-coffee-900 mb-2">{evt.title}</h3>
                  <p className="text-xs md:text-sm text-coffee-700 leading-relaxed font-light">{evt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Story;
