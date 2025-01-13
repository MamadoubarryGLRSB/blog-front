'use client';

import { useDispatch } from 'react-redux';
import { setAuth } from '@/app/lib/redux/features/auth.slice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { login } from '@/app/lib/auth/login-action';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await login({ email, password });

      if (response.access_token) {
        // Enregistrer l'utilisateur dans le store Redux
        dispatch(
          setAuth({
            accessToken: response.access_token,
            isAuth: true
          })
        );

        toast.success('Connexion réussie !');
        router.push('/'); // Redirection après connexion
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message || 'Erreur de connexion.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Connexion</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Entrez votre e-mail"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 text-white rounded-lg ${
            isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isLoading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}
