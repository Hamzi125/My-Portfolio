import { computed, nextTick, ref } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export type Lang = 'de' | 'en';

const STORAGE_KEY = 'lang';

const messages = {
  de: {
    nav: {
      about: 'Über mich',
      skills: 'Skills',
      experience: 'Werdegang',
      projects: 'Projekte',
      contact: 'Kontakt',
      cv: 'Lebenslauf',
      menu: 'Menü',
      close: 'Schließen',
      switchLang: 'Switch to English',
    },
    hero: {
      tagline: 'Developer, der immer was Neues dazulernt.',
    },
    about: {
      label: 'Über mich',
      headline: { a: 'Ich baue', b: 'Web-Apps,', c: 'die wirklich', d: 'genutzt werden.' },
      p1a: 'Ich bin Hamza – angehender Fachinformatiker für Anwendungsentwicklung und seit 2023 freiberuflicher Webentwickler. Am liebsten arbeite ich mit ',
      p1b: 'Vue, TypeScript und Tailwind',
      p1c: ' und baue Anwendungen, die ',
      p1d: 'echte Alltagsprobleme lösen',
      p1e: ' – wie EinfachRechnung, eine Rechnungs-App nach deutschem Standard inklusive XRechnung.',
      p2: 'KI-Tools setze ich gezielt ein, um schneller und sauberer zu entwickeln. Ich bin offen für neue Projekte und spannende Teams.',
      photoAlt: 'Foto von Hamza Alahmad',
    },
    skills: {
      label: 'Tech Stack',
      title: 'Werkzeuge',
      titleOutline: 'die ich nutze',
      groups: {
        frontend: 'Frontend',
        backend: 'Backend & Daten',
        workflow: 'Workflow & Tools',
      },
    },
    experience: {
      label: 'Werdegang',
      title: 'Stationen',
      items: [
        {
          date: '2024 – 2026',
          title: 'Fachinformatiker (AE)',
          company: 'Ausbildung IHK',
          points: [
            'Fokus auf Softwarearchitektur, Clean Code & moderne Web-Stacks.',
            'Entwicklung komplexer Applikationen und praxisnahe Projektarbeit.',
          ],
        },
        {
          date: '2025 – 2026',
          title: 'Softwareentwickler',
          company: 'Praktikum',
          points: [
            'Aktive Mitarbeit in der agilen Softwareentwicklung (Scrum).',
            'Praktische Erfahrung in Team-Projekten und Versionskontrolle.',
          ],
        },
        {
          date: 'Seit 2023',
          title: 'Webentwickler',
          company: 'Freelance',
          points: [
            'Entwicklung maßgeschneiderter Web-Lösungen nach exakten Kundenanforderungen.',
            'Ganzheitliche Projektbetreuung (Full-Service) für höchste Kundenzufriedenheit.',
          ],
        },
      ],
    },
    projects: {
      label: 'Arbeiten',
      titleA: 'Ausgewählte',
      titleB: 'Projekte',
      scroll: 'Scrollen',
      live: 'Live ansehen',
      liveBadge: 'Live|ansehen ↗',
      code: 'Code',
      liveAria: (title: string) => `${title} live ansehen`,
      previewTitle: (title: string) => `Live-Vorschau von ${title}`,
      items: {
        einfachrechnung: {
          type: 'Web-App · Produkt',
          description:
            'Rechnungen und Angebote nach deutschem Standard direkt im Browser erstellen – mit Live-Vorschau als A4-Seite und PDF-Download.',
          highlights: [
            'Live-Vorschau nach DIN 5008, direkt in der Vorschau bearbeitbar',
            'E-Rechnung (XRechnung 3.0) selbst als XML erzeugt',
            'Pflichtangaben-Prüfung nach § 14 UStG, GoBD-konforme Stornos',
          ],
        },
        drumkit: {
          type: 'Web Audio',
          description: 'Ein Schlagzeug im Browser – spielbar mit der Tastatur oder per Touch auf Handy und Tablet.',
          highlights: [
            'Drei Kits, zwei davon live mit der Web Audio API synthetisiert',
            'Beats aufnehmen und im Loop abspielen',
            'Metronom (40–240 BPM) und niedrige Latenz',
          ],
        },
        weather: {
          type: 'API-Integration',
          description:
            'Aktuelles Wetter für jede Stadt – schlankes Interface mit Live-Daten aus der Weatherstack-API.',
          highlights: ['Echtzeit-Wetterdaten per Städtesuche', 'REST-API-Anbindung mit Axios'],
        },
      },
      coming: {
        type: 'Demnächst',
        title: 'Bald mehr.',
        text: 'Neue Projekte sind gerade in Arbeit und noch auf dem Weg hierher. Schau bald wieder vorbei.',
        badge: 'In Entwicklung',
      },
      outroLabel: 'Bis dahin: mehr Code auf',
    },
    footer: {
      label: 'Kontakt',
      titleA: 'Lass uns',
      titleB: 'zusammen',
      titleC: 'arbeiten',
      email: 'E-Mail',
      backToTop: 'Zurück|nach oben',
      cv: 'Lebenslauf (PDF)',
      madeBy: 'Gestaltet mit ❤️ von Hamza Alahmad',
    },
  },

  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      cv: 'Resume',
      menu: 'Menu',
      close: 'Close',
      switchLang: 'Auf Deutsch wechseln',
    },
    hero: {
      tagline: 'A developer who never stops learning.',
    },
    about: {
      label: 'About me',
      headline: { a: 'I build', b: 'web apps', c: 'that people', d: 'actually use.' },
      p1a: "I'm Hamza – an application developer in training (Fachinformatiker AE) and a freelance web developer since 2023. I love working with ",
      p1b: 'Vue, TypeScript and Tailwind',
      p1c: ' and building apps that ',
      p1d: 'solve real everyday problems',
      p1e: ' – like EinfachRechnung, an invoicing app built to German standards, including XRechnung e-invoices.',
      p2: "I use AI tools deliberately to build faster and cleaner. I'm open to new projects and great teams.",
      photoAlt: 'Photo of Hamza Alahmad',
    },
    skills: {
      label: 'Tech Stack',
      title: 'Tools',
      titleOutline: 'I work with',
      groups: {
        frontend: 'Frontend',
        backend: 'Backend & Data',
        workflow: 'Workflow & Tools',
      },
    },
    experience: {
      label: 'Career',
      title: 'Experience',
      items: [
        {
          date: '2024 – 2026',
          title: 'Application Developer',
          company: 'IHK Apprenticeship',
          points: [
            'Focus on software architecture, clean code & modern web stacks.',
            'Building complex applications in hands-on project work.',
          ],
        },
        {
          date: '2025 – 2026',
          title: 'Software Developer',
          company: 'Internship',
          points: [
            'Active part of an agile development team (Scrum).',
            'Hands-on experience with team projects and version control.',
          ],
        },
        {
          date: 'Since 2023',
          title: 'Web Developer',
          company: 'Freelance',
          points: [
            "Building custom web solutions tailored to each client's needs.",
            'End-to-end project support for the best possible client experience.',
          ],
        },
      ],
    },
    projects: {
      label: 'Work',
      titleA: 'Selected',
      titleB: 'Projects',
      scroll: 'Scroll',
      live: 'View live',
      liveBadge: 'View|live ↗',
      code: 'Code',
      liveAria: (title: string) => `View ${title} live`,
      previewTitle: (title: string) => `Live preview of ${title}`,
      items: {
        einfachrechnung: {
          type: 'Web app · Product',
          description:
            'Create invoices and quotes to German standards right in the browser – with a live A4 preview and PDF download.',
          highlights: [
            'Live A4 preview (DIN 5008), editable right in the preview',
            'Generates XRechnung 3.0 e-invoices as XML',
            'Validates mandatory fields (§ 14 UStG), GoBD-compliant cancellations',
          ],
        },
        drumkit: {
          type: 'Web Audio',
          description: 'A drum kit in the browser – play it with your keyboard or by tapping on phone and tablet.',
          highlights: [
            'Three kits, two of them synthesised live with the Web Audio API',
            'Record beats and play them back on a loop',
            'Metronome (40–240 BPM) and low latency',
          ],
        },
        weather: {
          type: 'API integration',
          description: 'Current weather for any city – a lean interface with live data from the Weatherstack API.',
          highlights: ['Real-time weather data by city search', 'REST API integration with Axios'],
        },
      },
      coming: {
        type: 'Coming soon',
        title: 'More soon.',
        text: 'New projects are in the works and on their way here. Check back soon.',
        badge: 'In progress',
      },
      outroLabel: 'Until then: more code on',
    },
    footer: {
      label: 'Contact',
      titleA: "Let's",
      titleB: 'work',
      titleC: 'together',
      email: 'Email',
      backToTop: 'Back|to top',
      cv: 'Resume (PDF)',
      madeBy: 'Designed with ❤️ by Hamza Alahmad',
    },
  },
} as const;

const readStoredLang = (): Lang | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'de' || value === 'en' ? value : null;
  } catch {
    return null;
  }
};

// Stored choice → browser language → German
const initialLang: Lang =
  readStoredLang() ?? (navigator.language?.toLowerCase().startsWith('de') ? 'de' : 'en');

const lang = ref<Lang>(initialLang);
document.documentElement.lang = initialLang;

const t = computed(() => messages[lang.value]);

const setLang = (value: Lang) => {
  lang.value = value;
  document.documentElement.lang = value;
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // storage unavailable — the choice just isn't remembered
  }
  // Text length changes → recalculate pinned/scroll positions
  nextTick(() => ScrollTrigger.refresh());
};

export const useI18n = () => ({ lang, t, setLang });
