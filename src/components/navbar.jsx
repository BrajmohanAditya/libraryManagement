import React from 'react';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="w-full h-[72px] bg-[#f0f2f5] flex items-center justify-end px-8 border-b border-gray-200">
      
      {/* Profile Dropdown Button */}
      <div className="flex items-center gap-3 bg-white pl-2 pr-4 py-1.5 rounded-full cursor-pointer shadow-sm border border-gray-100 hover:shadow-md transition-all">
        <img 
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vishal&backgroundColor=b6e3f4" 
          alt="Profile" 
          className="w-9 h-9 rounded-full object-cover bg-blue-50"
        />
        <span className="text-sm font-medium text-gray-700">vishal kumar</span>
        <ChevronDown className="w-4 h-4 text-gray-500 ml-1" />
      </div>
      
    </div>
  );
};

export default Navbar;
