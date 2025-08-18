// src/pages/Admin/FormateursAdmin.tsx
import React, { useEffect, useMemo, useState } from "react";
import supabase from "@/supabase";

type Formateur = {
  id: number;
  name: string;
  city: string | null;
  rating: number | null;
  total_ratings: number | null;
  completion_rate: number | null;
  specialties: string | null; // ex: "Secourisme, Incendie"
  description: string | null;
  image_url: string | null;
  is_published: boolean;
  mobility_national: string | null;       // ⬅️ NOUVEAU
  mobility_international: string | null;  // ⬅️ NOUVEAU
  created_at: string;
  updated_at: string;
};

const emptyForm: Partial<Formateur> = {
  name: "",
  city: "",
  rating: null,
  total_ratings: null,
  completion_rate: null,
  specialties: "",
  description: "",
  image_url: "",
  is_published: true,
  mobility_national: "",
  mobility_international: "",
};

export default function FormateursAdmin() {
  const [items, setItems] = useState<Formateur[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [saving, setSaving] = useState(false);

  // modal état
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Formateur>>(emptyForm);

  // ---------- LOAD ----------
  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("formateurs")
      .select(
        "id,name,city,rating,total_ratings,completion_rate,specialties,description,image_url,is_published,mobility_national,mobility_international,created_at,updated_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("Erreur de chargement des formateurs.");
    } else {
      setItems((data as Formateur[]) ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  // ---------- FILTER ----------
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((f) => {
      const s = [
        f.name ?? "",
        f.city ?? "",
        f.specialties ?? "",
        f.mobility_national ?? "",
        f.mobility_international ?? "",
        String(f.rating ?? ""),
      ]
        .join(" ")
        .toLowerCase();
      return s.includes(term);
    });
  }, [items, q]);

  // ---------- ACTIONS ----------
  function openCreate() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowModal(true);
  }

  function openEdit(f: Formateur) {
    setEditingId(f.id);
    setForm({ ...f });
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload: any = {
      name: form.name?.toString().trim() || "",
      city: (form.city ?? "").toString().trim() || null,
      rating: form.rating ?? null,
      total_ratings: form.total_ratings ?? null,
      completion_rate: form.completion_rate ?? null,
      specialties: (form.specialties ?? "").toString().trim() || null,
      description: (form.description ?? "").toString().trim() || null,
      image_url: (form.image_url ?? "").toString().trim() || null,
      is_published: !!form.is_published,
      // ⬇️ champs mobilité séparés
      mobility_national:
        (form.mobility_national ?? "").toString().trim() || null,
      mobility_international:
        (form.mobility_international ?? "").toString().trim() || null,
      updated_at: new Date().toISOString(),
    };

    let error = null;

    if (editingId === null) {
      const { error: err } = await supabase
        .from("formateurs")
        .insert([{ ...payload, created_at: new Date().toISOString() }]);
      error = err;
    } else {
      const { error: err } = await supabase
        .from("formateurs")
        .update(payload)
        .eq("id", editingId);
      error = err;
    }

    if (error) {
      console.error(error);
      alert("Erreur lors de l’enregistrement.");
    } else {
      setShowModal(false);
      await load();
    }
    setSaving(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Supprimer ce formateur ?")) return;
    const { error } = await supabase.from("formateurs").delete().eq("id", id);
    if (error) {
      console.error(error);
      alert("Suppression impossible.");
    } else {
      await load();
    }
  }

  async function togglePublish(f: Formateur) {
    const { error } = await supabase
      .from("formateurs")
      .update({ is_published: !f.is_published, updated_at: new Date().toISOString() })
      .eq("id", f.id);
    if (error) {
      console.error(error);
      alert("Impossible de changer le statut.");
    } else {
      setItems((prev) =>
        prev.map((x) => (x.id === f.id ? { ...x, is_published: !x.is_published } : x))
      );
    }
  }

  // ---------- RENDER ----------
  return (
    <main className="p-6">
      {/* En-tête */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-[#0E1A4B] font-black tracking-tight text-3xl md:text-5xl">
            Admin · Formateurs
          </h1>
          <p className="text-slate-600 mt-2">
            Gérez votre base de formateurs : création, édition, activation…
          </p>
        </div>

        <div className="flex gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher par nom, ville, spécialités…"
            className="w-[300px] rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
          />
          <button
            onClick={openCreate}
            className="rounded-xl bg-[#2F6DF6] px-4 py-2 text-white font-semibold shadow hover:bg-[#1E4ED8]"
          >
            + Ajouter un formateur
          </button>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <StatCard label="Total" value={items.length} />
        <StatCard label="Actifs" value={items.filter((f) => f.is_published).length} />
        <StatCard label="Villes" value={new Set(items.map((f) => f.city ?? "")).size} />
        <StatCard
          label="Nouveaux (30j)"
          value={
            items.filter((f) => {
              const d = new Date(f.created_at);
              const ago = Date.now() - d.getTime();
              return ago <= 30 * 24 * 3600 * 1000;
            }).length
          }
        />
      </div>

      {/* Tableau */}
      <div className="mt-6 overflow-x-auto bg-white shadow rounded-2xl ring-1 ring-slate-200">
        <table className="w-full border-collapse text-left">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <Th>Nom</Th>
              <Th>Ville</Th>
              <Th>Spécialités</Th>
              <Th>Mobilité (Nat. / Inter.)</Th>
              <Th>Note</Th>
              <Th>Statut</Th>
              <Th className="text-right pr-4">Actions</Th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-slate-500">Chargement…</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-slate-500">Aucun formateur trouvé.</td>
              </tr>
            ) : (
              filtered.map((f) => (
                <tr key={f.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <Td>
                    <div className="flex items-center gap-3">
                      {f.image_url ? (
                        <img
                          src={f.image_url}
                          alt={f.name}
                          className="h-10 w-10 rounded-full object-cover ring-1 ring-slate-200"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-slate-200" />
                      )}
                      <div className="font-semibold text-slate-900">
                        {f.name}
                        <div className="text-xs text-slate-500">
                          {f.total_ratings ?? 0} avis • {f.completion_rate ?? 0}% complétion
                        </div>
                      </div>
                    </div>
                  </Td>
                  <Td className="whitespace-nowrap">{f.city ?? "—"}</Td>
                  <Td className="max-w-[340px]"><span className="line-clamp-2">{f.specialties ?? "—"}</span></Td>
                  <Td className="whitespace-nowrap">
                    <div className="text-xs text-slate-700">
                      <div><span className="text-slate-500">Nat :</span> {f.mobility_national ?? "—"}</div>
                      <div><span className="text-slate-500">Inter :</span> {f.mobility_international ?? "—"}</div>
                    </div>
                  </Td>
                  <Td>
                    {f.rating ? (
                      <span className="inline-flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 20 20" className="text-amber-500">
                          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 14.98 4.8 17.5l.99-5.78L1.58 7.62l5.82-.85L10 1.5z" fill="currentColor" />
                        </svg>
                        <span className="font-medium">{f.rating.toFixed(1)}</span>
                      </span>
                    ) : ("—")}
                  </Td>
                  <Td>
                    <span className={f.is_published
                      ? "inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700"
                      : "inline-flex items-center rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700"}>
                      {f.is_published ? "Publié" : "Non publié"}
                    </span>
                  </Td>
                  <Td className="text-right pr-4">
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => togglePublish(f)}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100"
                        title="Activer/Désactiver"
                      >
                        {f.is_published ? "Dépublier" : "Publier"}
                      </button>
                      <button
                        onClick={() => openEdit(f)}
                        className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(f.id)}
                        className="rounded-lg bg-rose-600 px-3 py-1.5 text-sm text-white hover:bg-rose-700"
                      >
                        Supprimer
                      </button>
                    </div>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL ÉDITION/CRÉATION */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[min(880px,94vw)] rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                {editingId === null ? "Ajouter un formateur" : "Modifier le formateur"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
              >
                Fermer
              </button>
            </div>

            <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Nom *</label>
                <input
                  required
                  value={form.name ?? ""}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Ville</label>
                <input
                  value={form.city ?? ""}
                  onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Spécialités (séparées par des virgules)</label>
                <input
                  value={form.specialties ?? ""}
                  onChange={(e) => setForm((s) => ({ ...s, specialties: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Note (ex: 4.8)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.rating ?? ""}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, rating: e.target.value === "" ? null : Number(e.target.value) }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
                />
              </div>

              {/* ⬇️ Champs totalement indépendants de "city" */}
              <div>
                <label className="block text-sm font-medium text-slate-700">Mobilité nationale</label>
                <input
                  value={form.mobility_national ?? ""}
                  onChange={(e) => setForm((s) => ({ ...s, mobility_national: e.target.value }))}
                  placeholder="Ex: Tout le Maroc, Régions, …"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Mobilité internationale</label>
                <input
                  value={form.mobility_international ?? ""}
                  onChange={(e) => setForm((s) => ({ ...s, mobility_international: e.target.value }))}
                  placeholder="Ex: Europe, Afrique, MENA, …"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Photo (URL)</label>
                <input
                  value={form.image_url ?? ""}
                  onChange={(e) => setForm((s) => ({ ...s, image_url: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Biographie / Description</label>
                <textarea
                  rows={4}
                  value={form.description ?? ""}
                  onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F6DF6]"
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-2">
                <input
                  id="pub"
                  type="checkbox"
                  checked={!!form.is_published}
                  onChange={(e) => setForm((s) => ({ ...s, is_published: e.target.checked }))}
                  className="h-4 w-4"
                />
                <label htmlFor="pub" className="text-sm text-slate-700">Publié</label>
              </div>

              <div className="md:col-span-2 mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#2F6DF6] px-5 py-2 text-white font-semibold shadow hover:bg-[#1E4ED8] disabled:opacity-60"
                >
                  {saving ? "Enregistrement…" : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

/* ---------- Petits composants UI ---------- */
function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow ring-1 ring-slate-200">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-bold text-slate-900">{value}</div>
    </div>
  );
}
function Th({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return <th className={`px-4 py-3 text-sm font-semibold ${className}`}>{children}</th>;
}
function Td({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}
