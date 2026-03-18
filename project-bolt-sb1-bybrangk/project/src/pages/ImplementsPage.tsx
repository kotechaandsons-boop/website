import { useEffect, useState } from 'react';
import { Wrench, Filter } from 'lucide-react';
import ImplementCard from '../components/ImplementCard';
import ImplementDetailsModal from '../components/ImplementDetailsModal';
import { getImplements, getImplementsByCategory, syncImplements, Implement } from '../lib/supabase';

export default function ImplementsPage() {
  const [implementsList, setImplementsList] = useState<Implement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImplement, setSelectedImplement] = useState<Implement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    loadImplements();
  }, []);

  const loadImplements = async () => {
    setLoading(true);

    // First, sync implements from the source
    await syncImplements();

    // Then fetch all implements
    const data = await getImplements();
    setImplementsList(data);

    // Extract unique categories
    const uniqueCategories = ['All', ...new Set(data.map(impl => impl.category))];
    setCategories(uniqueCategories);

    setLoading(false);
  };

  const handleCategoryFilter = async (category: string) => {
    setSelectedCategory(category);
    setLoading(true);

    if (category === 'All') {
      const data = await getImplements();
      setImplementsList(data);
    } else {
      const data = await getImplementsByCategory(category);
      setImplementsList(data);
    }

    setLoading(false);
  };

  return (
    <div>
      <main>
        <section className="py-12 bg-gradient-to-r from-[#367C2B] to-[#2d6523] text-white">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
                <Wrench className="text-white" size={40} />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                John Deere Implements
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Complete range of high-quality agricultural implements designed to maximize productivity
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-6">
              <Filter className="text-[#367C2B]" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">Filter by Category</h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#367C2B] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-[#367C2B]"></div>
                <p className="mt-4 text-gray-600 text-lg">Loading implements...</p>
              </div>
            ) : implementsList.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">No implements found in this category.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="text-gray-600 text-lg">
                    Showing <span className="font-bold text-[#367C2B]">{implementsList.length}</span> {selectedCategory !== 'All' ? selectedCategory : ''} implements
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {implementsList.map((implement) => (
                    <ImplementCard
                      key={implement.id}
                      implement={implement}
                      onViewDetails={setSelectedImplement}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-yellow-50 to-yellow-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Need Help Choosing the Right Implement?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Our expert team is ready to help you select the perfect implement for your farming needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+918007291999"
                className="bg-[#367C2B] text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-[#2d6523] transition-colors"
              >
                Call: +91 80072 91999
              </a>
              <a
                href="https://wa.me/918007291999?text=Hi,%20I%20need%20help%20choosing%20the%20right%20implement"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <ImplementDetailsModal
        implement={selectedImplement}
        onClose={() => setSelectedImplement(null)}
      />
    </div>
  );
}
