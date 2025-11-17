import { useRef } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompanies } from "../features/companies.slice";
import AdvanceFilters from "./AdvanceFilters";
// import useFetch from "../hooks/useFetch";

const CHUNK_SIZE = 20;
const LOAD_DELAY = 500;

const CompaniesList = () => {
  const dispatch = useDispatch();
  // custom Hook
  // const { data, loading, error } = useFetch("/api/companies");
  const { data, error, status } = useSelector((state) => state.companies);

  const [nameFilter, setNameFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const industries = data ? [...new Set(data.map((c) => c.industry))] : [];
  const locations = data ? [...new Set(data.map((c) => c.location))] : [];

  let filteredData = data || [];

  if (nameFilter) {
    filteredData = filteredData.filter((c) =>
      c.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }
  if (industryFilter) {
    filteredData = filteredData.filter((c) => c.industry === industryFilter);
  }
  if (locationFilter) {
    filteredData = filteredData.filter((c) => c.location === locationFilter);
  }

  let filteredSortedData = [...filteredData];
  if (sortOption === "name-asc")
    filteredSortedData.sort((a, b) => a.name.localeCompare(b.name));
  if (sortOption === "name-desc")
    filteredSortedData.sort((a, b) => b.name.localeCompare(a.name));
  if (sortOption === "employees-asc")
    filteredSortedData.sort((a, b) => a.employees - b.employees);
  if (sortOption === "employees-desc")
    filteredSortedData.sort((a, b) => b.employees - a.employees);

  const visibleCompanies = filteredSortedData.slice(0, visibleCount);

  // handle scroll for infinite scroll
  const handleScroll = () => {
    if (!containerRef.current || isLoadingMore) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      if (visibleCount < filteredSortedData.length) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setVisibleCount((prev) =>
            Math.min(prev + CHUNK_SIZE, filteredSortedData.length)
          );
          setIsLoadingMore(false);
        }, LOAD_DELAY);
      }
    }
  };

  // handle scroll for mobile devices
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredSortedData.length, isLoadingMore, visibleCount]);

  // handle scroll for desktop devices
  useEffect(() => {
    const onWindowScroll = () => {
      if (isLoadingMore) return;
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        if (visibleCount < filteredSortedData.length) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(prev + CHUNK_SIZE, filteredSortedData.length)
            );
            setIsLoadingMore(false);
          }, LOAD_DELAY);
        }
      }
    };

    window.addEventListener("scroll", onWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", onWindowScroll);
  }, [filteredSortedData.length, visibleCount, isLoadingMore]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center py-6 text-red-600 font-medium">
        Error loading data: {error}
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 p-4 space-y-4 md:space-y-0 md:space-x-4">
      {/* {ADVANCE FILTERS FOR DESKTOP DEVICES} */}
      <AdvanceFilters
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        industryFilter={industryFilter}
        setIndustryFilter={setIndustryFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
        industries={industries}
        locations={locations}
      />
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto md:h-screen rounded-xl"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {visibleCompanies.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No companies found.</p>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto rounded-xl shadow-sm border border-gray-200 bg-white">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-base">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-base">
                      Industry
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-base">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-base">
                      Employees
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleCompanies.map((company) => (
                    <tr
                      key={company.id}
                      className="border-b hover:bg-blue-50 transition-colors duration-200 even:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedCompany(company)}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {company.name}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {company.industry}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {company.location}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {company.employees}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {visibleCompanies.map((company) => (
                <div
                  key={company.id}
                  className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => setSelectedCompany(company)}
                >
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-600">{company.industry}</p>
                  <div className="mt-2 text-sm text-gray-700 space-y-1">
                    <p>
                      <span className="font-medium">📍 Location:</span>{" "}
                      {company.location}
                    </p>
                    <p>
                      <span className="font-medium">👥 Employees:</span>{" "}
                      {company.employees}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {isLoadingMore && (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
          </>
        )}
      </div>
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-white/30 backdrop-blur-sm"
            onClick={() => setSelectedCompany(null)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-lg p-6 w-80 z-10">
            <button
              onClick={() => setSelectedCompany(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {selectedCompany.name}
            </h2>
            <p className="text-gray-600 mb-1">{selectedCompany.industry}</p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">📍 Location:</span>{" "}
              {selectedCompany.location}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">👥 Employees:</span>{" "}
              {selectedCompany.employees}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesList;
