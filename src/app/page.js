import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import Models from "@/components/sections/Models";
import Reviews from "@/components/sections/Reviews";
import ContactForm from "@/components/sections/ContactForm";
import { listModels } from "@/controllers/modelsController";

export default async function Home() {
  // Carreguem els models una sola vegada i els passem on calguin
  const { data: models } = await listModels();

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Models />
      <Reviews />
      <ContactForm models={models} />
      <Footer />
    </main>
  );
}
