<template>
    <div class="hidden md:flex fixed top-0 left-0 w-8 h-8 border border-white mix-blend-difference rounded-full pointer-events-none z-[999] transition-transform duration-100 ease-out items-center justify-center"
        ref="cursor" :class="{ 'scale-[2]': isHovering }">
        <div class="w-1 h-1 bg-white rounded-full"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

const cursor = ref<HTMLElement | null>(null);
const isHovering = ref(false);

const moveCursor = (e: MouseEvent) => {
    if (!cursor.value) return;
    gsap.to(cursor.value, {
        x: e.clientX - 16,
        y: e.clientY - 16,
        duration: 0.5,
        ease: "power3.out"
    });
};

const handleMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a, button, [role="button"], .nav-link')) {
        isHovering.value = true;
    } else {
        isHovering.value = false;
    }
};

onMounted(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
    }
});

onUnmounted(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mouseover', handleMouseOver);
    }
});
</script>
