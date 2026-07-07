import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

export default function TransformCTA() {
    return (
        <section className="py-20 px-6 bg-[#5F9EA0]">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                    Ready to Transform Your Business?
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Let&apos;s develop a strategic roadmap that drives sustainable growth
                </p>
                <div className="flex justify-center">
                    <Link
                        href="/contact"
                        className="group relative bg-white text-[#5F9EA0] px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3"
                    >
                        Get Started Today
                        <HiArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
