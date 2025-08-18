import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "@/supabase";
import { Category, Formation } from "@/types/database";
import { Loader2 } from "lucide-react";

export default function NosFormations() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeSlug, setActiveSlug] = useState<string>("all"); // <-- par défaut: tout
  const [items, setItems] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");

  // Charger les catégories
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("order_index", { ascending: true });
      if (!error && data) setCategories(data);
    })();
  }, []);

  // Charger les formations selon l’onglet actif
  useEffect(() => {
    (async () => {
      setLoading(true);

      if (activeSlug === "all") {
        // Toutes les formations publiées
        const { data, error } = await supabase
          .from("formations")
          .select("*")
          .eq("is_published", true)
          .order("created_at", { ascending: false });
        if (!error && data) setItems(data);
        setLoading(false);
        return;
      }

      // Filtre par catégorie
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", activeSlug)
        .single();

      const { data, error } = await supabase
        .from("formations")
        .select("*")
        .eq("category_id", cat?.id ?? -1)
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (!error && data) setItems(data);
      setLoading(false);
    })();
  }, [activeSlug]);

  // Recherche locale
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter(
      (f) =>
        f.title.toLowerCase().includes(term) ||
        (f.city ?? "").toLowerCase().includes(term) ||
        (f.short_desc ?? "").toLowerCase().includes(term)
    );
  }, [items, q]);

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

      {/* Contenu */}
      <main className="mx-auto max-w-[1180px] px-5 py-8">
        <h1 className="text-[#0E1A4B] font-black tracking-tight text-3xl md:text-5xl">
          Nos Formations
        </h1>

        {/* Onglets */}
        <div className="mt-6 border-b border-slate-200">
          <nav className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base text-slate-700">
            {/* Onglet "Toutes nos formations" */}
            <button
              onClick={() => setActiveSlug("all")}
              className={`group relative pb-3 inline-flex items-center gap-2 hover:text-slate-900 ${
                activeSlug === "all" ? "text-slate-900" : ""
              }`}
            >
              <span className="font-medium">Toutes nos formations</span>
              <span
                className={`absolute -bottom-px left-0 h-[3px] rounded-full bg-[#2F6DF6] transition-all duration-300 ${
                  activeSlug === "all" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>

            {/* Autres catégories depuis la BDD */}
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveSlug(c.slug)}
                className={`group relative pb-3 inline-flex items-center gap-2 hover:text-slate-900 ${
                  activeSlug === c.slug ? "text-slate-900" : ""
                }`}
              >
                <span className="font-medium">{c.name}</span>
                <span
                  className={`absolute -bottom-px left-0 h-[3px] rounded-full bg-[#2F6DF6] transition-all duration-300 ${
                    activeSlug === c.slug ? "w-full" : "w-0 group-hover:w-full"
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
            placeholder="Rechercher une formation ou une ville…"
            className="w-full md:w-1/2 rounded-xl border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
          />
        </div>

        {/* Grille */}
        <div className="mt-8">
          {loading ? (
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" /> Chargement…
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-slate-600">Aucune formation trouvée.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((f) => (
                <article
                  key={f.id}
                  className="rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm hover:shadow-md transition p-5"
                >
                  {f.image_url ? (
                    <img
                      src={f.image_url}
                      alt={f.title}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                  ) : (
                    <div className="w-full h-40 rounded-xl bg-slate-100 mb-4" />
                  )}
                  <h3 className="font-semibold text-slate-900 text-lg leading-snug">
                    {f.title}
                  </h3>
                  <div className="mt-1 text-slate-600 text-sm">
                    {f.city ?? "Partout au Maroc"}
                  </div>
                  {f.short_desc && (
                    <p className="mt-3 text-sm text-slate-600 line-clamp-3">
                      {f.short_desc}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {f.duration_days ? `${f.duration_days} jours` : "Durée variable"}
                    </span>
                    <a
                      href={`/formations/${f.id}`}
                      className="text-[#2F6DF6] text-sm font-medium hover:underline"
                    >
                      Voir la fiche →
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
