import '../css/app.css'
import 'glightbox/dist/css/glightbox.css'
import 'highlight.js/styles/github-dark.css'
import { animate, stagger, onScroll } from 'animejs'
import EmblaCarousel from 'embla-carousel'
import GLightbox from 'glightbox'
import hljs from 'highlight.js/lib/core'
import twig from 'highlight.js/lib/languages/twig'
import bash from 'highlight.js/lib/languages/bash'
import xml from 'highlight.js/lib/languages/xml'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('twig', twig)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)

// START
document.documentElement.classList.add('js-enabled')
console.log(
  '%cMade with Craft CMS and 🤍 by Andi Grether / webworker.me',
  'font-size: 13px; font-weight: bold; color: #fff; background-color: #e5422b; padding: 10px 12px; margin: 5px 0;',
)

//EMBLA SLIDER
const rootNodes = document.querySelectorAll('.embla')
const options = { loop: true, align: 'center' }

function setupEmblaDots (embla, dotsRoot) {
  const slidesCount = embla.slideNodes().length
  const dots = []

  // Create dots
  for (let i = 0; i < slidesCount; i++) {
    const btn = document.createElement('button')
    btn.className = 'embla__dot'
    btn.type = 'button'
    btn.addEventListener('click', () => embla.scrollTo(i))
    dotsRoot.appendChild(btn)
    dots.push(btn)
  }

  const setSelectedDot = () => {
    const selected = embla.selectedScrollSnap()
    dots.forEach((dot, i) =>
      dot.classList.toggle('is-selected', i === selected),
    )
  }

  embla.on('select', setSelectedDot)
  embla.on('init', setSelectedDot)
}

rootNodes.forEach((rootNode) => {
  const viewportNode = rootNode.querySelector('.embla__viewport')
  const prevButtonNode = rootNode.querySelector('.embla__prev')
  const nextButtonNode = rootNode.querySelector('.embla__next')
  const dotsRoot = rootNode.querySelector('.embla__dots')

  if (!viewportNode) {
    return
  }

  const embla = EmblaCarousel(viewportNode, options)
  prevButtonNode?.addEventListener('click', () => embla.scrollPrev())
  nextButtonNode?.addEventListener('click', () => embla.scrollNext())

  // Dots
  if (dotsRoot) {
    setupEmblaDots(embla, dotsRoot)
  }
})

// CODEBLOCK
document.addEventListener('DOMContentLoaded', () => {
  hljs.highlightAll()
})

// GLIGHTBOX
const lightbox = GLightbox({
  selector: '[data-gallery]',
  touchNavigation: true,
  loop: true,
  zoomable: false,
  openEffect: 'fade',
})

// ANIMEJS
document.addEventListener('DOMContentLoaded', () => {
  const groups = document.querySelectorAll('[data-animate-group]')

  const effects = {
    'fade-up': { opacity: [0, 1], translateY: [50, 0], duration: 800, easing: 'easeOutElastic(1, .5)' },
    'fade-in': { opacity: [0, 1], duration: 800, easing: 'easeOutElastic(1, .5)' },
    'slide-left': { opacity: [0, 1], translateX: [-60, 0], duration: 800, easing: 'easeOutExpo' },
    'slide-right': { opacity: [0, 1], translateX: [60, 0], duration: 800, easing: 'easeOutExpo' },
    'zoom-in': { opacity: [0, 1], scale: [0.9, 1], duration: 800, easing: 'easeOutElastic(1, .5)' },
  }

  groups.forEach((group) => {
    const elements = group.querySelectorAll('[data-animate]')
    if (!elements.length) {
      return
    }

    elements.forEach((el, i) => {
      const type = el.dataset.animate
      const animation = effects[type] || effects['fade-in']

      animate(el, {
        ...animation,
        delay: i * 150,
        autoplay: onScroll({
          target: group,
          enter: '80% 0%',
          once: true,
          debug: false,
        }),
      })
    })
  })
})
