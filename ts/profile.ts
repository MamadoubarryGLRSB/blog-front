export interface ProfileData {
  email: string;
  username: string;
  profile: {
    bio: string | null;
    avatar: string | null;
  };
  articles: Article[];
  _count: {
    articles: number;
    comments: number;
    likes: number;
  };
}

export interface Article {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
}

export type Comment = {
  id: string;
  content: string;
  authorId: string;
  articleId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    email: string;
    password: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  };
};
