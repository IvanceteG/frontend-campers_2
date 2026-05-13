"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CommentsSection({ slug }) {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/models/${slug}/comments`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) {
          setComments(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  function handleNewComment(newComment) {
    setComments((prev) => [newComment, ...prev]);
  }

  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl md:text-3xl font-semibold">
        Opinions dels viatgers
      </h2>

      {/* Formulari (només per usuaris autenticats) */}
      <div className="mt-6">
        {status === "loading" ? null : session?.user ? (
          <CommentForm slug={slug} onCreated={handleNewComment} />
        ) : (
          <div className="bg-card border border-border rounded-2xl p-5 text-center">
            <p className="text-sm text-muted">
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Inicia sessió
              </Link>{" "}
              per deixar el teu comentari.
            </p>
          </div>
        )}
      </div>

      {/* Llistat */}
      <div className="mt-8 space-y-4">
        {loading ? (
          <p className="text-sm text-muted">Carregant comentaris...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-muted">
            Encara no hi ha comentaris. Sigues el primer en opinar!
          </p>
        ) : (
          comments.map((c) => <CommentCard key={c.id} comment={c} />)
        )}
      </div>
    </section>
  );
}

function CommentForm({ slug, onCreated }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/models/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, rating }),
      });
      const data = await res.json();

      if (!res.ok) {
        const firstFieldError = data.fieldErrors
          ? Object.values(data.fieldErrors)[0]
          : null;
        setError(firstFieldError || data.error || "Error en publicar.");
        setLoading(false);
        return;
      }

      onCreated(data);
      setContent("");
      setRating(5);
    } catch {
      setError("Error de connexió.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-2xl p-5 space-y-4"
    >
      <div>
        <label className="block text-sm font-semibold mb-2">Puntuació</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              className="text-2xl transition-transform hover:scale-110"
              aria-label={`${n} estrelles`}
            >
              <span className={n <= rating ? "text-primary" : "text-border"}>
                ★
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-semibold mb-2"
        >
          El teu comentari
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          required
          minLength={3}
          maxLength={1000}
          placeholder="Comparteix la teva experiència..."
          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
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
        className="bg-foreground hover:bg-primary disabled:opacity-60 text-card font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
      >
        {loading ? "Publicant..." : "Publicar comentari"}
      </button>
    </form>
  );
}

function CommentCard({ comment }) {
  const date = new Date(comment.createdAt).toLocaleDateString("ca-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-sm">
            {comment.user?.name || "Anònim"}
          </p>
          <p className="text-xs text-muted">{date}</p>
        </div>
        <div
          className="flex gap-0.5 text-primary text-sm"
          aria-label={`${comment.rating} de 5 estrelles`}
        >
          {[...Array(5)].map((_, i) => (
            <span key={i} aria-hidden="true">
              {i < comment.rating ? "★" : "☆"}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-3 text-sm text-foreground/90 leading-relaxed">
        {comment.content}
      </p>
    </article>
  );
}
