# 💱 Convertisseur de Devises

Une application web moderne et intuitive pour convertir entre différentes devises en temps réel.

## ✨ Fonctionnalités

- **Conversion en temps réel** : Utilise des taux de change actualisés
- **Interface moderne** : Design responsive et attrayant
- **8 devises principales** : USD, EUR, GBP, JPY, CAD, CHF, AUD, CNY
- **Conversions populaires** : Accès rapide aux paires de devises les plus utilisées
- **Conversion automatique** : Résultats instantanés lors de la saisie
- **Bouton d'échange** : Inverser rapidement les devises
- **Historique des mises à jour** : Affichage de la dernière actualisation des taux

## 🚀 Installation et Utilisation

1. **Téléchargez** tous les fichiers dans un dossier
2. **Ouvrez** le fichier `index.html` dans votre navigateur web
3. **Commencez** à convertir vos devises !

Aucune installation supplémentaire n'est requise - l'application fonctionne directement dans le navigateur.

## 📱 Compatibilité

- ✅ Tous les navigateurs modernes (Chrome, Firefox, Safari, Edge)
- ✅ Responsive design (mobile, tablette, desktop)
- ✅ Fonctionne hors ligne avec des taux de démonstration

## 🔧 Technologies Utilisées

- **HTML5** : Structure de la page
- **CSS3** : Styles et animations modernes
- **JavaScript ES6+** : Logique de conversion et interactions
- **API ExchangeRate** : Taux de change en temps réel
- **Font Awesome** : Icônes
- **Google Fonts** : Typographie Inter

## 💡 Fonctionnalités Avancées

### Conversion Automatique
- Saisissez un montant et la conversion se fait automatiquement
- Délai de 500ms pour éviter les appels API excessifs

### Taux de Change
- **En ligne** : Utilise l'API ExchangeRate pour des taux réels
- **Hors ligne** : Utilise des taux de démonstration si l'API n'est pas disponible
- **Actualisation** : Rafraîchit automatiquement les taux toutes les 30 minutes

### Interface Utilisateur
- **Animations fluides** : Transitions et effets visuels
- **Feedback visuel** : Indicateurs de chargement et notifications d'erreur
- **Accessibilité** : Support des raccourcis clavier (Entrée pour convertir)

## 🎨 Design

- **Gradient moderne** : Arrière-plan dégradé violet-bleu
- **Cartes avec ombres** : Interface en profondeur
- **Couleurs cohérentes** : Palette de couleurs harmonieuse
- **Typographie claire** : Police Inter pour une excellente lisibilité

## 📊 Devises Supportées

| Code | Devise | Nom Complet |
|------|--------|-------------|
| USD | 💵 | Dollar US |
| EUR | 💶 | Euro |
| GBP | 💷 | Livre Sterling |
| JPY | 💴 | Yen Japonais |
| CAD | 💵 | Dollar Canadien |
| CHF | 💵 | Franc Suisse |
| AUD | 💵 | Dollar Australien |
| CNY | 💴 | Yuan Chinois |

## 🔄 API de Taux de Change

L'application utilise l'API gratuite [ExchangeRate-API](https://exchangerate-api.com/) pour obtenir les taux de change en temps réel.

**Limitations de l'API gratuite :**
- 1000 requêtes par mois
- Taux mis à jour quotidiennement
- Base de devise : USD

## 🛠️ Structure des Fichiers

```
convertisseur/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── script.js           # Logique JavaScript
└── README.md           # Documentation
```

## 🎯 Utilisation

1. **Entrez un montant** dans le champ de saisie
2. **Sélectionnez la devise source** dans le menu déroulant "De"
3. **Sélectionnez la devise cible** dans le menu déroulant "Vers"
4. **Cliquez sur "Convertir"** ou attendez la conversion automatique
5. **Utilisez le bouton d'échange** pour inverser rapidement les devises
6. **Cliquez sur une conversion populaire** pour l'utiliser directement

## 🔧 Personnalisation

### Ajouter de nouvelles devises

Pour ajouter une nouvelle devise, modifiez le fichier `index.html` :

```html
<option value="NOM_DEVISE">NOM_DEVISE - Nom de la devise</option>
```

Et ajoutez le taux correspondant dans `script.js` :

```javascript
this.exchangeRates = {
    // ... autres devises
    'NOM_DEVISE': taux_vers_usd
};
```

### Modifier les couleurs

Les couleurs principales sont définies dans `styles.css` :

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #ffd700;
}
```

## 📈 Améliorations Futures

- [ ] Ajout de graphiques d'évolution des taux
- [ ] Historique des conversions
- [ ] Plus de devises (cryptomonnaies, etc.)
- [ ] Mode sombre
- [ ] Application mobile native
- [ ] Export des résultats en PDF

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Ajouter de nouvelles fonctionnalités

## 📄 Licence

Ce projet est open source et disponible sous licence MIT.

---

**Développé avec ❤️ pour simplifier la conversion de devises** 