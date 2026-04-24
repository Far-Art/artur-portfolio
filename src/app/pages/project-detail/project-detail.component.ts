import {DatePipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ProjectCategory, PROJECT_CATEGORIES} from '../../models/project.model';
import {ProjectsService} from '../../services/projects.service';


@Component({
    selector: 'app-project-detail',
    imports: [RouterLink, DatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './project-detail.component.html',
    styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {
    private readonly projectsService = inject(ProjectsService);

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
        return PROJECT_CATEGORIES[category];
    }
}
