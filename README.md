# Application de Services Juridiques RDC

Une application professionnelle de services juridiques construite avec HTML, CSS et JavaScript qui connecte les clients avec des avocats qualifiés pour des consultations et des conseils juridiques en République Démocratique du Congo.

## Features

### 🏛️ Services Principaux
- **Demander un Avocat**: Soumettre des questions juridiques et être connecté avec des avocats appropriés
- **Trouver un Avocat**: Parcourir et filtrer les avocats qualifiés par spécialisation
- **Rendez-vous**: Gérer vos consultations programmées
- **Q & R**: Accéder aux questions fréquemment posées et informations juridiques

### 📱 Interface Utilisateur
- **Design Moderne**: Interface propre et professionnelle avec thème sombre et accents dorés
- **Mobile-First**: Design responsive qui fonctionne sur tous les appareils
- **Cartes Interactives**: Effets de survol et animations fluides
- **Système Modal**: Fenêtres popup propres pour les interactions détaillées

### 🔧 Fonctionnalités Techniques
- **Validation de Formulaire**: Validation côté client pour tous les formulaires
- **Contenu Dynamique**: Chargement de contenu alimenté par JavaScript
- **Stockage Local**: Suivi des rendez-vous et préférences utilisateur
- **Navigation Responsive**: Barre de navigation adaptée aux mobiles

## Structure des Fichiers

```
application-services-juridiques-rdc/
├── index.html          # Structure HTML principale
├── styles.css          # Style CSS et design responsive
├── script.js           # Fonctionnalités JavaScript
└── README.md          # Cette documentation
```

## Instructions d'Installation

1. **Télécharger les Fichiers**: Sauvegardez tous les fichiers dans le même répertoire
2. **Ouvrir dans le Navigateur**: Double-cliquez sur `index.html` ou ouvrez-le dans votre navigateur web
3. **Aucun Serveur Requis**: C'est une application côté client qui fonctionne entièrement dans le navigateur

## Comment Utiliser

### Tableau de Bord Principal
- L'application s'ouvre sur une grille de cartes de services
- Chaque carte représente une fonctionnalité différente de la plateforme de services juridiques
- Cliquez sur n'importe quelle carte pour accéder à ce service

### Services Disponibles

#### Demander un Avocat
- Remplissez un formulaire complet avec votre question juridique
- Sélectionnez le domaine juridique et le niveau d'urgence
- Soumettez pour être connecté avec des avocats appropriés

#### Trouver un Avocat
- Parcourez un réseau d'avocats qualifiés
- Filtrez par spécialisation (Droit de la Famille, Droit des Affaires, etc.)
- Consultez les profils d'avocats avec évaluations, expérience et tarifs
- Réservez des consultations directement via la plateforme

#### Rendez-vous
- Consultez toutes vos consultations programmées
- Annulez des rendez-vous si nécessaire
- Suivez votre historique de consultations juridiques

#### Q & R
- Accédez aux questions juridiques fréquemment posées
- Obtenez des réponses rapides aux préoccupations juridiques courantes
- Lien pour poser de nouvelles questions

#### Gestion de Compte
- Consultez les informations du profil
- Vérifiez les statistiques de rendez-vous
- Accédez aux préférences du compte

## Fonctionnalités de Design

### Schéma de Couleurs
- **Primaire**: Arrière-plan gris foncé (#2c3e50, #34495e)
- **Accent**: Boutons dorés/jaunes (#f39c12, #e67e22)
- **Texte**: Blanc et gris clair pour la lisibilité

### Design Responsive
- **Mobile**: Optimisé pour smartphones et tablettes
- **Desktop**: Mise en page améliorée pour écrans plus grands
- **Système de Grille**: Disposition de cartes flexible qui s'adapte à la taille de l'écran

### Éléments Interactifs
- **Effets de Survol**: Les cartes se soulèvent et changent de couleur au survol
- **Animations Fluides**: Transitions CSS pour un aspect professionnel
- **Fenêtres Modales**: Système popup propre pour les interactions détaillées

## Compatibilité Navigateur

- ✅ Chrome (recommandé)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Navigateurs mobiles

## Personnalisation

### Ajouter de Nouveaux Avocats
Modifiez le tableau `lawyers` dans `script.js`:

```javascript
let lawyers = [
    {
        id: 7,
        name: "Maître Nouveau Nom",
        specialization: "Domaine de Pratique",
        experience: "X ans",
        rating: 4.5,
        location: "Ville, Province",
        hourlyRate: "XX$"
    }
];
```

### Modifier les Styles
- Modifiez `styles.css` pour changer les couleurs, polices ou mise en page
- Mettez à jour les variables de couleur pour des changements de thème faciles
- Modifiez les tailles de cartes et l'espacement selon les besoins

### Ajouter des Fonctionnalités
- Étendez les fonctions JavaScript dans `script.js`
- Ajoutez du contenu modal pour des services supplémentaires
- Implémentez l'intégration backend pour une fonctionnalité réelle

## Avertissement Juridique

Ceci est une application de démonstration. Pour des services juridiques réels:
- Consultez avec des avocats agréés
- Vérifiez les références des avocats
- Examinez les conditions d'utilisation et politiques de confidentialité
- Assurez-vous de la conformité avec les réglementations juridiques locales de la RDC

## Support

Pour des questions ou problèmes:
- Vérifiez la console du navigateur pour les erreurs JavaScript
- Assurez-vous que tous les fichiers sont dans le même répertoire
- Vérifiez que JavaScript est activé dans votre navigateur

## Licence

Ce projet est à des fins éducatives et de démonstration. N'hésitez pas à le modifier et l'utiliser pour vos propres projets.

---

**Construit avec ❤️ pour la communauté juridique congolaise** 