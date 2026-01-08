import { usePinotQuery } from "../hooks/usePinotQuery";
import ChartRenderer from "./charts/ChartRenderer";
import { motion } from "framer-motion";

interface Query {
  id: number;
  title: string;
  sql: string;
  type: string;
}

interface QueryViewProps {
  query: Query;
}

export default function QueryView({ query }: QueryViewProps) {
  const { data, columnNames, loading } = usePinotQuery(query.sql);

  return (
    <div className="p-8 h-full flex flex-col bg-linear-to-br from-gray-900 via-gray-900 to-gray-800">

      {/* HEADER SECTION */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-3">
          {query.title}
        </h1>
        <div className="h-1 w-20 bg-linear-to-r from-blue-500 to-emerald-500 rounded-full"></div>
      </motion.div>

      {/* SQL SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">SQL Query</div>
        <pre className="bg-linear-to-r from-gray-900 to-gray-800 p-4 rounded-lg border border-gray-700 text-emerald-300 mb-2 text-xs overflow-x-auto shadow-lg">
          <code>{query.sql}</code>
        </pre>
      </motion.div>

      {/* CONTENT SECTION */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 overflow-hidden"
      >
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-gray-700 border-t-blue-400 rounded-full mb-4"
                />
              </div>
              <p className="text-gray-400 text-sm font-medium">Fetching data from Pinot...</p>
            </div>
          </div>
        ) : (
          <ChartRenderer type={query.type} data={data} columnNames={columnNames} />
        )}
      </motion.div>

    </div>
  );
}
