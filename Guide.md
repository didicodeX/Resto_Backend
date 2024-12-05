Parfait ! 😊 Je vais t’aider à rédiger un **guide complet et détaillé**, étape par étape, que tu pourras copier-coller dans un fichier **Markdown** (`.md`) ou **Word** (`.docx`). Ce document couvrira chaque étape que nous avons réalisée.

---

## 🚀 **Plan du Guide** :

1. **Introduction**  
2. **Création de la Base de Données MySQL**  
3. **Développement du Backend avec Node.js & Express**  
4. **Tests de l'API avec Postman**  
5. **Déploiement du Backend sur Heroku**  
6. **Déploiement du Frontend sur Vercel**  
7. **Optimisation SEO**  
8. **Conclusion**

---

### 📝 **Étape 1 : Introduction**

# Guide Complet : Développement Fullstack JavaScript

## Objectif
Ce guide vous accompagne dans la création d'une application web fullstack avec :
- Un backend en **Node.js** & **Express**.
- Une base de données **MySQL**.
- Un frontend déployé sur **Vercel**.
- Un backend déployé sur **Heroku**.

Vous apprendrez également à :
- Tester l'API avec **Postman**.
- Optimiser le site pour le **SEO**.

---

### 📝 **Étape 2 : Création de la Base de Données MySQL**

## 1. Création de la Base de Données MySQL

### Installation de MySQL
Téléchargez et installez MySQL depuis [dev.mysql.com](https://dev.mysql.com/downloads/).

### Création de la Base de Données et des Tables
Ouvrez **MySQL Workbench** ou connectez-vous via le terminal :

```sql
CREATE DATABASE resto_db;
USE resto_db;

CREATE TABLE menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    image_url VARCHAR(255)
);
```

### Insertion de Données
Ajoutez quelques plats à la table `menu` :

```sql
INSERT INTO menu (name, description, price, category, image_url)
VALUES
('Pizza Margherita', 'Pizza classique avec tomate, mozzarella et basilic', 10.00, 'Dinner', 'https://via.placeholder.com/150'),
('Tiramisu', 'Dessert italien à base de café', 8.50, 'Dessert', 'https://via.placeholder.com/150');
```

---

### 📝 **Étape 3 : Développement du Backend avec Node.js & Express**

## 2. Développement du Backend avec Node.js & Express

### Initialisation du Projet Node.js
Dans le terminal :

```bash
mkdir resto-backend
cd resto-backend
npm init -y
npm install express mysql2 dotenv body-parser
```

### Configuration du Backend (`index.js`)
Créez le fichier `index.js` et ajoutez le code suivant :

```javascript
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) console.error('Erreur de connexion :', err);
    else console.log('Connecté à MySQL !');
});

app.get('/menu', (req, res) => {
    db.query('SELECT * FROM menu', (err, results) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
```

### Configuration des Variables d’Environnement
Créez un fichier `.env` à la racine du projet et ajoutez :

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=ton_mot_de_passe
DB_NAME=resto_db
```

---

### 📝 **Étape 4 : Tests de l'API avec Postman**

## 3. Tests de l'API avec Postman

### Tester la Route GET `/menu`
1. Ouvrez **Postman**.
2. Créez une nouvelle requête **GET**.
3. URL : `http://localhost:3000/menu`.
4. Cliquez sur **Send**.

### Résultat Attendu
Vous devriez voir une liste des plats enregistrés dans la table `menu`.

---

### 📝 **Étape 5 : Déploiement du Backend sur Heroku**

## 4. Déploiement du Backend sur Heroku

### Étapes :
1. **Connectez-vous à Heroku** :
```bash
heroku login
```

2. **Initialisez un dépôt Git si ce n’est pas déjà fait** :
```bash
git init
git add .
git commit -m "Initial commit"
```

3. **Créez une application Heroku** :
```bash
heroku create nom-de-votre-app
```

4. **Ajoutez l'addon ClearDB pour MySQL** :
```bash
heroku addons:create cleardb:ignite
```

5. **Déployez l’application** :
```bash
git push heroku master
```

---

### 📝 **Étape 6 : Déploiement du Frontend sur Vercel**

## 5. Déploiement du Frontend sur Vercel

### Étapes :
1. **Connectez-vous à Vercel**.
2. **Cliquez sur "New Project"** et sélectionnez le dépôt GitHub du frontend.
3. **Déployez l’application**.

### Configuration des Appels API
Dans le fichier `script.js` du frontend, modifiez l’URL du backend :

```javascript
const API_URL = "https://nom-de-votre-app.herokuapp.com";
```

---

### 📝 **Étape 7 : Optimisation SEO**

## 6. Optimisation SEO

1. **Utilisez des balises meta** pour améliorer la visibilité dans les moteurs de recherche.
```html
<meta name="description" content="Restaurant Mon Resto - Découvrez nos plats délicieux.">
<meta name="keywords" content="restaurant, plats, réserver, livraison">
```

2. **Ajoutez un fichier `sitemap.xml`** à la racine du site.
3. **Soumettez le site à Google Search Console**.

---

### **Conclusion**

Je peux continuer à ajouter plus de contenu ou personnaliser le guide selon tes besoins. Est-ce que cette structure te convient pour que tu puisses la compléter dans un fichier Markdown ? 😊