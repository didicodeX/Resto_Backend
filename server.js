const express = require('express');
const cors = require('cors'); // Import du middleware CORS
const connection = require('./db');

const app = express();
app.use(express.json()); // Permet de recevoir des données JSON
app.use(cors()); // Active CORS pour toutes les routes

const PORT = process.env.PORT || 3000;

// Route de test
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur RESTO 🍽️');
});

// Route pour récupérer les plats du menu
app.get('/menu', (req, res) => {
  connection.query('SELECT * FROM menu', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération du menu');
    } else {
      res.json(results);
    }
  });
});

// Ajouter un plat (POST)
app.post('/menu', (req, res) => {
  const { name, description, price, category, image_url } = req.body;

  // Use data from request body
  const sql = `INSERT INTO menu (name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?)`;
  connection.query(sql, [name, description, price, category, image_url], (err, result) => {
    if (err) {
      console.error(err);
      // Provide more specific error message based on error type/code
      res.status(500).send('Erreur lors de l\'ajout du plat. Vérifiez les données fournies.');
    } else {
      res.status(201).send({ message: 'Plat ajouté avec succès', id: result.insertId });
    }
  });
});

// Mettre à jour un plat (PUT)
app.put('/menu/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image_url } = req.body;

  const sql = 'UPDATE menu SET name = ?, description = ?, price = ?, category = ?, image_url = ? WHERE id = ?';
  connection.query(sql, [name, description, price, category, image_url, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la mise à jour du plat');
    } else {
      // Consider checking 'result.affectedRows' to see if the update affected any rows
      res.send({ message: 'Plat mis à jour avec succès' });
    }
  });
});

// Supprimer un plat (DELETE)
app.delete('/menu/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM menu WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression du plat');
    } else {
      // Consider checking 'result.affectedRows' to see if the delete affected any rows
      res.send({ message: 'Plat supprimé avec succès' });
    }
  });
});


// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT} 🚀`);
});
