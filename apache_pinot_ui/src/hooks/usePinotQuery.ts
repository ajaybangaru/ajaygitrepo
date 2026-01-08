import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";

type QueryData = (number | string | Record<string, number | string>)[][];

interface PinotResponse {
  resultTable: {
    dataSchema?: {
      columnNames: string[];
    };
    rows: QueryData;
  };
}

export function usePinotQuery(sql: string) {
  const [data, setData] = useState<QueryData>([]);
  const [columnNames, setColumnNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.post<PinotResponse>("http://localhost:8080/api/pinot/query/sql", { sql });
      setData(res.data.resultTable.rows || []);
      setColumnNames(res.data.resultTable.dataSchema?.columnNames || []);
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [sql]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, columnNames, loading };
}
