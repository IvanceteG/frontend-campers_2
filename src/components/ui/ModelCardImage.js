"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Imatge d'una targeta de model amb fallback elegant.
 * S'aïlla com a Client Component perquè ModelCard pugui ser Server Component.
 */
export default function ModelCardImage({ src, alt, name }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return <Placeholder name={name} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-500"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      onError={() => setImgError(true)}
    />
  );
}

function Placeholder({ name }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
      <span className="font-display text-6xl font-bold text-primary/60">
        {initial}
      </span>
    </div>
  );
}
