"use client";

import { useState } from "react";
import ModelCard from "@/components/ui/ModelCard";

/**
 * Graella de models amb toggle "veure tots / mostrar només destacats".
 * Es renderitza al costat client perquè necessita estat (useState),
 * però rep les dades ja resoltes des del Server Component pare.
 */
export default function ModelsGrid({ featured, all }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? all : featured;
  const hasMore = all.length > featured.length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visible.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground border-b-2 border-primary pb-1 hover:gap-3 transition-all"
          >
            {showAll
              ? "Mostrar només destacats"
              : `Veure tota la flota (${all.length})`}
            <span aria-hidden="true">{showAll ? "↑" : "↓"}</span>
          </button>
        </div>
      )}
    </>
  );
}
