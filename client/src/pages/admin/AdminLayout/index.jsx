 
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../AdminSidebar';
import { Menu } from 'lucide-react'; // or use any icon

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative h-screen flex flex-col lg:flex-row bg-[#F4F3FF] overflow-hidden">
      {/* Mobile hamburger button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded shadow"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu />
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar toggle wrapper – design untouched */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full w-[280px] transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
        `}
      >
        <AdminSidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
