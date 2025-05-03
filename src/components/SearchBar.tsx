import { useState } from 'react';
import { toast } from 'sonner';
import { Search } from 'lucide-react';
import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    
    onSearch(searchTerm.trim());
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 px-4">
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="text"
          placeholder="Search for images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input text-gray-700"
          aria-label="Search images"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={isLoading}
          aria-label="Search"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>Searching...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Search size={20} />
              <span>Search</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
