import { useEffect } from 'react';
import { useImageSearch } from './hooks/useImageSearch';
import SearchBar from './components/SearchBar';
import ImageGrid from './components/ImageGrid';
import { Toaster } from 'sonner';
import React from 'react';

const App = () => {
  const { 
    query, 
    images, 
    isLoading, 
    hasMoreImages, 
    error, 
    startNewSearch,
    loadImages,
    loadMoreImages 
  } = useImageSearch();

  // Handle initial load with popular images
  useEffect(() => {
    if (!query) {
      startNewSearch('nature');
    }
  }, []);

  // Handle search submission
  const handleSearch = (searchTerm: string) => {
    startNewSearch(searchTerm);
    loadImages(1);
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-center" />
      
      <header className="bg-gradient-to-r from-purple-500 to-violet-400 py-10 text-white">
        <div className="container mx-auto text-center">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">Instant Images</h1>
          <p className="mb-6 text-xl opacity-90">Search and discover beautiful images</p>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        {error && (
          <div className="mb-8 rounded-lg bg-red-50 p-4 text-red-800">
            <p>{error}</p>
          </div>
        )}
        
        {query && images.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">
              Results for <span className="text-purple-600">"{query}"</span>
            </h2>
          </div>
        )}
        
        <ImageGrid 
          images={images}
          isLoading={isLoading}
          hasMore={hasMoreImages}
          onLoadMore={loadMoreImages}
        />
      </main>
      
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto text-center text-gray-600">
          <p>Images provided by Pixabay API</p>
          <p className="mt-1 text-sm">© {new Date().getFullYear()} Bhuvan G S</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
