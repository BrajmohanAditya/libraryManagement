import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CalendarDays,
  CreditCard,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userLogoutHook } from "../hooks/user.hook";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { mutate: triggerLogout } = userLogoutHook();

  const handleLogout = () => {
    triggerLogout(null, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Libraries", icon: BookOpen },
    { name: "Students", icon: Users },
    { name: "Bookings", icon: CalendarDays },
    { name: "Features", icon: CalendarDays },

    { name: "Sheets", icon: CreditCard },
    { name: "Feedback", icon: MessageSquare },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="w-72 h-screen bg-white border-r border-gray-100 flex flex-col">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-200 flex items-center justify-center text-white font-bold text-xl">
            L
          </div>

          <div>
            <h2 className="font-bold text-xl">Library Admin</h2>
            <p className="text-xs text-gray-400 uppercase">System Control</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;

          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </div>

              {isActive && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
