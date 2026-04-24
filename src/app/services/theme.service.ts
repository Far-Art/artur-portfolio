import {Injectable, signal, effect, PLATFORM_ID, inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';


export type Theme = 'light' | 'dark';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private platformId = inject(PLATFORM_ID);
    private readonly STORAGE_KEY = 'portfolio-theme';

    theme = signal<Theme>(this.getInitialTheme());

    constructor() {
        // Apply theme changes to document
        effect(() => {
            if (isPlatformBrowser(this.platformId)) {
                const theme = this.theme();
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem(this.STORAGE_KEY, theme);
            }
        });
    }

    toggleTheme(): void {
        this.theme.update((current) => (current === 'light' ? 'dark' : 'light'));
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
}
