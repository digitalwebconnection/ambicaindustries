import { ApiError } from '../utils/apiError.js';

export const validateBlogPost = (req, res, next) => {
  const { title, excerpt, content, category } = req.body;

  if (!title || !title.trim()) {
    throw ApiError.badRequest('Blog post title is required');
  }

  if (!excerpt || !excerpt.trim()) {
    throw ApiError.badRequest('Blog excerpt is required');
  }

  if (!content || !content.trim()) {
    throw ApiError.badRequest('Blog content body is required');
  }

  if (!category || !category.trim()) {
    throw ApiError.badRequest('Blog category is required');
  }

  next();
};
