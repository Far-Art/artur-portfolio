import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PanelComponent} from '../../components/shared/panel/panel.component';
import {ProjectCategory, PROJECT_CATEGORIES} from '../../models/project.model';
import {ProjectsService} from '../../services/projects.service';


@Component({
    selector: 'fa-projects',
    imports: [RouterLink, PanelComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
    private readonly projectsService = inject(ProjectsService);

    readonly filteredProjects = this.projectsService.filteredProjects;
    readonly currentCategory = this.projectsService.currentCategory;

    readonly categories = Object.entries(PROJECT_CATEGORIES).map(([key, label]) => ({
        key: key as ProjectCategory,
        label
    }));

    setCategory(category: ProjectCategory | 'all'): void {
        this.projectsService.setCategory(category);
    }

    getCategoryLabel(category: ProjectCategory): string {
        return PROJECT_CATEGORIES[category];
    }
}
