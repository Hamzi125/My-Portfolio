<template>
  <footer id="contact"
    class="relative z-20 w-full bg-white text-black py-16 md:py-24 px-6 md:px-24 overflow-hidden border-t border-black/5">

    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-16">

      <div class="flex-1 w-full">
        <div class="overflow-hidden mb-6">
          <span
            class="footer-label inline-block text-[10px] md:text-xs uppercase tracking-[0.6em] text-indigo-500 font-bold">
            {{ t.footer.label }}
          </span>
        </div>
        <h2
          class="footer-title text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[1.1] md:leading-none font-syne mb-8 md:mb-12">
          {{ t.footer.titleA }} <br> <span class="text-black/20">{{ t.footer.titleB }}</span> <br> {{ t.footer.titleC }}
        </h2>

        <div class="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 md:gap-16 font-medium text-base md:text-lg">
          <a v-for="link in links" :key="link.href" :href="link.href"
            :target="link.external ? '_blank' : undefined" :rel="link.external ? 'noopener' : undefined"
            :download="link.download || undefined"
            class="group relative h-6 md:h-7 overflow-hidden inline-flex items-start w-max">
            <div class="flex flex-col transition-transform duration-500 group-hover:-translate-y-1/2">
              <span class="h-6 md:h-7 flex items-center">{{ link.label }}</span>
              <span class="h-6 md:h-7 flex items-center text-indigo-600 italic">{{ link.label }}</span>
            </div>
          </a>
        </div>
      </div>

      <div class="w-full md:w-auto flex flex-col items-start md:items-end gap-8 md:gap-12 mt-4 md:mt-0">
        <!-- Back to top button -->
        <button @click="scrollToTarget(0)"
          class="w-24 h-24 md:w-40 md:h-40 border border-black/10 rounded-full flex items-center justify-center p-4 md:p-8 group cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/50 transition-all duration-700 self-start md:self-end">
          <span
            class="text-[8px] md:text-[10px] uppercase tracking-widest text-center leading-relaxed text-black/60 group-hover:text-indigo-600 transition-colors">
            {{ backToTop[0] }} <br class="hidden md:block"> {{ backToTop[1] }}
          </span>
        </button>

        <div
          class="w-full flex flex-col items-start gap-2 text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-black/55">
          <span>HS.2026 Portfolio</span>
          <span>{{ t.footer.madeBy }}</span>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '../i18n';
import { cvUrl } from '../personalFiles';
import { scrollToTarget } from '../smoothScroll';

const { t } = useI18n();

const backToTop = computed(() => t.value.footer.backToTop.split('|'));

const links = computed(() => [
  { label: t.value.footer.email, href: 'mailto:hamza-alahmad@web.de', external: false, download: false },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hamza-alahmad-6509151bb/', external: true, download: false },
  { label: 'GitHub', href: 'https://github.com/Hamzi125', external: true, download: false },
  // Only shown when a PDF exists in src/assets/cv/
  ...(cvUrl ? [{ label: t.value.footer.cv, href: cvUrl, external: true, download: true }] : []),
]);
</script>

<style scoped>
.font-syne {
  font-family: 'Syne', sans-serif;
}

footer {
  font-family: 'Inter', sans-serif;
}
</style>
