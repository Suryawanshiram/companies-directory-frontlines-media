import { useDispatch } from "react-redux";
import "./App.css";
import CompaniesList from "./components/CompaniesList";
import Copyright from "./components/CopyRight";
import { fetchCompanies } from "./features/companies.slice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);
  return (
    <>
      <Copyright name={"Ram Suryawanshi"} />
      <div className="min-h-screen bg-gray-50 py-8 overflow-y-hidden">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🏢 Companies List Assignment - by Ram Suryawanshi
        </h1>
        <CompaniesList />
      </div>
    </>
  );
}

export default App;
