'use server';

import { Comment } from '@/ts/profile';
import { revalidateTag } from 'next/cache';

export async function likeArticle(articleId: string, token: string): Promise<void> {
  if (!token) {
    throw new Error('Utilisateur non connecté.');
  }

  const res = await fetch(`http://localhost:3000/articles/${articleId}/like`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    console.error('Response details:', errorDetails);
    throw new Error('Erreur lors du like');
  }

  revalidateTag('articles');
}

export async function unlikeArticle(articleId: string, token: string): Promise<void> {
  if (!token) {
    throw new Error('Utilisateur non connecté.');
  }

  const res = await fetch(`http://localhost:3000/articles/${articleId}/like`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    console.error('Response details:', errorDetails);
    throw new Error('Erreur lors du unlike');
  }

  revalidateTag('articles');
}

export async function addComment(articleId: string, content: string, token: string): Promise<void> {
  if (!token) {
    throw new Error('Utilisateur non connecté.');
  }

  const res = await fetch(`http://localhost:3000/articles/${articleId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    console.error('Response details:', errorDetails);
    throw new Error('Erreur lors de l’ajout du commentaire');
  }

  revalidateTag('articles');
}

export async function fetchComments(articleId: string): Promise<Comment[]> {
  const res = await fetch(`http://localhost:3000/articles/${articleId}/comments`);

  if (!res.ok) {
    const errorDetails = await res.text();
    console.error('Erreur lors de la récupération des commentaires:', errorDetails);
    throw new Error('Impossible de récupérer les commentaires.');
  }

  return res.json();
}
