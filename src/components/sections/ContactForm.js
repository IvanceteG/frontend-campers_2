"use client";

import { useState } from "react";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  modelSlug: "",
  pickupDate: "",
  returnDate: "",
  message: "",
};

export default function ContactForm({ models = [] }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ type: null, message: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/contact-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // Si tenim errors per camp, mostrem el primer
        const firstFieldError = data.fieldErrors
          ? Object.values(data.fieldErrors)[0]
          : null;
        setStatus({
          type: "error",
          message: firstFieldError || data.error || "Hi ha hagut un error.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: "Sol·licitud enviada! Et contactarem aviat.",
      });
      setForm(INITIAL_FORM);
    } catch {
      setStatus({
        type: "error",
        message: "Error de connexió. Torna-ho a provar.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <section
      id="contacte"
      className="relative py-24 bg-background-soft overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"
      />

      <div className="relative max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
            <span aria-hidden="true">✦</span> Contacta
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold leading-tight">
            Comencem a planejar el{" "}
            <span className="italic text-primary">teu viatge</span>.
          </h2>
          <p className="mt-4 text-muted">
            Omple el formulari i et respondrem en menys de 24 hores.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-card border border-border rounded-3xl p-6 md:p-10 space-y-5 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="Nom"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="El teu nom complet"
              required
            />
            <Field
              label="Correu electrònic"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="exemple@correu.com"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="Telèfon"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="601 075 409"
            />
            <div>
              <label
                htmlFor="modelSlug"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Model d&apos;interès
              </label>
              <select
                id="modelSlug"
                name="modelSlug"
                value={form.modelSlug}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="">Qualsevol</option>
                {models.map((m) => (
                  <option key={m.slug} value={m.slug}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="Data de recollida"
              name="pickupDate"
              type="date"
              value={form.pickupDate}
              onChange={handleChange}
              min={today}
            />
            <Field
              label="Data de tornada"
              name="returnDate"
              type="date"
              value={form.returnDate}
              onChange={handleChange}
              min={form.pickupDate || today}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Missatge <span className="text-primary">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              required
              placeholder="Explica'ns quan vols viatjar, on i quantes persones sou..."
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>

          {status.type && (
            <p
              role="status"
              aria-live="polite"
              className={`text-sm font-medium px-4 py-3 rounded-lg ${
                status.type === "error"
                  ? "bg-primary/10 text-primary"
                  : "bg-accent/15 text-accent"
              }`}
            >
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-foreground hover:bg-primary disabled:opacity-60 disabled:cursor-not-allowed text-card font-semibold py-3.5 rounded-full transition-colors inline-flex items-center justify-center gap-2"
          >
            {submitting ? "Enviant..." : "Comprova disponibilitat"}
            {!submitting && <span aria-hidden="true">→</span>}
          </button>

          <p className="text-xs text-muted text-center">
            En enviar acceptes la nostra política de privacitat.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-foreground mb-2"
      >
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      />
    </div>
  );
}
