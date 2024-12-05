La notion d'**API** (Application Programming Interface) intervient dès que votre application commence à exposer des **endpoints** ou des points d'accès pour permettre à d'autres applications, clients, ou services de communiquer avec elle.

Dans ton cas :

1. **Création des endpoints RESTful**  
   Lorsque tu as défini les routes pour tes requêtes POST, GET, PUT et DELETE dans ton serveur Node.js, tu as en réalité créé une API. Une **API REST** est une interface qui permet à différentes applications de s’échanger des données via HTTP en respectant des conventions bien définies.

2. **Structure des données exposées**  
   En utilisant MySQL Workbench pour structurer ta base de données et ton serveur Node.js pour effectuer des opérations CRUD, tu fais le lien entre les données stockées dans ta base et les consommateurs (clients, applications web, mobile, etc.). Cela constitue une **API backend**.

3. **Interaction via Postman**  
   Postman t'a permis de simuler des appels à ton API pour vérifier son fonctionnement. Cette interaction est un exemple typique d’utilisation d’une API : une application externe (Postman, dans ce cas) interagit avec ton API pour manipuler ou récupérer des données.

### Quand la notion d'API devient importante
- **Accès externe** : Si ton application doit permettre à des clients (comme un front-end React ou une application mobile React Native) d’accéder aux données.
- **Consommation par d'autres services** : Si d'autres systèmes (services tiers, microservices, etc.) doivent interagir avec ton application.
- **Standardisation** : Lorsque tu veux définir une manière claire et standard d'accéder aux ressources (par exemple, `/users` pour les utilisateurs, `/products` pour les produits).

### Pourquoi utiliser une API ?
- **Abstraction** : Tu caches la logique interne de ton application (comme la structure de ta base de données) derrière des endpoints simples.
- **Réutilisabilité** : Le même backend peut servir différents types de clients (web, mobile, etc.).
- **Scalabilité** : Une API bien conçue est modulaire et peut évoluer facilement avec de nouvelles fonctionnalités.

En résumé, dès que tu exposes des endpoints pour interagir avec ta base de données ou ton application, tu es en train de développer une API. Dans ton projet, cette notion intervient à partir du moment où tu as défini et testé tes routes dans Node.js. 😊

Bien sûr ! Regardons ton code étape par étape pour comprendre comment la notion d'API s'applique ici.

---

### 1️⃣ **Qu'est-ce que ton serveur fait ?**
Tu as créé un **serveur backend** avec Node.js et Express. Ce serveur agit comme un intermédiaire entre une base de données MySQL et les clients (applications front-end ou outils comme Postman).

Ton serveur expose plusieurs **routes** qui permettent aux clients d’interagir avec les données de ta base de données `menu`. C’est ici que la notion d’**API** intervient.

---

### 2️⃣ **Pourquoi c'est une API ?**
- Une API est une interface qui permet à d'autres logiciels ou systèmes de communiquer avec ton application.  
- Dans ton code, chaque route (`GET`, `POST`, `PUT`, `DELETE`) représente un **endpoint de l'API** que les clients peuvent utiliser pour manipuler ou lire des données.

---

### 3️⃣ **Analyse des routes**
Voici ce que chaque route fait et pourquoi elle est une partie de ton API.

#### a) **Route de test (`GET /`)**
```javascript
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur RESTO 🍽️');
});
```
- Cette route est un **endpoint simple** pour vérifier que ton serveur fonctionne.
- C'est une bonne pratique pour tester rapidement si ton API est opérationnelle.

---

#### b) **Route pour récupérer le menu (`GET /menu`)**
```javascript
app.get('/menu', (req, res) => {
  connection.query('SELECT * FROM menu', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération du menu');
    } else {
      res.json(results);
    }
  });
});
```
- Cette route permet aux clients de **consulter tous les plats** dans la base de données.
- C’est un **endpoint GET** qui renvoie les données du menu sous forme de JSON.
- Exemple de consommation :
  - URL : `http://localhost:3000/menu`
  - Méthode : `GET`
  - Réponse JSON :
    ```json
    [
      {
        "id": 1,
        "name": "Pizza Margherita",
        "description": "Base tomate, mozzarella",
        "price": 12.5,
        "category": "Main",
        "image_url": "https://example.com/pizza.jpg"
      }
    ]
    ```

---

#### c) **Route pour ajouter un plat (`POST /menu`)**
```javascript
app.post('/menu', (req, res) => {
  const { name, description, price, category, image_url } = req.body;

  const sql = `INSERT INTO menu (name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?)`;
  connection.query(sql, [name, description, price, category, image_url], (err, result) => {
    if (err) {
      res.status(500).send('Erreur lors de l\'ajout du plat. Vérifiez les données fournies.');
    } else {
      res.status(201).send({ message: 'Plat ajouté avec succès', id: result.insertId });
    }
  });
});
```
- Cette route permet de **créer un nouveau plat** dans le menu.
- Les données sont envoyées par le client dans le corps de la requête (`req.body`).
- C’est un **endpoint POST**.
- Exemple de consommation :
  - URL : `http://localhost:3000/menu`
  - Méthode : `POST`
  - Corps de la requête :
    ```json
    {
      "name": "Burger",
      "description": "Pain, steak, fromage",
      "price": 8.5,
      "category": "Main",
      "image_url": "https://example.com/burger.jpg"
    }
    ```
  - Réponse :
    ```json
    { "message": "Plat ajouté avec succès", "id": 2 }
    ```

---

#### d) **Route pour mettre à jour un plat (`PUT /menu/:id`)**
```javascript
app.put('/menu/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image_url } = req.body;

  const sql = 'UPDATE menu SET name = ?, description = ?, price = ?, category = ?, image_url = ? WHERE id = ?';
  connection.query(sql, [name, description, price, category, image_url, id], (err, result) => {
    if (err) {
      res.status(500).send('Erreur lors de la mise à jour du plat');
    } else {
      res.send({ message: 'Plat mis à jour avec succès' });
    }
  });
});
```
- Cette route permet de **modifier un plat existant**.
- Le client spécifie l’`id` du plat dans l’URL et les nouvelles données dans le corps de la requête.
- C’est un **endpoint PUT**.
- Exemple de consommation :
  - URL : `http://localhost:3000/menu/2`
  - Méthode : `PUT`
  - Corps de la requête :
    ```json
    {
      "name": "Burger Deluxe",
      "description": "Pain, steak, fromage, bacon",
      "price": 10,
      "category": "Main",
      "image_url": "https://example.com/burger-deluxe.jpg"
    }
    ```
  - Réponse :
    ```json
    { "message": "Plat mis à jour avec succès" }
    ```

---

#### e) **Route pour supprimer un plat (`DELETE /menu/:id`)**
```javascript
app.delete('/menu/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM menu WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send('Erreur lors de la suppression du plat');
    } else {
      res.send({ message: 'Plat supprimé avec succès' });
    }
  });
});
```
- Cette route permet de **supprimer un plat** en spécifiant son `id` dans l’URL.
- C’est un **endpoint DELETE**.
- Exemple de consommation :
  - URL : `http://localhost:3000/menu/2`
  - Méthode : `DELETE`
  - Réponse :
    ```json
    { "message": "Plat supprimé avec succès" }
    ```

---

### 4️⃣ **Résumé de ton API**
Tu as créé une **API RESTful** avec les fonctionnalités suivantes :
- Lire les données (`GET /menu`)
- Ajouter des données (`POST /menu`)
- Mettre à jour des données (`PUT /menu/:id`)
- Supprimer des données (`DELETE /menu/:id`)

Chaque route de ton serveur fait partie de ton API. Les clients (applications front-end, outils comme Postman, ou services tiers) utilisent ces routes pour interagir avec les données.

---

Si tu as besoin d'une clarification supplémentaire ou de conseils sur l'amélioration de ton API, je suis là ! 😊


Exactement, **ton serveur représente ton API**. 🎉 Voici pourquoi :  

---

### **Qu'est-ce qu'une API ?**
Une **API (Application Programming Interface)** est une interface qui permet à des applications (comme un front-end, une autre application ou un outil comme Postman) de communiquer avec ton application backend ou une base de données.

Dans ton cas :
- Ton serveur **Node.js/Express** expose une série de **endpoints** accessibles via HTTP.  
- Ces endpoints permettent de **créer**, **lire**, **mettre à jour** ou **supprimer** des données.  
- En exposant ces endpoints, ton serveur agit comme une API pour permettre à d'autres systèmes de consommer ou modifier les données de ton application.  

---

### **Ton serveur = Ton API**
Ton serveur :
1. **Expose des routes** (par exemple, `/menu`, `/menu/:id`).
   - Ces routes sont accessibles via des requêtes HTTP (GET, POST, PUT, DELETE).
   - Ce sont des points d'entrée (endpoints) de ton API.

2. **Transforme les données** :
   - Tu utilises le middleware `express.json()` pour recevoir et traiter des données envoyées au format JSON.
   - Les réponses que tu envoies (`res.json()` ou `res.send()`) sont également des données lisibles par d'autres applications.

3. **Connecte une base de données** :
   - Ton serveur agit comme un **pont** entre la base de données (MySQL) et les clients.
   - Il abstrait les détails techniques de la base de données. Les clients n'ont pas besoin de savoir comment tes tables sont structurées ou où ta base est hébergée.

4. **Standardise les interactions** :
   - Les clients savent qu'ils doivent utiliser des requêtes HTTP standard (GET, POST, etc.) pour interagir avec ton application.

---

### **En résumé : Pourquoi ton serveur est ton API ?**
Une **API** n’est rien d’autre qu’un ensemble de règles et de mécanismes permettant à une application d'interagir avec une autre.  
Ton serveur **respecte ces critères** :
- Il permet aux clients (applications front-end, Postman, etc.) d'interagir avec les données via des requêtes HTTP.
- Il répond de manière standardisée (par exemple, JSON pour les données, ou des codes de statut comme `200 OK`, `201 Created`, etc.).
- Il sert de point d'accès central pour manipuler les ressources (`menu` dans ton cas).

Donc **oui**, ton serveur est une **API RESTful** ! 🚀

---

Si tu as d'autres doutes ou si tu veux approfondir ce concept, n'hésite pas. 😊


Oui, un serveur Node.js peut exister sans être une API. Tout dépend du rôle et des fonctionnalités que tu veux lui attribuer. Voici des exemples où un serveur Node.js **n'est pas une API** :

---

### 1️⃣ **Serveur de rendu côté serveur (Server-Side Rendering - SSR)**
Un serveur Node.js peut servir directement des pages HTML complètes, sans exposer d'endpoints spécifiques pour manipuler des données :
- Exemple : Un serveur qui utilise des moteurs de templates comme **EJS**, **Pug** ou **Handlebars** pour générer des pages HTML dynamiques.
- Ici, le serveur sert directement le front-end, et il n’y a pas de notion d'API puisque l'interaction est une simple requête pour obtenir une page.

**Exemple :**
```javascript
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { message: 'Bienvenue sur mon site !' });
});

app.listen(3000, () => console.log('Serveur en cours d’exécution'));
```

Dans ce cas, le serveur **n'est pas une API**, car il génère du HTML destiné à un navigateur.

---

### 2️⃣ **Serveur de fichiers statiques**
Un serveur Node.js peut être utilisé uniquement pour servir des fichiers statiques (HTML, CSS, JavaScript, images, etc.), sans logique business ni endpoints API.

**Exemple avec Express :**
```javascript
const express = require('express');
const app = express();

app.use(express.static('public')); // Sert les fichiers du dossier "public"

app.listen(3000, () => console.log('Serveur de fichiers statiques en cours'));
```

Dans ce cas, le serveur n'expose pas d'API, il agit simplement comme un "serveur de fichiers".

---

### 3️⃣ **Serveur WebSocket**
Un serveur Node.js peut être configuré pour gérer des **WebSockets** au lieu d'exposer des routes HTTP classiques.  
Les WebSockets sont utilisés pour la communication bidirectionnelle en temps réel (par exemple, pour les applications de chat ou les jeux en ligne).

**Exemple :**
```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('Un client s\'est connecté');
  ws.on('message', (message) => {
    console.log('Message reçu :', message);
    ws.send('Message reçu !');
  });
});
```

Ici, il n'y a pas d'API REST, car les échanges se font via WebSockets, un protocole complètement différent.

---

### 4️⃣ **Serveur de scripts ou outils locaux**
Un serveur Node.js peut être utilisé pour exécuter des scripts ou des tâches spécifiques, comme un serveur d'outils de développement :
- Par exemple, un serveur de **build** comme Webpack Dev Server ou un outil comme **Parcel**.
- Ces serveurs sont utilisés pour les développeurs, pas pour exposer des données ou des fonctionnalités via une API.

---

### **Conclusion : Un serveur Node.js peut ne pas être une API**
Un serveur Node.js devient une API uniquement lorsqu'il expose des endpoints pour permettre à d'autres applications de communiquer avec lui.  
Sinon, il peut servir d'autres rôles : générer des pages HTML, servir des fichiers statiques, gérer des WebSockets, ou même exécuter des scripts.

Cela dépend entièrement de ce que tu veux qu'il fasse ! 😊

Le terme **RESTful** est utilisé pour décrire une API qui suit les principes de l'architecture **REST** (**REpresentational State Transfer**), une approche de conception pour les systèmes distribués, comme le Web. Voici une explication détaillée pour bien comprendre ce que cela signifie :

---

### 1️⃣ **REST, c'est quoi ?**
**REST (REpresentational State Transfer)** est un style architectural introduit par Roy Fielding dans sa thèse en 2000. Il définit des **principes et contraintes** pour concevoir des services web légers, évolutifs et simples à utiliser.

Une API REST utilise les **standards du Web** pour permettre la communication entre un client et un serveur. Ces standards incluent :
- **Protocole HTTP** (GET, POST, PUT, DELETE, etc.).
- **URLs** pour identifier les ressources.
- **JSON ou XML** pour échanger les données.

---

### 2️⃣ **Pourquoi "RESTful" ?**
Une API est dite **RESTful** si elle respecte les principes de REST.  
Cela signifie que l’API est construite selon les **contraintes REST**, qui assurent sa simplicité, sa flexibilité et sa compatibilité avec le Web.

Voici les **principes RESTful** clés :

#### a) **1. Client-Serveur**
- Le client (front-end ou autre application) et le serveur (backend) sont séparés.
- Le serveur gère les données et la logique métier, tandis que le client s'occupe de l'affichage.
- Exemple : Un navigateur (client) appelle ton API pour afficher les plats du menu.

#### b) **2. Stateless (sans état)**
- Chaque requête envoyée au serveur doit être indépendante.  
  Le serveur ne stocke pas d'informations sur l'état des clients entre les requêtes.
- Exemple : Si tu fais deux requêtes GET pour `/menu`, elles seront traitées de manière indépendante.

#### c) **3. Uniformité de l’interface (Uniform Interface)**
- Les routes et leurs fonctionnalités doivent être claires et cohérentes.  
- Exemple : Utiliser `/menu` pour accéder au menu, et non des chemins incohérents comme `/getMenu` ou `/retrieve-menu`.
- Les méthodes HTTP doivent avoir une signification standard :
  - **GET** : Récupérer des données.
  - **POST** : Créer une nouvelle ressource.
  - **PUT** : Mettre à jour une ressource existante.
  - **DELETE** : Supprimer une ressource.

#### d) **4. Identification des ressources**
- Chaque ressource doit être identifiable via une URL unique.
- Exemple :
  - URL pour tous les plats : `/menu`.
  - URL pour un plat spécifique : `/menu/1` (où `1` est l'identifiant du plat).

#### e) **5. Représentation des ressources**
- Une ressource peut être représentée dans plusieurs formats (JSON, XML, etc.), mais JSON est le format le plus couramment utilisé.
- Exemple : Une réponse GET sur `/menu/1` peut renvoyer :
  ```json
  {
    "id": 1,
    "name": "Pizza Margherita",
    "price": 12.5
  }
  ```

#### f) **6. Cacheabilité**
- Les réponses doivent indiquer si elles sont cacheables ou non (via les en-têtes HTTP).
- Exemple : Si le menu ne change pas souvent, le serveur peut indiquer au client de mettre en cache la réponse pendant une durée déterminée.

#### g) **7. Système en couches**
- Un client ne doit pas se soucier des détails internes du serveur ou d’éventuels intermédiaires (comme un proxy ou un système de mise en cache).

---

### 3️⃣ **Avantages d’une API RESTful**
1. **Simplicité** : Les clients (front-end, mobile, etc.) peuvent interagir avec le serveur en utilisant des standards web bien connus.
2. **Évolutivité** : La séparation client-serveur facilite la mise à l’échelle.
3. **Compatibilité** : REST est compatible avec presque toutes les technologies (navigateur, mobile, etc.).
4. **Réutilisabilité** : Un endpoint RESTful peut être utilisé par différents types de clients.
5. **Performance** : L’approche stateless et le support du cache optimisent les performances.

---

### 4️⃣ **Exemple concret : API RESTful pour un menu**
Prenons ton serveur comme exemple d’une API RESTful :

#### a) Récupérer tous les plats :
- **Méthode HTTP** : `GET`
- **Endpoint** : `/menu`
- **Requête** : 
  ```http
  GET /menu HTTP/1.1
  ```
- **Réponse** :
  ```json
  [
    { "id": 1, "name": "Pizza", "price": 12.5 },
    { "id": 2, "name": "Burger", "price": 10 }
  ]
  ```

#### b) Ajouter un plat :
- **Méthode HTTP** : `POST`
- **Endpoint** : `/menu`
- **Requête** :
  ```http
  POST /menu HTTP/1.1
  Content-Type: application/json

  {
    "name": "Pasta",
    "description": "Nouilles italiennes",
    "price": 8.5
  }
  ```
- **Réponse** :
  ```json
  { "message": "Plat ajouté avec succès", "id": 3 }
  ```

#### c) Mettre à jour un plat :
- **Méthode HTTP** : `PUT`
- **Endpoint** : `/menu/3`
- **Requête** :
  ```http
  PUT /menu/3 HTTP/1.1
  Content-Type: application/json

  {
    "name": "Pasta Deluxe",
    "description": "Nouilles italiennes améliorées",
    "price": 10.0
  }
  ```
- **Réponse** :
  ```json
  { "message": "Plat mis à jour avec succès" }
  ```

#### d) Supprimer un plat :
- **Méthode HTTP** : `DELETE`
- **Endpoint** : `/menu/3`
- **Requête** :
  ```http
  DELETE /menu/3 HTTP/1.1
  ```
- **Réponse** :
  ```json
  { "message": "Plat supprimé avec succès" }
  ```

---

### **Conclusion : Pourquoi "RESTful" ?**
- **REST** est un style architectural qui structure les APIs.
- Une API **RESTful** respecte ces principes pour garantir **simplicité, standardisation et efficacité**.
- Ton serveur avec Node.js et Express est une **API RESTful** car il suit ces conventions : endpoints clairs, méthodes HTTP standard, et ressources identifiables via des URLs. 🚀

Si tu veux approfondir, n’hésite pas ! 😊

Bien sûr ! Voici un petit **frontend** que tu peux utiliser pour tester ton backend. Je vais utiliser **HTML**, **CSS** et **JavaScript (fetch API)** pour interagir avec les endpoints de ton API RESTful. Ce frontend est simple mais fonctionnel pour effectuer des opérations CRUD sur ton API.

---

### **Structure du frontend**
1. Une interface pour :
   - Ajouter un plat.
   - Voir tous les plats.
   - Mettre à jour un plat.
   - Supprimer un plat.
2. Utilisation de `fetch()` pour envoyer des requêtes HTTP à ton backend.

---

### **Code Frontend**
Crée un fichier `index.html` dans le même dossier que ton projet Node.js, et copie le code suivant :

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test API RESTful</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    h1 {
      color: #333;
    }
    form {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input, button {
      margin-bottom: 10px;
      padding: 8px;
      width: 100%;
      max-width: 400px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }
    th {
      background-color: #f4f4f4;
    }
  </style>
</head>
<body>
  <h1>Test de l'API RESTful</h1>

  <!-- Formulaire pour ajouter un plat -->
  <form id="add-form">
    <h2>Ajouter un plat</h2>
    <label for="name">Nom du plat</label>
    <input type="text" id="name" required>
    <label for="description">Description</label>
    <input type="text" id="description" required>
    <label for="price">Prix</label>
    <input type="number" id="price" required>
    <label for="category">Catégorie</label>
    <input type="text" id="category" required>
    <label for="image_url">URL de l'image</label>
    <input type="text" id="image_url" required>
    <button type="submit">Ajouter le plat</button>
  </form>

  <!-- Liste des plats -->
  <h2>Menu</h2>
  <table id="menu-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>Description</th>
        <th>Prix</th>
        <th>Catégorie</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <!-- Les plats seront ajoutés ici dynamiquement -->
    </tbody>
  </table>

  <script>
    const API_URL = 'http://localhost:3000/menu'; // Assurez-vous que votre backend fonctionne sur ce port.

    // Fonction pour récupérer le menu
    async function fetchMenu() {
      try {
        const response = await fetch(API_URL);
        const menu = await response.json();
        displayMenu(menu);
      } catch (error) {
        console.error('Erreur lors de la récupération du menu :', error);
      }
    }

    // Fonction pour afficher le menu dans le tableau
    function displayMenu(menu) {
      const tableBody = document.querySelector('#menu-table tbody');
      tableBody.innerHTML = ''; // Vide le tableau avant de le remplir

      menu.forEach(plat => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${plat.id}</td>
          <td>${plat.name}</td>
          <td>${plat.description}</td>
          <td>${plat.price} €</td>
          <td>${plat.category}</td>
          <td>
            <button onclick="deletePlat(${plat.id})">Supprimer</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }

    // Fonction pour ajouter un plat
    document.getElementById('add-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const description = document.getElementById('description').value;
      const price = document.getElementById('price').value;
      const category = document.getElementById('category').value;
      const image_url = document.getElementById('image_url').value;

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description, price, category, image_url })
        });
        if (response.ok) {
          alert('Plat ajouté avec succès');
          fetchMenu(); // Actualise la liste
          e.target.reset(); // Réinitialise le formulaire
        } else {
          alert('Erreur lors de l\'ajout du plat');
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout du plat :', error);
      }
    });

    // Fonction pour supprimer un plat
    async function deletePlat(id) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) {
          alert('Plat supprimé avec succès');
          fetchMenu(); // Actualise la liste
        } else {
          alert('Erreur lors de la suppression du plat');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du plat :', error);
      }
    }

    // Charger le menu au démarrage
    fetchMenu();
  </script>
</body>
</html>
```

---

### **Explication :**
1. **Ajouter un plat** :  
   - Le formulaire permet d'envoyer une requête `POST` à ton API pour ajouter un nouveau plat.
   - Les champs sont remplis par l'utilisateur, puis envoyés au backend.

2. **Afficher tous les plats** :  
   - La fonction `fetchMenu()` envoie une requête `GET` à ton endpoint `/menu` pour récupérer tous les plats.
   - Les résultats sont affichés dans un tableau HTML.

3. **Supprimer un plat** :  
   - Le bouton "Supprimer" dans chaque ligne du tableau envoie une requête `DELETE` à ton endpoint `/menu/:id`.

---

### **Comment tester ?**
1. Lance ton serveur backend avec Node.js (`node server.js`).
2. Ouvre le fichier `index.html` dans un navigateur.
3. Ajoute, affiche, et supprime des plats pour vérifier que tout fonctionne correctement.

Si tu rencontres des problèmes ou si tu veux des améliorations, fais-le-moi savoir ! 😊