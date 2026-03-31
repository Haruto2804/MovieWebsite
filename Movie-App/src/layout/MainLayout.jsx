import Header from "./Header";
import Footer from "./Footer";
import {Outlet} from 'react-router-dom'
import { Sidebar } from "lucide-react";
const MainLayout = () => {
  return (
    <div className = "flex flex-col min-h-screen bg-zinc-950 text-white">
      <Header />
      {/* flex: 1 giúp phần main tự giãn ra để đẩy Footer xuống đáy */}
      <main className="px-5 md:px-4 lg:px-10 flex flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout