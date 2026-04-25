<template>
  <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#BFC6C4]">
    <!-- Grid Overlay -->
    <div ref="grid" class="absolute inset-0 grid-pattern opacity-10"></div>

    <!-- Blob 1: Center/Top Left (Large White) -->
    <div ref="blob1"
      class="absolute top-[-10%] left-[-10%] w-[100vw] h-[100vw] bg-white opacity-60 blur-[120px] rounded-full">
    </div>

    <!-- Blob 2: Center/Right (Soft Deep Grey) -->
    <div ref="blob2"
      class="absolute top-[20%] left-[40%] w-[80vw] h-[80vw] bg-black opacity-[0.08] blur-[100px] rounded-full">
    </div>

    <!-- Blob 3: Bottom Left (Accent White) -->
    <div ref="blob3"
      class="absolute bottom-[-20%] left-[10%] w-[90vw] h-[90vw] bg-white opacity-40 blur-[150px] rounded-full">
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const blob1 = ref<HTMLElement | null>(null);
const blob2 = ref<HTMLElement | null>(null);
const blob3 = ref<HTMLElement | null>(null);
const grid = ref<HTMLElement | null>(null);

onMounted(() => {
  // Parallax for Grid
  gsap.to(grid.value, {
    xPercent: -5,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    }
  });

  // Sync with the same scroll progress as the horizontal pinning in App.vue
  // We use a small delay to ensure ScrollTrigger distance is calculated after App.vue pinning
  setTimeout(() => {
    gsap.to(blob1.value, {
      xPercent: -30,
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    gsap.to(blob2.value, {
      xPercent: 40,
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    gsap.to(blob3.value, {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      }
    });
  }, 100);
});
</script>

<style scoped>
.grid-pattern {
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  width: 150vw; /* Wider to allow for scroll parallax */
  height: 100vh;
}

div {
  will-change: transform;
}
</style>
