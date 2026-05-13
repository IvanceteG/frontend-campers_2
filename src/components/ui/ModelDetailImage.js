"use client";

import Image from "next/image";
import { useState } from "react";
import CamperIllustration from "@/components/ui/CamperIllustration";

export default function ModelDetailImage({ src, alt, type }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl bg-background-soft">
      {!imgError ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={() => setImgError(true)}
        />
      ) : (
        <CamperIllustration className="w-full h-full" ariaLabel={alt} />
      )}
      <span className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm border border-border text-xs font-semibold px-3 py-1.5 rounded-full z-10">
        {type}
      </span>
    </div>
  );
}
