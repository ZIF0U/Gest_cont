-- Script d'initialisation de la base de données SQLite
-- Ce script peut être exécuté pour créer la structure de base

CREATE TABLE IF NOT EXISTS contrats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    carte_nationale TEXT NOT NULL,
    nom_prenom TEXT NOT NULL,
    date_naissance DATE NOT NULL,
    lieu_naissance TEXT,
    adresse TEXT,
    fonction TEXT NOT NULL,
    date_recrutement DATE,
    debut_contrat DATE NOT NULL,
    fin_contrat DATE NOT NULL,
    salaire_base DECIMAL(10,2),
    num_assurance_sociale TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances de recherche
CREATE INDEX IF NOT EXISTS idx_nom_prenom ON contrats(nom_prenom);
CREATE INDEX IF NOT EXISTS idx_carte_nationale ON contrats(carte_nationale);
CREATE INDEX IF NOT EXISTS idx_fonction ON contrats(fonction);
CREATE INDEX IF NOT EXISTS idx_fin_contrat ON contrats(fin_contrat);
