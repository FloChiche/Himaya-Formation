import React, { useEffect, useMemo, useRef, useState } from "react";
import supabase from "@/supabase";
import type { Category, Formation } from "@/types/database";

type FormState = {
  title: string;
  category_id: number | null;
  city: string;
  duration_days: number | null;
  price_mad: number | null;
  image_url: string;
  short_desc: string;
  is_published: boolean;
};

const emptyForm: FormState = {
  title: "",
  category_id: null,
  city: "",
  duration_days: null,
  price_mad: null,
  image_url: "",
  short_desc: "",
  is_published: true,
};

export default function FormationsAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Formation[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [q, setQ] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  // ---------- LOAD ----------
  useEffect(() => {
    (async () => {
      setLoading(true);
      const [{ data: cats }, { data: forms }] = await Promise.all([
        supabase.from("categories").select("*").order("order_index", { ascending: true }),
        supabase.from("formations").select("*").order("created_at", { ascending: false }),
      ]);
      if (cats) setCategories(cats);
      if (forms) setItems(forms);
      setLoading(false);
    })();
  }, []);

  // ---------- HELPERS ----------
  const currentCategoryName = (id: number | null) =>
    categories.find((c) => c.id === id)?.name ?? "—";

  const resetForm = () => {
    setSelectedId(null);
    setForm(emptyForm);
    setTimeout(() => titleRef.current?.focus(), 0);
  };

  const selectFormation = (f: Formation) => {
    setSelectedId(f.id);
    setForm({
      title: f.title ?? "",
      category_id: f.category_id,
      city: f.city ?? "",
      duration_days: f.duration_days,
      price_mad: f.price_mad,
      image_url: f.image_url ?? "",
      short_desc: f.short_desc ?? "",
      is_published: !!f.is_published,
    });
    setTimeout(() => titleRef.current?.focus(), 0);
  };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((f) => {
      const c = currentCategoryName(f.category_id);
      return (
        f.title.toLowerCase().includes(term) ||
        (f.city ?? "").toLowerCase().includes(term) ||
        (f.short_desc ?? "").toLowerCase().includes(term) ||
        c.toLowerCase().includes(term)
      );
    });
  }, [q, items, categories]);

  // ---------- CRUD ----------
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);

    const payload = {
      title: form.title.trim(),
      category_id: form.category_id,
      city: form.city.trim() || null,
      duration_days: form.duration_days,
      price_mad: form.price_mad,
      image_url: form.image_url.trim() || null,
      short_desc: form.short_desc.trim() || null,
      is_published: form.is_published,
    };

    try {
      if (!payload.title || !payload.category_id) {
        throw new Error("Veuillez renseigner au minimum le Titre et la Catégorie.");
      }

      if (selectedId) {
        const { error } = await supabase.from("formations").update(payload).eq("id", selectedId);
        if (error) throw error;
        setMsg({ type: "success", text: "Formation mise à jour." });
      } else {
        const { error } = await supabase.from("formations").insert(payload);
        if (error) throw error;
        setMsg({ type: "success", text: "Formation créée." });
      }

      // refresh
      const { data } = await supabase.from("formations").select("*").order("created_at", { ascending: false });
      if (data) setItems(data);
      if (!selectedId) resetForm();
    } catch (err: any) {
      setMsg({ type: "error", text: err.message || "Une erreur est survenue." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette formation ?")) return;
    setDeleting(id);
    setMsg(null);
    try {
      const { error } = await supabase.from("formations").delete().eq("id", id);
      if (error) throw error;
      setItems((prev) => prev.filter((f) => f.id !== id));
      if (selectedId === id) resetForm();
      setMsg({ type: "success", text: "Formation supprimée." });
    } catch (err: any) {
      setMsg({ type: "error", text: err.message || "Suppression impossible." });
    } finally {
      setDeleting(null);
    }
  };

  // ---------- UI ----------
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1180px] px-5 py-8">
        <h1 className="text-[#0E1A4B] font-black tracking-tight text-3xl md:text-5xl">
          Admin · Formations
        </h1>

        {/* Feedback accessible */}
        <div aria-live="polite" className="sr-only">
          {msg?.text}
        </div>

        {/* FORMULAIRE (en haut) */}
        <form
          onSubmit={handleSave}
          className="mt-8 rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm p-6 md:p-8"
        >
          <fieldset disabled={saving} className="space-y-6">
            <legend className="sr-only">
              {selectedId ? "Modifier une formation" : "Créer une formation"}
            </legend>

            {/* Ligne d'action */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                + Nouvelle formation
              </button>

              {selectedId && (
                <span className="text-sm text-slate-500">
                  Édition de l’ID : <strong>{selectedId}</strong>
                </span>
              )}

              {msg && (
                <span
                  className={`ml-auto inline-flex items-center rounded-full px-3 py-1 text-sm ${
                    msg.type === "success"
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                      : "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
                  }`}
                >
                  {msg.text}
                </span>
              )}
            </div>

            {/* Champs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700">
                  Titre *
                </label>
                <input
                  ref={titleRef}
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                  placeholder="Nom de la formation"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
                />
              </div>

              <div>
                <label htmlFor="cat" className="block text-sm font-medium text-slate-700">
                  Catégorie *
                </label>
                <select
                  id="cat"
                  value={form.category_id ?? ""}
                  onChange={(e) =>
                    setForm((s) => ({
                      ...s,
                      category_id: e.target.value ? Number(e.target.value) : null,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
                >
                  <option value="">Sélectionner…</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-slate-700">
                  Ville
                </label>
                <input
                  id="city"
                  value={form.city}
                  onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
                  placeholder="Casablanca, Tanger…"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-slate-700">
                    Durée (jours)
                  </label>
                  <input
                    id="duration"
                    type="number"
                    min={0}
                    value={form.duration_days ?? ""}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, duration_days: e.target.value ? Number(e.target.value) : null }))
                    }
                    placeholder="ex: 2"
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-slate-700">
                    Prix (MAD)
                  </label>
                  <input
                    id="price"
                    type="number"
                    min={0}
                    value={form.price_mad ?? ""}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, price_mad: e.target.value ? Number(e.target.value) : null }))
                    }
                    placeholder="ex: 1200"
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="img" className="block text-sm font-medium text-slate-700">
                  Image URL
                </label>
                <input
                  id="img"
                  value={form.image_url}
                  onChange={(e) => setForm((s) => ({ ...s, image_url: e.target.value }))}
                  placeholder="https://…"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="desc" className="block text-sm font-medium text-slate-700">
                  Description courte
                </label>
                <textarea
                  id="desc"
                  rows={3}
                  value={form.short_desc}
                  onChange={(e) => setForm((s) => ({ ...s, short_desc: e.target.value }))}
                  placeholder="Résumé de la formation…"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) => setForm((s) => ({ ...s, is_published: e.target.checked }))}
                  className="h-4 w-4 rounded border-slate-300 text-[#2F6DF6] focus:ring-[#2F6DF6]"
                />
                Publié
              </label>

              <div className="flex gap-3">
                {selectedId && (
                  <button
                    type="button"
                    onClick={() => selectedId && handleDelete(selectedId)}
                    disabled={deleting === selectedId}
                    className="rounded-full border border-rose-300 bg-white px-5 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-50"
                  >
                    {deleting === selectedId ? "Suppression…" : "Supprimer"}
                  </button>
                )}
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-[#2F6DF6] px-6 py-2 text-white text-sm font-semibold shadow hover:bg-[#1E4ED8] disabled:opacity-50"
                >
                  {saving ? "Enregistrement…" : selectedId ? "Mettre à jour" : "Créer"}
                </button>
              </div>
            </div>
          </fieldset>
        </form>

        {/* LISTE (en dessous) */}
        <div className="mt-10">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Formations <span className="text-slate-500">({items.length})</span>
            </h2>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher par titre, ville ou catégorie…"
              className="ml-auto w-full md:w-80 rounded-full border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
            />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-36 animate-pulse rounded-2xl bg-slate-100 ring-1 ring-slate-200"
                />
              ))
            ) : filtered.length === 0 ? (
              <div className="col-span-full rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-6 text-slate-600">
                Aucune formation.
              </div>
            ) : (
              filtered.map((f) => (
                <button
                  key={f.id}
                  onClick={() => selectFormation(f)}
                  className={`group text-left rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm p-5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2F6DF6] ${
                    selectedId === f.id ? "ring-2 ring-[#2F6DF6]" : ""
                  }`}
                  aria-label={`Éditer la formation ${f.title}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold uppercase tracking-wide text-[#2F6DF6]">
                        {currentCategoryName(f.category_id)}
                      </div>
                      <h3 className="mt-1 line-clamp-2 font-semibold text-slate-900">
                        {f.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                        {f.short_desc ?? "—"}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                        f.is_published
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                          : "bg-slate-100 text-slate-600 ring-1 ring-slate-300"
                      }`}
                      title={f.is_published ? "Publié" : "Masqué"}
                    >
                      {f.is_published ? "Publié" : "Masqué"}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-slate-50 ring-1 ring-slate-200 px-2 py-1">
                      {f.city ?? "Partout"}
                    </span>
                    {typeof f.duration_days === "number" && (
                      <span className="rounded-full bg-slate-50 ring-1 ring-slate-200 px-2 py-1">
                        {f.duration_days} j
                      </span>
                    )}
                    {typeof f.price_mad === "number" && (
                      <span className="rounded-full bg-slate-50 ring-1 ring-slate-200 px-2 py-1">
                        {f.price_mad.toLocaleString("fr-MA")} MAD
                      </span>
                    )}
                    <span className="ml-auto text-slate-400 group-hover:text-slate-500">
                      Cliquer pour modifier →
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
