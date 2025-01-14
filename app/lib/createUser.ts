'use server';

interface CreateUserData {
  email: string;
  username: string;
  password: string;
}

export default async function createUser(data: CreateUserData) {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Une erreur est survenue.');
    }

    return responseData;
  } catch (error) {
    console.error('Erreur lors de la création du compte:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Une erreur inconnue est survenue.');
  }
}
