import { Dispatch, SetStateAction } from "react";

interface SearchFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priceFilter: string | null;
  setPriceFilter: Dispatch<SetStateAction<string | null>>;
}

export default function SearchFilterBar({
  searchQuery,
  setSearchQuery,
  priceFilter,
  setPriceFilter,
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by product name"
        className="border rounded-lg p-2 w-full md:w-1/2"
      />
      <div className="flex items-center gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="priceFilter"
            value="below2000"
            checked={priceFilter === 'below2000'}
            onChange={() => setPriceFilter('below2000')}
            className="mr-2"
          />
          Below ₹2000
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="priceFilter"
            value="above2000"
            checked={priceFilter === 'above2000'}
            onChange={() => setPriceFilter('above2000')}
            className="mr-2"
          />
          ₹2000 and above
        </label>
        <button
          onClick={() => setPriceFilter(null)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
}
