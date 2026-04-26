import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Component, DestroyRef, PLATFORM_ID, computed, inject} from '@angular/core';
import {NavigationStart, Router, RouterLink, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs';
import {BrandTransitionService} from './services/brand-transition.service';
import {HeaderComponent} from './components/layout/header/header.component';
import {FooterComponent} from './components/layout/footer/footer.component';
import {Logo} from './logo/logo';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, Logo, RouterLink],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    private readonly brandTransitionService = inject(BrandTransitionService);
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);
    private readonly document = inject(DOCUMENT);
    private readonly platformId = inject(PLATFORM_ID);
    private hasHandledInitialNavigation = false;

    readonly brandProgress = computed(() => `${this.brandTransitionService.progress()}`);

    constructor() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        this.router.events
            .pipe(
                filter((event): event is NavigationStart => event instanceof NavigationStart),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(() => {
                if (!this.hasHandledInitialNavigation) {
                    this.hasHandledInitialNavigation = true;
                    return;
                }

                this.runInstantScroll(() => {
                    window.scrollTo(0, 0);
                });
            });
    }

    private runInstantScroll(callback: () => void): void {
        const htmlElement = this.document.documentElement;
        const bodyElement = this.document.body;
        const previousHtmlScrollBehavior = htmlElement.style.scrollBehavior;
        const previousBodyScrollBehavior = bodyElement.style.scrollBehavior;

        htmlElement.style.scrollBehavior = 'auto';
        bodyElement.style.scrollBehavior = 'auto';
        callback();

        requestAnimationFrame(() => {
            htmlElement.style.scrollBehavior = previousHtmlScrollBehavior;
            bodyElement.style.scrollBehavior = previousBodyScrollBehavior;
        });
    }
}
