import { Dispatch, SetStateAction, useState } from "react";

interface SearchFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priceFilter: { min: number; max: number } | null;
  setPriceFilter: Dispatch<SetStateAction<{ min: number; max: number } | null>>;
}

export default function SearchFilterBar({
  searchQuery,
  setSearchQuery,
  priceFilter,
  setPriceFilter,
}: SearchFilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handlePriceRangeChange = (minValue: number, maxValue: number) => {
    setPriceFilter({ min: minValue, max: maxValue });
  };

  const onFilterReset = () => {
    setSearchQuery(""); // Clear the search query
    setPriceFilter(null); // Reset the price filter to its default state
    setIsFilterOpen(false); // Close the dropdown if it's open
  };

  return (
    <div className="flex flex-wrap gap-4 w-full mb-6 border p-2 rounded-lg">
      {/* Search Bar (Responsive - 100% width on small screens, 40% on large) */}
      <div className="w-full sm:w-2/5">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by product name"
          className="border p-2 w-full rounded-lg"
        />
      </div>

      {/* Price Range Filter (Responsive - 100% width on small screens, 20% on large) */}
      <div className="w-full sm:w-1/5 relative">
        <button
          onClick={() => setIsFilterOpen((prev) => !prev)}
          className="w-full bg-gray-200 text-gray-700 p-2 rounded-lg text-left"
        >
          Price: {priceFilter ? `₹${priceFilter.min} - ₹${priceFilter.max}` : "Any"}
        </button>

        {/* Price Range Dropdown */}
        {isFilterOpen && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-lg p-4 z-50">
            <div className="flex justify-between items-center">
              <div className="text-xs">
                <span>₹0</span> - <span>₹50,000</span>
              </div>
              {/* Close Button */}
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-sm font-bold ml-2"
              >
                X
              </button>
            </div>
            <div className="mt-2">
              {/* Double-ended Range Slider */}
              <input
                type="range"
                min="0"
                max="50000"
                value={priceFilter?.min || 0}
                onChange={(e) =>
                  handlePriceRangeChange(Number(e.target.value), priceFilter?.max || 50000)
                }
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="50000"
                value={priceFilter?.max || 50000}
                onChange={(e) =>
                  handlePriceRangeChange(priceFilter?.min || 0, Number(e.target.value))
                }
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Apply Filter Button (Responsive - 100% width on small screens, 20% on large) */}
      <div className="w-full sm:w-1/5">
        <button
          onClick={onFilterReset}
          className="bg-red-500 text-white p-2 rounded-lg w-full"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}