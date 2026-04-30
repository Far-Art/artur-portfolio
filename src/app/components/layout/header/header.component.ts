import {DOCUMENT} from '@angular/common';
import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    computed,
    inject,
    signal,
    viewChild
} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {PanelComponent} from '../../shared/panel/panel.component';
import {BrandTransitionService} from '../../../services/brand-transition.service';
import {ThemeService} from '../../../services/theme.service';

interface IndicatorState {
    x: number;
    y: number;
    width: number;
    height: number;
    opacity: number;
}


@Component({
    selector: 'fa-header',
    imports: [RouterLink, RouterLinkActive, PanelComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(window:resize)': 'handleViewportChange()'
    },
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    private readonly navLinks = viewChild.required<ElementRef<HTMLElement>>('navLinks');
    private readonly document = inject(DOCUMENT);
    private readonly themeService = inject(ThemeService);
    readonly theme = this.themeService.theme;
    private readonly brandTransitionService = inject(BrandTransitionService);
    private readonly activeTarget = signal<HTMLElement | null>(null);
    private readonly interactionTarget = signal<HTMLElement | null>(null);
    private readonly indicatorState = signal<IndicatorState>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        opacity: 0
    });
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
    readonly indicatorWidth = computed(() => this.indicatorState().width);
    readonly indicatorHeight = computed(() => this.indicatorState().height);
    readonly indicatorOpacity = computed(() => this.indicatorState().opacity);
    readonly indicatorTransform = computed(() => {
        const {x, y} = this.indicatorState();
        return `translate3d(${x}px, ${y}px, 0)`;
    });

    constructor() {
        afterNextRender(() => {
            requestAnimationFrame(() => {
                this.syncActiveTargetFromDom();
                this.syncIndicatorToCurrentTarget();
            });
        });
    }

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

    setInteractionTarget(target: HTMLElement): void {
        this.interactionTarget.set(target);
        this.syncIndicatorToElement(target);
    }

    clearInteractionTarget(): void {
        if (!this.interactionTarget()) {
            return;
        }

        this.interactionTarget.set(null);
        this.syncIndicatorToCurrentTarget();
    }

    handleListPointerLeave(): void {
        const focusedElement = this.document.activeElement;
        const navLinksElement = this.navLinks().nativeElement;

        if (focusedElement instanceof HTMLElement && navLinksElement.contains(focusedElement)) {
            this.setInteractionTarget(focusedElement);
            return;
        }

        this.clearInteractionTarget();
    }

    handleListFocusOut(event: FocusEvent): void {
        const nextFocused = event.relatedTarget;
        const navLinksElement = this.navLinks().nativeElement;

        if (nextFocused instanceof HTMLElement && navLinksElement.contains(nextFocused)) {
            return;
        }

        this.clearInteractionTarget();
    }

    handleRouteActiveChange(target: HTMLElement, isActive: boolean): void {
        if (isActive) {
            this.activeTarget.set(target);
        } else if (this.activeTarget() === target) {
            this.activeTarget.set(null);
        }

        if (!this.interactionTarget()) {
            this.syncIndicatorToCurrentTarget();
        }
    }

    handleViewportChange(): void {
        this.syncIndicatorToCurrentTarget();
    }

    private syncActiveTargetFromDom(): void {
        const activeLink = this.navLinks().nativeElement.querySelector<HTMLElement>('a.active');
        this.activeTarget.set(activeLink);
    }

    private syncIndicatorToCurrentTarget(): void {
        const target = this.interactionTarget() ?? this.activeTarget();

        if (!target) {
            this.hideIndicator();
            return;
        }

        this.syncIndicatorToElement(target);
    }

    private syncIndicatorToElement(target: HTMLElement): void {
        const navLinksElement = this.navLinks().nativeElement;
        const navLinksRect = navLinksElement.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        if (targetRect.width === 0 || targetRect.height === 0) {
            this.hideIndicator();
            return;
        }

        this.indicatorState.set({
            x: targetRect.left - navLinksRect.left + navLinksElement.scrollLeft,
            y: targetRect.top - navLinksRect.top + navLinksElement.scrollTop,
            width: targetRect.width,
            height: targetRect.height,
            opacity: 1
        });
    }

    private hideIndicator(): void {
        this.indicatorState.update((state) => ({
            ...state,
            opacity: 0
        }));
    }
}
