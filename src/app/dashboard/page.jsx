"use client";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* =====================================================
   STATIC DATA (Later replace with API / Redux / Query)
   ===================================================== */

const moveStats = {
  avgStartTime: 18.5, // minutes
  avgCompletionTime: 42.2, // minutes
  activeMovesChange: 22, // %
  blockedMovesChange: -8, // %
};

const movesFlowData = [
  { month: "Jan", created: 120, completed: 95 },
  { month: "Feb", created: 150, completed: 130 },
  { month: "Mar", created: 180, completed: 160 },
  { month: "Apr", created: 170, completed: 150 },
  { month: "May", created: 210, completed: 190 },
];

const moveDurationTrend = [
  { day: "Mon", value: 35 },
  { day: "Tue", value: 42 },
  { day: "Wed", value: 38 },
  { day: "Thu", value: 50 },
  { day: "Fri", value: 45 },
];

// ===== UPDATED STATIC DATA FOR PIECHARTS =====
const moveTypes = [
  { name: "Automation", value: 120 },
  { name: "Manual", value: 80 },
  { name: "AI-Driven", value: 50 },
];

const moveLifecycle = [
  { name: "New", value: 90 },
  { name: "Reworked", value: 30 },
];

const movesPerDay = [
  { day: "Mon", value: 60 },
  { day: "Tue", value: 85 },
  { day: "Wed", value: 70 },
  { day: "Thu", value: 95 },
  { day: "Fri", value: 80 },
];

const COLORS = ["#38BDF8", "#A855F7", "#F472B6"];

export default function MoveMatrixDashboard() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-gray-200 p-6 space-y-6">

      {/* ===================== TOP METRICS ===================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
          <p className="text-sm text-white/80">Avg Move Start Time</p>
          <h2 className="text-3xl font-bold text-white">
            {moveStats.avgStartTime} min
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500">
          <p className="text-sm text-white/80">Avg Move Completion Time</p>
          <h2 className="text-3xl font-bold text-white">
            {moveStats.avgCompletionTime} min
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800">
          <p className="text-sm text-gray-400">Active Moves</p>
          <p className="text-xl text-green-400 font-semibold">
            +{moveStats.activeMovesChange}%
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800">
          <p className="text-sm text-gray-400">Blocked Moves</p>
          <p className="text-xl text-red-400 font-semibold">
            {moveStats.blockedMovesChange}%
          </p>
        </div>
      </div>

      {/* ===================== FLOW ANALYTICS ===================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Created vs Completed */}
        <div className="lg:col-span-2 bg-[#111827] border border-gray-800 rounded-2xl p-5">
          <p className="text-sm mb-4">Moves Created vs Completed</p>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={movesFlowData}>
              <XAxis dataKey="month" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="created"
                stroke="#38BDF8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#A855F7"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Duration Trend */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5">
          <p className="text-sm mb-4">Move Duration Trend</p>

          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={moveDurationTrend}>
              <XAxis dataKey="day" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#38BDF8"
                fill="#38BDF8"
                fillOpacity={0.25}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===================== DISTRIBUTIONS ===================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Move Types */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5">
          <p className="text-sm mb-4">Move Types Distribution</p>

          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={moveTypes}
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                label={(entry) => `${entry.name}: ${entry.value}`}
              >
                {moveTypes.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Lifecycle */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5">
          <p className="text-sm mb-4">Move Lifecycle</p>

          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={moveLifecycle}
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                label={(entry) => `${entry.name}: ${entry.value}`}
              >
                <Cell fill="#38BDF8" />
                <Cell fill="#A855F7" />
              </Pie>
              <Tooltip formatter={(value) => `${value}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Workload */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5">
          <p className="text-sm mb-4">Moves Per Day</p>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={movesPerDay}>
              <XAxis dataKey="day" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#38BDF8"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
