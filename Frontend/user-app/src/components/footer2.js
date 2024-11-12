import React from 'react';
import '../styles/footer2.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons';


const Footer2 = () => {

    
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="social-icons">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGoogle} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>

      <div className="footer-links">
        <a onClick={() => navigate('/')}>Home</a>

        <a onClick={() => navigate('/about')}>About</a>
        <a >Contact Us</a>
        <a onClick={() => navigate('/about')}>Our Team</a>
      </div>

      <div className="footer-bottom">
        <p>Copyright ©2024.</p>
      </div>
    </footer>
  );
};

export default Footer2;
