import React from "react";
import { Formation } from "@/types/database";

type Props = {
  formation: Formation;
};

const FormationCard: React.FC<Props> = ({ formation }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      {formation.image_url && (
        <img
          src={formation.image_url}
          alt={formation.title}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Contenu */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-800 mb-2">
          {formation.title}
        </h3>

        {formation.short_desc && (
          <p className="text-sm text-slate-600 mb-3">{formation.short_desc}</p>
        )}

        <div className="flex justify-between items-center text-sm text-slate-500">
          {formation.duration_days && (
            <span>⏱ {formation.duration_days} jours</span>
          )}
          {formation.city && <span>📍 {formation.city}</span>}
        </div>

        {formation.price_mad !== null && (
          <div className="mt-3 text-blue-600 font-semibold">
            {formation.price_mad} MAD
          </div>
        )}
      </div>
    </div>
  );
};

export default FormationCard;
