import RegisterForm from "./RegisterForm";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata = {
  title: "Crear compte — VanLife Rentals",
};

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-32 px-6 bg-grain">
        <RegisterForm />
      </div>
      <Footer />
    </main>
  );
}
