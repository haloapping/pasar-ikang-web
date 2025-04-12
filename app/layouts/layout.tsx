import { Outlet } from "react-router";
import { Navbar } from "../components/navbar";
import Footer from "../components/footer";

export default function Layout() {
  return (
    <div className="flex justify-center">
      <div className="w-6xl">
        <header>
          <Navbar />
        </header>

        <main>
          <Outlet />
        </main>

        <footer className="py-8">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
