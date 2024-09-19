import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

interface Experience {
  title: string;
  position: string;
  date: string;
  description: string[];
  logo: string;
}

interface Project {
  name: string;
  shortDescription: string;
  fullDescription: string[];  
  image: string;
  githubLink: string;
}


interface Organization {
  name: string;
  logo: string;
  description: string[];
  image: string;
}

interface Hobby {
  name: string;
  image: string;
  description: string;
}

const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    query('.fade-in', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger(100, [
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

@Component({
  selector: 'app-root',
  template: `
    <div class="container" [@fadeAnimation]>
      <nav class="navigation">
        <a href="#experiences" class="nav-link" (click)="scrollToSection('experiences', $event)">Experience</a>
        <a href="#projects" class="nav-link" (click)="scrollToSection('projects', $event)">Projects</a>
        <a href="#organizations" class="nav-link" (click)="scrollToSection('organizations', $event)">Organizations</a>
        <a href="#hobbies" class="nav-link" (click)="scrollToSection('hobbies', $event)">Hobbies</a>
      </nav>
      <div class="content">
        <div class="image-container fade-in">
          <img src="assets/Rudraraju_Siddarth_Photo.jpg" alt="Profile picture" class="profile-image">
        </div>
        <div class="text-container fade-in">
          <h1 class="title">Siddarth Rudraraju</h1>
          <h1 class="title">Ideator, Developer, Motivator</h1>
          <p class="about-text">
          I'm a driven USC student with a passion for Web/App Development, AI/ML, and Blockchain. With hands-on experience in developing deep learning models, conducting NLP research, coding websites and applications for organizations, and analyzing company data to formulate effective business strategies, I thrive on stepping out of my comfort zone and acquiring new knowledge that enables me to make a meaningful impact. Additionally, my work on projects like LiveTunez, OptiPath, and RecruitRocket allowed me to understand diverse user needs, from recruiters to music enthusiasts, and develop solutions that blend user-centric design with technical performance. These experiences fueled my interest in how technology can transform industries and impact stakeholders.
          </p>
          <div class="social-links">
            <a href="mailto:sr88018@usc.edu" class="social-link gmail-link">
              <img src="assets/gmailicon.png" alt="Email" class="social-icon">
            </a>
            <a href="https://www.linkedin.com/in/siddarth-rudraraju/" target="_blank" rel="noopener noreferrer" class="social-link">
              <img src="assets/linkedinlogo.webp" alt="LinkedIn" class="social-icon">
            </a>
            <a href="https://github.com/siddarth17" target="_blank" rel="noopener noreferrer" class="social-link">
              <img src="assets/githubwhiteicon.png" alt="GitHub" class="social-icon">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="experiences" class="experiences-section slide-up">
      <h2 class="experiences-title fade-in">Experiences</h2>
      <div class="experiences-content">
        <div class="experiences-list">
          <p class="experiences-intro">I've worked at</p>
          <div *ngFor="let exp of experiences; let i = index" 
               (click)="selectExperience(i)"
               [class.active]="i === selectedExperience"
               class="experience-item">
            {{ exp.title }}
          </div>
        </div>
        <div class="experience-description" *ngIf="selectedExperience !== null">
          <div class="experience-header">
            <img [src]="experiences[selectedExperience].logo" alt="Company logo" class="company-logo">
            <div>
              <h3>{{ experiences[selectedExperience].position }}</h3>
              <p class="experience-date">{{ experiences[selectedExperience].date }}</p>
            </div>
          </div>
          <ul>
            <li *ngFor="let point of experiences[selectedExperience].description">
              {{ point }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div id="projects" class="projects-section fade-in">
      <h2 class="projects-title fade-in">Projects</h2>
      <p class="projects-intro">Click to know more</p>
      <div class="projects-grid slide-up">
        <div *ngFor="let project of projects; let i = index" class="project-item" (click)="openProjectModal(i)">
          <div class="project-info">
            <h3>{{ project.name }}</h3>
            <p>{{ project.shortDescription }}</p>
          </div>
          <img [src]="project.image" [alt]="project.name" class="project-image">
        </div>
      </div>
    </div>

    <div *ngIf="selectedProject !== null" class="modal">
      <div class="modal-content">
        <span class="close-button" (click)="closeProjectModal()">&times;</span>
        <img [src]="projects[selectedProject].image" [alt]="projects[selectedProject].name" class="modal-image">
        <h2>{{ projects[selectedProject].name }}</h2>
        <div *ngFor="let paragraph of projects[selectedProject].fullDescription">
          <p>{{ paragraph }}</p>  <!-- Each paragraph rendered individually -->
        </div>
        <a [href]="projects[selectedProject].githubLink" target="_blank" class="github-link">View on GitHub</a>
      </div>
    </div>

    <div id="organizations" class="organizations-section fade-in">
      <h2 class="organizations-title fade-in">Organizations</h2>
      
      <div class="organization-row cais-row slide-up">
        <div class="org-image-container cais-image">
          <img [src]="organizations[0].image" [alt]="organizations[0].name" class="org-image">
        </div>
        <div class="org-info cais-info">
          <div class="org-header">
            <h3>{{ organizations[0].name }}</h3>
            <img [src]="organizations[0].logo" [alt]="organizations[0].name + ' logo'" class="org-logo">
          </div>
          <ul>
            <li *ngFor="let point of organizations[0].description">{{ point }}</li>
          </ul>
        </div>
      </div>
      
      <div class="organization-row shiftrow slide-up">
        <div class="org-info shiftinfo">
          <div class="org-header">
            <h3>{{ organizations[1].name }}</h3>
            <img [src]="organizations[1].logo" [alt]="organizations[1].name + ' logo'" class="org-logo shiftsc-logo">
          </div>
          <ul>
            <li *ngFor="let point of organizations[1].description">{{ point }}</li>
          </ul>
        </div>
        <div class="org-image-container shiftimage">
          <img [src]="organizations[1].image" [alt]="organizations[1].name" class="org-image">
        </div>
      </div>
      
      <div class="organization-row annenbergrow slide-up">
        <div class="org-image-container annenbergimage">
          <img [src]="organizations[2].image" [alt]="organizations[2].name" class="org-image">
        </div>
        <div class="org-info annenberginfo">
          <div class="org-header">
            <h3>{{ organizations[2].name }}</h3>
            <img [src]="organizations[2].logo" [alt]="organizations[2].name + ' logo'" class="org-logo">
          </div>
          <ul>
            <li *ngFor="let point of organizations[2].description">{{ point }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div id="hobbies" class="hobbies-section fade-in">
      <h2 class="hobbies-title fade-in">Hobbies</h2>
      <div class="hobbies-images slide-up">
        <div *ngFor="let hobby of hobbies" class="hobby-image-container">
          <img [src]="hobby.image" [alt]="hobby.name" class="hobby-image">
        </div>
      </div>
      <div class="hobbies-descriptions fade-in">
        <div *ngFor="let hobby of hobbies" class="hobby-description">
          <h3>{{ hobby.name }}</h3>
          <p>{{ hobby.description }}</p>
        </div>
      </div>
    </div>

    <footer id="contact" class="footer">
      <div class="footer-content">
        <p class="footer-text fade-in">Have any questions or want to work together? Feel free to contact!</p>
        <div class="social-links slide-up">
        <a href="mailto:sr88018@usc.edu" class="social-link gmail-link">
          <img src="assets/gmailicon.png" alt="Email" class="social-icon">
        </a>
          <a href="https://www.linkedin.com/in/siddarth-rudraraju/" target="_blank" rel="noopener noreferrer" class="social-link">
            <img src="assets/linkedinlogo.webp" alt="LinkedIn" class="social-icon">
          </a>
          <a href="https://github.com/siddarth17" target="_blank" rel="noopener noreferrer" class="social-link">
            <img src="assets/githubicon.png" alt="GitHub" class="social-icon">
          </a>
        </div>
        <p class="copyright fade-in">© 2024 Siddarth Rudraraju. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
  :host {
    display: block;
    font-family: Arial, sans-serif;
  }
  .container {
    min-height: auto;
    display: flex;
    flex-direction: column;
    padding: 10px 20px 20px;
    box-sizing: border-box;
    background-color: #000000;
    color: #ffffff;
  }
  .navigation {
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
    padding-bottom: 1px;
  }
  .nav-link {
    color: #ffffff;
    text-decoration: none;
    margin-left: 20px;
    font-size: 16px;
    transition: color 0.3s ease;
  }
  .nav-link:hover {
    color: #cccccc;
  }
  .content {
    display: flex;
    flex: 1;
    gap: 20px;
    margin-top: 0px;
    align-items: center;
  }
  .image-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .profile-image {
    width: 100%;
    max-width: 500px;
    height: auto;
    object-fit: cover;
  }
  .text-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .title {
    font-size: 2.5em;
    margin-bottom: 20px;
  }
  .about-text {
    font-size: 18px;
    line-height: 1.6;
    margin: 0;
    text-align: justify;
    max-width: 600px;
  }
  .social-links {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .social-link {
    margin: 0 15px;
  }
  .social-icon {
    width: 45px;
    height: 40px;
    transition: transform 0.3s ease;
  }
  .social-icon:hover {
    transform: scale(1.1);
  }
  
  .experiences-section {
    background-color: #ffffff;
    color: #000000;
    padding: 40px 20px;
    width: 100%;
    box-sizing: border-box;
    padding-top: 5px;
    height: 610px; 
    overflow: hidden; 
  }

  .experiences-title {
    font-size: 2.5em;
    text-align: center;
    margin-bottom: 30px;
  }
  .experiences-content {
    display: flex;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
    height: 500px; 
  }

  .experiences-list {
    flex: 0 0 30%;
    margin-right: 40px;
    overflow-y: auto;
  }

  .experiences-intro {
    font-size: 1.2em;
    margin-bottom: 15px;
    font-weight: bold;
  }
  .experience-item {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .experience-item:hover, .experience-item.active {
    background-color: #f0f0f0;
  }
  .experience-description {
    flex: 0 0 60%;
    overflow-y: auto; 
  }
  .experience-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .company-logo {
    width: 50px;
    height: 50px;
    margin-right: 15px;
    object-fit: contain;
  }
  .experience-description h3 {
    margin-bottom: 5px;
  }
  .experience-date {
    font-style: italic;
    margin-bottom: 10px;
  }
  .shiftsc-logo {
    border-radius: 50%;
    object-fit: cover;
  }
  ul {
    padding-left: 20px;
    margin-top: 10px;
  }
  li {
    margin-bottom: 5px;
    line-height: 1.4;
  }
  
  .projects-section {
    background-color: #000000;
    color: #ffffff;
    padding: 40px 20px;
    width: 100%;
    box-sizing: border-box;
    padding-top: 10px;
  }
  .projects-title {
    font-size: 2.5em;
    text-align: center;
    margin-bottom: 10px;
  }
  .projects-intro {
    text-align: center;
    margin-top: -5px;
    margin-bottom: 30px;
    font-size: 1em;
  }
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 1000px;
    margin: 0 auto;
  }
  .project-item {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
    background-color: #ffffff;
    color: #000000;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  .project-item:hover {
    transform: scale(1.05);
  }
  .project-info {
    padding: 15px;
  }
  .project-info h3 {
    margin: 0 0 10px 0;
  }
  .project-info p {
    margin: 0;
    font-size: 0.9em;
  }
  .project-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background-color: #ffffff;
    color: #000000;
    padding: 20px 30px;
    border-radius: 10px;
    max-width: 500px;
    width: 90%;
    position: relative;
  }
  .close-button {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 24px;
    cursor: pointer;
  }
  .modal-image {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 15px;
  }
  .github-link {
    display: inline-block;
    margin-top: 15px;
    padding: 8px 16px;
    background-color: #24292e;
    color: #ffffff;
    text-decoration: none;
    border-radius: 5px;
  }
  
  .organizations-section {
    background-color: #ffffff;
    color: #000000;
    padding: 40px 20px;
    width: 100%;
    box-sizing: border-box;
    padding-top: 10px;
  }
  .organizations-title {
    font-size: 2.5em;
    text-align: center;
    margin-bottom: 30px;
  }
  .organization-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 60px;
  }
  .organization-row.reverse {
    flex-direction: row-reverse;
  }
  .org-image-container, .org-info {
    flex: 0 0 48%;
  }
  .org-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
  }
  .org-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .org-header h3 {
    margin: 0;
    margin-right: 15px;
  }
  .org-logo {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
  .org-info {
    padding-top: 20px;
  }
  .org-info ul {
    padding-left: 20px;
  }
  .org-info li {
    margin-bottom: 10px;
  }

  .hobbies-section {
    background-color: #000000;
    color: #ffffff;
    padding: 10px 20px;
    width: 100%;
    box-sizing: border-box;
  }
  .hobbies-title {
    font-size: 2.5em;
    text-align: center;
    margin-bottom: 30px;
  }
  .hobbies-images {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .hobby-image-container {
    flex: 0 0 31%;
  }
  .hobby-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }
  .hobbies-descriptions {
    display: flex;
    justify-content: space-between;
  }
  .hobby-description {
    flex: 0 0 31%;
  }
  .hobby-description h3 {
    margin-bottom: 10px;
  }
  
  .footer {
    background-color: #ffffff;
    color: #000000;
    padding: 40px 20px;
    text-align: center;
  }
  .footer-content {
    max-width: 600px;
    margin: 0 auto;
  }
  .footer-text {
    font-size: 1.2em;
    margin-bottom: 20px;
  }
  .copyright {
    font-size: 0.9em;
    opacity: 0.8;
  }

  .fade-in, .slide-up {
    opacity: 0;
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .fade-in.appear {
    opacity: 1;
  }
  .slide-up {
    transform: translateY(50px);
  }
  .slide-up.appear {
    opacity: 1;
    transform: translateY(0);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fadeInUp 0.5s ease-out forwards;
  }

  @media (max-width: 1024px) {
    .content {
      flex-direction: column;
    }
    .image-container, .text-container {
      width: 100%;
    }
    .profile-image {
      margin-left: 0;
      max-width: 100%;
      height: auto;
    }
    .text-container {
      margin-left: 0;
    }
    .experiences-content {
      flex-direction: column;
    }
    .experiences-list, .experience-description {
      flex: 1 1 auto;
      margin-right: 0;
    }
  }
  
  @media (max-width: 768px) {
    .navigation {
      justify-content: center;
      flex-wrap: wrap;
    }
    .nav-link {
      margin: 5px 10px;
    }
    .title {
      font-size: 2em;
    }
    .social-icon {
      width: 40px;
      height: 40px;
    }
    .about-text {
      font-size: 16px;
    }
    .experiences-section {
      height: auto;
      max-height: 800px; 
    }

    .experiences-content {
      flex-direction: column;
      height: auto;
    }
  
    .experiences-list, .experience-description {
      flex: 1 1 auto;
      margin-right: 0;
      max-height: 300px; 
    }
    
    .projects-grid {
      grid-template-columns: 1fr;
    }
    .organization-row, .organization-row.reverse {
      flex-direction: column;
    }
    .org-image-container, .org-info {
      flex: 0 0 100%;
      margin-bottom: 20px;
    }
    .hobbies-images, .hobbies-descriptions {
      flex-direction: column;
    }
    .hobby-image-container, .hobby-description {
      flex: 0 0 100%;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 10px;
    }
    .title {
      font-size: 1.8em;
    }
    .about-text {
      font-size: 14px;
    }
    .experiences-title, .projects-title, .organizations-title, .hobbies-title {
      font-size: 2em;
    }
    .social-icon {
      width: 35px;
      height: 35px;
    }
  }
`],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
  title = 'My Personal Website';

  experiences: Experience[] = [
    {
      title: 'Next Play',
      position: 'Software Engineer Intern',
      date: 'May 2024 - August 2024',
      description: [
        'Formulated REST API endpoints using Node.js to manage user payment statuses, leaderboard statistics, and contest data retrieval by implementing PostgreSQL commands, creating a >15% increase in development speed and website load time',
        'Improved team efficiency by over 10% by leading Scrum-based development of payment and leaderboard pages across 19 states with React and TypeScript, deploying services on Docker containers, and establishing CI/CD controls',
        'Reduced debugging time by nearly 15% through devising over 52 unit and integration tests using Jest and Selenium'
      ],
      logo: '/assets/nextplaylogo.png'
    },
    {
      title: 'USC CS Department',
      position: 'Course Producer',
      date: 'August 2024 - Present',
      description: [
        'Conduct weekly office hours and manage assignments involving C programming and computer systems for 250+ students',
        'Teach key concepts like data structures, caches, heap management, bit manipulation, x86 assembly, and system security'
      ],
      logo: '/assets/usccs.jpeg'
    },
    {
      title: 'ATAI Labs',
      position: 'Software Engineer Intern',
      date: 'May 2023 - August 2023',
      description: [
        'Executed Python scripts with OpenCV and Pandas for image stitching and data augmentation on CUDA, training transportation detection models using ResNet and PyTorch, resulting in an average accuracy increase of 8.5%',
        'Raised employee attendance and feedback rates by 12% by architecting a dashboard using React, Java, Flask, and SQL to improve real-time visualization and data handling, enhancing attendance tracking and feedback management',
        'Reduced model bias by approximately 5% by leveraging PyTest and Keras to test the proprietary RAKE model with different weights, optimizers, and data augmentation algorithms'
      ],
      logo: '/assets/atailogo.jpeg'
    },
    {
      title: 'Research @ Viterbi',
      position: 'Undergraduate Researcher',
      date: 'January 2023 - April 2024',
      description: [
        'Assisted Prof. Najmedin Meshkati with a research project related to analysing nuclear safety data at the Diablo Canyon Nuclear Plant',
        'Investigated 10+ NLP techniques, like sentiment analysis and named entity recognition, applying TensorFlow to train a BERT model on 5,000+ report pages, improving LLM models’ accuracy by 8% in nuclear safety data analysis',
        'Employed probabilistic clustering algorithms and cosine similarity techniques with PyTorch and NumPy to deduce nuclear safety traits, leading to a presentation that won Best Team at USC CKIDS Fest',
        'Research assistant at SLURM Lab under Prof. Daniel Seita, working on a Gen-AI project aimed at developing a benchmark for multi-agent, deformable object manipulation tasks',
        'Imported ALOHA robotic platform and deformable objects via Robosuite into MuJoCo simulation environment, halving training data collection time for a curriculum-based reinforcement learning pipeline'
      ],
      logo: '/assets/uscviterbi.jpg'
    }
  ];

  projects: Project[] = [
    {
      name: "LiveTunez",
      shortDescription: "Concert Setlist Discovery iOS Application",
      fullDescription: [
        "LiveTunez allows users to find nearby concerts, view the setlists, and experience the music by easily saving them as playlists in their Spotify accounts. The app utilizes user location with Apple's MapKit and Core Location frameworks to discover live concerts and events nearby, displaying them on an interactive home page along with their details.",
        "Additionally, I utilized Spotify Web API and SetlistFM API so that users can access detailed setlists for concerts to know what they will be listening to. By using OAuth 2.0, the app also allows users to log into their Spotify accounts and get the option to import concert setlists as Spotify playlists into their accounts. I also utilized Apple's EventKit in the app to save the event dates to the users' calendars along with Firebase to store concerts that users save, their Spotify account details, and search history."
      ],
      image: "/assets/LiveTunez.png",
      githubLink: "https://github.com/siddarth17/LiveTunez"
    },
    {
      name: "Recruit Rocket",
      shortDescription: "AI-powered Organization Recruiting CRM",
      fullDescription: [
        "Recruit Rocket is an AI-powered CRM that streamlines the recruiting process for organizations. It provides detailed statistics of applicants, generates AI-driven summaries based on organizational rubrics and values, and allows users to monitor application rounds with the ability to write notes for each candidate. Additionally, users can bulk upload CSV files of applicants, and the app parses the data for easy management and analysis. Currently used by USC clubs, Recruit Rocket makes the recruiting process more efficient and organized.",
        "I utilized FastAPI (Python) and GraphQL to optimize CRUD operations, data fetching, and state management, reducing API call overhead, and leveraged Live Provider and Refine hooks to achieve real-time synchronization. I also implemented JWT-based user authentication, MongoDB for scalable data storage, and containerized the application stack using Docker to streamline deployment and improve collaboration."
      ],
      image: "/assets/RecruitRocket.png",
      githubLink: "https://github.com/yourusername/project2"
    },
    {
      name: "OptiPath",
      shortDescription: "Trip Path and Safety Recommendation Application",
      fullDescription: [
        "OptiPath is a full-stack web application designed to solve the Traveling Salesman Problem (TSP) and recommend optimal routes for trips using dynamic programming and graph theory while also incorporating machine learning to detect suspicious travel information. This app offers an intuitive interface for users to plan optimal routes and ensures travel safety through advanced analytics.",
        "I designed a RESTful API using Express.js and MongoDB, enabling efficient route calculations for up to 20 locations, information safety checks, saving of routes, and secure token-based authentication. I adopted Google Maps API with React.js for geocoding, distance matrix calculations, and real-time map UI display. Additionally, I created an NLP pipeline using TF-IDF vectorization, tokenization, and sentiment analysis to train a RandomForest model on 44,000+ data points to identify suspicious travel information, achieving a 99.4% accuracy rate on test data."
      ],
      image: "/assets/optipath.png",
      githubLink: "https://github.com/siddarth17/OptiPath"
    },
    {
      name: "SkyShare",
      shortDescription: "Lyft Ride Matching Application For USC Students",
      fullDescription: [
        "SkyShare is a web application designed as a simple solution to finding safe and economical rides when they travel from LAX.", 
        "This application was built using HTML, CSS, JavaScript, and Java with MySQL database. Bootstrap, Google Maps API, AJAX and jQuery were used to enhance user experience and page dynamics. I coordinated with a 7-member team and led the back-end team, ensuring robust back-end multithreading, networking, seamless servlet communications and real-time communication through web sockets and deploying the application on AWS using Elastic Beanstalk. SQL was employed for robust handling of user accounts, group memberships, and authentication processes while enabling features like group joining, viewing, searching, and user authentication."
      ],
      image: "/assets/SkyShare.png",
      githubLink: "https://github.com/siddarth17/SkyShare"
    }
  ];

  organizations: Organization[] = [
    {
      name: 'CAIS++',
      logo: '/assets/caislogo.png',
      description: [
        'Applying AI/ML concepts related to fields like computer vision, generative AI, and NLP to train models that can analyze and make predictions from various datasets and discussing insights with peers in my cohort',
        'Implemented natural language processing techniques to analyze and understand movie narratives, enhancing recommendation systems by identifying thematic and narrative threads using cosine similarity and TF-IDF vectorization',
        'Developed a binary classification model using computer vision to differentiate between ASL sign language alphabets, achieving a high accuracy of 98.46% by utilizing the Yolov6 model',
        'Designed and presented research posters in OpenShowCAIS++ 2023 and 2024 in front of hundreds of people'
      ],
      image: '/assets/cais.jpg'
    },
    {
      name: 'ShiftSC',
      logo: '/assets/shiftlogo.jpeg',
      description: [
        'Shift SC aims to promote interdisciplinary conversation and action at USC around the social implications and ethical issues of modern technology',
        'Organized events related to VR for cognitive behavioral therapy, and an XR pitch competition, handling marketing, logistics, and planning, successfully getting hundreds of attendees',
        'Consistently presenting the ethical implications of technologies and promoting positive technology implications around USC'
      ],
      image: '/assets/shift.jpeg'
    },
    {
      name: 'Annenberg Media',
      logo: '/assets/annenbergicon.png',
      description: [
        'Worked as a Software Developer for the student-run newsroom at USC Annenberg',
        'Helped produce and display multimedia content for digital platforms',
        'Improved UI/UX of website by working on features like estimated reading time and article summaries'
      ],
      image: '/assets/annenbergmedia.jpeg'
    }
  ];

  hobbies: Hobby[] = [
    {
      name: 'Piano',
      image: '/assets/piano.JPG',
      description: 'I have played the piano for over 7 years, completing several Trinity Piano grades. I performed in various recitals, fundraisers, and charity events. I also taught underprivileged children in India how to play the instrument, I continue to learn and play my favorite songs to this day.'
    },
    {
      name: 'MUN/Debate',
      image: '/assets/MUN.jpg',
      description: 'I have a strong interest in global affairs and enjoy staying informed on current events and debates. I’ve participated in and won multiple awards in debate competitions and Model United Nations (MUN) conferences, both as a delegate and as a member of the international press. Additionally, I organized my school’s MUN, coding the website for over 300 attendees and users to ensure a smooth experience for everyone involved.'
    },
    {
      name: 'Travel',
      image: '/assets/travel.jpg',
      description: 'I’ve had the privilege of visiting 5 continents, and I always make it a point to immerse myself in new cultures and learn about different languages. Some of my favorite activities while traveling include photography, snorkeling, and wildlife animal spotting. These experiences help me appreciate the diversity of the world and continually fuel my curiosity.'
    }
  ];

  selectedExperience: number = 0;
  selectedProject: number | null = null;

  animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
        }
      });
    }, {
      threshold: 0.1
    });
  
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => observer.observe(el));
  }

  ngOnInit() {
    this.selectExperience(0);
    this.animateOnScroll();
  }

  selectExperience(index: number) {
    this.selectedExperience = index;
  }

  openProjectModal(index: number) {
    this.selectedProject = index;
  }

  closeProjectModal() {
    this.selectedProject = null;
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}