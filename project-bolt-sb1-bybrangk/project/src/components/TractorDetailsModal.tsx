import { X, Phone, MessageCircle, Settings, Gauge, Cog, Droplet, Wrench, Weight } from 'lucide-react';
import { Tractor } from '../lib/supabase';

interface TractorDetailsModalProps {
  tractor: Tractor | null;
  onClose: () => void;
}

export default function TractorDetailsModal({ tractor, onClose }: TractorDetailsModalProps) {
  if (!tractor) return null;

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in the John Deere ${tractor.model} (${tractor.hp} HP - ${tractor.drive}). Please provide more details and pricing.`;
    window.open(`https://wa.me/918007291999?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+918007291999';
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full my-8 shadow-2xl">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X size={24} className="text-gray-700" />
          </button>

          <div className="relative h-96 overflow-hidden rounded-t-2xl bg-gray-100">
            <img
              src={tractor.image_url}
              alt={`John Deere ${tractor.model}`}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-[#367C2B] to-[#2d6523] text-white p-4 rounded-xl">
              <h2 className="text-3xl font-bold mb-1">John Deere {tractor.model}</h2>
              <p className="text-lg opacity-90">{tractor.hp} HP • {tractor.drive} • {tractor.type}</p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">About This Tractor</h3>
              <p className="text-gray-700 leading-relaxed">{tractor.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Specifications</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
                  <div className="bg-[#367C2B] p-2 rounded-lg">
                    <Settings className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Engine</p>
                    <p className="font-semibold text-gray-900">{tractor.engine}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
                  <div className="bg-[#367C2B] p-2 rounded-lg">
                    <Cog className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Transmission</p>
                    <p className="font-semibold text-gray-900">{tractor.transmission}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
                  <div className="bg-[#367C2B] p-2 rounded-lg">
                    <Gauge className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">PTO</p>
                    <p className="font-semibold text-gray-900">{tractor.pto}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
                  <div className="bg-[#367C2B] p-2 rounded-lg">
                    <Wrench className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Hydraulics</p>
                    <p className="font-semibold text-gray-900">{tractor.hydraulics}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
                  <div className="bg-[#367C2B] p-2 rounded-lg">
                    <Droplet className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Fuel Tank</p>
                    <p className="font-semibold text-gray-900">{tractor.fuel_tank}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
                  <div className="bg-[#367C2B] p-2 rounded-lg">
                    <Weight className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Weight</p>
                    <p className="font-semibold text-gray-900">{tractor.weight}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Additional Features</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#367C2B] rounded-full"></div>
                  <span>Rear Tyre: {tractor.rear_tyre_size}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#367C2B] rounded-full"></div>
                  <span>Drive Type: {tractor.drive}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#367C2B] rounded-full"></div>
                  <span>Transmission: {tractor.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#367C2B] rounded-full"></div>
                  <span>Power: {tractor.hp} HP</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCall}
                className="flex-1 bg-[#367C2B] text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-[#2d6523] transition-colors flex items-center justify-center gap-3"
              >
                <Phone size={24} />
                <span>Call Now: +91 80072 91999</span>
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex-1 bg-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-3"
              >
                <MessageCircle size={24} />
                <span>WhatsApp Enquiry</span>
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-4">
              Visit our showrooms in Beed or Jalna for test drive and best pricing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
