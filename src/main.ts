import { createApp } from 'vue'
import { inject } from '@vercel/analytics'
inject();
import './style.css'
import App from './App.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// Initialize Lenis
const lenis = new Lenis()

// Synchronize Lenis scrolling with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

// Add Lenis to the GSAP ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

// Correctly disable lag smoothing for consistent movement
gsap.ticker.lagSmoothing(0)

createApp(App).mount('#app')
