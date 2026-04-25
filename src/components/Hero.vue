<template>
  <div class="relative w-full h-screen overflow-hidden bg-Cbrand flex items-center justify-center px-6">
    <!-- Local Stickers Instance -->
    <InteractiveStickers />

    <!-- 3. Main Content -->
    <div class="relative z-10 text-center flex flex-col items-center pointer-events-none">
      <div class="overflow-hidden mb-6">
        <p class="text-[7px] md:text-xs font-bold uppercase tracking-[0.5em] text-black/30 animate-reveal-up">
          Developer, der immer was Neues dazulernt.
        </p>
      </div>

      <div class="relative inline-block">
        <h1 class="text-[45px] md:text-[10rem] font-black uppercase tracking-tighter leading-[0.7] gradient-text pb-2">
          Hamza
        </h1>
        <h1
          class="text-[40px] md:text-[10rem] font-black uppercase tracking-tighter leading-[0.7] text-transparent [-webkit-text-stroke:1px_rgba(168,85,247,0.4)]">
          Alahmad
        </h1>
      </div>
    </div>

    <!-- Corner Branding -->
    <div class="absolute top-8 left-8 md:top-12 md:left-12 flex items-center gap-3 pointer-events-none">
      <div class="w-2 h-2 bg-[#1fb401] rounded-full live-text"></div>
      <span class="text-[10px] font-bold uppercase tracking-widest text-black/60 ">HS.2026</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveStickers from './InteractiveStickers.vue';

const scrollDown = ref<HTMLElement | null>(null);

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Add a slight delay to ensure the preloader has fully vanished
  const tl = gsap.timeline({ delay: 0.5 });

  tl.from(".animate-reveal-up", {
    y: 60,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
  })
    .from(".gradient-text, .text-transparent", {
      y: 80,
      opacity: 0,
      skewY: 2,
      duration: 1.5,
      stagger: 0.15,
      ease: "expo.out"
    }, "-=1")
    .to(scrollDown.value, {
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    }, "-=0.5");
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');

.gradient-text {
  font-family: 'Syne', sans-serif;
  background: linear-gradient(to right,
      #6366f1 0%,
      #a855f7 25%,
      #8d114f 50%,
      #a855f7 75%,
      #6366f1 100%);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shine 5s linear infinite;
}

.live-text {
  box-shadow: 0 0 0 0 rgba(31, 180, 1, 0.7);
  animation: pulse-green 2s infinite;
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}

@keyframes pulse-green {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(31, 180, 1, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(31, 180, 1, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(31, 180, 1, 0);
  }
}

.animate-reveal-up {
  display: inline-block;
}
</style>
