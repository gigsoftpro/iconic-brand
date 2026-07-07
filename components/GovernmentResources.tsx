import { getGovernmentResources } from '@/lib/internal-links';

interface GovernmentResourcesProps {
  count?: number;
  className?: string;
}

export default function GovernmentResources({ 
  count = 4,
  className = ""
}: GovernmentResourcesProps) {
  const resources = getGovernmentResources(count);

  return (
    <section className={`py-8 md:py-12 px-4 md:px-6 bg-gray-100 border-t border-gray-200 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h3 className="text-lg md:text-xl font-bold text-black mb-1 md:mb-2">
            Official Business Resources
          </h3>
          <p className="text-gray-600 text-xs md:text-sm">
            Trusted government sources for business information and support
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg border border-gray-200 p-3 md:p-4 hover:border-blue-300 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                <svg 
                  className="w-3 h-3 md:w-4 md:h-4 text-blue-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
                <span className="text-[10px] md:text-xs text-blue-600 font-medium">.gov</span>
              </div>
              <h4 className="font-semibold text-black group-hover:text-blue-700 transition-colors text-xs md:text-sm mb-0.5 md:mb-1">
                {resource.text}
              </h4>
              <p className="text-[10px] md:text-xs text-gray-600 group-hover:text-gray-700 transition-colors hidden md:block">
                {resource.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}