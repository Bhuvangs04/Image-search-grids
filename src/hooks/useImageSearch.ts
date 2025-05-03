import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export interface ImageItem {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
  user: string;
  views: number;
  downloads: number;
  likes: number;
  userImageURL: string;
}

interface SearchResponse {
  total: number;
  totalHits: number;
  hits: ImageItem[];
}

export function useImageSearch() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const PIXABAY_API_KEY = '50069722-862c1c4bfbecd4b51bd1bd283';
  const ITEMS_PER_PAGE = 20;

  // Reset search state when beginning a new search
  const startNewSearch = useCallback((searchTerm: string) => {
    setQuery(searchTerm);
    setImages([]);
    setCurrentPage(1);
    setHasMoreImages(true);
    setError(null);
  }, []);

  // Function to load images
  const loadImages = useCallback(async (page = currentPage) => {
    if (!query || isLoading || !hasMoreImages) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<SearchResponse>(
        `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&page=${page}&per_page=${ITEMS_PER_PAGE}&image_type=photo&safesearch=true`
      );

      const newImages = response.data.hits;
      
      if (page === 1) {
        setImages(newImages);
      } else {
        setImages((prevImages) => [...prevImages, ...newImages]);
      }
      
      // Check if there are more images to load
      const totalReceived = (page * ITEMS_PER_PAGE);
      setHasMoreImages(response.data.totalHits > totalReceived);
      setCurrentPage(page + 1);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to fetch images. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, hasMoreImages, isLoading, query]);

  // Load more images when requested
  const loadMoreImages = useCallback(() => {
    if (!isLoading && hasMoreImages) {
      loadImages(currentPage);
    }
  }, [currentPage, hasMoreImages, isLoading, loadImages]);

  return {
    query,
    images,
    isLoading,
    hasMoreImages,
    error,
    setQuery,
    startNewSearch,
    loadImages,
    loadMoreImages
  };
}