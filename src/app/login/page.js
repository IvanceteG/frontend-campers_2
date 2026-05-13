import LoginForm from "./LoginForm";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata = {
  title: "Iniciar sessió — VanLife Rentals",
};

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-32 px-6 bg-grain">
        <LoginForm />
      </div>
      <Footer />
    </main>
  );
}
