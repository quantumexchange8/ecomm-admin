import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // Define page titles based on routes
  const pageTitles: { [key: string]: string } = {
    "/dashboard": "dashboard",
    "/Product/Product": "Product",
    "/Main/Main": "Main",
    "/bookmarks": "Bookmarks",
    "/files": "Files",
    "/stats": "Stats",
    "/logout": "Logout",
  };

  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">{currentTitle}</h1>
    </header>
  );
};

export default Header;
