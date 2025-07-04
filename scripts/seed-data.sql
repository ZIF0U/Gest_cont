-- Données d'exemple pour tester l'application

INSERT INTO contrats (
    carte_nationale, nom_prenom, date_naissance, lieu_naissance, 
    adresse, fonction, date_recrutement, debut_contrat, fin_contrat, 
    salaire_base, num_assurance_sociale
) VALUES 
(
    'AB123456', 'Martin Dubois', '1985-03-15', 'Paris', 
    '123 Rue de la Paix, Paris', 'Développeur Senior', '2023-01-15', 
    '2023-02-01', '2024-02-01', 4500.00, 'SS123456789'
),
(
    'CD789012', 'Sophie Laurent', '1990-07-22', 'Lyon', 
    '456 Avenue des Champs, Lyon', 'Chef de Projet', '2023-03-01', 
    '2023-03-15', '2025-03-15', 5200.00, 'SS987654321'
),
(
    'EF345678', 'Pierre Moreau', '1988-11-08', 'Marseille', 
    '789 Boulevard du Port, Marseille', 'Analyste', '2022-06-01', 
    '2022-07-01', '2023-07-01', 3800.00, 'SS456789123'
);
