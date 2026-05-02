import {DatePipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PanelComponent} from '../../components/shared/panel/panel.component';
import {Project, ProjectCategory} from '../../models/project.model';
import {ProjectsService} from '../../services/projects.service';
import {I18nService, TranslationKey} from '../../services/i18n.service';


@Component({
    selector: 'fa-project-detail',
    imports: [RouterLink, DatePipe, PanelComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './project-detail.component.html',
    styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {
    private readonly projectsService = inject(ProjectsService);
    private readonly i18n = inject(I18nService);

    readonly id = input.required<string>();

    readonly project = computed(() => {
        const projectId = this.id();
        return this.projectsService.getProjectById(projectId);
    });

    readonly relatedProjects = computed(() => {
        const projectId = this.id();
        return this.projectsService.getRelatedProjects(projectId, 3);
    });

    projectCategoryLabel(category: ProjectCategory): string {
        return this.i18n.projectCategoryLabel(category);
    }

    projectTitle(project: Project): string {
        return this.i18n.projectTitle(project.id, project.title);
    }

    projectShortDescription(project: Project): string {
        return this.i18n.projectShortDescription(project.id, project.shortDescription);
    }

    projectFullDescription(project: Project): string {
        return this.i18n.projectFullDescription(project.id, project.fullDescription);
    }

    projectHighlight(project: Project, highlightIndex: number): string {
        return this.i18n.projectHighlight(project.id, highlightIndex, project.highlights[highlightIndex] ?? '');
    }

    t(key: TranslationKey, params: Record<string, string | number> = {}): string {
        return this.i18n.translate(key, params);
    }

    locale(): string {
        return this.i18n.locale();
    }
}
