import Link from "next/link";

// Footer amb colors fixos (no canvia entre mode clar i fosc).
// Usem valors literals en comptes de variables CSS perquè
// el tema fosc no l'afecti.
const DARK_BG = "#1a1410";
const DARK_BG_SOFT = "#241c17";
const DARK_FG = "#f5ede0";
const DARK_MUTED = "#9c8f80";
const DARK_BORDER = "#3d322a";
const PRIMARY = "#ea580c";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="pt-16 pb-8"
      style={{ backgroundColor: DARK_BG, color: DARK_FG }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b"
          style={{ borderColor: DARK_BORDER }}
        >
          {/* Branding */}
          <div className="md:col-span-2 max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full font-display font-bold text-lg"
                style={{ backgroundColor: PRIMARY, color: DARK_BG_SOFT }}
              >
                V
              </span>
              <span className="font-display text-xl font-semibold">
                VanLife<span style={{ color: PRIMARY }}>.</span>
              </span>
            </Link>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: DARK_MUTED }}
            >
              Lloguer de furgonetes camper per descobrir la natura sense
              renunciar a la comoditat.
            </p>
          </div>

          {/* Enllaços */}
          <div>
            <h3
              className="font-display text-sm uppercase tracking-wider mb-4"
              style={{ color: DARK_MUTED }}
            >
              Navegació
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inici" className="footer-link">
                  Inici
                </a>
              </li>
              <li>
                <a href="#models" className="footer-link">
                  Catàleg
                </a>
              </li>
              <li>
                <a href="#opinions" className="footer-link">
                  Opinions
                </a>
              </li>
              <li>
                <a href="#contacte" className="footer-link">
                  Contacte
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className="font-display text-sm uppercase tracking-wider mb-4"
              style={{ color: DARK_MUTED }}
            >
              Contacta
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: DARK_FG }}>
              <li>hola@vanlife.cat</li>
              <li>+34 601 075 409</li>
              <li>Barcelona, ES</li>
            </ul>
          </div>
        </div>

        {/* Línia inferior */}
        <div
          className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs"
          style={{ color: DARK_MUTED }}
        >
          <p>© {year} VanLife Rentals. Tots els drets reservats.</p>
          <div className="flex gap-6">
            <span>Pagament 100% segur</span>
            <span>Cancel·lació flexible</span>
            <span>Suport 24/7</span>
          </div>
        </div>
      </div>

      {/* Estils per als enllaços (hover amb color primari) */}
      <style>{`
        .footer-link {
          color: ${DARK_FG};
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: ${PRIMARY};
        }
      `}</style>
    </footer>
  );
}
