import { createApp } from 'vue'
import { inject } from '@vercel/analytics'
import './style.css'
import App from './App.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initSmoothScroll } from './smoothScroll'

inject()

gsap.registerPlugin(ScrollTrigger)

initSmoothScroll()

createApp(App).mount('#app')
