import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SKILLS} from '../../data/skills.data';
import {Skill, SkillCategory} from '../../models/skill.model';
import {I18nService, TranslationKey} from '../../services/i18n.service';


@Component({
    selector: 'fa-about',
    imports: [RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {
    private readonly i18n = inject(I18nService);

    readonly yearsOfExperience = 4;
    readonly skills = SKILLS;
    readonly categories = computed(() => [
        {key: 'frontend' as const, label: this.t('categoryFrontend')},
        {key: 'backend' as const, label: this.t('categoryBackend')},
        {key: 'database' as const, label: this.t('categoryDatabase')},
        {key: 'tools' as const, label: this.t('categoryTools')},
        {key: 'other' as const, label: this.t('categoryOther')}
    ]);
    readonly education = [
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

    t(key: TranslationKey, params: Record<string, string | number> = {}): string {
        return this.i18n.translate(key, params);
    }

    getSkillsByCategory(category: SkillCategory): Skill[] {
        return this.skills.filter((skill) => skill.category === category);
    }

}
