import React, { useState, useEffect } from 'react';
import "../styles/card.css";
import { authenticateUser } from '../services/authService.js';


const Bigcard = ({ closeModal, cardData, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCard, setEditedCard] = useState({ ...cardData });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const expiry = localStorage.getItem('authExpiry');
    const isTokenValid = token && expiry && new Date().getTime() < new Date(expiry).getTime();
    setIsAuthenticated(isTokenValid);
  }, []);

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCreds) => ({ ...prevCreds, [name]: value }));
  };


  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const { token, expiry } = await authenticateUser(credentials.username, credentials.password);
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('authExpiry', expiry);
      setIsAuthenticated(true);
      setAuthModal(false);
    } catch (error) {
     
      if (error.message.includes('404')) {
        alert('Authentication failed: The login endpoint was not found. Please check your server configuration.');
      } else if (error.message.includes('Invalid JSON')) {
        alert('Authentication failed: The server response was not in the expected format. Please check your server logs.');
      } else {
        alert('Authentication failed: ' + error.message);
      }
    }
  };


  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedCard((prevCard) => ({ ...prevCard, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(editedCard);
    setIsEditing(false);
  };

  const requestAuth = () => {
    setAuthModal(true);
  };


  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
        closeModal();
      }, 800); // Close modal 0.8 seconds after showing notification
      return () => clearTimeout(timer);
    }
  }, [showNotification, closeModal]);

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {authModal && (
          <div className="auth-modal">
            <h3>Authenticate</h3>
            <form onSubmit={handleAuthSubmit}>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleAuthChange}
                placeholder="Username"
                required
              />
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleAuthChange}
                placeholder="Password"
                required
              />
              <button type="submit">Submit</button>
            </form>
            <button onClick={() => setAuthModal(false)}>Cancel</button>
          </div>
        )}

        {!isEditing ? (
          <>
            <h3>{cardData.title}</h3>
            <p><strong>Author:</strong> {cardData.author}</p>
            <p><strong>Category:</strong> {cardData.category}</p>
            <p dangerouslySetInnerHTML={{ __html: cardData.text }}></p>

            {isAuthenticated ? (
              <>
                <button onClick={() => setIsEditing(true)}>Edit Card</button>
                <button onClick={() => {
            onDelete(cardData._id);
            setShowNotification(true);
          }}>
            Delete Card
          </button>
              </>
            ) : (
              <>
                <button onClick={requestAuth}>Edit Card (Auth Required)</button>
                <button onClick={requestAuth}>Delete Card (Auth Required)</button>
              </>
            )}
          </>
        ) : (
          <>
            <h3>Edit Card</h3>
            <form onSubmit={handleEditSubmit}>
             
              <input
                type="text"
                name="title"
                value={editedCard.title}
                onChange={handleEditChange}
                placeholder="Title"
                required
              />
                <input
                type="text"
                name="author"
                value={editedCard.author}
                onChange={handleEditChange}
                placeholder="Author"
                required
              />
              <input
                type="text"
                name="category"
                value={editedCard.category}
                onChange={handleEditChange}
                placeholder="Category"
                required
              />
              <textarea
                name="text"
                className='txtedit'
                value={editedCard.text}
                onChange={handleEditChange}
                placeholder="Text"
                required
              />
              <button type="submit">Save Changes</button>
            </form>
            <button onClick={() => setIsEditing(false)}>Cancel Edit</button>
          </>
        )}
       <button className="close-modal-btn" onClick={closeModal}>&times;</button>
      </div>

      {showNotification && (
        <div className="notification">
          <p>Card has been deleted successfully!</p>
        </div>
      )}
  
     
    </div>
  );
};

export default Bigcard;