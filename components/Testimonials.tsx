'use client';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Partnering with Iconic Brand Group was a game changer. Their marketing rebuilt our pipeline and grew our revenue from $7M to $11M in just over a year. They deliver real results.",
      author: "Robert Foster",
      role: "Owner, Hive Outdoor",
      company: "Hive Outdoor",
      rating: 5
    },
    {
      quote: "Working with Iconic Brand Group changed the trajectory of our business. Their growth plan expanded our catering and distribution reach while I concentrated on the restaurants. Huge impact.",
      author: "Anthony Fonseca",
      role: "Co-Founder, Station House BBQ",
      company: "Station House BBQ",
      rating: 5
    },
    {
      quote: "Iconic Brand Group rebuilt our marketing strategy and boosted our visibility across social media and outreach channels. Donations increased by over 200% almost immediately. Their impact was incredible.",
      author: "Sandra Terra",
      role: "Founder, FASFA United",
      company: "FASFA United",
      rating: 5
    },
    {
      quote: "Iconic took my small floral startup and turned it into a thriving luxury brand. Their SEO, social, and ads allowed me to quit my job and pursue my dream full time.",
      author: "Bianca Rozzinni",
      role: "Owner, Bianca Rozzinni Design",
      company: "Bianca Rozzinni Design",
      rating: 5
    },
    {
      quote: "Iconic launched our ecommerce business and scaled it beyond anything we expected. It now outperforms our consulting division in revenue. Their strategy worked perfectly.",
      author: "Victor Harberson",
      role: "Managing Member, ChargeX",
      company: "ChargeX",
      rating: 5
    }
  ];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 md:py-32 px-4 md:px-6 bg-black relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#D5AF34]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#5F9EA0]/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

      <div className="relative w-full">
        <div className="text-center mb-12 md:mb-16 max-w-7xl mx-auto px-2 md:px-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 md:px-6 md:py-3 mb-4 md:mb-6">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-[#D5AF34]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="text-white font-bold text-xs md:text-sm tracking-wider uppercase">
              Client Success Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 text-white leading-tight">
            What Our <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">Clients Say</span>
          </h2>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Don't just take our word for it—hear from the businesses we've helped transform
          </p>
        </div>

        {/* Infinite Scroll Container - Full Width */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays - Stronger for mobile */}
          <div className="lg:absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none"></div>
          <div className="lg:absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Testimonials */}
          <div className="flex gap-4 md:gap-8 animate-scroll hover:pause-animation pl-4 md:pl-8">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[320px] md:w-[500px] group"
              >
                <div className="bg-white/15 md:bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/20 md:border-white/10 hover:border-[#D5AF34]/50 hover:bg-white/20 md:hover:bg-white/15 transition-all duration-500 h-full shadow-lg">
                  {/* Rating */}
                  <div className="flex gap-1 mb-3 md:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 md:w-5 md:h-5 text-[#D5AF34]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm md:text-lg text-white leading-relaxed mb-4 md:mb-6 font-medium">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 md:gap-4 pt-3 md:pt-4 border-t border-white/20">
                    {/* IMAGE PLACEHOLDER */}
                    <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#D5AF34]/30 to-[#5F9EA0]/30 rounded-full flex items-center justify-center overflow-hidden">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-[#D5AF34]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm md:text-base">{testimonial.author}</div>
                      <div className="text-xs md:text-sm text-gray-300">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12 md:mt-16 max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-gray-300 text-base md:text-lg">
            Join <span className="text-[#D5AF34] font-bold">500+</span> satisfied clients worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
