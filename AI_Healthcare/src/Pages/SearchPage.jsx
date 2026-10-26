import { useState } from "react";
import { Searching } from "../Components/Searching";
import { SearchResult } from "../Components/SearchResult";

export const SearchPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  return (
    <>
      <Searching
        setDoctors={setDoctors}
        setLoading={setLoading}
        setHasSearched={setHasSearched}
      />
      <SearchResult
        doctors={doctors}
        loading={loading}
        hasSearched={hasSearched}
      />
    </>
  );
};
