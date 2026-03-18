import { ArrowRight } from 'lucide-react';
import { Implement } from '../lib/supabase';

interface ImplementCardProps {
  implement: Implement;
  onViewDetails: (implement: Implement) => void;
}

export default function ImplementCard({ implement, onViewDetails }: ImplementCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={implement.image_url}
          alt={implement.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-[#367C2B] text-white px-3 py-1 rounded-full text-sm font-semibold">
          {implement.category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{implement.name}</h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {implement.short_description}
        </p>

        {implement.compatible_hp_min && implement.compatible_hp_max && (
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-700">
            <span className="font-semibold">Compatible HP:</span>
            <span>{implement.compatible_hp_min} - {implement.compatible_hp_max} HP</span>
          </div>
        )}

        <button
          onClick={() => onViewDetails(implement)}
          className="w-full bg-gradient-to-r from-[#367C2B] to-[#2d6523] text-white py-3 px-6 rounded-lg font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <span>View Full Details</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
