"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EMPTY = {
  slug: "",
  name: "",
  type: "",
  seats: 4,
  beds: 2,
  bathroom: "",
  equipment: "",
  pricePerDay: 100,
  description: "",
  longDescription: "",
  includes: "",
  image: "",
  featured: false,
};

export default function ModelForm({ initial }) {
  const router = useRouter();
  const isEdit = !!initial;
  const [form, setForm] = useState(
    initial
      ? {
          ...initial,
          includes: (initial.includes || []).join("\n"),
        }
      : EMPTY,
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      ...form,
      seats: parseInt(form.seats, 10),
      beds: parseInt(form.beds, 10),
      pricePerDay: parseFloat(form.pricePerDay),
      includes: form.includes
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const url = isEdit ? `/api/admin/models/${initial.slug}` : "/api/admin/models";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error en guardar.");
        setLoading(false);
        return;
      }

      router.push("/admin/models");
      router.refresh();
    } catch {
      setError("Error de connexió.");
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Segur que vols eliminar "${initial.name}"?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/models/${initial.slug}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      router.push("/admin/models");
      router.refresh();
    } catch {
      setError("Error en eliminar.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Nom" value={form.name} onChange={(v) => update("name", v)} required />
        <Field label="Slug" value={form.slug} onChange={(v) => update("slug", v)} required disabled={isEdit} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Tipus" value={form.type} onChange={(v) => update("type", v)} required />
        <Field label="Preu/dia (€)" type="number" step="0.01" value={form.pricePerDay} onChange={(v) => update("pricePerDay", v)} required />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Field label="Places" type="number" value={form.seats} onChange={(v) => update("seats", v)} required />
        <Field label="Llits" type="number" value={form.beds} onChange={(v) => update("beds", v)} required />
        <Field label="Bany" value={form.bathroom} onChange={(v) => update("bathroom", v)} />
        <Field label="Equipament" value={form.equipment} onChange={(v) => update("equipment", v)} />
      </div>

      <Field label="Imatge (ruta)" value={form.image} onChange={(v) => update("image", v)} placeholder="/models/xxx.jpg" />

      <TextArea label="Descripció curta" value={form.description} onChange={(v) => update("description", v)} required rows={2} />
      <TextArea label="Descripció llarga" value={form.longDescription} onChange={(v) => update("longDescription", v)} rows={4} />
      <TextArea label="Inclou (una línia per item)" value={form.includes} onChange={(v) => update("includes", v)} rows={5} placeholder={"Roba de llit\nCuina equipada\n..."} />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => update("featured", e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-sm font-medium">Destacat a la home</span>
      </label>

      {error && (
        <p role="alert" className="text-sm font-medium bg-primary/10 text-primary px-4 py-3 rounded-lg">
          {error}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-foreground hover:bg-primary disabled:opacity-60 text-card font-semibold px-6 py-3 rounded-full transition-colors"
        >
          {loading ? "Guardant..." : isEdit ? "Guardar canvis" : "Crear model"}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="border-2 border-primary text-primary hover:bg-primary hover:text-card font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Eliminar
          </button>
        )}
      </div>
    </form>
  );
}

function Field({ label, value, onChange, type = "text", required, disabled, placeholder, step }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-2">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        type={type}
        step={step}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3, required, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-2">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
      />
    </div>
  );
}
