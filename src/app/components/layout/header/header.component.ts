import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {PanelComponent} from '../../shared/panel/panel.component';
import {BrandTransitionService} from '../../../services/brand-transition.service';
import {ThemeService} from '../../../services/theme.service';


@Component({
    selector: 'fa-header',
    imports: [RouterLink, RouterLinkActive, PanelComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
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
    readonly headerTransform = computed(() => {
        const opacity = this.headerOpacity();
        return `translate3d(0, ${18 - opacity * 18}px, 0)`;
    });
    readonly headerPointerEvents = computed(() => {
        return this.headerOpacity() < 0.05 ? 'none' : 'auto';
    });

    toggleTheme(event: MouseEvent): void {
        const target = event.currentTarget;
        if (!(target instanceof HTMLElement)) {
            this.themeService.toggleTheme();
            return;
        }

        const bounds = target.getBoundingClientRect();
        const hasPointerPosition = Number.isFinite(event.clientX) && Number.isFinite(event.clientY) &&
            (event.clientX !== 0 || event.clientY !== 0);

        this.themeService.toggleTheme({
            x: hasPointerPosition ? event.clientX : bounds.left + bounds.width / 2,
            y: hasPointerPosition ? event.clientY : bounds.top + bounds.height / 2
        });
    }
}
