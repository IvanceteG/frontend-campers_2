import Link from "next/link";
import { auth } from "@/lib/auth";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata = {
  title: "Admin — VanLife Rentals",
};

export default async function AdminLayout({ children }) {
  const session = await auth();
  const role = session?.user?.role;
  const isAdmin = role === "ADMIN";

  return (
    <main className="relative min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Panel d&apos;administració · {role}
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold">
              Hola, <span className="italic text-primary">{session?.user?.name}</span>
            </h1>
          </header>

          <nav className="mb-10 flex flex-wrap gap-2 border-b border-border pb-2">
            <AdminLink href="/admin">Resum</AdminLink>
            <AdminLink href="/admin/models">Models</AdminLink>
            <AdminLink href="/admin/contact-requests">Sol·licituds</AdminLink>
            {isAdmin && <AdminLink href="/admin/users">Usuaris</AdminLink>}
          </nav>

          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
}

function AdminLink({ href, children }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm font-medium rounded-full hover:bg-background-soft hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
}
