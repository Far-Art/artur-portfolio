export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
