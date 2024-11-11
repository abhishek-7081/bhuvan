
import React, { useState, useEffect } from 'react';
import "../styles/card.css";
import Bigcard from './bigcard';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cardlu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // State for selected card data

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 16; // Number of cards to display per page

  // Fetch cards from the backend when the component mounts
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/cards');
        if (response.ok) {
          const data = await response.json();
          const reversedData = data.reverse(); 
          setAllCards(reversedData);
          setFilteredCards(reversedData); 
        } else {
          console.error('Failed to fetch cards:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter cards based on the search query
    const filtered = allCards.filter((card) =>
      card.category && card.category.toLowerCase().includes(query)
    );
    setFilteredCards(filtered);
    setCurrentPage(1); 
  };

  // Function to open modal with selected card data
  const openModal = (card) => {
    setSelectedCard(card);
    setModalOpen(true);
    
  };

  // Function to close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedCard(null); // Reset selected card data when modal is closed
  };

  // Function to handle deleting a card
  const deleteCard = async (_id) => {
    try {
      const response = await fetch(`/api/cards/${_id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the card from state
        setAllCards(allCards.filter(card => card._id !== _id));
        const updatedFilteredCards = filteredCards.filter(card => card._id !== _id);
        setFilteredCards(updatedFilteredCards);

        // Reset currentPage if no cards left on this page
        if (updatedFilteredCards.length < (currentPage - 1) * cardsPerPage) {
          setCurrentPage(1);
        }
      } else {
        console.error('Failed to delete card:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  // Function to handle editing a card
  const editCard = async (updatedCard) => {
    try {
      const response = await fetch(`/api/cards/${updatedCard._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCard),
      });
      if (response.ok) {
        const updatedCards = allCards.map(card =>
          card._id === updatedCard._id ? updatedCard : card
        );
        setAllCards(updatedCards);
        setFilteredCards(updatedCards.filter(card => card.category.toLowerCase().includes(searchQuery)));
      } else {
        console.error('Failed to update card:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating card:', error);
    }
  }

  // Calculate the cards to display for the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  // Calculate total pages
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  // Function to go to the next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderCards = () => {
    return currentCards.map((card, index) => (
      <div className="card" key={index}>
        <h3>{card.title}</h3>
        <p><strong>Category:</strong> {card.category}</p>
        <p><strong>Author:</strong> {card.author}</p> 
        <p dangerouslySetInnerHTML={{ __html: card.text }}></p> {/* Render text with HTML */}
       
        <button className='bgvardbutton' onClick={() => openModal(card)}>View more</button>
      </div>
    ));
  };

  // const navigate = useNavigate();

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          id="searchInput"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by category..."
        />
      </div>

      <div className="card-container" id="cardContainer">
        {renderCards()} {/* Render the filtered cards */}

        {/* <div className='card hia' onClick={() => navigate('/createpage')}>
          <FontAwesomeIcon icon={faPlus} className="big-icon" />
        </div> */}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>

      {/* Show Bigcard modal only when isModalOpen is true */}
      {isModalOpen && selectedCard && (
        <Bigcard
          closeModal={closeModal}
          cardData={selectedCard}
          onDelete={deleteCard}
          onEdit={editCard}
        />
      )}
    </div>
  );
};

export default Cardlu;
