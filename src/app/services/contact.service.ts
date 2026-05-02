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
    private readonly i18n = inject(I18nService);

    isSubmitting = signal(false);

    async submitContactForm(formData: ContactForm): Promise<ContactSubmissionResult> {
        this.isSubmitting.set(true);

        try {
            // TODO: Replace with actual API call
            // For now, simulate API call with a delay
            await this.simulateApiCall(formData);

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

    private simulateApiCall(data: ContactForm): Promise<void> {
        return new Promise((resolve) => {
            console.log('Contact form submission:', data);
            setTimeout(resolve, 1500);
        });
    }
}
