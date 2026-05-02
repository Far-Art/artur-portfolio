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
import {I18nService, TranslationKey} from '../../services/i18n.service';

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
  private readonly i18n = inject(I18nService);

  readonly capabilityCards = computed<CapabilityCard[]>(() => [
    {
      tag: this.t('capabilityImmersionTag'),
      title: this.t('capabilityImmersionTitle'),
      description: this.t('capabilityImmersionDescription')
    },
    {
      tag: this.t('capabilityCredibilityTag'),
      title: this.t('capabilityCredibilityTitle'),
      description: this.t('capabilityCredibilityDescription')
    },
    {
      tag: this.t('capabilityExecutionTag'),
      title: this.t('capabilityExecutionTitle'),
      description: this.t('capabilityExecutionDescription')
    }
  ]);
  readonly principles = computed<Principle[]>(() => [
    {
      title: this.t('principleHierarchyTitle'),
      description: this.t('principleHierarchyDescription')
    },
    {
      title: this.t('principlePaletteTitle'),
      description: this.t('principlePaletteDescription')
    },
    {
      title: this.t('principleMotionTitle'),
      description: this.t('principleMotionDescription')
    }
  ]);
  readonly process = computed<ProcessStep[]>(() => [
    {
      label: '01',
      title: this.t('processNarrativeTitle'),
      description: this.t('processNarrativeDescription')
    },
    {
      label: '02',
      title: this.t('processSystemTitle'),
      description: this.t('processSystemDescription')
    },
    {
      label: '03',
      title: this.t('processTrustTitle'),
      description: this.t('processTrustDescription')
    }
  ]);
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

  t(key: TranslationKey): string {
    return this.i18n.translate(key);
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
