<template>
  <header ref="bar" class="nav fixed top-4 right-4 md:top-6 md:right-8 z-[100]">
    <nav class="flex items-center gap-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 p-1.5 shadow-lg"
      :aria-label="t.nav.menu">
      <!-- Desktop links -->
      <button v-for="item in items" :key="item.id" type="button" @click="go(item.id)"
        class="hidden md:inline-flex px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/10 transition-colors">
        {{ item.label }}
      </button>

      <a v-if="cvUrl" :href="cvUrl" target="_blank" rel="noopener" download
        class="hidden md:inline-flex px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-indigo-500 text-white hover:bg-indigo-400 transition-colors">
        {{ t.nav.cv }} ↓
      </a>

      <button type="button" @click="toggleLang" :aria-label="t.nav.switchLang" :title="t.nav.switchLang"
        class="px-3 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors">
        <span :class="lang === 'de' ? 'text-white' : 'text-white/60'">DE</span>
        <span class="text-white/25 mx-1">/</span>
        <span :class="lang === 'en' ? 'text-white' : 'text-white/60'">EN</span>
      </button>

      <!-- Mobile menu button -->
      <button type="button" @click="open = true" :aria-label="t.nav.menu" aria-haspopup="dialog" :aria-expanded="open"
        class="md:hidden px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white text-black">
        {{ t.nav.menu }}
      </button>
    </nav>
  </header>

  <!-- Mobile full-screen menu -->
  <Transition name="menu" @after-enter="animateLinks">
    <div v-if="open" class="fixed inset-0 z-[110] bg-black text-white flex flex-col px-6 py-6 md:hidden" role="dialog"
      aria-modal="true" @keydown.esc="open = false">
      <div class="flex justify-end">
        <button ref="closeBtn" type="button" @click="open = false"
          class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white text-black">
          {{ t.nav.close }}
        </button>
      </div>

      <ul class="flex-1 flex flex-col justify-center gap-4">
        <li v-for="(item, i) in items" :key="item.id" class="overflow-hidden">
          <button type="button" @click="go(item.id)"
            class="menu-link flex items-baseline gap-4 font-syne font-black uppercase italic tracking-tighter text-4xl">
            <span class="text-xs not-italic text-indigo-400 tabular-nums">0{{ i + 1 }}</span>{{ item.label }}
          </button>
        </li>
      </ul>

      <a v-if="cvUrl" :href="cvUrl" target="_blank" rel="noopener" download
        class="self-start mb-4 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-indigo-500 text-white">
        {{ t.nav.cv }} ↓
      </a>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../i18n';
import { cvUrl } from '../personalFiles';
import { scrollToTarget } from '../smoothScroll';

const { t, lang, setLang } = useI18n();

const bar = ref<HTMLElement | null>(null);
const closeBtn = ref<HTMLElement | null>(null);
const open = ref(false);

const items = computed(() => [
  { id: 'about-section', label: t.value.nav.about },
  { id: 'skills', label: t.value.nav.skills },
  { id: 'experience', label: t.value.nav.experience },
  { id: 'projects', label: t.value.nav.projects },
  { id: 'contact', label: t.value.nav.contact },
]);

const toggleLang = () => setLang(lang.value === 'de' ? 'en' : 'de');

const go = (id: string) => {
  open.value = false;
  // Wait for the menu to close before scrolling
  nextTick(() => scrollToTarget(id));
};

const animateLinks = () => {
  closeBtn.value?.focus();
  gsap.from('.menu-link', { yPercent: 110, duration: 0.7, stagger: 0.06, ease: 'expo.out' });
};

// Lock page scroll while the mobile menu is open
watch(open, (isOpen) => {
  document.documentElement.style.overflow = isOpen ? 'hidden' : '';
});

let hideTrigger: ScrollTrigger | undefined;

onMounted(() => {
  // Hide while scrolling down, show again when scrolling up
  hideTrigger = ScrollTrigger.create({
    start: 'top -120',
    end: 'max',
    onUpdate: (self) => {
      gsap.to(bar.value, {
        yPercent: self.direction === 1 ? -180 : 0,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: true,
      });
    },
    onLeaveBack: () => gsap.to(bar.value, { yPercent: 0, duration: 0.3, overwrite: true }),
  });
});

onUnmounted(() => {
  hideTrigger?.kill();
  document.documentElement.style.overflow = '';
});
</script>

<style scoped>
.nav {
  font-family: 'Inter', sans-serif;
}

.font-syne {
  font-family: 'Syne', sans-serif;
}

.menu-enter-active,
.menu-leave-active {
  transition: clip-path 0.6s cubic-bezier(0.76, 0, 0.24, 1);
}

.menu-enter-from,
.menu-leave-to {
  clip-path: inset(0 0 100% 0);
}

.menu-enter-to,
.menu-leave-from {
  clip-path: inset(0 0 0% 0);
}
</style>
