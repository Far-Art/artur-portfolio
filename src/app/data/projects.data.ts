import {Project} from '../models/project.model';


export const PROJECTS: Project[] = [
    {
        id: 'example-project-1',
        title: 'Example Web Application',
        shortDescription: 'A modern web application built with Angular and TypeScript',
        fullDescription: `This is a comprehensive web application that demonstrates modern web development practices.
    It includes features like real-time data synchronization, responsive design, and advanced state management.`,
        technologies: ['Angular', 'TypeScript', 'RxJS', 'SCSS'],
        category: 'web',
        thumbnailUrl: '/assets/projects/example-1-thumb.jpg',
        images: [
            '/assets/projects/example-1-1.jpg',
            '/assets/projects/example-1-2.jpg',
            '/assets/projects/example-1-3.jpg'
        ],
        githubUrl: 'https://github.com/yourusername/example-project',
        liveUrl: 'https://example-project.com',
        featured: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-06-01'),
        highlights: [
            'Implemented real-time data synchronization',
            'Achieved 95+ Lighthouse performance score',
            'Built comprehensive test suite with 90% coverage'
        ]
    },
    {
        id: 'example-project-2',
        title: 'Developer Tool',
        shortDescription: 'A CLI tool to improve developer productivity',
        fullDescription: `A command-line interface tool designed to automate repetitive tasks and improve developer workflow.
    Built with Node.js and distributed via npm.`,
        technologies: ['Node.js', 'TypeScript', 'Commander.js'],
        category: 'tool',
        thumbnailUrl: '/assets/projects/example-2-thumb.jpg',
        images: ['/assets/projects/example-2-1.jpg'],
        githubUrl: 'https://github.com/yourusername/dev-tool',
        featured: false,
        startDate: new Date('2024-03-01'),
        highlights: [
            'Published to npm with 1000+ downloads',
            'Automated common development tasks',
            'Comprehensive documentation and examples'
        ]
    }
    // Add more projects here
];
