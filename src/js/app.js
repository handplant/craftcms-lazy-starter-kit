import 'glightbox/dist/css/glightbox.min.css';
import '../css/app.css';
import EmblaCarousel from 'embla-carousel';
import GLightbox from 'glightbox';

// START
document.documentElement.classList.add('js-enabled');
console.log(
  '%cMade with Craft CMS and 🤍 by Andi Grether / webworker.me',
  'font-size: 13px; font-weight: bold; color: #fff; background-color: #e5422b; padding: 10px 12px; margin: 5px 0;'
);

//EMBLA SLIDER
const rootNodes = document.querySelectorAll('.embla');
const options = { loop: true, align: 'center' };

function setupEmblaDots(embla, dotsRoot) {
  const slidesCount = embla.slideNodes().length;
  const dots = [];

  // Create dots
  for (let i = 0; i < slidesCount; i++) {
    const btn = document.createElement('button');
    btn.className = 'embla__dot';
    btn.type = 'button';
    btn.setAttribute('aria-label', `Gehe zu Folie ${i + 1}`);
    btn.addEventListener('click', () => embla.scrollTo(i));
    dotsRoot.appendChild(btn);
    dots.push(btn);
  }

  const setSelectedDot = () => {
    const selected = embla.selectedScrollSnap();
    dots.forEach((dot, i) => {
      const isSelected = i === selected;
      dot.classList.toggle('is-selected', isSelected);

      if (isSelected) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });
  };

  embla.on('select', setSelectedDot);
  embla.on('init', setSelectedDot);
}

rootNodes.forEach((rootNode) => {
  const viewportNode = rootNode.querySelector('.embla__viewport');
  const prevButtonNode = rootNode.querySelector('.embla__prev');
  const nextButtonNode = rootNode.querySelector('.embla__next');
  const dotsRoot = rootNode.querySelector('.embla__dots');

  if (!viewportNode) {
    return;
  }

  const embla = EmblaCarousel(viewportNode, options);
  prevButtonNode?.addEventListener('click', () => embla.scrollPrev());
  nextButtonNode?.addEventListener('click', () => embla.scrollNext());

  // Dots
  if (dotsRoot) {
    setupEmblaDots(embla, dotsRoot);
  }
});

// GLIGHTBOX
let lastGalleryTrigger = null;

document.querySelectorAll('[data-gallery]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    lastGalleryTrigger = trigger;
    trigger.blur();
  });
});

const lightbox = GLightbox({
  selector: '[data-gallery]',
  touchNavigation: true,
  loop: true,
  zoomable: false,
  openEffect: 'fade',
  onClose: () => {
    lastGalleryTrigger?.focus();
  },
});
