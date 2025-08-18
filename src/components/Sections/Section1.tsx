import React from "react";

export default function Section1() {
  return (
    <section className="relative bg-gradient-to-r from-blue-700 to-blue-950 text-white py-20 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between relative z-10">
        
        {/* Texte à gauche */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            TROUVEZ LA FORMATION IDÉALE
          </h1>
          <p className="text-lg lg:text-xl mb-8">
            Cherchez la formation, trouvez le formateur et c'est parti !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
            <a
              href="#catalogue"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
            >
              CATALOGUE FORMATIONS
            </a>
            <a
              href="/nos-formateurs"
              className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
            >
              TOUS NOS EXPERTS
            </a>
          </div>

          {/* Stats en une seule ligne */}
          <div className="flex flex-nowrap items-center justify-center lg:justify-start gap-6 text-base font-medium whitespace-nowrap">
            <span>+300 Clients</span>
            <span className="opacity-50">•</span>
            <span>+15.000 Personnes formées</span>
            <span className="opacity-50">•</span>
            <span>+45 Formations</span>
          </div>
        </div>

        {/* Image à droite */}
        <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
          <img
            src="https://i.imgur.com/fZKtE1k.png"
            alt="Visuel"
            className="max-w-md w-full h-auto"
          />
        </div>
      </div>

      {/* Cercles décoratifs */}
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl" />
    </section>
  );
}
