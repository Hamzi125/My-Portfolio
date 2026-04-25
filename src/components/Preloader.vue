<template>
    <div v-if="isLoading" class="fixed inset-0 z-50 overflow-hidden pointer-events-none">

        <svg class="absolute top-0 left-0 w-full h-[100vh] fill-black" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path ref="overlayPath" d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z" />
        </svg>

        <div ref="contentWrapper" class="absolute inset-0 flex items-center justify-center p-4">
            <div class="w-full max-w-xl md:max-w-2xl">
                <svg ref="svgRef" viewBox="-150 -30 1400 400" class="w-full h-auto text-Cbrand fill-none stroke-current"
                    stroke-width="3" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M465,0v350h-90V213H227c-75.66,0-137,61.34-137,137v0H0V0h90v137h148c75.66,0,137-61.34,137-137v0H465z" />
                    <path
                        d="M832.5,275.5H623L585.5,350h-99L667,0h121.5l181,350h-16.09C902.27,350,855.49,321.18,832.5,275.5L832.5,275.5z M799,208.5 l-71-142l-71.5,142H799z" />
                    <path d="M1087.51,350L1087.51,350l-85.5,0v-67h18.5C1057.51,283,1087.51,313,1087.51,350z" />
                </svg>
            </div>
        </div>
    </div>


</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';

const svgRef = ref<SVGSVGElement | null>(null);
const overlayPath = ref<SVGPathElement | null>(null);
const contentWrapper = ref<HTMLDivElement | null>(null);
const isLoading = ref(true);

const emit = defineEmits(['finish']);

onMounted(() => {
    if (!svgRef.value || !overlayPath.value || !contentWrapper.value) return;

    const paths = svgRef.value.querySelectorAll('path');

    // تعريف المسارات للقوس (Curve Paths)
    const curvePath = "M 0 0 L 100 0 L 100 100 Q 50 0 0 100 Z";
    const endPath = "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z";

    const tl = gsap.timeline({
        onComplete: () => {
            isLoading.value = false;
            emit('finish');
        }
    });

    // المرحلة الأولى: رسم الخطوط (Stroke Animation)
    tl.fromTo(paths,
        { strokeDasharray: 6000, strokeDashoffset: 6000 },
        { strokeDashoffset: 0, duration: 2.5, stagger: 0.2, ease: "power2.inOut" }
    );

    // المرحلة الثانية: تعبئة اللون (Fill Animation)
    tl.to(paths, {
        fillOpacity: 1,
        fill: "white",
        duration: 1.2,
        stagger: 0.15
    }, "-=0.8");

    // المرحلة الثالثة: سحب الاسم للأعلى مع تلاشي (Fade out)
    tl.to(contentWrapper.value, {
        y: -150,
        opacity: 0,
        duration: 0.8,
        ease: "power4.in"
    }, "+=0.3");

    // المرحلة الرابعة: حركة الستارة المقوسة (The Swoosh Reveal)
    tl.to(overlayPath.value, {
        attr: { d: curvePath },
        duration: 0.7,
        ease: "power2.in"
    }, "-=0.7")
        .to(overlayPath.value, {
            attr: { d: endPath },
            duration: 0.7,
            ease: "power2.out"
        });
});
</script>