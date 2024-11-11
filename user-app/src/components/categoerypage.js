import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Bigcard from './bigcard.js'; 
import "../styles/category.css"; 

const CategoryPage = () => {
  const { category } = useParams();
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
  
      try {
        const response = await fetch('/api/cards');
        
  
        if (response.ok) {
          const data = await response.json();
          
  
          if (Array.isArray(data)) {
            // Check if the data is an array
            const filteredCards = data.filter(card => {
             
              if (card && card.category) {
                return card.category.toLowerCase() === category.toLowerCase();
              } else {
                console.warn('Card is missing category field:', card); // Warn if card has no category
                return false;
              }
            });
           
              // Reverse the order of the filtered cards
      const reversedCards = filteredCards.reverse();

      // Set the state with the reversed cards
      setCards(reversedCards);
           
          } else {
            console.error('Unexpected data structure:', data); // Log if the data is not an array
          }
        } else {
          console.error('Failed to fetch cards:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching cards:', error); // Log any error that occurs
      }
    };
  
    fetchCards();
  }, [category]);
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedCard(null);
  };
  const handleEdit = (updatedCard) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card._id === updatedCard._id ? updatedCard : card
      )
    );
    closeModal();
  };

  const handleDelete = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
    closeModal();
  };

  return (
    <div>
      <h2 className='c1e'>Category: {category}</h2>
      <button className='bcp' onClick={() => navigate(-1)}>Back to Categories</button>
      <div className="card-container">
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <div
              className="card"
              key={index}
              onClick={() => handleCardClick(card)} // Open modal with card details
            >
              <h3>{card.title}</h3>
              
              <p><strong>Author:</strong> {card.author}</p> 
              <p dangerouslySetInnerHTML={{ __html: card.text }}></p> {/* Render text with HTML */}
            </div>
          ))
        ) : (
          <p>No cards found for this category.</p>
        )}
      </div>

      {/* Modal for Bigcard */}
      {showModal && selectedCard && (
        <Bigcard
          closeModal={closeModal}
          cardData={selectedCard}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CategoryPage;
