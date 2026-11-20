<template>
  <section ref="aboutSection" id="about-section"
    class="relative w-full min-h-screen flex items-center py-20 md:py-32 px-5 md:px-24 bg-[#050505] text-white overflow-hidden">

    <!-- Ambient Background Glows -->
    <div
      class="absolute top-0 -left-60 w-[40rem] h-[40rem] bg-[radial-gradient(circle,rgba(79,70,229,0.14),transparent_65%)] pointer-events-none animate-pulse">
    </div>
    <div
      class="absolute bottom-0 -right-60 w-[40rem] h-[40rem] bg-[radial-gradient(circle,rgba(147,51,234,0.12),transparent_65%)] pointer-events-none animate-pulse"
      style="animation-delay: 2s;"></div>

    <div class="relative z-10 w-full max-w-2xl md:max-w-6xl mx-auto grid gap-12 md:gap-16 items-center"
      :class="photoUrl ? 'md:grid-cols-[1fr_auto]' : ''">
      <div>
        <div class="mb-10 flex items-center gap-4 group">
          <div class="w-10 h-[1px] bg-indigo-500 group-hover:w-16 transition-all duration-700"></div>
          <span class="text-[10px] uppercase tracking-[0.6em] text-indigo-400 font-bold">{{ t.about.label }}</span>
        </div>

        <div class="mb-10">
          <h2 class="reveal-text text-3xl md:text-6xl font-black leading-[1.1] tracking-tighter font-syne italic mb-8">
            <!-- Row 1: separate wrappers for each word to prevent overlap -->
            <div class="flex flex-wrap gap-x-3 md:gap-x-5 mb-2 md:mb-0">
              <span class="inline-block overflow-hidden">
                <span class="inline-block translate-y-full pr-2">{{ t.about.headline.a }}</span>
              </span>
              <span class="inline-block overflow-hidden">
                <span class="inline-block not-italic text-white/10 outline-text translate-y-full">{{ t.about.headline.b }}</span>
              </span>
            </div>

            <!-- Row 2 -->
            <div class="block overflow-hidden">
              <span class="inline-block translate-y-full">{{ t.about.headline.c }}</span>
            </div>

            <!-- Row 3 -->
            <div class="block overflow-hidden">
              <span class="gradient-text inline-block translate-y-full pr-2">{{ t.about.headline.d }}</span>
            </div>
          </h2>
        </div>

        <div class="max-w-3xl space-y-6">
          <p class="reveal-p text-lg md:text-2xl text-white/50 leading-[1.6] font-light tracking-tight break-words">
            {{ t.about.p1a }}<span class="text-white/85 font-medium border-b border-indigo-500/40">{{ t.about.p1b }}</span>{{
              t.about.p1c }}<span class="text-indigo-400 italic font-medium">{{ t.about.p1d }}</span>{{ t.about.p1e }}
          </p>
          <p class="reveal-p text-base md:text-xl text-white/40 leading-[1.6] font-light tracking-tight break-words">
            {{ t.about.p2 }}
          </p>
        </div>
      </div>

      <!-- Optional photo: appears automatically when a file is in src/assets/photo/ -->
      <div v-if="photoUrl" class="reveal-p relative w-56 md:w-80 justify-self-start md:justify-self-end">
        <div class="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-white/5">
          <img :src="photoUrl" :alt="t.about.photoAlt" loading="lazy" decoding="async"
            class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
        </div>
        <div class="absolute -inset-3 -z-10 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.3),transparent_70%)]">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../i18n';
import { photoUrl } from '../personalFiles';

const { t } = useI18n();

const aboutSection = ref<HTMLElement | null>(null);
let ctx: gsap.Context | undefined;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  ctx = gsap.context(() => {
    // Sequential timeline while the section is pinned
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection.value,
        pin: true,
        start: "top top",
        end: "+=140%",
        scrub: 1,
      }
    });

    // 1. Heading reveal
    tl.to(".reveal-text span.translate-y-full", {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "power2.out",
      duration: 1
    });

    // 2. Small pause
    tl.to({}, { duration: 0.2 });

    // 3. Paragraphs (and photo) reveal
    tl.fromTo(".reveal-p",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1,
        stagger: 0.15
      }
    );
  }, aboutSection.value!);
});

onUnmounted(() => ctx?.revert());
</script>

<style scoped>
section {
  font-family: 'Inter', sans-serif;
}

h2 {
  font-family: 'Syne', sans-serif;
}

.outline-text {
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25);
  transition: all 0.5s ease;
}

.reveal-text:hover .outline-text {
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
  color: rgba(255, 255, 255, 0.05);
}

.gradient-text {
  background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #818cf8 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shimmer 5s linear infinite;
}

@keyframes shimmer {
  to {
    background-position: 200% center;
  }
}
</style>
