import { goto } from '$app/navigation';
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { workbulge } from '$lib/utils/stores';

const bulge = {factor: 0};
workbulge.subscribe(value => {
  bulge.factor = value;
})

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
  gsap.to('h1', {
    duration: .3,
    yPercent: -200,
    ease: 'circ.inOut',
  })

  setTimeout(() => {
    goto(originalLink);
  }, 600);
}

export function initWorkPage( h1: HTMLElement, canvasImgElems: Array<HTMLElement>) {
      
  workbulge.set(0.25);
    
  gsap.registerPlugin( SplitText );
      
  console.log('initWorkPage:', h1);
  const h1Text = h1?.innerHTML || '';
  h1.innerHTML = h1Text + h1Text + h1Text + h1Text || '';
  h1.style.overflow = 'hidden';
  h1.style.whiteSpace = 'nowrap';

  h1.querySelectorAll('span').forEach((span) => {
    gsap.to(span, {xPercent: -100, duration: 4, ease: 'none', repeat: -1 })
  });

  const split = new SplitText(h1, { type: 'words', wordsClass: 'words' });
  
  gsap.set(split.words, {
    opacity: 0, yPercent: -10
  })
  gsap.to(split.words, {
    duration: 1,
    opacity: 1,
    yPercent: 0,
    stagger: 0.1,
    ease: 'power4.out',
  })

  gsap.set(canvasImgElems, {
    opacity: 1, yPercent: 100
  })
  gsap.to(canvasImgElems, {
    duration: 1,
    opacity: 1,
    yPercent: 0,
    stagger: 0.05,
    ease: 'power4.out',
  })

  return {
    text: Array.from(split.words),
    images: canvasImgElems
  }
}