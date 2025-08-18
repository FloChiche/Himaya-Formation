import React, { useEffect, useState } from "react";
import supabase from "@/supabase"; // ⚠️ adapte ton chemin

/* ---------- Types ---------- */
type SafetyActivity = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: Array<{ label: string; color: string }>;
};

/* ---------- Card ---------- */
function SafetyActivityCard({ activity }: { activity: SafetyActivity }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200 hover:shadow-lg transition group">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          className="h-full w-full object-cover transform group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {activity.tags?.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-white text-xs font-medium ${tag.color}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

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
  const [activities, setActivities] = useState<SafetyActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      const { data, error } = await supabase
        .from("safety_activities") // ⚠️ vérifie le nom exact de ta table
        .select("*");

      if (error) {
        console.error("Erreur Supabase safety_activities:", error);
      } else {
        // ⚡ Assure-toi que tags soit bien un tableau JSON en base
        const parsed = data.map((a: any) => ({
          ...a,
          tags: typeof a.tags === "string" ? JSON.parse(a.tags) : a.tags,
        }));
        setActivities(parsed);
      }
      setLoading(false);
    };

    fetchActivities();
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
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

        {loading ? (
          <p className="text-center text-slate-500">Chargement...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {activities.map((activity) => (
              <SafetyActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        )}

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

      <button
        onClick={scrollToTop}
        aria-label="Remonter en haut de page"
        className="fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-lg transition
          bg-[#2F6DF6] text-white hover:bg-[#1E4ED8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2F6DF6]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </section>
  );
}
