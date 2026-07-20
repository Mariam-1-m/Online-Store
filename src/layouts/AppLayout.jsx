import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


function AppLayout() {
  return (
   <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-12">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;