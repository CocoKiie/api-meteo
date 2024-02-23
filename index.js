//Les modules express et axios sont importés pour gérer le serveur web et effectuer des requêtes HTTP respectivement.
const express = require('express');
const axios = require('axios');

//Initialisation du server
//Un objet app est créé pour représenter l'application Express, et le port 3000 est spécifié comme port d'écoute du serveur.
const app = express();
const port = 3000;

const apiKey = 'f430f56890fb464fb7b142311241702'; //Ma clé d'API pour accéder à mon WEATHERAPI

//Route pour la page d'accueil
//Lorsqu'une requête est effectuée sur la racine du serveur, c'est à dire sur localhost:3000, il envoie le fichier index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//Route pour le fichier css
//Lorsqu'une requête est effectuée sur le chemin /index.css, il renvoie le fichier CSS
//Si je n'ai pas ces lignes le css est inexistant
app.get('/index.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(__dirname + '/index.css');
});

//Route pour obtenir les données météo d'une ville :
//:ville est un paramètre représentant le nom de la ville, il utilise l'API pour obtenir les données météo de cette ville.
app.get('/meteo/:ville', async (req, res) => {
  const ville = req.params.ville;

  //Gestion de la requête météo avec axios
  //J'utilise axios pour effectuer une requête à l'API avec la clé API et le nom de la ville. 
  try { //En cas de succès, les données météo sont extraites de la réponse et renvoyées au client au format JSON.
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?lang=fr&key=${apiKey}&q=${ville}`);

    const meteoData = {
      ville: response.data.location.name,
      region: response.data.location.region,
      lastupdate:response.data.current.last_updated,
      localtime:response.data.location.localtime,
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