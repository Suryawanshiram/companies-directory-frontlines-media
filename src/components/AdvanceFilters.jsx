import React from "react";

const AdvanceFilters = ({
  nameFilter,
  setNameFilter,
  industryFilter,
  setIndustryFilter,
  locationFilter,
  setLocationFilter,
  sortOption,
  setSortOption,
  industries,
  locations,
}) => {
  return (
    <div className="w-full md:w-64 p-4 bg-white rounded-xl shadow-md space-y-4">
      <div>
        {/* {SEARCH FILTERS} */}
        <label className="text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          placeholder="Search..."
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {/* {Company List sort options} */}
      <div>
        <label className="text-sm font-medium text-gray-700">Industry</label>
        <select
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Industries</option>
          {industries?.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>
      {/* {Location filter} */}
      <div>
        <label className="text-sm font-medium text-gray-700">Location</label>
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Locations</option>
          {locations?.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      {/* {Sort options} */}
      <div>
        <label className="text-sm font-medium text-gray-700">Sort By</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Default</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="employees-asc">Employees (Low-High)</option>
          <option value="employees-desc">Employees (High-Low)</option>
        </select>
      </div>
    </div>
  );
};

export default AdvanceFilters;
