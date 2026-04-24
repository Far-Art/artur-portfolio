import {DatePipe} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EXPERIENCES} from '../../data/experience.data';


@Component({
    selector: 'fa-experience',
    imports: [DatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
    readonly experiences = EXPERIENCES;
}
