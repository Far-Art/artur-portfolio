import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { SOCIAL_LINKS } from '../../data/social.data';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="contact">
      <div class="container">
        <h1 class="page-title">Get In Touch</h1>
        <p class="page-description">
          Have a project in mind or want to collaborate? I'd love to hear from you!
        </p>

        <div class="contact-content">
          <!-- Contact Form -->
          <div class="form-section">
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
              <div class="form-group">
                <label for="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  formControlName="name"
                  placeholder="Your name"
                  [class.error]="isFieldInvalid('name')"
                />
                @if (isFieldInvalid('name')) {
                  <span class="error-message">Name is required</span>
                }
              </div>

              <div class="form-group">
                <label for="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  formControlName="email"
                  placeholder="your.email@example.com"
                  [class.error]="isFieldInvalid('email')"
                />
                @if (isFieldInvalid('email')) {
                  <span class="error-message">
                    @if (contactForm.get('email')?.hasError('required')) {
                      Email is required
                    } @else if (contactForm.get('email')?.hasError('email')) {
                      Please enter a valid email
                    }
                  </span>
                }
              </div>

              <div class="form-group">
                <label for="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  formControlName="subject"
                  placeholder="Project discussion, collaboration, etc."
                />
              </div>

              <div class="form-group">
                <label for="message">Message *</label>
                <textarea
                  id="message"
                  formControlName="message"
                  rows="6"
                  placeholder="Tell me about your project or inquiry..."
                  [class.error]="isFieldInvalid('message')"
                ></textarea>
                @if (isFieldInvalid('message')) {
                  <span class="error-message">Message is required</span>
                }
              </div>

              @if (submitMessage()) {
                <div
                  class="submit-message"
                  [class.success]="submitSuccess()"
                  [class.error]="!submitSuccess()"
                >
                  {{ submitMessage() }}
                </div>
              }

              <button
                type="submit"
                class="submit-btn"
                [disabled]="contactForm.invalid || isSubmitting()"
              >
                @if (isSubmitting()) {
                  Sending...
                } @else {
                  Send Message
                }
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="info-section">
            <div class="info-card">
              <h2 class="info-title">Let's Connect</h2>
              <p class="info-description">
                I'm always open to discussing new projects, creative ideas, or opportunities to be
                part of your visions.
              </p>

              <div class="contact-methods">
                <div class="contact-method">
                  <div class="method-icon">📧</div>
                  <div class="method-content">
                    <h3 class="method-title">Email</h3>
                    <a href="mailto:your.email@example.com" class="method-link">
                      your.email@example.com
                    </a>
                  </div>
                </div>

                <div class="contact-method">
                  <div class="method-icon">📍</div>
                  <div class="method-content">
                    <h3 class="method-title">Location</h3>
                    <p class="method-text">Your City, Country</p>
                  </div>
                </div>

                <div class="contact-method">
                  <div class="method-icon">💼</div>
                  <div class="method-content">
                    <h3 class="method-title">Availability</h3>
                    <p class="method-text">Open for opportunities</p>
                  </div>
                </div>
              </div>

              <div class="social-section">
                <h3 class="social-title">Find me on</h3>
                <div class="social-links">
                  @for (link of socialLinks; track link.platform) {
                    <a
                      [href]="link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="social-link"
                      [attr.aria-label]="link.platform"
                    >
                      {{ link.platform }}
                    </a>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .contact {
      min-height: 100vh;
      padding: 4rem 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .page-title {
      font-size: 3rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }

    .page-description {
      text-align: center;
      font-size: 1.25rem;
      color: var(--text-secondary);
      margin-bottom: 4rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 3rem;
      align-items: start;
    }

    .contact-form {
      background: var(--bg-secondary);
      padding: 2.5rem;
      border-radius: 12px;
      border: 1px solid var(--border-color);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    input,
    textarea {
      width: 100%;
      padding: 0.875rem;
      border: 2px solid var(--border-color);
      border-radius: 8px;
      background: var(--bg-primary);
      color: var(--text-primary);
      font-family: inherit;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px var(--primary-color-light);
    }

    input.error,
    textarea.error {
      border-color: var(--error-color);
    }

    textarea {
      resize: vertical;
      min-height: 150px;
    }

    .error-message {
      display: block;
      color: var(--error-color);
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .submit-message {
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      font-weight: 500;
    }

    .submit-message.success {
      background: var(--success-color-light);
      color: var(--success-color);
      border: 1px solid var(--success-color);
    }

    .submit-message.error {
      background: var(--error-color-light);
      color: var(--error-color);
      border: 1px solid var(--error-color);
    }

    .submit-btn {
      width: 100%;
      padding: 1rem 2rem;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .submit-btn:hover:not(:disabled) {
      background: var(--primary-color-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .info-section {
      position: sticky;
      top: 100px;
    }

    .info-card {
      background: var(--bg-secondary);
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid var(--border-color);
    }

    .info-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .info-description {
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 2rem;
    }

    .contact-methods {
      margin-bottom: 2rem;
    }

    .contact-method {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: var(--bg-primary);
      border-radius: 8px;
    }

    .method-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .method-content {
      flex: 1;
    }

    .method-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .method-link {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
    }

    .method-link:hover {
      text-decoration: underline;
    }

    .method-text {
      color: var(--text-secondary);
      margin: 0;
    }

    .social-section {
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);
    }

    .social-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .social-links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .social-link {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      padding: 0.5rem;
      border-radius: 6px;
    }

    .social-link:hover {
      background: var(--primary-color-light);
      padding-left: 1rem;
    }

    @media (max-width: 968px) {
      .contact-content {
        grid-template-columns: 1fr;
      }

      .info-section {
        position: static;
      }
    }

    @media (max-width: 768px) {
      .page-title {
        font-size: 2.5rem;
      }

      .contact-form {
        padding: 1.5rem;
      }
    }
  `,
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  socialLinks = SOCIAL_LINKS;
  isSubmitting = this.contactService.isSubmitting;
  submitMessage = signal('');
  submitSuccess = signal(false);

  contactForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', Validators.required],
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

    // Clear message after 5 seconds
    setTimeout(() => {
      this.submitMessage.set('');
    }, 5000);
  }
}
