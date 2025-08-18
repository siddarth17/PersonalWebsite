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
  summary: string; 
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
          <img src="assets/siddarthwebsitepic.jpg" alt="Profile picture" class="profile-image">
        </div>
        <div class="text-container fade-in">
          <h1 class="title">Siddarth Rudraraju</h1>
          <h1 class="title">Ideator, Developer, Explorer</h1>
          <p class="about-text">
          I'm a driven USC student with a passion for Web/App Development, AI/ML, and Entrepreneurship. I’m hungry to build, learn, and be a part of a team where I can grow and make a real impact. With hands-on experience building products for startups from 0 to 1, launching apps online, conducting Generative AI and NLP research, developing applications for organizations, and formulating product growth strategies, I thrive on stepping out of my comfort zone and acquiring new knowledge to make a meaningful impact. My work on projects like LiveTunez, OptiPath, and RecruitRocket has given me a deep understanding of diverse user needs, from recruiters to music enthusiasts, and has taught me how to create solutions that combine user-centric design with strong technical performance. These experiences have fueled my passion for leveraging technology to transform industries and deliver value to stakeholders.
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

    <div id="organizations" class="organizations-section">
      <h2 class="organizations-title">Organizations</h2>
      
      <div class="slider-container">
        <div class="slider-wrapper">
          <div class="slides" [style.transform]="'translateX(' + (-currentSlide * 100) + '%)'">
            <div *ngFor="let org of organizations; let i = index" class="slide">
              <div class="slide-content">
                <div class="org-main-image">
                  <img [src]="org.image" [alt]="org.name" class="main-image">
                </div>
                <div class="org-details">
                  <div class="org-header">
                    <img [src]="org.logo" [alt]="org.name + ' logo'" class="org-logo">
                    <h3 class="org-name">{{ org.name }}</h3>
                  </div>
                  <p class="org-summary">{{ org.summary }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="slider-nav">
          <button class="nav-btn prev-btn" (click)="previousSlide()" [disabled]="currentSlide === 0">
            &#8249;
          </button>
          <div class="dots-container">
            <span *ngFor="let org of organizations; let i = index" 
                  class="dot" 
                  [class.active]="i === currentSlide"
                  (click)="goToSlide(i)">
            </span>
          </div>
          <button class="nav-btn next-btn" (click)="nextSlide()" [disabled]="currentSlide === organizations.length - 1">
            &#8250;
          </button>
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
    text-align: left;
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
  }
  
  .organizations-title {
    font-size: 2.5em;
    text-align: center;
    margin-bottom: 40px;
    color: #000000;
  }
  
  .slider-container {
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
  }
  
  .slider-wrapper {
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  }
  
  .slides {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  
  .slide {
    min-width: 100%;
    background: white;
  }
  
  .slide-content {
    padding: 0;
  }
  
  .org-main-image {
    width: 100%;
    height: 300px;
    overflow: hidden;
  }
  
  .main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .slide:hover .main-image {
    transform: scale(1.05);
  }
  
  .org-details {
    padding: 30px;
    background: white;
  }
  
  .org-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 15px;
  }
  
  .org-logo {
    width: 60px;
    height: 60px;
    object-fit: contain;
    border-radius: 10px;
    border: 2px solid #f0f0f0;
  }
  
  .org-name {
    margin: 0;
    font-size: 1.8em;
    color: #333;
    font-weight: bold;
  }
  
  .org-summary {
    font-size: 1.1em;
    line-height: 1.6;
    color: #555;
    margin: 0;
    text-align: justify;
  }
  
  .slider-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 0 20px;
  }
  
  .nav-btn {
    background: #007bff;
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .nav-btn:hover:not(:disabled) {
    background: #0056b3;
    transform: scale(1.1);
  }
  
  .nav-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  .dots-container {
    display: flex;
    gap: 10px;
  }
  
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ddd;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .dot.active {
    background: #007bff;
    transform: scale(1.3);
  }
  
  .dot:hover {
    background: #007bff;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .organizations-section {
      padding: 30px 15px;
    }
    
    .org-main-image {
      height: 150px;
    }
    
    .org-details {
      padding: 20px;
    }
    
    .org-header {
      flex-direction: column;
      text-align: center;
      gap: 10px;
    }
    
    .org-name {
      font-size: 1.5em;
    }
    
    .org-summary {
      font-size: 1em;
    }
    
    .nav-btn {
      width: 40px;
      height: 40px;
      font-size: 20px;
    }
  }
  
  @media (max-width: 480px) {
    .slider-nav {
      padding: 0 10px;
    }
    
    .org-main-image {
      height: 1000px;
    }
    
    .org-details {
      padding: 15px;
    }
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

  currentSlide: number = 0;

  nextSlide() {
    if (this.currentSlide < this.organizations.length - 1) {
      this.currentSlide++;
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  experiences: Experience[] = [
    {
      title: 'Box',
      position: 'Software Engineer Intern',
      date: 'June 2025 - August 2025',
      description: [
        'Independently building a Legal Holds Custodians Reporting feature for Box Governance, the company’s top revenue-generating add-on, using Java, Scala, PHP, GCP BigQuery, SQL, and React',
      ],
      logo: '/assets/box_logo.jpeg'
    },
    {
      title: 'Center for Artificial Intelligence in Society (CAIS++)',
      position: 'Machine Learning Researcher',
      date: 'September 2024 - February 2025',
      description: [
        'Led a team of 5 to build a multimodal hate speech detection toolkit, processing 32TB of video data to extract text, speech, and visual sentiment using PyTorch, OpenCV, and Hugging Face Transformers',
        'Designed an NLP pipeline that extracted and segmented audible text from 10K+ hours of video, integrating Google Cloud Speech-to-Text API with Flask, enabling sentiment and entity analysis for better hate speech detection',
        'Optimized computer vision models using Detectron2 and EMOCA, improving facial and object recognition and allowing detection of weapons, people, and symbols in video content',
      ],
      logo: '/assets/uscviterbi.jpg'
    },
    {
      title: 'SuperWorld',
      position: 'Software Developer Intern',
      date: 'February 2025 – April 2025',
      description: [
        'Developed user-facing React interfaces connected to secure REST APIs, enabling 150K+ users to authenticate, book land, and complete transactions on a Web3 real estate platform',
        'Delivered immersive 360-degree video walkthroughs using Node.js and A-Frame, reducing asset load times by 15% and enhancing the viewing experience for 10K+ monthly active users',
        'Improvised payment workflows, supporting $2–3K average spend per paying user, enhancing transaction integrity, reliability, and overall user experience',
      ],
      logo: '/assets/superworld.jpeg'
    },
    {
      title: 'Next Play',
      position: 'Software Engineer Intern',
      date: 'May 2024 - August 2024',
      description: [
        'Developed REST API endpoints using Node.js to securely and reliably manage user payments, leaderboard statistics, and contest details, ensuring seamless data transactions for end users and improving data retrieval time by 10%',
        'Optimized PostgreSQL queries to improve database throughput and response time, resulting in up to 15% faster API responses',
        'Contributed to Scrum-based development of payment and leaderboard pages using React and TypeScript, and deployed them with Docker, improving overall website performance and reducing load times by around 10%',
        'Implemented CI/CD pipelines and 52 unit and integration tests with Jest and Selenium, reducing debugging time by 2 weeks'
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
      title: 'USC SLURM Lab',
      position: 'Undergraduate Researcher',
      date: 'February 2024 - May 2024',
      description: [
        'Research assistant at SLURM Lab under Prof. Daniel Seita, working on a Gen-AI project aimed at developing a benchmark for multi-agent, deformable object manipulation tasks',
        'Imported ALOHA robotic platform and deformable objects via Robosuite into MuJoCo simulation environment, halving training data collection time for a curriculum-based reinforcement learning pipeline',
        'Built a multi-agent reinforcement learning optimization system using Proximal Policy Optimization and PyTorch, enhancing robotic collaboration in Google DeepMind’s Aloha platform for synchronized object manipulation'
      ],
      logo: '/assets/usccs.jpeg'
    },
    {
      title: 'ATAI Labs',
      position: 'Software Engineer Intern',
      date: 'May 2023 - August 2023',
      description: [
        'Executed Python scripts with OpenCV and Pandas for image stitching and data augmentation on CUDA to train transportation detection models using ResNet and PyTorch, increasing accuracy by 8.5%',
        'Built an internal employee dashboard using React, Java, and SQL, increasing attendance and feedback rates by 12%',
        'Identified data bias in license plate recognition and reduced the accuracy gap between dark and light license plates from 15% to 5% by optimizing data preprocessing with PyTorch and balancing training data for YOLOv5 model'
      ],
      logo: '/assets/atailogo.jpeg'
    },
    {
      title: 'USC Viterbi School of Engineering',
      position: 'NLP Undergraduate Researcher',
      date: 'January 2023 - May 2023',
      description: [
        'Implemented text preprocessing, sentiment analysis, and named entity recognition on 5,000+ nuclear safety reports, improving data extraction efficiency by 15% using TensorFlow and PyTorch',
        'Fine-tuned a BERT-based transformer model on nuclear safety document with probabilistic clustering algorithms and cosine similarity, increasing LLM accuracy by 8%',
        'Employed probabilistic clustering algorithms and cosine similarity techniques with PyTorch and NumPy to deduce nuclear safety traits, leading to a presentation that won Best Team at USC CKIDS Fest',
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
      name: 'TroyLabs',
      logo: '/assets/troylabs.png',
      summary: 'Software Engineer for USC\'s largest startup accelerator. We take in top startups at USC every semester and help them scale from early-stage/MVP to funding-ready.',
      image: '/assets/troylabspic.JPG'
    },
    {
      name: 'CAIS++',
      logo: '/assets/caislogo.png',
      summary: 'Applying AI/ML concepts like computer vision, generative AI, reinforcement learning and NLP. Worked on research projects every semester and presented research posters at OpenShowCAIS++ events.',
      image: '/assets/cais.jpg'
    },
    {
      name: 'ShiftSC',
      logo: '/assets/shiftlogo.jpeg',
      summary: 'Promoting interdisciplinary conversation around technology ethics at USC. Organized VR therapy events and XR pitch competitions, successfully attracting hundreds of attendees to discuss positive technology implications.',
      image: '/assets/shift.jpeg'
    },
    {
      name: 'Annenberg Media',
      logo: '/assets/annenbergicon.png',
      summary: 'Software Developer for USC Annenberg\'s student-run newsroom. Contributed to multimedia content production and improved website UI/UX with features like estimated reading time and article summaries.',
      image: '/assets/annenbergmedia.jpeg'
    }
  ];

  hobbies: Hobby[] = [
    {
      name: 'Piano',
      image: '/assets/piano.JPG',
      description: 'I have played the piano for over 7 years, completing several Trinity Piano grades. I performed in various recitals, fundraisers, and charity events. I continue to learn and play my favorite songs to this day.'
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