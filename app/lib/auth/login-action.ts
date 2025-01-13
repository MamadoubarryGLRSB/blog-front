'use server';

interface LoginPayload {
  email: string;
  password: string;
}

export async function login(data: LoginPayload) {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Erreur de connexion. Vérifiez vos identifiants.');
    }

    const res = await response.json();

    return res;
  } catch (error) {
    throw new Error((error as Error).message || 'Erreur lors de la connexion.');
  }
}
