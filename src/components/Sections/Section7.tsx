import React, { useEffect, useState } from "react";
import "./marquee.css";
import supabase from "@/supabase"; 

type Brand = {
  id: number;
  name: string;
};

export default function Section7() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const { data, error } = await supabase.from("brands").select("id, name");

      if (error) {
        console.error("Erreur lors de la récupération des marques :", error);
      } else {
        setBrands(data || []);
      }
    };

    fetchBrands();
  }, []);

  return (
    <section className="py-10 lg:py-14">
      <div className="mx-auto max-w-[1180px] px-5">
        <div className="rounded-[28px] bg-[#2F6DF6] text-white p-6 md:p-8 overflow-hidden">
          {/* Titre */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2
              id="nos-references"
              className="text-[28px] md:text-[36px] font-extrabold tracking-tight"
            >
              NOS RÉFÉRENCES :
            </h2>
          </div>

          {/* Marquee */}
          <div className="mt-6 space-y-3">
            {/* Ligne 1 */}
            <div className="relative overflow-hidden">
              <div className="flex w-[200%] gap-10 marquee-left will-change-transform">
                {[...brands, ...brands].map((brand, i) => (
                  <span
                    key={`b-top-${i}-${brand.id}`}
                    className="whitespace-nowrap text-white/95 font-semibold text-[16px] md:text-[18px] px-2"
                  >
                    {brand.name}
                  </span>
                ))}
              </div>
            </div>
            {/* Ligne 2 */}
            <div className="relative overflow-hidden">
              <div className="flex w-[200%] gap-10 marquee-right will-change-transform">
                {[...brands, ...brands].map((brand, i) => (
                  <span
                    key={`b-bot-${i}-${brand.id}`}
                    className="whitespace-nowrap text-white/80 font-semibold text-[16px] md:text-[18px] px-2"
                  >
                    {brand.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
