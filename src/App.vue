<template>
    <Transition name="fade">
        <Preloader v-if="isLoading" @finish="handleFinish" />
        <div v-else class="relative bg-black">
            <BackgroundBlobs />
            <CustomCursor />

            <!-- Section 1: Hero (Sticky) -->
            <section class="sticky top-0  z-0">
                <Hero />
            </section>

            <!-- Section 2: About (Pinning handled by GSAP) -->
            <section class="relative ">
                <About />
            </section>

            <!-- Section 3: Experience (Scrolls over About naturally after GSAP pin) -->
            <section class="relative z-20">
                <Experience />
            </section>

            <!-- Section 4: Projects (Sticky - Scrolls over Experience) -->
            <section class="sticky top-0 h-screen z-30">
                <ProjectsGrid />
            </section>

            <!-- Section 5: Footer (Normal scroll at the end) -->
            <section class="relative z-40">
                <Footer />
            </section>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Preloader from './components/Preloader.vue';
import Hero from './components/Hero.vue';
import About from './components/About.vue';
import Experience from './components/Experience.vue';
import ProjectsGrid from './components/ProjectsGrid.vue';
import BackgroundBlobs from './components/BackgroundBlobs.vue';
import CustomCursor from './components/CustomCursor.vue';
import Footer from './components/Footer.vue';



const isLoading = ref(true);

const handleFinish = () => {
    isLoading.value = false;

};
</script>