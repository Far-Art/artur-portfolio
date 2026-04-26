import { Skill } from '../models/skill.model';

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'Angular', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'RxJS', category: 'frontend' },
  { name: 'HTML5', category: 'frontend' },
  { name: 'CSS3/SCSS', category: 'frontend' },

  // Backend
  { name: 'Java', category: 'backend' },
  { name: 'Spring / SpringBoot', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Microservices', category: 'backend' },
  { name: 'Internationalization', category: 'backend' },

  // Database
  { name: 'SQL', category: 'database' },
  { name: 'NoSQL', category: 'database' },
  { name: 'Redis', category: 'database' },

  // Tools & DevOps
  { name: 'Git', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'CI/CD', category: 'tools' },
  { name: 'Vitest', category: 'tools' },
];
