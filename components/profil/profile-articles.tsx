import { Article } from '@/ts/profile';

export default function ProfileArticles({ articles }: { articles: Article[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Articles</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold">{article.title}</h3>
            <p className="text-gray-600 mt-2 line-clamp-3">{article.content}</p>
            <div className="mt-4 text-sm text-gray-500">{new Date(article.createdAt).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
