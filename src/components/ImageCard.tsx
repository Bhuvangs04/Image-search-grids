
import React, { useState } from 'react';
import { ImageItem } from '../hooks/useImageSearch';

interface ImageCardProps {
  image: ImageItem;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const tags = image.tags.split(',').map(tag => tag.trim());

  return (
    <div className="image-card mb-4 break-inside-avoid">
      <div className="relative">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-400 border-t-transparent"></div>
          </div>
        )}
        
        <img
          src={image.webformatURL}
          alt={image.tags}
          className={`w-full ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
        
        <div className="overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity duration-300 hover:opacity-100">
          <div className="text-white">
            <p className="text-sm font-medium">Photo by {image.user}</p>
            <div className="mt-1 flex items-center gap-2 text-xs">
              <span>❤️ {image.likes}</span>
              <span>👁️ {image.views}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="inline-block rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;