import { FaTachometerAlt, FaStore, FaThLarge, FaFlag, FaFileAlt, FaWpforms, FaChartBar, FaTable, FaIcons, FaMap, FaBook, FaLayerGroup, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import React from "react";
import axios from "axios";

export function Topbar() {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});


    const toggleSection = (section: string) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };
    
    const handleLogout = async () => {
        try {
            await axios.post("/logout");
            localStorage.removeItem("authToken");
            sessionStorage.clear();
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <aside className="fixed h-screen w-64 bg-gray-900 text-gray-200 flex flex-col p-5 shadow-lg">
            <div className="mb-6 text-center flex items-center gap-3">
                <img src="/image/current.png" alt="logo" className="h-8" />
                <span className="text-lg font-semibold">Philbert</span>
            </div>
            <nav className="flex flex-col flex-1 space-y-2">
                <p className="text-xs text-gray-400 uppercase mt-2">Main</p>
                <NavLink to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700">
                    <FaTachometerAlt /> Dashboard
                </NavLink>
                <NavLink to="/ecommerce" className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-700">
                    <div className="flex items-center gap-3"><FaStore /> E-Commerce</div>
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Hot</span>
                </NavLink>
                <NavLink to="/apps" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700">
                    <FaThLarge /> Apps
                </NavLink>
                <NavLink to="/widgets" className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-700">
                    <div className="flex items-center gap-3"><FaFlag /> Widgets</div>
                    <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full">New</span>
                </NavLink>

                <p className="text-xs text-gray-400 uppercase mt-4">Component</p>
                {['UI Elements', 'Forms', 'Charts', 'Tables', 'Icons', 'Maps'].map((item, index) => (
                    <button key={index} onClick={() => toggleSection(item)} className="flex items-center justify-between px-4 py-3 w-full text-left rounded-lg hover:bg-gray-700">
                        <div className="flex items-center gap-3">{index === 0 ? <FaFileAlt /> : index === 1 ? <FaWpforms /> : index === 2 ? <FaChartBar /> : index === 3 ? <FaTable /> : index === 4 ? <FaIcons /> : <FaMap />} {item}</div>
                        <FaChevronDown className={openSections[item] ? "rotate-180" : ""} />
                    </button>
                ))}

                <p className="text-xs text-gray-400 uppercase mt-4">Featured</p>
                {['Special Pages', 'Documentation', 'Multilevel'].map((item, index) => (
                    <button key={index} className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg hover:bg-gray-700">
                        {index === 0 ? <FaBook /> : index === 1 ? <FaFileAlt /> : <FaLayerGroup />} {item}
                    </button>
                ))}
            </nav>
            <div className="mt-auto">
                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-lg">
                    <FaTachometerAlt /> Log out
                </button>
            </div>
        </aside>
    );
}

export default Topbar;
