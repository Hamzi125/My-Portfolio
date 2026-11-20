// Optional personal files. Drop a file into the folder and it shows up on the site
// automatically on the next build — no code changes needed.

// src/assets/cv/*.pdf → "Lebenslauf" buttons in the navigation and footer
const cvFiles = import.meta.glob('./assets/cv/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

// src/assets/photo/*.{webp,jpg,jpeg,png} → photo in the "About" section
const photoFiles = import.meta.glob('./assets/photo/*.{webp,jpg,jpeg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export const cvUrl: string | null = Object.values(cvFiles)[0] ?? null;
export const photoUrl: string | null = Object.values(photoFiles)[0] ?? null;
