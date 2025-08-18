import React from "react";

export default function QuiSommesNous() {
  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="bg-[#0F1A3A] text-white">
        <div className="mx-auto max-w-[1180px] px-5 py-12 md:py-16">
          <nav className="text-sm text-white/70 mb-4">
            <a href="/" className="hover:underline">Accueil</a>
            <span className="mx-2">/</span>
            <span className="text-white">Qui sommes-nous</span>
          </nav>
          <h1 className="font-black tracking-tight leading-[1.1] text-[36px] md:text-[60px]">
            Qui sommes-nous
          </h1>
          <p className="mt-4 text-white/80 text-lg max-w-2xl">
            Acteur de référence au Maroc en prévention, santé, hygiène et sécurité au travail.
          </p>
        </div>
      </section>

      {/* NOTRE SOCIÉTÉ */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1180px] px-5 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <h2 className="text-[#0E1A4B] font-black text-3xl md:text-4xl tracking-tight">
              Notre société
            </h2>
            <div className="prose prose-slate mt-5 max-w-none">
              <p>
                Himaya Formations accompagne les entreprises dans la prévention des risques
                et l’amélioration des conditions de travail à travers la formation, le conseil
                et l’audit sur site. Nous réunissons des expertises complémentaires (SST,
                incendie, habilitations électriques, CACES, VR, prévention TMS…).
              </p>
              <p>
                Notre approche : écouter le besoin terrain, proposer une réponse pragmatique,
                et déployer des solutions concrètes avec un suivi mesurable.
              </p>
            </div>
          </div>

          {/* Encadré chiffres */}
          <aside className="md:col-span-5">
            <div className="rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm p-6">
              <h3 className="font-semibold text-slate-900 text-lg">En bref</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li>• Formations sécurité, prévention & SSTE</li>
                <li>• Audit & accompagnement opérationnel</li>
                <li>• Interventions partout au Maroc</li>
              </ul>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="text-2xl font-extrabold text-[#2F6DF6]">+300</div>
                  <div className="text-xs text-slate-500">Clients</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="text-2xl font-extrabold text-[#2F6DF6]">+15 000</div>
                  <div className="text-xs text-slate-500">Formés</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="text-2xl font-extrabold text-[#2F6DF6]">+45</div>
                  <div className="text-xs text-slate-500">Formations</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* NOS PILIERS */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-[1180px] px-5">
          <div className="rounded-2xl bg-[#EAF0FF] p-6 md:p-8 ring-1 ring-slate-200">
            <h3 className="text-[#0E1A4B] font-black text-2xl md:text-3xl">Nos piliers</h3>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {[
                { t: "Prévention d’abord", d: "La sécurité commence par la culture prévention et la formation adaptée." },
                { t: "Exigence & pragmatisme", d: "Des contenus ancrés dans le réel, directement actionnables sur le terrain." },
                { t: "Interlocuteur unique", d: "Diagnostic, plan d’action, déploiement et suivi : un parcours clair." },
                { t: "Qualité de service", d: "Réactivité, écoute et accompagnement jusqu’aux résultats mesurables." },
              ].map((p, i) => (
                <div key={i} className="rounded-xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
                  <div className="font-semibold text-slate-900">{p.t}</div>
                  <p className="text-slate-600 text-sm mt-2">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROXIMITÉ / CONTACT */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-[1180px] px-5 grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <h3 className="text-[#0E1A4B] font-black text-2xl md:text-3xl">Proche du terrain</h3>
            <p className="mt-4 text-slate-700">
              Nous intervenons sur site pour comprendre les contraintes réelles, former vos équipes
              au plus près de leurs missions et mettre en place des mesures de prévention efficaces.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm p-6">
              <div className="text-sm text-slate-500 uppercase tracking-wide">Contact</div>
              <div className="mt-3 space-y-2 text-sm">
                <div><span className="font-medium">Téléphone :</span> +212 522-984-177</div>
                <div><span className="font-medium">Email :</span> contact@himaya-formation.ma</div>
                <div><span className="font-medium">Adresse :</span> Casablanca, Maroc</div>
                <div><span className="font-medium">Horaires :</span> 08h30-17h30 (Lun–Ven)</div>
              </div>
              <a
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#2F6DF6] px-6 py-3 text-white text-sm font-semibold shadow hover:bg-[#1E4ED8] transition"
              >
                Nous contacter
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="mx-auto max-w-[1180px] px-5 text-center">
          <h3 className="text-[#0E1A4B] font-black text-2xl md:text-3xl">Un besoin ? Parlons-en</h3>
          <p className="mt-3 text-slate-600">
            Décrivez votre contexte : nous vous orientons vers la bonne solution (formation, audit, accompagnement).
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2F6DF6] px-8 py-4 text-white text-[16px] font-semibold shadow hover:bg-[#1E4ED8] transition"
          >
            Demander un contact
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}
