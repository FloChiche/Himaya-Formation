import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  Shield,
  Award,
  Users,
  Globe,
} from "lucide-react";

const Section6: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    formations: [
      { name: "Développement Web", href: "/formations/web" },
      { name: "Design UI/UX", href: "/formations/design" },
      { name: "Data Science", href: "/formations/data" },
      { name: "Développement Mobile", href: "/formations/mobile" },
      { name: "Marketing Digital", href: "/formations/marketing" },
      { name: "Cybersécurité", href: "/formations/security" },
    ],
    entreprise: [
      { name: "À propos", href: "/about" },
      { name: "Notre équipe", href: "/team" },
      { name: "Carrières", href: "/careers" },
      { name: "Partenaires", href: "/partners" },
      { name: "Certifications", href: "/certifications" },
      { name: "Blog", href: "/blog" },
    ],
    services: [
      { name: "Formation sur mesure", href: "/services/custom" },
      { name: "Accompagnement carrière", href: "/services/career" },
      { name: "Placement en entreprise", href: "/services/placement" },
      { name: "Consulting", href: "/services/consulting" },
      { name: "Audit de compétences", href: "/services/audit" },
      { name: "Formation continue", href: "/services/continuous" },
    ],
    support: [
      { name: "Centre d'aide", href: "/help" },
      { name: "FAQ", href: "/faq" },
      { name: "Contact", href: "/contact" },
      { name: "Support technique", href: "/support" },
      { name: "Communauté", href: "/community" },
      { name: "Tutoriels", href: "/tutorials" },
    ],
  };

  const socialLinks = [
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
    { Icon: Youtube, href: "#", label: "YouTube" },
  ];

  const contactInfo = [
    { Icon: Phone, content: "+212 5 22 34 56 78", label: "Téléphone" },
    { Icon: Mail, content: "contact@himaya-formation.ma", label: "Email" },
    {
      Icon: MapPin,
      content: "123 Avenue Mohammed V, Casablanca, Maroc",
      label: "Adresse",
    },
    { Icon: Clock, content: "Lun–Ven : 9h–18h", label: "Horaires" },
  ];

  const certifications = [
    { Icon: Shield, text: "Centre certifié OFPPT" },
    { Icon: Award, text: "ISO 9001:2015" },
    { Icon: Users, text: "Membre FENELEC" },
    { Icon: Globe, text: "Partenariat international" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Bloc principal */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Infos société */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Himaya-Formation.ma
            </h3>
            <p className="text-gray-300 mt-2 leading-relaxed">
              Votre partenaire de confiance pour une formation professionnelle
              d&apos;excellence dans les technologies numériques.
            </p>

            {/* Contact */}
            <div className="space-y-3 my-6">
              {contactInfo.map(({ Icon, content, label }, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-gray-300">{content}</p>
                    <p className="text-xs text-gray-500">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="grid grid-cols-2 gap-3">
              {certifications.map(({ Icon, text }, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-2 text-sm text-gray-300"
                >
                  <Icon className="w-5 h-5 text-blue-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Liens dynamiques */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-lg font-semibold mb-4 capitalize">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12">
          <Separator className="bg-gray-700 mb-8" />
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Restez informé</h3>
                <p className="text-gray-300">
                  Recevez nos dernières offres de formation, conseils carrière et
                  actualités du secteur directement dans votre boîte mail.
                </p>
              </div>
              <form
                className="flex w-full gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: brancher au backend/newsletter
                }}
              >
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Button
                  type="submit"
                  className="shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="flex items-center gap-2 text-gray-400 text-sm">
              <span>&copy; {currentYear} Himaya-Formation.ma. Tous droits réservés.</span>
              <span>•</span>
              <span>
                Fait avec <Heart className="w-4 h-4 text-red-500 inline" /> au Maroc
              </span>
            </p>

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Suivez-nous :</span>
              <div className="flex gap-3">
                {socialLinks.map(({ Icon, href, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    aria-label={label}
                    className="p-2 bg-gray-800 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Liens légaux */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 mt-4 text-sm text-gray-400">
            <a href="/privacy" className="hover:text-blue-400 transition-colors">
              Politique de confidentialité
            </a>
            <a href="/terms" className="hover:text-blue-400 transition-colors">
              Conditions d&apos;utilisation
            </a>
            <a href="/cookies" className="hover:text-blue-400 transition-colors">
              Politique des cookies
            </a>
            <a href="/legal" className="hover:text-blue-400 transition-colors">
              Mentions légales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Section6;
