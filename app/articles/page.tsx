import ArticlesWrapper from '@/components/articles/articles-wrappers';

// Fonction pour récupérer les articles côté serveur
export async function getArticles() {
  try {
    const res = await fetch('http://localhost:3000/articles', {
      cache: 'no-store' // Empêche la mise en cache pour garantir des données fraîches
    });

    if (!res.ok) {
      throw new Error('Erreur lors de la récupération des articles');
    }

    const articles = await res.json();
    return articles;
  } catch (error) {
    console.error(error);
    return []; // En cas d'erreur, retourne un tableau vide
  }
}

// Composant de la page Articles
export default async function ArticlesPage() {
  const articles = await getArticles(); // Récupère les articles côté serveur

  return <ArticlesWrapper articlesResponse={articles} />;
}
