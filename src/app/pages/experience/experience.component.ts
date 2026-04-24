import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXPERIENCES } from '../../data/experience.data';

@Component({
  selector: 'app-experience',
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="experience">
      <div class="container">
        <span class="eyebrow">Career timeline</span>
        <h1 class="page-title">Work shaped through product delivery.</h1>
        <p class="page-description">
          The experience section reads like a release log: responsibility, outcomes, and stack
          choices, without decorative noise getting in the way.
        </p>

        <div class="timeline">
          @for (exp of experiences; track exp.id) {
            <article class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="experience-card surface-panel">
                <div class="experience-header">
                  <h2 class="position">{{ exp.position }}</h2>
                  <h3 class="company">{{ exp.company }}</h3>
                  <div class="experience-meta">
                    <span class="location">Location: {{ exp.location }}</span>
                    <span class="duration">
                      Timeline: {{ exp.startDate | date: 'MMM yyyy' }} -
                      @if (exp.current) {
                        <span class="current-badge">Present</span>
                      } @else {
                        {{ exp.endDate | date: 'MMM yyyy' }}
                      }
                    </span>
                  </div>
                </div>

                <p class="description">{{ exp.description }}</p>

                <div class="achievements">
                  <h4 class="achievements-title">Key achievements</h4>
                  <ul class="achievements-list">
                    @for (achievement of exp.achievements; track achievement) {
                      <li>{{ achievement }}</li>
                    }
                  </ul>
                </div>

                <div class="technologies">
                  <h4 class="tech-title">Technologies</h4>
                  <div class="tech-tags">
                    @for (tech of exp.technologies; track tech) {
                      <span class="tech-tag">{{ tech }}</span>
                    }
                  </div>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    .experience {
      min-height: 100vh;
      padding: 3rem 0 1rem;
    }

    .container {
      display: grid;
      gap: 1.5rem;
    }

    .page-title {
      margin: 0;
      font-size: clamp(2.5rem, 5vw, 4.5rem);
      line-height: 0.96;
      letter-spacing: -0.06em;
      max-width: 14ch;
    }

    .page-description {
      margin: 0;
      max-width: 42rem;
      font-size: 1.08rem;
      color: var(--text-secondary);
      line-height: 1.7;
    }

    .timeline {
      position: relative;
      padding-left: 3rem;
      margin-top: 1rem;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
    }

    .timeline-item {
      position: relative;
      margin-bottom: 1.5rem;
    }

    .timeline-marker {
      position: absolute;
      left: -3.6rem;
      top: 2rem;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      background: var(--primary-color);
      border: 4px solid var(--bg-primary);
      box-shadow: 0 0 0 3px var(--primary-color-light);
      z-index: 10;
    }

    .experience-card {
      padding: 2rem;
      transition: all 0.3s ease;
      position: relative;
      border-radius: var(--radius-large);
    }

    .experience-card:hover {
      transform: translateX(8px);
      box-shadow: var(--shadow-medium);
      border-color: var(--primary-color);
    }

    .experience-header {
      margin-bottom: 1.5rem;
    }

    .position {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .company {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--primary-color);
      margin-bottom: 0.75rem;
    }

    .experience-meta {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
      color: var(--text-tertiary);
      font-size: 0.95rem;
      font-family: 'IBM Plex Mono', monospace;
    }

    .current-badge {
      display: inline-block;
      background: var(--success-color);
      color: white;
      padding: 0.125rem 0.5rem;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 600;
      margin-left: 0.25rem;
      vertical-align: middle;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .description {
      font-size: 1.08rem;
      line-height: 1.7;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
    }

    .achievements {
      margin-bottom: 1.5rem;
    }

    .achievements-title,
    .tech-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 0.75rem;
    }

    .achievements-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 0.7rem;
    }

    .achievements-list li {
      position: relative;
      padding-left: 1.25rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .achievements-list li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.7rem;
      width: 0.45rem;
      height: 0.45rem;
      border-radius: 999px;
      background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
    }

    .technologies {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color);
    }

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tech-tag {
      padding: 0.375rem 0.875rem;
      background: var(--bg-elevated);
      color: var(--text-secondary);
      border-radius: 999px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.84rem;
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
    }

    .tech-tag:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }

    @media (max-width: 768px) {
      .timeline {
        padding-left: 2rem;
      }

      .timeline::before {
        width: 2px;
      }

      .timeline-marker {
        left: -2.6rem;
        width: 1rem;
        height: 1rem;
      }

      .experience-card {
        padding: 1.5rem;
      }

      .position {
        font-size: 1.5rem;
      }

      .company {
        font-size: 1.125rem;
      }

      .experience-meta {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  `,
})
export class ExperienceComponent {
  readonly experiences = EXPERIENCES;
}
