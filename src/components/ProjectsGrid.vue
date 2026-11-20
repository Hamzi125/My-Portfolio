<template>
  <section ref="root" id="projects" class="projects relative bg-black text-white overflow-hidden">
    <div ref="track" class="track">

      <!-- Intro panel -->
      <div class="panel intro">
        <div class="intro-reveal mb-8 flex items-center gap-4">
          <div class="w-10 h-[1px] bg-indigo-500"></div>
          <span class="text-[10px] uppercase tracking-[0.6em] text-indigo-400 font-bold">{{ p.label }}</span>
        </div>
        <h2 class="intro-title font-syne font-black uppercase italic tracking-tighter leading-[0.9]">
          <span class="block overflow-hidden"><span class="intro-line inline-block">{{ p.titleA }}</span></span>
          <span class="block overflow-hidden"><span class="intro-line inline-block text-outline">{{ p.titleB }}</span></span>
        </h2>
        <div class="intro-reveal scroll-hint mt-10 items-center gap-4 text-xs uppercase tracking-[0.4em] text-white/40 font-bold">
          {{ p.scroll }}
          <span class="hint-line relative block w-16 h-[1px] bg-white/20 overflow-hidden"></span>
        </div>
      </div>

      <!-- Project panels -->
      <article v-for="(project, index) in projects" :key="project.title" class="panel project"
        :style="{ '--accent': project.accent }">

        <span class="big-num font-syne" aria-hidden="true">0{{ index + 1 }}</span>
        <div class="accent-glow" aria-hidden="true"></div>

        <a :href="project.live" target="_blank" rel="noopener" class="media group"
          :aria-label="p.liveAria(project.title)">
          <div class="media-inner live-target" :data-index="index">
            <div class="media-img">
              <!-- Poster: shown instantly, until the live site has loaded -->
              <img v-if="project.image" :src="project.image" alt="" :width="project.width" :height="project.height"
                decoding="async" class="poster" />
              <div v-else class="poster media-fallback">
                <span class="text-7xl md:text-8xl" aria-hidden="true">{{ project.emoji }}</span>
              </div>

              <!-- Live preview: the real deployed site, scaled down. Always up to date. -->
              <iframe v-if="liveLoaded[index]" :src="project.live" :title="p.previewTitle(project.title)"
                class="live-frame" :class="{ 'is-ready': liveReady[index] }" tabindex="-1" aria-hidden="true"
                sandbox="allow-scripts allow-same-origin" referrerpolicy="no-referrer"
                @load="liveReady[index] = true"></iframe>
            </div>
          </div>
          <span class="live-indicator" :class="{ 'is-ready': liveReady[index] }">
            <span class="live-dot"></span>Live
          </span>
          <span class="live-badge">{{ liveBadge[0] }}<br>{{ liveBadge[1] }}</span>
        </a>

        <div class="info">
          <div class="meta flex items-baseline gap-4 mb-5">
            <span class="text-sm font-bold tabular-nums" :style="{ color: project.accent }">0{{ index + 1 }}</span>
            <span class="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40 font-bold">{{ project.type }}</span>
          </div>

          <h3 class="title font-syne font-black tracking-tighter leading-[0.95] mb-6" :aria-label="project.title">
            <span v-for="(word, w) in splitWords(project.title)" :key="w" class="word" aria-hidden="true">
              <span v-for="(char, i) in word" :key="i" class="char-wrap"><span class="char">{{ char }}</span></span>
            </span>
          </h3>

          <p class="meta text-white/60 text-base md:text-lg leading-relaxed font-light mb-6">{{ project.description }}</p>

          <ul class="meta highlights space-y-2 mb-7">
            <li v-for="point in project.highlights" :key="point"
              class="text-sm text-white/70 flex gap-3 items-start leading-relaxed font-light">
              <span class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" :style="{ background: project.accent }"></span>
              {{ point }}
            </li>
          </ul>

          <div class="meta flex flex-wrap gap-2 mb-8">
            <span v-for="tech in project.stack" :key="tech"
              class="text-[10px] uppercase tracking-widest font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              {{ tech }}
            </span>
          </div>

          <div class="meta flex gap-6 font-medium text-sm md:text-base">
            <a :href="project.live" target="_blank" rel="noopener" class="link">{{ p.live }} <span aria-hidden="true">↗</span></a>
            <a v-if="project.code" :href="project.code" target="_blank" rel="noopener" class="link text-white/50">
              {{ p.code }} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </article>

      <!-- Coming soon panel (same animations as a project) -->
      <article class="panel project coming" style="--accent: #c084fc">
        <span class="big-num font-syne" aria-hidden="true">0{{ projects.length + 1 }}</span>
        <div class="accent-glow" aria-hidden="true"></div>

        <div class="media">
          <div class="media-inner ghost">
            <div class="media-img ghost-body">
              <!-- Skeleton of a project being built -->
              <div class="ghost-ui" aria-hidden="true">
                <div class="sk w-1/3 h-3"></div>
                <div class="sk w-2/3 h-8 mt-6"></div>
                <div class="sk w-1/2 h-8 mt-3"></div>
                <div class="grid grid-cols-3 gap-3 mt-8">
                  <div class="sk h-20"></div>
                  <div class="sk h-20"></div>
                  <div class="sk h-20"></div>
                </div>
              </div>
              <div class="ghost-badge">
                <span class="pulse-dot"></span>
                {{ p.coming.badge }}
              </div>
            </div>
          </div>
        </div>

        <div class="info">
          <div class="meta flex items-baseline gap-4 mb-5">
            <span class="text-sm font-bold tabular-nums text-purple-400">0{{ projects.length + 1 }}</span>
            <span class="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40 font-bold">{{ p.coming.type }}</span>
          </div>
          <h3 class="title font-syne font-black tracking-tighter leading-[0.95] mb-6" :aria-label="p.coming.title">
            <span v-for="(word, w) in splitWords(p.coming.title)" :key="w" class="word" aria-hidden="true">
              <span v-for="(char, i) in word" :key="i" class="char-wrap"><span class="char">{{ char }}</span></span>
            </span>
          </h3>
          <p class="meta text-white/60 text-base md:text-lg leading-relaxed font-light">
            {{ p.coming.text }}
          </p>
        </div>
      </article>

      <!-- Outro panel -->
      <div class="panel outro">
        <p class="text-white/40 text-xs uppercase tracking-[0.4em] font-bold mb-5">{{ p.outroLabel }}</p>
        <a href="https://github.com/Hamzi125" target="_blank" rel="noopener"
          class="outro-link font-syne font-black uppercase italic tracking-tighter leading-none whitespace-nowrap">
          GitHub <span class="inline-block transition-transform duration-500">↗</span>
        </a>
      </div>
    </div>

    <!-- HUD (horizontal mode only) -->
    <div class="hud" aria-hidden="true">
      <span class="tabular-nums text-xs font-bold tracking-[0.3em] text-white/60">
        0{{ activeProject }} <span class="text-white/60">/ 0{{ projects.length }}</span>
      </span>
      <div class="flex-1 h-[1px] bg-white/10 overflow-hidden">
        <div ref="progressBar" class="h-full bg-white/70 origin-left scale-x-0"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from '../i18n';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import einfachRechnungImg from '../assets/projects/einfachrechnung.webp';
import drumKitImg from '../assets/projects/drum-kit.webp';

type ProjectKey = 'einfachrechnung' | 'drumkit' | 'weather';

// Language-independent data. Texts (type, description, highlights) live in i18n.ts.
interface ProjectData {
  key: ProjectKey;
  title: string;
  stack: string[];
  live: string;
  accent: string;
  code?: string;
  image?: string;
  width?: number;
  height?: number;
  emoji?: string;
}

const projectData: ProjectData[] = [
  {
    key: 'einfachrechnung',
    title: 'EinfachRechnung',
    stack: ['Vue 3', 'Firebase', 'Tailwind', 'PrimeVue'],
    live: 'https://einfachrechnung.vercel.app',
    accent: '#818cf8',
    image: einfachRechnungImg,
    width: 1280,
    height: 800,
  },
  {
    key: 'drumkit',
    title: 'Drum Kit',
    stack: ['JavaScript', 'Web Audio API', 'HTML', 'CSS'],
    live: 'https://drum-kits-pied.vercel.app',
    code: 'https://github.com/Hamzi125/Drum-Kits',
    accent: '#fbbf24',
    image: drumKitImg,
    width: 1280,
    height: 731,
  },
  {
    key: 'weather',
    title: 'Weather App',
    stack: ['Vue 3', 'Vite', 'Tailwind', 'Axios'],
    live: 'https://weather-app-ivory-three-48.vercel.app',
    code: 'https://github.com/Hamzi125/Weather_App',
    accent: '#38bdf8',
    emoji: '🌤️',
  },
];

const { t } = useI18n();
const p = computed(() => t.value.projects);
const projects = computed(() => projectData.map((project) => ({ ...project, ...p.value.items[project.key] })));
const liveBadge = computed(() => p.value.liveBadge.split('|'));

// "Weather App" → [["W","e",...], ["A","p","p"]] so lines only break between words
const splitWords = (text: string) => text.split(' ').map((word) => Array.from(word));

// Live previews: iframe is only created once its panel comes near the viewport
const liveLoaded = ref<boolean[]>(projectData.map(() => false));
const liveReady = ref<boolean[]>(projectData.map(() => false));
const PREVIEW_WIDTH = 1440; // the iframe renders the site at desktop width, then gets scaled down

let lazyObserver: IntersectionObserver | undefined;
let sizeObserver: ResizeObserver | undefined;

const setupLivePreviews = () => {
  const targets = root.value!.querySelectorAll<HTMLElement>('.live-target');

  // Scale factor so the 1440px-wide site fits exactly into the frame
  sizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const el = entry.target as HTMLElement;
      el.style.setProperty('--live-scale', String(el.offsetWidth / PREVIEW_WIDTH));
    }
  });

  // Load when the frame is within about one screen (horizontally or vertically)
  lazyObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const index = Number((entry.target as HTMLElement).dataset.index);
      liveLoaded.value[index] = true;
      lazyObserver!.unobserve(entry.target);
    }
  }, { rootMargin: '100% 100% 100% 100%' });

  targets.forEach((el) => {
    sizeObserver!.observe(el);
    lazyObserver!.observe(el);
  });
};

const root = ref<HTMLElement | null>(null);
const track = ref<HTMLElement | null>(null);
const progressBar = ref<HTMLElement | null>(null);
const activeProject = ref(1);

// Must match the CSS media query that switches the layout to horizontal.
// Applies to desktop and mobile; only users who prefer reduced motion get a plain vertical list.
const HORIZONTAL = '(prefers-reduced-motion: no-preference)';

let mm: gsap.MatchMedia | undefined;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  setupLivePreviews();
  mm = gsap.matchMedia(root.value!);

  // ---------- Pinned horizontal gallery (desktop + mobile) ----------
  mm.add(HORIZONTAL, () => {
    const trackEl = track.value!;
    const panels = gsap.utils.toArray<HTMLElement>('.project'); // projects + "coming soon"
    const distance = () => trackEl.scrollWidth - window.innerWidth;
    // Extra scroll distance where the last panel (GitHub) stays pinned before the footer
    const hold = () => window.innerHeight * 0.9;

    // The pin lasts longer than the horizontal movement → pause at the end
    ScrollTrigger.create({
      trigger: root.value,
      pin: true,
      start: 'top top',
      end: () => '+=' + (distance() + hold()),
      invalidateOnRefresh: true,
    });

    const scroller = gsap.to(trackEl, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        scrub: 1,
        start: 'top top',
        end: () => '+=' + distance(),
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(progressBar.value, { scaleX: self.progress });
          // intro + panels + outro stops; map progress to project 1..n
          const stop = Math.round(self.progress * (panels.length + 1));
          activeProject.value = gsap.utils.clamp(1, projectData.length, stop);
        },
      },
    });

    // Intro entrance (one trigger for both parts)
    gsap.timeline({ scrollTrigger: { trigger: root.value, start: 'top 70%' } })
      .from('.intro-line', { yPercent: 110, duration: 1.2, stagger: 0.12, ease: 'expo.out' })
      .from('.intro-reveal', { opacity: 0, y: 20, duration: 1, stagger: 0.15 }, 0.3);

    panels.forEach((panel) => {
      const inView = { containerAnimation: scroller, trigger: panel };

      // One scrubbed timeline (= one ScrollTrigger) per panel for all scroll-linked motion.
      // It runs while the panel travels from entering on the right to leaving on the left.
      // A panel is one screen wide, so that's 2 screens: 0.5 in timeline time = one screen.
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { ...inView, start: 'left right', end: 'right left', scrub: true },
      })
        // Image: clip-path "window" opens up (from "left 95%" to "left 25%")
        .fromTo(panel.querySelector('.media-inner'),
          { clipPath: 'inset(18% 22% 18% 22% round 2.5rem)' },
          { clipPath: 'inset(0% 0% 0% 0% round 2rem)', duration: 0.35 }, 0.025)
        // ...while the image inside zooms out and drifts
        .fromTo(panel.querySelector('.media-img'),
          { scale: 1.35, xPercent: 8 },
          { scale: 1, xPercent: -4, duration: 1 }, 0)
        // Giant background number drifts slower than the panel (parallax)
        .fromTo(panel.querySelector('.big-num'),
          { xPercent: 40 },
          { xPercent: -40, duration: 1 }, 0);

      // Title letters rise one by one, then the details fade in
      const tl = gsap.timeline({
        scrollTrigger: { ...inView, start: 'left 55%', toggleActions: 'play none none reverse' },
      });
      tl.from(panel.querySelectorAll('.char'), {
        yPercent: 120,
        rotate: 8,
        duration: 0.9,
        stagger: 0.03,
        ease: 'expo.out',
      }).from(panel.querySelectorAll('.meta'), {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
      }, '-=0.6');
    });

    gsap.from('.outro-link', {
      yPercent: 60,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        containerAnimation: scroller,
        trigger: '.outro',
        start: 'left right',
        end: 'left 40%',
        scrub: true,
      },
    });
  });
});

onUnmounted(() => {
  mm?.revert();
  lazyObserver?.disconnect();
  sizeObserver?.disconnect();
});
</script>

<style scoped>
.projects {
  font-family: 'Inter', sans-serif;
}

.font-syne {
  font-family: 'Syne', sans-serif;
}

/* ---------- Shared ---------- */
.text-outline {
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.35);
}

/* Syne at weight 800 is very wide (~1–1.5em per letter), so sizes stay modest */
.intro-title {
  font-size: clamp(1.5rem, 5.2vw, 2.5rem);
}

.title {
  font-size: clamp(1.25rem, 5.5vw, 1.75rem);
}

/* A word never breaks in the middle */
.word {
  display: inline-block;
  white-space: nowrap;
  margin-right: 0.3em;
}

.word:last-child {
  margin-right: 0;
}

.char-wrap {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  padding-bottom: 0.08em;
}

.char {
  display: inline-block;
  will-change: transform;
}

.panel {
  position: relative;
}

.project {
  display: grid;
  gap: 2rem;
  padding: 3rem 1.25rem;
}

.media {
  position: relative;
  display: block;
  aspect-ratio: 16 / 10;
}

.media-inner {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 1.25rem;
  background: #0f0f13;
  box-shadow: 0 30px 80px -20px color-mix(in srgb, var(--accent) 35%, transparent);
}

.media-img {
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

/* Real site rendered at 1440×900 and scaled to the frame (16:10 matches the frame) */
.live-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 1440px;
  height: 900px;
  border: 0;
  background: #fff;
  transform: scale(var(--live-scale, 0.5));
  transform-origin: 0 0;
  pointer-events: none; /* scrolling and clicks go to the portfolio, not the embedded site */
  opacity: 0;
  transition: opacity 0.8s ease;
}

.live-frame.is-ready {
  opacity: 1;
}

.live-indicator {
  position: absolute;
  left: 1rem;
  top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #fff;
  background: rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.12);
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.live-indicator.is-ready {
  opacity: 1;
  transform: none;
}

.live-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 9999px;
  background: #22c55e;
  box-shadow: 0 0 8px #22c55e;
}

.media-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--accent) 55%, transparent), transparent 60%),
    linear-gradient(135deg, #0c1a2b, #050505);
}

.live-badge {
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  line-height: 1.6;
  color: #000;
  background: var(--accent);
  transform: scale(0);
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.media:hover .live-badge,
.media:focus-visible .live-badge {
  transform: scale(1);
}

.link {
  display: inline-flex;
  gap: 0.5rem;
  transition: color 0.3s;
}

.link:hover {
  color: var(--accent);
}

.big-num,
.accent-glow,
.hud,
.scroll-hint {
  display: none;
}

.intro {
  padding: 6rem 1.25rem 2rem;
}

.outro {
  padding: 4rem 1.25rem 6rem;
}

.outro-link {
  font-size: clamp(2rem, 8vw, 3rem);
  transition: color 0.4s;
}

/* ---------- Coming soon ---------- */
.ghost {
  border: 1px dashed rgba(255, 255, 255, 0.18);
  background: #08080b;
}

.ghost-body {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Light sweep across the skeleton */
.ghost-body::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(100deg, transparent 30%, rgba(192, 132, 252, 0.12) 50%, transparent 70%);
  transform: translateX(-100%);
  animation: sweep 2.6s ease-in-out infinite;
}

.ghost-ui {
  position: absolute;
  inset: 12% 10%;
  opacity: 0.5;
}

.sk {
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.06);
}

.ghost-badge {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(192, 132, 252, 0.35);
}

.pulse-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background: #c084fc;
  animation: pulse 1.6s ease-out infinite;
}

@keyframes sweep {
  to {
    transform: translateX(100%);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(192, 132, 252, 0.7);
  }

  100% {
    box-shadow: 0 0 0 10px rgba(192, 132, 252, 0);
  }
}

.outro-link:hover {
  color: #818cf8;
}

.outro-link:hover span {
  transform: translate(0.1em, -0.1em);
}

/* ---------- Horizontal mode (desktop + mobile) ---------- */
@media (prefers-reduced-motion: no-preference) {
  .projects {
    height: 100vh;
    /* svh = height with the mobile browser bars visible, so nothing hides under them */
    height: 100svh;
  }

  .track {
    display: flex;
    height: 100%;
    width: max-content;
    will-change: transform;
  }

  .panel {
    flex-shrink: 0;
    height: 100vh;
    height: 100svh;
  }

  /* Panel grows with its heading, so it can never be clipped */
  .intro {
    width: max-content;
    min-width: 60vw;
    padding: 0 8vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .scroll-hint {
    display: flex;
  }

  .hint-line::after {
    content: '';
    position: absolute;
    inset: 0;
    background: white;
    animation: hint 1.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
  }

  .project {
    width: 100vw;
    padding: 0 8vw;
    grid-template-columns: 1.55fr 1fr;
    align-items: center;
    gap: 5vw;
  }

  .media-inner {
    border-radius: 2rem;
  }

  .big-num {
    display: block;
    position: absolute;
    right: 2vw;
    top: 50%;
    transform: translateY(-50%);
    font-size: 34vw;
    font-weight: 800;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.06);
    pointer-events: none;
    user-select: none;
  }

  .accent-glow {
    display: block;
    position: absolute;
    left: 15%;
    top: 50%;
    width: 50vw;
    height: 50vw;
    transform: translateY(-50%);
    background: radial-gradient(circle, color-mix(in srgb, var(--accent) 18%, transparent), transparent 65%);
    pointer-events: none;
  }

  .info {
    position: relative;
    max-width: 32rem;
  }

  .intro-title {
    font-size: clamp(2.5rem, 4.5vw, 4.5rem);
  }

  .title {
    font-size: clamp(1.5rem, 2vw, 2.25rem);
  }

  .outro-link {
    font-size: clamp(2.5rem, 4vw, 4rem);
  }

  .outro {
    width: 55vw;
    padding: 0 8vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .hud {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    position: absolute;
    left: 8vw;
    right: 8vw;
    bottom: 2.5rem;
  }
}

/* ---------- Mobile tweaks for horizontal mode: image on top, text below ---------- */
@media (max-width: 767px) and (prefers-reduced-motion: no-preference) {
  .intro {
    min-width: 100vw;
    padding: 0 6vw;
  }

  .intro-title {
    font-size: 6vw;
  }

  .project {
    grid-template-columns: 1fr;
    align-content: center;
    padding: 0 6vw;
    gap: 1.5rem;
  }

  .media-inner {
    border-radius: 1.25rem;
  }

  /* Keep each panel within one screen height */
  .highlights {
    display: none;
  }

  .info {
    max-width: none;
  }

  .title {
    font-size: clamp(1.25rem, 5.5vw, 1.75rem);
  }

  .live-badge {
    width: 4.5rem;
    height: 4.5rem;
    font-size: 0.55rem;
    right: 0.75rem;
    bottom: 0.75rem;
    transform: scale(1); /* no hover on touch, so always visible */
  }

  .big-num {
    font-size: 60vw;
    top: 30%;
  }

  .accent-glow {
    left: -20%;
    width: 120vw;
    height: 120vw;
    top: 35%;
  }

  .outro {
    width: 100vw;
    padding: 0 6vw;
  }

  .outro-link {
    font-size: 10vw;
  }

  .hud {
    left: 6vw;
    right: 6vw;
    bottom: 1.5rem;
  }
}

@keyframes hint {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}
</style>
