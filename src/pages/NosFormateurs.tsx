import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "@/supabase";
import { Loader2, Star } from "lucide-react";


type Trainer = {
  id: number;
  name: string;
  city: string | null;
  rating: number | null;          // ex: 4.7
  total_ratings: number | null;   // ex: 73
  completion_rate: number | null; // ex: 97 (%)
  specialties: string | null;     // ex: "Secourisme, Incendie, Safety Days"
  description: string | null;
  image_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export default function NosFormateurs() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [activeSpec, setActiveSpec] = useState<string>("all");

  // 1) Charger tous les formateurs publiés
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("formateurs")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (!error && data) setTrainers(data as Trainer[]);
      setLoading(false);
    })();
  }, []);

  // 2) Construire la liste des spécialités (onglets dynamiques)
  const specialties = useMemo(() => {
    const set = new Set<string>();
    trainers.forEach((t) => {
      (t.specialties ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((s) => set.add(s));
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "fr"));
  }, [trainers]);

  // 3) Filtre par onglet + recherche
  const filtered = useMemo(() => {
    let arr = trainers;

    if (activeSpec !== "all") {
      arr = arr.filter((t) =>
        (t.specialties ?? "").toLowerCase().split(",").map(s => s.trim())
          .includes(activeSpec.toLowerCase())
      );
    }

    const term = q.trim().toLowerCase();
    if (!term) return arr;

    return arr.filter((t) =>
      (t.name ?? "").toLowerCase().includes(term) ||
      (t.city ?? "").toLowerCase().includes(term) ||
      (t.specialties ?? "").toLowerCase().includes(term) ||
      (t.description ?? "").toLowerCase().includes(term)
    );
  }, [trainers, activeSpec, q]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header avec retour à l’accueil */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
            aria-label="Retour à l’accueil"
          >
            <span className="-ml-1">←</span> Retour à l’accueil
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-5 py-8">
        <h1 className="text-[#0E1A4B] font-black tracking-tight text-3xl md:text-5xl">
          Nos Formateurs
        </h1>

        {/* Onglets des spécialités */}
        <div className="mt-6 border-b border-slate-200">
          <nav className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base text-slate-700">
            <button
              onClick={() => setActiveSpec("all")}
              className={`group relative pb-3 inline-flex items-center gap-2 hover:text-slate-900 ${
                activeSpec === "all" ? "text-slate-900" : ""
              }`}
            >
              <span className="font-medium">Tous</span>
              <span
                className={`absolute -bottom-px left-0 h-[3px] rounded-full bg-[#2F6DF6] transition-all duration-300 ${
                  activeSpec === "all" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>

            {specialties.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSpec(s)}
                className={`group relative pb-3 inline-flex items-center gap-2 hover:text-slate-900 ${
                  activeSpec.toLowerCase() === s.toLowerCase() ? "text-slate-900" : ""
                }`}
              >
                <span className="font-medium">{s}</span>
                <span
                  className={`absolute -bottom-px left-0 h-[3px] rounded-full bg-[#2F6DF6] transition-all duration-300 ${
                    activeSpec.toLowerCase() === s.toLowerCase()
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </nav>
        </div>

        {/* Recherche */}
        <div className="mt-6">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un formateur, une ville, une spécialité…"
            className="w-full md:w-1/2 rounded-xl border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
          />
        </div>

        {/* Grille de cartes */}
        <div className="mt-8">
          {loading ? (
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" /> Chargement…
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-slate-600">Aucun formateur trouvé.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t) => (
                <article
                  key={t.id}
                  className="rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm hover:shadow-md transition p-5"
                >
                  {t.image_url ? (
                    <img
                      src={t.image_url}
                      alt={t.name}
                      className="w-full h-44 object-cover rounded-xl mb-4"
                    />
                  ) : (
                    <div className="w-full h-44 rounded-xl bg-slate-100 mb-4" />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-slate-900 text-lg leading-snug">
                      {t.name}
                    </h3>
                    {typeof t.rating === "number" && (
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-semibold">
                          {t.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-1 text-slate-600 text-sm">
                    {t.city ?? "Partout au Maroc"}
                  </div>

                  {/* Stats */}
                  <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-600">
                    <div>
                      <div className="font-semibold text-slate-900">Overall rating</div>
                      <div>{t.total_ratings ?? 0} avis</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Completion rate</div>
                      <div>{t.completion_rate ?? 0}%</div>
                    </div>
                  </div>

                  {/* Spécialités */}
                  {t.specialties && (
                    <div className="mt-3">
                      <div className="font-semibold text-slate-900 text-sm mb-1">
                        Spécialités :
                      </div>
                      <div className="text-sm text-slate-700">
                        {t.specialties}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {t.description && (
                    <p className="mt-3 text-sm text-slate-600 line-clamp-3">
                      {t.description}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Profil vérifié</span>
                    <a
                      href={`/formateurs/${t.id}`}
                      className="text-[#2F6DF6] text-sm font-medium hover:underline"
                    >
                      Voir le profil →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
