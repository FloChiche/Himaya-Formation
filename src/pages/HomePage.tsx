import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronUp } from "lucide-react";

// Import shadcn components
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useSession } from "@/context/SessionContext";
import supabase from "@/supabase";

// Import des sections
import Section1 from "@/components/Sections/Section1";
import Section2 from "@/components/Sections/Section2";
import Section3 from "@/components/Sections/Section3";
import Section4 from "@/components/Sections/Section4";
import Section5 from "@/components/Sections/Section5";
import Section6 from "@/components/Sections/Section6";
import Section7 from "@/components/Sections/Section7";

const HomePage = () => {
  const { session } = useSession();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  
  return (
    <div className="bg-white text-slate-900">
      {/* Header/Navigation */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-950 text-white fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo/Titre */}
            <Link to="/" className="text-2xl font-black hover:text-blue-200 transition-colors cursor-pointer">
              Himaya-Formations.ma
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="space-x-6">
                {/* Qui sommes nous */}
                <NavigationMenuItem>
                  <Link to="/qui-sommes-nous" className="text-white hover:text-blue-200 transition-colors font-medium">
                    Qui sommes nous
                  </Link>
                </NavigationMenuItem>

                {/* Nos formations */}
                <NavigationMenuItem>
                  <Link to="/nos-formations" className="text-white hover:text-blue-200 transition-colors font-medium">
                    Nos formations
                  </Link>
                </NavigationMenuItem>

                {/* Nos formateurs */}
                <NavigationMenuItem>
                  <Link to="/nos-formateurs" className="text-white hover:text-blue-200 transition-colors font-medium">
                    Nos formateurs
                  </Link>
                </NavigationMenuItem>

                {/* Safety Day */}
                <NavigationMenuItem>
                  <Link to="/safety-days" className="text-white hover:text-blue-200 transition-colors font-medium">
                    Safety Day
                  </Link>
                </NavigationMenuItem>

                {/* Sign In/Sign Out */}
                <NavigationMenuItem>
                  {session?.user ? (
                    <Button
                      variant="secondary"
                      className="text-slate-600 hover:bg-slate-100 rounded-full"
                      onClick={() => {
                        supabase.auth.signOut();
                      }}
                    >
                      Sign out
                    </Button>
                  ) : (
                    <Link to="/auth">
                      <Button
                        variant="secondary"
                        className="text-slate-600 hover:bg-slate-100 rounded-full"
                      >
                        Sign In
                      </Button>
                    </Link>
                  )}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content - Sections dans l'ordre logique */}
      <main className="pt-16">
        {/* Section 1: Hero Section */}
        <Section1 />
        {/* Section 7: Brands Section*/}
        <Section7 />
        
        {/* Section 2: Safety Days / Prestations */}
        <Section2 />
        
        {/* Section 3: À propos/Statistiques */}
        <Section3 />
        
        {/* Section 4: Témoignages */}
        <Section4 />
        
        {/* Section 5: FAQ & Contact */}
        <Section5 />
        
        {/* Section 6: Footer */}
        <Section6 />
      </main>

      {/* Bouton Scroll to Top */}
      <button
        onClick={scrollToTop}
        aria-label="Remonter en haut de page"
        className={`fixed right-6 bottom-6 z-50 rounded-full bg-[#2F6DF6] p-3 text-white shadow-lg transition hover:bg-[#1E4ED8] focus:ring-2 focus:ring-[#2F6DF6] focus:ring-offset-2 focus:outline-none ${
          showScrollTop ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ChevronUp className="h-6 w-6" />
      </button>
    </div>
  );
};

export default HomePage;
