import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {Injectable, PLATFORM_ID, effect, inject, signal} from '@angular/core';


export type Theme = 'light' | 'dark';
type ThemeTransitionOrigin = {
    x: number;
    y: number;
};

type ViewTransition = {
    finished: Promise<void>;
    ready: Promise<void>;
};

type DocumentWithViewTransition = Document & {
    startViewTransition?: (callback: () => Promise<void> | void) => ViewTransition;
};

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly platformId = inject(PLATFORM_ID);
    private readonly document = inject(DOCUMENT);
    private readonly STORAGE_KEY = 'portfolio-theme';

    readonly theme = signal<Theme>(this.getInitialTheme());

    constructor() {
        effect(() => {
            if (isPlatformBrowser(this.platformId)) {
                const theme = this.theme();
                this.document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem(this.STORAGE_KEY, theme);
            }
        });
    }

    toggleTheme(origin?: ThemeTransitionOrigin): void {
        const nextTheme: Theme = this.theme() === 'light' ? 'dark' : 'light';

        if (!origin || !this.canAnimateThemeTransition()) {
            this.theme.set(nextTheme);
            return;
        }

        this.runAnimatedThemeTransition(nextTheme, origin);
    }

    setTheme(theme: Theme): void {
        this.theme.set(theme);
    }

    private getInitialTheme(): Theme {
        if (!isPlatformBrowser(this.platformId)) {
            return 'light';
        }

        // Check localStorage first
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') {
            return stored;
        }

        // Check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    }

    private canAnimateThemeTransition(): boolean {
        if (!isPlatformBrowser(this.platformId)) {
            return false;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return false;
        }

        return typeof this.viewTransitionDocument.startViewTransition === 'function';
    }

    private runAnimatedThemeTransition(theme: Theme, origin: ThemeTransitionOrigin): void {
        const root = this.document.documentElement;
        const radius = this.getRevealRadius(origin);

        root.style.setProperty('--theme-reveal-x', `${origin.x}px`);
        root.style.setProperty('--theme-reveal-y', `${origin.y}px`);
        root.style.setProperty('--theme-reveal-radius', `${radius}px`);
        root.setAttribute('data-theme-transition', theme);

        const transition = this.viewTransitionDocument.startViewTransition?.(() => {
            this.theme.set(theme);
        });

        if (!transition) {
            root.removeAttribute('data-theme-transition');
            this.clearTransitionStyles();
            return;
        }

        transition.ready
            .then(() => this.animateThemeReveal(origin, radius))
            .catch(() => undefined)
            .finally(() => {
                transition.finished.finally(() => {
                    requestAnimationFrame(() => {
                        root.removeAttribute('data-theme-transition');
                        this.clearTransitionStyles();
                    });
                });
            });
    }

    private getRevealRadius(origin: ThemeTransitionOrigin): number {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const distances = [
            Math.hypot(origin.x, origin.y),
            Math.hypot(width - origin.x, origin.y),
            Math.hypot(origin.x, height - origin.y),
            Math.hypot(width - origin.x, height - origin.y)
        ];

        return Math.max(...distances);
    }

    private clearTransitionStyles(): void {
        const root = this.document.documentElement;
        root.style.removeProperty('--theme-reveal-x');
        root.style.removeProperty('--theme-reveal-y');
        root.style.removeProperty('--theme-reveal-radius');
    }

    private async animateThemeReveal(origin: ThemeTransitionOrigin, radius: number): Promise<void> {
        const animation = this.document.documentElement.animate(
            {
                clipPath: [
                    `circle(0 at ${origin.x}px ${origin.y}px)`,
                    `circle(${radius}px at ${origin.x}px ${origin.y}px)`
                ]
            },
            {
                duration: 980,
                easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
                fill: 'both',
                pseudoElement: '::view-transition-new(root)'
            }
        );

        await animation.finished.catch(() => undefined);
    }

    private get viewTransitionDocument(): DocumentWithViewTransition {
        return this.document as DocumentWithViewTransition;
    }
}
