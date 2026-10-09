export interface BlogArticle {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
  authorRole?: string;
  imageUrl?: string;
  content: string[] | string;
  keyTakeaways?: string[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
  schemaMarkup?: string;
  views?: number;
  isPublished?: boolean;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface BlogListResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  totalPages: number;
  data: BlogArticle[];
}

export interface SingleBlogResponse {
  success: boolean;
  data: BlogArticle;
}
