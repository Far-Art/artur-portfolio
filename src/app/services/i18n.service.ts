import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {Injectable, PLATFORM_ID, computed, effect, inject, signal} from '@angular/core';
import {ProjectCategory} from '../models/project.model';

const translations = {
    en: {
        skipToContent: 'Skip to content',
        brandHomeLabel: 'Artur portfolio home',
        navAria: 'Primary',
        home: 'Home',
        about: 'About',
        contact: 'Contact',
        projects: 'Projects',
        languageToggle: 'עברית',
        languageToggleLabel: 'Switch language to Hebrew',
        languageSelectLabel: 'Language',
        languageEnglish: 'English',
        languageHebrew: 'Hebrew',
        themeDark: 'Dark mode',
        themeLight: 'Light mode',
        switchToDarkTheme: 'Switch to dark theme',
        switchToLightTheme: 'Switch to light theme',
        brandIntro: 'Brand intro',
        role: 'Software Developer',
        brandSubtitle:
            'Java, Spring Boot, Angular, and React applications shaped around performance and visuals.',
        scrollToContent: 'Scroll to portfolio content',
        scrollToEnter: 'Scroll to enter the portfolio',
        heroEyebrow: 'Full-stack portfolio engineered for impact',
        heroTitle:
            'Building immersive web products that look sharp, scale cleanly, and convert attention into trust.',
        heroDescription:
            'I build Java, Spring, Spring Boot, Angular, and React applications for individuals and teams that care about fast, polished products. The work stays accessible, scalable, and performance-conscious from the first concept to the final release.',
        clientsNotice: 'What clients notice',
        productNotBrochure: 'The portfolio behaves like a product, not a brochure.',
        clientsNoticeDescription:
            'The visual language is immersive, but the real differentiator is clarity: outcomes, architecture, and trust signals are always visible.',
        workShaped: 'How the work is shaped',
        disciplineTitle: 'An immersive layout still needs engineering discipline under it.',
        disciplineDescription:
            'Visual atmosphere matters, but the strongest portfolios also explain judgment: accessibility, performance, hierarchy, and product thinking.',
        designPrinciples: 'Design principles',
        deliveryProcess: 'Delivery process',
        ctaTitle:
            "Let's build something that feels premium before a visitor reads a single line.",
        ctaDescription:
            'This direction combines a warm editorial palette, dashboard-like structure, and layered motion so the site feels immersive without becoming noisy.',
        bookConversation: 'Book a conversation',
        capabilityImmersionTag: 'Immersion',
        capabilityImmersionTitle: 'Layered atmosphere without visual noise',
        capabilityImmersionDescription:
            'Warm gradients, glassy surfaces, and structured spacing make the portfolio feel cinematic without sacrificing readability.',
        capabilityCredibilityTag: 'Credibility',
        capabilityCredibilityTitle: 'Case studies written for decision-makers',
        capabilityCredibilityDescription:
            'Projects are framed by role, outcome, and technical choices so visitors understand value quickly.',
        capabilityExecutionTag: 'Execution',
        capabilityExecutionTitle: 'Engineered like a production frontend',
        capabilityExecutionDescription:
            'Angular architecture, responsive layouts, and accessible states keep the portfolio impressive and dependable.',
        principleHierarchyTitle: 'Clear hierarchy',
        principleHierarchyDescription:
            'Every section pushes one primary idea so visitors never wonder where to look next.',
        principlePaletteTitle: 'Warm technical palette',
        principlePaletteDescription:
            'Sand, charcoal, teal, and copper create a premium tone that avoids the overused dark-purple portfolio look.',
        principleMotionTitle: 'Measured motion',
        principleMotionDescription:
            'Depth comes from layered backgrounds, subtle drift, and restrained hover states instead of constant animation.',
        processNarrativeTitle: 'Shape the narrative',
        processNarrativeDescription:
            'Lead with the strongest promise, then back it up with proof, work samples, and a confident call to action.',
        processSystemTitle: 'Build the experience system',
        processSystemDescription:
            'Typography, palette, surfaces, spacing, and interaction states are treated as one coherent product language.',
        processTrustTitle: 'Refine for trust',
        processTrustDescription:
            'Accessibility, responsiveness, and load behavior are refined so the portfolio feels finished on every screen.',
        aboutTitle: 'About Me',
        aboutLead: "I'm an experienced software developer with {years}+ years of building modern web applications.",
        aboutDescription:
            'I work across Java, Spring, Spring Boot, Angular, and React to build scalable, maintainable applications. Performance and visuals are at the core of every product I ship, with clean architecture and strong user experience supporting both.',
        getInTouch: 'Get In Touch',
        skillsTitle: 'Skills & Technologies',
        categoryFrontend: 'Frontend',
        categoryBackend: 'Backend',
        categoryDatabase: 'Database',
        categoryTools: 'Tools & DevOps',
        categoryOther: 'Other',
        contactTitle: 'Get In Touch',
        contactDescription: "Have a project in mind or want to collaborate? I'd love to hear from you!",
        name: 'Name *',
        namePlaceholder: 'Your name',
        nameRequired: 'Name is required',
        email: 'Email *',
        emailPlaceholder: 'your.email@example.com',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email',
        subject: 'Subject',
        subjectPlaceholder: 'Project discussion, collaboration, etc.',
        message: 'Message *',
        messagePlaceholder: 'Tell me about your project or inquiry...',
        messageRequired: 'Message is required',
        sending: 'Sending...',
        sendMessage: 'Send Message',
        contactSuccess: 'Thank you for your message! I will get back to you soon.',
        contactError: 'Failed to send message. Please try again or contact me directly via email.',
        footerKicker: 'Ready for the next build?',
        footerTitle: 'Design-forward engineering with product discipline.',
        footerDescription:
            'Available for portfolio sites, product frontends, and Angular interfaces that need to feel polished from the first scroll.',
        copyright: 'Copyright {year} Artur. Built for modern web clients.',
        builtWith: 'Angular {version} - TypeScript - Accessible UI',
        selectedBuilds: 'Selected builds',
        projectsTitle: 'Projects framed as product stories.',
        projectsDescription:
            'A strong portfolio does more than list technologies. It explains the type of product, the outcome it aimed for, and the engineering choices behind it.',
        allProjects: 'All Projects',
        featured: 'Featured',
        buildSignal: 'Build signal',
        technologiesInStack: '{count} technologies in stack',
        readCaseStudy: 'Read case study',
        liveDemo: 'Live demo',
        noProjects: 'No projects found in this category.',
        backToProjects: 'Back to projects',
        featuredCaseStudy: 'Featured case study',
        timeline: 'Timeline',
        to: 'to',
        present: 'present',
        stackShape: 'Stack shape',
        coreTechnologies: '{count} core technologies',
        viewGitHub: 'View GitHub',
        keyHighlights: 'Key highlights',
        technologiesUsed: 'Technologies used',
        relatedProjects: 'Related projects',
        viewProject: 'View project',
        projectNotFound: 'Project not found',
        projectNotFoundDescription: "The project you're looking for doesn't exist.",
        projectCategoryWeb: 'Web Application',
        projectCategoryMobile: 'Mobile Application',
        projectCategoryDesktop: 'Desktop Application',
        projectCategoryLibrary: 'Library/Package',
        projectCategoryTool: 'Developer Tool',
        projectCategoryOther: 'Other',
        projectExampleOneTitle: 'Example Web Application',
        projectExampleOneShort: 'A modern web application built with Angular and TypeScript',
        projectExampleOneFull:
            'This is a comprehensive web application that demonstrates modern web development practices. It includes features like real-time data synchronization, responsive design, and advanced state management.',
        projectExampleOneHighlightOne: 'Implemented real-time data synchronization',
        projectExampleOneHighlightTwo: 'Achieved 95+ Lighthouse performance score',
        projectExampleOneHighlightThree: 'Built comprehensive test suite with 90% coverage',
        projectExampleTwoTitle: 'Developer Tool',
        projectExampleTwoShort: 'A CLI tool to improve developer productivity',
        projectExampleTwoFull:
            'A command-line interface tool designed to automate repetitive tasks and improve developer workflow. Built with Node.js and distributed via npm.',
        projectExampleTwoHighlightOne: 'Published to npm with 1000+ downloads',
        projectExampleTwoHighlightTwo: 'Automated common development tasks',
        projectExampleTwoHighlightThree: 'Comprehensive documentation and examples'
    },
    he: {
        skipToContent: 'דלג לתוכן',
        brandHomeLabel: 'דף הבית של תיק העבודות של ארתור',
        navAria: 'ראשי',
        home: 'ראשי',
        about: 'אודות',
        contact: 'צור קשר',
        projects: 'פרויקטים',
        languageToggle: 'EN',
        languageToggleLabel: 'החלף שפה לאנגלית',
        languageSelectLabel: 'שפה',
        languageEnglish: 'אנגלית',
        languageHebrew: 'עברית',
        themeDark: 'מצב כהה',
        themeLight: 'מצב בהיר',
        switchToDarkTheme: 'החלף לערכת נושא כהה',
        switchToLightTheme: 'החלף לערכת נושא בהירה',
        brandIntro: 'פתיח מותג',
        role: 'מפתח תוכנה',
        brandSubtitle:
            'אפליקציות Java, Spring Boot, Angular ו-React שנבנות סביב ביצועים ונראות.',
        scrollToContent: 'גלול לתוכן תיק העבודות',
        scrollToEnter: 'גלול כדי להיכנס לתיק העבודות',
        heroEyebrow: 'תיק עבודות Full-stack שנבנה להשפעה',
        heroTitle:
            'בונה מוצרי ווב חווייתיים שנראים חדים, גדלים נקי, והופכים תשומת לב לאמון.',
        heroDescription:
            'אני בונה אפליקציות Java, Spring, Spring Boot, Angular ו-React לאנשים וצוותים שחשובים להם מוצרים מהירים ומלוטשים. העבודה נשארת נגישה, סקיילבילית ומודעת ביצועים מהקונספט הראשון ועד השחרור הסופי.',
        clientsNotice: 'מה לקוחות שמים לב אליו',
        productNotBrochure: 'תיק העבודות מתנהג כמו מוצר, לא כמו ברושור.',
        clientsNoticeDescription:
            'השפה הוויזואלית חווייתית, אבל היתרון האמיתי הוא בהירות: תוצאות, ארכיטקטורה וסימני אמון תמיד גלויים.',
        workShaped: 'איך העבודה מתעצבת',
        disciplineTitle: 'גם פריסה חווייתית צריכה מתחתיה משמעת הנדסית.',
        disciplineDescription:
            'אווירה ויזואלית חשובה, אבל תיקי העבודות החזקים גם מסבירים שיקול דעת: נגישות, ביצועים, היררכיה וחשיבה מוצרית.',
        designPrinciples: 'עקרונות עיצוב',
        deliveryProcess: 'תהליך מסירה',
        ctaTitle: 'בואו נבנה משהו שמרגיש פרימיום עוד לפני שמבקר קורא שורה אחת.',
        ctaDescription:
            'הכיוון הזה משלב פלטה עריכתית חמה, מבנה דמוי דשבורד ותנועה שכבתית כדי שהאתר ירגיש חווייתי בלי להפוך לרועש.',
        bookConversation: 'קבעו שיחה',
        capabilityImmersionTag: 'חוויה',
        capabilityImmersionTitle: 'אווירה שכבתית בלי רעש ויזואלי',
        capabilityImmersionDescription:
            'גרדיאנטים חמים, משטחים זכוכיתיים וריווח מובנה גורמים לתיק העבודות להרגיש קולנועי בלי לפגוע בקריאות.',
        capabilityCredibilityTag: 'אמינות',
        capabilityCredibilityTitle: 'קייס סטאדיז שנכתבו למקבלי החלטות',
        capabilityCredibilityDescription:
            'פרויקטים מוצגים דרך תפקיד, תוצאה ובחירות טכניות כדי שמבקרים יבינו ערך במהירות.',
        capabilityExecutionTag: 'ביצוע',
        capabilityExecutionTitle: 'מהונדס כמו פרונטאנד פרודקשן',
        capabilityExecutionDescription:
            'ארכיטקטורת Angular, פריסות רספונסיביות ומצבים נגישים שומרים על תיק העבודות מרשים ואמין.',
        principleHierarchyTitle: 'היררכיה ברורה',
        principleHierarchyDescription:
            'כל מקטע מקדם רעיון מרכזי אחד, כך שמבקרים תמיד יודעים לאן להסתכל.',
        principlePaletteTitle: 'פלטה טכנית חמה',
        principlePaletteDescription:
            'חול, פחם, טיל ונחושת יוצרים טון פרימיום שנמנע ממראה הפורטפוליו הכהה-סגול השחוק.',
        principleMotionTitle: 'תנועה מדודה',
        principleMotionDescription:
            'העומק מגיע מרקעים שכבתיים, תזוזה עדינה ומצבי ריחוף מרוסנים במקום אנימציה מתמדת.',
        processNarrativeTitle: 'לעצב את הנרטיב',
        processNarrativeDescription:
            'מתחילים בהבטחה החזקה ביותר ואז מגבים אותה בהוכחות, דוגמאות עבודה וקריאה לפעולה בטוחה.',
        processSystemTitle: 'לבנות את מערכת החוויה',
        processSystemDescription:
            'טיפוגרפיה, פלטה, משטחים, ריווח ומצבי אינטראקציה מטופלים כשפת מוצר אחת קוהרנטית.',
        processTrustTitle: 'ללטש לאמון',
        processTrustDescription:
            'נגישות, רספונסיביות והתנהגות טעינה מלוטשות כדי שתיק העבודות ירגיש גמור בכל מסך.',
        aboutTitle: 'אודותיי',
        aboutLead: 'אני מפתח תוכנה מנוסה עם יותר מ-{years} שנות ניסיון בבניית אפליקציות ווב מודרניות.',
        aboutDescription:
            'אני עובד עם Java, Spring, Spring Boot, Angular ו-React כדי לבנות אפליקציות סקיילביליות ותחזוקתיות. ביצועים ונראות נמצאים בלב כל מוצר שאני משחרר, עם ארכיטקטורה נקייה וחוויית משתמש חזקה שתומכות בשניהם.',
        getInTouch: 'צרו קשר',
        skillsTitle: 'כישורים וטכנולוגיות',
        categoryFrontend: 'פרונטאנד',
        categoryBackend: 'בקאנד',
        categoryDatabase: 'מסדי נתונים',
        categoryTools: 'כלים ו-DevOps',
        categoryOther: 'אחר',
        contactTitle: 'צרו קשר',
        contactDescription: 'יש לכם פרויקט בראש או רצון לשתף פעולה? אשמח לשמוע מכם!',
        name: 'שם *',
        namePlaceholder: 'השם שלך',
        nameRequired: 'נדרש שם',
        email: 'אימייל *',
        emailPlaceholder: 'your.email@example.com',
        emailRequired: 'נדרש אימייל',
        emailInvalid: 'נא להזין אימייל תקין',
        subject: 'נושא',
        subjectPlaceholder: 'דיון על פרויקט, שיתוף פעולה וכדומה',
        message: 'הודעה *',
        messagePlaceholder: 'ספרו לי על הפרויקט או הפנייה שלכם...',
        messageRequired: 'נדרשת הודעה',
        sending: 'שולח...',
        sendMessage: 'שלח הודעה',
        contactSuccess: 'תודה על ההודעה! אחזור אליכם בקרוב.',
        contactError: 'שליחת ההודעה נכשלה. נסו שוב או צרו איתי קשר ישירות באימייל.',
        footerKicker: 'מוכנים לבנייה הבאה?',
        footerTitle: 'הנדסה עם עין עיצובית ומשמעת מוצרית.',
        footerDescription:
            'זמין לאתרי תיק עבודות, פרונטאנדים מוצריים וממשקי Angular שצריכים להרגיש מלוטשים מהגלילה הראשונה.',
        copyright: 'זכויות יוצרים {year} ארתור. נבנה ללקוחות ווב מודרניים.',
        builtWith: 'Angular {version} - TypeScript - ממשק נגיש',
        selectedBuilds: 'בניות נבחרות',
        projectsTitle: 'פרויקטים שמוצגים כסיפורי מוצר.',
        projectsDescription:
            'תיק עבודות חזק עושה יותר מלמנות טכנולוגיות. הוא מסביר את סוג המוצר, התוצאה שאליה כיוון, והבחירות ההנדסיות שמאחוריו.',
        allProjects: 'כל הפרויקטים',
        featured: 'מומלץ',
        buildSignal: 'סימן בנייה',
        technologiesInStack: '{count} טכנולוגיות בסטאק',
        readCaseStudy: 'קראו קייס סטאדי',
        liveDemo: 'דמו חי',
        noProjects: 'לא נמצאו פרויקטים בקטגוריה הזו.',
        backToProjects: 'חזרה לפרויקטים',
        featuredCaseStudy: 'קייס סטאדי מומלץ',
        timeline: 'ציר זמן',
        to: 'עד',
        present: 'היום',
        stackShape: 'מבנה הסטאק',
        coreTechnologies: '{count} טכנולוגיות ליבה',
        viewGitHub: 'צפייה ב-GitHub',
        keyHighlights: 'נקודות מרכזיות',
        technologiesUsed: 'טכנולוגיות בשימוש',
        relatedProjects: 'פרויקטים קשורים',
        viewProject: 'צפייה בפרויקט',
        projectNotFound: 'הפרויקט לא נמצא',
        projectNotFoundDescription: 'הפרויקט שחיפשתם לא קיים.',
        projectCategoryWeb: 'אפליקציית ווב',
        projectCategoryMobile: 'אפליקציית מובייל',
        projectCategoryDesktop: 'אפליקציית דסקטופ',
        projectCategoryLibrary: 'ספרייה/חבילה',
        projectCategoryTool: 'כלי למפתחים',
        projectCategoryOther: 'אחר',
        projectExampleOneTitle: 'אפליקציית ווב לדוגמה',
        projectExampleOneShort: 'אפליקציית ווב מודרנית שנבנתה עם Angular ו-TypeScript',
        projectExampleOneFull:
            'זו אפליקציית ווב מקיפה שמדגימה פרקטיקות פיתוח מודרניות. היא כוללת יכולות כמו סנכרון נתונים בזמן אמת, עיצוב רספונסיבי וניהול מצב מתקדם.',
        projectExampleOneHighlightOne: 'יושם סנכרון נתונים בזמן אמת',
        projectExampleOneHighlightTwo: 'הושג ציון ביצועים 95+ ב-Lighthouse',
        projectExampleOneHighlightThree: 'נבנתה חבילת בדיקות מקיפה עם 90% כיסוי',
        projectExampleTwoTitle: 'כלי למפתחים',
        projectExampleTwoShort: 'כלי CLI לשיפור פרודוקטיביות של מפתחים',
        projectExampleTwoFull:
            'כלי שורת פקודה שנועד לאוטומציה של משימות חוזרות ולשיפור זרימת העבודה של מפתחים. נבנה עם Node.js ומופץ דרך npm.',
        projectExampleTwoHighlightOne: 'פורסם ל-npm עם יותר מ-1000 הורדות',
        projectExampleTwoHighlightTwo: 'אוטומציה למשימות פיתוח נפוצות',
        projectExampleTwoHighlightThree: 'תיעוד ודוגמאות מקיפים'
    }
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof (typeof translations)['en'];

type LanguageTransitionOrigin = {
    x: number;
    y: number;
};

type ViewTransition = {
    finished: Promise<void>;
    ready: Promise<void>;
};

type DocumentWithViewTransition = Document & {
    startViewTransition?: (callback: () => Promise<void> | void) => ViewTransition;
};

const projectCategoryTranslationKeys: Record<ProjectCategory, TranslationKey> = {
    web: 'projectCategoryWeb',
    mobile: 'projectCategoryMobile',
    desktop: 'projectCategoryDesktop',
    library: 'projectCategoryLibrary',
    tool: 'projectCategoryTool',
    other: 'projectCategoryOther'
};

const projectTranslationKeys: Record<
    string,
    {
        title: TranslationKey;
        shortDescription: TranslationKey;
        fullDescription: TranslationKey;
        highlights: TranslationKey[];
    }
> = {
    'example-project-1': {
        title: 'projectExampleOneTitle',
        shortDescription: 'projectExampleOneShort',
        fullDescription: 'projectExampleOneFull',
        highlights: [
            'projectExampleOneHighlightOne',
            'projectExampleOneHighlightTwo',
            'projectExampleOneHighlightThree'
        ]
    },
    'example-project-2': {
        title: 'projectExampleTwoTitle',
        shortDescription: 'projectExampleTwoShort',
        fullDescription: 'projectExampleTwoFull',
        highlights: [
            'projectExampleTwoHighlightOne',
            'projectExampleTwoHighlightTwo',
            'projectExampleTwoHighlightThree'
        ]
    }
};

@Injectable({
    providedIn: 'root'
})
export class I18nService {
    private readonly document = inject(DOCUMENT);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly storageKey = 'artur-portfolio-language';
    private readonly selectedLanguage = signal<Language>(this.readInitialLanguage());

    readonly language = this.selectedLanguage.asReadonly();
    readonly direction = computed(() => (this.selectedLanguage() === 'he' ? 'rtl' : 'ltr'));
    readonly locale = computed(() => (this.selectedLanguage() === 'he' ? 'he-IL' : 'en-US'));

    constructor() {
        effect(() => {
            const language = this.selectedLanguage();
            this.applyLanguage(language);
        });
    }

    toggleLanguage(origin?: LanguageTransitionOrigin): void {
        const language = this.selectedLanguage() === 'en' ? 'he' : 'en';
        this.setLanguage(language, origin);
    }

    setLanguage(language: Language, origin?: LanguageTransitionOrigin): void {
        if (language === this.selectedLanguage()) {
            return;
        }

        if (!origin || !this.canAnimateLanguageTransition()) {
            this.selectedLanguage.set(language);
            return;
        }

        this.runAnimatedLanguageTransition(language, origin);
    }

    translate(key: TranslationKey, params: Record<string, string | number> = {}): string {
        let value: string = translations[this.selectedLanguage()][key];

        for (const [paramKey, paramValue] of Object.entries(params)) {
            value = value.replaceAll(`{${paramKey}}`, `${paramValue}`);
        }

        return value;
    }

    projectCategoryLabel(category: ProjectCategory): string {
        return this.translate(projectCategoryTranslationKeys[category]);
    }

    projectTitle(projectId: string, fallback: string): string {
        const key = projectTranslationKeys[projectId]?.title;
        return key ? this.translate(key) : fallback;
    }

    projectShortDescription(projectId: string, fallback: string): string {
        const key = projectTranslationKeys[projectId]?.shortDescription;
        return key ? this.translate(key) : fallback;
    }

    projectFullDescription(projectId: string, fallback: string): string {
        const key = projectTranslationKeys[projectId]?.fullDescription;
        return key ? this.translate(key) : fallback;
    }

    projectHighlight(projectId: string, highlightIndex: number, fallback: string): string {
        const key = projectTranslationKeys[projectId]?.highlights[highlightIndex];
        return key ? this.translate(key) : fallback;
    }

    private readInitialLanguage(): Language {
        if (!isPlatformBrowser(this.platformId)) {
            return 'en';
        }

        const storedLanguage = window.localStorage.getItem(this.storageKey);
        return storedLanguage === 'he' ? 'he' : 'en';
    }

    private applyLanguage(language: Language): void {
        const htmlElement = this.document.documentElement;

        htmlElement.lang = language;
        htmlElement.dir = language === 'he' ? 'rtl' : 'ltr';
        htmlElement.dataset['language'] = language;

        if (isPlatformBrowser(this.platformId)) {
            window.localStorage.setItem(this.storageKey, language);
        }
    }

    private canAnimateLanguageTransition(): boolean {
        if (!isPlatformBrowser(this.platformId)) {
            return false;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return false;
        }

        return typeof this.viewTransitionDocument.startViewTransition === 'function';
    }

    private runAnimatedLanguageTransition(language: Language, origin: LanguageTransitionOrigin): void {
        const root = this.document.documentElement;
        const radius = this.getRevealRadius(origin);

        root.style.setProperty('--language-reveal-x', `${origin.x}px`);
        root.style.setProperty('--language-reveal-y', `${origin.y}px`);
        root.style.setProperty('--language-reveal-radius', `${radius}px`);
        root.setAttribute('data-language-transition', language);

        const transition = this.viewTransitionDocument.startViewTransition?.(() => {
            this.selectedLanguage.set(language);
            this.applyLanguage(language);
        });

        if (!transition) {
            root.removeAttribute('data-language-transition');
            this.clearTransitionStyles();
            return;
        }

        transition.ready
            .then(() => this.animateLanguageReveal(origin, radius))
            .catch(() => undefined)
            .finally(() => {
                transition.finished.finally(() => {
                    requestAnimationFrame(() => {
                        root.removeAttribute('data-language-transition');
                        this.clearTransitionStyles();
                    });
                });
            });
    }

    private getRevealRadius(origin: LanguageTransitionOrigin): number {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const distances = [
            Math.hypot(origin.x, origin.y),
            Math.hypot(width - origin.x, origin.y),
            Math.hypot(origin.x, height - origin.y),
            Math.hypot(width - origin.x, height - origin.y)
        ];

        return Math.max(...distances);
    }

    private clearTransitionStyles(): void {
        const root = this.document.documentElement;
        root.style.removeProperty('--language-reveal-x');
        root.style.removeProperty('--language-reveal-y');
        root.style.removeProperty('--language-reveal-radius');
    }

    private async animateLanguageReveal(origin: LanguageTransitionOrigin, radius: number): Promise<void> {
        const animation = this.document.documentElement.animate(
            {
                clipPath: [
                    `circle(0 at ${origin.x}px ${origin.y}px)`,
                    `circle(${radius}px at ${origin.x}px ${origin.y}px)`
                ]
            },
            {
                duration: 1450,
                easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
                fill: 'both',
                pseudoElement: '::view-transition-new(root)'
            }
        );

        await animation.finished.catch(() => undefined);
    }

    private get viewTransitionDocument(): DocumentWithViewTransition {
        return this.document as DocumentWithViewTransition;
    }
}
