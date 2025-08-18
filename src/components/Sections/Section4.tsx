import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Section4() {
  const [paused, setPaused] = useState(false);

  const FORMATEURS = [
    { name: "HASSAN", specialites: "Secourisme, Incendie, Safety Days", description: "Hassan a 11 ans d'expérience dans la prévention des risques en entreprise.", avis: "“Formation excellente! …” — Sara M." },
    { name: "RACHID", specialites: "Habilitations électriques, LOTO, ATEX", description: "Rachid est expert reconnu en sécurité électrique.", avis: "“Formation très complète…” — Ahmed K." },
    { name: "MOHAMED", specialites: "CACES, Conduite d'engins, Sécurité routière", description: "Mohamed forme depuis 12 ans dans le domaine de la conduite et sécurité routière.", avis: "“Excellent formateur CACES!” — Youssef L." },
    { name: "MOUNIR", specialites: "Travaux en hauteur, EPI, Audit sécurité", description: "Mounir est spécialisé dans la sécurité des travaux en hauteur.", avis: "“Formation travaux en hauteur…” — Fatima R." },
    { name: "KARIM", specialites: "Risque chimique, Ergonomie, TMS", description: "Karim a 15 ans d'expérience en prévention des risques chimiques et ergonomiques.", avis: "“Formation très enrichissante…” — Nadia B." },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F9FAFB] overflow-hidden">
      <div className="mx-auto max-w-[1180px] px-5">
        {/* Titre + intro */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-[#0E1A4B] font-black tracking-tight text-[40px] md:text-[60px] leading-tight">
            Nos Formateurs Experts
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Découvrez nos formateurs certifiés avec des années d'expérience dans leurs domaines de spécialité
          </p>
        </div>

        {/* Row défilante */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            initial={{ x: "-50%" }}
            animate={paused ? { x: "-50%" } : { x: "0%" }}
            transition={{
              repeat: paused ? 0 : Infinity,
              duration: 50,
              ease: "linear",
            }}
          >
            {[...FORMATEURS, ...FORMATEURS].map((f, i) => (
              <div
                key={i}
                className="min-w-[280px] bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <h3 className="text-xl font-bold text-[#0E1A4B]">{f.name}</h3>
                <p className="text-sm text-[#2F6DF6] font-medium mt-1">{f.specialites}</p>
                <p className="mt-3 text-slate-600 text-sm">{f.description}</p>
                <p className="italic text-slate-500 text-xs mt-4 border-l-4 border-[#2F6DF6] pl-3">{f.avis}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="#"
            className="inline-flex items-center rounded-full bg-[#2F6DF6] px-8 py-4 text-white font-semibold shadow hover:bg-[#1E4ED8] transition"
          >
            Voir tous nos formateurs
          </a>
        </div>
      </div>
    </section>
  );
}
