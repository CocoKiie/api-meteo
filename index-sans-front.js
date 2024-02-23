//Les modules express et axios sont importés pour gérer le serveur web et effectuer des requêtes HTTP respectivement.
const express = require('express');
const axios = require('axios');

//Initialisation du server
//Un objet app est créé pour représenter l'application Express, et le port 3000 est spécifié comme port d'écoute du serveur.
const app = express();
const port = 3000;

const apiKey = '391e3e0a871d48d0a8882813241501'; //Ma clé d'API pour accéder à mon WEATHERAPI

//Route pour obtenir les données météo d'une ville :
//:ville est un paramètre représentant le nom de la ville, il utilise l'API pour obtenir les données météo de cette ville.
app.get('/meteo/:ville', async (req, res) => {
  const ville = req.params.ville;

  //Gestion de la requête météo avec axios
  //J'utilise axios pour effectuer une requête à l'API avec la clé API et le nom de la ville. 
  try { //En cas de succès, les données météo sont extraites de la réponse et renvoyées au client au format JSON.
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${ville}`);

    const meteoData = {
      ville: response.data.location.name,
      country: response.data.location.country,
      temperature: response.data.current.temp_c,
      description: response.data.current.condition.text,
      iconcondition: response.data.current.condition.icon
    };

    res.json(meteoData); //Envoie une réponse en json des données spécifiées
  } catch (error) { //En cas d'erreur, un message d'erreur est renvoyé avec un statut HTTP 500.
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des données météo.' });
  }
});

//Démarrage du serveur
//Le serveur est démarré et écoute sur le port spécifié, et un message est affiché dans la console lorsque le serveur démarre.
app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});