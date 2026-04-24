export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  category: ProjectCategory;
  thumbnailUrl: string;
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  startDate: Date;
  endDate?: Date;
  highlights: string[];
}

export type ProjectCategory = 'web' | 'mobile' | 'desktop' | 'library' | 'tool' | 'other';

export const PROJECT_CATEGORIES: Record<ProjectCategory, string> = {
  web: 'Web Application',
  mobile: 'Mobile Application',
  desktop: 'Desktop Application',
  library: 'Library/Package',
  tool: 'Developer Tool',
  other: 'Other',
};
