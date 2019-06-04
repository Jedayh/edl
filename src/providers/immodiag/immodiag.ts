import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ImmodiagProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImmodiagProvider {

  type: any;
  pieceSeche: any;
  cuisine: any;
  salleDeBainWc: any;
  caveParking: any;
  jardinExterieur: any;

  nature = ["Bois", "Acier", "Bois peint", "Vitrée", "Autres"];
  natureSol = ["Revêtement souple PVC", "Parquet,Stratifié", "Carrelage", "Moquette", "Autres"];
  naturePlinthes = ["Bois", "Carrelage", "Stratifié", "Goulottes PVC", "Bois peint", "Autres"];
  natureMur = ["Peinture", "Toile de verre peinte", "Papier peint", "Cloison", "Cloison vitrée", "Lambris/Frisette", "Faïence", "Autres"];
  natureMurExt = ["Brut", "Béton", "Brique", "Pierre", "Parpaing", "Autres"];
  naturePlafond = ["Peinture", "Toile de verre peinte", "Papier peint(SO)", "Autres"];
  natureEclairage = ["Fils nus", "Domino", "Douille sans ampoule", "Douille avec ampoule", "Applique", "Néon(s)", "Spot(s)", "Dispositif de connexion luminaire avec ampoule", "Autres"];
  natureFenetre = ["PVC", "Alu", "Bois", "Simple vitrage", "Double vitrage", "Autres"];
  natureRadiateur = ["Electrique", "Convecteur électrique", "Inertie", "Panneau rayonnant", "En fonte", "Seche serviette", "Autres"];
  naturePlacard = ["Portes battantes", "Portes coulissantes", "Portes Accordéon", "Etagère(s)", "Tiroir(s)", "Tringle(s)", "Intérieur peint", "Rail de guidage", "Autres"];
  natureMeuble = ["Etagère(e)", "Porte(s)", "Tiroir(s)", "Autres"];
  naturePriseEtRobinet = ["Simple", "Double", "Autres"];
  natureInterrupteur = ["Simple", "Double", "Volet électrique", "Variateur", "VMC", "Autres"];
  natureTelephone = ["Gigogne", "Rj11", "Rj45", "Autres"];
  natureVentilation = ["Sur fenêtre", "Sur coffre VR", "Sur mur", "Motorisée", "Avec cordon", "VMC", "Grille Haute", "Grille Basse", "Autres"];
  natureRobinetterie = ["Mitigeur", "Mélangeur", "Thermostatique", "Bonde à tirette", "Siphon PVC", "Siphon en Fonte", "Siphon en alu", "Bouchon avec Chainette", "Bonde avec grille", "Autres"];
  natureSiphon = ["PVC", "Fonte", "Alu", "Autres"];
  natureVolets = ["PVC", "Alu", "Bois", "Fonte", "Persiennes", "Battants", "Roulants manuels", "Roulants Motorisés", "Bloqueur manivelle", "Télécommande", "Autres"];
  couleur = ["Noir","Blanc","Gris","Marron","Rouge","Jaune","Bleu","Vert","Beige","Bois","Autres"];
  etatUsure = ["Neuf", "Bon état", "Etat moyen", "Avancé", "Dégradé"];
  details = ["Léger(es)", "Plusieurs", "Important(es)", "Quelques", "Nombreux(ses)"];
  defaut = ["Rayure(s)", "Fissure(s)", "Trou(s)", "Trou(s) de cheville(s)", "Trous de clou(s)/punaise(s)", "Trou(s) rebouché(s)", "Trou(s) rebouché(s) grossièrement", "Déchirure(s)", "Enfoncement(s)", "Poinçonnement(s)", "Trace(s) d'humidité", "Noirci(s)", "Jauni(s)", "Ecaillé(s)", "Se décolle", "Eclat(s)", "Tâche(s)", "Trace(s) de meuble(s)", "Trace de cadre(s)", "Cassé(s)", "Trace(s)", "Gondolé(s)", "Usé(s)", "Rouillé(s)", "Oxydé(s)", "Entartré(s)", "Poussière(s)", "Terni(s)/Défraîchi(s)", "Choc(s)", "Cloqué(s)", "Mal fixé(s)/réglé(s)", "Descellé(s)", "Moisissures(s)", "Autres"];
  defautJardin = ["Tondue", "Taillée", "Non entretenu", "Arraché", "Mousse", "Fissures", "Chocs", "Trous", "Peinture écaillée", "Mal fixé", "Cassé", "Encombrants divers", "Traces de meubles/pots", "Rouille", "Verdi"];
  etatDeFonctionnement = ["Fonctionne", "Ne fonctionne pas", "Non vérifiable", "Autres"];
  etatDeProprete = ["Propre", "A nettoyer"];

  constructor(public http: HttpClient) {
    this.pieceSeche = {
      "piece": "Pièce Sèche",
      "donnees": [
        {"equipement": "Porte", "nature": 'nature', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Porte palière", "nature": ["Bois", "Bois peint", "Blindée", "PVC", "Aluminium", "Vitrée", "3 Points", "5 points", "Verrou haut", "Verrou bas", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Poignée", "nature": ["Aluminium", "Porcelaine", "Laiton", "Métal", "Plastique", "Pvc", "Encastrée", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Sol", "nature": 'natureSol', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Plinthes", "nature": 'naturePlinthes', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Mur accès", "nature": 'natureMur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Mur gauche", "nature": 'natureMur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Mur droit", "nature": 'natureMur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Mur face", "nature": 'natureMur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Ensemble des murs", "nature": 'natureMur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Plafond", "nature": 'naturePlafond', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Eclairage artificiel", "nature": 'natureEclairage', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Fenêtre", "nature": 'natureFenetre', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Porte fenêtre", "nature": 'natureFenetre', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Volets", "nature": 'natureVolets', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Ventilation", "nature": 'natureVentilation', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Radiateur", "nature": 'natureRadiateur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Chauffage", "nature": ["Climatiseur", "Poële à bois", "Poële à granulés", "poële à charbon", "Au sol", "Cheminée", "Cheminée décorative", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Placard", "nature": 'naturePlacard', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Prise de courant", "nature": 'naturePriseEtRobinet', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Prise TV", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Prise Téléphone", "nature": 'natureTelephone', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Interrupteur", "nature": 'natureInterrupteur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Tableau électrique", "nature": ["Coffret", "Coffet avec porte(s)", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Armoire", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Box internet", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Canapé", "nature": ["BZ", "Banquette", "Clic-clac", "Convertible", "Fixe", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Chaise(s)/tabouret(s)", "nature": ["Bois", "PVC", "Métal", "Haute", "Pliante", "Empilable", "A roulette", "Longue", "A bascule", "Fauteuil de bureau", "Pouf", "Tabouret de bar", "Tabouret", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Commode", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Console", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Décoration", "nature": ["Tableau", "Horloge", "Plante Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Fauteuil", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Four", "nature": ["Micro ondes", "traditionnel", "multifonction"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Lampe(s)", "nature": ["Chevet", "Bureau", "Halogène", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Linge de maison", "nature": ["Draps", "housse de couette", "taies d'oreiller", "serviettes", "alaise", "couette", "oreillers", "Traversin", "Serviette de bain", "Torchon", "Tapis de bain", "Gant de toilette", "Serviette de plage", "Rideaux", "Tapis", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Lit", "nature": ["Simple", "Double", "Duperposé", "Tête de lit", "Bois", "Métallique", "Stratifié", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Machine à laver", "nature": ["A hublot", "Top", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Matelas", "nature": ["Simple", "Double", "Bébé", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Meuble à chaussures", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Meuble TV", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Petit électroménager", "nature": ["Appareil à raclette", "Appareil à fondue", "Aspirateur", "Aspirateur sans sac", "Batteur", "Blender", "Cafetière", "Centrale vapeur", "Crêpière", "Friteuse", "Grille pain", "Mixeur", "Robot-multifonctions", "Sèche-cheveux", "", "Lecteur DVD", "Télécommande", "Lecteur TNT", "Ventilateur", "Pèse-personne", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Seche linge", "nature": ["Frontal", "Top", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Sommier", "nature": ["Cadre à lattes simple", "Cadre à lattes double", "Standard simple", "Standard double", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Table", "nature": ["Bois", "PVC", "Métal", "Ronde", "Rectangulaire", "Carré", "Murale", "A rallonge", "Basse", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Table à repasser", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Table de chevet", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Télévision", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Autres", "nature": ['Description'], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'}
      ]
    };
    this.cuisine = {
      "piece": "Cuisine",
      "donnees": [
        {"equipement": "Porte", "nature": this.nature, "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Sol", "nature": 'natureSol', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Plinthes", "nature": 'naturePlinthes', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Mur accès", "nature": 'natureMur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Mur gauche", "nature": 'natureMur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Mur droit", "nature": 'natureMur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Mur face", "nature": 'natureMur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Ensemble des murs", "nature": 'natureMur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Plafond", "nature": 'naturePlafond', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Eclairage artificiel", "nature": 'natureEclairage', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Fenêtre", "nature": 'natureFenetre', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Porte fenêtre", "nature": 'natureFenetre', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Volets", "nature": 'natureVolets', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Ventilation", "nature": 'natureVentilation', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Radiateur", "nature": 'natureRadiateur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Placard", "nature": 'naturePlacard', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Prise de courant", "nature": 'naturePriseEtRobinet', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Prise TV", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Prise Téléphone", "nature": 'natureTelephone', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Interrupteur", "nature": 'natureInterrupteur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Meuble(s) bas", "nature": "natureMeuble", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Meuble(s) haut", "nature": "natureMeuble", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Meuble sous évier", "nature": "natureMeuble", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Evier", "nature": ["PVC", "Alu", "Faïence", "Verre", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Robinetterie", "nature": ["PVC", "Alu", "Faïence", "Verre", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Siphon", "nature": 'natureSiphon', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Joint", "nature":["Silicone", "PVC", "Ciment", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Crédence", "nature": ["PVC", "Alu", "Faïence", "Verre", "Autres"], "couleur": 'defaut', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Plan de travail", "nature": ["Bois massif", "Mélaminé", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Table de cuisson", "nature": ["Gaz", "Electrique", "Vitrocéramique", "Induction", "2 Foyers", "3 Foyers", "4 Foyers", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Hotte", "nature": ["Mode évacuation", "Mode recyclage", "Décorative", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Four", "nature": ["Micro-ondes", "Traditionnel", "Multifonction", "Encastré", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Réfrigérateur", "nature": ["Top", "Standard", "Américain", "Intégré", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Décoration", "nature": ["Tableau", "Horloge", "Plante Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Fauteuil", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Four", "nature": ["Micro ondes", "traditionnel", "multifonction", "Marque:"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Lampe(s)", "nature": ["Chevet", "Bureau", "Halogène", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Linge de maison", "nature": ["Draps", "housse de couette", "taies d'oreiller", "serviettes", "alaise", "couette", "oreillers", "Traversin", "Serviette de bain", "Torchon", "Tapis de bain", "Gant de toilette", "Serviette de plage", "Rideaux", "Tapis", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Lit", "nature": ["Simple", "Double", "Duperposé", "Tête de lit", "Bois", "Métallique", "Stratifié", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Machine à laver", "nature": ["A hublot", "Top", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Matelas", "nature": ["Simple", "Double", "Bébé", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Meuble à chaussures", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Meuble TV", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Petit électroménager", "nature": ["Appareil à raclette", "Appareil à fondue", "Aspirateur", "Aspirateur sans sac", "Batteur", "Blender", "Cafetière", "Centrale vapeur", "Crêpière", "Friteuse", "Grille pain", "Mixeur", "Robot-multifonctions", "Sèche-cheveux", "", "Lecteur DVD", "Télécommande", "Lecteur TNT", "Ventilateur", "Pèse-personne", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Seche linge", "nature": ["Frontal", "Top", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Sommier", "nature": ["Cadre à lattes simple", "Cadre à lattes double", "Standard simple", "Standard double", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Table", "nature": ["Bois", "PVC", "Métal", "Ronde", "Rectangulaire", "Carré", "Murale", "A rallonge", "Basse", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Table à repasser", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Télévision", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Vaisselle et cuisson", "nature": ["assiettes creuses", "Assiettes plates", "Assiettes à dessert", "Couteau à pain", "", "couteaux", "Ciseau", "Casse-noix", "Casserole", "Cendrier", "Ccotte-minute", "Coquetier", "Couvercle", "Couverts à salade", "Cuillère à café", "Cuillère à soupe", "Décapsuleur", "Dessous de plat", "Econome", "Ecumoir", "Entonnoir", "Essoreuse à salade", "Faitout", "Fouet", "Louche", "Moules", "Mug", "Ouvre-boîte", "Passoire", "Etendoir à linge", "Pince", "Pinceau de cuisine", "Plancheà découper", "Planche à pain", "Plat", "Plateau", "Plateau à fromage", "Poêle", "Ploêle à crèpe", "Poivrier", "Presse-agrume", "Ramequin", "Range couverts", "Râpe à fromage", "Presse-ail", "Rouleau à pâtisserie", "Salière", "Sauteuse", "Soupière", "Sous-tasse", "Spatule", "Sucrier", "fourchettes", "cuilleres", "verres", "tasses", "bols", "carafe", "saladier", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Autres", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
      ]
    };
    this.salleDeBainWc = {
      "piece": "Salle de bains-WC",
      "donnees": [
        {"equipement": "Porte", "nature": ["Bois", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Sol", "nature": 'natureSol', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Plinthes", "nature": 'naturePlinthes', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Mur accès", "nature": 'natureMur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Mur gauche", "nature": 'natureMur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Mur droit", "nature": 'natureMur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Mur face", "nature": 'natureMur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Ensemble des murs", "nature": 'natureMur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Plafond", "nature": 'naturePlafond', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Eclairage artificiel", "nature": 'natureEclairage', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Fenêtre", "nature": 'natureFenetre', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Porte fenêtre", "nature": 'natureFenetre', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Volets", "nature": 'natureVolets', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Ventilation", "nature": 'natureVentilation', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Radiateur", "nature": 'natureRadiateur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Placard", "nature": 'naturePlacard', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Prise de courant", "nature": 'naturePriseEtRobinet', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Prise TV", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Prise Téléphone", "nature": 'natureTelephone', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Interrupteur", "nature": 'natureInterrupteur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Meuble(s) bas", "nature": "natureMeuble", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Meuble(s) haut", "nature": "natureMeuble", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Meuble Colonne", "nature": "natureMeuble", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Miroir", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Lavabo", "nature": ["Inox", "Grés", "Résine", "Céramique", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Lave-mains", "nature": ["Inox", "Grés", "Résine", "Céramique", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Meuble sous lavabo", "nature": ["Stratifié", "Bois", "Aluminium", "Etagère(e)", "Porte(s)", "Tiroir(s)", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Siphon", "nature": 'natureSiphon', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Robinetterie lavabo", "nature": 'natureRobinetterie', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Crédence", "nature": ["PVC", "Alu", "Faïence", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Joint", "nature":["Silicone", "PVC", "Ciment", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Baignoire", "nature": ["Acier émaillé", "Résine", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Robinetterie baignoire", "nature": 'natureRobinetterie', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Douche", "nature": ["A l'italienne", "Bac en grés", "Bac en PVC", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Robinetterie douche", "nature": 'natureRobinetterie', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Pare douche", "nature": ["PVC", "Verre", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "WC", "nature": ["Chasse d'eau", "Réservoir encastré", "Réservoir grés", "Abattant", "Robinet arrêt", "Cuvette céramique", "Suspendu", "Sani broyeur", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Accessoires", "nature": ["Distributeur papier-toilette", "Patère vissée", "Patère collée", "Porte-serviette", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Décoration", "nature": ["Tableau", "Horloge", "Plante Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Machine à laver", "nature": ["A hublot", "Top", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Seche linge", "nature": ["Frontal", "Top", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Autres", "nature": ["Bois", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'}
      ]
    };
    this.caveParking = {
      "piece": "Cave-Parking",
      "donnees": [
        {"equipement": "Porte", "nature": 'nature', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Sol", "nature": ["Brut", "Terre battue", "Goudron", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Mur accès", "nature": 'natureMurExt', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Mur gauche", "nature": 'natureMurExt', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Mur droit", "nature": 'natureMurExt', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Mur face", "nature": 'natureMurExt', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Ensemble des murs", "nature": 'natureMurExt', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Plafond", "nature": ["Peinture", "Toile de verre", "Dalles fibre minérale", "Tôles", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Eclairage artificiel", "nature": ["Globe", "Fils nus", "Domino", "Douille sans ampoule", "Douille avec ampoule", "Applique", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Fenêtre", "nature": 'natureFenetre', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Prise de courant", "nature": ["Simple", "Double", "Divers"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Interrupteur", "nature": 'natureInterrupteur', "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Mobilier", "nature": ["Etagère(s)", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Serrure", "nature": ["Cadenas", "Avec clé", "Verrou", "Autres"], "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'},
        {"equipement": "Autres", "couleur": 'couleur', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defaut', "etatDeFonctionnement": 'etatDeFonctionnement', "etatDeProprete": 'etatDeProprete'}
      ]
    };
    this.jardinExterieur = {
      "piece": "Jardin-Extérieur",
      "donnees": [
        {"equipement": "Sols", "nature": ["Pelouse", "Gravillons", "Sable", "Béton", "Terre battue", "Dalles bois", "Dalles gravillonnées", "Pelouse synthétique", "Autres"], "etatDeProprete": 'etatDeProprete', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin'},
        {"equipement": "Arbres", "etatDeProprete": 'etatDeProprete', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin'},
        {"equipement": "Arbustes", "etatDeProprete": 'etatDeProprete', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin'},
        {"equipement": "Haie", "etatDeProprete": 'etatDeProprete', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin'},
        {"equipement": "Clôture", "etatDeProprete": 'etatDeProprete', "nature": ["Grillage", "Bois", "Béton", "Panneaux", "Autres"], "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin'},
        {"equipement": "Portail-Portillon", "etatDeProprete": 'etatDeProprete', "nature": ["Grillage", "Bois", "PVC", "Fer forgé", "Alu", "Autres"], "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin', "etatDeFonctionnement": 'etatDeFonctionnement'},
        {"equipement": "Allée", "etatDeProprete": 'etatDeProprete', "nature": ["Pelouse", "Gravillons", "Sable", "Béton", "Dalle"], "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin'},
        {"equipement": "Mur maison", "etatDeProprete": 'etatDeProprete', "nature": ["Béton", "Crépi", "Peinture", "Pierre", "Autres"], "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin'},
        {"equipement": "Mur extérieur", "etatDeProprete": 'etatDeProprete', "nature": ["Béton", "Crépi", "Peinture", "Pierre", "Autres"], "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin'},
        {"equipement": "Plafond", "etatDeProprete": 'etatDeProprete', "nature": ["Peinture", "Poutres", "Autres"], "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin'},
        {"equipement": "Toiture", "etatDeProprete": 'etatDeProprete', "nature": ["Ardoises", "Tuiles", "Autres"], "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin'},
        {"equipement": "Séparation(s)", "etatDeProprete": 'etatDeProprete', "nature": ["Béton", "Béton peint", "Bois", "Plexiglass", "Aluminium", "Autres"], "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin'},
        {"equipement": "Eclairage", "etatDeProprete": 'etatDeProprete', "nature": ["Globe", "Fils nus", "Domino", "Douille sans ampoule", "Douille avec ampoule", "Applique", "Autres"], "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin', "etatDeFonctionnement": 'etatDeFonctionnement'},
        {"equipement": "Prise de courant", "etatDeProprete": 'etatDeProprete', "nature": 'naturePriseEtRobinet', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin', "etatDeFonctionnement": 'etatDeFonctionnement'},
        {"equipement": "Robinet", "etatDeProprete": 'etatDeProprete', "nature": 'naturePriseEtRobinet', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin', "etatDeFonctionnement": 'etatDeFonctionnement'},
        {"equipement": "Abris de jardin", "etatDeProprete": 'etatDeProprete', "nature": ["Bois", "PVC", "Autres"], "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin'},
        {"equipement": "Piscine", "etatDeProprete": 'etatDeProprete', "nature": ["En eau", "Vidée", "Autres"], "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin', "etatDeFonctionnement": 'etatDeFonctionnement'},
        {"equipement": "SPA", "etatDeProprete": 'etatDeProprete', "nature": ["En eau", "Vidée", "Autres"], "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin', "etatDeFonctionnement": 'etatDeFonctionnement'},
        {"equipement": "Garde-corps", "etatDeProprete": 'etatDeProprete', "nature": ["Acier", "Bois", "Fer forgé", "Inox", "Aluminium", "Plexiglass", "Autres"], "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin', "etatDeFonctionnement": 'etatDeFonctionnement'},
        {"equipement": "Autres", "etatDeProprete": 'etatDeProprete', "etatUsure": 'etatUsure', "details": 'details', "defaut": 'defautJardin', "etatDeFonctionnement": 'etatDeFonctionnement'}
      ]
    };
  }

  getPieceSeche(): any {
    return this.prepareData(this.pieceSeche);
  }

  getCuisine(): any {
    return this.prepareData(this.cuisine);
  }

  getSalleDeBainWc(): any {
    return this.prepareData(this.salleDeBainWc);
  }

  getCaveParking(): any {
    return this.prepareData(this.caveParking);
  }

  getJardinExterieur(): any {
    return this.prepareData(this.jardinExterieur);
  }

  prepareData(data) {
    for (let i = 0; i < data.donnees.length; i ++) {
      if (typeof data.donnees[i].nature === 'string') {
        data.donnees[i].nature = this[data.donnees[i].nature];
      }
      if (typeof data.donnees[i].couleur === 'string') {
        data.donnees[i].couleur = this[data.donnees[i].couleur];
      }
      if (typeof data.donnees[i].etatUsure === 'string') {
        data.donnees[i].etatUsure = this[data.donnees[i].etatUsure];
      }
      if (typeof data.donnees[i].details === 'string') {
        data.donnees[i].details = this[data.donnees[i].details];
      }
      if (typeof data.donnees[i].defaut === 'string') {
        data.donnees[i].defaut = this[data.donnees[i].defaut];
      }
      if (typeof data.donnees[i].etatDeFonctionnement === 'string') {
        data.donnees[i].etatDeFonctionnement = this[data.donnees[i].etatDeFonctionnement];
      }
      if (typeof data.donnees[i].etatDeProprete === 'string') {
        data.donnees[i].etatDeProprete = this[data.donnees[i].etatDeProprete];
      }
    }

    return data;
  }
}
