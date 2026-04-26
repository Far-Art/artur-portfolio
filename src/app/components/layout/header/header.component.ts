import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {BrandTransitionService} from '../../../services/brand-transition.service';
import {ThemeService} from '../../../services/theme.service';


@Component({
    selector: 'fa-header',
    imports: [RouterLink, RouterLinkActive],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    readonly headerTransform = computed(() => {
        const opacity = this.headerOpacity();
        return `translate3d(0, ${18 - opacity * 18}px, 0)`;
    });
    readonly headerPointerEvents = computed(() => {
        return this.headerOpacity() < 0.05 ? 'none' : 'auto';
    });
    private readonly themeService = inject(ThemeService);
    readonly theme = this.themeService.theme;
    private readonly brandTransitionService = inject(BrandTransitionService);
    readonly headerOpacity = computed(() => {
        if (!this.brandTransitionService.isActive()) {
            return 1;
        }

        const progress = this.brandTransitionService.progress();
        return Math.max(0, Math.min(1, (progress - 0.52) / 0.32));
    });

    toggleTheme(): void {
        this.themeService.toggleTheme();
    }
}
