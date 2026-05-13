"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        const firstFieldError = data.fieldErrors
          ? Object.values(data.fieldErrors)[0]
          : null;
        setError(firstFieldError || data.error || "Error en crear el compte.");
        setLoading(false);
        return;
      }

      // Auto-login després del registre
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      router.push("/");
      router.refresh();
    } catch {
      setError("Error de connexió. Torna-ho a provar.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-lg">
        <h1 className="font-display text-3xl font-semibold">
          Crea el <span className="italic text-primary">teu compte</span>
        </h1>
        <p className="mt-2 text-sm text-muted">
          Registra&apos;t per publicar comentaris als models.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Nom
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Correu electrònic
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Contrasenya
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <p className="mt-1 text-xs text-muted">
              Mínim 8 caràcters.
            </p>
          </div>

          {error && (
            <p
              role="alert"
              className="text-sm font-medium bg-primary/10 text-primary px-4 py-3 rounded-lg"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-foreground hover:bg-primary disabled:opacity-60 text-card font-semibold py-3.5 rounded-full transition-colors"
          >
            {loading ? "Creant compte..." : "Crear compte"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-muted">
          Ja tens compte?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Inicia sessió
          </Link>
        </p>
      </div>
    </div>
  );
}
