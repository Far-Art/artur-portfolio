export interface Skill {
  name: string;
  category: SkillCategory;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  iconUrl?: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'other';

export const SKILL_CATEGORIES: Record<SkillCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Tools & DevOps',
  other: 'Other',
};
