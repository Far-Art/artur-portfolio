import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {PanelComponent} from '../../shared/panel/panel.component';
import {SOCIAL_LINKS} from '../../../data/social.data';
import {I18nService, TranslationKey} from '../../../services/i18n.service';


@Component({
    selector: 'fa-footer',
    imports: [PanelComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    private readonly i18n = inject(I18nService);

    readonly socialLinks = SOCIAL_LINKS;
    readonly currentYear = new Date().getFullYear();
    readonly angularVersion = '21';

    t(key: TranslationKey, params: Record<string, string | number> = {}): string {
        return this.i18n.translate(key, params);
    }
}
