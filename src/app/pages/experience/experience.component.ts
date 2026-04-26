import {DatePipe} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PanelComponent} from '../../components/shared/panel/panel.component';
import {EXPERIENCES} from '../../data/experience.data';


@Component({
    selector: 'fa-experience',
    imports: [DatePipe, PanelComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
    readonly experiences = EXPERIENCES;
}
