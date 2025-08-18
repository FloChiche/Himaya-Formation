import React, { useEffect, useState } from "react";
import supabase from "@/supabase";
import { Category, Formation } from "@/types/database";
import { Loader2, Plus, Pencil, Trash } from "lucide-react";

export default function FormationsAdmin() {
  const [cats, setCats] = useState<Category[]>([]);
  const [rows, setRows] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [editing, setEditing] = useState<Formation | null>(null);
  const [form, setForm] = useState<Partial<Formation>>({ is_published: true });

  const reload = async () => {
    setLoading(true);
    const { data: c } = await supabase
      .from("categories")
      .select("*")
      .order("order_index", { ascending: true });
    setCats(c || []);
    const { data: f } = await supabase
      .from("formations")
      .select("*")
      .order("created_at", { ascending: false });
    setRows(f || []);
    setLoading(false);
  };

  useEffect(() => { reload(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.category_id) return;

    if (editing) {
      const { error } = await supabase
        .from("formations")
        .update({
          title: form.title,
          category_id: form.category_id,
          city: form.city ?? null,
          short_desc: form.short_desc ?? null,
          duration_days: form.duration_days ?? null,
          price_mad: form.price_mad ?? null,
          image_url: form.image_url ?? null,
          is_published: form.is_published ?? true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editing.id);
      if (!error) {
        setEditing(null);
        setForm({ is_published: true });
        reload();
      }
    } else {
      const { error } = await supabase.from("formations").insert({
        title: form.title,
        category_id: form.category_id,
        city: form.city ?? null,
        short_desc: form.short_desc ?? null,
        duration_days: form.duration_days ?? null,
        price_mad: form.price_mad ?? null,
        image_url: form.image_url ?? null,
        is_published: form.is_published ?? true,
      });
      if (!error) {
        setForm({ is_published: true });
        reload();
      }
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Supprimer cette formation ?")) return;
    const { error } = await supabase.from("formations").delete().eq("id", id);
    if (!error) reload();
  };

  return (
    <main className="bg-white text-slate-900 pt-20 px-5 max-w-[1180px] mx-auto">
      <h1 className="text-3xl md:text-4xl font-black text-[#0E1A4B]">Admin · Formations</h1>

      {/* Form */}
      <section className="mt-6 rounded-2xl ring-1 ring-slate-200 p-5">
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-600">Titre *</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              value={form.title ?? ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Catégorie *</label>
            <select
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              value={form.category_id ?? ""}
              onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })}
              required
            >
              <option value="" hidden>—</option>
              {cats.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-600">Ville</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              value={form.city ?? ""}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Durée (jours)</label>
            <input
              type="number"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              value={form.duration_days ?? ""}
              onChange={(e) => setForm({ ...form, duration_days: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Prix (MAD)</label>
            <input
              type="number"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              value={form.price_mad ?? ""}
              onChange={(e) => setForm({ ...form, price_mad: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Image URL</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              value={form.image_url ?? ""}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-slate-600">Description courte</label>
            <textarea
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              rows={3}
              value={form.short_desc ?? ""}
              onChange={(e) => setForm({ ...form, short_desc: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="pub"
              type="checkbox"
              checked={form.is_published ?? true}
              onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
            />
            <label htmlFor="pub" className="text-sm text-slate-700">Publié</label>
          </div>

          <div className="md:col-span-2 flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#2F6DF6] text-white px-4 py-2 font-semibold">
              {editing ? (<><Pencil className="h-4 w-4" /> Mettre à jour</>) : (<><Plus className="h-4 w-4" /> Ajouter</>)}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => { setEditing(null); setForm({ is_published: true }); }}
                className="rounded-xl border border-slate-200 px-4 py-2"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Liste */}
      <section className="mt-6">
        {loading ? (
          <div className="flex items-center gap-2 text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin" /> Chargement…
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rows.map((f) => (
              <div key={f.id} className="rounded-2xl ring-1 ring-slate-200 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden">
                    {f.image_url && <img src={f.image_url} alt={f.title} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{f.title}</div>
                    <div className="text-xs text-slate-500">{f.city ?? "—"} · {f.duration_days ?? "—"} j</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-3 line-clamp-3">{f.short_desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => { setEditing(f); setForm(f); }}
                    className="inline-flex items-center gap-1 text-sm text-[#2F6DF6]"
                  >
                    <Pencil className="h-4 w-4" /> Éditer
                  </button>
                  <button
                    onClick={() => remove(f.id)}
                    className="inline-flex items-center gap-1 text-sm text-red-600"
                  >
                    <Trash className="h-4 w-4" /> Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
