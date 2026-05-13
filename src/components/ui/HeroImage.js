"use client";

import Image from "next/image";
import { useState } from "react";
import CamperIllustration from "@/components/ui/CamperIllustration";

/**
 * Imatge del Hero amb fallback a la il·lustració SVG.
 * Aïllat com a Client Component perquè Hero pugui ser Server Component.
 */
export default function HeroImage() {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <CamperIllustration
        className="w-full h-full"
        ariaLabel="Il·lustració d'una furgoneta camper al capvespre"
      />
    );
  }

  return (
    <Image
      src="/models/hero.jpg"
      alt="Furgoneta camper en un paisatge al capvespre"
      fill
      priority
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 50vw"
      onError={() => setImgError(true)}
    />
  );
}
