import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GrammarService from "../services/GrammarService";
import { fetchDatabaseData, initializeDatabase } from "../utils/indexedDB";
const useGrammarData = () => {
  const [grammarData, setGrammarData] = useState();
  const [loadingGrammarData, setLoadingGrammarData] = useState(true);
  const navigate = useNavigate();
  const fetchGrammarData = async () => {
    try {
      // * Check if the data is already in the store
      const dbData = await fetchDatabaseData(1);
      if (dbData) {
        setGrammarData(dbData);
        setLoadingGrammarData(false);
        return;
      }
      // * If the data is not in the store
      setLoadingGrammarData(true);
      GrammarService.getAll()
        .then((res) => {
          setGrammarData(res.data);
          initializeDatabase(1, res.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            navigate("/landing");
          }
          console.error("Fetch error:", error);
        });
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoadingGrammarData(false);
    }
  };
  useEffect(() => {
    fetchGrammarData();
  }, []);
  return { grammarData, loadingGrammarData };
};
export default useGrammarData;
