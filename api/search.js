// api/search.js

export default async function handler(req, res) {
  
  // get query
  const { q } = req.query; 
  
  // tcheck query
  if (!q) {
    return res.status(400).json({ error: 'Get query info error' });
  }
  
  // 3. Récupérer les variables d'environnement (invisibles pour l'utilisateur !)
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = 'instagram-scraper-stable-api.p.rapidapi.com';
  
  // 4. Construire l'URL de l'API externe
  const url = `https://${apiHost}/?q=${q}`;
  
  // 5. Faire la requête vers l'API externe
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost
    }
  };
  
  try {
    const response = await fetch(url, options);
    const data = await response.text();
    
    // 6. Renvoyer le résultat au frontend
    return res.status(200).send(data);
    
  } catch (error) {
    console.error('Erreur API:', error);
    return res.status(500).json({ error: 'Erreur lors de la requête' });
  }
}