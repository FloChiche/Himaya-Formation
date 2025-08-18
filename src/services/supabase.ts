import { createClient } from '@supabase/supabase-js';
import {
  // Types de base
  UUID,
  Timestamp,
  
  // Types Prestataires
  Prestataire,
  PrestataireInsert,
  PrestataireUpdate,
  CompetencePrestataire,
  CompetencePrestataireInsert,
  CompetencePrestataireUpdate,
  DocumentPrestataire,
  DocumentPrestataireInsert,
  DocumentPrestataireUpdate,
  PrestataireAvecRelations,
  
  // Types Prestations
  Prestation,
  PrestationInsert,
  PrestationUpdate,
  PrestationAvecRelations,
  
  // Types Clients
  Client,
  ClientInsert,
  ClientUpdate,
  
  // Types Missions
  Mission,
  MissionInsert,
  MissionUpdate,
  MissionAvecRelations,
  
  // Types Inscriptions
  Inscription,
  InscriptionInsert,
  InscriptionUpdate,
  InscriptionAvecRelations,
  
  // Types Participants
  Participant,
  ParticipantInsert,
  ParticipantUpdate,
  
  // Types Documents
  DocumentGenere,
  DocumentGenereInsert,
  DocumentGenereUpdate,
  
  // Types Notifications
  Notification,
  NotificationInsert,
  NotificationUpdate,
  
  // Types Logs
  LogActivite,
  
  // Types Paramètres
  ParametreSysteme,
  
  // Types Filtres
  FiltrePrestataires,
  FiltrePrestations,
  FiltreMissions,
  FiltreInscriptions,
  
  // Types Statistiques
  StatistiquesPrestataires,
  StatistiquesPrestations,
  StatistiquesMissions,
  
  // Types Export
  ExportOptions,
  ExportResult
} from '@/types/database';

// Configuration Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variables d\'environnement Supabase manquantes');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =====================================================
// SERVICE PRESTATAIRES
// =====================================================

export class PrestatairesService {
  // Récupérer tous les prestataires avec filtres
  static async getAll(filtres?: FiltrePrestataires): Promise<Prestataire[]> {
    let query = supabase
      .from('prestataires')
      .select('*')
      .order('created_at', { ascending: false });

    if (filtres?.statut) {
      query = query.eq('statut', filtres.statut);
    }
    if (filtres?.ville) {
      query = query.eq('ville', filtres.ville);
    }
    if (filtres?.date_creation_min) {
      query = query.gte('date_creation', filtres.date_creation_min);
    }
    if (filtres?.date_creation_max) {
      query = query.lte('date_creation', filtres.date_creation_max);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  // Récupérer un prestataire par ID avec relations
  static async getById(id: UUID): Promise<PrestataireAvecRelations | null> {
    const { data, error } = await supabase
      .from('prestataires')
      .select(`
        *,
        competences:competences_prestataires(*),
        documents:documents_prestataires(*),
        missions(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Récupérer un prestataire par user_id
  static async getByUserId(userId: UUID): Promise<Prestataire | null> {
    const { data, error } = await supabase
      .from('prestataires')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  // Créer un prestataire
  static async create(prestataire: PrestataireInsert): Promise<Prestataire> {
    const { data, error } = await supabase
      .from('prestataires')
      .insert(prestataire)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Mettre à jour un prestataire
  static async update(id: UUID, updates: PrestataireUpdate): Promise<Prestataire> {
    const { data, error } = await supabase
      .from('prestataires')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Supprimer un prestataire
  static async delete(id: UUID): Promise<void> {
    const { error } = await supabase
      .from('prestataires')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Valider un prestataire
  static async valider(id: UUID, validateurId: UUID): Promise<Prestataire> {
    return this.update(id, {
      statut: 'validé',
      date_validation: new Date().toISOString(),
      validateur_id: validateurId
    });
  }

  // Refuser un prestataire
  static async refuser(id: UUID, validateurId: UUID, notes?: string): Promise<Prestataire> {
    return this.update(id, {
      statut: 'refusé',
      date_validation: new Date().toISOString(),
      validateur_id: validateurId,
      notes_internes: notes
    });
  }
}

// =====================================================
// SERVICE COMPÉTENCES PRESTATAIRES
// =====================================================

export class CompetencesService {
  // Récupérer les compétences d'un prestataire
  static async getByPrestataireId(prestataireId: UUID): Promise<CompetencePrestataire[]> {
    const { data, error } = await supabase
      .from('competences_prestataires')
      .select('*')
      .eq('prestataire_id', prestataireId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Créer une compétence
  static async create(competence: CompetencePrestataireInsert): Promise<CompetencePrestataire> {
    const { data, error } = await supabase
      .from('competences_prestataires')
      .insert(competence)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Mettre à jour une compétence
  static async update(id: UUID, updates: CompetencePrestataireUpdate): Promise<CompetencePrestataire> {
    const { data, error } = await supabase
      .from('competences_prestataires')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Supprimer une compétence
  static async delete(id: UUID): Promise<void> {
    const { error } = await supabase
      .from('competences_prestataires')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Valider une compétence
  static async valider(id: UUID, validateurId: UUID): Promise<CompetencePrestataire> {
    return this.update(id, {
      statut: 'validé',
      date_validation: new Date().toISOString(),
      validateur_id: validateurId
    });
  }
}

// =====================================================
// SERVICE DOCUMENTS PRESTATAIRES
// =====================================================

export class DocumentsPrestatairesService {
  // Récupérer les documents d'un prestataire
  static async getByPrestataireId(prestataireId: UUID): Promise<DocumentPrestataire[]> {
    const { data, error } = await supabase
      .from('documents_prestataires')
      .select('*')
      .eq('prestataire_id', prestataireId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Créer un document
  static async create(document: DocumentPrestataireInsert): Promise<DocumentPrestataire> {
    const { data, error } = await supabase
      .from('documents_prestataires')
      .insert(document)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Mettre à jour un document
  static async update(id: UUID, updates: DocumentPrestataireUpdate): Promise<DocumentPrestataire> {
    const { data, error } = await supabase
      .from('documents_prestataires')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Supprimer un document
  static async delete(id: UUID): Promise<void> {
    const { error } = await supabase
      .from('documents_prestataires')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Valider un document
  static async valider(id: UUID, validateurId: UUID): Promise<DocumentPrestataire> {
    return this.update(id, {
      statut: 'validé',
      date_validation: new Date().toISOString(),
      validateur_id: validateurId
    });
  }

  // Uploader un fichier
  static async uploadFile(
    file: File,
    prestataireId: UUID,
    typeDocument: string
  ): Promise<{ url: string; path: string }> {
    const fileName = `${prestataireId}/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('documents-prestataires')
      .upload(fileName, file);

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('documents-prestataires')
      .getPublicUrl(fileName);

    return {
      url: urlData.publicUrl,
      path: fileName
    };
  }
}

// =====================================================
// SERVICE PRESTATIONS
// =====================================================

export class PrestationsService {
  // Récupérer toutes les prestations avec filtres
  static async getAll(filtres?: FiltrePrestations): Promise<Prestation[]> {
    let query = supabase
      .from('prestations')
      .select('*')
      .order('created_at', { ascending: false });

    if (filtres?.categorie) {
      query = query.eq('categorie', filtres.categorie);
    }
    if (filtres?.sous_categorie) {
      query = query.eq('sous_categorie', filtres.sous_categorie);
    }
    if (filtres?.statut) {
      query = query.eq('statut', filtres.statut);
    }
    if (filtres?.prix_min) {
      query = query.gte('prix_indicatif', filtres.prix_min);
    }
    if (filtres?.prix_max) {
      query = query.lte('prix_indicatif', filtres.prix_max);
    }
    if (filtres?.zones_intervention && filtres.zones_intervention.length > 0) {
      query = query.overlaps('zones_intervention', filtres.zones_intervention);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  // Récupérer une prestation par ID avec relations
  static async getById(id: UUID): Promise<PrestationAvecRelations | null> {
    const { data, error } = await supabase
      .from('prestations')
      .select(`
        *,
        missions(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Créer une prestation
  static async create(prestation: PrestationInsert): Promise<Prestation> {
    const { data, error } = await supabase
      .from('prestations')
      .insert(prestation)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Mettre à jour une prestation
  static async update(id: UUID, updates: PrestationUpdate): Promise<Prestation> {
    const { data, error } = await supabase
      .from('prestations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Supprimer une prestation
  static async delete(id: UUID): Promise<void> {
    const { error } = await supabase
      .from('prestations')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

// =====================================================
// SERVICE CLIENTS
// =====================================================

export class ClientsService {
  // Récupérer tous les clients
  static async getAll(): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Récupérer un client par ID
  static async getById(id: UUID): Promise<Client | null> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Récupérer un client par user_id
  static async getByUserId(userId: UUID): Promise<Client | null> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  // Créer un client
  static async create(client: ClientInsert): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .insert(client)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Mettre à jour un client
  static async update(id: UUID, updates: ClientUpdate): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Supprimer un client
  static async delete(id: UUID): Promise<void> {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

// =====================================================
// SERVICE MISSIONS
// =====================================================

export class MissionsService {
  // Récupérer toutes les missions avec filtres
  static async getAll(filtres?: FiltreMissions): Promise<Mission[]> {
    let query = supabase
      .from('missions')
      .select('*')
      .order('date_debut', { ascending: false });

    if (filtres?.statut) {
      query = query.eq('statut', filtres.statut);
    }
    if (filtres?.prestataire_id) {
      query = query.eq('prestataire_id', filtres.prestataire_id);
    }
    if (filtres?.client_id) {
      query = query.eq('client_id', filtres.client_id);
    }
    if (filtres?.date_debut_min) {
      query = query.gte('date_debut', filtres.date_debut_min);
    }
    if (filtres?.date_debut_max) {
      query = query.lte('date_debut', filtres.date_debut_max);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  // Récupérer une mission par ID avec relations
  static async getById(id: UUID): Promise<MissionAvecRelations | null> {
    const { data, error } = await supabase
      .from('missions')
      .select(`
        *,
        prestation:prestations(*),
        prestataire:prestataires(*),
        client:clients(*),
        inscriptions(*),
        documents_generes:documents_generes(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Créer une mission
  static async create(mission: MissionInsert): Promise<Mission> {
    const { data, error } = await supabase
      .from('missions')
      .insert(mission)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Mettre à jour une mission
  static async update(id: UUID, updates: MissionUpdate): Promise<Mission> {
    const { data, error } = await supabase
      .from('missions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Supprimer une mission
  static async delete(id: UUID): Promise<void> {
    const { error } = await supabase
      .from('missions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

// =====================================================
// SERVICE INSCRIPTIONS
// =====================================================

export class InscriptionsService {
  // Récupérer toutes les inscriptions avec filtres
  static async getAll(filtres?: FiltreInscriptions): Promise<Inscription[]> {
    let query = supabase
      .from('inscriptions')
      .select('*')
      .order('created_at', { ascending: false });

    if (filtres?.statut) {
      query = query.eq('statut', filtres.statut);
    }
    if (filtres?.statut_paiement) {
      query = query.eq('statut_paiement', filtres.statut_paiement);
    }
    if (filtres?.client_id) {
      query = query.eq('client_id', filtres.client_id);
    }
    if (filtres?.mission_id) {
      query = query.eq('mission_id', filtres.mission_id);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  // Récupérer une inscription par ID avec relations
  static async getById(id: UUID): Promise<InscriptionAvecRelations | null> {
    const { data, error } = await supabase
      .from('inscriptions')
      .select(`
        *,
        mission:missions(*),
        client:clients(*),
        participants(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Créer une inscription
  static async create(inscription: InscriptionInsert): Promise<Inscription> {
    const { data, error } = await supabase
      .from('inscriptions')
      .insert(inscription)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Mettre à jour une inscription
  static async update(id: UUID, updates: InscriptionUpdate): Promise<Inscription> {
    const { data, error } = await supabase
      .from('inscriptions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Supprimer une inscription
  static async delete(id: UUID): Promise<void> {
    const { error } = await supabase
      .from('inscriptions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

// =====================================================
// SERVICE PARTICIPANTS
// =====================================================

export class ParticipantsService {
  // Récupérer les participants d'une inscription
  static async getByInscriptionId(inscriptionId: UUID): Promise<Participant[]> {
    const { data, error } = await supabase
      .from('participants')
      .select('*')
      .eq('inscription_id', inscriptionId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Créer un participant
  static async create(participant: ParticipantInsert): Promise<Participant> {
    const { data, error } = await supabase
      .from('participants')
      .insert(participant)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Mettre à jour un participant
  static async update(id: UUID, updates: ParticipantUpdate): Promise<Participant> {
    const { data, error } = await supabase
      .from('participants')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Supprimer un participant
  static async delete(id: UUID): Promise<void> {
    const { error } = await supabase
      .from('participants')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

// =====================================================
// SERVICE DOCUMENTS GÉNÉRÉS
// =====================================================

export class DocumentsGeneresService {
  // Récupérer les documents d'une mission
  static async getByMissionId(missionId: UUID): Promise<DocumentGenere[]> {
    const { data, error } = await supabase
      .from('documents_generes')
      .select('*')
      .eq('mission_id', missionId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Créer un document
  static async create(document: DocumentGenereInsert): Promise<DocumentGenere> {
    const { data, error } = await supabase
      .from('documents_generes')
      .insert(document)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Mettre à jour un document
  static async update(id: UUID, updates: DocumentGenereUpdate): Promise<DocumentGenere> {
    const { data, error } = await supabase
      .from('documents_generes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Supprimer un document
  static async delete(id: UUID): Promise<void> {
    const { error } = await supabase
      .from('documents_generes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

// =====================================================
// SERVICE NOTIFICATIONS
// =====================================================

export class NotificationsService {
  // Récupérer les notifications d'un destinataire
  static async getByDestinataireId(
    destinataireId: UUID,
    typeDestinataire: string
  ): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('destinataire_id', destinataireId)
      .eq('type_destinataire', typeDestinataire)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Créer une notification
  static async create(notification: NotificationInsert): Promise<Notification> {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notification)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Marquer comme lue
  static async marquerCommeLue(id: UUID): Promise<Notification> {
    const { data, error } = await supabase
      .from('notifications')
      .update({ 
        statut: 'lue',
        date_lecture: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Supprimer une notification
  static async delete(id: UUID): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

// =====================================================
// SERVICE PARAMÈTRES SYSTÈME
// =====================================================

export class ParametresService {
  // Récupérer tous les paramètres
  static async getAll(): Promise<ParametreSysteme[]> {
    const { data, error } = await supabase
      .from('parametres_systeme')
      .select('*')
      .order('categorie', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Récupérer un paramètre par clé
  static async getByCle(cle: string): Promise<ParametreSysteme | null> {
    const { data, error } = await supabase
      .from('parametres_systeme')
      .select('*')
      .eq('cle', cle)
      .single();

    if (error) throw error;
    return data;
  }

  // Mettre à jour un paramètre
  static async update(cle: string, valeur: string): Promise<ParametreSysteme> {
    const { data, error } = await supabase
      .from('parametres_systeme')
      .update({ valeur })
      .eq('cle', cle)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

// =====================================================
// SERVICE STATISTIQUES
// =====================================================

export class StatistiquesService {
  // Statistiques prestataires
  static async getStatistiquesPrestataires(): Promise<StatistiquesPrestataires> {
    const { data, error } = await supabase.rpc('get_statistiques_prestataires');
    if (error) throw error;
    return data;
  }

  // Statistiques prestations
  static async getStatistiquesPrestations(): Promise<StatistiquesPrestations> {
    const { data, error } = await supabase.rpc('get_statistiques_prestations');
    if (error) throw error;
    return data;
  }

  // Statistiques missions
  static async getStatistiquesMissions(): Promise<StatistiquesMissions> {
    const { data, error } = await supabase.rpc('get_statistiques_missions');
    if (error) throw error;
    return data;
  }
}

// =====================================================
// SERVICE LOGS
// =====================================================

export class LogsService {
  // Créer un log d'activité
  static async createLog(log: Omit<LogActivite, 'id' | 'created_at'>): Promise<void> {
    const { error } = await supabase
      .from('logs_activites')
      .insert(log);

    if (error) throw error;
  }

  // Récupérer les logs d'un utilisateur
  static async getByUtilisateurId(utilisateurId: UUID): Promise<LogActivite[]> {
    const { data, error } = await supabase
      .from('logs_activites')
      .select('*')
      .eq('utilisateur_id', utilisateurId)
      .order('date_action', { ascending: false })
      .limit(100);

    if (error) throw error;
    return data || [];
  }
}

// =====================================================
// UTILITAIRES
// =====================================================

export const supabaseUtils = {
  // Vérifier si l'utilisateur est connecté
  isAuthenticated: async (): Promise<boolean> => {
    const { data: { user } } = await supabase.auth.getUser();
    return !!user;
  },

  // Obtenir l'utilisateur actuel
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Déconnecter l'utilisateur
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Uploader un fichier générique
  uploadFile: async (
    bucket: string,
    path: string,
    file: File
  ): Promise<{ url: string; path: string }> => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return {
      url: urlData.publicUrl,
      path
    };
  },

  // Supprimer un fichier
  deleteFile: async (bucket: string, path: string): Promise<void> => {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  }
};

export default supabase; 