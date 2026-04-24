import { Injectable, signal, computed } from '@angular/core';
import { Project, ProjectCategory } from '../models/project.model';
import { PROJECTS } from '../data/projects.data';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private projects = signal<Project[]>(PROJECTS);
  private selectedCategory = signal<ProjectCategory | 'all'>('all');

  allProjects = this.projects.asReadonly();
  currentCategory = this.selectedCategory.asReadonly();

  filteredProjects = computed(() => {
    const category = this.selectedCategory();
    const projects = this.projects();

    if (category === 'all') {
      return projects;
    }

    return projects.filter((p) => p.category === category);
  });

  featuredProjects = computed(() => {
    return this.projects().filter((p) => p.featured);
  });

  setCategory(category: ProjectCategory | 'all'): void {
    this.selectedCategory.set(category);
  }

  getProjectById(id: string): Project | undefined {
    return this.projects().find((p) => p.id === id);
  }

  getRelatedProjects(projectId: string, limit: number = 3): Project[] {
    const project = this.getProjectById(projectId);
    if (!project) return [];

    return this.projects()
      .filter((p) => p.id !== projectId && p.category === project.category)
      .slice(0, limit);
  }
}
