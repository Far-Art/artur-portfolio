import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectCategory, PROJECT_CATEGORIES } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (project(); as project) {
      <div class="project-detail">
        <div class="container">
          <a routerLink="/projects" class="back-link">Back to projects</a>

          <header class="project-hero surface-panel">
            <div class="project-hero-copy">
              <p class="project-category">{{ projectCategoryLabel(project.category) }}</p>
              <h1 class="project-title">{{ project.title }}</h1>
              <p class="project-description">{{ project.fullDescription }}</p>
            </div>

            <div class="project-summary">
              @if (project.featured) {
                <span class="featured-badge">Featured case study</span>
              }
              <div class="summary-card">
                <p class="summary-label">Timeline</p>
                <p class="summary-value">
                  {{ project.startDate | date: 'MMM yyyy' }}
                  @if (project.endDate) {
                    to {{ project.endDate | date: 'MMM yyyy' }}
                  } @else {
                    to present
                  }
                </p>
              </div>
              <div class="summary-card">
                <p class="summary-label">Stack shape</p>
                <p class="summary-value">{{ project.technologies.length }} core technologies</p>
              </div>
            </div>
          </header>

          <div class="project-actions">
            @if (project.githubUrl) {
              <a [href]="project.githubUrl" target="_blank" rel="noopener" class="action-link">
                View GitHub
              </a>
            }
            @if (project.liveUrl) {
              <a [href]="project.liveUrl" target="_blank" rel="noopener" class="action-link">
                Live demo
              </a>
            }
          </div>

          @if (project.highlights.length > 0) {
            <section class="highlights">
              <h2 class="section-title">Key highlights</h2>
              <ul class="highlights-list">
                @for (highlight of project.highlights; track highlight) {
                  <li>{{ highlight }}</li>
                }
              </ul>
            </section>
          }

          <section class="technologies">
            <h2 class="section-title">Technologies used</h2>
            <div class="tech-grid">
              @for (tech of project.technologies; track tech) {
                <div class="tech-item">{{ tech }}</div>
              }
            </div>
          </section>

          @if (relatedProjects().length > 0) {
            <section class="related-projects">
              <h2 class="section-title">Related projects</h2>
              <div class="projects-grid">
                @for (relatedProject of relatedProjects(); track relatedProject.id) {
                  <article class="project-card surface-panel">
                    <p class="card-category">{{ projectCategoryLabel(relatedProject.category) }}</p>
                    <h3 class="card-title">{{ relatedProject.title }}</h3>
                    <p class="card-description">{{ relatedProject.shortDescription }}</p>
                    <a [routerLink]="['/projects', relatedProject.id]" class="card-link">
                      View project
                    </a>
                  </article>
                }
              </div>
            </section>
          }
        </div>
      </div>
    } @else {
      <div class="not-found">
        <div class="container surface-panel">
          <h1>Project not found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <a routerLink="/projects" class="action-link">Back to projects</a>
        </div>
      </div>
    }
  `,
  styles: `
    .project-detail,
    .not-found {
      min-height: 100vh;
      padding: 3rem 0 1rem;
    }

    .container {
      display: grid;
      gap: 1.25rem;
    }

    .back-link {
      display: inline-flex;
      color: var(--text-primary);
      text-decoration: none;
      font-weight: 600;
      font-family: 'IBM Plex Mono', monospace;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .back-link:hover {
      color: var(--primary-color);
    }

    .project-hero {
      display: grid;
      grid-template-columns: minmax(0, 1.35fr) minmax(18rem, 0.8fr);
      gap: 1rem;
      padding: 1.5rem;
      border-radius: var(--radius-large);
    }

    .project-category,
    .summary-label,
    .card-category {
      margin: 0;
      color: var(--text-tertiary);
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.8rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .featured-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.45rem 0.75rem;
      border-radius: 999px;
      background: var(--secondary-color-light);
      border: 1px solid rgba(201, 107, 44, 0.18);
      color: var(--secondary-color);
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .project-title {
      margin: 0.85rem 0 1rem;
      font-size: clamp(2.4rem, 5vw, 4.3rem);
      line-height: 0.94;
      letter-spacing: -0.06em;
      max-width: 11ch;
    }

    .project-description {
      margin: 0;
      font-size: 1.08rem;
      line-height: 1.8;
      color: var(--text-secondary);
      white-space: pre-line;
    }

    .project-summary {
      display: grid;
      gap: 0.85rem;
      align-content: start;
    }

    .summary-card {
      padding: 1rem;
      border-radius: 1.2rem;
      background: var(--bg-elevated);
      border: 1px solid var(--border-color);
    }

    .summary-value {
      margin: 0.35rem 0 0;
      font-size: 1.2rem;
      line-height: 1.4;
    }

    .project-actions,
    .tech-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.9rem;
    }

    .action-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 3.15rem;
      padding: 0.8rem 1.1rem;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 600;
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      color: white;
      transition: transform 0.25s ease;
    }

    .action-link:hover {
      transform: translateY(-2px);
    }

    .section-title {
      margin: 0 0 1rem;
      font-size: 1.65rem;
      line-height: 1.05;
      letter-spacing: -0.04em;
    }

    .tech-item {
      padding: 0.8rem 1rem;
      background: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 999px;
      font-family: 'IBM Plex Mono', monospace;
      color: var(--text-secondary);
    }

    .highlights-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.9rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .highlights-list li {
      flex: 1 1 16rem;
      padding: 1rem 1.1rem;
      background: var(--bg-secondary);
      border-left: 3px solid var(--primary-color);
      border-radius: 1rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
      gap: 0.9rem;
    }

    .project-card {
      display: grid;
      gap: 0.8rem;
      padding: 1.2rem;
      border-radius: var(--radius-large);
    }

    .card-title {
      margin: 0;
      font-size: 1.3rem;
      line-height: 1.05;
    }

    .card-description {
      margin: 0;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .card-link {
      color: var(--text-primary);
      text-decoration: none;
      font-weight: 600;
    }

    .card-link:hover {
      color: var(--primary-color);
    }

    .not-found {
      text-align: left;
    }

    .not-found .container {
      padding: 1.5rem;
      border-radius: var(--radius-large);
    }

    .not-found h1,
    .not-found p {
      margin: 0 0 1rem;
    }

    .not-found p {
      color: var(--text-secondary);
    }

    @media (max-width: 960px) {
      .project-hero {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class ProjectDetailComponent {
  private readonly projectsService = inject(ProjectsService);

  readonly id = input.required<string>();

  readonly project = computed(() => {
    const projectId = this.id();
    return this.projectsService.getProjectById(projectId);
  });

  readonly relatedProjects = computed(() => {
    const projectId = this.id();
    return this.projectsService.getRelatedProjects(projectId, 3);
  });

  projectCategoryLabel(category: ProjectCategory): string {
    return PROJECT_CATEGORIES[category];
  }
}
