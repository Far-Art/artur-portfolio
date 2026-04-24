import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {SOCIAL_LINKS} from '../../data/social.data';
import {ContactService} from '../../services/contact.service';


@Component({
    selector: 'app-contact',
    imports: [ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent {
    private readonly fb = inject(FormBuilder);
    private readonly contactService = inject(ContactService);

    readonly socialLinks = SOCIAL_LINKS;
    readonly isSubmitting = this.contactService.isSubmitting;
    readonly submitMessage = signal('');
    readonly submitSuccess = signal(false);

    readonly contactForm = this.fb.nonNullable.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        subject: [''],
        message: ['', Validators.required]
    });

    isFieldInvalid(fieldName: string): boolean {
        const field = this.contactForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    async onSubmit(): Promise<void> {
        if (this.contactForm.invalid) {
            this.contactForm.markAllAsTouched();
            return;
        }

        const result = await this.contactService.submitContactForm(this.contactForm.getRawValue());

        this.submitMessage.set(result.message);
        this.submitSuccess.set(result.success);

        if (result.success) {
            this.contactForm.reset();
        }

        setTimeout(() => {
            this.submitMessage.set('');
        }, 5000);
    }
}
