import { goto } from '$app/navigation';
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { workbulge } from '$lib/utils/stores';

const bulge = {factor: 0};
workbulge.subscribe(value => {
  bulge.factor = value;
})

export function initWorkPage( h1: HTMLElement, canvasImgElems: Array<HTMLElement>) {
      
  workbulge.set(0.25);
    
  gsap.registerPlugin( SplitText );
      
  const h1Text = h1?.innerHTML || '';
  h1.innerHTML = h1Text + h1Text + h1Text + h1Text || '';
  h1.style.overflow = 'hidden';
  h1.style.whiteSpace = 'nowrap';
  const spans = Array.from(h1.querySelectorAll('span'));
  spans.forEach((span) => {
    gsap.set(span, { opacity: 0, y: window.innerHeight })
    gsap.to(span, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
    gsap.to(span, { xPercent: -100, duration: 4, ease: 'none', repeat: -1 })
  });

  gsap.set(canvasImgElems, {
    opacity: 0, yPercent: 100
  })
  
  gsap.to(canvasImgElems, {
    duration: 1,
    opacity: 1,
    yPercent: 0,
    stagger: 0.05,
    ease: 'elastic.out(0.75, 0.5)',
    delay: 0.3
  })

  return {
    text: spans,
    images: canvasImgElems
  }
}

export function workClickHandler(e:Event){
  e.preventDefault();
  const target = e.target as HTMLElement;
  const originalLink = target.getAttribute('href') as string;
  const targetImg = target.querySelector('.workhero') as HTMLElement;
  const targetImgRect = targetImg.getBoundingClientRect();
  const targetImgAspectRatio = targetImgRect.width / targetImgRect.height;
  target.classList.add('active');
  targetImg.style.width = `${targetImgRect.width}px`;
  targetImg.style.height = `${targetImgRect.height}px`;
  targetImg.style.top = `${targetImgRect.top}px`;
  targetImg.style.left = `${targetImgRect.left}px`;
  const clone = targetImg.cloneNode(true) as HTMLElement;
  targetImg.parentElement?.insertBefore(clone, targetImg);
  targetImg.style.position = 'fixed';


  gsap.to('.work:not(.active) .workhero', {
    duration: .3,
    opacity: 0,
    yPercent: 10,
    ease: 'power4.out',
  })
  gsap.set(targetImg, {
    zIndex: 100,
  })
  gsap.to(targetImg, {
    duration: .3,
    top: 0,
    left: 0,
    width: window.innerWidth,
    height: window.innerWidth / targetImgAspectRatio,
    ease: 'circ.inOut',
    delay: 0.3,
  })
  gsap.to(bulge, {
    duration: .3,
    factor: 0,
    ease: 'circ.inOut',
    onUpdate: () => {
      workbulge.set(bulge.factor);
    }
  })
  gsap.to('h1 span', {
    duration: .3,
    yPercent: -100,
    opacity: 0,
    ease: 'circ.inOut',
  })

  setTimeout(() => {
    goto(originalLink);
  }, 600);
}