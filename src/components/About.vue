<template>
  <section ref="aboutSection" id="about-section"
    class="relative w-full min-h-screen flex items-center py-20 md:py-32 px-5 md:px-24 bg-[#050505] text-white overflow-hidden">

    <!-- Ambient Background Glows -->
    <div
      class="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse">
    </div>
    <div
      class="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"
      style="animation-delay: 2s;"></div>

    <!-- Noise Texture Overlay -->
    <div
      class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
    </div>

    <div class="relative z-10 w-full max-w-2xl md:max-w-6xl mx-auto">
      <div class="mb-10 flex items-center gap-4 group">
        <div class="w-10 h-[1px] bg-indigo-500 group-hover:w-16 transition-all duration-700"></div>
        <span class="text-[10px] uppercase tracking-[0.6em] text-indigo-400 font-bold">Die Vision</span>
      </div>

      <div class="mb-12">
        <h2 class="reveal-text text-4xl md:text-7xl font-black leading-[1.1] tracking-tighter font-syne italic mb-8">
          <!-- Row 1: Separate wrappers for each word to prevent overlap -->
          <div class="flex flex-wrap gap-x-3 md:gap-x-5 mb-2 md:mb-0">
            <span class="inline-block overflow-hidden">
              <span class="inline-block translate-y-full pr-2">Frische </span>
            </span>
            <span class="inline-block overflow-hidden text-3xl md:text-7xl">
              <span class="inline-block not-italic text-white/10  outline-text translate-y-full ">Perspektiven.</span>
            </span>
          </div>

          <!-- Row 2 -->
          <div class="block overflow-hidden ">
            <span class="inline-block translate-y-full">Zukunfts- orientiert.</span>
          </div>

          <!-- Row 3 -->
          <div class="block overflow-hidden">
            <span class="gradient-text inline-block translate-y-full pr-2">KI-gestützte Logik.</span>
          </div>
        </h2>
      </div>

      <div class="max-w-4xl">
        <p
          class="reveal-p text-lg md:text-3xl text-white/30 leading-[1.5] md:leading-[1.6] font-light tracking-tight break-words">
          Ich stehe am Anfang einer aufregenden Reise und nutze die Dynamik <span
            class="text-white/80 font-medium border-b border-indigo-500/30">modernster Technologien</span>.
          Durch die Integration von
          <span class="text-indigo-400 italic font-medium">KI-gestützten Workflows</span>
          schaffe ich effiziente und skalierbare Lösungen.
          <br class="hidden md:block mb-6">
          <span
            class="reveal-p text-lg md:text-3xl text-white/30 leading-[1.5] md:leading-[1.6] font-light tracking-tight break-words">
            Mein Weg ist geprägt von unstillbarer Neugier
            und dem Drang,
            Innovationen heute schon Realität werden zu lassen.</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const aboutSection = ref(null);

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Create a sequential timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: aboutSection.value,
      pin: true,
      start: "top top",
      end: "+=140%",
      scrub: 1,
    }
  });

  // 1. Heading Reveal: Target all inner spans that have the translate class
  tl.to(".reveal-text span.translate-y-full", {
    y: 0,
    opacity: 1,
    stagger: 0.1,
    ease: "power2.out",
    duration: 1
  });

  // 2. Small pause between animations
  tl.to({}, { duration: 0.2 });

  // 3. Paragraph Reveal
  tl.fromTo(".reveal-p",
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 1
    }
  );
});
</script>

<style scoped>
section {
  font-family: 'Inter', sans-serif;
}

h2 {
  font-family: 'Syne', sans-serif;
}

.outline-text {
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
  transition: all 0.5s ease;
}

.reveal-text:hover .outline-text {
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
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

/* Custom easing for smoother appearance */
.reveal-p {
  transition: color 0.7s ease;
}
</style>
