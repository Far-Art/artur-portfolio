import {Experience} from '../models/experience.model';


export const EXPERIENCES: Experience[] = [
    {
        id: 'exp-1',
        company: 'Tech Company Inc.',
        position: 'Senior Software Engineer',
        location: 'Remote',
        startDate: new Date('2022-01-01'),
        current: true,
        description: 'Leading development of modern web applications using Angular and TypeScript.',
        achievements: [
            'Led a team of 5 developers in building a customer-facing web application',
            'Improved application performance by 40% through optimization techniques',
            'Implemented comprehensive testing strategy, increasing code coverage to 85%',
            'Mentored junior developers and conducted code reviews'
        ],
        technologies: [
            'Angular',
            'TypeScript',
            'RxJS',
            'Node.js',
            'PostgreSQL',
            'Docker',
            'AWS'
        ],
        logoUrl: '/assets/companies/company-1.png'
    },
    {
        id: 'exp-2',
        company: 'StartUp Solutions',
        position: 'Full Stack Developer',
        location: 'New York, NY',
        startDate: new Date('2020-06-01'),
        endDate: new Date('2021-12-31'),
        current: false,
        description: 'Developed and maintained full-stack web applications for various clients.',
        achievements: [
            'Built 10+ client projects from conception to deployment',
            'Implemented responsive designs with mobile-first approach',
            'Integrated third-party APIs and payment systems',
            'Reduced application load time by 50% through lazy loading and code splitting'
        ],
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'AWS'],
        logoUrl: '/assets/companies/company-2.png'
    }
    // Add more experiences here
];
