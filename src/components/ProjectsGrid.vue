<template>
  <section
    class="w-full min-h-screen py-12 md:py-48 bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">
    <!-- Background subtle detail -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-500/20 blur-[100px] rounded-full">
      </div>
    </div>

    <div class="relative z-10 text-center flex flex-col items-center">
      <!-- Loading Icon -->
      <div class="mb-10 relative">
        <svg class="w-12 h-12 md:w-16 md:h-16 animate-spin text-white/20" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_15px_#6366f1]"></div>
        </div>
      </div>

      <div class="overflow-hidden mb-6">
        <h2 class="text-3xl md:text-6xl font-black uppercase tracking-tighter loading-text italic">
          Portfolio wird aktualisiert
        </h2>
      </div>

      <p class="text-white/40 text-sm md:text-lg max-w-md tracking-wide leading-relaxed font-light">
        Neue Projekte werden hochgeladen... <br> Schauen Sie bald wieder vorbei.
      </p>

      <!-- Minimal Progress Bar -->
      <div class="mt-16 w-32 md:w-48 h-1 bg-white/5 rounded-full overflow-hidden">
        <div class="h-full bg-indigo-500/50 animate-loading-bar"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".loading-text", {
    y: 60,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".loading-text",
      start: "top 90%",
    }
  });
});
</script>

<style scoped>
.animate-loading-bar {
  animation: loading 3s infinite ease-in-out;
  width: 30%;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(400%);
  }
}

section {
  font-family: 'Inter', sans-serif;
}

h2 {
  font-family: 'Syne', sans-serif;
}
</style>
