import { useEffect, useState } from 'react';
import { ArrowRight, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImplements, syncImplements, Implement } from '../lib/supabase';
import ImplementCard from './ImplementCard';
import ImplementDetailsModal from './ImplementDetailsModal';

export default function Implements() {
  const [implementsList, setImplementsList] = useState<Implement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImplement, setSelectedImplement] = useState<Implement | null>(null);

  useEffect(() => {
    loadImplements();
  }, []);

  const loadImplements = async () => {
    setLoading(true);

    // First, sync implements from the source
    await syncImplements();

    // Then fetch the implements
    const data = await getImplements();
    setImplementsList(data.slice(0, 6)); // Show only 6 on homepage
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#367C2B]"></div>
            <p className="mt-4 text-gray-600">Loading implements...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#367C2B] rounded-full mb-4">
              <Wrench className="text-white" size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              John Deere Implements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete range of high-quality agricultural implements designed to maximize your tractor's productivity
            </p>
          </div>

          {implementsList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No implements available at the moment.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {implementsList.map((implement) => (
                  <ImplementCard
                    key={implement.id}
                    implement={implement}
                    onViewDetails={setSelectedImplement}
                  />
                ))}
              </div>

              <div className="text-center">
                <Link
                  to="/implements"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#367C2B] to-[#2d6523] text-white py-4 px-8 rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span>View All Implements</span>
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <ImplementDetailsModal
        implement={selectedImplement}
        onClose={() => setSelectedImplement(null)}
      />
    </>
  );
}
