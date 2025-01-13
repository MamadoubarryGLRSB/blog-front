'use client';

import { useState } from 'react';
import { Fragment } from 'react';
import ArticleModal from './article-modal';

interface Article {
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
}

interface ArticlesWrapperProps {
  articlesResponse: Article[];
}

export default function ArticlesWrapper({ articlesResponse }: ArticlesWrapperProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const articlesPerPage = 4;
  const totalPages = Math.ceil(articlesResponse.length / articlesPerPage);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articlesResponse.slice(indexOfFirstArticle, indexOfLastArticle);

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
      <h1 className="text-3xl font-bold text-center mb-6">Liste des Articles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {currentArticles.map((article) => (
          <Fragment key={article.id}>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-600 mt-2">{article.content.slice(0, 100)}...</p>
              <button onClick={() => openModal(article)} className="text-blue-500 mt-4 block">
                Lire la suite
              </button>
            </div>
          </Fragment>
        ))}
      </div>

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

      {selectedArticle && <ArticleModal isOpen={isModalOpen} onClose={closeModal} article={selectedArticle} />}
    </div>
  );
}
