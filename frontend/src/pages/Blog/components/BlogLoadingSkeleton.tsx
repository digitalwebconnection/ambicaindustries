import BlogLoader from './BlogLoader';

interface BlogLoadingSkeletonProps {
  count?: number;
}

export default function BlogLoadingSkeleton(_props: BlogLoadingSkeletonProps) {
  return <BlogLoader />;
}

