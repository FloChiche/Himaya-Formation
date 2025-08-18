-- =====================================================
-- SCHEMA BASE DE DONNÉES HIMAYA FORMATION
-- =====================================================

-- Activation des extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =====================================================
-- TABLE: PRESTATAIRES
-- =====================================================
CREATE TABLE IF NOT EXISTS prestataires (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    adresse TEXT,
    ville VARCHAR(100),
    code_postal VARCHAR(10),
    pays VARCHAR(50) DEFAULT 'Maroc',
    bio TEXT,
    statut VARCHAR(20) DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'validé', 'refusé', 'suspendu')),
    date_creation TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    date_validation TIMESTAMP WITH TIME ZONE,
    validateur_id UUID REFERENCES auth.users(id),
    notes_internes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: COMPÉTENCES PRESTATAIRES
-- =====================================================
CREATE TABLE IF NOT EXISTS competences_prestataires (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prestataire_id UUID REFERENCES prestataires(id) ON DELETE CASCADE,
    categorie VARCHAR(100) NOT NULL,
    sous_categorie VARCHAR(100) NOT NULL,
    niveau VARCHAR(20) DEFAULT 'intermediaire' CHECK (niveau IN ('débutant', 'intermédiaire', 'expert')),
    statut VARCHAR(20) DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'validé', 'refusé')),
    date_validation TIMESTAMP WITH TIME ZONE,
    validateur_id UUID REFERENCES auth.users(id),
    commentaires TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: DOCUMENTS PRESTATAIRES
-- =====================================================
CREATE TABLE IF NOT EXISTS documents_prestataires (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prestataire_id UUID REFERENCES prestataires(id) ON DELETE CASCADE,
    type_document VARCHAR(50) NOT NULL CHECK (type_document IN ('diplome', 'certification', 'assurance', 'materiel', 'cni', 'cv', 'autre')),
    nom_fichier VARCHAR(255) NOT NULL,
    url_fichier TEXT NOT NULL,
    taille_fichier BIGINT,
    type_mime VARCHAR(100),
    date_upload TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    statut VARCHAR(20) DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'validé', 'refusé')),
    commentaires TEXT,
    validateur_id UUID REFERENCES auth.users(id),
    date_validation TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: PRESTATIONS (CATALOGUE)
-- =====================================================
CREATE TABLE IF NOT EXISTS prestations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    description_courte VARCHAR(500),
    categorie VARCHAR(100) NOT NULL CHECK (categorie IN ('formation', 'audit', 'intervention', 'consultation')),
    sous_categorie VARCHAR(100) NOT NULL,
    duree_minutes INTEGER,
    prix_indicatif DECIMAL(10,2),
    prix_min DECIMAL(10,2),
    prix_max DECIMAL(10,2),
    materiel_requis TEXT,
    prerequis TEXT,
    zones_intervention TEXT[], -- tableau des villes/régions
    statut VARCHAR(20) DEFAULT 'active' CHECK (statut IN ('active', 'inactive', 'en_revision')),
    date_creation TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    createur_id UUID REFERENCES auth.users(id),
    image_url TEXT,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: CLIENTS
-- =====================================================
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    nom_entreprise VARCHAR(255),
    nom_contact VARCHAR(100),
    prenom_contact VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    adresse TEXT,
    ville VARCHAR(100),
    code_postal VARCHAR(10),
    pays VARCHAR(50) DEFAULT 'Maroc',
    secteur_activite VARCHAR(100),
    taille_entreprise VARCHAR(50) CHECK (taille_entreprise IN ('TPE', 'PME', 'grande_entreprise', 'administration')),
    siret VARCHAR(14),
    tva VARCHAR(20),
    statut VARCHAR(20) DEFAULT 'actif' CHECK (statut IN ('actif', 'inactif', 'suspendu')),
    date_creation TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes_internes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: MISSIONS (ASSIGNATIONS)
-- =====================================================
CREATE TABLE IF NOT EXISTS missions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prestation_id UUID REFERENCES prestations(id),
    prestataire_id UUID REFERENCES prestataires(id),
    client_id UUID REFERENCES clients(id),
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    date_debut TIMESTAMP WITH TIME ZONE NOT NULL,
    date_fin TIMESTAMP WITH TIME ZONE NOT NULL,
    lieu VARCHAR(255),
    adresse_lieu TEXT,
    ville_lieu VARCHAR(100),
    statut VARCHAR(20) DEFAULT 'planifie' CHECK (statut IN ('planifie', 'en_cours', 'termine', 'annule', 'reporte')),
    prix_final DECIMAL(10,2),
    nombre_participants INTEGER DEFAULT 1,
    notes TEXT,
    notes_internes TEXT,
    date_creation TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    createur_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: INSCRIPTIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS inscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mission_id UUID REFERENCES missions(id) ON DELETE CASCADE,
    client_id UUID REFERENCES clients(id),
    nombre_participants INTEGER DEFAULT 1,
    statut VARCHAR(20) DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'confirmee', 'annulee', 'terminee')),
    date_inscription TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    commentaires TEXT,
    prix_total DECIMAL(10,2),
    mode_paiement VARCHAR(50),
    statut_paiement VARCHAR(20) DEFAULT 'en_attente' CHECK (statut_paiement IN ('en_attente', 'paye', 'partiel', 'annule')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: PARTICIPANTS
-- =====================================================
CREATE TABLE IF NOT EXISTS participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inscription_id UUID REFERENCES inscriptions(id) ON DELETE CASCADE,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    telephone VARCHAR(20),
    fonction VARCHAR(100),
    entreprise VARCHAR(255),
    statut VARCHAR(20) DEFAULT 'inscrit' CHECK (statut IN ('inscrit', 'present', 'absent', 'annule')),
    date_creation TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: DOCUMENTS GÉNÉRÉS
-- =====================================================
CREATE TABLE IF NOT EXISTS documents_generes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mission_id UUID REFERENCES missions(id) ON DELETE CASCADE,
    type_document VARCHAR(50) NOT NULL CHECK (type_document IN ('attestation', 'certificat', 'facture', 'devis', 'rapport', 'autre')),
    nom_fichier VARCHAR(255) NOT NULL,
    url_fichier TEXT NOT NULL,
    taille_fichier BIGINT,
    type_mime VARCHAR(100),
    date_generation TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    statut VARCHAR(20) DEFAULT 'generé' CHECK (statut IN ('generé', 'envoyé', 'téléchargé')),
    destinataire_id UUID, -- peut être client_id ou prestataire_id
    type_destinataire VARCHAR(20) CHECK (type_destinataire IN ('client', 'prestataire')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: NOTIFICATIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    destinataire_id UUID NOT NULL,
    type_destinataire VARCHAR(20) NOT NULL CHECK (type_destinataire IN ('client', 'prestataire', 'admin')),
    type_notification VARCHAR(50) NOT NULL CHECK (type_notification IN ('email', 'sms', 'push', 'system')),
    titre VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    statut VARCHAR(20) DEFAULT 'non_envoyee' CHECK (statut IN ('non_envoyee', 'envoyee', 'lue', 'erreur')),
    date_envoi TIMESTAMP WITH TIME ZONE,
    date_lecture TIMESTAMP WITH TIME ZONE,
    lien_action TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: LOGS ACTIVITÉS
-- =====================================================
CREATE TABLE IF NOT EXISTS logs_activites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    utilisateur_id UUID REFERENCES auth.users(id),
    action VARCHAR(100) NOT NULL,
    table_concernee VARCHAR(50),
    id_enregistrement UUID,
    anciennes_valeurs JSONB,
    nouvelles_valeurs JSONB,
    ip_adresse INET,
    user_agent TEXT,
    date_action TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: PARAMÈTRES SYSTÈME
-- =====================================================
CREATE TABLE IF NOT EXISTS parametres_systeme (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cle VARCHAR(100) UNIQUE NOT NULL,
    valeur TEXT,
    description TEXT,
    type_valeur VARCHAR(20) DEFAULT 'string' CHECK (type_valeur IN ('string', 'number', 'boolean', 'json')),
    categorie VARCHAR(50),
    editable BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEX POUR OPTIMISATION
-- =====================================================

-- Index pour prestataires
CREATE INDEX idx_prestataires_email ON prestataires(email);
CREATE INDEX idx_prestataires_statut ON prestataires(statut);
CREATE INDEX idx_prestataires_ville ON prestataires(ville);

-- Index pour prestations
CREATE INDEX idx_prestations_categorie ON prestations(categorie);
CREATE INDEX idx_prestations_statut ON prestations(statut);
CREATE INDEX idx_prestations_zones ON prestations USING GIN(zones_intervention);
CREATE INDEX idx_prestations_tags ON prestations USING GIN(tags);

-- Index pour missions
CREATE INDEX idx_missions_date_debut ON missions(date_debut);
CREATE INDEX idx_missions_statut ON missions(statut);
CREATE INDEX idx_missions_prestataire ON missions(prestataire_id);
CREATE INDEX idx_missions_client ON missions(client_id);

-- Index pour inscriptions
CREATE INDEX idx_inscriptions_mission ON inscriptions(mission_id);
CREATE INDEX idx_inscriptions_client ON inscriptions(client_id);
CREATE INDEX idx_inscriptions_statut ON inscriptions(statut);

-- Index pour notifications
CREATE INDEX idx_notifications_destinataire ON notifications(destinataire_id, type_destinataire);
CREATE INDEX idx_notifications_statut ON notifications(statut);
CREATE INDEX idx_notifications_date ON notifications(date_envoi);

-- Index pour logs
CREATE INDEX idx_logs_utilisateur ON logs_activites(utilisateur_id);
CREATE INDEX idx_logs_date ON logs_activites(date_action);
CREATE INDEX idx_logs_action ON logs_activites(action);

-- =====================================================
-- FONCTIONS POUR TRIGGERS
-- =====================================================

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =====================================================
-- TRIGGERS POUR UPDATED_AT
-- =====================================================

CREATE TRIGGER update_prestataires_updated_at BEFORE UPDATE ON prestataires FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_competences_prestataires_updated_at BEFORE UPDATE ON competences_prestataires FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_prestataires_updated_at BEFORE UPDATE ON documents_prestataires FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_prestations_updated_at BEFORE UPDATE ON prestations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_missions_updated_at BEFORE UPDATE ON missions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inscriptions_updated_at BEFORE UPDATE ON inscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_participants_updated_at BEFORE UPDATE ON participants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_generes_updated_at BEFORE UPDATE ON documents_generes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_parametres_systeme_updated_at BEFORE UPDATE ON parametres_systeme FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DONNÉES INITIALES
-- =====================================================

-- Insertion des paramètres système par défaut
INSERT INTO parametres_systeme (cle, valeur, description, type_valeur, categorie) VALUES
('site_nom', 'Himaya Formation', 'Nom du site', 'string', 'general'),
('site_description', 'Plateforme de formation et prestations en sécurité au travail', 'Description du site', 'string', 'general'),
('contact_email', 'contact@himaya-formation.ma', 'Email de contact principal', 'string', 'contact'),
('contact_telephone', '+212 5 22 34 56 78', 'Téléphone de contact', 'string', 'contact'),
('adresse_siege', '123 Avenue Mohammed V, Casablanca, Maroc', 'Adresse du siège social', 'string', 'contact'),
('devise', 'MAD', 'Devise par défaut', 'string', 'financier'),
('tva_taux', '20', 'Taux de TVA en pourcentage', 'number', 'financier'),
('notifications_email_actives', 'true', 'Activer les notifications par email', 'boolean', 'notifications'),
('notifications_sms_actives', 'false', 'Activer les notifications par SMS', 'boolean', 'notifications'),
('validation_automatique_prestataires', 'false', 'Validation automatique des prestataires', 'boolean', 'validation'),
('delai_validation_prestataire', '48', 'Délai de validation prestataire en heures', 'number', 'validation')
ON CONFLICT (cle) DO NOTHING;

-- =====================================================
-- POLITIQUES RLS (ROW LEVEL SECURITY)
-- =====================================================

-- Activation RLS sur toutes les tables
ALTER TABLE prestataires ENABLE ROW LEVEL SECURITY;
ALTER TABLE competences_prestataires ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents_prestataires ENABLE ROW LEVEL SECURITY;
ALTER TABLE prestations ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE inscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents_generes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs_activites ENABLE ROW LEVEL SECURITY;
ALTER TABLE parametres_systeme ENABLE ROW LEVEL SECURITY;

-- Note: Les politiques RLS spécifiques devront être créées selon vos besoins d'autorisation
-- Exemple de politique pour prestataires (à adapter selon vos rôles)
CREATE POLICY "Prestataires peuvent voir leurs propres données" ON prestataires
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins peuvent tout faire sur prestataires" ON prestataires
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- =====================================================
-- COMMENTAIRES
-- =====================================================

COMMENT ON TABLE prestataires IS 'Table des prestataires/freelances partenaires de Himaya';
COMMENT ON TABLE competences_prestataires IS 'Compétences et spécialisations des prestataires';
COMMENT ON TABLE documents_prestataires IS 'Documents justificatifs des prestataires (diplômes, certifications, etc.)';
COMMENT ON TABLE prestations IS 'Catalogue des prestations et formations proposées';
COMMENT ON TABLE clients IS 'Clients de Himaya Formation';
COMMENT ON TABLE missions IS 'Missions assignées aux prestataires';
COMMENT ON TABLE inscriptions IS 'Inscriptions des clients aux formations';
COMMENT ON TABLE participants IS 'Participants individuels aux formations';
COMMENT ON TABLE documents_generes IS 'Documents générés automatiquement (attestations, factures, etc.)';
COMMENT ON TABLE notifications IS 'Système de notifications';
COMMENT ON TABLE logs_activites IS 'Logs des activités pour audit';
COMMENT ON TABLE parametres_systeme IS 'Paramètres de configuration du système'; 