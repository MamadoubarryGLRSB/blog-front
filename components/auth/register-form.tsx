'use client';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import createUser from '@/app/lib/createUser';
import { z } from 'zod';

interface CreateUserData {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateUserData>({
    email: '',
    username: '',
    password: '',
    passwordConfirm: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const schema = z
    .object({
      email: z.string().email('Veuillez entrer une adresse email valide.'),
      username: z.string().min(5, 'Le nom d utilisateur doit contenir au moins 5 caractères.'),
      password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères.'),
      passwordConfirm: z.string()
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: 'Les mots de passe ne correspondent pas.',
      path: ['passwordConfirm']
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Effacer l'erreur quand l'utilisateur commence à modifier le champ
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return; // Empêcher les soumissions multiples

    setIsSubmitting(true);
    setErrors({});

    try {
      // Valider les données
      await schema.parseAsync(formData);

      // Extraire les données nécessaires pour l'API
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordConfirm, ...userData } = formData;

      // Appeler l'action serveur
      await createUser(userData);

      toast.success('Compte créé avec succès');
      router.push('/login');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Une erreur est survenue lors de la création du compte.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Créer un compte</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { label: 'Email', name: 'email', type: 'email', placeholder: 'Votre email' },
          { label: 'Nom d utilisateur', name: 'username', type: 'text', placeholder: 'Votre nom d utilisateur' },
          { label: 'Mot de passe', name: 'password', type: 'password', placeholder: 'Votre mot de passe' },
          {
            label: 'Confirmez le mot de passe',
            name: 'passwordConfirm',
            type: 'password',
            placeholder: 'Confirmez votre mot de passe'
          }
        ].map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name as keyof CreateUserData]}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors[field.name] ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
          </div>
        ))}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md transition-all 
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 hover:scale-105'}`}
        >
          {isSubmitting ? 'Création en cours...' : 'Créer mon compte'}
        </button>
      </form>
    </div>
  );
}
