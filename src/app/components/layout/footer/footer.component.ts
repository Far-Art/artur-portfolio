import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PanelComponent} from '../../shared/panel/panel.component';
import {SOCIAL_LINKS} from '../../../data/social.data';


@Component({
    selector: 'fa-footer',
    imports: [PanelComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    readonly socialLinks = SOCIAL_LINKS;
    readonly currentYear = new Date().getFullYear();
    readonly angularVersion = '21';
}
