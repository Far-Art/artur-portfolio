import { Skill } from '../models/skill.model';

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'Angular', category: 'frontend', level: 'expert' },
  { name: 'TypeScript', category: 'frontend', level: 'expert' },
  { name: 'JavaScript', category: 'frontend', level: 'expert' },
  { name: 'RxJS', category: 'frontend', level: 'advanced' },
  { name: 'HTML5', category: 'frontend', level: 'expert' },
  { name: 'CSS3/SCSS', category: 'frontend', level: 'advanced' },
  { name: 'React', category: 'frontend', level: 'advanced' },
  { name: 'Vue.js', category: 'frontend', level: 'intermediate' },

  // Backend
  { name: 'Node.js', category: 'backend', level: 'advanced' },
  { name: 'Express', category: 'backend', level: 'advanced' },
  { name: 'NestJS', category: 'backend', level: 'intermediate' },
  { name: 'REST APIs', category: 'backend', level: 'expert' },
  { name: 'GraphQL', category: 'backend', level: 'intermediate' },

  // Database
  { name: 'PostgreSQL', category: 'database', level: 'advanced' },
  { name: 'MongoDB', category: 'database', level: 'advanced' },
  { name: 'Redis', category: 'database', level: 'intermediate' },
  { name: 'MySQL', category: 'database', level: 'intermediate' },

  // Tools & DevOps
  { name: 'Git', category: 'tools', level: 'expert' },
  { name: 'Docker', category: 'tools', level: 'advanced' },
  { name: 'AWS', category: 'tools', level: 'intermediate' },
  { name: 'CI/CD', category: 'tools', level: 'advanced' },
  { name: 'Jest/Vitest', category: 'tools', level: 'advanced' },
  { name: 'Webpack/Vite', category: 'tools', level: 'intermediate' },
];
