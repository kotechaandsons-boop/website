import { Phone, MessageCircle, Info, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tractor } from '../lib/supabase';
import { cardAnimation } from '../utils/animations';

interface TractorCardProps {
  tractor: Tractor;
  onViewDetails: (tractor: Tractor) => void;
}

export default function TractorCard({ tractor, onViewDetails }: TractorCardProps) {
  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in the John Deere ${tractor.model} (${tractor.hp} HP - ${tractor.drive}). Please provide more details.`;
    window.open(`https://wa.me/918007291999?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+918007291999';
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      variants={cardAnimation}
      whileHover={{
        y: -8,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      }}
    >
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={tractor.image_url}
          alt={`John Deere ${tractor.model}`}
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {tractor.is_new && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1 animate-pulse">
            <Sparkles size={14} />
            NEW
          </div>
        )}
        <div className="absolute top-3 right-3 bg-[#367C2B] text-white px-3 py-1 rounded-full text-sm font-semibold">
          {tractor.hp} HP
        </div>
        <div className={`absolute ${tractor.is_new ? 'top-12' : 'top-3'} left-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold`}>
          {tractor.drive}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          John Deere {tractor.model}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Type:</span>
            <span className="font-semibold text-gray-900">{tractor.type}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Rear Tyre:</span>
            <span className="font-semibold text-gray-900">{tractor.rear_tyre_size}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tractor.description}
        </p>

        <div className="flex gap-2 mb-3">
          <motion.button
            onClick={handleCall}
            className="flex-1 bg-[#367C2B] text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-[#2d6523] transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone size={18} />
            <span>Call Now</span>
          </motion.button>
          <motion.button
            onClick={handleWhatsApp}
            className="flex-1 bg-green-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={18} />
            <span>WhatsApp</span>
          </motion.button>
        </div>

        <motion.button
          onClick={() => onViewDetails(tractor)}
          className="w-full bg-yellow-400 text-gray-900 py-2.5 px-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Info size={18} />
          <span>View Full Details</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
