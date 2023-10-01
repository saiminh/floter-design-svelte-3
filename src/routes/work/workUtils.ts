import { goto } from '$app/navigation';
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { workbulge } from '$lib/utils/stores';

const bulge = {factor: 0};
workbulge.subscribe(value => {
  bulge.factor = value;
})

export function initWorkPage( canvasTextElems: Array<HTMLElement>, canvasImgElems: Array<HTMLElement>) {
      
  workbulge.set(0);

  gsap.to(bulge, {
    duration: .5,
    factor: 0.15,
    delay: .8,
    ease: 'back.out(3)',
    onUpdate: () => {
      workbulge.set(bulge.factor);
    }
  })

  const workinfos: Array<HTMLElement> = Array.from(document.querySelectorAll('.work-info'));
  
  workinfos.forEach((workinfo) => {

    const workinfoTitle = workinfo.querySelector('h2') as HTMLElement;
    const workinfoTitleWords = workinfoTitle.querySelector('span') as HTMLElement;
    
    const expanded = {
      height: workinfo.getBoundingClientRect().height,
      width: workinfo.getBoundingClientRect().width + 2,
      paddingTop: Number(window.getComputedStyle(workinfo).paddingTop.replace('px','')) as number,
      paddingLeft: Number(window.getComputedStyle(workinfo).paddingLeft.replace('px','')) as number,
    }
    
    const contracted = {
      height: workinfoTitle.offsetHeight * 1.2 + 2 * expanded.paddingTop,
      width: workinfoTitleWords.offsetWidth + 2 * expanded.paddingLeft,
    }

    workinfo.style.width = `${contracted.width}px`;
    workinfo.style.height = `${contracted.height}px`;
    const tags = workinfo.querySelector('.tags') as HTMLElement;
    tags.style.width = `${expanded.width}px`;

    workinfo.parentElement?.addEventListener('mouseenter', () => {
      gsap.to(workinfo, {
        duration: .25,
        width: expanded.width,
        height: expanded.height,
        ease: 'power2.inOut',
        overwrite: true
      })
    })
    workinfo.parentElement?.addEventListener('mouseleave', () => {
      gsap.to(workinfo, {
        duration: .25,
        width: contracted.width,
        height: contracted.height,
        ease: 'power2.inOut',
        overwrite: true
      })
    })
  })
    
  gsap.registerPlugin( SplitText );

  const work = document.querySelectorAll('.work');
  gsap.set(document.querySelectorAll('.tag'), {opacity: 0, yPercent: 200});
  gsap.set(document.querySelectorAll('h2'), {opacity: 1 });
  work.forEach((el) => {
    el.addEventListener('mouseenter', (e) => {
      const target = e.target as HTMLElement;
      gsap.to(target?.querySelectorAll('.tag'), {duration: 0.5, opacity: 1, yPercent: 0, ease: 'back.out(1.7)', stagger: 0.025, overwrite: true});
      gsap.to(target?.querySelector('h2'), {duration: 0.5, opacity: 1, ease: 'back.out(1.7)', overwrite: true});
    });
    el.addEventListener('mouseleave', (e) => {
      const target = e.target as HTMLElement;
      gsap.to(target?.querySelectorAll('.tag'), {duration: 0.3, opacity: 0, yPercent: 200, ease: 'power2.out', overwrite: true});
      gsap.to(target?.querySelector('h2'), {duration: 0.5, opacity: 1, ease: 'back.out(1.7)', overwrite: true});
    });
  });

  gsap.set('.work', {
    opacity: 0, yPercent: 50
  })
  
  gsap.to('.work', {
    duration: 1,
    opacity: 1,
    yPercent: 0,
    stagger: 0.05,
    ease: 'elastic.out(0.75, 0.5)',
    delay: 0.3,
  })

  return {
    text: canvasTextElems,
    images: canvasImgElems
  }
}

export function workClickHandler(e:Event){
  e.preventDefault();
  const target = e.target as HTMLElement;
  const originalLink = target.getAttribute('href') as string;
  const targetImg = target.querySelector('img') as HTMLElement;
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
  const coverclone = targetImg.cloneNode(true) as HTMLElement;
  coverclone.classList.add('coverclone');
  coverclone.style.zIndex = '-1';
  coverclone.style.visibility = 'visible';
  coverclone.style.opacity = '0';
  
  document.body.appendChild(coverclone);

  gsap.to('.work .work-info', {
    duration: .3,
    opacity: 0,
    yPercent: -10,
    ease: 'power4.out',
  })
  gsap.to('.work:not(.active) img', {
    duration: .3,
    opacity: 0,
    yPercent: 20,
    ease: 'power4.out',
  })
  gsap.to('.work h2', {
    duration: .3,
    opacity: 0,
    // scale: 0,
    ease: 'power3.out'
  })
  gsap.to('.work .tag', {
    duration: .3,
    opacity: 0,
    // scale: 0,
    ease: 'power3.out'
  })
  gsap.set(targetImg, {
    zIndex: 100,
  })
  gsap.to(coverclone, {
    duration: .3,
    top: 0,
    left: 0,
    opacity: 1,
    width: window.innerWidth,
    height: window.innerWidth / targetImgAspectRatio,
    ease: 'circ.inOut',
    delay: 0.3
  })
  gsap.to(targetImg, {
    duration: .3,
    top: 0,
    left: 0,
    width: window.innerWidth,
    height: window.innerWidth / targetImgAspectRatio,
    ease: 'circ.inOut',
    delay: 0.3
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