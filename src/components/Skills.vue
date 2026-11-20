<template>
  <section ref="root" id="skills" class="relative w-full bg-[#08080b] text-white py-24 md:py-36 overflow-hidden">
    <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] md:w-[1100px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.14),transparent_65%)] pointer-events-none">
    </div>

    <!-- Header -->
    <div class="skills-head relative px-5 md:px-24 max-w-6xl mx-auto mb-14 md:mb-20">
      <div class="mb-6 flex items-center gap-4">
        <div class="w-10 h-[1px] bg-indigo-500"></div>
        <span class="text-[10px] uppercase tracking-[0.6em] text-indigo-400 font-bold">{{ t.skills.label }}</span>
      </div>
      <h2 class="font-syne font-black uppercase italic tracking-tighter leading-[1] text-3xl md:text-6xl">
        {{ t.skills.title }} <span class="text-outline">{{ t.skills.titleOutline }}</span>
      </h2>
    </div>

    <!-- Marquee rows (decorative; the grid below is the accessible list) -->
    <div class="marquee-wrap relative flex flex-col gap-4 mb-16 md:mb-24" aria-hidden="true">
      <div v-for="(row, r) in marqueeRows" :key="r" class="marquee">
        <div class="marquee-track" :class="{ reverse: r === 1 }">
          <span v-for="(skill, i) in [...row, ...row]" :key="i" class="pill font-syne">
            <span class="dot"></span>{{ skill }}
          </span>
        </div>
      </div>
    </div>

    <!-- Grouped list -->
    <div class="relative px-5 md:px-24 max-w-6xl mx-auto grid md:grid-cols-3 gap-4 md:gap-6">
      <div v-for="group in groups" :key="group.key"
        class="skill-group rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 hover:border-indigo-500/40 transition-colors duration-500">
        <h3 class="text-[10px] md:text-xs uppercase tracking-[0.4em] text-indigo-400 font-bold mb-5">
          {{ t.skills.groups[group.key] }}
        </h3>
        <ul class="flex flex-wrap gap-2">
          <li v-for="skill in group.items" :key="skill"
            class="text-sm text-white/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            {{ skill }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../i18n';

const { t } = useI18n();

const groups = [
  { key: 'frontend', items: ['Vue 3', 'React', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Tailwind CSS', 'GSAP'] },
  { key: 'backend', items: ['Java', 'Spring Boot', 'REST APIs', 'Firebase', 'PHP', 'Python'] },
  { key: 'workflow', items: ['Git & GitHub', 'Vite', 'Vercel', 'Scrum'] },
] as const;

const marqueeRows = [
  ['Vue 3', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Firebase', 'JavaScript', 'Vite', 'HTML & CSS'],
  ['Java', 'Spring Boot', 'REST APIs', 'PHP', 'Git & GitHub', 'Python', 'Vercel', 'Scrum'],
];

const root = ref<HTMLElement | null>(null);
let ctx: gsap.Context | undefined;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  ctx = gsap.context(() => {
    gsap.from('.skills-head', {
      y: 50,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.skills-head', start: 'top 85%' },
    });
    gsap.from('.marquee-wrap', {
      opacity: 0,
      duration: 1.2,
      scrollTrigger: { trigger: '.marquee-wrap', start: 'top 90%' },
    });
    gsap.from('.skill-group', {
      y: 60,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.skill-group', start: 'top 88%' },
    });
  }, root.value!);
});

onUnmounted(() => ctx?.revert());
</script>

<style scoped>
section {
  font-family: 'Inter', sans-serif;
}

.font-syne {
  font-family: 'Syne', sans-serif;
}

.text-outline {
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.35);
}

.marquee {
  overflow: hidden;
  /* Fade the edges */
  mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
}

.marquee-track {
  display: flex;
  gap: 1rem;
  width: max-content;
  animation: marquee 40s linear infinite;
}

.marquee-track.reverse {
  animation-direction: reverse;
  animation-duration: 46s;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.6rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 700;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.85);
}

.dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background: #818cf8;
  box-shadow: 0 0 10px #818cf8;
}

/* Track contains the list twice, so -50% loops seamlessly (gap included via padding trick) */
@keyframes marquee {
  to {
    transform: translateX(calc(-50% - 0.5rem));
  }
}
</style>
