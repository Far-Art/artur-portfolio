export interface ContactForm {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

export type SocialIcon = 'github' | 'linkedin' | 'email';

export interface SocialLink {
    platform: string;
    url: string;
    icon: SocialIcon;
}
