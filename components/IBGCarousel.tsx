"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback } from "react";

const imageFileNames = [
  "1 joshua-paul-hooks-kevin-harrington.jpg",
  "10 JOHN AGUILAR - Floral copy.png",
  "11 joshua hooks lithium battery.jpg",
  "12 john aguilar opperations.jpg",
  "13 Joshua Paul Hooks Mentor.png",
  "14 joshua paul hooks station house bbq.jpg",
  "15 john aguilar.jpg",
  "16 LSV CONSULTANT-JOSHUA PAUL HOOKS.jpg",
  "17 joshua paul hooks ceo.jpg",
  "18 BRENNEN LESSER-CMO-ICONICBRANDGROUP.png",
  "19 GOLF CART CONSULTANT-JOSHUA PAUL HOOKS.JPG",
  "2 joshua paul hooks-robert foster.jpg",
  "20 iconic influencer relations.jpg",
  "21 joshua paul hooks-denagoev-ceo.jpg",
  "22 joshua hooks.jpg",
  "23 denago ev-ceo.jpg",
  "24 chief operating officer-john aguilar-iconic brand group.jpg",
  "3 John Aguilar.jpg",
  "4 golf cart consultant.jpg",
  "5 JOHN AGUILAR-Bakery.png",
  "6 iconic brand group.jpg",
  "7 walmart buyers.jpg",
  "8 denago ceo joshua paul hooks.jpg",
  "9 business consultant tampa .jpg",
  "IMG_8157.jpg",
  "IMG_8158.jpg",
  "IMG_8159.jpg",
  "IMG_8160.jpg",
  "IMG_8161.jpg",
  "IMG_8162.jpg",
  "IMG_8163.jpg",
  "IMG_8164.jpg",
  "IMG_8165.jpg",
  "IMG_8166.jpg",
  "IMG_8168.jpg",
  "IMG_8169.jpg",
  "IMG_8170.jpg",
  "IMG_8171.jpg",
  "IMG_8172.jpg",
  "IMG_8173.jpg",
  "IMG_8174.jpg",
  "IMG_8176.jpg",
  "IMG_8177.jpg",
  "IMG_8178.jpg",
  "IMG_8179.jpg",
  "IMG_8180.jpg",
  "IMG_8181.jpg",
  "IMG_8182.jpg",
  "IMG_8183.jpg",
  "IMG_8184.jpg",
  "IMG_8186.jpg",
  "IMG_8187.jpg",
  "IMG_8188.jpg",
  "IMG_8189.jpg",
  "IMG_8190.jpg",
  "IMG_8191.jpg",
  "IMG_8192.jpg",
  "IMG_8193.jpg",
  "IMG_8194.jpg",
  "IMG_8195.jpg",
  "IMG_8196.jpg",
  "IMG_8197.jpg",
  "IMG_8198.jpg",
  "IMG_8199.jpg",
  "IMG_8200.jpg",
  "IMG_8201.jpg",
  "IMG_8202.jpg",
  "IMG_8203.jpg",
  "IMG_8204.jpg",
  "IMG_8206.jpg",
  "IMG_8207.jpg",
  "IMG_8208.jpg",
  "IMG_8210.jpg",
  "IMG_8211.jpg",
  "IMG_8212.jpg",
  "IMG_8214.jpg",
  "IMG_8215.jpg",
  "IMG_8216.jpg",
  "IMG_8217.jpg",
  "IMG_8218.jpg",
  "IMG_8219.jpg",
  "IMG_8220.jpg",
  "IMG_8222.jpg",
  "IMG_8223.jpg",
  "IMG_8224.jpg",
  "IMG_8225.jpg",
  "IMG_8227.jpg",
  "IMG_8229.jpg",
  "IMG_8230.jpg",
  "IMG_8231.jpg",
  "IMG_8232.jpg",
  "IMG_8235.jpg",
  "IMG_8239.jpg",
];

const images = imageFileNames.map((fileName) => ({
  src: `/new-ibg-carousel-images/${encodeURIComponent(fileName)}`,
  alt: fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim(),
}));

export default function IBGCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: false },
    [Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-20 px-6 bg-black relative overflow-hidden">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#D5AF34]/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#D5AF34]/40 to-transparent"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-6 py-3 mb-6">
            <svg className="w-4 h-4 text-[#D5AF34]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="bg-linear-to-r from-[#D5AF34] to-[#C19A2E] text-transparent bg-clip-text font-bold text-sm tracking-widest uppercase">
              Our Work
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
            JOIN THE{" "}
            <span className="bg-linear-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-transparent bg-clip-text">
              ICONIC BRAND GROUP FAMILY!
            </span>
          </h2>
        </div>

        {/* Carousel Viewport */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex gap-4 touch-pan-y">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                >
                  <div className="relative h-[380px] lg:h-[440px] rounded-xl overflow-hidden group">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev Button */}
          <button
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10 w-12 h-12 rounded-full bg-black border border-[#D5AF34]/40 hover:border-[#D5AF34] hover:bg-[#D5AF34]/10 flex items-center justify-center text-[#D5AF34] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(213,175,52,0.3)]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={scrollNext}
            aria-label="Next slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-10 w-12 h-12 rounded-full bg-black border border-[#D5AF34]/40 hover:border-[#D5AF34] hover:bg-[#D5AF34]/10 flex items-center justify-center text-[#D5AF34] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(213,175,52,0.3)]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
