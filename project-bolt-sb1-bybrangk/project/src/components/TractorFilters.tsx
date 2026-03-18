import { Filter } from 'lucide-react';

interface TractorFiltersProps {
  selectedHpRange: string;
  selectedDrive: string;
  selectedSeries: string;
  onHpRangeChange: (range: string) => void;
  onDriveChange: (drive: string) => void;
  onSeriesChange: (series: string) => void;
  onReset: () => void;
}

export default function TractorFilters({
  selectedHpRange,
  selectedDrive,
  selectedSeries,
  onHpRangeChange,
  onDriveChange,
  onSeriesChange,
  onReset,
}: TractorFiltersProps) {
  const hasActiveFilters = selectedHpRange || selectedDrive || selectedSeries;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="text-[#367C2B]" size={24} />
        <h3 className="text-xl font-bold text-gray-900">Filter Tractors</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            HP Range
          </label>
          <select
            value={selectedHpRange}
            onChange={(e) => onHpRangeChange(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#367C2B] transition-colors"
          >
            <option value="">All HP</option>
            <option value="0-40">0 - 40 HP</option>
            <option value="41-50">41 - 50 HP</option>
            <option value="51-65">51 - 65 HP</option>
            <option value="66-80">66 - 80 HP</option>
            <option value="81-200">81+ HP</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Drive Type
          </label>
          <select
            value={selectedDrive}
            onChange={(e) => onDriveChange(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#367C2B] transition-colors"
          >
            <option value="">All Drives</option>
            <option value="2WD">2WD</option>
            <option value="4WD">4WD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tractor Series
          </label>
          <select
            value={selectedSeries}
            onChange={(e) => onSeriesChange(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#367C2B] transition-colors"
          >
            <option value="">All Series</option>
            <option value="5M-Series">5M-Series (130 HP)</option>
            <option value="E-Series">E-Series (50-74 HP)</option>
            <option value="D-Series">D-Series (36-50 HP)</option>
          </select>
        </div>

        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={onReset}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
