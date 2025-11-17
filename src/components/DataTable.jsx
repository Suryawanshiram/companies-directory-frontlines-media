import { useState, useEffect, useRef } from "react";

const CHUNK_SIZE = 20;
const LOAD_DELAY = 500;

const DataTable = ({ companies }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const containerRef = useRef(null);

  const closeModal = () => setSelectedCompany(null);
  // For infinite scroll
  const loadMore = () => {
    if (isLoadingMore) return;
    if (visibleCount < companies.length) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((prev) =>
          Math.min(prev + CHUNK_SIZE, companies.length)
        );
        setIsLoadingMore(false);
      }, LOAD_DELAY);
    }
  };

  const handleContainerScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 50) loadMore();
  };

  const handleWindowScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 100
    ) {
      loadMore();
    }
  };

  // For mobile devices
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleContainerScroll, {
        passive: true,
      });
    }
    window.addEventListener("scroll", handleWindowScroll, { passive: true });

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleContainerScroll);
      }
      window.removeEventListener("scroll", handleWindowScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount, companies.length, isLoadingMore]);

  const visibleCompanies = companies.slice(0, visibleCount);

  if (!companies || companies.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 font-medium">
        No companies found.
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="h-full overflow-y-auto"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* {HIDE IN MOBILE DEVICES} */}
        <div className="hidden md:block overflow-x-auto rounded-xl shadow-sm border border-gray-200 bg-white">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">ID</th>
                <th className="px-6 py-3 text-left font-semibold">Company</th>
                <th className="px-6 py-3 text-left font-semibold">Industry</th>
                <th className="px-6 py-3 text-left font-semibold">Location</th>
                <th className="px-6 py-3 text-left font-semibold">Employees</th>
              </tr>
            </thead>
            <tbody>
              {visibleCompanies.map((company) => (
                <tr
                  key={company.id}
                  className="border-b hover:bg-blue-50 transition-colors duration-200 even:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedCompany(company)}
                >
                  <td className="px-6 py-4 text-gray-700">{company.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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

        {/* {SHOW IN MOBILE DEVICES} */}
        <div className="md:hidden space-y-4">
          {visibleCompanies.map((company) => (
            <div
              key={company.id}
              className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedCompany(company)}
            >
              <p className="text-sm text-gray-500 mb-1">ID: {company.id}</p>
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
      </div>

      {isLoadingMore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      )}
      {/* {MODAL FOR SELECTED COMPANY} */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-white/30 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          <div className="relative bg-white rounded-xl shadow-lg p-6 w-80 z-10">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>
            <p className="text-sm text-gray-500 mb-1">
              ID: {selectedCompany.id}
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {selectedCompany.name}
            </h2>
            <p className="text-gray-600 mb-1">{selectedCompany.industry}</p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">📍 Location:</span>
              {selectedCompany.location}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">👥 Employees:</span>
              {selectedCompany.employees}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
