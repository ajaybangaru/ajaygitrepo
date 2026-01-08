import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, ResponsiveContainer, Cell
} from "recharts";
import { motion } from "framer-motion";

const COLORS = [
  "#3B82F6", "#10B981", "#F59E0B", "#EF4444",
  "#8B5CF6", "#EC4899", "#14B8A6", "#F97316"
];

interface ChartRendererProps {
  type: string;
  data: (number | string | Record<string, number | string>)[][];
  columnNames?: string[];
}

export default function ChartRenderer({ type, data, columnNames = [] }: ChartRendererProps) {

  if (type === "stat") {
    const count = (data[0]?.[0] as number | undefined);
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="h-full flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm uppercase tracking-widest text-gray-400 mb-6 font-semibold"
          >
            Total Count
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            className="text-9xl font-black bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg"
          >
            {count?.toLocaleString()}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex gap-2 justify-center"
          >
            <div className="h-1 w-12 bg-linear-to-r from-blue-400 to-cyan-400 rounded-full"></div>
            <div className="h-1 w-12 bg-linear-to-r from-cyan-400 to-emerald-400 rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (type === "bar") {
    const chartData = data.map(([key, value]: (number | string | Record<string, number | string>)[]) => ({
      name: String(key),
      value: parseInt(String(value)) || 0
    }));

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full flex flex-col"
      >
        <div className="text-sm uppercase tracking-widest text-gray-400 mb-4 font-semibold">
          Distribution Analysis
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 80 }}>
            <defs>
              <linearGradient id="barGradientBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#1E40AF" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="barGradientGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#047857" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="#374151" opacity={0.3} />
            <XAxis
              dataKey="name"
              stroke="#9CA3AF"
              angle={-45}
              textAnchor="end"
              height={100}
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "2px solid #374151",
                borderRadius: "12px",
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.5)"
              }}
              formatter={(value) => (typeof value === 'number' ? value.toLocaleString() : value)}
              labelStyle={{ color: "#E5E7EB" }}
            />
            <Bar dataKey="value" radius={[12, 12, 0, 0]} fill="url(#barGradientBlue)">
              {chartData.map((_, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} opacity={0.85} />
              ))}
            </Bar>
          </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    );
  }

  if (type === "line") {
    const chartData = data.map(([key, value]: (number | string | Record<string, number | string>)[]) => ({
      name: String(key),
      value: parseFloat(String(value)) || 0
    }));

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full flex flex-col"
      >
        <div className="text-sm uppercase tracking-widest text-gray-400 mb-4 font-semibold">
          Trend Analysis
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 80 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.1} />
              </linearGradient>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3" />
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="#374151" opacity={0.3} />
            <XAxis
              dataKey="name"
              stroke="#9CA3AF"
              angle={-45}
              textAnchor="end"
              height={100}
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "2px solid #10B981",
                borderRadius: "12px",
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.5)"
              }}
              formatter={(value) => (typeof value === 'number' ? value.toFixed(2) : value)}
              labelStyle={{ color: "#E5E7EB" }}
            />
            <Line
              type="natural"
              dataKey="value"
              stroke="#10B981"
              strokeWidth={4}
              dot={{ fill: "#10B981", r: 5, strokeWidth: 2, stroke: "#ffffff" }}
              activeDot={{ r: 8, strokeWidth: 2 }}
              filter="url(#shadow)"
            />
          </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    );
  }

  // Table rendering
  if (type === "table") {
    if (!data || data.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center h-full text-gray-400"
        >
          <div className="text-center">
            <div className="text-gray-500 mb-2">📊</div>
            <p>No data available</p>
          </div>
        </motion.div>
      );
    }

    const headers = columnNames.length > 0 ? columnNames : (() => {
      const row = data[0];
      if (!Array.isArray(row)) return [];

      const headerMap: Record<number, string> = {
        0: "userId",
        1: "eventType",
        2: "value",
        3: "timestamp",
        4: "count",
        5: "avg_value"
      };

      return row.map((_, i: number) => headerMap[i] || `Column ${i + 1}`);
    })();
    const maxRows = 10;
    const displayData = data.slice(0, maxRows);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full h-full flex flex-col"
      >
        <div className="text-sm uppercase tracking-widest text-gray-400 mb-4 font-semibold">
          Data Records {data.length > maxRows && `(showing ${maxRows} of ${data.length})`}
        </div>
        <div className="flex-1 overflow-x-auto overflow-y-auto rounded-xl border border-gray-700 bg-linear-to-br from-gray-800 to-gray-900">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-linear-to-r from-blue-900 to-emerald-900 sticky top-0 z-10">
                {headers.map((header, i) => (
                  <th
                    key={i}
                    className="px-6 py-4 text-left text-sm font-bold text-blue-100 border-b border-gray-700 whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayData.map((row: (number | string | Record<string, number | string>)[], rowIdx: number) => (
                <motion.tr
                  key={rowIdx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: rowIdx * 0.05 }}
                  className={`transition-all duration-200 border-b border-gray-700 hover:bg-gray-700 hover:shadow-md ${rowIdx % 2 === 0 ? "bg-gray-800" : "bg-gray-750"
                    }`}
                >
                  {row.map((cell: number | string | Record<string, number | string>, cellIdx: number) => (
                    <td
                      key={cellIdx}
                      className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap"
                    >
                      {typeof cell === "number" && cell > 1000000000
                        ? new Date(cell).toLocaleString()
                        : typeof cell === "number"
                          ? cell.toLocaleString()
                          : String(cell)}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center h-full text-gray-400"
    >
      <div className="text-center">
        <div className="text-2xl mb-2">⚠️</div>
        <p>Unknown chart type: {type}</p>
      </div>
    </motion.div>
  );
}
