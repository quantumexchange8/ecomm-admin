import Header from "@/layouts/settings/Header";
import Sidebar from "@/layouts/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Main() {
  return (
    <Router>
      <div className="flex">
        <Sidebar/>
        <div className="flex-1">
          <Header />
          <div className="p-6">
           main
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Main;
