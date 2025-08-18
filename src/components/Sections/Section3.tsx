import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import supabase from "@/supabase";
import { Category, Formation } from "@/types/database";

type CardProps = {
  category?: string;
  title: string;
  subtitle: string;
};

function Card({ category, title, subtitle }: CardProps) {
  return (
    <div className="min-w-[280px] bg-white rounded-xl p-5 shadow hover:shadow-md transition">
      {category && (
        <span className="text-xs font-bold uppercase text-[#2F6DF6]">
          {category}
        </span>
      )}
      <h3 className="mt-2 font-bold text-[#0E1A4B] text-lg">{title}</h3>
      <p className="text-slate-600 text-sm">{subtitle}</p>
    </div>
  );
}

export default function Section3() {
  // Onglets issus de la BDD
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // Formations de la catégorie active
  const [items, setItems] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(false);

  // Charger les catégories (onglets)
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("order_index", { ascending: true });
      if (!error && data) {
        setCategories(data);
        setActiveSlug((prev) => prev ?? data[0]?.slug ?? null);
      }
    })();
  }, []);

  // Charger les formations selon l’onglet actif
  useEffect(() => {
    if (!activeSlug) return;
    (async () => {
      setLoading(true);
      // Récupérer l'ID de la catégorie
      const { data: cat } = await supabase
        .from("categories")
        .select("id, name")
        .eq("slug", activeSlug)
        .single();

      // Charger les formations publiées de cette catégorie
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

  // Convertir les formations en CardProps pour réutiliser le même rendu
  const cards: CardProps[] = useMemo(() => {
    // Récupérer le nom de la catégorie active pour l'étiquette (category)
    const activeCategoryName =
      categories.find((c) => c.slug === activeSlug)?.name ?? undefined;

    return items.map((f) => ({
      category: activeCategoryName?.toUpperCase(),
      title: f.title,
      subtitle: f.city ?? "Partout au Maroc",
    }));
  }, [items, categories, activeSlug]);

  // Si on n’a pas encore les catégories, on garde la structure UI
  const tabSlugs = categories.map((c) => c.slug);
  const tabLabels = categories.map((c) => c.name);

  return (
    <section className="py-16 lg:py-24 bg-[#F9FAFB]">
      <div className="mx-auto max-w-[1180px] px-5 text-center overflow-hidden">
        {/* Titre */}
        <h2 className="text-[#0E1A4B] font-black tracking-tight leading-[0.95] text-[42px] md:text-[60px]">
          Nos Formations
        </h2>

        {/* Onglets (depuis la BDD) */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {tabSlugs.length === 0 ? (
            // Fallback visuel si la BDD est vide
            <>
              {["Secourisme", "Incendie", "CACES", "Habilitations", "Sécurité routière"].map(
                (label) => (
                  <button
                    key={label}
                    className="px-4 py-2 rounded-full border text-sm font-medium bg-white text-slate-400 border-slate-200 cursor-not-allowed"
                  >
                    {label}
                  </button>
                )
              )}
            </>
          ) : (
            tabSlugs.map((slug, i) => (
              <button
                key={slug}
                onClick={() => setActiveSlug(slug)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                  activeSlug === slug
                    ? "bg-[#2F6DF6] text-white border-[#2F6DF6]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-[#2F6DF6]"
                }`}
              >
                {tabLabels[i]}
              </button>
            ))
          )}
        </div>

        {/* Ligne 1 - Animation vers la gauche */}
        <div className="relative mt-12 overflow-hidden">
          <motion.div
            key={(activeSlug ?? "none") + "-row1"}
            className="flex gap-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 50, ease: "linear" }} // vitesse douce
          >
            {(cards.length ? cards : Array.from({ length: 6 }).map((_, i) => ({
              category: "CHARGEMENT",
              title: "…",
              subtitle: "…",
            }))).map((item, i) => (
              <Card key={`row1-${i}`} {...item} />
            ))}
            {/* clone pour boucle infinie */}
            {(cards.length ? cards : Array.from({ length: 6 }).map((_, i) => ({
              category: "CHARGEMENT",
              title: "…",
              subtitle: "…",
            }))).map((item, i) => (
              <Card key={`row1-clone-${i}`} {...item} />
            ))}
          </motion.div>
        </div>

        {/* Ligne 2 - Animation vers la droite */}
        <div className="relative mt-8 overflow-hidden">
          <motion.div
            key={(activeSlug ?? "none") + "-row2"}
            className="flex gap-6"
            animate={{ x: ["-100%", "0%"] }}
            transition={{ repeat: Infinity, duration: 70, ease: "linear" }} // un peu plus lente et sens inverse
          >
            {(cards.length ? cards : Array.from({ length: 6 }).map((_, i) => ({
              category: "CHARGEMENT",
              title: "…",
              subtitle: "…",
            }))).map((item, i) => (
              <Card key={`row2-${i}`} {...item} />
            ))}
            {(cards.length ? cards : Array.from({ length: 6 }).map((_, i) => ({
              category: "CHARGEMENT",
              title: "…",
              subtitle: "…",
            }))).map((item, i) => (
              <Card key={`row2-clone-${i}`} {...item} />
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <div className="mt-12">
          <a
            href="/nos-formations"
            className="inline-flex items-center rounded-full bg-[#2F6DF6] px-6 py-3 text-white text-[16px] font-semibold shadow-sm hover:bg-[#1E4ED8] hover:scale-105 transition-transform"
          >
            Découvrez toutes nos formations
          </a>
        </div>
      </div>
    </section>
  );
}
