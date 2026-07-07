'use client';

import { useEffect, useRef, useState } from 'react';

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: 500, suffix: '+', label: 'Clients Served', color: 'from-[#D5AF34] to-[#C19A2E]' },
    { number: 98, suffix: '%', label: 'Satisfaction Rate', color: 'from-[#5F9EA0] to-[#4A7D7F]' },
    { number: 15, suffix: '+', label: 'Years Experience', color: 'from-[#D5AF34] to-[#5F9EA0]' },
    { number: 50, suffix: '+', label: 'Industry Awards', color: 'from-[#C19A2E] to-[#D5AF34]' }
  ];

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D5AF34]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5F9EA0]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4">
            Proven <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">Results</span>
          </h2>
          <p className="text-xl text-gray-400">Numbers that speak for themselves</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="text-center">
                <div className={`text-6xl font-black mb-2 bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}>
                  {isVisible ? (
                    <CountUp end={stat.number} suffix={stat.suffix} />
                  ) : (
                    '0' + stat.suffix
                  )}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>

              {/* Decorative Element */}
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r ${stat.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <>{count}{suffix}</>;
}
