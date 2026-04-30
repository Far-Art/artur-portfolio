import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  PLATFORM_ID
} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PanelComponent} from '../../components/shared/panel/panel.component';
import {BrandTransitionService} from '../../services/brand-transition.service';

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
  selector: 'fa-home',
  imports: [RouterLink, PanelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  readonly capabilityCards: CapabilityCard[] = [
    {
      tag: 'Immersion',
      title: 'Layered atmosphere without visual noise',
      description:
        'Warm gradients, glassy surfaces, and structured spacing make the portfolio feel cinematic without sacrificing readability.'
    },
    {
      tag: 'Credibility',
      title: 'Case studies written for decision-makers',
      description:
        'Projects are framed by role, outcome, and technical choices so visitors understand value quickly.'
    },
    {
      tag: 'Execution',
      title: 'Engineered like a production frontend',
      description:
        'Angular architecture, responsive layouts, and accessible states keep the portfolio impressive and dependable.'
    }
  ];
  readonly principles: Principle[] = [
    {
      title: 'Clear hierarchy',
      description:
        'Every section pushes one primary idea so visitors never wonder where to look next.'
    },
    {
      title: 'Warm technical palette',
      description:
        'Sand, charcoal, teal, and copper create a premium tone that avoids the overused dark-purple portfolio look.'
    },
    {
      title: 'Measured motion',
      description:
        'Depth comes from layered backgrounds, subtle drift, and restrained hover states instead of constant animation.'
    }
  ];
  readonly process: ProcessStep[] = [
    {
      label: '01',
      title: 'Shape the narrative',
      description:
        'Lead with the strongest promise, then back it up with proof, work samples, and a confident call to action.'
    },
    {
      label: '02',
      title: 'Build the experience system',
      description:
        'Typography, palette, surfaces, spacing, and interaction states are treated as one coherent product language.'
    },
    {
      label: '03',
      title: 'Refine for trust',
      description:
        'Accessibility, responsiveness, and load behavior are refined so the portfolio feels finished on every screen.'
    }
  ];
  private readonly brandTransitionService = inject(BrandTransitionService);
  readonly brandProgress = computed(() => `${this.brandTransitionService.progress()}`);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const heroSection = this.document.getElementById('home-hero');
      let heroObserver: IntersectionObserver | null = null;

      const updateBrandState = () => {
        if (this.syncIntroWithScroll(heroSection)) {
          heroObserver?.disconnect();
          return;
        }

        this.brandTransitionService.activate();
        this.brandTransitionService.setProgress(window.scrollY / 420);
      };

      if (heroSection) {
        heroObserver = new IntersectionObserver(
          (entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) {
              return;
            }

            heroObserver?.disconnect();
          },
          {
            threshold: 0.2
          }
        );
      }

      this.brandTransitionService.activate();
      this.brandTransitionService.setProgress(window.scrollY / 420);
      heroObserver?.observe(heroSection!);

      requestAnimationFrame(() => {
        requestAnimationFrame(updateBrandState);
      });

      window.addEventListener('scroll', updateBrandState, {passive: true});
      window.addEventListener('resize', updateBrandState);

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', updateBrandState);
        window.removeEventListener('resize', updateBrandState);
        heroObserver?.disconnect();
        this.brandTransitionService.deactivate();
      });
    });
  }

  scrollToHero(event: MouseEvent): void {
    event.preventDefault();

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.document.getElementById('home-hero')?.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  }

  private syncIntroWithScroll(heroSection: HTMLElement | null): boolean {
    if (!heroSection) {
      return false;
    }

    const heroTop = heroSection.getBoundingClientRect().top + window.scrollY;

    return window.scrollY >= heroTop - 1;
  }
}
