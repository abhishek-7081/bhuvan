import React from 'react';
import '../styles/about.css'; 



const About = () => {

  
 
  return (
    <>
      <header className='hd'>
        <h1>Our Team</h1>
        
      </header>

      <div className="container">
        <section className="team-section">
          {/* Team Member 1 */}
          <div className="team-member">
            <img src="images/Bhuwan.jpg" alt="Team Member 1" />
            <h3>Bhuwan Patidar</h3>
            <p className="role">CEO & Founder</p>
            <p>Bhuwan is the visionary behind this project. With expertise in cybersecurity, he drives the company forward..
            </p>
            <div className="skills">
              <h4>Skills:</h4>
              <span>Penetration Testing </span>
              <span>Bug Bounty</span>
              <span>VAPT</span>
              <span>Security Analysis</span>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="team-member">
            <img src="images/aayush.jpg" alt="Team Member 2" />
         
            <h3>Aayush Patidar</h3>
            <p className="role">Chief Technology Officer (CTO)</p>
            <p>Aayush is the technical mastermind of our company. An IIT graduate, he combines innovation with expertise to drive our technology strategy forward
            .</p>
            <div className="skills">
              <h4>Skills:</h4>
              <span>Strategy</span>
              <span>Innovation</span>
              <span>Leadership</span>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="team-member">
            <img src="images/Ganesh.jpg" alt="Team Member 3" />
            <h3>Ganesh Patidar
            </h3>
            <p className="role">Cloud Engineer and Developer 
            </p>
            <p>Ganesh is a skilled Python developer with a strong focus on cloud technologies. He brings efficient coding and cloud integration to our development team.
            </p>
            <div className="skills">
              <h4>Skills:</h4>
              <span>Python Development</span>
              <span>Cloud Technologies</span>
              <span>Agile Development</span>
              <span>Problem-Solving</span>
            </div>
          </div>

          {/* Team Member 4 */}
          <div className="team-member">
            <img src="images/Mohit.jpg" alt="Team Member 4" />
            <h3>Mohit Patidar
            </h3>
            <p className="role">Network Specialist
            </p>
            <p>Mohit ensures seamless connectivity and infrastructure for our company. His expertise in networking keeps our systems secure and efficient.
            </p>
            <div className="skills">
              <h4>Skills:</h4>
              <span>Networking</span>
              <span>Infrastructure Management</span>
              <span>Security Protocols</span>
              <span>System Optimization</span>
            </div>
          </div>

          {/* Team Member 5 */}
          <div className="team-member">
            <img src="images/jayesh.jpg" alt="Team Member 5" />
            <h3>Jayesh Patidar</h3>
            <p className="role">HR Manager</p>
            <p>Jayesh leads our human resources, fostering a positive and productive workplace culture. He is dedicated to talent management and employee growth.
            </p>
            <div className="skills">
              <h4>Skills:</h4>
              <span>Talent Acquisition</span>
              <span>Employee Relations</span>
              <span>HR Strategy</span>
              <span>Team Building</span>
            </div>
          </div>
        </section>
      </div>

      <footer className='ft'>
        <p>&copy; 2024 Our Company. All Rights Reserved.</p>
      </footer>

    
    </>
  );
};

export default About;
