// Fonction asynchrone pour récupérer les données du fichier JSON, les mélanger et les afficher
async function initRandomCarousel() {
  // 1. On cible la div vide dans ton HTML
  const carousel = document.getElementById('carousel');
  
  // Sécurité : si la div n'existe pas sur la page, on arrête le script ici pour éviter des erreurs
  if (!carousel) return;

  try {
    // 2. On va chercher le fichier JSON qui contient toutes tes configs
    const reponse = await fetch('produits.json');
    const pcProducts = await reponse.json();

    // 3. On mélange le tableau récupéré (algorithme de tri aléatoire)
    const shuffled = [...pcProducts].sort(() => Math.random() - 0.5);
    
    // 4. On garde uniquement les 5 premiers éléments de la liste mélangée
    const selectedPCs = shuffled.slice(0, 5);

    // 5. On génère le HTML et on l'injecte dans la page
    carousel.innerHTML = selectedPCs.map(pc => `
      <a href="${pc.url}" style="text-decoration: none; color: inherit; display: block;">
        <div class="product-card" style="transition: transform 0.2s; cursor: pointer;">
          <img src="${pc.img}" alt="${pc.title}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 5px;">
          <h3 style="font-size: 14px; margin: 10px 0; color: #333; text-align: center;">${pc.title}</h3>
          <p style="font-weight: bold; color: #5e5bf4; margin: 0;">${pc.price} €</p>
        </div>
      </a>
    `).join('');

  } catch (erreur) {
    // S'il y a un problème (fichier introuvable, erreur de syntaxe dans le JSON, etc.)
    console.error("Erreur lors du chargement de tes configs PC :", erreur);
    carousel.innerHTML = "<p>Impossible de charger les produits pour le moment.</p>";
  }
}

// On lance la fonction automatiquement dès que la page HTML a fini de charger
window.addEventListener('DOMContentLoaded', initRandomCarousel);