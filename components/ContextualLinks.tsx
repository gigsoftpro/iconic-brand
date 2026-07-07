import Link from 'next/link';
import { getContextualLinks, InternalLink } from '@/lib/internal-links';

interface ContextualLinksProps {
  currentPath: string;
  title?: string;
  count?: number;
  className?: string;
}

export default function ContextualLinks({ 
  currentPath, 
  title = "Related Services & Locations",
  count = 8,
  className = ""
}: ContextualLinksProps) {
  const links = getContextualLinks(currentPath, count);

  if (links.length === 0) return null;

  return (
    <section className={`py-12 md:py-16 px-4 md:px-6 bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-3 md:mb-4">{title}</h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Explore our comprehensive business solutions and global presence
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="group bg-white rounded-lg md:rounded-xl border border-gray-200 p-4 md:p-6 hover:border-[#D5AF34] hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-2 md:gap-3">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D5AF34] rounded-full mt-1.5 md:mt-2 group-hover:bg-[#C19A2E] transition-colors flex-shrink-0"></div>
                <div>
                  <h3 className="font-bold text-sm md:text-base text-black group-hover:text-[#D5AF34] transition-colors mb-1 md:mb-2">
                    {link.text}
                  </h3>
                  {link.description && (
                    <p className="text-xs md:text-sm text-gray-600 group-hover:text-gray-700 transition-colors hidden md:block">
                      {link.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}