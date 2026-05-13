"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: "/#inici", label: "Inici" },
    { href: "/#models", label: "Catàleg" },
    { href: "/#opinions", label: "Opinions" },
    { href: "/#contacte", label: "Contacte" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isAuthed = status === "authenticated";
  const role = session?.user?.role;
  const isStaff = role === "EDITOR" || role === "ADMIN";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary text-card font-display font-bold text-lg group-hover:rotate-6 transition-transform"
          >
            V
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            VanLife<span className="text-primary">.</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-foreground/75 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          {isStaff && (
            <li>
              <Link
                href="/admin"
                className="text-sm font-medium text-accent hover:text-primary transition-colors"
              >
                Admin
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />

          {/* Estat de sessió */}
          {status === "loading" ? (
            <div className="hidden md:block w-20 h-9" />
          ) : isAuthed ? (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-muted">
                Hola, <strong className="text-foreground">{session.user.name?.split(" ")[0]}</strong>
              </span>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm font-medium text-foreground/75 hover:text-primary transition-colors px-3 py-2"
              >
                Sortir
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:inline-flex bg-foreground hover:bg-primary text-card font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
            >
              Iniciar sessió
            </Link>
          )}

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Tancar menú" : "Obrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card"
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden bg-card border-t border-border px-6 py-4"
        >
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {isStaff && (
              <li>
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="block py-2 text-accent hover:text-primary transition-colors"
                >
                  Admin
                </Link>
              </li>
            )}
            <li className="pt-2 border-t border-border">
              {isAuthed ? (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-full text-left py-2 text-foreground/80 hover:text-primary"
                >
                  Sortir ({session.user.name?.split(" ")[0]})
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block mt-2 bg-foreground hover:bg-primary text-card text-center font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
                >
                  Iniciar sessió
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
