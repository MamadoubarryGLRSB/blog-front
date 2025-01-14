// pages/index.tsx
import Link from 'next/link';
import Image from 'next/image';

const HomePage = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gray-800 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur notre Blog</h1>
        <p className="text-lg mb-6">
          Découvrez des articles passionnants sur la technologie, le développement et bien plus encore !
        </p>
        <Link href="/articles">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded">
            Voir les articles récents
          </button>
        </Link>
      </section>

      {/* Articles récents */}
      <section className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-4">Articles récents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Exemple d'article */}
          {[1, 2, 3].map((article) => (
            <div key={article} className="bg-white shadow-md rounded-md overflow-hidden">
              <div className="relative w-full h-48">
                <Image
                  src={`https://via.placeholder.com/400x200`}
                  alt={`Image de l'article ${article}`}
                  layout="fill" // Remplit le conteneur parent
                  objectFit="cover" // Maintient les proportions
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Titre de l&apos;article {article}</h3>
                <p className="text-gray-600 mb-4">
                  Voici un résumé rapide de l&apos;article pour donner envie aux utilisateurs d&apos;en lire davantage.
                </p>
                <Link href={'#'}>
                  <button className="text-blue-500 hover:underline">Lire plus →</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tags populaires */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Tags populaires</h2>
          <div className="flex space-x-4">
            {['Technologie', 'Développement', 'AI', 'Web'].map((tag) => (
              <Link
                key={tag}
                href={`/articles
              `}
              >
                <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-200">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* À propos */}
      <section className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">À propos de ce blog</h2>
        <p className="text-gray-600">
          Ce blog est dédié à la technologie, au développement, et à bien d&apos;autres sujets passionnants. Notre
          objectif est d&apos;inspirer et d&apos;éduquer à travers des articles de qualité.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
