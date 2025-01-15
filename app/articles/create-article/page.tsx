import CreateArticleForm from '@/components/articles/article-form';

async function fetchTags() {
  try {
    const res = await fetch('http://localhost:3000/tags', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      throw new Error('Erreur lors de la récupération des tags');
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Page() {
  const tags = await fetchTags();

  return <CreateArticleForm tags={tags} />;
}
