import { Outlet } from "react-router";
import { Navbar } from "../components/navbar";
import Footer from "../components/footer";

export function Layout() {
  return (
    <div className="flex justify-center">
      <div className="w-6xl">
        <header>
          <Navbar />
        </header>

        <main>
          <Outlet />
        </main>

        <footer className="bg-gray-800 py-8 text-white">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
