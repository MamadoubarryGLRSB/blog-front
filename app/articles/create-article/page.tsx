import CreateArticleForm from '@/components/articles/article-form';

export async function getTags() {
  try {
    const res = await fetch('http://localhost:3000/tags', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      throw new Error('Erreur lors de la récupération des tags');
    }

    const tags = await res.json();
    return tags;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function CreateArticlepage() {
  const tags = await getTags();

  return <CreateArticleForm tags={tags} />;
}
