"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Email o contrasenya incorrectes.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-lg">
        <h1 className="font-display text-3xl font-semibold">
          Inicia <span className="italic text-primary">sessió</span>
        </h1>
        <p className="mt-2 text-sm text-muted">
          Accedeix per publicar comentaris i gestionar reserves.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
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
              autoComplete="current-password"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
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
            {loading ? "Entrant..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-muted">
          Encara no tens compte?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline"
          >
            Registra&apos;t
          </Link>
        </p>
      </div>
    </div>
  );
}
