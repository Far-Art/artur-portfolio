import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PanelComponent} from '../../components/shared/panel/panel.component';
import {Project, ProjectCategory} from '../../models/project.model';
import {I18nService, TranslationKey} from '../../services/i18n.service';
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
    private readonly i18n = inject(I18nService);

    readonly filteredProjects = this.projectsService.filteredProjects;
    readonly currentCategory = this.projectsService.currentCategory;

    readonly categories = computed(() => {
        const categories: ProjectCategory[] = ['web', 'mobile', 'desktop', 'library', 'tool', 'other'];
        return categories.map((category) => ({
            key: category,
            label: this.i18n.projectCategoryLabel(category)
        }));
    });

    setCategory(category: ProjectCategory | 'all'): void {
        this.projectsService.setCategory(category);
    }

    getCategoryLabel(category: ProjectCategory): string {
        return this.i18n.projectCategoryLabel(category);
    }

    projectTitle(project: Project): string {
        return this.i18n.projectTitle(project.id, project.title);
    }

    projectShortDescription(project: Project): string {
        return this.i18n.projectShortDescription(project.id, project.shortDescription);
    }

    projectHighlight(project: Project, highlightIndex: number): string {
        return this.i18n.projectHighlight(project.id, highlightIndex, project.highlights[highlightIndex] ?? '');
    }

    t(key: TranslationKey, params: Record<string, string | number> = {}): string {
        return this.i18n.translate(key, params);
    }
}
