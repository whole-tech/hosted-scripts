// get the sticky element
const stickyElm = document.querySelector('.sticky')

const observer = new IntersectionObserver( 
  ([e]) => e.target.classList.toggle('stuck', e.intersectionRatio < 1),
  {threshold: [1]}
);

observer.observe(stickyElm)
