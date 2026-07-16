import { IconType } from 'react-icons';
import { FaExternalLinkAlt } from 'react-icons/fa';

type ResourceLinkCardProps = {
  label: string;
  url: string;
  icon: IconType;
};

export default function ResourceLinkCard({ label, url, icon: Icon }: ResourceLinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="flex items-center gap-3 bg-white rounded-xl p-4 shadow hover:shadow-lg transition-shadow border border-transparent hover:border-[#D5AF34]"
    >
      <Icon className="text-[#D5AF34] text-xl flex-shrink-0" />
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <FaExternalLinkAlt className="ml-auto text-gray-300 text-xs flex-shrink-0" />
    </a>
  );
}
