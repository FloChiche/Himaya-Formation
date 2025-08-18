// =====================================================
// EXPORT DES SERVICES HIMAYA FORMATION
// =====================================================

// Services principaux
export {
  PrestatairesService,
  CompetencesService,
  DocumentsPrestatairesService,
  PrestationsService,
  ClientsService,
  MissionsService,
  InscriptionsService,
  ParticipantsService,
  DocumentsGeneresService,
  NotificationsService,
  ParametresService,
  StatistiquesService,
  LogsService,
  supabaseUtils,
  supabase
} from './supabase';

// Types de base de données
export * from '@/types/database';

// =====================================================
// CONSTANTES UTILES
// =====================================================

export const STATUTS_PRESTATAIRE = {
  EN_ATTENTE: 'en_attente',
  VALIDE: 'validé',
  REFUSE: 'refusé',
  SUSPENDU: 'suspendu'
} as const;

export const STATUTS_VALIDATION = {
  EN_ATTENTE: 'en_attente',
  VALIDE: 'validé',
  REFUSE: 'refusé'
} as const;

export const CATEGORIES_PRESTATION = {
  FORMATION: 'formation',
  AUDIT: 'audit',
  INTERVENTION: 'intervention',
  CONSULTATION: 'consultation'
} as const;

export const STATUTS_MISSION = {
  PLANIFIE: 'planifie',
  EN_COURS: 'en_cours',
  TERMINE: 'termine',
  ANNULE: 'annule',
  REPORTE: 'reporte'
} as const;

export const STATUTS_INSCRIPTION = {
  EN_ATTENTE: 'en_attente',
  CONFIRMEE: 'confirmee',
  ANNULEE: 'annulee',
  TERMINEE: 'terminee'
} as const;

export const STATUTS_PAIEMENT = {
  EN_ATTENTE: 'en_attente',
  PAYE: 'paye',
  PARTIEL: 'partiel',
  ANNULE: 'annule'
} as const;

export const TYPES_DOCUMENT = {
  DIPLOME: 'diplome',
  CERTIFICATION: 'certification',
  ASSURANCE: 'assurance',
  MATERIEL: 'materiel',
  CNI: 'cni',
  CV: 'cv',
  AUTRE: 'autre'
} as const;

export const TYPES_DOCUMENT_GENERE = {
  ATTESTATION: 'attestation',
  CERTIFICAT: 'certificat',
  FACTURE: 'facture',
  DEVIS: 'devis',
  RAPPORT: 'rapport',
  AUTRE: 'autre'
} as const;

export const NIVEAUX_COMPETENCE = {
  DEBUTANT: 'débutant',
  INTERMEDIAIRE: 'intermédiaire',
  EXPERT: 'expert'
} as const;

export const TAILLES_ENTREPRISE = {
  TPE: 'TPE',
  PME: 'PME',
  GRANDE_ENTREPRISE: 'grande_entreprise',
  ADMINISTRATION: 'administration'
} as const;

// =====================================================
// FONCTIONS UTILITAIRES
// =====================================================

/**
 * Formater un prix en MAD
 */
export const formatPrix = (prix: number): string => {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(prix);
};

/**
 * Formater une date
 */
export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

/**
 * Formater une date et heure
 */
export const formatDateTime = (date: string | Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

/**
 * Formater une durée en heures et minutes
 */
export const formatDuree = (minutes: number): string => {
  const heures = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (heures === 0) {
    return `${mins} min`;
  } else if (mins === 0) {
    return `${heures}h`;
  } else {
    return `${heures}h${mins.toString().padStart(2, '0')}`;
  }
};

/**
 * Obtenir la couleur d'un statut
 */
export const getStatutColor = (statut: string): string => {
  switch (statut) {
    case 'validé':
    case 'confirmee':
    case 'paye':
    case 'termine':
      return 'text-green-600 bg-green-100';
    case 'en_attente':
    case 'planifie':
      return 'text-yellow-600 bg-yellow-100';
    case 'refusé':
    case 'annulee':
    case 'annule':
      return 'text-red-600 bg-red-100';
    case 'en_cours':
      return 'text-blue-600 bg-blue-100';
    case 'suspendu':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

/**
 * Obtenir l'icône d'un statut
 */
export const getStatutIcon = (statut: string): string => {
  switch (statut) {
    case 'validé':
    case 'confirmee':
    case 'paye':
    case 'termine':
      return 'check-circle';
    case 'en_attente':
    case 'planifie':
      return 'clock';
    case 'refusé':
    case 'annulee':
    case 'annule':
      return 'x-circle';
    case 'en_cours':
      return 'play-circle';
    case 'suspendu':
      return 'pause-circle';
    default:
      return 'circle';
  }
};

/**
 * Valider un email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valider un numéro de téléphone marocain
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+212|0)[5-7][0-9]{8}$/;
  return phoneRegex.test(phone);
};

/**
 * Générer un ID unique
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Tronquer un texte
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

/**
 * Capitaliser la première lettre
 */
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Formater un nom de fichier
 */
export const formatFileName = (fileName: string): string => {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .toLowerCase()
    .substring(0, 50);
};

/**
 * Obtenir la taille d'un fichier formatée
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Vérifier si un fichier est une image
 */
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

/**
 * Vérifier si un fichier est un PDF
 */
export const isPdfFile = (file: File): boolean => {
  return file.type === 'application/pdf';
};

/**
 * Obtenir l'extension d'un fichier
 */
export const getFileExtension = (fileName: string): string => {
  return fileName.split('.').pop()?.toLowerCase() || '';
};

/**
 * Créer un objet URL pour un fichier
 */
export const createFileUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * Libérer un objet URL
 */
export const revokeFileUrl = (url: string): void => {
  URL.revokeObjectURL(url);
}; 