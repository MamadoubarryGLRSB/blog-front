'use client';

import { useState, useEffect } from 'react';
import { likeArticle, unlikeArticle, addComment, fetchComments } from '@/app/lib/actions/article-actions';
import { useRouter } from 'next/navigation';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    username: string;
  };
}

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    author: {
      username: string;
    };
    _count: {
      likes: number;
      comments: number;
    };
  };
}

export default function ArticleModal({ isOpen, onClose, article }: ArticleModalProps) {
  const [likes, setLikes] = useState(article._count.likes);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const storedAuth = localStorage.getItem('auth');
  const token = storedAuth ? JSON.parse(storedAuth).accessToken : '';
  const router = useRouter();

  const redirectToLogin = () => {
    toast.error('Vous devez être connecté pour effectuer cette action.');
    router.push('/login');
  };

  useEffect(() => {
    if (isOpen) {
      fetchComments(article.id)
        .then((data) => setComments(data))
        .catch(() => toast.error('Erreur lors de la récupération des commentaires.'));
    }
  }, [isOpen, article.id]);

  const handleLike = async () => {
    if (!token) {
      redirectToLogin();
      return;
    }

    try {
      await likeArticle(article.id, token);
      setLikes((prevLikes) => prevLikes + 1);
      toast.success('Article liké avec succès !');
    } catch {
      toast.error('Vous avez déjà liké cet article.');
    }
  };

  const handleUnlike = async () => {
    if (!token) {
      redirectToLogin();
      return;
    }

    try {
      await unlikeArticle(article.id, token);
      setLikes((prevLikes) => Math.max(prevLikes - 1, 0));
      toast.success('Like retiré avec succès !');
    } catch {
      toast.error('Vous n’avez pas encore liké cet article.');
    }
  };

  const handleComment = async () => {
    if (!newComment.trim()) {
      toast.error('Le commentaire ne peut pas être vide.');
      return;
    }

    if (!token) {
      redirectToLogin();
      return;
    }

    try {
      await addComment(article.id, newComment, token);
      setNewComment('');
      fetchComments(article.id)
        .then((data) => setComments(data))
        .catch(() => toast.error('Erreur lors de la mise à jour des commentaires.'));
      toast.success('Commentaire ajouté avec succès !');
    } catch {
      toast.error('Erreur lors de l’ajout du commentaire.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6">
        <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
        <p className="text-gray-600 mb-4">Par {article.author.username}</p>
        <p className="text-gray-800 mb-6">{article.content}</p>
        <p className="text-sm text-gray-400">Publié le : {new Date(article.createdAt).toLocaleDateString()}</p>

        <div className="mt-4 flex space-x-4 items-center">
          <div className="flex items-center space-x-2">
            <FaThumbsUp onClick={handleLike} className="cursor-pointer text-2xl text-blue-500 hover:text-blue-600" />
            <span className="text-gray-800">{likes}</span>
          </div>

          <div className="flex items-center space-x-2">
            <FaThumbsDown onClick={handleUnlike} className="cursor-pointer text-2xl text-red-500 hover:text-red-600" />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Commentaires</h3>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="p-4 border rounded-lg mb-4">
                <p className="text-sm text-gray-600">
                  <strong>{comment.author.username}</strong> le {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-800">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Aucun commentaire pour cet article.</p>
          )}
        </div>

        <div className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Écrivez votre commentaire ici"
            className="w-full p-2 border rounded-lg"
          ></textarea>
          <button
            onClick={handleComment}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Envoyer
          </button>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
