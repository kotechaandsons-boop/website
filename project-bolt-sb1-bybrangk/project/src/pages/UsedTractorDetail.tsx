import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Phone, MessageCircle, ArrowLeft } from 'lucide-react';

interface Tractor {
  id: string;
  brand: string;
  model: string;
  description: string;
  image_url: string;
  is_available: boolean;
}

export default function UsedTractorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tractor, setTractor] = useState<Tractor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTractor(id);
    }
  }, [id]);

  const fetchTractor = async (tractorId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('used_tractors')
      .select('*')
      .eq('id', tractorId)
      .eq('is_available', true)
      .maybeSingle();

    if (!error && data) {
      setTractor(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#367C2B]"></div>
      </div>
    );
  }

  if (!tractor) {
    return (
      <div className="min-h-screen flex flex-col pt-24">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Tractor Not Found</h1>
            <p className="text-gray-600 mb-6">This tractor may no longer be available.</p>
            <button
              onClick={() => navigate('/used-tractors')}
              className="px-6 py-3 bg-[#367C2B] text-white rounded-lg hover:bg-[#2d6624] transition-colors"
            >
              Browse Available Tractors
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate('/used-tractors')}
          className="flex items-center gap-2 text-[#367C2B] hover:text-[#2d6624] font-semibold mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Used Tractors
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96 md:h-full">
              <img
                src={tractor.image_url}
                alt={`${tractor.brand} ${tractor.model}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-yellow-400 text-[#367C2B] px-4 py-2 rounded-full font-bold">
                Used Tractor
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="mb-6">
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                  {tractor.brand}
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {tractor.model}
                </h1>
                <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold mb-6">
                  Available Now
                </div>
              </div>

              {tractor.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-600 leading-relaxed">{tractor.description}</p>
                </div>
              )}

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Contact Us for Enquiry</h2>

                <a
                  href="tel:+918007291999"
                  className="flex items-center justify-center gap-3 w-full bg-[#367C2B] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#2d6624] transition-colors"
                >
                  <Phone size={24} />
                  Call Now: 8007291999
                </a>

                <a
                  href={`https://wa.me/918007291999?text=Hi, I'm interested in the ${tractor.brand} ${tractor.model}. Please provide more details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#20BA5A] transition-colors"
                >
                  <MessageCircle size={24} />
                  WhatsApp Enquiry
                </a>
              </div>

              <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">Why Choose Us?</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#367C2B] rounded-full"></div>
                    Quality certified pre-owned tractors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#367C2B] rounded-full"></div>
                    Best prices in the market
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#367C2B] rounded-full"></div>
                    Expert guidance and support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#367C2B] rounded-full"></div>
                    Multiple locations across Bihar
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
