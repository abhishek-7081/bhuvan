

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/category.css";

const CategoryList = () => {
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [error, setError] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(15);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/cards');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            
            // Reverse the data array to process it in reverse order
          const reversedData = data.reverse();
            const categories = [...new Set(reversedData.map(card => card.category).filter(Boolean))]; 
            setUniqueCategories(categories);
          } else {
            throw new Error('Unexpected response structure');
          }
        } else {
          throw new Error('Failed to fetch cards: ' + response.statusText);
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
        setError(error.message); // Set error message
      }
    };

    fetchCards();
  }, []);

  // Filter categories based on search term
  const filteredCategories = uniqueCategories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  // Handlers for pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)} // Update search term as user types
        className="category-search-input" // Optional CSS class for styling
      />
      <div className="category-container">
        {error ? (
          <p className="error-message">{error}</p> // Display error message if any
        ) : currentCategories.length > 0 ? (
          currentCategories.map((category, index) => (
            <div
              className="category-card"
              key={index}
              onClick={() => navigate(`/category/${encodeURIComponent(category)}`)}
            >
              <h3>{category}</h3>
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1} 
          className="pagination-button"
        >
          Previous
        </button>
        <span className="page-info">Page {currentPage} of {totalPages}</span>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages} 
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryList;
