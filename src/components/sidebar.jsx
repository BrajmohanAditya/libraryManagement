import React from 'react';
import { 
  Image as ImageIcon, 
  Zap, 
  Cloud, 
  Monitor, 
  Calendar, 
  ClipboardList, 
  Key, 
  Award, 
  LogOut, 
  ChevronRight, 
  ChevronDown 
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: ImageIcon, label: 'Banner Management', hasDropdown: false },
    { icon: Zap, label: 'Super Stream', hasDropdown: true },
    { icon: Cloud, label: 'Stream', hasDropdown: true },
    { icon: Monitor, label: 'Course Management', hasDropdown: true },
    { icon: Calendar, label: 'Live Event', hasDropdown: true },
    { icon: ClipboardList, label: 'Course Assignment', hasDropdown: true },
    { icon: Key, label: 'Permissions', hasDropdown: true, isHovered: true },
    { icon: Award, label: 'Teacher Management', hasDropdown: false, isActive: true },
  ];

  return (
    <div className="w-[300px] h-screen bg-[#131c6a] text-white flex flex-col font-sans">
      
      {/* Top Header - Admin Panel */}
      <div className="p-6 flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-xl font-bold">
              A
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#131c6a] rounded-full"></div>
          </div>
          <div>
            <h2 className="text-lg font-bold">Admin Panel</h2>
            <p className="text-sm text-blue-200">admin</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-blue-300" />
      </div>

      <div className="h-[1px] bg-white/10 w-full mb-4"></div>

      {/* User Profile Card */}
      <div className="mx-4 mb-6 p-4 bg-[#1f2a7a] rounded-2xl border border-white/5 flex items-center gap-4 shadow-sm">
        <div className="relative">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vishal&backgroundColor=b6e3f4" 
            alt="Profile" 
            className="w-12 h-12 rounded-xl object-cover bg-white"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#1f2a7a] rounded-full"></div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-white">vishal kumar</span>
          <span className="text-xs text-blue-200">vishal97@gmail.com</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-4 space-y-1 pb-4 scrollbar-thin">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between px-4 py-3.5 rounded-xl cursor-pointer transition-colors ${
              item.isActive 
                ? 'bg-[#2563eb] text-white shadow-md' 
                : item.isHovered
                  ? 'bg-[#212b7a] text-white'
                  : 'text-blue-100 hover:bg-[#212b7a]'
            }`}
          >
            <div className="flex items-center gap-4">
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            {item.hasDropdown && (
              <ChevronDown className="w-4 h-4 text-blue-200" />
            )}
          </div>
        ))}
      </div>

      {/* Logout Section */}
      <div className="mt-auto">
        <div className="h-[1px] bg-white/10 w-full"></div>
        <div className="p-4 px-8 cursor-pointer text-blue-100 hover:text-white flex items-center gap-4 hover:bg-[#212b7a] transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
