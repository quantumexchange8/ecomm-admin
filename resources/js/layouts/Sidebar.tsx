import { useState } from "react";
import { Home, User, MessageSquare, Bookmark, Folder, BarChart2, LogOut, Menu, ChevronDown, ChevronUp } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);

  return (
    <div className={`h-screen ${isOpen ? "w-64" : "w-20"} bg-gray-900 text-white transition-all duration-300`}>
      <div className="flex justify-between p-4">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>
      </div>
      <nav className="mt-5">
        <a href="/" className="flex items-center gap-4 p-3 hover:bg-gray-700">
          <Home size={20} /> {isOpen && <span>Dashboard</span>}
        </a>

        {/* Product Dropdown */}
        <div>
          <button 
            onClick={() => setIsProductOpen(!isProductOpen)} 
            className="flex items-center gap-4 p-3 w-full text-left hover:bg-gray-700"
          >
            <User size={20} />
            {isOpen && <span>Product</span>}
            {isOpen && (isProductOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
          </button>
          {isProductOpen && (
            <div className="pl-6">
              <a href="ProductListing" className="block p-2 hover:bg-gray-700">Product List</a>
              <a href="Product" className="block p-2 hover:bg-gray-700">Edit Product</a>
            </div>
          )}
        </div>

        <a href="/category" className="flex items-center gap-4 p-3 hover:bg-gray-700">
          <MessageSquare size={20} /> {isOpen && <span>Category</span>}
        </a>
        <a href="/bookmarks" className="flex items-center gap-4 p-3 hover:bg-gray-700">
          <Bookmark size={20} /> {isOpen && <span>Payment</span>}
        </a>
        <a href="/files" className="flex items-center gap-4 p-3 hover:bg-gray-700">
          <Folder size={20} /> {isOpen && <span>Address</span>}
        </a>
        <a href="/stats" className="flex items-center gap-4 p-3 hover:bg-gray-700">
          <BarChart2 size={20} /> {isOpen && <span>Shipping</span>}
        </a>
        <a href="/Main" className="flex items-center gap-4 p-3 hover:bg-gray-700">
          <MessageSquare size={20} /> {isOpen && <span>Cart</span>}
        </a>
        <a href="/bookmarks" className="flex items-center gap-4 p-3 hover:bg-gray-700">
          <Bookmark size={20} /> {isOpen && <span>Voucher</span>}
        </a>
        <a href="/files" className="flex items-center gap-4 p-3 hover:bg-gray-700">
          <Folder size={20} /> {isOpen && <span>Category</span>}
        </a>
        <a href="/stats" className="flex items-center gap-4 p-3 hover:bg-gray-700">
          <BarChart2 size={20} /> {isOpen && <span>Notification</span>}
        </a>
        <a href="/files" className="flex items-center gap-4 p-3 hover:bg-gray-700">
          <Folder size={20} /> {isOpen && <span>Wishlist</span>}
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
