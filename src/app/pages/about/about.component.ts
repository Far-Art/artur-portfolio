import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SKILLS} from '../../data/skills.data';
import {Skill, SKILL_CATEGORIES} from '../../models/skill.model';


@Component({
    selector: 'fa-about',
    imports: [RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {
    yearsOfExperience = 4;
    skills = SKILLS;

    categories = Object.entries(SKILL_CATEGORIES).map(([key, label]) => ({
        key: key as keyof typeof SKILL_CATEGORIES,
        label
    }));

    education = [
        {
            title: 'Bachelor of Science in Computer Science',
            institution: 'University Name',
            date: '2015 - 2019'
        },
        {
            title: 'AWS Certified Solutions Architect',
            institution: 'Amazon Web Services',
            date: '2022'
        },
        {
            title: 'Angular Certification',
            institution: 'Angular',
            date: '2021'
        }
    ];


    getSkillsByCategory(category: string): Skill[] {
        return this.skills.filter((skill) => skill.category === category);
    }
}
