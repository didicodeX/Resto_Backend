const axios = require('axios');

const BASE_URL = 'http://localhost:3000/menu'; // Base URL de votre API

// Tester une requête GET
async function testGet() {
  try {
    const response = await axios.get(BASE_URL);
    console.log('GET /menu:', response.data);
  } catch (error) {
    console.error('Erreur GET:', error.message);
  }
}

// Tester une requête POST
async function testPost() {
  const newDish = {
    name: "Pizza Margherita",
    description: "Une pizza classique avec du fromage mozzarella.",
    price: 10.99,
    category: "Italien",
    image_url: "http://example.com/pizza.jpg"
  };

  try {
    const response = await axios.post(BASE_URL, newDish);
    console.log('POST /menu:', response.data);
  } catch (error) {
    console.error('Erreur POST:', error.message);
  }
}

// Tester une requête PUT
async function testPut() {
  const updatedDish = {
    name: "Pizza Margherita Deluxe",
    description: "Pizza classique avec mozzarella et basilic frais.",
    price: 12.99,
    category: "Italien",
    image_url: "http://example.com/pizza-deluxe.jpg"
  };

  try {
    const response = await axios.put(`${BASE_URL}/1`, updatedDish); // Remplacez "1" par l'ID d'un plat existant
    console.log('PUT /menu/1:', response.data);
  } catch (error) {
    console.error('Erreur PUT:', error.message);
  }
}

// Tester une requête DELETE
async function testDelete() {
  try {
    const response = await axios.delete(`${BASE_URL}/1`); // Remplacez "1" par l'ID d'un plat existant
    console.log('DELETE /menu/1:', response.data);
  } catch (error) {
    console.error('Erreur DELETE:', error.message);
  }
}

// Appeler les fonctions de test
async function runTests() {
  console.log('--- Lancer les tests de l\'API ---');
  await testGet();    // Récupérer les plats
  await testPost();   // Ajouter un plat
  await testPut();    // Mettre à jour un plat
  await testDelete(); // Supprimer un plat
}

runTests();
