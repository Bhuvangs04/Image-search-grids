import React, { useEffect, useRef, useCallback } from 'react';
import ImageCard from './ImageCard';
import SkeletonLoader from './SkeletonLoader';
import { ImageItem } from '../hooks/useImageSearch';

interface ImageGridProps {
  images: ImageItem[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ 
  images, 
  isLoading, 
  hasMore,
  onLoadMore
}) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Set up infinite scroll with Intersection Observer
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        onLoadMore();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore, onLoadMore]);

  // Clean up observer on unmount
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  if (!images.length && !isLoading) {
    return (
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold text-gray-600">No images found</h3>
        <p className="mt-2 text-gray-500">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="masonry-grid animate-fadeIn">
        {images.map((image, index) => {
          if (index === images.length - 5) {
            return (
              <div key={`${image.id}-observer-${index}`} ref={lastElementRef}>
                <ImageCard image={image} />
              </div>
            );
          }
          return <ImageCard key={`${image.id}-${index}`} image={image} />;
        })}
      </div>
      
      {isLoading && <SkeletonLoader count={4} />}
      
      {!hasMore && images.length > 0 && (
        <div className="my-8 text-center">
          <p className="text-gray-500">You've reached the end of results</p>
        </div>
      )}
      
      <div ref={loadMoreRef}></div>
    </div>
  );
};

export default ImageGrid;