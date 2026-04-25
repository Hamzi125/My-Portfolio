<template>
  <footer class="relative z-20 w-full bg-white text-black py-16 md:py-24 px-6 md:px-24 overflow-hidden border-t border-black/5">

    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-16">

      <div class="flex-1 w-full">
        <div class="overflow-hidden mb-6">
          <span
            class="footer-label inline-block text-[10px] md:text-xs uppercase tracking-[0.6em] text-indigo-500 font-bold">
            Kontakt
          </span>
        </div>
        <h2
          class="footer-title text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[1.1] md:leading-none font-syne mb-8 md:mb-12">
          Lass uns <br class="  sm:block"> <span class="text-black/20">zusammen</span> <br> arbeiten
        </h2>

        <div class="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 md:gap-16 font-medium text-base md:text-lg">
          <a href="mailto:hamza-alahmad@web.de" class="group relative h-6 md:h-7 overflow-hidden inline-flex items-start w-max">
            <div class="flex flex-col transition-transform duration-500 group-hover:-translate-y-1/2">
              <span class="h-6 md:h-7 flex items-center">Email</span>
              <span class="h-6 md:h-7 flex items-center text-indigo-600 italic">Email</span>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/hamza-alahmad-6509151bb/"
            class="group relative h-6 md:h-7 overflow-hidden inline-flex items-start w-max">
            <div class="flex flex-col transition-transform duration-500 group-hover:-translate-y-1/2">
              <span class="h-6 md:h-7 flex items-center">LinkedIn</span>
              <span class="h-6 md:h-7 flex items-center text-indigo-600 italic">LinkedIn</span>
            </div>
          </a>
          <a href="https://github.com/Hamzi125" class="group relative h-6 md:h-7 overflow-hidden inline-flex items-start w-max">
            <div class="flex flex-col transition-transform duration-500 group-hover:-translate-y-1/2">
              <span class="h-6 md:h-7 flex items-center">GitHub</span>
              <span class="h-6 md:h-7 flex items-center text-indigo-600 italic">GitHub</span>
            </div>
          </a>
        </div>
      </div>

      <div class="w-full md:w-auto flex flex-col items-start md:items-end gap-8 md:gap-12 mt-4 md:mt-0">
        <!-- Back to top button -->
        <button @click="scrollToTop"
          class="w-24 h-24 md:w-48 md:h-48 border border-black/10 rounded-full flex items-center justify-center p-4 md:p-8 group cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/50 transition-all duration-700 self-start md:self-end">
          <span
            class="text-[8px] md:text-[10px] uppercase tracking-widest text-center leading-relaxed text-black/40 group-hover:text-indigo-600 transition-colors">Zurück
            <br class="hidden md:block"> nach oben</span>
        </button>

        <div
          class="flex flex-col items-start md:items-end gap-2 text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-black/30">
          <span>HS.2026 Portfolio</span>
          <span>Gestaltet mit ❤️ von Hamza Alahmad</span>
        </div>
      </div>

    </div>

    <!-- Background Decoration -->
    <div
      class="absolute -bottom-20 -right-20 w-64 h-64 md:w-96 md:h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none">
    </div>
  </footer>
</template>

<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<style scoped>
.font-syne {
  font-family: 'Syne', sans-serif;
}

footer {
  font-family: 'Inter', sans-serif;
}
</style>
