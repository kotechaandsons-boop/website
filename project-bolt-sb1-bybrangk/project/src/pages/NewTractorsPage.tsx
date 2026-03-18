import { useState, useEffect } from 'react';
import { RefreshCw, Loader2 } from 'lucide-react';
import TractorCard from '../components/TractorCard';
import TractorDetailsModal from '../components/TractorDetailsModal';
import TractorFilters from '../components/TractorFilters';
import { getTractors, syncTractors, Tractor } from '../lib/supabase';

export default function NewTractorsPage() {
  const [tractors, setTractors] = useState<Tractor[]>([]);
  const [filteredTractors, setFilteredTractors] = useState<Tractor[]>([]);
  const [selectedTractor, setSelectedTractor] = useState<Tractor | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const [selectedHpRange, setSelectedHpRange] = useState('');
  const [selectedDrive, setSelectedDrive] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');

  useEffect(() => {
    loadTractors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tractors, selectedHpRange, selectedDrive, selectedSeries]);

  const loadTractors = async () => {
    setLoading(true);
    const data = await getTractors();
    setTractors(data);
    setLoading(false);
  };

  const handleSync = async () => {
    setSyncing(true);
    await syncTractors();
    await loadTractors();
    setSyncing(false);
  };

  const applyFilters = () => {
    let filtered = [...tractors];

    if (selectedHpRange) {
      const [min, max] = selectedHpRange.split('-').map(Number);
      filtered = filtered.filter(t => {
        if (max) {
          return t.hp >= min && t.hp <= max;
        } else {
          return t.hp >= min;
        }
      });
    }

    if (selectedDrive) {
      filtered = filtered.filter(t => t.drive === selectedDrive);
    }

    if (selectedSeries) {
      filtered = filtered.filter(t => t.series === selectedSeries);
    }

    setFilteredTractors(filtered);
  };

  const handleResetFilters = () => {
    setSelectedHpRange('');
    setSelectedDrive('');
    setSelectedSeries('');
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="text-center mb-12 relative bg-cover bg-center rounded-xl overflow-hidden py-16"
          style={{ backgroundImage: 'url(/WhatsApp_Image_2026-03-12_at_10.09.13.jpeg)' }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              John Deere Tractors
            </h1>
            <div className="w-24 h-1 bg-[#367C2B] mx-auto mb-4"></div>
            <p className="text-lg text-white max-w-2xl mx-auto mb-6">
              Browse our complete range of authentic John Deere tractors with official images and specifications
            </p>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="inline-flex items-center gap-2 bg-[#367C2B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2d6523] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {syncing ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Syncing with John Deere...</span>
                </>
              ) : (
                <>
                  <RefreshCw size={20} />
                  <span>Sync Latest Models</span>
                </>
              )}
            </button>
          </div>
        </div>

        <TractorFilters
          selectedHpRange={selectedHpRange}
          selectedDrive={selectedDrive}
          selectedSeries={selectedSeries}
          onHpRangeChange={setSelectedHpRange}
          onDriveChange={setSelectedDrive}
          onSeriesChange={setSelectedSeries}
          onReset={handleResetFilters}
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={48} className="animate-spin text-[#367C2B]" />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-lg text-gray-700">
                Showing <span className="font-bold">{filteredTractors.length}</span> tractor
                {filteredTractors.length !== 1 ? 's' : ''}
              </p>
            </div>

            {filteredTractors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No tractors match your filters.</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 text-[#367C2B] font-semibold hover:underline"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTractors.map((tractor) => (
                  <TractorCard
                    key={tractor.id}
                    tractor={tractor}
                    onViewDetails={setSelectedTractor}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <TractorDetailsModal
        tractor={selectedTractor}
        onClose={() => setSelectedTractor(null)}
      />
    </div>
  );
}
