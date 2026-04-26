import {isPlatformBrowser} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    PLATFORM_ID,
    afterNextRender,
    computed,
    inject
} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PanelComponent} from '../../components/shared/panel/panel.component';
import {PROJECT_CATEGORIES} from '../../models/project.model';
import {BrandTransitionService} from '../../services/brand-transition.service';
import {ProjectsService} from '../../services/projects.service';


interface HeroMetric {
    value: string;
    label: string;
    detail: string;
}

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
    private readonly projectsService = inject(ProjectsService);
    private readonly brandTransitionService = inject(BrandTransitionService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly platformId = inject(PLATFORM_ID);

    private readonly featuredProjects = this.projectsService.featuredProjects;

    readonly heroSignals = [
        'Immersive layout system',
        'Accessible interaction states',
        'Case-study storytelling',
        'Performance-minded Angular'
    ];

    readonly heroMetrics: HeroMetric[] = [
        {
            value: '5+',
            label: 'Years shipping interfaces',
            detail: 'Focused on maintainable frontends and polished user journeys.'
        },
        {
            value: 'A11y',
            label: 'Accessibility built in',
            detail: 'Strong hierarchy, visible focus, and WCAG-aware components.'
        },
        {
            value: 'UI +',
            label: 'Product-minded execution',
            detail: 'The visuals are strong because the structure underneath is stronger.'
        },
        {
            value: 'Fast',
            label: 'Conversion-focused delivery',
            detail: 'Clear messaging, clean motion, and friction-free navigation.'
        }
    ];

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

    readonly caseStudies = computed(() =>
        this.featuredProjects().map((project) => ({
            ...project,
            categoryLabel: PROJECT_CATEGORIES[project.category],
            heroHighlight: project.highlights[0] ?? 'Outcome-led case study',
            timeline: project.endDate
                ? `${project.startDate.getFullYear()} to ${project.endDate.getFullYear()}`
                : `Started ${project.startDate.getFullYear()}`,
            technologies: project.technologies.slice(0, 4),
            highlights: project.highlights.slice(0, 3)
        }))
    );

    readonly brandProgress = computed(() => `${this.brandTransitionService.progress()}`);

    constructor() {
        afterNextRender(() => {
            if (!isPlatformBrowser(this.platformId)) {
                return;
            }

            this.brandTransitionService.activate();

            const updateBrandState = () => {
                this.brandTransitionService.setProgress(window.scrollY / 420);
            };

            updateBrandState();

            window.addEventListener('scroll', updateBrandState, {passive: true});
            window.addEventListener('resize', updateBrandState);

            this.destroyRef.onDestroy(() => {
                window.removeEventListener('scroll', updateBrandState);
                window.removeEventListener('resize', updateBrandState);
                this.brandTransitionService.deactivate();
            });
        });
    }
}
