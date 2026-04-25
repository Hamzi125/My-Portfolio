<template>
  <section
    class="w-full h-screen px-4 md:px-12 lg:px-24 bg-[#f8f9fc] relative z-10 overflow-hidden flex flex-col justify-center"
    id="experience">
    <!-- Ambient glow -->
    <div
      class="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-300/30 rounded-full blur-[120px] pointer-events-none">
    </div>

    <div class="max-w-5xl mx-auto w-full relative h-[85vh] mt-[5vh] flex flex-col">
      <div class="mb-4 md:mb-8 text-center md:text-left flex-shrink-0">
        <span
          class="text-[10px] md:text-sm uppercase tracking-[0.6em] text-black/30 font-bold block mb-2 md:mb-4">Werdegang</span>
        <h2 class="text-4xl md:text-6xl font-black uppercase tracking-tighter text-indigo-400 font-syne italic">
          Stationen
        </h2>
      </div>

      <!-- Container for absolute cards -->
      <div class="relative w-full flex-grow mt-5">
        <div v-for="(exp, index) in experience" :key="index"
          class="absolute inset-x-0 top-0 w-full exp-card-container will-change-transform" :style="{ zIndex: index }">

          <div
            class="exp-card w-full h-[65vh] md:h-[65vh] flex flex-col justify-between p-6 md:p-14 rounded-[2rem] md:rounded-[3.5rem] border border-white/10 shadow-[0_-10px_50px_rgba(0,0,0,0.15)] relative overflow-hidden origin-top backdrop-blur-2xl"
            :class="exp.bgColor">

            <!-- Glass Overlay -->
            <div class="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none"></div>

            <div class="flex justify-between items-start mb-4 md:mb-8 relative z-10">
              <span
                class="text-[10px] md:text-sm font-bold uppercase tracking-widest text-white/90 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-sm">{{
                  exp.date }}</span>
              <span class="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-white/50">{{ exp.company
              }}</span>
            </div>

            <div class="relative z-10 flex-grow flex flex-col justify-center">
              <h3
                class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 font-syne tracking-tighter leading-tight text-white drop-shadow-lg">
                {{ exp.title }}
              </h3>

              <ul class="space-y-2 md:space-y-4">
                <li v-for="point in exp.points" :key="point"
                  class="text-[11px] sm:text-xs md:text-lg text-white/80 flex gap-2 md:gap-4 items-start leading-relaxed font-light">
                  <span
                    class="w-1 h-1 md:w-2 md:h-2 rounded-full bg-indigo-400 mt-1.5 md:mt-2.5 flex-shrink-0 opacity-80 shadow-[0_0_10px_rgba(129,140,248,0.8)]"></span>
                  {{ point }}
                </li>
              </ul>
            </div>

            <!-- Background element for depth -->
            <div
              class="absolute -bottom-32 -right-32 w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl pointer-events-none">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const experience = [
  {
    date: "2024 – 2026",
    title: "Fachinformatiker (AE)",
    company: "Umschulung IHK",
    points: [
      "Fokus auf Softwarearchitektur, Clean Code & moderne Web-Stacks.",
      "Entwicklung komplexer Applikationen und praxisnahe Projektarbeit."
    ],
    bgColor: "bg-[#0f0f13]"
  },
  {
    date: "2023 – 2024",
    title: "Softwareentwickler",
    company: "Praktikum",
    points: [
      "Aktive Mitarbeit in der agilen Softwareentwicklung (Scrum).",
      "Praktische Erfahrung in Team-Projekten und Versionskontrolle."
    ],
    bgColor: "bg-[#181824]"
  },
  {
    date: "Seit 2024",
    title: "Webentwickler",
    company: "Freelance",
    points: [
      "Entwicklung maßgeschneiderter Web-Lösungen nach exakten Kundenanforderungen.",
      "Ganzheitliche Projektbetreuung (Full-Service) für höchste Kundenzufriedenheit."
    ],
    bgColor: "bg-indigo-950"
  }
];

let ctx: gsap.Context;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  ctx = gsap.context(() => {
    // Title animation
    gsap.from("h2", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "h2",
        start: "top 85%",
      }
    });

    const containers = gsap.utils.toArray('.exp-card-container') as HTMLElement[];

    // Position the cards: first card is visible, the others are pushed down out of view
    gsap.set(containers, {
      y: (i) => i === 0 ? "0vh" : "120vh",
    });

    // Create a pinned timeline for the card stacking animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#experience",
        start: "top top",
        end: "+=200%", // The user will scroll for 2 screens while the section is pinned
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    // Animate Card 2 sliding up
    tl.to(containers[0].querySelector('.exp-card'), {
      scale: 0.9,
      opacity: 0.6,
      filter: "blur(4px)",
      y: -20,
      ease: "none"
    }, "card2")
      .to(containers[1], {
        y: 0,
        ease: "none"
      }, "card2");

    // Animate Card 3 sliding up
    tl.to(containers[1].querySelector('.exp-card'), {
      scale: 0.95,
      opacity: 0.8,
      filter: "blur(2px)",
      y: -10,
      ease: "none"
    }, "card3")
      .to(containers[2], {
        y: 0,
        ease: "none"
      }, "card3");
  });
});

onUnmounted(() => {
  ctx.revert();
});
</script>

<style scoped>
.font-syne {
  font-family: 'Syne', sans-serif;
}

section {
  font-family: 'Inter', sans-serif;
}
</style>