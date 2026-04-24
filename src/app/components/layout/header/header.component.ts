import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <nav class="nav-container surface-panel" aria-label="Primary">
        <a routerLink="/" class="logo" aria-label="Artur portfolio home">
          <span class="logo-mark">A</span>
          <span class="logo-copy">
            <span class="logo-title">Artur</span>
            <span class="logo-subtitle">Software Developer</span>
          </span>
        </a>

        <ul class="nav-links" role="list">
          <li>
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
              Home
            </a>
          </li>
          <li>
            <a routerLink="/about" routerLinkActive="active">About</a>
          </li>
          <li>
            <a routerLink="/projects" routerLinkActive="active">Projects</a>
          </li>
          <li>
            <a routerLink="/experience" routerLinkActive="active">Experience</a>
          </li>
          <li>
            <a routerLink="/contact" routerLinkActive="active">Contact</a>
          </li>
        </ul>

        <button
          class="theme-toggle"
          type="button"
          (click)="toggleTheme()"
          [attr.aria-label]="'Switch to ' + (theme() === 'light' ? 'dark' : 'light') + ' theme'"
          [attr.aria-pressed]="theme() === 'dark'"
        >
          <span class="theme-label">{{ theme() === 'light' ? 'Dark mode' : 'Light mode' }}</span>
        </button>
      </nav>
    </header>
  `,
  styles: `
    .header {
      position: sticky;
      top: 0;
      z-index: 1000;
      padding: 1rem 0 0;
    }

    .nav-container {
      width: min(100%, 88rem);
      margin: 0 auto;
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      justify-content: space-between;
      border-radius: 1.5rem;
    }

    .logo {
      display: inline-flex;
      align-items: center;
      gap: 0.9rem;
      color: inherit;
      text-decoration: none;
      min-width: 0;
    }

    .logo-mark {
      display: inline-grid;
      place-items: center;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 0.9rem;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: white;
      font-weight: 700;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22);
    }

    .logo-copy {
      display: grid;
      gap: 0.1rem;
    }

    .logo-title {
      font-weight: 700;
      letter-spacing: -0.04em;
      color: var(--text-primary);
    }

    .logo-subtitle {
      color: var(--text-tertiary);
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .nav-links {
      display: flex;
      gap: 0.35rem;
      list-style: none;
      margin: 0;
      padding: 0;
      flex: 1;
      justify-content: center;
      flex-wrap: wrap;
    }

    .nav-links a {
      display: inline-flex;
      align-items: center;
      padding: 0.65rem 0.95rem;
      border-radius: 999px;
      text-decoration: none;
      color: var(--text-secondary);
      font-weight: 500;
      transition:
        color 0.25s ease,
        background-color 0.25s ease,
        transform 0.25s ease;
    }

    .nav-links a:hover {
      background: var(--bg-elevated);
      color: var(--primary-color);
      transform: translateY(-1px);
    }

    .nav-links a.active {
      background: linear-gradient(135deg, var(--primary-color-light), var(--secondary-color-light));
      color: var(--primary-color);
      box-shadow: inset 0 0 0 1px rgba(15, 118, 110, 0.18);
    }

    .theme-toggle {
      border: 1px solid var(--border-color);
      border-radius: 999px;
      padding: 0.8rem 1rem;
      background: var(--bg-elevated);
      color: var(--text-primary);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        background-color 0.25s ease;
    }

    .theme-toggle:hover {
      border-color: var(--primary-color);
      transform: translateY(-1px);
    }

    .theme-label {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.78rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    @media (max-width: 960px) {
      .nav-container {
        width: calc(100% - 2rem);
        flex-wrap: wrap;
        justify-content: center;
      }

      .nav-links {
        order: 3;
        width: 100%;
      }
    }

    @media (max-width: 640px) {
      .header {
        padding-top: 0.75rem;
      }

      .nav-container {
        width: calc(100% - 1rem);
        gap: 1rem;
        padding: 0.95rem;
      }

      .nav-links {
        justify-content: flex-start;
        overflow-x: auto;
        flex-wrap: nowrap;
        padding-bottom: 0.25rem;
        scrollbar-width: thin;
      }

      .theme-toggle {
        width: 100%;
      }

      .logo-subtitle {
        font-size: 0.72rem;
      }
    }
  `,
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);

  readonly theme = this.themeService.theme;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
