import React from "react";

type CategoryCardProps = {
  title: string;
  sub: string;
};

function CategoryCard({ title, sub }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow hover:shadow-md transition">
      <h3 className="font-bold text-[#0E1A4B] text-lg">{title}</h3>
      <p className="text-slate-600 text-sm">{sub}</p>
    </div>
  );
}

export default function Section2() {
  const CATEGORIES = [
    { title: "Formation SST", sub: "Apprenez les gestes qui sauvent" },
    { title: "Exercice d'évacuation", sub: "Simulez une évacuation réussie" },
    { title: "Audit sécurité", sub: "Analyse complète de vos locaux" },
    { title: "Safety Day", sub: "Journée sécurité pour vos équipes" },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1180px] px-5">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Colonne gauche - Texte */}
          <div className="max-w-[640px]">
            <h2 className="text-[#0E1A4B] font-black tracking-tight leading-[0.95] text-[48px] md:text-[70px]">
              Réservez votre <br /> thématique <br /> en quelques clics
            </h2>

            <p className="mt-6 text-slate-600 text-[18px]">
              Formation SST, Exercice d'évacuation, Audit, Safety Day...
            </p>

            <ul className="mt-7 space-y-6">
              {[
                "Trouvez le service recherché",
                "Choisissez l'expert selon votre ville",
                "Planifiez le service selon vos disponibilités",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E9EEFF] text-[#2F6DF6] font-semibold">
                    {i + 1}
                  </span>
                  <span className="text-slate-800 text-[18px]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <a
                href="#"
                className="inline-flex items-center rounded-full bg-[#2F6DF6] px-6 py-3 text-white text-[16px] font-semibold shadow-sm hover:bg-[#1E4ED8] transition"
              >
                Démarrer
              </a>
            </div>
          </div>

          {/* Colonne droite - Animations */}
          <div>
            <div className="rounded-[28px] bg-[#EAF0FF] p-6 md:p-8 overflow-hidden">
              <div className="relative h-[520px] grid grid-cols-2 gap-6">
                {/* Colonne gauche qui monte */}
                <div className="scroll-up">
                  {CATEGORIES.concat(CATEGORIES).map((c, i) => (
                    <CategoryCard key={`up-${i}`} title={c.title} sub={c.sub} />
                  ))}
                </div>

                {/* Colonne droite qui descend */}
                <div className="scroll-down">
                  {CATEGORIES.concat(CATEGORIES).map((c, i) => (
                    <CategoryCard key={`down-${i}`} title={c.title} sub={c.sub} />
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <a
                href="#"
                className="inline-flex items-center gap-2 font-semibold text-[#0E1A4B] hover:underline"
              >
                Faire une demande en ligne
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M7 4l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Animations directement dans le fichier */}
      <style jsx>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scrollDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .scroll-up {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          animation: scrollUp 20s linear infinite;
        }

        .scroll-down {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          animation: scrollDown 20s linear infinite;
        }

        .scroll-up:hover,
        .scroll-down:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
