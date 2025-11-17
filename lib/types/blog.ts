export interface BlogPost {
  id: string;
  title: {
    en: string;
    ko: string;
  };
  slug: string;
  content: {
    en: string;
    ko: string;
  };
  excerpt: {
    en: string;
    ko: string;
  };
  author: {
    name: string;
    email: string;
  };
  category: 'journey' | 'insights' | 'reflections' | 'reports';
  tags: string[];
  coverImage?: string;
  featured: boolean;
  published: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPostInput {
  title: {
    en: string;
    ko: string;
  };
  slug: string;
  content: {
    en: string;
    ko: string;
  };
  excerpt: {
    en: string;
    ko: string;
  };
  category: 'journey' | 'insights' | 'reflections' | 'reports';
  tags: string[];
  coverImage?: string;
  featured: boolean;
  published: boolean;
}
