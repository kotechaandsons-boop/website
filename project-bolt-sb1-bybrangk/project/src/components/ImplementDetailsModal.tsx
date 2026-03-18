import { X, Phone, MessageCircle, Wrench, Gauge, Settings, CheckCircle } from 'lucide-react';
import { Implement } from '../lib/supabase';

interface ImplementDetailsModalProps {
  implement: Implement | null;
  onClose: () => void;
}

export default function ImplementDetailsModal({ implement, onClose }: ImplementDetailsModalProps) {
  if (!implement) return null;

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in the John Deere ${implement.name}. Please provide more details and pricing.`;
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
              src={implement.image_url}
              alt={implement.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-[#367C2B] to-[#2d6523] text-white p-4 rounded-xl">
              <h2 className="text-3xl font-bold mb-1">{implement.name}</h2>
              <p className="text-lg opacity-90">{implement.category}</p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">About This Implement</h3>
              <p className="text-gray-700 leading-relaxed">{implement.full_description}</p>
            </div>

            {implement.compatible_hp_min && implement.compatible_hp_max && (
              <div className="mb-6 bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-[#367C2B] p-2 rounded-lg">
                    <Gauge className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Compatible Tractor Power</p>
                    <p className="text-lg font-bold text-gray-900">
                      {implement.compatible_hp_min} - {implement.compatible_hp_max} HP
                    </p>
                  </div>
                </div>
              </div>
            )}

            {implement.specifications && Object.keys(implement.specifications).length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Specifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(implement.specifications).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
                      <div className="bg-[#367C2B] p-2 rounded-lg">
                        <Settings className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{key}</p>
                        <p className="font-semibold text-gray-900">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {implement.features && implement.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {implement.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                      <CheckCircle className="text-[#367C2B] flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl mb-6">
              <div className="flex items-start gap-3">
                <Wrench className="text-[#367C2B] flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why Choose John Deere Implements?
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    John Deere implements are engineered to work seamlessly with John Deere tractors,
                    ensuring optimal performance, durability, and efficiency. Built with premium materials
                    and backed by our expert service team.
                  </p>
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
              Visit our showrooms in Beed or Jalna to see our implements range
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
