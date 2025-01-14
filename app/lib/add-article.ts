'use client';

import { store } from './redux/store';

interface CreateArticleData {
  title: string;
  content: string;
  published: boolean;
  tagIds: string[];
}

export async function createArticle(data: CreateArticleData) {
  try {
    // Récupérer le token depuis Redux store
    const state = store.getState();
    const token = state.auth.accessToken;

    if (!token) {
      throw new Error('Vous devez être connecté pour créer un article');
    }

    const response = await fetch('http://localhost:3000/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Erreur lors de la création de l'article");
    }

    return responseData;
  } catch (error) {
    console.error("Erreur lors de la création de l'article:", error);
    throw error;
  }
}
