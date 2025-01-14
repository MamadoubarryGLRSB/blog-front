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
