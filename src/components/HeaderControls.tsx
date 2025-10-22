import { Search, Plus, Grid, List } from 'lucide-react';

interface Props {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  viewMode: 'table' | 'card';
  setViewMode: (val: 'table' | 'card') => void;
  onAdd: () => void;
}

export const HeaderControls = ({ searchTerm, setSearchTerm, viewMode, setViewMode, onAdd }: Props) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
    <div className="relative flex-1 w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Search by name, email, or phone..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
      />
    </div>

    <div className="flex gap-2">
      <button
        onClick={() => setViewMode('table')}
        className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}
      >
        <List size={20} />
      </button>
      <button
        onClick={() => setViewMode('card')}
        className={`p-2 rounded-lg ${viewMode === 'card' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}
      >
        <Grid size={20} />
      </button>
    </div>

    <button onClick={onAdd} className="bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2">
      <Plus size={20} /> Add Contact
    </button>
  </div>
);
