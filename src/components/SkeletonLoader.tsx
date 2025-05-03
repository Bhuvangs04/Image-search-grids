import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 8 }) => {
  return (
    <div className="masonry-grid animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="mb-4 overflow-hidden rounded-lg bg-gray-100 shadow"
        >
          <div className="h-[200px] w-full bg-gray-200"></div>
          <div className="p-3">
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
            <div className="h-3 w-1/2 rounded bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
