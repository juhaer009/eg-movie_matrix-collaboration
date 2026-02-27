// "use client";

// import React from "react";
// import {
//   FaThLarge,
//   FaProjectDiagram,
//   FaPlayCircle,
//   FaPauseCircle,
//   FaCheckCircle,
//   FaRoute,
//   FaChartBar,
//   FaFireAlt,
//   FaUserCircle,
//   FaCog,
//   FaSignOutAlt,
// } from "react-icons/fa";

// const Sidebar = ({ isOpen }) => {
//   return (
//     <aside
//       className={`${
//         isOpen ? "w-64" : "w-20"
//       } min-h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}
//     >
//       {/* Logo */}
//       <div className="flex items-center gap-3 px-4 py-6">
//         <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
//           M
//         </div>

//         {isOpen && (
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800">Move Matrix</h2>
//             <p className="text-xs text-gray-500">Flow Intelligence</p>
//           </div>
//         )}
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 px-2 space-y-1">
//         <SidebarItem
//           icon={<FaThLarge />}
//           label="Overview"
//           isOpen={isOpen}
//           active
//         />

//         <SidebarItem
//           icon={<FaProjectDiagram />}
//           label="Move Matrix"
//           isOpen={isOpen}
//         />

//         <SidebarItem
//           icon={<FaPlayCircle />}
//           label="Active Moves"
//           badge="12"
//           isOpen={isOpen}
//         />

//         <SidebarItem
//           icon={<FaPauseCircle />}
//           label="Pending / Blocked"
//           badge="4"
//           isOpen={isOpen}
//         />

//         <SidebarItem
//           icon={<FaCheckCircle />}
//           label="Completed Moves"
//           isOpen={isOpen}
//         />

//         <SidebarItem icon={<FaRoute />} label="Flow Designer" isOpen={isOpen} />

//         <SidebarItem
//           icon={<FaChartBar />}
//           label="Move Analytics"
//           isOpen={isOpen}
//         />

//         <SidebarItem icon={<FaFireAlt />} label="Heat Map" isOpen={isOpen} />
//       </nav>

//       {/* Bottom Section */}
//       <div className="px-2 py-4 border-t border-gray-200 space-y-1">
//         <SidebarItem icon={<FaUserCircle />} label="Profile" isOpen={isOpen} />

//         <SidebarItem icon={<FaCog />} label="Settings" isOpen={isOpen} />

//         <SidebarItem
//           icon={<FaSignOutAlt />}
//           label="Logout"
//           danger
//           isOpen={isOpen}
//         />
//       </div>
//     </aside>
//   );
// };

// const SidebarItem = ({ icon, label, badge, active, danger, isOpen }) => {
//   return (
//     <div
//       className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition
//         ${
//           danger
//             ? "text-red-600 hover:bg-red-50"
//             : active
//               ? "bg-indigo-600 text-white"
//               : "text-gray-600 hover:bg-gray-100"
//         }`}
//     >
//       <div className="flex items-center gap-3">
//         <span className="text-lg">{icon}</span>

//         {isOpen && <span className="text-sm font-medium">{label}</span>}
//       </div>

//       {badge && isOpen && (
//         <span
//           className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
//             active ? "bg-white text-indigo-600" : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           {badge}
//         </span>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

"use client";

import React from "react";
import {
  FaThLarge,
  FaProjectDiagram,
  FaPlayCircle,
  FaPauseCircle,
  FaCheckCircle,
  FaRoute,
  FaChartBar,
  FaFireAlt,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } min-h-screen bg-gray-900 text-gray-200 border-r border-gray-800
      flex flex-col transition-all duration-300
      dark:bg-gray-900 dark:text-gray-200
      light:bg-white light:text-gray-800`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
          M
        </div>

        {isOpen && (
          <div>
            <h2 className="text-lg font-semibold">Move Matrix</h2>
            <p className="text-xs text-gray-400">Flow Intelligence</p>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 space-y-1">
        <SidebarItem
          icon={<FaThLarge />}
          label="Overview"
          isOpen={isOpen}
          active
        />
        <SidebarItem
          icon={<FaProjectDiagram />}
          label="Move Matrix"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<FaPlayCircle />}
          label="Active Moves"
          badge="12"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<FaPauseCircle />}
          label="Pending / Blocked"
          badge="4"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<FaCheckCircle />}
          label="Completed Moves"
          isOpen={isOpen}
        />
        <SidebarItem icon={<FaRoute />} label="Flow Designer" isOpen={isOpen} />
        <SidebarItem
          icon={<FaChartBar />}
          label="Move Analytics"
          isOpen={isOpen}
        />
        <SidebarItem icon={<FaFireAlt />} label="Heat Map" isOpen={isOpen} />
      </nav>

      {/* Bottom Section */}
      <div className="px-2 py-4 border-t border-gray-800 space-y-1">
        <SidebarItem icon={<FaUserCircle />} label="Profile" isOpen={isOpen} />
        <SidebarItem icon={<FaCog />} label="Settings" isOpen={isOpen} />
        <SidebarItem
          icon={<FaSignOutAlt />}
          label="Logout"
          danger
          isOpen={isOpen}
        />
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, badge, active, danger, isOpen }) => {
  return (
    <div
      className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all
        ${
          danger
            ? "text-red-400 hover:bg-red-900/30"
            : active
              ? "bg-indigo-600 text-white"
              : "text-gray-300 hover:bg-gray-800"
        }
        dark:hover:bg-gray-800
        light:text-gray-600 light:hover:bg-gray-100`}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        {isOpen && <span className="text-sm font-medium">{label}</span>}
      </div>

      {badge && isOpen && (
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-semibold
            ${active ? "bg-white text-indigo-600" : "bg-gray-700 text-gray-200"}`}
        >
          {badge}
        </span>
      )}
    </div>
  );
};

export default Sidebar;
