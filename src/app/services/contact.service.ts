import {Injectable, signal} from '@angular/core';
import {ContactForm} from '../models/contact.model';


export interface ContactSubmissionResult {
    success: boolean;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    isSubmitting = signal(false);

    async submitContactForm(formData: ContactForm): Promise<ContactSubmissionResult> {
        this.isSubmitting.set(true);

        try {
            // TODO: Replace with actual API call
            // For now, simulate API call with a delay
            await this.simulateApiCall(formData);

            return {
                success: true,
                message: 'Thank you for your message! I will get back to you soon.'
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to send message. Please try again or contact me directly via email.'
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
