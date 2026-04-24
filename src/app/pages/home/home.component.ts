import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECT_CATEGORIES } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';

interface HeroMetric {
  value: string;
  label: string;
  detail: string;
}

interface CapabilityCard {
  title: string;
  description: string;
  tag: string;
}

interface Principle {
  title: string;
  description: string;
}

interface ProcessStep {
  label: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="home">
      <section class="hero">
        <div class="hero-copy">
          <span class="eyebrow">Angular portfolio engineered for impact</span>
          <h1 class="hero-title">
            Building immersive web products that look sharp, scale cleanly, and convert attention
            into trust.
          </h1>
          <p class="hero-description">
            I design and ship frontends for teams that want more than a landing page. The work is
            product-minded, accessible, and performance-conscious from the first concept to the
            final release.
          </p>

          <div class="hero-actions">
            <a routerLink="/projects" class="hero-action hero-action-primary">Explore projects</a>
            <a routerLink="/contact" class="hero-action hero-action-secondary">Start a project</a>
          </div>

          <ul class="pill-list hero-signals" role="list">
            @for (signal of heroSignals; track signal) {
              <li class="pill">{{ signal }}</li>
            }
          </ul>
        </div>

        <aside class="hero-panel surface-panel" aria-label="Developer snapshot">
          <div class="panel-header">
            <p class="panel-label">Developer snapshot</p>
            <span class="status-chip">Open to freelance and product work</span>
          </div>

          <div class="signal-grid">
            @for (metric of heroMetrics; track metric.label) {
              <section class="signal-card">
                <p class="signal-value">{{ metric.value }}</p>
                <h2 class="signal-label">{{ metric.label }}</h2>
                <p class="signal-detail">{{ metric.detail }}</p>
              </section>
            }
          </div>

          <div class="focus-card">
            <p class="focus-label">Current focus</p>
            <p class="focus-copy">
              Angular interfaces, design systems, and portfolio experiences that feel premium on
              first contact and hold up under real product constraints.
            </p>
          </div>
        </aside>
      </section>

      <section class="capabilities">
        <div class="section-heading">
          <span class="eyebrow">What clients notice</span>
          <h2>The portfolio behaves like a product, not a brochure.</h2>
          <p>
            The visual language is immersive, but the real differentiator is clarity: outcomes,
            architecture, and trust signals are always visible.
          </p>
        </div>

        <div class="capability-grid">
          @for (card of capabilityCards; track card.title) {
            <article class="capability-card surface-panel">
              <p class="capability-tag">{{ card.tag }}</p>
              <h3>{{ card.title }}</h3>
              <p>{{ card.description }}</p>
            </article>
          }
        </div>
      </section>

      <section class="featured-projects">
        <div class="section-heading">
          <span class="eyebrow">Selected work</span>
          <h2>Case studies framed around impact, not screenshots.</h2>
          <p>
            Each project card is written like a client-facing pitch: what it is, why it matters,
            and which technologies shaped the result.
          </p>
        </div>

        <div class="project-grid">
          @for (project of caseStudies(); track project.id) {
            <article class="project-card surface-panel">
              <div class="project-card-header">
                <p class="project-category">{{ project.categoryLabel }}</p>
                @if (project.featured) {
                  <span class="project-badge">Featured</span>
                }
              </div>

              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.shortDescription }}</p>

              <div class="project-visual" aria-hidden="true">
                <span class="project-visual-label">Impact layer</span>
                <strong>{{ project.heroHighlight }}</strong>
                <span>{{ project.timeline }}</span>
              </div>

              <ul class="project-highlights" role="list">
                @for (highlight of project.highlights; track highlight) {
                  <li>{{ highlight }}</li>
                }
              </ul>

              <ul class="pill-list" role="list">
                @for (tech of project.technologies; track tech) {
                  <li class="pill">{{ tech }}</li>
                }
              </ul>

              <div class="project-actions">
                <a [routerLink]="['/projects', project.id]" class="project-link">Read case study</a>
                @if (project.liveUrl) {
                  <a [href]="project.liveUrl" target="_blank" rel="noopener" class="project-link">
                    Live preview
                  </a>
                }
              </div>
            </article>
          } @empty {
            <article class="project-card surface-panel">
              <h3 class="project-title">Featured work goes here</h3>
              <p class="project-description">
                Add real project data in the portfolio dataset and the case study layout is ready to
                showcase it.
              </p>
            </article>
          }
        </div>
      </section>

      <section class="operating-system">
        <div class="section-heading">
          <span class="eyebrow">How the work is shaped</span>
          <h2>An immersive layout still needs engineering discipline under it.</h2>
          <p>
            Visual atmosphere matters, but the strongest portfolios also explain judgment:
            accessibility, performance, hierarchy, and product thinking.
          </p>
        </div>

        <div class="operating-grid">
          <div class="principles surface-panel">
            <h3>Design principles</h3>
            @for (principle of principles; track principle.title) {
              <article class="principle-item">
                <h4>{{ principle.title }}</h4>
                <p>{{ principle.description }}</p>
              </article>
            }
          </div>

          <div class="process surface-panel">
            <h3>Delivery process</h3>
            @for (step of process; track step.label) {
              <article class="process-item">
                <p class="process-label">{{ step.label }}</p>
                <h4>{{ step.title }}</h4>
                <p>{{ step.description }}</p>
              </article>
            }
          </div>
        </div>
      </section>

      <section class="cta surface-panel">
        <div class="cta-copy">
          <span class="eyebrow">Need a portfolio or product frontend like this?</span>
          <h2>Let's build something that feels premium before a visitor reads a single line.</h2>
          <p>
            This direction combines a warm editorial palette, dashboard-like structure, and layered
            motion so the site feels immersive without becoming noisy.
          </p>
        </div>

        <div class="cta-actions">
          <a routerLink="/contact" class="hero-action hero-action-primary">Book a conversation</a>
          <a routerLink="/experience" class="hero-action hero-action-secondary">
            View experience
          </a>
        </div>
      </section>
    </div>
  `,
  styles: `
    .home {
      display: grid;
      gap: 2rem;
      padding-top: 1.5rem;
    }

    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1.25fr) minmax(20rem, 0.9fr);
      gap: 1.5rem;
      align-items: stretch;
      min-height: calc(100vh - 10rem);
      padding: 3rem 0 1rem;
    }

    .hero-title {
      margin: 1.2rem 0 1rem;
      font-size: clamp(3rem, 7vw, 6rem);
      line-height: 0.95;
      letter-spacing: -0.07em;
      max-width: 12ch;
    }

    .hero-description {
      max-width: 40rem;
      margin: 0 0 2rem;
      font-size: 1.14rem;
      line-height: 1.8;
      color: var(--text-secondary);
    }

    .hero-actions {
      display: flex;
      gap: 0.9rem;
      flex-wrap: wrap;
      margin-bottom: 1.5rem;
    }

    .hero-action {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 3.35rem;
      padding: 0.85rem 1.35rem;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 600;
      transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        background-color 0.25s ease;
    }

    .hero-action:hover {
      transform: translateY(-2px);
    }

    .hero-action-primary {
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      color: white;
      box-shadow: var(--shadow-soft);
    }

    .hero-action-secondary {
      border: 1px solid var(--border-strong);
      background: var(--bg-elevated);
      color: var(--text-primary);
    }

    .hero-signals {
      max-width: 42rem;
    }

    .hero-panel {
      display: grid;
      gap: 1rem;
      padding: 1.4rem;
      border-radius: var(--radius-large);
      align-content: start;
      position: relative;
      overflow: hidden;
    }

    .hero-panel::before {
      content: '';
      position: absolute;
      inset: auto -10% -30% auto;
      width: 14rem;
      height: 14rem;
      border-radius: 999px;
      background: radial-gradient(circle, rgba(201, 107, 44, 0.18), transparent 70%);
      pointer-events: none;
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .panel-label,
    .status-chip,
    .capability-tag,
    .project-category,
    .process-label {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.78rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .panel-label,
    .process-label {
      color: var(--text-tertiary);
      margin: 0;
    }

    .status-chip,
    .project-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.45rem 0.75rem;
      border-radius: 999px;
      background: var(--secondary-color-light);
      color: var(--secondary-color);
      border: 1px solid rgba(201, 107, 44, 0.18);
    }

    .signal-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.9rem;
    }

    .signal-card,
    .focus-card,
    .capability-card,
    .project-card,
    .principles,
    .process,
    .cta {
      border-radius: var(--radius-large);
    }

    .signal-card {
      padding: 1rem;
      background: var(--bg-elevated);
      border: 1px solid var(--border-color);
    }

    .signal-value {
      margin: 0 0 0.45rem;
      font-size: clamp(1.9rem, 4vw, 2.6rem);
      line-height: 0.95;
      letter-spacing: -0.05em;
    }

    .signal-label {
      margin: 0 0 0.35rem;
      font-size: 1rem;
    }

    .signal-detail,
    .focus-copy,
    .capability-card p,
    .project-description,
    .principle-item p,
    .process-item p,
    .cta-copy p {
      margin: 0;
      color: var(--text-secondary);
      line-height: 1.7;
    }

    .focus-card {
      padding: 1rem 1.1rem;
      border: 1px solid var(--border-color);
      background: linear-gradient(180deg, var(--bg-elevated), rgba(255, 255, 255, 0.16));
    }

    .focus-label {
      margin: 0 0 0.4rem;
      color: var(--primary-color);
      font-weight: 600;
    }

    .capabilities,
    .featured-projects,
    .operating-system {
      display: grid;
      gap: 1.25rem;
      padding: 1rem 0;
    }

    .capability-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1rem;
    }

    .capability-card {
      padding: 1.4rem;
    }

    .capability-card h3,
    .principles h3,
    .process h3,
    .cta h2 {
      margin: 0 0 0.8rem;
      font-size: 1.45rem;
      line-height: 1.1;
      letter-spacing: -0.04em;
    }

    .capability-tag {
      margin: 0 0 0.8rem;
      color: var(--primary-color);
    }

    .project-grid,
    .operating-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .project-card {
      display: grid;
      gap: 1rem;
      padding: 1.4rem;
    }

    .project-card-header,
    .project-actions,
    .cta {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .project-category {
      margin: 0;
      color: var(--text-tertiary);
    }

    .project-title {
      margin: 0;
      font-size: 1.75rem;
      line-height: 1;
      letter-spacing: -0.05em;
    }

    .project-visual {
      display: grid;
      gap: 0.35rem;
      padding: 1.2rem;
      border-radius: 1.4rem;
      background:
        linear-gradient(135deg, var(--primary-color-light), transparent),
        linear-gradient(135deg, rgba(22, 78, 99, 0.14), rgba(201, 107, 44, 0.1));
      border: 1px solid var(--border-color);
    }

    .project-visual-label {
      color: var(--text-tertiary);
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .project-visual strong {
      font-size: 1.4rem;
      line-height: 1.1;
      letter-spacing: -0.04em;
    }

    .project-visual span:last-child {
      color: var(--text-secondary);
    }

    .project-highlights {
      display: grid;
      gap: 0.75rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .project-highlights li {
      padding-left: 1rem;
      position: relative;
      color: var(--text-secondary);
    }

    .project-highlights li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.72rem;
      width: 0.45rem;
      height: 0.45rem;
      border-radius: 999px;
      background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
    }

    .project-link {
      color: var(--text-primary);
      text-decoration: none;
      font-weight: 600;
    }

    .project-link:hover {
      color: var(--primary-color);
    }

    .principles,
    .process {
      display: grid;
      gap: 1rem;
      padding: 1.4rem;
    }

    .principle-item,
    .process-item {
      padding: 1rem 0 0;
      border-top: 1px solid var(--border-color);
    }

    .principle-item:first-of-type,
    .process-item:first-of-type {
      border-top: 0;
      padding-top: 0;
    }

    .principle-item h4,
    .process-item h4 {
      margin: 0 0 0.45rem;
      font-size: 1.05rem;
    }

    .cta {
      padding: 1.6rem;
      margin-bottom: 1rem;
    }

    .cta-copy {
      max-width: 40rem;
    }

    @media (max-width: 1080px) {
      .hero,
      .capability-grid,
      .project-grid,
      .operating-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .home {
        gap: 1.5rem;
      }

      .hero {
        min-height: auto;
        padding-top: 2rem;
      }

      .hero-title {
        font-size: clamp(2.6rem, 14vw, 4.2rem);
      }

      .signal-grid {
        grid-template-columns: 1fr;
      }

      .project-title {
        font-size: 1.45rem;
      }

      .cta {
        align-items: flex-start;
      }
    }
  `,
})
export class HomeComponent {
  private readonly projectsService = inject(ProjectsService);

  readonly heroSignals = [
    'Immersive layout system',
    'Accessible interaction states',
    'Case-study storytelling',
    'Performance-minded Angular',
  ];

  readonly heroMetrics: HeroMetric[] = [
    {
      value: '5+',
      label: 'Years shipping interfaces',
      detail: 'Focused on maintainable frontends and polished user journeys.',
    },
    {
      value: 'A11y',
      label: 'Accessibility built in',
      detail: 'Strong hierarchy, visible focus, and WCAG-aware components.',
    },
    {
      value: 'UI +',
      label: 'Product-minded execution',
      detail: 'The visuals are strong because the structure underneath is stronger.',
    },
    {
      value: 'Fast',
      label: 'Conversion-focused delivery',
      detail: 'Clear messaging, clean motion, and friction-free navigation.',
    },
  ];

  readonly capabilityCards: CapabilityCard[] = [
    {
      tag: 'Immersion',
      title: 'Layered atmosphere without visual noise',
      description:
        'Warm gradients, glassy surfaces, and structured spacing make the portfolio feel cinematic without sacrificing readability.',
    },
    {
      tag: 'Credibility',
      title: 'Case studies written for decision-makers',
      description:
        'Projects are framed by role, outcome, and technical choices so visitors understand value quickly.',
    },
    {
      tag: 'Execution',
      title: 'Engineered like a production frontend',
      description:
        'Angular architecture, responsive layouts, and accessible states keep the portfolio impressive and dependable.',
    },
  ];

  readonly principles: Principle[] = [
    {
      title: 'Clear hierarchy',
      description:
        'Every section pushes one primary idea so visitors never wonder where to look next.',
    },
    {
      title: 'Warm technical palette',
      description:
        'Sand, charcoal, teal, and copper create a premium tone that avoids the overused dark-purple portfolio look.',
    },
    {
      title: 'Measured motion',
      description:
        'Depth comes from layered backgrounds, subtle drift, and restrained hover states instead of constant animation.',
    },
  ];

  readonly process: ProcessStep[] = [
    {
      label: '01',
      title: 'Shape the narrative',
      description:
        'Lead with the strongest promise, then back it up with proof, work samples, and a confident call to action.',
    },
    {
      label: '02',
      title: 'Build the experience system',
      description:
        'Typography, palette, surfaces, spacing, and interaction states are treated as one coherent product language.',
    },
    {
      label: '03',
      title: 'Refine for trust',
      description:
        'Accessibility, responsiveness, and load behavior are refined so the portfolio feels finished on every screen.',
    },
  ];

  private readonly featuredProjects = this.projectsService.featuredProjects;

  readonly caseStudies = computed(() =>
    this.featuredProjects().map((project) => ({
      ...project,
      categoryLabel: PROJECT_CATEGORIES[project.category],
      heroHighlight: project.highlights[0] ?? 'Outcome-led case study',
      timeline: project.endDate
        ? `${project.startDate.getFullYear()} to ${project.endDate.getFullYear()}`
        : `Started ${project.startDate.getFullYear()}`,
      technologies: project.technologies.slice(0, 4),
      highlights: project.highlights.slice(0, 3),
    }))
  );
}
