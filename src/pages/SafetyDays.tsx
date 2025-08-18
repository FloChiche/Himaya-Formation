import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "@/supabase"; // même import que dans tes autres pages
import { SafetyActivity } from "@/types/database";
import { Loader2 } from "lucide-react";

export default function NosSafetyDays() {
  const [activities, setActivities] = useState<SafetyActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      const { data, error } = await supabase
        .from("safety_activities")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setActivities(data || []);
      }
      setLoading(false);
    };

    fetchActivities();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              <span className="-ml-1">←</span> Retour à l’accueil
            </Link>
            <nav className="ml-2 text-sm text-slate-500">
              <Link to="/" className="hover:text-slate-700">Accueil</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-700 font-medium">Safety Days</span>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Safety Days</h1>

        {loading ? (
          <div className="flex items-center gap-2 text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin" /> Chargement…
          </div>
        ) : activities.length === 0 ? (
          <p>Aucune activité disponible.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((a) => (
              <article key={a.id} className="bg-white p-4 rounded-lg shadow">
                {a.image_url ? (
                  <img
                    src={a.image_url}
                    alt={a.title}
                    className="w-full h-40 object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-40 rounded bg-slate-100" />
                )}
                <h2 className="text-xl font-semibold mt-3">{a.title}</h2>
                <p className="text-slate-600 text-sm">{a.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {a.tags?.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
