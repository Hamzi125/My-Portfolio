<template>
  <!-- Changed from fixed to absolute to live inside Hero -->
  <div class="absolute inset-0 pointer-events-none z-[50] overflow-hidden" ref="container">

    <!-- TOP ROW -->
    <div class="sticker absolute top-[12%] left-[10%] pointer-events-auto cursor-grab active:cursor-grabbing"
      @click="handleCoder" ref="s1">
      <div class="sticker-content relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
        <svg class="w-full h-full animate-spin-slow opacity-10" viewBox="0 0 100 100">
          <defs>
            <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
          </defs>
          <text class="text-[10px] uppercase font-bold tracking-widest fill-black">
            <textPath xlink:href="#circlePath">• DESIGN • CODE • CREATE • INNOVATE</textPath>
          </text>
        </svg>
        <div
          class="absolute inset-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex flex-col items-center justify-center shadow-xl">
          <span class="text-xl md:text-2xl">👨‍💻</span>
          <span class="msg opacity-0 text-[8px] font-black absolute top-25 tracking-tighter text-black">READY TO
            CODE!</span>
        </div>
      </div>
    </div>

    <div
      class="sticker absolute top-[12%] left-1/2 -translate-x-1/2 pointer-events-auto cursor-grab active:cursor-grabbing"
      @click="handleUX" ref="s3">
      <div
        class="sticker-content w-14 h-14 md:w-16 md:h-16 bg-black text-white rounded-2xl flex flex-col items-center justify-center rotate-6 shadow-2xl relative">
        <span class="font-black text-[10px] md:text-xs">UX/UI</span>
        <span class="msg opacity-0 text-[8px] font-black absolute -bottom-6 text-black uppercase tracking-tighter">Pixel
          Perfect</span>
      </div>
    </div>

    <div class="sticker absolute top-[12%] right-[10%] pointer-events-auto cursor-grab active:cursor-grabbing"
      @click="handleStar" ref="s6">
      <div
        class="sticker-content w-10 h-10 md:w-14 md:h-14 bg-indigo-500/20 backdrop-blur-md border border-indigo-500/30 rounded-full flex items-center justify-center shadow-lg relative">
        <svg class="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span
          class="msg opacity-0 text-[8px] font-black absolute -top-4 text-indigo-600 uppercase tracking-tighter">Awesome!</span>
      </div>
    </div>

    <!-- BOTTOM ROW -->
    <div class="sticker absolute bottom-[15%] left-[10%] pointer-events-auto cursor-grab active:cursor-grabbing"
      @click="handleHello" ref="s4">
      <div
        class="sticker-content w-14 h-14 md:w-18 md:h-18 bg-yellow-100/50 backdrop-blur-sm border border-yellow-200/50 rounded-full flex items-center justify-center text-xl md:text-2xl shadow-lg relative wave-anim">
        👋
        <span
          class="msg opacity-0 text-[10px] font-black absolute -top-6 text-yellow-700 uppercase tracking-tighter">Hello!</span>
      </div>
    </div>

    <div
      class="sticker absolute bottom-[15%] left-1/2 -translate-x-1/2 pointer-events-auto cursor-grab active:cursor-grabbing"
      @click="handleHire" ref="s2">
      <div
        class="sticker-content px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-3 shadow-lg relative">
        <div class="w-1.5 h-1.5 bg-[#1fb401] rounded-full animate-pulse shadow-[0_0_10px_#1fb401]"></div>
        <span class="text-[10px] font-bold uppercase tracking-widest text-black/60">Available</span>
        <span class="msg opacity-0 text-[8px] font-black absolute -top-6 text-green-600 uppercase tracking-tighter">Hire
          Me!</span>
      </div>
    </div>

    <div class="sticker absolute bottom-[15%] right-[10%] pointer-events-auto cursor-grab active:cursor-grabbing"
      @click="handleCoffee" ref="s5">
      <div
        class="sticker-content p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg flex flex-col items-center gap-1 relative">
        <span class="text-xl">☕</span>
        <span
          class="msg opacity-0 text-[8px] font-black absolute -top-6 text-brown-600 uppercase whitespace-nowrap tracking-tighter">Refilling...</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(Draggable);

const container = ref(null);
const s1 = ref(null); const s2 = ref(null); const s3 = ref(null);
const s4 = ref(null); const s5 = ref(null); const s6 = ref(null);

const showMsg = (target: HTMLElement) => {
  const msg = target.querySelector('.msg');
  if (!msg) return;
  gsap.fromTo(msg, { opacity: 0, y: 5 }, { opacity: 0.6, y: 0, duration: 0.4, ease: "power2.out" });
  gsap.to(msg, { opacity: 0, y: -5, duration: 0.4, delay: 1.2, ease: "power2.in" });
}

const createParticles = (x: number, y: number) => {
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    p.className = 'absolute w-1.5 h-1.5 bg-indigo-500 rounded-full pointer-events-none z-[200]';
    document.body.appendChild(p);
    const angle = (i / 8) * Math.PI * 2;
    const velocity = 50 + Math.random() * 50;
    gsap.fromTo(p, { x, y, scale: 1, opacity: 1 }, {
      x: x + Math.cos(angle) * velocity,
      y: y + Math.sin(angle) * velocity,
      scale: 0, opacity: 0, duration: 0.8, ease: "power2.out",
      onComplete: () => p.remove()
    });
  }
};

const handleCoder = (e: MouseEvent) => {
  const content = (e.currentTarget as HTMLElement).querySelector('.sticker-content');
  showMsg(e.currentTarget as HTMLElement);
  createParticles(e.clientX, e.clientY);
  gsap.to(content, { scale: 1.15, duration: 0.3, ease: "power2.out", yoyo: true, repeat: 1 });
};

const handleHire = (e: MouseEvent) => {
  showMsg(e.currentTarget as HTMLElement);
  createParticles(e.clientX, e.clientY);
  const glow = (e.currentTarget as HTMLElement).querySelector('.w-1.5');
  gsap.to(glow, { scale: 2, duration: 0.4, yoyo: true, repeat: 1 });
};

const handleUX = (e: MouseEvent) => {
  const content = (e.currentTarget as HTMLElement).querySelector('.sticker-content');
  showMsg(e.currentTarget as HTMLElement);
  createParticles(e.clientX, e.clientY);
  gsap.to(content, { rotationY: 180, duration: 0.6, ease: "power1.inOut", yoyo: true, repeat: 1 });
};

const handleHello = (e: MouseEvent) => {
  showMsg(e.currentTarget as HTMLElement);
  createParticles(e.clientX, e.clientY);
  gsap.to(e.currentTarget, { rotation: 15, scale: 1.1, duration: 0.3, yoyo: true, repeat: 1 });
};

const handleCoffee = (e: MouseEvent) => {
  const content = (e.currentTarget as HTMLElement).querySelector('.sticker-content');
  showMsg(e.currentTarget as HTMLElement);
  createParticles(e.clientX, e.clientY);
  gsap.to(content, { y: -5, duration: 0.2, repeat: 3, yoyo: true, ease: "sine.inOut" });
};

const handleStar = (e: MouseEvent) => {
  const content = (e.currentTarget as HTMLElement).querySelector('.sticker-content');
  showMsg(e.currentTarget as HTMLElement);
  createParticles(e.clientX, e.clientY);
  gsap.to(content, { scale: 1.3, rotation: 45, duration: 0.4, yoyo: true, repeat: 1, ease: "power1.out" });
};

onMounted(() => {
  const stickers = [s1.value, s2.value, s3.value, s4.value, s5.value, s6.value];
  stickers.forEach((s) => {
    if (!s) return;
    Draggable.create(s, {
      type: "x,y", bounds: container.value, inertia: true,
      onDragStart: function () { gsap.to(this.target, { scale: 1.05, duration: 0.3 }); },
      onDragEnd: function () { gsap.to(this.target, { scale: 1, duration: 0.3 }); }
    });
    // Enhanced Soft Floating Animation
    gsap.to(s, {
      y: `random(-12, 12)`,
      x: `random(-8, 8)`,
      rotation: `random(-5, 5)`,
      duration: `random(3, 5)`,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: Math.random() * 2 // Stagger the start times
    });
  });
});
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 30s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.sticker {
  will-change: transform;
  touch-action: none;
}

.sticker-content {
  transform-style: preserve-3d;
}
</style>
