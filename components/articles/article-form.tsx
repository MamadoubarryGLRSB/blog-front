'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import type { RootState } from '@/app/lib/redux/store'; // Ajustez le chemin selon votre structure
import { createArticle } from '@/app/lib/add-article';

interface CreateArticleFormProps {
  tags: { id: string; name: string }[];
}

const CreateArticleForm = ({ tags }: CreateArticleFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: false,
    tagIds: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTagSelection = (tagId: string) => {
    setFormData((prev) => {
      const tagIds = prev.tagIds.includes(tagId) ? prev.tagIds.filter((id) => id !== tagId) : [...prev.tagIds, tagId];
      return { ...prev, tagIds };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuth) {
      toast.error('Vous devez être connecté pour créer un article');
      router.push('/login');
      return;
    }

    setIsSubmitting(true);

    try {
      await createArticle(formData);
      toast.success('Article créé avec succès');
      router.push('/articles');
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        if (error.message.includes('connecté')) {
          router.push('/login');
        }
      } else {
        toast.error("Une erreur est survenue lors de la création de l'article");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Créer un nouvel article</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Titre
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Contenu
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          rows={5}
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <label key={tag.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="tagIds"
                value={tag.id}
                checked={formData.tagIds.includes(tag.id)}
                onChange={() => handleTagSelection(tag.id)}
              />
              <span>{tag.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="published" className="flex items-center space-x-2">
          <input type="checkbox" id="published" name="published" checked={formData.published} onChange={handleChange} />
          <span>Publier cet article</span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Création en cours...' : "Créer l'article"}
      </button>
    </form>
  );
};

export default CreateArticleForm;
