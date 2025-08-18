import React from "react";

/* ---------- Types ---------- */
type SafetyActivity = {
  title: string;
  description: string;
  image: string;
  tags: Array<{ label: string; color: string }>;
};

/* ---------- Card ---------- */
function SafetyActivityCard({ activity }: { activity: SafetyActivity }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200 hover:shadow-lg transition group">
      {/* Image + tags */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          className="h-full w-full object-cover transform group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {activity.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-white text-xs font-medium ${tag.color}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      {/* Texte */}
      <div className="p-6">
        <h3 className="font-semibold text-slate-900 text-[16px] leading-snug mb-2">
          {activity.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {activity.description}
        </p>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */
export default function Section5() {
  const SAFETY_ACTIVITIES: SafetyActivity[] = [
    {
      title: "Premiers secours en entreprise",
      description:
        "Formation aux gestes de premiers secours adaptés au milieu professionnel",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=400&auto=format&fit=crop",
      tags: [{ label: "Safe", color: "bg-blue-500" }],
    },
    {
      title:
        "Travail en hauteur : Optimiser sa sécurité en utilisant les EPI",
      description:
        "Maîtrise des équipements de protection individuelle pour travaux en hauteur",
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=400&auto=format&fit=crop",
      tags: [
        { label: "Safe", color: "bg-blue-500" },
        { label: "Obligatoire", color: "bg-red-500" },
      ],
    },
    {
      title:
        "Chutes de plain-pied : Connaître les risques pour éviter les accidents (métiers physiques)",
      description:
        "Prévention des chutes et accidents dans les métiers physiques",
      image:
        "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=400&auto=format&fit=crop",
      tags: [{ label: "Safe", color: "bg-blue-500" }],
    },
    {
      title:
        "Management du travail de nuit : Comment prévenir les risques professionnels",
      description:
        "Gestion des équipes et prévention des risques lors du travail de nuit",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=400&auto=format&fit=crop",
      tags: [
        { label: "Safe", color: "bg-blue-500" },
        { label: "Manager", color: "bg-gray-600" },
      ],
    },
    {
      title:
        "Travail de nuit, sécurité routière et vigilance au volant",
      description:
        "Sécurité routière et maintien de la vigilance lors des trajets de nuit",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=400&auto=format&fit=crop",
      tags: [{ label: "Safe", color: "bg-blue-500" }],
    },
    {
      title: "Éveil musculaire",
      description:
        "Exercices d'échauffement et de préparation physique avant le travail",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop",
      tags: [{ label: "Fit", color: "bg-blue-400" }],
    },
    {
      title: "Gestes et postures - Manutention manuelle",
      description:
        "Techniques de manutention et postures ergonomiques",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop",
      tags: [
        { label: "Fit", color: "bg-blue-400" },
        { label: "Obligatoire", color: "bg-red-500" },
      ],
    },
    {
      title: "Massage assis",
      description:
        "Techniques de relaxation et massage pour la détente au travail",
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=400&auto=format&fit=crop",
      tags: [{ label: "Fit", color: "bg-blue-400" }],
    },
  ];

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    /* ── SECTION 5 — Safety Days ─ */
    <section id="safety-days" className="py-16 lg:py-24 bg-slate-50 relative">
      <div className="mx-auto max-w-[1180px] px-5">
        <div className="text-center mb-12">
          <div className="text-[14px] font-semibold text-slate-500 uppercase tracking-wide mb-4">
            RECOMMANDATIONS
          </div>
          <h2 className="text-[#0E1A4B] font-black tracking-tight leading-[0.95] text-[40px] md:text-[64px] mb-4">
            <span className="text-[#0E1A4B]">Ces activités</span> fonctionnent bien pour un Safety Day
          </h2>
        </div>

        {/* Grille des activités Safety Days */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {SAFETY_ACTIVITIES.map((activity, index) => (
            <SafetyActivityCard key={index} activity={activity} />
          ))}
        </div>

        {/* Bouton d'action */}
        <div className="text-center">
          <a
            href="/safety-days"
            className="inline-flex items-center gap-2 rounded-full bg-[#2F6DF6] px-8 py-4 text-white text-[16px] font-semibold shadow-lg hover:bg-[#1E4ED8] transition"
          >
            Découvrir tous nos Safety Days
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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

      {/* Bouton flottant Remonter */}
      <button
        onClick={scrollToTop}
        aria-label="Remonter en haut de page"
        className="fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-lg transition
          bg-[#2F6DF6] text-white hover:bg-[#1E4ED8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2F6DF6]"
      >
        {/* Icône flèche vers le haut */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </section>
  );
}
