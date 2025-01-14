export async function getTags() {
  try {
    const response = await fetch('http://localhost:3000/tags', {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des tags');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur dans getTags:', error);
    return [];
  }
}
