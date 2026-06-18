import {Injectable, inject, signal} from '@angular/core';
import {ContactForm} from '../models/contact.model';
import {I18nService} from './i18n.service';


export interface ContactSubmissionResult {
    success: boolean;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private readonly formToken = '94e503c6a6a582cd36fedca56ff75a33';
    private readonly endpoint = `https://formsubmit.co/ajax/${this.formToken}`;
    private readonly i18n = inject(I18nService);

    isSubmitting = signal(false);

    async submitContactForm(formData: ContactForm): Promise<ContactSubmissionResult> {
        this.isSubmitting.set(true);

        try {
            await this.sendEmail(formData);

            return {
                success: true,
                message: this.i18n.translate('contactSuccess')
            };
        } catch (error) {
            return {
                success: false,
                message: this.i18n.translate('contactError')
            };
        } finally {
            this.isSubmitting.set(false);
        }
    }

    private async sendEmail(formData: ContactForm): Promise<void> {
        const subject = formData.subject?.trim() || `Portfolio contact from ${formData.name}`;

        const payload: Record<string, string> = {
            name: formData.name,
            email: formData.email,
            subject,
            message: formData.message,
            _subject: subject,
            _template: 'table',
            _captcha: 'false'
        };

        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Contact form request failed with status ${response.status}`);
        }
    }
}
