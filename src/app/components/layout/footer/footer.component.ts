import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SOCIAL_LINKS } from '../../../data/social.data';

@Component({
  selector: 'app-footer',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="footer-container surface-panel">
        <div class="footer-heading">
          <p class="footer-kicker">Ready for the next build?</p>
          <h2>Design-forward engineering with product discipline.</h2>
          <p class="footer-description">
            Available for portfolio sites, product frontends, and Angular interfaces that need to
            feel polished from the first scroll.
          </p>
        </div>

        <div class="footer-content">
          <div class="social-links" role="list">
            @for (link of socialLinks; track link.platform) {
              <a
                [href]="link.url"
                target="_blank"
                rel="noopener noreferrer"
                [attr.aria-label]="link.platform"
                class="social-link"
              >
                <span class="social-label">{{ link.platform }}</span>
                <span class="social-arrow">/</span>
              </a>
            }
          </div>

          <div class="footer-meta">
            <p class="copyright">© {{ currentYear }} Artur. Built for modern web clients.</p>
            <p class="built-with">Angular {{ angularVersion }} · TypeScript · Accessible UI</p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      margin-top: auto;
      padding: 0 0 1.25rem;
    }

    .footer-container {
      width: min(100%, 88rem);
      margin: 0 auto;
      padding: 2.25rem 1.5rem;
      border-radius: 2rem;
    }

    .footer-heading {
      max-width: 44rem;
      margin-bottom: 2rem;
    }

    .footer-kicker {
      margin: 0 0 0.85rem;
      color: var(--secondary-color);
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.8rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .footer-heading h2 {
      margin: 0 0 0.75rem;
      font-size: clamp(1.8rem, 3vw, 2.8rem);
      line-height: 1.04;
      letter-spacing: -0.05em;
    }

    .footer-description {
      margin: 0;
      color: var(--text-secondary);
      max-width: 36rem;
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      gap: 2rem;
      align-items: end;
    }

    .social-links {
      display: flex;
      gap: 0.9rem;
      flex-wrap: wrap;
    }

    .social-link {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.8rem 1rem;
      border-radius: 999px;
      border: 1px solid var(--border-color);
      background: var(--bg-elevated);
      color: var(--text-primary);
      text-decoration: none;
      font-weight: 500;
      transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        color 0.25s ease;
    }

    .social-link:hover {
      transform: translateY(-2px);
      border-color: var(--secondary-color);
      color: var(--primary-color);
    }

    .social-arrow,
    .built-with {
      font-family: 'IBM Plex Mono', monospace;
    }

    .social-arrow {
      color: var(--text-tertiary);
    }

    .footer-meta {
      display: grid;
      gap: 0.4rem;
    }

    .copyright,
    .built-with {
      margin: 0;
      color: var(--text-tertiary);
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .footer-container {
        width: calc(100% - 2rem);
      }

      .footer-content {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    @media (max-width: 640px) {
      .footer-container {
        width: calc(100% - 1rem);
        padding: 1.5rem 1rem;
      }

      .social-links {
        gap: 0.75rem;
      }
    }
  `,
})
export class FooterComponent {
  readonly socialLinks = SOCIAL_LINKS;
  readonly currentYear = new Date().getFullYear();
  readonly angularVersion = '21';
}
