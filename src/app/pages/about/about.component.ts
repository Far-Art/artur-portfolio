import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SKILLS } from '../../data/skills.data';
import { SKILL_CATEGORIES } from '../../models/skill.model';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="about">
      <div class="container">
        <!-- Introduction Section -->
        <section class="intro">
          <h1 class="page-title">About Me</h1>
          <div class="intro-content">
            <div class="intro-text">
              <p class="lead">
                I'm a passionate software engineer with {{ yearsOfExperience }}+ years of
                experience building modern web applications.
              </p>
              <p>
                I specialize in front-end development with Angular and TypeScript, creating
                scalable, maintainable, and user-friendly applications. My focus is on writing
                clean code, following best practices, and delivering exceptional user experiences.
              </p>
              <p>
                When I'm not coding, you can find me contributing to open-source projects, writing
                technical articles, or exploring new technologies. I'm always eager to learn and
                grow as a developer.
              </p>
              <div class="intro-actions">
                <a routerLink="/contact" class="btn btn-primary">Get In Touch</a>
                <a href="/assets/resume.pdf" download class="btn btn-secondary">
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- Skills Section -->
        <section class="skills">
          <h2 class="section-title">Skills & Technologies</h2>
          @for (category of categories; track category.key) {
            <div class="skill-category">
              <h3 class="category-title">{{ category.label }}</h3>
              <div class="skills-grid">
                @for (skill of getSkillsByCategory(category.key); track skill.name) {
                  <div class="skill-item" [class]="'level-' + skill.level">
                    <span class="skill-name">{{ skill.name }}</span>
                    @if (skill.level) {
                      <span class="skill-level">{{ skill.level }}</span>
                    }
                  </div>
                }
              </div>
            </div>
          }
        </section>

        <!-- Education & Certifications -->
        <section class="education">
          <h2 class="section-title">Education & Certifications</h2>
          <div class="timeline">
            @for (item of education; track item.title) {
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <h3 class="timeline-title">{{ item.title }}</h3>
                  <p class="timeline-institution">{{ item.institution }}</p>
                  <p class="timeline-date">{{ item.date }}</p>
                </div>
              </div>
            }
          </div>
        </section>

        <!-- Interests -->
        <section class="interests">
          <h2 class="section-title">Beyond Code</h2>
          <div class="interests-grid">
            @for (interest of interests; track interest.title) {
              <div class="interest-card">
                <div class="interest-icon">{{ interest.icon }}</div>
                <h3 class="interest-title">{{ interest.title }}</h3>
                <p class="interest-description">{{ interest.description }}</p>
              </div>
            }
          </div>
        </section>
      </div>
    </div>
  `,
  styles: `
    .about {
      min-height: 100vh;
      padding: 4rem 0;
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .page-title {
      font-size: 3rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 3rem;
      color: var(--text-primary);
    }

    .section-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 2rem;
      color: var(--text-primary);
    }

    .intro {
      margin-bottom: 5rem;
    }

    .intro-content {
      display: flex;
      gap: 3rem;
      align-items: center;
    }

    .intro-text {
      flex: 1;
    }

    .lead {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 1.5rem;
    }

    .intro-text p {
      font-size: 1.125rem;
      line-height: 1.8;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
    }

    .intro-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-top: 2rem;
    }

    .btn {
      display: inline-block;
      padding: 0.875rem 2rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .btn-primary {
      background: var(--primary-color);
      color: white;
    }

    .btn-primary:hover {
      background: var(--primary-color-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .btn-secondary {
      background: transparent;
      border-color: var(--primary-color);
      color: var(--primary-color);
    }

    .btn-secondary:hover {
      background: var(--primary-color);
      color: white;
    }

    .skills {
      margin-bottom: 5rem;
    }

    .skill-category {
      margin-bottom: 3rem;
    }

    .category-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--border-color);
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }

    .skill-item {
      padding: 1rem;
      background: var(--bg-secondary);
      border: 2px solid var(--border-color);
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s ease;
    }

    .skill-item:hover {
      border-color: var(--primary-color);
      transform: translateY(-2px);
    }

    .skill-name {
      font-weight: 600;
      color: var(--text-primary);
    }

    .skill-level {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      background: var(--primary-color-light);
      color: var(--primary-color);
      text-transform: capitalize;
    }

    .level-expert .skill-item {
      border-color: var(--success-color);
    }

    .education {
      margin-bottom: 5rem;
    }

    .timeline {
      position: relative;
      padding-left: 2rem;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--border-color);
    }

    .timeline-item {
      position: relative;
      margin-bottom: 2rem;
    }

    .timeline-marker {
      position: absolute;
      left: -2.5rem;
      top: 0.5rem;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background: var(--primary-color);
      border: 3px solid var(--bg-primary);
    }

    .timeline-content {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid var(--border-color);
    }

    .timeline-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .timeline-institution {
      color: var(--text-secondary);
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .timeline-date {
      color: var(--text-tertiary);
      font-size: 0.9rem;
    }

    .interests {
      margin-bottom: 3rem;
    }

    .interests-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .interest-card {
      text-align: center;
      padding: 2rem;
      background: var(--bg-secondary);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
    }

    .interest-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .interest-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .interest-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .interest-description {
      color: var(--text-secondary);
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .page-title {
        font-size: 2.5rem;
      }

      .intro-content {
        flex-direction: column;
      }

      .skills-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }

      .interests-grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class AboutComponent {
  yearsOfExperience = 5;
  skills = SKILLS;

  categories = Object.entries(SKILL_CATEGORIES).map(([key, label]) => ({
    key: key as keyof typeof SKILL_CATEGORIES,
    label,
  }));

  education = [
    {
      title: 'Bachelor of Science in Computer Science',
      institution: 'University Name',
      date: '2015 - 2019',
    },
    {
      title: 'AWS Certified Solutions Architect',
      institution: 'Amazon Web Services',
      date: '2022',
    },
    {
      title: 'Angular Certification',
      institution: 'Angular',
      date: '2021',
    },
  ];

  interests = [
    {
      icon: '📚',
      title: 'Continuous Learning',
      description: 'Always exploring new technologies and best practices in software development.',
    },
    {
      icon: '🎮',
      title: 'Open Source',
      description: 'Contributing to open-source projects and sharing knowledge with the community.',
    },
    {
      icon: '✍️',
      title: 'Technical Writing',
      description: 'Writing articles and tutorials to help other developers learn and grow.',
    },
    {
      icon: '🏃',
      title: 'Fitness',
      description: 'Staying active and maintaining a healthy work-life balance.',
    },
  ];

  getSkillsByCategory(category: string) {
    return this.skills.filter((skill) => skill.category === category);
  }
}
