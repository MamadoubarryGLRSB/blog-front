'use client';

import { useState } from 'react';
import { Fragment } from 'react';
import Link from 'next/link'; // Importer Link de Next.js
import ArticleModal from './article-modal';

interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags?: { id: string; name: string }[]; // Les tags sont des objets avec id et name
  author: {
    username: string;
  };
  _count: {
    likes: number;
    comments: number;
  };
}

interface ArticlesWrapperProps {
  articlesResponse: Article[];
}

export default function ArticlesWrapper({ articlesResponse }: ArticlesWrapperProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('Tous');

  const articlesPerPage = 6;

  // Extraire tous les tags uniques des articles
  const allTags = [
    'Tous',
    ...new Set(articlesResponse.flatMap((article) => article.tags?.map((tag) => tag.name) || []))
  ];

  // Filtrer les articles par recherche et tag sélectionné
  const filteredArticles = articlesResponse.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'Tous' || article.tags?.some((tag) => tag.name === selectedTag) || false;
    return matchesSearch && matchesTag;
  });

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArticle(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 py-12">
      {/* Titre et bouton ADD Article */}
      <div className="flex justify-between items-center px-4 mb-6">
        <h1 className="text-3xl font-bold">Liste des Articles</h1>
        <Link href="/articles/create-article">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Ajouter un article</button>
        </Link>
      </div>

      {/* Barre de recherche et filtre par tag */}
      <div className="mb-6 flex justify-center items-center space-x-4 px-4">
        <input
          type="text"
          placeholder="Rechercher par titre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-1/2"
        />
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
        >
          {allTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Liste des articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {currentArticles.map((article) => (
          <Fragment key={article.id}>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-600 mt-2">{article.content.slice(0, 100)}...</p>
              {/* Afficher les tags */}
              {article.tags && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag.id} className="bg-gray-200 text-sm px-2 py-1 rounded-full">
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
              <button onClick={() => openModal(article)} className="text-blue-500 mt-4 block" id="detail-article">
                Lire la suite
              </button>
            </div>
          </Fragment>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedArticle && <ArticleModal isOpen={isModalOpen} onClose={closeModal} article={selectedArticle} />}
    </div>
  );
}
