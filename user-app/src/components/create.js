import React, { useState, useRef, useEffect } from 'react';
import "../styles/createpage.css";
import { useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import { authenticateUser } from '../services/authService.js';

// Login Popup Component
const LoginPopup = ({ onClose, onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const authResult = await authenticateUser(credentials.username, credentials.password);
      localStorage.setItem('authToken', authResult.token);
      localStorage.setItem('authExpiry', authResult.expiry);
      onLogin(authResult.token);
      onClose();
    } catch (error) {
      console.error('Authentication error:', error);
      if (error.message.includes('404')) {
        setError('Server error: Login service not found');
      } else if (error.message.includes('Invalid JSON')) {
        setError('Server error: Invalid response');
      } else {
        setError('Invalid credentials');
      }
    }
  };

  return (
    <div className="login-popup-overlay">
      <div className="login-popup">
        <h2>Login Required</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Password"
              required
            />
          </div>
          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Create = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    text: '',
    author: ''
  });

  const [markdownContent, setMarkdownContent] = useState('');

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const contentEditableRef = useRef(null);
  const previewRef = useRef(null);
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  

  useEffect(() => {
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const token = localStorage.getItem('authToken');
    const expiry = localStorage.getItem('authExpiry');
    const isTokenValid = token && expiry && new Date().getTime() < new Date(expiry).getTime();
    setIsAuthenticated(isTokenValid);
  };


  useEffect(() => {
    let timer;
    if (showNotification) {
      // Show the notification when showNotification is true
      timer = setTimeout(() => {
        setShowNotification(false); // Hide the notification after 3 seconds
      }, 3000);
    }

    // Cleanup the timer if showNotification changes or component unmounts
    return () => clearTimeout(timer);
  }, [showNotification]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setShowLoginPopup(true);
      return;
    }

    await submitForm();
  };

  const submitForm = async () => {
    const token = localStorage.getItem('authToken');
    const updatedFormData = {
      ...formData,
      text: previewRef.current.innerHTML
    };

    try {
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Card successfully saved:', result);
        setShowNotification(true);
        if (onSubmit) {
          onSubmit(result);
        }
      } else if (response.status === 401) {
        setIsAuthenticated(false);
        setShowLoginPopup(true);
      } else {
        console.error('Error saving card:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    submitForm();
  };

  // Enable GitHub-flavored Markdown, including tables
marked.setOptions({
  gfm: true,
  breaks: true, 
});
  const updateMarkdownContent = () => {
    const content = contentEditableRef.current.innerText;
    setMarkdownContent(content);
    setFormData(prevData => ({
      ...prevData,
      text: content
    }));
  };

  const updatePreview = () => {
    const htmlContent = marked(markdownContent);
    if (previewRef.current) {
      previewRef.current.innerHTML = htmlContent;
    }
  };

  useEffect(() => {
    updatePreview();
  }, [markdownContent]);

  return (
    <div className="create-page-container">
      <form className="card-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="text">Text</label>
          <div
            ref={contentEditableRef}
            contentEditable="true"
            className="content-editable"
            onInput={updateMarkdownContent}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              minHeight: '100px',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
            }}
          />
        </div>

        <h2>Preview</h2>
        <div 
          ref={previewRef}
          id="preview" 
          style={{ border: '1px solid #ccc', padding: '10px', minHeight: '100px' }}
        />


        <button type="submit" className="submit-btn">Save</button>
        <button type="button" className="submit-btn home-btn" onClick={() => navigate('/')}>Home</button>
      </form>

      {showLoginPopup && (
        <LoginPopup
          onClose={() => setShowLoginPopup(false)}
          onLogin={handleLogin}
        />
      )}

      {showNotification && (
        // <div className="notification">
          <div className={`notification ${showNotification ? 'show' : ''}`}>
          <p>Card has been created successfully!</p>
        </div>
      )}
    </div>
  );
};

export default Create;

