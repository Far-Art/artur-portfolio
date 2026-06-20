import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, PLATFORM_ID} from '@angular/core';
import {PanelComponent} from '../../shared/panel/panel.component';
import {SOCIAL_LINKS} from '../../../data/social.data';
import {I18nService, TranslationKey} from '../../../services/i18n.service';
import {SocialIcon, SocialLink} from '../../../models/contact.model';


const SOCIAL_ICON_PATHS: Record<SocialIcon, readonly string[]> = {
    github: [
        'M12 2.25c-5.39 0-9.75 4.36-9.75 9.75 0 4.31 2.79 7.96 6.67 9.25.49.09.67-.21.67-.47v-1.66c-2.71.59-3.28-1.16-3.28-1.16-.44-1.13-1.08-1.43-1.08-1.43-.88-.6.07-.59.07-.59.98.07 1.49 1 1.49 1 .87 1.49 2.28 1.06 2.84.81.09-.63.34-1.06.62-1.3-2.17-.25-4.45-1.08-4.45-4.82 0-1.07.38-1.94 1-2.62-.1-.25-.43-1.24.1-2.59 0 0 .82-.26 2.68 1a9.32 9.32 0 0 1 4.88 0c1.86-1.26 2.68-1 2.68-1 .53 1.35.2 2.34.1 2.59.63.68 1 1.55 1 2.62 0 3.75-2.28 4.57-4.45 4.81.35.3.66.9.66 1.82v2.7c0 .26.18.57.67.47A9.76 9.76 0 0 0 21.75 12c0-5.39-4.36-9.75-9.75-9.75Z'
    ],
    linkedin: [
        'M6.94 8.98H3.71v10.37h3.23V8.98ZM5.32 7.57a1.87 1.87 0 1 0 0-3.74 1.87 1.87 0 0 0 0 3.74ZM20.29 13.66c0-3.13-1.67-4.58-3.9-4.58-1.8 0-2.61.99-3.06 1.69V8.98h-3.1c.04.97 0 10.37 0 10.37h3.23v-5.79c0-.31.02-.62.11-.84.23-.62.76-1.26 1.66-1.26 1.17 0 1.64.95 1.64 2.34v5.55h3.23v-5.69h.19Z'
    ],
    email: [
        'M4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75A1.75 1.75 0 0 1 4.75 5Zm.16 2 6.17 4.34c.55.39 1.29.39 1.84 0L19.09 7H4.91Zm14.34 2.19-5.47 3.85a3.1 3.1 0 0 1-3.56 0L4.75 9.19v8.06h14.5V9.19Z'
    ]
};

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
    readonly angularVersion = '22';
    private readonly document = inject(DOCUMENT);
    private readonly i18n = inject(I18nService);
    private readonly platformId = inject(PLATFORM_ID);

    socialIconPaths(icon: SocialIcon): readonly string[] {
        return SOCIAL_ICON_PATHS[icon];
    }

    opensInNewTab(url: string): boolean {
        return !url.startsWith('mailto:');
    }

    onSocialLinkClick(link: SocialLink): void {
        if (!link.url.startsWith('mailto:') || !isPlatformBrowser(this.platformId)) {
            return;
        }

        let mailHandlerLikelyOpened = false;
        const markHandled = (): void => {
            mailHandlerLikelyOpened = true;
        };

        window.addEventListener('blur', markHandled, {once: true});
        this.document.addEventListener('visibilitychange', markHandled, {once: true});

        window.setTimeout(() => {
            window.removeEventListener('blur', markHandled);
            this.document.removeEventListener('visibilitychange', markHandled);

            if (!mailHandlerLikelyOpened && this.document.visibilityState === 'visible') {
                console.warn(
                    'No mailto handler was detected. Configure a default email app or browser mail handler to open this link.',
                    link.url
                );
            }
        }, 1000);
    }

    t(key: TranslationKey, params: Record<string, string | number> = {}): string {
        return this.i18n.translate(key, params);
    }
}
